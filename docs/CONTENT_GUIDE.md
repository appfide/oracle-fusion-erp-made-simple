# Content Guide

This guide is the contract for everyone who writes or edits lessons. Read it fully before opening a pull request.

## 1. Who we write for

Imagine a smart, curious **10-year-old** who has never worked in an office. They know what money, a piggy bank, a shop and a notebook are. They do **not** know what a ledger, an invoice or a supplier is — yet.

Every lesson must:

1. **Start from something a child already knows** (a lemonade stand, a school, a piggy bank, a library, a birthday party).
2. **Introduce one new idea at a time**, give it its real name, and say it again in plain words.
3. **Connect the idea to the real Oracle Fusion Cloud ERP** — the real names of the screens, work areas, processes and reports — so the learner can actually use the product later.
4. **Show, don't just tell** — use slides, flows, worked examples, tables and journal entries.
5. **Check understanding** with a short quiz that explains *why* each answer is right.

Tone: warm, encouraging, never condescending. Short sentences. Active voice. Explain every acronym the first time it appears in a lesson (e.g. "AP (Accounts Payable)"). No jokes that depend on culture or slang.

## 2. Accuracy rules (very important)

This is an open-source educational project that credits its sources. Accuracy is non-negotiable.

- **Every Oracle-specific fact** (names of work areas, tasks, processes, reports, roles, invoice types, hold names, release names, features) must come from an **official Oracle source** you actually opened: `docs.oracle.com`, `oracle.com`, Oracle University / MyLearn, Oracle Cloud Readiness (`docs.oracle.com/en/cloud/saas/readiness/...`), or Oracle blogs (`blogs.oracle.com`).
- General accounting concepts (debits, credits, accruals, depreciation) may be explained from general knowledge, but if you cite, prefer reputable sources (e.g. IFRS Foundation, FASB, OpenStax open textbooks, Investopedia).
- **Never invent** menu paths, field names, report names, process names or numbers. If you are not sure the exact name is current, describe it in general terms ("in the Invoices work area") rather than guessing.
- The user interface changes every quarter, and Oracle is moving pages to the **Redwood** design. When you describe click paths, add a note that labels may differ slightly by release and by how the company configured its system.
- **Do not copy text** from Oracle documentation. Read it, understand it, and **explain it in your own simple words**. Short quotations of names/labels are fine.
- List every source you used in the lesson's `sources` array, with a real, working URL (https only). Prefer the most specific page (a guide chapter/topic) over a generic home page.
- **Target release:** lessons match the Oracle update named in `ORACLE.release` in `assets/js/config.js` (currently **26D**). Link to that release's Help Center books (`.../financials/26d/...`). When you say a feature arrived in a specific update, name it ("added in 26B").
- **Quarterly refresh:** when Oracle publishes a new update, read the Financials, Procurement and Common Technologies *What's New* (especially *Replaced or Removed Features*), fix affected lessons, move source links to the new release, then update `ORACLE` in `config.js` and bump `VERSION` in `sw.js`.
- No screenshots or images from Oracle (copyright). Use our built-in blocks (slides, flows, tables, journals) and emoji instead.

## 3. Our story world (use it everywhere)

To make learning feel like one big story, all examples use the same imaginary company. Keep names and numbers consistent.

**Sunny Lemonade Co.** started as a lemonade stand and grew into a real company.

| Thing | Name in our story |
|---|---|
| Enterprise (the whole family of companies) | Sunny Group |
| Legal entity 1 | Sunny Lemonade US Inc. (currency USD) |
| Legal entity 2 | Sunny Lemonade UK Ltd (currency GBP) |
| Primary ledgers | Sunny US Ledger (USD), Sunny UK Ledger (GBP) |
| Business units | Sunny US BU, Sunny UK BU |
| Bank | Big River Bank — operating account "Sunny Operating Account" |
| Calendar | Monthly calendar, January to December (periods like `Jan-26`) |

**People** (use names; when a pronoun is needed use *they/them*):

