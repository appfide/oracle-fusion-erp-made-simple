/**
 * Progress + settings storage.
 *
 * PRIVACY: everything stays in this browser's localStorage under one key.
 * Nothing is ever sent anywhere. No cookies, no analytics, no accounts.
 * If storage is unavailable (private mode, blocked), we fall back to memory
 * so the app still works for the current visit.
 */

const KEY = 'erp-made-simple:v1';
const SCHEMA = 1;

const DEFAULT_SETTINGS = {
  theme: 'system',        // 'system' | 'light' | 'dark'
  textSize: 'm',          // 's' | 'm' | 'l' | 'xl'
  reduceMotion: false,
  autoComplete: true,     // mark a lesson complete when its quiz is passed
  passMark: 70,           // percent needed to pass a quiz
  layout: 'steps',        // 'steps' (one step at a time, like a codelab) | 'page' (one long page)
};

const fresh = () => ({
  schema: SCHEMA,
  completed: {},          // { 'payables/suppliers': ISO date }
  quizzes: {},            // { 'payables/suppliers': { best, last, total, at } }
  visited: {},            // { 'payables/suppliers': ISO date }
  exercises: {},          // { 'payables/suppliers#7': ISO date } — hands-on blocks solved
  steps: {},              // { 'payables/suppliers': 3 } — last step viewed (0-based)
  last: null,             // 'payables/suppliers'
  certificateName: '',
  settings: { ...DEFAULT_SETTINGS },
  startedAt: new Date().toISOString(),
});

let memory = null;
let storageOk = true;
const listeners = new Set();

function readRaw() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    storageOk = false;
    return null;
  }
}

/** Allowed values for each setting; anything else (old or hand-edited backups) falls back to the default. */
const SETTING_RULES = {
  theme: (v) => ['system', 'light', 'dark'].includes(v),
  textSize: (v) => ['s', 'm', 'l', 'xl'].includes(v),
  reduceMotion: (v) => typeof v === 'boolean',
  autoComplete: (v) => typeof v === 'boolean',
  passMark: (v) => Number.isInteger(v) && v >= 1 && v <= 100,
  layout: (v) => ['steps', 'page'].includes(v),
};

const isRecord = (v) => Boolean(v) && typeof v === 'object' && !Array.isArray(v);
const count = (v) => (Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
/** Copy own, non-dangerous keys only (backups are untrusted input). */
const record = (v) => {
  const out = {};
  if (!isRecord(v)) return out;
  for (const k of Object.keys(v)) if (k !== '__proto__' && k !== 'constructor' && k !== 'prototype') out[k] = v[k];
  return out;
};

/** { id: ISO date } maps: keep entries whose value is a date string. */
const dates = (v) => Object.fromEntries(Object.entries(record(v)).filter(([, d]) => typeof d === 'string' && d && !Number.isNaN(Date.parse(d))));

function normalize(data) {
  const base = fresh();
  if (!isRecord(data)) return base;
  const settings = { ...DEFAULT_SETTINGS };
  const saved = record(data.settings);
  for (const [k, ok] of Object.entries(SETTING_RULES)) if (ok(saved[k])) settings[k] = saved[k];
  return {
    ...base,
    completed: dates(data.completed),
    quizzes: Object.fromEntries(Object.entries(record(data.quizzes)).filter(([, q]) => isRecord(q)).map(([id, q]) => [id, {
      best: count(q.best), last: count(q.last), total: count(q.total), attempts: count(q.attempts) || 1,
      at: typeof q.at === 'string' ? q.at : '',
    }])),
    visited: dates(data.visited),
    exercises: dates(data.exercises),
    steps: Object.fromEntries(Object.entries(record(data.steps)).filter(([, n]) => Number.isInteger(n) && n >= 0)),
    last: typeof data.last === 'string' ? data.last : null,
    certificateName: typeof data.certificateName === 'string' ? data.certificateName.slice(0, 80) : '',
    settings,
    startedAt: typeof data.startedAt === 'string' ? data.startedAt : base.startedAt,
    schema: SCHEMA,
  };
}

function load() {
  if (!memory) memory = normalize(readRaw());
  return memory;
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(memory));
    storageOk = true;
  } catch {
    storageOk = false;
  }
  listeners.forEach((fn) => fn(memory));
}

// Keep several open tabs in sync.
window.addEventListener('storage', (e) => {
  if (e.key !== KEY) return;
  memory = normalize(readRaw());
  listeners.forEach((fn) => fn(memory));
});

export const store = {
  get state() { return load(); },
  get settings() { return load().settings; },
  get storageAvailable() { load(); return storageOk; },

  onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },

  isComplete(id) { return Object.hasOwn(load().completed, id); },

  setComplete(id, done = true) {
    const s = load();
    if (done) s.completed[id] = Object.hasOwn(s.completed, id) ? s.completed[id] : new Date().toISOString();
    else delete s.completed[id];
    save();
  },

  visit(id) {
    const s = load();
    s.visited[id] = new Date().toISOString();
    s.last = id;
    save();
  },

  isExerciseDone(key) { return Object.hasOwn(load().exercises, key); },

  setExerciseDone(key) {
    const s = load();
    if (!Object.hasOwn(s.exercises, key)) { s.exercises[key] = new Date().toISOString(); save(); }
  },

  getStep(id) { return Object.hasOwn(load().steps, id) ? load().steps[id] : 0; },

  setStep(id, n) {
    const s = load();
    if (s.steps[id] === n) return;
    s.steps[id] = n;
    save();
  },

  recordQuiz(id, score, total) {
    const s = load();
    const prev = Object.hasOwn(s.quizzes, id) ? s.quizzes[id] : null;
    s.quizzes[id] = {
      best: Math.max(prev ? prev.best : 0, score),
      last: score,
      total,
      attempts: (prev ? prev.attempts || 1 : 0) + 1,
      at: new Date().toISOString(),
    };
    save();
    return s.quizzes[id];
  },

  updateSettings(patch) {
    const s = load();
    s.settings = { ...s.settings, ...patch };
    save();
  },

  setCertificateName(name) {
    load().certificateName = String(name || '').slice(0, 80);
    save();
  },

  /** Clear learning progress but keep settings. */
  resetProgress() {
    const keep = load().settings;
    memory = fresh();
    memory.settings = keep;
    save();
  },

  /** Clear absolutely everything this app stored. */
  resetAll() {
    memory = fresh();
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
    listeners.forEach((fn) => fn(memory));
  },

  exportJSON() {
    return JSON.stringify({ app: 'erp-made-simple', exportedAt: new Date().toISOString(), data: load() }, null, 2);
  },

  importJSON(text) {
    const parsed = JSON.parse(text);
    const data = parsed && parsed.app === 'erp-made-simple' ? parsed.data : parsed;
    if (!isRecord(data) || !isRecord(data.completed)) {
      throw new Error('This file does not look like a progress backup from this app.');
    }
    memory = normalize(data);
    save();
  },
};
