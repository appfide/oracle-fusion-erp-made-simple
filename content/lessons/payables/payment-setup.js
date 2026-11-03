export default {
  slug: 'payment-setup',
  title: 'Getting Ready to Pay: Terms, Methods and Banks',
  minutes: 20,
  summary:
    'Before Ava can pay anyone, Oracle needs to know WHEN each bill is due (payment terms and installments), HOW to pay (payment methods), FROM WHICH bank account, TO WHICH supplier bank account, and WHICH rules to follow (payment process profiles). This lesson sets all of that up.',
  objectives: [
    'Explain payment terms, terms dates, installments and early-payment discounts such as 2/10 Net 30',
    'Compare check, electronic (EFT) and wire payment methods and how a default method reaches an invoice',
    'Tell apart internal (disbursement) bank accounts and external (supplier) bank accounts, and what a payment document is',
    'Describe what a payment process profile controls and which setup pages hold the main payment options',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Paying your friend back, with rules',
      html: `<p>Your friend lends you money for lemons and says: "Pay me back within 30 days. But if you pay me in the first 10 days, you can keep 2% as a thank-you." That sentence is a <strong>payment term</strong>.</p>
<p>Then you have to decide <strong>how</strong> to pay (hand over coins, write a note, or transfer from your bank app), <strong>from which</strong> piggy bank, and <strong>to which</strong> of your friend’s piggy banks. And your parents may have <strong>rules</strong>: "Big payments need my signature" or "Always write the date on the envelope."</p>
<p>Oracle needs all of these answers written down <em>before</em> paying day, so that paying is fast, safe and the same every time. <span class="hl">That is payment setup.</span></p>`,
    },
    {
      type: 'slides',
      title: 'The five questions behind every payment',
      slides: [
        { icon: '📅', title: 'WHEN? Payment terms', html: `<p>Payment terms turn an invoice into one or more <strong>installments</strong>, each with a due date and maybe a discount date.</p>` },
        { icon: '✉️', title: 'HOW? Payment method', html: `<p>Check, electronic funds transfer (EFT), wire, and others. The method travels with each installment.</p>` },
        { icon: '🏦', title: 'FROM WHERE? Internal bank account', html: `<p>Sunny’s own account at Big River Bank, set up in Cash Management as a <strong>disbursement</strong> bank account.</p>` },
        { icon: '🏪', title: 'TO WHERE? Supplier bank account', html: `<p>The supplier’s account, stored on the supplier as an <strong>external</strong> bank account. Needed for electronic payments.</p>` },
        { icon: '📘', title: 'WHICH RULES? Payment process profile', html: `<p>The "blueprint": file format, printing or transmission, grouping rules, and which reports to produce.</p>` },
      ],
    },
    {
      type: 'text',
      heading: 'Payment terms and installments',
      html: `<p>A <strong>payment term</strong> is a named rule such as <em>Net 30</em> or <em>2/10 Net 30</em>. In Oracle Fusion a payment term has one or more <strong>lines</strong>, and <span class="hl">each line creates one installment</span> on the invoice. Each line can be a percentage or a fixed amount, has a due date, and can have up to <strong>three discounts</strong>, each with its own discount date.</p>
<p>Due dates and discount dates can be calculated in four ways:</p>
<ul>
<li><strong>Days</strong>: a number of days added to the invoice <em>terms date</em> (Net 30 = 30 days).</li>
<li><strong>Fixed Date</strong>: a specific calendar date.</li>
<li><strong>Calendar</strong>: based on a Payables calendar, useful to avoid weekends or holidays (due dates only, not discount dates).</li>
<li><strong>Day of Month</strong>: for example "due on the 15th", with a <em>cutoff day</em> and <em>months ahead</em> to decide which month.</li>
</ul>
<p>The <strong>terms date</strong> is the starting point for the count. Which date it uses (for example the invoice date or the goods received date) is set by the <em>terms date basis</em> on the supplier site or invoice options.</p>
<p>Where do terms come from on an invoice? If the invoice has an <strong>identifying PO</strong>, the PO’s terms are used. If not, the <strong>supplier site</strong> terms. If the site has none, the default from the <strong>Manage Invoice Options</strong> page. Ava can still override them on the invoice; the installments are then recalculated.</p>`,
    },
    {
      type: 'example',
      title: 'Two Sunny payment terms in action',
      html: `<p><strong>Sweet Sugar Co.</strong> offers <strong>2/10 Net 30</strong>: take 2% off if you pay within 10 days, otherwise pay the full amount within 30 days. Their $200 invoice is dated March 2 (the terms date).</p>
<p><strong>Stand Builders LLC</strong> builds the new $6,000 lemonade stand and agrees to a two-step term: 50% due in 30 days and 50% due in 60 days.</p>`,
      steps: [
        'Sugar: one installment of $200, discount date March 12 ($4 discount, so $196), due date April 1.',
        'If Ava pays on March 10, Sunny pays $196. If Ava pays on March 20, Sunny pays $200.',
        'Stand: the term has two lines, so the invoice gets <strong>two installments</strong> of $3,000, due 30 and 60 days after the terms date.',
        'Each installment can even have its own payment method, or be put on hold separately.',
      ],
      result: `<p>A 2% discount for paying 20 days early is worth a lot: over a year it is like earning roughly 36% interest. That is why Mia (treasury) loves discount terms when cash is available.</p>`,
    },
    {
      type: 'journal',
      title: 'Paying the sugar invoice early with the 2% discount',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 200, credit: 0 },
        { account: '1110 Cash – Big River Bank (101-100-1110-000-000)', debit: 0, credit: 196 },
        { account: '5120 Sugar Cost (101-200-5120-010-000)', debit: 0, credit: 4 },
      ],
      note: `<p>The full $200 liability is cleared, but only $196 leaves the bank. Sunny’s setup spreads the discount back onto the invoice’s expense line, so sugar cost goes down by $4. (A company can instead send all discounts to one <em>Discount Taken</em> account; that is the <em>Discount allocation method</em> option.)</p>`,
    },
    {
      type: 'lab',
      tool: 'payment-terms',
      title: 'Lab: play with 2/10 Net 30',
      intro: `<p>This is Sweet Sugar Co.’s $200 invoice with terms <strong>2/10 Net 30</strong> and a terms date of March 2, 2026. Ava plans to pay on March 10. Check the discount date, due date and amount to pay. Then move the pay date to March 13 and see the discount disappear. Try a 3% discount, or a $6,000 invoice, too.</p>`,
      preset: { invoiceDate: '2026-03-02', amount: 200, netDays: 30, discountPct: 2, discountDays: 10, payDate: '2026-03-10' },
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Work out the installments',
      instructions: `<p>Fill in the blanks. Use whole numbers for amounts.</p>`,
      html: `<p>A $1,000 invoice has terms <strong>2/10 Net 30</strong> and a terms date of May 1. The discount is $ {{}}, so if Ava pays on May 8 Ava pays $ {{}}. Without the discount, the due date is May {{}}.</p>
<p>Stand Builders’ $6,000 invoice uses a term with two lines, 50% due in 30 days and 50% in 60 days. The invoice gets {{}} installments of $ {{}} each.</p>`,
      blanks: [
        { answer: 20, hint: '2% of 1,000' },
        { answer: 980 },
        { answer: 31, hint: 'May 1 + 30 days' },
        { answer: ['2', 'two'] },
        { answer: 3000 },
      ],
      explain: `<p>2% of $1,000 is $20, so an early payment is $980. Net 30 from May 1 is May 31. Each payment term line creates one installment, so a two-line 50/50 term splits $6,000 into two installments of $3,000.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: terms and installments',
      html: `<p>Payment terms are created on the <strong>Manage Payment Terms</strong> page in Setup and Maintenance and can be shared across business units through reference data sets. On an invoice, the <strong>Installments</strong> area shows due dates, amounts and discounts. You can <strong>split</strong> an installment (Oracle creates a second one for half the amount, which you then edit) or <strong>place a hold</strong> on one installment, as long as it isn't paid, partly paid or already selected for payment.</p>
<p>Discount behavior options live on <strong>Manage Invoice Options</strong>, for example <em>Exclude tax from calculation</em>, <em>Exclude freight from calculation</em>, <em>Discount allocation method</em> and <em>Always take discount</em>.</p>`,
    },
    {
      type: 'text',
      heading: 'How the money travels: payment methods',
      html: `<p>Once Oracle knows <em>when</em> to pay, it needs to know <em>how</em>. A <strong>payment method</strong> describes how money gets from Sunny to the supplier. Here are the methods you will meet most:</p>`,
    },
    {
      type: 'table',
      caption: 'Common payment methods',
      headers: ['Method', 'How the money travels', 'Good to know'],
      rows: [
        ['<strong>Check</strong>', 'A printed paper check is mailed to the supplier.', 'Needs check stock (a payment document) on the bank account. Slow, and the riskiest for fraud.'],
        ['<strong>Electronic (EFT)</strong>', 'A payment file goes to the bank, which moves money into the supplier’s bank account (e.g. ACH in the US).', 'Needs the supplier’s bank account. Cheap and fast; the most common method today.'],
        ['<strong>Wire</strong>', 'An urgent bank-to-bank transfer, often international.', 'Fast but has bank fees; often used for large or foreign payments.'],
        ['<strong>Bill payable</strong>', 'A future-dated promise to pay (common in some countries).', 'Matures later; Oracle has special statuses and a process for matured bills payable.'],
      ],
    },
    {
      type: 'text',
      heading: 'Payment methods in Oracle Payments',
      html: `<p>Payment methods are defined in <strong>Oracle Fusion Payments</strong>, the shared payment engine that Payables, Receivables (for refunds) and Cash Management all use. Oracle comes with simple predefined methods such as <em>Check</em> and <em>Electronic</em>. Companies can create more specific ones, for example "US ACH" or "Italian EFT", and attach:</p>
<ul>
<li><strong>Usage rules</strong>: which business units, legal entities and transaction types may use the method.</li>
<li><strong>Validations</strong>: checks that run on invoices, payments or payment files, so errors (like a missing bank code) are caught early, sometimes as early as invoice entry.</li>
</ul>
<p>How does an invoice get its payment method? Through <strong>payment method defaulting rules</strong>, applied in a priority order you choose (by business unit, legal entity, currency, domestic or foreign payee, and so on), and through a default method saved on the supplier, address or site. The <em>Payment Method Default Basis</em> on the <strong>Manage Disbursement System Options</strong> page decides whether the supplier’s own default beats the rules.</p>`,
    },
    {
      type: 'text',
      heading: 'Banks: whose account is whose?',
      html: `<p>Oracle uses one <strong>bank account model</strong>: you create a <strong>bank</strong> (Big River Bank), then a <strong>branch</strong>, then <strong>accounts</strong> at that branch. Accounts come in two flavors:</p>
<ul>
<li><strong>Internal bank accounts</strong> belong to <em>us</em>. Sunny’s "Sunny Operating Account" is set up in <strong>Cash Management</strong> with the <strong>Manage Bank Accounts</strong> task, given <strong>business unit access</strong> for Sunny US BU, and marked for payments. When it pays suppliers it is called a <strong>disbursement bank account</strong>.</li>
<li><strong>External bank accounts</strong> belong to <em>others</em>, such as suppliers. A supplier’s bank account can be stored at the supplier, address or site level on the supplier’s <strong>Payments</strong> tab. For electronic international payments, both bank and branch are needed and the <em>Allow international payments</em> box must be checked. European accounts use an IBAN.</li>
</ul>
<p>For checks, the internal bank account also needs a <strong>payment document</strong>: the check stock. You give it a name, a paper stock type such as <em>Numbered Stock</em>, a check format, and the first and last available check numbers, so Oracle knows which check number comes next.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Supplier bank details are a fraud target',
      html: `<p>A classic scam is a fake email "from the supplier" asking to change their bank account. Real companies protect supplier bank account changes with approvals and a call-back to a known phone number before the change is saved. Oracle also lets companies require a valid bank account and supporting documents when a supplier is onboarded. Never update a supplier’s bank account just because an email asked you to.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Internal or external bank account?',
      instructions: `<p>From Sunny’s point of view, is each bank account internal (ours) or external (someone else’s)?</p>`,
      categories: ['Internal', 'External'],
      items: [
        { text: 'Sunny Operating Account at Big River Bank', answer: 'Internal' },
        { text: 'Lemon Grove Farms’ account that receives Sunny’s EFT payments', answer: 'External' },
        { text: 'The account that holds Sunny’s check stock (payment document)', answer: 'Internal' },
        { text: 'An IBAN stored on a European supplier’s site', answer: 'External' },
        { text: 'The disbursement bank account chosen on a payment process request', answer: 'Internal' },
      ],
      explain: `<p>Internal accounts belong to Sunny and are set up in Cash Management (Manage Bank Accounts); they are the "from" side and can hold check stock. External accounts belong to suppliers (or customers) and are stored on the supplier; they are the "to" side of electronic payments.</p>`,
    },
    {
      type: 'text',
      heading: 'Payment process profiles: the blueprint',
      html: `<p>A <strong>payment process profile</strong> (PPP) tells Oracle Payments exactly how to turn approved invoices into payments and files. It is set up with the <strong>Manage Payment Process Profiles</strong> task (Offering: Financials, Functional Area: Payments). It controls:</p>
<ul>
<li><strong>Processing type</strong>: <em>Electronic</em> (a file is sent) or <em>Printed</em> (checks are printed).</li>
<li><strong>Payment file format</strong>: the layout the bank expects, for example <em>ISO20022 Common Global Implementation Format</em> for electronic payments or <em>Standard Check Format (Stub after Payment)</em> for checks. Formats are built with Oracle Analytics Publisher templates.</li>
<li><strong>Payment confirmation point</strong>: when a payment counts as done, for example when the file is formatted or when it is transmitted.</li>
<li><strong>Usage rules</strong>: which payment methods, disbursement bank accounts, business units and currencies may use this profile.</li>
<li><strong>Grouping rules</strong>: which invoices are combined into one payment (e.g. same due date) and which payments go into one file; limits such as maximum documents per payment.</li>
<li><strong>Payment system and transmission</strong>: for electronic files, the bank or payment system and how the file is sent.</li>
<li><strong>Reporting</strong>: automatic payment file register, <strong>positive pay</strong> file (tells the bank which checks are genuine) and <strong>separate remittance advice</strong> (an email telling suppliers what was paid).</li>
</ul>`,
    },
    {
      type: 'flow',
      title: 'How the setups connect',
      steps: [
        { icon: '📄', label: 'Invoice', detail: 'Gets payment terms and a payment method (from PO, supplier site or defaults).' },
        { icon: '📅', label: 'Installments', detail: 'Due dates, discount dates, amounts, pay group, payment priority.' },
        { icon: '🏦', label: 'Disbursement bank account', detail: 'Chosen when paying; must allow the business unit and currency.' },
        { icon: '📘', label: 'Payment process profile', detail: 'Matched by usage rules to the method, bank account, BU and currency.' },
        { icon: '📤', label: 'Payment', detail: 'Built, formatted and sent to the supplier’s external bank account or printed.' },
      ],
    },
    {
      type: 'table',
      caption: 'Where the main payment-related options live (Setup and Maintenance pages)',
      headers: ['Page / task', 'What Sunny sets there'],
      rows: [
        ['<strong>Manage Payment Terms</strong>', 'Net 30, 2/10 Net 30, the 50/50 two-installment term for big purchases.'],
        ['<strong>Manage Invoice Options</strong>', 'Default payment terms, terms date basis, pay date basis, pay group, payment priority, discount options, prepayment options.'],
        ['<strong>Manage Payment Options</strong>', 'When payments are accounted (at issue, at clearing, or both) and other payment behavior.'],
        ['<strong>Manage Common Options for Payables and Procurement</strong>', 'Default liability and other distributions, realized gain/loss accounts for currency differences, expense accrual timing.'],
        ['<strong>Manage Disbursement System Options</strong>', 'Payment method default basis and other company-wide Payments settings.'],
        ['<strong>Manage Payment Process Profiles</strong>', 'One profile for US electronic payments, one for printed checks.'],
        ['<strong>Manage Bank Accounts</strong> (Cash Management)', 'Sunny Operating Account, business unit access, check stock (payment documents).'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Which setup page?',
      instructions: `<p>Jordan is configuring payments for Sunny. Match each decision to the page or task where it is set.</p>`,
      pairs: [
        { left: 'Create the 2/10 Net 30 term', right: 'Manage Payment Terms' },
        { left: 'Add check stock to the Sunny Operating Account', right: 'Manage Bank Accounts' },
        { left: 'Choose the ISO 20022 file format and grouping rules', right: 'Manage Payment Process Profiles' },
        { left: 'Decide whether payments are accounted at issue or at clearing', right: 'Manage Payment Options' },
        { left: 'Set the default liability and prepayment distributions', right: 'Manage Common Options for Payables and Procurement' },
        { left: 'Decide if a supplier’s own default payment method beats the defaulting rules', right: 'Manage Disbursement System Options' },
      ],
      explain: `<p>Terms live in Manage Payment Terms; bank accounts and payment documents in Cash Management’s Manage Bank Accounts; formats and grouping in the payment process profile; payment accounting timing in Manage Payment Options; default accounts in the common options; and the payment method default basis in the disbursement system options.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: create a "2/10 Net 30" payment term',
      items: [
        'Go to <strong>Setup and Maintenance</strong> and open the <kbd>Manage Payment Terms</kbd> task.',
        'Click <kbd>Create</kbd> and enter the name <code>2/10 Net 30</code>.',
        'In the <strong>Installments</strong> section click <kbd>Add Row</kbd>.',
        'Enter <strong>Due Percent</strong> 100 and <strong>Days</strong> 30.',
        'Enter <strong>First Discount Percent</strong> 2 and <strong>First Discount Days</strong> 10.',
        'Assign the term to the reference data set your business unit uses, then click <kbd>Save</kbd>.',
      ],
      note: `<p>Field labels can differ slightly by release, Redwood page version and your company’s configuration. In a shared or production system, payment setup is usually done only by the implementation team (like Jordan), not by Payables users.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: setups are decided once, used thousands of times',
      html: `<p>Ava touches these setups rarely, but they decide whether payment day goes smoothly. Most payment-run problems trace back to setup: an invoice with a payment method no profile accepts, a bank account without access for the business unit, or a supplier missing a bank account for EFT. When a payment run rejects invoices, check method, profile usage rules and bank accounts first.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Payment terms', def: 'A rule that calculates when an invoice is due and any early-payment discount, such as Net 30 or 2/10 Net 30.' },
        { term: 'Installment', def: 'One scheduled piece of an invoice payment, with its own due date, amount and discount; one invoice can have several.' },
        { term: 'Terms date', def: 'The date that payment terms count from, such as the invoice date or the goods received date.' },
        { term: 'Payment method', def: 'How a supplier is paid, for example check, electronic funds transfer or wire.' },
        { term: 'Disbursement bank account', def: 'A company’s own (internal) bank account used to pay suppliers, set up in Cash Management.' },
        { term: 'External bank account', def: 'A bank account that belongs to someone else, such as a supplier, used as the destination of electronic payments.' },
        { term: 'Payment process profile', def: 'The Oracle Payments blueprint that controls payment format, grouping, printing or transmission, and reports.' },
        { term: 'Payment document', def: 'Check stock defined on a bank account, with a range of check numbers, used to print checks.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'An invoice for $1,000 has terms 2/10 Net 30 and a terms date of May 1. Ava pays on May 8. How much does Sunny pay?',
          options: ['$1,000', '$980', '$800', '$1,020'],
          answer: 1,
          explain: 'Paying within 10 days earns the 2% discount: $1,000 − $20 = $980.',
        },
        {
          q: 'A payment term has three lines (40%, 35%, 25%). What happens on the invoice?',
          options: [
            'Three separate invoices are created',
            'The invoice gets three installments, one per line',
            'Only the first line is used',
            'The supplier chooses which line to use',
          ],
          answer: 1,
          explain: 'Each payment term line creates one installment with its own due date, amount and discounts.',
        },
        {
          q: 'Which bank account is an EXTERNAL bank account from Sunny’s point of view?',
          options: [
            'Sunny Operating Account at Big River Bank',
            'Lemon Grove Farms’ bank account where Sunny sends EFT payments',
            'Any account with check stock',
            'The cash account 1110 in the chart of accounts',
          ],
          answer: 1,
          explain: 'Internal accounts belong to Sunny; external accounts belong to others, like suppliers.',
        },
        {
          q: 'Which setup decides the payment file format, grouping of invoices into payments and whether positive pay is produced?',
          options: ['Payment terms', 'Payment process profile', 'Supplier site', 'Pay group'],
          answer: 1,
          explain: 'The payment process profile is the blueprint for how payments are built, formatted, sent and reported.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Payment Terms (Implementing Payables Invoice to Pay)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/payment-terms.html' },
    { title: 'Example of Creating Payment Terms Based on Days', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/example-of-creating-payment-terms-based-on-days.html' },
    { title: 'Invoice Installments', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-installments.html' },
    { title: 'Guidelines for Invoice Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-invoice-options.html' },
    { title: 'Payment Methods', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/payment-methods.html' },
    { title: 'Payment Method Defaulting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/payment-method-defaulting.html' },
    { title: 'Payment Process Profiles', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/payment-process-profiles.html' },
    { title: 'How Bank, Branch, and Account Components Work Together', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/how-bank-branch-and-account-components-work-together.html' },
    { title: 'Set Up a Supplier’s Bank Account', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/set-up-a-supplier-s-bank-account.html' },
    { title: 'Check Payments (Implementing Payables Invoice to Pay)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/set-up-and-make-check-payments.html' },
    { title: 'Guidelines for Common Options for Payables and Procurement', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-common-options-for-payables-and-procurement.html' },
    { title: 'Guidelines for Payment Accounting Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-payment-accounting-options.html' },
  ],
};
