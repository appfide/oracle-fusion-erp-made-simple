/**
 * Page views. Each view returns a DOM node (or a Promise of one).
 */
import { h, icon, toast, announce } from './dom.js';
import { store } from './store.js';
import { APP, ORACLE } from './config.js';
import { renderBlock, stepTitle } from './blocks.js';
import { LABS, renderLab } from './interactive.js';
import {
  curriculum, allEntries, totalLessons, findModule, findEntry, neighbours,
  loadLesson, loadModuleLessons, loadAll, lessonText, glossary, sources, lessonId,
} from './content.js';

/* ---------------------------------------------------------------- helpers */

const link = (href, attrs, ...kids) => h('a', { href, ...attrs }, ...kids);
const lessonHref = (e) => `#/lesson/${e.module.id}/${e.slug}`;

function moduleStats(m) {
  const done = m.lessons.filter((l) => store.isComplete(lessonId(m.id, l.slug))).length;
  return { done, total: m.lessons.length, pct: Math.round((done / m.lessons.length) * 100) };
}

function overallStats() {
  const done = allEntries.filter((e) => store.isComplete(e.id)).length;
  return { done, total: totalLessons, pct: Math.round((done / totalLessons) * 100) };
}

/** The lesson the learner should open next. */
export function nextLesson() {
  const last = store.state.last && findEntry(store.state.last);
  if (last && !store.isComplete(last.id)) return last;
  const startAt = last ? allEntries.indexOf(last) : 0;
  return allEntries.slice(startAt).find((e) => !store.isComplete(e.id))
    || allEntries.find((e) => !store.isComplete(e.id))
    || null;
}

function ring(pct, size = 120, label = '') {
  const r = 52;
  const c = 2 * Math.PI * r;
  const wrap = h('div', { class: 'ring', role: 'img', 'aria-label': `${pct}% complete${label ? ` ${label}` : ''}` });
  wrap.style.setProperty('--size', `${size}px`);
  // lint-allow raw-html: static SVG, numbers only (reviewed; counted in tests/static.test.mjs)
  wrap.innerHTML = `<svg viewBox="0 0 120 120" aria-hidden="true"><circle class="ring-bg" cx="60" cy="60" r="${r}"/><circle class="ring-fg" cx="60" cy="60" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c - (pct / 100) * c}"/></svg>`;
  wrap.append(h('div', { class: 'ring-label' }, h('strong', {}, `${pct}%`), label && h('span', {}, label)));
  return wrap;
}

function bar(pct, color) {
  const b = h('div', { class: 'bar', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(pct), 'aria-label': `${pct}% complete` }, h('span'));
  b.style.setProperty('--p', `${pct}%`);
  if (color) b.style.setProperty('--c', color);
  return b;
}

function statusOf(id) {
  if (store.isComplete(id)) return { cls: 'done', label: 'Completed', glyph: '✓' };
  if (Object.hasOwn(store.state.visited, id)) return { cls: 'started', label: 'Started', glyph: '•' };
  return { cls: 'todo', label: 'Not started', glyph: '' };
}

function pageHead(kicker, title, lead) {
  return h('header', { class: 'page-head' },
    kicker && h('p', { class: 'kicker' }, kicker),
    h('h1', { tabindex: '-1' }, title),
    lead && h('p', { class: 'lead' }, lead));
}

/* ---------------------------------------------------------------- home */

export function homeView() {
  const s = overallStats();
  const nxt = nextLesson();
  const started = s.done > 0 || store.state.last;

  const hero = h('section', { class: 'hero' },
    h('div', { class: 'hero-text' },
      h('p', { class: 'kicker' }, '🍋 Free · Open source · No sign-up'),
      h('h1', { tabindex: '-1' }, 'Learn Oracle Fusion Cloud ERP, step by step.'),
      h('p', { class: 'lead' },
        'Explained so simply that a 10-year-old could follow — yet deep enough to use at work. Start with the basics, master Accounts Payable, then explore the rest of the system.'),
      link('#/about', { class: 'release-badge', title: ORACLE.rollout }, icon('check', 16), `Matches Oracle release ${ORACLE.release} · checked ${ORACLE.checked}`),
      h('div', { class: 'hero-actions' },
        nxt
          ? link(lessonHref(nxt), { class: 'btn btn-primary btn-lg' }, icon('play'), started ? 'Continue learning' : 'Start the first lesson')
          : link('#/certificate', { class: 'btn btn-primary btn-lg' }, icon('award'), 'Get your certificate'),
        link('#/about', { class: 'btn btn-lg' }, 'How this guide works')),
      nxt && started && h('p', { class: 'muted hero-next' }, 'Up next: ', link(lessonHref(nxt), {}, `${nxt.module.icon} ${nxt.title}`))),
    h('div', { class: 'hero-progress' },
      ring(s.pct, 168, 'complete'),
      h('div', {},
        h('p', {}, h('strong', {}, `${s.done} of ${s.total}`), ' lessons done'),
        h('p', { class: 'muted small' }, '🔒 Saved only in this browser'))));

  const path = h('section', { class: 'path', 'aria-labelledby': 'path-h' },
    h('h2', { id: 'path-h' }, 'Your learning path'),
    h('ol', { class: 'path-steps' },
      h('li', {}, h('span', { class: 'path-n' }, '1'), h('div', {}, h('strong', {}, 'The Basics'), h('p', {}, 'What an ERP is, money words, moving around the screens, and the building blocks.'))),
      h('li', {}, h('span', { class: 'path-n' }, '2'), h('div', {}, h('strong', {}, 'Accounts Payable'), h('p', {}, 'Suppliers, invoices, matching, holds, approvals, payments and month-end — in depth.'))),
      h('li', {}, h('span', { class: 'path-n' }, '3'), h('div', {}, h('strong', {}, 'Everything else'), h('p', {}, 'Following the money: Procurement, Expenses, Receivables, Cash, Assets, then the General Ledger where it all comes together. Then reports, data and AI.')))));

  const grid = h('section', { class: 'modules', 'aria-labelledby': 'mods-h' },
    h('h2', { id: 'mods-h' }, 'All modules'),
    h('div', { class: 'module-grid' }, curriculum.map((m, i) => moduleCard(m, i))));

  const labs = h('section', { class: 'home-labs', 'aria-labelledby': 'labs-h' },
    h('div', {},
      h('p', { class: 'kicker' }, 'Learn by doing'),
      h('h2', { id: 'labs-h' }, 'Practice Lab'),
      h('p', { class: 'muted' }, 'Every lesson has hands-on exercises: practice screens, journal builders, put-in-order and matching games. The Practice Lab adds simulators you can play with any time.'),
      link('#/lab', { class: 'btn btn-primary' }, icon('flask'), 'Open the Practice Lab')),
    h('div', { class: 'home-lab-chips' }, Object.entries(LABS).map(([k, lab]) => link(`#/lab/${k}`, { class: 'lab-chip' }, h('span', { 'aria-hidden': 'true' }, lab.icon), lab.title))));

  return h('div', { class: 'home' }, hero, path, labs, grid);
}

