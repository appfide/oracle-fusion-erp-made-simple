export default {
  slug: 'procure-to-pay',
  title: 'The Procure-to-Pay Journey',
  minutes: 16,
  summary:
    'Follow 1,000 lemons from “we need lemons” to “the supplier is paid and the books are updated”. See every step of procure-to-pay, which Oracle Fusion application handles it, and how purchase-order invoices differ from non-PO bills like electricity.',
  objectives: [
    'List the steps of procure-to-pay in order, from requisition to General Ledger',
    'Name the Oracle Fusion application and the person responsible for each step',
    'Explain the accounting created at receipt, invoice and payment',
    'Tell the difference between PO-based invoices and non-PO invoices, and how each is checked',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Buying a football for the school team',
      html: `<p>Your school team needs a new football. Here is what happens:</p>
<ol>
<li>The coach writes a note: <em>“Please buy one football.”</em> (a <strong>request</strong>)</li>
<li>The head teacher signs it. (an <strong>approval</strong>)</li>
<li>The school office phones the sports shop and orders it. (an <strong>order</strong>)</li>
<li>The ball arrives and the coach checks it is the right one. (a <strong>receipt</strong>)</li>
<li>The shop sends a bill. (an <strong>invoice</strong>)</li>
<li>The office checks the bill matches the order and the delivery, then pays. (<strong>match</strong> and <strong>pay</strong>)</li>
<li>The school writes it in its money book. (<strong>accounting</strong>)</li>
</ol>
<p>Companies do exactly the same thing, just with more people, more rules and a computer system. This whole journey is called <span class="hl">procure-to-pay</span> (often written <strong>P2P</strong>): from <em>procuring</em> (getting) something to <em>paying</em> for it.</p>`,
    },
    {
      type: 'text',
      heading: 'Why one journey, many teams?',
      html: `<p>You met procure-to-pay briefly in the Big Journeys lesson. Now we zoom in, because <strong>Accounts Payable sits near the end of the journey</strong> and depends on everything that happened before. If the purchase order has the wrong price or the receipt was never entered, Ava’s invoice will get stuck.</p>
<p>The magic of an ERP is that each team does its own step <strong>in the same system</strong>. Leo’s purchase order, Noah’s receipt and Ava’s invoice are linked together, so the system can compare them automatically. Nobody re-types the order on the invoice.</p>`,
    },
    {
      type: 'flow',
      title: 'Procure-to-pay at Sunny Lemonade, step by step',
      steps: [
        { icon: '📝', label: '1. Requisition', detail: 'Noah asks for 1,000 lemons in Self Service Procurement.' },
        { icon: '👍', label: '2. Requisition approval', detail: 'Noah’s manager approves the request.' },
        { icon: '📄', label: '3. Purchase order', detail: 'Leo turns it into a purchase order (PO) to Lemon Grove Farms: 1,000 lemons at $0.50 = $500, Net 30.' },
        { icon: '📦', label: '4. Receipt', detail: 'The lemons arrive. Noah records a receipt for 1,000 lemons.' },
        { icon: '🧾', label: '5. Invoice', detail: 'Lemon Grove Farms sends a $500 invoice. Ava enters it in Payables.' },
        { icon: '🔗', label: '6. Match', detail: 'Ava matches the invoice to the PO (and receipt).' },
        { icon: '✅', label: '7. Validate', detail: 'Oracle checks quantities, prices, accounts and tax; holds anything odd.' },
        { icon: '🙋', label: '8. Approve', detail: 'If invoice approval is on, the workflow routes it to approvers.' },
        { icon: '📒', label: '9. Account', detail: 'Accounting entries are created for the invoice.' },
        { icon: '💸', label: '10. Pay', detail: 'On the due date, Ava pays in a payment run.' },
        { icon: '🏛️', label: '11. General Ledger', detail: 'Journals are transferred to the ledger; Priya reviews and closes the month.' },
      ],
      note: `<p>Steps 1–4 belong to Procurement and receiving. Steps 5–10 belong to Payables. Step 11 belongs to the General Ledger. Mia in Treasury also reconciles the payment with the bank statement in Cash Management.</p>`,
    },
    {
      type: 'table',
      caption: 'Who does what, and in which Oracle Fusion application',
      headers: ['Step', 'Person at Sunny', 'Oracle Fusion application', 'Key document'],
      rows: [
        ['Request', 'Noah (requester)', 'Self Service Procurement', 'Requisition'],
        ['Order', 'Leo (buyer)', 'Purchasing (part of Oracle Procurement)', 'Purchase order (PO)'],
        ['Supplier sees the order', 'Lemon Grove Farms', 'Supplier Portal, email or B2B messaging', 'PO'],
        ['Receive', 'Noah (receiver)', 'Receiving (part of Oracle Supply Chain Management)', 'Receipt'],
        ['Invoice, match, validate, approve', 'Ava, plus approvers', 'Payables (Invoices work area)', 'Supplier invoice'],
        ['Account', 'Ava / Priya', 'Payables with Subledger Accounting', 'Accounting entries (journals)'],
        ['Pay', 'Ava, with Mia', 'Payables (Payments work area) and Oracle Payments', 'Payment'],
        ['Reconcile bank', 'Mia', 'Cash Management', 'Bank statement'],
        ['Report and close', 'Priya', 'General Ledger', 'Journals and balances'],
      ],
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the procure-to-pay journey in order',
      instructions: `<p>Sunny needs 1,000 sugar packets from Sweet Sugar Co. Drag the steps into the right order.</p>`,
      items: [
        'Noah creates a requisition',
        'The requisition is approved',
        'Leo creates a purchase order',
        'Noah records the receipt',
        'Ava enters the invoice and matches it',
        'The invoice is validated (and approved if needed)',
        'Accounting is created and the invoice is paid',
        'Journals reach the General Ledger',
      ],
      explain: `<p>Request → approve → order → receive → invoice and match → validate/approve → account and pay → General Ledger. Each step depends on the one before: Ava can’t match to a PO that doesn’t exist, and a 3-way match needs the receipt.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Which Oracle application does it?',
      instructions: `<p>Match each step to the Oracle Fusion application where it happens.</p>`,
      pairs: [
        { left: 'Noah asks for lemons', right: 'Self Service Procurement' },
        { left: 'Leo sends the order to Lemon Grove Farms', right: 'Purchasing' },
        { left: 'Ava validates the supplier invoice', right: 'Payables' },
        { left: 'Mia matches the payment to the bank statement', right: 'Cash Management' },
        { left: 'Priya reviews balances and closes the month', right: 'General Ledger' },
      ],
      explain: `<p>Requests start in <strong>Self Service Procurement</strong>, orders in <strong>Purchasing</strong>, invoices and payments in <strong>Payables</strong>, bank reconciliation in <strong>Cash Management</strong>, and the final books in the <strong>General Ledger</strong> — all in one shared system.</p>`,
    },
    {
      type: 'text',
      heading: 'Following the money: accounting along the journey',
      html: `<p>When does Sunny actually owe Lemon Grove Farms? Accountants say: <strong>as soon as we receive the goods</strong>, even if the invoice has not arrived yet. Oracle Fusion handles this with an option called <strong>Accrue Expense Items</strong> on the <strong>Manage Common Options for Payables and Procurement</strong> page:</p>
<ul>
<li><strong>At Receipt</strong> – an accrual (a “we owe it but have no bill yet” entry) is created the moment the receipt is recorded. This is also called <em>perpetual accrual</em>. Inventory items are always accrued at receipt.</li>
<li><strong>Period End</strong> – no entry at receipt. Instead, at month end, Oracle creates accruals for all receipts that still have no invoice, and reverses them next month.</li>
</ul>
<p>Sunny accrues lemons <strong>at receipt</strong>. Watch the three entries below. Notice how the “received not invoiced” account fills up and then empties, and how Accounts Payable fills up and then empties. The detailed rules are in the Accounting for Invoices lesson.</p>`,
    },
    {
      type: 'journal',
      title: 'Entry 1 – Noah records the receipt (accrue at receipt)',
      lines: [
        { account: '5110 Lemons Cost', debit: 500, credit: 0 },
        { account: '2120 Received Not Invoiced Accrual', debit: 0, credit: 500 },
      ],
      note: `<p>The lemons are here, so the cost is recognized now. We owe $500 but have no invoice yet, so it sits in the accrual account. This entry comes from receipt accounting, not from Payables.</p>`,
    },
    {
      type: 'journal',
      title: 'Entry 2 – Ava’s matched invoice is accounted',
      lines: [
        { account: '2120 Received Not Invoiced Accrual', debit: 500, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 500 },
      ],
      note: `<p>The invoice turns the “we owe it, no bill yet” into a real bill. The accrual is cleared and the supplier liability is recorded.</p>`,
    },
    {
      type: 'journal',
      title: 'Entry 3 – Ava pays on day 30',
      lines: [
        { account: '2110 Accounts Payable – Trade', debit: 500, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 500 },
      ],
      note: `<p>The liability disappears and cash goes down. Over the three entries, the only lasting effect is: lemons cost $500 and cash went down $500.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: account the sugar invoice',
      instructions: `<p>Sweet Sugar Co. delivered $200 of sugar. Sunny accrues at receipt, so when Noah received the sugar, Oracle recorded: debit 5120 Sugar Cost $200, credit 2120 Received Not Invoiced Accrual $200. Now Ava’s matched $200 invoice is accounted. Build that entry.</p>`,
      accounts: ['5120 Sugar Cost', '2120 Received Not Invoiced Accrual', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '1410 Prepayments to Suppliers'],
      answer: [
        { account: '2120 Received Not Invoiced Accrual', debit: 200, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 200 },
      ],
      explain: `<p>The cost was already recognized at receipt, so the invoice doesn’t debit Sugar Cost again (that would count it twice!). Instead it clears the accrual and records the real supplier liability. Cash moves only later, when Ava pays.</p>`,
    },
    {
      type: 'text',
      heading: 'PO invoices vs. non-PO invoices',
      html: `<p>Not every bill starts with a purchase order.</p>
<ul>
<li><strong>PO-based (matched) invoices</strong> – for goods and services that were ordered through Procurement, like lemons, sugar and cups. Ava <strong>matches</strong> the invoice to the PO, and Oracle copies the lines, prices and accounts from the PO. The system can then compare ordered, received and billed amounts automatically. Because the spending was already approved on the requisition and PO, many companies don’t require a second invoice approval for matched invoices.</li>
<li><strong>Non-PO (unmatched) invoices</strong> – for bills that don’t fit the ordering process: electricity, water, rent, phone bills, government fees, a one-off repair. There is no PO to compare against, so Ava (or a default rule) must choose the right <strong>expense account</strong>, and the invoice usually needs <strong>approval</strong> from a manager to prove the spending is real.</li>
</ul>
<p>Oracle supports both. It also lets a company insist on POs for certain suppliers: if the <strong>Hold unmatched invoices</strong> option is turned on for a supplier site, any invoice that isn’t matched gets a <strong>Matching Required</strong> hold. This is a common control: “no PO, no pay”.</p>`,
    },
    {
      type: 'example',
      title: 'Two bills on the same day',
      html: `<p>On 5 March, Ava receives two invoices.</p>`,
      steps: [
        '<strong>Lemon Grove Farms, $500.</strong> It quotes PO 2001. Ava enters the PO number, and Oracle fills in the supplier, the legal entity and the PO lines. Ava matches 1,000 lemons at $0.50. The accounts come from the PO. Validation finds that the PO, receipt and invoice all agree. No approval is needed because the purchase was approved on the requisition.',
        '<strong>Bright Power Utility, $150.</strong> Electricity has no PO. Ava enters the invoice with one line and charges it to <code>101-200-6120-000-000</code> (Sunny US, Kitchen, Electricity). Because there is no PO to check against, the invoice goes to Sam for approval in the invoice approval workflow.',
        'Both invoices are validated, approved where needed, and accounted. Both will be paid on their due dates.',
      ],
      result: `<p>Same Payables team, two different paths: <strong>matched invoices are checked by the system against the PO and receipt</strong>; <strong>unmatched invoices are checked by people</strong> through account coding and approval.</p>`,
    },
    {
      type: 'journal',
      title: 'The electricity bill (non-PO) when accounted',
      lines: [
        { account: '6120 Electricity', debit: 150, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 150 },
      ],
      note: `<p>No receipt and no accrual step: the expense and the liability are recorded directly when the invoice is accounted.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'PO invoice or non-PO invoice?',
      instructions: `<p>For each bill, decide whether Sunny would normally match it to a purchase order or enter it without one.</p>`,
      categories: ['Matched to a PO', 'Non-PO invoice'],
      items: [
        { text: 'Lemon Grove Farms – 1,000 lemons', answer: 'Matched to a PO' },
        { text: 'Bright Power Utility – March electricity', answer: 'Non-PO invoice' },
        { text: 'Cup & Straw Supply – 5,000 cups', answer: 'Matched to a PO' },
        { text: 'Monthly kitchen rent', answer: 'Non-PO invoice' },
        { text: 'Stand Builders LLC – new lemonade stand ordered by Leo', answer: 'Matched to a PO' },
        { text: 'City business licence fee', answer: 'Non-PO invoice' },
      ],
      explain: `<p>Goods and services that are <strong>ordered</strong> through Procurement get a PO and are matched. Utilities, rent, fees and other recurring or official charges usually arrive without a PO, so they need account coding and approval instead.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: seeing the whole journey',
      html: `<p>Because everything is linked, you can follow one purchase from end to end. In Self Service Procurement, the <strong>Requisition Life Cycle</strong> page shows a requisition’s orders, shipments, receipts and invoices on one page. From a Payables invoice you can drill to the matched purchase order, and from a PO you can see what has been received and billed.</p>
<p>The link also works backwards: if an invoice is stuck on a quantity-received or amount-received hold, Oracle can flag the requester’s requisition line so they can use a <kbd>Confirm Receipt</kbd> action to record the delivery — which then allows the hold to be released when the invoice is validated again.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Coming up in this module',
      html: `<p>You’ve now seen the whole map. The next lessons walk through it in detail: <strong>Kinds of Invoices</strong>, <strong>Getting Invoices Into the System</strong>, <strong>Matching</strong>, <strong>Validation and Holds</strong> and <strong>Invoice Approval</strong>. Then the second half of the module covers accounting, payment setup, paying suppliers, prepayments, taxes and closing the month. For the buying side, see the Procurement module’s lessons on requisitions, purchase orders and receiving.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: most AP problems start upstream',
      html: `<p>Experienced AP specialists know that most stuck invoices are not AP’s fault: the PO price was out of date, the receipt was forgotten, or the PO was raised after the invoice arrived (people call this an “after-the-fact PO”). A good AP team works closely with buyers and receivers, and tracks which departments cause the most holds so the root cause can be fixed.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Procure-to-pay (P2P)', def: 'The end-to-end journey from requesting goods or services to paying the supplier and recording it in the ledger.' },
        { term: 'Requisition', def: 'An internal request asking the company to buy something.' },
        { term: 'Purchase order (PO)', def: 'The official order a company sends to a supplier, with items, quantities, prices and terms.' },
        { term: 'Receipt', def: 'A record that ordered goods or services were actually delivered.' },
        { term: 'Accrual', def: 'An accounting entry that records a cost we owe before the supplier’s invoice arrives.' },
        { term: 'Non-PO invoice', def: 'A supplier invoice that is not matched to a purchase order, such as an electricity bill.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which is the correct order of steps?',
          options: [
            'Invoice → Purchase order → Requisition → Receipt → Pay',
            'Requisition → Purchase order → Receipt → Invoice → Match → Validate → Pay',
            'Purchase order → Pay → Receipt → Invoice',
            'Receipt → Requisition → Pay → Invoice',
          ],
          answer: 1,
          explain: 'First someone requests, the buyer orders, goods are received, the invoice arrives and is matched and validated, then it is paid.',
        },
        {
          q: 'Sunny accrues expense items at receipt. What entry happens when Noah records the lemon receipt?',
          options: [
            'Debit Cash, credit Lemons Cost',
            'Debit Lemons Cost, credit Received Not Invoiced Accrual',
            'Debit Accounts Payable, credit Cash',
            'No entry at all',
          ],
          answer: 1,
          explain: 'With accrual at receipt, the cost is recognized when goods arrive and the amount owed sits in the received-not-invoiced accrual until the invoice comes.',
        },
        {
          q: 'Why does an electricity bill usually need manager approval while a PO-matched lemon invoice often does not?',
          options: [
            'Electricity is more expensive',
            'There is no PO or receipt for the system to compare against, so a person must confirm the spending',
            'Oracle cannot pay utility companies',
            'Lemons are free',
          ],
          answer: 1,
          explain: 'Matched invoices are checked against the approved PO and the receipt. Non-PO invoices have no such check, so approval provides the control.',
        },
        {
          q: 'A supplier site has the Hold unmatched invoices option turned on. Ava enters an invoice without matching it. What happens at validation?',
          options: [
            'Nothing',
            'The invoice is deleted',
            'The invoice gets a Matching Required hold',
            'The invoice is paid immediately',
          ],
          answer: 2,
          explain: 'This option enforces “no PO, no pay”: unmatched invoices for that site get a Matching Required hold.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Requisition Life Cycle (Using Procurement, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/requisition-life-cycle.html' },
    { title: 'Purchase Order Life Cycle', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/purchase-order-life-cycle.html' },
    { title: 'How You Resolve Requisition Lines with Invoice Holds', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/how-you-resolve-requisition-lines-with-invoice-holds-in-the-responsive-self-service-procurement-application.html' },
    { title: 'Matching Invoice Lines (Using Payables Invoice to Pay, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/matching-invoice-lines.html' },
    { title: 'Variance Accounts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/variance-accounts.html' },
    { title: 'Considerations for Accruing Expense Items', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/considerations-for-accruing-expense-items.html' },
    { title: 'Guidelines For Invoice Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-invoice-options.html' },
    { title: 'Types of Holds', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/types-of-holds.html' },
    { title: 'How Invoices Are Approved', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoices-are-approved.html' },
  ],
};
