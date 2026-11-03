export default {
  slug: 'banks-and-accounts',
  title: 'Banks, Branches and Bank Accounts',
  minutes: 14,
  summary:
    'Before anyone can pay or collect money in Oracle Fusion, the company’s banks, branches and bank accounts must be set up once, in one shared place. Learn the bank account model, the difference between internal and external bank accounts, and how Sunny’s Operating Account is configured.',
  objectives: [
    'Describe the bank → branch → account model used by Oracle Fusion Cash Management',
    'Explain the difference between internal bank accounts and external bank accounts',
    'List the key settings on an internal bank account: owner, account use, business unit access, GL cash account and reconciliation rules',
    'Explain how bank account security keeps the wrong people away from bank accounts',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'A building, a door, and a locker',
      html: `<p>Think of a big school. The <strong>school</strong> itself is like a <strong>bank</strong> (Big River Bank). The school has several <strong>entrances</strong> in different streets — those are like <strong>branches</strong>. Inside, each student has their own <strong>locker</strong> with a number — that is like a <strong>bank account</strong>.</p>
<p>To find your locker, you need all three: which school, which entrance, which locker number. And a good school also decides <strong>who has the key</strong> to each locker.</p>
<p>Oracle Fusion works the same way: <span class="hl">first the bank, then the branch, then the account — and then who is allowed to use it.</span></p>`,
    },
    {
      type: 'text',
      heading: 'One place for every bank account',
      html: `<p>Oracle Fusion uses a single <strong>bank account model</strong>. All bank accounts are defined once in Cash Management, and then <strong>shared</strong> with the applications that need them:</p>
<ul>
<li><strong>Payables</strong> uses the account to pay suppliers (money out).</li>
<li><strong>Receivables</strong> uses it to receive customer payments (money in).</li>
<li><strong>Payroll</strong> uses it to pay employees.</li>
</ul>
<p>Why does that matter? If Payables and Receivables each kept their own copy of the Sunny Operating Account, someone could change the account number in one place and forget the other. With one shared definition, there is one truth. Oracle points out that this avoids setting up the same bank account again and again for every business unit that shares it.</p>`,
    },
    {
      type: 'flow',
      title: 'The setup order: bank → branch → account',
      steps: [
        { icon: '🏛️', label: 'Bank', detail: 'Create Big River Bank (country, bank name, bank code if your country uses one).' },
        { icon: '🚪', label: 'Branch', detail: 'Create its Main Street branch (branch name, branch number / routing number, BIC/SWIFT code if needed).' },
        { icon: '🔐', label: 'Account', detail: 'Create the Sunny Operating Account under that branch: account number, currency, owner legal entity.' },
        { icon: '🧭', label: 'Use & access', detail: 'Tick the uses (Payables, Receivables, Payroll) and grant business unit access with the accounts to use.' },
        { icon: '⚙️', label: 'Controls', detail: 'Assign GL cash account, reconciliation rule set, tolerance and transaction creation rules.' },
      ],
      note: `<p>Oracle checks for existing banks and branches as you type (the “matching option”), so you do not accidentally create Big River Bank twice.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Practice: put the setup steps in order',
      instructions: `<p>Jordan is setting up Sunny’s first bank account. Put the steps in the order Oracle expects.</p>`,
      items: [
        'Create the bank: Big River Bank',
        'Create the branch: Big River Bank – Main Street',
        'Create the account: Sunny Operating Account (owner Sunny Lemonade US Inc.)',
        'Select account uses and grant business unit access to Sunny US BU',
        'Assign the GL cash account and the reconciliation rules',
      ],
      explain: `<p>An account always belongs to a branch, and a branch to a bank, so they are created top-down. Only once the account exists can you decide who uses it and how it is accounted and reconciled.</p>`,
    },
    {
      type: 'text',
      heading: 'Internal and external bank accounts',
      html: `<p>Oracle Fusion stores two kinds of bank accounts. The table shows the difference.</p>`,
    },
    {
      type: 'table',
      caption: 'Internal vs. external bank accounts',
      headers: ['', 'Internal bank account', 'External bank account'],
      rows: [
        ['<strong>Whose account?</strong>', 'Ours — owned by one of our legal entities.', 'Someone else’s — a supplier, customer, employee or ad hoc payee.'],
        ['<strong>Sunny example</strong>', 'Sunny Operating Account at Big River Bank, owned by Sunny Lemonade US Inc.', 'Lemon Grove Farms’ account, where Ava sends the $500 payment.'],
        ['<strong>Where it is set up</strong>', 'Cash Management (<kbd>Manage Bank Accounts</kbd>).', 'Usually on the supplier, customer or employee record (Payments stores it).'],
        ['<strong>Used for</strong>', 'Disbursing (paying from) and receiving (remitting to) money.', 'The destination of our payments, or the source of a customer’s direct debit.'],
        ['<strong>Reconciled by us?</strong>', 'Yes — we load its bank statements and reconcile them.', 'No — we never see its statements.'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: where these live',
      html: `<p>Setup is done in <strong>Setup and Maintenance</strong>, in the Financials offering, Cash Management functional area. Oracle documents the path <kbd>Setup and Maintenance</kbd> &gt; <kbd>Financials</kbd> &gt; <kbd>Cash Management</kbd> &gt; <kbd>Manage Bank Accounts</kbd>. Related tasks are <kbd>Manage Banks</kbd> and <kbd>Manage Bank Branches</kbd>.</p>
<p>For many accounts at once, the rapid implementation tasks <kbd>Create Banks, Branches, and Accounts in Spreadsheet</kbd> and <kbd>Upload Banks, Branches, and Accounts</kbd> load them from an Excel template.</p>
<p>To set up banks, branches and accounts, a user needs the <strong>Cash Management Administration</strong> duty (included in roles such as Cash Manager). Labels may differ slightly by release and Redwood pages.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: internal or external?',
      instructions: `<p>Decide whether each bank account is an <strong>internal</strong> bank account (ours) or an <strong>external</strong> bank account (someone else’s).</p>`,
      categories: ['Internal bank account', 'External bank account'],
      items: [
        { text: 'Sunny Operating Account at Big River Bank', answer: 'Internal bank account' },
        { text: 'Lemon Grove Farms’ account that receives Ava’s payments', answer: 'External bank account' },
        { text: 'Happy Cafe’s account used for a direct debit', answer: 'External bank account' },
        { text: 'Sunny Lemonade UK Ltd’s GBP account, owned by the UK legal entity', answer: 'Internal bank account' },
        { text: 'Noah’s personal account for expense reimbursements', answer: 'External bank account' },
      ],
      explain: `<p>Internal accounts are owned by one of <em>our</em> legal entities (US or UK) — we load their statements and reconcile them. Suppliers, customers and employees have external accounts: we pay into them (or collect from them) but never reconcile them.</p>`,
    },
    {
      type: 'text',
      heading: 'The four parts of an internal bank account',
      html: `<p>Oracle groups the account definition into four areas. Here is what each means in plain words:</p>
<ol>
<li><strong>General information</strong> — account name, number, currency, the branch it belongs to, and the <strong>owner</strong>: the legal entity that owns the money (for us, Sunny Lemonade US Inc.).</li>
<li><strong>Control of the account</strong> — the accounting and reconciliation settings: the <strong>GL cash account</strong>, a <strong>reconciliation differences</strong> account, the reconciliation <strong>rule set</strong>, <strong>tolerance rule</strong>, <strong>parse rule set</strong>, and <strong>transaction creation rules</strong>. Many of these you will meet in the next two lessons.</li>
<li><strong>Security and access</strong> — who (which users and roles) may use the account.</li>
<li><strong>Business unit assignment</strong> — which business units may use the account in Payables and Receivables, plus account settings per business unit (such as cash, bank charges and foreign exchange gain/loss accounts).</li>
</ol>`,
    },
    {
      type: 'slides',
      title: 'Key settings explained',
      slides: [
        {
          icon: '🏷️',
          title: 'Account use',
          html: `<p>Tick which applications may use the account: <strong>Payables</strong>, <strong>Receivables</strong>, <strong>Payroll</strong>. The Sunny Operating Account is used for all three.</p>`,
        },
        {
          icon: '🏢',
          title: 'Business unit access',
          html: `<p>Payables and Receivables find bank accounts <strong>by business unit</strong>. So for Ava and Omar to use the account, Jordan must grant access to <strong>Sunny US BU</strong>. Oracle only lets you grant access to business units that use the same ledger as the account owner’s legal entity.</p><p>Payroll accounts are identified by <strong>legal entity</strong> instead.</p>`,
        },
        {
          icon: '📒',
          title: 'GL cash account',
          html: `<p>Every movement in this bank account is accounted to its GL cash account. For Sunny: <code>101-100-1110-000-000</code> (Company 101, Cost Center 100 Administration, Account 1110 Cash – Big River Bank). Oracle recommends a <strong>unique cash account per bank account</strong> to make book-to-bank reconciliation easy.</p>`,
        },
        {
          icon: '⚖️',
          title: 'Reconciliation settings',
          html: `<p>The account holds the <strong>reconciliation matching rule set</strong> (for automatic matching), a <strong>tolerance rule</strong> (small allowed differences), a <strong>parse rule set</strong> (to pull references out of long statement text) and <strong>transaction creation rules</strong> (to record fees and interest).</p>`,
        },
        {
          icon: '🔒',
          title: 'Security',
          html: `<p>By default anyone with the right business unit can use the account in Payables or Receivables. Turn on <strong>secure by users and roles</strong> to restrict it further to named people or roles. An optional opt-in feature also limits who may <em>set up</em> accounts by <strong>legal entity</strong>.</p>`,
        },
      ],
    },
    {
      type: 'example',
      title: 'Jordan sets up the Sunny Operating Account',
      html: `<p>During implementation, Jordan creates Sunny Lemonade US Inc.’s main bank account. (Bank numbers below are made up for the story.)</p>`,
      steps: [
        '<strong>Bank:</strong> Big River Bank, country United States.',
        '<strong>Branch:</strong> Big River Bank – Main Street, routing number 123456789.',
        '<strong>Account:</strong> Sunny Operating Account, number ending 4321, currency USD, owner <em>Sunny Lemonade US Inc.</em>',
        '<strong>Account use:</strong> Payables ✔, Receivables ✔, Payroll ✔.',
        '<strong>Cash account:</strong> <code>101-100-1110-000-000</code>. Bank charges account (per business unit): <code>101-100-7110-000-000</code>. Foreign exchange gain/loss: <code>101-100-7120-000-000</code>.',
        '<strong>Business unit access:</strong> Sunny US BU.',
        '<strong>Reconciliation:</strong> rule set “SUNNY DAILY”, tolerance rule “SMALL FEES ±$5”, transaction creation rules “BANK FEES” and “INTEREST”.',
        '<strong>Security:</strong> secured by users and roles = Yes; access for Mia, Ava and Omar’s roles only.',
      ],
      result: `<p>Now Ava can choose the Sunny Operating Account when Ava pays suppliers, Omar can choose it as the remit-to account for customer receipts, and Mia can load and reconcile its statements. One account, shared safely.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: create the Sunny Operating Account',
      instructions: `<p>This is a <strong>practice form</strong> (a simplified simulation, not Oracle’s real page). Fill it in using Jordan’s setup from the example above.</p>`,
      formTitle: 'Create Bank Account (practice)',
      fields: [
        { label: 'Bank', type: 'select', options: ['Big River Bank', 'Lemon Grove Farms', 'Sunny Group'], answer: 'Big River Bank' },
        { label: 'Branch', type: 'text', given: 'Big River Bank – Main Street' },
        { label: 'Account name', type: 'text', answer: 'Sunny Operating Account' },
        { label: 'Currency', type: 'select', options: ['USD', 'GBP', 'EUR'], answer: 'USD' },
        { label: 'Owner (legal entity)', type: 'select', options: ['Sunny Lemonade US Inc.', 'Sunny Lemonade UK Ltd', 'Sunny US BU'], answer: 'Sunny Lemonade US Inc.', hint: 'Owners are legal entities, not business units.' },
        { label: 'Use for Payables?', type: 'select', options: ['Yes', 'No'], answer: 'Yes' },
        { label: 'Business unit access', type: 'select', options: ['Sunny US BU', 'Sunny UK BU'], answer: 'Sunny US BU' },
        { label: 'GL cash account', type: 'text', answer: '101-100-1110-000-000', hint: 'Company 101, cost center 100, account 1110' },
      ],
      explain: `<p>The owner is the <strong>legal entity</strong> Sunny Lemonade US Inc.; business unit access goes to <strong>Sunny US BU</strong> (a UK business unit uses a different ledger, so Oracle would not allow it). The cash account <code>101-100-1110-000-000</code> is unique to this bank account, which keeps book-to-bank reconciliation simple.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: look at an internal bank account',
      items: [
        'Open <kbd>Setup and Maintenance</kbd> and choose the <kbd>Financials</kbd> offering.',
        'Select the <kbd>Cash Management</kbd> functional area (or search for the task) and open <kbd>Manage Bank Accounts</kbd>.',
        'Search by bank account name or bank name, then open an account in view or edit mode.',
        'Review the general information (owner, currency), then the controls (cash account, rule sets), the security, and the business unit access.',
        'Do not change anything in a production system — bank account changes are usually controlled and approved.',
      ],
      note: `<p>Labels and page layouts can differ slightly by release, by Redwood pages, and by your company’s configuration and security.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Helpful system settings (profile options)',
      html: `<ul>
<li><strong>Mask Internal Bank Account Numbers</strong> — show only the first or last four digits on screen, e.g. <code>XXXX4321</code>.</li>
<li><strong>Disable Country Specific Bank Validations</strong> — normally <em>No</em>, so Oracle checks bank codes, account numbers, check digits and IBANs follow each country’s rules.</li>
<li><strong>Use Existing Banks and Branches</strong> — lets employees pick from preloaded banks when entering their own bank accounts.</li>
</ul>
<p>A scheduled process called <strong>Inactivates Banks and Bank Branches</strong> can tidy up banks and branches that no longer have any active accounts.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Bank account fraud is real',
      html: `<p>Criminals often try to change a <em>supplier’s</em> bank account details by email (“We changed banks, please pay this new account”). That is an <strong>external</strong> bank account change, and it must be verified by phone using known contact details before anyone updates it. Restricting who can edit internal and external bank accounts is one of the most important controls in the whole ERP.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Implementation teams usually collect bank details in a spreadsheet signed off by the treasurer, then load them with the rapid implementation template. Double-check routing numbers, IBANs and the owning legal entity — a wrong legal entity means the account cannot be granted to the right business units later.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Bank branch', def: 'A specific office of a bank, identified by a branch number, routing number or BIC.' },
        { term: 'Internal bank account', def: 'A bank account owned by one of our own legal entities, used to pay and receive money.' },
        { term: 'External bank account', def: 'A bank account belonging to someone else, such as a supplier, customer or employee.' },
        { term: 'Account use', def: 'The setting that says which applications (Payables, Receivables, Payroll) may use a bank account.' },
        { term: 'Business unit access', def: 'The list of business units allowed to use a bank account in Payables and Receivables.' },
        { term: 'GL cash account', def: 'The General Ledger account that records all money moving through one bank account.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'In which order are bank objects created in Oracle Fusion?',
          options: ['Account, branch, bank', 'Bank, branch, account', 'Branch, account, bank', 'Any order you like'],
          answer: 1,
          explain: 'You create the bank first, then its branch, then the account that belongs to that branch.',
        },
        {
          q: 'Lemon Grove Farms’ bank account, where Ava sends payments, is…',
          options: ['An internal bank account', 'An external bank account', 'A GL cash account', 'A business unit'],
          answer: 1,
          explain: 'It belongs to a supplier, not to Sunny, so it is an external bank account. Internal accounts are owned by our legal entities.',
        },
        {
          q: 'Ava cannot find the Sunny Operating Account when creating payments in Payables. What is the most likely missing setup?',
          options: [
            'The bank has no logo',
            'Business unit access for Sunny US BU (with Payables use) was not granted',
            'The account has no parse rule set',
            'The General Ledger is closed',
          ],
          answer: 1,
          explain: 'Payables and Receivables find bank accounts by business unit, so the account needs the Payables use and access for Sunny US BU.',
        },
        {
          q: 'Why does Oracle recommend a unique GL cash account for each bank account?',
          options: [
            'Because the bank charges less',
            'It makes reconciling the bank balance to the book balance much easier',
            'Because Payables requires 10 cash accounts',
            'It hides the account number',
          ],
          answer: 1,
          explain: 'When one GL account maps to one bank account, comparing book and bank balances is direct and clean.',
        },
      ],
    },
  ],
  sources: [
    { title: 'How Bank, Branch, and Account Components Work Together', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-bank-branch-and-account-components-work-together.html' },
    { title: 'Considerations When You Create Accounts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/considerations-when-you-create-accounts.html' },
    { title: 'Cash Management Profile Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/cash-management-profile-options.html' },
    { title: 'Overview of External Cash Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-external-cash-transactions.html' },
    { title: 'Implementing Payables Invoice to Pay 26D — Cash Management and Banking Configuration (PDF)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/implementing-payables-invoice-to-pay.pdf' },
  ],
};
