export default {
  slug: 'what-is-cash-management',
  title: 'What Is Cash Management?',
  minutes: 13,
  summary:
    'Cash Management is the part of Oracle Fusion that watches the company’s bank accounts: it brings in bank statements, checks that the bank and our books agree, and shows how much cash we have today and next week. Meet Mia, Sunny Lemonade’s cash manager.',
  objectives: [
    'Explain why a company needs to watch its cash every day, not just at month-end',
    'Describe the three big jobs of Cash Management: bank setup, bank statement reconciliation, and cash visibility',
    'Name the real Oracle Fusion work areas a cash manager uses (Bank Statements and Reconciliation, Cash Balances)',
    'Describe a typical day for Mia, Sunny Lemonade’s cash manager',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Your piggy bank and the bank’s notebook',
      html: `<p>Imagine you keep your lemonade money in a real bank account. You also keep a little notebook at home where you write every coin you put in and every coin you take out.</p>
<p>Once a month the bank sends you a letter: “Here is everything that went in and out of your account.” You put the letter next to your notebook and check line by line. Most lines match. But sometimes there is a surprise: the bank took <strong>$2 for a fee</strong> you forgot about, or a check you wrote to your friend <strong>has not been cashed yet</strong>.</p>
<p>Checking the bank’s letter against your notebook, fixing your notebook for the surprises, and knowing how much money you can really spend tomorrow — <span class="hl">that is cash management.</span></p>`,
    },
    {
      type: 'text',
      heading: 'Why companies watch cash so closely',
      html: `<p><strong>Cash</strong> is the money a company has in its bank accounts right now. A company can be profitable on paper and still get into trouble if it runs out of cash on the wrong day — for example, if suppliers must be paid on Monday but customers only pay on Friday.</p>
<p>That is why most companies have a <strong>treasury</strong> or <strong>cash management</strong> team. Their questions are simple, but very important:</p>
<ul>
<li><strong>How much cash do we have right now</strong>, in every bank account?</li>
<li><strong>Does the bank agree with our books?</strong> If not, why not?</li>
<li><strong>How much cash will we have next week?</strong> Do we need to move money between accounts, borrow, or can we invest the extra?</li>
<li><strong>Are our bank accounts safe?</strong> Who is allowed to use them, and for what?</li>
</ul>
<p>Other teams create cash movements — Ava pays suppliers in Payables, Omar collects from customers in Receivables. The cash team does not usually create those payments or receipts. Instead, it <em>watches</em> the bank side and makes sure everything lines up.</p>`,
    },
    {
      type: 'slides',
      title: 'The three big jobs of Cash Management',
      slides: [
        {
          icon: '🏦',
          title: 'Job 1: Set up banks and bank accounts',
          html: `<p>Before anyone can pay or collect money, the company’s banks, bank branches and bank accounts must be defined once, in one place. Payables, Receivables and Payroll then all share the same bank account records.</p><p>You will learn this in the next lesson.</p>`,
        },
        {
          icon: '📜',
          title: 'Job 2: Bring in the bank’s diary',
          html: `<p>Every day (or every month) the bank sends a <strong>bank statement</strong>: a list of every deposit, withdrawal and fee. Oracle can load these statements automatically in standard file formats.</p>`,
        },
        {
          icon: '🔍',
          title: 'Job 3a: Reconcile',
          html: `<p><strong>Reconciliation</strong> means matching each line on the bank statement to a transaction in our system — a supplier payment, a customer receipt, a journal. Matching proves our books and the bank agree.</p>`,
        },
        {
          icon: '🧾',
          title: 'Job 3b: Record the surprises',
          html: `<p>Some bank lines have nothing to match, like a monthly service fee or interest. Cash Management can create an <strong>external cash transaction</strong> for these and account for them automatically.</p>`,
        },
        {
          icon: '🔭',
          title: 'Job 4: See today and look ahead',
          html: `<p>With bank balances and expected payments and receipts in one place, the cash manager can see today’s <strong>cash position</strong> and a short <strong>forecast</strong>.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: which Cash Management job is it?',
      instructions: `<p>Put each task Mia or Jordan does into the right job of Cash Management.</p>`,
      categories: ['Bank setup', 'Statements and reconciliation', 'Cash visibility'],
      items: [
        { text: 'Create the Sunny Operating Account under Big River Bank', answer: 'Bank setup' },
        { text: 'Grant Sunny US BU access to the bank account', answer: 'Bank setup' },
        { text: 'Load yesterday’s bank statement file', answer: 'Statements and reconciliation' },
        { text: 'Match the $500 bank debit to Ava’s payment to Lemon Grove Farms', answer: 'Statements and reconciliation' },
        { text: 'Record the $15 monthly service fee from the statement', answer: 'Statements and reconciliation' },
        { text: 'Check whether the account stays above its target balance this week', answer: 'Cash visibility' },
        { text: 'Look at the 5 Day Forecast infotile', answer: 'Cash visibility' },
      ],
      explain: `<p>Setup happens once (banks, branches, accounts, access). Statements and reconciliation happen every day: load, match, and record fees or interest. Cash visibility uses balances and expected flows to look ahead.</p>`,
    },
    {
      type: 'flow',
      title: 'Where Cash Management sits in the money journey',
      steps: [
        { icon: '💸', label: 'Payables pays', detail: 'Ava pays Lemon Grove Farms $500 from the Sunny Operating Account.' },
        { icon: '💰', label: 'Receivables collects', detail: 'Omar records $400 received from Happy Cafe into the same account.' },
        { icon: '📜', label: 'Bank reports', detail: 'Big River Bank sends a statement listing both items, plus a $15 fee.' },
        { icon: '🔍', label: 'Cash reconciles', detail: 'Mia’s reconciliation matches the $500 and $400 lines and creates a transaction for the fee.' },
        { icon: '📒', label: 'Ledger agrees', detail: 'Priya sees the cash account in the General Ledger match the bank balance (after known timing items).' },
      ],
      note: `<p>Cash Management is the last check in both the Procure-to-Pay and Order-to-Cash journeys: it confirms the money really moved.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the real names',
      html: `<p>Oracle’s product is called <strong>Oracle Fusion Cash Management</strong>. Its topics are documented inside the <em>Using Payables Invoice to Pay</em> and <em>Implementing Payables Invoice to Pay</em> guides, in chapters called “Cash Management and Banking”.</p>
<ul>
<li><strong>Bank Statements and Reconciliation</strong> work area — load statements, review processing errors, run <kbd>Autoreconciliation</kbd>, do <kbd>Manual Reconciliation</kbd>, and create external transactions. Oracle’s path is <kbd>Navigator</kbd> &gt; <kbd>Cash Management</kbd> &gt; <kbd>Bank Statements and Reconciliation</kbd>.</li>
<li><strong>Cash Balances</strong> work area — see balances and the cash position, and manage bank account transfers (<kbd>Navigator</kbd> &gt; <kbd>Cash Management</kbd> &gt; <kbd>Cash Balances</kbd>).</li>
<li><strong>Setup and Maintenance</strong> — tasks such as <kbd>Manage Banks</kbd>, <kbd>Manage Bank Branches</kbd> and <kbd>Manage Bank Accounts</kbd>.</li>
</ul>
<p>Oracle delivers a job role called <strong>Cash Manager</strong>, which (among other things) gives access to the Bank Statements and Reconciliation work area. Labels and menus can differ slightly by release, by Redwood pages, and by how your company set things up.</p>`,
    },
    {
      type: 'table',
      caption: 'The Cash Management dashboard infotiles (what Mia sees first)',
      headers: ['Infotile', 'What it tells you', 'Kid words'],
      rows: [
        ['<strong>Cash Balance</strong>', 'The overall cash balance across all bank accounts.', 'How much is in all our piggy banks together?'],
        ['<strong>Unreconciled</strong>', 'Month-to-date unreconciled statement lines compared with unreconciled system transactions.', 'How many lines have we not matched yet?'],
        ['<strong>At Risk</strong>', 'Accounts whose balance is below their target balance, and the total shortfall.', 'Which piggy banks are too empty?'],
        ['<strong>5 Day Forecast</strong>', 'A bar graph of expected overall cash balances for the next five days.', 'Will we still have enough on Friday?'],
        ['<strong>Missing Statements</strong>', 'How many bank accounts are missing bank statements.', 'Which bank letters did not arrive?'],
      ],
    },
    {
      type: 'example',
      title: 'A day in the life of Mia, Sunny Lemonade’s cash manager',
      html: `<p>Mia looks after the <strong>Sunny Operating Account</strong> at <strong>Big River Bank</strong>, owned by Sunny Lemonade US Inc. Here is a normal Tuesday.</p>`,
      steps: [
        '<strong>8:00</strong> — Overnight, a scheduled process fetched yesterday’s bank statement from Big River Bank and loaded it into Oracle. Mia opens the Cash Management dashboard. The <em>Missing Statements</em> infotile shows 0. 👍',
        '<strong>8:10</strong> — Autoreconciliation already ran right after the import. Mia opens <em>Bank Statements and Reconciliation</em> and sees 14 of 15 lines reconciled automatically.',
        '<strong>8:20</strong> — The one leftover line is a $15 monthly service fee. A transaction creation rule turns it into an external cash transaction charged to account 7110 Bank Charges, and it is reconciled too.',
        '<strong>8:40</strong> — Mia checks the cash position: the account opened the day with $9,535. Ava has supplier payments of $850 going out this week; Omar expects $1,000 from customers.',
        '<strong>9:00</strong> — Mia tells Sam (the CFO) that cash is healthy for the next few days, but flags a big $6,000 payment to Stand Builders LLC later in the week. (You will see how Mia handles it in the Cash Positioning lesson.)',
      ],
      result: `<p>In about an hour Mia knows: the bank and the books agree, every surprise is recorded, and what is coming next. That confidence is what Cash Management gives a company.</p>`,
    },
    {
      type: 'table',
      caption: 'Who does what around cash at Sunny Lemonade',
      headers: ['Person', 'Role', 'How they touch cash'],
      rows: [
        ['Ava', 'Payables specialist', 'Creates supplier payments that will appear on the bank statement as money going out.'],
        ['Omar', 'Receivables specialist', 'Records customer receipts that will appear as money coming in.'],
        ['Mia', 'Cash manager (treasury)', 'Loads and reconciles bank statements, records bank fees and interest, watches balances and forecasts.'],
        ['Priya', 'General ledger accountant', 'Checks that the GL cash account 1110 matches the reconciled bank balance at month-end.'],
        ['Jordan', 'Implementation consultant', 'Set up banks, branches, accounts, and the reconciliation rules.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: who does what with cash?',
      instructions: `<p>Match each Sunny Lemonade person to how they touch cash.</p>`,
      pairs: [
        { left: 'Ava', right: 'Creates supplier payments (money out)' },
        { left: 'Omar', right: 'Records customer receipts (money in)' },
        { left: 'Mia', right: 'Loads and reconciles bank statements and watches the cash position' },
        { left: 'Priya', right: 'Checks the GL cash account matches the reconciled bank balance' },
        { left: 'Jordan', right: 'Set up banks, accounts and reconciliation rules' },
      ],
      explain: `<p>Payables and Receivables create the cash movements; the cash manager confirms them against the bank; the GL accountant relies on that work at month-end; the consultant configured it all.</p>`,
    },
    {
      type: 'text',
      heading: 'Book balance vs. bank balance',
      html: `<p>Two numbers are almost never exactly the same on any given day:</p>
<ul>
<li>The <strong>book balance</strong> is what our General Ledger cash account says (account <code>1110 Cash – Big River Bank</code>).</li>
<li>The <strong>bank balance</strong> is what the bank statement says.</li>
</ul>
<p>Differences come from <em>timing</em> (a check we wrote has not been cashed yet) and <em>surprises</em> (fees, interest, mistakes). Reconciliation explains every difference. You will practise this in the Bank Reconciliation lesson.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: book balance vs. bank balance',
      instructions: `<p>Our books (GL account 1110) say <strong>$2,000</strong>. The bank statement says <strong>$2,285</strong>. We wrote a <strong>$300</strong> check that the bank has not paid yet, and the bank charged a <strong>$15</strong> fee we have not recorded. Fill in the blanks.</p>`,
      html: `<p>Bank balance $2,285 − outstanding check {{}} = adjusted bank balance {{}}.</p><p>Book balance $2,000 − unrecorded fee {{}} = adjusted book balance {{}}.</p><p>Do they agree now? {{}}</p>`,
      blanks: [
        { answer: 300 },
        { answer: 1985 },
        { answer: 15 },
        { answer: 1985 },
        { answer: ['yes', 'y'], hint: 'yes or no' },
      ],
      explain: `<p>The check is a <em>timing</em> item: the bank will catch up when it is cashed. The fee is a <em>surprise</em>: our books must catch up by recording it. After both, $1,985 = $1,985.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Experienced cash managers reconcile <strong>daily</strong>, not just at month-end. A small unexplained difference found on day 2 is easy to fix. Thirty small differences found on day 31 can take days to untangle and may delay the month-end close.</p>
<p>Oracle also recommends giving each bank account its <strong>own GL cash account</strong>. That makes the “book to bank” comparison much easier.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'New in 2026: AI help for cash managers',
      html: `<p>In update 26D, Oracle describes a <strong>Cash Processing Agent</strong>, opened from <kbd>Navigator</kbd> &gt; <kbd>ERP Agents</kbd> &gt; <kbd>Cash Processing Agent</kbd>. It lets a cash manager ask questions in plain language about unreconciled lines and exceptions, and review cash positions and suggested bank transfers. The basics in this module still apply — the agent works on the same statements, rules and balances.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Cash management', def: 'Watching a company’s bank accounts: loading bank statements, reconciling them to the books, and knowing today’s and tomorrow’s cash.' },
        { term: 'Treasury', def: 'The team (or person) responsible for a company’s cash, bank accounts, borrowing and investing.' },
        { term: 'Bank statement', def: 'The bank’s list of every deposit, withdrawal, fee and balance for one bank account over a period.' },
        { term: 'Bank reconciliation', def: 'Matching bank statement lines to transactions in our system to prove the bank and the books agree.' },
        { term: 'Book balance', def: 'The cash balance according to our own General Ledger.' },
        { term: 'Cash position', def: 'How much cash the company has now, plus what is expected to come in and go out soon.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which question is Cash Management mainly designed to answer?',
          options: [
            'Which supplier should we buy lemons from?',
            'Does the bank agree with our books, and how much cash do we really have?',
            'How should we price a bottle of lemonade?',
            'Which employee should approve an invoice?',
          ],
          answer: 1,
          explain: 'Cash Management watches the bank accounts: it reconciles bank statements to our transactions and shows cash balances and forecasts.',
        },
        {
          q: 'In Oracle Fusion, where does Mia go to load statements and reconcile them?',
          options: ['The Invoices work area', 'The Bank Statements and Reconciliation work area', 'The Journals work area', 'The Suppliers work area'],
          answer: 1,
          explain: 'Bank Statements and Reconciliation (Navigator > Cash Management) is the cash manager’s main reconciliation work area.',
        },
        {
          q: 'The bank statement shows a $15 service fee that nobody recorded. What is this an example of?',
          options: [
            'A supplier invoice',
            'A statement line with no matching system transaction, which can become an external cash transaction',
            'A customer receipt',
            'An approval rule',
          ],
          answer: 1,
          explain: 'Fees and interest usually appear first on the bank statement. Cash Management can create an external cash transaction for them so the books catch up.',
        },
        {
          q: 'Why is the book balance often different from the bank balance on a given day?',
          options: [
            'Because the ERP makes random errors',
            'Because of timing items (like uncashed checks) and surprises (like fees) that have not reached both sides yet',
            'Because banks never report fees',
            'Because the General Ledger does not track cash',
          ],
          answer: 1,
          explain: 'Timing differences and unrecorded items cause the gap. Reconciliation explains each one.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Payables Invoice to Pay 26D — Cash Management and Banking (PDF)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/using-payables-invoice-to-pay.pdf' },
    { title: 'Overview of the Cash Management Dashboard', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-the-cash-management-dashboard.html' },
    { title: 'Automatic Reconciliation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/automatic-reconciliation.html' },
    { title: 'Overview of External Cash Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-external-cash-transactions.html' },
    { title: 'Cash Manager (Job Role)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oafrm/Cash_Manager_job_roles.html' },
    { title: 'Considerations When You Create Accounts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/considerations-when-you-create-accounts.html' },
    { title: 'Financials 26D What’s New — Cash Processing Agent for bank statement reconciliation', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51246.htm' },
  ],
};