function moduleCard(m, i) {
  const st = moduleStats(m);
  const state = st.done === st.total ? 'Done 🎉' : st.done ? 'In progress' : 'Not started';
  const card = link(`#/module/${m.id}`, { class: 'module-card' },
    h('div', { class: 'mc-top' },
      h('span', { class: 'mc-icon', 'aria-hidden': 'true' }, m.icon),
      h('span', { class: 'mc-num' }, `Module ${i + 1}`),
      i < 2 && h('span', { class: 'chip' }, i === 0 ? 'Start here' : 'Core focus')),
    h('h3', {}, m.title),
    h('p', {}, m.description),
    h('div', { class: 'mc-foot' }, h('span', {}, `${st.done}/${st.total} lessons · ${state}`), bar(st.pct, m.color)));
  card.style.setProperty('--accent', m.color);
  return card;
}

/* ---------------------------------------------------------------- module */

export async function moduleView(id) {
  const m = findModule(id);
  if (!m) return notFoundView();
  const lessons = await loadModuleLessons(id);
  const st = moduleStats(m);
  const idx = curriculum.indexOf(m);
  const firstOpen = m.lessons.find((l) => !store.isComplete(lessonId(m.id, l.slug))) || m.lessons[0];
  const totalMin = lessons.reduce((a, l) => a + (l ? l.minutes : 0), 0);

  const head = h('header', { class: 'module-head' },
    h('nav', { class: 'crumbs', 'aria-label': 'Breadcrumb' }, link('#/', {}, 'Home'), ' / ', h('span', { 'aria-current': 'page' }, m.short)),
    h('div', { class: 'module-head-row' },
      h('div', {},
        h('p', { class: 'kicker' }, `${m.icon} Module ${idx + 1} of ${curriculum.length}`),
        h('h1', { tabindex: '-1' }, m.title),
        h('p', { class: 'lead' }, m.description),
        h('p', { class: 'muted' }, `${m.lessons.length} lessons${totalMin ? ` · about ${Math.round(totalMin / 5) * 5 || totalMin} minutes` : ''}`),
        link(`#/lesson/${m.id}/${firstOpen.slug}`, { class: 'btn btn-primary' }, icon('play'), st.done ? (st.done === st.total ? 'Review module' : 'Continue module') : 'Start module')),
      ring(st.pct, 120, `${st.done}/${st.total}`)));
  head.style.setProperty('--accent', m.color);

  const list = h('ol', { class: 'lesson-list' }, m.lessons.map((l, i) => {
    const lid = lessonId(m.id, l.slug);
    const lesson = lessons[i];
    const s = statusOf(lid);
    const q = store.state.quizzes[lid];
    return h('li', {},
      link(`#/lesson/${m.id}/${l.slug}`, { class: `lesson-row ${s.cls}` },
        h('span', { class: 'lr-status', 'aria-label': s.label, title: s.label }, s.glyph || String(i + 1)),
        h('span', { class: 'lr-body' },
          h('span', { class: 'lr-title' }, l.title),
          lesson ? h('span', { class: 'lr-summary' }, lesson.summary) : h('span', { class: 'lr-summary muted' }, 'Coming soon'),
          h('span', { class: 'lr-meta' },
            lesson && h('span', {}, icon('clock', 14), ` ${lesson.minutes} min`),
            q && h('span', {}, `Quiz best: ${q.best}/${q.total}`),
            h('span', { class: `pill ${s.cls}` }, s.label)))));
  }));

  return h('div', { class: 'module-page' }, head, list);
}

/* ---------------------------------------------------------------- lesson */

/** Split a lesson into codelab-style steps. */
function buildSteps(lesson) {
  const steps = [{ title: 'Overview', blocks: [], overview: true }];
  let seenKid = false;
  lesson.blocks.forEach((b, i) => {
    const t = stepTitle(b, b.type === 'kid' && !seenKid);
    if (b.type === 'kid') seenKid = true;
    if (t) steps.push({ title: t, blocks: [] });
    steps[steps.length - 1].blocks.push(i);
  });
  steps.push({ title: 'Wrap-up', blocks: [], wrap: true });
  // time weights: words + extra for hands-on work
  const weights = steps.map((s) => s.blocks.reduce((sum, i) => {
    const b = lesson.blocks[i];
    const words = lessonText({ blocks: [b] }).split(/\s+/).length;
    return sum + words + (['exercise', 'lab'].includes(b.type) ? 250 : b.type === 'quiz' ? 200 : 0);
  }, s.overview ? 60 : s.wrap ? 30 : 0));
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  steps.forEach((s, i) => { s.weight = weights[i] / total; s.hands = s.blocks.some((k) => ['exercise', 'lab'].includes(lesson.blocks[k].type)); });
  return steps;
}

const MAX_KEY = (id) => `${id}:max`;

