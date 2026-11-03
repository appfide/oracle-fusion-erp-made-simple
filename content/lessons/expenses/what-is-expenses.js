export default {
  slug: 'what-is-expenses',
  title: 'What Is Expenses?',
  minutes: 14,
  summary:
    'Oracle Fusion Expenses is how employees get paid back for money they spend on work. Meet the Expenses work area, the mobile options, cash advances and the people involved — and follow Noah’s taxi and lunch from receipt to reimbursement.',
  objectives: [
    'Explain what employee expense reimbursement is and why companies need rules for it',
    'Describe the main pages of the Expenses work area in Oracle Fusion',
    'Name the people involved (employee, manager, expense auditor, payables) and what each one does',
    'Explain what a cash advance is and how it is settled later',
    'Follow the money for a simple expense from receipt to payment, including the journal entry',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Paying back a friend who bought the snacks',
      html: `<p>Imagine your class is going on a picnic. Your teacher asks you to buy juice boxes on the way because the shop is near your house. You spend $10 of your own pocket money. The next day you show the teacher the receipt and the teacher gives you $10 back from the class money box.</p>
<p>That is exactly what <strong>expense reimbursement</strong> is: a person spends their <em>own</em> money on something for the group, shows proof (the receipt), someone checks it, and the group pays them back.</p>
<p>Now imagine 500 students doing this every week. The teacher would need rules (“no candy, only juice”), a form to fill in, someone to double-check receipts, and a tidy way to pay everybody back. <span class="hl">Oracle Fusion Expenses is that form, those rules and that tidy payback system — for a whole company.</span></p>`,
    },
    {
      type: 'text',
      heading: 'What “Expenses” means at work',
      html: `<p>Employees often spend money for the company: a taxi to visit a supplier, lunch with a customer, a hotel during a trip, or parking at a conference. Sometimes they pay with <strong>their own money</strong> (cash or a personal card). Sometimes they pay with a <strong>corporate card</strong> the company gave them. Either way, the company has to:</p>
<ul>
<li><strong>Collect the details</strong> — what was bought, when, where, how much, and why.</li>
<li><strong>Check the rules</strong> — was it allowed? Is there a receipt? Is it under the limit?</li>
<li><strong>Get approval</strong> — usually from the employee’s manager.</li>
<li><strong>Pay the employee back</strong> (or pay the card company).</li>
<li><strong>Record the cost</strong> in the right account in the books, such as <code>6130 Travel and Meals</code>.</li>
</ul>
<p>In Oracle Fusion Cloud ERP, the application that does all this is called <strong>Expenses</strong> (Oracle often writes “Oracle Fusion Expenses”). It is part of the Financials family and it hands its results to <strong>Payables</strong>, which actually pays the money out — the same Payables you learned about in the Accounts Payable module.</p>
<p>Two words you will see all the time:</p>
<ul>
<li>An <strong>expense item</strong> (or just “expense”) is one thing you spent money on, like one taxi ride.</li>
<li>An <strong>expense report</strong> is a bundle of expense items that you submit together for approval and payment, like “Visit to Lemon Grove Farms, March”.</li>
</ul>`,
    },
    {
      type: 'flow',
      title: 'The life of an expense (big picture)',
      steps: [
        { icon: '🧾', label: 'Spend', detail: 'The employee pays for something for work and keeps the receipt.' },
        { icon: '📱', label: 'Capture', detail: 'The expense is entered on the web, on a phone, or created from an emailed receipt.' },
        { icon: '📋', label: 'Report', detail: 'Expense items are put into an expense report and submitted.' },
        { icon: '👍', label: 'Approve', detail: 'The manager approves (or rejects, or asks for more information).' },
        { icon: '🔍', label: 'Audit', detail: 'An expense auditor may check receipts and policy before payment.' },
        { icon: '💸', label: 'Pay', detail: 'A process creates a payment request in Payables, and Payments sends the money.' },
        { icon: '📒', label: 'Account', detail: 'The cost lands in the ledger, e.g. Travel and Meals.' },
      ],
      note: `<p>You will study each box in detail in the next three lessons: creating reports, policies and cards, and approval, audit and payment.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Practice: put an expense in the right order',
      instructions: `<p>Noah just took a taxi for work. Drag the steps into the order they really happen in Oracle Fusion.</p>`,
      items: [
        'Noah pays for the taxi and keeps the receipt',
        'Noah enters the expense item and attaches the receipt',
        'Noah adds the item to an expense report and submits it',
        'Noah’s manager approves the report',
        'An expense auditor reviews the report (if selected for audit)',
        'A payment request is created in Payables',
        'Payments sends the money to Noah’s bank account',
      ],
      explain: `<p>Spend, capture, report, approve, audit, then pay. Notice that Expenses never pays anyone itself: it hands an approved report to Payables as a payment request, and Payments sends the money. Audit comes after (or alongside) manager approval and before payment.</p>`,
    },
    {
      type: 'slides',
      title: 'A tour of the Expenses work area',
      slides: [
        {
          icon: '🏠',
          title: 'Getting there',
          html: `<p>Oracle’s guide describes opening the work area from the home page with <kbd>Me</kbd> &gt; <kbd>Expenses</kbd>. Expenses is a self-service tool: almost every employee can use it, not just finance people.</p>`,
        },
        {
          icon: '🧳',
          title: 'Travel and Expenses page',
          html: `<p>This page opens by default for every employee. It shows a <kbd>Create Report</kbd> card plus one card per expense report, sorted so that reports needing your action come first. Below the cards is an area for <strong>available expense items</strong> — expenses you have entered but not yet put into a report.</p>`,
        },
        {
          icon: '✅',
          title: 'Approvals page',
          html: `<p>Managers see an <strong>Approvals</strong> page where they approve expense reports and cash advance requests from their team. Employees who do not approve anything do not see it.</p>`,
        },
        {
          icon: '💵',
          title: 'Cash Advances, Authorization and Trips',
          html: `<ul><li><strong>Cash Advances</strong> – ask for money before a trip.</li><li><strong>Authorization</strong> – ask permission (a <em>spend authorization</em>) for estimated costs of a future activity.</li><li><strong>Trips</strong> – create an expense report from a trip and book travel, if enabled.</li></ul><p>You only see the pages your company has switched on for you.</p>`,
        },
        {
          icon: '🧰',
          title: 'Extra tasks',
          html: `<p>A tasks menu offers things like advanced search, managing your bank account for reimbursement, managing <strong>delegates</strong> (people who can enter expenses for you), viewing cumulative mileage and entering expenses in a spreadsheet.</p>`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Phones, emails and AI helpers',
      html: `<p>Oracle offers several ways to capture expenses away from a desk. Which ones you have depends on your company’s setup and release:</p>
<ul>
<li><strong>Oracle Fusion Expenses mobile application</strong> – the classic app from the Apple App Store or Google Play, where you can create and submit reports with cash and card expenses and attach receipt photos or PDFs. Oracle’s 26D What’s New says these iOS and Android apps will no longer be supported for Fusion from update 27B and recommends moving to the Expenses Agent.</li>
<li><strong>Emailing receipts</strong> – your administrator can give you a special email address. You forward a receipt from your <em>work</em> email, and the system reads the merchant, date and amount and creates an expense item.</li>
<li><strong>Expense Assistant</strong> – an older chat helper, built as a skill of the Oracle Digital Assistant, that lets you create and check expenses by SMS. The 26D What’s New says the Digital Assistant Fusion Apps templates are desupported on November 21, 2026, and recommends Oracle AI Agent Studio instead, so for Expenses the way forward is the Expenses Agent below.</li>
<li><strong>Expenses Agent</strong> – Oracle’s newer AI agent behind what Oracle calls <em>Touchless Expenses</em>. It reads emailed receipts and receipt images, creates and completes expenses, matches them to corporate card charges, asks you for missing details by email, answers policy questions, and can submit compliant reports automatically. On phones it runs as a browser-based <strong>Progressive Web App (PWA)</strong> that you add to your home screen, not as an app-store download.</li>
</ul>
<p>Oracle adds Expenses Agent features almost every quarter (for example, help with itemization and attendees in 26D), so check the current What’s New before promising a feature to anyone.</p>`,
    },
    {
      type: 'table',
      caption: 'Who does what in Expenses',
      headers: ['Person', 'What they do', 'At Sunny Lemonade'],
      rows: [
        ['<strong>Employee</strong> (or their delegate)', 'Enters expense items, attaches receipts, builds and submits expense reports.', 'Noah, the kitchen manager'],
        ['<strong>Manager / approver</strong>', 'Reviews and approves, rejects or asks questions about the report.', 'Sam approves Noah’s reports'],
        ['<strong>Expense auditor</strong>', 'Checks reports against policy and receipts, can adjust or short-pay, and runs the reimbursement process.', 'Ava doubles as auditor'],
        ['<strong>Corporate card administrator</strong>', 'Loads card transaction files and fixes invalid card lines.', 'Mia (treasury)'],
        ['<strong>Payables and Payments</strong>', 'Turn approved reports into payment requests and pay them.', 'Ava pays in a payment run'],
        ['<strong>Implementer</strong>', 'Sets up templates, expense types, policies, approval rules and accounts.', 'Jordan'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: who does this job?',
      instructions: `<p>Match each task to the person who normally does it in Oracle Fusion Expenses.</p>`,
      pairs: [
        { left: 'Creates expense items and submits the report', right: 'Employee (or delegate)' },
        { left: 'Approves, rejects or asks questions about a team member’s report', right: 'Manager / approver' },
        { left: 'Checks receipts against policy and can short-pay a line', right: 'Expense auditor' },
        { left: 'Loads card transaction files and fixes invalid card lines', right: 'Corporate card administrator' },
        { left: 'Sets up templates, expense types, policies and approval rules', right: 'Implementer' },
      ],
      explain: `<p>Expenses is self-service for employees, but several finance roles stand behind it. The manager judges whether the spending made business sense; the auditor checks the details and the rules; the card administrator keeps card data clean; and the implementer configures everything once, up front.</p>`,
    },
    {
      type: 'text',
      heading: 'Cash advances: money before the trip',
      html: `<p>Sometimes an employee needs money <em>before</em> spending it — for example, a long trip where they don’t want to use their own savings. A <strong>cash advance</strong> is an advance payment to an employee to cover business costs while traveling. In Oracle Fusion the flow looks like this:</p>
<ol>
<li>The employee requests the advance on the <strong>Cash Advances</strong> page.</li>
<li>Their manager approves, and then an expense auditor approves and sets a date by which the advance must be used up on an expense report.</li>
<li>Expenses sends a payment request to <strong>Payables</strong>, and <strong>Payments</strong> deposits the money in the employee’s bank account.</li>
<li>Until it is used, the money sits in a <strong>cash advance clearing account</strong> — the company is waiting for receipts.</li>
<li>After the trip, the employee submits an expense report. The reimbursement process applies the advance, so the employee only receives the <em>difference</em>. If they spent less than the advance, the leftover is applied to a later report or paid back to the company.</li>
</ol>
<p>Expenses also tracks <strong>overdue</strong> advances — advances still not applied after the due date.</p>`,
    },
    {
      type: 'example',
      title: 'Noah’s taxi and lunch',
      html: `<p>On 10 March, Noah visits <strong>Lemon Grove Farms</strong> to check the new lemon harvest. Sunny’s cars are busy, so Noah takes a taxi there and back (<strong>$40</strong>) and buys a quick lunch near the farm (<strong>$25</strong>). Noah pays with a personal card.</p>`,
      steps: [
        'Noah snaps photos of both receipts on the way home.',
        'Next morning, Noah opens the Expenses work area, creates a report called “Lemon Grove Farms visit – March” and adds two expense items: <em>Taxi</em> $40 and <em>Meals</em> $25, both charged to the Kitchen cost center (200).',
        'Noah attaches the receipt images and clicks <kbd>Submit</kbd>.',
        'Sam (Noah’s manager) gets a notification and approves the report.',
        'Ava, acting as expense auditor, checks the receipts and completes the audit. The report is now waiting for payment.',
        'The reimbursement process creates a <strong>payment request</strong> in Payables for $65, payable to Noah.',
        'In the next payment run, Payments sends $65 to Noah’s bank account.',
      ],
      result: `<p>Noah is paid back $65, Sunny’s Travel and Meals cost goes up by $65, and every step is recorded with who did what and when.</p>`,
    },
    {
      type: 'journal',
      title: 'Step 1 – the approved expense report becomes a payment request',
      lines: [
        { account: '6130 Travel and Meals (101-200-6130-000-000)', debit: 65, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 0, credit: 65 },
      ],
      note: `<p>The cost is recorded and Sunny now owes Noah $65. Oracle lets each company choose an <strong>employee liability account</strong> in the Expenses system options; many companies use a separate “employee payables” account. To keep our story simple, Sunny points it at <code>2110</code>.</p>`,
    },
    {
      type: 'journal',
      title: 'Step 2 – Noah is paid',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 65, credit: 0 },
        { account: '1110 Cash – Big River Bank (101-100-1110-000-000)', debit: 0, credit: 65 },
      ],
      note: `<p>The debt to Noah goes away and cash goes down. This is the same payment pattern as a supplier invoice — because, inside Payables, an expense reimbursement <em>is</em> a kind of payment request.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Practice: record Omar’s taxi',
      instructions: `<p>Omar (Receivables, Sales cost center 300) takes a <strong>$30</strong> taxi to visit Happy Cafe about an overdue bill. Omar’s expense report has been approved and the payment request has been created, but Omar has <em>not been paid yet</em>. Build the journal. Sunny uses 2110 as its employee liability account.</p>`,
      accounts: [
        '6130 Travel and Meals',
        '2110 Accounts Payable – Trade',
        '1110 Cash – Big River Bank',
        '1210 Accounts Receivable',
        '4110 Lemonade Sales Revenue',
      ],
      answer: [
        { account: '6130 Travel and Meals', debit: 30, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 30 },
      ],
      explain: `<p>The travel cost goes up (debit 6130) and Sunny now owes Omar (credit the liability, 2110 at Sunny). Cash is not touched until the payment run. Even though Omar was visiting a customer, Accounts Receivable and revenue are not affected by Omar’s taxi ride.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: why finance cares so much about expenses',
      html: `<p>Expense reports are small one by one, but there are thousands of them. They are a favorite place for mistakes (the same taxi claimed twice) and, sadly, for fraud. That is why companies set clear policies, require receipts above a certain amount, audit a sample of reports, and use tools like duplicate detection. A good expenses setup makes the honest path the easy path.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Business units matter here too',
      html: `<p>Expenses runs inside a <strong>business unit</strong> that has the <em>Expense management</em> business function. Templates, policies, approval rules and audit rules are set up per business unit. Noah submits in <strong>Sunny US BU</strong>; a colleague in London would submit in <strong>Sunny UK BU</strong> with UK rules and pounds.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Expense reimbursement', def: 'Paying an employee back for money they spent on company business.' },
        { term: 'Expense item', def: 'One thing an employee spent money on, such as one taxi ride or one meal.' },
        { term: 'Expense report', def: 'A group of expense items submitted together for approval and payment.' },
        { term: 'Expenses work area', def: 'The Oracle Fusion area where employees create expense reports, request cash advances and approve their team’s reports.' },
        { term: 'Cash advance', def: 'Money paid to an employee before a trip, which is later settled against their expense report.' },
        { term: 'Expense auditor', def: 'A finance person who checks expense reports against policy and receipts before payment.' },
        { term: 'Expenses Agent', def: 'Oracle’s AI agent that creates and completes expenses from emailed receipts and can submit compliant reports automatically.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'What is the difference between an expense item and an expense report?',
          options: [
            'They are the same thing',
            'An expense item is one purchase; an expense report groups items for approval and payment',
            'An expense report is one purchase; an expense item groups reports',
            'Expense items are only for corporate cards',
          ],
          answer: 1,
          explain: 'Each taxi or meal is an expense item. You bundle items into an expense report, which is what gets approved and paid.',
        },
        {
          q: 'Which Oracle application actually pays Noah after Noah’s expense report is approved?',
          options: ['General Ledger', 'Receivables', 'Payables (with Payments)', 'Procurement'],
          answer: 2,
          explain: 'Expenses creates a payment request in Payables, and Payments sends the money — just like paying a supplier.',
        },
        {
          q: 'Noah received a $300 cash advance but spent only $250. What happens to the extra $50?',
          options: [
            'Noah keeps it as a bonus',
            'It is applied to a later expense report or paid back to the company',
            'It is added to Noah’s salary',
            'It disappears from the books',
          ],
          answer: 1,
          explain: 'Unused advance amounts are applied to the next expense report or refunded by the employee. Expenses also flags advances that are overdue.',
        },
        {
          q: 'Which journal records Noah’s approved $65 taxi and lunch before Noah is paid?',
          options: [
            'Debit 1110 Cash, credit 6130 Travel and Meals',
            'Debit 6130 Travel and Meals, credit a payables (employee liability) account',
            'Debit 4110 Lemonade Sales Revenue, credit 6130 Travel and Meals',
            'No journal is needed for expenses',
          ],
          answer: 1,
          explain: 'The cost goes up (debit 6130) and the company owes Noah money (credit a liability). When Noah is paid, the liability is debited and cash is credited.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Expenses (26D) – Overview of the Expenses Work Area', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/example-of-introducing-the-expenses-work-area.html' },
    { title: 'Using Expenses (26D) – Cash Advances', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/cash-advances.html' },
    { title: 'Using Expenses (26D) – How can I enable the Oracle Fusion Expenses mobile application on a mobile device?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/how-can-i-enable-the-oracle-fusion-expenses-mobile-application.html' },
    { title: 'Using Expenses (26D) – How You Create Expense from Email Receipts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/how-you-create-expense-from-email-receipts.html' },
    { title: 'Oracle Fusion Cloud Financials 26D What’s New – IMPORTANT Actions and Considerations', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-t78536.htm' },
    { title: 'Using Expenses (26D) – Overview of Expense Assistant', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/overview-of-expense-assistant.html' },
    { title: 'Detailed Adoption Guidance: Expenses Agent – Overview of Expenses Agent', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/faeac/overview-of-expenses-agent.html' },
    { title: 'Detailed Adoption Guidance: Expenses Agent – Enable Mobile Experience', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/faeac/enable-mobile-experience.html' },
    { title: 'Using Expenses (26D) – How Expense Report Payment Requests Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/how-expense-report-payment-requests-are-processed.html' },
  ],
};