| Person | Job |
|---|---|
| Sam | Founder and Chief Financial Officer (CFO) |
| Ava | Payables specialist (pays the bills) |
| Leo | Buyer (procurement — orders things) |
| Priya | General ledger accountant |
| Omar | Receivables specialist (collects money) |
| Mia | Treasury / cash manager |
| Jordan | Implementation consultant (sets the system up) |
| Noah | Kitchen manager (receives deliveries, submits expenses) |

**Suppliers:** Lemon Grove Farms (lemons), Sweet Sugar Co. (sugar), Cup & Straw Supply (cups and straws), Bright Power Utility (electricity), Stand Builders LLC (builds lemonade stands and kitchen equipment).

**Customers:** Happy Cafe, City Park Kiosk, Sunshine School.

**Chart of accounts — "Sunny COA"** (5 segments): `Company - Cost Center - Account - Product - Intercompany`, e.g. `101-200-5110-010-000`.

| Segment | Values |
|---|---|
| Company | 101 Sunny Lemonade US Inc., 201 Sunny Lemonade UK Ltd |
| Cost Center | 100 Administration, 200 Kitchen, 300 Sales |
| Account | see below |
| Product | 000 None, 010 Classic Lemonade, 020 Pink Lemonade |
| Intercompany | 000 None, 101 US, 201 UK |

| Account | Name | Type |
|---|---|---|
| 1110 | Cash – Big River Bank | Asset |
| 1210 | Accounts Receivable | Asset |
| 1310 | Inventory – Ingredients | Asset |
| 1410 | Prepayments to Suppliers | Asset |
| 1510 | Equipment (Fixed Assets) | Asset |
| 1520 | Asset Clearing | Asset (clearing) |
| 1530 | Proceeds of Sale Clearing | Asset (clearing) |
| 1590 | Accumulated Depreciation | Asset (contra) |
| 2110 | Accounts Payable – Trade | Liability |
| 2120 | Received Not Invoiced Accrual | Liability |
| 2210 | Sales Tax Payable | Liability |
| 2220 | Withholding Tax Payable | Liability |
| 3100 | Owner's Equity | Equity |
| 4110 | Lemonade Sales Revenue | Revenue |
| 5110 | Lemons Cost | Expense |
| 5120 | Sugar Cost | Expense |
| 5130 | Cups and Straws Cost | Expense |
| 6110 | Rent | Expense |
| 6120 | Electricity | Expense |
| 6130 | Travel and Meals | Expense |
| 6140 | Depreciation Expense | Expense |
| 7110 | Bank Charges | Expense |
| 7120 | Foreign Exchange Gain/Loss | Expense/Income |
| 7130 | Gain/Loss on Asset Retirement | Expense/Income |

Other story constants: Sales tax in examples is **5%** (Happy Cafe invoice $400 + $20 tax = $420). Asset books: SUNNY US CORP, SUNNY US TAX, SUNNY UK CORP. The lemonade stand is placed in service on June 1, 2026.

**Standard numbers** (reuse when it fits): Lemon Grove Farms sells 1,000 lemons at $0.50 = **$500**. Payment terms **Net 30**. Sugar invoice $200. Electricity bill $150. A new lemonade stand from Stand Builders LLC costs **$6,000**, useful life 5 years (60 months), straight-line → $100 per month. Happy Cafe buys 200 bottles of lemonade at $2 = **$400**.

## 4. File format

Each lesson is one ES module file at `content/lessons/<moduleId>/<slug>.js`. The `<moduleId>` and `<slug>` must match `content/curriculum.js`.

```js
export default {
  // must equal the file name (without .js) and the slug in curriculum.js
  slug: 'what-is-payables',
  title: 'What Is Accounts Payable?',      // same as curriculum.js
  minutes: 12,                               // honest reading + quiz time estimate
  summary: 'One or two sentences shown on the module page.',
  objectives: [                              // 3–5 items, start with a verb
    'Explain what Accounts Payable means in your own words',
  ],
  blocks: [ /* see block types below */ ],
  sources: [                                 // at least 1, ideally 3+
    { title: 'Using Payables Invoice to Pay', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/...' },
  ],
};
```

