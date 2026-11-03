/**
 * Fuzzes the real HTML sanitizer: builds thousands of random, malformed and hostile HTML
 * strings from a seeded generator and checks that what reaches the DOM is always safe.
 * Opened by tests/browser.test.mjs as fuzz.html?seed=N&n=COUNT.
 */
import { sanitize } from '../../assets/js/dom.js';

const params = new URLSearchParams(location.search);
const seed = Number(params.get('seed')) >>> 0;
const count = Number(params.get('n')) || 2000;

// mulberry32: small, fast, reproducible PRNG
let s = seed;
const rand = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const pick = (a) => a[Math.floor(rand() * a.length)];

const TAGS = ['p', 'strong', 'em', 'b', 'i', 'ul', 'ol', 'li', 'code', 'br', 'a', 'kbd', 'span', // allowed
  'script', 'img', 'svg', 'iframe', 'style', 'form', 'input', 'object', 'embed', 'math', 'mglyph', 'noscript', 'table',
  'template', 'textarea', 'title', 'xmp', 'select', 'option', 'video', 'audio', 'source', 'link', 'meta', 'base', 'details', 'marquee', 'body', 'html'];
const ATTRS = ['href', 'src', 'class', 'style', 'onclick', 'onerror', 'onload', 'onmouseover', 'onfocus', 'autofocus', 'srcdoc',
  'formaction', 'action', 'xlink:href', 'data', 'id', 'name', 'target', 'rel', 'title', 'open', 'ontoggle', 'background', 'poster'];
const VALUES = ['https://ok.example', 'http://insecure.example', 'javascript:window.__xss=1', 'JaVaScRiPt:window.__xss=1',
  ' javascript:window.__xss=1', 'java&#x09;script:window.__xss=1', 'data:text/html,<script>window.__xss=1</script>', 'vbscript:x',
  'hl', 'evil', 'window.__xss=1', 'x', '"><img src=x onerror=window.__xss=1>', "'", '"', '`', '', 'https://ok.example/"onmouseover="window.__xss=1'];
const TEXT = ['hello', '&lt;script&gt;', '&amp;', '<', '>', '"', "'", '<!--', '-->', '<![CDATA[', ']]>', '</', '/>', '=', ' ', '\n', '\u0000', '😀', '&#0;', '&#x3c;'];

function attr() {
  const v = pick(VALUES);
  const q = pick(['"', "'", '']);
  return ` ${pick(ATTRS)}=${q}${q ? v.replaceAll(q, '') : v.replace(/[\s>]/g, '')}${q}`;
}
function node(depth) {
  const r = rand();
  if (depth > 4 || r < 0.25) return pick(TEXT);
  if (r < 0.3) return `<!--${pick(TEXT)}-->`;
  const tag = pick(TAGS);
  let open = `<${tag}`;
  for (let i = Math.floor(rand() * 3); i > 0; i--) open += attr();
  open += rand() < 0.1 ? '/>' : '>';
  let inner = '';
  for (let i = Math.floor(rand() * 4); i > 0; i--) inner += node(depth + 1);
  return open + inner + (rand() < 0.8 ? `</${tag}>` : ''); // sometimes unclosed
}

const SAFE_TAGS = new Set(['P', 'STRONG', 'EM', 'B', 'I', 'UL', 'OL', 'LI', 'CODE', 'BR', 'A', 'KBD', 'SPAN']);
function violations(box) {
  const out = [];
  for (const el of box.querySelectorAll('*')) {
    if (!SAFE_TAGS.has(el.tagName)) out.push(`<${el.tagName}>`);
    for (const a of el.attributes) {
      const ok = (el.tagName === 'A' && ((a.name === 'href' && /^https:\/\//i.test(a.value)) || (a.name === 'target' && a.value === '_blank') || (a.name === 'rel' && a.value === 'noopener noreferrer')))
        || (el.tagName === 'SPAN' && a.name === 'class' && a.value === 'hl');
      if (!ok) out.push(`${el.tagName}[${a.name}="${a.value}"]`);
    }
  }
  return out;
}

const failures = [];
for (let i = 0; i < count; i++) {
  let input = '';
  for (let j = 1 + Math.floor(rand() * 3); j > 0; j--) input += node(0);
  const box = document.createElement('div');
  box.append(sanitize(input));
  document.body.append(box); // attached, so any surviving handler or load would fire
  const v = violations(box);
  if (v.length) failures.push({ input, problems: v });
  box.remove();
}

setTimeout(() => { window.__fuzz = { seed, count, failures: failures.slice(0, 5), failed: failures.length, xss: window.__xss === 1 }; }, 500);
