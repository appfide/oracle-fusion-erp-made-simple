#!/usr/bin/env node
/**
 * The project's coding standard, enforced with no packages (run in CI and by `npm test`).
 *
 *   node scripts/lint.mjs            lint every file tracked by git
 *   node scripts/lint.mjs <file...>  lint only these files
 *
 * Every text file: UTF-8 without BOM, LF line endings, a final newline, no trailing spaces
 * (except Markdown, where two spaces are a line break), spaces not tabs for indentation, no
 * leftover merge-conflict markers. JavaScript also: no `var`, strict equality only, no
 * `debugger`, no `eval`/`new Function`/string timers, no `console.log` in shipped code, no
 * `.innerHTML` outside the HTML sanitizer (a reviewed exception carries a
 * `// lint-allow raw-html: <reason>` comment on the line above). JSON must parse. See CONTRIBUTING.md.
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BINARY = new Set(['.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.woff', '.woff2', '.pdf']);
/** Files whose exact bytes are dictated by someone else. */
const EXACT = [/^google[0-9a-f]+\.html$/, /^LICENSES\//];
const SHIPPED = /^(assets\/js\/|sw\.js$)/;

/** Mask string, template and regex literals and comments with spaces so code rules only see code. */
export function codeOnly(src) {
  let out = '';
  let i = 0;
  let prev = ''; // last significant code character, to tell a regex from a division
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (c === '/' && n === '/') { while (i < src.length && src[i] !== '\n') { out += ' '; i++; } continue; }
    if (c === '/' && n === '*') {
      const end = src.indexOf('*/', i + 2);
      const stop = end < 0 ? src.length : end + 2;
      out += src.slice(i, stop).replace(/[^\n]/g, ' ');
      i = stop;
      continue;
    }
    const regexStart = c === '/' && (prev === '' || /[(,=:[!&|?{};+\-*%<>~^]/.test(prev) || /\b(return|typeof|case|in|of)$/.test(out.trimEnd()));
    if (c === '"' || c === "'" || c === '`' || regexStart) {
      const quote = c;
      let inClass = false;
      out += quote;
      i++;
      while (i < src.length) {
        const d = src[i];
        if (d === '\\') { out += '  '; i += 2; continue; }
        if (quote === '/' && d === '[') inClass = true;
        else if (quote === '/' && d === ']') inClass = false;
        else if (d === quote && !inClass) break;
        else if (d === '\n' && quote !== '`') break;
        out += d === '\n' ? '\n' : ' ';
        i++;
      }
      out += src[i] === quote ? quote : '';
      if (src[i] === quote) i++;
      prev = 'x';
      continue;
    }
    out += c;
    if (!/\s/.test(c)) prev = c;
    i++;
  }
  return out;
}

const JS_RULES = [
  [/(^|[^.\w$])var\s/, 'use let or const, not var'],
  [/[^=!<>]==[^=]|!=[^=]/, 'use === and !== (strict equality)'],
  [/\bdebugger\b/, 'remove debugger statements'],
  [/(^|[^.\w$])eval\s*\(|\bnew\s+Function\s*\(/, 'no eval or new Function'],
  [/\bset(?:Timeout|Interval)\s*\(\s*['"`]/, 'pass a function to setTimeout/setInterval, not a string'],
];

/** Problems in one file, as "file:line: message" strings. */
export function lintText(file, text) {
  const problems = [];
  const at = (line, msg) => problems.push(`${file}:${line}: ${msg}`);
  if (EXACT.some((re) => re.test(file))) return problems;
  if (text.charCodeAt(0) === 0xfeff) at(1, 'remove the byte-order mark (BOM)');
  if (text.includes('\r')) at(text.slice(0, text.indexOf('\r')).split('\n').length, 'use LF line endings, not CRLF');
  if (text.length && !text.endsWith('\n')) at(text.split('\n').length, 'end the file with a newline');
  const ext = extname(file);
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    if (ext !== '.md' && /[ \t]+$/.test(line)) at(i + 1, 'remove trailing whitespace');
    if (/^\t/.test(line) && ext !== '.txt') at(i + 1, 'indent with spaces, not tabs');
    if (/^(<{7}|={7}|>{7})( |$)/.test(line)) at(i + 1, 'leftover merge-conflict marker');
  });
  if (ext === '.json' || ext === '.webmanifest') {
    try { JSON.parse(text); } catch (e) { at(1, `invalid JSON: ${e.message}`); }
  }
  if (ext === '.js' || ext === '.mjs') {
    const code = codeOnly(text).split('\n');
    code.forEach((line, i) => {
      const allowRaw = /lint-allow raw-html:/.test(lines[i - 1] || '');
      for (const [re, msg] of JS_RULES) if (re.test(line)) at(i + 1, msg);
      if (SHIPPED.test(file) && /\bconsole\.log\s*\(/.test(line)) at(i + 1, 'no console.log in shipped code (use console.error for real errors)');
      if (SHIPPED.test(file) && file !== 'assets/js/dom.js' && !allowRaw && /\.(innerHTML|outerHTML)\s*=|insertAdjacentHTML\s*\(/.test(line)) at(i + 1, 'build DOM with h() from dom.js; raw HTML only goes through the sanitizer');
    });
  }
  return problems;
}

export function lintFiles(files) {
  const problems = [];
  for (const f of files) {
    if (BINARY.has(extname(f).toLowerCase())) continue;
    let buf;
    try { buf = readFileSync(join(ROOT, f)); } catch { continue; } // deleted but still listed
    const text = buf.toString('utf8');
    if (Buffer.compare(Buffer.from(text, 'utf8'), buf) !== 0) { problems.push(`${f}:1: not valid UTF-8`); continue; }
    problems.push(...lintText(f, text));
  }
  return problems;
}

export function trackedFiles() {
  return execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' }).split('\0').filter(Boolean);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = process.argv.length > 2 ? process.argv.slice(2) : trackedFiles();
  const problems = lintFiles(files);
  for (const p of problems) console.error(p);
  console.log(`Lint: ${files.length} files, ${problems.length} problem(s).`);
  process.exit(problems.length ? 1 : 0);
}
