export default {
  slug: 'prepayments',
  title: 'Prepayments: Paying in Advance',
  minutes: 18,
  summary:
    'Sometimes a supplier wants money before delivering. Learn how Oracle Fusion Payables handles a prepayment as its own invoice type, the difference between temporary and permanent prepayments, how to pay and apply one, and how the 1410 Prepayments to Suppliers account moves, using Sunny’s $1,000 deposit for a $6,000 lemonade stand.',
  objectives: [
    'Explain what a prepayment is and why it is recorded as an asset, not an expense',
    'Tell the difference between temporary and permanent prepayments',
    'Follow the steps to create, pay and apply a prepayment, including inclusive vs. exclusive application',
    'Write the journal entries for a prepayment from creation to application',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The birthday cake deposit',
      html: `<p>You order a big birthday cake from the bakery. The baker says: "Give me $10 now so I know you’re serious. When you pick up the cake, you pay the rest."</p>
<p>That $10 is not spent on nothing. It is still <em>your</em> money, sitting with the baker, waiting to become part of the cake price. On pickup day the cake costs $40, you remind the baker about your $10, and you pay only $30.</p>
<p>In business this is called a <span class="hl">prepayment</span>: money you pay a supplier <strong>before</strong> you receive the goods or services, which you later <strong>apply</strong> to the real bill.</p>`,
    },
    {
      type: 'text',
      heading: 'What a prepayment is in Oracle Fusion',
      html: `<p>In Oracle Fusion Payables, a prepayment is a <strong>type of invoice</strong>: you create an invoice with the invoice type <strong>Prepayment</strong>. It goes through the usual life of an invoice (validation, approval, accounting) and is then <strong>paid</strong> like any other invoice, usually in a Payment Process Request.</p>
<p>Two important rules:</p>
<ul>
<li><strong>A prepayment must be fully paid before it can be applied.</strong> A validated but unpaid (or only partly paid) prepayment shows a status of Unpaid and can't reduce any invoice yet.</li>
<li>When a prepayment is accounted, the debit goes to a <strong>prepayment account</strong> (an asset), not to an expense. At Sunny that is <code>1410 Prepayments to Suppliers</code>. The default comes from the <em>Prepayment</em> default distribution on the <strong>Manage Common Options for Payables and Procurement</strong> page, unless the supplier site has its own.</li>
</ul>
<p>Why an asset? Because Sunny hasn't received anything yet. The $1,000 is a claim on the supplier: "you owe us $1,000 worth of stand". It only becomes a cost (or here, part of a fixed asset) when the real invoice arrives.</p>`,
    },
    {
      type: 'table',
      caption: 'Temporary vs. permanent prepayments',
      headers: ['', 'Temporary', 'Permanent'],
      rows: [
        ['Setting', '<kbd>Allow prepayment application</kbd> is ON', '<kbd>Allow prepayment application</kbd> is OFF'],
        ['Can it be applied to invoices?', 'Yes, to reduce later invoices', 'No'],
        ['Typical example', 'A deposit to a builder or a catering deposit to a hotel, before their invoice arrives', 'A lease or security deposit you don’t expect an invoice for'],
        ['Can you switch it?', 'Choose carefully when you create it', 'No. Permanent can’t go back to temporary; cancel it and create a new one'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Temporary or permanent?',
      instructions: `<p>For each advance payment, decide whether Ava should set it up as a temporary prepayment (Allow prepayment application on) or a permanent one (off).</p>`,
      categories: ['Temporary', 'Permanent'],
      items: [
        { text: '$1,000 deposit to Stand Builders LLC before they build the stand', answer: 'Temporary' },
        { text: 'Security deposit on the kitchen lease, returned only when Sunny moves out', answer: 'Permanent' },
        { text: 'Catering deposit to a hotel for Sunny’s summer party; the hotel will invoice later', answer: 'Temporary' },
        { text: 'Advance to Lemon Grove Farms for next month’s lemons', answer: 'Temporary' },
        { text: 'A refundable deposit for a rented delivery van, with no invoice expected', answer: 'Permanent' },
      ],
      explain: `<p>If a later invoice will "use up" the advance, it is temporary and can be applied. If no invoice will come (deposits you get back at the end), it is permanent and can’t be applied.</p>`,
    },
    {
      type: 'flow',
      title: 'The prepayment journey',
      steps: [
        { icon: '📝', label: 'Create', detail: 'Ava enters an invoice of type Prepayment and keeps Allow prepayment application on.' },
        { icon: '✅', label: 'Validate & approve', detail: 'Same checks as any invoice. Status stays Unpaid until fully paid.' },
        { icon: '💸', label: 'Pay', detail: 'Paid through a Payment Process Request or a single payment.' },
        { icon: '⏳', label: 'Available', detail: 'Once paid (and on or after any settlement date) it can be applied.' },
        { icon: '🧾', label: 'Real invoice arrives', detail: 'The supplier’s standard invoice for the goods or services.' },
        { icon: '🔗', label: 'Apply', detail: 'The prepayment reduces the amount still due on the invoice.' },
        { icon: '💰', label: 'Pay the rest', detail: 'Only the remaining balance is paid.' },
      ],
    },
    {
      type: 'example',
      title: 'Sunny’s new lemonade stand: a $1,000 deposit',
      html: `<p>Sunny orders a brand-new lemonade stand from <strong>Stand Builders LLC</strong> for <strong>$6,000</strong>. Stand Builders asks for a <strong>$1,000 deposit</strong> before they start building. Leo’s purchase order is for $6,000.</p>`,
      steps: [
        '<strong>March 2:</strong> Ava creates invoice <code>SB-DEP-01</code>, type <strong>Prepayment</strong>, $1,000, supplier Stand Builders LLC. The distribution defaults to <code>101-100-1410-000-000</code> Prepayments to Suppliers. <em>Allow prepayment application</em> stays on, so this is a <strong>temporary</strong> prepayment.',
        'Ava validates it; it is approved and accounted. Its status is Unpaid.',
        '<strong>March 4:</strong> The deposit is paid in the weekly payment run. The prepayment is now available to apply.',
        '<strong>April 15:</strong> The stand is delivered. Stand Builders sends invoice <code>SB-2219</code> for the full $6,000.',
        'Ava enters the standard invoice. Because Sunny turned on <em>Show available prepayments during invoice entry</em>, Oracle reminds Ava that SB-DEP-01 is available.',
        'Ava applies the $1,000 prepayment. Oracle adds a prepayment application line to the invoice, and the amount still to pay drops to $5,000.',
        'The $5,000 is paid on the due date.',
      ],
      result: `<p>Stand Builders received $6,000 in total, the stand is recorded at $6,000, and the 1410 balance is back to zero.</p>`,
    },
    {
      type: 'journal',
      title: '1. Prepayment invoice validated and accounted (event: Prepayment Validated)',
      lines: [
        { account: '1410 Prepayments to Suppliers (101-100-1410-000-000)', debit: 1000, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 0, credit: 1000 },
      ],
    },
    {
      type: 'journal',
      title: '2. Deposit paid (event: Payment Created)',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 1000, credit: 0 },
        { account: '1110 Cash – Big River Bank (101-100-1110-000-000)', debit: 0, credit: 1000 },
      ],
      note: `<p>After steps 1 and 2: cash is down $1,000, and Sunny holds a $1,000 prepayment asset. Nothing is owed yet.</p>`,
    },
    {
      type: 'journal',
      title: '3. Stand invoice validated and accounted (event: Invoice Validated)',
      lines: [
        { account: '1510 Equipment (Fixed Assets) (101-200-1510-000-000)', debit: 6000, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 0, credit: 6000 },
      ],
      note: `<p>To keep the story simple we charge the stand directly to 1510. In real life the invoice line usually goes to an asset clearing account and is sent to Fixed Assets, as you will see in the Assets module.</p>`,
    },
    {
      type: 'journal',
      title: '4. Prepayment applied to the stand invoice (event: Prepayment Applied)',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 1000, credit: 0 },
        { account: '1410 Prepayments to Suppliers (101-100-1410-000-000)', debit: 0, credit: 1000 },
      ],
      note: `<p>The deposit is "used up": the liability drops by $1,000 and the prepayment asset is cleared.</p>`,
    },
    {
      type: 'journal',
      title: '5. Remaining $5,000 paid (event: Payment Created)',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 5000, credit: 0 },
        { account: '1110 Cash – Big River Bank (101-100-1110-000-000)', debit: 0, credit: 5000 },
      ],
      note: `<p>Totals: cash out $6,000, equipment $6,000, 1410 and 2110 for Stand Builders both back to zero.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: apply a prepayment',
      instructions: `<p>Last month Sunny paid Cup &amp; Straw Supply a <strong>$300</strong> prepayment. Today Ava enters their <strong>$800</strong> invoice for cups and applies the full prepayment. Build the journal for the <em>Prepayment Applied</em> event only (the invoice itself is already accounted).</p>`,
      accounts: ['1410 Prepayments to Suppliers', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '5130 Cups and Straws Cost'],
      answer: [
        { account: '2110 Accounts Payable – Trade', debit: 300, credit: 0 },
        { account: '1410 Prepayments to Suppliers', debit: 0, credit: 300 },
      ],
      explain: `<p>Applying the prepayment reduces what Sunny still owes (debit 2110) and uses up the prepayment asset (credit 1410). No cash moves at application; the remaining $500 is paid later.</p>`,
    },
    {
      type: 'text',
      heading: 'Inclusive vs. exclusive: did the supplier already subtract the deposit?',
      html: `<p>Suppliers send final invoices in two different styles, and Oracle handles both:</p>
