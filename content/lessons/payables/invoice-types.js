export default {
  slug: 'invoice-types',
  title: 'Kinds of Invoices',
  minutes: 15,
  summary:
    'Not every supplier document is a normal bill. Oracle Fusion Payables has standard invoices, credit and debit memos, prepayments, withholding tax and interest invoices, invoice requests from the Supplier Portal, and payment requests — plus a quick way to create recurring invoices.',
  objectives: [
    'List the invoice types Oracle Fusion Payables supports and say when each is used',
    'Explain the difference between a credit memo and a debit memo',
    'Recognize which invoice types are created automatically by Oracle',
    'Describe how recurring invoices and invoice corrections work',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Different notes in your school bag',
      html: `<p>Your school sends home lots of different papers. A <strong>bill</strong> for the school trip (“please pay $20”). A <strong>refund note</strong> (“the trip was shorter, here’s $5 back”). A <strong>deposit slip</strong> (“pay $10 now to save your seat, the rest later”). A <strong>late fee</strong> (“you paid late, add $1”).</p>
<p>They are all about money between your family and the school, but each one means something different, and your parents handle each one differently. <span class="hl">Invoice types</span> in Oracle Fusion are the same idea: each type tells the system what the document means, so it can be checked, accounted and paid the right way.</p>`,
    },
    {
      type: 'text',
      heading: 'Why the invoice type matters',
      html: `<p>When Ava creates an invoice, one of the first fields Ava fills in is the <strong>invoice type</strong>. The type decides:</p>
<ul>
<li>whether the amount must be <strong>positive</strong> (we owe more) or <strong>negative</strong> (we owe less),</li>
<li>what <strong>accounting</strong> is created (for example, an expense or a prepaid asset),</li>
<li>how it can be <strong>paid or applied</strong> (a credit memo reduces other payments; a prepayment is paid and later applied to an invoice),</li>
<li>and which <strong>approvals and checks</strong> it goes through.</li>
</ul>
<p>The list of invoice types is kept in a Payables lookup called <code>INVOICE TYPE</code>. Some types Ava can create by hand; others are created automatically by Oracle or arrive from other applications.</p>`,
    },
    {
      type: 'table',
      caption: 'Invoice types in Oracle Fusion Payables (from “Invoice Types”, Using Payables Invoice to Pay)',
      headers: ['Invoice type', 'What it means', 'How it is created', 'Sunny example'],
      rows: [
        ['<strong>Standard</strong>', 'A normal bill from a supplier for goods or services.', 'Entered or imported (positive amount).', 'Lemon Grove Farms bills $500 for 1,000 lemons.'],
        ['<strong>Credit memo</strong>', 'A document <em>from the supplier</em> giving us a credit.', 'Entered or imported (negative amount).', 'Sweet Sugar Co. sends a $20 credit because the sugar arrived late.'],
        ['<strong>Debit memo</strong>', 'A credit we record <em>ourselves</em> when the supplier doesn’t send a credit memo.', 'Entered by AP (negative amount).', 'Sunny returns $25 of damaged cups; Cup & Straw Supply hasn’t sent a credit, so Ava creates a debit memo.'],
        ['<strong>Prepayment</strong>', 'An advance payment to a supplier, applied later to a real invoice.', 'Entered; after validation its status is Unpaid until it is paid.', 'Stand Builders LLC asks for a $3,000 deposit on a $6,000 stand.'],
        ['<strong>Withholding tax</strong>', 'An invoice to a tax authority for tax we withheld from a supplier’s payment.', 'Created automatically (can be manual if the setup allows).', 'Covered in the Taxes and Withholding lesson.'],
        ['<strong>Interest</strong>', 'An invoice for interest owed because we paid a supplier late.', 'Created automatically when interest invoices are enabled.', 'Sunny paid Sweet Sugar Co. 15 days late; Oracle adds a small interest invoice.'],
        ['<strong>Standard invoice request</strong>', 'An invoice without a PO submitted by a supplier in the Supplier Portal, waiting for the requester’s approval.', 'Created by the supplier in Supplier Portal.', 'Stand Builders LLC submits a $90 repair bill without a PO.'],
        ['<strong>Credit memo invoice request</strong>', 'A credit memo without a PO submitted through Supplier Portal, waiting for the requester’s approval.', 'Created by the supplier in Supplier Portal.', 'A supplier submits a goodwill credit online.'],
        ['<strong>Payment request</strong>', 'A request from Expenses or Receivables to pay someone who is <em>not</em> set up as a supplier.', 'Created by Oracle Fusion Expenses or Receivables (or imported).', 'Omar refunds an overpayment to customer Sunshine School.'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Credit memo or debit memo? A trick to remember',
      html: `<p>Both <strong>reduce</strong> what we owe a supplier, and both have negative amounts. The difference is <strong>who wrote the document</strong>:</p>
<ul>
<li><strong>Credit memo</strong> = the <em>supplier</em> sent it (“we credit you $20”).</li>
<li><strong>Debit memo</strong> = <em>we</em> created it, because the supplier didn’t (“we are debiting your account by $25”). Companies usually send the supplier a copy so both sides agree.</li>
</ul>`,
    },
    {
      type: 'journal',
      title: 'Sweet Sugar Co. credit memo for $20 (accounted)',
      lines: [
        { account: '2110 Accounts Payable – Trade', debit: 20, credit: 0 },
        { account: '5120 Sugar Cost', debit: 0, credit: 20 },
      ],
      note: `<p>A credit memo is the mirror of a standard invoice: what we owe goes down, and the cost goes down. It stays “unpaid” until it is used to reduce a payment to the same supplier, so when Ava pays Sweet Sugar Co.’s $200 invoice, the payment can be $180. (This credit was not matched to a PO, so it uses the sugar expense account directly. A matched credit uses the accounts of the matched PO.)</p>`,
    },
    {
      type: 'journal',
      title: 'Stand Builders LLC prepayment invoice for $3,000 (accounted)',
      lines: [
        { account: '1410 Prepayments to Suppliers', debit: 3000, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 3000 },
      ],
      note: `<p>A prepayment is not an expense yet — it is an <strong>asset</strong> (money we have “parked” with the supplier). Oracle requires a prepayment to be fully paid before it can be applied. When the $6,000 stand invoice arrives, Ava applies the $3,000 prepayment so only $3,000 more is paid. The Prepayments lesson covers this in depth.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: account a debit memo',
      instructions: `<p>Sunny returned $25 of damaged cups to Cup & Straw Supply. The supplier agreed but hasn’t sent a credit memo, so Ava enters a <strong>debit memo</strong> for −$25, charged to the cups account. Build the accounting.</p>`,
      accounts: ['5130 Cups and Straws Cost', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '1410 Prepayments to Suppliers', '4110 Lemonade Sales Revenue'],
      answer: [
        { account: '2110 Accounts Payable – Trade', debit: 25, credit: 0 },
        { account: '5130 Cups and Straws Cost', debit: 0, credit: 25 },
      ],
      explain: `<p>A debit memo, like a credit memo, <strong>reduces</strong> what we owe (debit Accounts Payable) and <strong>reduces</strong> the cost (credit the expense). No cash moves now; the $25 will reduce the next payment to Cup & Straw Supply.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Name that invoice type',
      instructions: `<p>Ava’s inbox is full of different documents. Choose the Oracle Fusion invoice type for each one.</p>`,
      categories: ['Standard', 'Credit memo', 'Debit memo', 'Prepayment', 'Payment request'],
      items: [
        { text: 'Lemon Grove Farms bills $500 for 1,000 lemons', answer: 'Standard' },
        { text: 'Sweet Sugar Co. sends a document crediting Sunny $20', answer: 'Credit memo' },
        { text: 'Ava records a $25 reduction by hand because the supplier sent nothing', answer: 'Debit memo' },
        { text: 'Stand Builders LLC asks for a $3,000 deposit before building', answer: 'Prepayment' },
        { text: 'Omar refunds a customer’s overpayment from Receivables', answer: 'Payment request' },
        { text: 'Bright Power Utility’s $150 electricity bill', answer: 'Standard' },
      ],
      explain: `<p>Normal bills are <strong>Standard</strong>. A credit written by the supplier is a <strong>Credit memo</strong>; one written by us is a <strong>Debit memo</strong>. Money paid in advance is a <strong>Prepayment</strong>. Payments to people who aren’t suppliers (customer refunds, expense reports) arrive as <strong>Payment requests</strong>.</p>`,
    },
    {
      type: 'slides',
      title: 'Types Oracle creates for you',
      slides: [
        {
          icon: '🏛️',
          title: 'Withholding tax invoices',
          html: `<p>In some countries (and for some US suppliers), a company must keep back part of a supplier’s payment and send it to the tax authority. When withholding is set up, Oracle calculates it and creates a <strong>Withholding tax</strong> invoice to the tax authority automatically — during validation or at payment, depending on setup.</p>`,
        },
        {
          icon: '⏳',
          title: 'Interest invoices',
          html: `<p>Some laws and contracts require interest when you pay late. If <strong>Create interest invoices</strong> is enabled in the invoice options (and for the supplier), then when an overdue invoice is paid in a payment process request or a quick payment, Oracle calculates the interest and automatically creates (and pays) an <strong>Interest</strong> invoice, as long as it reaches the minimum interest amount. Interest rates are kept with the Manage Interest Rates task.</p>`,
        },
        {
          icon: '🔁',
          title: 'Payment requests',
          html: `<p>Sometimes a company must pay someone who is not a supplier: a customer refund from Receivables, or an employee expense report from Expenses. These arrive in Payables as <strong>payment requests</strong>, so the same payment process can pay them. External payment requests can also be imported for one-time payments.</p>`,
        },
        {
          icon: '🌐',
          title: 'Invoice requests from the Supplier Portal',
          html: `<p>When a supplier enters an invoice in Supplier Portal <em>and matches it to a PO</em>, it becomes a normal Standard invoice or Credit memo. When they enter one <em>without a PO</em>, it becomes an <strong>invoice request</strong> that the requester must approve first. Once approved, it turns into a Standard invoice or Credit memo.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Who creates it?',
      instructions: `<p>Some invoice types are typed in by AP; others are created automatically or come from another place. Sort them.</p>`,
      categories: ['Entered by AP (or imported)', 'Created automatically by Oracle', 'Comes from a supplier or another application'],
      items: [
        { text: 'Standard', answer: 'Entered by AP (or imported)' },
        { text: 'Debit memo', answer: 'Entered by AP (or imported)' },
        { text: 'Interest', answer: 'Created automatically by Oracle' },
        { text: 'Withholding tax (usual setup)', answer: 'Created automatically by Oracle' },
        { text: 'Standard invoice request', answer: 'Comes from a supplier or another application' },
        { text: 'Payment request', answer: 'Comes from a supplier or another application' },
      ],
      explain: `<p>Interest and withholding tax invoices are generated by Oracle from its rules (withholding invoices can be manual only if allowed). Invoice requests are created by suppliers in the Supplier Portal, and payment requests come from Expenses or Receivables.</p>`,
    },
    {
      type: 'text',
      heading: 'Recurring invoices: the same bill every month',
      html: `<p>Some bills are the same every month and the supplier may not even send one — rent is the classic example. Instead of typing twelve invoices, Oracle has a <strong>Create Recurring Invoices</strong> task on the Invoices landing page. It opens a spreadsheet where you enter one template: business unit, invoice number prefix, amount, supplier and site, currency, a <strong>calendar</strong>, a <strong>from period</strong> and <strong>to period</strong>, and usually a <strong>distribution set</strong> (a saved rule for which accounts to charge). Oracle then creates one invoice for each period.</p>
<p>“Recurring” is <em>not</em> a separate invoice type: each invoice it creates is a normal Standard invoice. They still need to be validated (and approved, if required) before they can be paid.</p>`,
    },
    {
      type: 'example',
      title: 'Setting up Sunny’s monthly rent',
      html: `<p>Sunny Lemonade US Inc. rents its kitchen and office for <strong>$1,000 a month</strong> from January to December 2026. The landlord is set up as a supplier but never sends invoices.</p>`,
      steps: [
        'Jordan has already created a <strong>distribution set</strong> called “Rent Split”: 70% to <code>101-200-6110-000-000</code> (Kitchen rent) and 30% to <code>101-100-6110-000-000</code> (Administration rent).',
        'Ava opens the <strong>Create Recurring Invoices</strong> task from the Invoices landing page. The spreadsheet opens and Ava signs in.',
        'Ava enters: business unit Sunny US BU, invoice number “RENT”, amount 1,000, the landlord supplier and site, currency USD, calendar Monthly, from period Jan-26, to period Dec-26, distribution set Rent Split.',
        'Ava clicks <strong>Create Recurring Invoices</strong> and checks the row status column for success.',
        'Oracle creates 12 standard invoices, one per month. Each month Ava validates that month’s invoice so it can be paid.',
      ],
      result: `<p>One spreadsheet row replaced twelve manual invoices, and every month is charged to the same accounts with the same 70/30 split.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Check the recurring rent',
      instructions: `<p>Use the rent example above (Sunny pays $1,000 a month from Jan-26 to Dec-26, split 70% Kitchen and 30% Administration by the “Rent Split” distribution set).</p>`,
      html: `<p>Number of invoices created: {{}}<br>Kitchen rent charged each month ($): {{}}<br>Administration rent charged each month ($): {{}}<br>Total rent invoiced for the year ($): {{}}</p>`,
      blanks: [
        { answer: 12 },
        { answer: 700 },
        { answer: 300 },
        { answer: 12000 },
      ],
      explain: `<p>One invoice per period from Jan-26 to Dec-26 = <strong>12</strong>. The 100% distribution set splits each $1,000 into <strong>$700</strong> (70%) and <strong>$300</strong> (30%). Over the year: 12 × $1,000 = <strong>$12,000</strong>.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: fixing an invoice with a correction',
      html: `<p>What if a PO-matched invoice was wrong? Oracle supports <strong>invoice corrections</strong>. A correction is a new document for just the <em>difference</em>:</p>
<ul>
<li><strong>Price correction</strong> – the unit price changes (for a price decrease, use a credit or debit memo; for an increase, a standard invoice). Billed quantity on the PO doesn’t change.</li>
<li><strong>Quantity correction</strong> – the quantity changes, but not the unit price.</li>
<li><strong>Amount correction</strong> – for amount-based or unmatched lines.</li>
</ul>
<p>Example: lemons were billed at $0.55 but the agreed price was $0.50. Lemon Grove Farms sends a credit memo, and Ava enters it as a <em>price correction</em> of −$0.05 for 1,000 lemons = −$50. You will use this in the Matching lesson.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: look at invoice types',
      items: [
        'Go to <kbd>Payables</kbd> &gt; <kbd>Invoices</kbd> and open the <kbd>Create Invoice</kbd> task.',
        'In the invoice header, open the <kbd>Type</kbd> list and look at the choices available to you (for example Standard, Credit memo, Debit memo, Prepayment).',
        'Notice that automatic types such as Interest are not normally in the list — Oracle creates those itself.',
        'Cancel without saving. Then use the <kbd>Manage Invoices</kbd> search to find existing invoices of one type, such as credit memos.',
      ],
      note: `<p>Which types appear depends on your release, your company’s setup (for example, manual withholding tax invoices must be allowed in the withholding options) and your role. Labels can differ slightly on Redwood pages.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: credits get forgotten',
      html: `<p>A common audit finding is old, unused credit memos and debit memos sitting in Payables for months. They are money the supplier owes back to us! Good AP teams review open credits regularly and make sure they are applied to the next payment or refunded by the supplier.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Standard invoice', def: 'A normal supplier bill for goods or services, with a positive amount.' },
        { term: 'Credit memo', def: 'A negative invoice from the supplier that reduces what we owe.' },
        { term: 'Debit memo', def: 'A negative invoice we create ourselves to reduce what we owe when the supplier has not sent a credit memo.' },
        { term: 'Prepayment', def: 'An advance payment to a supplier that is recorded as an asset and later applied to an invoice.' },
        { term: 'Payment request', def: 'A request from Expenses or Receivables to pay someone who is not set up as a supplier.' },
        { term: 'Recurring invoice', def: 'One of a series of standard invoices created automatically for each period from a single template, such as monthly rent.' },
        { term: 'Invoice correction', def: 'A document for only the difference in price, quantity or amount on an earlier invoice.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Cup & Straw Supply agreed to take back damaged cups, but hasn’t sent any credit document. What should Ava create?',
          options: ['A credit memo', 'A debit memo', 'An interest invoice', 'A payment request'],
          answer: 1,
          explain: 'A debit memo is the negative invoice we create ourselves when the supplier doesn’t send a credit memo.',
        },
        {
          q: 'Where does a prepayment go in the books when it is accounted?',
          options: ['An expense account', 'A revenue account', 'An asset account such as 1410 Prepayments to Suppliers', 'Owner’s equity'],
          answer: 2,
          explain: 'Money paid in advance is an asset until the goods or services arrive and the prepayment is applied to an invoice.',
        },
        {
          q: 'Omar needs to refund Sunshine School, a customer that is not a supplier. Which invoice type will Payables use?',
          options: ['Standard', 'Payment request', 'Withholding tax', 'Debit memo'],
          answer: 1,
          explain: 'Payment requests come from Receivables (refunds) or Expenses to pay people who are not suppliers.',
        },
        {
          q: 'Which statement about recurring invoices is TRUE?',
          options: [
            '“Recurring” is a special invoice type that never needs validation',
            'The Create Recurring Invoices task creates one standard invoice per period from one template',
            'Recurring invoices can only be created by suppliers',
            'Recurring invoices are always prepayments',
          ],
          answer: 1,
          explain: 'The spreadsheet creates normal Standard invoices for each period between the from and to periods; they are validated like any other invoice.',
        },
        {
          q: 'A supplier enters an invoice in Supplier Portal without a PO. What does it become first?',
          options: ['A Standard invoice ready to pay', 'A Standard invoice request that the requester must approve', 'A Prepayment', 'An Interest invoice'],
          answer: 1,
          explain: 'Unmatched portal invoices become invoice requests. After the requester approves, they become Standard invoices or Credit memos.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Invoice Types (Using Payables Invoice to Pay, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-types.html' },
    { title: 'Example of Creating Recurring Invoices', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/example-of-creating-recurring-invoices.html' },
    { title: 'Interest Invoices', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/interest-invoices.html' },
    { title: 'Prepayments', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/prepayments.html' },
    { title: 'Invoice Corrections', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-corrections.html' },
    { title: 'What’s a self-service invoice?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/what-s-a-self-service-invoice.html' },
    { title: 'Payment Requests (Implementing Payables Invoice to Pay)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/payment-requests.html' },
    { title: 'Guidelines For Invoice Options (interest and prepayment options)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-invoice-options.html' },
    { title: 'Distribution Sets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/distribution-sets.html' },
    { title: 'Create an Invoice (Invoices REST API – InvoiceType attribute)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/farfa/op-invoices-post.html' },
  ],
};
