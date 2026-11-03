export default {
  slug: 'depreciation',
  title: 'Depreciation: Things Wear Out',
  minutes: 18,
  summary:
    'Depreciation spreads an asset’s cost over the years it is used. Learn straight-line and declining-balance depreciation with simple numbers, how Oracle Fusion Assets calculates depreciation each period with the Calculate Depreciation process, the journal it creates, and how to read a net book value schedule for Sunny’s $6,000 stand.',
  objectives: [
    'Calculate straight-line depreciation and build a net book value schedule',
    'Explain declining-balance depreciation and when companies use it',
    'Describe how Oracle Assets decides a period’s depreciation: method, life, prorate date, calendar and “divide depreciation”',
    'Record the monthly depreciation journal (6140 / 1590)',
    'Run and review depreciation in Oracle: Calculate Depreciation, Create Accounting for Assets, Journal Entry Reserve Ledger, what-if analysis',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Your bike gets older every month',
      html: `<p>You buy a bike for <strong>$300</strong> and expect to ride it for <strong>3 years</strong>. Each year it gets a bit more scratched and a bit less valuable. A simple way to say how much of the bike you have “used up” is: $300 ÷ 3 years = <strong>$100 per year</strong>.</p>
<p>After one year, you have used up $100 of bike, and $200 of “bike value” is left. After three years, it is all used up (even if it still rolls!).</p>
<p>That “using up” is <strong>depreciation</strong>. The value left is the <strong>net book value</strong>. <span class="hl">Depreciation is not about the price someone would pay for the bike — it is about spreading what you paid over the time you use it.</span></p>`,
    },
    {
      type: 'text',
      heading: 'Straight-line: the same amount every period',
      html: `<p><strong>Straight-line (STL)</strong> depreciation charges the same amount in every period of the asset’s life:</p>
<p><code>Depreciation per period = (Cost − Salvage value) ÷ Number of periods in the life</code></p>
<ul>
<li><strong>Cost</strong> — what the asset cost to get ready for use (price, delivery, installation).</li>
<li><strong>Salvage value</strong> — what you expect to get back at the end (e.g. selling it for scrap). Many companies use zero.</li>
<li><strong>Recoverable cost</strong> — Oracle’s name for the amount to depreciate: cost minus salvage value (and minus any ceiling limits).</li>
</ul>
<p>Sunny’s stand: ($6,000 − $0) ÷ 60 months = <strong>$100 per month</strong>. If Sam expected to sell it for $600 at the end, it would be ($6,000 − $600) ÷ 60 = $90 per month.</p>`,
    },
    {
      type: 'table',
      caption: 'Net book value schedule for the stand (STL, $6,000, 60 months, placed in service June 2026)',
      headers: ['After month', 'Period', 'Depreciation this month', 'Accumulated depreciation', 'Net book value'],
      rows: [
        ['1', 'JUN-26', '$100', '$100', '$5,900'],
        ['7', 'DEC-26', '$100', '$700', '$5,300'],
        ['12', 'MAY-27', '$100', '$1,200', '$4,800'],
        ['24', 'MAY-28', '$100', '$2,400', '$3,600'],
        ['36', 'MAY-29', '$100', '$3,600', '$2,400'],
        ['48', 'MAY-30', '$100', '$4,800', '$1,200'],
        ['60', 'MAY-31', '$100', '$6,000', '$0 (fully reserved)'],
      ],
    },
    {
      type: 'journal',
      title: 'Monthly depreciation journal for the stand (created by Oracle Assets)',
      lines: [
        { account: '101-300-6140-010-000 Depreciation Expense (Sales, Classic Lemonade)', debit: 100, credit: 0 },
        { account: '101-100-1590-000-000 Accumulated Depreciation', debit: 0, credit: 100 },
      ],
      note: `<p>The expense goes to the cost center and product on the asset’s <strong>assignment</strong> (the expense account entered when the stand was added). The credit goes to the category’s accumulated depreciation (reserve) account. Account 1510 Equipment is <em>not</em> touched — the cost stays at $6,000; the reserve grows next to it.</p>`,
    },
    {
      type: 'lab',
      tool: 'depreciation',
      title: 'Lab: the stand on straight-line',
      intro: `<p>This simulator is preset with Sunny’s stand: cost $6,000, no salvage, 60 months, straight-line. Check that month 12 shows $1,200 accumulated and $4,800 net book value. Then try a $600 salvage value — the monthly amount should drop to $90.</p>`,
      preset: { cost: 6000, salvage: 0, lifeMonths: 60, method: 'sl' },
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: complete the schedule',
      instructions: `<p>Noah’s commercial juicer cost <strong>$2,400</strong>, has a <strong>4-year (48-month)</strong> life, no salvage value, and is depreciated straight-line.</p>`,
      html: `<p>Monthly depreciation: \${{}}</p><p>Accumulated depreciation after 10 months: \${{}}</p><p>Net book value after 10 months: \${{}}</p><p>If the salvage value were $480 instead, monthly depreciation would be: \${{}}</p>`,
      blanks: [
        { answer: 50 },
        { answer: 500 },
        { answer: 1900 },
        { answer: 40 },
      ],
      explain: `<p>$2,400 ÷ 48 = $50 a month. After 10 months: $500 accumulated, so NBV is $2,400 − $500 = $1,900. With salvage: ($2,400 − $480) ÷ 48 = $1,920 ÷ 48 = $40.</p>`,
    },
    {
      type: 'text',
      heading: 'Declining balance: more at the start, less later',
      html: `<p>Some assets lose usefulness fastest when new (computers, vehicles). <strong>Declining-balance</strong> methods charge a fixed <em>rate</em> on the <strong>net book value</strong> at the start of each year, so the charge shrinks every year. A common version is <strong>200% (double) declining balance</strong>: rate = 2 ÷ life in years. For a 5-year life, that is 2 ÷ 5 = <strong>40%</strong> a year.</p>
<p>Because a percentage of a shrinking number never reaches zero, methods usually <strong>switch to straight-line</strong> when that gives a bigger charge. Oracle delivers methods called <em>150 Declining Balance with Straight-Line Switch</em> and <em>200 Declining Balance with Straight-Line Switch</em>.</p>`,
    },
    {
      type: 'table',
      caption: 'The $6,000 stand on 200% declining balance with a straight-line switch (yearly, simplified: full first year)',
      headers: ['Year', 'NBV at start', 'Calculation', 'Depreciation', 'NBV at end'],
      rows: [
        ['1', '$6,000', '40% × $6,000', '$2,400', '$3,600'],
        ['2', '$3,600', '40% × $3,600', '$1,440', '$2,160'],
        ['3', '$2,160', '40% × $2,160', '$864', '$1,296'],
        ['4', '$1,296', '40% would be $518.40; straight-line on the rest is $1,296 ÷ 2 = $648 → switch', '$648', '$648'],
        ['5', '$648', 'Straight-line', '$648', '$0'],
      ],
    },
    {
      type: 'lab',
      tool: 'depreciation',
      title: 'Lab: try declining balance',
      intro: `<p>Now the same $6,000, 60-month stand on <strong>200% declining balance</strong>. Compare the first year’s total with straight-line’s $1,200. The simulator works month by month, so its numbers may differ slightly from the simplified yearly table above — but the shape is the same: big early, small later, and still $6,000 in total.</p>`,
      preset: { cost: 6000, salvage: 0, lifeMonths: 60, method: 'db', rate: 200 },
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Same total, different timing',
      html: `<p>Both methods depreciate exactly <strong>$6,000</strong> in total. Declining balance just puts more of it in the early years. That is why a tax book often uses a faster method (lower taxable profit early) while the corporate book uses straight-line — and why Oracle lets each book have its own rules.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: how a period’s depreciation is worked out',
      html: `<p>Oracle supports several kinds of methods: <strong>calculated</strong> (straight-line: 1 ÷ life), <strong>table-based</strong> (rates looked up by year of life and prorate period, like MACRS), <strong>flat-rate</strong> (a fixed rate times cost or NBV), <strong>units of production</strong>, and <strong>formula-based</strong> methods. Predefined methods include Straight-Line, the 150 and 200 declining-balance methods with straight-line switch, Sum of Years Digits and many US MACRS/ACRS tables.</p>
<p>For each asset and period, Oracle combines:</p>
<ul>
<li>the <strong>method and life</strong> from the asset (defaulted from the category),</li>
<li>the <strong>prorate date</strong>, from the date placed in service and the prorate convention,</li>
<li>the <strong>calculation basis</strong> — recoverable cost, or recoverable net book value at the start of the fiscal year,</li>
<li>the book’s <strong>Divide Depreciation</strong> setting — <em>evenly</em> across periods, or <em>by the number of days</em> in each period.</li>
</ul>
<p>The period’s depreciation is then shared across the asset’s assignments by units (for example, if 2 of 4 juicers sit in the Kitchen cost center, half the expense goes there).</p>`,
    },
    {
      type: 'flow',
      title: 'Running depreciation in Oracle each month',
      steps: [
        { icon: '📝', label: 'Finish transactions', detail: 'All additions, adjustments, transfers and retirements for the period are posted.' },
        { icon: '🧮', label: 'Calculate Depreciation', detail: 'Run it from the Depreciation infotile for the book and period — either keeping the period open, or closing it.' },
        { icon: '🔎', label: 'Review', detail: 'Check the log for failures and the Journal Entry Reserve Ledger report for the amounts.' },
        { icon: '📒', label: 'Create Accounting', detail: 'Create Accounting for Assets creates the journals and transfers and posts them to the General Ledger.' },
      ],
      note: `<p>If you enter another transaction on an asset after depreciation ran (and the period is still open), Oracle rolls back that asset’s depreciation; just run Calculate Depreciation again. Once the process <strong>closes</strong> the period, it can’t be reopened.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Practice: record a month of depreciation',
      instructions: `<p>Calculate Depreciation has run for <code>JUL-26</code>. The juicer ($50 a month, Kitchen) and the stand ($100 a month, Sales) both depreciate. Build the combined journal Oracle creates. Use the natural accounts only.</p>`,
      accounts: ['6140 Depreciation Expense', '1590 Accumulated Depreciation', '1510 Equipment (Fixed Assets)', '1110 Cash – Big River Bank', '2110 Accounts Payable – Trade'],
      answer: [
        { account: '6140 Depreciation Expense', debit: 150, credit: 0 },
        { account: '1590 Accumulated Depreciation', debit: 0, credit: 150 },
      ],
      explain: `<p>$100 + $50 = $150 of expense, credited to accumulated depreciation. No cash moves and the asset cost in 1510 stays the same. (In the real journal, the $150 is split by cost center: $100 to Sales 300 and $50 to Kitchen 200.)</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: depreciate and check',
      items: [
        'On the Assets landing page, open the <kbd>Depreciation</kbd> infotile.',
        'Choose the book (e.g. SUNNY US CORP) and run <kbd>Calculate Depreciation</kbd>. Leave the period open the first time so you can review.',
        'From <kbd>Scheduled Processes</kbd>, run the <kbd>Journal Entry Reserve Ledger</kbd> report to see depreciation by expense account, reserve account and cost center.',
        'To see one asset, use <kbd>Inquire Assets</kbd>, open the asset, and view its depreciation details.',
        'When everything is right, run <kbd>Create Accounting</kbd> for Assets to send the journals to the General Ledger.',
      ],
      note: `<p>Infotile and panel tab labels may differ slightly by release, Redwood pages and your security.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Look ahead with what-if analysis',
      html: `<p><strong>What-if depreciation analysis</strong> projects depreciation for existing or hypothetical assets under different methods, lives or periods — for budgeting — without changing any real data. Results come out in the What-If Depreciation Analysis Report. In update 26D Oracle added a <strong>Depreciation Expense Projection Assistant</strong> that runs projections across periods conversationally and summarizes them by category, location or expense account.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li>Depreciation is an <strong>estimate</strong>. If reality changes (the stand will last 7 years, not 5), you adjust the life — see the next lesson.</li>
<li>You can <strong>suspend</strong> depreciation for an asset that is temporarily out of use, and <strong>resume</strong> it later, if your policy allows.</li>
<li>Run depreciation “open” first, review, fix, rerun — then close. Closing is one-way.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Straight-line depreciation', def: 'A method that charges the same depreciation amount in every period of an asset’s life.' },
        { term: 'Declining-balance depreciation', def: 'A method that charges a fixed rate on the remaining net book value, so depreciation is larger in early years.' },
        { term: 'Salvage value', def: 'The amount a company expects to get back for an asset at the end of its life.' },
        { term: 'Recoverable cost', def: 'The part of an asset’s cost that will be depreciated, usually cost minus salvage value.' },
        { term: 'Fully reserved', def: 'An asset whose accumulated depreciation equals its recoverable cost, so it no longer depreciates.' },
        { term: 'Calculate Depreciation', def: 'The Oracle Assets process that calculates depreciation for all assets in a book for a period, optionally closing the period.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'A $6,000 asset with a $600 salvage value and a 60-month life uses straight-line. What is the monthly depreciation?',
          options: ['$100', '$90', '$110', '$60'],
          answer: 1,
          explain: '($6,000 − $600) ÷ 60 = $5,400 ÷ 60 = $90.',
        },
        {
          q: 'Which journal records monthly depreciation?',
          options: [
            'Debit 1510 Equipment, credit 1110 Cash',
            'Debit 6140 Depreciation Expense, credit 1590 Accumulated Depreciation',
            'Debit 1590 Accumulated Depreciation, credit 6140 Depreciation Expense',
            'Debit 2110 Accounts Payable, credit 1510 Equipment',
          ],
          answer: 1,
          explain: 'Depreciation is an expense (debit 6140) and builds up the contra-asset reserve (credit 1590). Cost and cash are untouched.',
        },
        {
          q: 'Under 200% declining balance for a 5-year asset, what is the yearly rate?',
          options: ['20%', '40%', '50%', '200%'],
          answer: 1,
          explain: 'Straight-line rate is 1 ÷ 5 = 20%; double that is 40%, applied to the net book value at the start of each year.',
        },
        {
          q: 'Priya asks to reopen JUN-26 in the Assets corporate book after Calculate Depreciation closed it. What is true?',
          options: [
            'Any user can reopen it',
            'Once Calculate Depreciation closes the period, it can’t be reopened',
            'It reopens automatically after 24 hours',
            'Reopening is done in Cash Management',
          ],
          answer: 1,
          explain: 'Oracle warns that a period closed by the depreciation process can’t be reopened, which is why you review before closing.',
        },
      ],
    },
  ],
  sources: [
    { title: 'How Depreciation Is Calculated', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/how-depreciation-is-calculated.html' },
    { title: 'Depreciation Methods', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/depreciation-methods.html' },
    { title: 'Prorate and Retirement Conventions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/prorate-and-retirement-conventions.html' },
    { title: 'Review Journal Entries for Addition Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/review-journal-entries-for-addition-transactions.html' },
    { title: 'What-if Depreciation Analysis', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/what-if-depreciation-analysis.html' },
    { title: 'Assets Reconciliation Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/assets-reconciliation-reports.html' },
    { title: 'Financials 26D What’s New — Depreciation Expense Projection Assistant', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f50895.htm' },
    { title: 'Principles of Accounting, Volume 1 — Long-Term Assets (Chapter 11)', publisher: 'OpenStax', url: 'https://openstax.org/books/principles-financial-accounting/pages/11-why-it-matters' },
  ],
};
