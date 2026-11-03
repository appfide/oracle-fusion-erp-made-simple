/**
 * Renderers for each lesson block type. See docs/CONTENT_GUIDE.md.
 */
import { h, icon, announce } from './dom.js';
import { store } from './store.js';
import { renderExercise, renderLab } from './interactive.js';

const fmt = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => (n ? fmt.format(n) : '');

let uid = 0;
const nextId = (p) => `${p}-${++uid}`;

const CALLOUTS = {
  tip: { label: 'Tip', emoji: '💡' },
  warning: { label: 'Watch out', emoji: '⚠️' },
  info: { label: 'Good to know', emoji: 'ℹ️' },
  oracle: { label: 'In Oracle Fusion', emoji: '🟥' },
  real: { label: 'In the real world', emoji: '🧑‍💼' },
};

const renderers = {
  text(b) {
    return h('section', { class: 'blk blk-text' }, b.heading && h('h2', {}, b.heading), h('div', { class: 'prose', html: b.html }));
  },

  kid(b) {
    return h('aside', { class: 'blk blk-kid', 'aria-label': 'Explain it like I am ten' },
      h('div', { class: 'kid-badge' }, h('span', { 'aria-hidden': 'true' }, '🧒'), ' Explain it like I’m 10'),
      h('h2', { class: 'kid-title' }, b.title),
      h('div', { class: 'prose', html: b.html }));
  },

  callout(b) {
    const c = CALLOUTS[b.variant] || CALLOUTS.info;
    return h('aside', { class: `blk callout callout-${b.variant}`, 'aria-label': c.label },
      h('div', { class: 'callout-head' }, h('span', { 'aria-hidden': 'true', class: 'callout-emoji' }, c.emoji),
        h('span', { class: 'callout-kicker' }, c.label), h('strong', { class: 'callout-title' }, b.title)),
      h('div', { class: 'prose', html: b.html }));
  },

  slides(b) {
    const id = nextId('slides');
    let i = 0;
    const n = b.slides.length;
    const track = h('div', { class: 'slides-track', 'aria-live': 'polite' });
    const counter = h('span', { class: 'slides-counter' });
    const dots = h('div', { class: 'slides-dots', role: 'tablist', 'aria-label': 'Choose slide' });
    const prev = h('button', { class: 'btn btn-icon', type: 'button', 'aria-label': 'Previous slide', onclick: () => go(i - 1) }, icon('arrowLeft'));
    const next = h('button', { class: 'btn btn-icon btn-primary', type: 'button', 'aria-label': 'Next slide', onclick: () => go(i + 1) }, icon('arrowRight'));

    const slideEls = b.slides.map((s, k) =>
      h('div', { class: 'slide', id: `${id}-${k}`, role: 'group', 'aria-roledescription': 'slide', 'aria-label': `${k + 1} of ${n}: ${s.title}` },
        h('div', { class: 'slide-icon', 'aria-hidden': 'true' }, s.icon || '✨'),
        h('h3', { class: 'slide-title' }, s.title),
        h('div', { class: 'prose', html: s.html })));
    const dotEls = b.slides.map((s, k) =>
      h('button', { class: 'dot', type: 'button', role: 'tab', 'aria-label': `Slide ${k + 1}: ${s.title}`, onclick: () => go(k) }));
    dots.append(...dotEls);

    function go(k) {
      i = Math.max(0, Math.min(n - 1, k));
      slideEls.forEach((el, j) => { el.hidden = j !== i; });
      dotEls.forEach((d, j) => { d.setAttribute('aria-selected', String(j === i)); d.classList.toggle('active', j === i); });
      counter.textContent = `${i + 1} / ${n}`;
      prev.disabled = i === 0;
      next.disabled = i === n - 1;
      bar.style.setProperty('--p', `${((i + 1) / n) * 100}%`);
    }
    track.append(...slideEls);
    const bar = h('div', { class: 'slides-bar', 'aria-hidden': 'true' });
    const deck = h('section', { class: 'blk blk-slides', tabindex: '0', 'aria-roledescription': 'carousel', 'aria-label': b.title },
      h('header', { class: 'slides-head' }, h('span', { class: 'slides-kicker' }, '🎞️ Slides'), h('h2', {}, b.title)),
      bar, track,
      h('footer', { class: 'slides-nav' }, prev, dots, counter, next));
    deck.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
    });
    // swipe support
    let x0 = null;
    track.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    go(0);
    return deck;
  },

  flow(b) {
    return h('section', { class: 'blk blk-flow' },
      h('h2', {}, b.title),
      h('ol', { class: `flow ${b.steps.length > 4 ? 'flow-long' : ''}` }, b.steps.map((s, k) =>
        h('li', { class: 'flow-step' },
          h('div', { class: 'flow-card' },
            h('div', { class: 'flow-num', 'aria-hidden': 'true' }, s.icon || String(k + 1)),
            h('div', { class: 'flow-label' }, s.label),
            s.detail && h('div', { class: 'flow-detail' }, s.detail))))),
      b.note && h('div', { class: 'prose flow-note', html: b.note }));
  },

  example(b) {
    return h('section', { class: 'blk blk-example' },
      h('div', { class: 'example-kicker' }, '🍋 Sunny Lemonade example'),
      h('h2', {}, b.title),
      h('div', { class: 'prose', html: b.html }),
      b.steps && h('ol', { class: 'example-steps' }, b.steps.map((s) => h('li', { html: s }))),
      b.result && h('div', { class: 'example-result prose' }, h('strong', {}, '✅ '), h('span', { html: b.result })));
  },

  table(b) {
    return h('section', { class: 'blk blk-table' },
      h('div', { class: 'table-wrap', tabindex: '0', role: 'region', 'aria-label': b.caption },
        h('table', {},
          h('caption', {}, b.caption),
          h('thead', {}, h('tr', {}, b.headers.map((x) => h('th', { scope: 'col' }, x)))),
          h('tbody', {}, b.rows.map((r) => h('tr', {}, r.map((c, k) => (k === 0 ? h('th', { scope: 'row', html: String(c) }) : h('td', { html: String(c) })))))))));
  },

  journal(b) {
    const d = b.lines.reduce((a, l) => a + (l.debit || 0), 0);
    const c = b.lines.reduce((a, l) => a + (l.credit || 0), 0);
    const balanced = Math.abs(d - c) < 0.005;
    return h('section', { class: 'blk blk-journal' },
      h('div', { class: 'journal-kicker' }, '📒 Journal entry'),
      h('h2', {}, b.title),
      h('div', { class: 'table-wrap', tabindex: '0', role: 'region', 'aria-label': b.title },
        h('table', { class: 'journal' },
          h('thead', {}, h('tr', {}, h('th', { scope: 'col' }, 'Account'), h('th', { scope: 'col', class: 'num' }, 'Debit (Dr)'), h('th', { scope: 'col', class: 'num' }, 'Credit (Cr)'))),
          h('tbody', {}, b.lines.map((l) =>
            h('tr', { class: l.credit && !l.debit ? 'is-credit' : 'is-debit' },
              h('td', {}, l.account), h('td', { class: 'num' }, money(l.debit)), h('td', { class: 'num' }, money(l.credit))))),
          h('tfoot', {}, h('tr', {}, h('th', { scope: 'row' }, 'Total'), h('td', { class: 'num' }, fmt.format(d)), h('td', { class: 'num' }, fmt.format(c)))))),
      h('p', { class: `journal-check ${balanced ? 'ok' : 'bad'}` }, balanced ? '⚖️ Balanced: debits equal credits.' : '⚠️ Not balanced'),
      b.note && h('div', { class: 'prose', html: b.note }));
  },

  steps(b) {
    return h('section', { class: 'blk blk-steps' },
      h('div', { class: 'steps-kicker' }, '🖱️ Try it in Oracle'),
      h('h2', {}, b.title),
      h('ol', { class: 'steps' }, b.items.map((s) => h('li', { html: s }))),
      b.note && h('div', { class: 'prose steps-note', html: b.note }));
  },

  terms(b) {
    return h('section', { class: 'blk blk-terms' },
      h('h2', {}, '🔤 Key words'),
      h('dl', { class: 'terms' }, b.items.map((t) => h('div', { class: 'term' }, h('dt', {}, t.term), h('dd', {}, t.def)))));
  },

  quiz(b, ctx) {
    const qs = b.questions;
    const answers = new Array(qs.length).fill(null);
    const result = h('div', { class: 'quiz-result', role: 'status', 'aria-live': 'polite' });
    const prevBest = store.state.quizzes[ctx.id];

    const qEls = qs.map((q, qi) => {
      const name = nextId('q');
      const feedback = h('div', { class: 'quiz-feedback', hidden: true });
      const opts = q.options.map((o, oi) => {
        const input = h('input', { type: 'radio', name, value: String(oi), onchange: () => { answers[qi] = oi; } });
        return h('label', { class: 'quiz-opt' }, input, h('span', {}, o));
      });
      return { el: h('fieldset', { class: 'quiz-q' }, h('legend', {}, h('span', { class: 'quiz-n' }, `${qi + 1}`), q.q), h('div', { class: 'quiz-opts' }, opts), feedback), opts, feedback, q };
    });

    const submit = h('button', { class: 'btn btn-primary', type: 'submit' }, icon('check'), 'Check my answers');
    const retry = h('button', { class: 'btn', type: 'button', hidden: true, onclick: reset }, 'Try again');

    function reset() {
      answers.fill(null);
      qEls.forEach(({ opts, feedback }) => {
        opts.forEach((l) => { l.classList.remove('correct', 'wrong'); const inp = l.querySelector('input'); inp.checked = false; inp.disabled = false; });
        feedback.hidden = true;
      });
      result.textContent = '';
      result.className = 'quiz-result';
      submit.hidden = false;
      retry.hidden = true;
      form.querySelector('input')?.focus();
    }

    const form = h('form', { class: 'quiz-form', novalidate: true, onsubmit: (e) => {
      e.preventDefault();
      if (answers.some((a) => a === null)) {
        result.className = 'quiz-result warn';
        result.textContent = `Please answer all ${qs.length} questions first. You have ${answers.filter((a) => a === null).length} left.`;
        return;
      }
      let score = 0;
      qEls.forEach(({ opts, feedback, q }, qi) => {
        const ok = answers[qi] === q.answer;
        if (ok) score++;
        opts.forEach((l, oi) => {
          l.querySelector('input').disabled = true;
          if (oi === q.answer) l.classList.add('correct');
          else if (oi === answers[qi]) l.classList.add('wrong');
        });
        feedback.hidden = false;
        feedback.className = `quiz-feedback ${ok ? 'ok' : 'bad'}`;
        feedback.replaceChildren(h('strong', {}, ok ? '✅ Correct! ' : '❌ Not quite. '), q.explain);
      });
      const pct = Math.round((score / qs.length) * 100);
      const passed = pct >= store.settings.passMark;
      store.recordQuiz(ctx.id, score, qs.length);
      result.className = `quiz-result ${passed ? 'pass' : 'fail'}`;
      result.textContent = passed
        ? `🎉 You scored ${score} out of ${qs.length} (${pct}%). Great job!`
        : `You scored ${score} out of ${qs.length} (${pct}%). Read the explanations above and try again — you need ${store.settings.passMark}% to pass.`;
      announce(result.textContent);
      submit.hidden = true;
      retry.hidden = false;
      ctx.onQuizDone && ctx.onQuizDone({ score, total: qs.length, passed });
    } }, qEls.map((x) => x.el), h('div', { class: 'quiz-actions' }, submit, retry), result);

    return h('section', { class: 'blk blk-quiz', id: 'quiz' },
      h('div', { class: 'quiz-kicker' }, '🧠 Check your understanding'),
      h('h2', {}, 'Quick quiz'),
      prevBest && h('p', { class: 'muted' }, `Your best score so far: ${prevBest.best} / ${prevBest.total}.`),
      form);
  },
};

renderers.exercise = (b, ctx) => renderExercise(b, ctx);
renderers.lab = (b) => renderLab(b);

/** Which blocks start a new step in step-by-step (codelab) mode, and the step's name. */
export function stepTitle(b, isFirst) {
  switch (b.type) {
    case 'text': return b.heading || null;
    case 'kid': return isFirst ? null : b.title;
    case 'slides': case 'flow': case 'example': return b.title;
    case 'exercise': return b.title;
    case 'lab': return b.title || 'Practice lab';
    case 'steps': return b.title;
    case 'terms': return 'Key words';
    case 'quiz': return 'Quick quiz';
    default: return null;
  }
}

export function renderBlock(block, ctx) {
  const fn = Object.hasOwn(renderers, block.type) ? renderers[block.type] : null;
  if (!fn) return h('div', { class: 'blk' }, `Unknown block type: ${block.type}`);
  try {
    return fn(block, ctx);
  } catch (e) {
    console.error('Block failed to render', block, e);
    return h('div', { class: 'blk callout callout-warning' }, 'This part of the lesson could not be shown.');
  }
}
