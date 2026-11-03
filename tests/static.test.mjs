/**
 * Privacy, security and packaging guardrails. These read the source files and fail a
 * pull request that would weaken the site's promises: strict CSP, no third-party
 * requests, no tracking, no dangerous code patterns, a working offline cache.
 *   node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const walk = (dir) => readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)]);

const APP_JS = walk('assets/js').filter((f) => f.endsWith('.js'));
const APP_CODE = [...APP_JS, 'sw.js'];
const CONTENT_JS = walk('content').filter((f) => f.endsWith('.js'));
const INDEX = read('index.html');

/* ------------------------------------------------------------ CSP */

const csp = (() => {
  const m = INDEX.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/);
  assert.ok(m, 'index.html must keep its Content-Security-Policy meta tag');
  return Object.fromEntries(m[1].split(';').map((d) => d.trim()).filter(Boolean).map((d) => {
    const [name, ...vals] = d.split(/\s+/);
    return [name, vals];
  }));
})();

test('CSP: every fetch directive is same-origin only', () => {
  for (const dir of ['default-src', 'script-src', 'style-src', 'font-src', 'connect-src', 'manifest-src', 'worker-src']) {
    assert.deepEqual(csp[dir], ["'self'"], `${dir} must be exactly 'self' (no third parties, no unsafe-*)`);
  }
  assert.deepEqual(csp['img-src'], ["'self'", 'data:', 'blob:'], "img-src must stay 'self' data: blob:");
});

test('CSP: plugins, <base> and form posts are blocked', () => {
  assert.deepEqual(csp['object-src'], ["'none'"]);
  assert.deepEqual(csp['base-uri'], ["'none'"]);
  assert.deepEqual(csp['form-action'], ["'none'"]);
});

test('CSP: no unsafe-inline, unsafe-eval or wildcard anywhere', () => {
  const all = Object.values(csp).flat().join(' ');
  assert.doesNotMatch(all, /unsafe-|\*|https?:/);
});

/* ------------------------------------------------------------ no third parties */

test('index.html loads scripts, styles, icons and manifest only from this site', () => {
  for (const [, attr, url] of INDEX.matchAll(/<(?:script|link)\b[^>]*?\b(src|href)="([^"]+)"/g)) {
    const tag = INDEX.slice(INDEX.lastIndexOf('<', INDEX.indexOf(url)), INDEX.indexOf('>', INDEX.indexOf(url)));
    if (/rel="(canonical|author)"/.test(tag)) continue; // metadata links, never fetched
    assert.doesNotMatch(url, /^(https?:)?\/\//, `${attr}="${url}" must be a relative URL`);
  }
  assert.doesNotMatch(INDEX, /<script\b(?![^>]*type="application\/ld\+json")[^>]*>\s*[^<\s]/, 'no inline <script> code');
});

