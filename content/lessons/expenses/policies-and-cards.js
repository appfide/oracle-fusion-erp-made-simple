export default {
  slug: 'policies-and-cards',
  title: 'Expense Policies and Corporate Cards',
  minutes: 17,
  summary:
    'Expense policies are the rules that keep spending fair: limits by category, receipt requirements, warnings and errors. Corporate cards let employees spend company money directly — and Oracle supports three ways of deciding who pays the card company.',
  objectives: [
    'Explain what expense policies are and how warning and error tolerances work',
    'Describe receipt-required, corporate card usage and conversion rate policies',
    'Explain what a corporate card program is and how card transaction files reach Expenses',
    'Compare Individual Pay, Company Pay and Both Pay, including who gets paid what',
    'Name the two processes that create payment requests for employees and card issuers',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The pocket-money rules',
      html: `<p>Your parents give you money for the school trip, with rules: “Lunch can cost up to $10. Keep the receipt for anything over $5. No candy.”</p>
<p>If lunch costs $10.50, they’ll probably just say “a little over — fine, but be careful” (a <strong>warning</strong>). If it costs $25, they’ll say “no, that’s too much” (an <strong>error</strong> — not allowed).</p>
<p>Now imagine instead your parents give you a special card linked to <em>their</em> bank. You don’t spend your own money at all. But at the end of the month, someone still needs to check: which purchases were for the trip, and which ones were for you? That special card is a <strong>corporate card</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'What an expense policy is',
      html: `<p>An <strong>expense policy</strong> is a company rule about how much may be spent and under which conditions. Oracle Fusion Expenses can check policies automatically while the employee enters expenses, so problems are caught <em>before</em> the report reaches the manager.</p>
<p>Policies are set up <strong>by expense category</strong> in Setup and Maintenance (Oracle’s documented path is the Financials offering, Expenses functional area, task <kbd>Manage Policies by Expense Category</kbd>). Oracle documents policies for categories such as <strong>Meals</strong>, <strong>Accommodations</strong>, <strong>Airfare</strong>, <strong>Car Rental</strong>, <strong>Entertainment</strong>, <strong>Mileage</strong> and <strong>Miscellaneous</strong>, plus per diem policies.</p>
<p>A policy usually has:</p>
<ul>
<li><strong>Rates</strong> – the limit, such as $25 per meal. Rates can depend on <em>rate determinants</em> such as the employee’s job, or the location (Oracle’s accommodations example uses both). Many rates are loaded from a spreadsheet.</li>
<li><strong>Policy enforcement</strong> – what happens when someone goes over: show a warning, prevent submission, or both, each with a tolerance percentage.</li>
<li><strong>Assignment</strong> – the policy is activated and attached to the expense types that should follow it (for example, the Meals policy attached to the Meals expense type in the Travel template).</li>
</ul>`,
    },
    {
      type: 'slides',
      title: 'How warnings and errors work',
      slides: [
        {
          icon: '📏',
          title: 'Start with the limit',
          html: `<p>Sunny’s meals policy for kitchen staff says: <strong>$25 per meal</strong>.</p>`,
        },
        {
          icon: '⚠️',
          title: 'Warning tolerance',
          html: `<p>Sunny sets a <strong>10% warning tolerance</strong>. Oracle calculates the warning point as <em>rate × (1 + warning % / 100)</em> = $25 × 1.10 = <strong>$27.50</strong>. Above that, a policy warning appears. The approver always sees warnings; the employee sees them if “display warning to user” is switched on. Warnings are tracked on the report.</p>`,
        },
        {
          icon: '⛔',
          title: 'Error tolerance',
          html: `<p>Sunny also sets a <strong>20% error tolerance</strong> and “prevent report submission”. Error point: $25 × 1.20 = <strong>$30</strong>. Above $30, the employee cannot submit until the amount is fixed.</p>`,
        },
        {
          icon: '✍️',
          title: 'Justify, then decide',
          html: `<p>Between $27.50 and $30, Noah can still submit, but will usually need to explain why (a justification). The manager and auditor then decide. Above $30, the report is blocked.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: warning, error or fine?',
      instructions: `<p>Sunny’s meals policy: limit <strong>$25</strong>, warning tolerance <strong>10%</strong> (warning above $27.50), error tolerance <strong>20%</strong> with “prevent report submission” (error above $30). Classify each meal.</p>`,
      categories: ['No violation', 'Warning (can submit)', 'Error (blocked)'],
      items: [
        { text: 'Meal of $22.00', answer: 'No violation' },
        { text: 'Meal of $27.00', answer: 'No violation' },
        { text: 'Meal of $28.50', answer: 'Warning (can submit)' },
        { text: 'Meal of $29.99', answer: 'Warning (can submit)' },
        { text: 'Meal of $34.00', answer: 'Error (blocked)' },
      ],
      explain: `<p>Oracle compares the amount with rate × (1 + tolerance %). A $27 meal is above the $25 rate but still inside the 10% warning tolerance, so no violation is raised. Between $27.50 and $30 a warning appears (approvers always see it). Above $30 the error tolerance is exceeded and, because Sunny chose to prevent submission, the report cannot be submitted.</p>`,
    },
    {
      type: 'table',
      caption: 'Other policy controls in Oracle Fusion Expenses',
      headers: ['Policy', 'What it controls', 'Sunny example'],
      rows: [
        ['<strong>Receipt required</strong>', 'For each expense type: whether a receipt is needed, for cash only or for cash and corporate card, and above which amount. Warning and error tolerances can apply.', 'Receipts required for any meal over $20.'],
        ['<strong>Corporate card usage</strong>', 'A <em>cash limit</em> per expense category: above this, the employee should have used the corporate card. Warning/error tolerances apply.', 'Car rental paid in cash may not exceed $100.'],
        ['<strong>Conversion rate</strong>', 'For cash expenses in a foreign currency: which rate type to use (Corporate, Spot or User), whether to default it, and how far the employee may change it.', 'A London lunch in GBP must use the corporate rate, within 5%.'],
        ['<strong>Spending limits</strong> (Expenses Agent)', 'Daily, monthly or yearly limits for applicable expenses, such as entertainment and miscellaneous.', 'Monthly entertainment limit per employee.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: the car rental cash limit',
      instructions: `<p>Oracle’s own example of a corporate card usage policy: the cash limit for the Car Rental category is <strong>$100</strong>, with a <strong>5%</strong> warning tolerance and a <strong>10%</strong> error tolerance. Fill in the blanks.</p>`,
      html: `<p>A cash car rental above $ {{}} shows a warning reminding the employee to use the corporate card.</p>
<p>A cash car rental above $ {{}} prevents the report from being submitted.</p>
<p>Noah pays $107 in cash for a rental van. The result is a {{}} (warning or error).</p>`,
      blanks: [
        { answer: 105 },
        { answer: 110 },
        { answer: ['warning', 'a warning'] },
      ],
      explain: `<p>$100 × 1.05 = $105 is the warning point and $100 × 1.10 = $110 is the error point. $107 sits between them, so Noah sees a warning (tracked on the report) but can still submit. If no cash limit is defined, cash expenses of any amount are allowed.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Ask the policy a question',
      html: `<p>With the <strong>Expenses Agent</strong>, companies can upload their written policy documents. Employees can then ask questions in plain language, such as “What is my daily dinner limit in Chicago?”, and get an answer with a reference to the policy. This uses Oracle’s AI Agent Studio. It does not replace the configured policy rules — the rules still do the checking.</p>`,
    },
    {
      type: 'text',
      heading: 'Corporate cards: company money in the employee’s wallet',
      html: `<p>A <strong>corporate card</strong> is a credit card issued to an employee for business spending. It means employees don’t have to use their own money, and the company gets an electronic record of every charge.</p>
<p>In Oracle, a <strong>corporate card program</strong> is the agreement between the company and the card issuer (the bank, such as Visa, MasterCard or American Express issuers). A program holds one or more <strong>company accounts</strong>, each with a card issuer, payment terms and other agreements. A company can have one global program or several regional ones.</p>
<p>How the card charges get into Expenses:</p>
<ol>
<li>The company and card issuer agree a file format and delivery schedule and set up a secure connection.</li>
<li>Transaction files arrive regularly. Oracle documents uploads for Visa, MasterCard, Diners Club and American Express files (and hotel <em>eFolio</em> details when present).</li>
<li>The system validates each transaction. <strong>Valid</strong> charges become expense items waiting for the employee to put them on a report. <strong>Invalid</strong> ones go to the corporate card administrator to fix and revalidate.</li>
<li>The card’s merchant categories are mapped to Sunny’s expense types, so a charge from a restaurant arrives already typed as Meals.</li>
<li>The employee adds the charges to an expense report, marks each one Business or Personal, attaches receipts and submits.</li>
</ol>`,
    },
    {
      type: 'table',
      caption: 'Who pays the card issuer? The three payment options',
      headers: ['Option', 'Who pays the card issuer', 'What the company reimburses the employee', 'Payment requests created'],
      rows: [
        ['<strong>Individual Pay</strong>', 'The employee pays the whole card bill (business and personal).', 'Card <em>business</em> charges plus cash business expenses.', 'One to the employee.'],
        ['<strong>Company Pay</strong>', 'The company pays the whole card bill, any time per the card terms — no need to wait for the expense report.', 'Only cash business expenses, <em>minus</em> any personal card charges (the employee owes those back).', 'One to the card issuer (separate process) and one to the employee.'],
        ['<strong>Both Pay</strong> (joint liability)', 'The company pays the business charges; the employee pays their own personal charges.', 'Cash business expenses.', 'One to the card issuer (after the report is approved) and one to the employee.'],
      ],
    },
    {
      type: 'example',
      title: 'Same report, three payment options',
      html: `<p>Oracle’s guide uses a neat example, which we’ll give to Noah. Noah’s expense report contains: <strong>$500</strong> of cash business expenses, <strong>$650</strong> of corporate card business charges, and <strong>$299</strong> of corporate card personal charges (oops — Noah used the card for a personal purchase). The card issuer’s bill is $650 + $299 = <strong>$949</strong>. The report’s business total is $500 + $650 = <strong>$1,150</strong>.</p>`,
      steps: [
        '<strong>Individual Pay:</strong> Sunny owes Noah <strong>$1,150</strong> (cash + card business). Noah pays the $949 card bill personally. Sunny owes the card issuer $0.',
        '<strong>Both Pay:</strong> Sunny pays the card issuer <strong>$650</strong> (business charges) and pays Noah <strong>$500</strong> (cash). Noah pays the $299 personal charges to the issuer personally.',
        '<strong>Company Pay:</strong> Sunny pays the card issuer the full <strong>$949</strong>. Noah is owed $500 cash, but $299 of personal charges were paid by Sunny, so Sunny pays Noah only <strong>$201</strong>.',
      ],
      result: `<p>In every case Sunny’s real business cost is $1,150 and nobody is paid twice. The option only changes <em>who</em> sends money to <em>whom</em>.</p>`,
    },
    {
      type: 'journal',
      title: 'Both Pay, simplified: Noah’s report after approval',
      lines: [
        { account: '6130 Travel and Meals (101-200-6130-000-000)', debit: 1150, credit: 0 },
        { account: '2110 Accounts Payable – Trade: due to Noah (101-100-2110-000-000)', debit: 0, credit: 500 },
        { account: '2110 Accounts Payable – Trade: due to card issuer (101-100-2110-000-000)', debit: 0, credit: 650 },
      ],
      note: `<p>This is a simplified picture of the money. In Oracle, the card business charges first go through an <strong>expense clearing account</strong> defined on the card program’s company account, and the card issuer’s payment request is accounted against that clearing account. The employee’s part uses the <strong>employee liability account</strong> from the Expenses system options. Sunny points both liabilities at <code>2110</code> to keep the story simple.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: who gets paid what?',
      instructions: `<p>Leo’s expense report has <strong>$200</strong> of cash business expenses, <strong>$300</strong> of corporate card business charges and <strong>$50</strong> of corporate card personal charges. Work out the payments for each option.</p>`,
      html: `<p><strong>Individual Pay:</strong> Sunny pays Leo $ {{}} and pays the card issuer $ {{}}.</p>
<p><strong>Both Pay:</strong> Sunny pays Leo $ {{}} and pays the card issuer $ {{}}.</p>
<p><strong>Company Pay:</strong> Sunny pays the card issuer $ {{}} and pays Leo $ {{}}.</p>`,
      blanks: [
        { answer: 500, hint: 'cash business + card business' },
        { answer: 0 },
        { answer: 200 },
        { answer: 300 },
        { answer: 350, hint: 'the whole card bill' },
        { answer: 150, hint: 'cash business minus personal card charges' },
      ],
      explain: `<p>Individual Pay: Leo pays the card bill, so Sunny reimburses all business spending (200 + 300 = 500). Both Pay: Sunny pays the issuer only the $300 business charges and reimburses Leo’s $200 cash; Leo pays the $50 personal charges. Company Pay: Sunny pays the full $350 card bill, so it recovers the $50 personal charges by paying Leo only $200 − $50 = $150. In all three, Sunny’s business cost is $500.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'The processes behind the payments',
      html: `<ul>
<li><strong>Process Expense Reimbursement</strong> (run by the expense auditor, usually scheduled) – creates payment requests in Payables for employees, and for card issuers in the Both Pay option. In Both Pay, the card charges are copied into a separate card issuer expense report whose number ends in <code>.1</code> (then <code>.2</code> for a second card).</li>
<li><strong>Create Corporate Card Issuer Payment Requests</strong> (run by the corporate card administrator) – creates the payment request to the card issuer for Company Pay transactions.</li>
</ul>
<p>A company can mix options — for example Both Pay in the US and Individual Pay in the UK — by setting the payment option on each company account.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: personal charges on the company card',
      html: `<p>Most companies discourage personal use of corporate cards, but it happens (wrong card from the wallet!). The key is honesty: mark it <strong>Personal</strong> on the report. Card administrators also watch for disputes (a charge you don’t recognize) and for cards of employees who have left. Policies such as “use the card for car rentals over $100” push spending onto cards, which gives finance cleaner data and fewer cash reimbursements.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Expense policy', def: 'A company rule that limits how much can be spent on a category of expenses and how violations are handled.' },
        { term: 'Warning tolerance', def: 'The percentage above a policy limit where the system shows a warning but still allows submission.' },
        { term: 'Error tolerance', def: 'The percentage above a policy limit beyond which the system can prevent the report from being submitted.' },
        { term: 'Corporate card', def: 'A company-issued credit card that employees use for business spending.' },
        { term: 'Corporate card program', def: 'The agreement between a company and a card issuer, made up of company accounts with terms and a payment option.' },
        { term: 'Individual Pay / Company Pay / Both Pay', def: 'The three options for deciding whether the employee, the company, or each for their own share pays the card issuer.' },
        { term: 'Expense clearing account', def: 'A temporary account used for corporate card charges between the card bill and the expense report.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'The meals limit is $25 with a 10% warning tolerance and 20% error tolerance (submission prevented). Noah enters a $28 meal. What happens?',
          options: [
            'Nothing — it is under the limit',
            'A policy warning appears, but Noah can still submit (usually with a justification)',
            'The report is blocked',
            'The meal is automatically reduced to $25',
          ],
          answer: 1,
          explain: '$28 is above the $27.50 warning point but below the $30 error point, so it produces a warning, not an error.',
        },
        {
          q: 'Under Company Pay, an employee has $500 of cash business expenses and $299 of personal card charges. How much is paid to the employee?',
          options: ['$500', '$799', '$201', '$0'],
          answer: 2,
          explain: 'The company already paid the $299 personal charges to the card issuer, so it deducts them from the $500 cash reimbursement: $500 − $299 = $201.',
        },
        {
          q: 'What happens to an invalid transaction in a corporate card file?',
          options: [
            'It is deleted forever',
            'It is paid automatically',
            'The corporate card administrator reviews and corrects it, then it is validated again',
            'It is sent to the employee’s manager',
          ],
          answer: 2,
          explain: 'Valid charges become expense items. Invalid ones wait for the corporate card administrator to fix them and revalidate.',
        },
        {
          q: 'Which process pays the card issuer for Company Pay transactions?',
          options: [
            'Create Corporate Card Issuer Payment Requests',
            'Import Payables Invoices only',
            'Create Accounting',
            'Process Overdue and Missing Receipts',
          ],
          answer: 0,
          explain: 'For Company Pay, the corporate card administrator runs Create Corporate Card Issuer Payment Requests, which creates the issuer’s payment request in Payables.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Implementing Expenses (26D) – Options for Configuring Expense Policies', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/options-for-configuring-expense-policies.html' },
    { title: 'Implementing Expenses (26D) – Set Up a Meals Expense Policy', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/set-up-a-meals-expense-policy.html' },
    { title: 'Implementing Expenses (26D) – Set Up an Accommodations Expense Policy', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/set-up-an-accommodations-expense-policy.html' },
    { title: 'Implementing Expenses (26D) – What’s a corporate card program?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/what-s-a-corporate-card-program.html' },
    { title: 'Implementing Expenses (26D) – How Corporate Card Transaction Files Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/how-corporate-card-transaction-files-are-processed.html' },
    { title: 'Implementing Expenses (26D) – Options for Deciding Who Pays the Corporate Card Issuer', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/options-for-deciding-who-pays-the-corporate-card-issuer.html' },
    { title: 'Implementing Expenses (26D) – How Accounting Entries for Corporate Card Transactions Are Distributed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/how-accounting-entries-for-corporate-card-transactions-are.html' },
    { title: 'Using Expenses (26D) – How Expense Report Payment Requests Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/how-expense-report-payment-requests-are-processed.html' },
    { title: 'Using Expenses (26D) – What’s the difference between Business and Business - Employee Paid?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/what-s-the-difference-between-business-and-business-employee.html' },
    { title: 'Detailed Adoption Guidance: Expenses Agent – Overview of Expenses Agent', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/faeac/overview-of-expenses-agent.html' },
  ],
};
