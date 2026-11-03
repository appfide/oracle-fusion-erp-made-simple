export default {
  slug: 'getting-data-in',
  title: 'Getting Lots of Data In: FBDI and Spreadsheets',
  minutes: 17,
  summary:
    'Typing 500 invoices by hand is slow and error-prone. Learn the main ways to load data in bulk into Oracle Fusion: File-Based Data Import (FBDI) templates, the Load Interface File for Import and import processes, fixing errors, ADF Desktop Integration spreadsheets, and rapid implementation spreadsheets — with Sunny loading 500 supplier invoices.',
  objectives: [
    'Explain what FBDI is and the three parts it is made of',
    'Follow the FBDI steps from template to imported records, including fixing errors',
    'Describe interface tables and why records wait there before import',
    'Compare FBDI with ADF Desktop Integration spreadsheets and rapid implementation spreadsheets',
    'Choose a sensible loading method for a business situation',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The school lunch order form',
      html: `<p>Imagine your teacher must order lunch for 500 kids. Calling the kitchen 500 times would take all week! Instead, the kitchen sends a <strong>special order form</strong> with fixed columns: name, class, sandwich, drink. The teacher fills in 500 rows and hands over the whole stack at once.</p>
<p>The kitchen puts the stack in a <strong>waiting tray</strong>, checks each row (“there is no ‘pizza sandwich’ on the menu!”), cooks the good orders, and sends back a note listing the rows that need fixing.</p>
<p>That is exactly how <span class="hl">File-Based Data Import</span> works in Oracle Fusion: a fixed template, a waiting tray (the interface tables), checks, and an error report.</p>`,
    },
    {
      type: 'text',
      heading: 'Why bulk loading matters',
      html: `<p>Screens are perfect for one invoice at a time. But real companies often need to bring in <strong>hundreds or thousands</strong> of records:</p>
<ul>
<li><strong>Go-live (data conversion)</strong> — moving suppliers, customers, open invoices and balances from an old system.</li>
<li><strong>Regular feeds</strong> — invoices produced by another system every day or month, journals from a payroll system, bank statements.</li>
<li><strong>Mass changes</strong> — updating many records at once.</li>
</ul>
<p>Oracle Fusion offers several tools for this. This lesson covers the file and spreadsheet tools; the next lessons cover scheduled processes and APIs (automatic connections between systems).</p>`,
    },
    {
      type: 'slides',
      title: 'FBDI in three parts',
      slides: [
        { icon: '📋', title: '1. The template', html: `<p>Oracle publishes an Excel template (an <code>.xlsm</code> file with macros) for each kind of data, in the guide <em>File-Based Data Import for Oracle Fusion Cloud Financials</em>. For supplier invoices it is <strong>PayablesStandardInvoiceImportTemplate.xlsm</strong>; for journals, <strong>JournalImportTemplate.xlsm</strong>. Each tab matches a database table.</p>` },
        { icon: '📦', title: '2. The load process', html: `<p>You turn the template into a <strong>.zip</strong> of CSV files with the <kbd>Generate CSV File</kbd> button, upload it, and run <strong>Load Interface File for Import</strong>. This copies the rows into <strong>interface tables</strong> — the waiting tray.</p>` },
        { icon: '🏭', title: '3. The import process', html: `<p>Each product has its own import process that checks the waiting rows and creates real records. For invoices: <strong>Import Payables Invoices</strong>. For journals: <strong>Import Journals</strong>. Rows that fail stay behind with error messages.</p>` },
        { icon: '🧹', title: 'Clean-up', html: `<p>Interface records are purged automatically after 30 days, and you can run the <strong>Purge Interface Tables</strong> process to clean up earlier. The Payables import also has its own <em>Purge</em> parameter.</p>` },
      ],
    },
    {
      type: 'flow',
      title: 'The FBDI journey for Sunny’s invoices',
      steps: [
        { icon: '⬇️', label: 'Download template', detail: 'PayablesStandardInvoiceImportTemplate.xlsm from the FBDI guide for your release.' },
        { icon: '✍️', label: 'Fill rows', detail: 'One row per invoice header on the invoices tab; one row per line on the lines tab.' },
        { icon: '🗜️', label: 'Generate CSV', detail: 'Click Generate CSV File on the Instructions and CSV Generation tab → a .zip file.' },
        { icon: '⬆️', label: 'Upload', detail: 'Upload the zip to the content server (for example with File Import and Export, account fin/payables/import).' },
        { icon: '📥', label: 'Load Interface File for Import', detail: 'Choose Import Payables Invoices as the import process and the .zip as the data file.' },
        { icon: '🏭', label: 'Import Payables Invoices', detail: 'Creates invoices from the interface tables and prints an import report.' },
        { icon: '🛠️', label: 'Fix and re-import', detail: 'Correct rejected rows in the Correct Import Errors spreadsheet, then Upload and Import.' },
      ],
      note: `<p>After import, the invoices are normal Payables invoices: they still go through validation, holds, approval and accounting.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the FBDI steps in order',
      instructions: `<p>Jordan is teaching Ava how to load a file of invoices. Put the steps in the right order.</p>`,
      items: [
        'Download the Payables Standard Invoice Import template for your release',
        'Fill in the invoice and invoice line tabs',
        'Click Generate CSV File to create the .zip',
        'Upload the .zip and run Load Interface File for Import',
        'Run Import Payables Invoices',
        'Review the import report and fix rejected rows in Correct Import Errors',
        'Validate the new invoices',
      ],
      explain: `<p>Template → data → zip → load into the interface tables → import into Payables → fix errors → then the normal invoice life (validation, approval, payment) continues.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the real names',
      html: `<ul>
<li><strong>External Data Integration Services</strong> — Oracle’s name for the FBDI toolkit: templates, the load process and the import processes.</li>
<li><strong>File Import and Export</strong> — <kbd>Navigator</kbd> &gt; <kbd>Tools</kbd> &gt; <kbd>File Import and Export</kbd>. Upload a file and choose an <strong>account</strong> such as <code>fin/payables/import</code> or <code>fin/generalLedger/import</code>; the account tells Fusion which import the file belongs to.</li>
<li><strong>Interface tables</strong> — for invoices, <code>AP_INVOICES_INTERFACE</code> and <code>AP_INVOICE_LINES_INTERFACE</code>; for journals, <code>GL_INTERFACE</code>.</li>
<li><strong>Import Payables Invoices</strong> parameters include Business Unit, Ledger, Source (use <em>External</em> for FBDI files), Import Set, Invoice Group, Hold, Accounting Date, Purge, Summarize Report and Calculate Tax During Import. It produces the <strong>Payables Open Invoices Interface Import Report</strong>.</li>
</ul>
<p>Templates change between releases — always download the template for <em>your</em> current release. Oracle notes they work with Microsoft Excel on Windows.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny loads 500 supplier invoices',
      html: `<p>Sunny now has 25 lemonade stands. Each stand buys ingredients locally, and the suppliers’ shared portal sends Sunny one spreadsheet per month with every invoice: <strong>500 invoices</strong>. Typing them would take Ava days. Jordan sets up FBDI instead.</p>`,
      steps: [
        'Ava copies the portal data into the template: 250 Lemon Grove Farms invoices ($25,000), 150 Sweet Sugar Co. invoices ($12,000) and 100 Cup &amp; Straw Supply invoices ($6,000). Business unit: Sunny US BU. Import Set: <code>PORTAL-JAN26</code>.',
        'Ava clicks <kbd>Generate CSV File</kbd>, uploads the zip, and submits <strong>Load Interface File for Import</strong>. Status: Succeeded — 500 rows are in the waiting tray.',
        'Ava submits <strong>Import Payables Invoices</strong> with Source = External and Import Set = PORTAL-JAN26.',
        'The import report shows <strong>498 imported, 2 rejected</strong>: one invoice used a supplier site that is not set up, and one had a distribution account combination that is not valid.',
        'Ava opens the <strong>Correct Import Errors</strong> spreadsheet, fixes the supplier site and the account (5120 instead of a mistyped account), and clicks <kbd>Upload and Import</kbd>. Both invoices import.',
        'All 500 invoices now go through validation and approval. When accounting runs, Priya sees the total in the ledger.',
      ],
      result: `<p>What would have taken days took about an hour — and the import report gave Ava an audit trail of every row.</p>`,
    },
    {
      type: 'journal',
      title: 'Accounting for the 500 imported invoices (summary)',
      lines: [
        { account: '5110 Lemons Cost', debit: 25000, credit: 0 },
        { account: '5120 Sugar Cost', debit: 12000, credit: 0 },
        { account: '5130 Cups and Straws Cost', debit: 6000, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 43000 },
      ],
      note: `<p>FBDI only brings the invoices in. The journal is created later by <strong>Create Accounting</strong>, exactly as for invoices typed on screen. (In a go-live conversion of <em>old</em> open invoices, companies often use a special conversion account instead of expense accounts, because the expense was already recorded in the old system.)</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: fill one FBDI invoice row',
      instructions: `<p>This is a <strong>practice screen</strong> — a simplified version of one row of the invoice template, not the full Oracle file. Fill in the row for this invoice: <strong>Sweet Sugar Co.</strong>, invoice <strong>SS-7781</strong>, dated <strong>2026-01-15</strong>, <strong>$200</strong> in US dollars, for Sunny US BU, in import set PORTAL-JAN26.</p>`,
      formTitle: 'Invoice template row (practice)',
      fields: [
        { label: 'Business unit', type: 'select', options: ['Sunny US BU', 'Sunny UK BU'], answer: 'Sunny US BU' },
        { label: 'Source', type: 'select', options: ['External', 'Manual invoice entry', 'Spreadsheet'], answer: 'External', hint: 'Oracle recommends this source for FBDI files.' },
        { label: 'Supplier', type: 'text', answer: 'Sweet Sugar Co.' },
        { label: 'Invoice number', type: 'text', answer: 'SS-7781' },
        { label: 'Invoice date', type: 'date', answer: '2026-01-15' },
        { label: 'Invoice amount', type: 'number', answer: 200 },
        { label: 'Invoice currency', type: 'select', options: ['USD', 'GBP', 'EUR'], answer: 'USD' },
        { label: 'Distribution account', type: 'select', options: ['101-200-5120-010-000', '101-200-5110-010-000', '201-200-5120-010-000'], answer: '101-200-5120-010-000', hint: 'US company, Kitchen, Sugar Cost.' },
        { label: 'Import set', type: 'text', answer: 'PORTAL-JAN26' },
      ],
      explain: `<p>Sugar costs go to 5120 in company 101 (Sunny Lemonade US Inc.), because the invoice belongs to Sunny US BU and is in USD. Using Source = External and a clear Import Set lets Ava import and re-run exactly this batch. Remember: never reorder or delete template columns — you may hide the ones you do not use.</p>`,
    },
    {
      type: 'text',
      heading: 'Spreadsheets that talk to Fusion: ADF Desktop Integration',
      html: `<p>Some tasks offer a smarter kind of spreadsheet: an Excel workbook connected live to Fusion using the <strong>Oracle ADF Desktop Integration</strong> add-in (people call these <strong>ADFdi</strong> spreadsheets). You download the workbook from a Fusion page, type or paste rows, and click upload — Fusion checks each row and writes back a status.</p>
<ul>
<li><strong>Create Invoice in Spreadsheet</strong> — enter many invoices in Excel and upload them to Payables.</li>
<li><strong>Create Journal in Spreadsheet</strong> — Priya’s favorite for month-end journals with many lines.</li>
<li><strong>Correct Import Errors</strong> — the spreadsheet Ava used above to fix rejected FBDI rows.</li>
</ul>
<p>To use them, install the add-in from <kbd>Navigator</kbd> &gt; <kbd>Tools</kbd> &gt; <kbd>Download Desktop Integration</kbd> (a Windows installer; your administrator must allow it). Do not confuse this with <strong>Export to Excel</strong>, which only downloads data to look at.</p>
<p>Oracle also offers the <strong>Oracle Visual Builder Add-in for Excel</strong>, which edits business data through Fusion’s REST services; 26D, for example, adds budget management with it for Budgetary Control.</p>`,
    },
    {
      type: 'text',
      heading: 'Rapid implementation spreadsheets: setting up fast',
      html: `<p>During implementation, Jordan does not create Sunny’s chart of accounts value by value. Instead the <strong>Define Financials Configuration for Rapid Implementation</strong> task list includes the task <strong>Create Chart of Accounts, Ledger, Legal Entities, and Business Units in Spreadsheet</strong>. Jordan downloads the workbook, fills in Sunny COA segments and values, the Sunny US Ledger and Sunny UK Ledger, the two legal entities and the business units, then uploads it. Upload processes create the setup in one go.</p>
<p>Other areas have similar rapid setup spreadsheets. Oracle sometimes replaces older “Create … in Spreadsheet” tools with improved “Manage … in Spreadsheet” versions — the What’s New notes say when.</p>`,
    },
    {
      type: 'table',
      caption: 'Which loading method when?',
      headers: ['Method', 'Best for', 'Sunny example'],
      rows: [
        ['Screens', 'A few records, one at a time', 'Ava enters one urgent $150 Bright Power Utility bill'],
        ['ADFdi spreadsheet (Create … in Spreadsheet)', 'Tens to a few hundred rows, entered by a person, with instant feedback', 'Priya uploads a 40-line month-end journal'],
        ['FBDI', 'Large volumes, conversions, files from other systems', '500 invoices a month from the supplier portal; go-live data'],
        ['Rapid implementation spreadsheet', 'Initial setup data during implementation', 'Jordan creates the Sunny COA and ledgers'],
        ['REST APIs / Oracle Integration', 'Automatic, system-to-system, often real time', 'Covered in the APIs lesson'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Choose the loading method',
      instructions: `<p>For each situation, pick the most sensible way to get the data into Fusion.</p>`,
      categories: ['FBDI', 'ADFdi spreadsheet', 'Rapid implementation spreadsheet', 'Screen entry'],
      items: [
        { text: 'Go-live: 3,000 open customer invoices from the old system', answer: 'FBDI' },
        { text: 'Priya’s 35-line accrual journal at month-end', answer: 'ADFdi spreadsheet' },
        { text: 'Jordan creating the Sunny COA, ledgers and business units for the first time', answer: 'Rapid implementation spreadsheet' },
        { text: 'One credit memo from Cup & Straw Supply', answer: 'Screen entry' },
        { text: 'A payroll system’s monthly file of 2,000 journal lines', answer: 'FBDI' },
        { text: 'Fixing 12 rejected invoice rows after an import', answer: 'ADFdi spreadsheet' },
      ],
      explain: `<p>FBDI is built for big files and conversions. ADFdi spreadsheets suit people entering or fixing a moderate number of rows with instant feedback (Correct Import Errors is one). Rapid implementation spreadsheets are for initial setup. One-off documents are quickest on screen.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips from data conversion teams',
      html: `<ul>
<li><strong>Test loads in Test first.</strong> Run a small batch, then the full file, before touching production.</li>
<li><strong>Load in the right order.</strong> Suppliers and supplier sites must exist before their invoices; customers before customer invoices; the chart of accounts before journals.</li>
<li><strong>Use import sets / batch names</strong> so you can find, re-run or purge one batch without touching others.</li>
<li><strong>Reconcile counts and totals.</strong> “500 rows, $43,000 in the file” must equal “500 invoices, $43,000 in Fusion”. Auditors ask.</li>
<li><strong>Never reorder or delete template columns</strong> — Oracle warns this makes the load fail. Hide unused columns instead.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'FBDI', def: 'File-Based Data Import: loading data in bulk using Oracle’s Excel templates, a load process and an import process.' },
        { term: 'Interface table', def: 'A waiting area in the database where loaded rows sit until an import process checks them and creates real records.' },
        { term: 'Load Interface File for Import', def: 'The scheduled process that copies an uploaded FBDI zip file into the interface tables.' },
        { term: 'Import Payables Invoices', def: 'The process that turns rows in the Payables interface tables into real invoices and reports any rejections.' },
        { term: 'ADFdi spreadsheet', def: 'An Excel workbook connected to Fusion through the ADF Desktop Integration add-in, used to create or fix records in bulk.' },
        { term: 'Rapid implementation spreadsheet', def: 'A workbook used during setup to create many configuration records, such as the chart of accounts and ledgers, at once.' },
        { term: 'Data conversion', def: 'Moving data from an old system into the new one, usually at go-live.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'What is the job of the interface tables in FBDI?',
          options: ['They print checks', 'They are a waiting area where loaded rows sit until the import process checks them', 'They store the final, posted journals', 'They hold user passwords'],
          answer: 1,
          explain: 'Load Interface File for Import fills the interface tables; the import process then validates rows and creates real records.',
        },
        {
          q: 'After Load Interface File for Import succeeds, what must Ava run to create the invoices?',
          options: ['Import Payables Invoices', 'Calculate Depreciation', 'Revalue Balances', 'Create Positive Pay File'],
          answer: 0,
          explain: 'The load only fills the waiting area. Import Payables Invoices creates the invoices and reports rejections.',
        },
        {
          q: 'Two rows were rejected. What is the recommended way to fix them?',
          options: ['Delete the whole batch and give up', 'Use the Correct Import Errors spreadsheet, then Upload and Import', 'Edit the database directly', 'Reorder the template columns'],
          answer: 1,
          explain: 'Correct Import Errors lets you fix rejected rows and resubmit them. Never reorder or delete template columns.',
        },
        {
          q: 'Which tool would Jordan use to create the Sunny chart of accounts, ledgers and business units quickly during implementation?',
          options: ['An OTBI analysis', 'The rapid implementation spreadsheet task', 'A positive pay file', 'The Expenses Agent'],
          answer: 1,
          explain: 'The “Create Chart of Accounts, Ledger, Legal Entities, and Business Units in Spreadsheet” task builds that setup in one upload.',
        },
        {
          q: 'Does importing invoices with FBDI skip validation and approval?',
          options: ['Yes, imported invoices are automatically paid', 'No, imported invoices follow the normal validation, approval and accounting steps', 'Only on Fridays', 'Only for UK invoices'],
          answer: 1,
          explain: 'FBDI just creates the invoices. All normal controls still apply afterwards.',
        },
      ],
    },
  ],
  sources: [
    { title: 'External Data Integration Services for Importing Data', publisher: 'Oracle Help Center (FBDI for Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oefbf/external-data-integration-services-for-importing-data.html' },
    { title: 'Load Data into Tables', publisher: 'Oracle Help Center (FBDI for Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oefbf/load-data-into-tables.html' },
    { title: 'Payables Standard Invoice Import', publisher: 'Oracle Help Center (FBDI for Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oefbf/payablesstandardinvoiceimport-3055.html' },
    { title: 'How Payables Standard Invoice Import Data Is Processed', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-payables-standard-invoice-import-data-is-processed.html' },
    { title: 'Journal Import', publisher: 'Oracle Help Center (FBDI for Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oefbf/journalimport-3096.html' },
    { title: 'Set Up Desktop Integration for Excel', publisher: 'Oracle Help Center (Applications Common 26D)', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/set-up-desktop-integration-for-excel.html' },
    { title: 'Considerations for Creating Invoices in a Spreadsheet', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/considerations-for-creating-invoices-in-a-spreadsheet.html' },
    { title: 'How Charts of Accounts, Ledgers, Legal Entities, and Business Units Are Created Using Spreadsheets', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/facsf/how-charts-of-accounts-ledgers-legal-entities-and-business-units.html' },
    { title: 'Oracle Visual Builder Add-in for Excel', publisher: 'Oracle', url: 'https://www.oracle.com/downloads/cloud/visual-builder-addin-downloads.html' },
  ],
};
