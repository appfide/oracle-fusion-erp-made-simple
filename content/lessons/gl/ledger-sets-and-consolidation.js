export default {
  slug: 'ledger-sets-and-consolidation',
  title: 'Ledger Sets, Secondary Ledgers and Consolidation',
  minutes: 18,
  summary:
    'When a group has several ledgers, Oracle Fusion lets you work on them together (ledger sets), control who sees what (data access sets), keep a second set of books under different rules (secondary ledgers) and combine everything into group results (consolidation).',
  objectives: [
    'Explain what a ledger set is and what you can do with one',
    'Describe how data access sets secure ledgers and company values',
    'Explain why a company might keep a secondary ledger and the four data conversion levels',
    'Compare the consolidation options in Oracle Fusion General Ledger with Oracle Financial Consolidation and Close',
    'Explain why intercompany balances are eliminated in consolidation',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The head teacher’s binder',
      html: `<p>Every class in a school keeps its own register of money for trips and snacks. The head teacher puts all the class registers in <strong>one binder</strong>, so she can check them all at once, close them all at the end of term, and add them up into a whole-school total.</p>
<p>But careful: if Class A borrowed $10 from Class B, adding both registers would show $10 owed <em>and</em> $10 owed back. Inside the school that’s just money moving from one pocket to another. For the whole-school total, the head teacher <strong>crosses those out</strong>.</p>
<p><span class="hl">The binder is a ledger set. Adding up the registers is consolidation. Crossing out the inside loans is elimination.</span></p>`,
    },
    {
      type: 'text',
      heading: 'Sunny has more than one ledger',
      html: `<p>Sunny Group has two primary ledgers: the <strong>Sunny US Ledger</strong> (USD) for Sunny Lemonade US Inc. (company <code>101</code>) and the <strong>Sunny UK Ledger</strong> (GBP) for Sunny Lemonade UK Ltd (company <code>201</code>). Jordan designed them to share the <strong>Sunny COA</strong> and the same <strong>monthly calendar</strong>. Only the currency differs. That one design choice makes everything in this lesson much easier.</p>`,
    },
    {
      type: 'slides',
      title: 'Ledger sets',
      slides: [
        {
          icon: '🗂️',
          title: 'What it is',
          html: `<p>A <strong>ledger set</strong> groups ledgers that share the <strong>same chart of accounts, calendar and period type</strong>. It can hold primary ledgers, secondary ledgers and journal or subledger level reporting currencies, and even other ledger sets.</p>`,
        },
        {
          icon: '⚙️',
          title: 'What you can do with it',
          html: `<ul><li><strong>Open and close periods</strong> for all ledgers in one go.</li><li><strong>Run reports and processes</strong> for many ledgers at once, such as AutoPost, revaluation and allocations.</li><li><strong>Report across ledgers</strong> in financial reports, Smart View and the Close Monitor.</li></ul>`,
        },
        {
          icon: '🏷️',
          title: 'Classifications',
          html: `<p>With the opt-in feature <em>Ledger Set Classification for Consolidated Views</em>, a ledger set can be classified as <strong>Currency-specific</strong> (all members share one currency), <strong>GGAP view</strong> (one primary ledger plus its secondary ledgers), or left blank (mixed currencies allowed). The classification can’t change once ledgers are assigned.</p>`,
        },
        {
          icon: '🍋',
          title: 'Sunny’s ledger sets',
          html: `<p><strong>Sunny Group – Processing</strong> (no classification): US and UK primary ledgers, used to open and close periods together.<br><strong>Sunny Group – USD View</strong> (currency-specific): the US ledger plus the UK ledger’s USD reporting currency, used for group reports in dollars.</p>`,
        },
      ],
    },
    {
      type: 'text',
      heading: 'Data access sets: who sees which books',
      html: `<p>A <strong>data access set</strong> decides which ledgers, or which parts of ledgers, a user can work with in General Ledger. It has two settings:</p>
<ul>
<li><strong>Access set type</strong>: <em>Full Ledger</em> (the whole ledger or ledger set) or <em>Primary Balancing Segment Value</em> (only certain company values, either single values or a parent and everything under it from the company hierarchy).</li>
<li><strong>Access level</strong>: <em>Read Only</em> or <em>Read and Write</em>. You can mix them, for example read and write on one company and read only on another.</li>
</ul>
<p>When a ledger or ledger set is created, Oracle automatically creates a data access set with full read and write access to it. You can create more and assign them to users with their roles. At Sunny:</p>
<ul>
<li><strong>Priya</strong>: read and write on the Sunny Group ledger set. Priya does the close for both companies.</li>
<li><strong>A UK accountant</strong>: read and write on the Sunny UK Ledger, read only on the US ledger.</li>
<li><strong>Sam</strong>: read only on everything. The CFO reviews but doesn’t post.</li>
</ul>
<p>Data access sets secure ledgers and company values. <strong>Segment value security</strong> (from the Chart of Accounts lesson) can secure other segments, such as cost centers.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Pick the right data access set',
      instructions: `<p>Match each person to the data access that fits their job, following the “least privilege” idea.</p>`,
      pairs: [
        { left: 'Priya, who closes both companies', right: 'Read and write on the Sunny Group ledger set' },
        { left: 'Sam, the CFO, who reviews but never posts', right: 'Read only on all Sunny ledgers' },
        { left: 'A UK accountant who also looks at US numbers', right: 'Read and write on company 201, read only on company 101' },
      ],
      explain: `<p>Give people exactly what their job needs. Read and write lets you create journals and update balances. Read only lets you view journals, balances and reports. Access by primary balancing segment value can split one ledger set by company.</p>`,
    },
    {
      type: 'text',
      heading: 'Secondary ledgers: a second set of books',
      html: `<p>Sometimes one company must report under <strong>two sets of rules</strong>: the group’s accounting policies and the local country’s rules. A <strong>secondary ledger</strong> is an optional ledger linked to a primary ledger. It can differ in <strong>accounting method, chart of accounts, calendar, currency or processing options</strong>. Some companies keep local rules in the primary ledger and group rules in the secondary, others the other way round.</p>
<p>When you create one, you choose a <strong>data conversion level</strong>, which decides what is copied from the primary ledger:</p>`,
    },
    {
      type: 'table',
      caption: 'Secondary ledger data conversion levels',
      headers: ['Level', 'What is copied', 'Good for'],
      rows: [
        ['<strong>Balance</strong>', 'Balances only, when you run the Transfer Balances to Secondary Ledger process.', 'A summarized second view, such as a different chart of accounts for local filing.'],
        ['<strong>Journal</strong>', 'Posted GL journals, for the sources and categories allowed by journal conversion rules.', 'A detailed second view of GL activity.'],
        ['<strong>Subledger</strong>', 'Subledger Accounting creates entries for both ledgers. Other GL journals are copied when posted.', 'A full alternative accounting method from the transaction level up.'],
        ['<strong>Adjustment Only</strong>', 'Nothing automatically. It holds only manual adjustments, and shares the primary ledger’s chart of accounts, calendar and currency.', 'Recording just the differences between two sets of rules.'],
      ],
    },
    {
      type: 'example',
      title: 'Sunny UK’s local adjustments',
      html: `<p>Imagine local rules require Sunny UK to depreciate its kitchen equipment faster than the group policy. Instead of keeping two complete sets of books, Jordan created an <strong>adjustment-only secondary ledger</strong>, “Sunny UK Local Adjustments”. It holds only the differences.</p>`,
      steps: [
        'The primary Sunny UK Ledger records group-policy depreciation of £80 for January (from Oracle Assets).',
        'Local rules would give £105, so the difference is £25.',
        'Priya’s UK colleague enters a £25 adjustment journal in the adjustment-only secondary ledger.',
        'Local reports combine the primary ledger and the adjustment ledger. A ledger set classified as <strong>GGAP view</strong> is designed for exactly this combination.',
      ],
      result: `<p>Group reports use the primary ledger. Local statutory reports use primary plus adjustments. No double typing of everyday transactions.</p>`,
    },
    {
      type: 'journal',
      title: 'Adjustment-only secondary ledger, Jan-26 (GBP)',
      lines: [
        { account: '201-200-6140-000-000 Depreciation Expense (local rule difference)', debit: 25, credit: 0 },
        { account: '201-200-1590-000-000 Accumulated Depreciation', debit: 0, credit: 25 },
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match the need to the secondary ledger level',
      instructions: `<p>Choose the data conversion level that fits each need.</p>`,
      pairs: [
        { left: 'Only the differences between group and local rules, entered by hand', right: 'Adjustment Only' },
        { left: 'A full alternative accounting method from every transaction', right: 'Subledger' },
        { left: 'A summarized local view, refreshed by transferring balances', right: 'Balance' },
        { left: 'A copy of every posted GL journal for chosen sources and categories', right: 'Journal' },
      ],
      explain: `<p>The levels go from light (Balance, Adjustment Only) to heavy (Subledger). More detail gives a richer audit trail in the second ledger, but more processing and setup.</p>`,
    },
    {
      type: 'text',
      heading: 'Consolidation: from many ledgers to one set of group numbers',
      html: `<p><strong>Consolidation</strong> combines the results of all the companies in a group into one set of financial statements, as if the group were a single company. Oracle offers three approaches:</p>`,
    },
    {
      type: 'table',
      caption: 'Consolidation options',
      headers: ['Method', 'When it fits', 'How it works', 'Trade-offs'],
      rows: [
        ['<strong>Reporting Only</strong> (in GL)', 'Subsidiaries share the chart of accounts and calendar.', 'Data stays in each ledger. Reports run on a ledger set. Ledgers in another currency need a reporting currency (translation for balance level).', 'Consolidated balances are available any time and the close is faster, but it needs a common chart of accounts and calendar.'],
        ['<strong>Balance Transfer</strong> (in GL)', 'Charts of accounts or calendars differ.', 'Translate if needed, then transfer balances into a consolidation (or parent) ledger using a chart of accounts mapping. You can drill back to the source ledger.', 'Works with different structures, but mappings need maintenance, and transfers must be redone when source balances change.'],
        ['<strong>Financial Management</strong> (EPM)', 'Complex groups: partly owned companies, joint ventures, minority interests, many non-Oracle systems, disclosures.', 'Use <strong>Oracle Financial Consolidation and Close</strong>, part of Oracle Fusion Cloud EPM (Enterprise Performance Management), fed from the GL.', 'Most powerful (ownership, eliminations, close tasks, footnotes), but it is a separate product to implement.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Choose the consolidation approach',
      instructions: `<p>For each imaginary group, pick the approach that fits best.</p>`,
      categories: ['Reporting Only (GL)', 'Balance Transfer (GL)', 'Financial Consolidation and Close (EPM)'],
      items: [
        { text: 'Two companies share one chart of accounts and calendar', answer: 'Reporting Only (GL)' },
        { text: 'A newly bought company keeps its own chart of accounts and a 4-4-5 calendar', answer: 'Balance Transfer (GL)' },
        { text: 'A group with 60%-owned subsidiaries, joint ventures and data from several non-Oracle systems', answer: 'Financial Consolidation and Close (EPM)' },
        { text: 'You want consolidated balances visible at any moment, with no transfer process', answer: 'Reporting Only (GL)' },
      ],
      explain: `<p>Shared structures allow Reporting Only. Different charts of accounts or calendars need balance transfers with mappings. Complex ownership and many sources point to Oracle Financial Consolidation and Close.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Which one does Sunny use?',
      html: `<p>Because Jordan gave both companies the same Sunny COA and calendar, Sunny can use <strong>Reporting Only consolidation</strong>. Sam’s group report simply runs on the “Sunny Group – USD View” ledger set, which holds the US ledger plus the UK ledger’s USD reporting currency. The translation process must be run before reporting, because the UK reporting currency is balance level. If Sunny later buys a company with a different chart of accounts, it could transfer balances using a chart of accounts mapping. If Sunny ever owned 60% of a juice company in another country, Oracle Financial Consolidation and Close would be worth a look.</p>`,
    },
    {
      type: 'text',
      heading: 'Eliminating intercompany balances',
      html: `<p>When sister companies trade with each other, the group as a whole hasn’t earned or spent anything. Money just moved between its pockets. Consolidated statements must therefore <strong>eliminate</strong> intercompany revenue and cost, and intercompany receivables and payables. Oracle’s guide shows eliminations done with <strong>allocation rules in Calculation Manager</strong>, recorded in a separate <strong>elimination ledger</strong> that belongs to the consolidation ledger set. The Intercompany lesson in the <em>More Financial Tools</em> module explains how intercompany transactions are created and balanced in the first place.</p>`,
    },
    {
      type: 'example',
      title: 'Eliminating a sale from Sunny US to Sunny UK',
      html: `<p>In January Sunny US sold lemonade concentrate worth <strong>$300</strong> to Sunny UK. Thanks to the Intercompany segment, the US recorded revenue and a receivable tagged with intercompany value <code>201</code>, and the UK recorded a cost and a payable tagged with <code>101</code>. In the USD group view, the UK amounts are shown at their translated USD value of $300.</p>`,
      steps: [
        'The group report would show $300 of revenue that no outside customer paid.',
        'It would also show $300 the group owes … to itself.',
        'The elimination rule finds balances whose intercompany segment points to a sister company and reverses them in the elimination ledger.',
      ],
      result: `<p>After elimination, the group shows only sales to real customers, such as Happy Cafe and City Park Kiosk, and only debts to real suppliers.</p>`,
    },
    {
      type: 'journal',
      title: 'Elimination entry in the Sunny Group elimination ledger, Jan-26 (USD)',
      lines: [
        { account: '101-300-4110-010-201 Lemonade Sales Revenue (US sale to UK)', debit: 300, credit: 0 },
        { account: '201-200-5110-010-101 Lemons Cost (UK purchase from US)', debit: 0, credit: 300 },
        { account: '201-100-2110-000-101 Accounts Payable – Trade (UK owes US)', debit: 300, credit: 0 },
        { account: '101-100-1210-000-201 Accounts Receivable (US due from UK)', debit: 0, credit: 300 },
      ],
      note: `<p>Two balanced pairs: revenue against cost, and payable against receivable. A real elimination ledger would usually use dedicated intercompany accounts. Sunny’s small COA reuses its normal accounts with the Intercompany segment to keep the example simple.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Write the elimination yourself',
      instructions: `<p>In February Sunny UK buys another <strong>$500</strong> of concentrate from Sunny US (USD view, after translation). Build the elimination journal for the group: remove the intercompany revenue and cost, and the intercompany receivable and payable.</p>`,
      accounts: ['4110 Lemonade Sales Revenue', '5110 Lemons Cost', '1210 Accounts Receivable', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '3100 Owner’s Equity'],
      answer: [
        { account: '4110 Lemonade Sales Revenue', debit: 500, credit: 0 },
        { account: '5110 Lemons Cost', debit: 0, credit: 500 },
        { account: '2110 Accounts Payable – Trade', debit: 500, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 500 },
      ],
      explain: `<p>Revenue has a credit balance, so it is removed with a debit. Cost has a debit balance, so it is removed with a credit. The same goes for the payable (debit) and the receivable (credit). Cash and equity are untouched. Group profit doesn’t change, because the sale and the cost cancel out.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li><strong>A shared chart of accounts and calendar is a gift.</strong> It is the biggest reason a group can consolidate in GL with Reporting Only. Fight for it during design.</li>
<li><strong>Reconcile intercompany before you eliminate.</strong> If the US says $300 and the UK says $290, the elimination leaves a $10 difference. Find it during the close, not at the audit.</li>
<li><strong>Least privilege.</strong> Give people read-only data access sets unless they really need to post.</li>
<li><strong>Translate before you consolidate</strong>, and translate again if anything changes after that.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Ledger set', def: 'A group of ledgers sharing a chart of accounts, calendar and period type, so they can be processed and reported together.' },
        { term: 'Data access set', def: 'A security setting giving read-only or read and write access to whole ledgers or to selected company (primary balancing segment) values.' },
        { term: 'Secondary ledger', def: 'An optional extra ledger linked to a primary ledger that represents the same company under different accounting rules or structures.' },
        { term: 'Consolidation', def: 'Combining the results of all companies in a group into one set of financial statements.' },
        { term: 'Elimination', def: 'Removing transactions and balances between companies of the same group, so group results show only dealings with outsiders.' },
        { term: 'Balance transfer', def: 'Copying balances from one ledger to another, often with a chart of accounts mapping, as part of consolidation or to feed a secondary ledger.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'What must ledgers share to be in the same ledger set?',
          options: [
            'The same currency only',
            'The same chart of accounts, calendar and period type',
            'The same legal entity',
            'Nothing, any ledgers can be grouped',
          ],
          answer: 1,
          explain: 'Ledger sets need a common chart of accounts, calendar and period type. Currencies may differ unless the ledger set is classified as currency-specific.',
        },
        {
          q: 'A UK accountant should post only to company 201 but view company 101. What should be set up?',
          options: [
            'A cross-validation rule',
            'A data access set with read and write on 201 and read only on 101',
            'A secondary ledger',
            'An allocation rule',
          ],
          answer: 1,
          explain: 'Data access sets secure ledgers or primary balancing segment values, with read-only or read and write access.',
        },
        {
          q: 'Which secondary ledger conversion level holds ONLY manual adjustments?',
          options: ['Balance', 'Journal', 'Subledger', 'Adjustment Only'],
          answer: 3,
          explain: 'An adjustment-only secondary ledger holds just the differences between two sets of rules, entered as manual journals.',
        },
        {
          q: 'Sunny’s ledgers share a chart of accounts and calendar. Which consolidation method is the simplest fit?',
          options: ['Reporting Only', 'Balance Transfer', 'Financial Consolidation and Close (EPM)', 'None is possible'],
          answer: 0,
          explain: 'With a common chart of accounts and calendar, Reporting Only consolidation reports straight from a ledger set. Only translation is needed for the GBP ledger.',
        },
        {
          q: 'Why is the $300 sale from Sunny US to Sunny UK eliminated in the group results?',
          options: [
            'Because it was a mistake',
            'Because sales between group companies aren’t earned from outsiders, so they must not inflate group revenue',
            'Because UK sales are never reported',
            'Because the amount is too small',
          ],
          answer: 1,
          explain: 'Consolidated statements show the group as one company. Trading between its own companies is removed by elimination entries.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Implementing Enterprise Structures and General Ledger: Examples of Ledger Sets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/examples-of-ledger-sets.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Ledger Set Classifications', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/ledger-set-classifications.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Overview of Data Access Set Security', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/overview-of-data-access-set-security.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: Primary Ledgers, Secondary Ledgers, and Reporting Currencies', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/primary-ledgers-secondary-ledgers-and-reporting-currencies.html' },
    { title: 'Using General Ledger: Overview of Consolidation Methods', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-consolidation-methods.html' },
    { title: 'Using General Ledger: Reporting Only or Balance Transfer Consolidation Methods', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/reporting-only-or-balance-transfer-consolidation-methods.html' },
    { title: 'Using General Ledger: Overview of Balance Transfers', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-balance-transfers.html' },
    { title: 'Using General Ledger: Examples of Elimination Entries', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/examples-of-elimination-entries.html' },
    { title: 'Oracle Cloud EPM Financial Consolidation and Close documentation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financial-consolidation-cloud/index.html' },
  ],
};