test('app code makes no network requests to other sites and has no trackers', () => {
  const banned = [
    [/\bXMLHttpRequest\b/, 'XMLHttpRequest'],
    [/\bWebSocket\b/, 'WebSocket'],
    [/\bEventSource\b/, 'EventSource'],
    [/sendBeacon/, 'navigator.sendBeacon'],
    [/fetch\(\s*['"`]https?:/, 'fetch() to an absolute URL'],
    [/import\s*\(?\s*['"`]https?:/, 'import from a URL'],
    [/google-analytics|googletagmanager|gtag\(|plausible|segment\.io|mixpanel|hotjar|clarity\.ms|facebook\.net|doubleclick/i, 'analytics/tracking'],
    [/document\.cookie/, 'cookies'],
    [/navigator\.geolocation|getUserMedia/, 'device permissions'],
  ];
  for (const f of APP_CODE) {
    const src = read(f);
    for (const [re, what] of banned) assert.doesNotMatch(src, re, `${f}: ${what} is not allowed (privacy promise)`);
  }
});

test('CSS loads nothing from other sites', () => {
  for (const f of walk('assets/css')) {
    assert.doesNotMatch(read(f), /url\(\s*['"]?(https?:)?\/\/|@import\s+(url\()?['"]?(https?:)?\/\//, `${f} must not load remote files`);
  }
});

test('progress is stored only in localStorage, by store.js (and read early by theme-boot.js)', () => {
  for (const f of APP_CODE) {
    const src = read(f);
    if (/sessionStorage|indexedDB/.test(src)) assert.fail(`${f}: only localStorage via store.js is allowed`);
    if (/localStorage\.(setItem|removeItem|clear)/.test(src)) assert.equal(f, 'assets/js/store.js', `${f} writes localStorage; go through store.js`);
    if (/localStorage\.getItem/.test(src)) assert.ok(['assets/js/store.js', 'assets/js/theme-boot.js'].includes(f), `${f} reads localStorage directly`);
  }
});

/* ------------------------------------------------------------ dangerous code */

test('no eval, new Function, document.write or string timers', () => {
  for (const f of [...APP_CODE, ...CONTENT_JS]) {
    const src = read(f);
    assert.doesNotMatch(src, /\beval\s*\(|new\s+Function\s*\(|document\.write|set(Timeout|Interval)\(\s*['"`]/, `${f}: dynamic code execution is not allowed`);
  }
});

test('raw HTML is only set in the reviewed places (the sanitizer and two static SVGs)', () => {
  const allowed = { 'assets/js/dom.js': 3, 'assets/js/views.js': 1 };
  for (const f of APP_JS) {
    const n = (read(f).match(/\.innerHTML\s*=|insertAdjacentHTML|outerHTML\s*=/g) || []).length;
    assert.equal(n, allowed[f] || 0, `${f}: new raw-HTML assignment found. Use h()/sanitize() from dom.js instead, or review it and update this test.`);
  }
});

test('sanitizer allow-list stays small and links stay https-only', () => {
  const dom = read('assets/js/dom.js');
  assert.match(dom, /const ALLOWED = new Set\(\['P', 'STRONG', 'EM', 'B', 'I', 'UL', 'OL', 'LI', 'CODE', 'BR', 'A', 'KBD', 'SPAN'\]\);/,
    'changing the sanitizer allow-list needs a security review (update this test deliberately)');
  assert.match(dom, /\/\^https:\\\/\\\/\/i\.test\(attr\.value\)/, 'links in content must stay https-only');
  assert.match(dom, /rel', 'noopener noreferrer'/);
});

test('lesson content contains no scripts, event handlers or javascript: links', () => {
  for (const f of CONTENT_JS) {
    const src = read(f);
    assert.doesNotMatch(src, /<\s*(script|iframe|object|embed|style|form|input|img|svg)\b/i, `${f}: tag not allowed in content`);
    assert.doesNotMatch(src, /\son[a-z]+\s*=/i, `${f}: inline event handler in content`);
    assert.doesNotMatch(src, /javascript:|data:text\/html/i, `${f}: script URL in content`);
    assert.doesNotMatch(src, /href=\\?["']http:\/\//i, `${f}: links must use https`);
  }
});

/* ------------------------------------------------------------ packaging */

test('service worker precaches only files that exist, and stays same-origin', () => {
  const sw = read('sw.js');
  const shell = [...sw.matchAll(/'\.\/([^']*)'/g)].map((m) => m[1]).filter(Boolean);
  assert.ok(shell.length > 5, 'SHELL list not found in sw.js');
  for (const p of shell) assert.ok(existsSync(join(ROOT, p)) && statSync(join(ROOT, p)).isFile(), `sw.js precaches ./${p}, which does not exist (offline mode would break)`);
  assert.match(sw, /origin !== self\.location\.origin\) return/, 'service worker must ignore cross-origin requests');
});

test('every file index.html references exists', () => {
  for (const [, url] of INDEX.matchAll(/<(?:script|link)\b[^>]*?\b(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:)?\/\//.test(url) || url === 'sitemap.xml') continue; // sitemap is generated at deploy
    assert.ok(existsSync(join(ROOT, url)), `index.html references missing file ${url}`);
  }
});

test('manifest is valid and its icons exist', () => {
  const m = JSON.parse(read('manifest.webmanifest'));
  assert.ok(m.name && m.start_url && m.icons?.length);
  for (const i of m.icons) assert.ok(existsSync(join(ROOT, i.src)), `manifest icon ${i.src} missing`);
});

test('version numbers agree (config.js, package.json, sw.js)', async () => {
  const { APP } = await import(new URL('../assets/js/config.js', import.meta.url));
  const pkg = JSON.parse(read('package.json'));
  const sw = read('sw.js').match(/const VERSION = 'v([^']+)'/)[1];
  assert.equal(pkg.version, APP.version, 'package.json version must match APP.version in config.js');
  assert.equal(sw, APP.version, 'sw.js VERSION must match APP.version in config.js');
});

test('pull requests that change the app shell bump the version (so learners get the update)', (t) => {
  const base = process.env.BASE_SHA;
  if (!base) return t.skip('BASE_SHA not set (only checked on pull requests in CI)');
  const changed = execFileSync('git', ['diff', '--name-only', `${base}...HEAD`], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
  const shell = changed.filter((f) => f === 'index.html' || f === 'manifest.webmanifest' || f.startsWith('assets/') || f === 'content/curriculum.js');
  if (!shell.length) return;
  const swChanged = execFileSync('git', ['diff', `${base}...HEAD`, '--', 'sw.js'], { cwd: ROOT, encoding: 'utf8' });
  assert.match(swChanged, /^\+const VERSION = /m, `App shell changed (${shell.join(', ')}) but sw.js VERSION was not bumped`);
});

/* ------------------------------------------------------------ hygiene */

test('no secrets or private keys are committed', () => {
  const files = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter((f) => f && !/\.(png|jpg|ico|webp)$/.test(f));
  const secret = /-----BEGIN [A-Z ]*PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9]{36}\b|\bAKIA[0-9A-Z]{16}\b|\bsk-[A-Za-z0-9]{32,}\b|\bxox[baprs]-[A-Za-z0-9-]{10,}/;
  for (const f of files) assert.doesNotMatch(read(f), secret, `${relative(ROOT, join(ROOT, f))} looks like it contains a secret`);
});
