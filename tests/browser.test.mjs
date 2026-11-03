/**
 * Real-browser tests: drives headless Chrome over the DevTools protocol (no npm packages).
 *  - renders every module, every lesson and every practice lab with no JavaScript errors,
 *    no Content-Security-Policy violations and no missing files;
 *  - runs XSS payloads through the real HTML sanitizer.
 * Needs Google Chrome or Chromium (preinstalled on GitHub's Ubuntu runners). Locally the
 * test is skipped if no browser is found; in CI it fails instead.
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn, execFileSync } from 'node:child_process';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { curriculum } from '../content/curriculum.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml' };

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const c of ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium']) if (existsSync(c)) return c;
  for (const c of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    try { return execFileSync('which', [c], { encoding: 'utf8' }).trim(); } catch { /* next */ }
  }
  return null;
}

const CHROME = findChrome();
const skip = !CHROME && !process.env.CI ? 'Chrome not found (set CHROME_PATH); runs in CI' : false;

let server, base, chrome, profile, ws, nextId = 0;
const pending = new Map();
const problems = [];

/** One DevTools protocol command on the page. */
function cdp(method, params = {}) {
  const id = ++nextId;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}
async function evaluate(expression) {
  const r = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitFor(expression, what, timeout = 10000) {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    const v = await evaluate(expression).catch(() => null);
    if (v) return v;
    await sleep(50);
  }
  throw new Error(`Timed out waiting for ${what}`);
}

before(async () => {
  if (skip) return;
  if (!CHROME) throw new Error('Chrome/Chromium is required in CI (set CHROME_PATH)');

  // Static file server for the repository (same as GitHub Pages: plain files).
  server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    const file = join(ROOT, path.endsWith('/') ? `${path}index.html` : path);
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' }).end(body);
    } catch { res.writeHead(404).end('not found'); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;

  profile = await mkdtemp(join(tmpdir(), 'erp-chrome-'));
  chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
  const portFile = join(profile, 'DevToolsActivePort');
  const end = Date.now() + 20000;
  while (!existsSync(portFile) || !readFileSync(portFile, 'utf8').includes('\n')) {
    if (Date.now() > end) throw new Error('Chrome did not start');
    await sleep(100);
  }
  const port = readFileSync(portFile, 'utf8').split('\n')[0];
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id); pending.delete(msg.id);
      return msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
    }
    if (msg.method === 'Runtime.exceptionThrown') problems.push(`JS error: ${msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text}`);
    if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning', 'assert'].includes(msg.params.type)) problems.push(`console.${msg.params.type}: ${msg.params.args.map((a) => a.value ?? a.description).join(' ')}`);
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') problems.push(`${msg.params.entry.source}: ${msg.params.entry.text} ${msg.params.entry.url || ''}`.trim());
  };
  await cdp('Runtime.enable');
  await cdp('Log.enable');
  await cdp('Page.enable');
});

after(async () => {
  ws?.close();
  chrome?.kill();
  server?.close();
  if (profile) await rm(profile, { recursive: true, force: true }).catch(() => {});
});

async function open(url) {
  await cdp('Page.navigate', { url });
  await waitFor('document.readyState === "complete"', `load of ${url}`);
}

