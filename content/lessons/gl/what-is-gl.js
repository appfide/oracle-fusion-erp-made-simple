export default {
  slug: 'what-is-gl',
  title: 'What Is the General Ledger?',
  minutes: 14,
  summary:
    'The General Ledger is the master book of the company: every money event from every team ends up here as a journal, and the balances it keeps become the trial balance and the financial statements. Meet Priya’s world in Oracle Fusion.',
  objectives: [
    'Explain what the General Ledger is and why every company needs one',
    'Describe how subledgers such as Payables and Receivables feed journals into the General Ledger',
    'Read a simple trial balance and say why its two columns must match',
    'Name the main places in Oracle Fusion where a ledger accountant works: the Journals and Period Close work areas, the General Accounting Dashboard and the Financial Reporting Center',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The class treasurer’s master notebook',
      html: `<p>Imagine your school has lots of clubs: the bake-sale club, the book club and the sports club. Each club keeps its <strong>own little notebook</strong> with every cookie sold and every ball bought, with names and dates.</p>
<p>The school treasurer can’t read hundreds of little notebooks every month. So at the end of each week, every club copies a <strong>short summary</strong> into the treasurer’s <strong>master notebook</strong>: “Bake sale: money in $40, flour $10.”</p>
<p>The master notebook doesn’t care which child bought which cookie. It cares about the <strong>totals in each money bucket</strong>: how much cash the school has, how much it owes, how much it earned and spent. <span class="hl">That master notebook is the General Ledger. The club notebooks are the subledgers.</span></p>`,
    },
    {
      type: 'text',
      heading: 'The General Ledger in plain words',
      html: `<p>The <strong>General Ledger</strong> (often shortened to <strong>GL</strong>) is the company’s <strong>master book of accounts</strong>. In the Basics module you met the ledger and the chart of accounts. Now we look at what the GL actually <em>does</em> all month long.</p>
<ul>
<li>It holds a <strong>balance</strong> for every account combination, such as <code>101-100-1110-000-000</code> (Sunny US cash), for every accounting period.</li>
<li>Money only changes those balances through <strong>journals</strong> (journal entries). A journal always has equal debits and credits, so the book always stays in balance.</li>
<li>Most journals are <strong>not typed by hand</strong>. They arrive from the <strong>subledgers</strong>: Payables, Receivables, Assets, Cash Management, Expenses and others. Priya, our general ledger accountant, types only the special ones, such as accruals and corrections.</li>
<li>From the balances, the company produces its <strong>trial balance</strong> and its <strong>financial statements</strong>: the balance sheet and the income statement.</li>
</ul>
<p>Think of the GL as the place where the whole company’s story is told in numbers. A subledger knows that Ava paid Lemon Grove Farms invoice 77 on 5 January. The GL knows that Sunny US cash went down by $500 and the money we owe suppliers went down by $500.</p>`,
    },
    {
      type: 'flow',
      title: 'How a Payables invoice reaches the master book',
      steps: [
        { icon: '🧾', label: 'Transaction', detail: 'Ava enters and validates the $500 Lemon Grove Farms invoice in Payables.' },
        { icon: '⚙️', label: 'Create Accounting', detail: 'Subledger Accounting turns the invoice into a subledger journal: debit Lemons Cost, credit Accounts Payable.' },
        { icon: '📥', label: 'Transfer and import', detail: 'The subledger journal is transferred to the GL interface and imported as a GL journal with source Payables.' },
        { icon: '📌', label: 'Post', detail: 'Posting updates the account balances. Many companies post subledger journals automatically.' },
        { icon: '📊', label: 'Report', detail: 'The new balances show up at once in inquiries, the trial balance and financial reports.' },
      ],
      note: `<p>Every subledger follows this same pattern. Ava never touches the GL directly, but the work lands there.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the journey of an invoice in order',
      instructions: `<p>Ava’s $500 lemon invoice travels from Payables into the master book. Put the steps in the right order.</p>`,
      items: [
        'Ava enters and validates the invoice in Payables',
        'Create Accounting builds the subledger journal',
        'The journal is transferred and imported into the General Ledger',
        'The journal batch is posted and balances are updated',
        'Priya sees the new balance in the trial balance and reports',
      ],
      explain: `<p>A transaction comes first. Subledger Accounting turns it into accounting. Then it is imported and posted, and only after posting do balances and reports change.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: four ways journals arrive',
      html: `<p>Oracle’s <em>Using General Ledger</em> guide describes four ways transactions get captured in the ledger:</p>
<ol>
<li><strong>Entered manually</strong> on the Create Journal page, for one-off items such as corrections, reclassifications and unusual accruals.</li>
<li><strong>Entered in a spreadsheet</strong>, using the Create Journals Excel workbook, which is handy for many lines or entries you repeat every month.</li>
<li><strong>Imported</strong>, mostly from the subledgers through <strong>Subledger Accounting</strong> (Oracle and non-Oracle sources) using the <strong>Import Journals</strong> process. Most of the ledger’s data arrives this way.</li>
<li><strong>Created automatically</strong> by processes such as allocations (built in <strong>Calculation Manager</strong>), automatic reversals, revaluation and balance transfers.</li>
</ol>
<p>You’ll learn each one in the next lessons of this module.</p>`,
    },
    {
      type: 'table',
      caption: 'Who feeds the master book at Sunny Lemonade (examples)',
      headers: ['Subledger', 'Person', 'Typical event', 'What reaches the GL'],
      rows: [
        ['Payables', 'Ava', 'Sugar invoice from Sweet Sugar Co. ($200)', 'Dr 5120 Sugar Cost / Cr 2110 Accounts Payable – Trade'],
        ['Receivables', 'Omar', 'Invoice to Happy Cafe ($400)', 'Dr 1210 Accounts Receivable / Cr 4110 Lemonade Sales Revenue'],
        ['Cash Management', 'Mia', 'Bank charge on the statement ($25)', 'Dr 7110 Bank Charges / Cr 1110 Cash – Big River Bank'],
        ['Assets', 'Asset accountant', 'Monthly depreciation of the $6,000 stand ($100)', 'Dr 6140 Depreciation Expense / Cr 1590 Accumulated Depreciation'],
        ['General Ledger itself', 'Priya', 'Monthly rent ($1,000)', 'Dr 6110 Rent / Cr 1110 Cash – Big River Bank'],
      ],
    },
    {
      type: 'text',
      heading: 'Balances: the heart of the ledger',
      html: `<p>For each account and period the GL keeps a few numbers:</p>
<ul>
<li><strong>Beginning balance</strong>: what the account held when the period started.</li>
<li><strong>Period activity</strong>: the debits and credits posted during the period.</li>
<li><strong>Ending balance</strong>: beginning balance plus activity.</li>
</ul>
<p>You will also hear <strong>PTD</strong> (period-to-date: just this month) and <strong>YTD</strong> (year-to-date: since the start of the fiscal year). Income statement accounts such as Revenue and Rent restart at zero each new year, because their totals are moved into retained earnings. Balance sheet accounts such as Cash just keep rolling forward.</p>
<p>In Oracle Fusion, balances are calculated <strong>when a journal is posted</strong>. Posting updates the balances table and also the <strong>GL balances cube</strong>, a multidimensional store (built on Oracle Essbase) that keeps balances already added up at every level of your account hierarchies. That is why a GL report can show “Total Expenses” for the whole company in seconds: the totals are calculated ahead of time.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Which accounts roll forward and which restart each year?',
      instructions: `<p>Put each Sunny account in the right bucket. Balance sheet accounts carry their balance into the next year. Income statement accounts start the new year at zero, because their totals go to retained earnings.</p>`,
      categories: ['Balance sheet (rolls forward)', 'Income statement (restarts each year)'],
      items: [
        { text: '1110 Cash – Big River Bank', answer: 'Balance sheet (rolls forward)' },
        { text: '2110 Accounts Payable – Trade', answer: 'Balance sheet (rolls forward)' },
        { text: '3100 Owner’s Equity', answer: 'Balance sheet (rolls forward)' },
        { text: '1510 Equipment (Fixed Assets)', answer: 'Balance sheet (rolls forward)' },
        { text: '4110 Lemonade Sales Revenue', answer: 'Income statement (restarts each year)' },
        { text: '5110 Lemons Cost', answer: 'Income statement (restarts each year)' },
        { text: '6110 Rent', answer: 'Income statement (restarts each year)' },
      ],
      explain: `<p>Assets, liabilities and equity describe what the company <em>has and owes</em> at a moment, so they carry forward. Revenue and expenses measure performance <em>for a year</em>, so they reset, and the year’s profit moves into retained earnings.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny US Ledger: a mid-January trial balance',
      html: `<p>Sunny Lemonade US Inc. started January 2026 (period <code>Jan-26</code>) with $20,000 in the bank, a $6,000 lemonade stand and $26,000 of owner’s equity. By 15 January the subledgers had sent these journals:</p>`,
      steps: [
        'Payables: lemons $500, sugar $200, cups and straws $300 (total $1,000 owed to suppliers).',
        'Payables: Ava paid Lemon Grove Farms $500.',
        'Receivables: Omar invoiced Happy Cafe $400, City Park Kiosk $1,600 and Sunshine School $2,000 (total $4,000).',
        'Receivables: $2,400 of customer receipts arrived in the bank.',
      ],
      result: `<p>Priya runs a trial balance. Every account’s ending balance is listed in a debit or a credit column. Debits total <strong>$30,500</strong> and credits total <strong>$30,500</strong>. If the two columns didn’t match, something would be badly wrong. Oracle Fusion won’t post a journal that doesn’t balance, unless the ledger is set up to send the difference to a suspense account.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny US Ledger trial balance, 15 Jan 2026 (USD)',
      headers: ['Account', 'Name', 'Debit', 'Credit'],
      rows: [
        ['1110', 'Cash – Big River Bank', '21,900', ''],
        ['1210', 'Accounts Receivable', '1,600', ''],
        ['1510', 'Equipment (Fixed Assets)', '6,000', ''],
        ['2110', 'Accounts Payable – Trade', '', '500'],
        ['3100', 'Owner’s Equity', '', '26,000'],
        ['4110', 'Lemonade Sales Revenue', '', '4,000'],
        ['5110', 'Lemons Cost', '500', ''],
        ['5120', 'Sugar Cost', '200', ''],
        ['5130', 'Cups and Straws Cost', '300', ''],
        ['<strong>Total</strong>', '', '<strong>30,500</strong>', '<strong>30,500</strong>'],
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Update the trial balance yourself',
      instructions: `<p>On 16 January City Park Kiosk pays <strong>$600</strong> of what it owes Sunny. Use the trial balance above to work out the new numbers.</p>`,
      html: `<p>The receipt journal debits Cash and credits Accounts Receivable.</p>
<p>New 1110 Cash balance: $ {{}}</p>
<p>New 1210 Accounts Receivable balance: $ {{}}</p>
<p>New total of the debit column: $ {{}}</p>`,
      blanks: [
        { answer: 22500, hint: '21,900 + 600' },
        { answer: 1000, hint: '1,600 − 600' },
        { answer: 30500, hint: 'One debit balance went up and another went down by the same amount.' },
      ],
      explain: `<p>Cash rises to $22,500 and Accounts Receivable falls to $1,000. Both are debit-balance accounts, so the debit column total stays at <strong>$30,500</strong>, and it still equals the credit column. Money just moved from “owed to us” into “in the bank”.</p>`,
    },
    {
      type: 'journal',
      title: 'One of those journals: the Payables invoice for lemons (source: Payables)',
      lines: [
        { account: '101-200-5110-010-000 Lemons Cost (Kitchen, Classic Lemonade)', debit: 500, credit: 0 },
        { account: '101-100-2110-000-000 Accounts Payable – Trade', debit: 0, credit: 500 },
      ],
      note: `<p>Priya didn’t type this. Payables created it, Subledger Accounting turned it into accounting, and the Import Journals and posting processes brought it into the ledger. The journal’s <strong>source</strong> says “Payables”, so anyone can trace it back to Ava’s invoice. (Sunny books balance sheet lines, such as cash and payables, to cost center <code>100</code> Administration.)</p>`,
    },
    {
      type: 'text',
      heading: 'The trial balance in Oracle Fusion',
      html: `<p>A <strong>trial balance</strong> is a list of every account with its balance, used to check that the books balance and to review the numbers before the statements are produced. Oracle General Ledger delivers several trial balance reports, including the <strong>Trial Balance Report</strong> (summarized balances and activity by ledger, balancing segment and account) and the <strong>General Ledger Trial Balance Report</strong> (beginning balance, period debits and credits, and ending balance, in detail or summary). These are Oracle Analytics Publisher reports that you submit from the <kbd>Scheduled Processes</kbd> work area.</p>
<p>Oracle’s advice is simple and important: before you run them, make sure <strong>all subledger transactions have been imported and all journals for the period are posted</strong>. Otherwise you’re checking a half-finished book.</p>`,
    },
    {
      type: 'slides',
      title: 'Where Priya works in Oracle Fusion',
      slides: [
        {
          icon: '✍️',
          title: 'Journals work area',
          html: `<p>Where journals are created, reviewed, approved and posted. Its task pane has links such as <kbd>Create Journal</kbd>, <kbd>Manage Journals</kbd>, <kbd>Create Journal in Spreadsheet</kbd>, the allocation tasks and <kbd>Run AutoReverse</kbd>. Incomplete, unposted and error journals are listed on its landing page.</p>`,
        },
        {
          icon: '🗓️',
          title: 'Period Close work area',
          html: `<p>Where the month is opened and closed. Tasks include <kbd>Manage Accounting Periods</kbd>, the <kbd>Close Monitor</kbd> and <kbd>Inquire on Detail Balances</kbd>.</p>`,
        },
        {
          icon: '🚦',
          title: 'General Accounting Dashboard',
          html: `<p>A page of <strong>infolets</strong> (small tiles) that point out risks. The <strong>Journals</strong> infolet counts outstanding journals (in error, pending approval, incomplete). Others compare Payables and Receivables to the ledger, show open subledger periods, unallocated balances and a countdown to period end.</p>`,
        },
        {
          icon: '📈',
          title: 'Financial Reporting Center',
          html: `<p>The main place to run financial reports (balance sheet, income statement), use account groups and the Account Inspector, and open Smart View queries. Lesson 8 of this module covers it.</p>`,
        },
        {
          icon: '🤖',
          title: 'New: Ledger Agent',
          html: `<p>Since update 26B Oracle offers a <strong>Ledger Agent</strong> that answers natural-language questions about balances and journals and watches for exceptions. In 26C and 26D it grew into the <strong>Ledger Agentic Application</strong>, which can carry out larger pieces of analysis, such as explaining month-over-month changes. It needs its own role and setup, so not every company has it switched on.</p>`,
        },
      ],
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: find outstanding journals',
      items: [
        'From the <kbd>Navigator</kbd>, open the <kbd>General Accounting Dashboard</kbd>.',
        'Find the <kbd>Journals</kbd> infolet. The front shows the total amount and number of outstanding journal batches.',
        'Flip it to the back view and set thresholds, for example only journals over 1,000 USD or older than 5 days.',
        'Open the expanded view to see the three categories: <kbd>In Error</kbd>, <kbd>Pending Approval</kbd> and <kbd>Incomplete</kbd>. Click one to see the details and, where allowed, post or approve.',
      ],
      note: `<p>Labels and menu groups can differ slightly by release, by Redwood pages and by how your company configured Fusion. Your roles also decide which infolets you see.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: the GL accountant is a detective, not a typist',
      html: `<p>In a well-run company, 90% or more of the ledger’s lines come from subledgers. A GL accountant like Priya spends most of the month <strong>checking</strong>: Do Payables and the AP liability account agree? Did every subledger send its journals? Why did electricity jump 40%? The few manual journals Priya writes (accruals, reclassifications, corrections) usually need extra review because nothing upstream checked them.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Common beginner mistake',
      html: `<p>Don’t “fix” a subledger number by typing a GL journal against a subledger control account, such as Accounts Payable. The GL and the subledger would then disagree forever. Oracle can even stop manual journals to accounts marked as <strong>third party control accounts</strong>. Fix the problem in the subledger, and let the corrected accounting flow through.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'General Ledger (GL)', def: 'The master book of accounts where every money event of the company ends up as balances by account and period.' },
        { term: 'Subledger', def: 'A detailed book for one area, such as Payables or Receivables, that sends summarized accounting to the General Ledger.' },
        { term: 'Posting', def: 'The process that applies a journal to the account balances. Posted journals can no longer be edited.' },
        { term: 'Trial balance', def: 'A list of all account balances, used to prove that total debits equal total credits and to review the books.' },
        { term: 'Period-to-date (PTD)', def: 'The activity or balance for just the current accounting period, such as January.' },
        { term: 'Year-to-date (YTD)', def: 'The activity or balance from the start of the fiscal year up to the current period.' },
        { term: 'Infolet', def: 'A small tile on an Oracle Fusion dashboard that summarizes something important and lets you drill into it.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Where do MOST of the lines in a company’s General Ledger come from?',
          options: [
            'Priya typing them on the Create Journal page',
            'The subledgers, through Subledger Accounting and journal import',
            'The bank, which writes directly into the ledger',
            'The auditors at year-end',
          ],
          answer: 1,
          explain: 'Subledgers such as Payables, Receivables and Assets create accounting through Subledger Accounting. It is then imported and posted. Manual journals are the exception, not the rule.',
        },
        {
          q: 'When are account balances updated in Oracle General Ledger?',
          options: ['When a journal is saved', 'When a journal is posted', 'When the period is closed', 'When a report is run'],
          answer: 1,
          explain: 'Posting updates the balances table and the GL balances cube. Saved or incomplete journals don’t change balances.',
        },
        {
          q: 'In Sunny’s trial balance, debits total $30,500. What must credits total?',
          options: ['$0', '$15,250', '$30,500', 'It depends on the month'],
          answer: 2,
          explain: 'Every posted journal has equal debits and credits, so the whole ledger always balances: total debits equal total credits.',
        },
        {
          q: 'Priya wants a quick view of journals that are in error or waiting for approval. Where should Priya look first?',
          options: [
            'The Journals infolet on the General Accounting Dashboard',
            'The Payables invoice workbench',
            'The supplier portal',
            'The bank statement',
          ],
          answer: 0,
          explain: 'The Journals infolet shows outstanding journals by category: In Error, Pending Approval and Incomplete. From there Priya can drill into the details.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using General Ledger: Example of an Accounting Cycle', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/example-of-an-accounting-cycle.html' },
    { title: 'Using General Ledger: Journal Capture Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/journal-capture-options.html' },
    { title: 'Using General Ledger: How Account Balances Are Calculated', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/how-account-balances-are-calculated.html' },
    { title: 'Using General Ledger: General Accounting Dashboard', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/general-accounting-dashboard.html' },
    { title: 'Using General Ledger: Journals Infolet', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/journals-infolet.html' },
    { title: 'Using General Ledger: General Ledger Trial Balance Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/general-ledger-trial-balance-reports.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Ledgers and Subledgers', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/ledgers-and-subledgers.html' },
    { title: 'Financials 26B What’s New: Ledger Agent for Agentic AI-Powered General Ledger Experience', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26b/fins26b/26B-fin-wn-f43814.htm' },
    { title: 'Financials 26D What’s New: Ledger Agentic Application', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51915.htm' },
  ],
};
