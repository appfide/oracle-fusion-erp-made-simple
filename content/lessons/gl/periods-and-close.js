export default {
  slug: 'periods-and-close',
  title: 'Accounting Periods and Closing the Month',
  minutes: 18,
  summary:
    'Accounting periods are the pages of the calendar that journals belong to. Learn the period statuses in Oracle Fusion, the order in which subledgers close before the General Ledger, a practical month-end checklist, the Close Monitor, and how to handle late adjustments.',
  objectives: [
    'Explain what an accounting calendar and accounting periods are',
    'Describe the five General Ledger period statuses and what each one allows',
    'Put the month-end close steps in a sensible order, subledgers first and the General Ledger last',
    'Use Oracle tools such as Manage Accounting Periods, the Close Monitor and the General Accounting Dashboard to run the close',
    'Choose a sensible way to handle an adjustment that arrives late',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Report cards and school terms',
      html: `<p>School is split into <strong>terms</strong>. During a term, teachers can add and change marks. At the end of the term they check everything, print the <strong>report card</strong> and hand it to your parents. After that, nobody quietly changes your marks. If a mistake is found, the head teacher must agree to <strong>reopen</strong> the report.</p>
<p>A company works the same way. Its year is split into <strong>accounting periods</strong>, usually months. During the month, teams record what happens. At month-end, they check everything, produce the financial statements and <strong>close</strong> the period. <span class="hl">Closing is how a company says: “January is final. These are the official numbers.”</span></p>`,
    },
    {
      type: 'text',
      heading: 'Accounting calendars and periods',
      html: `<p>Every ledger has an <strong>accounting calendar</strong> (one of the four Cs). Sunny uses a simple <strong>monthly</strong> calendar from January to December, with periods named like <code>Jan-26</code>, <code>Feb-26</code> and so on. Oracle can also generate weekly, 4-4-5, 4-5-4, 5-4-4, quarterly and yearly calendars, and can add <strong>adjusting periods</strong>: extra periods, often at year-end, used only for audit and closing adjustments.</p>
<p>A few calendar facts that matter later:</p>
<ul>
<li>The calendar is <strong>hard to change</strong> once any period has been opened or made future enterable, so design it carefully.</li>
<li>Start the calendar at least <strong>one year before</strong> the first period you will use. Translation can’t run in the first period of a calendar, and you can’t add earlier years once the first period is open.</li>
<li>Every journal has an <strong>accounting date</strong>, and the date decides the period it belongs to.</li>
</ul>`,
    },
    {
      type: 'table',
      caption: 'General Ledger period statuses',
      headers: ['Status', 'Enter journals?', 'Post journals?', 'Notes'],
      rows: [
        ['<strong>Never Opened</strong>', 'No', 'No', 'The period exists in the calendar but has never been used.'],
        ['<strong>Future Enterable</strong>', 'Yes', 'No', 'Lets you prepare journals ahead of time. The ledger option <em>Number of Future Enterable Periods</em> (0–999) controls how many there are.'],
        ['<strong>Open</strong>', 'Yes', 'Yes', 'The normal working state. Keep as few periods open as possible.'],
        ['<strong>Closed</strong>', 'No', 'No', 'Finished. It can be reopened if there is a strong, approved reason.'],
        ['<strong>Permanently Closed</strong>', 'No', 'No', 'Final. It can never be reopened. Usually used for old years after the audit.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match each period status to what it allows',
      instructions: `<p>Priya is explaining period statuses to a new team member. Match each status to its meaning.</p>`,
      pairs: [
        { left: 'Never Opened', right: 'Not used yet: no entry, no posting' },
        { left: 'Future Enterable', right: 'Journals can be entered but not posted' },
        { left: 'Open', right: 'Journals can be entered and posted' },
        { left: 'Closed', right: 'No entry or posting, but it can be reopened' },
        { left: 'Permanently Closed', right: 'No entry or posting, and it can never be reopened' },
      ],
      explain: `<p>Only <strong>Open</strong> periods accept posting. <strong>Future Enterable</strong> is for preparing journals early. The difference between <strong>Closed</strong> and <strong>Permanently Closed</strong> is whether the door can ever open again.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: each subledger has its own period',
      html: `<p>The General Ledger isn’t the only module with periods. <strong>Payables</strong>, <strong>Receivables</strong>, <strong>Assets</strong> (each asset book), <strong>Projects</strong>, <strong>Cost Management</strong> and others keep their <em>own</em> period statuses. Some track them at a finer level, such as by business unit for Payables and Receivables. GL periods are maintained with the <kbd>Manage Accounting Periods</kbd> task in the <kbd>Period Close</kbd> work area, or from the Close Status region of the General Accounting Dashboard.</p>
<p>When ledgers share a calendar and chart of accounts, a <strong>ledger set</strong> lets you open or close periods for many ledgers at once (see the Ledger Sets lesson).</p>`,
    },
    {
      type: 'flow',
      title: 'Month-end close order at Sunny (simplified)',
      steps: [
        { icon: '🛒', label: 'Procurement and receiving', detail: 'Receipts are entered, so goods received but not invoiced can be accrued.' },
        { icon: '💸', label: 'Payables', detail: 'Ava finishes invoices and payments, runs Create Accounting, clears exceptions, closes the AP period.' },
        { icon: '🏭', label: 'Assets', detail: 'Asset additions from AP invoices are added, depreciation runs, the asset book closes.' },
        { icon: '💰', label: 'Receivables and Cash', detail: 'Omar finishes invoices and receipts. Mia reconciles the bank. AR closes.' },
        { icon: '📒', label: 'General Ledger', detail: 'Priya posts, accrues, allocates, revalues, reconciles, reviews the statements and closes the GL period last.' },
      ],
      note: `<p>Why GL last? The ledger is the master book. If it closes while a subledger is still sending journals, January would be missing pieces. And Assets comes after Payables because invoices for equipment feed asset additions.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'A safety lock: stop the GL closing too early',
      html: `<p>A primary ledger option called <strong>Prevent General Ledger Period Closure When Open Subledger Periods Exist</strong> (in <kbd>Specify Ledger Options</kbd>, Period Close section) blocks the GL period from closing while there are exceptions such as:</p>
<ul>
<li>Subledger periods still open: Payables, Receivables, Projects, Cost Management, Revenue Management, and Assets if you include it (Assets is excluded by default).</li>
<li>Unprocessed or untransferred subledger transactions, pending lines in the GL interface, or unposted GL journals.</li>
</ul>
<p>Separately, a GL period can never be closed while the ledger has pending intercompany transactions in certain statuses. These checks mean fewer embarrassing reopenings.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny’s month-end close checklist (working days after month-end)',
      headers: ['Day', 'Task', 'Owner', 'Oracle tool'],
      rows: [
        ['WD-1', 'Remind teams of cut-off. Open next month (Feb-26) so February work can start.', 'Priya', 'Manage Accounting Periods'],
        ['WD1', 'Finish invoices and payments, Create Accounting, close the Payables period.', 'Ava', 'Payables, Subledger Accounting'],
        ['WD1', 'Run depreciation and close the asset book.', 'Asset accountant', 'Assets'],
        ['WD1', 'Finish receipts, reconcile the bank statement, close the Receivables period.', 'Omar and Mia', 'Receivables, Cash Management'],
        ['WD2', 'Make sure all imports have posted and clear the Journals infolet (errors, incomplete, pending approval).', 'Priya', 'General Accounting Dashboard'],
        ['WD2', 'Post accruals, the rent recurring journal and allocations.', 'Priya', 'Journals work area, Calculation Manager'],
        ['WD2', 'Run revaluation. For Sunny UK, translate to USD.', 'Priya', 'Revalue Balances, Translate General Ledger Account Balances'],
        ['WD3', 'Reconcile AP and AR to the ledger, and review the trial balance and account variances.', 'Priya', 'AP/AR reconciliation infolets, trial balance reports'],
        ['WD3', 'Review the financial statements with Sam.', 'Priya and Sam', 'Financial Reporting Center, Smart View'],
        ['WD4', 'Close the GL period (Jan-26).', 'Priya', 'Manage Accounting Periods'],
      ],
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put Sunny’s close tasks in order',
      instructions: `<p>Each step depends on the one before it. Arrange Sunny’s month-end tasks in a sensible order.</p>`,
      items: [
        'Finish Payables invoices and close the Payables period',
        'Add assets from Payables invoices, run depreciation and close the asset book',
        'Post GL accruals, the recurring rent journal and the rent allocation',
        'Revalue foreign-currency balances',
        'Translate the Sunny UK Ledger to USD',
        'Review the trial balance and financial statements with Sam',
        'Close the General Ledger period',
      ],
      explain: `<p>Subledgers close first, and Assets after Payables because equipment invoices become asset additions. In the GL: post everything, then allocate. Revalue <em>before</em> translating, review the results, and close the GL period last.</p>`,
    },
    {
      type: 'text',
      heading: 'Watching the close: Close Monitor and dashboard',
      html: `<p>The <strong>Close Monitor</strong> gives a picture of the close across the company. It is laid out as a <strong>hierarchy of ledger sets</strong> that mirrors how entities roll up. For each ledger it shows:</p>
<ul>
<li>the <strong>period status by module</strong>: General Ledger, Payables, Receivables, Assets, Projects and Costing, including how many business units or books are closed;</li>
<li>the <strong>manager</strong> responsible for each entity, with contact details from HCM;</li>
<li>a <strong>summary income statement</strong> (revenue and expenses) from an account group.</li>
</ul>
<p>You reach it with the <kbd>Close Monitor</kbd> task in the Period Close work area, or by clicking the <strong>Open Subledgers</strong> infolet on the General Accounting Dashboard. Its setup (<em>Manage Close Monitor Setup</em>) needs a ledger set whose ledgers share a chart of accounts, a calendar and a common currency representation.</p>
<p>Other helpful infolets: <strong>Close Calendar</strong> (counts down the days to period end), <strong>Journals</strong> (outstanding journals), and the <strong>Accounts Payable</strong> and <strong>Accounts Receivable Reconciliation</strong> infolets. Those compare subledger balances with the ledger, using data from the <em>Prepare Payables to General Ledger Reconciliation</em> and <em>Prepare Receivables to General Ledger Reconciliation</em> processes.</p>`,
    },
    {
      type: 'text',
      heading: 'Late adjustments: what are the options?',
      html: `<p>Something always turns up late. What Priya does depends on timing and size:</p>
<ul>
<li><strong>The period is still open:</strong> post into it. Posting into an open <em>prior</em> period is allowed. Oracle updates the beginning balances of the later periods automatically. The ledger option <em>Notify when prior period journal is entered</em> can warn users so it isn’t done by accident.</li>
<li><strong>The period is closed and the amount is small:</strong> most companies book it in the current period and note it. That is quicker and safer than reopening.</li>
<li><strong>The period is closed and the amount is material:</strong> reopen with approval, post, re-run any revaluation or translation, regenerate the reports, then close again. A reopened period with new journals makes its translated balances out of date until translation runs again.</li>
<li><strong>Year-end audit adjustments:</strong> if the calendar has an <strong>adjusting period</strong>, audit entries can go there, keeping December’s operating results clean.</li>
</ul>
<p>At year-end you don’t need a manual closing entry for profit. When the first period of a new year is opened, Oracle rolls the income and expense balances into the <strong>retained earnings</strong> account set in the ledger options. Companies that must show explicit closing entries can use Oracle’s closing journals process.</p>`,
    },
    {
      type: 'example',
      title: 'A late accrual while January is still open',
      html: `<p>On 2 February (WD2) Noah tells Priya about a $40 taxi on 30 January that hasn’t been claimed yet. January is still <strong>Open</strong> (Sunny keeps it open until WD4), and February is open too.</p>`,
      steps: [
        'Priya enters an accrual journal dated 31 Jan 2026 in period <code>Jan-26</code>, category Accrual, so it reverses automatically in February.',
        'Oracle warns that this is a prior-period journal. Priya confirms, because that is exactly what is wanted.',
        'Posting updates January, and Oracle rolls the change into February’s beginning balances for the balance sheet accounts.',
      ],
      result: `<p>January’s numbers are complete, and nobody had to reopen anything.</p>`,
    },
    {
      type: 'journal',
      title: 'Late accrual posted into the open prior period (Jan-26)',
      lines: [
        { account: '101-200-6130-000-000 Travel and Meals (Kitchen)', debit: 40, credit: 0 },
        { account: '101-100-2120-000-000 Received Not Invoiced Accrual', debit: 0, credit: 40 },
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'What would you do with the late item?',
      instructions: `<p>Sunny closes January on WD4. Its policy: items under $500 found after the close go into the current month. Larger items need Sam’s approval to reopen. Decide what to do with each item.</p>`,
      categories: ['Post into January (still open)', 'Book in February (small, after close)', 'Ask to reopen January (material, after close)'],
      items: [
        { text: 'WD2: a $40 taxi from 30 January is reported', answer: 'Post into January (still open)' },
        { text: 'WD3: a missing $150 electricity accrual is spotted', answer: 'Post into January (still open)' },
        { text: '10 Feb: a $60 January bank charge is found', answer: 'Book in February (small, after close)' },
        { text: '12 Feb: a $4,000 January sale to Sunshine School was never invoiced', answer: 'Ask to reopen January (material, after close)' },
      ],
      explain: `<p>While a period is open, fix it there. Oracle even updates later beginning balances for you. After the close, small items go in the current month. Material ones justify a controlled reopening, after which you re-run revaluation, translation and reports.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: open or close a GL period',
      items: [
        'From the <kbd>Navigator</kbd>, open the <kbd>Period Close</kbd> work area.',
        'Click the task <kbd>Manage Accounting Periods</kbd>.',
        'Choose the ledger (or a ledger set to work on many ledgers at once).',
        'Select the period row and use the action to open the next period or close the selected one. Opening or closing runs as a process, so check its status before you click again.',
        'Check the result in the period list, or in the Close Monitor for the bigger picture.',
      ],
      note: `<p>Only users with the right GL role can change period statuses. Labels can differ by release, Redwood pages and your company’s configuration. Subledger periods (Payables, Receivables, Assets) are opened and closed in their own work areas.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips for a calm close',
      html: `<ul>
<li><strong>Write the checklist down</strong>, with owners and days, and review it after every close. Large companies use dedicated close-management tools. A shared checklist is the minimum.</li>
<li><strong>Close subledgers on time.</strong> A late Payables close delays everyone.</li>
<li><strong>Keep only one or two GL periods open</strong> to stop journals landing in the wrong month.</li>
<li><strong>Reopening needs a reason.</strong> Many auditors ask for a list of reopened periods and why they were reopened.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Accounting calendar', def: 'The set of accounting periods (for example 12 months) a ledger uses to group journals by time.' },
        { term: 'Future Enterable', def: 'A period status that lets you enter journals ahead of time but not post them.' },
        { term: 'Permanently Closed', def: 'A period status that can never be reopened. Used once a year’s books are final.' },
        { term: 'Adjusting period', def: 'An extra accounting period, usually at year-end, used only for adjustments such as audit entries.' },
        { term: 'Close Monitor', def: 'An Oracle page showing the period close status of ledgers and their subledgers, arranged by a ledger set hierarchy.' },
        { term: 'Retained earnings', def: 'The equity account where each year’s profit or loss is collected when the new year starts.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'In which GL period status can you enter journals but NOT post them?',
          options: ['Open', 'Future Enterable', 'Closed', 'Never Opened'],
          answer: 1,
          explain: 'Future Enterable periods accept journal entry but not posting. You post once the period is Open.',
        },
        {
          q: 'Why does the General Ledger usually close AFTER Payables, Receivables and Assets?',
          options: [
            'Because the GL has no periods',
            'Because subledgers send their accounting to the GL, so the GL must wait for all of it',
            'Because Oracle closes the GL automatically',
            'Because the GL is less important',
          ],
          answer: 1,
          explain: 'The GL is the master book. Closing it before the subledgers finish would leave January incomplete.',
        },
        {
          q: 'Which status can NEVER be reopened?',
          options: ['Closed', 'Open', 'Permanently Closed', 'Future Enterable'],
          answer: 2,
          explain: 'Permanently Closed is final. A Closed period can be reopened if there’s an approved reason.',
        },
        {
          q: 'Where can Priya see, in one place, which ledgers and subledgers are still open for January?',
          options: ['The Close Monitor', 'The Create Journal page', 'The supplier portal', 'Calculation Manager'],
          answer: 0,
          explain: 'The Close Monitor shows period status by module for each ledger in a ledger set hierarchy. It can be reached from the Open Subledgers infolet or the Period Close work area.',
        },
        {
          q: 'January is still Open and February is Open. Priya posts a journal dated 31 January. What happens to February?',
          options: [
            'Nothing. February ignores it',
            'Oracle updates February’s beginning balances automatically',
            'The journal is rejected',
            'February must be closed first',
          ],
          answer: 1,
          explain: 'When you post to a prior open period, Oracle automatically updates the beginning balances of later periods.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Implementing Enterprise Structures and General Ledger: Accounting Calendar Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/accounting-calendar-options.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Specify Ledger Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/specify-ledger-options.html' },
    { title: 'Tables and Views for Financials: GL_PERIOD_STATUSES', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oedmf/glperiodstatuses-10091.html' },
    { title: 'Using General Ledger: Overview of Opening First Period', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-opening-first-period.html' },
    { title: 'Using General Ledger: How to Prevent a General Ledger Period from Closing When Open Subledger Periods Exist', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/how-to-prevent-a-general-ledger-period-from-closing-when-open.html' },
    { title: 'Using General Ledger: Overview of Close Monitor', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-close-monitor.html' },
    { title: 'Using General Ledger: General Accounting Infolets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/general-accounting-infolets.html' },
    { title: 'Using General Ledger: Overview of Journal Posting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-journal-posting.html' },
    { title: 'Using General Ledger: Opening a Period', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/opening-a-period.html' },
    { title: 'Using General Ledger: Overview of Closing Journals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-closing-journals.html' },
  ],
};
