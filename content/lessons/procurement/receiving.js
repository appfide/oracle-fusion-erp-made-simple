export default {
  slug: 'receiving',
  title: 'Receiving: Did the Box Arrive?',
  minutes: 18,
  summary:
    'Receiving records what actually arrived against a purchase order. Learn how receipts are created, the three receipt routings (direct, standard, inspection), corrections and returns, and how receipt accounting books the “received not invoiced” accrual — then watch Noah receive the lemons.',
  objectives: [
    'Explain why recording receipts matters for Payables and the ledger',
    'Describe how receipts are created by receiving staff and by requesters (self-service receiving)',
    'Compare direct, standard and inspection receipt routing',
    'Explain corrections and returns to supplier',
    'Record the receipt accrual entries (debit expense or inventory, credit Received Not Invoiced Accrual) and see how the invoice clears them',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Checking the pizza delivery',
      html: `<p>You ordered 3 pizzas for a party. When the delivery person rings the bell, a smart grown-up doesn’t just grab the boxes — they open them and check: 3 pizzas? The right toppings? Still hot? If one pizza is the wrong kind, they hand it back.</p>
<p>Writing down “3 pizzas arrived, 1 sent back” is <strong>receiving</strong>. And here’s the clever part: the moment the good pizzas arrive, you already <em>owe</em> the pizza shop money, even if their bill comes tomorrow. Accountants write that down too — it’s called an <strong>accrual</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Why receiving matters to finance',
      html: `<p>A <strong>receipt</strong> is the record that goods or services ordered on a purchase order actually arrived — how many, when, and where they went. For finance, receipts do three big jobs:</p>
<ul>
<li><strong>They protect payments.</strong> With a 3-way match, Payables only pays for the quantity received. With 4-way, only for the quantity <em>accepted</em> after inspection.</li>
<li><strong>They create accruals.</strong> When goods arrive before the invoice, the company already has a liability. Receipt accounting can book it at receipt time, so the ledger is right even before Ava sees the bill.</li>
<li><strong>They move inventory.</strong> For stocked items, a receipt increases the inventory balance and value.</li>
</ul>
<p>In Oracle Fusion, receiving belongs to <strong>Oracle Receiving</strong>, part of Supply Chain Management’s inventory applications. Receipt accounting lives in <strong>Supply Chain Cost Management</strong>. Even a company that only uses Financials and Procurement uses these pieces when it receives against POs.</p>`,
    },
    {
      type: 'slides',
      title: 'Two ways to create a receipt',
      slides: [
        {
          icon: '🏭',
          title: 'Warehouse / receiving staff',
          html: `<p>Receiving agents work in the <strong>Inventory Management</strong> work area (Oracle documents <kbd>Navigator</kbd> &gt; <kbd>Supply Chain Execution</kbd> &gt; <kbd>Inventory Management</kbd>, with receipt tasks in the task panel). They use the <kbd>Receive Expected Shipments</kbd> page to find PO schedules, transfer orders or ASNs that are due, and receive the lines. They can create a new receipt or add to an existing one.</p>`,
        },
        {
          icon: '🙋',
          title: 'Requesters (self-service receiving)',
          html: `<p>For things delivered straight to the person who asked — an office chair, or Noah’s kitchen supplies — the requester can receive it themselves. Oracle’s self-service receiving has a <strong>Receive Items</strong> page for creating receipts and a <strong>Manage Receipts</strong> page for viewing, returning and correcting them, reached through <strong>My Receipts</strong> in procurement. Only POs with <strong>Direct Delivery</strong> routing (and a requester or deliver-to person on the distribution) appear there; standard-routing POs are received on Receive Expected Shipments.</p>`,
        },
        {
          icon: '📨',
          title: 'Advance shipment notices',
          html: `<p>Suppliers can send an <strong>ASN</strong> (advance shipment notice) — “we shipped 1,000 lemons today” — through the Supplier Portal or B2B. Receivers then receive against the ASN, which saves typing and can carry lot and serial numbers.</p>`,
        },
        {
          icon: '📏',
          title: 'Tolerances',
          html: `<p>Receiving checks <strong>over-receipt tolerance</strong> (how much more than ordered you may accept) and <strong>early/late receipt tolerance</strong> (how many days before or after the due date). For each, the company chooses to block, warn, or allow without warning.</p>`,
        },
      ],
    },
    {
      type: 'table',
      caption: 'The three receipt routings',
      headers: ['Routing', 'Steps', 'Good for'],
      rows: [
        ['<strong>Direct</strong> (direct delivery)', 'Receive and put away in one transaction — put away happens automatically when the receipt is created. You receive at distribution level.', 'Simple goods going straight to the user or an expense destination.'],
        ['<strong>Standard</strong>', 'Two steps: receive into a receiving location, then put away in a separate transaction. Goods can be inspected or transferred in between.', 'Warehouses where someone decides the final location later.'],
        ['<strong>Inspection</strong> (inspection required)', 'Three steps: receive, <strong>inspect</strong> (accept or reject), then put away — accepted and rejected goods can go to different places.', 'Food, medicines, critical parts — and 4-way matching.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: choose the receipt routing',
      instructions: `<p>Which receipt routing fits each delivery at Sunny best?</p>`,
      categories: ['Direct', 'Standard', 'Inspection'],
      items: [
        { text: 'A box of pens delivered straight to Sam’s desk', answer: 'Direct' },
        { text: 'Lemons that must pass a freshness check before use', answer: 'Inspection' },
        { text: 'Cups unloaded at the dock; the warehouse decides later which shelf they go on', answer: 'Standard' },
        { text: 'Sugar where a food-safety inspector accepts or rejects each delivery (4-way match)', answer: 'Inspection' },
        { text: 'Cleaning supplies Noah orders and receives for immediate kitchen use', answer: 'Direct' },
      ],
      explain: `<p>Direct is one step and suits simple deliveries to the user. Standard separates receiving and put away, which helps busy warehouses. Inspection adds an accept/reject step, which is what makes 4-way matching possible.</p>`,
    },
    {
      type: 'text',
      heading: 'Corrections and returns',
      html: `<p>People make mistakes, and suppliers send bad goods. Oracle Receiving has two different tools:</p>
<ul>
<li><strong>Correction</strong> – fixes the <em>record</em>. If Noah typed 1,000 but only 990 lemons were in the crates, a <strong>negative correction</strong> of 10 fixes the received quantity. A <strong>positive correction</strong> adds quantity. Corrections must stay within the document’s tolerances. You can correct lines with statuses such as Received, Accepted, Rejected or Put Away.</li>
<li><strong>Return</strong> – sends <em>goods</em> back. A <strong>return to supplier</strong> reduces the received quantity because the items physically leave (rotten lemons, wrong item). Returns can be full or partial. Oracle also supports supplier returns without the original receipt, for special cases.</li>
</ul>
<p>Both corrections and returns flow through to matching and receipt accounting, so the received quantity Payables sees is always up to date.</p>`,
    },
    {
      type: 'text',
      heading: 'Receipt accounting: the received-not-invoiced accrual',
      html: `<p>Here is the key accounting idea. The company must choose, in the Procurement setup, <strong>when</strong> to accrue purchases:</p>
<ul>
<li><strong>Accrue at receipt</strong> – when goods are received, the cost (expense or inventory) is debited and an <strong>accrued liability</strong> is credited. At Sunny that liability is <code>2120 Received Not Invoiced Accrual</code>. This is <em>mandatory</em> for inventory purchases and optional for expense purchases. It is more timely, but there is more to reconcile.</li>
<li><strong>Accrue at period end</strong> – nothing is booked at receipt. When the invoice is accounted, the cost is debited and Accounts Payable credited. At month-end, a process creates accruals for receipts still not invoiced (<strong>Create Uninvoiced Receipt Accruals</strong>), and they are reversed next period.</li>
</ul>
<p>With accrue at receipt, when the supplier invoice is matched and accounted in Payables, it debits <code>2120</code> and credits <code>2110 Accounts Payable – Trade</code>. The accrual account goes back to zero — “clearing” the accrual. Any leftovers (for example, a receipt that was never invoiced) show up on accrual reconciliation reports and can be cleared by <strong>accrual clearing rules</strong>.</p>`,
    },
    {
      type: 'flow',
      title: 'How a receipt becomes a journal',
      steps: [
        { icon: '📦', label: 'Receipt', detail: 'Noah receives the lemons in Oracle Receiving.' },
        { icon: '🔁', label: 'Transfer', detail: 'The scheduled process Transfer Transactions from Receiving to Costing sends receipts to receipt accounting.' },
        { icon: '🧮', label: 'Distributions', detail: 'Create Receipt Accounting Distributions builds the debit and credit lines.' },
        { icon: '📒', label: 'Create Accounting', detail: 'Subledger accounting creates the journal entries and sends them to the General Ledger.' },
        { icon: '🧾', label: 'Invoice', detail: 'Payables matches the invoice; its accounting clears the accrual.' },
        { icon: '🧹', label: 'Reconcile and clear', detail: 'Accrual reconciliation reports and clearing rules tidy any differences.' },
      ],
      note: `<p>These processes are usually scheduled to run automatically, so receivers never see them — but accountants check they ran before closing the month.</p>`,
    },
    {
      type: 'example',
      title: 'Noah receives the lemons',
      html: `<p>Leo’s purchase order: 1,000 lemons at $0.50 = <strong>$500</strong>, 3-way match, receipt routing <strong>direct</strong>, charge account <code>101-200-5110-010-000</code>, accrue at receipt.</p>`,
      steps: [
        '5 March, 7:30 – Lemon Grove Farms’ truck arrives. Noah opens the receiving page, searches for the PO and enters quantity <strong>1,000</strong>. Because the routing is direct, the receipt and delivery to the kitchen happen in one step.',
        'Overnight, the scheduled receipt accounting processes run and create the accrual: Lemons Cost up $500, Received Not Invoiced Accrual up $500.',
        '6 March – Noah finds <strong>20 rotten lemons</strong> at the bottom of a crate. Noah creates a <strong>return to supplier</strong> for 20 lemons ($10). The received quantity is now 980.',
        '8 March – Lemon Grove Farms’ invoice arrives for <strong>980 lemons = $490</strong>. Ava matches it to the PO; Payables compares invoiced quantity with received quantity (980 = 980), so no hold.',
        'The invoice is accounted: the $490 accrual is cleared and Accounts Payable shows $490 owed to Lemon Grove Farms.',
      ],
      result: `<p>Sunny’s books showed the lemon cost on the day the lemons arrived, the return reduced it, and the accrual account ended at zero once the matching invoice was accounted.</p>`,
    },
    {
      type: 'journal',
      title: '5 March – receipt of 1,000 lemons (accrue at receipt)',
      lines: [
        { account: '5110 Lemons Cost (101-200-5110-010-000)', debit: 500, credit: 0 },
        { account: '2120 Received Not Invoiced Accrual (101-200-2120-000-000)', debit: 0, credit: 500 },
      ],
      note: `<p>Sunny charges lemons straight to expense (an <em>expense destination</em>). If lemons were stocked as inventory (an <em>inventory destination</em>), the debit would go to <code>1310 Inventory – Ingredients</code> instead, and cost would move to <code>5110</code> later when the lemons are used.</p>`,
    },
    {
      type: 'journal',
      title: '6 March – return of 20 lemons to the supplier',
      lines: [
        { account: '2120 Received Not Invoiced Accrual (101-200-2120-000-000)', debit: 10, credit: 0 },
        { account: '5110 Lemons Cost (101-200-5110-010-000)', debit: 0, credit: 10 },
      ],
      note: `<p>The return reverses part of the receipt accrual: 20 × $0.50 = $10.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Practice: account the matched invoice',
      instructions: `<p>Ava’s invoice from Lemon Grove Farms for <strong>980 lemons ($490)</strong> is matched to the PO and receipt and accounted. Sunny accrues at receipt. Build the invoice journal.</p>`,
      accounts: [
        '5110 Lemons Cost',
        '2120 Received Not Invoiced Accrual',
        '2110 Accounts Payable – Trade',
        '1110 Cash – Big River Bank',
        '1310 Inventory – Ingredients',
      ],
      answer: [
        { account: '2120 Received Not Invoiced Accrual', debit: 490, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 490 },
      ],
      explain: `<p>The cost was already recorded at receipt, so the invoice must not debit 5110 again. Instead it clears the accrual (debit 2120 $490) and records the real supplier debt (credit 2110 $490). After the receipt (+500 credit), return (−10) and invoice (−490), account 2120 is back to zero. Cash moves only when Ava pays.</p>`,
    },
    {
      type: 'lab',
      tool: 'three-way-match',
      title: 'Lab: what if the invoice ignored the return?',
      intro: `<p>Suppose Lemon Grove Farms forgot about the 20 returned lemons and invoiced all <strong>1,000</strong>. Sunny received (net) <strong>980</strong>, and the PO uses a 3-way match with 0% tolerance. Run the match and see whether a hold would be placed. Then try changing the invoice quantity to 980, or switching to a 2-way match, and see what changes.</p>`,
      preset: { poQty: 1000, poPrice: 0.5, rcvQty: 980, invQty: 1000, invPrice: 0.5, qtyTol: 0, priceTol: 0, level: 3 },
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: month-end accrual check',
      instructions: `<p>On 31 March, Priya reviews account 2120. During March, Sunny received cups worth <strong>$300</strong> (invoice already matched and accounted) and sugar worth <strong>$200</strong> (no invoice yet). Sunny accrues at receipt.</p>`,
      html: `<p>The receipt accruals credited to 2120 in March total $ {{}}.</p>
<p>The cup invoice debited 2120 by $ {{}}.</p>
<p>The 2120 balance at month-end, representing goods received but not yet invoiced, is $ {{}}.</p>`,
      blanks: [
        { answer: 500 },
        { answer: 300 },
        { answer: 200 },
      ],
      explain: `<p>Both receipts credited 2120 ($300 + $200 = $500). The matched cup invoice cleared $300. The $200 left is the sugar Sunny owes for but hasn’t been billed for — exactly what the accrual is meant to show. Priya checks this against the accrual reconciliation report before closing.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Receipt accounting in Oracle Fusion',
      html: `<p>Oracle Receipt Accounting creates, reviews and audits purchase accruals. Its main tasks (in the Receipt Accounting work area or as scheduled processes) include <strong>Create Receipt Accounting Distributions</strong>, <strong>Review Receipt Accounting Distributions</strong>, <strong>Match Receipt Accruals</strong>, <strong>Clear Receipt Accrual Balances</strong> using <strong>accrual clearing rules</strong>, and <strong>Create Uninvoiced Receipt Accruals</strong> for period-end accruals. Reports include Accrual Reconciliation, Accrual Clearing and Uninvoiced Receipt Accrual. Receipt accounting has its own periods, which are closed as part of month-end.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: receive as a requester',
      items: [
        'Open <strong>My Receipts</strong> from the procurement area of the home page or Navigator.',
        'Choose to receive items, and search for the purchase order or requisition (only orders set up for direct delivery appear).',
        'Enter the quantity received for each line and submit the receipt.',
        'To fix a mistake later, open the manage receipts view, find the receipt and choose to correct or return it.',
      ],
      note: `<p>Self-service receiving page names come from Oracle’s Using Receiving guide (Receive Items, Manage Receipts, My Receipts). Warehouse users use Receive Expected Shipments in Inventory Management instead. Navigation and labels vary by release, Redwood adoption and your roles.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: receive on time',
      html: `<p>The most common cause of “receipt quantity” holds in Payables is simple: someone forgot to receive. The goods are on the shelf, the invoice is in the system, but the receipt was never entered. Good companies remind requesters, run reports of open POs past their due date, and set up receiving so it is quick and easy — sometimes on a phone right at the loading dock.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Receipt', def: 'The record that goods or services on a purchase order actually arrived.' },
        { term: 'Receipt routing', def: 'How a receipt is processed: direct (one step), standard (receive then put away) or inspection (receive, inspect, put away).' },
        { term: 'Correction', def: 'A change to a receipt record to fix a wrong quantity, positive or negative.' },
        { term: 'Return to supplier', def: 'Sending received goods back to the supplier, which reduces the received quantity.' },
        { term: 'Received not invoiced accrual', def: 'A liability recorded when goods arrive before the supplier’s invoice is accounted.' },
        { term: 'Accrue at receipt', def: 'The setting that books the purchase cost and accrued liability at the moment of receipt.' },
        { term: 'Advance shipment notice (ASN)', def: 'A message from the supplier saying what has been shipped, used to speed up receiving.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'With inspection routing, how many steps does a receipt go through?',
          options: ['One: receive', 'Two: receive and put away', 'Three: receive, inspect, put away', 'Four: order, receive, inspect, pay'],
          answer: 2,
          explain: 'Inspection receipt routing is a three-step process: receive into a receiving location, inspect (accept or reject), then put away.',
        },
        {
          q: 'Noah typed 1,000 lemons received, but only 990 were actually delivered. What should Noah do?',
          options: ['A return to supplier of 10', 'A negative correction of 10', 'Cancel the purchase order', 'Nothing'],
          answer: 1,
          explain: 'A correction fixes the record. A return is for goods that physically arrived and are being sent back.',
        },
        {
          q: 'Sunny accrues at receipt. Which entry is made when $500 of lemons (expense destination) are received?',
          options: [
            'Debit 2110 Accounts Payable, credit 1110 Cash',
            'Debit 5110 Lemons Cost, credit 2120 Received Not Invoiced Accrual',
            'Debit 2120, credit 2110',
            'No entry until the invoice arrives',
          ],
          answer: 1,
          explain: 'Accrue at receipt debits the cost (or inventory) and credits the received-not-invoiced liability as soon as goods arrive.',
        },
        {
          q: 'Which choice is mandatory for inventory purchases?',
          options: ['Accrue at period end', 'Accrue at receipt', '2-way matching', 'Direct routing'],
          answer: 1,
          explain: 'Oracle’s accrual settings say accrue at receipt is mandatory for inventory purchases and optional for expense purchases.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Receiving (26D) – Receipt Routing', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/famli/receipt-routing.html' },
    { title: 'Using Receiving (26D) – Receipt Creation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/famli/receipt-creation.html' },
    { title: 'Using Receiving (26D) – Overview of Managing Inbound Shipments', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/famli/overview-of-managing-inbound-shipments.html' },
    { title: 'Using Receiving (26D) – Overview of Self-Service Receipts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/famli/overview-of-self-service-receipts.html' },
    { title: 'Using Receiving (26D) – What’s the criteria for a purchase order to appear on the My Receipts pages in Self-Service Receiving?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/famli/what-s-the-criteria-for-a-purchase-order-to-appear-on-the-my.html' },
    { title: 'Using Receiving (26D) – Corrections', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/famli/corrections.html' },
    { title: 'Using Receiving (26D) – Returns', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/famli/returns.html' },
    { title: 'Using Supply Chain Cost Management (26D) – Overview of Receipt Accounting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/fapma/overview-of-receipt-accounting.html' },
    { title: 'Using Supply Chain Cost Management (26D) – Considerations for Accrual Settings', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/fapma/considerations-for-accrual-settings.html' },
    { title: 'Using Supply Chain Cost Management (26D) – Receipt Accounting Tasks and Accounting Events', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/26d/fapma/receipt-accounting-tasks-and-accounting-events.html' },
    { title: 'Implementing Procurement (26D) – Match Approval Level Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oapro/match-approval-level-options.html' },
  ],
};
