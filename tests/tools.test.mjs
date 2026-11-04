/**
 * The project's own tools work and catch what they promise to catch: the linter (coding
 * standard), the coverage reporter, and the source-link checker (run with a fake network).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './helpers/chrome.mjs';

const lint = await import(pathToFileURL(join(ROOT, 'scripts/lint.mjs')));
const cov = await import(pathToFileURL(join(ROOT, 'scripts/coverage.mjs')));

test('lint: the whole repository follows the coding standard', () => {
  try {
    execFileSync(process.execPath, [join(ROOT, 'scripts/lint.mjs')], { cwd: ROOT, stdio: 'pipe', encoding: 'utf8' });
  } catch (e) {
    assert.fail(`scripts/lint.mjs found problems:\n${e.stderr}`);
  }
});

test('lint: catches each kind of problem, with the right line number', () => {
  const cases = [
    ['a.js', 'const a = 1;   \n', 1, /trailing whitespace/],
    ['a.js', 'const a = 1;', 1, /newline/],
    ['a.js', 'const a = 1;\r\n', 1, /CRLF/],
    ['a.js', '﻿const a = 1;\n', 1, /BOM/],
    ['a.js', 'if (x) {\n\treturn;\n}\n', 2, /tabs/],
    ['a.md', '<<<<<<< HEAD\n', 1, /merge-conflict/],
    ['a.js', 'const a = 1;\nvar b = 2;\n', 2, /var/],
    ['a.js', 'if (a == b) go();\n', 1, /strict equality/],
    ['a.js', 'if (a != b) go();\n', 1, /strict equality/],
    ['a.js', 'debugger;\n', 1, /debugger/],
    ['a.js', 'eval(code);\n', 1, /eval/],
    ['a.js', 'const f = new Function("x", "return x");\n', 1, /eval/],
    ['a.js', "setTimeout('go()', 10);\n", 1, /string/],
    ['assets/js/a.js', "console.log('hi');\n", 1, /console\.log/],
    ['assets/js/a.js', 'el.innerHTML = html;\n', 1, /sanitizer/],
    ['sw.js', 'el.insertAdjacentHTML("beforeend", x);\n', 1, /sanitizer/],
    ['a.json', '{"a": 1,}\n', 1, /invalid JSON/],
    ['manifest.webmanifest', '{nope}\n', 1, /invalid JSON/],
  ];
  for (const [file, text, line, msg] of cases) {
    const found = lint.lintText(file, text);
    assert.ok(found.some((p) => p.startsWith(`${file}:${line}: `) && msg.test(p)), `${JSON.stringify(text)} in ${file}: expected ${msg} at line ${line}, got ${JSON.stringify(found)}`);
  }
});

test('lint: no false alarms on strings, comments, regexes, markdown and reviewed exceptions', () => {
  const clean = [
    ['a.js', "const s = 'a == b, var x, debugger, eval(';\n"],
    ['a.js', 'const s = "x != y";\nconst t = `a == ${b === c}`;\n'],
    ['a.js', '// var x == y; debugger\n/* eval(x)\n   a != b */\nconst ok = a === b && c !== d;\n'],
    ['a.js', 'const re = /a==b|var\\s/;\nconst half = total / 2 / 3;\n'],
    ['a.js', 'const variable = 1; const evaluate = () => 0; obj.eval = 1;\n'],
    ['scripts/a.mjs', "console.log('progress');\n"],
    ['a.md', 'Line with a break  \n'],
    ['assets/js/views.js', '// lint-allow raw-html: static SVG\nwrap.innerHTML = `<svg/>`;\n'],
    ['google0123abcd.html', 'google-site-verification: google0123abcd.html'],
    ['a.txt', '\tTabbed text is fine in plain text.\n'],
  ];
  for (const [file, text] of clean) assert.deepEqual(lint.lintText(file, text), [], `false alarm in ${file}: ${JSON.stringify(text)}`);
  // Without the reviewed-exception comment the same line is flagged.
  assert.equal(lint.lintText('assets/js/views.js', 'wrap.innerHTML = `<svg/>`;\n').length, 1);
});

