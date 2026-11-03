export default {
  slug: 'setup-and-maintenance',
  title: 'Setting Things Up: Setup and Maintenance',
  minutes: 17,
  summary:
    'How a company switches on and configures Oracle Fusion: offerings, functional areas, features and setup tasks in the Setup and Maintenance work area, implementation projects, scope, rapid implementation, moving setup between environments with configuration packages, and a first look at lookups and profile options. Follow Jordan as they set up Sunny Lemonade.',
  objectives: [
    'Explain how offerings, functional areas, features and setup tasks fit together',
    'Describe the two ways to manage setup: by functional area or with an implementation project',
    'Explain what scope means for a setup task',
    'Describe how setup data moves from test to production using export, import and configuration packages',
    'Explain in simple words what lookups and profile options are',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Setting up a brand-new board game',
      html: `<p>You get a huge new board game for your birthday. Before anyone can play, somebody has to set it up: choose which <strong>game mode</strong> you're playing, decide on <strong>house rules</strong> ("you must land exactly on the finish"), sort the cards, put the pieces on the board, and write down the rules so everyone plays the same way.</p>
<p>Once it's set up, the players just play. But if the rules need changing later, there's a special place to change them — you don't just scribble on the board mid-game.</p>
<p><span class="hl">In Oracle Fusion, that special place is the Setup and Maintenance work area,</span> and the person setting up the game at Sunny is Jordan, the implementation consultant.</p>`,
    },
    {
      type: 'text',
      heading: 'The building blocks of setup',
      html: `<p>Oracle's <em>Functional Setup Manager</em> (the tools behind Setup and Maintenance) organizes setup into four layers:</p>
<ul>
<li><strong>Offering</strong> – a big collection of business processes that a company has licensed. It's the starting point of every implementation. For Sunny, the main one is the <strong>Financials</strong> offering.</li>
<li><strong>Functional area</strong> – a smaller business process inside an offering, such as <em>General Ledger</em>, <em>Payables</em>, <em>Receivables</em>, <em>Cash Management and Banking</em>, <em>Fixed Assets</em>, <em>Expenses</em> or <em>Transaction Tax</em>. Core ones switch on automatically; optional ones you opt in to.</li>
<li><strong>Feature</strong> – an optional business practice inside a functional area. Some are yes/no checkboxes, some are single-choice, some multi-choice.</li>
<li><strong>Setup task</strong> – the actual page where you enter setup data, such as creating payment terms or a bank account. Tasks are grouped into task lists in the order they should be done.</li>
</ul>`,
    },
    {
      type: 'flow',
      title: 'From licence to working system',
      steps: [
        { icon: '📦', label: 'Offering', detail: 'Sunny licensed Financials. Jordan enables the offering.' },
        { icon: '🧩', label: 'Functional areas', detail: 'Core areas are on; Jordan opts in to optional ones Sunny needs.' },
        { icon: '🎚️', label: 'Features', detail: 'Jordan chooses which optional features to switch on.' },
        { icon: '📝', label: 'Setup tasks', detail: 'Jordan works through the tasks in order and enters setup data.' },
        { icon: '🚀', label: 'Ready to transact', detail: 'Users like Ava and Priya can start working.' },
      ],
      note: `<p>Oracle describes the implementation lifecycle as <strong>Plan → Configure → Setup → Deploy → Maintain</strong>. "Configure" is the opt-in part; "Setup" is entering data; "Deploy" is moving the tested setup to production.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the My Enterprise work areas',
      html: `<p>In the Navigator, the <strong>My Enterprise</strong> group holds the setup work areas:</p>
<ul>
<li><strong>Offerings</strong> – review offerings, read their related documents and use <kbd>Opt In Features</kbd> to enable functional areas and features.</li>
<li><strong>New Features</strong> – after each quarterly update, review and opt in to new functional areas and features.</li>
<li><strong>Feature Updates</strong> – learn about features whose behavior will change in the future.</li>
<li><strong>Enterprise</strong> – environment-level settings for the whole enterprise.</li>
<li><strong>Setup and Maintenance</strong> – set up an offering or its functional areas, update existing setup data and manage implementation projects.</li>
</ul>
<p>The Offerings page also offers reports such as the <em>Associated Features Report</em> and the <em>Setup Task Lists and Tasks Report</em>, which tell you which tasks are required and whether their data can be exported and imported.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Order the implementation lifecycle',
      instructions: `<p>Put Oracle's implementation steps in the order Jordan followed them.</p>`,
      items: [
        'Plan – choose offerings and review their features and task lists',
        'Configure – opt in to offerings, functional areas and features',
        'Setup – enter setup data with the setup tasks',
        'Deploy – move verified setup from test to production',
        'Maintain – update setup and opt in to new features over time',
      ],
      explain: `<p>Oracle describes the lifecycle as <strong>Plan → Configure → Setup → Deploy → Maintain</strong>. You can't enter setup data for a functional area you haven't opted in to, and you deploy only after verifying in test.</p>`,
    },
    {
      type: 'text',
      heading: 'Two ways to do the setup',
      html: `<p><strong>1. By functional area ("adopt as you go")</strong><br>In the Setup and Maintenance work area, pick an offering. Its enabled functional areas appear in the order they should be set up — areas higher up are usually prerequisites for those lower down, and required ones are marked with an asterisk. Inside each area, only the <em>required</em> tasks show by default; choose <kbd>All Tasks</kbd> from the Show list to see optional ones too. Some areas offer a <strong>Quick Setup</strong> shortcut. This is great for a simpler rollout or for adding one area later.</p>
<p><strong>2. With an implementation project</strong><br>An <strong>implementation project</strong> is your own list of setup tasks, generated from an offering and its functional areas. You can add, remove or reorder tasks, <strong>assign tasks to different people</strong>, and track progress. It suits bigger projects where many people share the work. A popular choice for Financials is a project containing Oracle's <em>Define Financials Configuration for Rapid Implementation</em> task list, which focuses on the critical setup steps only.</p>
<p>Whichever route you take, the setup data ends up in the same place. Oracle notes that once data is entered you can't tell which method was used to enter it.</p>`,
    },
    {
      type: 'text',
      heading: 'Scope: doing a task once per business unit, ledger or set',
      html: `<p>Some setup data belongs to a particular business unit, ledger or reference data set. For those tasks, Oracle asks you to choose a <strong>scope</strong> value before opening the task. For example, the Payables <em>Manage Invoice Options</em> task is performed with a business unit scope, so Jordan sets invoice options once with the scope <em>Sunny US BU</em> and again with <em>Sunny UK BU</em>.</p>
<p>Once you pick a scope value, Setup and Maintenance remembers it for other tasks that use the same scope, until you change it. Many "I can't find my setup!" mysteries turn out to be the wrong scope selected.</p>`,
    },
    {
      type: 'example',
      title: 'Jordan sets up Sunny Lemonade',
      html: `<p>Here is how Jordan's first weeks looked, all in Sunny's <strong>test</strong> environment.</p>`,
      steps: [
        '<strong>Plan.</strong> Jordan opened <em>Navigator &gt; My Enterprise &gt; Offerings</em>, selected Financials and read the Associated Features and Setup Task Lists reports.',
        '<strong>Configure.</strong> Using <kbd>Opt In Features</kbd>, Jordan enabled the Financials offering and checked that General Ledger, Payables, Receivables, Cash Management and Banking, Fixed Assets, Expenses and Transaction Tax were enabled.',
        '<strong>Create a project.</strong> In Setup and Maintenance, Jordan created an implementation project containing the <em>Define Financials Configuration for Rapid Implementation</em> task list.',
        '<strong>Build the structure fast.</strong> Jordan filled in the Rapid Implementation for General Ledger workbook — the Sunny COA, the monthly calendar, Sunny Lemonade US Inc. and UK Ltd, the two ledgers and two business units — and uploaded it.',
        '<strong>Share the work.</strong> Jordan assigned the bank account tasks to Mia, the Payables tasks to Ava and the tax tasks to a tax advisor, then watched progress in the project.',
        '<strong>Scope.</strong> For the Manage Invoice Options task, Jordan chose the scope Sunny US BU, entered the settings, then repeated for Sunny UK BU.',
        '<strong>Test.</strong> Ava and Priya ran practice transactions — the $500 lemon invoice, a sales invoice to Happy Cafe, a month-end close.',
      ],
      result: `<p>Everything was built and proven in test. The next job: move it safely to production.</p>`,
    },
    {
      type: 'text',
      heading: 'Moving setup between environments',
      html: `<p>Remember from the earlier lesson: <strong>practice in test, work in production</strong>. Setup follows the same rule. Oracle's recommended flow is to set up and verify in test, then <strong>export</strong> the setup data and <strong>import</strong> it into production — rather than typing it all again by hand.</p>
<ul>
<li>You export either an <strong>offering or functional area</strong>, or an <strong>implementation project</strong>. You must import with the same method you exported with.</li>
<li>The export creates a <strong>configuration package</strong>: the list of setup tasks, the business objects behind them, and the exported setup data. You download it as a .zip file, upload it in the target environment and run the import.</li>
<li>Both environments must be on the <strong>same update and revision</strong>. That's why companies avoid migrating setup during the two-week gap when test has a new quarterly update and production doesn't.</li>
<li>Not every setup object can be exported. The Setup Task Lists and Tasks report shows which tasks need to be moved another way.</li>
<li>Some companies keep a separate <strong>gold environment</strong> as the master copy of setup. Oracle's advice: always change setup in the gold environment first, never directly in test.</li>
</ul>
<p>For small, single tasks, Oracle also offers export and import of <strong>CSV file packages</strong>, and tools to <strong>compare setup data</strong> between environments.</p>`,
    },
    {
      type: 'flow',
      title: 'Jordan moves Sunny’s setup to production',
      steps: [
        { icon: '🧪', label: 'Verify in test', detail: 'All practice transactions pass.' },
        { icon: '📤', label: 'Export', detail: 'Jordan exports the implementation project’s setup data from test.' },
        { icon: '🗜️', label: 'Configuration package', detail: 'Jordan downloads the .zip package.' },
        { icon: '📥', label: 'Import', detail: 'In production, Jordan uploads the package and runs the import.' },
        { icon: '🔎', label: 'Review results', detail: 'Jordan checks the import results and fixes anything that must be moved manually.' },
      ],
      note: `<p>Before starting, Jordan checked that test and production were on the same quarterly update.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Move setup to production, step by step',
      instructions: `<p>Put Jordan's migration steps in order.</p>`,
      items: [
        'Verify the setup with practice transactions in test',
        'Check that test and production are on the same update',
        'Export the setup data from test',
        'Download the configuration package (.zip)',
        'Upload the package in production and run the import',
        'Review the import results and move any unsupported setup manually',
      ],
      explain: `<p>Test first, then make sure both environments are on the same revision — Oracle requires it for export and import. The export creates a <strong>configuration package</strong> you download and upload into production. Finally, review results: some setup objects can't be exported and must be handled another way.</p>`,
    },
    {
      type: 'slides',
      title: 'Two small but mighty setup tools',
      slides: [
        {
          icon: '📋',
          title: 'Lookups',
          html: `<p>A <strong>lookup</strong> is a list of values shown in a drop-down. Oracle stores a short <strong>lookup code</strong> (like <code>Y</code>) and shows the user a friendly <strong>meaning</strong> (like "Yes"). A group of codes is a <strong>lookup type</strong>.</p>`,
        },
        {
          icon: '🔧',
          title: 'Changing lookups',
          html: `<p>Lookups are maintained with tasks such as <em>Manage Standard Lookups</em>. Depending on how Oracle configured each lookup type, you may be able to add codes, only change meanings, or nothing at all. Some lookups are <strong>set-enabled</strong>, so different business units can see different values.</p>`,
        },
        {
          icon: '🎛️',
          title: 'Profile options',
          html: `<p>A <strong>profile option</strong> is a setting that controls how the application behaves or looks — like a switch on the back of a machine. Examples include default language or currency, logging levels, and switches that turn on some Redwood pages.</p>`,
        },
        {
          icon: '🪜',
          title: 'Profile option levels',
          html: `<p>Profile values can be set at different <strong>levels</strong>, such as <strong>Site</strong> (everyone) and <strong>User</strong> (one person). The more specific level wins: a user-level value overrides the site-level value. Administrators set values with the <em>Manage Administrator Profile Values</em> task.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Lookup, profile option or scoped setup task?',
      instructions: `<p>Jordan gets several change requests. Decide which kind of setup each one is.</p>`,
      categories: ['Lookup', 'Profile option', 'Setup task with scope'],
      items: [
        { text: 'Add a new value to a drop-down list of reasons on a form', answer: 'Lookup' },
        { text: 'Make Omar see US Dollar as Omar’s default currency while the site default stays the same', answer: 'Profile option' },
        { text: 'Change Payables invoice options only for Sunny UK BU', answer: 'Setup task with scope' },
        { text: 'Show the friendly meaning “Yes” for the stored code Y', answer: 'Lookup' },
        { text: 'Turn on a setting for the whole site that controls how the application behaves', answer: 'Profile option' },
      ],
      explain: `<p><strong>Lookups</strong> are lists of codes and meanings shown in drop-downs. <strong>Profile options</strong> are behavior settings with levels like Site and User (user wins). Data that belongs to one business unit, ledger or set is entered through a <strong>setup task with a scope</strong>.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: look around Setup and Maintenance (needs setup access)',
      items: [
        'Open <em>Navigator &gt; My Enterprise &gt; Setup and Maintenance</em>.',
        'Select the <strong>Financials</strong> offering and look at its list of functional areas. Notice the order and the ones marked as required.',
        'Click a functional area such as <strong>Payables</strong> and look at its tasks. Change the <kbd>Show</kbd> list to <kbd>All Tasks</kbd> to see the optional ones.',
        'Use the search on the Setup page to find a task by name, for example <em>Manage Standard Lookups</em>. Open it only in a test environment.',
      ],
      note: `<p>Steps follow Oracle's <em>Using Functional Setup Manager</em> guide; labels can vary by release. You only see tasks your roles allow — most business users can't open setup tasks at all, which is exactly how it should be.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Handle the master key carefully',
      html: `<p>The predefined <strong>Application Implementation Consultant</strong> role can perform <em>all</em> Functional Setup Manager tasks. Oracle advises giving it only when truly necessary and only for a limited time, and instead creating custom roles with just the setup privileges a person needs. For ongoing maintenance of financial setup, Oracle provides the <strong>Financial Application Administrator</strong> role. Everyone who uses Functional Setup Manager also needs the <em>Functional Setups User</em> role.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Implementation consultants keep a <strong>configuration workbook</strong> — a document listing every important setup decision and value (who decided, when and why). When something behaves oddly two years later, that workbook plus Oracle's <em>setup data reports</em> are the first place to look. And after each quarterly update, someone should review the <strong>New Features</strong> work area: new features that need opting in won't switch themselves on.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Setup and Maintenance', def: 'The work area where administrators enable offerings and enter or update setup data.' },
        { term: 'Offering', def: 'A licensed collection of business processes, such as Financials, that is the starting point of setup.' },
        { term: 'Functional area', def: 'A business process within an offering, such as Payables or General Ledger, that you can opt in to and set up.' },
        { term: 'Feature (opt-in)', def: 'An optional business practice you can switch on for a functional area or offering.' },
        { term: 'Implementation project', def: 'A list of setup tasks you generate, assign to people and track to manage an implementation.' },
        { term: 'Scope', def: 'The business unit, ledger or other value that a setup task’s data applies to, chosen before you open the task.' },
        { term: 'Configuration package', def: 'The exported file of setup tasks and setup data used to move configuration from one environment to another.' },
        { term: 'Profile option', def: 'A setting that controls application behavior or appearance, which can be set at levels such as site and user.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'What is the correct order, from biggest to smallest?',
          options: [
            'Setup task → feature → functional area → offering',
            'Offering → functional area → feature → setup task',
            'Functional area → offering → setup task → feature',
            'Feature → offering → setup task → functional area',
          ],
          answer: 1,
          explain: 'An offering contains functional areas; functional areas have optional features; setup tasks are where you actually enter the data.',
        },
        {
          q: 'Jordan sets Payables invoice options for Sunny US BU, but the UK team says nothing changed for them. Why?',
          options: [
            'The UK uses a different chart of accounts',
            'The task was performed with the scope Sunny US BU, so it must be repeated with the scope Sunny UK BU',
            'Payables options can only be set by Oracle',
            'The UK team needs to refresh their browser',
          ],
          answer: 1,
          explain: 'Scoped setup data applies only to the chosen scope value. Business-unit-level settings must be entered for each BU.',
        },
        {
          q: 'What is the recommended way to move tested setup from test to production?',
          options: [
            'Retype everything in production',
            'Export from test to a configuration package and import it into production, with both on the same update',
            'Copy production into test',
            'Ask every user to change their own settings',
          ],
          answer: 1,
          explain: 'Oracle’s export and import processes move setup data via configuration packages. Both environments must be at the same revision.',
        },
        {
          q: 'A profile option is set to Euro at the site level and US Dollar at the user level for Omar. What does Omar see?',
          options: ['Euro', 'US Dollar', 'Both', 'Neither'],
          answer: 1,
          explain: 'The user level is more specific and takes precedence over the site level for that user.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Functional Setup Manager – How Functional Setup Manager Components Work Together (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oafsm/how-functional-setup-manager-components-work-together.html' },
    { title: 'Using Functional Setup Manager – How You Use Implementation Projects to Manage Setup (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oafsm/how-you-use-implementation-projects-to-manage-setup.html' },
    { title: 'Using Functional Setup Manager – Overview of Setup Data Export and Import (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oafsm/overview-of-setup-data-export-and-import.html' },
    { title: 'Using Functional Setup Manager (full guide, PDF, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oafsm/using-functional-setup-manager.pdf' },
    { title: 'Getting Started with Your Financials Implementation (full guide, PDF, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/facsf/getting-started-with-your-financials-implementation.pdf' },
    { title: 'Implementing Applications (full guide, PDF, 26D) – lookups and profile options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/facia/implementing-applications.pdf' },
    { title: 'Implementing Enterprise Structures and General Ledger – Overview of Enterprise Structures Rapid Implementation (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/overview-of-enterprise-structures-rapid-implementation.html' },
  ],
};
