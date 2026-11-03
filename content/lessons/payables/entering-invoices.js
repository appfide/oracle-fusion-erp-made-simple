export default {
  slug: 'entering-invoices',
  title: 'Getting Invoices Into the System',
  minutes: 18,
  summary:
    'Invoices reach Oracle Fusion Payables in many ways: typed by hand, uploaded from a spreadsheet, read from emailed PDFs by AI, submitted by suppliers in the Supplier Portal, sent electronically, or imported in bulk. Learn every channel, the four parts of an invoice, and how Oracle stops the same invoice being entered twice.',
  objectives: [
    'Compare the main ways invoices are entered in Oracle Fusion Payables and when each is best',
    'Describe the four parts of an invoice: header, lines, distributions and installments',
    'Explain how distribution sets and payment terms fill in accounts and due dates automatically',
    'Describe how invoice import works (interface tables, Import Payables Invoices, correcting errors)',
    'Explain how Oracle helps prevent duplicate invoices',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'How letters reach your house',
      html: `<p>Letters reach your home in many ways. The postman brings paper letters. Grandma sends an email. Your teacher posts a note on the school app. Sometimes your dad types a reminder into the family calendar himself.</p>
<p>No matter how a message arrives, it ends up in the same place: the family to-do list. <span class="hl">Supplier invoices are the same.</span> They arrive by post, by email, through a website or from another computer — but in Oracle Fusion they all end up as the same kind of record in Payables, ready to be checked and paid.</p>`,
    },
    {
      type: 'text',
      heading: 'Many doors, one room',
      html: `<p>A company like Sunny might get 20 invoices a month; a big company might get 200,000. Typing every invoice by hand would be slow and full of mistakes, so Oracle offers several “doors” into Payables. Modern AP teams try to push as many invoices as possible through the <strong>automatic</strong> doors and keep manual typing for the exceptions.</p>`,
    },
    {
      type: 'table',
      caption: 'Ways to get invoices into Oracle Fusion Payables',
      headers: ['Channel', 'How it works', 'Best for'],
      rows: [
        ['<strong>Manual entry</strong> (Create Invoice page)', 'An AP specialist types the invoice on the Create Invoice page, often entering a PO number in the <kbd>Identifying PO</kbd> field so details fill in automatically.', 'Low volumes, unusual invoices, corrections.'],
        ['<strong>Spreadsheet</strong> (Create Invoice in Spreadsheet)', 'An Excel workbook connected to Oracle. You type many invoices in rows, upload them, and can submit the import process from the spreadsheet.', 'Many simple invoices with similar lines.'],
        ['<strong>Invoice imaging and Intelligent Document Recognition (IDR)</strong>', 'Suppliers (or your mailroom) email PDF or image invoices to a designated email address. Oracle reads them, extracts the details and creates invoices automatically.', 'High volumes of paper and PDF invoices.'],
        ['<strong>Supplier Portal</strong>', 'Suppliers sign in and create their own invoices, matched to POs or not.', 'Suppliers who work closely with you; reduces AP typing.'],
        ['<strong>Electronic invoices (B2B / e-invoicing)</strong>', 'Suppliers send structured XML invoices through Oracle Business Network or a partner; Oracle’s Collaboration Messaging Framework turns them into Payables invoices.', 'Large suppliers and countries that require e-invoicing.'],
        ['<strong>File-based data import (FBDI)</strong>', 'Fill in the Payables Standard Invoice Import template, load it, and run Import Payables Invoices.', 'Bulk loads from other systems, data migration.'],
        ['<strong>REST API</strong>', 'Another computer program creates invoices through the Invoices REST API.', 'Real-time integrations with other software.'],
      ],
    },
    {
      type: 'slides',
      title: 'A closer look at the automatic channels',
      slides: [
        {
          icon: '📧',
          title: 'IDR: invoices from email',
          html: `<p>Every Oracle Cloud customer gets a <strong>designated email address</strong> for invoice images. Suppliers email invoices there (or the mailroom scans paper and forwards it). Oracle picks them up, uses machine learning to find the supplier, invoice number, date, amount, lines and more, and creates the invoice. It doesn’t need a template per supplier — it looks for the data wherever it is on the page.</p>`,
        },
        {
          icon: '🧩',
          title: 'IDR: when it can’t read everything',
          html: `<p>If something is missing or unclear, the invoice is created as <strong>Incomplete</strong> and appears in the <strong>Scanned</strong> infotile on the Invoices landing page. Ava fixes it in an <strong>interactive viewer</strong> by clicking on the right value in the image. IDR <strong>learns</strong> from those corrections, so the next invoice from that supplier is read better. Fully recognized invoices show as <strong>Not Validated</strong>, ready for validation.</p>`,
        },
        {
          icon: '🤖',
          title: 'New: Payables Agent',
          html: `<p>Since release 26B, Oracle’s generative-AI <strong>Payables Agent</strong> brings a new ingestion engine called <strong>Document IO</strong>, which replaces the older IDR recognition engine for supplier invoices. It adds multilingual recognition, e-invoice ingestion, “streams” of incoming documents and an <strong>Invoice List</strong> page for exceptions. The idea is the same — fewer invoices typed by people — but labels and screens are newer.</p>`,
        },
        {
          icon: '🔌',
          title: 'Electronic (B2B) invoices',
          html: `<p>Suppliers upload XML invoices to Oracle Business Network. Oracle’s <strong>Collaboration Messaging Framework</strong> converts them and places them in the Payables interface tables, and the <strong>Import Payables Invoices</strong> process (source “B2B XML invoice”) creates the invoices. Many supplier errors (like an invalid PO number) are emailed back to the supplier automatically to fix and resend.</p>`,
        },
        {
          icon: '📥',
          title: 'Bulk import (FBDI)',
          html: `<p>Download <code>PayablesStandardInvoiceImportTemplate.xlsm</code>, fill in the invoice header and invoice line worksheets, generate a file, load it with <strong>Load Interface File for Import</strong>, then run <strong>Import Payables Invoices</strong>. Rejected rows are fixed in the <strong>Correct Import Errors</strong> spreadsheet and imported again. The Data module’s FBDI lesson shows this in detail.</p>`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Import Payables Invoices process',
      html: `<p>Every “bulk” door (spreadsheet, B2B, FBDI, imaging) finally passes through the same scheduled process, <strong>Import Payables Invoices</strong>. It reads invoice records from two interface tables (<code>AP_INVOICES_INTERFACE</code> for headers and <code>AP_INVOICE_LINES_INTERFACE</code> for lines) and turns valid ones into real invoices. Important parameters include <strong>Business Unit</strong>, <strong>Source</strong> (for example External or Spreadsheet), <strong>Import Set</strong>, <strong>Invoice Group</strong>, an optional <strong>Hold</strong> to put on every imported invoice, <strong>Accounting Date</strong> and <strong>Purge</strong>. It produces a report listing what was imported and what was rejected, and why.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Pick the best channel',
      instructions: `<p>Match each situation to the channel that fits it best.</p>`,
      pairs: [
        { left: 'A supplier emails 300 PDF invoices a month', right: 'Invoice imaging / IDR' },
        { left: 'Moving 5,000 open invoices from an old system at go-live', right: 'File-based data import (FBDI)' },
        { left: 'A large supplier wants to send structured XML invoices', right: 'Electronic (B2B) invoices' },
        { left: 'A small supplier is happy to type its own invoices against Sunny’s POs', right: 'Supplier Portal' },
        { left: 'Another company program must create invoices in real time', right: 'Invoices REST API' },
        { left: 'One unusual invoice with a handwritten correction', right: 'Manual entry (Create Invoice)' },
      ],
      explain: `<p>Volume and format decide the channel: emailed images → <strong>IDR</strong>; bulk loads → <strong>FBDI</strong>; structured data from big suppliers → <strong>B2B</strong>; supplier self-service → <strong>Supplier Portal</strong>; system-to-system → <strong>REST API</strong>; odd one-offs → <strong>manual entry</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'The four parts of every invoice',
      html: `<p>However it arrives, every Oracle Fusion invoice has the same shape:</p>
<ol>
<li><strong>Header</strong> – facts about the whole invoice: business unit, supplier and supplier site, invoice number, invoice date, invoice amount, currency, invoice type, payment terms, and optionally an identifying PO and an invoice group.</li>
<li><strong>Lines</strong> – what was bought. Line types are <strong>Item</strong> (goods and services), <strong>Freight</strong> (delivery charges), <strong>Miscellaneous</strong> (other charges, like installation) and <strong>Prepayment</strong> (created automatically when a prepayment is applied). Freight and miscellaneous lines can be <strong>allocated</strong> to item lines. Tax is handled in a separate <strong>Taxes</strong> section and tax lines are calculated by Oracle.</li>
<li><strong>Distributions</strong> – the accounting for each line: which account combination is charged, the accounting date, and project details if any. Distributions are what turn into journal entries.</li>
<li><strong>Installments</strong> – when and how much to pay: due dates, due amounts, discount dates and payment method. They come from the <strong>payment terms</strong>. An invoice can have one or many installments.</li>
</ol>`,
    },
    {
      type: 'flow',
      title: 'How an invoice is built',
      steps: [
        { icon: '🧾', label: 'Header', detail: 'Sweet Sugar Co., invoice SS-778, 1 March, $210, Net 30.' },
        { icon: '📋', label: 'Lines', detail: 'Item line: sugar $200. Freight line: $10, allocated to the sugar line.' },
        { icon: '📒', label: 'Distributions', detail: 'Sugar $210 to 101-200-5120-010-000 (Kitchen, Sugar Cost, Classic Lemonade).' },
        { icon: '📅', label: 'Installment', detail: 'One installment of $210 due 31 March.' },
      ],
      note: `<p>Ava typed only the header and two lines. The distributions and the installment were created by Oracle from the allocation, the supplier site defaults and the payment terms.</p>`,
    },
    {
      type: 'text',
      heading: 'Where do the accounts and due dates come from?',
      html: `<p><strong>Distributions</strong> are created in four ways:</p>
<ul>
<li>automatically when you <strong>match</strong> to a purchase order, receipt or consumption advice (accounts come from the PO),</li>
<li>automatically from a <strong>distribution set</strong> — a saved rule for unmatched invoices, which can be a <em>100% set</em> with fixed percentages (for example 70% Kitchen, 30% Administration) or a <em>0% set</em> that lists the accounts and lets you type the amounts,</li>
<li>automatically when <strong>freight and miscellaneous</strong> charges are allocated to item lines,</li>
<li>or <strong>manually</strong> on the Manage Distributions page.</li>
</ul>
<p>A default distribution set can be placed on the supplier site, so every electricity bill from Bright Power Utility automatically goes to <code>6120 Electricity</code>.</p>
<p><strong>Installments</strong> come from the <strong>payment terms</strong> and the <strong>terms date</strong>. With Net 30 and a terms date of 1 March, the due date is 31 March. If the supplier delivers half the order, an installment can be <strong>split</strong> and one part put on hold. You will learn more about payment terms in the payment setup lesson.</p>`,
    },
    {
      type: 'journal',
      title: 'Sweet Sugar Co. invoice, once validated and accounted',
      lines: [
        { account: '5120 Sugar Cost', debit: 210, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 210 },
      ],
      note: `<p>The $10 freight was allocated to the sugar line, so it is part of the sugar cost. If Sunny’s setup instead charged freight to its own account, there would be two debit lines. (Full combination: <code>101-200-5120-010-000</code> debit, and Sunny US’s liability account <code>101-100-2110-000-000</code> credit; the liability account comes from the supplier site or the Payables setup.)</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: enter the Sweet Sugar Co. invoice',
      instructions: `<p>This is a simplified practice screen, not Oracle’s real page. Use the paper invoice below to fill in the header, the two lines and the distribution.</p>
<p><strong>Sweet Sugar Co.</strong> — Invoice <strong>SS-778</strong> — dated <strong>1 March 2026</strong> — bill to Sunny Lemonade US Inc.<br>Sugar for Classic Lemonade: $200.00<br>Delivery charge: $10.00<br><strong>Total due: $210.00</strong> — Terms: Net 30</p>`,
      formTitle: 'Create Invoice (practice)',
      fields: [
        { label: 'Business unit', type: 'select', options: ['Sunny US BU', 'Sunny UK BU'], answer: 'Sunny US BU' },
        { label: 'Supplier', type: 'select', options: ['Lemon Grove Farms', 'Sweet Sugar Co.', 'Cup & Straw Supply'], answer: 'Sweet Sugar Co.' },
        { label: 'Invoice number', type: 'text', answer: 'SS-778', hint: 'Type it exactly as the supplier wrote it.' },
        { label: 'Invoice type', type: 'select', options: ['Standard', 'Credit memo', 'Prepayment'], answer: 'Standard' },
        { label: 'Invoice date', type: 'date', answer: '2026-03-01' },
        { label: 'Invoice amount', type: 'number', answer: 210 },
        { label: 'Payment terms', type: 'select', options: ['Immediate', 'Net 30', '2/10 Net 30'], answer: 'Net 30' },
        { label: 'Line 1 type', type: 'select', options: ['Item', 'Freight', 'Miscellaneous'], answer: 'Item' },
        { label: 'Line 1 amount', type: 'number', answer: 200 },
        { label: 'Line 2 type', type: 'select', options: ['Item', 'Freight', 'Miscellaneous'], answer: 'Freight' },
        { label: 'Line 2 amount', type: 'number', answer: 10 },
        { label: 'Distribution for line 1 (Company-Cost Center-Account-Product-Intercompany)', type: 'select', options: ['101-200-5120-010-000', '101-200-5110-010-000', '101-100-2110-000-000', '201-200-5120-010-000'], answer: '101-200-5120-010-000' },
      ],
      explain: `<p>The header uses the supplier’s own invoice number <strong>SS-778</strong>, type <strong>Standard</strong>, amount <strong>$210</strong> and <strong>Net 30</strong>. The sugar is an <strong>Item</strong> line and the delivery charge a <strong>Freight</strong> line (which can be allocated to the sugar line). Sugar for Classic Lemonade in the US kitchen is <strong>101-200-5120-010-000</strong>; 5110 is lemons, 2110 is the liability, and company 201 is the UK.</p>`,
    },
    {
      type: 'lab',
      tool: 'payment-terms',
      title: 'Lab: when is the sugar invoice due?',
      intro: `<p>The Sweet Sugar Co. invoice is dated 1 March 2026 for $210 with terms <strong>Net 30</strong> (no discount). Check the due date Oracle would put on the installment. Then imagine the supplier offered <strong>2/10 Net 30</strong>: change the discount to 2% and 10 days and see the discount date and amount.</p>`,
      preset: { invoiceDate: '2026-03-01', amount: 210, netDays: 30, discountPct: 0, discountDays: 0, payDate: '2026-03-31' },
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: enter a simple invoice by hand',
      items: [
        'Go to <kbd>Payables</kbd> &gt; <kbd>Invoices</kbd> and click the <kbd>Create Invoice</kbd> task.',
        'In the header, choose the <kbd>Business Unit</kbd>, <kbd>Supplier</kbd> and <kbd>Supplier Site</kbd>. If the invoice has a PO, enter it in <kbd>Identifying PO</kbd> instead and let Oracle fill in the supplier.',
        'Enter the <kbd>Number</kbd>, <kbd>Amount</kbd>, <kbd>Type</kbd> (Standard), <kbd>Date</kbd> and check the <kbd>Payment Terms</kbd>.',
        'In the <kbd>Lines</kbd> section, add an Item line for the goods and, if needed, a Freight line. For unmatched lines, enter a distribution combination or a distribution set.',
        'Save. Then use the <kbd>Validate</kbd> action to have Oracle calculate tax, create distributions and check for holds.',
        'Review the distributions and the installments to confirm the accounts and the due date.',
      ],
      note: `<p>Field names and layout vary by release and between the classic and Redwood invoice pages, and your company may make extra fields required (for example an invoice group). You need a Payables role with access to the business unit.</p>`,
    },
    {
      type: 'text',
      heading: 'Stopping duplicate invoices',
      html: `<p>Paying the same invoice twice is one of the most expensive AP mistakes. Oracle Fusion has several layers of protection:</p>
<ul>
<li><strong>Unique invoice number per supplier.</strong> Oracle won’t create a second invoice with the same number for the same supplier. Import rejects such records too.</li>
<li><strong>An extra duplicate check</strong> that looks at the <em>combination</em> of supplier, invoice type, amount, currency and date — catching duplicates even when the invoice number was typed slightly differently (like “SS-778” and “SS778”). It is switched on through a Payables lookup (<code>ADD_DUPLICATE_INV_CHECK</code>).</li>
<li><strong>A duplicate invoice hold during validation</strong>, controlled by the <strong>Enable duplicate invoice hold during validation</strong> invoice option, which can re-check and release the hold if the duplicate condition goes away.</li>
<li><strong>Good habits:</strong> one channel per supplier (don’t accept the same invoice by email <em>and</em> post), and always type the invoice number exactly as the supplier wrote it.</li>
</ul>`,
    },
    {
      type: 'example',
      title: 'Ava’s mixed inbox',
      html: `<p>It is the first week of April. Here is how Sunny’s invoices arrive:</p>`,
      steps: [
        'Lemon Grove Farms emails its PDF invoice to Sunny’s designated invoice email. IDR reads it, finds PO 2001 and creates the invoice. It shows as <strong>Not Validated</strong> — nothing for Ava to type.',
        'Bright Power Utility posts a paper bill. Ava scans it and forwards the image to the same email. IDR can’t read the faded invoice date, so the invoice lands in the <strong>Scanned</strong> infotile as Incomplete. Ava clicks the date in the viewer to fix it.',
        'Stand Builders LLC logs into the <strong>Supplier Portal</strong> and creates an invoice matched to its PO for the new stand.',
        'Sweet Sugar Co. emails a PDF and <em>also</em> posts a paper copy of invoice SS-778. When Ava tries to enter the paper copy, Oracle warns that SS-778 already exists for this supplier. Ava shreds the copy.',
        'Jordan uses FBDI to import 40 old open invoices from Sunny’s previous accounting system during the go-live weekend.',
      ],
      result: `<p>Five channels, one destination. Ava only typed one date — and the duplicate check stopped a double payment.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: measure your channels',
      html: `<p>AP managers track what percentage of invoices arrives through each channel and how many need manual touches. A common goal is to move suppliers from paper to email/IDR, then to the Supplier Portal or e-invoicing. Every invoice that arrives as data instead of paper is faster, cheaper and less error-prone.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Intelligent Document Recognition (IDR)', def: 'Oracle’s service that reads emailed invoice images and PDFs and creates invoices from them, learning from corrections.' },
        { term: 'Incomplete invoice', def: 'An invoice created from an image that has missing or invalid data and must be completed by a person.' },
        { term: 'Import Payables Invoices', def: 'The scheduled process that turns invoice records in the interface tables into real Payables invoices.' },
        { term: 'Invoice distribution', def: 'The accounting detail for an invoice line, including the account combination and accounting date.' },
        { term: 'Distribution set', def: 'A saved rule that automatically creates distributions for unmatched invoices, with or without fixed percentages.' },
        { term: 'Installment', def: 'The part of an invoice that says how much is due and when, based on the payment terms.' },
        { term: 'Invoice group', def: 'A named batch of invoices that can be used to validate, report on or pay them together.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'An emailed invoice could not be fully read by IDR. Where does Ava find it?',
          options: ['In the Payments infotile', 'In the Scanned infotile on the Invoices landing page, as Incomplete', 'It is automatically deleted', 'In the General Ledger'],
          answer: 1,
          explain: 'Invoices with missing or unclear data are created as incomplete and listed in the Scanned infotile so a specialist can complete them.',
        },
        {
          q: 'Which part of an invoice tells Oracle which accounts to charge?',
          options: ['The header', 'The installments', 'The distributions', 'The supplier contact'],
          answer: 2,
          explain: 'Distributions hold the account combination and accounting date; they become the accounting entries.',
        },
        {
          q: 'Which process finally creates invoices from the interface tables for FBDI, spreadsheet and B2B channels?',
          options: ['Validate Payables Invoices', 'Import Payables Invoices', 'Create Accounting', 'Initiate Invoice Approval Workflow'],
          answer: 1,
          explain: 'Import Payables Invoices reads AP_INVOICES_INTERFACE and AP_INVOICE_LINES_INTERFACE and creates invoices from valid records.',
        },
        {
          q: 'Rent should always be split 70% Kitchen and 30% Administration. What setup creates those distributions automatically?',
          options: ['A 100% distribution set', 'A payment term', 'A supplier contact', 'An invoice group'],
          answer: 0,
          explain: 'A 100% (percentage) distribution set allocates the invoice amount across accounts using fixed percentages.',
        },
        {
          q: 'An invoice number was typed as “SS778” instead of “SS-778”. Which feature can still catch the duplicate?',
          options: [
            'Nothing can catch it',
            'The extra duplicate check that compares supplier, type, amount, currency and date',
            'The payment terms',
            'The Recent infotile',
          ],
          answer: 1,
          explain: 'The optional duplicate check looks at a combination of attributes, not only the invoice number.',
        },
      ],
    },
  ],
  sources: [
    { title: 'How Invoice Components Fit Together (Using Payables Invoice to Pay, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoice-components-fit-together.html' },
    { title: 'Invoice Line Types', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-line-types.html' },
    { title: 'Invoice Distributions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-distributions.html' },
    { title: 'Invoice Installments', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-installments.html' },
    { title: 'Distribution Sets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/distribution-sets.html' },
    { title: 'Considerations for Creating Invoices in a Spreadsheet', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/considerations-for-creating-invoices-in-a-spreadsheet.html' },
    { title: 'Integrated Invoice Imaging', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-integrated-invoice-imaging-works-for-oracle-cloud.html' },
    { title: 'Intelligent Document Recognition', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/intelligent-document-recognition.html' },
    { title: 'How Electronic Invoices Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-electronic-invoices-are-processed.html' },
    { title: 'How Payables Standard Invoice Import Data Is Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-payables-standard-invoice-import-data-is-processed.html' },
    { title: 'Invoice Open Interface Table AP_INVOICES_INTERFACE', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-open-interface-table-ap-invoices-interface.html' },
    { title: 'How can I find duplicate invoices without considering the invoice number as the only check?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-can-i-find-duplicate-invoices-without-considering-the.html' },
    { title: 'Guidelines For Invoice Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-invoice-options.html' },
    { title: 'Payables Agent for Invoice Ingestion, Compliance, and Control (26B What’s New)', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26b/fins26b/26B-fin-wn-f43769.htm' },
    { title: 'Create an Invoice (Invoices REST API)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/farfa/op-invoices-post.html' },
  ],
};
