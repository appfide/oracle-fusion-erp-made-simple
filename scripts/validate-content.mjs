#!/usr/bin/env node
/**
 * Content validator.
 *   node scripts/validate-content.mjs              -> validate every lesson
 *   node scripts/validate-content.mjs payables     -> validate one module
 *   node scripts/validate-content.mjs --allow-missing  -> missing lesson files are warnings
 * Exit code 1 when any error is found.
 */
import { pathToFileURL, fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const allowMissing = args.includes('--allow-missing');
const only = args.find((a) => !a.startsWith('--'));

const { curriculum } = await import(pathToFileURL(path.join(root, 'content/curriculum.js')).href);

const BLOCK_RULES = {
  text: ['html'],
  kid: ['title', 'html'],
  callout: ['variant', 'title', 'html'],
  slides: ['title', 'slides'],
  flow: ['title', 'steps'],
  example: ['title', 'html'],
  table: ['caption', 'headers', 'rows'],
  journal: ['title', 'lines'],
  steps: ['title', 'items'],
  terms: ['items'],
  quiz: ['questions'],
  exercise: ['kind', 'title', 'instructions'],
  lab: ['tool'],
};
const EXERCISE_KINDS = ['fill', 'order', 'match', 'classify', 'journal', 'form'];
const LAB_TOOLS = ['three-way-match', 'payment-terms', 'depreciation', 'journal-sandbox', 'coa-builder', 'fx'];
const CALLOUT_VARIANTS = ['tip', 'warning', 'info', 'oracle', 'real'];
const ALLOWED_TAGS = new Set(['p', 'strong', 'em', 'ul', 'ol', 'li', 'code', 'br', 'a', 'kbd', 'span', 'b', 'i']);

let errors = 0;
let warnings = 0;
let lessonsChecked = 0;
let totalWords = 0;
const seenTerms = new Map();

const err = (where, msg) => { errors++; console.error(`  ✖ ${where}: ${msg}`); };
const warn = (where, msg) => { warnings++; console.warn(`  ⚠ ${where}: ${msg}`); };

function stripTags(s) { return String(s ?? '').replace(/<[^>]*>/g, ' '); }
function words(s) { return stripTags(s).split(/\s+/).filter(Boolean).length; }

function checkHtml(where, html) {
  if (typeof html !== 'string') return;
  const tagRe = /<\/?\s*([a-zA-Z0-9]+)([^>]*)>/g;
  let m;
  while ((m = tagRe.exec(html))) {
    const tag = m[1].toLowerCase();
    const attrs = m[2] || '';
    if (!ALLOWED_TAGS.has(tag)) err(where, `disallowed tag <${tag}>`);
    if (/\son\w+\s*=/i.test(attrs) || /style\s*=/i.test(attrs)) err(where, `disallowed attribute in <${tag}${attrs}>`);
    if (tag === 'a' && !m[0].startsWith('</')) {
      const href = /href\s*=\s*"([^"]*)"/i.exec(attrs);
      if (!href || !/^https:\/\//.test(href[1])) err(where, `link must use an https href: ${m[0]}`);
    }
    if (tag === 'span' && !m[0].startsWith('</') && attrs.trim() && !/^\s*class="hl"\s*$/.test(attrs)) {
      err(where, `<span> only supports class="hl"`);
    }
  }
}