export async function lessonView(moduleId, slug, params = new URLSearchParams()) {
  const m = findModule(moduleId);
  const entry = m && findEntry(lessonId(moduleId, slug));
  if (!entry) return notFoundView();
  const lesson = await loadLesson(moduleId, slug);
  const id = entry.id;
  const { prev, next } = neighbours(id);
  const base = `#/lesson/${m.id}/${slug}`;

  const crumbs = h('nav', { class: 'crumbs', 'aria-label': 'Breadcrumb' },
    link('#/', {}, 'Home'), ' / ', link(`#/module/${m.id}`, {}, m.short), ' / ', h('span', { 'aria-current': 'page' }, `Lesson ${entry.index + 1}`));

  if (!lesson) {
    return h('div', { class: 'narrow' }, crumbs,
      pageHead(`${m.short} · Lesson ${entry.index + 1}`, entry.title, 'This lesson is being written. Check back soon — or help write it on GitHub!'),
      link(APP.repo, { class: 'btn', target: '_blank', rel: 'noopener' }, icon('github'), 'Contribute'),
      navFooter(prev, next));
  }

  store.visit(id);
  const stepMode = store.settings.layout !== 'page';
  const steps = buildSteps(lesson);
  const requested = parseInt(params.get('step'), 10);
  const current = stepMode
    ? Math.min(steps.length - 1, Math.max(0, Number.isFinite(requested) ? requested - 1 : store.getStep(id)))
    : 0;
  if (stepMode) {
    store.setStep(id, current);
    if (current > (store.state.steps[MAX_KEY(id)] || 0)) store.setStep(MAX_KEY(id), current);
  }
  const furthest = store.state.steps[MAX_KEY(id)] || 0;
  const stepHref = (i) => `${base}?step=${i + 1}`;

  let refreshNav = () => {};

  /* --- completion box (shared) --- */
  const completeBox = h('div', { class: 'complete-box' });
  const renderComplete = () => {
    const done = store.isComplete(id);
    completeBox.className = `complete-box ${done ? 'is-done' : ''}`;
    completeBox.replaceChildren(
      h('div', {},
        h('strong', {}, done ? 'Lesson complete!' : 'Finished this lesson?'),
        h('p', { class: 'muted' }, done
          ? 'Nice work. Your progress is saved in this browser.'
          : store.settings.autoComplete ? 'Pass the quiz, or mark the lesson complete yourself.' : 'Mark the lesson complete when you are ready.')),
      done
        ? h('button', { class: 'btn', type: 'button', onclick: () => { store.setComplete(id, false); renderComplete(); refreshNav(); } }, 'Mark as not complete')
        : h('button', { class: 'btn btn-primary', type: 'button', onclick: () => { store.setComplete(id, true); renderComplete(); refreshNav(); announce('Lesson marked complete'); toast('Lesson marked complete'); } }, icon('check'), 'Mark lesson complete'));
  };
  renderComplete();

  const ctx = {
    id,
    onQuizDone: ({ passed }) => {
      if (passed && store.settings.autoComplete && !store.isComplete(id)) {
        store.setComplete(id, true);
        toast('Quiz passed — lesson complete!');
      }
      renderComplete();
      refreshNav();
    },
  };
  const blockEl = (i) => renderBlock(lesson.blocks[i], { ...ctx, index: i });

  const objectives = lesson.objectives?.length && h('section', { class: 'objectives' },
    h('h2', {}, 'What you’ll learn'),
    h('ul', { class: 'ticks' }, lesson.objectives.map((o) => h('li', {}, o))));

  const handsOn = lesson.blocks.filter((b) => ['exercise', 'lab'].includes(b.type)).length;
  const needs = h('section', { class: 'objectives needs' },
    h('h2', {}, 'What you’ll need'),
    h('ul', { class: 'ticks' },
      h('li', {}, 'Just this browser — no Oracle account needed.'),
      handsOn ? h('li', {}, `${handsOn} hands-on exercise${handsOn > 1 ? 's' : ''} to try right here.`) : null,
      h('li', {}, 'A short quiz at the end to check yourself.')));

  const srcs = h('section', { class: 'lesson-sources', 'aria-labelledby': 'src-h' },
    h('h2', { id: 'src-h' }, 'Sources and further reading'),
    h('p', { class: 'muted small' }, 'This lesson explains these sources in simple words. Visit them for the official, complete details.'),
    h('ol', {}, (lesson.sources || []).map((s) => h('li', {},
      link(s.url, { target: '_blank', rel: 'noopener noreferrer' }, s.title, ' ', icon('external', 14)),
      s.publisher && h('span', { class: 'muted' }, ` — ${s.publisher}`)))));

  const head = h('header', { class: 'lesson-head' },
    crumbs,
    h('p', { class: 'kicker' }, `${m.short} · Lesson ${entry.index + 1} of ${m.lessons.length}`),
    h('h1', { tabindex: '-1' }, lesson.title),
    h('p', { class: 'lead' }, lesson.summary),
    h('p', { class: 'lesson-meta' },
      h('span', {}, icon('clock', 16), ` ${lesson.minutes} min`),
      handsOn ? h('span', {}, icon('flask', 16), ` ${handsOn} hands-on`) : null,
      store.isComplete(id) && h('span', { class: 'pill done' }, '✓ Completed')));

  /* ---------------- one long page ---------------- */
  if (!stepMode) {
    const side = moduleSide(m, id);
    const article = h('article', { class: 'lesson' },
      head, objectives,
      ...lesson.blocks.map((_, i) => blockEl(i)),
      completeBox, srcs, navFooter(prev, next));
    article.style.setProperty('--accent', m.color);
    refreshNav = () => refreshModuleSide(side);
    return h('div', { class: 'lesson-layout' }, side, article);
  }

  /* ---------------- codelab steps ---------------- */
  const step = steps[current];
  const remaining = Math.max(1, Math.round(lesson.minutes * steps.slice(current).reduce((a, s) => a + s.weight, 0)));

  const stepDone = (i) => i !== current && i < Math.max(furthest, current);
  const stepList = h('ol', { class: 'step-list' }, steps.map((s, i) =>
    h('li', {}, link(stepHref(i), { class: `step-link ${i === current ? 'is-current' : ''} ${stepDone(i) ? 'is-done' : ''}`, 'aria-current': i === current ? 'step' : null },
      h('span', { class: 'step-num', 'aria-hidden': 'true' }, stepDone(i) ? '✓' : String(i + 1)),
      h('span', { class: 'step-name' }, s.title),
      s.hands ? h('span', { class: 'step-tag', title: 'Hands-on' }, icon('flask', 14, 'Hands-on')) : null))));

  const pctDone = Math.round((current / (steps.length - 1)) * 100);
  const stepsAside = h('nav', { class: 'step-side', 'aria-label': 'Lesson steps' },
    link(`#/module/${m.id}`, { class: 'side-module' }, icon('arrowLeft', 16), ` ${m.short}`),
    h('p', { class: 'step-side-title' }, lesson.title),
    h('div', { class: 'bar' }, h('span')),
    h('p', { class: 'muted small' }, `${remaining} min remaining`),
    stepList);
  stepsAside.querySelector('.bar').style.setProperty('--p', `${pctDone}%`);
  stepsAside.querySelector('.bar').style.setProperty('--c', m.color);

  // mobile: collapsible step picker
  const mobilePicker = h('details', { class: 'step-picker' },
    h('summary', {}, h('span', {}, `Step ${current + 1} of ${steps.length}`), h('span', { class: 'muted small' }, `${remaining} min left`)),
    stepList.cloneNode(true));

  let body;
  if (step.overview) {
    body = [head, ...step.blocks.map(blockEl), objectives, needs];
  } else if (step.wrap) {
    const nextCard = next && link(lessonHref(next), { class: 'next-lesson' },
      h('span', { class: 'muted small' }, next.module.id !== m.id ? `Next module: ${next.module.short}` : 'Next lesson'),
      h('strong', {}, next.title), icon('arrowRight'));
    body = [
      h('h2', { class: 'step-title', tabindex: '-1' }, `${current + 1}. Wrap-up`),
      h('div', { class: 'recap' },
        h('h3', {}, 'You can now…'),
        h('ul', { class: 'ticks' }, (lesson.objectives || []).map((o) => h('li', {}, o)))),
      completeBox,
      nextCard || link('#/certificate', { class: 'next-lesson' }, h('span', { class: 'muted small' }, 'All done?'), h('strong', {}, 'Get your certificate'), icon('award')),
      srcs,
    ];
  } else {
    body = [h('h2', { class: 'step-title', tabindex: '-1' }, `${current + 1}. ${step.title}`), ...step.blocks.map(blockEl)];
  }

  const backHref = current > 0 ? stepHref(current - 1) : prev ? lessonHref(prev) : null;
  const nextHref = current < steps.length - 1 ? stepHref(current + 1) : next ? lessonHref(next) : '#/certificate';
  const nextLabel = current < steps.length - 1 ? 'Next' : next ? 'Next lesson' : 'Finish';
  const stepBar = h('nav', { class: 'step-bar', 'aria-label': 'Step navigation' },
    backHref ? link(backHref, { class: 'btn step-back' }, icon('arrowLeft', 18), h('span', {}, 'Back')) : h('span', { class: 'btn step-back is-disabled', 'aria-hidden': 'true' }, icon('arrowLeft', 18), h('span', {}, 'Back')),
    h('span', { class: 'step-count' }, h('span', { class: 'bar' }, h('span')), h('small', {}, `${current + 1} / ${steps.length}`)),
    link(nextHref, { class: 'btn btn-primary step-next' }, h('span', {}, nextLabel), icon('arrowRight', 18)));
  stepBar.querySelector('.bar').style.setProperty('--p', `${((current + 1) / steps.length) * 100}%`);

  const article = h('article', { class: 'lesson codelab-step', 'data-step': String(current), 'aria-label': `${lesson.title}, step ${current + 1} of ${steps.length}` },
    current > 0 && h('p', { class: 'kicker step-kicker' }, `${m.short} · ${lesson.title}`),
    mobilePicker,
    ...body,
    stepBar);
  article.style.setProperty('--accent', m.color);
  const layout = h('div', { class: 'lesson-layout steps-layout' }, stepsAside, article);
  layout.style.setProperty('--accent', m.color);
  return layout;
}