### HTML inside blocks

Fields named `html` accept a **small, safe subset of HTML**: `<p> <strong> <em> <ul> <ol> <li> <code> <br> <a href="https://..."> <kbd> <span class="hl">` (highlight). No `<script>`, no inline styles, no images, no iframes. Use `<kbd>` for buttons/labels the learner clicks, e.g. `<kbd>Create Invoice</kbd>`.

Write strings with backticks (template literals) when they are long. Escape backticks inside if needed.

### Block types

| `type` | Purpose | Fields |
|---|---|---|
| `text` | Normal explanation | `html`, optional `heading` |
| `kid` | "Explain it like I'm 10" analogy box — use at least once per lesson, usually first | `title`, `html` |
| `callout` | Tip / warning / note / real-world | `variant`: `tip` \| `warning` \| `info` \| `oracle` (an "In Oracle Fusion" box) \| `real` (real-world job tip), `title`, `html` |
| `slides` | A mini slide deck (great for step-by-step ideas). 3–8 slides | `title`, `slides: [{ icon, title, html }]` (`icon` is one emoji) |
| `flow` | A process diagram (boxes with arrows) | `title`, `steps: [{ icon, label, detail }]`, optional `note` |
| `example` | Worked example using the story world | `title`, `html`, optional `steps: [html, ...]`, optional `result` (html) |
| `table` | Comparison or reference table | `caption`, `headers: []`, `rows: [[...], ...]` (cells may contain the safe HTML) |
| `journal` | An accounting journal entry shown as a T-style table | `title`, `lines: [{ account, debit, credit }]` (numbers, use 0 when empty), optional `note` (html). Debits must equal credits. `account` like `'2110 Accounts Payable – Trade'`. |
| `steps` | "Try it in Oracle" click path / procedure | `title`, `items: [html, ...]`, optional `note` (html) |
| `terms` | Key words for this lesson (also feed the global glossary) | `items: [{ term, def }]` — `def` is plain text, 1–2 simple sentences |
| `quiz` | End-of-lesson check. Exactly one quiz block, as the LAST block. 3–5 questions | `questions: [{ q, options: [..], answer: <index>, explain }]` — 3 or 4 options, `answer` is 0-based, `explain` says why |

### Hands-on blocks (Codelabs-style "try it yourself")

Lessons are shown step by step, like Google Codelabs. A new **step** starts automatically at each `text` block that has a `heading`, and at each `kid` (after the first), `slides`, `flow`, `example`, `exercise`, `lab`, `steps`, `terms` and `quiz` block. `callout`, `table`, `journal` and heading-less `text` blocks join the step before them. So give each step-starting block a clear `title`/`heading` — it becomes the step name.

Every lesson should have **at least 2 interactive blocks** (`exercise` or `lab`), placed right after the idea they practise. They check answers instantly and explain why.

**`exercise`** — common fields: `kind`, `title`, `instructions` (html), `explain` (html, shown after checking). Kinds:

