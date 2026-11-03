export default {
  slug: 'otbi',
  title: 'OTBI: Asking the System Questions',
  minutes: 16,
  summary:
    'OTBI (Oracle Transactional Business Intelligence) lets you build your own real-time reports by picking columns from subject areas. Learn subject areas, facts and attributes, the Reports and Analytics work area, the analysis wizard, dashboards, where to save, and how security decides what you see.',
  objectives: [
    'Explain what OTBI is and why its answers are real time',
    'Describe subject areas, folders, fact columns and attribute columns',
    'Build a simple analysis with the wizard in the Reports and Analytics work area',
    'Save analyses in the right catalog folder and share them through dashboards',
    'Explain how roles and data security limit what each person sees',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'A librarian who can answer any question — if you ask the right shelf',
      html: `<p>Imagine a giant library where every invoice, payment and receipt Sunny Lemonade ever made is stored on shelves. The books are sorted into <strong>shelves by topic</strong>: one shelf for invoices, one for payments, one for journals.</p>
<p>You walk up to a friendly librarian and say: “From the <em>invoices</em> shelf, please give me the supplier name, the invoice number and the amount — but only invoices that are on hold.” A minute later you have a neat list. Tomorrow, the list will be different, because the library is always up to date.</p>
<p>That librarian is <span class="hl">OTBI</span>. The shelves are called <strong>subject areas</strong>, and the things you ask for are <strong>columns</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'What OTBI is',
      html: `<p><strong>OTBI</strong> stands for <strong>Oracle Transactional Business Intelligence</strong>. It is built into Oracle Fusion and lets you create <strong>analyses</strong> (reports made of tables and charts) and <strong>dashboards</strong> (pages that collect several analyses) from your transaction data.</p>
<p>Two things make OTBI special:</p>
<ul>
<li><strong>Real time.</strong> OTBI reads the live transaction data in Fusion. If Ava releases a hold at 10:02, an analysis run at 10:03 already shows it. (Oracle’s subject area names even end with “Real Time”.)</li>
<li><strong>No programming.</strong> You pick columns from a menu, add filters and choose a table or chart. Behind the scenes, OTBI’s server turns your choices into database queries.</li>
</ul>
<p>Oracle also uses the names <strong>Analytics Answers</strong> (the tool for analyses) and <strong>Dashboard Builder</strong> (for dashboards) for parts of OTBI. Fixed-layout reports come from <strong>Oracle Analytics Publisher</strong>, covered in the next lesson.</p>`,
    },
    {
      type: 'slides',
      title: 'How OTBI data is organized',
      slides: [
        { icon: '📚', title: 'Subject areas', html: `<p>A <strong>subject area</strong> is a collection of columns about one business topic, such as Payables invoices or General Ledger journals. You always start an analysis by choosing one.</p>` },
        { icon: '🗂️', title: 'Folders', html: `<p>Inside a subject area are <strong>folders</strong>. Each subject area has one <strong>fact folder</strong> (the numbers) and several <strong>dimension folders</strong> (descriptions like supplier, business unit or time).</p>` },
        { icon: '🔢', title: 'Fact columns', html: `<p><strong>Facts</strong> are numbers you can add up, like an invoice amount or a paid amount.</p>` },
        { icon: '🏷️', title: 'Attribute columns', html: `<p><strong>Attributes</strong> describe things: dates, IDs or text, like supplier name or invoice number.</p>` },
        { icon: '🪜', title: 'Hierarchy columns', html: `<p><strong>Hierarchies</strong> have levels you can drill through, like Time: year → quarter → month.</p>` },
        { icon: '🧮', title: 'Mixing rule', html: `<p>When you add a fact, the result only includes rows that have that fact. The more columns you add, the more specific (and often smaller) the result. You can combine subject areas, but only through columns from folders they share.</p>` },
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Fact, attribute or hierarchy?',
      instructions: `<p>Ava is choosing columns for an invoice analysis. Sort each column into its type.</p>`,
      categories: ['Fact', 'Attribute', 'Hierarchy'],
      items: [
        { text: 'Invoice amount', answer: 'Fact' },
        { text: 'Supplier name', answer: 'Attribute' },
        { text: 'Time: year → quarter → month', answer: 'Hierarchy' },
        { text: 'Amount paid', answer: 'Fact' },
        { text: 'Invoice number', answer: 'Attribute' },
        { text: 'Invoice date', answer: 'Attribute' },
      ],
      explain: `<p>Facts are numbers you can total (amounts). Attributes describe things with text, IDs or dates. Hierarchies have levels you can drill through, like Time.</p>`,
    },
    {
      type: 'text',
      heading: 'Subject areas you will meet in Payables',
      html: `<p>Every module has its own subject areas. Here are the Payables ones listed in the current documentation, with the kind of question each answers. (General Ledger, Receivables, Cash Management and the others have their own sets, such as <em>General Ledger - Journals Real Time</em>.)</p>`,
    },
    {
      type: 'table',
      caption: 'Payables subject areas in the current documentation (26D)',
      headers: ['Subject area', 'Good for questions like…'],
      rows: [
        ['Payables Invoices - Transactions Real Time', 'Which invoices are on hold? Which are pending approval? Which suppliers often get a certain hold?'],
        ['Payables Invoices - Installments Real Time', 'What is due to be paid, and when?'],
        ['Payables Invoices - Prepayment Applications Real Time', 'Which prepayments were applied to which invoices?'],
        ['Payables Invoices - Trial Balance Real Time', 'What do we owe each supplier, to tie back to the ledger?'],
        ['Payables Invoices - Withholding Real Time', 'How much tax was withheld?'],
        ['Payables Payments - Disbursements Real Time', 'Which payments did we make, by bank account and method?'],
        ['Payables Payments - Payment History Real Time', 'What happened to a payment over time (for example voids)?'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Watch out for old blog posts',
      html: `<p>Older articles mention a subject area called <em>Payables Invoices - Holds Real Time</em>. Oracle retired it years ago and moved the hold information into <strong>Payables Invoices - Transactions Real Time</strong>. Always check subject area names in the Help Center for your current release.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Reports and Analytics work area',
      html: `<p>Open <kbd>Navigator</kbd> &gt; <kbd>Tools</kbd> &gt; <kbd>Reports and Analytics</kbd>. Here you can search or browse the catalog, open anything you have access to, mark <strong>Favorites</strong>, see <strong>Recent Items</strong>, and use <kbd>Create</kbd> to start a new analysis or report.</p>
<p>Many work areas (such as Invoices or Journals) also have a <strong>Reports and Analytics</strong> panel tab that lists the analyses mapped to that work area, so people can run them without leaving their daily screen. Analyses can also appear in <strong>infolets</strong> on home pages.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny’s question: which suppliers have invoices on hold?',
      html: `<p>Sam asks Ava a simple question in the weekly meeting: <em>“Which suppliers have invoices stuck on hold, and how much money is stuck?”</em> Oracle actually lists a very similar question — “Which suppliers have invoices frequently put on a particular hold?” — as something the <strong>Payables Invoices - Transactions Real Time</strong> subject area can answer.</p>`,
      steps: [
        'Ava opens <strong>Reports and Analytics</strong>, clicks <kbd>Create</kbd> &gt; <kbd>Analysis</kbd> and chooses <strong>Payables Invoices - Transactions Real Time</strong>.',
        '<strong>Select Columns:</strong> from the dimension folders Ava picks the supplier name, invoice number, invoice date and the hold name; from the fact folder, the invoice amount.',
        '<strong>Select Views:</strong> a table plus a bar chart of amount by supplier.',
        '<strong>Sort and Filter:</strong> business unit is Sunny US BU, and only holds that are not yet released. Sort by amount, largest first.',
        '<strong>Highlight:</strong> amounts above $1,000 turn red.',
        '<strong>Save:</strong> in <em>Shared Folders &gt; Custom &gt; Sunny &gt; Payables</em>, named “Invoices on Hold by Supplier”.',
      ],
      result: `<p>The result shows Lemon Grove Farms with 2 invoices ($500 and $750) on a matching hold, Bright Power Utility with 1 invoice ($150) on a duplicate-check hold, and Stand Builders LLC with 1 invoice ($6,000) waiting on a receipt. Total stuck: <strong>$7,400</strong>. Because OTBI is real time, the list shrinks as soon as Ava releases holds. The exact column names you see depend on your release — browse the folders to find them.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: set up the “Invoices on Hold” analysis',
      instructions: `<p>This is a <strong>practice screen</strong> (a simplified simulation of the analysis wizard, not Oracle’s real page). Leo wants a similar analysis for the <strong>UK</strong> business: invoices on hold, by supplier, saved for the whole UK team. Make the right choices.</p>`,
      formTitle: 'New analysis (practice)',
      fields: [
        { label: 'Subject area', type: 'select', options: ['Payables Invoices - Transactions Real Time', 'Payables Payments - Disbursements Real Time', 'General Ledger - Journals Real Time', 'Payables Invoices - Holds Real Time'], answer: 'Payables Invoices - Transactions Real Time', hint: 'One of these was retired years ago.' },
        { label: 'Which column is the fact (number)?', type: 'select', options: ['Supplier name', 'Invoice amount', 'Hold name', 'Invoice date'], answer: 'Invoice amount' },
        { label: 'Filter: business unit', type: 'select', options: ['Sunny US BU', 'Sunny UK BU', 'No filter'], answer: 'Sunny UK BU' },
        { label: 'View', type: 'select', options: ['Table and bar chart', 'Check template', 'eText file'], answer: 'Table and bar chart' },
        { label: 'Save in folder', type: 'select', options: ['My Folders > Temp', 'Shared Folders > Custom > Sunny > Payables', 'Shared Folders > Financials (overwrite Oracle’s report)'], answer: 'Shared Folders > Custom > Sunny > Payables' },
      ],
      explain: `<p>Hold information now lives in Payables Invoices - Transactions Real Time. The invoice amount is the fact. Filtering on Sunny UK BU keeps the query small and relevant. OTBI produces tables and charts (checks and eText files are Analytics Publisher outputs). Shared content belongs in Shared Folders &gt; Custom; Temp is purged every 24 hours.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: build an analysis with the wizard',
      items: [
        'Go to <kbd>Navigator</kbd> &gt; <kbd>Tools</kbd> &gt; <kbd>Reports and Analytics</kbd>.',
        'Click <kbd>Create</kbd> and select <kbd>Analysis</kbd>. Choose a subject area and click <kbd>Continue</kbd>.',
        '<strong>Select Columns</strong> page: expand folders and pick columns. Optionally add more subject areas.',
        '<strong>Select Views</strong> page: choose a table, a graph, or both.',
        '<strong>Edit Table / Edit Graph</strong> pages: adjust the layout.',
        '<strong>Sort and Filter</strong> page: add filters (always filter — for example by business unit and date) and sorting.',
        '<strong>Highlight</strong> page: optional color rules based on thresholds.',
        '<strong>Save</strong> page: name it, choose a folder, click <kbd>Submit</kbd>.',
      ],
      note: `<p>Labels and pages can differ slightly by release and in Redwood pages. Power users can also use the full editor, with a <strong>Criteria</strong> tab (columns and filters) and a <strong>Results</strong> tab (views), plus <strong>prompts</strong> so users choose values like the period when they run it.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the wizard pages in order',
      instructions: `<p>After you pick a subject area, the analysis wizard walks you through several pages. Put them in order.</p>`,
      items: ['Select Columns', 'Select Views', 'Edit Table / Edit Graph', 'Sort and Filter', 'Highlight', 'Save'],
      explain: `<p>First choose <em>what</em> data (columns), then <em>how</em> to show it (views and their layout), then narrow and order it (sort and filter), add color rules (highlight), and finally save it to a catalog folder.</p>`,
    },
    {
      type: 'text',
      heading: 'Dashboards, prompts, exports and alerts',
      html: `<ul>
<li><strong>Dashboards</strong> gather several analyses on one page — for example, Ava’s “Payables Morning Check” with holds, approvals and upcoming payments. A <strong>dashboard prompt</strong> lets the viewer filter everything at once, such as choosing the business unit.</li>
<li><strong>Drill-down.</strong> Columns can be set to drill to the next level, and some can navigate straight to the transaction in Fusion.</li>
<li><strong>Export.</strong> Results can be exported to formats such as PDF, Excel, PowerPoint, CSV and XML.</li>
<li><strong>Agents</strong> (part of the Delivers feature — not the same as the new AI agents!) can run an analysis on a schedule and deliver the content or a notification.</li>
</ul>`,
    },
    {
      type: 'text',
      heading: 'Where to save: Shared Folders, Custom and My Folders',
      html: `<p>Everything lives in the <strong>BI catalog</strong>, organized by product family (for example Financials &gt; Payables).</p>
<ul>
<li><strong>Shared Folders &gt; Custom</strong> — the place for analyses you build or change for <em>others</em> to use. Oracle recommends keeping all modified content here, because quarterly updates can change predefined objects outside Custom, and you could lose edits saved elsewhere.</li>
<li><strong>My Folders</strong> — your private space; only you can see it.</li>
<li><strong>My Folders &gt; Temp</strong> — do <em>not</em> save here. It is cleaned out automatically every 24 hours.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Security: same report, different rows',
      html: `<p>OTBI follows the same security as Oracle Fusion Financials. Two layers decide what you see:</p>
<ul>
<li><strong>Function security</strong> — your job role must include a duty role that allows the subject area. For Payables Invoices - Transactions Real Time, Oracle lists job roles such as <em>Accounts Payable Specialist</em>, <em>Accounts Payable Supervisor</em>, <em>Accounts Payable Manager</em> and <em>General Accountant</em>, through duty roles such as <em>Payables Invoice Transaction Analysis Duty</em>.</li>
<li><strong>Data security</strong> — even with access, you only see rows for the business units or ledgers you are allowed. If Ava only has access to <em>Sunny US BU</em>, Ava will never see Sunny UK BU invoices in the analysis, even though both are in the same subject area.</li>
</ul>
<p>This is why “it works for me but not for you” is so common with reports — usually it is a security difference, not a broken report.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips from report builders',
      html: `<ul>
<li><strong>Filter early.</strong> OTBI reads the live system. A filter on business unit and date keeps it fast and polite to everyone else.</li>
<li><strong>Do not use OTBI as a data pump.</strong> Exporting millions of rows every night is not what it is for; companies use data extraction tools or Oracle Fusion Data Intelligence for big data feeds.</li>
<li><strong>Name things clearly</strong> and keep a folder structure like Custom &gt; Company &gt; Module.</li>
<li><strong>Re-test after each quarterly update.</strong> Column names and subject areas occasionally change.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Analysis', def: 'An OTBI report made of selected columns shown as a table, chart or both.' },
        { term: 'Subject area', def: 'A collection of related columns about one business topic that you choose as the starting point of an analysis.' },
        { term: 'Fact column', def: 'A column with numbers that can be added up, such as an amount.' },
        { term: 'Attribute column', def: 'A column that describes something, such as a supplier name, date or ID.' },
        { term: 'Dashboard', def: 'A page that gathers several analyses and prompts in one place.' },
        { term: 'Prompt', def: 'A filter question the viewer answers when running an analysis or dashboard, such as which period to show.' },
        { term: 'Data security', def: 'Rules that limit which rows (for example which business units) a person can see.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Why are OTBI answers called “real time”?',
          options: ['Because they are emailed every hour', 'Because OTBI reads the live transaction data in Fusion', 'Because they only work during business hours', 'Because they are copied to a warehouse each night'],
          answer: 1,
          explain: 'OTBI queries the live transactional data through subject areas, so changes show up almost immediately.',
        },
        {
          q: 'What do you choose first when creating an OTBI analysis?',
          options: ['A printer', 'A subject area', 'A bank account', 'A layout template in Word'],
          answer: 1,
          explain: 'Every analysis starts with a subject area; then you pick columns from its folders.',
        },
        {
          q: 'Where should Ava save an analysis that the whole Payables team will use?',
          options: ['My Folders > Temp', 'Shared Folders > Custom', 'Only on a personal laptop', 'Inside the predefined Oracle folder, overwriting the original'],
          answer: 1,
          explain: 'Shared Folders > Custom is for content shared with others and protects it during updates. Temp is purged every 24 hours.',
        },
        {
          q: 'Omar runs Ava’s analysis and sees fewer invoices than Ava. What is the most likely reason?',
          options: ['The analysis is broken', 'Different roles and data security give them access to different business units', 'OTBI shows random rows', 'Omar’s screen is smaller'],
          answer: 1,
          explain: 'OTBI follows Fusion security, so people with different data access see different rows from the same analysis.',
        },
        {
          q: 'An invoice amount is which type of column?',
          options: ['Attribute', 'Fact', 'Hierarchy', 'Prompt'],
          answer: 1,
          explain: 'Facts are numeric measures you can total. Supplier name would be an attribute.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Overview of Transactional Business Intelligence', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/overview-of-transactional-business-intelligence.html' },
    { title: 'How Data Is Structured for Analytics', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/how-data-is-structured-for-analytics.html' },
    { title: 'Create and Edit Analyses Using a Wizard', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/create-and-edit-analyses-using-a-wizard.html' },
    { title: 'View Analytics, Reports, and Dashboards', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/view-analytics-reports-and-dashboards.html' },
    { title: 'Where to Save Analytics and Reports', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/occar/where-to-save-analytics-and-reports.html' },
    { title: 'Payables Subject Areas, Folders, and Attributes', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-subject-areas-folders-and-attributes.html' },
    { title: 'Payables Invoices - Transactions Real Time (subject area reference)', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofb/Payables-Invoices-Transactions-Real-Time-SA-193.html' },
    { title: 'Create Your First Analysis', publisher: 'Oracle Help Center (OTBI)', url: 'https://docs.oracle.com/en/cloud/saas/otbi/otbi-user/create-your-first-analysis.html' },
  ],
};
