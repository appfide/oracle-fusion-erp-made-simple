export default {
  slug: 'expense-approval-and-payment',
  title: 'Approval, Audit and Getting Paid Back',
  minutes: 17,
  summary:
    'After an expense report is submitted, a manager approves it, an expense auditor may check it, and a reimbursement process turns it into a payment request in Payables that is paid in a payment run. Follow Noah’s $65 report all the way to the bank and into the ledger.',
  objectives: [
    'Describe how expense report approval works and the actions approvers can take',
    'Explain why and how expense reports are audited, including audit selection rules and auditor actions',
    'Explain receipt management, missing receipts and payment holds',
    'Describe how the Process Expense Reimbursement process creates payment requests in Payables',
    'Record the journal entries for an approved and paid expense report',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Three checks before the money box opens',
      html: `<p>Back to the class picnic. You hand your juice receipt to your teacher. Your teacher says “Yes, I asked you to buy juice” — that’s the <strong>approval</strong>.</p>
<p>Then the school office looks at the receipt more carefully: “Is it a real receipt? Is it the same receipt someone else already handed in? Did you buy juice, or juice <em>and</em> sweets?” — that’s the <strong>audit</strong>.</p>
<p>Finally the office opens the money box and gives you $10, and writes it in the class money book — that’s <strong>payment and accounting</strong>. Oracle Fusion Expenses does exactly these three checks, just for thousands of reports.</p>`,
    },
    {
      type: 'flow',
      title: 'From Submit to paid',
      steps: [
        { icon: '📤', label: 'Submitted', detail: 'Noah submits the report. Approval rules build the list of approvers.' },
        { icon: '👩‍💼', label: 'Manager approval', detail: 'Sam approves, rejects or asks for more information.' },
        { icon: '🔍', label: 'Audit', detail: 'If audit rules select the report, an expense auditor reviews it. Otherwise it is approved automatically.' },
        { icon: '⏳', label: 'Pending Payment', detail: 'Approved and audited reports wait for reimbursement processing.' },
        { icon: '⚙️', label: 'Process Expense Reimbursement', detail: 'Creates payment requests in Payables through the open invoice interface.' },
        { icon: '✅', label: 'Validate', detail: 'Payment requests are validated in Payables like other invoices.' },
        { icon: '🏦', label: 'Pay', detail: 'A payment process request in Payments pays the employee.' },
      ],
    },
    {
      type: 'text',
      heading: 'Step 1: manager approval',
      html: `<p>When an employee submits a report, Expenses starts an approval workflow. <strong>Approval rules</strong>, set up by the implementer, decide who must approve. Oracle supports approval based on the <strong>supervisor hierarchy</strong>, <strong>position hierarchy</strong>, <strong>cost center managers</strong> or <strong>project managers</strong>, and also approval by the approver linked to the <strong>expense template</strong> used. Rules can add more approvers for big amounts, for example “reports over $5,000 also go to the CFO”.</p>
<p>The approver receives a notification in the worklist or by email. From the worklist an approver can:</p>
<ul>
<li><strong>Approve</strong> the report.</li>
<li><strong>Reject</strong> it — it goes back to the employee, who can fix and resubmit.</li>
<li><strong>Request more information</strong> — usually about a particular line.</li>
<li><strong>Delegate</strong> temporarily, or <strong>transfer/reassign</strong> the approval to someone else.</li>
</ul>
<p>Approving by email is quicker but more limited: only approve or reject. Managers can see policy warnings on the lines (approvers always see them), receipt images, and — if enabled — previous submission data to help decide.</p>`,
    },
    {
      type: 'text',
      heading: 'Step 2: audit — who checks the checkers?',
      html: `<p>A manager knows <em>why</em> Noah travelled, but may not check every receipt. That’s the job of the <strong>expense auditor</strong>, who works in the <strong>Auditing</strong> work area (Oracle documents the path <kbd>Navigator</kbd> &gt; <kbd>Expenses</kbd> &gt; <kbd>Auditing</kbd>).</p>
<p>Not every report needs an auditor. <strong>Audit selection rules</strong> decide which reports are selected; if a business unit has no audit selection rules, Expenses approves reports automatically after the managers. Oracle’s built-in rules include:</p>
<ul>
<li>Audit a <strong>random percentage</strong> of all reports (enter 100 to audit everything).</li>
<li>Audit reports <strong>greater than an amount</strong>.</li>
<li>Audit reports with <strong>required receipts</strong> or with <strong>missing imaged receipts</strong>.</li>
<li>Audit reports with <strong>policy violations</strong>.</li>
<li>Audit reports of people on the <strong>audit list</strong>.</li>
<li>Audit reports with expenses <strong>older than a number of days</strong>.</li>
<li>Audit reports containing <strong>specific keywords</strong> (for example in the purpose, description or merchant).</li>
</ul>
<p>There are also preconfigured <strong>anomaly rules</strong>, such as auditing the top spenders or top policy violators of the last few months, reports with suspected duplicates, or the same attendees claimed on the same day in different reports. A <strong>risk indicator</strong> helps auditors focus on the riskiest reports first.</p>
<p>Audit can happen <em>after</em> manager approval, or — if the Expenses system options say so — <strong>in parallel</strong> with manager approval to save time.</p>`,
    },
    {
      type: 'table',
      caption: 'What an expense auditor can do (Audit Expense Report page)',
      headers: ['Action', 'What happens'],
      rows: [
        ['<kbd>Complete Audit</kbd>', 'No action needed from the employee. If manager approvals are done, the report becomes <strong>Pending Payment</strong>. Any short payments or line adjustments change the amount reimbursed.'],
        ['Reject Expense Report', 'The report returns to the employee as <strong>Rejected</strong> with the reason. It must be resubmitted and reapproved. Earlier auditor adjustments are discarded.'],
        ['Request More Information', 'The employee gets a notification and may reply. The report stays pending; the auditor can still complete the audit.'],
        ['Waive Receipts / Waive Receipts and Complete Audit', 'Marks missing receipts as <strong>Waived</strong> (for example, a lost taxi receipt for a small amount), optionally completing the audit in one step.'],
        ['Warn User and Complete Audit', 'Completes the audit but sends the employee a reminder about the policy.'],
        ['Release Hold', 'Releases a payment hold caused by missing or overdue receipts.'],
        ['Confirm Manager Approval', 'Asks the manager to confirm their earlier approval; the report goes back to Pending Manager Approval.'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Auditors can adjust, not just accept or reject',
      html: `<p>If a line doesn’t follow policy, the auditor can change the <strong>expense type</strong>, the <strong>itemization</strong>, the <strong>reimbursable amount</strong> (a <em>short pay</em>) or the <strong>accounting</strong>. For example, if Noah claimed a $35 dinner against a $25 limit, the auditor might short-pay $10. Auditors can’t change the type of mileage or per diem items, and can’t change project information.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: choose the auditor’s action',
      instructions: `<p>Ava is auditing this week’s reports. Pick the best audit action for each situation.</p>`,
      categories: ['Complete Audit', 'Waive Receipts and Complete Audit', 'Reject Expense Report', 'Request More Information', 'Warn User and Complete Audit'],
      items: [
        { text: 'Every line matches its receipt and follows policy.', answer: 'Complete Audit' },
        { text: 'A $6 parking receipt was lost, and Sunny’s policy allows waiving very small amounts.', answer: 'Waive Receipts and Complete Audit' },
        { text: 'A hotel night during a personal holiday was claimed as business travel.', answer: 'Reject Expense Report' },
        { text: 'A team lunch has no attendee names; Ava wants them for the file but the lunch itself is fine.', answer: 'Request More Information' },
        { text: 'A first-time, small policy breach that Ava decides to pay, with a reminder about the rules.', answer: 'Warn User and Complete Audit' },
      ],
      explain: `<p>Complete Audit is the normal happy path. Waiving receipts is for acceptable missing receipts. Rejecting sends the whole report back (and discards auditor adjustments) — right for something that should not be paid. Requesting more information keeps the report moving while the employee replies. Warn User and Complete Audit pays the report but records a warning to the employee.</p>`,
    },
    {
      type: 'text',
      heading: 'Receipts, missing receipts and payment holds',
      html: `<p>Companies may require <strong>original</strong> paper receipts, <strong>imaged</strong> (scanned or photographed) receipts, or both. Receipt rules are part of a <strong>receipt and notification rule</strong> assigned to a business unit. A scheduled process, <strong>Process Overdue and Missing Receipts</strong>, sends reminders to employees whose receipts haven’t arrived — or, if the company allows it, asks them to complete a <strong>missing receipt declaration</strong> instead.</p>
<p>The same rule can include <strong>payment hold rules</strong>: hold reimbursement while required receipts aren’t received, or even hold all future reports of someone whose receipts are overdue on an earlier report. Holds are released automatically when receipts are received or waived, or manually by an auditor with <kbd>Release Hold</kbd>. Where paper receipts are used, auditors can <strong>check in</strong> receipt packages when they arrive.</p>`,
    },
    {
      type: 'text',
      heading: 'Step 3: from approved report to Payables payment request',
      html: `<p>Expenses does not pay anyone by itself. Approved reports are handed to Payables by the <strong>Process Expense Reimbursement</strong> process (Oracle’s guides spell it slightly differently in places, such as “Process Expense Reimbursements”). It is usually scheduled to run several times a day. It:</p>
<ol>
<li>Selects all reports that are ready for reimbursement.</li>
<li>Writes a header and lines for each report into the <strong>Payables open invoice interface</strong>: amount, accounting, tax classification, project, payment method, payee and the employee liability (or card issuer) account. Only <em>Business</em> lines are reimbursed to the employee.</li>
<li>Creates a <strong>payee</strong> in Payments for the employee if one doesn’t exist yet.</li>
<li>Calls <strong>Import Payables Invoices</strong>, which creates the <strong>payment requests</strong> in Payables. Oracle Fusion Tax calculates tax on lines that carry tax classification codes.</li>
<li>If Payables rejects a record (for example, the accounting date is in a closed period), the report gets the status <strong>Payables Rejected</strong> and is picked up again the next time the process runs.</li>
</ol>
<p>New payment requests start as <strong>Never Validated</strong> until invoice validation runs. After validation, Ava pays them in a normal <strong>payment process request (PPR)</strong> along with supplier invoices — you’ll learn PPRs in the Paying Suppliers lesson. If the employee has a cash advance, the process applies it first, so only the difference is paid.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Practice: from approval to cash',
      instructions: `<p>Put the hand-off from Expenses to Payables and Payments in the right order.</p>`,
      items: [
        'Manager approval and audit are complete; the report is Pending Payment',
        'Process Expense Reimbursement selects the report',
        'Lines are written to the Payables open invoice interface',
        'Import Payables Invoices creates the payment request (Never Validated)',
        'Invoice validation runs and the payment request is accounted',
        'A payment process request pays the employee',
      ],
      explain: `<p>Expenses prepares the data, but Payables creates and validates the payment request, and Payments pays it in a normal payment run. If Payables rejects the interface record (for example a closed period), the report becomes Payables Rejected and the next reimbursement run tries again.</p>`,
    },
    {
      type: 'example',
      title: 'Noah’s $65 report reaches the bank',
      html: `<p>Remember Noah’s taxi ($40) and lunch ($25) from the first lesson of this module? Sunny’s audit rules say: audit 10% of reports at random, every report over $500, and every report with a policy violation.</p>`,
      steps: [
        'Monday 9:00 – Noah submits. The approval rules route it to Noah’s manager, Sam.',
        'Monday 11:00 – Sam approves from the email notification.',
        'Noah’s report is under $500 with no violations, but the random 10% rule picks it. It lands in Ava’s audit queue.',
        'Monday 15:00 – Ava opens the report in the Auditing work area, compares the receipt images with the lines and clicks <kbd>Complete Audit</kbd>. Status: <strong>Pending Payment</strong>.',
        'Monday 18:00 – the scheduled <strong>Process Expense Reimbursement</strong> run creates a $65 payment request in Payables, payable to Noah.',
        'Tuesday – invoice validation runs; the payment request is validated and accounted.',
        'Wednesday – Ava’s weekly payment process request includes Noah’s payment request and pays $65 by electronic transfer to Noah’s bank account.',
      ],
      result: `<p>Two days from submission to cash, with a manager approval, a random audit and full accounting — and no paper forms.</p>`,
    },
    {
      type: 'journal',
      title: 'Payment request accounted (Tuesday)',
      lines: [
        { account: '6130 Travel and Meals (101-200-6130-000-000)', debit: 65, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 0, credit: 65 },
      ],
      note: `<p>The expense account comes from the expense types (Taxi and Meals map to <code>6130</code>), with the cost center from Noah’s report. The credit is the <strong>employee liability account</strong>; Sunny uses <code>2110</code> for simplicity, but many companies use a separate employee payables account so they can track what is owed to staff.</p>`,
    },
    {
      type: 'journal',
      title: 'Payment made (Wednesday)',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 65, credit: 0 },
        { account: '1110 Cash – Big River Bank (101-100-1110-000-000)', debit: 0, credit: 65 },
      ],
      note: `<p>Payables clears the liability and cash goes down. Mia will later see the $65 on the bank statement and reconcile it in Cash Management.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Practice: account a short-paid report',
      instructions: `<p>Leo submits a <strong>$130</strong> expense report for meals with a supplier. The auditor short-pays <strong>$10</strong> because one dinner went over the meals limit, then completes the audit. Record the accounting when the payment request is created (Leo has not been paid yet).</p>`,
      accounts: [
        '6130 Travel and Meals',
        '2110 Accounts Payable – Trade',
        '1110 Cash – Big River Bank',
        '5110 Lemons Cost',
        '7110 Bank Charges',
      ],
      answer: [
        { account: '6130 Travel and Meals', debit: 120, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 120 },
      ],
      explain: `<p>The short pay reduces the reimbursable amount, so the payment request is for $130 − $10 = $120. Sunny records $120 of travel and meals cost and owes Leo $120. The extra $10 is never a company cost — it stays Leo’s own spending. Cash moves only when the payment run pays Leo.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: check where a report is',
      items: [
        'As the employee, open <kbd>Me</kbd> &gt; <kbd>Expenses</kbd>. Each report card shows its status, purpose and amount.',
        'Open a submitted report and look for the approval history to see who has approved and who is next.',
        'As an auditor, open <kbd>Navigator</kbd> &gt; <kbd>Expenses</kbd> &gt; <kbd>Auditing</kbd> to see reports assigned to you for audit.',
        'To see the payment request, a Payables user can search invoices in the <kbd>Invoices</kbd> work area for the employee as the supplier/payee.',
      ],
      note: `<p>These paths come from Oracle’s Using Expenses guide; page names, cards and menus can differ by release, by Redwood adoption and by the roles assigned to you.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: the questions employees ask most',
      html: `<ul>
<li><strong>“Where is my money?”</strong> Check the report status. Pending Manager Approval means chase the manager; Pending Payment means it’s waiting for the next reimbursement run and payment run.</li>
<li><strong>“Why was I short-paid?”</strong> The auditor adjusted a line against policy; the notification gives the reason.</li>
<li><strong>“Why is my report on hold?”</strong> Usually missing or overdue receipts. Submit or declare them and the hold is released.</li>
<li><strong>“Why Payables Rejected?”</strong> Often a closed period or bank/payment method problem; finance fixes it and the next run picks it up.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Approval rules', def: 'Configured rules that decide who must approve an expense report, such as the manager or cost center owner.' },
        { term: 'Audit selection rule', def: 'A rule that picks which expense reports an auditor must review, such as reports over an amount or a random percentage.' },
        { term: 'Short pay', def: 'When an auditor reduces the reimbursable amount of a line that breaks policy.' },
        { term: 'Payment hold', def: 'A block on reimbursing a report, usually because required receipts are missing or overdue.' },
        { term: 'Process Expense Reimbursement', def: 'The process that turns approved expense reports into payment requests in Payables.' },
        { term: 'Payment request', def: 'A Payables document that asks for a payment to a payee who is not a regular supplier, such as an employee.' },
        { term: 'Employee liability account', def: 'The liability account credited when the company owes an employee money for expenses.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'A business unit has no audit selection rules at all. What happens to expense reports after manager approval?',
          options: [
            'They are all audited',
            'They are rejected',
            'Expenses approves them automatically for payment',
            'They wait forever',
          ],
          answer: 2,
          explain: 'Oracle documents that if no audit selection rules are selected, Expenses automatically approves the reports.',
        },
        {
          q: 'Which auditor action marks a lost receipt as acceptable and finishes the audit in one step?',
          options: ['Reject Expense Report', 'Waive Receipts and Complete Audit', 'Confirm Manager Approval', 'Request More Information'],
          answer: 1,
          explain: 'Waive Receipts and Complete Audit sets the receipt status to Waived and moves the report to Pending Payment without needing the employee to act.',
        },
        {
          q: 'What does the Process Expense Reimbursement process create?',
          options: [
            'Receivables invoices for customers',
            'Payment requests in Payables, via the open invoice interface',
            'Purchase orders',
            'General Ledger budgets',
          ],
          answer: 1,
          explain: 'It loads approved reports into the Payables open invoice interface and runs Import Payables Invoices, creating payment requests that Payables validates and pays.',
        },
        {
          q: 'Why might an expense report have the status Payables Rejected?',
          options: [
            'The manager rejected it',
            'Payables could not create the payment request, for example because the accounting date was in a closed period',
            'The employee withdrew it',
            'The receipt was waived',
          ],
          answer: 1,
          explain: 'Payables rejects interface records with errors such as closed periods or invalid payment methods. The report is retried on the next reimbursement run after the issue is fixed.',
        },
        {
          q: 'When Noah’s $65 payment request is accounted, which account is debited?',
          options: ['1110 Cash – Big River Bank', '2110 Accounts Payable – Trade', '6130 Travel and Meals', '4110 Lemonade Sales Revenue'],
          answer: 2,
          explain: 'The expense types map to 6130 Travel and Meals, which is debited. The liability (here 2110) is credited until Noah is paid.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Expenses (26D) – Expense Report Approval', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/expense-report-approval.html' },
    { title: 'Using Expenses (26D) – Overview of the Audit Expense Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/overview-of-the-audit-expense-report.html' },
    { title: 'Using Expenses (26D) – Audit Actions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/audit-actions.html' },
    { title: 'Using Expenses (26D) – How Missing Receipts Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/how-missing-receipts-are-processed.html' },
    { title: 'Using Expenses (26D) – Expense Report Payment Hold Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/expense-report-payment-hold-rules.html' },
    { title: 'Using Expenses (26D) – How Expense Report Payment Requests Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/how-expense-report-payment-requests-are-processed.html' },
    { title: 'Using Expenses (26D) – Cash Advances', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/cash-advances.html' },
    { title: 'Implementing Expenses (26D) – Audit Selection Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/audit-selection-rules.html' },
    { title: 'Implementing Expenses (26D) – Audit Rules to Identify Anomalies in the Expense Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/audit-rules-to-identify-anomalies-in-the-expense-report.html' },
    { title: 'Implementing Expenses (26D) – How You Configure Approval Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/how-you-configure-approval-rules.html' },
  ],
};
