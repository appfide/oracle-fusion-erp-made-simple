#!/usr/bin/env node
/**
 * Code coverage of the whole test suite, with no packages.
 *
 *   node scripts/coverage.mjs                 run `npm test` with coverage on, then report
 *   node scripts/coverage.mjs --report <dir>  report coverage already collected in <dir> (used by CI)
 *
 * Node writes V8 coverage for every test process and every script the tests start
 * (NODE_V8_COVERAGE); tests/helpers/chrome.mjs writes V8 block coverage of every page the
 * browser tests open (COVERAGE_DIR). Both use the same V8 format, so they are merged here into
 * line coverage for the app code (assets/js) and the build and check scripts (scripts/).
 * A line counts as covered when V8 ran at least one of its code characters; the report also
 * shows the stricter share of lines where every character ran (every branch on the line was
 * taken). Fails when line coverage is below MIN_COVERAGE percent (default 80).
 */
import { readFileSync, readdirSync, existsSync, mkdtempSync, rmSync, writeFileSync, appendFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const MEASURED = /^(assets\/js\/[\w-]+\.js|scripts\/[\w-]+\.mjs)$/;

/** Which repository file a coverage URL belongs to (file:// from Node, http:// from the browser). */
export function fileOf(url) {
  let rel;
  if (url.startsWith('file://')) rel = relative(ROOT, fileURLToPath(url));
  else if (/^https?:\/\//.test(url)) rel = decodeURIComponent(new URL(url).pathname).replace(/^\/+/, '');
  else return null;
  rel = rel.split('\\').join('/');
  return MEASURED.test(rel) ? rel : null;
}

/**
 * Mark which characters of a script ran. V8 lists ranges from outer to inner (a function, then
 * its blocks); painting them widest-first leaves each character with its innermost count.
 */
export function paint(length, functions, into = new Uint8Array(length)) {
  const ranges = functions.flatMap((f) => f.ranges)
    .sort((a, b) => a.startOffset - b.startOffset || b.endOffset - a.endOffset);
  const mark = new Uint8Array(length);
  const seen = new Uint8Array(length);
  for (const r of ranges) {
    const v = r.count > 0 ? 1 : 0;
    for (let i = r.startOffset; i < Math.min(r.endOffset, length); i++) { mark[i] = v; seen[i] = 1; }
  }
  for (let i = 0; i < length; i++) if (seen[i] && mark[i]) into[i] = 1;
  return into;
}

/** Code lines (not blank, not only comments or brackets) and which of them ran. */
export function lines(source, ran) {
  const out = [];
  let inBlockComment = false;
  let offset = 0;
  for (const [n, line] of source.split('\n').entries()) {
    let code = false;
    let covered = false;
    let full = true;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inBlockComment) { if (c === '*' && line[i + 1] === '/') { inBlockComment = false; i++; } continue; }
      if (c === '/' && line[i + 1] === '*') { inBlockComment = true; i++; continue; }
      if (c === '/' && line[i + 1] === '/') break;
      if (/[\s{}()[\];,]/.test(c)) continue;
      code = true;
      if (ran[offset + i]) covered = true; else full = false;
    }
    if (code) out.push({ line: n + 1, covered, full });
    offset += line.length + 1;
  }
  return out;
}

/** Merge every coverage file in `dir` into per-file line coverage. */
export function collect(dir) {
  const ran = new Map();
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    let data;
    try { data = JSON.parse(readFileSync(join(dir, f), 'utf8')); } catch { continue; }
    for (const script of data.result || []) {
      const file = fileOf(script.url);
      if (!file) continue;
      const source = readFileSync(join(ROOT, file), 'utf8');
      if (!ran.has(file)) ran.set(file, new Uint8Array(source.length));
      paint(source.length, script.functions, ran.get(file));
    }
  }
  const report = [];
  const all = [...readdirSync(join(ROOT, 'assets/js')).map((f) => `assets/js/${f}`), ...readdirSync(join(ROOT, 'scripts')).map((f) => `scripts/${f}`)]
    .filter((f) => MEASURED.test(f) && f !== 'scripts/coverage.mjs');
  for (const file of all.sort()) {
    const source = readFileSync(join(ROOT, file), 'utf8');
    const ls = lines(source, ran.get(file) || new Uint8Array(source.length));
    report.push({ file, total: ls.length, covered: ls.filter((l) => l.covered).length, full: ls.filter((l) => l.full).length, missed: ls.filter((l) => !l.covered).map((l) => l.line) });
  }
  return report;
}

function ranges(nums) {
  const out = [];
  for (const n of nums) {
    const last = out.at(-1);
    if (last && n === last[1] + 1) last[1] = n; else out.push([n, n]);
  }
  return out.map(([a, b]) => (a === b ? `${a}` : `${a}-${b}`)).join(', ');
}

function main() {
  const args = process.argv.slice(2);
  const min = Number(process.env.MIN_COVERAGE ?? 80);
  let dir;
  let cleanup = false;
  if (args[0] === '--report') {
    dir = args[1];
    if (!dir || !existsSync(dir)) { console.error('usage: node scripts/coverage.mjs --report <dir>'); process.exit(2); }
  } else {
    dir = mkdtempSync(join(tmpdir(), 'erp-coverage-'));
    cleanup = true;
    const tests = readdirSync(join(ROOT, 'tests')).filter((f) => f.endsWith('.test.mjs')).map((f) => `tests/${f}`);
    const run = spawnSync(process.execPath, ['--test', ...tests], { cwd: ROOT, stdio: 'inherit', env: { ...process.env, NODE_V8_COVERAGE: dir, COVERAGE_DIR: dir } });
    if (run.status !== 0) { console.error('Tests failed; coverage not reported.'); process.exit(run.status || 1); }
  }
  const report = collect(dir);
  if (cleanup) rmSync(dir, { recursive: true, force: true });
  const total = report.reduce((n, r) => n + r.total, 0);
  const covered = report.reduce((n, r) => n + r.covered, 0);
  const full = report.reduce((n, r) => n + r.full, 0);
  const pct = (a, b) => (b ? (100 * a) / b : 100).toFixed(1);
  const rows = report.map((r) => `| \`${r.file}\` | ${pct(r.covered, r.total)}% | ${r.covered}/${r.total} | ${ranges(r.missed).slice(0, 120) || '—'} |`);
  const md = [`### Line coverage: ${pct(covered, total)}% (${covered}/${total} lines, minimum ${min}%)`, '',
    `Lines where every expression and branch ran: ${pct(full, total)}%.`, '', '| File | Covered | Lines | Lines not run |', '| --- | --- | --- | --- |', ...rows, ''].join('\n');
  console.log(md);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${md}\n`);
  if (process.env.COVERAGE_JSON) writeFileSync(process.env.COVERAGE_JSON, JSON.stringify({ total, covered, files: report }, null, 2));
  if ((100 * covered) / total < min) { console.error(`Line coverage ${pct(covered, total)}% is below the minimum of ${min}%.`); process.exit(1); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