function moduleSide(m, id) {
  return h('nav', { class: 'lesson-side', 'aria-label': `${m.short} lessons` },
    link(`#/module/${m.id}`, { class: 'side-module' }, m.title),
    h('ol', {}, m.lessons.map((l, i) => {
      const lid = lessonId(m.id, l.slug);
      const s = statusOf(lid);
      return h('li', {}, link(`#/lesson/${m.id}/${l.slug}`, { class: `side-link ${s.cls}`, 'aria-current': lid === id ? 'page' : null, 'data-lid': lid },
        h('span', { class: 'side-dot', 'aria-hidden': 'true' }, s.cls === 'done' ? '✓' : String(i + 1)), h('span', {}, l.title)));
    })));
}
function refreshModuleSide(side) {
  side.querySelectorAll('.side-link').forEach((a, n) => {
    const s = statusOf(a.dataset.lid);
    a.className = `side-link ${s.cls}`;
    a.querySelector('.side-dot').textContent = s.cls === 'done' ? '✓' : String(n + 1);
  });
}

function navFooter(prev, next) {
  return h('nav', { class: 'lesson-nav', 'aria-label': 'Lesson navigation' },
    prev ? link(lessonHref(prev), { class: 'nav-card prev' }, h('span', { class: 'muted small' }, '← Previous'), h('span', {}, prev.title)) : h('span'),
    next ? link(lessonHref(next), { class: 'nav-card next' }, h('span', { class: 'muted small' }, next.index === 0 ? `Next module: ${next.module.short} →` : 'Next →'), h('span', {}, next.title))
      : link('#/certificate', { class: 'nav-card next' }, h('span', { class: 'muted small' }, 'All done? →'), h('span', {}, 'Get your certificate')));
}


/* ---------------------------------------------------------------- search */

