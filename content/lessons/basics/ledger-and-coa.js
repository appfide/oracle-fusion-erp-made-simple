export default {
  slug: 'ledger-and-coa',
  title: 'Ledgers and the Chart of Accounts (the Four Cs)',
  minutes: 18,
  summary:
    'A ledger in Oracle Fusion is built from four ingredients: a chart of accounts, a calendar, a currency and an accounting convention (method). Learn how the Sunny COA is designed with segments, value sets and segment labels, how account combinations work, and what primary and secondary ledgers and reporting currencies are.',
  objectives: [
    'Name the four Cs that make up a ledger in Oracle Fusion',
    'Read a Sunny account combination segment by segment',
    'Explain value sets, segment labels and why the primary balancing segment and natural account are required',
    'Describe accounting calendars, periods and period statuses',
    'Explain the difference between a primary ledger, a secondary ledger and a reporting currency',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'A home address for every penny',
      html: `<p>When you send a letter, you write an address in parts: <strong>country – city – street – house number</strong>. Each part narrows it down until the letter reaches exactly the right door.</p>
<p>Accountants do the same for money. Every amount gets an "address" made of parts: <strong>which company – which team – what kind of money – which product – which sister company</strong>. For Sunny, an address looks like <code>101-200-5110-010-000</code>.</p>
<p>The list of all allowed address parts is called the <strong>chart of accounts</strong>. The big book where all addressed amounts are kept is the <strong>ledger</strong>. <span class="hl">Get the addresses right and every report — by company, by team, by product — just works.</span></p>`,
    },
    {
      type: 'text',
      heading: 'What a ledger is made of: the four Cs',
      html: `<p>Oracle says you create a <strong>primary ledger</strong> by combining four things. Practitioners remember them as the <strong>four Cs</strong>:</p>
<ol>
<li><strong>Chart of accounts</strong> – the structure of the account "address" and its allowed values.</li>
<li><strong>Calendar</strong> – the accounting year and its periods (months, quarters, or something else).</li>
<li><strong>Currency</strong> – the ledger currency, like USD for the US or GBP for the UK.</li>
<li><strong>Convention</strong> – the <strong>accounting method</strong>: the set of rules that turns subledger transactions (invoices, receipts, payments) into journal entries. The rapid implementation process assigns Oracle's <em>Standard Accrual</em> method by default.</li>
</ol>
<p>A ledger is the main record-keeping book for one or more legal entities. If you change any of the four Cs, you need a different ledger. That's why Sunny has two primary ledgers: the US and UK companies use different currencies.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny’s two primary ledgers',
      headers: ['C', 'Sunny US Ledger', 'Sunny UK Ledger'],
      rows: [
        ['Chart of accounts', 'Sunny COA', 'Sunny COA (the same one)'],
        ['Calendar', 'Monthly, January–December (Jan-26 … Dec-26)', 'Monthly, January–December'],
        ['Currency', 'USD', 'GBP'],
        ['Convention (accounting method)', 'Standard Accrual', 'Standard Accrual'],
        ['Legal entity and balancing value', 'Sunny Lemonade US Inc. → company 101', 'Sunny Lemonade UK Ltd → company 201'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match each C to Sunny US Ledger',
      instructions: `<p>Match each of the four Cs to the value it has in Sunny US Ledger.</p>`,
      pairs: [
        { left: 'Chart of accounts', right: 'Sunny COA (Company - Cost Center - Account - Product - Intercompany)' },
        { left: 'Calendar', right: 'Monthly, January to December (Jan-26 … Dec-26)' },
        { left: 'Currency', right: 'USD' },
        { left: 'Convention (accounting method)', right: 'Standard Accrual' },
      ],
      explain: `<p>Those four ingredients define the ledger. Sunny UK Ledger shares the same chart of accounts, calendar and method, but its currency is <strong>GBP</strong> — which is why it needs to be a separate ledger.</p>`,
    },
    {
      type: 'text',
      heading: 'The chart of accounts: segments',
      html: `<p>In Oracle Fusion, the chart of accounts is built from <strong>segments</strong> — the parts of the address. Sunny's COA has five:</p>
<p><code>Company - Cost Center - Account - Product - Intercompany</code></p>
<p>Each segment gets its list of allowed values from a <strong>value set</strong>. The Company value set holds 101 and 201; the Account value set holds 1110, 2110, 5110 and the rest. For chart of accounts segments, Oracle requires value sets with <em>independent</em> validation, which keeps reporting, security and hierarchies working properly.</p>
<p>Values can be arranged in <strong>hierarchies</strong> (trees). For example, accounts 5110, 5120 and 5130 can roll up to a parent "Ingredient Costs", so reports can show either detail or totals.</p>`,
    },
    {
      type: 'table',
      caption: 'The Sunny COA, segment by segment',
      headers: ['Segment', 'Example values', 'Segment label', 'Why it matters'],
      rows: [
        ['Company', '101 Sunny Lemonade US Inc., 201 Sunny Lemonade UK Ltd', '<strong>Primary Balancing Segment</strong> (required)', 'Journals must balance for each company value. Legal entities are linked to these values.'],
        ['Cost Center', '100 Administration, 200 Kitchen, 300 Sales', '<strong>Cost Center Segment</strong>', 'Groups costs by team. Needed for things like Assets and expense approval limits.'],
        ['Account', '1110 Cash … 7120 FX Gain/Loss', '<strong>Natural Account Segment</strong> (required)', 'Says what kind of money it is and its type: asset, liability, equity, revenue or expense.'],
        ['Product', '000 None, 010 Classic, 020 Pink', 'No special label', 'Lets Sam see sales and costs by lemonade flavor.'],
        ['Intercompany', '000 None, 101 US, 201 UK', '<strong>Intercompany Segment</strong> (optional)', 'Records which sister company is on the other side of an intercompany deal.'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: segment labels',
      html: `<p><strong>Segment labels</strong> tell Oracle which segment plays which special role. (In Oracle E-Business Suite these were called <em>flexfield qualifiers</em>.) The labels Oracle lists are:</p>
<ul>
<li><strong>Balancing</strong> – primary (required), second and third. Journals must balance for each balancing value.</li>
<li><strong>Cost Center</strong> – groups natural accounts by functional cost type.</li>
<li><strong>Natural Account</strong> (required) – determines the account type and drives processes like closing revenue and expense accounts into retained earnings at year-end.</li>
<li><strong>Intercompany</strong> (optional) – used by intercompany balancing.</li>
</ul>
<p>Each label can be used only once in a chart of accounts. Oracle warns that once you start using a chart of accounts, changing fundamental things like its segments and labels is not recommended or supported — so design carefully.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Give each Sunny segment its label',
      instructions: `<p>Match each segment of the Sunny COA to its segment label.</p>`,
      pairs: [
        { left: 'Company (101, 201)', right: 'Primary Balancing Segment' },
        { left: 'Cost Center (100, 200, 300)', right: 'Cost Center Segment' },
        { left: 'Account (1110 … 7120)', right: 'Natural Account Segment' },
        { left: 'Intercompany (000, 101, 201)', right: 'Intercompany Segment' },
        { left: 'Product (000, 010, 020)', right: 'No special label' },
      ],
      explain: `<p>Company is the primary balancing segment because legal entities map to its values and journals must balance by company. The natural account says what kind of money it is. Product is useful for reporting but needs no special behavior, so it has no label.</p>`,
    },
    {
      type: 'text',
      heading: 'Account combinations',
      html: `<p>An <strong>account combination</strong> is one complete address: a value for every segment. It uniquely identifies where an amount is recorded. Technically, Oracle builds the chart of accounts on a key flexfield called the <em>Accounting Key Flexfield</em> (often just "the accounting flexfield"), so you'll sometimes hear combinations called "code combinations".</p>
<ul>
<li>Combinations can be created automatically the first time someone uses them, if <strong>dynamic insertion</strong> (Oracle's option to enable dynamic account combinations) is switched on — otherwise they must be created first on the <em>Manage Account Combinations</em> page.</li>
<li><strong>Cross-validation rules</strong> stop combinations that make no sense, such as a value that can't coexist with another.</li>
<li>Combinations can't be deleted, only disabled or end-dated.</li>
</ul>`,
    },
    {
      type: 'lab',
      tool: 'coa-builder',
      title: 'Build a Sunny account combination',
      intro: `<p>Start with lemons used for Classic Lemonade in the US Kitchen. Then try building: (1) Pink Lemonade sales in the UK Sales team, and (2) a revenue account with the Kitchen cost center, and see whether any example cross-validation rule complains.</p>`,
      preset: { company: '101', costCenter: '200', account: '5110', product: '010', intercompany: '000' },
    },
    {
      type: 'example',
      title: 'Reading Sunny account combinations',
      html: `<p>Priya explains three combinations to a new team member:</p>`,
      steps: [
        '<code>101-200-5110-010-000</code> → US company, Kitchen cost center, Lemons Cost, Classic Lemonade, no intercompany. <em>"Lemons used for classic lemonade in the US kitchen."</em>',
        '<code>101-000-2110-000-000</code>? Careful! Sunny’s cost center list is 100, 200 and 300, so <code>000</code> would be rejected. Balance sheet accounts like Accounts Payable often use 100 Administration instead: <code>101-100-2110-000-000</code>.',
        '<code>201-300-4110-020-000</code> → UK company, Sales cost center, Lemonade Sales Revenue, Pink Lemonade. <em>"Pink lemonade sales in the UK."</em>',
        'A cross-validation rule could block, for example, a revenue account used with the Kitchen cost center, if Sunny decides only Sales earns revenue.',
      ],
      result: `<p>The same five segments answer five questions at once: which company, which team, what, which product, and with which sister company.</p>`,
    },
    {
      type: 'journal',
      title: 'The $500 lemon invoice with full account combinations (Sunny US Ledger, Jan-26)',
      lines: [
        { account: '101-200-5110-010-000 Lemons Cost (Kitchen, Classic)', debit: 500, credit: 0 },
        { account: '101-100-2110-000-000 Accounts Payable – Trade', debit: 0, credit: 500 },
      ],
      note: `<p>Both lines use company <strong>101</strong>, so the journal balances for the primary balancing segment. If a journal mixes companies, General Ledger automatically calculates and adds balancing lines, using rules and accounts set up by the implementer, so each company still balances.</p>`,
    },
    {
      type: 'text',
      heading: 'The accounting calendar and periods',
      html: `<p>The <strong>accounting calendar</strong> defines the accounting year and its <strong>periods</strong>. Oracle can generate common patterns automatically — monthly, quarterly, 4-4-5, 4-5-4, 5-4-4, 4-week, weekly and yearly. Sunny uses a simple monthly calendar from January to December, with periods named like <code>Jan-26</code>.</p>
<p>A calendar can also include <strong>adjusting periods</strong>: extra periods (often one after December) used to record year-end audit and closing adjustments separately from normal monthly activity.</p>
<p>Each period in a ledger has a <strong>status</strong> that controls what can be posted. You'll see statuses such as:</p>
<ul>
<li><strong>Never Opened</strong> – not used yet.</li>
<li><strong>Future Enterable</strong> – you can enter journals for it, but not post them yet.</li>
<li><strong>Open</strong> – normal work happens here; journals can be posted.</li>
<li><strong>Closed</strong> – no more posting; can be reopened if needed.</li>
<li><strong>Permanently Closed</strong> – locked forever.</li>
</ul>
<p>Oracle warns that calendar choices (start date, frequency, adjusting periods, name format) are hard to change once a period has been opened, and you can't add earlier years after the first period is opened. You'll practice opening and closing periods in the General Ledger module.</p>`,
    },
    {
      type: 'slides',
      title: 'Primary ledger, secondary ledger, reporting currency',
      slides: [
        {
          icon: '📒',
          title: 'Primary ledger',
          html: `<p>The <strong>main record-keeping ledger</strong> for a legal entity. All subledger transactions (Payables, Receivables, Assets…) are accounted here. Every business unit points to exactly one primary ledger.</p>`,
        },
        {
          icon: '📗',
          title: 'Secondary ledger',
          html: `<p>An <strong>optional extra ledger</strong> linked to a primary ledger to keep an <em>alternative accounting representation</em>. It can differ in chart of accounts, calendar, currency, accounting method or processing options. Example from Oracle: a primary ledger in US GAAP and a secondary ledger for IFRS.</p>`,
        },
        {
          icon: '💱',
          title: 'Reporting currency',
          html: `<p>A copy of a ledger's amounts converted into <strong>another currency</strong> for reporting — same chart of accounts, calendar and method, different currency. Sunny could give the UK ledger a USD reporting currency so Sam can read UK results in dollars.</p>`,
        },
        {
          icon: '🎚️',
          title: 'How much gets copied?',
          html: `<p>Secondary ledgers and reporting currencies have a <strong>conversion level</strong> — Balance, Journal, Subledger, or (for secondary ledgers) Adjustment Only — which decides how detailed the copy is. The General Ledger module covers this in depth.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Primary ledger, secondary ledger or reporting currency?',
      instructions: `<p>For each need, choose the lightest tool that solves it.</p>`,
      categories: ['New primary ledger', 'Secondary ledger', 'Reporting currency'],
      items: [
        { text: 'Sunny opens a new company in Japan that keeps its official books in JPY for local authorities', answer: 'New primary ledger' },
        { text: 'The UK ledger must also be viewed in USD for Sam, with the same accounting rules', answer: 'Reporting currency' },
        { text: 'The US company must keep a second version of its books under a different accounting standard (US GAAP and IFRS)', answer: 'Secondary ledger' },
        { text: 'A subsidiary needs a different chart of accounts for a local statutory report, alongside the main books', answer: 'Secondary ledger' },
      ],
      explain: `<p>A separate legal entity in another country with its own currency and local reporting usually gets its <strong>own primary ledger</strong>. A different <em>accounting representation</em> (other rules or chart of accounts) calls for a <strong>secondary ledger</strong>. Just showing the same accounting in another currency is a <strong>reporting currency</strong>.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'How many primary ledgers?',
      html: `<p>Oracle's guidance: if subsidiaries in different countries must report to local authorities, create a primary ledger per country with its local currency, calendar and method. If a company just has sales in other countries but everything is managed and reported centrally, one primary ledger with several balancing segment values may be enough. Fewer primary ledgers make reporting simpler because less consolidation is needed.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: where this is set up',
      html: `<p>All of this lives in <strong>Setup and Maintenance</strong>. Common tasks include <em>Manage Chart of Accounts Value Sets</em>, <em>Manage Chart of Accounts Structures</em>, <em>Manage Chart of Accounts Structure Instances</em>, <em>Manage Accounting Calendars</em>, <em>Manage Primary Ledgers</em>, <em>Specify Ledger Options</em>, <em>Assign Legal Entities</em>, <em>Manage Cross-Validation Rules</em> and <em>Review and Submit Accounting Configuration</em>.</p>
<p>Many Financials customers create the first version all at once with the <strong>Rapid Implementation for General Ledger</strong> workbook, uploaded through the task <em>Create Chart of Accounts, Ledger, Legal Entities, and Business Units in Spreadsheet</em>. It builds the chart of accounts and hierarchies, a monthly calendar, a primary ledger per country, legal entities, business units and document sequences — and even sample financial reports. Oracle says it's meant as a one-time initialization.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Chart of accounts design is one of the most important — and most debated — decisions in any implementation. Good designs keep each segment answering <em>one</em> question, leave room for new values (gaps in numbering), and avoid putting information in the COA that belongs elsewhere (like supplier names). A COA that's too detailed creates millions of combinations; one that's too thin forces people to build reports in spreadsheets.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Four Cs', def: 'The four ingredients of a ledger: chart of accounts, calendar, currency and convention (accounting method).' },
        { term: 'Chart of accounts', def: 'The structure of segments and allowed values used to build every account in the ledger.' },
        { term: 'Segment', def: 'One part of the account, such as Company, Cost Center or Account.' },
        { term: 'Value set', def: 'The list of allowed values for a segment, with its formatting and validation rules.' },
        { term: 'Segment label', def: 'A tag that gives a segment a special role, such as Primary Balancing Segment or Natural Account.' },
        { term: 'Account combination', def: 'A complete set of segment values that uniquely identifies one account, such as 101-200-5110-010-000.' },
        { term: 'Accounting period', def: 'A slice of the accounting year, such as Jan-26, with a status that controls posting.' },
        { term: 'Secondary ledger', def: 'An optional ledger linked to a primary ledger that keeps an alternative accounting representation.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which of these is NOT one of the four Cs of a ledger?',
          options: ['Chart of accounts', 'Calendar', 'Customer', 'Currency'],
          answer: 2,
          explain: 'A ledger combines chart of accounts, calendar, currency and convention (accounting method). Customers belong to Receivables, not the ledger definition.',
        },
        {
          q: 'In 101-200-5110-010-000, which segment tells you the type of money (an expense for lemons)?',
          options: ['101 (Company)', '200 (Cost Center)', '5110 (Account – the natural account)', '010 (Product)'],
          answer: 2,
          explain: 'The natural account segment (Account) says what the money is and determines the account type. 5110 is Lemons Cost, an expense.',
        },
        {
          q: 'Which two segment labels does Oracle require in every chart of accounts?',
          options: [
            'Cost Center and Intercompany',
            'Primary Balancing Segment and Natural Account',
            'Product and Cost Center',
            'Second Balancing and Third Balancing',
          ],
          answer: 1,
          explain: 'The Primary Balancing Segment and Natural Account labels are required; Cost Center, Intercompany and extra balancing labels are optional.',
        },
        {
          q: 'Sam wants to see the UK ledger’s results in US dollars without keeping a different set of accounting rules. What is the lightest option?',
          options: ['A new primary ledger', 'A reporting currency on the UK ledger', 'A new chart of accounts', 'A second calendar'],
          answer: 1,
          explain: 'A reporting currency shows the same ledger in another currency. Secondary ledgers are for alternative accounting representations, such as different rules.',
        },
        {
          q: 'Priya’s journal for Feb-26 can be entered but not posted. What status is February probably in?',
          options: ['Open', 'Future Enterable', 'Permanently Closed', 'Adjusting'],
          answer: 1,
          explain: 'Future Enterable periods accept journal entry but not posting. Open periods allow posting; closed periods block it.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Implementing Enterprise Structures and General Ledger – Legal Entities and Primary and Secondary Ledgers (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/legal-entities-and-primary-and-secondary-ledgers.html' },
    { title: 'Implementing Enterprise Structures and General Ledger – Ledgers and Subledgers (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/ledgers-and-subledgers.html' },
    { title: 'Implementing Enterprise Structures and General Ledger – Chart of Accounts Components (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/chart-of-accounts-components.html' },
    { title: 'Implementing Enterprise Structures and General Ledger – Overview of Account Combinations (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/overview-of-account-combinations.html' },
    { title: 'Implementing Enterprise Structures and General Ledger – Accounting Calendar Options (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/accounting-calendar-options.html' },
    { title: 'Implementing Enterprise Structures and General Ledger – Overview of Enterprise Structures Rapid Implementation (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/overview-of-enterprise-structures-rapid-implementation.html' },
    { title: 'Implementing Enterprise Structures and General Ledger (full guide, PDF, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/implementing-enterprise-structures-and-general-ledger.pdf' },
  ],
};
