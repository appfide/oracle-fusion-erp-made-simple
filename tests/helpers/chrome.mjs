/**
 * Test helper: serves the repository like GitHub Pages and drives headless Chrome over the
 * DevTools protocol, using only Node built-ins (http, child_process, WebSocket).
 * Needs Google Chrome or Chromium; set CHROME_PATH if it is somewhere unusual.
 */
import { createServer } from 'node:http';
import { spawn, execFileSync } from 'node:child_process';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));
export const STORAGE_KEY = 'erp-made-simple:v1';
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml' };

export function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const c of ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium']) if (existsSync(c)) return c;
  for (const c of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    try { return execFileSync('which', [c], { encoding: 'utf8' }).trim(); } catch { /* next */ }
  }
  return null;
}

/** Reason to skip browser tests locally when no browser exists; in CI they must run. */
export const SKIP = !findChrome() && !process.env.CI ? 'Chrome not found (set CHROME_PATH); runs in CI' : false;
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Serve a folder (default: the repository) on a random local port. */
export async function serve(dir = ROOT) {
  const offline = { on: false };
  const server = createServer(async (req, res) => {
    if (offline.on) { req.socket.destroy(); return; }
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    const file = join(dir, path.endsWith('/') ? `${path}index.html` : path);
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' }).end(body);
    } catch { res.writeHead(404).end('not found'); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return { url: `http://127.0.0.1:${server.address().port}`, offline, close: () => new Promise((r) => { server.closeAllConnections?.(); server.close(r); }) };
}

export async function launch() {
  const CHROME = findChrome();
  if (!CHROME) throw new Error('Chrome/Chromium is required for browser tests in CI (set CHROME_PATH)');
  const profile = await mkdtemp(join(tmpdir(), 'erp-chrome-'));
  const proc = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
  const portFile = join(profile, 'DevToolsActivePort');
  const end = Date.now() + 30000;
  while (!existsSync(portFile) || !readFileSync(portFile, 'utf8').includes('\n')) {
    if (Date.now() > end) throw new Error('Chrome did not start');
    await sleep(100);
  }
  const port = readFileSync(portFile, 'utf8').split('\n')[0];
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

  let nextId = 0;
  const pending = new Map();
  const problems = [];
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id); pending.delete(msg.id);
      return msg.error ? p.reject(new Error(`${p.method}: ${msg.error.message}`)) : p.resolve(msg.result);
    }
    const p = msg.params;
    if (msg.method === 'Runtime.exceptionThrown') problems.push(`JS error: ${p.exceptionDetails.exception?.description || p.exceptionDetails.text}`);
    if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning', 'assert'].includes(p.type)) problems.push(`console.${p.type}: ${p.args.map((a) => a.value ?? a.description).join(' ')}`);
    if (msg.method === 'Log.entryAdded' && p.entry.level === 'error' && !b.allowNetworkErrors) problems.push(`${p.entry.source}: ${p.entry.text} ${p.entry.url || ''}`.trim());
    if (msg.method === 'Page.javascriptDialogOpening') { problems.push(`unexpected ${p.type}() dialog: ${p.message}`); send('Page.handleJavaScriptDialog', { accept: false }); }
  };
  function send(method, params = {}) {
    const id = ++nextId;
    ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject, method }));
  }

  const b = {
    problems,
    allowNetworkErrors: false,
    cdp: send,
    async evaluate(expression) {
      const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true, userGesture: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
      return r.result.value;
    },
    async waitFor(expression, what, timeout = 15000) {
      const end = Date.now() + timeout;
      let last;
      while (Date.now() < end) {
        try { last = await b.evaluate(expression); if (last) return last; } catch (e) { last = e.message; }
        await sleep(50);
      }
      throw new Error(`Timed out waiting for ${what} (last: ${JSON.stringify(last)})`);
    },
    /** Load a URL as a fresh document (a hash-only change is reloaded, like a user pressing F5). */
    async open(url) {
      const current = await b.evaluate('location.href').catch(() => '');
      if (current.split('#')[0] === url.split('#')[0]) { // a hash-only change would keep the old document
        await send('Page.navigate', { url: 'about:blank' });
        await b.waitFor(`location.href === 'about:blank' && document.readyState === 'complete'`, 'blank page');
      }
      await b.evaluate('window.__stale = true');
      await send('Page.navigate', { url });
      await b.waitFor(`!window.__stale && document.readyState === 'complete' && location.href === ${JSON.stringify(url)}`, `load of ${url}`);
    },
    /** Go to an app route and wait until the router has rendered it; returns the heading. */
    async visit(hash) {
      if (await b.evaluate(`location.hash === ${JSON.stringify(hash)}`)) {
        await b.evaluate(`(location.hash = '#/__reset', true)`);
        await b.waitFor(`document.body.dataset.route === '__reset'`, 'reset route');
        problems.splice(0);
      }
      await b.evaluate(`(document.body.dataset.route = '__pending__', location.hash = ${JSON.stringify(hash)}, true)`);
      const expected = hash.replace(/^#\//, '').split(/[/?]/)[0] || 'home';
      return b.waitFor(`document.body.dataset.route === ${JSON.stringify(expected)} && (document.querySelector('main h1') || document.querySelector('main .step-title'))?.textContent.trim()`, `render of ${hash}`);
    },
    /** Return and clear the problems seen so far. */
    take() { return problems.splice(0); },
    async viewport(width, height, mobile = false) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
    },
    async colorScheme(value) {
      await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value }] });
    },
    async close() {
      ws.close();
      proc.kill();
      await rm(profile, { recursive: true, force: true }).catch(() => {});
    },
  };
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Page.enable');
  return b;
}

/** Every route of the app: pages, modules and lessons (labs are discovered in the page). */
export async function allRoutes() {
  const { curriculum } = await import('../../content/curriculum.js');
  const pages = ['#/', '#/lab', '#/search?q=invoice', '#/glossary', '#/credits', '#/settings', '#/about', '#/certificate'];
  for (const m of curriculum) {
    pages.push(`#/module/${m.id}`);
    for (const l of m.lessons) pages.push(`#/lesson/${m.id}/${l.slug}`);
  }
  return { curriculum, pages };
}