test('lint: the command fails on a bad file and passes on a good one', () => {
  const dir = mkdtempSync(join(ROOT, '.lint-test-'));
  try {
    writeFileSync(join(dir, 'bad.js'), 'var a = 1;\n');
    writeFileSync(join(dir, 'good.js'), 'const a = 1;\n');
    const rel = (f) => join(dir, f).slice(ROOT.length).replace(/^[/\\]/, '');
    const bad = spawnSync(process.execPath, [join(ROOT, 'scripts/lint.mjs'), rel('bad.js')], { cwd: ROOT, encoding: 'utf8' });
    assert.equal(bad.status, 1);
    assert.match(bad.stderr, /bad\.js:1: use let or const/);
    const good = spawnSync(process.execPath, [join(ROOT, 'scripts/lint.mjs'), rel('good.js')], { cwd: ROOT, encoding: 'utf8' });
    assert.equal(good.status, 0, good.stderr);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('coverage: V8 ranges are painted innermost-wins and merged across runs', () => {
  // function body 0..20 ran; inner block 5..10 did not.
  const ran = cov.paint(20, [{ ranges: [{ startOffset: 0, endOffset: 20, count: 1 }, { startOffset: 5, endOffset: 10, count: 0 }] }]);
  assert.deepEqual([...ran].map(String).join(''), '11111000001111111111');
  // A second run that did take the block fills it in; a run that did nothing removes nothing.
  cov.paint(20, [{ ranges: [{ startOffset: 0, endOffset: 20, count: 1 }, { startOffset: 5, endOffset: 10, count: 2 }] }], ran);
  cov.paint(20, [{ ranges: [{ startOffset: 0, endOffset: 20, count: 0 }] }], ran);
  assert.ok(ran.every((x) => x === 1));
  // Ranges listed in any order give the same answer.
  const a = cov.paint(30, [{ ranges: [{ startOffset: 10, endOffset: 20, count: 0 }] }, { ranges: [{ startOffset: 0, endOffset: 30, count: 3 }] }]);
  assert.deepEqual([...a.slice(9, 21)], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
});

test('coverage: only code lines count, and a line is covered when any of its code ran', () => {
  const src = '// comment\nconst a = 1;\n\n/* block\n comment */\nif (a) {\n  go();\n}\n';
  const ran = new Uint8Array(src.length);
  const at = src.indexOf('const');
  ran.fill(1, at, at + 12);
  const ls = cov.lines(src, ran);
  assert.deepEqual(ls.map((l) => l.line), [2, 6, 7], 'comments, blank lines and lone brackets are not code lines');
  assert.deepEqual(ls.map((l) => l.covered), [true, false, false]);
  assert.deepEqual(ls.map((l) => l.full), [true, false, false]);
  // Half of a line ran (an `if` whose body did not): covered, but not fully.
  const half = 'if (a) go();\n';
  const hr = new Uint8Array(half.length).fill(1, 0, 6);
  assert.deepEqual(cov.lines(half, hr), [{ line: 1, covered: true, full: false }]);
});

test('coverage: browser and Node URLs map to repository files; tests and content are not measured', () => {
  assert.equal(cov.fileOf('http://127.0.0.1:5555/assets/js/store.js'), 'assets/js/store.js');
  assert.equal(cov.fileOf(pathToFileURL(join(ROOT, 'scripts/build-seo.mjs')).href), 'scripts/build-seo.mjs');
  assert.equal(cov.fileOf(pathToFileURL(join(ROOT, 'tests/repo.test.mjs')).href), null);
  assert.equal(cov.fileOf('http://127.0.0.1:5555/content/curriculum.js'), null);
  assert.equal(cov.fileOf('node:internal/fs'), null);
});

test('coverage: the report adds up, and fails below the minimum', () => {
  const dir = mkdtempSync(join(tmpdir(), 'erp-cov-test-'));
  try {
    const url = pathToFileURL(join(ROOT, 'assets/js/config.js')).href;
    writeFileSync(join(dir, 'a.json'), JSON.stringify({ result: [{ url, functions: [{ ranges: [{ startOffset: 0, endOffset: 1e6, count: 1 }] }] }] }));
    writeFileSync(join(dir, 'broken.json'), '{not json');
    const report = cov.collect(dir);
    const config = report.find((r) => r.file === 'assets/js/config.js');
    assert.ok(config.total > 5 && config.covered === config.total && config.missed.length === 0);
    const store = report.find((r) => r.file === 'assets/js/store.js');
    assert.equal(store.covered, 0, 'a file no test ran must count as 0% covered, not be left out');
    assert.ok(!report.some((r) => r.file === 'scripts/coverage.mjs'));
    const low = spawnSync(process.execPath, [join(ROOT, 'scripts/coverage.mjs'), '--report', dir], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, GITHUB_STEP_SUMMARY: '' } });
    assert.equal(low.status, 1, 'coverage below 80% must fail');
    assert.match(low.stdout, /\| `assets\/js\/config\.js` \| 100\.0% \|/);
    assert.match(low.stderr, /below the minimum of 80%/);
    const ok = spawnSync(process.execPath, [join(ROOT, 'scripts/coverage.mjs'), '--report', dir], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, MIN_COVERAGE: '0', GITHUB_STEP_SUMMARY: '' } });
    assert.equal(ok.status, 0, ok.stderr);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('check-links: reports dead source links and passes when all respond (fake network)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'erp-links-'));
  try {
    const fake = join(dir, 'fake-fetch.mjs');
    // Every URL answers 200, except one that 404s and one that cannot be reached.
    writeFileSync(fake, `
      let n = 0;
      globalThis.fetch = async (url) => {
        n++;
        if (process.env.FAIL && n === 1) return { status: 404 };
        if (process.env.FAIL && n === 2) throw Object.assign(new Error('x'), { cause: { code: 'ENOTFOUND' } });
        return { status: 200 };
      };`);
    const run = (env) => spawnSync(process.execPath, ['--import', pathToFileURL(fake).href, join(ROOT, 'scripts/check-links.mjs')], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, ...env } });
    const good = run({});
    assert.equal(good.status, 0, good.stdout + good.stderr);
    const total = Number(good.stdout.match(/Checked (\d+) unique URLs: \1 OK, 0 problem/)?.[1]);
    assert.ok(total > 100, `expected every cited source to be checked:\n${good.stdout}`);
    const bad = run({ FAIL: '1' });
    assert.equal(bad.status, 1);
    assert.match(bad.stdout, /✖ 404 {2}https:\/\//);
    assert.match(bad.stdout, /✖ ERR ENOTFOUND {2}https:\/\//);
    assert.match(bad.stdout, /used in: [\w-]+\/[\w-]+/);
    assert.match(bad.stdout, new RegExp(`Checked ${total} unique URLs: ${total - 2} OK, 2 problem`));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