let searchIndex = null;
async function buildIndex() {
  if (!searchIndex) {
    const all = await loadAll();
    searchIndex = all.filter((x) => x.lesson).map(({ entry, lesson }) => {
      const text = lessonText(lesson);
      return { entry, lesson, text, lower: text.toLowerCase(), titleLower: lesson.title.toLowerCase() };
    });
  }
  return searchIndex;
}

function snippet(text, lower, terms) {
  const pos = terms.map((t) => lower.indexOf(t)).filter((p) => p >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, pos - 70);
  const raw = (start ? '…' : '') + text.slice(start, start + 220).replace(/\s+/g, ' ') + '…';
  // highlight safely: split on terms, build nodes
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return raw.split(re).map((part, i) => (i % 2 ? h('mark', {}, part) : part));
}

export async function searchView(query = '') {
  const input = h('input', { type: 'search', class: 'input input-lg', placeholder: 'Search lessons… e.g. "hold", "supplier site", "debit"', value: query, 'aria-label': 'Search lessons', autocomplete: 'off' });
  const results = h('div', { class: 'search-results', 'aria-live': 'polite' });

  async function run(q) {
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
    if (!terms.length) { results.replaceChildren(h('p', { class: 'muted' }, 'Type at least two letters to search all lessons.')); return; }
    results.replaceChildren(h('p', { class: 'muted' }, 'Searching…'));
    const idx = await buildIndex();
    const hits = idx
      .map((x) => {
        if (!terms.every((t) => x.lower.includes(t))) return null;
        let score = 0;
        terms.forEach((t) => { score += x.titleLower.includes(t) ? 10 : 0; score += x.lower.split(t).length - 1; });
        return { ...x, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);
    results.replaceChildren(
      h('p', { class: 'muted' }, `${hits.length} lesson${hits.length === 1 ? '' : 's'} found`),
      ...hits.map((x) => link(lessonHref(x.entry), { class: 'search-hit' },
        h('span', { class: 'kicker' }, `${x.entry.module.icon} ${x.entry.module.short}`),
        h('strong', {}, x.lesson.title),
        h('span', { class: 'snippet' }, snippet(x.text, x.lower, terms)))));
  }

  let t;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      history.replaceState(null, '', `#/search?q=${encodeURIComponent(input.value)}`);
      run(input.value);
    }, 200);
  });
  setTimeout(() => { input.focus(); run(query); }, 0);
  return h('div', { class: 'narrow' }, pageHead('🔎 Search', 'Search every lesson'), input, results);
}

/* ---------------------------------------------------------------- glossary */

export async function glossaryView() {
  const terms = await glossary();
  const input = h('input', { type: 'search', class: 'input', placeholder: `Filter ${terms.length} words…`, 'aria-label': 'Filter glossary' });
  const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase()))];
  const list = h('dl', { class: 'glossary' });
  const render = (f = '') => {
    const q = f.toLowerCase();
    const shown = terms.filter((t) => !q || t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q));
    let cur = '';
    list.replaceChildren(...shown.flatMap((t) => {
      const L = t.term[0].toUpperCase();
      const out = [];
      if (L !== cur) { cur = L; out.push(h('h2', { class: 'g-letter', id: `g-${L}` }, L)); }
      out.push(h('div', { class: 'g-item' },
        h('dt', {}, t.term),
        h('dd', {}, t.def, h('span', { class: 'g-links' }, ' Seen in: ', t.lessons.slice(0, 3).map((e, i) => [i ? ', ' : '', link(lessonHref(e), {}, e.title)])))));
      return out;
    }));
    if (!shown.length) list.replaceChildren(h('p', { class: 'muted' }, 'No words match that filter.'));
  };
  input.addEventListener('input', () => render(input.value));
  render();
  return h('div', { class: 'narrow' },
    pageHead('🔤 Glossary', 'Every new word, in plain language', 'Collected automatically from the “Key words” in each lesson.'),
    h('div', { class: 'glossary-tools' }, input,
      h('nav', { class: 'letters', 'aria-label': 'Jump to letter' }, letters.map((L) => h('a', { href: `#g-${L}`, onclick: (e) => { e.preventDefault(); document.getElementById(`g-${L}`)?.scrollIntoView({ behavior: store.settings.reduceMotion ? 'auto' : 'smooth' }); } }, L)))),
    list);
}

/* ---------------------------------------------------------------- credits */

export async function creditsView() {
  const srcs = await sources();
  const byPublisher = new Map();
  srcs.forEach((s) => {
    const p = s.publisher || new URL(s.url).hostname;
    if (!byPublisher.has(p)) byPublisher.set(p, []);
    byPublisher.get(p).push(s);
  });
  const groups = [...byPublisher.entries()].sort((a, b) => b[1].length - a[1].length);

  return h('div', { class: 'narrow' },
    pageHead('⭐ Sources & Credits', 'Standing on the shoulders of giants',
      'Every lesson is written in our own simple words, based on the official sources below. Each lesson also lists its sources at the bottom. Please visit them for the complete, authoritative details.'),
    h('aside', { class: 'callout callout-info' },
      h('div', { class: 'callout-head' }, h('span', { class: 'callout-emoji', 'aria-hidden': 'true' }, 'ℹ️'), h('strong', { class: 'callout-title' }, 'Independent project')),
      h('div', { class: 'prose' },
        h('p', {}, 'This is an independent, community-made learning guide. It is not affiliated with, endorsed by, or sponsored by Oracle. Oracle, Java, MySQL and NetSuite are registered trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners. Product details change every quarter — always confirm against the official Oracle documentation for your release.'))),
    h('p', {}, h('strong', {}, `${srcs.length} sources`), ` from ${groups.length} publishers are cited across ${totalLessons} lessons.`),
    ...groups.map(([pub, items]) => h('section', { class: 'credit-group' },
      h('h2', {}, `${pub} `, h('span', { class: 'muted small' }, `(${items.length})`)),
      h('ul', { class: 'credit-list' }, items.sort((a, b) => a.title.localeCompare(b.title)).map((s) => h('li', {},
        link(s.url, { target: '_blank', rel: 'noopener noreferrer' }, s.title, ' ', icon('external', 14)),
        h('span', { class: 'muted small' }, ' — used in ', s.lessons.map((e, i) => [i ? ', ' : '', link(lessonHref(e), {}, e.title)]))))))),
    h('section', { class: 'credit-group' },
      h('h2', {}, 'Project credits'),
      h('ul', {},
        h('li', {}, `Created by ${APP.author}, and maintained together with the open-source community. See all contributors on `, link(APP.repo, { target: '_blank', rel: 'noopener' }, 'GitHub'), '.'),
        h('li', {}, 'App code is released under the MIT License. Lesson content is released under Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0).'),
        h('li', {}, 'Built with plain HTML, CSS and JavaScript — no trackers, no third-party scripts, no external fonts.'))));
}

