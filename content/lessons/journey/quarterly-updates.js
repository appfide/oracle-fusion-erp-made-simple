export default {
  slug: 'quarterly-updates',
  title: 'Quarterly Updates: The App That Keeps Growing',
  minutes: 14,
  summary:
    'Oracle Fusion Cloud ERP gets new features four times a year. Learn how updates are named (like 26A–26D), why your test environment gets them two weeks before production, how to read What’s New, how to switch on opt-in features, and how Sunny Lemonade tests every update.',
  objectives: [
    'Explain why a cloud ERP changes every quarter and how the updates are named',
    'Describe the order of updates: test (non-production) first, production about two weeks later',
    'Use the Readiness What’s New pages and the New Features page to plan an update',
    'Explain what opt-in features, opt-in expirations and replaced features mean',
    'Plan simple regression testing for an update',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'A game that gets new levels every season',
      html: `<p>Think about a video game on a tablet. Every few months it downloads an update all by itself. Suddenly there is a new level, a button has moved, and a bug you hated is gone. You did not have to buy a new game — it just <strong>keeps growing</strong>.</p>
<p>Oracle Fusion Cloud ERP works the same way. Because it lives in Oracle’s cloud (not on Sunny Lemonade’s own computers), Oracle updates it for everyone, on a fixed timetable. That is wonderful — free new features! — but it also means a button Ava uses every day might look a little different next quarter.</p>
<p>So smart teams do what careful gamers do: they <span class="hl">read the update notes, try the new version in a practice room first, and only then play for real</span>.</p>`,
    },
    {
      type: 'text',
      heading: 'Four updates a year, each with a name',
      html: `<p>Oracle delivers new features and major improvements to Fusion Applications <strong>four times a year</strong>. These are the <strong>quarterly updates</strong>. Oracle’s environment documentation says they are <strong>mandatory for all customers</strong> — you cannot skip one and stay on an old version forever. Staying current is part of the deal with any software-as-a-service (SaaS) product.</p>
<p>Each update has a short name made of the <strong>year</strong> plus a <strong>letter</strong>:</p>
<ul>
<li><strong>26A</strong> — the first update of 2026</li>
<li><strong>26B</strong> — the second</li>
<li><strong>26C</strong> — the third</li>
<li><strong>26D</strong> — the fourth (the newest one at the time this lesson was written)</li>
</ul>
<p>You will see these names everywhere: in the Oracle Help Center (documentation addresses contain things like <code>/26d/</code>), in the “What’s New” readiness documents, in certification names and in conversations at work (“Is that fixed in 26C?”).</p>
<p>Which <em>calendar month</em> your company gets an update depends on its <strong>quarterly schedule</strong>. Oracle offers three choices: <strong>February/May/August/November</strong>, <strong>March/June/September/December</strong>, or <strong>April/July/October/January</strong>. So two companies may get the same update a month apart.</p>`,
    },
    {
      type: 'text',
      heading: 'Bug fixes in between: maintenance packs',
      html: `<p>New <em>features</em> arrive with the quarterly update. Small <em>bug fixes</em> can also come in between, as <strong>monthly maintenance packs</strong> (also called monthly patching). Oracle’s documentation describes monthly patching as optional for most customers, but mandatory in some regulated cases (for example certain government or payment-card compliance situations). Monthly patching only fixes bugs — it does not bring new features early.</p>
<p>Oracle also publishes, for every update, a <strong>Known Issues</strong> document and maintenance pack documentation on My Oracle Support, so administrators can see what problems are known and what has been fixed.</p>`,
    },
    {
      type: 'flow',
      title: 'How one quarterly update travels to Sunny Lemonade',
      steps: [
        { icon: '📰', label: 'Readiness published', detail: 'Oracle publishes the What’s New for the update (for example Financials 26D) before it arrives.' },
        { icon: '📧', label: 'Notifications', detail: 'Administrators get emails about the maintenance event, about 30 days and again 7 days before it starts.' },
        { icon: '🧪', label: 'Test updated first', detail: 'Non-production environments are updated on the weekend after the first Friday of the update month.' },
        { icon: '🔁', label: 'Two weeks of testing', detail: 'The team re-runs its key processes in Test and reviews new features.' },
        { icon: '🏭', label: 'Production updated', detail: 'Production is updated on the weekend after the third Friday of the month.' },
        { icon: '✅', label: 'Business as usual', detail: 'Users get short tips about what changed; opt-in features are switched on when the team is ready.' },
      ],
      note: `<p>Oracle’s documentation explains that the <strong>test environment</strong> exists partly to validate maintenance updates <em>before</em> the same maintenance reaches production. The roughly two-week gap is your safety window.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the update cycle in order',
      instructions: `<p>Jordan is writing Sunny’s quarterly update checklist. Put these events in the order they happen.</p>`,
      items: [
        'Oracle publishes the What’s New for the update',
        'Administrators receive the 30-day maintenance notification',
        'The test environment is updated (weekend after the first Friday)',
        'Ava, Priya and Omar run their regression test scripts in Test',
        'Production is updated (weekend after the third Friday)',
        'Sam’s approved opt-in features are switched on in Production',
      ],
      explain: `<p>Readiness information comes first, then notifications. Test is always updated before Production, and the two weeks in between are for testing. Opt-in features are switched on only after testing and approval.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Decode the update calendar',
      instructions: `<p>Fill in the blanks using what you just learned.</p>`,
      html: `<p>The update called <strong>26C</strong> is update number {{}} of the year 20{{}}. Non-production environments are updated on the weekend after the {{}} Friday of the update month, and production after the {{}} Friday. That gives the team about {{}} weeks to test.</p>`,
      blanks: [
        { answer: 3, hint: 'A=1, B=2…' },
        { answer: 26 },
        { answer: ['first', '1st'] },
        { answer: ['third', '3rd'] },
        { answer: ['2', 'two'] },
      ],
      explain: `<p>Letters A–D count the updates in a year, so C is the third. Test is updated after the first Friday and production after the third Friday — roughly two weeks apart.</p>`,
    },
    {
      type: 'text',
      heading: 'Your environments: production, test and more',
      html: `<p>A company that subscribes to Fusion Applications gets <strong>one production environment</strong> (the real one, with real money) and <strong>one test environment</strong>. It can also buy extra <strong>development</strong> environments. Together they form an <strong>environment family</strong>, which keeps them all on the same update level over time.</p>
<p>Before go-live, when nobody uses production for real work yet, a company can ask for <strong>concurrent maintenance</strong>, which updates all environments at the same time. After go-live, almost everyone uses the normal pattern: <em>test first, production two weeks later</em>.</p>
<p>During the maintenance window itself the applications are <strong>not available</strong> for a while, so finance teams avoid planning important jobs (like a big payment run) for that weekend.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: where to read about each update',
      html: `<p><strong>Oracle Cloud Applications Readiness</strong> (part of the Oracle Help Center) has a <strong>What’s New</strong> document for each product and update — for example <em>Financials What’s New 26D</em>. Each one contains:</p>
<ul>
<li>A <strong>Feature Summary</strong> table. For each feature it shows the <em>Impact to Existing Processes</em> (Large scale, Small scale, Report or None) and the <em>Action to Enable</em> (for example available automatically, Opt In, Setup Required, or Opt In plus Setup).</li>
<li>A page per feature explaining what it does, how to switch it on and which roles can use it.</li>
<li><strong>IMPORTANT Actions and Considerations</strong> — features that are being replaced or removed, with target dates.</li>
</ul>
<p>Oracle’s own advice in the Feature Summary: focus your acceptance testing on the <strong>Large scale</strong> features.</p>`,
    },
    {
      type: 'text',
      heading: 'Opt-in features: new toys stay in the box until you open them',
      html: `<p>Not every new feature switches on by itself. Oracle delivers some features <strong>Enabled</strong> (users see them right away) and others <strong>Disabled</strong> (someone must <strong>opt in</strong>). Opt-in lets a company switch a feature on when it has trained people and adjusted its setup.</p>
<p>An administrator with the right privileges opts in from <kbd>Navigator</kbd> &gt; <kbd>My Enterprise</kbd> &gt; <kbd>New Features</kbd>. On the <strong>Features Overview</strong> page they choose an offering (such as Financials), look at the <kbd>Enabled</kbd> column, and click the icon to enable a feature and complete its steps.</p>
<p>Two more ideas to know:</p>
<ul>
<li><strong>Opt In Expiration</strong> — sometimes a feature that was opt-in becomes switched on automatically in a later update. Readiness lists these so you are not surprised.</li>
<li><strong>Replaced or removed features</strong> — Oracle sometimes replaces an old feature with a newer one. Oracle’s advice is to move to the newer version as soon as it is available. For example, the 26D What’s New says the Oracle Digital Assistant Fusion Apps templates are desupported on November 21, 2026, and recommends Oracle AI Agent Studio instead. It also says the Fusion Expenses iOS and Android apps will no longer be supported from update 27B, pointing users to the Expenses Agent.</li>
</ul>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Sort the update notes',
      instructions: `<p>Jordan reads these lines in the What’s New. Put each one in the right bucket for Sunny’s update plan.</p>`,
      categories: ['Test it carefully now', 'Decide when to switch on', 'Plan a replacement'],
      items: [
        { text: 'A Payables feature marked “Large scale” impact that is available automatically', answer: 'Test it carefully now' },
        { text: 'A new General Ledger feature whose Action to Enable is “Opt In”', answer: 'Decide when to switch on' },
        { text: 'A feature listed under IMPORTANT Actions and Considerations with a target removal update', answer: 'Plan a replacement' },
        { text: 'A changed predefined report (impact “Report”) that Priya uses at month-end', answer: 'Test it carefully now' },
        { text: 'A feature delivered Disabled that needs setup before use (“Opt In plus Setup”)', answer: 'Decide when to switch on' },
        { text: 'A mobile app that will no longer be supported from a future update', answer: 'Plan a replacement' },
      ],
      explain: `<p>Features that switch on by themselves (especially Large scale ones and changed reports you rely on) must be tested in the two-week window. Opt-in features wait for a business decision and training. Replaced or retiring features need a migration plan before the deadline.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny Lemonade gets ready for 26D',
      html: `<p>Sunny Lemonade is on the <strong>February/May/August/November</strong> schedule. Jordan, the implementation consultant, now helps them every quarter with an “update plan”.</p>`,
      steps: [
        '<strong>Read:</strong> Jordan opens the Financials What’s New for 26D and downloads the Feature Summary. They mark every feature in Payables, General Ledger, Receivables, Cash Management and Assets.',
        '<strong>Sort:</strong> Features with <em>Large scale</em> impact go to the top of the test list. Features with <em>Opt In</em> go on a separate “decide later” list.',
        '<strong>Check the warnings:</strong> In IMPORTANT Actions and Considerations, Jordan notices the Expenses mobile app retirement planned for 27B. Noah uses that app for receipts, so Jordan adds “plan move to the Expenses Agent” to next year’s roadmap.',
        '<strong>Test:</strong> The weekend after the first Friday of November, Test is updated. Ava enters and validates a $500 Lemon Grove Farms invoice and runs a small payment. Priya imports and posts a journal. Omar applies a receipt from Happy Cafe. Each person ticks their row in the shared test script.',
        '<strong>Fix and decide:</strong> One custom report (an OTBI analysis) shows a changed column name; the report owner fixes it in Test and notes the change for Production. Sam approves switching on one new opt-in Payables feature in January, after training.',
        '<strong>Go:</strong> Two weeks later Production is updated. Because everyone tested, Monday morning is calm. ☀️',
      ],
      result: `<p>The update cost Sunny a few hours of testing — and gave them new features for free. Skipping the testing would have saved those hours but risked a broken report on the day Sam needed it.</p>`,
    },
    {
      type: 'slides',
      title: 'Regression testing in five steps',
      slides: [
        { icon: '📋', title: 'What is regression testing?', html: `<p><strong>Regression</strong> means “going backwards”. A regression test checks that things which worked <em>before</em> the update still work <em>after</em> it. You are not testing the new feature — you are protecting your old, important processes.</p>` },
        { icon: '⭐', title: 'Pick your critical flows', html: `<p>List the processes that would hurt most if they broke: entering and paying supplier invoices, journal import and posting, billing customers, applying receipts, bank reconciliation, depreciation, month-end reports, and every <strong>integration</strong> with other systems.</p>` },
        { icon: '📝', title: 'Write a repeatable script', html: `<p>For each flow, write simple steps and the expected result (“Invoice validates with no holds; accounting creates a debit to 5110 and a credit to 2110”). Reuse the same script every quarter.</p>` },
        { icon: '🧪', title: 'Run it in Test', html: `<p>Run the script in the updated test environment during the two-week window. Include custom reports, approval workflows, security roles and anything your company built or configured.</p>` },
        { icon: '🤖', title: 'Automate when you grow', html: `<p>Bigger companies use automated testing tools so that hundreds of checks run every quarter without people clicking through each one.</p>` },
      ],
    },
    {
      type: 'table',
      caption: 'Who does what during a quarterly update',
      headers: ['Person', 'What they do', 'Why it matters'],
      rows: [
        ['Jordan (consultant / admin)', 'Reads What’s New, builds the test plan, opts in to features', 'Nothing important is a surprise'],
        ['Ava, Priya, Omar, Mia', 'Run their test scripts in Test', 'The people who use a process daily spot problems fastest'],
        ['Report owners', 'Re-check custom OTBI analyses and Analytics Publisher reports', 'Custom reports are a common place for small breaks'],
        ['Integration owner', 'Re-test files and APIs that connect to other systems', 'A broken interface can silently stop data flowing'],
        ['Sam (CFO)', 'Approves which opt-in features go live and when', 'Business decides, not just IT'],
      ],
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'How real teams keep up without drowning',
      html: `<ul>
<li><strong>Make it a calendar habit.</strong> Put the update weekends for Test and Production in the team calendar a year ahead.</li>
<li><strong>Read only your part first.</strong> The Feature Summary is long. Filter it by your modules, then read the feature pages that matter to you.</li>
<li><strong>Follow the community.</strong> Oracle points customers to the Financials forums on <strong>Cloud Customer Connect</strong> for discussion of upcoming changes, and to the <strong>Ideas Lab</strong> where customers suggest features (some What’s New items are marked as delivered ideas).</li>
<li><strong>Watch for Redwood.</strong> Oracle is moving many pages to its new <strong>Redwood</strong> look. Readiness has an “Adopt Redwood” area to help plan this.</li>
<li><strong>Keep a change log.</strong> One page per update: what changed, what you tested, what you switched on. Auditors and new team members love it.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Common mistakes',
      html: `<ul>
<li>Testing only the <em>new</em> features and forgetting the old critical flows.</li>
<li>Scheduling a payment run or a month-end close during the maintenance window.</li>
<li>Forgetting that for about two weeks Test and Production are on <em>different</em> versions. Anything you check or build in Test during that window is on the new version, so plan copies (refreshes) between environments with your administrator.</li>
<li>Ignoring the “replaced feature” list until the old feature disappears.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Quarterly update', def: 'The mandatory update Oracle delivers four times a year, bringing new features and improvements, named like 26A, 26B, 26C and 26D.' },
        { term: 'Maintenance pack', def: 'A monthly bundle of bug fixes that can be applied between quarterly updates. It does not add new features.' },
        { term: 'Non-production environment', def: 'A test or development copy of the system, updated before production so changes can be checked safely.' },
        { term: 'What’s New', def: 'Oracle’s readiness document for each update that describes every new feature, its impact and how to enable it.' },
        { term: 'Opt-in feature', def: 'A new feature delivered switched off; an administrator turns it on when the company is ready.' },
        { term: 'Opt In Expiration', def: 'When a feature that used to be opt-in becomes switched on automatically in a later update.' },
        { term: 'Regression testing', def: 'Re-testing the important processes that already worked to make sure an update did not break them.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'What does the name “26C” tell you?',
          options: ['It is the 26th update of the year', 'It is the third quarterly update of 2026', 'It is a monthly bug-fix pack', 'It is a version only for customers in country C'],
          answer: 1,
          explain: 'Quarterly updates are named with the year plus a letter: A, B, C, D for the first to fourth update. 26C is the third update of 2026.',
        },
        {
          q: 'Which environment normally receives a quarterly update first?',
          options: ['Production', 'The test (non-production) environment', 'Both at exactly the same moment, always', 'Whichever one the users choose on the day'],
          answer: 1,
          explain: 'Non-production environments are updated on the weekend after the first Friday of the update month, and production about two weeks later, after the third Friday. That gap is for testing.',
        },
        {
          q: 'A new feature in the Feature Summary says “Opt In”. What does that mean?',
          options: ['It is already switched on for everyone', 'It is delivered switched off; an administrator decides when to enable it', 'It costs extra money', 'It will be removed next quarter'],
          answer: 1,
          explain: 'Opt-in features are delivered Disabled. An administrator enables them from Navigator > My Enterprise > New Features when the business is ready.',
        },
        {
          q: 'Why does Sunny re-test entering and paying a normal $500 invoice every quarter, even when nothing in Payables seems new?',
          options: ['Because Oracle requires a screenshot', 'To make sure the update did not break a process that worked before — that is regression testing', 'Because invoices expire every quarter', 'To create extra work for Ava'],
          answer: 1,
          explain: 'Regression testing protects existing critical processes. Updates change shared pieces, so even “untouched” flows deserve a quick check.',
        },
        {
          q: 'Where would you look to learn that an old feature is being replaced and when it will be removed?',
          options: ['The IMPORTANT Actions and Considerations section of What’s New', 'The supplier’s invoice', 'The chart of accounts', 'The bank statement'],
          answer: 0,
          explain: 'Each What’s New document has an IMPORTANT Actions and Considerations section listing replaced or removed features with target dates and their replacements.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Planning an Environment Family (maintenance types, schedules and notifications)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en-us/iaas/Content/fusion-applications/plan-environment-family.htm' },
    { title: 'Overview of Fusion Applications Environment Management', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en-us/iaas/Content/fusion-applications/overview.htm' },
    { title: 'Modifying the Frequency of Service Maintenance', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/get-started/subscriptions-cloud/mmocs/modifying-frequency-service-maintenance.html' },
    { title: 'Financials What’s New 26D — Optional Uptake of New Features (Opt In)', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-t78612.htm' },
    { title: 'Financials What’s New 26D — Feature Summary', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-t78734.htm' },
    { title: 'Financials What’s New 26D — IMPORTANT Actions and Considerations', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-t78536.htm' },
    { title: 'Cloud Applications Readiness — Enterprise Resource Planning', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp-all.html' },
  ],
};
