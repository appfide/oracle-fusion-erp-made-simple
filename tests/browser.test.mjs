/**
 * Real-browser tests: drives headless Chrome over the DevTools protocol (no npm packages).
 *  - renders every page, module, lesson and practice lab with no JavaScript errors,
 *    no Content-Security-Policy violations, no missing files and no broken in-app links;
 *  - runs XSS payloads and thousands of fuzzed HTML strings through the real sanitizer;
 *  - throws hostile URLs at the router and hostile saved data at every page.
 * Needs Google Chrome or Chromium (preinstalled on GitHub's Ubuntu runners). Locally the
 * tests are skipped if no browser is found; in CI they fail instead.
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { SKIP as skip, STORAGE_KEY, serve, launch, allRoutes, sleep } from './helpers/chrome.mjs';
import { SEED, backupText } from './helpers/fuzz-data.mjs';

let server, b;
before(async () => {
  if (skip) return;
  server = await serve();
  b = await launch();
});
after(async () => { await b?.close(); await server?.close(); });

const BAD = /We can’t find that page|Something went wrong/;
const PLACEHOLDER = 'This lesson is being written';
function assertClean(where) {
  const found = b.take();
  assert.deepEqual(found, [], `${where}: ${found.join('\n')}`);
}
async function fresh(state) {
  await b.open(`${server.url}/index.html#/__blank`);
  await b.evaluate(`localStorage.clear(), ${state ? `localStorage.setItem('${STORAGE_KEY}', ${JSON.stringify(JSON.stringify(state))})` : 0}, true`);
  await b.open(`${server.url}/index.html#/`);
  await b.waitFor(`document.querySelector('main h1')`, 'home page');
}

test('every page, module, lesson and lab renders with no errors, and every in-app link works', { skip, timeout: 600000 }, async () => {
  const { curriculum, pages } = await allRoutes();
  // Full-page layout renders every block of a lesson, not just the first step.
  await fresh({ completed: {}, settings: { layout: 'page' } });
  assertClean('home');

  await b.visit('#/lab');
  const labs = await b.evaluate(`[...new Set([...document.querySelectorAll('a[href^="#/lab/"]')].map((a) => a.getAttribute('href')))]`);
  assert.ok(labs.length >= 6, `only ${labs.length} practice labs found`);
  pages.push(...labs);
  assert.ok(pages.length >= 8 + curriculum.length + curriculum.reduce((n, m) => n + m.lessons.length, 0));

  const linked = new Set();
  for (const hash of pages) {
    const heading = await b.visit(hash);
    assert.doesNotMatch(heading, BAD, `${hash} rendered an error page`);
    assert.equal(await b.evaluate(`document.querySelector('main').textContent.includes(${JSON.stringify(PLACEHOLDER)})`), false, `${hash} could not load its lesson file`);
    assert.equal(await b.evaluate(`[...document.querySelectorAll('main .callout-warning')].some((e) => e.textContent.includes('could not be shown'))`), false, `${hash} has a block that failed to render`);
    assert.equal(await b.evaluate(`[...document.querySelectorAll('main .blk')].some((e) => /^Unknown (block type|exercise kind)/.test(e.textContent))`), false, `${hash} has an unknown block`);
    if (hash.startsWith('#/lesson/')) {
      const [, mod, slug] = hash.split('/').slice(1);
      const title = curriculum.find((m) => m.id === mod).lessons.find((l) => l.slug === slug).title;
      assert.equal(heading, title, `${hash} shows the wrong heading`);
      assert.match(await b.evaluate('document.title'), new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} · `), `${hash} has the wrong document title`);
    }
    for (const href of await b.evaluate(`[...document.querySelectorAll('a[href^="#/"]')].map((a) => a.getAttribute('href'))`)) linked.add(href.split('?')[0]);
    assertClean(hash);
  }

  // Every in-app link found anywhere must open a real page (catches typos in lesson links).
  const known = new Set(pages.map((p) => p.split('?')[0]));
  for (const href of linked) {
    if (known.has(href)) continue;
    const heading = await b.visit(href);
    assert.doesNotMatch(heading, BAD, `link ${href} leads to an error page`);
    assertClean(href);
  }
});

test('the router survives hostile and malformed URLs', { skip, timeout: 120000 }, async () => {
  await fresh();
  b.take();
  const hostile = [
    '#/lesson/<img src=x onerror=window.__xss=1>/x', '#/module/"><script>window.__xss=1</script>', '#/search?q=<img src=x onerror=window.__xss=1>',
    '#/search?q=%3Cscript%3Ewindow.__xss%3D1%3C%2Fscript%3E', '#/search?q=(((((((', '#/search?q=.*+?^${}()|[]\\', '#/lesson/../../etc/passwd',
    '#/lesson/basics', '#/lesson/basics/', '#/lesson/basics/nope', '#/lesson/nope/nope', '#/module/nope', '#/module/', '#/lab/nope', '#/lab/__proto__',
    '#/lab/constructor', '#/module/__proto__', '#/lesson/__proto__/constructor', '#/lesson/basics/what-is-erp?step=-5', '#/lesson/basics/what-is-erp?step=99999',
    '#/lesson/basics/what-is-erp?step=abc', '#/lesson/basics/what-is-erp?step=1e309', `#/search?q=${'a'.repeat(5000)}`, `#/${'x/'.repeat(500)}`,
    '#/%E0%A4%A', '#/javascript:window.__xss=1', '#/settings?x=<svg/onload=window.__xss=1>', '#/glossary#g-A', '#/SETTINGS', '#//',
  ];
  for (const hash of hostile) {
    await b.evaluate(`(document.body.dataset.route = '__pending__', location.hash = ${JSON.stringify(hash)}, true)`);
    await b.waitFor(`document.body.dataset.route !== '__pending__' && document.querySelector('main h1, main .step-title')`, `render of ${hash}`);
    const heading = await b.evaluate(`document.querySelector('main h1, main .step-title').textContent`);
    assert.doesNotMatch(heading, /Something went wrong/, `${hash} crashed the app`);
    assertClean(hash);
  }
  // Unknown pages show the friendly not-found page.
  for (const hash of ['#/module/nope', '#/lab/nope', '#/lesson/nope/nope', '#/lab/__proto__', '#/module/__proto__']) {
    await b.evaluate(`(document.body.dataset.route = '__pending__', location.hash = ${JSON.stringify(hash)}, true)`);
    await b.waitFor(`document.body.dataset.route !== '__pending__'`, hash);
    assert.match(await b.evaluate(`document.querySelector('main h1').textContent`), /We can’t find that page/, `${hash} should be not found`);
  }
  await sleep(300);
  assert.equal(await b.evaluate('window.__xss === 1'), false, 'a URL executed script');
  assert.equal(await b.evaluate(`!!document.querySelector('main img[src="x"], main script, main svg[onload]')`), false, 'a URL was rendered as HTML');
  assertClean('router fuzz');
});

test('progress survives a reload and a hostile backup cannot run script', { skip, timeout: 60000 }, async () => {
  const hostile = { completed: { 'basics/what-is-erp': '2026-01-01' }, certificateName: '<img src=x onerror="window.__xss=1">', settings: { theme: '"><script>window.__xss=1</script>' } };
  await fresh(hostile);
  await b.visit('#/certificate');
  await b.open(`${server.url}/index.html#/module/basics`);
  await b.waitFor(`document.querySelector('main h1')`, 'module page');
  await sleep(300);
  assert.equal(await b.evaluate('window.__xss === 1'), false, 'stored data was executed as code');
  assert.equal(await b.evaluate(`!!document.querySelector('img[src="x"]')`), false, 'stored data was rendered as HTML');
  assert.equal(await b.evaluate(`document.querySelector('.lesson-row[href="#/lesson/basics/what-is-erp"]').className.includes('done')`), true, 'completed lesson lost after reload');
  assert.equal(await b.evaluate(`document.documentElement.getAttribute('data-theme')`), null, 'an invalid theme reached the page');
  assertClean('hostile backup');
});

test('every page still works with 150 random corrupted saved states', { skip, timeout: 300000 }, async () => {
  const routes = ['#/', '#/certificate', '#/settings', '#/module/basics', '#/lesson/basics/what-is-erp', '#/search?q=invoice'];
  await fresh();
  for (let i = 0; i < 150; i++) {
    const text = backupText();
    await b.evaluate(`localStorage.setItem('${STORAGE_KEY}', ${JSON.stringify(text)}), true`);
    await b.open(`${server.url}/index.html?i=${i}${routes[i % routes.length]}`);
    await b.waitFor(`document.body.dataset.route && document.querySelector('main h1, main .step-title')`, `page ${i}`);
    const heading = await b.evaluate(`document.querySelector('main h1, main .step-title').textContent`);
    assert.doesNotMatch(heading, BAD, `saved state broke ${routes[i % routes.length]} (seed ${SEED}): ${text.slice(0, 300)}`);
    assertClean(`saved state ${i} (seed ${SEED}): ${text.slice(0, 300)}`);
  }
});

test('the HTML sanitizer neutralises XSS payloads in a real browser', { skip, timeout: 30000 }, async () => {
  await b.open(`${server.url}/tests/browser/sanitize.html`);
  const { results, xss } = await b.waitFor('window.__results', 'sanitizer harness');
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

test(`the HTML sanitizer survives 3000 fuzzed documents (seed ${SEED})`, { skip, timeout: 120000 }, async () => {
  await b.open(`${server.url}/tests/browser/fuzz.html?seed=${SEED}&n=3000`);
  const r = await b.waitFor('window.__fuzz', 'sanitizer fuzz', 90000);
  assert.equal(r.count, 3000);
  assert.equal(r.xss, false, `a fuzzed document executed script (seed ${SEED})`);
  assert.equal(r.failed, 0, `unsafe output (seed ${SEED}):\n${JSON.stringify(r.failures, null, 1)}`);
  assertClean('sanitizer fuzz');
});