function checkExercise(bw, b) {
  if (!EXERCISE_KINDS.includes(b.kind)) { err(bw, `kind must be one of ${EXERCISE_KINDS.join(', ')}`); return; }
  checkHtml(bw, b.instructions); checkHtml(bw, b.explain);
  if (!b.explain) warn(bw, 'exercise has no "explain"');
  const isStrOrNumAnswer = (a) => typeof a === 'number' || typeof a === 'string' || (Array.isArray(a) && a.length && a.every((x) => typeof x === 'string' || typeof x === 'number'));
  if (b.kind === 'fill') {
    checkHtml(bw, b.html);
    const n = (String(b.html || '').match(/\{\{\}\}/g) || []).length;
    if (!n) err(bw, 'fill needs html with {{}} blanks');
    if (!Array.isArray(b.blanks) || b.blanks.length !== n) err(bw, `fill has ${n} blanks in html but ${(b.blanks || []).length} entries in blanks`);
    (b.blanks || []).forEach((x, j) => { if (!x || !isStrOrNumAnswer(x.answer)) err(bw, `blank #${j + 1} needs answer (number, string or array)`); });
  }
  if (b.kind === 'order') {
    if (!Array.isArray(b.items) || b.items.length < 3) err(bw, 'order needs 3+ items');
    if (new Set(b.items || []).size !== (b.items || []).length) err(bw, 'order items must be unique');
  }
  if (b.kind === 'match') {
    if (!Array.isArray(b.pairs) || b.pairs.length < 2) err(bw, 'match needs 2+ pairs');
    (b.pairs || []).forEach((p, j) => { if (!p.left || !p.right) err(bw, `pair #${j + 1} needs left and right`); });
    if (new Set((b.pairs || []).map((p) => p.right)).size !== (b.pairs || []).length) err(bw, 'match right values must be unique');
  }
  if (b.kind === 'classify') {
    if (!Array.isArray(b.categories) || b.categories.length < 2) err(bw, 'classify needs 2+ categories');
    (b.items || []).forEach((it, j) => { if (!it.text || !(b.categories || []).includes(it.answer)) err(bw, `item #${j + 1} needs text and an answer from categories`); });
    if (!Array.isArray(b.items) || b.items.length < 3) err(bw, 'classify needs 3+ items');
  }
  if (b.kind === 'journal') {
    if (!Array.isArray(b.accounts) || b.accounts.length < 2) err(bw, 'journal exercise needs 2+ accounts');
    let d = 0, c = 0;
    (b.answer || []).forEach((l, j) => {
      if (!(b.accounts || []).includes(l.account)) err(bw, `answer line #${j + 1} account "${l.account}" is not in accounts`);
      if (!Number.isFinite(l.debit) || !Number.isFinite(l.credit)) err(bw, `answer line #${j + 1} debit/credit must be numbers`);
      d += l.debit || 0; c += l.credit || 0;
    });
    if (!Array.isArray(b.answer) || b.answer.length < 2) err(bw, 'journal exercise needs 2+ answer lines');
    if (Math.abs(d - c) > 0.001) err(bw, `journal exercise answer does not balance (${d} vs ${c})`);
  }
  if (b.kind === 'form') {
    if (!b.formTitle) err(bw, 'form needs formTitle');
    if (!Array.isArray(b.fields) || !b.fields.length) err(bw, 'form needs fields');
    let answers = 0;
    (b.fields || []).forEach((f, j) => {
      if (!f.label) err(bw, `field #${j + 1} needs label`);
      if (!['text', 'number', 'select', 'date'].includes(f.type || 'text')) err(bw, `field #${j + 1} type invalid`);
      if (f.type === 'select' && (!Array.isArray(f.options) || f.options.length < 2)) err(bw, `field #${j + 1} select needs options`);
      if (f.answer !== undefined) {
        answers++;
        if (f.type === 'select' && !(f.options || []).includes(f.answer)) err(bw, `field #${j + 1} answer must be one of options`);
        if (f.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(f.answer)) err(bw, `field #${j + 1} date answer must be YYYY-MM-DD`);
        if (f.type === 'number' && !Number.isFinite(f.answer)) err(bw, `field #${j + 1} number answer must be a number`);
      } else if (f.given === undefined) err(bw, `field #${j + 1} needs answer or given`);
    });
    if (!answers) err(bw, 'form needs at least one field with an answer');
  }
}

function textOfBlock(b) {
  const parts = [b.title, b.heading, b.html, b.result, b.note, b.caption, b.instructions, b.explain, b.intro];
  (b.slides || []).forEach((s) => parts.push(s.title, s.html));
  (b.steps || []).forEach((s) => parts.push(typeof s === 'string' ? s : `${s.label} ${s.detail}`));
  (b.items || []).forEach((s) => parts.push(typeof s === 'string' ? s : `${s.term} ${s.def}`));
  (b.rows || []).forEach((r) => parts.push(r.join(' ')));
  (b.questions || []).forEach((q) => parts.push(q.q, q.explain, ...(q.options || [])));
  return parts.filter(Boolean).join(' ');
}

