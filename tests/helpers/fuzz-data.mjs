/**
 * Seeded random generator of progress backups for the fuzz tests: mostly well-formed,
 * often malformed, sometimes hostile (prototype-pollution keys, script, huge values).
 * Set FUZZ_SEED to reproduce a run.
 */
export const SEED = Number(process.env.FUZZ_SEED ?? Math.floor(Math.random() * 2 ** 31));
let s = SEED >>> 0;
const rand = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const pick = (a) => a[Math.floor(rand() * a.length)];

const KEYS = ['completed', 'quizzes', 'visited', 'exercises', 'steps', 'settings', 'last', 'certificateName', 'schema', 'startedAt',
  'app', 'data', '__proto__', 'constructor', 'prototype', 'toString', 'hasOwnProperty', 'theme', 'textSize', 'passMark', 'layout',
  'basics/what-is-erp', 'best', 'total', '', ' ', '<script>', 'x'.repeat(300)];
const STRINGS = ['', 'dark', 'light', 'page', 'steps', 'xl', '<img src=x onerror=alert(1)>', '"><script>alert(1)</script>', 'javascript:alert(1)',
  '\u0000', '😀'.repeat(50), 'a'.repeat(5000), '2026-01-01T00:00:00.000Z', 'NaN', '__proto__', 'erp-made-simple'];

function value(depth) {
  const r = rand();
  if (depth > 4 || r < 0.35) return pick([null, true, false, 0, -1, 1e308, -0, 3.14, 70, ...STRINGS]);
  if (r < 0.5) return Array.from({ length: Math.floor(rand() * 4) }, () => value(depth + 1));
  const o = {};
  for (let i = Math.floor(rand() * 6); i > 0; i--) {
    const k = pick(KEYS);
    o[k === '__proto__' ? '__proto__x' : k] = value(depth + 1); // marker: see backupText()
  }
  return o;
}
/** A backup shaped like the real thing, with every field given a random (often wrong) value. */
function shaped() {
  const settings = {};
  for (const k of ['theme', 'textSize', 'reduceMotion', 'autoComplete', 'passMark', 'layout', '__proto__x', 'extra']) if (rand() < 0.7) settings[k] = value(2);
  const ids = () => Object.fromEntries(Array.from({ length: Math.floor(rand() * 4) }, () => [pick(['basics/what-is-erp', 'payables/suppliers', 'x/y', '__proto__x', 'constructor']), value(3)]));
  const o = { completed: rand() < 0.9 ? ids() : value(1), quizzes: ids(), visited: ids(), exercises: ids(), steps: ids(), settings,
    last: value(2), certificateName: value(2), startedAt: value(2), schema: value(2) };
  for (const k of Object.keys(o)) if (k !== 'completed' && rand() < 0.15) delete o[k];
  return o;
}

export function backupText() {
  const r = rand();
  if (r >= 0.1 && r < 0.55) return JSON.stringify(rand() < 0.8 ? shaped() : { app: 'erp-made-simple', data: shaped() }).replaceAll('"__proto__x"', '"__proto__"');
  if (r < 0.1) return pick(['', 'null', '{', '[]', '"x"', '{"completed":', 'undefined', '\u0000', '{"__proto__":{"polluted":1},"completed":{}}']);
  let obj = value(0);
  if (r < 0.6 && obj && typeof obj === 'object' && !Array.isArray(obj)) obj.completed = value(1) ?? {};
  if (r > 0.85) obj = { app: 'erp-made-simple', data: obj };
  // o['__proto__'] = v would set the prototype, not a key; write the marker back as a real
  // "__proto__" key in the JSON text so JSON.parse creates it as an own property
  return JSON.stringify(obj).replaceAll('"__proto__x"', '"__proto__"');
}