/** Go to a route and wait until the app has rendered it; returns the page heading. */
async function visit(hash) {
  if (await evaluate(`location.hash === ${JSON.stringify(hash)}`)) { // same hash fires no hashchange
    await evaluate(`(location.hash = '#/__reset', true)`);
    await waitFor(`document.body.dataset.route === '__reset'`, 'reset route');
    problems.splice(0);
  }
  await evaluate(`(document.body.dataset.route = '__pending__', location.hash = ${JSON.stringify(hash)}, true)`);
  const expected = hash.replace(/^#\//, '').split(/[/?]/)[0] || 'home';
  return waitFor(`document.body.dataset.route === ${JSON.stringify(expected)} && document.querySelector('main h1')?.textContent.trim()`, `render of ${hash}`);
}

function assertClean(where) {
  const found = problems.splice(0);
  assert.deepEqual(found, [], `${where}: ${found.join('\n')}`);
}

test('every page, module, lesson and lab renders with no errors or CSP violations', { skip, timeout: 300000 }, async () => {
  await open(`${base}/index.html`);
  // Full-page layout renders every block of a lesson, not just the first step.
  await evaluate(`localStorage.setItem('erp-made-simple:v1', JSON.stringify({ completed: {}, settings: { layout: 'page' } })), true`);
  await open(`${base}/index.html#/`);
  await waitFor(`document.querySelector('main h1')`, 'home page');
  assertClean('home');

  // Error pages, and the placeholder shown when a lesson file fails to load.
  const BAD = /We can’t find that page|Something went wrong/;
  const PLACEHOLDER = 'This lesson is being written';
  const pages = ['#/', '#/lab', '#/search?q=invoice', '#/glossary', '#/credits', '#/settings', '#/about', '#/certificate'];
  for (const m of curriculum) {
    pages.push(`#/module/${m.id}`);
    for (const l of m.lessons) pages.push(`#/lesson/${m.id}/${l.slug}`);
  }
  await visit('#/lab');
  const labs = await evaluate(`[...new Set([...document.querySelectorAll('a[href^="#/lab/"]')].map((a) => a.getAttribute('href')))]`);
  assert.ok(labs.length > 0, 'no practice labs found');
  pages.push(...labs);

  assert.ok(pages.length >= 8 + curriculum.length + curriculum.reduce((n, m) => n + m.lessons.length, 0));
  for (const hash of pages) {
    const heading = await visit(hash);
    assert.doesNotMatch(heading, BAD, `${hash} rendered an error page`);
    assert.equal(await evaluate(`document.querySelector('main').textContent.includes(${JSON.stringify(PLACEHOLDER)})`), false, `${hash} could not load its lesson file`);
    if (hash.startsWith('#/lesson/')) {
      const [, mod, slug] = hash.split('/').slice(1);
      const title = curriculum.find((m) => m.id === mod).lessons.find((l) => l.slug === slug).title;
      assert.equal(heading, title, `${hash} shows the wrong heading`);
    }
    assertClean(hash);
  }
});

test('progress survives a reload and a hostile backup cannot run script', { skip, timeout: 60000 }, async () => {
  await open(`${base}/index.html#/`);
  await waitFor(`document.querySelector('main h1')`, 'home page');
  const hostile = JSON.stringify({ completed: { 'basics/what-is-erp': '2026-01-01' }, certificateName: '<img src=x onerror="window.__xss=1">', settings: { theme: '"><script>window.__xss=1</script>' } });
  await evaluate(`localStorage.setItem('erp-made-simple:v1', ${JSON.stringify(hostile)}), true`);
  await open(`${base}/index.html#/certificate`);
  await waitFor(`document.querySelector('main h1')`, 'certificate page');
  await sleep(300);
  assert.equal(await evaluate('window.__xss === 1'), false, 'stored data was executed as code');
  assert.equal(await evaluate(`!!document.querySelector('main img[src="x"]')`), false, 'stored data was rendered as HTML');
  assertClean('hostile backup');
});

test('the HTML sanitizer neutralises XSS payloads in a real browser', { skip, timeout: 30000 }, async () => {
  await open(`${base}/tests/browser/sanitize.html`);
  const { results, xss } = await waitFor('window.__results', 'sanitizer harness');
  assert.equal(xss, false, 'a payload executed script');
  const SAFE_TAGS = new Set(['P', 'STRONG', 'EM', 'B', 'I', 'UL', 'OL', 'LI', 'CODE', 'BR', 'A', 'KBD', 'SPAN']);
  const SAFE_ATTR = /^(A\[href=https:\/\/[^\]]+\]|A\[target=_blank\]|A\[rel=noopener noreferrer\]|SPAN\[class=hl\])$/;
  for (const { input, output, tags, attrs } of results) {
    for (const t of tags) assert.ok(SAFE_TAGS.has(t), `element <${t}> survived: ${input} -> ${output}`);
    for (const a of attrs) assert.match(a, SAFE_ATTR, `attribute ${a} survived: ${input} -> ${output}`);
  }
  const ok = results.find((r) => r.input.includes('https://ok.example')).output;
  assert.match(ok, /href="https:\/\/ok\.example"/);
  assert.match(ok, /rel="noopener noreferrer"/);
  assert.match(ok, /target="_blank"/);
  assert.match(results.find((r) => r.input.includes('class="hl"')).output, /class="hl"/);
  assertClean('sanitizer');
});
