export default {
  slug: 'reporting-landscape',
  title: 'The Reporting Toolbox',
  minutes: 14,
  summary:
    'Oracle Fusion has many ways to get numbers out: dashboards and infolets, OTBI analyses, Oracle Analytics Publisher documents, financial reports and Smart View, account monitoring, and Oracle Fusion Data Intelligence. Learn what each tool is for and how to pick the right one.',
  objectives: [
    'Name the main reporting tools in Oracle Fusion Cloud ERP and what each is best at',
    'Explain the difference between real-time transaction data and General Ledger balances data',
    'Choose the right tool for a business question using a “which tool when” table',
    'Find reports through the Financial Reporting Center, Reports and Analytics and Scheduled Processes',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'A toolbox, not one magic hammer',
      html: `<p>Imagine a toolbox at the lemonade stand. There is a <strong>thermometer</strong> that shows how hot it is right now. A <strong>magnifying glass</strong> for looking closely at one thing. A <strong>stamp</strong> that prints the same neat label on every bottle. And a <strong>report card</strong> that tells your parents how the whole summer went.</p>
<p>You would not use the stamp to check the temperature! Each tool answers a different kind of question.</p>
<p>Oracle Fusion is the same. It has <span class="hl">several reporting tools, and the skill is picking the right one for the question</span>.</p>`,
    },
    {
      type: 'text',
      heading: 'Why so many tools?',
      html: `<p>People ask very different questions of an ERP (Enterprise Resource Planning system):</p>
<ul>
<li>“What needs my attention <em>right now</em>?” — Ava wants to see invoices on hold today.</li>
<li>“Show me a list I can filter and slice.” — Leo wants all purchases from Cup &amp; Straw Supply this year.</li>
<li>“Print an exact document.” — Ava needs a check or a payment file in the bank’s exact format.</li>
<li>“How did the company do?” — Sam wants a balance sheet and an income statement.</li>
<li>“Let me play with the numbers in Excel.” — Priya wants to pivot expenses by cost center.</li>
<li>“What are the trends over several years, mixed with other data?” — Sam’s board wants long-term analytics.</li>
</ul>
<p>One tool cannot be great at all of these. So Oracle gives you a toolbox, and most of the tools share one library of reports called the <strong>BI catalog</strong> (BI means Business Intelligence).</p>`,
    },
    {
      type: 'slides',
      title: 'Meet the tools',
      slides: [
        { icon: '🌡️', title: 'Dashboards, infolets and infotiles', html: `<p>Small live boxes on home pages and work areas that show counts and totals and let you click through. Examples: the <strong>Invoices landing page</strong> infotiles in Payables (Scanned, Recent, Holds, Approvals, Prepayments, Payments), the <strong>General Accounting Dashboard</strong> in General Ledger, and the <strong>Cash Management Dashboard</strong>.</p>` },
        { icon: '🔎', title: 'OTBI analyses and dashboards', html: `<p><strong>Oracle Transactional Business Intelligence</strong> lets you build your own reports by picking columns from <strong>subject areas</strong>. It reads live transaction data, so answers are real time. Great for lists, filters, charts and drill-downs.</p>` },
        { icon: '🖨️', title: 'Oracle Analytics Publisher', html: `<p>Formerly called <strong>BI Publisher</strong>. Makes <strong>pixel-perfect</strong> documents with a fixed layout: checks, remittance advices, bank payment files, invoices, purchase orders and many predefined reports. Usually run as a scheduled process.</p>` },
        { icon: '📑', title: 'Financial reports', html: `<p>Balance sheets, income statements and other statements built in <strong>Financial Reporting Web Studio</strong> from General Ledger <strong>balances</strong>. Opened from the <strong>Financial Reporting Center</strong>, with drill-down to journals and source transactions.</p>` },
        { icon: '📗', title: 'Smart View', html: `<p>An add-in for Microsoft Excel (also Word and PowerPoint) that connects to General Ledger balances. Accountants do <strong>ad hoc analysis</strong>: pivot, zoom in and out, and drill to detail — with all of Excel’s power.</p>` },
        { icon: '🚨', title: 'Account Groups and Account Monitor', html: `<p>Save a set of key accounts with <strong>tolerance rules</strong> (for example “warn me if Electricity jumps more than 20%”). Results appear in the <strong>Account Monitor</strong> on the General Accounting Dashboard, and you can explore them with the <strong>Sunburst</strong> view and the <strong>Account Inspector</strong>.</p>` },
        { icon: '🔭', title: 'Oracle Fusion Data Intelligence', html: `<p>A separate Oracle analytics product (once known as Fusion Analytics). It copies Fusion data into a data warehouse with prebuilt KPIs (key performance indicators) such as DSO and DPO — ideal for trends and combining Fusion with other data.</p>` },
      ],
    },
    {
      type: 'flow',
      title: 'Where the numbers come from',
      steps: [
        { icon: '🧾', label: 'Transactions', detail: 'Invoices, payments, receipts, assets — stored in the subledger tables.' },
        { icon: '🔎', label: 'OTBI reads live', detail: 'OTBI subject areas read these transaction tables in real time.' },
        { icon: '📘', label: 'Accounting and posting', detail: 'Create Accounting and journal posting move the results into the General Ledger.' },
        { icon: '🧊', label: 'Balances cube', detail: 'Each post updates the General Ledger balances cubes (built on Oracle Essbase) at the same time.' },
        { icon: '📑', label: 'Financial reports and Smart View', detail: 'Statements, Smart View and Account Groups read the balances cube.' },
      ],
      note: `<p><strong>Key idea:</strong> OTBI is best for <em>transactions</em> (which invoices? which receipts?). Financial reports, Smart View and Account Groups are best for <em>balances</em> (how much is in each account?). Analytics Publisher can do either, as long as you need a fixed, printable format.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Transactions or balances?',
      instructions: `<p>Remember the key idea: some questions are about individual <strong>transactions</strong>, others about account <strong>balances</strong>. Sort each question.</p>`,
      categories: ['Transactions (think OTBI)', 'Balances (think financial reports / Smart View)'],
      items: [
        { text: 'Which Cup & Straw Supply invoices are still unpaid?', answer: 'Transactions (think OTBI)' },
        { text: 'What is the total in 1110 Cash – Big River Bank at the end of January?', answer: 'Balances (think financial reports / Smart View)' },
        { text: 'Which receipts did Omar apply yesterday?', answer: 'Transactions (think OTBI)' },
        { text: 'What was Sunny Lemonade US Inc.’s net income for the quarter?', answer: 'Balances (think financial reports / Smart View)' },
        { text: 'Which purchase orders did Leo create this week?', answer: 'Transactions (think OTBI)' },
        { text: 'How do expenses compare across cost centers 100, 200 and 300 this year?', answer: 'Balances (think financial reports / Smart View)' },
      ],
      explain: `<p>Lists of individual documents (invoices, receipts, orders) come from transaction data, which OTBI reads in real time. Totals per account, period or cost center come from General Ledger balances, which financial reports and Smart View read from the balances cube.</p>`,
    },
    {
      type: 'text',
      heading: 'Which tool when?',
      html: `<p>Here is the cheat sheet practitioners keep in their heads. Read it once, then test yourself in the next steps.</p>`,
    },
    {
      type: 'table',
      caption: 'Which tool when?',
      headers: ['If the question is…', 'Use…', 'Sunny example'],
      rows: [
        ['What needs attention today?', 'Work area infotiles, infolets and dashboards', 'Ava checks the Holds infotile every morning'],
        ['Give me a filtered list or chart of transactions, right now', '<strong>OTBI</strong> analysis or OTBI dashboard', 'Which suppliers have invoices on hold?'],
        ['Produce an exact document or file', '<strong>Oracle Analytics Publisher</strong> report', 'Print the check to Lemon Grove Farms; create a bank payment file'],
        ['Formal financial statements', '<strong>Financial reports</strong> (Financial Reporting Web Studio, opened from the Financial Reporting Center)', 'January income statement for Sunny Lemonade US Inc.'],
        ['Slice balances in a spreadsheet', '<strong>Smart View</strong> ad hoc analysis', 'Priya pivots expenses by cost center 100/200/300'],
        ['Warn me when a key account moves unusually', '<strong>Account Groups</strong> + Account Monitor', 'Alert if account 6120 Electricity rises more than 20%'],
        ['Long-term trends and KPIs across many sources', '<strong>Oracle Fusion Data Intelligence</strong> (separate product)', 'Three-year days payable outstanding trend'],
        ['Look at reports on a phone', 'Financial Reporting Center (tablet and smartphone friendly) or BI mobile apps', 'Sam checks cash on the train'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: three front doors',
      html: `<ul>
<li><strong>Financial Reporting Center</strong> — Oracle calls it the primary place for finance users to reach <em>seven</em> report types: Financial Reporting Web Studio reports, Account Groups and Sunburst, Smart View reports, OTBI analyses, OTBI dashboards, Oracle Analytics Publisher reports and BI mobile apps.</li>
<li><strong>Reports and Analytics</strong> work area — <kbd>Navigator</kbd> &gt; <kbd>Tools</kbd> &gt; <kbd>Reports and Analytics</kbd>. Search or browse the BI catalog, mark favorites, and create new analyses or reports. Many work areas also have a <strong>Reports and Analytics</strong> panel tab with the reports for that area.</li>
<li><strong>Scheduled Processes</strong> work area — <kbd>Navigator</kbd> &gt; <kbd>Tools</kbd> &gt; <kbd>Scheduled Processes</kbd>. Most predefined Analytics Publisher reports run here so you see the latest data.</li>
</ul>
<p>Labels and menus can look slightly different by release and in the newer Redwood pages.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Pick the right tool',
      instructions: `<p>Match each request from the Sunny team to the best reporting tool.</p>`,
      pairs: [
        { left: 'Print a check for Lemon Grove Farms in the bank’s exact layout', right: 'Oracle Analytics Publisher' },
        { left: 'A live, filterable list of invoices on hold by supplier', right: 'OTBI analysis' },
        { left: 'The formal January balance sheet for the board', right: 'Financial report (Financial Reporting Center)' },
        { left: 'Pivot expenses by cost center in Excel and drill to journals', right: 'Smart View' },
        { left: 'Warn Priya when 6120 Electricity jumps more than 20%', right: 'Account Groups and Account Monitor' },
        { left: 'A three-year KPI trend combining Fusion and other data', right: 'Oracle Fusion Data Intelligence' },
      ],
      explain: `<p>Fixed documents → Analytics Publisher. Real-time transaction lists → OTBI. Formal statements → financial reports. Spreadsheet slicing of balances → Smart View. Exception monitoring of key accounts → Account Groups. Long-term, cross-source analytics → Fusion Data Intelligence.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Find the front doors',
      instructions: `<p>Fill in the missing names of the places where reports live.</p>`,
      html: `<p>To browse the BI catalog, go to Navigator &gt; Tools &gt; {{}}. To run most predefined Analytics Publisher reports, use Navigator &gt; Tools &gt; {{}}. Oracle calls the {{}} the primary place for finance users to reach all seven report types.</p>`,
      blanks: [
        { answer: ['Reports and Analytics', 'Reports & Analytics'] },
        { answer: 'Scheduled Processes' },
        { answer: ['Financial Reporting Center', 'Financial Reporting Centre'] },
      ],
      explain: `<p>Reports and Analytics is the catalog browser; Scheduled Processes runs report jobs with the latest data; the Financial Reporting Center is the main finance reporting hub.</p>`,
    },
    {
      type: 'example',
      title: 'Monday morning at Sunny Lemonade',
      html: `<p>It is the first Monday of February. Everyone needs numbers — but different numbers.</p>`,
      steps: [
        '<strong>Ava</strong> opens the Invoices landing page. The <em>Holds</em> infotile shows 3 invoices on hold. Ava clicks through to fix them. (Dashboards and infotiles.)',
        '<strong>Leo</strong> runs a saved OTBI analysis: “Spend by supplier, this quarter”. Cup &amp; Straw Supply is creeping up. (OTBI.)',
        '<strong>Mia</strong> submits the payment run; Analytics Publisher formats the check for Lemon Grove Farms and the payment file for Big River Bank. (Analytics Publisher.)',
        '<strong>Priya</strong> runs the January income statement from the Financial Reporting Center, then opens Smart View to pivot expenses by cost center. (Financial reports and Smart View.)',
        'The <strong>Account Monitor</strong> flags account 6120 Electricity: January is 40% higher than December. Priya drills down and finds a $150 Bright Power Utility bill entered twice. (Account Groups.)',
        '<strong>Sam</strong> asks for a three-year chart of how fast Sunny pays its suppliers. Jordan explains that long-term analytics like this is what Fusion Data Intelligence is designed for.',
      ],
      result: `<p>Six people, six questions, five tools — all reading the same shared data.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Names you will hear (old and new)',
      html: `<ul>
<li><strong>BI Publisher</strong> = today’s <strong>Oracle Analytics Publisher</strong>. Many people still say “BIP”.</li>
<li><strong>Financial Reporting Studio</strong> — current Fusion documentation calls the report designer <strong>Financial Reporting Web Studio</strong>, opened in the browser from the Financial Reporting Center.</li>
<li><strong>Fusion Analytics</strong> = today’s <strong>Oracle Fusion Data Intelligence</strong> (FDI).</li>
<li><strong>Account Monitor</strong> is the place where <strong>Account Groups</strong> show their results.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li><strong>Look for a predefined report first.</strong> Oracle delivers hundreds. Building your own is the last step, not the first.</li>
<li><strong>Save custom work in the right folder.</strong> Shared, custom content belongs under <strong>Shared Folders &gt; Custom</strong>; your private work goes in <strong>My Folders</strong>. Never edit Oracle’s delivered reports directly.</li>
<li><strong>Same data, same security.</strong> Reports follow your roles and data access, so two people can run the same report and see different rows.</li>
<li><strong>Monitor, don’t print.</strong> A dashboard that flags problems beats a 40-page report nobody reads.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'BI catalog', def: 'The shared library where analyses, dashboards and Analytics Publisher reports are stored in folders.' },
        { term: 'Infolet', def: 'A small interactive box on a home page or work area that shows key information and lets you click for detail.' },
        { term: 'OTBI', def: 'Oracle Transactional Business Intelligence: the tool for building real-time analyses and dashboards from subject areas.' },
        { term: 'Oracle Analytics Publisher', def: 'The tool (formerly BI Publisher) that produces fixed-layout documents and files such as checks and bank payment files.' },
        { term: 'Financial Reporting Center', def: 'The main work area where finance users find financial reports and the other report types.' },
        { term: 'Balances cube', def: 'A multidimensional store of General Ledger balances, updated whenever journals post, used by financial reports and Smart View.' },
        { term: 'Oracle Fusion Data Intelligence', def: 'A separate Oracle analytics product with a data warehouse and prebuilt KPIs for long-term and cross-system analysis.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Ava needs to print a check for Lemon Grove Farms in an exact layout. Which tool produces it?',
          options: ['OTBI', 'Oracle Analytics Publisher', 'Smart View', 'Account Groups'],
          answer: 1,
          explain: 'Analytics Publisher (formerly BI Publisher) makes pixel-perfect documents like checks, remittance advices and bank files.',
        },
        {
          q: 'Which tool is best for a real-time, filterable list of invoices on hold by supplier?',
          options: ['An OTBI analysis', 'A balance sheet', 'The balances cube in Smart View', 'A printed check'],
          answer: 0,
          explain: 'OTBI reads live transaction data through subject areas, so it is ideal for filtered lists of transactions.',
        },
        {
          q: 'Financial reports and Smart View read mainly from…',
          options: ['Supplier emails', 'The General Ledger balances cube', 'The bank’s website', 'The purchase order printer'],
          answer: 1,
          explain: 'They use General Ledger balances, which are kept in balances cubes updated every time a journal posts.',
        },
        {
          q: 'Priya wants to be warned automatically when an expense account jumps unusually. What should Priya set up?',
          options: ['An Account Group with tolerance rules', 'A new supplier', 'A bank statement', 'A recurring journal'],
          answer: 0,
          explain: 'Account Groups save key accounts with tolerance rules; exceptions show in the Account Monitor.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Financial Reporting Solutions', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/ocuar/financial-reporting-solutions.html' },
    { title: 'Overview of Financial Reporting Center', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/ocuar/overview-of-financial-reporting-center.html' },
    { title: 'View Analytics, Reports, and Dashboards', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/view-analytics-reports-and-dashboards.html' },
    { title: 'Overview of Infolets', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/overview-of-infolets.html' },
    { title: 'General Accounting Dashboard', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/general-accounting-dashboard.html' },
    { title: 'Introducing the Invoices Landing Page', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/introducing-the-invoices-landing-page.html' },
    { title: 'Account Groups', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/account-groups.html' },
    { title: 'Overview of Oracle Essbase Balances Cubes', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-oracle-essbase-balances-cubes.html' },
    { title: 'Oracle Fusion Data Intelligence', publisher: 'Oracle', url: 'https://www.oracle.com/fusion-data-intelligence/' },
  ],
};
