/**
 * Progress storage (assets/js/store.js): saves locally, survives blocked storage, and
 * treats imported backup files as untrusted input.
 */
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Minimal browser globals for store.js.
const mem = new Map();
let blocked = false;
globalThis.localStorage = {
  getItem: (k) => { if (blocked) throw new Error('blocked'); return mem.has(k) ? mem.get(k) : null; },
  setItem: (k, v) => { if (blocked) throw new Error('blocked'); mem.set(k, String(v)); },
  removeItem: (k) => { if (blocked) throw new Error('blocked'); mem.delete(k); },
};
globalThis.window = { addEventListener() {} };

const { store } = await import('../assets/js/store.js');
const KEY = 'erp-made-simple:v1';

beforeEach(() => { blocked = false; store.resetAll(); mem.clear(); });

test('starts empty with default settings', () => {
  assert.deepEqual(store.state.completed, {});
  assert.equal(store.settings.theme, 'system');
  assert.equal(store.settings.passMark, 70);
});

test('saves progress under one localStorage key only', () => {
  store.setComplete('basics/what-is-erp');
  store.recordQuiz('basics/what-is-erp', 4, 5);
  assert.deepEqual([...mem.keys()], [KEY]);
  const saved = JSON.parse(mem.get(KEY));
  assert.ok(saved.completed['basics/what-is-erp']);
  assert.equal(saved.quizzes['basics/what-is-erp'].best, 4);
});

test('quiz keeps the best score and counts attempts', () => {
  store.recordQuiz('x/y', 3, 5);
  store.recordQuiz('x/y', 5, 5);
  const q = store.recordQuiz('x/y', 2, 5);
  assert.equal(q.best, 5);
  assert.equal(q.last, 2);
  assert.equal(q.attempts, 3);
});

test('export then import restores the same progress', () => {
  store.setComplete('payables/suppliers');
  store.updateSettings({ theme: 'dark' });
  const backup = store.exportJSON();
  store.resetAll();
  store.importJSON(backup);
  assert.ok(store.isComplete('payables/suppliers'));
  assert.equal(store.settings.theme, 'dark');
});

test('import rejects files that are not progress backups', () => {
  for (const bad of ['null', '[]', '"text"', '{}', '{"app":"erp-made-simple","data":null}']) {
    assert.throws(() => store.importJSON(bad), /does not look like a progress backup/, bad);
  }
  assert.throws(() => store.importJSON('not json'), SyntaxError);
});

test('import cannot pollute object prototypes', () => {
  store.importJSON('{"completed":{},"__proto__":{"polluted":true},"settings":{"__proto__":{"polluted":true}},"constructor":{"prototype":{"polluted":true}}}');
  assert.equal({}.polluted, undefined);
  assert.equal(Object.prototype.polluted, undefined);
});

test('import cannot change the schema version', () => {
  store.importJSON('{"completed":{},"schema":999}');
  assert.equal(store.state.schema, 1);
});

test('certificate name is capped at 80 characters', () => {
  store.setCertificateName('A'.repeat(500));
  assert.equal(store.state.certificateName.length, 80);
});

test('reset progress keeps settings; reset all clears storage', () => {
  store.updateSettings({ textSize: 'xl' });
  store.setComplete('a/b');
  store.resetProgress();
  assert.equal(store.isComplete('a/b'), false);
  assert.equal(store.settings.textSize, 'xl');
  store.resetAll();
  assert.equal(mem.has(KEY), false);
});

test('keeps working in memory when storage is blocked (private mode)', () => {
  blocked = true;
  store.setComplete('basics/money-words');
  assert.ok(store.isComplete('basics/money-words'));
  assert.equal(store.storageAvailable, false);
});

test('import ignores invalid settings and wrong types instead of keeping them', () => {
  store.importJSON(JSON.stringify({
    completed: {}, visited: [1, 2], quizzes: { 'a/b': { best: 'x', total: null }, 'c/d': 'oops' }, steps: { 'a/b': -3, 'c/d': 2 },
    certificateName: { name: 'x' }, last: 42,
    settings: { theme: '"><script>', textSize: 'huge', passMark: 'abc', layout: 'page', reduceMotion: 'yes', autoComplete: false },
  }));
  const st = store.state;
  assert.deepEqual(st.visited, {});
  assert.deepEqual(Object.keys(st.quizzes), ['a/b']);
  assert.equal(st.quizzes['a/b'].best, 0);
  assert.deepEqual(st.steps, { 'c/d': 2 });
  assert.equal(st.certificateName, '');
  assert.equal(st.last, null);
  assert.deepEqual(st.settings, { theme: 'system', textSize: 'm', reduceMotion: false, autoComplete: false, passMark: 70, layout: 'page' });
});

test('import rejects a backup whose completed list is not an object', () => {
  for (const bad of ['{"completed":null}', '{"completed":[]}', '{"completed":"x"}']) {
    assert.throws(() => store.importJSON(bad), /does not look like a progress backup/, bad);
  }
});

test('a broken value already in storage is repaired on load', async () => {
  mem.set(KEY, JSON.stringify({ completed: { 'a/b': '2026-01-01' }, settings: { theme: 7, passMark: 1e9 } }));
  const fresh = await import(`../assets/js/store.js?reload=${Date.now()}`);
  assert.ok(fresh.store.isComplete('a/b'));
  assert.equal(fresh.store.settings.theme, 'system');
  assert.equal(fresh.store.settings.passMark, 70);
});
