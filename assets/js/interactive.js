/**
 * Hands-on blocks: "exercise" (fill, order, match, classify, journal, form)
 * and "lab" simulators (three-way-match, payment-terms, depreciation,
 * journal-sandbox, coa-builder, fx). Everything runs locally in the browser.
 */
import { h, icon, sanitize, announce } from './dom.js';
import { store } from './store.js';

/* ================================================================= helpers */

const nf2 = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => nf2.format(Number.isFinite(n) ? n : 0);
const pct = (n) => `${(Math.round(n * 100) / 100).toLocaleString()}%`;
let uid = 0;
const nid = (p) => `${p}-${++uid}`;

const norm = (s) => String(s ?? '').toLowerCase().replace(/[–—]/g, '-').replace(/[^a-z0-9.\-]/g, '');
const toNum = (s) => {
  const n = parseFloat(String(s ?? '').replace(/[,\s$£€₹%]/g, ''));
  return Number.isFinite(n) ? n : NaN;
};

/** Does the learner's value match the expected answer? */
export function answerMatches(value, answer, tolerance = 0.01) {
  const list = Array.isArray(answer) ? answer : [answer];
  return list.some((a) => {
    if (typeof a === 'number') return Math.abs(toNum(value) - a) <= tolerance + 1e-9;
    return norm(value) === norm(a);
  });
}
const showAnswer = (answer) => (Array.isArray(answer) ? answer[0] : answer);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function shuffledNotSame(arr) {
  if (arr.length < 2) return [...arr];
  let s;
  let guard = 0;
  do { s = shuffle(arr); } while (s.every((x, i) => x === arr[i]) && guard++ < 20);
  return s;
}

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
/** ISO date plus some days; '' when the result is not a real date (e.g. absurd day counts). */
function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + Number(days || 0));
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}
const fmtDate = (iso) => {
  const d = iso ? new Date(`${iso}T00:00:00Z`) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toLocaleDateString(undefined, { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' }) : '—';
};

function field(label, input, hint) {
  const id = input.id || nid('f');
  input.id = id;
  return h('div', { class: 'fld' }, h('label', { for: id }, label), input, hint && h('small', { class: 'muted' }, hint));
}
const numInput = (value, attrs = {}) => h('input', { type: 'number', class: 'input', step: 'any', inputmode: 'decimal', value: value ?? '', ...attrs });
function select(options, value, attrs = {}) {
  const s = h('select', { class: 'input', ...attrs }, options.map((o) => {
    const [v, l] = Array.isArray(o) ? o : [o, o];
    return h('option', { value: v, selected: String(v) === String(value) }, l);
  }));
  return s;
}

/* Sunny Lemonade chart of accounts (see docs/CONTENT_GUIDE.md) */
export const SUNNY_ACCOUNTS = [
  ['1110', 'Cash – Big River Bank', 'Asset'],
  ['1210', 'Accounts Receivable', 'Asset'],
  ['1310', 'Inventory – Ingredients', 'Asset'],
  ['1410', 'Prepayments to Suppliers', 'Asset'],
  ['1510', 'Equipment (Fixed Assets)', 'Asset'],
  ['1520', 'Asset Clearing', 'Asset'],
  ['1530', 'Proceeds of Sale Clearing', 'Asset'],
  ['1590', 'Accumulated Depreciation', 'Contra asset'],
  ['2110', 'Accounts Payable – Trade', 'Liability'],
  ['2120', 'Received Not Invoiced Accrual', 'Liability'],
  ['2210', 'Sales Tax Payable', 'Liability'],
  ['2220', 'Withholding Tax Payable', 'Liability'],
  ['3100', "Owner's Equity", 'Equity'],
  ['4110', 'Lemonade Sales Revenue', 'Revenue'],
  ['5110', 'Lemons Cost', 'Expense'],
  ['5120', 'Sugar Cost', 'Expense'],
  ['5130', 'Cups and Straws Cost', 'Expense'],
  ['6110', 'Rent', 'Expense'],
  ['6120', 'Electricity', 'Expense'],
  ['6130', 'Travel and Meals', 'Expense'],
  ['6140', 'Depreciation Expense', 'Expense'],
  ['7110', 'Bank Charges', 'Expense'],
  ['7120', 'Foreign Exchange Gain/Loss', 'Expense'],
  ['7130', 'Gain/Loss on Asset Retirement', 'Expense'],
];
const accountLabel = ([n, name]) => `${n} ${name}`;
const DEBIT_NORMAL = new Set(['Asset', 'Expense']);
const accountInfo = (label) => SUNNY_ACCOUNTS.find((a) => label && label.startsWith(a[0]));

/* Wrapper shared by every exercise */
function exerciseShell(b, ctx, kicker, body, { check, reset, reveal }) {
  const key = `${ctx.id}#${ctx.index}`;
  const feedback = h('div', { class: 'ex-feedback', role: 'status', 'aria-live': 'polite' });
  const explain = b.explain ? h('div', { class: 'ex-explain prose', hidden: true }, h('strong', {}, '💡 Why: '), sanitize(b.explain)) : null;
  let attempts = 0;
  const done = store.isExerciseDone(key);

  const checkBtn = h('button', { class: 'btn btn-primary', type: 'button', onclick: () => {
    attempts++;
    const r = check();
    feedback.className = `ex-feedback ${r.ok ? 'ok' : 'bad'}`;
    feedback.replaceChildren(r.ok ? '✅ ' : '🤔 ', r.message);
    if (r.ok) { store.setExerciseDone(key); badge.hidden = false; }
    if (explain && (r.ok || attempts >= 2)) explain.hidden = false;
    if (!r.ok && attempts >= 2 && reveal) revealBtn.hidden = false;
    announce(r.message);
  } }, icon('check'), 'Check');
  const resetBtn = h('button', { class: 'btn', type: 'button', onclick: () => { reset(); feedback.className = 'ex-feedback'; feedback.textContent = ''; if (explain) explain.hidden = true; } }, 'Reset');
  const revealBtn = h('button', { class: 'btn', type: 'button', hidden: true, onclick: () => { reveal(); feedback.className = 'ex-feedback'; feedback.textContent = 'Here is the answer. Study it, press Reset, and try again from memory.'; if (explain) explain.hidden = false; } }, 'Show answer');
  const badge = h('span', { class: 'pill done', hidden: !done }, '✓ Done');

  return h('section', { class: 'blk blk-exercise' },
    h('div', { class: 'ex-head' }, h('span', { class: 'ex-kicker' }, `🧪 Try it yourself · ${kicker}`), badge),
    h('h2', {}, b.title),
    b.instructions && h('div', { class: 'prose ex-instructions', html: b.instructions }),
    h('div', { class: 'ex-body' }, body),
    h('div', { class: 'btn-row ex-actions' }, checkBtn, resetBtn, revealBtn),
    feedback, explain);
}

/* ================================================================= exercises */

const exercises = {
  fill(b, ctx) {
    const frag = sanitize(String(b.html).replace(/\{\{\}\}/g, () => '⟦BLANK⟧'));
    const inputs = [];
    const walker = document.createTreeWalker(frag, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) if (walker.currentNode.nodeValue.includes('⟦BLANK⟧')) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      const parts = node.nodeValue.split('⟦BLANK⟧');
      const out = [];
      parts.forEach((p, i) => {
        if (p) out.push(document.createTextNode(p));
        if (i < parts.length - 1) {
          const k = inputs.length;
          const spec = b.blanks[k] || {};
          const isNum = typeof showAnswer(spec.answer) === 'number';
          const inp = h('input', { class: 'blank', type: 'text', inputmode: isNum ? 'decimal' : 'text', 'aria-label': `Blank ${k + 1}${spec.hint ? ` (hint: ${spec.hint})` : ''}`, placeholder: spec.hint || '?', autocomplete: 'off', size: String(Math.max(6, String(showAnswer(spec.answer)).length + 2)) });
          inputs.push(inp);
          out.push(inp);
        }
      });
      node.replaceWith(...out);
    });
    const body = h('div', { class: 'prose fill' }, frag);
    return exerciseShell(b, ctx, 'Fill in the blanks', body, {
      check: () => {
        let right = 0;
        inputs.forEach((inp, k) => {
          const ok = answerMatches(inp.value, b.blanks[k].answer, b.blanks[k].tolerance);
          inp.classList.toggle('is-ok', ok); inp.classList.toggle('is-bad', !ok);
          if (ok) right++;
        });
        return right === inputs.length
          ? { ok: true, message: 'All blanks are correct!' }
          : { ok: false, message: `${right} of ${inputs.length} correct. Fix the red boxes and check again.` };
      },
      reset: () => inputs.forEach((i) => { i.value = ''; i.classList.remove('is-ok', 'is-bad'); }),
      reveal: () => inputs.forEach((i, k) => { i.value = showAnswer(b.blanks[k].answer); i.classList.remove('is-bad'); }),
    });
  },

  order(b, ctx) {
    const list = h('ol', { class: 'order-list' });
    let current = shuffledNotSame(b.items);
    let dragFrom = null;
    const render = () => {
      list.replaceChildren(...current.map((item, i) => {
        const li = h('li', { class: 'order-item', draggable: 'true' },
          h('span', { class: 'order-grip', 'aria-hidden': 'true' }, '⋮⋮'),
          h('span', { class: 'order-text' }, item),
          h('span', { class: 'order-btns' },
            h('button', { class: 'btn btn-icon btn-sm', type: 'button', 'aria-label': `Move "${item}" up`, disabled: i === 0, onclick: () => move(i, i - 1) }, '↑'),
            h('button', { class: 'btn btn-icon btn-sm', type: 'button', 'aria-label': `Move "${item}" down`, disabled: i === current.length - 1, onclick: () => move(i, i + 1) }, '↓')));
        li.addEventListener('dragstart', (e) => { dragFrom = i; li.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(i)); });
        li.addEventListener('dragend', () => li.classList.remove('dragging'));
        li.addEventListener('dragover', (e) => { e.preventDefault(); li.classList.add('drag-over'); });
        li.addEventListener('dragleave', () => li.classList.remove('drag-over'));
        li.addEventListener('drop', (e) => { e.preventDefault(); li.classList.remove('drag-over'); if (dragFrom !== null) move(dragFrom, i); dragFrom = null; });
        return li;
      }));
    };
    const move = (from, to) => {
      if (to < 0 || to >= current.length) return;
      const c = [...current];
      const [x] = c.splice(from, 1);
      c.splice(to, 0, x);
      current = c;
      render();
      list.querySelectorAll('.order-item')[to]?.querySelector(`button[aria-label^="Move"]:not([disabled])`)?.focus();
    };
    render();
    return exerciseShell(b, ctx, 'Put in order', h('div', {}, h('p', { class: 'muted small' }, 'Drag the cards, or use the ↑ ↓ buttons.'), list), {
      check: () => {
        const items = list.querySelectorAll('.order-item');
        let right = 0;
        current.forEach((x, i) => { const ok = x === b.items[i]; items[i].classList.toggle('is-ok', ok); items[i].classList.toggle('is-bad', !ok); if (ok) right++; });
        return right === b.items.length ? { ok: true, message: 'Perfect order!' } : { ok: false, message: `${right} of ${b.items.length} are in the right place (green). Move the red ones.` };
      },
      reset: () => { current = shuffledNotSame(b.items); render(); },
      reveal: () => { current = [...b.items]; render(); },
    });
  },

  match(b, ctx) {
    const rights = shuffle(b.pairs.map((p) => p.right));
    const selects = b.pairs.map((p) => select([['', 'Choose…'], ...rights], '', { 'aria-label': `Match for ${p.left}` }));
    const body = h('div', { class: 'match-grid' }, b.pairs.map((p, i) => h('div', { class: 'match-row' }, h('div', { class: 'match-left' }, p.left), h('div', { class: 'match-arrow', 'aria-hidden': 'true' }, '→'), selects[i])));
    return exerciseShell(b, ctx, 'Match them up', body, {
      check: () => {
        let right = 0;
        selects.forEach((s, i) => { const ok = s.value === b.pairs[i].right; s.classList.toggle('is-ok', ok); s.classList.toggle('is-bad', !ok); if (ok) right++; });
        return right === selects.length ? { ok: true, message: 'Every pair matches!' } : { ok: false, message: `${right} of ${selects.length} pairs are right.` };
      },
      reset: () => selects.forEach((s) => { s.value = ''; s.classList.remove('is-ok', 'is-bad'); }),
      reveal: () => selects.forEach((s, i) => { s.value = b.pairs[i].right; s.classList.remove('is-bad'); }),
    });
  },

  classify(b, ctx) {
    const items = shuffle(b.items.map((it, i) => ({ ...it, i })));
    const selects = items.map((it) => select([['', 'Choose…'], ...b.categories], '', { 'aria-label': `Category for ${it.text}` }));
    const body = h('div', { class: 'classify' },
      h('div', { class: 'classify-cats' }, b.categories.map((c) => h('span', { class: 'chip' }, c))),
      h('div', { class: 'match-grid' }, items.map((it, k) => h('div', { class: 'match-row' }, h('div', { class: 'match-left' }, it.text), h('div', { class: 'match-arrow', 'aria-hidden': 'true' }, '→'), selects[k]))));
    return exerciseShell(b, ctx, 'Sort into groups', body, {
      check: () => {
        let right = 0;
        selects.forEach((s, k) => { const ok = s.value === items[k].answer; s.classList.toggle('is-ok', ok); s.classList.toggle('is-bad', !ok); if (ok) right++; });
        return right === selects.length ? { ok: true, message: 'Everything is in the right group!' } : { ok: false, message: `${right} of ${selects.length} are in the right group.` };
      },
      reset: () => selects.forEach((s) => { s.value = ''; s.classList.remove('is-ok', 'is-bad'); }),
      reveal: () => selects.forEach((s, k) => { s.value = items[k].answer; s.classList.remove('is-bad'); }),
    });
  },

  journal(b, ctx) {
    const editor = journalEditor({ accounts: b.accounts, rows: Math.max(2, b.answer.length) });
    return exerciseShell(b, ctx, 'Build the journal entry', editor.el, {
      check: () => {
        const lines = editor.lines();
        if (!lines.length) return { ok: false, message: 'Add at least two lines with an account and an amount.' };
        if (Math.abs(editor.totals().d - editor.totals().c) > 0.005) return { ok: false, message: 'Your entry does not balance yet — total debits must equal total credits.' };
        const net = (ls) => { const m = new Map(); ls.forEach((l) => m.set(l.account, (m.get(l.account) || 0) + (l.debit || 0) - (l.credit || 0))); return m; };
        const want = net(b.answer);
        const got = net(lines);
        const keys = new Set([...want.keys(), ...got.keys()]);
        const wrong = [...keys].filter((k) => Math.abs((want.get(k) || 0) - (got.get(k) || 0)) > 0.005);
        editor.mark((l) => !wrong.includes(l.account));
        if (!wrong.length) return { ok: true, message: 'Balanced and correct. Great accounting!' };
        const missing = [...want.keys()].filter((k) => !got.has(k));
        return { ok: false, message: missing.length ? 'It balances, but some accounts are wrong or missing. Think: what went up, what went down?' : 'Right accounts, but check which side (debit or credit) and the amounts.' };
      },
      reset: () => editor.reset(),
      reveal: () => editor.set(b.answer),
    });
  },

  form(b, ctx) {
    const inputs = [];
    const grid = h('div', { class: 'pf-grid' }, b.fields.map((f) => {
      const type = f.type || 'text';
      let input;
      if (f.given !== undefined) {
        input = h('input', { class: 'input', type: 'text', value: String(f.given), readonly: true, tabindex: '-1' });
      } else if (type === 'select') {
        input = select([['', 'Select…'], ...f.options], '');
      } else if (type === 'date') {
        input = h('input', { class: 'input', type: 'date' });
      } else {
        input = h('input', { class: 'input', type: 'text', inputmode: type === 'number' ? 'decimal' : 'text', autocomplete: 'off' });
      }
      if (f.answer !== undefined) inputs.push({ f, input });
      const wrap = field(h('span', {}, f.label, f.answer !== undefined && h('span', { class: 'req', 'aria-hidden': 'true' }, ' *')), input, f.hint);
      if (f.given !== undefined) wrap.classList.add('is-given');
      return wrap;
    }));
    const screen = h('div', { class: 'practice-form' },
      h('div', { class: 'pf-bar' }, h('span', { class: 'pf-dots', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')), h('strong', {}, b.formTitle), h('span', { class: 'pf-tag' }, 'Practice screen · simulation')),
      grid);
    return exerciseShell(b, ctx, 'Practice screen', screen, {
      check: () => {
        let right = 0;
        inputs.forEach(({ f, input }) => {
          const ok = f.type === 'date' ? input.value === f.answer : answerMatches(input.value, f.answer, f.tolerance);
          input.classList.toggle('is-ok', ok); input.classList.toggle('is-bad', !ok);
          if (ok) right++;
        });
        return right === inputs.length ? { ok: true, message: 'Every field is filled in correctly. Ready to save!' } : { ok: false, message: `${right} of ${inputs.length} fields are right. Fix the red ones (read the hints under each field).` };
      },
      reset: () => inputs.forEach(({ input }) => { input.value = ''; input.classList.remove('is-ok', 'is-bad'); }),
      reveal: () => inputs.forEach(({ f, input }) => { input.value = showAnswer(f.answer); input.classList.remove('is-bad'); }),
    });
  },
};

export function renderExercise(b, ctx) {
  const fn = Object.hasOwn(exercises, b.kind) ? exercises[b.kind] : null;
  return fn ? fn(b, ctx) : h('div', { class: 'blk' }, `Unknown exercise kind: ${b.kind}`);
}

/* ================================================================= journal editor (shared) */

function journalEditor({ accounts, rows = 2, initial }) {
  const body = h('tbody');
  const totD = h('td', { class: 'num' });
  const totC = h('td', { class: 'num' });
  const status = h('p', { class: 'journal-check' });
  const onChangeFns = [];

  function addRow(line = {}) {
    const acc = select([['', 'Choose account…'], ...accounts], line.account || '', { 'aria-label': 'Account' });
    const dr = numInput(line.debit || '', { 'aria-label': 'Debit', min: '0', placeholder: '0.00' });
    const cr = numInput(line.credit || '', { 'aria-label': 'Credit', min: '0', placeholder: '0.00' });
    const tr = h('tr', {},
      h('td', {}, acc), h('td', {}, dr), h('td', {}, cr),
      h('td', {}, h('button', { class: 'btn btn-icon btn-sm', type: 'button', 'aria-label': 'Remove line', onclick: () => { tr.remove(); update(); } }, '✕')));
    [acc, dr, cr].forEach((x) => x.addEventListener('input', update));
    // typing a debit clears the credit on the same line (and vice versa)
    dr.addEventListener('input', () => { if (dr.value) cr.value = ''; });
    cr.addEventListener('input', () => { if (cr.value) dr.value = ''; });
    body.append(tr);
    update();
  }
  function lines() {
    return [...body.rows].map((tr) => {
      const [a, d, c] = tr.querySelectorAll('select, input');
      return { tr, account: a.value, debit: toNum(d.value) || 0, credit: toNum(c.value) || 0 };
    }).filter((l) => l.account && (l.debit || l.credit));
  }
  function totals() {
    const ls = lines();
    return { d: ls.reduce((s, l) => s + l.debit, 0), c: ls.reduce((s, l) => s + l.credit, 0) };
  }
  function update() {
    const { d, c } = totals();
    totD.textContent = money(d);
    totC.textContent = money(c);
    const balanced = d > 0 && Math.abs(d - c) < 0.005;
    status.className = `journal-check ${balanced ? 'ok' : d || c ? 'bad' : ''}`;
    status.textContent = balanced ? '⚖️ Balanced: debits equal credits.' : d || c ? `⚖️ Not balanced yet: difference ${money(Math.abs(d - c))}` : 'Choose accounts and type amounts.';
    [...body.rows].forEach((tr) => tr.classList.remove('is-ok', 'is-bad'));
    onChangeFns.forEach((fn) => fn());
  }
  function reset() { body.replaceChildren(); for (let i = 0; i < rows; i++) addRow(); }
  function set(ls) { body.replaceChildren(); ls.forEach((l) => addRow(l)); }
  function mark(isOk) { lines().forEach((l) => { l.tr.classList.toggle('is-ok', isOk(l)); l.tr.classList.toggle('is-bad', !isOk(l)); }); }

  if (initial && initial.length) set(initial); else reset();

  const el = h('div', { class: 'journal-editor' },
    h('div', { class: 'table-wrap' },
      h('table', { class: 'journal je' },
        h('thead', {}, h('tr', {}, h('th', {}, 'Account'), h('th', { class: 'num' }, 'Debit'), h('th', { class: 'num' }, 'Credit'), h('th', { 'aria-label': 'Remove' }))),
        body,
        h('tfoot', {}, h('tr', {}, h('th', {}, 'Total'), totD, totC, h('td'))))),
    h('div', { class: 'btn-row' }, h('button', { class: 'btn btn-sm', type: 'button', onclick: () => addRow() }, '+ Add line'), status));
  return { el, lines, totals, reset, set, mark, onChange: (fn) => onChangeFns.push(fn) };
}

/* ================================================================= labs */

function labShell(title, intro, controls, output) {
  return h('section', { class: 'blk blk-lab' },
    h('div', { class: 'ex-head' }, h('span', { class: 'ex-kicker' }, '🔬 Practice lab · change the numbers and watch')),
    h('h2', {}, title),
    intro && h('div', { class: 'prose', html: intro }),
    h('div', { class: 'lab-grid' }, h('div', { class: 'lab-controls' }, controls), h('div', { class: 'lab-output', 'aria-live': 'polite' }, output)));
}

function resultRow(label, value, cls = '') {
  return h('div', { class: `lab-row ${cls}` }, h('span', {}, label), h('strong', {}, value));
}

export const LABS = {
  'three-way-match': {
    title: 'Three-way match checker',
    icon: '🧾',
    blurb: 'Compare a purchase order, a receipt and an invoice. See whether a matching hold would stop the invoice.',
    render(p = {}) {
      const v = { level: 3, poQty: 1000, poPrice: 0.5, rcvQty: 1000, accQty: 1000, invQty: 1000, invPrice: 0.52, qtyTol: 0, priceTol: 2, ...p };
      const level = select([[2, '2-way (PO + invoice)'], [3, '3-way (PO + receipt + invoice)'], [4, '4-way (PO + receipt + inspection + invoice)']], v.level);
      const ins = {
        poQty: numInput(v.poQty), poPrice: numInput(v.poPrice), rcvQty: numInput(v.rcvQty), accQty: numInput(v.accQty),
        invQty: numInput(v.invQty), invPrice: numInput(v.invPrice), qtyTol: numInput(v.qtyTol), priceTol: numInput(v.priceTol),
      };
      const accWrap = field('Quantity accepted after inspection', ins.accQty);
      const rcvWrap = field('Quantity received', ins.rcvQty);
      const out = h('div');
      const controls = h('div', {},
        field('Match level', level),
        h('fieldset', { class: 'lab-set' }, h('legend', {}, '📄 Purchase order'), field('Quantity ordered', ins.poQty), field('Unit price', ins.poPrice)),
        h('fieldset', { class: 'lab-set' }, h('legend', {}, '📦 Receiving'), rcvWrap, accWrap),
        h('fieldset', { class: 'lab-set' }, h('legend', {}, '🧾 Supplier invoice'), field('Quantity billed', ins.invQty), field('Unit price billed', ins.invPrice)),
        h('fieldset', { class: 'lab-set' }, h('legend', {}, '🎚️ Tolerances (set up by the company)'), field('Quantity tolerance %', ins.qtyTol), field('Price tolerance %', ins.priceTol)));
      const calc = () => {
        const n = Object.fromEntries(Object.entries(ins).map(([k, el]) => [k, toNum(el.value) || 0]));
        const L = Number(level.value);
        rcvWrap.hidden = L < 3;
        accWrap.hidden = L < 4;
        const qMax = (q) => q * (1 + n.qtyTol / 100);
        const checks = [
          { name: 'Quantity billed ≤ quantity ordered', ok: n.invQty <= qMax(n.poQty) + 1e-9, why: `${n.invQty} billed vs ${n.poQty} ordered`, hold: 'Qty Ord' },
          { name: 'Price billed within price tolerance', ok: n.invPrice <= n.poPrice * (1 + n.priceTol / 100) + 1e-9, why: `${money(n.invPrice)} vs ${money(n.poPrice)} (+${n.priceTol}% allowed = up to ${money(n.poPrice * (1 + n.priceTol / 100))})`, hold: 'Price' },
        ];
        if (L >= 3) checks.push({ name: 'Quantity billed ≤ quantity received', ok: n.invQty <= qMax(n.rcvQty) + 1e-9, why: `${n.invQty} billed vs ${n.rcvQty} received`, hold: 'Qty Rec' });
        if (L >= 4) checks.push({ name: 'Quantity billed ≤ quantity accepted', ok: n.invQty <= qMax(n.accQty) + 1e-9, why: `${n.invQty} billed vs ${n.accQty} accepted`, hold: 'quantity accepted (receiving inspection)' });
        const fails = checks.filter((c) => !c.ok);
        const variance = (n.invPrice - n.poPrice) * n.invQty;
        out.replaceChildren(
          h('div', { class: `verdict ${fails.length ? 'bad' : 'ok'}` },
            fails.length ? `🛑 Validation would place ${fails.length} matching hold${fails.length > 1 ? 's' : ''}` : '✅ No matching holds — the invoice can be validated',
            fails.length ? h('small', {}, `Matching hold${fails.length > 1 ? 's' : ''}: ${fails.map((f) => f.hold).join(', ')}. Ava must fix the cause (or an authorized person releases the hold) before it can be paid.`) : h('small', {}, 'Everything agrees within tolerance.')),
          h('ul', { class: 'checklist' }, checks.map((c) => h('li', { class: c.ok ? 'ok' : 'bad' }, h('strong', {}, `${c.ok ? '✓' : '✕'} ${c.name}`), h('span', {}, c.why)))),
          resultRow('Invoice amount', money(n.invQty * n.invPrice)),
          resultRow('PO value of the billed quantity', money(n.invQty * n.poPrice)),
          resultRow('Price variance', money(variance), variance > 0.005 ? 'warn' : ''),
          h('p', { class: 'muted small' }, 'Simplified simulation for learning. In Oracle Fusion the match level is set on the PO schedule, and tolerance templates are configured during setup.'));
      };
      [level, ...Object.values(ins)].forEach((x) => x.addEventListener('input', calc));
      calc();
      return { controls, output: out };
    },
  },

  'payment-terms': {
    title: 'Payment terms and discount calculator',
    icon: '📅',
    blurb: 'Work out due dates, early-payment discounts like 2/10 Net 30, and what paying late costs.',
    render(p = {}) {
      const v = { invoiceDate: '2026-01-05', amount: 500, netDays: 30, discountPct: 2, discountDays: 10, payDate: '2026-01-14', ...p };
      const ins = {
        invoiceDate: h('input', { class: 'input', type: 'date', value: v.invoiceDate }),
        amount: numInput(v.amount, { min: '0' }), netDays: numInput(v.netDays, { min: '0', max: '3650', step: '1' }),
        discountPct: numInput(v.discountPct, { min: '0', max: '100' }), discountDays: numInput(v.discountDays, { min: '0', max: '3650', step: '1' }),
        payDate: h('input', { class: 'input', type: 'date', value: v.payDate }),
      };
      const out = h('div');
      const controls = h('div', {},
        field('Invoice date (terms start)', ins.invoiceDate), field('Invoice amount', ins.amount),
        h('fieldset', { class: 'lab-set' }, h('legend', {}, 'Payment terms'), field('Net days (pay in full within)', ins.netDays), field('Discount %', ins.discountPct), field('Discount days', ins.discountDays)),
        field('Date we actually pay', ins.payDate));
      const calc = () => {
        const d0 = ins.invoiceDate.value || v.invoiceDate;
        // Keep the numbers in a real-world range: whole days up to 10 years, discount 0-100%.
        const amt = Math.max(0, toNum(ins.amount.value) || 0);
        const net = clamp(Math.round(toNum(ins.netDays.value) || 0), 0, 3650);
        const dp = clamp(toNum(ins.discountPct.value) || 0, 0, 100);
        const dd = clamp(Math.round(toNum(ins.discountDays.value) || 0), 0, 3650);
        const due = addDays(d0, net);
        const discDate = addDays(d0, dd);
        const pay = ins.payDate.value;
        const disc = Math.round(amt * dp) / 100;
        const takes = dp > 0 && pay && pay <= discDate;
        const late = pay && pay > due;
        const termName = dp > 0 ? `${dp}/${dd} Net ${net}` : `Net ${net}`;
        const annual = dp > 0 && dp < 100 && net > dd ? (dp / (100 - dp)) * (365 / (net - dd)) * 100 : 0;
        out.replaceChildren(
          h('div', { class: `verdict ${late ? 'bad' : 'ok'}` }, `Terms: ${termName}`, h('small', {}, dp > 0 ? `Pay by ${fmtDate(discDate)} to save ${money(disc)}; otherwise pay ${money(amt)} by ${fmtDate(due)}.` : `Pay ${money(amt)} by ${fmtDate(due)}.`)),
          dp > 0 && resultRow('Discount date', fmtDate(discDate)),
          resultRow('Due date', fmtDate(due)),
          dp > 0 && resultRow('Discount if paid on time', money(disc)),
          pay && resultRow(`Amount to pay on ${fmtDate(pay)}`, money(takes ? amt - disc : amt), takes ? 'good' : ''),
          pay && h('p', { class: late ? 'bad-text' : 'muted' }, late ? '⚠️ That is after the due date — the payment is late. Suppliers may charge interest and trust goes down.' : takes ? '🎉 You pay within the discount window and keep the discount.' : 'No discount taken, but paid on time.'),
          annual > 0 && h('p', { class: 'muted small' }, `Skipping a ${dp}% discount to keep the cash ${net - dd} extra days is like paying about ${pct(annual)} interest per year — that is why companies love taking discounts.`));
      };
      Object.values(ins).forEach((x) => x.addEventListener('input', calc));
      calc();
      return { controls, output: out };
    },
  },

  depreciation: {
    title: 'Depreciation schedule',
    icon: '📉',
    blurb: 'See how an asset’s cost is spread over its life with straight-line or declining-balance depreciation.',
    render(p = {}) {
      const v = { cost: 6000, salvage: 0, lifeMonths: 60, method: 'sl', rate: 200, ...p };
      const ins = { cost: numInput(v.cost, { min: '0' }), salvage: numInput(v.salvage, { min: '0' }), lifeMonths: numInput(v.lifeMonths, { min: '1', max: '1200', step: '1' }), rate: numInput(v.rate, { min: '1', max: '1000' }) };
      const method = select([['sl', 'Straight-line (same amount every month)'], ['db', 'Declining balance (more at the start)']], v.method);
      const rateWrap = field('Declining-balance rate % (200 = double declining)', ins.rate);
      const out = h('div');
      const controls = h('div', {}, field('Method', method), field('Cost', ins.cost), field('Salvage (left-over) value', ins.salvage), field('Useful life in months', ins.lifeMonths), rateWrap);
      const calc = () => {
        // Real-world ranges keep the schedule small: life 1-1200 months (100 years), rate 1-1000%.
        const cost = Math.max(0, toNum(ins.cost.value) || 0);
        const salv = clamp(toNum(ins.salvage.value) || 0, 0, cost);
        const life = clamp(Math.round(toNum(ins.lifeMonths.value) || 1), 1, 1200);
        const db = method.value === 'db';
        rateWrap.hidden = !db;
        const annualRate = (clamp(toNum(ins.rate.value) || 200, 1, 1000) / 100) / (life / 12);
        let nbv = cost;
        let acc = 0;
        const years = [];
        let first = 0;
        for (let m = 1; m <= life; m++) {
          let dep = db ? (nbv * annualRate) / 12 : (cost - salv) / life;
          if (m === life || nbv - dep < salv) dep = nbv - salv;
          dep = Math.max(0, dep);
          if (m === 1) first = dep;
          nbv -= dep; acc += dep;
          const y = Math.ceil(m / 12) - 1;
          years[y] = years[y] || { year: y + 1, dep: 0 };
          years[y].dep += dep;
          years[y].acc = acc; years[y].nbv = nbv;
        }
        out.replaceChildren(
          h('div', { class: 'verdict ok' }, `First month’s depreciation: ${money(first)}`, h('small', {}, db ? 'Declining balance takes a bigger bite early, then smaller ones.' : `Same amount every month for ${life} months.`)),
          h('div', { class: 'table-wrap' }, h('table', {},
            h('thead', {}, h('tr', {}, h('th', {}, 'Year'), h('th', { class: 'num' }, 'Depreciation'), h('th', { class: 'num' }, 'Accumulated'), h('th', { class: 'num' }, 'Net book value'))),
            h('tbody', {}, years.map((y) => h('tr', {}, h('td', {}, `Year ${y.year}`), h('td', { class: 'num' }, money(y.dep)), h('td', { class: 'num' }, money(y.acc)), h('td', { class: 'num' }, money(y.nbv))))))),
          h('div', { class: 'mini-journal' }, h('strong', {}, 'Each month’s journal: '), `Dr 6140 Depreciation Expense / Cr 1590 Accumulated Depreciation (${money(first)} in month 1).`),
          h('p', { class: 'muted small' }, 'Simplified: ignores prorate conventions and partial periods, which Oracle Fusion Assets handles for you.'));
      };
      [method, ...Object.values(ins)].forEach((x) => x.addEventListener('input', calc));
      calc();
      return { controls, output: out };
    },
  },

  'journal-sandbox': {
    title: 'Journal entry sandbox',
    icon: '⚖️',
    blurb: 'Build any journal entry with the Sunny Lemonade chart of accounts and see what happens to each account.',
    render(p = {}) {
      const editor = journalEditor({ accounts: SUNNY_ACCOUNTS.map(accountLabel), rows: 2, initial: p.lines });
      const out = h('div');
      const calc = () => {
        const lines = editor.lines();
        if (!lines.length) { out.replaceChildren(h('p', { class: 'muted' }, 'Add lines on the left. Each account will show whether it went up or down, and why.')); return; }
        const net = new Map();
        lines.forEach((l) => net.set(l.account, (net.get(l.account) || 0) + l.debit - l.credit));
        out.replaceChildren(
          h('h3', {}, 'What happened to each account'),
          h('ul', { class: 'effects' }, [...net.entries()].map(([acc, n]) => {
            const info = accountInfo(acc) || ['', acc, 'Unknown'];
            const type = info[2];
            const debitNormal = DEBIT_NORMAL.has(type);
            const up = debitNormal ? n > 0 : n < 0;
            return h('li', { class: up ? 'up' : 'down' },
              h('strong', {}, `${up ? '⬆' : '⬇'} ${acc}`),
              h('span', {}, `${type} · ${n > 0 ? 'debit' : 'credit'} of ${money(Math.abs(n))} → ${up ? 'goes UP' : 'goes DOWN'} (${type === 'Contra asset' ? 'a contra-asset grows with credits' : debitNormal ? `${type.toLowerCase()}s grow with debits` : `${type.toLowerCase()}s grow with credits`})`));
          })),
          h('p', { class: 'muted small' }, 'Memory trick: Debits increase Expenses and Assets; Credits increase Liabilities, Equity and Revenue.'));
      };
      editor.onChange(calc);
      calc();
      return { controls: editor.el, output: out, wide: true };
    },
  },

  'coa-builder': {
    title: 'Chart of accounts combination builder',
    icon: '🧱',
    blurb: 'Pick one value for each segment of the Sunny COA and see the account combination — and whether it passes the rules.',
    render(p = {}) {
      const segs = {
        company: [['101', 'Sunny Lemonade US Inc.'], ['201', 'Sunny Lemonade UK Ltd']],
        costCenter: [['100', 'Administration'], ['200', 'Kitchen'], ['300', 'Sales']],
        account: SUNNY_ACCOUNTS.map(([n, name]) => [n, name]),
        product: [['000', 'None'], ['010', 'Classic Lemonade'], ['020', 'Pink Lemonade']],
        intercompany: [['000', 'None'], ['101', 'US'], ['201', 'UK']],
      };
      const labels = { company: 'Company', costCenter: 'Cost Center', account: 'Account', product: 'Product', intercompany: 'Intercompany' };
      const v = { company: '101', costCenter: '200', account: '5110', product: '010', intercompany: '000', ...p };
      const sels = Object.fromEntries(Object.entries(segs).map(([k, vals]) => [k, select(vals.map(([c, n]) => [c, `${c} – ${n}`]), v[k])]));
      const out = h('div');
      const controls = h('div', {}, Object.keys(segs).map((k) => field(labels[k], sels[k])));
      const calc = () => {
        const val = Object.fromEntries(Object.entries(sels).map(([k, s]) => [k, s.value]));
        const name = (k) => segs[k].find(([c]) => c === val[k])?.[1];
        const acc = SUNNY_ACCOUNTS.find((a) => a[0] === val.account);
        const bs = ['Asset', 'Contra asset', 'Liability', 'Equity'].includes(acc[2]);
        const rules = [
          { name: 'Revenue accounts (4xxx) must use cost center 300 Sales', ok: !val.account.startsWith('4') || val.costCenter === '300' },
          { name: 'Balance sheet accounts (1xxx–3xxx) must use product 000 None', ok: !bs || val.product === '000' },
          { name: 'A company cannot be its own intercompany partner', ok: val.intercompany === '000' || val.intercompany !== val.company },
        ];
        const bad = rules.filter((r) => !r.ok);
        out.replaceChildren(
          h('div', { class: 'combo' }, Object.keys(segs).map((k, i) => [i ? h('span', { class: 'combo-sep' }, '-') : null, h('span', { class: 'combo-seg', title: labels[k] }, val[k])])),
          h('p', { class: 'combo-desc' }, Object.keys(segs).map((k) => name(k)).join(' · ')),
          h('p', {}, `Account type: `, h('strong', {}, acc[2]), bs ? ' (balance sheet)' : ' (income statement)'),
          h('div', { class: `verdict ${bad.length ? 'bad' : 'ok'}` }, bad.length ? '🛑 Blocked by a cross-validation rule' : '✅ Valid combination', h('small', {}, bad.length ? 'Oracle Fusion would not let anyone use this combination.' : 'This combination can be used on journals and invoices.')),
          h('ul', { class: 'checklist' }, rules.map((r) => h('li', { class: r.ok ? 'ok' : 'bad' }, h('strong', {}, `${r.ok ? '✓' : '✕'} ${r.name}`)))),
          h('p', { class: 'muted small' }, 'These are made-up example rules for Sunny Lemonade. Real companies design their own cross-validation rules during setup.'));
      };
      Object.values(sels).forEach((s) => s.addEventListener('input', calc));
      calc();
      return { controls, output: out };
    },
  },

  fx: {
    title: 'Foreign currency and revaluation',
    icon: '💱',
    blurb: 'Convert a foreign-currency amount and see the gain or loss when the exchange rate moves.',
    render(p = {}) {
      const v = { amount: 1000, currency: 'GBP', rate1: 1.25, rate2: 1.3, side: 'own', ...p };
      const ins = { amount: numInput(v.amount), rate1: numInput(v.rate1), rate2: numInput(v.rate2) };
      const cur = select(['GBP', 'EUR', 'INR', 'JPY', 'CAD'], v.currency);
      const side = select([['own', 'Something we OWN (e.g. a bank balance or a customer invoice)'], ['owe', 'Something we OWE (e.g. a supplier invoice)']], v.side);
      const out = h('div');
      const controls = h('div', {}, field('Amount in foreign currency', ins.amount), field('Currency', cur), field('Rate when booked (1 unit = ? USD)', ins.rate1), field('Rate at month-end (1 unit = ? USD)', ins.rate2), field('Is it…', side));
      const calc = () => {
        const a = toNum(ins.amount.value) || 0;
        const r1 = toNum(ins.rate1.value) || 0;
        const r2 = toNum(ins.rate2.value) || 0;
        const u1 = a * r1;
        const u2 = a * r2;
        const diff = u2 - u1;
        const own = side.value === 'own';
        const gain = own ? diff > 0 : diff < 0;
        const amt = Math.abs(diff);
        out.replaceChildren(
          resultRow(`${a.toLocaleString()} ${cur.value} when booked`, `${money(u1)} USD`),
          resultRow(`${a.toLocaleString()} ${cur.value} at month-end`, `${money(u2)} USD`),
          h('div', { class: `verdict ${amt < 0.005 ? 'ok' : gain ? 'ok' : 'bad'}` },
            amt < 0.005 ? 'No change — no gain or loss' : `${gain ? '📈 Unrealized gain' : '📉 Unrealized loss'} of ${money(amt)} USD`,
            h('small', {}, amt < 0.005 ? 'The rate did not move.' : own ? `The ${cur.value} we own is now worth ${diff > 0 ? 'more' : 'less'} US dollars.` : `The ${cur.value} we owe now costs ${diff > 0 ? 'more' : 'fewer'} US dollars to pay.`)),
          amt >= 0.005 && h('div', { class: 'mini-journal' }, h('strong', {}, 'Revaluation journal: '),
            own
              ? (gain ? `Dr 1110 Cash (or 1210 AR) ${money(amt)} / Cr 7120 Foreign Exchange Gain/Loss ${money(amt)}` : `Dr 7120 Foreign Exchange Gain/Loss ${money(amt)} / Cr 1110 Cash (or 1210 AR) ${money(amt)}`)
              : (gain ? `Dr 2110 Accounts Payable ${money(amt)} / Cr 7120 Foreign Exchange Gain/Loss ${money(amt)}` : `Dr 7120 Foreign Exchange Gain/Loss ${money(amt)} / Cr 2110 Accounts Payable ${money(amt)}`)),
          h('p', { class: 'muted small' }, 'In Oracle Fusion General Ledger, the revaluation process calculates this for foreign-currency balances at period end, usually reversing it at the start of the next period.'));
      };
      [cur, side, ...Object.values(ins)].forEach((x) => x.addEventListener('input', calc));
      calc();
      return { controls, output: out };
    },
  },
};

export function renderLab(b) {
  const lab = Object.hasOwn(LABS, b.tool) ? LABS[b.tool] : null;
  if (!lab) return h('div', { class: 'blk' }, `Unknown lab: ${b.tool}`);
  const { controls, output, wide } = lab.render(b.preset || {});
  const el = labShell(b.title || lab.title, b.intro, controls, output);
  if (wide) el.classList.add('lab-wide');
  return el;
}
