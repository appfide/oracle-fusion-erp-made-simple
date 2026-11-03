export default {
  slug: 'big-journeys',
  title: 'The Big Journeys: Procure-to-Pay, Order-to-Cash, Record-to-Report',
  minutes: 20,
  summary:
    'Almost everything finance does fits into three big end-to-end journeys: Procure-to-Pay (buying and paying), Order-to-Cash (selling and collecting) and Record-to-Report (closing the books and reporting). See how each one flows through Oracle Fusion, how Subledger Accounting turns transactions into journals for the General Ledger, and which modules of this guide cover each step.',
  objectives: [
    'Describe the main steps of Procure-to-Pay, Order-to-Cash and Record-to-Report',
    'Explain how subledgers, Subledger Accounting and the General Ledger work together',
    'Explain what the Create Accounting process does and its key options',
    'Record the journal entries created along each journey',
    'Map each journey step to the module of this guide that teaches it',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Three rivers that flow into one lake',
      html: `<p>Picture a valley with three rivers. The first carries everything Sunny <strong>buys</strong>: lemons, sugar, cups. The second carries everything Sunny <strong>sells</strong>: bottles of lemonade to cafes and schools. Both rivers flow into one big <strong>lake</strong> — the General Ledger — where all the money ends up.</p>
<p>The third river is a little different: it's the careful job of <strong>checking the lake</strong> every month, tidying it, measuring it, and telling Sam how deep it is.</p>
<p><span class="hl">Those three rivers are the big finance journeys: Procure-to-Pay, Order-to-Cash and Record-to-Report.</span> Once you can see them, every module in this guide becomes a stretch of one of the rivers.</p>`,
    },
    {
      type: 'text',
      heading: 'Why journeys matter',
      html: `<p>In the first lesson you learned that an ERP lets each person do one step and pass the information on. A <strong>journey</strong> (also called an <em>end-to-end process</em>) is the whole chain of those steps, from the first request to the final number in the books.</p>
<p>The three journeys in this lesson are standard names used across the finance world, often shortened:</p>
<ul>
<li><strong>P2P – Procure-to-Pay</strong>: from "we need something" to "the supplier is paid".</li>
<li><strong>O2C – Order-to-Cash</strong>: from "a customer wants something" to "their money is in our bank".</li>
<li><strong>R2R – Record-to-Report</strong>: from "transactions are recorded" to "financial statements are published".</li>
</ul>
<p>Oracle's own Financials guide titles echo the same ideas: <em>Using Payables Invoice to Pay</em> covers the invoice-to-payment part of P2P, and <em>Using Receivables Credit to Cash</em> covers the billing-to-cash part of O2C.</p>`,
    },
    {
      type: 'flow',
      title: 'Procure-to-Pay at Sunny Lemonade',
      steps: [
        { icon: '🙋', label: 'Request', detail: 'Noah needs lemons for the kitchen and creates a requisition.' },
        { icon: '🛒', label: 'Order', detail: 'Leo turns it into a purchase order: 1,000 lemons at $0.50 from Lemon Grove Farms.' },
        { icon: '📦', label: 'Receive', detail: 'The lemons arrive; Noah records the receipt.' },
        { icon: '🧾', label: 'Invoice', detail: 'Ava enters the $500 supplier invoice and matches it to the PO and receipt.' },
        { icon: '✅', label: 'Validate & approve', detail: 'The system checks the invoice (holds if something is off) and it is approved.' },
        { icon: '💸', label: 'Pay', detail: 'On the due date (Net 30), the invoice is paid from the Sunny Operating Account.' },
        { icon: '📒', label: 'Account', detail: 'Accounting is created for the invoice and payment and sent to General Ledger.' },
      ],
      note: `<p>Requisitions, purchase orders and receipts belong to <strong>Procurement</strong>; invoices and payments to <strong>Payables</strong> and <strong>Payments</strong>; bank checks to <strong>Cash Management</strong>.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put Procure-to-Pay in order',
      instructions: `<p>Sunny needs sugar from Sweet Sugar Co. Put the steps in the right order.</p>`,
      items: [
        'Noah creates a requisition for sugar',
        'Leo creates a purchase order for Sweet Sugar Co.',
        'Noah records the receipt when the sugar arrives',
        'Ava enters the $200 invoice and matches it to the order and receipt',
        'The invoice is validated and approved',
        'The invoice is paid on its due date',
      ],
      explain: `<p>Need → order → receive → bill → check and approve → pay. Matching the invoice to the purchase order and receipt lets Ava confirm Sunny only pays for what it ordered <em>and</em> received. You'll study each step in the Procurement and Payables modules.</p>`,
    },
    {
      type: 'journal',
      title: 'P2P accounting 1: the lemon invoice is accounted',
      lines: [
        { account: '5110 Lemons Cost', debit: 500, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 500 },
      ],
      note: `<p>A simple view. Many companies that receive goods against purchase orders first record a <em>receipt accrual</em> (for example to account 2120 Received Not Invoiced Accrual) when the goods arrive, then clear it when the invoice is accounted. The Payables and Procurement modules show both styles.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: P2P accounting 2 – the payment',
      instructions: `<p>Thirty days later, Sunny pays Lemon Grove Farms the $500 from Big River Bank. Build the payment accounting.</p>`,
      accounts: ['2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '5110 Lemons Cost', '2120 Received Not Invoiced Accrual', '7110 Bank Charges'],
      answer: [
        { account: '2110 Accounts Payable – Trade', debit: 500, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 500 },
      ],
      explain: `<p>Paying settles the liability: <strong>debit</strong> Accounts Payable (it goes down) and <strong>credit</strong> Cash (it goes down). The cost of lemons was already recorded when the invoice was accounted, so 5110 isn't touched again.</p>`,
    },
    {
      type: 'flow',
      title: 'Order-to-Cash at Sunny Lemonade',
      steps: [
        { icon: '📞', label: 'Order', detail: 'Happy Cafe orders 200 bottles of lemonade at $2 each.' },
        { icon: '🚚', label: 'Deliver', detail: 'Sunny delivers the bottles to the cafe.' },
        { icon: '🧾', label: 'Bill', detail: 'Omar creates a $400 Receivables invoice for Happy Cafe.' },
        { icon: '⏳', label: 'Collect', detail: 'If the cafe is late, Omar follows up through collections.' },
        { icon: '💰', label: 'Receive cash', detail: 'Happy Cafe pays; Omar records the receipt and applies it to the invoice.' },
        { icon: '🏦', label: 'Reconcile', detail: 'Mia matches the deposit on the bank statement.' },
        { icon: '📒', label: 'Account', detail: 'Accounting for the invoice and receipt goes to General Ledger.' },
      ],
      note: `<p>Larger companies capture orders and shipments in <strong>Oracle Fusion Cloud Order Management</strong> and other supply chain applications. In this guide we focus on the finance part: <strong>Receivables</strong>, <strong>Revenue Management</strong> and <strong>Cash Management</strong>.</p>`,
    },
    {
      type: 'journal',
      title: 'O2C accounting 1: the Happy Cafe invoice',
      lines: [
        { account: '1210 Accounts Receivable', debit: 400, credit: 0 },
        { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 400 },
      ],
      note: `<p>Sales tax is left out to keep the example simple; the Tax lesson adds it (to 2210 Sales Tax Payable).</p>`,
    },
    {
      type: 'lab',
      tool: 'journal-sandbox',
      title: 'Sandbox: O2C accounting 2 – the cash arrives',
      intro: `<p>Happy Cafe pays the $400. The sandbox shows the receipt accounting: debit Cash, credit Accounts Receivable. Look at the effect on each account. Then try crediting Lemonade Sales Revenue instead of Accounts Receivable — what would go wrong with Sunny's revenue and with what the cafe still seems to owe?</p>`,
      preset: {
        lines: [
          { account: '1110 Cash – Big River Bank', debit: 400, credit: 0 },
          { account: '1210 Accounts Receivable', debit: 0, credit: 400 },
        ],
      },
    },
    {
      type: 'text',
      heading: 'Subledgers and Subledger Accounting: the bridge to the ledger',
      html: `<p>Payables, Receivables, Assets, Cash Management and Expenses are called <strong>subledgers</strong>. They hold the <em>detail</em>: each invoice, each customer, each machine. The <strong>General Ledger</strong> holds the <em>summary</em>: account balances that build the financial statements.</p>
<p>Between them sits <strong>Subledger Accounting</strong> (often called SLA). It's Oracle Fusion's accounting engine. Here's the idea:</p>
<ol>
<li>Something happens in a subledger — an invoice is validated, a payment is made. That creates an <strong>accounting event</strong>.</li>
<li>Rules defined in the ledger's <strong>accounting method</strong> (remember the fourth C, "convention"?) decide which accounts to debit and credit. These are set up as <em>journal entry rules</em>.</li>
<li>The <strong>Create Accounting</strong> process turns events into <strong>subledger journal entries</strong>.</li>
<li>Those entries are summarized and <strong>transferred to General Ledger</strong>, where they become GL journals and are <strong>posted</strong> to update balances.</li>
</ol>
<p>Because the rules are set up once, Ava never types debits and credits for a normal invoice — and every invoice is accounted the same consistent way.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Create Accounting process',
      html: `<p><strong>Create Accounting</strong> is a scheduled process (you met those in <em>Finding Your Way</em>). Oracle's <em>Using Subledger Accounting</em> guide lists its parameters, including:</p>
<ul>
<li><strong>Subledger Application</strong> and <strong>Ledger</strong> – which subledger and ledger to account for.</li>
<li><strong>End Date</strong> – only events on or before this date are picked up.</li>
<li><strong>Accounting Mode</strong> – <em>Draft</em> (a preview you can review, not transferred) or <em>Final</em> (the real entries; the default).</li>
<li><strong>Process Events</strong> – All, Errors only, or Invalid Accounts.</li>
<li><strong>Transfer to General Ledger</strong> – Yes or No (default Yes).</li>
<li><strong>Post in General Ledger</strong> – Yes or No (default Yes, for users with the posting privilege).</li>
</ul>
<p>When it runs, a <strong>Create Accounting Execution Report</strong> is produced so you can see what succeeded and what failed. You can also create accounting for a single transaction online — for example from an invoice — instead of waiting for the batch process.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: submit Create Accounting for Payables',
      instructions: `<p>This is a simplified practice screen, not Oracle's page. It's 31 January 2026. Ava wants to create <strong>final</strong> accounting for all of Sunny US BU's January Payables events, transfer it to the ledger and post it.</p>`,
      formTitle: 'Create Accounting – Process Details (practice)',
      fields: [
        { label: 'Subledger Application', type: 'select', options: ['Payables', 'Receivables', 'Assets'], answer: 'Payables' },
        { label: 'Ledger', type: 'select', options: ['Sunny US Ledger', 'Sunny UK Ledger'], answer: 'Sunny US Ledger' },
        { label: 'End Date', type: 'date', answer: '2026-01-31' },
        { label: 'Accounting Mode', type: 'select', options: ['Draft', 'Final'], answer: 'Final' },
        { label: 'Process Events', type: 'select', options: ['All', 'Errors', 'Invalid Accounts'], answer: 'All' },
        { label: 'Transfer to General Ledger', type: 'select', options: ['Yes', 'No'], answer: 'Yes' },
        { label: 'Post in General Ledger', type: 'select', options: ['Yes', 'No'], answer: 'Yes' },
      ],
      explain: `<p>Sunny US BU posts to <strong>Sunny US Ledger</strong>. An End Date of <strong>31 January</strong> picks up all events up to month-end. <strong>Final</strong> mode creates real entries (Draft is only a preview and is not transferred). <strong>All</strong> events, with <strong>Transfer</strong> and <strong>Post</strong> set to Yes, sends the journals to General Ledger and updates balances in one go.</p>`,
    },
    {
      type: 'flow',
      title: 'Record-to-Report: closing the month',
      steps: [
        { icon: '🧮', label: 'Subledgers account', detail: 'Payables, Receivables, Assets and Cash run Create Accounting and close their periods.' },
        { icon: '✍️', label: 'Manual journals', detail: 'Priya records adjustments no subledger handles, such as accruals and corrections.' },
        { icon: '📉', label: 'Depreciation', detail: 'Assets calculates $100 depreciation for the $6,000 lemonade stand.' },
        { icon: '🔍', label: 'Reconcile', detail: 'Balances are checked against subledgers and the bank statement.' },
        { icon: '🌍', label: 'Currencies & consolidation', detail: 'Foreign currency balances are revalued and translated; US and UK results are combined.' },
        { icon: '🔒', label: 'Close the period', detail: 'Priya closes Jan-26 in the General Ledger.' },
        { icon: '📊', label: 'Report', detail: 'Balance sheet and income statement go to Sam.' },
      ],
      note: `<p>R2R is mostly the <strong>General Ledger</strong> module, with help from <strong>Assets</strong>, <strong>Cash Management</strong> and <strong>Reporting</strong>.</p>`,
    },
    {
      type: 'journal',
      title: 'R2R example: January depreciation on the lemonade stand',
      lines: [
        { account: '6140 Depreciation Expense', debit: 100, credit: 0 },
        { account: '1590 Accumulated Depreciation', debit: 0, credit: 100 },
      ],
      note: `<p>$6,000 ÷ 60 months = $100 per month (straight-line). Assets creates this through Subledger Accounting each month; you'll study it in the Fixed Assets module.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Which journey is it?',
      instructions: `<p>Put each activity in the journey it belongs to.</p>`,
      categories: ['Procure-to-Pay', 'Order-to-Cash', 'Record-to-Report'],
      items: [
        { text: 'Leo sends a purchase order to Cup & Straw Supply', answer: 'Procure-to-Pay' },
        { text: 'Ava releases a hold on a supplier invoice', answer: 'Procure-to-Pay' },
        { text: 'Omar sends City Park Kiosk an invoice', answer: 'Order-to-Cash' },
        { text: 'Omar applies a customer receipt to an open invoice', answer: 'Order-to-Cash' },
        { text: 'Priya closes the Jan-26 period', answer: 'Record-to-Report' },
        { text: 'Sam reviews the monthly income statement', answer: 'Record-to-Report' },
        { text: 'A supplier payment leaves the Sunny Operating Account', answer: 'Procure-to-Pay' },
      ],
      explain: `<p>Buying and paying suppliers is <strong>P2P</strong>. Billing customers and collecting cash is <strong>O2C</strong>. Closing periods and producing financial statements is <strong>R2R</strong>. All three meet in the General Ledger.</p>`,
    },
    {
      type: 'table',
      caption: 'Your map: which module of this guide teaches each part of each journey',
      headers: ['Journey', 'Steps', 'Module(s) in this guide'],
      rows: [
        ['Procure-to-Pay', 'Requisition, purchase order, receipt', '<strong>Procurement</strong>'],
        ['Procure-to-Pay', 'Suppliers, invoices, matching, holds, approval, payments, prepayments, tax', '<strong>Accounts Payable</strong> (start right after the Basics)'],
        ['Procure-to-Pay', 'Employee spending paid back', '<strong>Expenses</strong>'],
        ['Order-to-Cash', 'Customers, invoices, credit memos, receipts, collections, revenue', '<strong>Accounts Receivable</strong>'],
        ['P2P and O2C', 'Bank accounts, statements, reconciliation, cash position', '<strong>Cash Management</strong>'],
        ['Record-to-Report', 'Journals, periods and close, currencies, consolidation', '<strong>General Ledger</strong>'],
        ['Record-to-Report', 'Buying, depreciating and retiring long-lived assets', '<strong>Fixed Assets</strong>'],
        ['Record-to-Report', 'OTBI, Oracle Analytics Publisher (formerly BI Publisher), financial reports, Smart View', '<strong>Reports and Analytics</strong>'],
        ['All three', 'Bulk loads, integrations, background jobs', '<strong>Data, Integrations and Automation</strong>'],
        ['All three', 'Tax, intercompany, budgetary control', '<strong>More Financial Tools</strong>'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match the person to their journey step',
      instructions: `<p>Match each Sunny team member to the step they own.</p>`,
      pairs: [
        { left: 'Leo', right: 'Creates purchase orders (P2P)' },
        { left: 'Noah', right: 'Records receipts of deliveries (P2P)' },
        { left: 'Ava', right: 'Enters and pays supplier invoices (P2P)' },
        { left: 'Omar', right: 'Bills customers and applies receipts (O2C)' },
        { left: 'Mia', right: 'Reconciles the bank statement (P2P and O2C)' },
        { left: 'Priya', right: 'Closes the period in General Ledger (R2R)' },
      ],
      explain: `<p>Each person owns one stretch of a journey, and the ERP passes the information along. Notice how Mia's bank work supports both money-out (P2P) and money-in (O2C), while Priya's close brings everything together (R2R).</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'When accounting gets stuck',
      html: `<p>If a transaction never shows up in the General Ledger, the usual suspects are: accounting wasn't created yet (Create Accounting hasn't run), it ran in <em>Draft</em> mode, it hit an error such as an invalid or disabled account combination, or the journal was transferred but not posted. The Create Accounting Execution Report and the subledger's accounting views are the first places to look.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Job titles often follow these journeys: "P2P analyst", "O2C lead", "R2R accountant". In interviews and projects, people describe problems by journey ("we have a P2P matching issue"). When you learn a new screen, always ask: <em>which journey is this, what came before it, and what happens next?</em> That habit is what turns a screen-clicker into a real practitioner.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Procure-to-Pay (P2P)', def: 'The journey from requesting goods or services to paying the supplier.' },
        { term: 'Order-to-Cash (O2C)', def: 'The journey from a customer order to collecting the customer’s payment.' },
        { term: 'Record-to-Report (R2R)', def: 'The journey from recording accounting to closing the period and producing financial reports.' },
        { term: 'Subledger', def: 'A module that keeps detailed transactions, such as Payables or Receivables, whose accounting flows to the General Ledger.' },
        { term: 'Subledger Accounting', def: 'Oracle Fusion’s accounting engine that turns subledger transactions into journal entries using rules.' },
        { term: 'Create Accounting', def: 'The scheduled process that creates subledger journal entries and can transfer and post them to General Ledger.' },
        { term: 'Posting', def: 'Updating General Ledger account balances with the amounts from a journal.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which journey includes creating a purchase order and paying the supplier?',
          options: ['Order-to-Cash', 'Procure-to-Pay', 'Record-to-Report', 'Hire-to-Retire'],
          answer: 1,
          explain: 'Procure-to-Pay runs from the need and purchase order through receipt and invoice to payment.',
        },
        {
          q: 'What does Subledger Accounting do?',
          options: [
            'Prints customer statements',
            'Turns subledger transactions into journal entries using rules and sends them to General Ledger',
            'Creates users and roles',
            'Stores bank statements',
          ],
          answer: 1,
          explain: 'SLA is the accounting engine: events from subledgers become subledger journal entries, which are transferred to and posted in General Ledger.',
        },
        {
          q: 'Ava runs Create Accounting in Draft mode. What happens?',
          options: [
            'Final entries are created and posted',
            'Ava gets a preview of the accounting that isn’t transferred to General Ledger',
            'All invoices are deleted',
            'The period is closed',
          ],
          answer: 1,
          explain: 'Draft mode lets you review the accounting first. Final mode creates the real entries that can be transferred and posted.',
        },
        {
          q: 'Happy Cafe pays its $400 invoice. Which entry is correct?',
          options: [
            'Debit 4110 Revenue 400, Credit 1110 Cash 400',
            'Debit 1110 Cash 400, Credit 1210 Accounts Receivable 400',
            'Debit 1210 Accounts Receivable 400, Credit 4110 Revenue 400',
            'Debit 2110 Accounts Payable 400, Credit 1110 Cash 400',
          ],
          answer: 1,
          explain: 'Revenue was recorded when the invoice was created. The receipt increases Cash and reduces what the customer owes (Accounts Receivable).',
        },
        {
          q: 'Which module of this guide mainly teaches Record-to-Report?',
          options: ['Procurement', 'Expenses', 'General Ledger', 'Accounts Receivable'],
          answer: 2,
          explain: 'Journals, period close, currencies and consolidation — the heart of R2R — are covered in the General Ledger module, with help from Assets and Reporting.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Subledger Accounting – How You Submit Accounting Process (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fausl/how-you-submit-accounting-process.html' },
    { title: 'Using Subledger Accounting (full guide, PDF, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fausl/using-subledger-accounting.pdf' },
    { title: 'Implementing Subledger Accounting (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faisl/index.html' },
    { title: 'Implementing Enterprise Structures and General Ledger – Ledgers and Subledgers (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/ledgers-and-subledgers.html' },
    { title: 'Using Payables Invoice to Pay (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/index.html' },
    { title: 'Using Receivables Credit to Cash (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/index.html' },
    { title: 'Using General Ledger (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/index.html' },
    { title: 'Oracle Fusion Cloud Procurement', publisher: 'Oracle', url: 'https://www.oracle.com/erp/procurement/' },
    { title: 'Oracle Fusion Cloud Financial Management', publisher: 'Oracle', url: 'https://www.oracle.com/erp/financial-management/' },
    { title: 'Overview of Analytics Publisher (Creating and Administering Analytics and Reports, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faacc/overview-of-business-intelligence-publisher.html' },
  ],
};
