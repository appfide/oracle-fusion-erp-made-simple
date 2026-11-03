export default {
  slug: 'enterprise-structure',
  title: 'The Building Blocks: Enterprise Structure',
  minutes: 17,
  summary:
    'Before anyone can enter an invoice, a company must describe itself to Oracle Fusion: the enterprise, its legal entities, business units, divisions, inventory organizations and reference data sets — and how they connect to ledgers. We build Sunny Group block by block.',
  objectives: [
    'Explain the difference between an enterprise, a legal entity and a legal reporting unit',
    'Describe what a business unit is and what business functions it can perform',
    'Explain how legal entities and business units connect to ledgers through balancing segment values',
    'Describe reference data sets and why companies share setup data between business units',
    'Map Sunny Group’s companies, ledgers and business units onto Oracle Fusion’s structures',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'A family of lemonade stands',
      html: `<p>Imagine a big family that runs lemonade stands. The whole family has one surname — that's the <strong>enterprise</strong>.</p>
<p>Some stands are officially registered with the town, with their own paperwork and tax number. Each registered stand is a <strong>legal entity</strong>. It can sign contracts and must pay its own taxes.</p>
<p>Inside the family, jobs are split up. Cousin Leo's team buys lemons and pays bills for the stands on Maple Street. That working team is a <strong>business unit</strong>: it does jobs (buying, paying, billing) and the family checks how well it's doing.</p>
<p>Finally, each stand keeps its money diary — the <strong>ledger</strong>. <span class="hl">Enterprise, legal entities, business units and ledgers are the building blocks every Oracle Fusion company sets up first.</span></p>`,
    },
    {
      type: 'text',
      heading: 'Three ways to look at any company',
      html: `<p>Oracle's <em>Understanding Enterprise Structures</em> guide says every enterprise can be described in three ways:</p>
<ul>
<li><strong>Legal structure</strong> – which companies are registered with governments, own assets, sign contracts and pay taxes. In Fusion: <strong>legal entities</strong>.</li>
<li><strong>Management structure</strong> – how the bosses organize and measure the business (divisions, lines of business, profit centers). In Fusion: <strong>divisions</strong> and <strong>business units</strong>, and also segments in the chart of accounts.</li>
<li><strong>Functional structure</strong> – teams of people doing jobs like sales, finance or manufacturing. In Fusion: <strong>departments</strong> and other organizations (such as inventory organizations).</li>
</ul>
<p>These three views don't have to line up perfectly. A sales team might work for several legal entities, and one legal entity might contain several divisions. Oracle Fusion lets you model all three and link them together.</p>`,
    },
    {
      type: 'slides',
      title: 'The building blocks, one at a time',
      slides: [
        {
          icon: '🏰',
          title: 'Enterprise',
          html: `<p>The top of the tree: a collection of legal entities under common control and management. It records the name of the whole group and where its headquarters is. Every other organization belongs to it. <strong>Sunny Group</strong> is our enterprise.</p>`,
        },
        {
          icon: '⚖️',
          title: 'Legal entity',
          html: `<p>A company recognized by law. It can own things, employ people and sign contracts, and it must report to authorities and pay its taxes. In Fusion, legal entities appear on transactions — a Payables invoice, for example, has a legal entity field.</p>`,
        },
        {
          icon: '📍',
          title: 'Legal reporting unit',
          html: `<p>The smallest piece a government cares about for reporting, such as a registered office or establishment used for tax reporting. Each legal entity has at least one; Oracle creates the first one automatically when you create the legal entity.</p>`,
        },
        {
          icon: '🧑‍💼',
          title: 'Business unit',
          html: `<p>A part of the enterprise that performs business functions (like Payables Invoicing or Procurement) and is measured by management. It processes transactions, controls who sees which data, and decides which shared setup data it uses.</p>`,
        },
        {
          icon: '🏷️',
          title: 'Division',
          html: `<p>A business-oriented slice of the enterprise — for example by product line or region — with a manager responsible for its results. Divisions are optional and are usually reflected in the chart of accounts and hierarchies.</p>`,
        },
        {
          icon: '🏬',
          title: 'Inventory organization',
          html: `<p>A warehouse, storage facility or factory where Fusion tracks stock. It's managed by a business unit and owned by a legal entity. If you only need a list of items without stock balances, you use an <em>item organization</em> instead.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match each building block to its meaning',
      instructions: `<p>Match each Oracle Fusion building block with the description that fits it best.</p>`,
      pairs: [
        { left: 'Enterprise', right: 'The whole group of companies under common control (Sunny Group)' },
        { left: 'Legal entity', right: 'A company recognized by law that signs contracts and pays taxes' },
        { left: 'Legal reporting unit', right: 'The registered piece a government uses for local reporting, such as tax' },
        { left: 'Business unit', right: 'A part of the enterprise that performs business functions and processes transactions' },
        { left: 'Division', right: 'A business-oriented slice, such as a product line, with its own results to manage' },
        { left: 'Inventory organization', right: 'A warehouse or facility where stock quantities are tracked' },
      ],
      explain: `<p>Legal entities and legal reporting units describe the <strong>legal</strong> view; business units and divisions the <strong>management</strong> view; inventory organizations belong to the <strong>functional</strong> view. The enterprise sits on top of them all.</p>`,
    },
    {
      type: 'text',
      heading: 'Business units and business functions',
      html: `<p>The <strong>business unit</strong> (BU) is the block you'll meet most often in Financials. Oracle says a BU performs one or more <strong>business functions</strong> and can process transactions on behalf of many legal entities. Each BU usually has a manager, objectives and responsibility for its profit and loss.</p>
<p>A <strong>business function</strong> describes a job the BU does. Oracle's list includes:</p>
<ul>
<li>Payables Invoicing and Payables Payments</li>
<li>Billing and Revenue Management, Customer Payments and Collections Management</li>
<li>Procurement, Requisitioning and Receiving</li>
<li>Expense Management, Project Accounting, Materials Management, Sales and a few more</li>
</ul>
<p>Business functions that create accounting — for example Payables Invoicing, Billing and Revenue Management, Expense Management and Receiving — require the BU to have a <strong>primary ledger</strong> and a <strong>default legal entity</strong>. A BU posts to just <strong>one primary ledger</strong>, but can handle transactions for several legal entities that share that ledger.</p>
<p>Business units also drive <strong>security</strong>. When Ava gets the Accounts Payable Specialist role, access to a specific BU is given too, and Ava sees invoices only for that BU. You'll learn more in the security lesson.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Shared service centers',
      html: `<p>Big companies often centralize work. Oracle supports a <strong>service provider model</strong>: for example, one BU with the Payables Payment function can make payments for other BUs that do Payables Invoicing, and one Procurement BU can buy on behalf of BUs that create requisitions. If Sunny ever opens a central finance team, this is how it would be modeled.</p>`,
    },
    {
      type: 'text',
      heading: 'How the blocks connect to the ledger',
      html: `<p>Here's the chain that makes everything join up:</p>
<ol>
<li>A <strong>ledger</strong> is defined with a chart of accounts, a calendar, a currency and an accounting method (you'll study these "four Cs" in the next lesson).</li>
<li><strong>Legal entities</strong> are assigned to a ledger.</li>
<li>Each legal entity is given one or more <strong>primary balancing segment values</strong> — usually the "Company" value in the chart of accounts. That's how Fusion knows which accounting lines belong to which legal entity.</li>
<li><strong>Business units</strong> are attached to one primary ledger and a default legal entity.</li>
<li><strong>Inventory organizations</strong> are managed by a BU and belong to a legal entity, so their stock is accounted for in that legal entity's primary ledger.</li>
</ol>
<p>Companies in the same country often <strong>share one ledger</strong> and are told apart by their balancing segment values. A company in another country with a different currency or rules usually gets its <strong>own ledger</strong>.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny Group mapped onto Oracle Fusion enterprise structures',
      headers: ['Building block', 'Sunny Group', 'Notes'],
      rows: [
        ['Enterprise', 'Sunny Group', 'Headquarters in the US.'],
        ['Legal entity', 'Sunny Lemonade US Inc.<br>Sunny Lemonade UK Ltd', 'One registered company per country.'],
        ['Legal reporting unit', 'One for each legal entity (created automatically)', 'More can be added if a country needs local registrations.'],
        ['Primary ledger', 'Sunny US Ledger (USD)<br>Sunny UK Ledger (GBP)', 'Different currencies and countries, so two ledgers.'],
        ['Primary balancing segment value', 'Company 101 → US Inc.<br>Company 201 → UK Ltd', 'Every journal line with company 101 belongs to the US legal entity.'],
        ['Business unit', 'Sunny US BU<br>Sunny UK BU', 'Each attached to its country’s ledger and legal entity.'],
        ['Business functions', 'Payables Invoicing, Payables Payments, Procurement, Requisitioning, Receiving, Billing and Revenue Management, Customer Payments, Expense Management', 'Enabled on both BUs.'],
        ['Division', 'Not used yet', 'If Sunny started a frozen-treats business, it could become a division.'],
        ['Inventory organization', 'Optional (for example, a kitchen storeroom)', 'Only needed if Sunny tracks stock quantities in Fusion.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: set up Sunny UK BU',
      instructions: `<p>This is a simplified practice screen, not a copy of Oracle's page. Jordan is creating the UK business unit. Fill in the fields so it posts to the right ledger and legal entity.</p>`,
      formTitle: 'Create Business Unit (practice)',
      fields: [
        { label: 'Name', type: 'text', answer: 'Sunny UK BU' },
        { label: 'Location', given: 'London, United Kingdom' },
        { label: 'Primary ledger', type: 'select', options: ['Sunny US Ledger', 'Sunny UK Ledger'], answer: 'Sunny UK Ledger' },
        { label: 'Default legal entity', type: 'select', options: ['Sunny Lemonade US Inc.', 'Sunny Lemonade UK Ltd'], answer: 'Sunny Lemonade UK Ltd' },
        { label: 'Primary balancing segment value of that legal entity', type: 'select', options: ['101', '201'], answer: '201', hint: 'Which company value belongs to the UK?' },
        { label: 'Ledger currency (from the ledger)', type: 'select', options: ['USD', 'GBP'], answer: 'GBP' },
      ],
      explain: `<p>A business unit points to <strong>one primary ledger</strong> and a <strong>default legal entity</strong>. The UK BU uses Sunny UK Ledger (GBP) and Sunny Lemonade UK Ltd, whose primary balancing segment value is company <strong>201</strong>. Pointing it to the US ledger would put UK transactions in the wrong book and currency.</p>`,
    },
    {
      type: 'flow',
      title: 'Where the $500 lemon invoice belongs',
      steps: [
        { icon: '🧾', label: 'Invoice', detail: 'Ava enters the Lemon Grove Farms invoice in the Sunny US BU.' },
        { icon: '⚖️', label: 'Legal entity', detail: 'The invoice carries the legal entity Sunny Lemonade US Inc.' },
        { icon: '🔢', label: 'Balancing segment', detail: 'Its accounting uses company 101, the US legal entity’s value.' },
        { icon: '📒', label: 'Ledger', detail: 'The journal lands in Sunny US Ledger, in USD.' },
      ],
      note: `<p>Each block answers a different question: <em>who did the work</em> (BU), <em>who is legally responsible</em> (legal entity), and <em>which book records it</em> (ledger).</p>`,
    },
    {
      type: 'text',
      heading: 'Reference data sets: sharing the recipe book',
      html: `<p>Lots of setup data is "reference data": payment terms, transaction types, sales methods, and so on. Imagine every BU had to create its own <em>Net 30</em> payment term — that would be a lot of copying and easy to get out of sync.</p>
<p>Oracle solves this with <strong>reference data sets</strong>: labeled buckets of setup data. You assign each BU a set for each kind of data. Many BUs can share one set (one recipe book for everyone), or a BU can have its own set where it needs local rules. Changing a set affects every BU that uses it, so make changes carefully.</p>
<p>Oracle delivers a set called <strong>Enterprise</strong> for data that applies to the whole enterprise, and some objects also allow a <strong>common set</strong> whose values are available to all BUs. Data that's controlled this way is often called <strong>set-enabled</strong>.</p>
<p>Different kinds of data share in slightly different ways. For example, Oracle explains that Payables payment terms can be assigned to several sets at once, while Receivables transaction types can combine values from the BU's own set and the common set.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny shares payment terms',
      html: `<p>Sam wants every Sunny company to pay suppliers on the same terms, but the UK team needs one extra local term.</p>`,
      steps: [
        'Jordan creates a reference data set called <strong>SUNNY_SHARED</strong> and assigns it to both Sunny US BU and Sunny UK BU for payment terms.',
        'The payment term <strong>Net 30</strong> is assigned to SUNNY_SHARED, so both BUs can use it.',
        'A UK-only term is assigned to a separate <strong>SUNNY_UK</strong> set used only by Sunny UK BU.',
        'When Ava enters the US lemon invoice, the list of payment terms shows Net 30 — but not the UK-only term.',
      ],
      result: `<p>One change to Net 30 is instantly used by both BUs, and local differences stay local. That's the whole idea of reference data sharing.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Check your structure facts',
      instructions: `<p>Fill in each blank with one word or number.</p>`,
      html: `<p>A business unit posts its transactions to {{}} primary ledger.</p>
<p>Oracle delivers a reference data set called {{}} for data that applies to the whole enterprise.</p>
<p>When you create a legal entity, Oracle automatically creates one legal {{}} unit for it.</p>
<p>At Sunny, journal lines with company value {{}} belong to Sunny Lemonade US Inc.</p>`,
      blanks: [
        { answer: ['one', '1', 'a single', 'single'] },
        { answer: 'Enterprise' },
        { answer: 'reporting' },
        { answer: 101 },
      ],
      explain: `<p>Each BU posts to a <strong>single</strong> primary ledger. Enterprise-wide reference data goes in the <strong>Enterprise</strong> set. Every legal entity gets at least one <strong>legal reporting unit</strong>, created automatically. Company <strong>101</strong> is the US legal entity's primary balancing segment value.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: how the structure gets built',
      html: `<p>Enterprise structures are created in the <strong>Setup and Maintenance</strong> work area, not in everyday work areas. There are three main routes:</p>
<ul>
<li><strong>Enterprise Structures Configurator</strong> – an interview-style guided flow (the <em>Establish Enterprise Structures</em> task) that asks about your industry, legal structure and management reporting, then suggests divisions, legal entities, business units and reference data sets. It needs the <em>Enterprise Structures Guided Flow</em> feature to be enabled.</li>
<li><strong>Rapid implementation spreadsheet</strong> – Financials customers often use the <em>Create Chart of Accounts, Ledger, Legal Entities, and Business Units in Spreadsheet</em> task to upload companies, ledgers, business units and the chart of accounts in one workbook.</li>
<li><strong>Individual setup tasks</strong> – such as <em>Manage Legal Entities</em>, <em>Manage Business Units</em> and <em>Manage Divisions</em>, used to create or adjust one object at a time.</li>
</ul>
<p>You'll see how these fit into a whole implementation in the Setup and Maintenance lesson.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Design first, click later',
      html: `<p>Some structure decisions are very hard to undo once transactions exist — for example the ledger a BU posts to, or how legal entities map to balancing segment values. Oracle even warns that setting up business units at a higher level than legal entities can cause financial transactions to fail. Implementation teams sketch the structure on paper and agree it with finance, tax and legal before entering anything.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>When you join a company, ask for its <strong>enterprise structure diagram</strong>: legal entities, ledgers, balancing segment values and business units on one page. Payables and Receivables people especially need to know which BU they work in, because the BU decides which invoices, supplier sites, payment terms and approvals they see.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Enterprise', def: 'The top-level organization: a collection of legal entities under common control and management.' },
        { term: 'Legal entity', def: 'A company recognized by law that can own assets, sign contracts and must account for itself and pay taxes.' },
        { term: 'Legal reporting unit', def: 'The lowest level at which a legal entity reports to a government, such as a registered establishment for tax.' },
        { term: 'Business unit', def: 'A part of the enterprise that performs business functions, processes transactions and is used to secure data.' },
        { term: 'Business function', def: 'A job a business unit performs, such as Payables Invoicing, Procurement or Billing and Revenue Management.' },
        { term: 'Reference data set', def: 'A labeled bucket of shared setup data, such as payment terms, assigned to one or more business units.' },
        { term: 'Inventory organization', def: 'A warehouse or facility where Oracle Fusion tracks item quantities and balances.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which building block is registered with the government, can sign contracts and must pay taxes?',
          options: ['Business unit', 'Legal entity', 'Reference data set', 'Division'],
          answer: 1,
          explain: 'A legal entity is the legally recognized company. Business units and divisions are management structures; reference data sets hold shared setup data.',
        },
        {
          q: 'How many primary ledgers can a business unit post its transactions to?',
          options: ['Exactly one', 'Two — one per currency', 'As many as it likes', 'None — only legal entities post'],
          answer: 0,
          explain: 'Oracle says each business unit posts to a single primary ledger, though it can process transactions for several legal entities that share that ledger.',
        },
        {
          q: 'How does Oracle Fusion know that a journal line belongs to Sunny Lemonade UK Ltd?',
          options: [
            'By the user’s name',
            'By the primary balancing segment value (company 201) assigned to that legal entity',
            'By the color of the screen',
            'By the reference data set',
          ],
          answer: 1,
          explain: 'Legal entities are assigned primary balancing segment values. Lines using company 201 belong to the UK legal entity.',
        },
        {
          q: 'Why would Jordan put the payment term Net 30 in a reference data set shared by both Sunny business units?',
          options: [
            'So it’s defined once and used consistently by both BUs',
            'Because payment terms can’t be used without a division',
            'So that only the UK can use it',
            'Because Oracle requires one set per supplier',
          ],
          answer: 0,
          explain: 'Reference data sets let several BUs share the same setup data, reducing duplicate work and keeping policies consistent.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Understanding Enterprise Structures – Overview of Enterprise Structures (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faesc/overview.html' },
    { title: 'Understanding Enterprise Structures – Model Legal Entities (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faesc/model-legal-entities.html' },
    { title: 'Understanding Enterprise Structures – Business Units (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faesc/business-units.html' },
    { title: 'Understanding Enterprise Structures – Business Functions (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faesc/business-functions.html' },
    { title: 'Understanding Enterprise Structures – Reference Data Sets and Sharing Methods (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faesc/reference-data-sets-and-sharing-methods.html' },
    { title: 'Understanding Enterprise Structures (full guide, PDF, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faesc/understanding-enterprise-structures.pdf' },
    { title: 'Implementing Enterprise Structures and General Ledger – Legal Entities and Primary and Secondary Ledgers (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/legal-entities-and-primary-and-secondary-ledgers.html' },
    { title: 'Implementing Applications (26D) – Enterprise Structures Configurator', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/facia/index.html' },
  ],
};
