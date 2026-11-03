export default {
  slug: 'money-words',
  title: 'Money Words 101: Accounts, Debits and Credits',
  minutes: 18,
  summary:
    'The five kinds of accounts, the accounting equation, and the double-entry rules of debits and credits — with Sunny Lemonade examples, a trial balance, and the difference between cash and accrual accounting.',
  objectives: [
    'Name and explain the five account types: assets, liabilities, equity, revenue and expenses',
    'Use the accounting equation to check that the books are in balance',
    'Apply the debit and credit rules (DEALER) to record simple journal entries',
    'Explain what a journal, a ledger and a trial balance are',
    'Tell the difference between cash basis and accrual basis accounting',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The piggy bank and the IOU notes',
      html: `<p>Imagine you have a piggy bank with <strong>$10</strong> in it. Your aunt lends you <strong>$5</strong> for lemons, so you write an IOU note: "I owe Aunt May $5." Now the piggy bank has $15.</p>
<p>Is all of that $15 yours? No! $5 of it really belongs to Aunt May. Only $10 is truly yours.</p>
<p>That tiny story already contains the three biggest words in accounting:</p>
<ul>
<li>What you <strong>have</strong> ($15 in the piggy bank) – an <strong>asset</strong>.</li>
<li>What you <strong>owe</strong> ($5 to Aunt May) – a <strong>liability</strong>.</li>
<li>What is <strong>truly yours</strong> ($10) – <strong>equity</strong>.</li>
</ul>
<p><span class="hl">What you have = what you owe + what is yours.</span> Accountants call that the accounting equation, and every ERP in the world is built on it.</p>`,
    },
    {
      type: 'text',
      heading: 'The five kinds of accounts',
      html: `<p>An <strong>account</strong> is a labeled bucket where we collect all the money events of one kind. Sunny Lemonade has an account for cash at Big River Bank, one for lemons, one for sales, and so on. Every account belongs to one of <strong>five types</strong>:</p>`,
    },
    {
      type: 'table',
      caption: 'The five account types, with Sunny Lemonade examples from the Sunny COA',
      headers: ['Type', 'Plain words', 'Sunny examples'],
      rows: [
        ['<strong>Asset</strong>', 'Things the company owns or is owed that have value.', '1110 Cash – Big River Bank, 1210 Accounts Receivable, 1310 Inventory – Ingredients, 1510 Equipment'],
        ['<strong>Liability</strong>', 'What the company owes to others.', '2110 Accounts Payable – Trade, 2210 Sales Tax Payable'],
        ['<strong>Equity</strong>', 'What belongs to the owners after paying all debts.', '3100 Owner’s Equity'],
        ['<strong>Revenue</strong>', 'Money earned by selling things (also called income or sales).', '4110 Lemonade Sales Revenue'],
        ['<strong>Expense</strong>', 'Costs used up to run the business and earn revenue.', '5110 Lemons Cost, 5120 Sugar Cost, 6110 Rent, 6120 Electricity'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Sort Sunny’s accounts into the five types',
      instructions: `<p>Put each Sunny account in the right bucket.</p>`,
      categories: ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'],
      items: [
        { text: '1110 Cash – Big River Bank', answer: 'Asset' },
        { text: '1310 Inventory – Ingredients', answer: 'Asset' },
        { text: '2110 Accounts Payable – Trade', answer: 'Liability' },
        { text: '2210 Sales Tax Payable', answer: 'Liability' },
        { text: '3100 Owner’s Equity', answer: 'Equity' },
        { text: '4110 Lemonade Sales Revenue', answer: 'Revenue' },
        { text: '6110 Rent', answer: 'Expense' },
        { text: '7110 Bank Charges', answer: 'Expense' },
      ],
      explain: `<p>In the Sunny COA the first digit is a handy clue: 1 = assets, 2 = liabilities, 3 = equity, 4 = revenue, 5–7 = expenses. Sales tax collected from customers is owed to the government, so it's a <strong>liability</strong>, not revenue.</p>`,
    },
    {
      type: 'text',
      heading: 'The accounting equation',
      html: `<p>The rule that never breaks:</p>
<p><strong>Assets = Liabilities + Equity</strong></p>
<p>Revenue and expenses are really parts of equity. When Sunny earns revenue, the owners become richer; when Sunny has expenses, they become poorer. So the longer version is:</p>
<p><strong>Assets = Liabilities + Equity + (Revenue − Expenses)</strong></p>
<p>Revenue minus expenses is <strong>profit</strong> (or <em>net income</em>). At the end of the year, profit is moved into equity (usually an account called <em>retained earnings</em>), and revenue and expense accounts start again from zero for the new year.</p>
<p>The two big reports you'll hear about come straight from this equation:</p>
<ul>
<li>The <strong>balance sheet</strong> shows assets, liabilities and equity on one day ("What do we have and owe today?").</li>
<li>The <strong>income statement</strong> (or profit and loss) shows revenue and expenses for a period ("Did we make money this month?").</li>
</ul>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Make the equation balance',
      instructions: `<p>Use Assets = Liabilities + Equity to fill in the missing numbers.</p>`,
      html: `<p>Sunny has assets of $12,000 and liabilities of $3,000. Equity is $ {{}}.</p>
<p>Later, assets are $20,000 and equity is $14,500. Liabilities are $ {{}}.</p>
<p>This month revenue is $2,400 and expenses are $1,900. Profit is $ {{}}.</p>`,
      blanks: [{ answer: 9000 }, { answer: 5500 }, { answer: 500 }],
      explain: `<p>Equity = 12,000 − 3,000 = <strong>9,000</strong>. Liabilities = 20,000 − 14,500 = <strong>5,500</strong>. Profit = revenue − expenses = 2,400 − 1,900 = <strong>500</strong>, which increases equity.</p>`,
    },
    {
      type: 'text',
      heading: 'Double-entry: every event touches at least two accounts',
      html: `<p>Here is the clever trick that keeps the equation balanced. Every money event changes <strong>at least two accounts</strong>, in equal and opposite ways. This is called <strong>double-entry bookkeeping</strong>.</p>
<p>When Sunny buys lemons on credit, two things happen at once: Sunny now has lemons (cost goes up) <em>and</em> Sunny owes the farm (a liability goes up). If you only wrote one of those down, the books would be lopsided.</p>
<p>To record both sides, accountants use two columns called <strong>debit</strong> (written <em>Dr</em>, the left side) and <strong>credit</strong> (written <em>Cr</em>, the right side). In every entry, <span class="hl">total debits must equal total credits</span>.</p>
<p>Important: in accounting, "debit" and "credit" do <strong>not</strong> mean "good" or "bad", and they don't mean the same thing as on your bank card. They just mean <strong>left</strong> and <strong>right</strong>.</p>`,
    },
    {
      type: 'slides',
      title: 'The DEALER trick for debits and credits',
      slides: [
        {
          icon: '🧠',
          title: 'Remember the word DEALER',
          html: `<p>Split it into two halves: <strong>DEA</strong> and <strong>LER</strong>.</p><ul><li><strong>D</strong>ividends (owner draws), <strong>E</strong>xpenses, <strong>A</strong>ssets</li><li><strong>L</strong>iabilities, <strong>E</strong>quity, <strong>R</strong>evenue</li></ul>`,
        },
        {
          icon: '⬅️',
          title: 'DEA grow with a DEBIT',
          html: `<p>Dividends, Expenses and Assets <strong>increase with a debit</strong> and decrease with a credit. Their normal balance is a debit.</p><p>Example: cash comes in → debit Cash.</p>`,
        },
        {
          icon: '➡️',
          title: 'LER grow with a CREDIT',
          html: `<p>Liabilities, Equity and Revenue <strong>increase with a credit</strong> and decrease with a debit. Their normal balance is a credit.</p><p>Example: we owe a supplier more → credit Accounts Payable.</p>`,
        },
        {
          icon: '⚖️',
          title: 'Always check the balance',
          html: `<p>After writing an entry, add up the debit column and the credit column. If they aren't equal, something is wrong. Oracle Fusion General Ledger checks that journals balance before they are posted.</p>`,
        },
        {
          icon: '🪜',
          title: 'Three questions for every event',
          html: `<ol><li>Which accounts are affected?</li><li>Is each one going up or down?</li><li>Using DEALER, is that a debit or a credit?</li></ol>`,
        },
      ],
    },
    {
      type: 'table',
      caption: 'Debit and credit cheat sheet',
      headers: ['Account type', 'Increase with', 'Decrease with', 'Normal balance'],
      rows: [
        ['Asset', 'Debit', 'Credit', 'Debit'],
        ['Expense', 'Debit', 'Credit', 'Debit'],
        ['Dividends / owner draws', 'Debit', 'Credit', 'Debit'],
        ['Liability', 'Credit', 'Debit', 'Credit'],
        ['Equity', 'Credit', 'Debit', 'Credit'],
        ['Revenue', 'Credit', 'Debit', 'Credit'],
      ],
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: record the sugar invoice',
      instructions: `<p>Sweet Sugar Co. sends Sunny an invoice for <strong>$200</strong> of sugar, payable in 30 days. Nothing has been paid yet. Build the journal entry using DEALER.</p>`,
      accounts: ['5120 Sugar Cost', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '4110 Lemonade Sales Revenue', '1210 Accounts Receivable'],
      answer: [
        { account: '5120 Sugar Cost', debit: 200, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 200 },
      ],
      explain: `<p>Sugar Cost is an <strong>expense</strong> (DEA) and goes up → debit 200. Sunny now <strong>owes</strong> the supplier, a liability (LER) → credit 200. Cash isn't touched until the bill is paid.</p>`,
    },
    {
      type: 'text',
      heading: 'Journal entries and the ledger',
      html: `<p>A <strong>journal entry</strong> is the written record of one money event: the date, the accounts, the debit and credit amounts and a short description. The <strong>journal</strong> is the diary where entries are written in date order.</p>
<p>A <strong>ledger</strong> is the book that groups those amounts <em>by account</em>, so you can see the running balance of Cash, of Accounts Payable, and so on. Copying journal amounts into the ledger is called <strong>posting</strong>. In Oracle Fusion, the <strong>General Ledger</strong> is the master book, and posting is a step the system does when a journal is ready.</p>
<p>Let's record Sunny's first month (January 2026, period <code>Jan-26</code>) using the Sunny chart of accounts.</p>`,
    },
    {
      type: 'journal',
      title: '1. Sam puts $10,000 of savings into the company',
      lines: [
        { account: '1110 Cash – Big River Bank', debit: 10000, credit: 0 },
        { account: '3100 Owner’s Equity', debit: 0, credit: 10000 },
      ],
      note: `<p>Cash is an asset and goes up → <strong>debit</strong>. The owner's stake is equity and goes up → <strong>credit</strong>.</p>`,
    },
    {
      type: 'journal',
      title: '2. Buy 1,000 lemons from Lemon Grove Farms on credit (Net 30), $500',
      lines: [
        { account: '5110 Lemons Cost', debit: 500, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 500 },
      ],
      note: `<p>The cost of lemons is an expense and goes up → debit. Sunny now owes the farm, a liability → credit. (Some companies first record ingredients as inventory, account 1310, and expense them when used. We keep it simple here.)</p>`,
    },
    {
      type: 'journal',
      title: '3. Sell 200 bottles to Happy Cafe on credit, 200 × $2 = $400',
      lines: [
        { account: '1210 Accounts Receivable', debit: 400, credit: 0 },
        { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 400 },
      ],
      note: `<p>Happy Cafe owes Sunny money → the asset Accounts Receivable goes up (debit). Sunny earned revenue → credit.</p>`,
    },
    {
      type: 'journal',
      title: '4. Electricity bill from Bright Power Utility arrives, $150, to pay next month',
      lines: [
        { account: '6120 Electricity', debit: 150, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 150 },
      ],
    },
    {
      type: 'journal',
      title: '5. Buy a new lemonade stand from Stand Builders LLC on credit, $6,000',
      lines: [
        { account: '1510 Equipment (Fixed Assets)', debit: 6000, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 6000 },
      ],
      note: `<p>The stand will be used for years, so it is an <strong>asset</strong>, not an expense. Its cost is spread over its life through depreciation — you'll learn that in the Fixed Assets module.</p>`,
    },
    {
      type: 'journal',
      title: '6. Pay Lemon Grove Farms the $500',
      lines: [
        { account: '2110 Accounts Payable – Trade', debit: 500, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 500 },
      ],
      note: `<p>The liability goes down → debit. Cash goes down → credit. Notice that paying a bill is <strong>not</strong> an expense — the expense was already recorded in entry 2.</p>`,
    },
    {
      type: 'journal',
      title: '7. Happy Cafe pays its $400',
      lines: [
        { account: '1110 Cash – Big River Bank', debit: 400, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 400 },
      ],
    },
    {
      type: 'lab',
      tool: 'journal-sandbox',
      title: 'Sandbox: pay the electricity bill',
      intro: `<p>In February, Sunny pays the $150 Bright Power Utility bill it recorded in January. The sandbox starts with the right answer: debit Accounts Payable, credit Cash. Try swapping the debit and credit, or using 6120 Electricity instead of Accounts Payable, and watch what happens to each account. Why would debiting Electricity again be wrong?</p>`,
      preset: {
        lines: [
          { account: '2110 Accounts Payable – Trade', debit: 150, credit: 0 },
          { account: '1110 Cash – Big River Bank', debit: 0, credit: 150 },
        ],
      },
    },
    {
      type: 'text',
      heading: 'The trial balance: a quick health check',
      html: `<p>At month-end, Priya lists every account with its balance in a <strong>trial balance</strong>. If total debits equal total credits, the books are arithmetically in balance. (It can't catch everything — an entry posted to the wrong account still balances — but it catches a lot.)</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny Lemonade US – trial balance at the end of Jan-26',
      headers: ['Account', 'Debit', 'Credit'],
      rows: [
        ['1110 Cash – Big River Bank (10,000 − 500 + 400)', '9,900', ''],
        ['1210 Accounts Receivable (400 − 400)', '0', ''],
        ['1510 Equipment (Fixed Assets)', '6,000', ''],
        ['2110 Accounts Payable – Trade (500 + 150 + 6,000 − 500)', '', '6,150'],
        ['3100 Owner’s Equity', '', '10,000'],
        ['4110 Lemonade Sales Revenue', '', '400'],
        ['5110 Lemons Cost', '500', ''],
        ['6120 Electricity', '150', ''],
        ['<strong>Totals</strong>', '<strong>16,550</strong>', '<strong>16,550</strong>'],
      ],
    },
    {
      type: 'example',
      title: 'Check the accounting equation',
      html: `<p>Let's prove the equation still holds after all seven entries.</p>`,
      steps: [
        '<strong>Assets</strong> = Cash 9,900 + Receivables 0 + Equipment 6,000 = <strong>$15,900</strong>',
        '<strong>Liabilities</strong> = Accounts Payable <strong>$6,150</strong>',
        '<strong>Profit</strong> = Revenue 400 − Expenses (500 + 150) = <strong>−$250</strong> (a small loss in the first month — lemons were bought before most sales)',
        '<strong>Equity</strong> = Owner’s Equity 10,000 + profit (−250) = <strong>$9,750</strong>',
        'Liabilities + Equity = 6,150 + 9,750 = <strong>$15,900</strong> ✔',
      ],
      result: `<p>Assets ($15,900) = Liabilities ($6,150) + Equity ($9,750). Balanced — just like the piggy bank.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: Sunshine School pays cash',
      instructions: `<p>Sunshine School buys 50 bottles at $2 each and pays <strong>cash on the spot</strong> into Sunny’s Big River Bank account. Record it.</p>`,
      accounts: ['1110 Cash – Big River Bank', '1210 Accounts Receivable', '4110 Lemonade Sales Revenue', '3100 Owner’s Equity', '2110 Accounts Payable – Trade'],
      answer: [
        { account: '1110 Cash – Big River Bank', debit: 100, credit: 0 },
        { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 100 },
      ],
      explain: `<p>50 × $2 = $100. The school paid immediately, so <strong>Cash</strong> (an asset) goes up — debit — and Sunny earned <strong>revenue</strong> — credit. Accounts Receivable is only used when the customer will pay later, as Happy Cafe did.</p>`,
    },
    {
      type: 'text',
      heading: 'Cash basis vs. accrual basis',
      html: `<p>There are two ways to decide <em>when</em> to record revenue and expenses:</p>
<ul>
<li><strong>Cash basis</strong>: record revenue when cash arrives and expenses when cash leaves. Simple, like a personal checkbook.</li>
<li><strong>Accrual basis</strong>: record revenue when it is <strong>earned</strong> and expenses when they are <strong>incurred</strong> (used up), no matter when cash moves.</li>
</ul>
<p>Look at the electricity bill. Sunny used $150 of power in January but will pay in February. Under the cash basis, January shows no electricity cost at all and February shows $150 — even though the power was used in January. Under the <strong>accrual basis</strong>, January shows the $150 cost, matching it with January's sales. That gives a truer picture of each month.</p>
<p>Companies that follow standards like US GAAP or IFRS use the <strong>accrual basis</strong>, and Oracle Fusion is built for it. That is why you'll hear about <em>accruals</em> (recording costs before the bill is paid, or even before it arrives) all the time at work.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion',
      html: `<p>You will rarely type debits and credits for everyday events. When Ava enters the Lemon Grove Farms invoice in <strong>Payables</strong>, Oracle Fusion's accounting engine (called <strong>Subledger Accounting</strong>) creates the debit to the expense account and the credit to the liability account automatically, using rules Jordan set up. Priya mostly writes manual journals for things no subledger handles, like corrections and month-end adjustments.</p>
<p>But you still need DEALER: when you review accounting, investigate an odd balance or explain a report to Sam, you must be able to read a journal and say "yes, that makes sense".</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Common beginner mistakes',
      html: `<ul>
<li>Thinking a <strong>payment</strong> is an expense. The expense happens when the cost is incurred; the payment just settles the liability.</li>
<li>Recording a long-lasting item (like the $6,000 stand) as an expense instead of an asset.</li>
<li>Confusing bank-statement language ("your account was credited") with accounting language. The bank is looking at <em>its</em> books, where your money is a liability.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Asset', def: 'Something the company owns or is owed that has value, such as cash, receivables or equipment.' },
        { term: 'Liability', def: 'Something the company owes to others, such as unpaid supplier bills.' },
        { term: 'Equity', def: 'The owners’ share of the company: assets minus liabilities.' },
        { term: 'Accounting equation', def: 'Assets = Liabilities + Equity. Every correct entry keeps it in balance.' },
        { term: 'Debit and credit', def: 'The left (debit) and right (credit) sides of an entry. Total debits must always equal total credits.' },
        { term: 'Journal entry', def: 'The record of one money event showing which accounts are debited and credited, and by how much.' },
        { term: 'Trial balance', def: 'A list of all account balances used to check that total debits equal total credits.' },
        { term: 'Accrual basis', def: 'Recording revenue when earned and expenses when incurred, regardless of when cash moves.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Sunny receives a $200 sugar invoice from Sweet Sugar Co., to be paid in 30 days. What is the correct entry?',
          options: [
            'Debit 2110 Accounts Payable 200, Credit 5120 Sugar Cost 200',
            'Debit 5120 Sugar Cost 200, Credit 2110 Accounts Payable 200',
            'Debit 1110 Cash 200, Credit 5120 Sugar Cost 200',
            'Debit 5120 Sugar Cost 200, Credit 1110 Cash 200',
          ],
          answer: 1,
          explain: 'The expense goes up (debit, DEA) and Sunny now owes the supplier, so the liability goes up (credit, LER). Cash moves only when the bill is paid.',
        },
        {
          q: 'Using DEALER, which account increases with a CREDIT?',
          options: ['1110 Cash', '6110 Rent', '4110 Lemonade Sales Revenue', '1510 Equipment'],
          answer: 2,
          explain: 'Revenue is in the LER group (Liabilities, Equity, Revenue), which increase with credits. Cash, Rent and Equipment are DEA accounts.',
        },
        {
          q: 'Sunny has assets of $15,900 and liabilities of $6,150. What is equity?',
          options: ['$22,050', '$9,750', '$6,150', '$15,900'],
          answer: 1,
          explain: 'Equity = Assets − Liabilities = 15,900 − 6,150 = 9,750.',
        },
        {
          q: 'Sunny uses January’s electricity but pays the $150 bill in February. Under the accrual basis, when is the expense recorded?',
          options: ['In February, when paid', 'In January, when the power was used', 'Half in each month', 'Never — utilities are not expenses'],
          answer: 1,
          explain: 'Accrual accounting records expenses when they are incurred, so January carries the cost even though cash leaves in February.',
        },
        {
          q: 'What does a trial balance check?',
          options: [
            'That every entry used the right account',
            'That total debits equal total credits across all accounts',
            'That the bank statement matches the ledger',
            'That all invoices were approved',
          ],
          answer: 1,
          explain: 'A trial balance proves the books are arithmetically balanced. It cannot detect an amount posted to the wrong account, and bank matching is a separate reconciliation.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Principles of Financial Accounting – 3.2 The Expanded Accounting Equation', publisher: 'OpenStax', url: 'https://openstax.org/books/principles-financial-accounting/pages/3-2-define-and-describe-the-expanded-accounting-equation-and-its-relationship-to-analyzing-transactions' },
    { title: 'Principles of Financial Accounting – 3.4 Analyze Business Transactions Using the Accounting Equation', publisher: 'OpenStax', url: 'https://openstax.org/books/principles-financial-accounting/pages/3-4-analyze-business-transactions-using-the-accounting-equation-and-show-the-impact-of-business-transactions-on-financial-statements' },
    { title: 'Principles of Financial Accounting – 3.5 Use Journal Entries to Record Transactions and Post to T-Accounts', publisher: 'OpenStax', url: 'https://openstax.org/books/principles-financial-accounting/pages/3-5-use-journal-entries-to-record-transactions-and-post-to-t-accounts' },
    { title: 'Principles of Financial Accounting – 3.6 Prepare a Trial Balance', publisher: 'OpenStax', url: 'https://openstax.org/books/principles-financial-accounting/pages/3-6-prepare-a-trial-balance' },
    { title: 'Principles of Financial Accounting – 4.1 Concepts and Guidelines Affecting Adjusting Entries (accrual basis)', publisher: 'OpenStax', url: 'https://openstax.org/books/principles-financial-accounting/pages/4-1-explain-the-concepts-and-guidelines-affecting-adjusting-entries' },
    { title: 'Using Subledger Accounting (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fausl/index.html' },
  ],
};
