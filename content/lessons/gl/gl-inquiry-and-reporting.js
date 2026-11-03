export default {
  slug: 'gl-inquiry-and-reporting',
  title: 'Looking at Balances and Financial Statements',
  minutes: 18,
  summary:
    'Once the books are posted, people want answers: What is the balance? Why did it change? What do our statements look like? Learn the General Ledger inquiry tools in Oracle Fusion and how Sunny’s January trial balance becomes a balance sheet and an income statement.',
  objectives: [
    'Choose the right Oracle tool to look at a balance, drill into it, or produce a statement',
    'Use Inquire on Detail Balances to drill from a balance to journals and subledger transactions',
    'Explain what account groups, the Account Monitor and the Account Inspector are for',
    'Build a simple income statement and balance sheet from a trial balance',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'A map you can zoom into',
      html: `<p>Think of a map app. Zoomed out, you see the whole country. Pinch in and you see a city, then a street, then one house. You can always ask, “What’s here?” and get the answer straight away.</p>
<p>A good ledger works the same way. Zoomed out: “Sunny made $1,705 profit in January.” Zoom in: “Rent for the Kitchen was $700.” Zoom in again: “That $700 came from the rent allocation journal, which came from the $1,000 rent.” <span class="hl">Looking at balances and drilling down is called inquiry. Printing the zoomed-out view in a standard format gives you the financial statements.</span></p>`,
    },
    {
      type: 'text',
      heading: 'Three kinds of questions',
      html: `<p>Once Priya has posted January’s journals, people come to Priya with three kinds of questions:</p>
<ol>
<li><strong>“What is the balance?”</strong> For example: how much cash do we have, and what are the Kitchen’s expenses this month? → <em>balance inquiry</em>.</li>
<li><strong>“Why is it that number?”</strong> Which journals, invoices or receipts make up the balance? → <em>drill-down</em>.</li>
<li><strong>“Show me the big picture.”</strong> The balance sheet and income statement for Sam and the bank. → <em>financial reports</em>.</li>
</ol>
<p>Oracle answers all three from the same data. Balances are updated in the <strong>GL balances cube</strong> the moment a journal posts, already added up at every level of your account hierarchies. So inquiries and reports show real-time numbers, with no overnight data warehouse load.</p>`,
    },
    {
      type: 'slides',
      title: 'The GL inquiry toolbox in Oracle Fusion',
      slides: [
        {
          icon: '🔎',
          title: 'Inquire on Detail Balances',
          html: `<p>A task in the <kbd>Period Close</kbd> work area. Search balances by ledger, period and any chart of accounts value, including parent values from published hierarchies. Then <strong>drill to journal lines</strong>, and from there to the journal or the <strong>subledger transaction</strong>. You can save searches and export to Excel.</p>`,
        },
        {
          icon: '👀',
          title: 'Account groups and the Account Monitor',
          html: `<p>An <strong>account group</strong> is a list of key accounts you want to watch, such as Cash, Revenue and Rent, with optional comparisons. The <strong>Account Monitor</strong> shows these balances in real time, on the General Accounting Dashboard and in the Financial Reporting Center. A <strong>Sunburst</strong> chart lets you explore a balance across dimensions.</p>`,
        },
        {
          icon: '🧭',
          title: 'Account Inspector',
          html: `<p>For ad hoc questions. From an account group or a financial report, open the <strong>Account Inspector</strong> (the <kbd>Inquire and Analyze Balances</kbd> link). Then expand any segment, such as all cost centers, change the period and drill down to journals and subledger transactions.</p>`,
        },
        {
          icon: '📗',
          title: 'Smart View',
          html: `<p><strong>Oracle Smart View</strong> is an Excel (and Word and PowerPoint) add-in connected to the GL balances cube. You can pivot and drill into balances (ad hoc analysis), design reports in Excel, and drill from a number to detail balances, journal lines and subledger transactions. Tip: turn on row suppression so empty rows disappear.</p>`,
        },
        {
          icon: '📑',
          title: 'Financial Reporting Center',
          html: `<p>The main place for finance users to run reports. It gives access to seven report types: financial reports (built in <strong>Financial Reporting Web Studio</strong> on the balances cube), account groups and Sunburst, Smart View reports, OTBI analyses and dashboards, Oracle Analytics Publisher reports, and BI mobile apps.</p>`,
        },
        {
          icon: '🤖',
          title: 'New: ask in plain words',
          html: `<p>If your company has switched on the <strong>Ledger Agent</strong> (26B) or the <strong>Ledger Agentic Application</strong> (26C and 26D), accountants can ask questions such as “Why did Kitchen expenses rise this month?” in natural language and get answers based on balances and journals.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Pick the right tool',
      instructions: `<p>Match each question to the Oracle tool that answers it best.</p>`,
      pairs: [
        { left: 'Priya wants to drill from the Rent balance to the exact journal lines', right: 'Inquire on Detail Balances' },
        { left: 'Sam wants to see a few key accounts in real time, every morning', right: 'Account groups in the Account Monitor' },
        { left: 'Mia wants to pivot cash balances by month in Excel', right: 'Smart View' },
        { left: 'The bank wants a formatted balance sheet', right: 'A financial report from the Financial Reporting Center' },
      ],
      explain: `<p>Each tool reads the same balances, but they are built for different jobs. Inquiry pages are for investigating, account groups for watching, Smart View for flexible spreadsheet analysis, and financial reports for formal, repeatable statements.</p>`,
    },
    {
      type: 'example',
      title: 'Sam asks: “Why is Kitchen rent $700?”',
      html: `<p>Sam notices that the Kitchen cost center shows $700 of rent in January, but Sunny pays $1,000 a month. Priya investigates:</p>`,
      steps: [
        'Priya opens <kbd>Inquire on Detail Balances</kbd> for the Sunny US Ledger, period <code>Jan-26</code>, account 6110, all cost centers.',
        'The results show cost center 100: $0, 200: $700, 300: $300. The total is $1,000.',
        'Priya drills into the $700 and sees one journal line created by the <strong>rent-by-floor-space allocation rule</strong>.',
        'Priya drills into cost center 100 and sees the $1,000 monthly rent journal and the −$1,000 allocation offset.',
      ],
      result: `<p>Answer for Sam: “All $1,000 of rent is there. We share it out: the Kitchen uses 70% of the floor space, so it carries $700.” Drill-down turns a worried question into a one-minute answer.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: drill from a balance to the journals',
      items: [
        'From the <kbd>Navigator</kbd>, open the <kbd>Period Close</kbd> work area.',
        'Click the task <kbd>Inquire on Detail Balances</kbd>.',
        'Choose the data access set or ledger, an accounting period (you can search only on periods, not quarters or years), and the account values. You can use parent values from published hierarchies.',
        'Click <kbd>Search</kbd>. Use <kbd>View</kbd> &gt; <kbd>Columns</kbd> to show descriptions for the segments you care about.',
        'Click a balance to drill to its journal lines, then to the journal or the subledger transaction.',
        'Click <kbd>Save</kbd> to keep your search criteria for next month, or export the results to Excel.',
      ],
      note: `<p>Your data access set decides which ledgers and companies you can see. If a search times out, use lower-level parent values. Labels can differ slightly by release and Redwood pages.</p>`,
    },
    {
      type: 'text',
      heading: 'From trial balance to financial statements',
      html: `<p>The two main financial statements are built straight from the trial balance:</p>
<ul>
<li>The <strong>income statement</strong> (also called profit and loss, or P&amp;L) uses the <strong>revenue and expense</strong> accounts. It shows performance <em>over a period</em>: what we earned minus what it cost.</li>
<li>The <strong>balance sheet</strong> uses the <strong>asset, liability and equity</strong> accounts. It is a snapshot <em>at one moment</em>: what we own, what we owe, and what belongs to the owners.</li>
</ul>
<p>The link between them is profit. During the year, the income statement’s net income is shown in equity as <strong>current-year earnings</strong>. When the new fiscal year opens, Oracle moves it into retained earnings. That is why <em>Assets = Liabilities + Equity</em> always holds.</p>
<p>In Oracle, financial statements are usually <strong>financial reports</strong> built once in Financial Reporting Web Studio (or as Smart View reports), using account hierarchies. Rows such as “Cost of Lemonade” point at parent values like 5000, not at long lists of accounts, so new accounts appear automatically. The <em>Reports and Analytics</em> module covers building them in depth, in the lesson <em>Financial Reports and Smart View</em>.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny US Ledger, trial balance at 31 January 2026 after the close (USD)',
      headers: ['Account', 'Name', 'Debit', 'Credit'],
      rows: [
        ['1110', 'Cash – Big River Bank', '20,895', ''],
        ['1210', 'Accounts Receivable', '1,600', ''],
        ['1510', 'Equipment (Fixed Assets)', '6,000', ''],
        ['1590', 'Accumulated Depreciation', '', '100'],
        ['2110', 'Accounts Payable – Trade', '', '500'],
        ['2120', 'Received Not Invoiced Accrual', '', '190'],
        ['3100', 'Owner’s Equity', '', '26,000'],
        ['4110', 'Lemonade Sales Revenue', '', '4,000'],
        ['5110 / 5120 / 5130', 'Lemons / Sugar / Cups and Straws', '1,000', ''],
        ['6110', 'Rent', '1,000', ''],
        ['6120', 'Electricity', '150', ''],
        ['6130', 'Travel and Meals', '40', ''],
        ['6140', 'Depreciation Expense', '100', ''],
        ['7110', 'Bank Charges', '25', ''],
        ['7120', 'Foreign Exchange Gain/Loss', '', '20'],
        ['<strong>Total</strong>', '', '<strong>30,810</strong>', '<strong>30,810</strong>'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Which statement does each account go on?',
      instructions: `<p>Sort these accounts from Sunny’s trial balance into the statement where they belong.</p>`,
      categories: ['Balance sheet', 'Income statement'],
      items: [
        { text: '1210 Accounts Receivable', answer: 'Balance sheet' },
        { text: '1590 Accumulated Depreciation', answer: 'Balance sheet' },
        { text: '2120 Received Not Invoiced Accrual', answer: 'Balance sheet' },
        { text: '4110 Lemonade Sales Revenue', answer: 'Income statement' },
        { text: '6140 Depreciation Expense', answer: 'Income statement' },
        { text: '7120 Foreign Exchange Gain/Loss', answer: 'Income statement' },
      ],
      explain: `<p>Assets, contra assets, liabilities and equity go on the balance sheet. Revenue, expenses and gains or losses go on the income statement. Notice the pair: depreciation <em>expense</em> is on the income statement, while <em>accumulated</em> depreciation reduces equipment on the balance sheet.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny Lemonade US Inc. – Income statement for January 2026 (USD)',
      headers: ['Line', 'Accounts', 'Amount'],
      rows: [
        ['Lemonade sales revenue', '4110', '4,000'],
        ['Cost of lemonade (lemons 500, sugar 200, cups and straws 300)', '5000 (parent)', '(1,000)'],
        ['<strong>Gross profit</strong>', '', '<strong>3,000</strong>'],
        ['Rent', '6110', '(1,000)'],
        ['Electricity', '6120', '(150)'],
        ['Travel and meals', '6130', '(40)'],
        ['Depreciation', '6140', '(100)'],
        ['<strong>Operating profit</strong>', '', '<strong>1,710</strong>'],
        ['Bank charges', '7110', '(25)'],
        ['Foreign exchange gain', '7120', '20'],
        ['<strong>Net income</strong>', '', '<strong>1,705</strong>'],
      ],
    },
    {
      type: 'table',
      caption: 'Sunny Lemonade US Inc. – Balance sheet at 31 January 2026 (USD)',
      headers: ['Line', 'Accounts', 'Amount'],
      rows: [
        ['Cash', '1110', '20,895'],
        ['Accounts receivable', '1210', '1,600'],
        ['Equipment, net (6,000 − 100 accumulated depreciation)', '1510, 1590', '5,900'],
        ['<strong>Total assets</strong>', '', '<strong>28,395</strong>'],
        ['Accounts payable', '2110', '500'],
        ['Accrued liabilities (received not invoiced)', '2120', '190'],
        ['<strong>Total liabilities</strong>', '', '<strong>690</strong>'],
        ['Owner’s equity', '3100', '26,000'],
        ['Current-year earnings (net income so far)', 'from the income statement', '1,705'],
        ['<strong>Total equity</strong>', '', '<strong>27,705</strong>'],
        ['<strong>Total liabilities and equity</strong>', '', '<strong>28,395</strong>'],
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Check the statements add up',
      instructions: `<p>Use the trial balance to check Priya’s statements.</p>`,
      html: `<p>Total expenses and losses (5110 to 7110): $ {{}}</p>
<p>Net income = revenue 4,000 + FX gain 20 − expenses: $ {{}}</p>
<p>Total liabilities + total equity: $ {{}}</p>`,
      blanks: [
        { answer: 2315, hint: '1,000 + 1,000 + 150 + 40 + 100 + 25' },
        { answer: 1705 },
        { answer: 28395, hint: '690 + 27,705' },
      ],
      explain: `<p>Expenses total $2,315, so net income is 4,020 − 2,315 = <strong>$1,705</strong>. Adding that profit to equity makes liabilities plus equity equal <strong>$28,395</strong>, the same as total assets. If it didn’t match, Priya would look for an account with the wrong type or a report row pointing at the wrong accounts.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Standard GL reports worth knowing',
      html: `<p>Besides financial reports, Oracle General Ledger delivers many standard reports, submitted from <kbd>Scheduled Processes</kbd> as Oracle Analytics Publisher reports. For example: the <strong>Trial Balance Report</strong> and <strong>General Ledger Trial Balance Report</strong>, journal reports, account analysis reports, and reconciliation reports for the period close. For anything your company asks again and again, a saved Smart View query or a financial report is usually faster than re-running ad hoc inquiries.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li><strong>Tie out before you send.</strong> Check that total assets equal liabilities plus equity, and that the income statement’s net income matches the change in current-year earnings.</li>
<li><strong>Compare to last month and to budget.</strong> Big swings are where mistakes hide, such as a missing accrual or a wrong account type.</li>
<li><strong>Drill, don’t guess.</strong> Every number in Oracle can be traced to journals and transactions. Use that before you answer “I think…”.</li>
<li><strong>Mind security.</strong> Data access sets and segment value security also apply to inquiries and Smart View, so two people may legitimately see different totals.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Balance inquiry', def: 'Looking up the balance of accounts for a ledger and period, usually with the option to drill down.' },
        { term: 'Drill-down', def: 'Clicking from a summary number to the details behind it: journal lines, then journals and subledger transactions.' },
        { term: 'Account group', def: 'A saved list of key accounts that the Account Monitor tracks in real time.' },
        { term: 'Account Inspector', def: 'An Oracle tool for ad hoc analysis of balances, expanding segments and drilling down from account groups or reports.' },
        { term: 'Smart View', def: 'An Office add-in, mainly for Excel, that connects to GL balances for pivoting, reporting and drill-down.' },
        { term: 'Income statement', def: 'A report of revenue minus expenses over a period, giving net income (profit or loss).' },
        { term: 'Balance sheet', def: 'A snapshot at one date of what the company owns (assets), owes (liabilities) and the owners’ share (equity).' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Where does Priya find the Inquire on Detail Balances task?',
          options: ['The Period Close work area', 'The Payables work area', 'Setup and Maintenance only', 'The supplier portal'],
          answer: 0,
          explain: 'Inquire on Detail Balances is a task in the Period Close work area. You can also drill through to it from financial reports and Smart View.',
        },
        {
          q: 'Which statement shows performance over a period, such as January?',
          options: ['The balance sheet', 'The income statement', 'The chart of accounts', 'The data access set'],
          answer: 1,
          explain: 'The income statement (P&L) shows revenue and expenses over a period. The balance sheet is a snapshot at a date.',
        },
        {
          q: 'Sunny’s total assets are $28,395 and liabilities are $690. What must total equity be?',
          options: ['$26,000', '$27,705', '$28,395', '$1,705'],
          answer: 1,
          explain: 'Assets = Liabilities + Equity, so equity = 28,395 − 690 = 27,705. That is the owner’s $26,000 plus $1,705 of current-year earnings.',
        },
        {
          q: 'Why do Oracle GL inquiries and reports show up-to-the-minute numbers?',
          options: [
            'Because the data warehouse loads every night',
            'Because posting updates the GL balances cube immediately, with totals already added up',
            'Because reports read the subledgers directly',
            'Because Priya types the numbers into the report',
          ],
          answer: 1,
          explain: 'Balances are updated in the balances cube at posting, already added up at every level of the published hierarchies, so reports and inquiries are real-time.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using General Ledger: Inquire on GL Balances', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/inquire-on-gl-balances.html' },
    { title: 'Using General Ledger: How You Inquire on Detail Balances', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/how-you-inquire-on-detail-balances.html' },
    { title: 'Using General Ledger: Financial Reporting Solutions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/financial-reporting-solutions.html' },
    { title: 'Using General Ledger: Overview of Financial Reporting Center', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-financial-reporting-center.html' },
    { title: 'Using General Ledger: Overview of Smart View', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-smart-view.html' },
    { title: 'Using General Ledger: Account Groups', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/account-groups.html' },
    { title: 'Using General Ledger: Overview of Reporting Web Studio', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-reporting-web-studio.html' },
    { title: 'Using General Ledger: General Ledger Trial Balance Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/general-ledger-trial-balance-reports.html' },
    { title: 'Using General Ledger: Overview of Oracle Essbase Balances Cubes', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-oracle-essbase-balances-cubes.html' },
    { title: 'Financials 26D What’s New: Ledger Agentic Application', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51915.htm' },
  ],
};
