export default {
  slug: 'financial-reporting-smart-view',
  title: 'Financial Reports and Smart View',
  minutes: 17,
  summary:
    'Financial statements in Oracle Fusion come from General Ledger balances stored in balances cubes. Learn the Financial Reporting Center, Financial Reporting Web Studio, Smart View for Excel (ad hoc analysis and drill-down), and Account Groups with the Account Monitor and Account Inspector.',
  objectives: [
    'Explain how General Ledger balances cubes feed financial reports and Smart View',
    'Describe the main dimensions of a balances cube using the Sunny chart of accounts',
    'Use the Financial Reporting Center and explain what Financial Reporting Web Studio is for',
    'Describe how Smart View ad hoc analysis works, including point of view, zoom and drill-down',
    'Set up the idea of an Account Group with a tolerance rule and read the Account Monitor',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The company’s report card',
      html: `<p>At the end of a school term you get a <strong>report card</strong>. It does not list every single homework sheet — it shows totals: Math B+, Reading A. If a grade looks strange, your parents can ask the teacher to <em>show the homework behind it</em>.</p>
<p>A company has report cards too: the <strong>balance sheet</strong> (what we own and owe on one day — like a photo) and the <strong>income statement</strong> (how much we earned and spent over a period — like a movie). They show <strong>totals per account</strong>, not every invoice.</p>
<p>In Oracle Fusion, these report cards are built from the General Ledger’s totals, and <span class="hl">you can drill from any total down to the journals and invoices behind it</span> — just like asking to see the homework.</p>`,
    },
    {
      type: 'text',
      heading: 'Balances, not transactions',
      html: `<p>In the last lessons, OTBI and Analytics Publisher worked mostly with <strong>transactions</strong>. Financial statements work with <strong>balances</strong>: the total of each account combination for each period.</p>
<p>Oracle General Ledger has <strong>Oracle Essbase</strong> built in. Essbase stores balances in <strong>balances cubes</strong> — think of a giant Rubik’s cube where every little square is one number, such as “Electricity, Kitchen, January, Actual, USD”. Every time a journal is <strong>posted</strong>, the cube is updated at the same moment. That is why financial reports in Fusion are up to date as soon as Priya posts.</p>
<p>Balances are also pre-added at every level of your account hierarchies, so totals like “All Expenses” or “All Cost Centers” come back instantly.</p>`,
    },
    {
      type: 'table',
      caption: 'Balances cube dimensions, with Sunny examples',
      headers: ['Dimension', 'What it means', 'Sunny example'],
      rows: [
        ['Accounting Period', 'Years, quarters and periods from the ledger’s calendar', '2026, a quarter, <code>Jan-26</code>'],
        ['Ledger or Ledger Set', 'Which ledger the balances belong to', 'Sunny US Ledger'],
        ['Chart of accounts segments', 'One dimension per segment, with hierarchies', 'Company 101, Cost Center 200, Account 6120, Product 010, Intercompany 000'],
        ['Scenario', 'Actual, budget or forecast amounts', 'Actual; a 2026 budget'],
        ['Balance Amount', 'Beginning balance, period activity or ending balance (debit, credit or net)', 'January period activity'],
        ['Amount Type', 'Period, quarter or year to date', 'PTD, QTD, YTD'],
        ['Currency and Currency Type', 'Which currency, and whether total, entered or converted', 'USD for the US ledger; GBP for the UK ledger'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Why one cube per chart of accounts?',
      html: `<p>Oracle creates a balances cube for each combination of chart of accounts and accounting calendar. Ledgers that share both can live in the same cube, which makes it easy to report across them. That is one more reason the Basics lessons recommend one shared chart of accounts.</p>`,
    },
    {
      type: 'slides',
      title: 'The Financial Reporting Center',
      slides: [
        { icon: '🏛️', title: 'The finance reporting hub', html: `<p>The <strong>Financial Reporting Center</strong> is the work area Oracle intends as the main place for finance users to find reports. It is tablet and smartphone friendly, and you can add favorites and tags.</p>` },
        { icon: '7️⃣', title: 'Seven report types', html: `<p>Financial Reporting Web Studio reports, Account Groups and Sunburst, Smart View reports, OTBI analyses, OTBI dashboards, Oracle Analytics Publisher reports, and BI mobile apps.</p>` },
        { icon: '🎨', title: 'Financial Reporting Web Studio', html: `<p>The browser-based designer for financial reports. You place <strong>grids</strong> (rows of accounts, columns of periods), text, images and charts on a design canvas. Open it from the Financial Reporting Center with the <kbd>Open Workspace for Financial Reports</kbd> task, then <kbd>Tools</kbd> &gt; <kbd>Launch Financial Reporting Web Studio</kbd>.</p>` },
        { icon: '📸', title: 'Live reports and snapshots', html: `<p>Run a report <strong>live</strong> (current balances) or view a <strong>snapshot</strong> saved at a point in time — handy for “what did we show the board on February 5?”.</p>` },
        { icon: '🧑‍💻', title: 'Workspace for power users', html: `<p>The <strong>Workspace</strong> (opened from the Financial Reporting Center) is for power users: define <strong>books</strong> (several reports together) and <strong>batches</strong>, schedule them, import and export reports, and manage cube connections. Both share the same report repository.</p>` },
      ],
    },
    {
      type: 'example',
      title: 'Priya builds Sunny’s January income statement',
      html: `<p>Priya designs a simple income statement in Financial Reporting Web Studio for <strong>Sunny Lemonade US Inc.</strong> (company 101).</p>`,
      steps: [
        '<strong>Rows:</strong> account 4110 Lemonade Sales Revenue, then the cost and expense accounts 5110, 5120, 5130, 6110, 6120 and 6140, with formula rows for totals.',
        '<strong>Columns:</strong> January actual, January budget, and the difference.',
        '<strong>Point of view:</strong> Sunny US Ledger, Scenario Actual, Currency USD, Company 101, all cost centers.',
        'Priya saves the report under <em>Shared &gt; Custom &gt; Financials</em> so it appears in the Financial Reporting Center for Sam.',
        'Sam runs it live on February 3, after Priya posts the last January journals. Electricity is higher than budget, so Sam clicks the amount and drills down to the journal lines and the Bright Power Utility invoice behind it.',
      ],
      result: `<p>One reusable report, always current, with the evidence one click away. Next month, Priya changes only the period.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Read the income statement',
      instructions: `<p>Here are Sunny Lemonade US Inc.’s January balances from the report. Work out the totals.</p>`,
      html: `<p>Revenue: 4110 Lemonade Sales Revenue <strong>$12,000</strong>.<br>Costs and expenses: 5110 Lemons $3,000; 5120 Sugar $1,200; 5130 Cups and Straws $800; 6110 Rent $1,500; 6120 Electricity $450; 6140 Depreciation $100.</p>
<p>Total costs and expenses = $ {{}}<br>Net income for January = $ {{}}<br>If the 6120 Electricity budget was $300, Electricity is over budget by $ {{}}</p>`,
      blanks: [
        { answer: 7050, hint: 'Add the six cost and expense lines.' },
        { answer: 4950, hint: 'Revenue minus total costs and expenses.' },
        { answer: 150 },
      ],
      explain: `<p>3,000 + 1,200 + 800 + 1,500 + 450 + 100 = <strong>7,050</strong>. Net income = 12,000 − 7,050 = <strong>4,950</strong>. Electricity of 450 versus a 300 budget is 150 over — exactly the kind of variance Sam would drill into. (The $100 depreciation is the monthly charge on the $6,000 lemonade stand.)</p>`,
    },
    {
      type: 'text',
      heading: 'Smart View: the General Ledger inside Excel',
      html: `<p><strong>Oracle Smart View for Office</strong> is an add-in for Microsoft Excel (it also works with Word and PowerPoint). For General Ledger it connects Excel directly to the balances cube, so you can build and refresh spreadsheets with real-time balances. Oracle describes three main uses: <strong>analysis</strong>, <strong>report design</strong> and interacting with predefined forms (mostly for planning products).</p>
<p>The favorite of accountants is <strong>ad hoc analysis</strong>: start with a blank sheet, connect to the cube and shape the grid as you go.</p>
<ul>
<li><strong>Point of View (POV)</strong> — the fixed choices for the whole sheet, such as ledger, scenario, currency and period.</li>
<li><strong>Zoom In / Zoom Out</strong> — double-click “All Cost Center Values” to see 100, 200 and 300; zoom out to go back up the hierarchy.</li>
<li><strong>Keep Only</strong> — keep just the members you selected.</li>
<li><strong>Member Selection</strong> — pick exact values for a dimension.</li>
<li><strong>Cascade</strong> — create a separate copy of the report for each member, for example one sheet per company.</li>
<li><strong>Drill-down</strong> — from a detail value to detail balances, journal lines and even the subledger transactions.</li>
</ul>
<p>Because it is still Excel, Priya can add formulas, charts and formatting around the live numbers. Smart View files can be shared by email or uploaded to the Financial Reporting Center for others to download.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Smart View moves',
      instructions: `<p>Priya is analyzing expenses in Smart View. Match what Priya wants to do with the Smart View action.</p>`,
      pairs: [
        { left: 'See cost centers 100, 200 and 300 under “All Cost Center Values”', right: 'Zoom In' },
        { left: 'Fix the whole sheet to Sunny US Ledger, Actual, USD', right: 'Point of View (POV)' },
        { left: 'Remove every ledger except the one selected', right: 'Keep Only' },
        { left: 'Make one copy of the report for each company, 101 and 201', right: 'Cascade' },
        { left: 'Go from the Electricity balance to the journal lines behind it', right: 'Drill-down' },
      ],
      explain: `<p>Zoom moves up and down hierarchies; the POV fixes the background dimensions; Keep Only trims members; Cascade creates a report per member; drill-down opens the detail behind a number.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: connect Smart View to the balances cube',
      items: [
        'Install Smart View (Windows; your IT team may do this). In Fusion, open the <strong>Financial Reporting Center</strong>.',
        'In the Tasks panel, click <kbd>Open Workspace for Financial Reports</kbd>. Copy the workspace web address without the ending <code>/index.jsp</code>.',
        'In Excel, on the <kbd>Smart View</kbd> ribbon, click <kbd>Options</kbd>. On the <kbd>Advanced</kbd> tab, set the <strong>Shared Connections URL</strong> to that address ending in <code>/workspace/SmartViewProviders</code>.',
        'Click <kbd>Panel</kbd>, then <kbd>Shared Connections</kbd>, and sign in.',
        'Choose the Essbase connection from the server list, expand the cubes, find your chart of accounts cube, select <code>db</code>, then click <kbd>Connect</kbd> and <kbd>Ad Hoc Analysis</kbd>.',
        'Use <kbd>POV</kbd> on the Essbase ribbon to set ledger, scenario, currency and period, then zoom and drill.',
      ],
      note: `<p>Based on Oracle’s documented example; cube and connection names depend on your company’s setup, and labels can differ by release. Oracle’s best-practice tip: turn on <strong>row suppression</strong> in Smart View options to hide empty rows.</p>`,
    },
    {
      type: 'text',
      heading: 'Account Groups: accounts that watch themselves',
      html: `<p>An <strong>account group</strong> saves a set of account balances that you want to keep an eye on. You add <strong>tolerance rules</strong> that compare two balances — for example this month versus last month, or actual versus budget — and look for a change above or below a percentage or an amount.</p>
<p>When a rule is triggered, the account shows up in the <strong>Account Monitor</strong> on the <strong>General Accounting Dashboard</strong>, in the General Accounting infolets, and in the Financial Reporting Center (with the colorful <strong>Sunburst</strong> view for exploring balances across dimensions). Oracle’s goal: no surprises during the close.</p>
<p>From the Account Monitor, the <kbd>Inquire and Analyze Balances</kbd> link opens the <strong>Account Inspector</strong>, where you expand a balance by cost center, change the period and drill down to journals and transactions. Oracle also has a process called <strong>Generate Financial Reports and Account Groups</strong> that can create starter account groups for the Revenues and Expenses infolets.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: set up an electricity watch',
      instructions: `<p>This is a <strong>practice screen</strong> (a simplified simulation, not Oracle’s real page). Priya wants a warning whenever Kitchen electricity for Classic Lemonade rises more than 20% compared with the previous month. Last month was <strong>$150</strong>; this month is <strong>$210</strong>.</p>`,
      formTitle: 'Account group row (practice)',
      fields: [
        { label: 'Account group name', given: 'Sunny Key Expenses' },
        { label: 'Ledger', given: 'Sunny US Ledger' },
        { label: 'Account combination', type: 'select', options: ['101-200-6120-010-000', '101-200-6110-010-000', '101-300-4110-010-000', '201-200-6120-010-000'], answer: '101-200-6120-010-000', hint: 'Company 101, Kitchen 200, Electricity 6120, Classic 010.' },
        { label: 'Compare with', type: 'select', options: ['Previous period', 'Same period last year', 'Budget'], answer: 'Previous period' },
        { label: 'Tolerance (%)', type: 'number', answer: 20 },
        { label: 'Change this month (%)', type: 'number', answer: 40, hint: '(210 − 150) ÷ 150 × 100' },
        { label: 'Will the Account Monitor flag it?', type: 'select', options: ['Yes', 'No'], answer: 'Yes' },
      ],
      explain: `<p>The combination is Company 101, Cost Center 200 (Kitchen), Account 6120 (Electricity), Product 010, Intercompany 000. The change is (210 − 150) ÷ 150 = 40%, which is above the 20% tolerance, so it appears in the Account Monitor for Priya to investigate.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: where these live (26D)',
      html: `<ul>
<li><strong>Financial Reporting Center</strong> — open from the Navigator; tasks include <kbd>Open Workspace for Financial Reports</kbd>.</li>
<li><strong>Financial Reporting Web Studio</strong> — the current name in the Fusion documentation for the financial report designer (older material says “Financial Reporting Studio”, a desktop tool).</li>
<li><strong>General Accounting Dashboard</strong> — Account Monitor plus infolets such as Journals, Revenues, Expenses and Open Subledgers.</li>
<li><strong>EPM Narrative Reporting</strong> — companies that also use Oracle Enterprise Performance Management can make those reports reachable from the Financial Reporting Center (more in the “More Family Members” lesson).</li>
</ul>
<p>Reporting tools evolve with each quarterly update, so check the Readiness What’s New for General Ledger before a big reporting project.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips from accountants',
      html: `<ul>
<li><strong>Post first, report second.</strong> Unposted journals are not in the cube. Many “wrong report” calls are really “journal not posted yet”.</li>
<li><strong>Tie out.</strong> Check that the balance sheet balances and that key accounts match the subledger reports (for example 2110 Accounts Payable versus the Payables trial balance).</li>
<li><strong>Use hierarchies, not hard-coded lists.</strong> If a report row says “All Expenses” using the account hierarchy, a new expense account appears automatically.</li>
<li><strong>Snapshot what you publish.</strong> Keep the version you gave the board or the auditors.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Balances cube', def: 'An Essbase store of General Ledger balances by period, ledger, account segments, scenario and currency, updated when journals post.' },
        { term: 'Financial report', def: 'A formatted statement such as a balance sheet or income statement built from General Ledger balances.' },
        { term: 'Financial Reporting Web Studio', def: 'The browser-based designer used to build financial reports with grids, text and charts.' },
        { term: 'Smart View', def: 'An Office add-in that connects Excel to the balances cube for analysis and report design.' },
        { term: 'Ad hoc analysis', def: 'Building a report on the fly by choosing, zooming and drilling into dimensions instead of using a fixed design.' },
        { term: 'Point of View (POV)', def: 'The fixed dimension choices, such as ledger, scenario and currency, that apply to a whole report or sheet.' },
        { term: 'Account group', def: 'A saved set of key accounts with tolerance rules; exceptions appear in the Account Monitor.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'When does the balances cube get updated?',
          options: ['Once a year', 'At the same time a journal is posted', 'Only when someone opens Excel', 'When an invoice is entered, before accounting'],
          answer: 1,
          explain: 'Posting a journal updates the General Ledger balances cubes at the same moment, so financial reports and Smart View are current right away.',
        },
        {
          q: 'Which tool is the browser-based designer for financial statements in current Fusion documentation?',
          options: ['Financial Reporting Web Studio', 'OTBI wizard', 'eText template', 'File Import and Export'],
          answer: 0,
          explain: 'Financial reports are built in Financial Reporting Web Studio, opened from the Financial Reporting Center via the workspace.',
        },
        {
          q: 'In Smart View, Priya double-clicks “All Cost Center Values” to see 100, 200 and 300. What is that called?',
          options: ['Cascade', 'Zoom In', 'Keep Only', 'Bursting'],
          answer: 1,
          explain: 'Zoom In moves down one level in a dimension’s hierarchy. Cascade creates copies per member; Keep Only trims members.',
        },
        {
          q: 'Sam’s report shows January revenue lower than expected, but Priya just entered a $400 Happy Cafe journal. What is the most likely reason?',
          options: ['The cube is broken', 'The journal is not posted yet', 'Smart View only shows budgets', 'Revenue is never in financial reports'],
          answer: 1,
          explain: 'Only posted journals update the balances cube. Post first, then report.',
        },
        {
          q: 'Where do account group exceptions appear?',
          options: ['In the supplier portal', 'In the Account Monitor on the General Accounting Dashboard', 'On printed checks', 'In the FBDI template'],
          answer: 1,
          explain: 'Triggered tolerance rules show in the Account Monitor (and infolets and the Financial Reporting Center), with drill-down through the Account Inspector.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Overview of Financial Reporting Center', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/ocuar/overview-of-financial-reporting-center.html' },
    { title: 'What’s the difference between Financial Reporting Center and Workspace?', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/what-s-the-difference-between-financial-reporting-center-and.html' },
    { title: 'Overview of Reporting Web Studio', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-reporting-web-studio.html' },
    { title: 'Overview of Oracle Essbase Balances Cubes', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-oracle-essbase-balances-cubes.html' },
    { title: 'Overview of Smart View', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/ocuar/overview-of-smart-view.html' },
    { title: 'Creating an Ad Hoc Analysis in Smart View', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/ocuar/creating-an-ad-hoc-analysis-in-smart-view.html' },
    { title: 'Set Up Financial Reporting Center and Smart View', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/set-up-financial-reporting-center-and-smart-view.html' },
    { title: 'Account Groups', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/account-groups.html' },
    { title: 'Inquire on GL Balances', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/inquire-on-gl-balances.html' },
    { title: 'How to Access EPM Narrative Reporting Reports in Financial Reporting Center', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/how-to-access-epm-narrative-reporting-reports-in-financial-reporting-center.html' },
  ],
};
