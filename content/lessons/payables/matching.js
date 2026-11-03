export default {
  slug: 'matching',
  title: 'Matching: Did We Get What We Paid For?',
  minutes: 18,
  summary:
    'Matching links a supplier invoice to the purchase order, receipt or consumption advice it bills for, so Sunny only pays for what it ordered and received. Learn 2-way, 3-way and 4-way matching, matching to orders vs receipts, invoice tolerances, and work through a lemon price variance.',
  objectives: [
    'Explain what matching is and why it protects the company',
    'Compare 2-way, 3-way and 4-way matching and the invoice match option (order vs receipt)',
    'Describe invoice tolerances and how they decide whether a matching hold is placed',
    'Work through price and quantity variances and how they are resolved',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Checking the pizza order',
      html: `<p>For a birthday party, your mom orders <strong>4 pizzas at $10 each</strong> by phone. That is the <strong>order</strong>. When the delivery driver arrives, you count the boxes: only <strong>3</strong>! That is the <strong>receipt</strong>. Then the driver hands over a bill for <strong>$44</strong> — 4 pizzas at $11. That is the <strong>invoice</strong>.</p>
<p>A smart family compares all three papers before paying: “We ordered 4 at $10, we got 3, and you want $44? No way. We’ll pay $30.” <span class="hl">That comparison is called matching.</span> Oracle Fusion does it automatically for every PO invoice, so Sunny never pays for lemons it didn’t order or didn’t get.</p>`,
    },
    {
      type: 'text',
      heading: 'What is matching?',
      html: `<p><strong>Matching</strong> means connecting an invoice to the document it is billing for: a <strong>purchase order</strong>, a <strong>receipt</strong>, or a <strong>consumption advice</strong> (a record of consigned goods we have used — goods the supplier keeps owning until we use them). It makes sure we pay only for goods and services we <em>ordered</em>, <em>received</em> or <em>consumed</em>.</p>
<p>When Ava matches an invoice to a PO, Oracle Fusion:</p>
<ul>
<li>creates the <strong>invoice lines</strong> from the PO schedules (what, how many, what price),</li>
<li>creates the <strong>invoice distributions</strong> from the PO distributions (which accounts),</li>
<li>updates the <strong>billed quantity and amount</strong> on the PO, so the same PO line can’t be billed twice without anyone noticing.</li>
</ul>
<p>One invoice can be matched to several POs, and one PO can be matched by several invoices (for example, monthly invoices against a yearly order). If a PO schedule has several distributions, the matched amount is shared across them automatically.</p>`,
    },
    {
      type: 'table',
      caption: 'Match approval levels: how many documents must agree before an invoice can be paid',
      headers: ['Level', 'Documents compared', 'Typical use at Sunny'],
      rows: [
        ['<strong>2-way</strong>', 'Purchase order ↔ invoice (quantities within tolerance).', 'Services where there is nothing physical to receive, such as a yearly cleaning contract.'],
        ['<strong>3-way</strong>', 'Purchase order ↔ receipt ↔ invoice.', 'Goods that are delivered: lemons, sugar, cups.'],
        ['<strong>4-way</strong>', 'Purchase order ↔ receipt ↔ inspection (accepted quantity) ↔ invoice.', 'Goods that must pass a quality check, such as kitchen equipment from Stand Builders LLC.'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: two settings that sound alike',
      html: `<p>Oracle has two separate options on the <strong>purchase order schedule</strong>. Don’t mix them up:</p>
<ul>
<li><strong>Match approval level</strong> (2-way, 3-way, 4-way) – <em>which quantities must agree</em> before the invoice can be paid. It usually defaults from the supplier site’s <strong>Invoicing</strong> sub-tab or purchasing setup.</li>
<li><strong>Invoice match option</strong> (<strong>Order</strong> or <strong>Receipt</strong>) – <em>which document Ava matches the invoice to</em>: the PO itself, or a specific receipt.</li>
</ul>
<p>You can have a 3-way match approval level with the invoice matched to the order: Oracle still checks the received quantity during validation. Matching to <strong>receipts</strong> helps avoid holds for partial deliveries and gives smaller currency-rate differences, because the receipt date is closer to the invoice date. Companies that use periodic costing in Cost Management should match to receipts.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Which match approval level?',
      instructions: `<p>For each purchase, choose the match approval level Sunny should use.</p>`,
      categories: ['2-way', '3-way', '4-way'],
      items: [
        { text: 'Yearly window-cleaning service (nothing physical is delivered)', answer: '2-way' },
        { text: '1,000 lemons delivered to the kitchen', answer: '3-way' },
        { text: '5,000 cups delivered to the warehouse', answer: '3-way' },
        { text: 'A new juicing machine that must pass a quality inspection before acceptance', answer: '4-way' },
        { text: 'Monthly software subscription billed against a PO', answer: '2-way' },
      ],
      explain: `<p>Use <strong>2-way</strong> when there is nothing to receive, <strong>3-way</strong> when goods are delivered and received, and <strong>4-way</strong> when goods must also be inspected and accepted before the invoice may be paid.</p>`,
    },
    {
      type: 'text',
      heading: 'Quantity-based and amount-based matching',
      html: `<p>Most goods are bought by <strong>quantity</strong> and price: 1,000 lemons at $0.50. Oracle checks the billed <em>quantity</em> against the ordered and received quantities, and the invoice <em>price</em> against the PO price. These invoice lines have a match basis of <strong>Quantity</strong>.</p>
<p>Some services are bought by <strong>amount</strong> only: “website design, $2,000.” There is no unit price, so Oracle compares billed <em>amounts</em> against ordered and received amounts. These lines have a match basis of <strong>Amount</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Tolerances: how close is close enough?',
      html: `<p>Real life is a little messy. A supplier may deliver 1,005 lemons instead of 1,000, or the price may differ by a cent because of rounding. Holding every invoice for tiny differences would waste everyone’s time. So companies set <strong>invoice tolerances</strong>: how much difference is allowed before Oracle puts the invoice on a <strong>matching hold</strong>.</p>
<p>Tolerances are kept in <strong>tolerance templates</strong> (one for quantity-based matching, one for amount-based) and assigned to a <strong>supplier site</strong>. If a site has none, the defaults from the <strong>Manage Invoice Options</strong> page are used. Each tolerance can be a percentage or an amount.</p>
<p>Two rules beginners often get wrong:</p>
<ul>
<li>A tolerance of <strong>0%</strong> means <strong>no</strong> difference is allowed at all.</li>
<li>A tolerance that is turned on but left <strong>blank</strong> means <strong>any</strong> difference is allowed.</li>
</ul>`,
    },
    {
      type: 'table',
      caption: 'Common quantity-based tolerances (names from Oracle’s “Invoice Tolerances” topic)',
      headers: ['Tolerance', 'What it checks', 'Hold if exceeded'],
      rows: [
        ['<strong>Ordered Percentage</strong>', 'Billed quantity vs ordered quantity, as a %.', 'Qty Ord'],
        ['<strong>Maximum Ordered</strong>', 'Billed quantity vs ordered quantity, as a fixed quantity.', 'Max Qty Ord'],
        ['<strong>Received Percentage</strong>', 'Billed quantity vs received quantity, as a %.', 'Qty Rec'],
        ['<strong>Maximum Received</strong>', 'Billed quantity vs received quantity, as a fixed quantity.', 'Max Qty Rec'],
        ['<strong>Price Percentage</strong>', 'Invoice unit price vs PO unit price, as a %.', 'Price'],
        ['<strong>Schedule Amount</strong>', 'All invoice amounts vs the PO schedule amount.', 'Max Ship Amount'],
        ['<strong>Conversion Rate Amount</strong> / <strong>Total Amount</strong>', 'Currency-rate differences for foreign currency invoices.', 'Max Rate Amount / Max Total Amount'],
        ['<strong>Consumed Percentage</strong> / <strong>Maximum Consumed</strong>', 'Billed quantity vs consumed quantity on a consumption advice.', 'A matching hold'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Amount-based tolerances',
      html: `<p>For amount-based lines, the similar tolerances are <strong>Ordered Percentage</strong>, <strong>Maximum Ordered</strong>, <strong>Received Percentage</strong>, <strong>Maximum Received</strong>, <strong>Conversion Rate Amount</strong> and <strong>Total Amount</strong> — but they compare amounts instead of quantities. Breaking them gives holds such as <strong>Amt Ord</strong>, <strong>Amt Rec</strong>, <strong>Max Amt Ord</strong> and <strong>Max Amt Rec</strong>.</p>`,
    },
    {
      type: 'example',
      title: 'Worked example: Lemon Grove Farms charges too much',
      html: `<p>Leo’s <strong>PO 2001</strong> to Lemon Grove Farms is for 1,000 lemons at <strong>$0.50</strong> = $500, 3-way match. Noah received all 1,000 lemons. Sunny’s quantity tolerance template for the site says <strong>Price Percentage = 5%</strong> and <strong>Received Percentage = 0%</strong>.</p>`,
      steps: [
        'The invoice arrives: 1,000 lemons at <strong>$0.55</strong> = <strong>$550</strong>. Ava enters it and matches it to PO 2001.',
        'Ava clicks <strong>Validate</strong>. Oracle compares: quantity billed 1,000 = received 1,000 ✅. Price: $0.55 is 10% above $0.50, and 10% is more than the 5% tolerance ❌.',
        'Oracle places a <strong>Price</strong> hold. The invoice can’t be paid. (Price holds still allow accounting, but most companies wait.)',
        'Ava asks Leo. Leo confirms the agreed price is $0.50 — the supplier used last year’s price list by mistake.',
        'Lemon Grove Farms sends a credit memo for $50. Ava enters it as a <strong>price correction</strong> of −$0.05 on the 1,000 lemons, linked to the original invoice.',
        'Ava validates the original invoice again. Oracle now uses the <em>weighted average price</em> of the invoice plus its price corrections: $0.50. The <strong>Price</strong> hold is released automatically.',
      ],
      result: `<p>Net amount owed: $550 − $50 = <strong>$500</strong>, exactly what Leo agreed. Matching plus tolerances caught a $50 overcharge without anyone having to compare papers by hand.</p>`,
    },
    {
      type: 'lab',
      tool: 'three-way-match',
      title: 'Lab: the lemon price variance',
      intro: `<p>Here is the Lemon Grove Farms invoice from the example: PO 1,000 lemons at $0.50, 1,000 received, invoice 1,000 at <strong>$0.55</strong>, 5% price tolerance, 3-way. Check it, then experiment: what is the highest invoice price that passes without a Price hold? What happens if only 900 lemons were received?</p>`,
      preset: { poQty: 1000, poPrice: 0.5, rcvQty: 1000, invQty: 1000, invPrice: 0.55, qtyTol: 0, priceTol: 5, level: 3 },
    },
    {
      type: 'example',
      title: 'Worked example: a small difference inside tolerance',
      html: `<p>Next month, the invoice says 1,000 lemons at <strong>$0.51</strong> = <strong>$510</strong>. The PO still says $0.50.</p>`,
      steps: [
        'The price is 2% above the PO price, which is within the 5% tolerance, so validation places <strong>no</strong> hold.',
        'Oracle creates an <strong>invoice price variance</strong> (IPV) distribution for the $10 difference. With accrual at receipt, the $500 matched amount clears the received-not-invoiced accrual and the $10 goes to the invoice price variance account.',
        'Sunny’s setup (by Jordan) uses the lemons cost account as the price variance account, so the $10 lands in <code>5110 Lemons Cost</code>.',
      ],
      result: `<p>The invoice flows through untouched, and Priya can still see the extra $10 cost in the books. Tolerances are a trade-off: wider tolerances mean fewer holds but more small overpayments.</p>`,
    },
    {
      type: 'journal',
      title: 'The $510 invoice within tolerance, once accounted',
      lines: [
        { account: '2120 Received Not Invoiced Accrual', debit: 500, credit: 0 },
        { account: '5110 Lemons Cost (invoice price variance)', debit: 10, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 510 },
      ],
      note: `<p>The receipt already recorded $500 of lemon cost against the accrual. The invoice clears that accrual, adds the $10 price difference as a variance, and records the full $510 owed. Variance accounts are explained further in the Accounting for Invoices lesson.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: account a price variance',
      instructions: `<p>The next lemon invoice is for 1,000 lemons at <strong>$0.52</strong> = $520. The PO price is $0.50, so it is within the 5% tolerance and no hold is placed. Sunny accrued $500 at receipt and sends price variances to 5110 Lemons Cost. Build the invoice accounting.</p>`,
      accounts: ['2120 Received Not Invoiced Accrual', '5110 Lemons Cost', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '1310 Inventory – Ingredients'],
      answer: [
        { account: '2120 Received Not Invoiced Accrual', debit: 500, credit: 0 },
        { account: '5110 Lemons Cost', debit: 20, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 520 },
      ],
      explain: `<p>The matched PO value ($500) clears the receipt accrual. The extra $0.02 × 1,000 = <strong>$20</strong> is the invoice price variance, charged to 5110 in Sunny’s setup. The supplier is owed the full <strong>$520</strong>.</p>`,
    },
    {
      type: 'example',
      title: 'Worked example: billed before it was all received',
      html: `<p>Cup & Straw Supply ships 5,000 cups in two boxes. Their invoice is for all <strong>5,000</strong>, but so far Noah has received only <strong>4,000</strong>. The PO is 3-way and the invoice is matched to the order.</p>`,
      steps: [
        'Validation compares billed quantity (5,000) with received quantity (4,000). With a 0% received tolerance, the invoice gets a <strong>Qty Rec</strong> hold.',
        'Two days later the second box arrives and Noah records a receipt for 1,000 cups.',
        'The invoice is validated again (Ava clicks Validate, or the scheduled Validate Payables Invoices process picks it up). Billed now equals received, so the <strong>Qty Rec</strong> hold is released automatically.',
      ],
      result: `<p>No one had to release anything by hand — fixing the real-world cause (the missing receipt) fixed the hold. If Sunny had matched to <strong>receipts</strong> instead, Ava would have matched only the 4,000 received cups and avoided the hold.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: match an invoice to a purchase order',
      items: [
        'In <kbd>Payables</kbd> &gt; <kbd>Invoices</kbd>, start the <kbd>Create Invoice</kbd> task.',
        'Enter the PO number in <kbd>Identifying PO</kbd>. Oracle fills in the supplier and legal entity from the PO.',
        'Enter the invoice number, date and amount.',
        'In the <kbd>Lines</kbd> section, choose the match action to open the <kbd>Match Invoice Lines</kbd> page. Only POs (or receipts) for the same legal entity as the invoice are shown.',
        'Select the PO schedule (or receipt) lines being billed, adjust the quantity and unit price to what the supplier billed, and apply.',
        'Save and click <kbd>Validate</kbd>. Check whether any matching holds were placed.',
      ],
      note: `<p>When a supplier bills the whole PO in one go, Oracle also offers <strong>Match in Full</strong>: enter the PO number, invoice date and number, and the invoice is created for the full PO (not available when the match option is Receipt, the PO is already partly matched, or self-billing is used). Labels vary by release and between classic and Redwood pages.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Special matching cases you may meet',
      html: `<ul>
<li><strong>Receipt charges</strong> – a freight invoice from a separate carrier can be matched to the receipt of the goods, so the freight becomes part of the goods’ cost.</li>
<li><strong>Supplier credits on the PO</strong> – a negative PO line (for example, a trade-in of old equipment) can be matched so the invoice shows the true net cost.</li>
<li><strong>Final match</strong> – if allowed in the invoice options, Ava can mark a match as final, telling Oracle no more invoices are expected for that PO schedule.</li>
<li><strong>Consumption advice</strong> – for consigned stock, invoices are matched to what was actually used.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: tolerances are a policy decision',
      html: `<p>Setting tolerances is not just a technical task — it’s a business decision about risk. Many companies start strict (for example 0% for quantity and 1–5% for price), study which holds happen most, then fine-tune per supplier. Oracle’s newer Payables Agent features can even recommend changes when the same hold is repeatedly released without any change to the invoice.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Matching', def: 'Linking an invoice to the purchase order, receipt or consumption advice it bills for, so only ordered and received goods are paid.' },
        { term: '3-way match', def: 'A check that the purchase order, the receipt and the invoice quantities agree within tolerance before payment.' },
        { term: 'Match approval level', def: 'The PO schedule setting that says whether 2-way, 3-way or 4-way matching is required.' },
        { term: 'Invoice match option', def: 'The PO schedule setting that says whether invoices are matched to the order or to receipts.' },
        { term: 'Invoice tolerance', def: 'The allowed difference in quantity, price or amount before a matching hold is placed.' },
        { term: 'Invoice price variance', def: 'The difference between the invoice price and the purchase order price, recorded in the accounting.' },
        { term: 'Price correction', def: 'An invoice that adjusts only the unit price of an earlier matched invoice.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which documents must agree in a 3-way match?',
          options: ['PO and invoice', 'PO, receipt and invoice', 'Requisition, PO and payment', 'Invoice, payment and bank statement'],
          answer: 1,
          explain: '3-way matching compares the purchase order, the receipt and the invoice. 4-way adds the accepted (inspected) quantity.',
        },
        {
          q: 'The PO price is $0.50, the invoice price is $0.55 and the price tolerance is 5%. What happens at validation?',
          options: ['Nothing, it is within tolerance', 'A Price hold is placed', 'The invoice is cancelled', 'The PO price is changed automatically'],
          answer: 1,
          explain: '$0.55 is 10% above $0.50, which exceeds the 5% tolerance, so a Price matching hold is placed.',
        },
        {
          q: 'A tolerance is enabled but its value is left blank. What does Oracle do?',
          options: ['Allows no difference at all', 'Allows any difference', 'Uses 5% automatically', 'Refuses to validate'],
          answer: 1,
          explain: 'A blank active tolerance means infinite variance is allowed. To allow no variance, enter 0%.',
        },
        {
          q: 'An invoice has a Qty Rec hold because only part of the order has arrived. What is the cleanest fix once the rest arrives?',
          options: [
            'Delete the invoice',
            'Record the receipt and validate the invoice again',
            'Change the supplier’s bank account',
            'Create a prepayment',
          ],
          answer: 1,
          explain: 'Fixing the real cause (the missing receipt) and re-validating releases the system hold automatically.',
        },
        {
          q: 'Which statement about the invoice match option is TRUE?',
          options: [
            'It is the same as the match approval level',
            'It decides whether invoices are matched to the PO or to receipts',
            'It sets the payment terms',
            'It only applies to credit memos',
          ],
          answer: 1,
          explain: 'The invoice match option (Order or Receipt) is independent of the match approval level (2-, 3- or 4-way).',
        },
      ],
    },
  ],
  sources: [
    { title: 'Matching Invoice Lines (Using Payables Invoice to Pay, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/matching-invoice-lines.html' },
    { title: 'Invoice Tolerances', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-tolerances.html' },
    { title: 'Match Approval Level Options (Implementing Procurement, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oapro/match-approval-level-options.html' },
    { title: 'How Invoices Are Validated', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoices-are-validated.html' },
    { title: 'Types of Holds', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/types-of-holds.html' },
    { title: 'Invoice Corrections', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-corrections.html' },
    { title: 'Overview of Creating Invoices Using Match in Full', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-creating-invoices-using-match-in-full.html' },
    { title: 'Variance Accounts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/variance-accounts.html' },
    { title: 'Guidelines For Invoice Options (matching options)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-invoice-options.html' },
    { title: 'Payables Agent for invoice ingestion, compliance and control (26D What’s New)', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51289.htm' },
  ],
};