/* ---------------------------------------------------------------- settings */

function confirmDialog({ title, body, confirmLabel, danger }) {
  return new Promise((resolve) => {
    const dlg = h('dialog', { class: 'dialog', 'aria-labelledby': 'dlg-t' },
      h('form', { method: 'dialog' },
        h('h2', { id: 'dlg-t' }, title),
        h('p', {}, body),
        h('div', { class: 'dialog-actions' },
          h('button', { class: 'btn', value: 'cancel', type: 'submit' }, 'Cancel'),
          h('button', { class: `btn ${danger ? 'btn-danger' : 'btn-primary'}`, value: 'ok', type: 'submit' }, confirmLabel))));
    dlg.addEventListener('close', () => { resolve(dlg.returnValue === 'ok'); dlg.remove(); });
    document.body.append(dlg);
    dlg.showModal();
  });
}

function radioGroup(name, legend, options, current, onChange) {
  return h('fieldset', { class: 'seg' }, h('legend', {}, legend),
    h('div', { class: 'seg-opts' }, options.map(([val, label]) => h('label', { class: 'seg-opt' },
      h('input', { type: 'radio', name, value: val, checked: String(current) === String(val), onchange: () => onChange(val) }),
      h('span', {}, label)))));
}

export function settingsView() {
  const s = store.settings;
  const st = overallStats();
  const quizCount = Object.keys(store.state.quizzes).length;

  const fileInput = h('input', { type: 'file', accept: 'application/json,.json', class: 'visually-hidden', id: 'import-file', onchange: async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      store.importJSON(await f.text());
      toast('✅ Progress imported');
      location.hash = '#/settings';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } catch (err) {
      toast(`⚠️ ${err.message}`);
    }
    e.target.value = '';
  } });

  const offlineBtn = h('button', { class: 'btn', type: 'button', onclick: async () => {
    offlineBtn.disabled = true;
    offlineBtn.textContent = 'Downloading lessons…';
    await loadAll();
    offlineBtn.textContent = '✓ All lessons saved for offline use';
  } }, icon('download'), 'Save all lessons for offline use');

  return h('div', { class: 'narrow settings' },
    pageHead('⚙️ Settings', 'Settings'),

    h('section', { class: 'card' },
      h('h2', {}, 'Appearance'),
      radioGroup('theme', 'Theme', [['system', 'Match my device'], ['light', 'Light'], ['dark', 'Dark']], s.theme, (v) => store.updateSettings({ theme: v })),
      radioGroup('textSize', 'Text size', [['s', 'Small'], ['m', 'Medium'], ['l', 'Large'], ['xl', 'Extra large']], s.textSize, (v) => store.updateSettings({ textSize: v })),
      h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: s.reduceMotion, onchange: (e) => store.updateSettings({ reduceMotion: e.target.checked }) }), h('span', {}, 'Reduce animations'))),

    h('section', { class: 'card' },
      h('h2', {}, 'Learning'),
      radioGroup('layout', 'Lesson layout', [['steps', 'Step by step (like a codelab)'], ['page', 'One long page']], s.layout, (v) => store.updateSettings({ layout: v })),
      h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: s.autoComplete, onchange: (e) => store.updateSettings({ autoComplete: e.target.checked }) }), h('span', {}, 'Mark a lesson complete automatically when I pass its quiz')),
      radioGroup('passMark', 'Score needed to pass a quiz', [[60, '60%'], [70, '70%'], [80, '80%'], [100, '100%']], s.passMark, (v) => store.updateSettings({ passMark: Number(v) }))),

    h('section', { class: 'card' },
      h('h2', {}, 'Your data'),
      h('p', {}, `You have completed ${st.done} of ${st.total} lessons and taken ${quizCount} quiz${quizCount === 1 ? '' : 'zes'}.`),
      h('p', { class: 'muted' }, store.storageAvailable
        ? '🔒 Your progress is stored only in this browser (localStorage). It is never sent anywhere. Clearing your browser data will erase it, so export a backup if you switch devices.'
        : '⚠️ Your browser is blocking storage (for example in private mode), so progress will be lost when you close this tab.'),
      h('div', { class: 'btn-row' },
        h('button', { class: 'btn', type: 'button', onclick: () => {
          const blob = new Blob([store.exportJSON()], { type: 'application/json' });
          const a = h('a', { href: URL.createObjectURL(blob), download: `erp-made-simple-progress-${new Date().toISOString().slice(0, 10)}.json` });
          document.body.append(a); a.click(); a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        } }, icon('download'), 'Export progress'),
        h('label', { class: 'btn', for: 'import-file' }, icon('upload'), 'Import progress'), fileInput,
        'serviceWorker' in navigator && offlineBtn)),

    h('section', { class: 'card danger-zone' },
      h('h2', {}, 'Reset'),
      h('p', {}, 'Start fresh. This only affects this browser and cannot be undone (unless you exported a backup).'),
      h('div', { class: 'btn-row' },
        h('button', { class: 'btn btn-danger', type: 'button', onclick: async () => {
          if (await confirmDialog({ title: 'Reset your progress?', body: 'All completed lessons and quiz scores will be erased from this browser. Your appearance settings will be kept.', confirmLabel: 'Yes, reset progress', danger: true })) {
            store.resetProgress(); toast('Progress reset'); location.hash = '#/';
          }
        } }, icon('trash'), 'Reset progress'),
        h('button', { class: 'btn btn-danger-outline', type: 'button', onclick: async () => {
          if (await confirmDialog({ title: 'Erase everything?', body: 'This removes all progress, quiz scores and settings this app saved in this browser.', confirmLabel: 'Yes, erase everything', danger: true })) {
            store.resetAll(); toast('Everything erased'); location.hash = '#/';
          }
        } }, 'Reset everything'))));
}

