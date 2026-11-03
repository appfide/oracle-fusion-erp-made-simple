export default {
  slug: 'bi-publisher',
  title: 'BI Publisher: Pixel-Perfect Documents',
  minutes: 15,
  summary:
    'Oracle Analytics Publisher (still widely called BI Publisher) turns data into exact documents and files: checks, remittance advices, bank payment files, invoices and hundreds of predefined reports. Learn data models, layouts (RTF, Excel, eText), scheduling, bursting, safe customizing, and when to use it instead of OTBI.',
  objectives: [
    'Explain what Oracle Analytics Publisher does and why it is called “pixel-perfect”',
    'Describe the parts of a report: data model, layout and properties',
    'Name common layout types (RTF, Excel, PDF, eText) and what each is good for',
    'Explain scheduling and bursting with a Sunny Lemonade example',
    'Customize a predefined report safely and choose between Analytics Publisher and OTBI',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Cookie dough and cookie cutters',
      html: `<p>Imagine you bake cookies for a school fair. First you make the <strong>dough</strong> — that is the stuff. Then you press a <strong>cookie cutter</strong> into it — star, heart, lemon shape. Same dough, different cutters, different cookies. And every star cookie looks exactly like every other star cookie.</p>
<p>Now imagine you must send one bag of cookies to each friend, with their name on the bag. You split the batch and label each bag. That is called <strong>bursting</strong>.</p>
<p>Oracle Analytics Publisher works like this: <span class="hl">the data model is the dough, the layout is the cookie cutter, and bursting sends each person their own bag</span>.</p>`,
    },
    {
      type: 'text',
      heading: 'What it is (and its two names)',
      html: `<p><strong>Oracle Analytics Publisher</strong> is the tool inside Oracle Fusion for creating highly formatted documents and operational reports. For many years it was called <strong>Oracle BI Publisher</strong> (BI = Business Intelligence), and people at work still say “BI Publisher” or “BIP”. Current Oracle documentation uses the new name.</p>
<p>Why “<strong>pixel-perfect</strong>”? Because the output looks exactly the same every time — every line, logo and number in the same place. That matters when the document goes to someone outside the company: a check that a bank must scan, a payment file a bank’s computer must read, a remittance advice a supplier must understand, or a tax form a government expects.</p>
<p>Oracle’s own reporting guide says Analytics Publisher is the tool of choice for high-volume operational reporting and fixed-form documents such as checks, invoices, purchase orders and tax forms.</p>`,
    },
    {
      type: 'slides',
      title: 'The parts of an Analytics Publisher report',
      slides: [
        { icon: '🥣', title: 'Data model (the dough)', html: `<p>Defines <strong>which data</strong> to collect and how it is structured: the fields, groups (for example invoice header and lines) and parameters. Data models are separate objects in the BI catalog, usually built by technical experts.</p>` },
        { icon: '⭐', title: 'Layout (the cookie cutter)', html: `<p>Defines <strong>how it looks</strong>. Many layouts are designed in familiar tools like Microsoft Word (RTF files) or Excel. One report can have several layouts, for example a detailed and a summary version.</p>` },
        { icon: '⚙️', title: 'Properties', html: `<p>Settings such as default output format, which layouts are allowed, and caching.</p>` },
        { icon: '📄', title: 'Output', html: `<p>When run, the data is poured into the layout and produces output such as <strong>PDF</strong>, <strong>Excel</strong>, RTF, HTML or a <strong>data (XML)</strong> file.</p>` },
        { icon: '📬', title: 'Delivery', html: `<p>Output can be viewed on screen, printed, emailed or sent to other destinations — once or on a schedule.</p>` },
      ],
    },
    {
      type: 'table',
      caption: 'Common layout types',
      headers: ['Layout type', 'Designed in', 'Typical use at Sunny'],
      rows: [
        ['<strong>RTF</strong> (Rich Text Format)', 'Microsoft Word with an add-in', 'Checks, remittance advices, letters, most printed documents'],
        ['<strong>Excel</strong>', 'Microsoft Excel', 'Reports people want to sort and sum after running'],
        ['<strong>PDF</strong> form', 'An existing PDF form', 'Filling an official, predesigned form'],
        ['<strong>Publisher layout</strong> (XPT)', 'The browser-based layout editor', 'Simple interactive reports'],
        ['<strong>eText</strong>', 'A table-style template', 'Bank payment files (EFT, electronic funds transfer) and EDI files — fixed-position or delimited text that machines read'],
        ['<strong>XSL</strong>', 'Hand-written stylesheet', 'Special technical formats'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: Payments runs on Analytics Publisher',
      html: `<p>Oracle Fusion Payments uses Analytics Publisher for its outputs. Each payment <strong>format</strong> is tied to exactly one Analytics Publisher <strong>template</strong>, and eText templates create the machine-readable files banks need. Predefined disbursement reports include:</p>
<ul>
<li><strong>Disbursement Payment File Formats</strong> — printed checks (process <em>Create Printed Payment Files</em>) or electronic payment files (process <em>Create Electronic Payment Files</em>).</li>
<li><strong>Disbursement Separate Remittance Advice Formats</strong> — the note telling a supplier which invoices a payment covers (process <em>Send Separate Remittance Advice</em>).</li>
<li><strong>Disbursement Positive Pay File Formats</strong> — a list of issued checks sent to the bank to prevent check fraud (process <em>Create Positive Pay File</em>). Update 26D adds an ISO Positive Pay file option for voided checks.</li>
<li><strong>Disbursement Payment File Register Formats</strong> — a register of what was in a payment file.</li>
</ul>
<p>These can run automatically from the payment process or manually from <kbd>Scheduled Processes</kbd>. You will see them again in the Payables lesson on paying suppliers.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match the output to the template type',
      instructions: `<p>Jordan is planning Sunny’s Analytics Publisher templates. Match each output to the layout type that fits best.</p>`,
      pairs: [
        { left: 'A printed check on Big River Bank check stock', right: 'RTF (designed in Word)' },
        { left: 'A fixed-position payment file the bank’s computer reads', right: 'eText' },
        { left: 'A supplier listing that Ava wants to sort and total afterwards', right: 'Excel' },
        { left: 'Filling in an official, already-designed government form', right: 'PDF form' },
      ],
      explain: `<p>RTF layouts are the everyday choice for printed documents. eText is for machine-readable bank and EDI files. Excel layouts suit people who want to keep working with the numbers. PDF layouts fill existing forms.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny pays Lemon Grove Farms',
      html: `<p>Ava’s $500 invoice from Lemon Grove Farms is approved and due. Mia runs the payment process for Sunny US BU. Three Analytics Publisher outputs are created from the <em>same</em> payment data:</p>`,
      steps: [
        '<strong>The check:</strong> the RTF check template places the payee name, amount in words, amount in figures and date exactly where Big River Bank’s check stock expects them.',
        '<strong>The remittance advice:</strong> an email to Lemon Grove Farms listing invoice number, invoice date and $500 paid, so their receivables clerk can match it.',
        '<strong>The positive pay file:</strong> an eText file sent to Big River Bank listing check number, date and $500, so the bank only cashes checks Sunny really issued.',
      ],
      result: `<p>One payment, three pixel-perfect outputs. If Big River Bank changes its file layout, Jordan changes the <em>template</em> — not the payment data.</p>`,
    },
    {
      type: 'journal',
      title: 'The payment behind those documents',
      lines: [
        { account: '2110 Accounts Payable – Trade', debit: 500, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 500 },
      ],
      note: `<p>Analytics Publisher does not create accounting — it only formats documents. The accounting comes from Payables when Create Accounting runs. (Some companies credit a cash clearing account first and move it to cash when the bank confirms; it depends on setup.)</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: the sugar payment behind the remittance',
      instructions: `<p>Next, Sunny pays the <strong>$200</strong> Sweet Sugar Co. invoice from the Sunny Operating Account, and Analytics Publisher emails a remittance advice. Build the accounting for the payment itself (assume no cash clearing account).</p>`,
      accounts: ['2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '5120 Sugar Cost', '4110 Lemonade Sales Revenue', '7110 Bank Charges'],
      answer: [
        { account: '2110 Accounts Payable – Trade', debit: 200, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 200 },
      ],
      explain: `<p>Paying a supplier reduces what we owe (debit the liability) and reduces cash (credit the bank account). Sugar Cost was already recorded when the invoice was accounted, so it does not move again. The remittance advice is just a document — it creates no accounting.</p>`,
    },
    {
      type: 'text',
      heading: 'Scheduling and bursting',
      html: `<p>Most predefined Analytics Publisher reports in Fusion are run through the <strong>Scheduled Processes</strong> work area, so they always use the latest data. You can run them once, or on a schedule (for example every Monday at 7 a.m.), choose the output format and add destinations such as email or a printer. The next module covers scheduled processes in depth.</p>
<p><strong>Bursting</strong> splits one report run into many pieces using a key field in the data, then sends each piece with its own layout and delivery settings. Oracle’s example: a customer invoice report that emails each customer only their own invoice. The bursting rules are defined in the report’s data model.</p>`,
    },
    {
      type: 'example',
      title: 'Bursting at Sunny: one run, three customer emails',
      html: `<p>Omar wants each customer to receive a monthly statement. Instead of running the report three times, a bursting report is set up with the <em>customer</em> as the split key.</p>`,
      steps: [
        'The report runs once on the first business day of each month.',
        'Happy Cafe gets a PDF of only its own transactions, including the $400 invoice for 200 bottles, at its billing email.',
        'City Park Kiosk and Sunshine School each get their own PDFs.',
        'Omar gets a summary of what was sent.',
      ],
      result: `<p>Bursting saves time and protects privacy: no customer ever sees another customer’s data.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: customize a predefined report safely',
      items: [
        'Go to <kbd>Navigator</kbd> &gt; <kbd>Tools</kbd> &gt; <kbd>Reports and Analytics</kbd> and click <kbd>Browse Catalog</kbd>.',
        'Find the predefined report (for example under <strong>Shared Folders &gt; Financials</strong>).',
        'From the report’s <kbd>More</kbd> menu, choose <kbd>Customize</kbd>. Oracle copies the report into <strong>Shared Folders &gt; Custom</strong>, keeping the same folder path, and links it to the original — so when users run the original, they get your copy.',
        'Edit the layout in the copy (for example, download the RTF, add Sunny’s logo in Word, upload it back).',
        'Test in the test environment with real-looking data before using it in production.',
      ],
      note: `<p>Oracle notes that the Customize option is for predefined <em>reports</em>, not data models, and may require opening the Analytics Publisher server directly. Never edit predefined data models — copy them into Custom and edit the copy. Menus can vary by release and Redwood pages.</p>`,
    },
    {
      type: 'table',
      caption: 'Analytics Publisher or OTBI?',
      headers: ['Need', 'Better choice', 'Why'],
      rows: [
        ['Exact printed or emailed document (check, remittance, form)', 'Analytics Publisher', 'Fixed, pixel-perfect layout'],
        ['File for a bank or another system', 'Analytics Publisher (eText)', 'Machine-readable fixed formats'],
        ['One run, many recipients', 'Analytics Publisher (bursting)', 'Splits and delivers per key value'],
        ['Explore data, change columns, drill down', 'OTBI', 'Interactive, self-service, real time'],
        ['A chart in a dashboard or infolet', 'OTBI', 'Only analyses can be placed in infolets'],
        ['Large, scheduled operational listing', 'Usually Analytics Publisher', 'Built for high-volume scheduled output'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Analytics Publisher or OTBI?',
      instructions: `<p>Sort each request from the Sunny team into the tool that fits best.</p>`,
      categories: ['Oracle Analytics Publisher', 'OTBI'],
      items: [
        { text: 'Email each of 40 suppliers its own remittance advice after a payment run', answer: 'Oracle Analytics Publisher' },
        { text: 'Sam wants to click around spend by supplier and drill into details', answer: 'OTBI' },
        { text: 'Create the positive pay file for Big River Bank', answer: 'Oracle Analytics Publisher' },
        { text: 'Put a chart of open holds on Ava’s home page infolet', answer: 'OTBI' },
        { text: 'Print customer invoices with Sunny’s logo in a fixed layout', answer: 'Oracle Analytics Publisher' },
        { text: 'A quick real-time list of receipts applied today, filtered by customer', answer: 'OTBI' },
      ],
      explain: `<p>Fixed documents, files and per-recipient delivery (bursting) are Analytics Publisher jobs. Interactive exploration, infolets and quick real-time lists are OTBI jobs.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li><strong>Payment formats are business-critical.</strong> Always test a changed check or bank template with the bank before going live — a wrong position can make a whole file reject.</li>
<li><strong>Keep a list of your custom reports</strong> and re-test them after each quarterly update.</li>
<li><strong>Do not save in My Folders &gt; Temp</strong> — it is purged every 24 hours.</li>
<li><strong>Learn to read the Data (XML) output.</strong> It shows exactly which fields the layout can use — the first thing a report developer looks at.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Oracle Analytics Publisher', def: 'The Fusion tool, formerly BI Publisher, that creates fixed-layout documents, reports and files.' },
        { term: 'Pixel-perfect', def: 'Output whose layout is exactly the same every time, with every item in a precise position.' },
        { term: 'Data model', def: 'The definition of which data a report collects and how it is grouped.' },
        { term: 'Layout (template)', def: 'The design that controls how report data looks, often made in Word (RTF) or Excel.' },
        { term: 'eText', def: 'A template type that produces fixed-position or delimited text files that banks and other systems can read.' },
        { term: 'Bursting', def: 'Splitting one report run into separate pieces by a key field and delivering each piece to its own recipient.' },
        { term: 'Positive pay', def: 'A file of issued checks sent to the bank so it only pays checks the company really wrote.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'In the cookie analogy, what is the layout (template)?',
          options: ['The dough', 'The cookie cutter', 'The oven', 'The bag label'],
          answer: 1,
          explain: 'The data model is the dough (the data); the layout is the cutter that gives the output its exact shape.',
        },
        {
          q: 'Big River Bank needs a payment file in a strict fixed-position format. Which layout type fits best?',
          options: ['eText', 'An OTBI pie chart', 'A Smart View sheet', 'An infolet'],
          answer: 0,
          explain: 'eText templates generate machine-readable fixed-position or delimited files for banks and EDI.',
        },
        {
          q: 'What does bursting do?',
          options: ['Deletes old reports', 'Splits one report run by a key field and delivers each piece to its own recipient', 'Makes a report run faster by skipping data', 'Converts OTBI to Smart View'],
          answer: 1,
          explain: 'Bursting splits data by a key (such as customer) and applies separate layout and delivery to each piece.',
        },
        {
          q: 'What is the safe way to change a predefined Analytics Publisher report?',
          options: ['Edit Oracle’s original in place', 'Use Customize (or copy it) so the changed version lives in Shared Folders > Custom', 'Save it in My Folders > Temp', 'Ask suppliers to change it'],
          answer: 1,
          explain: 'Customized copies in Shared Folders > Custom are protected during updates; Temp is purged daily.',
        },
        {
          q: 'Sam wants to explore spend by supplier and drill into the details. Which tool is the better fit?',
          options: ['Analytics Publisher eText', 'OTBI', 'A positive pay file', 'A check template'],
          answer: 1,
          explain: 'OTBI is interactive and self-service. Analytics Publisher is best for fixed documents and files.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Overview of Analytics Publisher', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/overview-of-business-intelligence-publisher.html' },
    { title: 'How You Access and Modify Report Components', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/how-you-access-and-modify-report-components.html' },
    { title: 'Layout Types (Report Designer’s Guide for Oracle Analytics Publisher)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/otbi/otbi-pub-design/layout-types.html' },
    { title: 'Create a Bursting Job', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/otbi/otbi-pub-user/create-bursting-job.html' },
    { title: 'Oracle Payments Predefined Reports', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/ocuar/oracle-payments-predefined-reports.html' },
    { title: 'How You Set Up Formats', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/how-you-set-up-formats.html' },
    { title: 'Financial Reporting Solutions', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/ocuar/financial-reporting-solutions.html' },
    { title: 'Financials What’s New 26D — ISO Positive Pay File for Voided Checks', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f50872.htm' },
  ],
};
