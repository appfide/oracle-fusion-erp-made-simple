/**
 * Fuzz tests for progress backups (assets/js/store.js), the one place the app accepts a
 * file from outside. Thousands of random, malformed and hostile inputs must either be
 * rejected cleanly or produce a well-formed state, and must never pollute prototypes.
 * The sanitizer and router fuzzers run in a real browser (tests/browser.test.mjs).
 *
 * Reproduce a failure with the printed seed:  FUZZ_SEED=1234 npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

const mem = new Map();
globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
globalThis.window ??= { addEventListener() {} };
const { store } = await import('../assets/js/store.js');

const { SEED, backupText } = await import('./helpers/fuzz-data.mjs');

test(`progress import survives 5000 random and hostile backups (seed ${SEED})`, () => {
  const isPlainObject = (v) => v && typeof v === 'object' && !Array.isArray(v);
  let accepted = 0, rejected = 0, hostileKeys = 0;
  for (let i = 0; i < 5000; i++) {
    const text = backupText();
    if (text.includes('"__proto__"')) hostileKeys++;
    store.resetAll();
    try {
      store.importJSON(text);
      accepted++;
    } catch (e) {
      rejected++;
      assert.ok(e instanceof SyntaxError || /does not look like a progress backup/.test(e.message), `unexpected error for ${text.slice(0, 200)}: ${e.stack}`);
      continue;
    }
    const st = store.state;
    assert.equal(st.schema, 1, `schema changed by ${text.slice(0, 200)}`);
    for (const k of ['completed', 'quizzes', 'visited', 'exercises', 'steps', 'settings']) {
      assert.ok(isPlainObject(st[k]) || Array.isArray(st[k]), `state.${k} is not an object after ${text.slice(0, 200)}`);
    }
    // Every value the views read has the type and range they expect.
    const set = st.settings;
    assert.ok(['system', 'light', 'dark'].includes(set.theme), `bad theme ${set.theme}`);
    assert.ok(['s', 'm', 'l', 'xl'].includes(set.textSize), `bad textSize ${set.textSize}`);
    assert.ok(['steps', 'page'].includes(set.layout), `bad layout ${set.layout}`);
    assert.ok(Number.isInteger(set.passMark) && set.passMark >= 1 && set.passMark <= 100, `bad passMark ${set.passMark}`);
    assert.equal(typeof set.reduceMotion, 'boolean');
    assert.equal(typeof set.autoComplete, 'boolean');
    assert.ok(typeof st.certificateName === 'string' && st.certificateName.length <= 80, 'bad certificateName');
    assert.ok(st.last === null || typeof st.last === 'string', 'bad last');
    for (const q of Object.values(st.quizzes)) for (const k of ['best', 'last', 'total', 'attempts']) assert.ok(Number.isFinite(q[k]), `quiz.${k} not a number`);
    for (const n of Object.values(st.steps)) assert.ok(Number.isInteger(n) && n >= 0, 'bad step');
    // The app keeps working with whatever was imported.
    store.setComplete('basics/what-is-erp');
    store.recordQuiz('basics/what-is-erp', 1, 2);
    assert.ok(store.isComplete('basics/what-is-erp'));
    JSON.parse(store.exportJSON());
  }
  // The generator must really exercise both paths and the prototype-pollution keys.
  assert.ok(accepted > 500 && rejected > 100 && hostileKeys > 100, `weak fuzz run: ${accepted} accepted, ${rejected} rejected, ${hostileKeys} with __proto__`);
  assert.equal({}.polluted, undefined, 'Object.prototype was polluted');
  assert.equal(Object.prototype.polluted, undefined, 'Object.prototype was polluted');
});