/* ---------------------------------------------------------------- about */

export function aboutView() {
  return h('div', { class: 'narrow prose-page' },
    pageHead('ℹ️ About', 'How this guide works'),
    h('div', { class: 'prose' },
      h('h2', {}, 'What is this?'),
      h('p', {}, `${APP.name} is a free, open-source guide that teaches Oracle Fusion Cloud ERP from zero. Every idea is explained as if to a curious 10-year-old: first with an everyday comparison, then with the real Oracle name, then with an example from our story company, Sunny Lemonade Co.`),
      h('h2', {}, 'How should I use it?'),
      h('ol', {},
        h('li', {}, 'Begin with Module 1, The Basics. It gives you the words everything else depends on.'),
        h('li', {}, 'Then do Module 2, Accounts Payable — our deepest module.'),
        h('li', {}, 'Then carry on in order. The next modules follow the money: buying and paying people back (Procurement, Expenses), money coming in (Receivables), the bank (Cash Management), things we keep (Assets), and finally the General Ledger, where every module sends its journals and the month is closed. You can jump around, but this order means each lesson only uses ideas you have already met.'),
        h('li', {}, 'Each lesson is split into short steps, like a codelab. Click through the slides, try the hands-on exercises, and take the quiz. Passing the quiz marks the lesson complete.'),
        h('li', {}, 'Use the Practice Lab any time to play with simulators: matching invoices, payment terms, depreciation, journals, account combinations and currencies.')),
      h('h2', {}, 'Privacy: we collect nothing'),
      h('ul', {},
        h('li', {}, 'No accounts, no logins, no cookies, no analytics, no ads, no trackers.'),
        h('li', {}, 'Your progress is saved only in your own browser (localStorage). We can’t see it.'),
        h('li', {}, 'You can export, import or erase your progress any time in Settings.'),
        h('li', {}, 'The site loads no third-party scripts or fonts.')),
      h('h2', { id: 'version' }, 'Which Oracle version does this match?'),
      h('p', {}, `Every lesson was written and checked against Oracle Fusion Cloud Applications update ${ORACLE.release} (checked ${ORACLE.checked}). ${ORACLE.rollout}.`),
      h('ul', {},
        h('li', {}, 'Oracle updates Fusion four times a year (A, B, C, D). Names are the year plus a letter, so 26D is the fourth update of 2026.'),
        h('li', {}, `If your company is still on the previous update (26C), almost everything here is the same. Where a feature is new in a specific update, the lesson says so.`),
        h('li', {}, 'Sources link to the matching release of the Oracle Help Center, so you can always read the official page for this version.'),
        h('li', {}, 'We review the lessons each quarter when Oracle publishes its new What’s New documents.')),
      h('p', {}, link(ORACLE.whatsNew, { target: '_blank', rel: 'noopener' }, `Oracle Financials ${ORACLE.release} What’s New`), ' · ', link(ORACLE.docs, { target: '_blank', rel: 'noopener' }, `Oracle Financials ${ORACLE.release} documentation`)),
      h('h2', {}, 'Who made this?'),
      h('p', {}, `${APP.name} was created by `, link(APP.authorUrl, { target: '_blank', rel: 'noopener' }, APP.author), ', an app studio from India that builds mobile apps, AI products and open-source projects. It is free for everyone and maintained together with the open-source community.'),
      h('h2', {}, 'Is this official Oracle training?'),
      h('p', {}, 'No. This is an independent community project and is not affiliated with or endorsed by Oracle. It explains Oracle’s official documentation in simpler words and links to it. Oracle Fusion Cloud is updated every quarter, so screens and names can change. When in doubt, the official Oracle Help Center is the source of truth.'),
      h('h2', {}, 'Can I help?'),
      h('p', {}, 'Yes, please! Fix a typo, improve an explanation, add a lesson or translate the guide. Every lesson is a small, readable file. See the contributing guide on ', link(APP.repo, { target: '_blank', rel: 'noopener' }, 'GitHub'), '.'),
      h('h2', {}, 'Accessibility'),
      h('p', {}, 'The guide aims to meet WCAG 2.2 level AA and is tested for it on every change. Read the ', link('#/accessibility', {}, 'accessibility statement'), '.'),
      h('h2', {}, 'License'),
      h('p', {}, 'Code: MIT License. Lesson content: CC BY-SA 4.0. Sources are credited in every lesson and on the Sources & Credits page.')));
}

/* ---------------------------------------------------------------- accessibility */

/** When this statement was last checked against the site (update it when you re-check). */
const A11Y_REVIEWED = '4 November 2026';