| `kind` | What the learner does | Extra fields |
|---|---|---|
| `fill` | Types answers into blanks inside a sentence or mini-table | `html` with `{{}}` marking each blank in order; `blanks: [{ answer, hint? }]`. `answer` is a number (checked with `tolerance`, default 0.01) or a string / array of accepted strings (case, spaces and punctuation ignored). |
| `order` | Puts items in the right order (drag or ↑/↓ buttons) | `items: [...]` — written in the **correct** order; the app shuffles them. 3–8 items. |
| `match` | Matches each left item to the right one (dropdowns) | `pairs: [{ left, right }]` 3–7 pairs. |
| `classify` | Puts each item in a bucket (dropdowns) | `categories: [...]`, `items: [{ text, answer }]` (`answer` must be one of the categories). |
| `journal` | Builds a journal entry: picks accounts and types debit/credit amounts | `accounts: [...]` (choices, include some wrong ones), `answer: [{ account, debit, credit }]` (must balance; line order doesn't matter). |
| `form` | Fills a **practice form** that looks like a simple business screen (e.g. an invoice). Clearly a simulation, not a copy of Oracle's screens. | `formTitle`, `fields: [{ label, type: 'text' \| 'number' \| 'select' \| 'date', options?, answer?, given?, hint?, tolerance? }]`. Use `given` for read-only pre-filled info (no `answer`). `date` answers are `YYYY-MM-DD`. |

**`lab`** — embeds an interactive simulator from the Practice Lab with preset values. Fields: `tool`, optional `title`, `intro` (html), `preset` (object).

| `tool` | Simulates | `preset` keys (all optional) |
|---|---|---|
| `three-way-match` | PO vs receipt vs invoice matching and whether a matching hold would be placed | `poQty, poPrice, rcvQty, invQty, invPrice, qtyTol, priceTol, level` (`level`: 2, 3 or 4; tolerances in %) |
| `payment-terms` | Due date, discount date and discount for terms like 2/10 Net 30 | `invoiceDate` (YYYY-MM-DD), `amount, netDays, discountPct, discountDays, payDate` |
| `depreciation` | Straight-line or declining-balance schedule and net book value | `cost, salvage, lifeMonths, method` (`'sl'` or `'db'`), `rate` (DB % e.g. 200) |
| `journal-sandbox` | Free journal builder with live balance check and effect on each account (T-accounts) | `lines: [{ account, debit, credit }]` — accounts from the Sunny COA list in section 3, written as `'2110 Accounts Payable – Trade'` |
| `coa-builder` | Builds a Sunny COA account combination and checks example cross-validation rules | `company, costCenter, account, product, intercompany` (segment values) |
| `fx` | Converts a foreign-currency amount and shows the revaluation gain/loss when the rate changes | `amount, currency, rate1, rate2` |

Example:

```js
{ type: 'exercise', kind: 'journal', title: 'Record the lemon invoice',
  instructions: '<p>Ava enters the $500 Lemon Grove Farms invoice (not matched to a PO). Build the accounting.</p>',
  accounts: ['5110 Lemons Cost', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '4110 Lemonade Sales Revenue'],
  answer: [{ account: '5110 Lemons Cost', debit: 500, credit: 0 }, { account: '2110 Accounts Payable – Trade', debit: 0, credit: 500 }],
  explain: '<p>The cost goes up (debit expense) and we now owe the supplier (credit liability). Cash does not move until we pay.</p>' }
```

### Recommended lesson shape

1. `kid` — the analogy that hooks the learner.
2. `text` — the real idea in plain words.
3. `slides` or `flow` — show the process/idea visually.
4. `callout variant: 'oracle'` — where it lives in Oracle Fusion and what it is really called.
5. `example` (+ `journal` when money moves) — Sunny Lemonade story.
6. `exercise` / `lab` — at least two hands-on checks, right after the idea they practise.
7. `steps` — "Try it in Oracle" (only if you verified the path), with a note that labels vary by release.
8. `callout variant: 'real'` or `tip`/`warning` — practical advice and common mistakes.
9. `terms` — 4–8 key words.
10. `quiz` — 3–5 questions.

Aim for **1,200–2,500 words** of learner-facing text per lesson (story lessons can be longer). Depth matters: by the end of a module the learner should be able to follow what a real Payables specialist or accountant does in Oracle Fusion.

## 5. Validate before you commit

```bash
node scripts/validate-content.mjs            # all lessons
node scripts/validate-content.mjs payables   # one module
```

The validator checks the file exists for each curriculum entry, slugs/titles match, block types and required fields, quiz answers are in range, journals balance, and sources use https. Fix all errors; warnings are worth a look.

## 6. Credits

Sources listed in lessons automatically appear on the in-app **Sources & Credits** page. If you use a source, list it. If an idea is general knowledge, you don't need to cite it — but citing never hurts.
