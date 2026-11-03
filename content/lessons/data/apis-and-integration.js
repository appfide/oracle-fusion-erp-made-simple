export default {
  slug: 'apis-and-integration',
  title: 'REST APIs and Talking to Other Systems',
  minutes: 17,
  summary:
    'Oracle Fusion talks to other systems through REST APIs, SOAP web services, business events and Oracle Integration. Learn what each one is in plain words — with the Payables invoices REST resource, automated FBDI loads, event-driven flows, Visual Builder extensions and how integrations are kept secure.',
  objectives: [
    'Explain what an API is and what REST requests like GET and POST do',
    'Describe the Payables invoices REST resource in simple terms',
    'Explain business events and how Oracle Integration reacts to them',
    'Describe how bulk loads (FBDI) can be automated with ErpIntegrationService and Oracle Integration',
    'Name the basic security rules for integrations',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The restaurant waiter',
      html: `<p>In a restaurant you do not walk into the kitchen and cook. You read the <strong>menu</strong>, tell the <strong>waiter</strong> what you want in a set way (“one lemonade, large, no ice”), and the waiter brings it back. If you ask for something not on the menu, the waiter politely says no.</p>
<p>An <strong>API</strong> (Application Programming Interface) is that waiter for computer systems. Another system does not “walk into” Oracle Fusion’s database. It sends a request in a fixed format to an address on the menu, and Fusion answers — <span class="hl">but only with what the menu allows and only for guests who showed the right ticket</span> (security).</p>`,
    },
    {
      type: 'text',
      heading: 'Why systems need to talk',
      html: `<p>No company runs on one system alone. Sunny Lemonade also has a supplier portal, a point-of-sale system at the stands, Big River Bank’s systems, and a payroll provider. Without integrations, people would retype data between them — slow and error-prone, exactly the problem an ERP was meant to solve.</p>
<p>Oracle Fusion offers several ways to connect:</p>
<ul>
<li><strong>REST APIs</strong> — small, quick requests about individual records (create one invoice, read one supplier). Real time.</li>
<li><strong>SOAP web services</strong> — an older style of API. Oracle still uses one important SOAP service, <strong>ErpIntegrationService</strong>, to automate bulk file loads.</li>
<li><strong>File-based loads</strong> (FBDI) — big files, as you learned in “Getting Lots of Data In”.</li>
<li><strong>Business events</strong> — Fusion announces “something happened!”, and other systems can react.</li>
<li><strong>Oracle Integration</strong> (often called OIC) — Oracle’s integration platform that connects the pieces without writing everything from scratch.</li>
</ul>`,
    },
    {
      type: 'slides',
      title: 'REST in five words: address, verb, data, answer, ticket',
      slides: [
        { icon: '📍', title: 'Address (resource)', html: `<p>Each kind of record has a web address called a <strong>resource</strong>. Payables invoices live at:<br><code>/fscmRestApi/resources/11.13.18.05/invoices</code><br>(added to your company’s Fusion web address). The number is the API version.</p>` },
        { icon: '🗣️', title: 'Verb (method)', html: `<p><strong>GET</strong> = read (“Get all invoices”). <strong>POST</strong> = create (“Create an invoice”). <strong>PATCH</strong> = change part of a record. <strong>DELETE</strong> = remove (only where allowed).</p>` },
        { icon: '📦', title: 'Data (JSON)', html: `<p>Data travels as <strong>JSON</strong>, a simple text format of names and values, such as <code>"InvoiceNumber": "LGF-1043"</code> and <code>"InvoiceAmount": 500</code>.</p>` },
        { icon: '📬', title: 'Answer (response)', html: `<p>Fusion replies with a status code (success or a reason for failure) and data — for example the new invoice with its ID.</p>` },
        { icon: '🎟️', title: 'Ticket (authentication)', html: `<p>Every request must prove who is calling. Oracle supports basic authentication over a secure (SSL) connection, SAML bearer tokens and <strong>OAuth 2.0</strong> tokens. The caller also needs roles that allow the action.</p>` },
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match the REST verb',
      instructions: `<p>Sunny’s developer is building connections. Match each need to the REST method.</p>`,
      pairs: [
        { left: 'Read the list of invoices for Lemon Grove Farms', right: 'GET' },
        { left: 'Create a new $500 invoice from the supplier portal', right: 'POST' },
        { left: 'Change only the description of an existing invoice', right: 'PATCH' },
        { left: 'Remove a record that is allowed to be deleted', right: 'DELETE' },
      ],
      explain: `<p>GET reads, POST creates, PATCH updates part of a record and DELETE removes. Oracle’s REST documentation lists, for each resource, which methods are supported — not every resource allows every method.</p>`,
    },
    {
      type: 'example',
      title: 'Lemon Grove Farms sends invoices by API',
      html: `<p>Lemon Grove Farms now invoices Sunny electronically. Instead of emailing PDFs, its billing system (through Sunny’s integration) sends a <strong>POST</strong> request to the Payables <code>invoices</code> resource. A simplified body looks like this:</p>
<p><code>{ "InvoiceNumber": "LGF-1043", "InvoiceAmount": 500, "InvoiceCurrency": "USD", "InvoiceDate": "2026-02-02", "BusinessUnit": "Sunny US BU", "Supplier": "Lemon Grove Farms", "SupplierSite": "MAIN", "Description": "1,000 lemons" }</code></p>`,
      steps: [
        'Fusion checks the caller’s credentials and roles. The integration user is allowed to create invoices for Sunny US BU only.',
        'Fusion checks the data (supplier, site, business unit, required fields — some can default from setup) and creates the invoice, replying with its new ID.',
        'The invoice then follows the normal life: validation, holds, approval, accounting and payment.',
        'Every evening, Sunny’s portal uses <strong>GET</strong> to read back the status of its invoices, so Lemon Grove Farms can see what has been paid.',
      ],
      result: `<p>No retyping, no PDFs, and the same controls as a manually entered invoice. Real requests often include more fields (such as lines and payment details); the REST API guide lists them all.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Does an API change the accounting?',
      instructions: `<p>The $500 invoice LGF-1043 came in through the REST API, unmatched to a purchase order, coded to Lemons Cost. When Create Accounting runs, what journal does Payables create?</p>`,
      accounts: ['5110 Lemons Cost', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '4110 Lemonade Sales Revenue', '2120 Received Not Invoiced Accrual'],
      answer: [
        { account: '5110 Lemons Cost', debit: 500, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 500 },
      ],
      explain: `<p>Exactly the same as if Ava had typed it: debit the expense, credit Accounts Payable. The API is just another door into Payables — the accounting rules do not change. Cash moves only when Sunny pays.</p>`,
    },
    {
      type: 'text',
      heading: 'Business events: Fusion taps you on the shoulder',
      html: `<p>Polling (“Is it done yet? Is it done yet?”) wastes effort. Instead, Fusion can publish <strong>business events</strong> when something important happens. Examples Oracle lists for the ERP Cloud adapter include <strong>Payables Invoice Created</strong>, Payables invoice validated or approved events, and <strong>Journal Batch Posting Completed</strong>.</p>
<p>Events must be switched on: Oracle provides an <code>erpBusinessEvents</code> REST resource to enable them, and Payables events also need the profile option <strong>AP: Enable Business Events</strong>. Oracle Integration can then <strong>subscribe</strong> to an event and start a flow automatically.</p>`,
    },
    {
      type: 'flow',
      title: 'An event-driven flow at Sunny',
      steps: [
        { icon: '🧾', label: 'Invoice created', detail: 'A Stand Builders LLC invoice for $6,000 is created in Payables.' },
        { icon: '📣', label: 'Event published', detail: 'Fusion raises the Payables Invoice Created business event.' },
        { icon: '🔌', label: 'OIC listens', detail: 'An Oracle Integration flow subscribed to that event starts.' },
        { icon: '🔎', label: 'Decide', detail: 'The flow sees it is equipment over $5,000.' },
        { icon: '📨', label: 'Act', detail: 'It notifies the fixed assets team so they expect a new asset.' },
      ],
      note: `<p>Nobody had to remember to send an email. The integration reacted the moment the event happened.</p>`,
    },
    {
      type: 'text',
      heading: 'Bulk loads on autopilot: ErpIntegrationService and OIC',
      html: `<p>Remember Ava uploading the 500-invoice FBDI file by hand? That can be automated.</p>
<ul>
<li>The SOAP service <strong>ErpIntegrationService</strong> has operations such as <strong>importBulkData</strong> (upload a file and run the load and import in one call), <strong>uploadFileToUcm</strong>, <strong>submitESSJobRequest</strong>, <strong>getESSJobStatus</strong> and <strong>exportBulkData</strong>. An older operation, <em>loadAndImportData</em>, is deprecated — use importBulkData instead.</li>
<li><strong>Oracle Integration</strong> wraps this in its <strong>Oracle ERP Cloud Adapter</strong>. An integration can call the action <strong>Import Bulk Data into Oracle ERP Cloud</strong>, and a second integration can subscribe to the <strong>ErpImportBulkDataEvent</strong> callback to learn when the import finished and fetch the results.</li>
</ul>
<p>For the other direction — getting large amounts of data <em>out</em> for a data warehouse — Oracle provides data extraction tools. In 26D Oracle added a <strong>Data Extraction Migration Assistant</strong> to help move older BICC (BI Cloud Connector) extracts to a newer model based on read-only replicated data.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Order the automated invoice load',
      instructions: `<p>Jordan builds a nightly Oracle Integration flow for the supplier portal file. Put the steps in order.</p>`,
      items: [
        'OIC picks up the portal’s invoice file at 10 p.m.',
        'OIC turns it into the FBDI zip format',
        'OIC calls Import Bulk Data into Oracle ERP Cloud (importBulkData)',
        'Fusion runs Load Interface File for Import and Import Payables Invoices',
        'Fusion raises the ErpImportBulkDataEvent callback',
        'A callback integration reads the results and emails Ava the rejected rows',
      ],
      explain: `<p>It is the same FBDI journey as before — file, zip, load, import, check errors — but a robot does the clicking and the callback event tells the next integration when Fusion is finished.</p>`,
    },
    {
      type: 'text',
      heading: 'Visual Builder: extending the screens',
      html: `<p>Sometimes the need is not another system but a <em>better screen</em> — an extra field, a simplified page for stand managers, or a small custom app. For the newer Redwood pages, Oracle uses <strong>Oracle Visual Builder Studio</strong>. Changes made with it are called <strong>extensions</strong>; on supported pages an administrator sees an option like <kbd>Edit Page in Visual Builder Studio</kbd>. Extensions sit on top of Oracle’s pages, so they survive quarterly updates far better than changing Oracle’s own code (which customers cannot do in SaaS anyway).</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'API, FBDI or spreadsheet?',
      instructions: `<p>For each Sunny need, pick the best way in.</p>`,
      categories: ['REST API', 'FBDI (possibly automated)', 'ADFdi spreadsheet', 'Business event + OIC'],
      items: [
        { text: 'The supplier portal creates each invoice the moment the supplier submits it', answer: 'REST API' },
        { text: 'Go-live conversion of 20,000 historical customer invoices', answer: 'FBDI (possibly automated)' },
        { text: 'Priya types a 30-line month-end journal by hand', answer: 'ADFdi spreadsheet' },
        { text: 'Tell the kitchen system automatically whenever a journal batch is posted', answer: 'Business event + OIC' },
        { text: 'A payroll file with 5,000 journal lines every month', answer: 'FBDI (possibly automated)' },
        { text: 'The stand app checks whether one invoice has been paid', answer: 'REST API' },
      ],
      explain: `<p>REST suits real-time, record-by-record needs. FBDI suits big volumes, and can be automated with importBulkData and OIC. ADFdi spreadsheets suit a person entering rows in bulk. Business events plus Oracle Integration suit “when X happens, do Y”.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Integration security in kid words',
      html: `<ul>
<li><strong>Give robots their own badge.</strong> Integrations use a dedicated <strong>integration user</strong>, not a person’s login, so nothing breaks when someone goes on holiday or leaves.</li>
<li><strong>Only the keys it needs.</strong> Give the integration user only the roles and data access it needs (for example create invoices for Sunny US BU). Oracle’s Integration docs list roles such as Integration Specialist, data access roles, and SOAOperator for receiving business events.</li>
<li><strong>Prefer tokens.</strong> OAuth 2.0 tokens avoid passing passwords around; always use secure (SSL/HTTPS) connections.</li>
<li><strong>Watch and log.</strong> Monitor failed calls and imports every day, the same way you check scheduled processes.</li>
<li><strong>Test after each quarterly update.</strong> Integrations are part of regression testing.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: where to read more',
      html: `<ul>
<li><strong>REST API for Oracle Fusion Cloud Financials</strong> — every resource (like <code>invoices</code>), its methods, fields and examples, plus a Quick Start on authentication.</li>
<li><strong>SOAP Web Services for Oracle Fusion Cloud Financials</strong> — including ErpIntegrationService.</li>
<li><strong>Oracle Integration: Using the Oracle ERP Cloud Adapter</strong> — events, actions and the integration user setup.</li>
<li><strong>Extending with Visual Builder Studio</strong> in the Applications Common guides.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'API', def: 'Application Programming Interface: a defined way for one system to ask another system to read or change data.' },
        { term: 'REST', def: 'A popular style of web API that uses addresses (resources) and verbs like GET and POST, usually with JSON data.' },
        { term: 'JSON', def: 'A simple text format of names and values used to send data in REST requests and responses.' },
        { term: 'Business event', def: 'A message Fusion publishes when something important happens, such as an invoice being created, so other systems can react.' },
        { term: 'Oracle Integration (OIC)', def: 'Oracle’s platform for building integrations between Fusion and other systems, with ready-made adapters.' },
        { term: 'ErpIntegrationService', def: 'A SOAP web service used to upload files and run bulk imports and exports automatically.' },
        { term: 'Integration user', def: 'A dedicated system account with only the roles an integration needs.' },
        { term: 'Extension', def: 'A change built with Visual Builder Studio on top of Oracle’s pages, such as an added field or a custom page.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which REST method creates a new invoice through the invoices resource?',
          options: ['GET', 'POST', 'DELETE', 'PRINT'],
          answer: 1,
          explain: 'POST on /invoices creates an invoice; GET reads invoices.',
        },
        {
          q: 'What is a business event?',
          options: ['A company party', 'A message Fusion publishes when something happens, like Payables Invoice Created', 'A type of journal', 'A monthly report'],
          answer: 1,
          explain: 'Business events let other systems (often through Oracle Integration) react automatically when something happens in Fusion.',
        },
        {
          q: 'Which ErpIntegrationService operation should be used to upload a file and run a bulk import?',
          options: ['importBulkData', 'loadAndImportData', 'printCheck', 'postJournal'],
          answer: 0,
          explain: 'Oracle marks loadAndImportData as deprecated and recommends importBulkData.',
        },
        {
          q: 'Why should integrations use a dedicated integration user with limited roles?',
          options: ['So they run faster', 'So access is controlled, auditable and does not depend on one person’s login', 'Because people cannot use REST', 'To avoid paying for licenses'],
          answer: 1,
          explain: 'A dedicated user with only the needed roles follows the security idea of least access and keeps integrations working when people change jobs.',
        },
        {
          q: 'An invoice is created through the REST API. Does it skip validation and approval?',
          options: ['Yes, APIs bypass controls', 'No, it follows the same validation, approval and accounting rules', 'Only if it is under $500', 'Only in the UK'],
          answer: 1,
          explain: 'The API is a different door, not a shortcut around the rules.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Get all invoices (REST API for Oracle Fusion Cloud Financials)', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/farfa/op-invoices-get.html' },
    { title: 'Create an invoice (REST API for Oracle Fusion Cloud Financials)', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/farfa/op-invoices-post.html' },
    { title: 'Quick Start (REST API for Oracle Fusion Cloud Financials)', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/farfa/Quick_Start.html' },
    { title: 'Enable Business Events', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/farfa/Enable_Business_Events.html' },
    { title: 'ERP Integration Service (SOAP Web Services for Financials)', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oeswf/erpintegrationservice-d16455e431.html' },
    { title: 'Oracle ERP Cloud Adapter Capabilities', publisher: 'Oracle Help Center (Oracle Integration)', url: 'https://docs.oracle.com/en/cloud/paas/application-integration/erp-adapter/oracle-erp-cloud-adapter-capabilities.html' },
    { title: 'Invoke a File-Based Data Import (FBDI) Job', publisher: 'Oracle Help Center (Oracle Integration)', url: 'https://docs.oracle.com/en/cloud/paas/application-integration/erp-adapter/invoke-file-based-data-import-fbdi-job.html' },
    { title: 'Assign Required Roles to the Integration User', publisher: 'Oracle Help Center (Oracle Integration)', url: 'https://docs.oracle.com/en/cloud/paas/application-integration/erp-adapter/assign-required-roles-integration-user.html' },
    { title: 'Overview of Using Visual Builder Studio', publisher: 'Oracle Help Center (Applications Common 26D)', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oaext/overview-of-using-visual-builder-studio.html' },
    { title: 'Financials What’s New 26D — Data Extraction Migration Assistant', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51362.htm' },
  ],
};