<ul>
<li><strong>Exclusive</strong> (the supplier ignores the deposit): the invoice says $6,000. Ava enters $6,000 and applies the prepayment, which reduces the unpaid amount to $5,000. This is what happened in our example.</li>
<li><strong>Inclusive</strong> (the supplier already subtracted it): the invoice says "Stand $6,000, less deposit $1,000, total due $5,000". Ava enters the invoice for $5,000 and, when applying the prepayment, marks it <kbd>Included on Invoice</kbd>. The item line is $6,000 and the prepayment line −$1,000, so the invoice total matches the supplier’s paper.</li>
</ul>
<p>Either way, Sunny pays $5,000 more and the accounting ends the same.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: apply the stand deposit',
      instructions: `<p>This is a simplified practice screen, not Oracle’s real page. Ava is applying a prepayment to Stand Builders’ final invoice SB-2219. The supplier’s invoice shows the full $6,000 and does <strong>not</strong> mention the deposit. Two prepayments exist: SB-DEP-01 ($1,000, fully paid) and SB-DEP-02 ($500, validated but not yet paid).</p>`,
      formTitle: 'Apply Prepayment (practice)',
      fields: [
        { label: 'Invoice', type: 'text', given: 'SB-2219 – Stand Builders LLC – $6,000.00' },
        { label: 'Prepayment to apply', type: 'select', options: ['SB-DEP-01', 'SB-DEP-02'], answer: 'SB-DEP-01', hint: 'Only a fully paid prepayment can be applied' },
        { label: 'Amount to apply', type: 'number', answer: 1000 },
        { label: 'Included on invoice?', type: 'select', options: ['Yes', 'No'], answer: 'No' },
        { label: 'Remaining amount to pay on SB-2219', type: 'number', answer: 5000 },
      ],
      explain: `<p>SB-DEP-02 isn’t fully paid, so it can’t be applied yet. The supplier didn’t subtract the deposit on their invoice, so the application is exclusive (Included on invoice = No), and the unpaid amount drops from $6,000 to $5,000.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: prepayment rules worth knowing',
      html: `<ul>
