export default {
  slug: 'journals',
  title: 'Journals: Writing in the Master Book',
  minutes: 18,
  summary:
    'A journal is how anything gets written into the General Ledger. Learn the batch–journal–line structure, journal sources and categories, how Priya creates journals on screen and in Excel, and how approval, posting and statuses work in Oracle Fusion.',
  objectives: [
    'Describe the three parts of a journal entry: batch, journal and lines',
    'Explain the difference between a journal source and a journal category',
    'Create a balanced manual journal and know when to use the Create Journals spreadsheet instead',
    'Explain journal approval, posting and the main journal statuses',
    'Explain why posted journals are corrected by reversing them, not by editing them',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Pages, entries and lines in a diary',
      html: `<p>Imagine a class diary where each team writes what happened to the class money. Each day gets a <strong>page with a title</strong> (“Monday’s bake sale”). On the page are <strong>entries</strong> (“cookies”, “lemonade”). Each entry has <strong>lines</strong>: “+ $10 into the cash box” and “+ $10 of sales”.</p>
<p>Two rules make the diary trustworthy. First, every entry must <strong>balance</strong>: what goes in one place must come from another. Second, once the teacher stamps a page as <strong>final</strong> (posted), nobody may rub anything out. If there’s a mistake, you write a <em>new</em> entry that undoes it.</p>
<p><span class="hl">In Oracle the page is a journal batch, the entries are journals, and the lines are journal lines.</span></p>`,
    },
    {
      type: 'text',
      heading: 'Batch, journal, lines',
      html: `<p>Every journal entry in Oracle General Ledger has three parts:</p>
<ul>
<li><strong>Batch</strong>: a folder for one or more journals. It has a name, a <strong>source</strong> and an <strong>accounting period</strong>. All journals in a batch share the same period, and they can belong to different ledgers if those ledgers share a calendar and chart of accounts. <strong>Posting always happens at batch level</strong>: post one journal and the whole batch posts. If you leave the batch name blank, Oracle makes one up from the source, an ID and the date and time, such as “Manual 254001 21-JAN-2026 13:49:19”.</li>
<li><strong>Journal</strong> (journal header): needs a <strong>ledger</strong>, <strong>journal name</strong>, <strong>accounting date</strong>, <strong>source</strong>, <strong>category</strong> and <strong>currency</strong>. A description and control total are optional.</li>
<li><strong>Lines</strong>: an account combination and a debit or credit amount, plus an optional line description. <strong>Total debits must equal total credits</strong>. The only exception is statistical journals, which record non-money amounts such as headcount.</li>
</ul>
<p>Tip from Oracle: put entries you’ll want to <strong>reverse separately</strong> in separate batches, and group related routine entries (all of the month’s accruals, say) in one batch for easy review.</p>`,
    },
    {
      type: 'table',
      caption: 'Source versus category: “where from?” and “what kind?”',
      headers: ['Field', 'Question it answers', 'Examples', 'Why it matters'],
      rows: [
        ['<strong>Journal source</strong>', 'Where did this journal come from?', 'Manual, Spreadsheet, Payables, Receivables, Balance Transfer (and one for each other subledger)', 'Drives approval (approval is turned on per source), AutoPost criteria, journal import and audit trails. You can also stop users from editing imported journals.'],
        ['<strong>Journal category</strong>', 'What kind of business event is it?', 'Adjustment, Accrual, plus categories that subledgers use for their own events (invoices, payments, receipts…)', 'Drives default reversal settings (journal reversal criteria sets), AutoPost criteria, reporting and journal conversion rules for secondary ledgers.'],
      ],
    },
    {
      type: 'flow',
      title: 'The life of a manual journal',
      steps: [
        { icon: '✍️', label: 'Create and save', detail: 'Priya enters the batch, journal and lines. A saved journal is Incomplete.' },
        { icon: '✅', label: 'Complete', detail: 'Clicking Complete (or Post) marks it ready. Incomplete journals are never picked up for posting.' },
        { icon: '🙋', label: 'Approve (if required)', detail: 'If the ledger and source need approval, the batch is routed for approval first.' },
        { icon: '📌', label: 'Post', detail: 'Posting checks the journal and updates balances. Status becomes Posted.' },
        { icon: '🔁', label: 'Correct by reversing', detail: 'A posted journal can’t be edited or deleted. Reverse it or write a new correcting journal.' },
      ],
      note: `<p>Journals can be entered in an <strong>open</strong> or <strong>future enterable</strong> period, but posted only in an <strong>open</strong> period. You’ll learn about period statuses in the Periods lesson.</p>`,
    },
    {
      type: 'table',
      caption: 'Statuses you will see on journal batches',
      headers: ['Status', 'Meaning', 'What Priya does'],
      rows: [
        ['<strong>Incomplete</strong>', 'Saved but not completed. Can’t be posted, even by AutoPost.', 'Use it on purpose while waiting for information. Finish it, then complete or post.'],
        ['<strong>Pending approval</strong> / <strong>Approved</strong> / <strong>Rejected</strong>', 'Where the batch stands in approval, when approval applies.', 'Chase approvers, or fix and resubmit a rejected batch.'],
        ['<strong>Selected for Posting</strong>', 'Picked for posting, but the process hasn’t started.', 'Wait.'],
        ['<strong>Processing</strong>', 'Posting is running right now.', 'Wait.'],
        ['<strong>Error</strong>', 'Posting found a problem, such as a closed period or a disabled account.', 'Read the Posting Execution Report, fix the issue and post again.'],
        ['<strong>Posted</strong>', 'Balances are updated. The journal is locked.', 'Reverse or add a new journal if something is wrong.'],
      ],
    },
    {
      type: 'example',
      title: 'Priya fixes a cost center mistake',
      html: `<p>While reviewing February expenses, Priya sees that Noah’s $120 taxi ride to a lemon supplier was charged to the <strong>Sales</strong> cost center (300). Noah manages the <strong>Kitchen</strong> (200), so the cost belongs there. The expense report is already accounted, so Priya moves the cost with a <strong>reclassification</strong> journal.</p>`,
      steps: [
        'Batch: “Feb-26 Reclasses”, period <code>Feb-26</code>. Journal: “Reclass Noah travel to Kitchen”, category <strong>Adjustment</strong>, currency USD, accounting date 28 Feb 2026.',
        'Line 1: debit <code>101-200-6130-000-000</code> Travel and Meals (Kitchen) $120.',
        'Line 2: credit <code>101-300-6130-000-000</code> Travel and Meals (Sales) $120.',
        'Priya attaches Noah’s email and the expense report number, so an auditor can follow the story.',
        'Priya clicks Post. Because the Manual source needs approval at Sunny, the batch first goes to Sam for approval, then posts automatically.',
      ],
      result: `<p>The Travel and Meals account still totals the same company-wide, but the Kitchen and Sales cost centers now show the truth.</p>`,
    },
    {
      type: 'journal',
      title: 'Reclassification journal (source: Manual, category: Adjustment)',
      lines: [
        { account: '101-200-6130-000-000 Travel and Meals (Kitchen)', debit: 120, credit: 0 },
        { account: '101-300-6130-000-000 Travel and Meals (Sales)', debit: 0, credit: 120 },
      ],
      note: `<p>Balanced: $120 = $120. Within one company (101) a journal only has to balance by company value. Journals that cross companies get extra intercompany balancing lines, which you’ll meet in the Intercompany lesson.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: create Priya’s reclass journal',
      instructions: `<p>This is a <strong>simplified practice screen</strong>, not Oracle’s real page. Fill it in for Priya’s reclassification: move Noah’s $120 taxi from Travel and Meals in cost center 300 Sales to cost center 200 Kitchen, in February 2026, in US dollars.</p>`,
      formTitle: 'Practice: Create Journal (simulation)',
      fields: [
        { label: 'Ledger', given: 'Sunny US Ledger' },
        { label: 'Journal source', given: 'Manual' },
        { label: 'Accounting period', type: 'select', options: ['Jan-26', 'Feb-26', 'Mar-26'], answer: 'Feb-26' },
        { label: 'Category', type: 'select', options: ['Accrual', 'Adjustment', 'Payables'], answer: 'Adjustment', hint: 'It corrects a cost center mistake.' },
        { label: 'Currency', type: 'select', options: ['USD', 'GBP'], answer: 'USD' },
        { label: 'Line 1 account (debit)', type: 'text', answer: ['101-200-6130-000-000', '1012006130000000'], hint: 'Company-Cost Center-Account-Product-Intercompany' },
        { label: 'Line 1 debit amount', type: 'number', answer: 120 },
        { label: 'Line 2 account (credit)', type: 'text', answer: ['101-300-6130-000-000', '1013006130000000'] },
        { label: 'Line 2 credit amount', type: 'number', answer: 120 },
      ],
      explain: `<p>The cost moves <em>into</em> the Kitchen (debit cost center 200) and <em>out of</em> Sales (credit cost center 300). Same company, same natural account, same amount, so the journal balances and company-wide Travel and Meals doesn’t change. The category is Adjustment, because this is a correction, not an accrual.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Build a reclassification journal',
      instructions: `<p>Priya finds that a $200 Sweet Sugar Co. invoice was accounted to <strong>5110 Lemons Cost</strong> by mistake. Payables is already closed for that month, so Priya fixes it in the GL. Build the journal that moves the cost to the right account.</p>`,
      accounts: ['5110 Lemons Cost', '5120 Sugar Cost', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '5130 Cups and Straws Cost'],
      answer: [
        { account: '5120 Sugar Cost', debit: 200, credit: 0 },
        { account: '5110 Lemons Cost', debit: 0, credit: 200 },
      ],
      explain: `<p>Debit the correct expense (Sugar Cost) and credit the wrong one (Lemons Cost). Accounts Payable doesn’t change: Sunny still owes Sweet Sugar Co. the same $200, so there is no reason to touch the control account.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: journals in Excel (ADFdi)',
      html: `<p>For many lines, Priya uses the <strong>Create Journals workbook</strong>, an Excel file connected to Oracle through <strong>ADF Desktop Integration</strong> (ADFdi):</p>
<ul>
<li>Install the add-in once from the <kbd>Tools</kbd> work area using <kbd>Download Desktop Integration Installer</kbd>.</li>
<li>In the <kbd>Journals</kbd> work area, open the task <kbd>Create Journal in Spreadsheet</kbd>.</li>
<li>Use the <strong>Single Journal</strong> worksheet for one journal in one ledger, or <strong>Multiple Journals</strong> for many journals and batches.</li>
<li>Click <kbd>Submit</kbd> on the ribbon. Errors appear in the <strong>Status Viewer</strong>. Then choose a submission option: <em>Save to Interface</em>, <em>Submit Journal Import</em>, or the default <em>Submit Journal Import and Posting</em>.</li>
</ul>
<p>Spreadsheet journals come in through the same <strong>Import Journals</strong> process that the subledgers use. That’s why the Spreadsheet source shows up on them.</p>`,
    },
    {
      type: 'text',
      heading: 'Posting: making it official',
      html: `<p><strong>Posting</strong> updates the ledger balances (and the balances cube) from a journal. You can post by clicking <kbd>Post</kbd> on the journal pages, by choosing the import-and-post option from the spreadsheet, or automatically with the <strong>AutoPost</strong> process. AutoPost uses <strong>AutoPost criteria sets</strong> that pick batches by ledger, source, category, period and balance type.</p>
<p>Key rules:</p>
<ul>
<li>Post only into <strong>open</strong> periods. You can post into an open <em>prior</em> period. Oracle then updates the beginning balances of later periods automatically, and for a prior year, the retained earnings balance.</li>
<li>A posted journal <strong>can’t be changed or deleted</strong>. It can be copied or reversed, and each journal can be reversed only once.</li>
<li>Subledger journals should be posted <strong>automatically</strong>, with AutoPost scheduled right after Import Journals. Editing them in the GL would make the subledger and the ledger disagree forever.</li>
</ul>`,
    },
    {
      type: 'text',
      heading: 'Journal approval',
      html: `<p>Approval adds a safety check, especially on manual journals. It is switched on with the ledger option <strong>Enable journal approval</strong> and for chosen journal <strong>sources</strong>. Oracle ships one predefined rule: if the ledger and source are enabled, the journal goes for <strong>one level of approval to the submitter’s supervisor</strong>. Companies usually tune the rules, for example:</p>
<ul>
<li>Under 50,000: no approval.</li>
<li>50,000 to 100,000: one level.</li>
<li>Over 100,000: two levels.</li>
</ul>
<p>Rules can look at the ledger, the largest line or journal amount, the period-close stage and other attributes. You can start approval with the <kbd>Request Approval</kbd> action, or simply click Post: the batch goes through approval first and posting is then submitted automatically. If an approved journal isn’t posted yet you can still edit it, but it must be approved again.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Can it still be changed?',
      instructions: `<p>For each journal batch, decide whether Priya can still edit it, or whether Priya must reverse it (or add a new journal) instead.</p>`,
      categories: ['Can still be edited', 'Locked: reverse or add a new journal'],
      items: [
        { text: 'A batch saved as Incomplete yesterday', answer: 'Can still be edited' },
        { text: 'A batch that failed posting with status Error', answer: 'Can still be edited' },
        { text: 'A batch approved by Sam but not yet posted', answer: 'Can still be edited' },
        { text: 'A batch posted last week', answer: 'Locked: reverse or add a new journal' },
        { text: 'A Payables journal posted by AutoPost', answer: 'Locked: reverse or add a new journal' },
      ],
      explain: `<p>Anything not yet posted can be changed. An approved journal can be edited, but it must be approved again. Once a batch is <strong>posted</strong>, it is locked: it can be copied or reversed, never edited or deleted. And subledger journals should be fixed in the subledger anyway.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Reversal: the eraser that leaves a trail',
      html: `<p>Every journal has a <strong>Reversal</strong> tab with a <strong>Reversal Period</strong> and a <strong>Reversal Method</strong>. The method is either <em>Switch Debit or Credit</em> (the default, which moves amounts to the opposite column) or <em>Change Sign</em> (which keeps the column and flips plus to minus). You can reverse a posted journal or batch from <kbd>Manage Journals</kbd> or the journal’s actions menu. Each reversal gets its own batch, whose name starts with “Reverses”. Automatic reversal of accruals is covered in the next lesson.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: create and post a manual journal',
      items: [
        'From the <kbd>Navigator</kbd>, open the <kbd>Journals</kbd> work area.',
        'In the task pane, click <kbd>Create Journal</kbd>.',
        'Enter a batch name (or leave it blank to let Oracle generate one) and check the accounting period.',
        'In the journal section, enter the journal name, ledger, accounting date, category (for example <kbd>Adjustment</kbd>) and currency.',
        'Add the lines with accounts and debit or credit amounts, and check that the totals match.',
        'Click <kbd>Save</kbd>, then <kbd>Complete</kbd> or <kbd>Post</kbd>. If approval applies, the batch is routed first.',
        'Find it again later with <kbd>Manage Journals</kbd>, where you can also reverse, copy or post.',
      ],
      note: `<p>Labels and page layout can differ slightly by release, by Redwood pages and by your company’s configuration. Your data access set decides which ledgers you can choose.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips for good journals',
      html: `<ul>
<li><strong>Write descriptions for a stranger.</strong> “Reclass Noah taxi 14 Feb from CC300 to CC200, see ER-1042” beats “fix”.</li>
<li><strong>Attach evidence.</strong> Auditors will ask “why?” Oracle can attach files and URLs to journals.</li>
<li><strong>Prefer the subledger fix.</strong> If a Payables invoice used the wrong account and the period is open, it’s often cleaner to fix it in Payables than to adjust in the GL.</li>
<li><strong>Watch the Incomplete tab.</strong> A forgotten incomplete journal is a classic reason a month-end number is missing.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Journal batch', def: 'A group of one or more journals for the same accounting period. Posting happens for the whole batch.' },
        { term: 'Journal source', def: 'Tells where a journal came from, such as Manual, Spreadsheet, Payables or Receivables.' },
        { term: 'Journal category', def: 'Tells what kind of event a journal records, such as Adjustment or Accrual.' },
        { term: 'Incomplete', def: 'A saved journal batch that isn’t finished yet, so it can’t be posted.' },
        { term: 'AutoPost criteria set', def: 'Rules that tell the AutoPost process which journals to post automatically, by ledger, source, category and period.' },
        { term: 'ADFdi', def: 'ADF Desktop Integration: the Excel add-in that lets you create journals in a spreadsheet and upload them to Oracle.' },
        { term: 'Reclassification', def: 'A journal that moves an amount from one account combination to another without changing the total.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Priya posts one journal in a batch that has three journals. What happens?',
          options: [
            'Only that journal posts',
            'The whole batch posts, because posting is done at batch level',
            'Nothing, because batches can’t be posted',
            'The other two journals are deleted',
          ],
          answer: 1,
          explain: 'Posting is always done at batch level, so when one journal posts, the entire batch posts. Use separate batches for entries you want to handle separately.',
        },
        {
          q: 'Which field says WHAT KIND of event a journal records, such as an accrual?',
          options: ['Journal source', 'Journal category', 'Batch name', 'Ledger'],
          answer: 1,
          explain: 'The category describes the type of event (Accrual, Adjustment…). The source says where it came from (Manual, Payables…).',
        },
        {
          q: 'Priya finds a mistake in a journal that was posted last week. What should Priya do?',
          options: [
            'Edit the posted journal',
            'Delete the posted journal',
            'Reverse it (or enter a correcting journal) and enter the correct one',
            'Close the period so nobody sees it',
          ],
          answer: 2,
          explain: 'Posted journals can’t be edited or deleted. Reversing keeps a clear audit trail of both the mistake and the fix.',
        },
        {
          q: 'Why should journals imported from Payables be posted automatically instead of edited in the GL?',
          options: [
            'Because editing them makes the subledger and the General Ledger disagree',
            'Because Payables journals never balance',
            'Because only Ava may post',
            'Because they are statistical journals',
          ],
          answer: 0,
          explain: 'Oracle recommends AutoPost for imported journals. Editing them in the GL would make the ledger and the subledger permanently out of balance.',
        },
        {
          q: 'In the Create Journals spreadsheet, what is the default submission option?',
          options: ['Save to Interface', 'Submit Journal Import', 'Submit Journal Import and Posting', 'Print Only'],
          answer: 2,
          explain: 'The default imports the journals and posts them in one go. The other options leave importing or posting to be done later.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using General Ledger: Journal Entry Components', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/journal-entry-components.html' },
    { title: 'Using General Ledger: Overview of Journal Entry and Actions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-journal-entry-and-actions.html' },
    { title: 'Using General Ledger: Single or Multiple Journal Batches', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/single-or-multiple-journal-batches.html' },
    { title: 'Using General Ledger: How Names for Batches and Journals Are Derived', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/how-names-for-batches-and-journals-are-derived.html' },
    { title: 'Using General Ledger: How You Create Journals in Workbooks', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/how-you-create-journals-in-workbooks.html' },
    { title: 'Using General Ledger: Overview of Journal Posting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-journal-posting.html' },
    { title: 'Using General Ledger: Automatic or Manual Journal Posting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/automatic-or-manual-journal-posting.html' },
    { title: 'Using General Ledger: Statuses for Unposted Journal Batches', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/statuses-for-unposted-journal-batches.html' },
    { title: 'Using General Ledger: Considerations for Defining Journal Approval Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/considerations-for-defining-journal-approval-rules.html' },
    { title: 'Using General Ledger: Journal Reversals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/journal-reversals.html' },
    { title: 'Using General Ledger: Enter Foreign Currency Journals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/enter-foreign-currency-journals.html' },
  ],
};
