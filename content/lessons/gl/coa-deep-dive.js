export default {
  slug: 'coa-deep-dive',
  title: 'Chart of Accounts Deep Dive',
  minutes: 18,
  summary:
    'Go beyond the basics of the chart of accounts: segments and their labels, value sets and value attributes, account hierarchies (trees), cross-validation rules, segment value security and how account combinations are created on the fly.',
  objectives: [
    'Describe how segments, segment labels, value sets and values fit together in an Oracle chart of accounts',
    'Explain the key attributes of a segment value: enabled, dates, summary, allow posting and account type',
    'Explain what account hierarchies (trees) are and why reporting, allocations and security depend on them',
    'Explain how cross-validation rules and dynamic insertion control which account combinations exist',
    'Recognize the Setup and Maintenance tasks used to maintain the chart of accounts',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'An address with a rulebook and a map',
      html: `<p>A home address has parts: <strong>country, city, street, house number</strong>. Each part comes from its own list. You can’t invent a city called “Banana”. And some mixes are impossible: “Paris, Texas, France” is wrong, even though every word on its own is real.</p>
<p>The post office also has a <strong>map</strong> that groups houses into streets, streets into cities and cities into countries. So it can quickly answer “How many letters went to all of France?” without counting house by house.</p>
<p><span class="hl">A chart of accounts works the same way.</span> Each <strong>segment</strong> is one part of the address. Each segment has its own list of allowed <strong>values</strong>. <strong>Cross-validation rules</strong> forbid silly mixes. And <strong>account hierarchies</strong> are the map that rolls little numbers up into big totals.</p>`,
    },
    {
      type: 'text',
      heading: 'Quick recap, then deeper',
      html: `<p>In the Basics lesson <em>Ledgers and the Chart of Accounts</em> you met the four Cs: <strong>chart of accounts, calendar, currency</strong> and <strong>accounting method</strong> (convention). You learned that Sunny uses a five-segment chart of accounts, the <strong>Sunny COA</strong>: <code>Company - Cost Center - Account - Product - Intercompany</code>, such as <code>101-200-5110-010-000</code>.</p>
<p>In Oracle Fusion the chart of accounts is technically a <strong>key flexfield</strong> called the <em>Accounting Flexfield</em>. It is built in two layers:</p>
<ul>
<li>A <strong>chart of accounts structure</strong> says how many segments there are, their order, names, prompts, labels and default value sets.</li>
<li>A <strong>chart of accounts structure instance</strong> is the version a ledger actually uses. It inherits the structure’s shape. At this level you can swap value sets, attach an account hierarchy to each segment and decide whether new combinations may be created automatically.</li>
</ul>
`,
    },
    {
      type: 'table',
      caption: 'The Sunny COA segment by segment',
      headers: ['#', 'Segment', 'Segment label', 'Example values', 'Why it matters'],
      rows: [
        ['1', 'Company', '<strong>Primary Balancing Segment</strong>', '101 Sunny Lemonade US Inc., 201 Sunny Lemonade UK Ltd', 'Every journal must balance for each company value, so you can produce a trial balance per legal entity.'],
        ['2', 'Cost Center', '<strong>Cost Center</strong>', '100 Administration, 200 Kitchen, 300 Sales', 'Groups spending by department. Assets and Expenses rely on it, and approvals can route by it.'],
        ['3', 'Account', '<strong>Natural Account</strong>', '1110 Cash … 7120 Foreign Exchange Gain/Loss', 'Each value carries an account type (asset, liability, equity, revenue, expense), which drives year-end processing.'],
        ['4', 'Product', '(none)', '000 None, 010 Classic Lemonade, 020 Pink Lemonade', 'Lets Sam see profit by product.'],
        ['5', 'Intercompany', '<strong>Intercompany</strong>', '000 None, 101 US, 201 UK', 'Records which sister company the other side of an intercompany entry belongs to.'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Segment labels: special powers for special segments',
      html: `<p>Segment labels (called flexfield qualifiers in the older E-Business Suite) tell Oracle which segment plays which role:</p>
<ul>
<li><strong>Primary Balancing Segment</strong> (required). Oracle also offers a second and third balancing segment label for companies that need balancing by more than one segment.</li>
<li><strong>Natural Account</strong> (required). It decides the account type and year-end treatment.</li>
<li><strong>Cost Center</strong> (optional, but needed for Oracle Assets depreciation and to hold approval limits in Oracle Expenses).</li>
<li><strong>Intercompany</strong> (optional). It is used by intercompany balancing.</li>
</ul>
<p>A segment with no label, like Sunny’s Product segment, is perfectly normal. It’s just a reporting dimension.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match each Sunny segment to its segment label',
      instructions: `<p>Jordan is reviewing the Sunny COA structure. Pick the segment label (or “No label”) for each segment.</p>`,
      pairs: [
        { left: 'Company (101, 201)', right: 'Primary Balancing Segment' },
        { left: 'Cost Center (100, 200, 300)', right: 'Cost Center' },
        { left: 'Account (1110 … 7120)', right: 'Natural Account' },
        { left: 'Product (000, 010, 020)', right: 'No label (a reporting segment)' },
        { left: 'Intercompany (000, 101, 201)', right: 'Intercompany' },
      ],
      explain: `<p>Company is the primary balancing segment, so every journal balances by company. Account is the natural account, which carries the account type. Product is a normal reporting segment with no special label, and that is perfectly fine.</p>`,
    },
    {
      type: 'text',
      heading: 'Value sets: the list of allowed values',
      html: `<p>A <strong>value set</strong> is a container of valid values for a segment. When someone types an account, Oracle checks each segment against its value set. If you type a value that isn’t on the list, Oracle shows you the valid choices instead.</p>
<p>For chart of accounts value sets, Oracle’s guidance is strict:</p>
<ul>
<li>Use the <strong>Independent</strong> validation type. Other types block features such as data security, reporting and account hierarchy integration, and dependent value sets aren’t supported.</li>
<li>Use the <strong>Character</strong> data type with the Text subtype, because natural accounts often mix numbers and letters. Set the maximum length to match the segment.</li>
<li>Set the <strong>Module</strong> to General Ledger so everyone knows the value set belongs to a chart of accounts.</li>
<li>Turn on <strong>Enable Security</strong> only if you plan to use segment value security (more on that below).</li>
</ul>
<p>One value set can be shared by several segments or charts of accounts. Sunny’s two ledgers share the same Sunny COA, so the US and UK companies pick from exactly the same lists.</p>`,
    },
    {
      type: 'table',
      caption: 'Attributes you set on each value (with Sunny examples)',
      headers: ['Attribute', 'What it means', 'Sunny example'],
      rows: [
        ['<strong>Enabled</strong>', 'Whether the value can be used at all.', '300 Sales is enabled. An old cost center would be disabled, not deleted.'],
        ['<strong>Start and End Date</strong>', 'The dates the value is valid.', 'Product 020 Pink Lemonade starts 1 Jun 2025, its launch date.'],
        ['<strong>Summary</strong>', 'Marks a parent value used only to add up children in hierarchies.', '6000 Operating Expenses is a summary value.'],
        ['<strong>Allow Posting</strong>', 'Whether journals can post to the value.', '6110 Rent: Yes. 6000 Operating Expenses (parent): No.'],
        ['<strong>Account Type</strong> (natural account only)', 'Asset, Liability, Owner’s Equity, Revenue or Expense.', '1110 = Asset, 2110 = Liability, 4110 = Revenue, 6110 = Expense.'],
        ['<strong>Third Party Control Account</strong>', 'Requires supplier or customer details and blocks manual GL journals.', '2110 = Supplier Control Account. 1210 = Customer Control Account.'],
        ['<strong>Reconcile</strong>, <strong>Financial Category</strong>', 'Flags for clearing-account reconciliation and for OTBI reporting.', '1110 Cash could get the financial category for cash.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Set the account type for each natural account value',
      instructions: `<p>Jordan is loading Sunny’s account values. Choose the <strong>Account Type</strong> attribute for each one.</p>`,
      categories: ['Asset', 'Liability', 'Owner’s Equity', 'Revenue', 'Expense'],
      items: [
        { text: '1210 Accounts Receivable', answer: 'Asset' },
        { text: '1590 Accumulated Depreciation (contra asset)', answer: 'Asset' },
        { text: '2210 Sales Tax Payable', answer: 'Liability' },
        { text: '3100 Owner’s Equity', answer: 'Owner’s Equity' },
        { text: '4110 Lemonade Sales Revenue', answer: 'Revenue' },
        { text: '6140 Depreciation Expense', answer: 'Expense' },
        { text: '7110 Bank Charges', answer: 'Expense' },
      ],
      explain: `<p>Accumulated Depreciation is tricky. It normally has a credit balance, but it is still typed as an <strong>Asset</strong>, because it reduces the value of the equipment on the balance sheet. A wrong type would send balances to the wrong place at year-end.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Get the account type right the first time',
      html: `<p>Oracle warns that a wrong account type gives wrong accounting and wrong financial statements. At year-end, revenue and expense balances are swept into retained earnings, while asset, liability and equity balances carry forward. If 6110 Rent were wrongly marked as an Asset, rent would pile up year after year instead of starting fresh. Check the types <em>before</em> any account combinations are created.</p>`,
    },
    {
      type: 'slides',
      title: 'Account hierarchies (trees): the map of your accounts',
      slides: [
        {
          icon: '🌳',
          title: 'What a tree is',
          html: `<p>In Oracle Fusion, account hierarchies are built with the common <strong>trees</strong> feature. A <strong>tree structure</strong> is the template, a <strong>tree</strong> is one hierarchy for one segment, and each tree can have several <strong>tree versions</strong> with dates. Only one version is active at a time, so you can track how the hierarchy changes year by year.</p>`,
        },
        {
          icon: '🧮',
          title: 'Why reporting needs it',
          html: `<p>Financial reports, Smart View and the balances cube read your hierarchies. A report row can ask for “6000 Operating Expenses”, and Oracle adds up 6110 + 6120 + 6130 + 6140 for you. When Jordan adds 6150 Marketing under 6000, every report picks it up without being edited.</p>`,
        },
        {
          icon: '🔀',
          title: 'Many maps for many readers',
          html: `<p>You can have several trees for the same segment, for example cost centers grouped by <em>country</em> in one tree and by <em>function</em> in another. Trees that are published to Essbase (for reporting and allocations) can’t have one child rolling up to two parents. If you need that, you build a second tree.</p>`,
        },
        {
          icon: '🛡️',
          title: 'Not just reports',
          html: `<p>Hierarchies also feed <strong>cross-validation rules</strong>, <strong>revaluation</strong> account ranges, <strong>chart of accounts mapping</strong>, <strong>allocations</strong>, segment value security and data access sets by parent company value. One tree per segment can be attached to the chart of accounts instance for these uses.</p>`,
        },
        {
          icon: '📤',
          title: 'Publish, or nothing changes',
          html: `<p>After you create or change a hierarchy, you must <strong>publish</strong> it with the <kbd>Publish Account Hierarchies</kbd> task. Oracle also lists the <em>Maintain GL Value Sets</em> and <em>Maintain Chart of Account Hierarchies</em> processes, which must run before the new tree is used. A forgotten publish is a classic reason a new account “isn’t in the report”.</p>`,
        },
      ],
    },
    {
      type: 'example',
      title: 'Sunny’s expense hierarchy',
      html: `<p>Jordan built an account hierarchy for the Account segment so Sam’s income statement shows neat subtotals. The parent values are <strong>summary</strong> values with posting turned off:</p>
<ul>
<li><strong>5000 Cost of Lemonade</strong> → 5110 Lemons Cost, 5120 Sugar Cost, 5130 Cups and Straws Cost</li>
<li><strong>6000 Operating Expenses</strong> → 6110 Rent, 6120 Electricity, 6130 Travel and Meals, 6140 Depreciation Expense</li>
<li><strong>7000 Other Expenses and Income</strong> → 7110 Bank Charges, 7120 Foreign Exchange Gain/Loss</li>
</ul>`,
      steps: [
        'In January Sunny US spends $500 on lemons, $200 on sugar and $300 on cups and straws.',
        'Nobody posts to 5000. Journals always hit the detail values (child values).',
        'The balances cube already holds the parent total, because balances are preaggregated at every level of a published hierarchy.',
      ],
      result: `<p>A report row for <code>5000</code> shows <strong>$1,000</strong> instantly. If next year Sunny adds “5140 Mint Leaves” under 5000, publishing the new tree version makes it appear in every report that uses 5000.</p>`,
    },
    {
      type: 'text',
      heading: 'Account combinations and dynamic insertion',
      html: `<p>An <strong>account combination</strong> is one complete string of segment values, such as <code>101-300-6130-000-000</code> (US, Sales, Travel and Meals, no product, no intercompany). Each combination has its own settings on the <kbd>Manage Account Combinations</kbd> page: <strong>Enabled</strong>, <strong>From and To Dates</strong>, <strong>Allow Posting</strong>, <strong>Type</strong>, an optional <strong>Alternative Account</strong> to use if this one is disabled, and <strong>Preserve Attributes</strong>.</p>
<p>You could create every combination by hand, but with 2 × 3 × 21 × 3 × 3 possible mixes, even little Sunny has over a thousand. That’s why most companies switch on <strong>dynamic insertion</strong>. On the chart of accounts instance this is the option <kbd>Dynamic combination creation allowed</kbd>. With it on, a new combination is created automatically the first time someone uses it on a journal or transaction, <em>as long as it passes the cross-validation rules</em>.</p>
<p>Two facts to remember:</p>
<ul>
<li>Account combinations <strong>can’t be deleted</strong>. To stop using one, clear <strong>Enabled</strong> or give it an end date.</li>
<li>If you later change a value’s attributes (for example the third party control setting), run the <strong>Inherit Segment Value Attributes</strong> process so existing combinations pick up the change.</li>
</ul>`,
    },
    {
      type: 'text',
      heading: 'Cross-validation rules: no silly mixes',
      html: `<p>Value sets check each segment on its own. <strong>Cross-validation rules</strong> check how segments <em>combine</em>. Each rule has a name, an error message, start and end dates, an enabled flag, a <strong>condition filter</strong> (when does the rule apply?) and a <strong>validation filter</strong> (what must be true then?).</p>
<p>The rules are checked whenever someone tries to <strong>create a new combination</strong>, whether an administrator on the maintenance page or a user through dynamic insertion. Two important consequences:</p>
<ul>
<li>Rules have <strong>no effect on combinations that already exist</strong>. If a bad combination was created before the rule, disable it yourself, after moving its balance to the correct account.</li>
<li>Best practice is to define and enable the rules <strong>before</strong> go-live, before combinations are created or balances are loaded.</li>
</ul>
<p>You maintain them with the <kbd>Manage Cross-Validation Rules</kbd> task (Financial Reporting Structures). For large volumes there’s also a spreadsheet and a file-based import.</p>`,
    },
    {
      type: 'table',
      caption: 'Two cross-validation rules Jordan created for the Sunny COA',
      headers: ['Rule name', 'Condition filter (when)', 'Validation filter (then)', 'Error message the user sees'],
      rows: [
        ['SUNNY_NO_SELF_TRADE', 'Company is 101', 'Intercompany is not 101', 'A company can’t be its own intercompany partner. Use 000 or 201.'],
        ['SUNNY_REVENUE_NEEDS_PRODUCT', 'Account is 4110', 'Product is 010 or 020', 'Lemonade revenue must name a product.'],
      ],
    },
    {
      type: 'lab',
      tool: 'coa-builder',
      title: 'Build an account combination and test the rules',
      intro: `<p>Try building Sunny account combinations segment by segment. The builder starts with the revenue combination from the example below: company 101, cost center 300 Sales, account 4110, product 000 and intercompany 000. Check it against the example cross-validation rules, then change the product to 010 Classic Lemonade and check again. Also try making company 101 its own intercompany partner (intercompany 101) and watch what happens.</p>`,
      preset: { company: '101', costCenter: '300', account: '4110', product: '000', intercompany: '000' },
    },
    {
      type: 'example',
      title: 'Dynamic insertion meets a cross-validation rule',
      html: `<p>Omar sells $400 of lemonade to Happy Cafe and the revenue account is built from setup. A setup mistake leaves the product as <code>000</code>, so Receivables tries to use <code>101-300-4110-000-000</code> for the first time.</p>`,
      steps: [
        'The combination doesn’t exist yet, so dynamic insertion tries to create it.',
        'Rule SUNNY_REVENUE_NEEDS_PRODUCT applies (Account is 4110) and the validation fails (Product is 000).',
        'Oracle refuses to create the combination and shows the rule’s error message. The accounting can’t complete until the product is fixed.',
        'Omar’s team corrects the setup so Classic Lemonade sales use product 010, and <code>101-300-4110-010-000</code> is created automatically.',
      ],
      result: `<p>The rule stopped an untraceable revenue line before it reached the ledger. That is far cheaper than finding it in a report three months later.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Segment value security (in brief)',
      html: `<p><strong>Segment value security</strong> controls which segment values a user may <em>see or use</em>. For example, a sales manager could be allowed only cost center 300 Sales. To use it, you turn on <strong>Enable Security</strong> for the value set and then create rules and assign them to users. Oracle provides a <kbd>Manage Segment Value Security Rules</kbd> spreadsheet for this.</p>
<p>Today Oracle enforces it <strong>by business function</strong>: General Ledger, Payables, Receivables, Assets, Intercompany and Subledger Accounting. Each grant can be read-only or read and write. Other modules don’t enforce it, so users there still see all values. Data access sets, which secure whole ledgers or company values, come in the Ledger Sets lesson.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: look at Sunny’s values and hierarchies',
      items: [
        'Open <kbd>Setup and Maintenance</kbd> and choose the <strong>Financials</strong> offering.',
        'Open the functional area <strong>Financial Reporting Structures</strong> and the task <kbd>Manage Chart of Accounts Configurations</kbd>.',
        'Click the chart of accounts name, then select a segment row, such as Account.',
        'On the <kbd>Value Set</kbd> tab, review or download the values and their attributes. On the <kbd>Hierarchies</kbd> tab, review or download a hierarchy.',
        'Related tasks in the same area include <kbd>Manage Chart of Accounts Value Sets</kbd>, <kbd>Manage Chart of Accounts Structures</kbd>, <kbd>Manage Chart of Accounts Structure Instances</kbd>, <kbd>Manage Cross-Validation Rules</kbd> and <kbd>Publish Account Hierarchies</kbd>.',
      ],
      note: `<p>These are setup tasks, so they need an implementation or GL administration role. Labels can differ slightly by release and Redwood pages. Practise in a test environment, never in production.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips from implementation projects',
      html: `<ul>
<li><strong>Leave room to grow.</strong> Oracle recommends defining one extra segment for future use, with a default value. Adding a segment after go-live is very hard.</li>
<li><strong>Keep numbers meaningful.</strong> Ranges like 1xxx assets, 2xxx liabilities and 4xxx revenue make cross-validation rules, revaluation ranges and hierarchies much easier.</li>
<li><strong>Publish after every hierarchy change</strong> and test a report straight away.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Segment label', def: 'A tag on a segment that gives it a special job, such as Primary Balancing Segment, Natural Account, Cost Center or Intercompany.' },
        { term: 'Value set', def: 'The container of allowed values for a segment. Chart of accounts value sets use Independent validation.' },
        { term: 'Summary value', def: 'A parent value used only to add up its children in a hierarchy. Journals can’t post to it.' },
        { term: 'Account hierarchy', def: 'A tree that groups segment values into parents and children so balances can roll up into totals for reports, allocations and rules.' },
        { term: 'Cross-validation rule', def: 'A rule that stops new account combinations whose segment values shouldn’t appear together.' },
        { term: 'Dynamic insertion', def: 'Automatically creating a new account combination the first time it is used, if it passes cross-validation rules.' },
        { term: 'Segment value security', def: 'Rules that limit which segment values a user can see or use, enforced by business function.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which two segment labels does every Oracle Fusion chart of accounts need?',
          options: [
            'Cost Center and Intercompany',
            'Primary Balancing Segment and Natural Account',
            'Product and Company',
            'Natural Account and Cost Center',
          ],
          answer: 1,
          explain: 'Primary Balancing Segment and Natural Account are required. Cost Center and Intercompany labels are optional, and some segments, like Sunny’s Product, have no label.',
        },
        {
          q: 'Jordan creates a cross-validation rule today. A combination that breaks the rule was created last year. What happens to the old combination?',
          options: [
            'It is deleted automatically',
            'It is disabled automatically',
            'It stays valid until someone disables it',
            'Its balance moves to suspense',
          ],
          answer: 2,
          explain: 'Cross-validation rules are checked only when a new combination is created. Existing combinations stay valid, so you move their balances and disable them yourself.',
        },
        {
          q: 'Why can’t journals post to 6000 Operating Expenses in Sunny’s hierarchy?',
          options: [
            'Because it is a summary (parent) value with Allow Posting set to No',
            'Because expense accounts can never be posted to',
            'Because 6000 is not in the value set',
            'Because only Payables can post to it',
          ],
          answer: 0,
          explain: 'Parent values exist to add up their children (6110–6140). Journals post to the detail values, and the hierarchy rolls them up.',
        },
        {
          q: 'Jordan added a new expense account under 6000 in the hierarchy, but the income statement doesn’t show it. What is the most likely missing step?',
          options: [
            'Closing the period',
            'Publishing the account hierarchy',
            'Running the trial balance',
            'Reversing last month’s journals',
          ],
          answer: 1,
          explain: 'Hierarchy changes reach reports and the balances cube only after the hierarchy is published, using the Publish Account Hierarchies task and its related processes.',
        },
        {
          q: 'What does turning on “Dynamic combination creation allowed” do?',
          options: [
            'Creates every possible combination at once',
            'Lets Oracle create a new combination the first time it is used, if it passes cross-validation rules',
            'Turns off cross-validation rules',
            'Lets users delete combinations',
          ],
          answer: 1,
          explain: 'Dynamic insertion creates combinations on demand, and cross-validation rules still guard every new combination. Combinations can never be deleted, only disabled or end-dated.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Implementing Enterprise Structures and General Ledger: Chart of Accounts Components', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/chart-of-accounts-components.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Create a Chart of Accounts Structure and Instance', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/create-a-chart-of-accounts-structure-and-instance.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Value Sets for Charts of Accounts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/value-sets-for-charts-of-accounts.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Considerations for Using Account Hierarchies', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/considerations-for-using-account-hierarchies.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Overview of Trees', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/overview-of-trees.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Publish an Account Hierarchy', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/publish-an-account-hierarchy.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Cross-Validation Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/cross-validation-rules.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Overview of Cross-Validation Rules in General Ledger', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/overview-of-cross-validation-rules-in-general-ledger.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Overview of Account Combinations', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/overview-of-account-combinations.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Overview of Segment Value Security', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/overview-of-segment-value-security.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: How to Manage Value Set Values and Hierarchies', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/how-to-manage-value-set-values-and-hierarchies.html' },
  ],
};
