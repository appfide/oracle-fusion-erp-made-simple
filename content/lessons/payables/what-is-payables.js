export default {
  slug: 'what-is-payables',
  title: 'What Is Accounts Payable?',
  minutes: 14,
  summary:
    'Accounts Payable (AP) is the team and the part of Oracle Fusion that keeps track of the money a company owes to its suppliers and pays it correctly. Meet Ava, the Payables team roles, and the Invoices and Payments work areas.',
  objectives: [
    'Explain what Accounts Payable means and why money we owe is a liability',
    'Describe the four big goals of a Payables team: right amount, right supplier, right time, no duplicates or fraud',
    'Name the predefined Payables job roles in Oracle Fusion and what each one does',
    'Describe the Invoices and Payments work areas and the infotiles on the Invoices landing page',
    'Explain simple Payables health measures such as days payable outstanding and discounts taken',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The “I owe you” list on the fridge',
      html: `<p>Imagine your family keeps a list on the fridge called <strong>“Things we still have to pay for.”</strong> The pizza place delivered on Friday and said “pay me by the end of the month.” The piano teacher came on Tuesday and left a bill. The window cleaner wants money next week.</p>
<p>Nobody pays at the door. Instead, someone in your family writes each bill on the list, checks it is correct (did we really order <em>two</em> pizzas?), and then pays each one before its deadline. When a bill is paid, it gets crossed off.</p>
<p>That fridge list — and the careful person who looks after it — is exactly what <span class="hl">Accounts Payable</span> is in a company. It is the list of money <strong>we owe to others</strong>, plus the job of paying it the right way.</p>`,
    },
    {
      type: 'text',
      heading: 'Accounts Payable in plain words',
      html: `<p><strong>Accounts Payable</strong> (often shortened to <strong>AP</strong>, or just <strong>Payables</strong>) means two things at once:</p>
<ul>
<li><strong>A number in the books</strong> – the total amount the company owes to its <strong>suppliers</strong> (the companies it buys from) for things it has already received but not yet paid for.</li>
<li><strong>A team and a process</strong> – the people and steps that record supplier bills (called <strong>invoices</strong>), check them, get them approved, and pay them.</li>
</ul>
<p>Money we owe is called a <strong>liability</strong>. A liability is a promise to give something (usually money) to someone else in the future. When Lemon Grove Farms delivers $500 of lemons and says “pay me in 30 days”, Sunny Lemonade now has a $500 liability. In the Sunny chart of accounts, this lives in account <code>2110 Accounts Payable – Trade</code>.</p>
<p>The opposite of Accounts Payable is <strong>Accounts Receivable</strong> (AR): money <em>other people owe us</em>. A simple way to remember: <em>Payable = we pay. Receivable = we receive.</em></p>`,
    },
    {
      type: 'journal',
      title: 'What happens in the books when a supplier bill is recorded and paid',
      lines: [
        { account: '5110 Lemons Cost', debit: 500, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 500 },
      ],
      note: `<p><strong>Step 1 – the bill arrives:</strong> Sunny now owes $500. The cost of lemons goes up (debit) and the money we owe goes up (credit to the liability). Thirty days later, when Ava pays, a second entry reduces what we owe: debit <code>2110 Accounts Payable – Trade</code> $500 and credit <code>1110 Cash – Big River Bank</code> $500. This is a simplified picture — in a real procure-to-pay flow there is an extra “received not invoiced” step you will meet in the Procure-to-Pay and Accounting for Invoices lessons.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: record Ava’s payment',
      instructions: `<p>Thirty days later, Ava pays Lemon Grove Farms the $500 from Sunny’s Big River Bank account. Build the journal entry for the <strong>payment</strong>.</p>`,
      accounts: ['5110 Lemons Cost', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '1210 Accounts Receivable', '4110 Lemonade Sales Revenue'],
      answer: [
        { account: '2110 Accounts Payable – Trade', debit: 500, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 500 },
      ],
      explain: `<p>Paying the bill makes the liability disappear (debit Accounts Payable) and cash go down (credit Cash). The lemon cost was already recorded when the invoice was entered, so it is not touched again. Accounts Receivable is for money customers owe <em>us</em>, so it has nothing to do with this payment.</p>`,
    },
    {
      type: 'slides',
      title: 'Why Accounts Payable matters so much',
      slides: [
        {
          icon: '💵',
          title: 'Pay the right amount',
          html: `<p>If the supplier sent 1,000 lemons at $0.50, we should pay $500 — not $550 because of a typo, and not for lemons that never arrived. Payables checks invoices against orders and deliveries.</p>`,
        },
        {
          icon: '🏷️',
          title: 'Pay the right supplier',
          html: `<p>Money must go to the real Lemon Grove Farms bank account. A common fraud trick is an email saying “we changed our bank account, please pay here instead.” Good AP teams verify every bank change.</p>`,
        },
        {
          icon: '⏰',
          title: 'Pay at the right time',
          html: `<p>Pay too late and suppliers get upset, charge interest, or stop delivering. Pay too early and the company loses the use of its cash. AP pays <strong>on the due date</strong> — or early only when a discount makes it worthwhile.</p>`,
        },
        {
          icon: '👯',
          title: 'Never pay twice',
          html: `<p>The same invoice can arrive by email <em>and</em> by post. Without checks, it gets entered twice and paid twice. Oracle Fusion helps by refusing a repeated invoice number for the same supplier and by offering extra duplicate checks.</p>`,
        },
        {
          icon: '🎁',
          title: 'Take discounts',
          html: `<p>Some suppliers say “pay within 10 days and get 2% off.” On a $10,000 bill, that is $200 saved just by paying on time. Payables tracks these discount dates on each invoice.</p>`,
        },
        {
          icon: '📊',
          title: 'Keep the books true',
          html: `<p>Every invoice becomes an accounting entry. If AP is messy, the company’s profit and its liabilities are wrong — and the month cannot be closed properly.</p>`,
        },
      ],
    },
    {
      type: 'lab',
      tool: 'payment-terms',
      title: 'Lab: is the early-payment discount worth it?',
      intro: `<p>Stand Builders LLC sends a <strong>$10,000</strong> invoice dated 1 March 2026 with terms <strong>2/10 Net 30</strong>: 2% off if paid within 10 days, otherwise the full amount is due in 30 days. Try a payment date of 9 March, then 20 March. How much does Sunny save by paying early, and when is the last day to get the discount?</p>`,
      preset: { invoiceDate: '2026-03-01', amount: 10000, netDays: 30, discountPct: 2, discountDays: 10, payDate: '2026-03-09' },
    },
    {
      type: 'flow',
      title: 'The life of a supplier invoice in Payables (the short version)',
      steps: [
        { icon: '📨', label: 'Receive', detail: 'The invoice arrives: paper, PDF by email, Supplier Portal, or electronic file.' },
        { icon: '⌨️', label: 'Enter', detail: 'It is recorded in Oracle Fusion Payables (by a person or automatically).' },
        { icon: '🔗', label: 'Match', detail: 'If there was a purchase order, the invoice is matched to it (and to the receipt).' },
        { icon: '✅', label: 'Validate', detail: 'The system checks it and puts it on hold if something looks wrong.' },
        { icon: '👍', label: 'Approve', detail: 'If the company requires it, a manager approves the invoice.' },
        { icon: '📒', label: 'Account', detail: 'Accounting entries are created for the General Ledger.' },
        { icon: '💸', label: 'Pay', detail: 'The supplier is paid on time through the Payments work area.' },
      ],
      note: `<p>Each of these steps has its own lesson in this module. Don’t worry about the details yet!</p>`,
    },
    {
      type: 'text',
      heading: 'Who does what in a Payables team',
      html: `<p>In a small company one person might do everything. In a bigger one, the work is split so that <strong>no single person can both create a bill and pay it</strong>. This idea is called <strong>segregation of duties</strong>, and it protects against mistakes and fraud.</p>
<p>Oracle Fusion ships with <strong>predefined job roles</strong> for Payables. A job role is a bundle of permissions that matches a real job. The three main ones are:</p>`,
    },
    {
      type: 'table',
      caption: 'Predefined Payables job roles in Oracle Fusion (names from the Security Reference for Financials)',
      headers: ['Job role', 'What Oracle says it does (in simple words)', 'At Sunny Lemonade'],
      rows: [
        ['<strong>Accounts Payable Specialist</strong>', 'Enters invoices and makes sure each one is accurate, complete and not a duplicate. Matches invoices to the right purchase orders or receipts.', 'Ava'],
        ['<strong>Accounts Payable Supervisor</strong>', 'Watches over the specialists, starts and manages payment runs, and resolves holds that are not simple data-entry problems.', 'Ava’s team lead (in a small company, Sam may cover this)'],
        ['<strong>Accounts Payable Manager</strong>', 'Runs the whole AP department, can override exceptions, analyzes Payables balances, and submits income tax and withholding reports.', 'Sam, as CFO'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Other people who touch Payables',
      html: `<p>AP is never alone. <strong>Supplier Administrators</strong> and <strong>Supplier Managers</strong> (Procurement roles) look after supplier records. <strong>Buyers</strong> like Leo create purchase orders. <strong>Receivers</strong> like Noah confirm deliveries. <strong>Approvers</strong> (managers) approve invoices. <strong>Treasury</strong> (Mia) makes sure there is cash in the bank, and the <strong>General Ledger accountant</strong> (Priya) reviews the accounting. Companies often copy and adjust the predefined roles, so your real role names may differ.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Who does it? Match the task to the job role',
      instructions: `<p>Match each everyday task to the predefined Oracle Fusion job role (or Procurement role) most likely to do it.</p>`,
      pairs: [
        { left: 'Typing in a supplier invoice and matching it to a PO', right: 'Accounts Payable Specialist' },
        { left: 'Starting and managing this week’s payment run', right: 'Accounts Payable Supervisor' },
        { left: 'Submitting income tax and withholding reports and analyzing Payables balances', right: 'Accounts Payable Manager' },
        { left: 'Approving a supplier’s request to change its contact details', right: 'Supplier Administrator' },
      ],
      explain: `<p>Oracle describes the <strong>Specialist</strong> as entering and matching invoices, the <strong>Supervisor</strong> as initiating and managing pay runs and resolving non-data-entry holds, and the <strong>Manager</strong> as running the department, overriding exceptions and submitting income tax and withholding reports. Supplier records are maintained by Procurement roles such as the <strong>Supplier Administrator</strong>.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Payables work areas',
      html: `<p>A <strong>work area</strong> is a set of pages for one job. Payables has two main ones, reached from the <kbd>Payables</kbd> group on the home page or Navigator:</p>
<ul>
<li><strong>Invoices</strong> – where you create, find, validate, approve and fix invoices. Its <strong>Invoices landing page</strong> is Ava’s daily to-do list.</li>
<li><strong>Payments</strong> – where you pay suppliers, manage payment runs (payment process requests), and review payments. You will use it in the Paying Suppliers lesson.</li>
</ul>
<p>Since release 26B, Oracle has also added the AI-driven <strong>Payables Agent</strong>, with its own <strong>Invoice List</strong> page for exception handling, and release 26D adds a <strong>Payables Period Close Workspace</strong>. Your company may use the classic work areas, the new agent experience, or both.</p>`,
    },
    {
      type: 'table',
      caption: 'The six infotiles on the Invoices landing page',
      headers: ['Infotile', 'What it shows', 'Why Ava cares'],
      rows: [
        ['<strong>Scanned</strong>', 'Invoices created from scanned or emailed images that are still incomplete, grouped by age (0–7, 8–14, 15+ days).', 'Someone must finish these before they can be processed.'],
        ['<strong>Recent</strong>', 'Invoices created or updated in the last 7 days, showing how many still need validation.', 'Quick check of new work.'],
        ['<strong>Holds</strong>', 'Invoices on hold, grouped by hold type. You can show 7, 15 or 30 days, or all time.', 'Held invoices cannot be paid until the problem is fixed.'],
        ['<strong>Approvals</strong>', 'Invoices waiting for approval, approved by others, or rejected.', 'Chase approvers before due dates.'],
        ['<strong>Prepayments</strong>', 'Available advance payments, grouped in aging buckets.', 'Prepayments should be applied to later invoices, not forgotten.'],
        ['<strong>Payments</strong>', 'Total amount due in the next 7 days, by currency.', 'Tells Mia how much cash will be needed soon.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Which infotile answers the question?',
      instructions: `<p>Ava has a question each morning. Pick the Invoices landing page infotile that answers it.</p>`,
      pairs: [
        { left: 'Which emailed invoices still need finishing?', right: 'Scanned' },
        { left: 'Which invoices are stuck and can’t be paid?', right: 'Holds' },
        { left: 'Which invoices did a manager reject?', right: 'Approvals' },
        { left: 'How much money is due in the next 7 days?', right: 'Payments' },
        { left: 'Which advance payments are waiting to be applied?', right: 'Prepayments' },
        { left: 'What was added or changed this week?', right: 'Recent' },
      ],
      explain: `<p>Each infotile is a shortcut to one kind of work: <strong>Scanned</strong> for incomplete image invoices, <strong>Holds</strong> for blocked invoices, <strong>Approvals</strong> for pending and rejected approvals, <strong>Payments</strong> for amounts due soon, <strong>Prepayments</strong> for available advances, and <strong>Recent</strong> for the last 7 days of activity.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: open the Invoices landing page',
      items: [
        'Sign in to Oracle Fusion Cloud.',
        'On the home page, open the <kbd>Payables</kbd> group (or use the Navigator) and click <kbd>Invoices</kbd>.',
        'Look at the infotiles across the top: <kbd>Scanned</kbd>, <kbd>Recent</kbd>, <kbd>Holds</kbd>, <kbd>Approvals</kbd>, <kbd>Prepayments</kbd> and <kbd>Payments</kbd>.',
        'Click a number in the <kbd>Holds</kbd> infotile. The table below the tiles now lists just those invoices.',
        'Find the list of tasks for the work area (usually a panel at the side of the page) to see actions such as creating or managing invoices.',
      ],
      note: `<p>Labels and layout can differ slightly by release, by Redwood (Oracle’s newer page design) adoption, and by the roles your company gives you. You need a Payables role and access to at least one business unit to see invoices.</p>`,
    },
    {
      type: 'text',
      heading: 'How do we know if AP is doing a good job?',
      html: `<p>Managers like Sam watch a few simple measures. You don’t need to calculate them in Oracle today — just understand what they mean:</p>
<ul>
<li><strong>Days payable outstanding (DPO)</strong> – on average, how many days the company takes to pay its suppliers. If Sunny buys about $3,000 of supplies a month and owes $2,000 right now, that is roughly 20 days of purchases still unpaid. Too low can mean paying early and losing cash; too high can mean paying late and upsetting suppliers.</li>
<li><strong>On-time payment rate</strong> – what share of invoices were paid by their due date.</li>
<li><strong>Discounts taken vs. missed</strong> – free money that was (or wasn’t) collected by paying early.</li>
<li><strong>Invoices on hold</strong> – how many invoices are stuck and how old they are.</li>
<li><strong>Touchless (or “straight-through”) rate</strong> – how many invoices go from arrival to payment without a person needing to fix anything. Oracle’s newer Payables Agent features aim to raise this.</li>
</ul>
<p>Oracle provides reports such as the <strong>Payables Invoice Aging Report</strong> and <strong>Supplier Balance Aging Report</strong> to help; you will see them in the Payables Reports lesson.</p>`,
    },
    {
      type: 'example',
      title: 'A morning in the life of Ava',
      html: `<p>Ava is the payables specialist at Sunny Lemonade US Inc. Here is how Ava’s Monday goes in Oracle Fusion.</p>`,
      steps: [
        'Ava opens the Invoices landing page. The <strong>Scanned</strong> tile shows 3 invoices that arrived by email over the weekend and need finishing.',
        'Ava completes them: one is from Sweet Sugar Co. for $200, one is Bright Power Utility’s $150 electricity bill, and one is Lemon Grove Farms’ $500 lemon invoice.',
        'The <strong>Holds</strong> tile shows 1 invoice on a quantity hold: Cup & Straw Supply billed for 5,000 cups, but Noah has only received 4,000. Ava asks Noah to check the delivery.',
        'The <strong>Approvals</strong> tile shows the electricity bill is waiting for Sam’s approval.',
        'The <strong>Payments</strong> tile shows $850 due in the next 7 days. Ava tells Mia so the cash is ready.',
      ],
      result: `<p>In under an hour, Ava knows exactly what is stuck, who needs to act, and how much money is going out this week. That is the power of a good landing page.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: AP is a control function',
      html: `<p>Auditors pay close attention to Payables, because it is where company money leaves the building. Expect questions like “Who can change a supplier’s bank account?” and “Who approved this invoice?” Oracle Fusion keeps an audit trail, but good habits matter too: never enter an invoice without a document, never change bank details from an email alone, and always investigate holds instead of just releasing them.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Accounts Payable (AP)', def: 'The money a company owes its suppliers, and the team and process that records and pays it.' },
        { term: 'Liability', def: 'Something the company owes to someone else, usually money to be paid in the future.' },
        { term: 'Supplier invoice', def: 'A bill from a supplier asking to be paid for goods or services.' },
        { term: 'Work area', def: 'A group of Oracle Fusion pages built for one job, like the Invoices or Payments work area.' },
        { term: 'Infotile', def: 'A small summary box on a landing page that shows a count or amount and lets you click through to the details.' },
        { term: 'Segregation of duties', def: 'Splitting work so one person cannot do every step alone, such as both creating and paying an invoice.' },
        { term: 'Days payable outstanding (DPO)', def: 'The average number of days a company takes to pay its suppliers.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Sunny Lemonade received sugar and has not paid yet. In the books, what is the unpaid amount?',
          options: ['An asset called Accounts Receivable', 'A liability called Accounts Payable', 'Revenue', 'Owner’s equity'],
          answer: 1,
          explain: 'Money we owe to a supplier is a liability, recorded in Accounts Payable (account 2110 in our story). Receivables is money others owe us.',
        },
        {
          q: 'Which predefined Oracle Fusion job role is described as entering invoices and matching them to purchase orders or receipts?',
          options: ['Accounts Payable Manager', 'Accounts Payable Specialist', 'Supplier Manager', 'General Accountant'],
          answer: 1,
          explain: 'The Accounts Payable Specialist enters invoices, checks they are accurate and unique, and matches them. The Supervisor manages pay runs and holds; the Manager runs the department.',
        },
        {
          q: 'Ava wants to see which invoices cannot be paid because something is wrong. Which infotile on the Invoices landing page should Ava click?',
          options: ['Recent', 'Prepayments', 'Holds', 'Payments'],
          answer: 2,
          explain: 'The Holds infotile groups invoices on hold by hold type. Held invoices cannot be paid until the hold is released.',
        },
        {
          q: 'Why do companies split invoice entry and payment between different people?',
          options: [
            'To make the work slower',
            'Because Oracle Fusion only allows one invoice per person',
            'To reduce the risk of mistakes and fraud (segregation of duties)',
            'Because suppliers ask for it',
          ],
          answer: 2,
          explain: 'Segregation of duties means no one person controls every step, so errors and fraud are much harder.',
        },
        {
          q: 'A supplier offers 2% off if paid within 10 days. What should a good AP team do?',
          options: [
            'Ignore it; always pay on the last possible day',
            'Track the discount date and pay in time when it is worth it',
            'Pay all invoices the day they arrive',
            'Ask the supplier for a refund later',
          ],
          answer: 1,
          explain: 'Taking discounts is one of AP’s goals. Oracle stores discount dates on each installment so the team can pay in time.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Invoices Landing Page (Using Payables Invoice to Pay, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/introducing-the-invoices-landing-page.html' },
    { title: 'Accounts Payable Specialist (Job Role) – Security Reference for Financials', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oafrm/Accounts_Payable_Specialist_job_roles.html' },
    { title: 'Accounts Payable Supervisor (Job Role) – Security Reference for Financials', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oafrm/Accounts_Payable_Supervisor_job_roles.html' },
    { title: 'Accounts Payable Manager (Job Role) – Security Reference for Financials', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oafrm/Accounts_Payable_Manager_job_roles.html' },
    { title: 'Payables Security', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-security.html' },
    { title: 'Overview of Payables Agent', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-payables-agent.html' },
    { title: 'Payables Agent for invoice ingestion, compliance and control (26D What’s New)', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51289.htm' },
    { title: 'Principles of Financial Accounting – Identify and Describe Current Liabilities', publisher: 'OpenStax', url: 'https://openstax.org/books/principles-financial-accounting/pages/12-1-identify-and-describe-current-liabilities' },
  ],
};
