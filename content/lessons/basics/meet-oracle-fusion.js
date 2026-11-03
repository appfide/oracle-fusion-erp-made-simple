export default {
  slug: 'meet-oracle-fusion',
  title: 'Meet Oracle Fusion Cloud ERP',
  minutes: 14,
  summary:
    'Oracle Fusion Cloud ERP is a cloud ERP that Oracle runs for you and you use in a web browser. Learn what lives inside it, how it fits in the wider Fusion family, how it updates four times a year, and where to find the official help.',
  objectives: [
    'Explain what "cloud" and "SaaS" mean for a company that uses Oracle Fusion Cloud ERP',
    'Name the main product areas inside Oracle Fusion Cloud ERP and its sister families (SCM, HCM, CX)',
    'Describe how quarterly updates work and how release names like 26A and 26D are built',
    'Tell the difference between production and test environments',
    'Find the official Oracle Help Center documentation and readiness material',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Renting a magic library instead of building one',
      html: `<p>Imagine your school wants a huge library. One way is to <strong>build it yourselves</strong>: buy the land, build the walls, hire a caretaker to fix the roof, the lights and the heating, and buy every new book yourselves. That is a lot of work before anybody reads a single page.</p>
<p>Another way is to get a <strong>membership card to a magic library</strong> that someone else runs. They look after the building, fix the roof, keep it safe and even slip new books onto the shelves every few months. You just walk in (or open a website), show your card and read.</p>
<p><span class="hl">Oracle Fusion Cloud ERP is like that magic library.</span> Oracle looks after the computers and keeps adding new features. Sunny Lemonade Co. just opens a web browser, signs in and does its work.</p>`,
    },
    {
      type: 'text',
      heading: 'Cloud and SaaS in plain words',
      html: `<p>In the last lesson you learned that an <strong>ERP</strong> is one big shared system for a company's money, buying, selling and people. <strong>Oracle Fusion Cloud ERP</strong> is Oracle's ERP, and the word <strong>Cloud</strong> in the name is important.</p>
<ul>
<li><strong>Cloud</strong> means the software runs on computers (servers) in Oracle's data centers, not on computers in Sunny's office.</li>
<li><strong>SaaS</strong> stands for <strong>Software as a Service</strong>. Instead of buying a box of software and installing it, a company pays a subscription and uses the software as a service over the internet.</li>
</ul>
<p>So who does what?</p>
<ul>
<li><strong>Oracle</strong> runs the servers, the database, backups, security patches and the upgrades.</li>
<li><strong>The customer</strong> (Sunny) decides how to <em>configure</em> the system (its companies, ledgers, approval rules, users) and then does its daily work in it.</li>
</ul>
<p>Everyone uses it through a normal <strong>web browser</strong>. Oracle publishes the supported browsers in its <em>Using Common Features</em> guide; recent versions of Chrome, Edge, Firefox and Safari are on the list. There is nothing to install on your laptop to do everyday work.</p>`,
    },
    {
      type: 'slides',
      title: 'The Oracle Fusion family',
      slides: [
        {
          icon: '🏠',
          title: 'One family, one foundation',
          html: `<p>Oracle sells a whole suite called <strong>Oracle Fusion Cloud Applications</strong>. Think of it as a family of houses built on the same foundation: the same data model, the same look and the same way of handling security.</p>`,
        },
        {
          icon: '💼',
          title: 'ERP – money and buying',
          html: `<p><strong>Oracle Fusion Cloud ERP</strong> (Enterprise Resource Planning) covers finance and accounting, procurement (buying), project management, risk management and enterprise performance management. <span class="hl">This is the family member this guide is about.</span></p>`,
        },
        {
          icon: '🚚',
          title: 'SCM – making and moving things',
          html: `<p><strong>Oracle Fusion Cloud SCM</strong> (Supply Chain and Manufacturing) handles things like inventory, manufacturing, order management, product lifecycle and logistics.</p>`,
        },
        {
          icon: '🧑‍🤝‍🧑',
          title: 'HCM – people',
          html: `<p><strong>Oracle Fusion Cloud HCM</strong> (Human Capital Management) looks after employees from hiring to retiring: recruiting, onboarding, payroll, talent and more.</p>`,
        },
        {
          icon: '🤝',
          title: 'CX – customers',
          html: `<p><strong>Oracle Fusion Cloud CX</strong> (Customer Experience) covers marketing, sales and service — finding customers, closing deals and helping them afterwards.</p>`,
        },
        {
          icon: '🔗',
          title: 'Why the family matters',
          html: `<p>Because they share one foundation, a company that buys several family members usually runs them together. For example, the employee records in HCM can be the same people who submit expense reports in ERP. Oracle recommends putting all of a company's Fusion applications in the same <em>environment family</em> so they share data and setup.</p>`,
        },
      ],
    },
    {
      type: 'table',
      caption: 'What is inside Oracle Fusion Cloud ERP (as Oracle groups it on oracle.com)',
      headers: ['Product area', 'What it does, in kid words', 'Where you meet it in this guide'],
      rows: [
        ['<strong>Financial Management</strong> (Financials)', 'The money rooms: General Ledger, Payables, Receivables, Payments, Cash Management, Tax, Expenses, Assets and more.', 'Most of this guide'],
        ['<strong>Procurement</strong>', 'Buying: requisitions, purchase orders, suppliers and sourcing.', 'Procurement module'],
        ['<strong>Project Management</strong>', 'Planning, costing and billing projects.', 'Mentioned only'],
        ['<strong>Risk Management and Compliance</strong>', 'Watches for risky access and suspicious activity, and helps test financial controls.', 'Security lesson'],
        ['<strong>Enterprise Performance Management (EPM)</strong>', 'Planning, budgeting, consolidation and close. EPM is a separate set of cloud services that works closely with ERP.', 'More Tools module'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Financials pieces',
      html: `<p>Oracle's <em>Getting Started with Your Financials Implementation</em> guide lists the core Financials applications as <strong>General Ledger, Intercompany Accounting, Payables, Receivables, Payments, Cash Management, Tax, Expenses and Assets</strong>. When people at work say "Fusion Financials", they usually mean this group.</p>
<p>Oracle's marketing pages may group products a little differently over time (for example "Finance and Accounting" or "Financial Management"). The product names you see inside the application and in the Oracle Help Center are the ones to trust when you work.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Which Fusion family member does it?',
      instructions: `<p>Sunny is thinking about which Oracle Fusion Cloud Applications it might use one day. Put each job in the family that handles it.</p>`,
      categories: ['ERP', 'SCM', 'HCM', 'CX'],
      items: [
        { text: 'Ava pays the Lemon Grove Farms invoice', answer: 'ERP' },
        { text: 'Priya closes the month in the General Ledger', answer: 'ERP' },
        { text: 'Running payroll for Sunny’s employees', answer: 'HCM' },
        { text: 'Hiring a new kitchen helper', answer: 'HCM' },
        { text: 'Planning how many bottles the factory should make next month', answer: 'SCM' },
        { text: 'A sales team tracking deals with new cafes', answer: 'CX' },
        { text: 'Answering customer service questions about a late delivery', answer: 'CX' },
      ],
      explain: `<p><strong>ERP</strong> covers finance (Payables, General Ledger), procurement, projects, risk and EPM. <strong>HCM</strong> is people: hiring, payroll, talent. <strong>SCM</strong> is making and moving things, including planning and manufacturing. <strong>CX</strong> is marketing, sales and service. They all share one foundation, so they work well together.</p>`,
    },
    {
      type: 'text',
      heading: 'A short history: why is it called "Fusion"?',
      html: `<p>Before Fusion, Oracle already owned several big business-software families, including <strong>Oracle E-Business Suite</strong>, <strong>PeopleSoft</strong>, <strong>JD Edwards</strong> and <strong>Siebel</strong>. Oracle's early Fusion Applications documentation (11g Release 1, published in 2011) explains that Fusion was built to bring together — to <em>fuse</em> — the best business practices from those product lines into one new, standards-based suite with a single data model.</p>
<p>Those first Fusion releases were numbered like "11g Release 1". Over time Oracle moved Fusion to the cloud as a subscription service. Today it is delivered as <strong>Oracle Fusion Cloud Applications</strong>, with updates named by year and quarter, which you'll learn about next. Many companies still run the older families too, so you may hear "EBS" or "PeopleSoft" at work — they are different products from Fusion.</p>`,
    },
    {
      type: 'text',
      heading: 'Quarterly updates: the library gets new books four times a year',
      html: `<p>Oracle adds new features and major improvements <strong>four times a year</strong>. Each of these is called a <strong>quarterly update</strong>. Oracle's documentation says these updates are <strong>mandatory</strong> — every customer gets them — but each customer can choose which months their maintenance happens in.</p>
<p>The update names follow a simple pattern: <strong>two digits for the year + a letter for the quarter</strong>.</p>
<ul>
<li><code>26A</code> = the first update of 2026</li>
<li><code>26B</code> = the second update of 2026</li>
<li><code>26C</code> = the third update of 2026</li>
<li><code>26D</code> = the fourth update of 2026</li>
</ul>
<p>As this lesson is written (November 2026), Oracle's Cloud Applications Readiness site has published <em>What's New</em> documents for Financials 26A, 26B, 26C and 26D. Next year's updates will be called 27A, 27B and so on.</p>
<p>Besides quarterly updates, customers can also receive smaller <strong>monthly maintenance packs</strong> that fix bugs, without adding big new features.</p>`,
    },
    {
      type: 'flow',
      title: 'How a quarterly update reaches Sunny Lemonade',
      steps: [
        { icon: '📢', label: 'Oracle announces', detail: 'Readiness material and What’s New documents describe the new features before they arrive.' },
        { icon: '🧪', label: 'Test gets it first', detail: 'Sunny’s test environment is updated first (non-production cadence).' },
        { icon: '🔍', label: 'Sunny checks', detail: 'Priya and Ava test their key processes and look at new features they might switch on.' },
        { icon: '🏭', label: 'Production follows', detail: 'About two weeks later, the live production environment gets the same update.' },
        { icon: '✨', label: 'Opt in', detail: 'Some new features are on by default; others wait until an administrator opts in.' },
      ],
      note: `<p>Oracle's environment documentation describes a <em>non-production</em> patching cadence (the weekend after the first Friday of the month) and a <em>production</em> cadence (the weekend after the third Friday). That gap gives customers time to test.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Decode the release names',
      instructions: `<p>Use the year + letter pattern to fill in each blank.</p>`,
      html: `<p>The first quarterly update of 2026 is called {{}}.</p>
<p>The fourth quarterly update of 2026 is called {{}}.</p>
<p>The second quarterly update of 2027 will be called {{}}.</p>
<p>Oracle delivers new features {{}} times a year.</p>`,
      blanks: [
        { answer: '26A', hint: 'two digits + a letter' },
        { answer: '26D' },
        { answer: '27B' },
        { answer: [4, 'four'] },
      ],
      explain: `<p>Two digits for the year, then A, B, C or D for the first, second, third or fourth update of that year. That gives four quarterly updates a year: 26A, 26B, 26C, 26D, then 27A, 27B and so on.</p>`,
    },
    {
      type: 'text',
      heading: 'Environments: the real kitchen and the practice kitchen',
      html: `<p>A company never has just one copy of Oracle Fusion. It has several <strong>environments</strong> (sometimes called <em>pods</em> or <em>instances</em>):</p>
<ul>
<li><strong>Production</strong> – the real one. Real invoices, real payments, real money. Mistakes here are real mistakes.</li>
<li><strong>Test</strong> (non-production) – a practice copy. Used to try new setups, train people and test quarterly updates before they hit production.</li>
<li>Sometimes also a <strong>development</strong> environment or a <strong>"gold"</strong> environment used to keep a clean master copy of setup data.</li>
</ul>
<p>Oracle groups a customer's environments into an <strong>environment family</strong> that shares settings such as the region and maintenance schedule. Administrators can also <strong>refresh</strong> a test environment by copying production into it (often called a <em>P2T</em>, production-to-test refresh), so testers work with realistic data.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny Lemonade gets its environments',
      html: `<p>When Sam signed Sunny's subscription, Jordan (the implementation consultant) explained the plan:</p>`,
      steps: [
        'Oracle provisioned a <strong>production</strong> environment and a <strong>test</strong> environment in the same environment family.',
        'Jordan built the whole setup — companies, ledgers, chart of accounts, users — in <strong>test</strong> first.',
        'Ava practiced entering the $500 Lemon Grove Farms invoice in test, and Priya practiced closing a pretend month.',
        'When everyone was happy, Jordan moved the tested setup to <strong>production</strong>, and Sunny started recording real transactions there.',
        'Now, every quarter, the 26-something update lands in test first. Priya runs a short checklist there before production is updated.',
      ],
      result: `<p>Rule of thumb Sunny lives by: <strong>practice in test, work in production</strong>. If a screen says "TEST" in the banner or URL, nothing you do there touches real money.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Production or test?',
      instructions: `<p>For each activity, choose the environment where it should happen.</p>`,
      categories: ['Production', 'Test (non-production)'],
      items: [
        { text: 'Ava enters the real $500 Lemon Grove Farms invoice that must be paid', answer: 'Production' },
        { text: 'A new team member practices creating invoices during training', answer: 'Test (non-production)' },
        { text: 'Priya checks the month-end steps right after a new quarterly update arrives, before it reaches the live system', answer: 'Test (non-production)' },
        { text: 'Mia sends the real payment to Big River Bank', answer: 'Production' },
        { text: 'Jordan tries a new approval rule for the first time', answer: 'Test (non-production)' },
      ],
      explain: `<p>Real money and real records live in <strong>production</strong>. Practice, training, trying new setups and checking updates belong in <strong>test</strong>. Because test receives each quarterly update about two weeks earlier, it is the perfect place to check that nothing broke.</p>`,
    },
    {
      type: 'text',
      heading: 'Redwood: the new look',
      html: `<p>Oracle is gradually moving the screens of Fusion to a newer design called <strong>Redwood</strong>. Redwood is Oracle's user-experience design system: cleaner pages, bigger search, guided flows and room for built-in AI assistants. Older pages are often called <strong>classic</strong> pages.</p>
<p>Some important things to know as a beginner:</p>
<ul>
<li>Redwood pages arrive a few at a time in the quarterly updates. For a while, you will see <strong>both</strong> Redwood and classic pages in the same system.</li>
<li>Some Redwood pages are switched on by an administrator (for example through profile options or opt-in features), so two companies on the same update can look different.</li>
<li>Oracle keeps an <em>Adopting Redwood</em> section on its readiness site listing which features are built with Redwood, release by release.</li>
</ul>
<p>Because of this, every click path in this guide comes with a reminder: <em>labels may differ slightly by release and by configuration</em>. Learn the <strong>ideas</strong> and the <strong>names of things</strong>; the buttons will find you.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the official help',
      html: `<p>The official documentation lives in the <strong>Oracle Help Center</strong> at <a href="https://docs.oracle.com/en/cloud/saas/financials/index.html">docs.oracle.com</a>. For each update there are books such as <em>Using Payables Invoice to Pay</em>, <em>Using General Ledger</em> and <em>Implementing Enterprise Structures and General Ledger</em>.</p>
<p>Two more places you'll use a lot:</p>
<ul>
<li><strong>Cloud Applications Readiness</strong> – What's New documents for every quarterly update, plus a list of features whose opt-in is expiring.</li>
<li><strong>Help icons inside the application</strong> – many pages have help icons that open help windows and link straight to the right guide in the Help Center.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>When you join a company that uses Oracle Fusion, ask two questions on day one: <strong>"Which update are we on?"</strong> (for example 26C or 26D) and <strong>"Which environment am I in?"</strong>. The first tells you which documentation to read. The second stops you from testing in production. Experienced practitioners always read the <em>What's New</em> for their area before each update.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Oracle Fusion Cloud ERP', def: 'Oracle’s cloud ERP suite for finance, procurement, projects, risk and performance management, used through a web browser.' },
        { term: 'SaaS', def: 'Software as a Service: you subscribe and use the software over the internet while the vendor runs the servers.' },
        { term: 'Quarterly update', def: 'The mandatory update Oracle applies four times a year that adds new features, named like 26A, 26B, 26C and 26D.' },
        { term: 'Production environment', def: 'The live copy of the system where real business transactions are recorded.' },
        { term: 'Test environment', def: 'A non-production copy used to practice, train and check updates and setups before they reach production.' },
        { term: 'Redwood', def: 'Oracle’s newer user-experience design for Fusion pages; older pages are often called classic pages.' },
        { term: 'Oracle Help Center', def: 'Oracle’s official documentation website at docs.oracle.com, including guides and readiness material.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Sunny Lemonade uses Oracle Fusion Cloud ERP. Who is responsible for running the servers and applying the quarterly updates?',
          options: ['Sunny’s own IT team', 'Oracle', 'The bank', 'Each user on their own laptop'],
          answer: 1,
          explain: 'It is SaaS: Oracle runs the servers, database and updates. Sunny configures the system and does its work through a browser.',
        },
        {
          q: 'What does the release name 26C mean?',
          options: ['The third quarterly update of 2026', 'Version 26 for Canada', 'The 26th update of the C module', 'A test-only release'],
          answer: 0,
          explain: 'Two digits for the year (26 = 2026) plus a letter for the update in that year (A, B, C, D). C is the third.',
        },
        {
          q: 'Ava wants to practice entering an invoice without affecting real money. Where should Ava do it?',
          options: ['In production, then delete it', 'In a test (non-production) environment', 'In the Oracle Help Center', 'In the Redwood design system'],
          answer: 1,
          explain: 'Test environments are practice copies. Production holds real transactions, so practice there can cause real problems.',
        },
        {
          q: 'Which of these is part of Oracle Fusion Cloud ERP rather than HCM, SCM or CX?',
          options: ['Payroll', 'Payables and General Ledger', 'Sales and marketing campaigns', 'Manufacturing'],
          answer: 1,
          explain: 'Payables and General Ledger are Financials applications inside ERP. Payroll belongs to HCM, campaigns to CX and manufacturing to SCM.',
        },
        {
          q: 'Why might Priya see a Redwood page for one task and a classic page for another?',
          options: [
            'The browser is broken',
            'Oracle moves pages to Redwood gradually, so both styles exist side by side for a while',
            'Redwood pages only appear in test',
            'Classic pages are for managers only',
          ],
          answer: 1,
          explain: 'Redwood arrives a few pages at a time through the quarterly updates, and some pages need an administrator to switch them on.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Enterprise Resource Planning (ERP) – Oracle Fusion Cloud ERP', publisher: 'Oracle', url: 'https://www.oracle.com/erp/' },
    { title: 'Oracle Fusion Cloud Applications', publisher: 'Oracle', url: 'https://www.oracle.com/applications/' },
    { title: 'Oracle Fusion Cloud Financial Management', publisher: 'Oracle', url: 'https://www.oracle.com/erp/financial-management/' },
    { title: 'Oracle Fusion Cloud Risk Management and Compliance', publisher: 'Oracle', url: 'https://www.oracle.com/erp/risk-management/' },
    { title: 'Oracle Fusion Cloud Enterprise Performance Management', publisher: 'Oracle', url: 'https://www.oracle.com/performance-management/' },
    { title: 'Getting Started with Your Financials Implementation (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/facsf/index.html' },
    { title: 'Introduction to Oracle Fusion Applications, 11g Release 1 (11.1.2)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/cd/E25054_01/fusionapps.1111/e15525/intro.htm' },
    { title: 'Planning an Environment Family (quarterly maintenance and patching cadence)', publisher: 'Oracle Cloud Infrastructure Documentation', url: 'https://docs.oracle.com/en-us/iaas/Content/fusion-applications/plan-environment-family.htm' },
    { title: 'Cloud Applications Readiness – Enterprise Resource Planning: All', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp-all.html' },
    { title: 'Oracle Fusion Cloud Financials 26D What’s New', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/index.html' },
    { title: 'Adopting Redwood', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/readiness/redwood-adoption/index.html' },
    { title: 'Using Common Features – Sign In and Get Started (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/sign-in-and-get-started.html' },
  ],
};
