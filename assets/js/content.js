/**
 * Content loading: lessons are ES modules loaded on demand and cached.
 */
import { curriculum, lessonId } from '../../content/curriculum.js';
import { textOf } from './dom.js';

export { curriculum, lessonId };

const cache = new Map();

/** Flat ordered list of every lesson entry with its module. */
export const allEntries = curriculum.flatMap((m, mi) =>
  m.lessons.map((l, li) => ({ ...l, module: m, moduleIndex: mi, index: li, id: lessonId(m.id, l.slug) })),
);

export const totalLessons = allEntries.length;

export const findModule = (id) => curriculum.find((m) => m.id === id);
export const findEntry = (id) => allEntries.find((e) => e.id === id);

export function neighbours(id) {
  const i = allEntries.findIndex((e) => e.id === id);
  return { prev: i > 0 ? allEntries[i - 1] : null, next: i >= 0 && i < allEntries.length - 1 ? allEntries[i + 1] : null };
}

/** Load a lesson module. Returns null if the file is missing (lesson "coming soon"). */
export async function loadLesson(moduleId, slug) {
  const id = lessonId(moduleId, slug);
  if (cache.has(id)) return cache.get(id);
  const p = import(`../../content/lessons/${moduleId}/${slug}.js`)
    .then((mod) => mod.default)
    .catch((e) => {
      console.warn(`Lesson ${id} could not be loaded`, e);
      cache.delete(id);
      return null;
    });
  cache.set(id, p);
  return p;
}

export function loadModuleLessons(moduleId) {
  const m = findModule(moduleId);
  return Promise.all(m.lessons.map((l) => loadLesson(m.id, l.slug)));
}

let everything = null;
/** Load every lesson (for search, glossary, sources). */
export function loadAll() {
  if (!everything) {
    everything = Promise.all(allEntries.map(async (e) => ({ entry: e, lesson: await loadLesson(e.module.id, e.slug) })));
  }
  return everything;
}

/** Plain-text of a whole lesson, for searching. */
export function lessonText(lesson) {
  if (!lesson) return '';
  const parts = [lesson.title, lesson.summary, ...(lesson.objectives || [])];
  for (const b of lesson.blocks || []) {
    parts.push(b.title, b.heading, b.caption);
    ['html', 'result', 'note'].forEach((f) => b[f] && parts.push(textOf(b[f])));
    (b.slides || []).forEach((s) => parts.push(s.title, textOf(s.html)));
    (b.steps || []).forEach((s) => parts.push(typeof s === 'string' ? textOf(s) : `${s.label} ${s.detail || ''}`));
    (b.items || []).forEach((s) => parts.push(typeof s === 'string' ? textOf(s) : `${s.term} ${s.def}`));
    (b.rows || []).forEach((r) => parts.push(r.map(textOf).join(' ')));
    (b.lines || []).forEach((l) => parts.push(l.account));
    (b.questions || []).forEach((q) => parts.push(q.q));
  }
  return parts.filter(Boolean).join(' \n ');
}

/** All glossary terms, de-duplicated by term (first definition wins). */
export async function glossary() {
  const all = await loadAll();
  const map = new Map();
  for (const { entry, lesson } of all) {
    if (!lesson) continue;
    for (const b of lesson.blocks || []) {
      if (b.type !== 'terms') continue;
      for (const t of b.items || []) {
        const key = t.term.trim().toLowerCase();
        if (!map.has(key)) map.set(key, { term: t.term.trim(), def: t.def, lessons: [entry] });
        else if (!map.get(key).lessons.some((x) => x.id === entry.id)) map.get(key).lessons.push(entry);
      }
    }
  }
  return [...map.values()].sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));
}

/** All sources, grouped by URL with the lessons that cite them. */
export async function sources() {
  const all = await loadAll();
  const map = new Map();
  for (const { entry, lesson } of all) {
    if (!lesson) continue;
    for (const s of lesson.sources || []) {
      const key = s.url.replace(/[#?].*$/, '').replace(/\/$/, '');
      if (!map.has(key)) map.set(key, { ...s, lessons: [entry] });
      else if (!map.get(key).lessons.some((x) => x.id === entry.id)) map.get(key).lessons.push(entry);
    }
  }
  return [...map.values()];
}
