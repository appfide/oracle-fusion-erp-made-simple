export default {
  slug: 'suppliers',
  title: 'Suppliers: The People We Buy From',
  minutes: 16,
  summary:
    'Before Sunny can order lemons or pay a bill, the supplier must exist in Oracle Fusion. Learn the parts of a supplier profile — addresses, sites, site assignments, contacts, bank accounts and tax details — and how suppliers are registered, imported and kept up to date.',
  objectives: [
    'Describe the parts of an Oracle Fusion supplier profile and how they connect',
    'Explain supplier sites, the procurement business unit that owns them, and site assignments to client business units',
    'Explain where supplier bank accounts and tax information are kept and why they matter to Payables',
    'Compare the ways suppliers get into the system: manual creation, registration, Supplier Portal and import',
    'Name the roles that maintain suppliers and the controls that keep supplier data safe',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Your contacts list, but super detailed',
      html: `<p>On a phone, each friend has a contact card: name, phone number, home address. Now imagine your grandma. She has <em>two</em> houses — one in the city and one by the sea. You send birthday cards to the city house, but presents go to the beach house in summer. And only your mom and your aunt are allowed to send her packages.</p>
<p>A <strong>supplier record</strong> in Oracle Fusion is a contact card like that, but much more detailed. It says <strong>who</strong> the supplier is, <strong>where</strong> they are (addresses), <strong>which of our teams</strong> may buy from each location (sites and site assignments), <strong>who to talk to</strong> (contacts), <strong>where to send money</strong> (bank accounts) and <strong>tax facts</strong>. <span class="hl">If the card is wrong, the money goes to the wrong place.</span></p>`,
    },
    {
      type: 'text',
      heading: 'What is a supplier?',
      html: `<p>A <strong>supplier</strong> (also called a <em>vendor</em>) is any person or company we buy goods or services from. For Sunny Lemonade, that is Lemon Grove Farms (lemons), Sweet Sugar Co. (sugar), Cup & Straw Supply (cups and straws), Bright Power Utility (electricity) and Stand Builders LLC (stands and kitchen equipment).</p>
<p>In Oracle Fusion, suppliers live in the <strong>Procurement</strong> side of the system, but <strong>Payables depends on them completely</strong>. You cannot enter a normal supplier invoice without a supplier and a supplier site, and you cannot pay someone electronically without their bank account. That is why the Payables module starts with suppliers.</p>
<p>One important design idea: Oracle treats a supplier as a <strong>global</strong> record. It is not created inside one business unit. Lemon Grove Farms exists once for the whole Sunny Group. What differs per business unit is the <strong>site</strong> — the relationship each buying organization has with the supplier.</p>`,
    },
    {
      type: 'slides',
      title: 'The four groups of supplier information',
      slides: [
        {
          icon: '🪪',
          title: '1. Profile (who they are)',
          html: `<p>The header and organization details: supplier name, supplier number, supplier type, tax country and taxpayer ID, business classifications (for example, small or diverse business), products and services they sell, and income tax reporting information.</p>`,
        },
        {
          icon: '🏠',
          title: '2. Addresses (where they are)',
          html: `<p>Each physical location of the supplier. An address can have contacts, bank accounts and tax registrations attached. Lemon Grove Farms might have a farm address and a separate office address where invoices come from.</p>`,
        },
        {
          icon: '🏪',
          title: '3. Sites (how we do business with that address)',
          html: `<p>A site links one supplier address to one of <em>our</em> procurement business units, and holds the rules for buying, receiving, invoicing and paying at that location. Payables uses sites constantly.</p>`,
        },
        {
          icon: '👩‍💼',
          title: '4. Contacts (who we talk to)',
          html: `<p>The supplier’s people: names, emails, phone numbers. A contact can get a <strong>user account</strong> for the Supplier Portal so they can see orders, submit invoices and check payments themselves.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Where does each fact belong?',
      instructions: `<p>Jordan is setting up Lemon Grove Farms. Put each piece of information in the part of the supplier record where it is mainly kept.</p>`,
      categories: ['Profile', 'Address', 'Site', 'Contact'],
      items: [
        { text: 'Supplier name and taxpayer ID', answer: 'Profile' },
        { text: 'Business classification (for example, small business)', answer: 'Profile' },
        { text: '12 Citrus Road, Sunnyvale', answer: 'Address' },
        { text: 'Payment terms Net 30 and 3-way match for Sunny US BU', answer: 'Site' },
        { text: 'Which client business units may use it', answer: 'Site' },
        { text: 'Rosa’s email address and Supplier Portal user account', answer: 'Contact' },
      ],
      explain: `<p>Who the supplier <em>is</em> lives in the <strong>profile</strong>. Where it is lives in an <strong>address</strong>. How <em>our</em> procurement BU does business with that address — terms, matching, holds, and the site assignments to client BUs — lives on the <strong>site</strong>. People and their portal accounts are <strong>contacts</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Sites and site assignments — the part beginners find tricky',
      html: `<p>A <strong>supplier site</strong> represents the business relationship between a <strong>procurement business unit</strong> (the part of our company that negotiates with suppliers and sets purchasing policy) and a supplier address. Every site belongs to exactly <strong>one</strong> procurement BU and points to exactly <strong>one</strong> address. You can create several sites on the same address if several procurement BUs buy from that location.</p>
<p>A site has <strong>purposes</strong>, such as <em>Purchasing</em>, <em>Pay</em>, <em>Procurement Card</em>, <em>Primary Pay</em> and <em>Sourcing Only</em>. A site used only for asking prices (sourcing) cannot be used to pay invoices.</p>
<p>The site’s sub-tabs hold the rules that matter to everyone in the procure-to-pay flow:</p>
<ul>
<li><strong>General</strong> – extra identifiers, such as the customer number the supplier uses for us.</li>
<li><strong>Purchasing</strong> – how purchase orders are communicated, self-billing, freight and purchasing holds.</li>
<li><strong>Receiving</strong> – receiving controls, such as over-receipt tolerance and receipt routing.</li>
<li><strong>Invoicing</strong> – invoice and payment currency, invoice holds, <strong>match approval level</strong> (2-, 3- or 4-way), payment terms, pay date basis and third-party payment relationships.</li>
<li><strong>Payments</strong> – supplier bank accounts and preferred payment methods for this site.</li>
<li><strong>Site Assignments</strong> – which of our <em>client</em> business units may use this site.</li>
</ul>
<p>A <strong>site assignment</strong> gives a <strong>client BU</strong> (a business unit that requisitions goods or processes invoices) permission to use the site, and names its <strong>bill-to BU</strong> — the business unit that takes on the liability for the purchases and processes the invoices. <span class="hl">Without an active site assignment, you cannot create purchase orders or invoices for that site.</span> This is the single most common reason a beginner “can’t find the supplier site” on an invoice.</p>`,
    },
    {
      type: 'flow',
      title: 'How Lemon Grove Farms is set up for Sunny',
      steps: [
        { icon: '🌍', label: 'Supplier (global)', detail: 'Lemon Grove Farms, supplier number 1001, tax country US.' },
        { icon: '🏠', label: 'Address', detail: '“Main Office”, 12 Citrus Road — used for taking orders and for receiving payments.' },
        { icon: '🏪', label: 'Site', detail: 'Site “LGF-US” owned by procurement BU Sunny US BU. Terms Net 30, 3-way match.' },
        { icon: '🔑', label: 'Site assignment', detail: 'Client BU: Sunny US BU. Bill-to BU: Sunny US BU.' },
        { icon: '🏦', label: 'Bank account', detail: 'Lemon Grove Farms’ account at its bank, attached to the site for electronic payments.' },
        { icon: '👩‍🌾', label: 'Contact', detail: 'Rosa, accounts receivable clerk at the farm, with a Supplier Portal user account.' },
      ],
      note: `<p>Sunny is small, so one business unit (Sunny US BU) does the procurement, the requisitioning <em>and</em> the invoicing. Big companies often have one central procurement BU that owns the site and many client BUs assigned to it — that is the whole point of the site assignment model.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: bank accounts and tax details on the supplier',
      html: `<p><strong>Bank accounts</strong> can be added at three levels: the supplier (profile), an address, or a site. When an invoice is created, Oracle looks for a valid bank account on the <strong>site</strong> first, then on the <strong>address</strong>, then on the <strong>supplier</strong>. So a site-level account wins.</p>
<p><strong>Tax registrations</strong> (like VAT numbers) can also be kept at supplier, address or site level. For US companies, the <strong>Income Tax</strong> tab on the supplier stores whether the supplier is <strong>federally reportable</strong> for US 1099 reporting and the default income tax type, so payments to that supplier can be reported to the Internal Revenue Service at year end. You will meet this again in the Taxes and Withholding lesson.</p>`,
    },
    {
      type: 'table',
      caption: 'Four ways suppliers get into Oracle Fusion',
      headers: ['Way', 'Who starts it', 'When it is used'],
      rows: [
        ['<strong>Create Supplier</strong> (manual)', 'Supplier Administrator or Supplier Manager in the Suppliers work area', 'A handful of new suppliers; full control over every field.'],
        ['<strong>Supplier registration</strong> (external)', 'The supplier, using a registration web link the buying company shares', 'New suppliers type their own details, bank accounts and contacts; the request is reviewed and approved before the supplier is created.'],
        ['<strong>Supplier registration</strong> (internal)', 'An employee, from Self Service Procurement, Sourcing or the Suppliers work area', 'An employee asks for a new supplier on their behalf; it is approved the same way.'],
        ['<strong>Import</strong>', 'Supplier Administrator or Supplier Manager, using file-based data import', 'Moving hundreds or thousands of suppliers from an old system, or bulk updates. Separate processes import suppliers, addresses, sites, site assignments, contacts and more.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Which bank account will be used?',
      instructions: `<p>Remember the order Oracle searches for a supplier bank account when an invoice is created. Fill in the blanks with <em>site</em>, <em>address</em> or <em>supplier</em>.</p>`,
      html: `<p>Oracle looks first at the {{}} level, then at the {{}} level, and last at the {{}} (profile) level.</p><p>Sweet Sugar Co. has a bank account only on its supplier profile and one on its “Warehouse” site. An invoice for the Warehouse site will default the account from the {{}} level.</p>`,
      blanks: [
        { answer: ['site', 'supplier site'] },
        { answer: ['address', 'supplier address'] },
        { answer: ['supplier', 'profile', 'supplier profile'] },
        { answer: ['site', 'supplier site'] },
      ],
      explain: `<p>The search goes <strong>site → address → supplier</strong>, so the most specific valid account wins. That is why a site-level bank account is used for the Warehouse invoice even though another account exists on the profile.</p>`,
    },
    {
      type: 'text',
      heading: 'Registration, Supplier Portal and keeping data fresh',
      html: `<p><strong>Registration.</strong> With external registration, the supplier opens the company’s registration link, verifies their email with a one-time access code, and then fills in company details, contacts, addresses, business classifications, bank accounts, products and services, and questionnaires. Approvers review the request (Oracle even warns them about possible duplicates). Suppliers can be registered as <strong>Prospective</strong> (can only take part in sourcing and qualification, not orders or invoices) or <strong>Spend Authorized</strong> (ready for ordering and invoicing). Payables only ever deals with spend authorized suppliers.</p>
<p><strong>Supplier Portal.</strong> Oracle Supplier Portal is a website where supplier contacts sign in to see their purchase orders, receipts, invoices and payments, and to create invoices. In release 26D, Oracle introduced a new <strong>Redwood</strong> Supplier Portal experience for invoices and payments, with one <em>Invoices and Payments</em> card and tabs for each. Existing customers keep the classic portal pages until an administrator switches the Redwood experience on.</p>
<p><strong>Profile change requests.</strong> Suppliers can ask to change their own details (for example, a new contact or bank account) through the portal. These <strong>supplier profile change requests</strong> are approved by the buying company before they take effect — an important fraud control.</p>
<p><strong>Duplicate check and numbering.</strong> When someone creates a supplier, Oracle shows existing parties with similar or matching names so you don’t create Lemon Grove Farms twice. Supplier numbers are assigned automatically from a starting number set by the Procurement Application Administrator.</p>`,
    },
    {
      type: 'table',
      caption: 'Who maintains suppliers',
      headers: ['Role', 'Main responsibilities'],
      rows: [
        ['<strong>Supplier Administrator</strong>', 'Maintains existing suppliers, reviews and approves profile change requests, gets supplier profiles ready for spending, and registers new suppliers for approval.'],
        ['<strong>Supplier Manager</strong>', 'Controls the addition of new suppliers, completes and approves prospective supplier profiles, and creates supplier records.'],
        ['<strong>Payables team</strong>', 'Uses suppliers every day, often checks invoicing and payment details on sites, and reports wrong data. In many companies AP is <em>not</em> allowed to change bank accounts, to keep duties separate.'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Suppliers work area',
      html: `<p>The <strong>Suppliers</strong> work area has an <strong>Overview</strong> page for Supplier Administrators and Supplier Managers. It highlights work needing attention, such as <em>Supplier Spend Authorization Requests</em>, <em>Expired and Expiring Business Classifications</em>, <em>Supplier Profile Change Requests Pending Approval</em> and <em>Suppliers with Incomplete Setup</em>. From here you can also search, create and edit suppliers.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: create a supplier and a site',
      items: [
        'Go to the <kbd>Suppliers</kbd> work area and click the <kbd>Create Supplier</kbd> task.',
        'In the dialog, enter the <kbd>Name</kbd> (Lemon Grove Farms), <kbd>Tax Country</kbd> and <kbd>Tax Registration Number</kbd>, then click <kbd>Create</kbd>. Look at any possible duplicates Oracle shows before continuing.',
        'On the <kbd>Profile</kbd> tab, set the <kbd>Supplier Type</kbd>. For US 1099 suppliers, complete the <kbd>Income Tax</kbd> details.',
        'On the <kbd>Addresses</kbd> tab, click the Create icon. Enter the address name, country and street details, and tick the address purposes this location serves.',
        'On the <kbd>Sites</kbd> tab, click the Create icon. Pick the procurement BU and the address, name the site, and fill in the <kbd>Invoicing</kbd> and <kbd>Payments</kbd> sub-tabs (payment terms, match approval level, payment method, bank account).',
        'On the <kbd>Site Assignments</kbd> sub-tab, click <kbd>Autocreate Assignments</kbd> (or add the client BU by hand). Then <kbd>Save and Close</kbd>.',
        'On the <kbd>Contacts</kbd> tab, create a contact with name and email. Tick <kbd>Create user account</kbd> if they should use the Supplier Portal.',
      ],
      note: `<p>These steps follow Oracle’s “Create a Supplier and Supplier Site” guidance. Exact labels vary by release and by whether your company uses the Redwood supplier pages. You need a Supplier Administrator or Supplier Manager type role.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: set up a supplier site',
      instructions: `<p>This is a simplified practice screen, not Oracle’s real page. Sunny has just signed up <strong>Cup & Straw Supply</strong>. Leo wants: Sunny US BU to own the site and also use it for buying and invoicing, payment terms Net 30, goods checked against PO and receipt, and payments sent electronically. Complete the site.</p>`,
      formTitle: 'Supplier Site – Cup & Straw Supply (practice)',
      fields: [
        { label: 'Supplier', given: 'Cup & Straw Supply (supplier number 1003)' },
        { label: 'Address', given: 'Main Warehouse, 8 Paper Lane' },
        { label: 'Procurement BU (owns the site)', type: 'select', options: ['Sunny US BU', 'Sunny UK BU'], answer: 'Sunny US BU' },
        { label: 'Site purpose needed to pay invoices', type: 'select', options: ['Sourcing Only', 'Pay', 'Procurement Card'], answer: 'Pay' },
        { label: 'Payment terms (Invoicing sub-tab)', type: 'select', options: ['Immediate', 'Net 15', 'Net 30', 'Net 60'], answer: 'Net 30' },
        { label: 'Match approval level (Invoicing sub-tab)', type: 'select', options: ['2-Way', '3-Way', '4-Way'], answer: '3-Way' },
        { label: 'Site assignment – client BU', type: 'select', options: ['Sunny US BU', 'Sunny UK BU'], answer: 'Sunny US BU' },
        { label: 'Site assignment – bill-to BU', type: 'select', options: ['Sunny US BU', 'Sunny UK BU'], answer: 'Sunny US BU' },
        { label: 'Payment method (Payments sub-tab)', type: 'select', options: ['Check', 'Electronic', 'Wire'], answer: 'Electronic' },
      ],
      explain: `<p>The site is owned by the <strong>procurement BU</strong> (Sunny US BU) and must have the <strong>Pay</strong> purpose to be used on invoices. “Checked against PO and receipt” is <strong>3-way</strong> matching. Without the <strong>site assignment</strong> for Sunny US BU (as client and bill-to BU), nobody could raise POs or invoices for this site. Electronic payment also needs a supplier bank account.</p>`,
    },
    {
      type: 'example',
      title: 'Why Ava couldn’t enter the electricity bill',
      html: `<p>Bright Power Utility was set up last week by a new team member. Ava tries to enter the $150 electricity invoice for Sunny US BU, but the supplier site list is empty.</p>`,
      steps: [
        'Ava searches for the supplier: it exists, and it has an address and a site called “BPU-Main”.',
        'Ava opens the site’s <strong>Site Assignments</strong> sub-tab. It is empty — nobody assigned the site to Sunny US BU.',
        'Ava does not have permission to change suppliers (good segregation of duties!), so Ava asks the Supplier Administrator.',
        'The administrator adds a site assignment: client BU Sunny US BU, bill-to BU Sunny US BU.',
        'Ava refreshes the invoice page and can now choose the BPU-Main site.',
      ],
      result: `<p>Lesson learned: <strong>supplier + address + site + active site assignment</strong> must all exist before an invoice can be entered for a business unit.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Watch out: bank account change fraud',
      html: `<p>One of the most common frauds in the world is the fake “we have changed our bank account” email. A criminal pretends to be a supplier and asks for future payments to go to a new account. Protect against it: only change bank details through an approved process (such as a supplier profile change request), call the supplier on a phone number you already have on file, and make sure the person who changes bank accounts is not the person who pays invoices.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: clean supplier data saves hours',
      html: `<p>Experienced AP teams spend real effort on “supplier master data hygiene”: no duplicates, inactive suppliers switched off, correct payment terms and correct tax details. Oracle can even inactivate suppliers automatically based on inactivity. A few minutes spent getting a supplier right saves many hours fixing invoices and payments later.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Supplier', def: 'A person or company we buy goods or services from. In Oracle Fusion a supplier is a global record shared by all business units.' },
        { term: 'Supplier site', def: 'The relationship between one supplier address and one procurement business unit, holding purchasing, receiving, invoicing and payment rules.' },
        { term: 'Procurement business unit', def: 'The part of the company that negotiates with suppliers and owns supplier sites.' },
        { term: 'Site assignment', def: 'Permission for a client business unit to use a supplier site, including which bill-to business unit is liable for the invoices.' },
        { term: 'Spend authorized supplier', def: 'A supplier that is approved for ordering and invoicing, unlike a prospective supplier.' },
        { term: 'Supplier Portal', def: 'A website where supplier contacts sign in to see orders and payments and to submit invoices.' },
        { term: 'Supplier profile change request', def: 'A request, often from the supplier, to change supplier details that must be approved before it takes effect.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'In Oracle Fusion, which part of the supplier record belongs to exactly one procurement business unit?',
          options: ['The supplier profile', 'The supplier site', 'The supplier contact', 'The tax country'],
          answer: 1,
          explain: 'Suppliers are global, but each site is created in one procurement BU and links to one address.',
        },
        {
          q: 'Ava cannot select any supplier site for Sunny US BU on a new invoice, although the site exists. What is the most likely cause?',
          options: [
            'The supplier has no contacts',
            'The site has no active site assignment for Sunny US BU',
            'The invoice amount is too small',
            'The supplier is in another country',
          ],
          answer: 1,
          explain: 'A client BU can only transact with a site that has an active site assignment for it.',
        },
        {
          q: 'A supplier has bank accounts at the supplier level and at one site. Which account does Oracle default on an invoice for that site?',
          options: ['The supplier-level account', 'The site-level account', 'Neither; Ava must always type it', 'The most recently created account'],
          answer: 1,
          explain: 'Oracle looks at the site first, then the address, then the supplier profile, so the site-level account wins.',
        },
        {
          q: 'A prospective supplier just won a sourcing event. Can Ava enter their invoice yet?',
          options: [
            'Yes, prospective suppliers can be invoiced',
            'No, the supplier must first become spend authorized',
            'Yes, but only with a credit memo',
            'No, prospective suppliers can never be used again',
          ],
          answer: 1,
          explain: 'Prospective suppliers can only take part in sourcing and qualification. They must be promoted to spend authorized before ordering and invoicing.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Oracle Supplier Model (Using Procurement, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/oracle-supplier-model.html' },
    { title: 'Supplier Sites and Supplier Site Assignments', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/supplier-sites-and-supplier-site-assignments.html' },
    { title: 'Create a Supplier and Supplier Site', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/create-a-supplier-and-supplier-site.html' },
    { title: 'Overview of Supplier Work Area', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/overview-of-supplier-work-area.html' },
    { title: 'Supplier Registration Process', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/supplier-registration-process.html' },
    { title: 'Create Suppliers with the Import Suppliers Process', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/create-suppliers-with-the-import-suppliers-process.html' },
    { title: 'How You Capture Supplier Bank Accounts at Different Supplier Profile Levels', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/how-you-capture-supplier-bank-accounts-at-different-supplier-profile-levels.html' },
    { title: 'Duplicate Supplier Check', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/duplicate-supplier-check.html' },
    { title: 'Supplier Numbering', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/supplier-numbering.html' },
    { title: 'Supplier Profile Change Requests', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/supplier-profile-change-requests.html' },
    { title: 'How You Use US 1099 Reporting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/us-1099-reporting-explained.html' },
    { title: 'Redwood Supplier Portal Invoice Submission and Status Tracking (26D What’s New)', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f50881.htm' },
  ],
};
