export default {
  slug: 'finding-your-way',
  title: 'Finding Your Way Around the Screens',
  minutes: 15,
  summary:
    'Sign in, read the home page, use the global header, the Navigator and search, open work areas, find your approvals and run scheduled processes — the everyday skills every Oracle Fusion user needs, in both Redwood and classic pages.',
  objectives: [
    'Sign in to Oracle Fusion and describe what single sign-on and multifactor authentication do',
    'Name the parts of the global header and the home page and say what each is for',
    'Use the Navigator, work areas, landing pages and the Tasks panel tab to reach a task',
    'Find approvals and notifications in the worklist or the Approvals work area',
    'Explain what a scheduled process is and where to check its status',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Your first day at a giant theme park',
      html: `<p>Walking into a giant theme park for the first time can be confusing. But every good park gives you the same tools:</p>
<ul>
<li>a <strong>ticket</strong> to get in at the gate,</li>
<li>a <strong>main square</strong> with signposts to the most popular rides,</li>
<li>a <strong>big map</strong> showing every area of the park,</li>
<li>an <strong>information desk</strong> where you can ask "where is…?",</li>
<li>and a <strong>message board</strong> that says "your ride is ready!"</li>
</ul>
<p><span class="hl">Oracle Fusion works the same way.</span> Your user name and password are the ticket, the home page is the main square, the <strong>Navigator</strong> is the big map, <strong>search</strong> is the information desk and <strong>notifications</strong> are the message board. Learn these five and you'll never be lost.</p>`,
    },
    {
      type: 'text',
      heading: 'Signing in',
      html: `<p>Your company gives you a link (a web address) to its Oracle Fusion environment. Opening it shows the <strong>Sign In</strong> page, where you enter your user ID and password. Your user ID might look like a name, an email address or something else your company chose.</p>
<ul>
<li><strong>Single sign-on (SSO)</strong>: many companies connect Fusion to their own login system. Then you click a company sign-on button and use the same login as your email. SSO means you don't need a separate Fusion password.</li>
<li><strong>Multifactor authentication (MFA)</strong>: you may be asked for a second proof that it's really you — for example a push notification or passcode in the Oracle Mobile Authenticator app, a text message code, an email code or a passkey.</li>
<li><strong>Timeouts</strong>: for security, Oracle signs you out after a period of inactivity, and every session has a maximum lifetime (Oracle's guide lists 8 hours). Save your work regularly.</li>
</ul>
<p>Oracle's tip: sign in only once — not in several browsers or several tabs at the same time — to avoid surprise timeouts.</p>`,
    },
    {
      type: 'slides',
      title: 'Tour of the home page',
      slides: [
        {
          icon: '🧭',
          title: 'The global header',
          html: `<p>The strip across the top of <strong>every</strong> page. It holds the Navigator, global search, the Home icon, Favorites and Recent Items, Watchlist, Notifications and your user menu. Because it is always there, you can jump anywhere from anywhere.</p>`,
        },
        {
          icon: '🔲',
          title: 'Apps section (the springboard)',
          html: `<p>A grid of <strong>work area icons</strong>, grouped into tabs that match the groups in the Navigator (for example a tab for Payables). Click an icon to open that work area. You can show or hide icons with the <kbd>Personalize Springboard</kbd> icon.</p>`,
        },
        {
          icon: '⚡',
          title: 'Quick Actions',
          html: `<p>Shortcuts straight to common tasks in the selected group — like creating an invoice — without first opening a work area. <kbd>Show More</kbd> lists them all.</p>`,
        },
        {
          icon: '✅',
          title: 'Things to Finish',
          html: `<p>Your open notifications that need action, such as an invoice waiting for your approval. You can often approve or reject right there.</p>`,
        },
        {
          icon: '📰',
          title: 'News, Announcements and Analytics',
          html: `<p>Company announcements and small interactive charts called <strong>infolets</strong> that summarize what's happening in your area. What you see depends on your role and on how the administrator set up the home page.</p>`,
        },
      ],
    },
    {
      type: 'table',
      caption: 'The global header, icon by icon',
      headers: ['Element', 'What you use it for'],
      rows: [
        ['<strong>Navigator</strong> (the menu icon)', 'The full map: every work area you are allowed to use, grouped into categories such as Payables, General Accounting, Tools and My Enterprise.'],
        ['<strong>Global Search</strong>', 'Type keywords to find records or pages across many business objects.'],
        ['<strong>Home</strong> (or the logo)', 'Return to the home page from anywhere.'],
        ['<strong>Favorites and Recent Items</strong>', 'Bookmark pages you use often and reopen pages you visited recently.'],
        ['<strong>Watchlist</strong>', 'Jump to items you are tracking, grouped by category, such as expense reports waiting to be submitted.'],
        ['<strong>Notifications</strong> (the bell)', 'Messages for you, including workflow tasks you must act on.'],
        ['<strong>Settings and Actions</strong> menu (click your photo or name)', 'Set preferences (language, password, accessibility), troubleshoot, show help icons, and <kbd>Sign Out</kbd>. Administrators see extra options here.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match the header tool to the job',
      instructions: `<p>Ava needs to do each of these things. Match each one to the global header tool Ava should use.</p>`,
      pairs: [
        { left: 'See the full list of work areas Ava can open', right: 'Navigator' },
        { left: 'Reopen the Invoices page Ava bookmarked yesterday', right: 'Favorites and Recent Items' },
        { left: 'Check messages and tasks that need Ava’s action', right: 'Notifications' },
        { left: 'Change the language and date format', right: 'Settings and Actions menu' },
        { left: 'Find a record by typing a few keywords', right: 'Global Search' },
        { left: 'Get back to the home page from anywhere', right: 'Home' },
      ],
      explain: `<p>The <strong>Navigator</strong> is the full map; <strong>Favorites and Recent Items</strong> is your bookmark list; the <strong>Notifications</strong> bell shows messages and tasks; the <strong>Settings and Actions</strong> menu (your photo or name) holds preferences and Sign Out; <strong>Global Search</strong> finds things by keyword; <strong>Home</strong> takes you back to the start.</p>`,
    },
    {
      type: 'text',
      heading: 'Work areas and landing pages',
      html: `<p>A <strong>work area</strong> is a set of pages that gives you everything you need for one business goal. For example, Ava spends the day in the <strong>Invoices</strong> work area (under <em>Payables</em> in the Navigator), Priya lives in <strong>Journals</strong> (under <em>General Accounting</em>), and almost everyone visits <strong>Scheduled Processes</strong> (under <em>Tools</em>).</p>
<p>When you open a work area you land on its <strong>landing page</strong>. Landing pages come in a few shapes:</p>
<ul>
<li><strong>Infotiles</strong> – a row of tiles, each with a count. The Payables Invoices landing page, for example, has infotiles such as <em>Scanned</em>, <em>Recent</em>, <em>Holds</em>, <em>Approvals</em>, <em>Prepayments</em> and <em>Payments</em>. Click a tile and the table below shows those records.</li>
<li><strong>Search and filters</strong> – find the records you need, then open one or use the Actions menu.</li>
<li><strong>Infolets</strong> – small charts you can drill into.</li>
<li><strong>Quick access to tasks</strong> – a page that simply lists the key tasks.</li>
</ul>
<p>Many classic work areas also have a <strong>panel tab</strong> on the side of the page. The most important one is the <strong>Tasks</strong> panel tab: open it to see a list of links for everything you can do in that work area, such as <em>Create Invoice</em> or <em>Manage Invoices</em>. Some work areas also have a <strong>Reports and Analytics</strong> panel tab.</p>`,
    },
    {
      type: 'flow',
      title: 'Three roads to the same task',
      steps: [
        { icon: '🔍', label: 'Search', detail: 'Type what you want in global search and open it from the results.' },
        { icon: '🗺️', label: 'Navigator', detail: 'Open the Navigator, choose the group and the work area, then use the Tasks panel tab.' },
        { icon: '⭐', label: 'Favorites', detail: 'Once you’ve found a page, add it to Favorites so next time it’s one click.' },
      ],
      note: `<p>Oracle's own advice: try global search first, and if that doesn't find it, use the Navigator. If a work area is missing from both, you probably don't have the role for it — ask your security administrator.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: open the Payables Invoices work area',
      items: [
        'Sign in and click the <kbd>Navigator</kbd> icon in the global header.',
        'Under the <strong>Payables</strong> group, click <kbd>Invoices</kbd>. (Oracle’s guides write this as <em>Navigator &gt; Payables &gt; Invoices</em>.)',
        'Look at the infotiles across the landing page and click one to filter the table below.',
        'Open the <kbd>Tasks</kbd> panel tab on the side of the page to see links such as creating or managing invoices.',
        'Click the <kbd>Favorites and Recent Items</kbd> icon and add this page to your favorites.',
      ],
      note: `<p>Labels and layout differ slightly by release and by whether your company has switched on the Redwood version of a page. You can only see work areas your roles allow.</p>`,
    },
    {
      type: 'text',
      heading: 'Search: global and on the page',
      html: `<p>There are two kinds of search:</p>
<ul>
<li><strong>Global search</strong> in the header looks across many kinds of records using keywords. It's great when you don't know where something lives.</li>
<li><strong>Page-level search</strong> sits on the pages where you work. It lets you search one kind of record (like invoices) with detailed criteria — supplier, date, status, amount. You can save a search you use often and reuse it later.</li>
</ul>
<p>In tables you can usually filter column by column (Oracle calls one version of this <em>Query By Example</em>), and often <strong>export to Excel</strong>.</p>
<p>On newer Redwood pages you'll often meet a bigger, smarter search bar. Oracle's documentation calls the Redwood search experience <strong>Ask Oracle</strong>, and it can remember filter combinations you use.</p>`,
    },
    {
      type: 'text',
      heading: 'Notifications, the worklist and approvals',
      html: `<p>A lot of work in Fusion flows from person to person through <strong>workflow</strong>. For example, Ava enters an invoice and it travels to a manager for approval. You learn about these tasks through:</p>
<ul>
<li><strong>Email notifications</strong>,</li>
<li>the <strong>Notifications</strong> bell in the global header, and</li>
<li>the <strong>Things to Finish</strong> section on your home page.</li>
</ul>
<p>To see <em>all</em> your tasks in one place, use the <strong>Worklist: Notifications and Approvals</strong> work area (<em>Navigator &gt; Tools &gt; Worklist</em>). If your administrator has set it up, the newer <strong>Approvals</strong> work area (<em>Navigator &gt; Tools &gt; Approvals</em>) replaces the worklist with a cleaner page and better search. Some tasks are just <strong>FYI</strong> (for your information) and only need dismissing.</p>
<p>Going on holiday? You can set <strong>vacation rules</strong> so your approvals are reassigned or delegated while you're away.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Where would you go?',
      instructions: `<p>Pick the best place in Oracle Fusion for each situation.</p>`,
      categories: ['Worklist or Approvals work area', 'Scheduled Processes work area', 'Navigator', 'Set Preferences'],
      items: [
        { text: 'Sam wants to see every invoice approval waiting for Sam', answer: 'Worklist or Approvals work area' },
        { text: 'Priya wants to know whether last night’s import job finished', answer: 'Scheduled Processes work area' },
        { text: 'Omar is looking for a work area that isn’t on Omar’s home page', answer: 'Navigator' },
        { text: 'Mia wants dates shown in Mia’s own regional format', answer: 'Set Preferences' },
        { text: 'Ava wants to run a report every Monday morning automatically', answer: 'Scheduled Processes work area' },
        { text: 'Sam is going on holiday and wants the approvals handled by someone else', answer: 'Worklist or Approvals work area' },
      ],
      explain: `<p>Approvals and vacation rules live with your workflow tasks in the <strong>worklist</strong> (or the newer <strong>Approvals</strong> work area). Background jobs, their schedules, status and output live in <strong>Scheduled Processes</strong>. The <strong>Navigator</strong> lists every work area you can open. Personal settings such as formats and language are in <strong>Set Preferences</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Scheduled processes: jobs that run in the background',
      html: `<p>Some jobs are too big to do by clicking — importing hundreds of invoices, creating accounting for a whole day, printing a report. These run as <strong>scheduled processes</strong>. You submit one, fill in its <strong>parameters</strong> (like which ledger or which dates), and it runs in the background. You can run it once now, or on a schedule such as every night.</p>
<p>Each run gets a unique <strong>process ID</strong>. Processes with printable output often have "Report" in their name. A <strong>process set</strong> runs several processes together.</p>
<p>You'll go much deeper in the Data module's lesson on scheduled processes.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: submit a scheduled process and check it',
      items: [
        'Open <em>Navigator &gt; Tools &gt; Scheduled Processes</em>.',
        'On the Scheduled Processes Overview page, click <kbd>Schedule New Process</kbd>.',
        'Leave the type as Job, choose the process (for example a report you have access to) and click <kbd>OK</kbd>.',
        'In the Process Details dialog box, enter at least the required parameters. Click <kbd>Advanced</kbd> only if you want a schedule or special output.',
        'Submit, note the process ID, then refresh the overview table to watch the status change until it finishes. Open the row to view the log or output.',
      ],
      note: `<p>Steps follow Oracle's <em>Using Common Features</em> guide; labels may vary slightly by release. If you can't see the Scheduled Processes work area, ask for a role that grants it.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the scheduled process steps in order',
      instructions: `<p>Ava needs to run a report as a scheduled process. Put the steps in the right order.</p>`,
      items: [
        'Open Navigator > Tools > Scheduled Processes',
        'Click Schedule New Process',
        'Choose the process and click OK',
        'Enter the required parameters in Process Details',
        'Submit and note the process ID',
        'Refresh until the status shows it finished, then open the output',
      ],
      explain: `<p>You open the work area, start a new submission, pick the process, fill in its parameters, then submit. Each run gets a <strong>process ID</strong>, so you can find it again and open its log or output once it's done.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Redwood vs. classic: what changes for you',
      html: `<ul>
<li><strong>Classic</strong> pages: infotiles, Tasks panel tabs, "Search" regions with many fields, and Done/Save and Close buttons.</li>
<li><strong>Redwood</strong> pages: a cleaner layout, a large search bar, guided steps, and often AI-assisted features. Fewer panel tabs; actions sit near the record.</li>
<li>Both styles coexist. One tip from Oracle's guide: in the browser address, a page built with Redwood (Visual Builder Studio) usually has <code>redwood</code> in the third part of the URL, while classic ADF pages show <code>faces</code>.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: personalizing and getting help',
      html: `<ul>
<li><strong>Set Preferences</strong> (from the Settings and Actions menu) lets you choose language, date and number formats, time zone, accessibility mode, and change your password if you don't use SSO.</li>
<li>You can show or hide springboard icons, save searches, add favorites and set up your watchlist.</li>
<li>Click <strong>help icons</strong> on a page to open a help window with links into the Oracle Help Center. If help icons are hidden, you can show them from the Settings and Actions menu.</li>
<li>If something is broken, the Settings and Actions menu also has troubleshooting options, such as recording an issue to send to your help desk.</li>
</ul>`,
    },
    {
      type: 'example',
      title: 'Ava’s Monday morning',
      html: `<p>Ava signs in through Sunny's company SSO button and approves the push notification on the authenticator app on Ava’s phone.</p>`,
      steps: [
        'On the home page, <strong>Things to Finish</strong> shows one item: a question from Sam about the Bright Power Utility invoice.',
        'Ava clicks the <strong>bell</strong> and sees an FYI saying last night’s invoice import finished.',
        'From <strong>Favorites</strong>, Ava opens the Payables <strong>Invoices</strong> work area and clicks the <strong>Holds</strong> infotile to see which invoices are stuck.',
        'Ava uses the <strong>Tasks</strong> panel tab to create a new invoice for Sweet Sugar Co. ($200).',
        'At lunch Ava checks <strong>Scheduled Processes</strong> to confirm the accounting process Ava submitted has succeeded.',
      ],
      result: `<p>Five tools, used over and over: home page, notifications, favorites, work areas with their Tasks panel, and scheduled processes. That is most of a day's navigation in Fusion.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Learn the <strong>name of the work area and the task</strong>, not the position of a button. Positions move with Redwood and quarterly updates; names like <em>Invoices</em>, <em>Journals</em>, <em>Scheduled Processes</em> and <em>Approvals</em> stay stable — and they're what colleagues and Oracle Support will use when they help you.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Global header', def: 'The bar at the top of every page with the Navigator, search, home, favorites, notifications and your user menu.' },
        { term: 'Navigator', def: 'The main menu listing every work area you have access to, arranged in groups.' },
        { term: 'Work area', def: 'A set of pages that gives you everything needed for one business goal, such as Invoices or Journals.' },
        { term: 'Landing page', def: 'The first page of a work area, usually summarizing records with infotiles, searches or infolets.' },
        { term: 'Tasks panel tab', def: 'A side panel on many classic work areas that lists links to the tasks you can perform there.' },
        { term: 'Worklist', def: 'The place to find and act on all your workflow tasks, such as approvals; some companies use the newer Approvals work area instead.' },
        { term: 'Scheduled process', def: 'A background job you submit with parameters, once or on a schedule, such as an import or a report.' },
        { term: 'Single sign-on (SSO)', def: 'Signing in with your company login so you don’t need a separate password for each application.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Priya can’t find the work area needed on the home page. What should Priya check next?',
          options: ['The Watchlist', 'The Navigator, which lists every work area Priya has access to', 'The Sign In page', 'The Things to Finish section'],
          answer: 1,
          explain: 'The home page shows only some icons. The Navigator is the full map of work areas you can access. If it’s not there either, Priya likely needs a role.',
        },
        {
          q: 'Where can Ava see all the approval tasks assigned to Ava in one place?',
          options: [
            'The Scheduled Processes work area',
            'The Worklist: Notifications and Approvals work area, or the Approvals work area if enabled',
            'Favorites and Recent Items',
            'The Personalize Springboard page',
          ],
          answer: 1,
          explain: 'Workflow tasks live in the worklist (Navigator > Tools > Worklist), or in the Approvals work area when the administrator has switched it on.',
        },
        {
          q: 'Which statement about scheduled processes is TRUE?',
          options: [
            'They can only be run once',
            'Each run gets a unique process ID and can be scheduled to repeat',
            'They can only be submitted by Oracle',
            'They never produce output',
          ],
          answer: 1,
          explain: 'Scheduled processes can run once or on a recurring schedule, each run has its own ID, and many produce output such as reports.',
        },
        {
          q: 'In a classic work area like Invoices, where do you usually find links such as “Create Invoice”?',
          options: ['In the Tasks panel tab', 'In the Settings and Actions menu', 'In the Oracle Help Center', 'In the bell icon'],
          answer: 0,
          explain: 'Classic work areas list their tasks in the Tasks panel tab on the side of the page. Redwood pages usually place actions closer to the records.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Common Features – Sign In and Get Started (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/sign-in-and-get-started.html' },
    { title: 'Using Common Features – Overview of Work Areas (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/overview-of-work-areas.html' },
    { title: 'Using Common Features – Overview of Search (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/overview-of-search.html' },
    { title: 'Using Common Features – Overview of Notifications and Approval Workflows (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/overview-of-notifications-and-approval-workflows.html' },
    { title: 'Using Common Features – What are scheduled processes? (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/overview-of-scheduled-processes.html' },
    { title: 'Using Common Features – Get Help in the Application (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/get-help-in-the-application.html' },
    { title: 'Using Common Features (full guide, PDF, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/using-common-features.pdf' },
    { title: 'Using Payables Invoice to Pay (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/index.html' },
    { title: 'Adopting Redwood', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/readiness/redwood-adoption/index.html' },
  ],
};