<li>Prepayment options sit on the <strong>Manage Invoice Options</strong> page: default <em>Payment terms</em> for prepayments, <em>Settlement days</em> (you can’t apply a prepayment before its settlement date), <em>Use distribution from purchase order</em>, and <em>Show available prepayments during invoice entry</em>.</li>
<li>A prepayment can be <strong>matched to a PO</strong>. Then it can only be applied to an invoice that has at least one line matched to the same PO, and PO quantities update when it is applied.</li>
<li>Applied by mistake? You can <strong>unapply</strong> a prepayment, and it becomes available again for another invoice. The action on the invoice is usually labelled along the lines of applying or unapplying prepayments.</li>
<li>You can’t void the payment of a prepayment that is already applied. Unapply first, then void.</li>
<li>The <strong>Invoices landing page</strong> has a <strong>Prepayments</strong> infotile showing available prepayments in aging buckets, and the <strong>Prepayment Remittance Notice</strong> report lists prepayments applied to supplier invoices.</li>
</ul>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: create a prepayment',
      items: [
        'Go to <kbd>Payables</kbd> > <kbd>Invoices</kbd> and choose <kbd>Create Invoice</kbd> from the Tasks panel.',
        'Enter the business unit (Sunny US BU), supplier (Stand Builders LLC) and site, invoice number and amount ($1,000).',
        'Set <strong>Type</strong> to <kbd>Prepayment</kbd>.',
        'Check that the prepayment option <kbd>Allow prepayment application</kbd> is selected (temporary prepayment).',
        'Add the line; the distribution should default to the prepayment account (1410). Save, then validate the invoice.',
        'After it is paid, open the final invoice and use the prepayment application action to apply it.',
      ],
      note: `<p>The exact location of the prepayment fields and actions differs between the classic and Redwood invoice pages and by release. Practice only in a test environment.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: chase forgotten prepayments',
      html: `<p>Prepayments are easy to forget. A supplier’s final invoice arrives, someone pays it in full, and the deposit sits in 1410 for months. Then the company has effectively paid twice. Good Payables teams review open prepayments every month (the Prepayments infotile and the 1410 balance are perfect for this) and ask suppliers for the final invoice or a refund for anything old.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Prepayment', def: 'A payment made to a supplier before goods or services are delivered, recorded in Payables as a Prepayment type invoice.' },
        { term: 'Temporary prepayment', def: 'A prepayment that can be applied to later invoices because Allow prepayment application is on.' },
        { term: 'Permanent prepayment', def: 'A prepayment, such as a lease deposit, that cannot be applied to invoices.' },
        { term: 'Apply a prepayment', def: 'Using a paid prepayment to reduce the amount still due on a supplier invoice.' },
        { term: 'Inclusive prepayment', def: 'A prepayment the supplier has already subtracted on their invoice, marked Included on Invoice when applied.' },
        { term: 'Prepayments to Suppliers', def: 'The asset account (1410 at Sunny) that holds money paid in advance until it is applied.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Ava validated a $1,000 prepayment but it hasn’t been paid yet. Can Ava apply it to the $6,000 stand invoice?',
          options: [
            'Yes, any validated prepayment can be applied',
            'No, a prepayment must be fully paid before it can be applied',
            'Yes, but only half of it',
            'Only if the supplier agrees by email',
          ],
          answer: 1,
          explain: 'Oracle requires a prepayment to be fully paid before it can be applied.',
        },
        {
          q: 'When the $1,000 prepayment is accounted, which account is debited at Sunny?',
          options: ['5110 Lemons Cost', '1410 Prepayments to Suppliers', '1110 Cash – Big River Bank', '2120 Received Not Invoiced Accrual'],
          answer: 1,
          explain: 'A prepayment is an asset (a claim on the supplier), so it is debited to 1410 Prepayments to Suppliers.',
        },
        {
          q: 'Sunny pays a $2,000 security deposit on a kitchen lease and expects no invoice to apply it to. What kind of prepayment is this?',
          options: ['Temporary', 'Permanent', 'Inclusive', 'Withholding'],
          answer: 1,
          explain: 'A deposit you won’t apply to an invoice is a permanent prepayment (Allow prepayment application turned off).',
        },
        {
          q: 'The supplier’s invoice says "Total $6,000, less deposit $1,000, amount due $5,000". How should Ava apply the prepayment?',
          options: [
            'As exclusive, entering the invoice for $6,000',
            'As inclusive, marking it Included on Invoice, with the invoice entered for $5,000',
            'Ava should not apply it',
            'Enter two separate invoices',
          ],
          answer: 1,
          explain: 'When the supplier already subtracted the deposit, the prepayment is inclusive, so the invoice total matches the supplier’s $5,000.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Prepayments (Using Payables Invoice to Pay)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/prepayments.html' },
    { title: 'Invoice Types', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-types.html' },
    { title: 'Can I change a permanent prepayment invoice to temporary?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/can-i-change-a-permanent-prepayment-invoice-to-temporary.html' },
    { title: 'Can I match a prepayment to a purchase order?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/can-i-match-a-prepayment-to-a-purchase-order.html' },
    { title: 'Why is a partially paid prepayment invoice displayed as unpaid?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/why-did-the-status-of-a-prepayment-invoice-be-displayed-as.html' },
    { title: 'Guidelines for Invoice Options (Prepayments)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-invoice-options.html' },
    { title: 'Default Distributions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/default-distributions.html' },
    { title: 'Payment Actions, Types, and Statuses', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payment-actions-types-and-statuses.html' },
    { title: 'Invoices Landing Page', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/introducing-the-invoices-landing-page.html' },
    { title: 'How Invoices and Payments Are Accounted', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoices-and-payments-are-accounted.html' },
  ],
};
