export default {
  slug: 'special-journals',
  title: 'Special Journals: Recurring, Reversing and Allocations',
  minutes: 18,
  summary:
    'Some journals happen every month, some must undo themselves next month, and some split one cost across many departments. Learn how Oracle Fusion handles recurring journals, automatic reversals, allocation rules in Calculation Manager and AutoPost, with Sunny’s rent as the example.',
  objectives: [
    'Name the three types of recurring journals and how each is created in Oracle Fusion',
    'Explain why accruals are reversed and how journal reversal criteria sets and AutoReverse automate it',
    'Describe how allocation rules are built in Calculation Manager and generated from the Journals work area',
    'Explain what AutoPost criteria sets do',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Chore charts, IOU notes and pizza slices',
      html: `<p><strong>Chore chart:</strong> every Saturday the same chores happen. You don’t rewrite the list each week. You copy it and maybe change who does what. That’s a <strong>recurring journal</strong>.</p>
<p><strong>IOU note:</strong> on Friday you borrow a pencil and write “I owe Sam a pencil”. On Monday you give it back and tear up the note. A note that is <em>meant</em> to be torn up later is like a <strong>reversing journal</strong>.</p>
<p><strong>Pizza:</strong> three friends share one $12 pizza. Ana ate half, Ben a third and Cal the rest, so the bill is split $6, $4 and $2. Splitting one cost fairly by a rule is an <strong>allocation</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Why special journals exist',
      html: `<p>At month-end Priya repeats a lot of the same work: rent, accruals, cost splits. Typing these by hand every month is slow, and it’s easy to type the wrong number. Oracle General Ledger has tools to <strong>automate</strong> them:</p>
<ul>
<li><strong>Recurring journals</strong> for entries that repeat each period.</li>
<li><strong>Reversals</strong>, including <strong>automatic reversal</strong>, for entries that must undo themselves in a later period, such as accruals.</li>
<li><strong>Allocations</strong> (built in <strong>Calculation Manager</strong>) that calculate journal lines from existing balances, such as spreading rent across departments.</li>
<li><strong>AutoPost</strong>, which posts chosen journals without anyone clicking Post.</li>
</ul>`,
    },
    {
      type: 'table',
      caption: 'The three kinds of recurring journals in Oracle Fusion',
      headers: ['Type', 'Accounts', 'Amounts', 'How Oracle suggests creating it', 'Sunny example'],
      rows: [
        ['<strong>Skeleton</strong>', 'Same every period', 'Blank, typed each period', 'Save a Create Journals spreadsheet template (or copy an old journal) and type the amounts each period.', 'Monthly headcount by cost center (a statistical journal).'],
        ['<strong>Standard</strong>', 'Same every period', 'Same every period', 'Save a Create Journals spreadsheet template and upload it each period with posting selected.', 'Rent of $1,000 every month.'],
        ['<strong>Formula</strong>', 'Same every period', 'Calculated from balances', 'Build a formula rule in Calculation Manager, then generate it, or schedule it, from the Journals work area.', 'Spread total rent across cost centers by floor space.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Skeleton, standard or formula?',
      instructions: `<p>Priya is planning Sunny’s monthly entries. Choose the best recurring journal type for each one.</p>`,
      categories: ['Skeleton', 'Standard', 'Formula'],
      items: [
        { text: 'Rent: always $1,000 from the same accounts', answer: 'Standard' },
        { text: 'Number of employees per cost center, typed in fresh each month', answer: 'Skeleton' },
        { text: 'Split total rent across cost centers by floor space', answer: 'Formula' },
        { text: 'A fixed $50 monthly bank fee charged by Big River Bank', answer: 'Standard' },
        { text: 'A bonus accrual equal to 5% of this month’s lemonade revenue', answer: 'Formula' },
      ],
      explain: `<p><strong>Standard</strong> means the same accounts and the same amounts every period. <strong>Skeleton</strong> means the same accounts, with amounts typed each period. <strong>Formula</strong> means the amounts are calculated from balances, which in Fusion means a Calculation Manager rule.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: no separate “recurring journal” screen',
      html: `<p>People coming from older Oracle products often look for a “Define Recurring Journals” form. In Oracle Fusion, Oracle recommends <strong>spreadsheet templates or copying journals</strong> for skeleton and standard entries (on <kbd>Manage Journals</kbd>, open a journal and use the batch action <kbd>Copy</kbd>). <strong>Formula</strong> recurring entries are built as rules in <strong>Calculation Manager</strong>, the same tool used for allocations.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny’s monthly rent as a standard recurring journal',
      html: `<p>Sunny US rents its kitchen and office for <strong>$1,000 a month</strong>. The landlord collects it from the Big River Bank account by direct debit on the last day of each month. Priya set up a standard recurring entry once:</p>`,
      steps: [
        'Priya downloaded the Create Journals workbook (task <kbd>Create Journal in Spreadsheet</kbd>) and filled in one journal: category Adjustment, the two lines below.',
        'Priya saved the file in the team folder as “Sunny US – Monthly Rent.xlsm”.',
        'Each month Priya opens it, changes the period and accounting date (for example <code>Jan-26</code>, 31 Jan 2026), and submits with <em>Submit Journal Import and Posting</em>.',
      ],
      result: `<p>One minute a month, no typos. The rent lands in cost center 100 Administration, and an allocation later shares it fairly (see below).</p>`,
    },
    {
      type: 'journal',
      title: 'Monthly rent, Jan-26 (standard recurring)',
      lines: [
        { account: '101-100-6110-000-000 Rent (Administration)', debit: 1000, credit: 0 },
        { account: '101-100-1110-000-000 Cash – Big River Bank', debit: 0, credit: 1000 },
      ],
      note: `<p>Same accounts and same amounts every month: the definition of a standard recurring journal.</p>`,
    },
    {
      type: 'text',
      heading: 'Reversing journals and accruals',
      html: `<p>An <strong>accrual</strong> records a cost (or income) in the right month even though the bill hasn’t arrived yet. On 31 January Sunny has used electricity, but Bright Power Utility’s $150 bill won’t come until February. Priya accrues it in January, so January’s profit is right.</p>
<p>When the real bill arrives in February, Ava enters it in Payables and it books the expense again. To avoid counting it twice, Priya’s January accrual must be <strong>reversed</strong> in February. Reversals are also useful for estimates, temporary adjustments and some reclassifications.</p>
<p>Oracle supports reversal in two ways:</p>
<ul>
<li><strong>Manually</strong>: use the Reverse action on a posted journal or batch from <kbd>Manage Journals</kbd> or the journal’s actions menu.</li>
<li><strong>Automatically</strong>: set up a <strong>journal reversal criteria set</strong> (task <kbd>Manage Journal Reversal Criteria Sets</kbd> in Setup and Maintenance) and assign it to the ledger in <kbd>Specify Ledger Options</kbd>. For each journal <strong>category</strong> it holds a default <strong>Reversal Period</strong> (for example <em>Next Period</em>), a <strong>Reversal Method</strong> (<em>Switch Debit or Credit</em> or <em>Change Sign</em>) and an <strong>Automatic Reversal Option</strong>: <em>None</em>, <em>Reverse Automatically</em> or <em>Reverse and Post Automatically</em>.</li>
</ul>
<p>The <strong>AutoReverse Journals</strong> process then does the work. Run it with the <kbd>Run AutoReverse</kbd> task in the Journals work area, schedule it, or switch on the ledger option <strong>Run AutoReverse After Open Period</strong> so it runs every time a new period is opened.</p>`,
    },
    {
      type: 'journal',
      title: 'Jan-26: accrue electricity used but not yet billed (category: Accrual)',
      lines: [
        { account: '101-200-6120-000-000 Electricity (Kitchen)', debit: 150, credit: 0 },
        { account: '101-100-2120-000-000 Received Not Invoiced Accrual', debit: 0, credit: 150 },
      ],
      note: `<p>Sunny books accruals for goods and services received but not yet invoiced to account 2120. Because the Accrual category is set to <em>Next Period</em> and <em>Reverse and Post Automatically</em>, Priya doesn’t need a calendar reminder.</p>`,
    },
    {
      type: 'journal',
      title: 'Feb-26: automatic reversal (batch name starts with “Reverses”)',
      lines: [
        { account: '101-100-2120-000-000 Received Not Invoiced Accrual', debit: 150, credit: 0 },
        { account: '101-200-6120-000-000 Electricity (Kitchen)', debit: 0, credit: 150 },
      ],
      note: `<p>When Ava enters the real $150 bill in February (Dr Electricity, Cr Accounts Payable), February’s electricity nets to zero. The cost stays in January, where it belongs.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Build an accrual journal',
      instructions: `<p>On 30 January Cup & Straw Supply delivers <strong>$300</strong> of cups and straws to Noah’s kitchen, but the invoice won’t arrive until February. Priya accrues the cost in January. Build the accrual journal, using Sunny’s account for goods and services received but not yet invoiced.</p>`,
      accounts: ['5130 Cups and Straws Cost', '1310 Inventory – Ingredients', '2110 Accounts Payable – Trade', '2120 Received Not Invoiced Accrual', '1110 Cash – Big River Bank'],
      answer: [
        { account: '5130 Cups and Straws Cost', debit: 300, credit: 0 },
        { account: '2120 Received Not Invoiced Accrual', debit: 0, credit: 300 },
      ],
      explain: `<p>The expense belongs in January (debit), and the liability is an accrual (credit 2120), not Accounts Payable. There is no invoice yet, and AP is a supplier control account fed by Payables. With the Accrual category, AutoReverse flips this entry on 1 February.</p>`,
    },
    {
      type: 'lab',
      tool: 'journal-sandbox',
      title: 'Sandbox: accrue, then reverse',
      intro: `<p>Here is January’s electricity accrual. Add the February reversal lines (debit 2120, credit 6120) and watch the T-accounts: after both entries, both accounts are back to zero. Then add Ava’s real $150 invoice (debit 6120, credit 2110) to see February’s electricity end at zero. The cost stays in January.</p>`,
      preset: {
        lines: [
          { account: '6120 Electricity', debit: 150, credit: 0 },
          { account: '2120 Received Not Invoiced Accrual', debit: 0, credit: 150 },
        ],
      },
    },
    {
      type: 'slides',
      title: 'Allocations with Calculation Manager',
      slides: [
        {
          icon: '🧊',
          title: 'Built on the balances cube',
          html: `<p>Allocation rules read <strong>preaggregated balances</strong> from the GL balances cube (Oracle Essbase). They can use actual balances or statistics, such as square metres or headcount, and they can work across ledgers that share a chart of accounts.</p>`,
        },
        {
          icon: '🧩',
          title: 'Rules are made of components',
          html: `<p>In the <strong>Rule Designer</strong> you drag in components. A <strong>Point of View</strong> fixes dimensions such as company and currency. An <strong>Allocation</strong> component says what to spread (the source), where (the targets), based on what (the basis) and the offset. A <strong>Formula</strong> component calculates amounts with an expression. An Allocation Wizard guides you step by step.</p>`,
        },
        {
          icon: '❓',
          title: 'Runtime prompts',
          html: `<p>A <strong>runtime prompt</strong> variable asks for a value when the rule runs, usually the accounting period. When a rule is scheduled, the period moves forward automatically each run.</p>`,
        },
        {
          icon: '🪜',
          title: 'Rule sets run in order',
          html: `<p>A <strong>rule set</strong> groups related rules and runs them <strong>one after another</strong>. For example, first spread IT costs to departments, then spread the departments’ totals to products. Order matters because each step uses the results of the one before.</p>`,
        },
        {
          icon: '🚀',
          title: 'Validate, deploy, generate',
          html: `<p>Rules must be <strong>validated and deployed</strong> before use. Then you generate them from the Journals work area. The process creates a journal batch through journal import, and posts it if you tick <strong>Post Allocations</strong>. The <strong>Unallocated Balances</strong> infolet on the General Accounting Dashboard shows amounts left behind in allocation pools.</p>`,
        },
      ],
    },
    {
      type: 'example',
      title: 'Allocating Sunny’s rent by floor space',
      html: `<p>The $1,000 rent lands in cost center <strong>100 Administration</strong>. But the building is 70% kitchen and 30% shop counter. Sam wants each department’s profit to carry its fair share, so Jordan built an allocation rule:</p>
<ul>
<li><strong>Source (pool):</strong> account 6110 Rent, cost center 100, period activity (PTD), actual.</li>
<li><strong>Targets:</strong> account 6110 in cost centers 200 Kitchen and 300 Sales.</li>
<li><strong>Basis:</strong> statistical floor-space amounts (Kitchen 70 m², Sales 30 m²).</li>
<li><strong>Offset:</strong> account 6110, cost center 100, so the pool is emptied.</li>
<li><strong>Runtime prompt:</strong> accounting period.</li>
</ul>`,
      steps: [
        'The rent journal for <code>Jan-26</code> must be <strong>posted first</strong>, because allocations read posted balances.',
        'Priya generates the rule “SUNNY RENT BY FLOOR SPACE” for period Jan-26 with Post Allocations ticked.',
        'The rule calculates Kitchen $1,000 × 70% = $700 and Sales $1,000 × 30% = $300, with a $1,000 offset to Administration.',
      ],
      result: `<p>Company-wide rent is still $1,000, but now the Kitchen carries $700 and Sales $300, and Administration’s rent is zero. Next month the scheduled rule repeats with the new period. That’s a <strong>formula recurring entry</strong> in action.</p>`,
    },
    {
      type: 'journal',
      title: 'Generated allocation journal, Jan-26',
      lines: [
        { account: '101-200-6110-000-000 Rent (Kitchen)', debit: 700, credit: 0 },
        { account: '101-300-6110-000-000 Rent (Sales)', debit: 300, credit: 0 },
        { account: '101-100-6110-000-000 Rent (Administration) – offset', debit: 0, credit: 1000 },
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Recalculate the rent allocation',
      instructions: `<p>In March Sunny remodels: the Kitchen now uses <strong>80 m²</strong> and the Sales counter <strong>20 m²</strong>. Rent is still $1,000 in cost center 100. Jordan updates the floor-space statistics. What will the generated allocation journal show?</p>`,
      html: `<p>Debit Rent, Kitchen (200): $ {{}}</p>
<p>Debit Rent, Sales (300): $ {{}}</p>
<p>Credit Rent, Administration (100), the offset: $ {{}}</p>`,
      blanks: [
        { answer: 800, hint: '80 ÷ 100 × 1,000' },
        { answer: 200 },
        { answer: 1000 },
      ],
      explain: `<p>The basis is 80 + 20 = 100 m², so the Kitchen gets 80% ($800) and Sales 20% ($200). The offset empties the $1,000 pool in Administration. The rule itself didn’t change. Only the basis data did, which is why allocation rules are so reusable.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: generate an allocation',
      items: [
        'Open the <kbd>Journals</kbd> work area.',
        'To build or change rules, use the allocation rules task in the task pane (Oracle’s guides call it <kbd>Create Allocation Rules</kbd> or <kbd>Define Allocation Rules</kbd>). It opens Calculation Manager in a new window.',
        'To run a rule, click <kbd>Generate Allocations</kbd> (also shown as <kbd>Generate General Ledger Allocations</kbd>).',
        'Select the rule or rule set, then enter the parameters, such as the ledger and period. The last day of the period becomes the accounting date.',
        'Leave <kbd>Post Allocations</kbd> ticked to post straight away, or untick it to review first. Click <kbd>Submit</kbd>.',
        'To repeat it monthly, use the advanced options to add a schedule.',
      ],
      note: `<p>The period must be <strong>Open</strong> or <strong>Future Enterable</strong> to generate, and Open to post. Labels differ slightly between releases, Redwood pages and your company’s configuration.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'AutoPost: posting on autopilot',
      html: `<p>An <strong>AutoPost criteria set</strong> (setup task <kbd>Manage AutoPost Criteria Sets</kbd>) lists rows of <em>priority, ledger or ledger set, source, category, accounting period and balance type</em>. The <strong>AutoPost Journals</strong> process posts every batch that matches. A typical set posts all journals from the Payables and Receivables sources. Oracle suggests scheduling it right after <strong>Import Journals</strong>, so imported journals can’t be edited before they post. Allocation, revaluation and spreadsheet uploads also have their own “post automatically” options.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li><strong>Allocate last.</strong> Run allocations after all the costs they spread have been posted, otherwise the pool is incomplete.</li>
<li><strong>Keep the basis fresh.</strong> If the Kitchen grows, update the floor-space statistics, or the split will be wrong.</li>
<li><strong>Use the Accrual category for accruals.</strong> Then the reversal criteria set reverses them automatically and nothing gets counted twice.</li>
<li><strong>Review automation output.</strong> Automatic doesn’t mean unchecked. Look at the generated batch and the execution reports every month.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Recurring journal', def: 'A journal that repeats each period. It can be skeleton (no amounts), standard (fixed amounts) or formula (calculated amounts).' },
        { term: 'Accrual', def: 'A journal that records income or cost in the period it belongs to, before the invoice or cash arrives.' },
        { term: 'Journal reversal criteria set', def: 'Settings by journal category for the default reversal period, method and whether to reverse automatically.' },
        { term: 'AutoReverse', def: 'The process that automatically creates (and can post) reversal journals for categories set to reverse automatically.' },
        { term: 'Allocation', def: 'Spreading an amount from one place to others using a rule and a basis, such as floor space or headcount.' },
        { term: 'Calculation Manager', def: 'The Oracle tool used to design, validate and deploy allocation and formula rules that run against the GL balances cube.' },
        { term: 'Rule set', def: 'A group of allocation rules that run one after another in a set order.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Sunny’s rent is the same $1,000 to the same accounts every month. Which recurring type fits best?',
          options: ['Skeleton', 'Standard', 'Formula', 'Statistical'],
          answer: 1,
          explain: 'Same accounts and same amounts each period make a standard recurring journal. Oracle suggests a saved Create Journals spreadsheet that you upload each month.',
        },
        {
          q: 'Why does Priya reverse the January electricity accrual in February?',
          options: [
            'Because accruals are always mistakes',
            'So the expense isn’t counted twice when the real invoice is entered in February',
            'Because February is a closed period',
            'To move the cost to the Sales cost center',
          ],
          answer: 1,
          explain: 'The accrual puts the cost in January. When the real bill is entered in February, the reversal cancels the estimate, so the cost is counted only once.',
        },
        {
          q: 'Where are formula recurring entries and allocation rules built in Oracle Fusion General Ledger?',
          options: ['In Calculation Manager', 'In the Payables invoice workbench', 'In Smart View only', 'In the Close Monitor'],
          answer: 0,
          explain: 'Calculation Manager is used to design, validate and deploy allocation and formula rules. You generate them from the Journals work area.',
        },
        {
          q: 'Priya generates the rent allocation, but the result is $0. What is the most likely reason?',
          options: [
            'The rent journal for the period wasn’t posted yet',
            'Allocations only work in closed periods',
            'The rule was generated too early in the year',
            'The Post Allocations box was ticked',
          ],
          answer: 0,
          explain: 'Allocations read posted balances from the balances cube. If the source journal isn’t posted, the pool is empty.',
        },
        {
          q: 'Which Automatic Reversal Option both creates and posts the reversal journal?',
          options: ['None', 'Reverse Automatically', 'Reverse and Post Automatically', 'Change Sign'],
          answer: 2,
          explain: 'Reverse and Post Automatically creates the reversal and posts it. Change Sign is a reversal method, not an automatic option.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using General Ledger: Types of Recurring Journals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/types-of-recurring-journals.html' },
    { title: 'Using General Ledger: Overview of Recurring Journals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-recurring-journals.html' },
    { title: 'Using General Ledger: Create Recurring Journals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/create-recurring-journals.html' },
    { title: 'Using General Ledger: Schedule Recurring Journals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/schedule-recurring-journals.html' },
    { title: 'Using General Ledger: Journal Reversals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/journal-reversals.html' },
    { title: 'Using General Ledger: Overview of Allocations and Periodic Entries', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-allocations-and-periodic-entries.html' },
    { title: 'Using General Ledger: Overview of Allocation Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-allocation-rules.html' },
    { title: 'Using General Ledger: Generate Allocations and Periodic Entries Manually', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/generate-allocations-and-periodic-entries-manually.html' },
    { title: 'Using General Ledger: Create an AutoPost Criteria Set', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/create-an-autopost-criteria-set.html' },
    { title: 'Using General Ledger: General Accounting Dashboard', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/general-accounting-dashboard.html' },
  ],
};
