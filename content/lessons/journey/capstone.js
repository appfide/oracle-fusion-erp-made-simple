export default {
  slug: 'capstone',
  title: 'Capstone: A Whole Year at Sunny Lemonade',
  minutes: 35,
  summary:
    'Follow Sunny Lemonade through all of 2026 in Oracle Fusion Cloud ERP — from setting up the books to buying, paying, selling, banking, assets, expenses, the UK business, data loads, quarterly updates, AI helpers and the year-end close — and practise every module one last time.',
  objectives: [
    'Connect every module of the course into one end-to-end story',
    'Recognize which module and which person handle each business event',
    'Practise matching, payment terms, journals, depreciation, currencies and account combinations again',
    'Explain how reporting, data loads, updates and AI support the whole year',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'A diary for a whole year',
      html: `<p>Imagine keeping a diary for a whole year at your lemonade stand. In January you set up your notebook. In spring you buy lemons and sell your first cups. In summer you build a bigger stand. In autumn a cousin in another country starts a stand too. In December you add everything up and see how the year went.</p>
<p>Every page of your diary connects to the others: the lemons you bought in spring explain the money you spent; the stand you built in summer is still worth something in December.</p>
<p>This last lesson is Sunny Lemonade’s diary for 2026. <span class="hl">Every module you learned is a chapter, and they all connect in one shared system.</span></p>`,
    },
    {
      type: 'flow',
      title: 'Sunny’s 2026 at a glance',
      steps: [
        { icon: '🧱', label: 'Jan', detail: 'Books set up and opened: ledgers, chart of accounts, roles.' },
        { icon: '🛒', label: 'Feb–Mar', detail: 'Buy lemons, match, pay suppliers.' },
        { icon: '🔄', label: 'Apr', detail: 'First quarterly update tested and applied.' },
        { icon: '💰', label: 'May–Jun', detail: 'Bill cafes, collect cash, reconcile the bank.' },
        { icon: '🏭', label: 'Jul–Aug', detail: 'New stand (asset) and Noah’s business trip (expenses).' },
        { icon: '🇬🇧', label: 'Sep', detail: 'UK business, currencies, intercompany and tax.' },
        { icon: '🔌', label: 'Oct–Nov', detail: 'Bulk data, robots, integrations, AI helpers, update 26D.' },
        { icon: '📊', label: 'Dec', detail: 'Year-end close and the annual reports.' },
      ],
      note: `<p>Each month below names the people, the Oracle Fusion areas they use and the accounting that results. Try every exercise — this is your final practice before the big quiz.</p>`,
    },
    {
      type: 'text',
      heading: 'January: the shared notebook opens',
      html: `<p>On January 2, Jordan, the implementation consultant, hands Sunny Lemonade a working Oracle Fusion Cloud ERP. Over the past months Jordan used the <strong>Setup and Maintenance</strong> work area and the rapid implementation spreadsheet to build the <strong>enterprise structure</strong>: the <em>Sunny Group</em> enterprise, two legal entities (Sunny Lemonade US Inc. in USD and Sunny Lemonade UK Ltd in GBP), two primary ledgers (Sunny US Ledger and Sunny UK Ledger) and two business units.</p>
<p>The heart of it all is the <strong>Sunny COA</strong>, the chart of accounts with five segments: Company, Cost Center, Account, Product and Intercompany. Every amount anyone records in 2026 will carry one of these account combinations, such as <code>101-200-5110-010-000</code> — Sunny Lemonade US Inc., Kitchen, Lemons Cost, Classic Lemonade, no intercompany.</p>
<p>Jordan also set up <strong>security</strong>: Ava gets Payables roles for Sunny US BU, Priya gets General Ledger roles for the US ledger, Omar gets Receivables roles, Mia gets Cash Management roles, Leo gets procurement roles, and Noah can receive deliveries and submit expenses. Nobody can both create a supplier <em>and</em> pay it — a simple separation of duties that protects the company.</p>
<p>Priya opens the first accounting period, <code>Jan-26</code>. The big shared notebook is open for business.</p>`,
    },
    {
      type: 'lab',
      tool: 'coa-builder',
      title: 'Build a Sunny account combination',
      intro: `<p>Priya double-checks the combination for lemons bought by the US kitchen for Classic Lemonade. Build it segment by segment and see whether it passes Sunny’s cross-validation rules.</p>`,
      preset: { company: '101', costCenter: '200', account: '5110', product: '010', intercompany: '000' },
    },
    {
      type: 'text',
      heading: 'February: buying lemons the proper way',
      html: `<p>Spring is coming and the kitchen needs lemons. This is the <strong>procure-to-pay</strong> journey you followed in the Payables and Procurement modules.</p>
<ol>
<li><strong>Requisition.</strong> Noah asks for 1,000 lemons in a purchase requisition.</li>
<li><strong>Purchase order.</strong> Leo, the buyer, turns it into a purchase order to Lemon Grove Farms: 1,000 lemons at $0.50, total <strong>$500</strong>, terms <strong>Net 30</strong>.</li>
<li><strong>Receipt.</strong> When the truck arrives, Noah records a receipt for 1,000 lemons.</li>
<li><strong>Invoice.</strong> Lemon Grove Farms emails its invoice. The invoice reader (Intelligent Document Recognition) creates it in Payables; Ava checks it and matches it to the purchase order.</li>
<li><strong>Validation.</strong> Ava validates the invoice. Fusion compares the purchase order, the receipt and the invoice — the <strong>three-way match</strong>. Quantities and prices agree, so no hold is placed.</li>
<li><strong>Approval.</strong> The invoice approval workflow asks Noah to confirm. Approved.</li>
</ol>
<p>Then, when Ava runs <strong>Create Accounting</strong>, Payables creates the journal below and transfers it to the General Ledger.</p>`,
    },
    {
      type: 'journal',
      title: 'February: the lemon invoice is accounted',
      lines: [
        { account: '5110 Lemons Cost (101-200-5110-010-000)', debit: 500, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-000-2110-000-000)', debit: 0, credit: 500 },
      ],
      note: `<p>The cost goes up and Sunny now owes Lemon Grove Farms. No cash has moved yet. (Companies that accrue at receipt use 2120 Received Not Invoiced Accrual in between — you saw that option in the Payables accounting lesson.)</p>`,
    },
    {
      type: 'lab',
      tool: 'three-way-match',
      title: 'What if the farm sends a different invoice?',
      intro: `<p>In late February a second order arrives: Leo ordered 1,000 lemons at $0.50, Noah received only 950, but the invoice charges for 1,000 at $0.52. With 0% quantity tolerance and 2% price tolerance on a three-way match, would Ava’s invoice go on hold? Try changing the numbers.</p>`,
      preset: { poQty: 1000, poPrice: 0.5, rcvQty: 950, invQty: 1000, invPrice: 0.52, qtyTol: 0, priceTol: 2, level: 3 },
    },
    {
      type: 'text',
      heading: 'March: paying on time (and grabbing discounts)',
      html: `<p>In March, Mia and Ava run Sunny’s first big <strong>payment process request</strong>. Fusion selects invoices that are validated, approved, free of holds and due, then builds payments. The <strong>Lemon Grove Farms</strong> invoice from February is due 30 days after its date. <strong>Sweet Sugar Co.</strong> offers terms <strong>2/10 Net 30</strong> on its $200 sugar invoice: pay within 10 days and keep 2%.</p>
<p>Oracle Analytics Publisher does the paperwork: a check for one supplier, an electronic payment file for Big River Bank, separate remittance advices emailed to suppliers, and a positive pay file so the bank only cashes Sunny’s real checks.</p>
<p>At the end of March, Ava closes the Payables period after clearing the unaccounted transactions report, and Priya closes <code>Mar-26</code> in the General Ledger — the first quarter is done.</p>`,
    },
    {
      type: 'lab',
      tool: 'payment-terms',
      title: 'Should Sunny take the sugar discount?',
      intro: `<p>Sweet Sugar Co.’s $200 invoice is dated 1 March 2026 with terms 2/10 Net 30. Ava plans to pay on 9 March. Check the discount date, the due date and how much Sunny pays. Then try paying on 20 March.</p>`,
      preset: { invoiceDate: '2026-03-01', amount: 200, netDays: 30, discountPct: 2, discountDays: 10, payDate: '2026-03-09' },
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Record the Lemon Grove Farms payment',
      instructions: `<p>Sunny pays the $500 Lemon Grove Farms invoice from the Sunny Operating Account (no discount, no clearing account). Build the payment accounting.</p>`,
      accounts: ['2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '5110 Lemons Cost', '1210 Accounts Receivable', '7110 Bank Charges'],
      answer: [
        { account: '2110 Accounts Payable – Trade', debit: 500, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 500 },
      ],
      explain: `<p>Paying clears the liability (debit Accounts Payable) and reduces cash (credit the bank account). The lemon cost was recorded in February and does not move again.</p>`,
    },
    {
      type: 'text',
      heading: 'April: the first quarterly update',
      html: `<p>In April, Sunny meets the rhythm of the cloud: a <strong>quarterly update</strong>. Jordan had read the Financials What’s New in March, sorted the Feature Summary by impact, and listed which features were opt-in. On the weekend after the first Friday, Sunny’s <strong>test</strong> environment was updated. For two weeks Ava, Priya, Omar and Mia ran their regression scripts: enter and pay an invoice, import and post a journal, apply a receipt, reconcile a statement, run the key reports. One custom OTBI analysis needed a small fix.</p>
<p>On the weekend after the third Friday, <strong>production</strong> was updated. Monday was calm. Sam approved switching on one opt-in Payables feature after a short training session. The team wrote a one-page change log — a habit they keep every quarter.</p>`,
    },
    {
      type: 'text',
      heading: 'May: selling lemonade to cafes',
      html: `<p>With summer coming, sales grow. This is the <strong>order-to-cash</strong> journey from the Receivables module. Omar sets up <strong>Happy Cafe</strong>, <strong>City Park Kiosk</strong> and <strong>Sunshine School</strong> as customers with bill-to sites and contacts.</p>
<p>Happy Cafe buys 200 bottles at $2 — a <strong>$400</strong> invoice with Net 30 terms. City Park Kiosk is in a city that charges sales tax, so its $400 invoice gets 8% tax calculated by Oracle Fusion Tax: $32, recorded in <strong>2210 Sales Tax Payable</strong> because Sunny collects it for the tax authority.</p>
<p>When Happy Cafe pays, Omar records a <strong>receipt</strong> and applies it to the invoice. When a payment arrives without a clear reference, Omar investigates rather than guessing. Customers who are late get friendly reminders through the collections tools — collecting money politely is a skill too.</p>`,
    },
    {
      type: 'lab',
      tool: 'journal-sandbox',
      title: 'See the City Park Kiosk invoice with tax',
      intro: `<p>Here is the City Park Kiosk invoice accounting: $400 of lemonade plus $32 sales tax. Watch how each account changes, then try adding the receipt when the kiosk pays $432 (debit cash, credit receivables).</p>`,
      preset: {
        lines: [
          { account: '1210 Accounts Receivable', debit: 432, credit: 0 },
          { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 400 },
          { account: '2210 Sales Tax Payable', debit: 0, credit: 32 },
        ],
      },
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Happy Cafe pays its $400',
      instructions: `<p>Happy Cafe pays its $400 invoice in full into the Sunny Operating Account. Omar applies the receipt. Build the accounting for the receipt.</p>`,
      accounts: ['1110 Cash – Big River Bank', '1210 Accounts Receivable', '4110 Lemonade Sales Revenue', '2110 Accounts Payable – Trade', '2210 Sales Tax Payable'],
      answer: [
        { account: '1110 Cash – Big River Bank', debit: 400, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 400 },
      ],
      explain: `<p>Cash goes up and the amount the cafe owes goes down. Revenue was already recorded when the invoice was created — collecting the cash does not create more revenue.</p>`,
    },
    {
      type: 'text',
      heading: 'June: watching the bank',
      html: `<p>Mia’s job is to know how much cash Sunny really has. Every morning Big River Bank’s statement for the Sunny Operating Account is loaded into Cash Management. The <strong>Autoreconciliation</strong> process matches statement lines to Sunny’s payments and receipts using matching rules and tolerances. Most lines match automatically; Mia handles the exceptions.</p>
<p>In June, one line does not match anything: a <strong>$15 bank charge</strong>. Mia creates an external transaction for it, which results in the journal below. With statements reconciled, Mia’s cash position for the week is trustworthy, and Mia can see that Sunny will have enough cash for July’s big purchase.</p>`,
    },
    {
      type: 'journal',
      title: 'June: the bank charge',
      lines: [
        { account: '7110 Bank Charges', debit: 15, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 15 },
      ],
      note: `<p>The bank already took the money; this entry makes Sunny’s books agree with the bank.</p>`,
    },
    {
      type: 'text',
      heading: 'July: a brand-new lemonade stand',
      html: `<p>Business is booming, so Sam approves a new stand. Leo orders it from <strong>Stand Builders LLC</strong> for <strong>$6,000</strong>. Because Sunny uses budgetary control for equipment, the purchase order passes a <strong>funds check</strong> against the 2026 equipment budget first.</p>
<p>The stand is delivered and the $6,000 invoice is entered in Payables, coded to <strong>1510 Equipment (Fixed Assets)</strong>. Because the invoice line is coded to an asset account and marked to be tracked as an asset, <strong>Create Mass Additions</strong> sends it to Fixed Assets. The asset accountant reviews it, assigns the category, a 5-year (60-month) life and straight-line depreciation, and posts it with <strong>Post Mass Additions</strong>.</p>
<p>From now on, each month <strong>Calculate Depreciation</strong> charges $100 to <strong>6140 Depreciation Expense</strong> and adds $100 to <strong>1590 Accumulated Depreciation</strong>. The stand’s net book value goes down by $100 every month.</p>`,
    },
    {
      type: 'lab',
      tool: 'depreciation',
      title: 'Depreciate the new stand',
      intro: `<p>The stand cost $6,000, has no salvage value and a 60-month life, using straight-line depreciation. Check the monthly charge and the net book value at the end of 2026 (the stand is depreciated for July to December — 6 months). Then try the declining-balance method to compare.</p>`,
      preset: { cost: 6000, salvage: 0, lifeMonths: 60, method: 'sl' },
    },
    {
      type: 'text',
      heading: 'August: Noah’s trip',
      html: `<p>In August Noah visits a lemon festival to find new suppliers. Noah pays for the train and meals — <strong>$120</strong> in total — and photographs every receipt on the way.</p>
<p>Back home, Noah creates an <strong>expense report</strong> in the Expenses work area. Sunny’s <strong>expense policies</strong> check each line (meals within the daily limit, receipts attached). Noah’s manager approves it, an auditor checks the receipts, and the approved report flows to Payables, where it is paid with the next payment run, straight into Noah’s bank account. The cost lands in <strong>6130 Travel and Meals</strong>.</p>
<p>Noah liked the experience but asks about the mobile app. Jordan explains that Oracle has announced the end of support for the Fusion Expenses mobile apps from update 27B, and that the <strong>Expenses Agent</strong> — which can read emailed receipts — is the recommended path. It goes on the 2027 plan.</p>`,
    },
    {
      type: 'text',
      heading: 'September: the UK business, currencies and intercompany',
      html: `<p>Sunny Lemonade UK Ltd is growing too, and it keeps its books in <strong>GBP</strong> in the Sunny UK Ledger. In September the US company ships lemonade concentrate to the UK company and bills it <strong>£1,000</strong>. Because two Sunny companies are trading with each other, this is an <strong>intercompany</strong> transaction: the US side records a receivable from the UK, the UK side records a payable to the US, and the Intercompany segment (101 or 201) shows who the partner is, so both sides can be reconciled and eliminated in group reporting.</p>
<p>The US company records the £1,000 receivable in USD at the September rate of <strong>1.25</strong> USD per GBP — $1,250. At the end of September the rate is <strong>1.30</strong>. The pounds the UK owes are now worth $1,300, so the <strong>Revalue Balances</strong> process records a $50 gain in <strong>7120 Foreign Exchange Gain/Loss</strong>. When Sam looks at the whole Sunny Group, a ledger set and consolidation bring the US and UK numbers together in one currency.</p>
<p>Taxes matter too: Oracle Fusion Tax calculates sales tax for US customers and VAT for UK customers based on configured rules, so Omar never has to remember rates by heart.</p>`,
    },
    {
      type: 'lab',
      tool: 'fx',
      title: 'Revalue the £1,000 intercompany receivable',
      intro: `<p>The receivable is £1,000, recorded at 1.25 USD/GBP. The month-end rate is 1.30. See the USD value at both rates and the revaluation gain. Then try a month-end rate of 1.20 — what happens?</p>`,
      preset: { amount: 1000, currency: 'GBP', rate1: 1.25, rate2: 1.3 },
    },
    {
      type: 'text',
      heading: 'October: lots of data, robots and connections',
      html: `<p>By October Sunny has 25 stands, and data volume explodes. Three tools from the Data module save the day:</p>
<ul>
<li><strong>FBDI.</strong> The suppliers’ portal sends one file with about <strong>500 invoices</strong> a month. Ava fills the Payables Standard Invoice Import template, generates the zip, runs <strong>Load Interface File for Import</strong> and <strong>Import Payables Invoices</strong>, and fixes the two rejected rows in the <strong>Correct Import Errors</strong> spreadsheet.</li>
<li><strong>Scheduled processes.</strong> An administrator creates a nightly process set: import, validate, then <strong>Create Accounting</strong> with transfer and post. Every morning Priya checks the statuses and logs instead of clicking buttons all day.</li>
<li><strong>APIs and Oracle Integration.</strong> Lemon Grove Farms starts sending invoices through the REST <code>invoices</code> resource, and an Oracle Integration flow automates the monthly FBDI file with <strong>importBulkData</strong>. A business event tells the asset team whenever a big equipment invoice is created. A dedicated integration user with limited roles keeps it safe.</li>
</ul>
<p>Most importantly, none of these shortcuts skip the controls: imported and API invoices are validated, approved and accounted exactly like typed ones.</p>`,
    },
    {
      type: 'text',
      heading: 'November: update 26D and the AI helpers',
      html: `<p>November brings update <strong>26D</strong>, and it is full of AI. Jordan reads the What’s New: improvements to the <strong>Payables Agent</strong> for near-touchless invoice processing, the <strong>Ledger Agentic Application</strong> for accountants, a <strong>Payables Period Close Workspace</strong> with <em>Ask Oracle</em>, and enhancements to the Expenses and Cash Processing agents. The old Digital Assistant templates are being desupported in favor of <strong>AI Agent Studio</strong>.</p>
<p>After the usual test-first, production-two-weeks-later cycle, Sunny pilots the Ledger Agent with Priya. In its first week it spots a $150 Bright Power Utility bill coded to Rent instead of Electricity, shows the evidence and proposes a correcting journal. Priya checks the bill, reviews the journal and sends it through normal approval. Sam’s AI rule for Sunny is simple and printed on the wall: <strong>“The helper prepares. A person decides.”</strong></p>`,
    },
    {
      type: 'text',
      heading: 'December: closing the year and telling the story in numbers',
      html: `<p>December is the busiest month for Priya. The year-end close follows the same order as every month — just with more care:</p>
<ol>
<li>Every subledger finishes its work: Payables, Receivables, Cash Management, Assets and Expenses.</li>
<li>Each runs Create Accounting and transfers to the General Ledger; Payables and Receivables reconcile to their control accounts (2110 and 1210).</li>
<li>Assets runs <strong>Calculate Depreciation</strong> for December and closes the period.</li>
<li>Priya posts accruals, recurring journals and the revaluation for the UK receivable; intercompany balances between companies 101 and 201 are reconciled.</li>
<li>The trial balance is reviewed, financial statements are produced and Sam approves them.</li>
<li>Priya closes <code>Dec-26</code>, and the new year <code>Jan-27</code> opens.</li>
</ol>
<p>Then the reporting toolbox comes out. The <strong>Account Monitor</strong> on the General Accounting Dashboard flags anything unusual. Ava’s <strong>OTBI</strong> dashboard confirms no invoices are stuck on hold. Priya runs the year’s <strong>income statement and balance sheet</strong> from the <strong>Financial Reporting Center</strong>, built in Financial Reporting Web Studio from the balances cube, and uses <strong>Smart View</strong> to slice expenses by cost center for the board pack. <strong>Oracle Analytics Publisher</strong> produces the year-end supplier tax documents. Sam asks for a three-year KPI trend, and Jordan explains that Oracle Fusion Data Intelligence is the tool for that kind of long-term analytics.</p>
<p>Finally, the team plans 2027: a budget loaded for budgetary control, the Expenses Agent pilot, and — of course — the next quarterly update.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the year-end close in order',
      instructions: `<p>Priya’s year-end checklist got shuffled. Put the steps in order.</p>`,
      items: [
        'Subledgers finish their December transactions',
        'Create Accounting runs and subledger journals transfer to the General Ledger',
        'Calculate Depreciation runs and the assets period closes',
        'Priya posts accruals, recurring journals and the currency revaluation',
        'Trial balance reviewed and financial statements produced',
        'Priya closes Dec-26 and Jan-27 opens',
      ],
      explain: `<p>Subledgers finish and send their accounting first, depreciation is calculated, then the General Ledger adds its own adjustments, the results are reviewed and reported, and only then is the period closed.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Which module handled it?',
      instructions: `<p>Match each 2026 event at Sunny Lemonade to the Oracle Fusion area that handled it.</p>`,
      pairs: [
        { left: 'Leo ordered 1,000 lemons from Lemon Grove Farms', right: 'Procurement' },
        { left: 'Ava validated and paid the $500 lemon invoice', right: 'Payables' },
        { left: 'Omar applied Happy Cafe’s $400 receipt', right: 'Receivables' },
        { left: 'Mia reconciled the Big River Bank statement', right: 'Cash Management' },
        { left: 'The $6,000 stand depreciated by $100 a month', right: 'Fixed Assets' },
        { left: 'Noah was paid back $120 for the festival trip', right: 'Expenses' },
        { left: 'The £1,000 receivable was revalued at month-end', right: 'General Ledger' },
      ],
      explain: `<p>Each business event has a home module, but they all share one system: procurement feeds payables, every subledger feeds the General Ledger, and the General Ledger feeds the reports.</p>`,
    },
    {
      type: 'table',
      caption: 'The year in one table',
      headers: ['Month', 'Main module(s)', 'Who', 'Key accounts'],
      rows: [
        ['Jan', 'Basics: enterprise structure, COA, security', 'Jordan, Priya', 'The whole Sunny COA'],
        ['Feb–Mar', 'Procurement, Payables, Payments', 'Leo, Noah, Ava, Mia', '5110, 5120, 2110, 1110'],
        ['Apr', 'Quarterly update', 'Jordan and everyone', '—'],
        ['May', 'Receivables, Tax', 'Omar', '1210, 4110, 2210'],
        ['Jun', 'Cash Management', 'Mia', '1110, 7110'],
        ['Jul', 'Procurement, Budgetary Control, Payables, Fixed Assets', 'Leo, Ava, asset accountant', '1510, 1590, 6140'],
        ['Aug', 'Expenses, Payables', 'Noah, Ava', '6130, 2110'],
        ['Sep', 'Intercompany, currencies, ledger sets, Tax', 'Priya, Omar', '7120, intercompany segment 201'],
        ['Oct', 'FBDI, scheduled processes, APIs, Oracle Integration', 'Ava, Priya, Jordan', 'All'],
        ['Nov', 'Update 26D, AI agents', 'Jordan, Priya', '6110, 6120'],
        ['Dec', 'Close and reporting', 'Priya, Sam', 'All'],
      ],
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'What a real finance-systems professional takes from this year',
      html: `<ul>
<li><strong>Everything connects.</strong> A mistake in a supplier setup in February shows up as a wrong report in December. Fix problems at the source.</li>
<li><strong>Controls are features, not obstacles.</strong> Matching, holds, approvals, funds checks and separation of duties saved Sunny from paying twice, overspending and fraud.</li>
<li><strong>Automation scales, people decide.</strong> FBDI, scheduled processes, integrations and AI agents took the boring work, while Ava, Priya, Omar and Mia kept the judgment.</li>
<li><strong>The system keeps changing.</strong> Four updates a year means learning never stops — and that is part of the fun.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Where to go next',
      html: `<p>Revisit any module whenever you need it, keep the Oracle Help Center and the Readiness What’s New pages for your release bookmarked, and look at the “Where to Keep Learning” lesson for free Oracle training, certifications and safe ways to practise.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Procure-to-pay', def: 'The journey from asking to buy something to paying the supplier: requisition, purchase order, receipt, invoice and payment.' },
        { term: 'Order-to-cash', def: 'The journey from selling to a customer to collecting their money: invoice, receipt and collections.' },
        { term: 'Record-to-report', def: 'The journey from recording accounting entries to closing the period and producing financial statements.' },
        { term: 'Year-end close', def: 'Finishing and checking all accounting for the last period of the year before closing it and opening the new year.' },
        { term: 'Control account', def: 'A General Ledger account, such as 2110 or 1210, whose balance must agree with the detailed subledger.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'In February, which three documents does a three-way match compare?',
          options: ['Purchase order, receipt and invoice', 'Invoice, check and bank statement', 'Budget, forecast and actual', 'Customer, supplier and bank'],
          answer: 0,
          explain: 'Three-way matching compares what was ordered (PO), what was received (receipt) and what was billed (invoice).',
        },
        {
          q: 'Sweet Sugar Co.’s $200 invoice has terms 2/10 Net 30 and Ava pays within 10 days. How much does Sunny pay?',
          options: ['$200', '$196', '$180', '$204'],
          answer: 1,
          explain: '2% of $200 is $4, so paying within the discount period costs $196.',
        },
        {
          q: 'The $6,000 stand has a 60-month life and no salvage value. What is the monthly straight-line depreciation, and which account is credited?',
          options: ['$100, credited to 1590 Accumulated Depreciation', '$600, credited to 1110 Cash', '$100, credited to 6140 Depreciation Expense', '$50, credited to 2110 Accounts Payable'],
          answer: 0,
          explain: '$6,000 ÷ 60 = $100 a month: debit 6140 Depreciation Expense, credit 1590 Accumulated Depreciation.',
        },
        {
          q: 'The £1,000 receivable was booked at 1.25 and revalued at 1.30. What is the result?',
          options: ['A $50 foreign exchange gain', 'A $50 foreign exchange loss', 'No change', 'A £50 gain in the UK ledger'],
          answer: 0,
          explain: 'The receivable rises from $1,250 to $1,300 — a $50 gain recorded in 7120 Foreign Exchange Gain/Loss.',
        },
        {
          q: 'Why did Sunny’s test environment get each quarterly update before production?',
          options: ['To save money', 'So the team could run regression tests in the two weeks before production was updated', 'Because production does not need updates', 'So suppliers could test it'],
          answer: 1,
          explain: 'Test is updated after the first Friday and production after the third Friday of the update month, giving about two weeks to test.',
        },
        {
          q: 'In November the Ledger Agent proposed a correcting journal. What was the right way to handle it?',
          options: ['Let the agent post it without review', 'Priya checked the evidence, reviewed the journal and sent it through normal approval', 'Ignore all AI suggestions forever', 'Ask Lemon Grove Farms to approve it'],
          answer: 1,
          explain: '“The helper prepares. A person decides.” AI suggestions still go through people and the normal controls.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Oracle Fusion Cloud Financials documentation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/index.html' },
    { title: 'Financials What’s New 26D', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/index.html' },
    { title: 'Planning an Environment Family (quarterly maintenance)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en-us/iaas/Content/fusion-applications/plan-environment-family.htm' },
    { title: 'Financial Reporting Solutions', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/ocuar/financial-reporting-solutions.html' },
    { title: 'Payables Standard Invoice Import', publisher: 'Oracle Help Center (FBDI for Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oefbf/payablesstandardinvoiceimport-3055.html' },
    { title: 'Where to Find Information About Financials Scheduled Processes', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fafcf/where-to-find-information-about-financials-scheduled-processes.html' },
    { title: 'Oracle AI for Fusion Applications', publisher: 'Oracle', url: 'https://www.oracle.com/applications/fusion-ai/' },
    { title: 'Financials What’s New 26D — IMPORTANT Actions and Considerations', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-t78536.htm' },
  ],
};