for (const mod of curriculum) {
  if (only && mod.id !== only) continue;
  console.log(`\n${mod.icon} ${mod.title}`);
  for (const entry of mod.lessons) {
    const where = `${mod.id}/${entry.slug}`;
    const file = path.join(root, 'content/lessons', mod.id, `${entry.slug}.js`);
    if (!existsSync(file)) {
      (allowMissing ? warn : err)(where, 'lesson file is missing');
      continue;
    }
    let lesson;
    try {
      lesson = (await import(pathToFileURL(file).href)).default;
    } catch (e) {
      err(where, `cannot import: ${e.message}`);
      continue;
    }
    lessonsChecked++;
    if (!lesson || typeof lesson !== 'object') { err(where, 'no default export object'); continue; }
    if (lesson.slug !== entry.slug) err(where, `slug "${lesson.slug}" must be "${entry.slug}"`);
    if (lesson.title !== entry.title) warn(where, `title differs from curriculum.js ("${lesson.title}" vs "${entry.title}")`);
    if (!Number.isFinite(lesson.minutes) || lesson.minutes <= 0) err(where, 'minutes must be a positive number');
    if (!lesson.summary) err(where, 'summary is required');
    if (!Array.isArray(lesson.objectives) || lesson.objectives.length < 2) err(where, 'objectives needs 2+ items');
    if (!Array.isArray(lesson.blocks) || !lesson.blocks.length) { err(where, 'blocks is required'); continue; }
    if (!Array.isArray(lesson.sources) || !lesson.sources.length) err(where, 'sources needs at least 1 item');
    (lesson.sources || []).forEach((s, i) => {
      if (!s.title || !s.url) err(where, `source #${i + 1} needs title and url`);
      else if (!/^https:\/\//.test(s.url)) err(where, `source #${i + 1} must be https: ${s.url}`);
      if (!s.publisher) warn(where, `source #${i + 1} has no publisher`);
    });

    let lessonWords = 0;
    let quizCount = 0;
    let hasKid = false;
    let interactive = 0;
    lesson.blocks.forEach((b, i) => {
      const bw = `${where} block #${i + 1} (${b && b.type})`;
      const req = BLOCK_RULES[b && b.type];
      if (!req) { err(bw, `unknown block type`); return; }
      for (const f of req) if (b[f] === undefined || b[f] === null || b[f] === '') err(bw, `missing "${f}"`);
      lessonWords += words(textOfBlock(b));
      ['html', 'result', 'note'].forEach((f) => checkHtml(bw, b[f]));
      if (b.type === 'kid') hasKid = true;
      if (b.type === 'exercise' || b.type === 'lab') interactive++;
      if (b.type === 'exercise') checkExercise(bw, b);
      if (b.type === 'lab') {
        if (!LAB_TOOLS.includes(b.tool)) err(bw, `tool must be one of ${LAB_TOOLS.join(', ')}`);
        checkHtml(bw, b.intro);
        if (b.preset !== undefined && (typeof b.preset !== 'object' || Array.isArray(b.preset))) err(bw, 'preset must be an object');
      }
      if (b.type === 'callout' && !CALLOUT_VARIANTS.includes(b.variant)) err(bw, `variant must be one of ${CALLOUT_VARIANTS.join(', ')}`);
      if (b.type === 'slides') {
        if (!Array.isArray(b.slides) || b.slides.length < 2) err(bw, 'slides needs 2+ slides');
        (b.slides || []).forEach((s, j) => { if (!s.title || !s.html) err(bw, `slide #${j + 1} needs title and html`); checkHtml(bw, s.html); });
      }
      if (b.type === 'flow') {
        if (!Array.isArray(b.steps) || b.steps.length < 2) err(bw, 'flow needs 2+ steps');
        (b.steps || []).forEach((s, j) => { if (!s.label) err(bw, `flow step #${j + 1} needs label`); });
      }
      if (b.type === 'example' && b.steps) b.steps.forEach((s) => checkHtml(bw, s));
      if (b.type === 'steps') {
        if (!Array.isArray(b.items) || !b.items.length) err(bw, 'items needs 1+ entries');
        (b.items || []).forEach((s) => checkHtml(bw, s));
      }
      if (b.type === 'table') {
        const n = (b.headers || []).length;
        (b.rows || []).forEach((r, j) => {
          if (!Array.isArray(r) || r.length !== n) err(bw, `row #${j + 1} has ${r && r.length} cells, expected ${n}`);
          (r || []).forEach((c) => checkHtml(bw, String(c)));
        });
      }
      if (b.type === 'journal') {
        let d = 0, c = 0;
        (b.lines || []).forEach((l, j) => {
          if (!l.account) err(bw, `line #${j + 1} needs account`);
          if (!Number.isFinite(l.debit) || !Number.isFinite(l.credit)) err(bw, `line #${j + 1} debit/credit must be numbers`);
          d += l.debit || 0; c += l.credit || 0;
        });
        if (Math.abs(d - c) > 0.001) err(bw, `journal does not balance (debits ${d} vs credits ${c})`);
      }
      if (b.type === 'terms') {
        (b.items || []).forEach((t, j) => {
          if (!t.term || !t.def) err(bw, `term #${j + 1} needs term and def`);
          if (/<[a-z]/i.test(t.def || '')) err(bw, `term "${t.term}" def must be plain text`);
          const key = String(t.term).toLowerCase();
          if (!seenTerms.has(key)) seenTerms.set(key, where);
        });
      }
      if (b.type === 'quiz') {
        quizCount++;
        if (i !== lesson.blocks.length - 1) err(bw, 'quiz must be the last block');
        const qs = b.questions || [];
        if (qs.length < 3 || qs.length > 6) warn(bw, `quiz should have 3–5 questions (has ${qs.length})`);
        qs.forEach((q, j) => {
          if (!q.q || !Array.isArray(q.options) || q.options.length < 2) err(bw, `question #${j + 1} needs q and 2+ options`);
          if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options || []).length) err(bw, `question #${j + 1} answer index out of range`);
          if (!q.explain) err(bw, `question #${j + 1} needs explain`);
        });
      }
    });
    if (quizCount !== 1) err(where, `exactly one quiz block required (found ${quizCount})`);
    if (!hasKid) warn(where, 'no "kid" analogy block');
    if (interactive < 2) warn(where, `only ${interactive} interactive block(s) (exercise/lab); aim for 2+`);
    if (lessonWords < 900) warn(where, `only ~${lessonWords} words; aim for 1,200+`);
    totalWords += lessonWords;
    console.log(`  ✔ ${entry.slug} (~${lessonWords} words, ${lesson.blocks.length} blocks, ${(lesson.sources || []).length} sources)`);
  }
}

console.log(`\nChecked ${lessonsChecked} lessons, ~${totalWords.toLocaleString()} words, ${seenTerms.size} glossary terms.`);
console.log(`${errors} error(s), ${warnings} warning(s).`);
process.exit(errors ? 1 : 0);