export function accessibilityView() {
  const issues = `${APP.repo}/issues/new?labels=accessibility&title=${encodeURIComponent('Accessibility: ')}`;
  return h('div', { class: 'narrow prose-page' },
    pageHead('♿ Accessibility', 'Accessibility statement', `${APP.name} is for everyone. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.`),
    h('div', { class: 'prose' },
      h('h2', {}, 'How accessible is this site?'),
      h('p', {}, 'We believe the whole site meets WCAG 2.2 level AA. You should be able to:'),
      h('ul', {},
        h('li', {}, 'use every page, lesson, quiz, exercise and lab with only a keyboard, and always see where the focus is;'),
        h('li', {}, 'use the site with a screen reader: pages have one main heading, headings are in order, and every button, link and form field has a name;'),
        h('li', {}, 'read every text in the light and the dark theme (contrast of at least 4.5 to 1);'),
        h('li', {}, 'make the text larger in Settings or with your browser’s zoom;'),
        h('li', {}, 'use the site on a phone 360 pixels wide without scrolling sideways, with buttons at least 24 by 24 pixels;'),
        h('li', {}, 'turn off animations in Settings (we also follow your device’s “reduce motion” setting);'),
        h('li', {}, 'keep learning offline after your first visit.')),
      h('p', {}, 'Slides, flow diagrams, tables and journal entries are real text, not pictures, so they can be read aloud, enlarged and translated by your browser.'),
      h('h2', {}, 'How we check'),
      h('p', {}, 'Every change to the site runs automated tests in a real browser before it can be published. They open every page and every lesson and check, among other things:'),
      h('ul', {},
        h('li', {}, 'headings, page language, link and button names, form labels, image text alternatives and ARIA references;'),
        h('li', {}, 'colour contrast of every piece of text, in both themes and in both lesson layouts;'),
        h('li', {}, 'the size of every clickable target;'),
        h('li', {}, 'keyboard use: the “Skip to content” link, focus moving to the page heading, and a visible focus ring;'),
        h('li', {}, 'the layout at phone width.')),
      h('p', {}, 'Automated tests cannot find every problem, so please tell us when something is hard to use. ',
        link(`${APP.repo}/blob/main/tests/a11y.test.mjs`, { target: '_blank', rel: 'noopener' }, 'Read the accessibility tests'), '.'),
      h('h2', {}, 'Known limitations'),
      h('ul', {},
        h('li', {}, 'Source links go to the Oracle Help Center and other websites. We do not control how accessible those sites are.'),
        h('li', {}, 'Lessons are in English only for now. Your browser’s translate feature works on every page.'),
        h('li', {}, 'Swiping between slides only works on touch screens; the Previous and Next buttons and the arrow keys always work.')),
      h('h2', {}, 'Tell us about a problem'),
      h('p', {}, 'If something is hard to use, please tell us. We aim to reply within 5 working days.'),
      h('ul', {},
        h('li', {}, link(issues, { target: '_blank', rel: 'noopener' }, 'Open an accessibility issue on GitHub'), ' (public), or'),
        h('li', {}, 'email ', link(`mailto:${APP.securityEmail}?subject=${encodeURIComponent(`Accessibility: ${APP.name}`)}`, {}, APP.securityEmail), ' (private).')),
      h('h2', {}, 'About this statement'),
      h('p', {}, `This statement was last reviewed on ${A11Y_REVIEWED}, for version ${APP.version} of the site. We review it at every release.`)));
}

/* ---------------------------------------------------------------- certificate */

export function certificateView() {
  const st = overallStats();
  if (st.done < st.total) {
    const nxt = nextLesson();
    return h('div', { class: 'narrow center' },
      pageHead('🏆 Certificate', 'Your completion certificate', `Complete all ${st.total} lessons to unlock a printable certificate of completion.`),
      ring(st.pct, 160, `${st.done}/${st.total}`),
      h('p', {}, `${st.total - st.done} lesson${st.total - st.done === 1 ? '' : 's'} to go. You can do it!`),
      nxt && link(lessonHref(nxt), { class: 'btn btn-primary' }, icon('play'), 'Continue learning'));
  }
  const nameIn = h('input', { class: 'input', type: 'text', maxlength: '80', placeholder: 'Your name (stays in this browser)', value: store.state.certificateName, 'aria-label': 'Name on certificate' });
  const nameOut = h('div', { class: 'cert-name' }, store.state.certificateName || 'Your Name');
  nameIn.addEventListener('input', () => { nameOut.textContent = nameIn.value || 'Your Name'; store.setCertificateName(nameIn.value); });
  const date = new Date(Math.max(...Object.values(store.state.completed).map((d) => Date.parse(d)))).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  return h('div', { class: 'narrow' },
    pageHead('🏆 Certificate', 'Congratulations!', `You finished all ${st.total} lessons.`),
    h('div', { class: 'cert-tools no-print' }, nameIn, h('button', { class: 'btn btn-primary', type: 'button', onclick: () => window.print() }, icon('print'), 'Print or save as PDF')),
    h('div', { class: 'certificate' },
      h('div', { class: 'cert-inner' },
        h('p', { class: 'cert-kicker' }, 'Certificate of Completion'),
        h('p', {}, 'This certifies that'),
        nameOut,
        h('p', {}, 'has completed every lesson of'),
        h('p', { class: 'cert-course' }, `${APP.name}: ${APP.tagline}`),
        h('p', { class: 'muted small' }, `${totalLessons} lessons · ${curriculum.length} modules · completed ${date}`),
        h('p', { class: 'cert-note' }, `A free learning guide created by ${APP.author}. Not an official Oracle certification.`))));
}

/* ---------------------------------------------------------------- practice lab */

export function labsView() {
  return h('div', { class: 'narrow-wide' },
    pageHead('Practice Lab', 'Practice Lab', 'Hands-on simulators. Change the numbers and watch what an ERP would do. Nothing here touches a real system — it is a safe playground.'),
    h('div', { class: 'lab-cards' }, Object.entries(LABS).map(([key, lab]) =>
      link(`#/lab/${key}`, { class: 'lab-card' },
        h('span', { class: 'lab-card-icon', 'aria-hidden': 'true' }, lab.icon),
        h('strong', {}, lab.title),
        h('span', { class: 'muted' }, lab.blurb),
        h('span', { class: 'lab-card-go' }, 'Open lab ', icon('arrowRight', 16))))));
}

export function labView(tool) {
  const lab = Object.hasOwn(LABS, tool) ? LABS[tool] : null;
  if (!lab) return notFoundView();
  return h('div', { class: 'narrow-wide' },
    h('nav', { class: 'crumbs', 'aria-label': 'Breadcrumb' }, link('#/lab', {}, 'Practice Lab'), ' / ', h('span', { 'aria-current': 'page' }, lab.title)),
    pageHead('Practice Lab', lab.title, lab.blurb),
    renderLab({ tool }));
}

/* ---------------------------------------------------------------- 404 */

export function notFoundView() {
  return h('div', { class: 'narrow center' },
    pageHead('🤔 Hmm', 'We can’t find that page', 'The link may be old or mistyped.'),
    link('#/', { class: 'btn btn-primary' }, icon('home'), 'Go to the start'));
}
