export default {
  slug: 'bank-reconciliation',
  title: 'Bank Reconciliation: Do Our Books Match the Bank?',
  minutes: 18,
  summary:
    'Bank reconciliation proves that every line on the bank statement matches something in our books — and records the things that do not, like bank fees. Learn automatic reconciliation with matching rules, rule sets and tolerances, manual reconciliation, exceptions, external cash transactions, and the reports used at month-end.',
  objectives: [
    'Explain what “reconciled” means for a bank statement line and a system transaction',
    'Describe matching rules, matching types, rule sets and tolerance rules',
    'Run through autoreconciliation, exceptions and manual reconciliation for Sunny’s June statement',
    'Record a bank fee with a transaction creation rule and show its journal entry',
    'Use the Cash to General Ledger Reconciliation and Cash in Transit reports to explain book-to-bank differences',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Matching socks after laundry day',
      html: `<p>After laundry day you have a big pile of socks. You pick one sock and look for its partner: same color, same size, same pattern. Most socks find their partner quickly. A few are tricky — two socks look almost the same, or one sock is a bit faded. And sometimes there is a sock with <strong>no partner at all</strong>.</p>
<p>Bank reconciliation is sock matching. One pile is the <strong>bank statement lines</strong>. The other pile is <strong>our transactions</strong> (payments, receipts, journals). You match pairs using clues — amount, date, reference number. The leftovers either need a closer look, or they are real new things (like a bank fee) that you must add to your books.</p>`,
    },
    {
      type: 'text',
      heading: 'What “reconciled” really means',
      html: `<p>In Oracle Fusion, reconciliation links one or more <strong>bank statement lines</strong> to one or more <strong>system transactions</strong>. System transactions can come from several <em>sources</em>: <strong>Payables</strong> payments, <strong>Receivables</strong> receipts, <strong>Payroll</strong> payments, General Ledger <strong>journals</strong>, and Cash Management <strong>external transactions</strong>.</p>
<p>When a transaction is reconciled, Oracle also marks it as <strong>cleared</strong> — the bank has confirmed the money moved. If a payment was not cleared yet, reconciliation clears it first and then reconciles it. A reconciled statement line is the proof that “the bank and our books agree about this item”.</p>`,
    },
    {
      type: 'slides',
      title: 'The building blocks of automatic reconciliation',
      slides: [
        {
          icon: '🧩',
          title: 'Matching rules',
          html: `<p>A <strong>reconciliation matching rule</strong> says <em>how</em> to pair lines and transactions: which transaction source (Payables, Receivables, Payroll, Journals, External), which matching type, and which fields must agree — for example amount, date, and reconciliation reference.</p>`,
        },
        {
          icon: '🔢',
          title: 'Matching types',
          html: `<ul><li><strong>One to One</strong> — one line, one transaction.</li><li><strong>One to Many</strong> — one line, many transactions (e.g. one bank debit for a whole payment file).</li><li><strong>Many to One</strong> — many lines, one transaction.</li><li><strong>Many to Many</strong> — groups on both sides.</li><li><strong>Zero Amount</strong> — zero-amount transactions that the bank never reports.</li></ul>`,
        },
        {
          icon: '📏',
          title: 'Tolerance rules',
          html: `<p>A <strong>tolerance rule</strong> allows small differences in <strong>date</strong> (a check cleared 3 days later) or <strong>amount</strong> (a small fee or rounding). With no tolerance, an exact match is required. <strong>Amount tolerances only work for one-to-one matches</strong>.</p>`,
        },
        {
          icon: '📚',
          title: 'Rule sets',
          html: `<p>A <strong>rule set</strong> is an ordered list of matching rules (each optionally with a tolerance rule), assigned to a bank account. Oracle strongly recommends putting <strong>one-to-one rules first</strong>, and rules that use a reliable bank reference before vague ones.</p>`,
        },
        {
          icon: '🏗️',
          title: 'Transaction creation rules',
          html: `<p>For bank lines that will never have a partner in our books — fees, interest — <strong>bank statement transaction creation rules</strong> create and account for an external cash transaction automatically.</p>`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: where reconciliation happens',
      html: `<p>Everything happens in the <strong>Bank Statements and Reconciliation</strong> work area (<kbd>Navigator</kbd> &gt; <kbd>Cash Management</kbd> &gt; <kbd>Bank Statements and Reconciliation</kbd>):</p>
<ul>
<li><kbd>Autoreconciliation</kbd> — the process that applies the rule set assigned to the bank account. It can also be launched automatically right after a statement import. Its option <em>Generate Cash Transactions</em> runs the bank statement transaction creation step afterwards.</li>
<li><kbd>Manual Reconciliation</kbd> — select statement lines and system transactions yourself and reconcile them.</li>
<li>Review exceptions, and use <kbd>Mark Reviewed</kbd> to protect a finished statement from being unreconciled by accident.</li>
</ul>
<p>Rules are set up in Setup and Maintenance with tasks for bank statement reconciliation matching rules, tolerance rules, rule sets and transaction creation rules. Labels may differ slightly by release and by Redwood pages.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny’s rule set “SUNNY DAILY” (assigned to the Sunny Operating Account)',
      headers: ['Seq', 'Matching rule', 'Source', 'Type', 'Must match', 'Tolerance'],
      rows: [
        ['10', 'AP payments by reference', 'Payables', 'One to One', 'Amount + reconciliation reference', 'Date ±3 days'],
        ['20', 'AP checks by check number', 'Payables', 'One to One', 'Amount + reconciliation reference (the check number)', 'Date ±10 days'],
        ['30', 'AR receipts by reference', 'Receivables', 'One to One', 'Amount + reconciliation reference', 'Date ±3 days, amount ±$5'],
        ['40', 'AR deposit batches', 'Receivables', 'One to Many', 'Total amount, grouped by deposit date', 'Date ±2 days'],
      ],
    },
    {
      type: 'example',
      title: 'Reconciling Sunny’s June statement',
      html: `<p>Remember the June statement from the last lesson: opening $10,000, closing $9,535. Here are Sunny’s June <strong>system transactions</strong> for the account:</p>
<ul>
<li>Receivables receipt from Happy Cafe, $400, ref RCPT-2201 (Jun 3)</li>
<li>Payables EFT to Lemon Grove Farms, $500, ref PAY-5001 (Jun 5)</li>
<li>Payables check 1001 to Sweet Sugar Co., $200 (issued Jun 6)</li>
<li>Payables EFT to Bright Power Utility, $150, ref PAY-5002 (Jun 15)</li>
<li>Payables check 1002 to Cup &amp; Straw Supply, $300 (issued Jun 29)</li>
</ul>`,
      steps: [
        'Autoreconciliation runs. Rule 10 matches the $500 and $150 EFT lines to the two Payables payments by reference and amount.',
        'Rule 20 matches the Jun 10 “check paid 1001” line to check 1001 — 4 days after it was issued, within the ±10 day date tolerance.',
        'Rule 30 matches the $400 ACH credit to Happy Cafe’s receipt RCPT-2201.',
        'One line is left: the $15 service fee (code 698). Nothing in our books matches it — it is not an error, it is new information.',
        'Because <em>Generate Cash Transactions</em> was selected, the transaction creation rule “BANK FEES” (for code 698) creates an external cash transaction of $15, charged to 7110 Bank Charges, and reconciles it to the fee line.',
        'One system transaction is left on <em>our</em> side: check 1002 for $300. The bank has not paid it yet. It stays unreconciled — this is an <strong>outstanding check</strong>, a normal timing difference.',
      ],
      result: `<p>All six statement lines are reconciled. Mia clicks <kbd>Mark Reviewed</kbd> on the June statement. Check 1002 will be reconciled when it appears on July’s statement.</p>`,
    },
    {
      type: 'journal',
      title: 'Journal created for the $15 bank fee (external cash transaction)',
      lines: [
        { account: '101-100-7110-000-000 Bank Charges', debit: 15, credit: 0 },
        { account: '101-100-1110-000-000 Cash – Big River Bank', debit: 0, credit: 15 },
      ],
      note: `<p>The external transaction is accounted through Subledger Accounting and transferred to the General Ledger, so Priya’s cash account now includes the fee. The offset account comes from the transaction creation rule.</p>`,
    },
    {
      type: 'table',
      caption: 'Book-to-bank proof at June 30 (what the Cash to General Ledger Reconciliation Report helps you show)',
      headers: ['Item', 'Amount'],
      rows: [
        ['Bank statement closing balance', '$9,535.00'],
        ['Less: outstanding check 1002 (issued, not yet paid by the bank)', '− $300.00'],
        ['<strong>Adjusted bank balance</strong>', '<strong>$9,235.00</strong>'],
        ['GL cash account 1110 balance (10,000 + 400 − 500 − 200 − 150 − 300 − 15)', '<strong>$9,235.00</strong>'],
        ['Difference', '$0.00 ✔'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: match the statement lines to the books',
      instructions: `<p>You are the autoreconciliation process. Match each June bank statement line to its partner in Sunny’s books (or to what should happen to it).</p>`,
      pairs: [
        { left: 'Jun 3 — ACH credit $400, ref RCPT-2201', right: 'Receivables receipt from Happy Cafe, $400' },
        { left: 'Jun 5 — EFT debit $500, ref PAY-5001', right: 'Payables EFT to Lemon Grove Farms, $500' },
        { left: 'Jun 10 — Check paid no. 1001, $200', right: 'Payables check 1001 to Sweet Sugar Co., $200' },
        { left: 'Jun 15 — EFT debit $150, ref PAY-5002', right: 'Payables EFT to Bright Power Utility, $150' },
        { left: 'Jun 30 — Service fee $15 (code 698)', right: 'No partner: create an external cash transaction (7110 Bank Charges)' },
      ],
      explain: `<p>Four lines have a one-to-one partner, found by amount plus a reference (receipt number, payment reference or check number). The fee has no partner in the books, so a transaction creation rule creates one. Notice that check 1002 ($300) is not on the list at all — the bank has not paid it yet.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Practice: record the bank’s interest',
      instructions: `<p>July’s statement shows Big River Bank paid Sunny <strong>$12 of interest</strong> (transaction type INT). A transaction creation rule creates an external cash transaction for it. Build the journal. (Hint: Sunny’s chart has no separate interest income account, so Jordan’s rule uses 7110 Bank Charges as a net “bank costs” account — a credit there reduces bank costs.)</p>`,
      accounts: ['1110 Cash – Big River Bank', '7110 Bank Charges', '1210 Accounts Receivable', '2110 Accounts Payable – Trade', '4110 Lemonade Sales Revenue'],
      answer: [
        { account: '1110 Cash – Big River Bank', debit: 12, credit: 0 },
        { account: '7110 Bank Charges', debit: 0, credit: 12 },
      ],
      explain: `<p>Money came <em>into</em> the bank, so Cash is debited. The other side is the offset account from the transaction creation rule. It is not Accounts Receivable (no customer invoice) and not sales revenue (we did not sell lemonade). Many real companies use a dedicated interest income account here.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: prove the book-to-bank difference',
      instructions: `<p>It is July 31. The July statement closes at <strong>$8,900</strong>. Two Sunny checks are still outstanding: <strong>$250</strong> and <strong>$120</strong>. The bank also recorded a <strong>$30</strong> deposit from City Park Kiosk that Omar has not entered yet.</p>`,
      html: `<p>Bank balance $8,900 − outstanding checks \${{}} = adjusted bank balance \${{}}.</p><p>If the GL cash account shows $8,500, then GL $8,500 + unrecorded deposit \${{}} = \${{}}.</p><p>Difference after adjustments: \${{}}</p>`,
      blanks: [
        { answer: 370 },
        { answer: 8530 },
        { answer: 30 },
        { answer: 8530 },
        { answer: 0 },
      ],
      explain: `<p>Outstanding checks ($250 + $120 = $370) are timing items on the bank side: $8,900 − $370 = $8,530. The deposit is something the books do not have yet: $8,500 + $30 = $8,530. Zero difference means every gap is explained — Omar still needs to record the $30 receipt.</p>`,
    },
    {
      type: 'text',
      heading: 'When the matching is not clean: tolerances and exceptions',
      html: `<p><strong>Amount tolerance example.</strong> City Park Kiosk pays a $250 invoice by wire. Omar records a $250 receipt. But the bank deducts a $5 incoming-wire fee, so the statement shows $245. Rule 30 allows ±$5 for one-to-one matches, so autoreconciliation reconciles them and creates an external cash transaction for the $5 difference, booked to the <strong>bank charges</strong> or <strong>foreign exchange gain/loss</strong> account (or the account’s <strong>reconciliation differences</strong> account).</p>
<p>If you use both an amount and a percentage tolerance, Oracle applies the <em>stricter</em> one. Oracle’s own example: ±$5 and ±1% on a $100 line gives a $1 limit, so a match must be between $99 and $101.</p>
<p><strong>Exceptions.</strong> When autoreconciliation nearly finds a match but cannot finish, it records a reconciliation exception, checked in this order for one-to-one rules:</p>
<ul>
<li><strong>Ambiguous</strong> — more than one transaction could match the line (two $200 checks the same week).</li>
<li><strong>Date</strong> — everything matches except the date is outside the tolerance.</li>
<li><strong>Amount</strong> — everything matches except the amount is outside the tolerance.</li>
</ul>
<p>Mia reviews exceptions in the context of the statement line and picks the right transaction by hand.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: what will autoreconciliation do?',
      instructions: `<p>A one-to-one rule matches on amount and reference, with tolerances of <strong>date ±3 days</strong> and <strong>amount ±$5</strong>. Decide the result for each case.</p>`,
      categories: ['Reconciled', 'Date exception', 'Amount exception', 'Ambiguous exception'],
      items: [
        { text: 'Line $245 on Jun 20; receipt $250 dated Jun 19 with the same reference', answer: 'Reconciled' },
        { text: 'Line $400 on Jun 20; receipt $400 dated Jun 10 with the same reference', answer: 'Date exception' },
        { text: 'Line $380 on Jun 20; receipt $400 dated Jun 20 with the same reference', answer: 'Amount exception' },
        { text: 'Line $200 on Jun 20; two different $200 receipts on Jun 20 that both fit', answer: 'Ambiguous exception' },
      ],
      explain: `<p>A $5 difference is inside the amount tolerance, so it reconciles (and Oracle creates an external transaction for the $5). Ten days is outside the ±3 day date tolerance; $20 is outside ±$5; and two equally good candidates make the match ambiguous. Mia resolves exceptions by picking the right transaction by hand.</p>`,
    },
    {
      type: 'text',
      heading: 'Manual reconciliation and bank mistakes',
      html: `<p><strong>Manual reconciliation</strong> supports all four matching scenarios, even across different statements of the same bank account. Select lines on the left, transactions on the right, check the totals agree, and reconcile. If the date is outside the tolerance in manual mode, Oracle warns you but lets you continue.</p>
<p>Banks make mistakes too. Oracle describes two ways banks correct them. Say Sunny wrote a $100 check but the bank recorded $10:</p>
<ul>
<li><strong>Reversal method</strong>: the bank reverses the $10 and posts a new $100 line. Reconcile all three lines to the one check.</li>
<li><strong>Adjustment method</strong>: the bank simply adds a $90 line. Reconcile the $10 and $90 lines to the check.</li>
</ul>
<p>For very large volumes, Oracle also offers a spreadsheet-based mass reconciliation (export unreconciled items, group them, and import the groups).</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: run autoreconciliation for one account',
      items: [
        'Go to <kbd>Navigator</kbd> &gt; <kbd>Cash Management</kbd> &gt; <kbd>Bank Statements and Reconciliation</kbd>.',
        'From the tasks, submit <kbd>Autoreconciliation</kbd>. Enter the <em>Bank Account</em> and either a statement or a statement end date range.',
        'Optionally select <em>Generate Cash Transactions</em> so fees and interest are created from your transaction creation rules after matching.',
        'When the process finishes, review reconciled and unreconciled lines and any exceptions for the statement.',
        'Use <kbd>Manual Reconciliation</kbd> for anything left over, then <kbd>Mark Reviewed</kbd> when the statement is complete.',
      ],
      note: `<p>Task names and page layouts can differ slightly by release, by Redwood pages, and by your security roles.</p>`,
    },
    {
      type: 'table',
      caption: 'Reports Mia uses at month-end',
      headers: ['Report', 'What it shows', 'Why it helps'],
      rows: [
        ['<strong>Cash to General Ledger Reconciliation Report</strong>', 'Compares the GL cash account balance with the bank balance, and lists unreconciled statement lines and unreconciled GL cash entries for a range of periods.', 'Explains every book-to-bank difference.'],
        ['<strong>Cash in Transit Report</strong>', 'Transactions remitted to the bank but not yet cleared, as of a date (voided items excluded).', 'Lists outstanding checks like check 1002.'],
        ['<strong>Bank Statement Report</strong>', 'Balances and transaction details of statements for one account and date range, with reconciliation status.', 'A tidy record of what the bank reported.'],
      ],
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips from cash managers',
      html: `<ul>
<li>Aim for a high <strong>auto-match rate</strong>. If many lines need manual work every day, improve the rules: add parse rules for references, add a one-to-many rule for payment files, or adjust tolerances.</li>
<li>Keep tolerances <strong>small</strong>. A big amount tolerance can hide real errors or fraud.</li>
<li>Investigate any outstanding check older than a few months — it may be lost, or need to be voided and reissued.</li>
<li>Finish reconciliation <strong>before</strong> the General Ledger close so Priya’s cash balance is trustworthy.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Reconciliation matching rule', def: 'A rule that tells Oracle how to pair bank statement lines with system transactions, such as by amount and reference.' },
        { term: 'Rule set', def: 'An ordered group of matching rules and tolerance rules assigned to a bank account for automatic reconciliation.' },
        { term: 'Tolerance rule', def: 'A rule that allows small differences in date or amount when matching.' },
        { term: 'Reconciliation exception', def: 'A nearly-matched item that automatic reconciliation could not finish, such as an ambiguous, date or amount problem.' },
        { term: 'External cash transaction', def: 'A cash transaction recorded in Cash Management for activity not already in our books, like a bank fee or interest.' },
        { term: 'Transaction creation rule', def: 'A rule that turns an unreconciled bank statement line, such as a fee, into an accounted external transaction.' },
        { term: 'Outstanding check', def: 'A check we issued that the bank has not yet paid, causing a timing difference.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Why does Oracle recommend sequencing one-to-one matching rules first in a rule set?',
          options: [
            'They are cheaper to run',
            'They are the most precise, so they give the best match rate before broader rules try',
            'Because many-to-many rules are not allowed',
            'Because the bank requires it',
          ],
          answer: 1,
          explain: 'Precise rules (especially ones using a bank reference) should run first. Broader rules come later to pick up what is left.',
        },
        {
          q: 'A rule set uses an amount tolerance of ±$5 on a ONE TO MANY rule. What happens to that amount tolerance?',
          options: ['It is doubled', 'It is ignored, because amount tolerances only apply to one-to-one matches', 'It becomes a date tolerance', 'It is applied to each transaction'],
          answer: 1,
          explain: 'Oracle only allows amount tolerances in one-to-one matching. For other types the totals must be equal.',
        },
        {
          q: 'After autoreconciliation, the $15 service fee line is still unreconciled. What is the best next step?',
          options: [
            'Ask Ava to create a supplier invoice for Big River Bank',
            'Let a transaction creation rule (or Mia manually) create an external cash transaction to 7110 Bank Charges and reconcile it',
            'Delete the statement line',
            'Ignore it forever',
          ],
          answer: 1,
          explain: 'Fees appear first on the statement. An external cash transaction records Dr 7110 Bank Charges / Cr 1110 Cash and is reconciled to the line.',
        },
        {
          q: 'On June 30 the bank shows $9,535 but the GL cash account shows $9,235. Check 1002 for $300 has not been paid by the bank. What is the situation?',
          options: [
            'The books are wrong by $300 and must be fixed with a journal',
            'It is a normal timing difference: the outstanding check explains the gap',
            'The bank stole $300',
            'The statement must be re-imported',
          ],
          answer: 1,
          explain: 'Bank $9,535 − outstanding check $300 = $9,235 = book balance. No correction needed; the check will clear later.',
        },
        {
          q: 'Which report lists items remitted to the bank but not yet cleared?',
          options: ['Cash in Transit Report', 'Asset Additions Report', 'Bank Statement Analysis Report', 'Trial Balance'],
          answer: 0,
          explain: 'The Cash in Transit Report lists remitted but uncleared transactions for a bank account as of a date.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Automatic Reconciliation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/automatic-reconciliation.html' },
    { title: 'Reconciliation Matching Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/reconciliation-matching-rules.html' },
    { title: 'Overview of Tolerance Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/overview-of-tolerance-rules.html' },
    { title: 'Overview of Reconciliation Rules Sets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/overview-of-reconciliation-rules-sets.html' },
    { title: 'Overview of Bank Statement Transaction Creation Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/overview-of-bank-statement-transaction-creation-rules.html' },
    { title: 'Overview of Reconciliation Exceptions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-reconciliation-exceptions.html' },
    { title: 'How You Manually Reconcile a Bank Statement', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-you-manually-reconcile-a-bank-statement.html' },
    { title: 'Overview of External Cash Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-external-cash-transactions.html' },
    { title: 'Cash to General Ledger Reconciliation Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/cash-to-general-ledger-reconciliation-report.html' },
    { title: 'Cash in Transit Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/cash-in-transit-report.html' },
  ],
};
