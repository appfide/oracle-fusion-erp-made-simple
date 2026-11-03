export default {
  slug: 'payables-story',
  title: 'Practice Story: Sunny Lemonade Pays for Lemons',
  minutes: 35,
  summary:
    'Follow one order of 1,000 lemons all the way from Leo’s purchase order to cleared cash in the General Ledger: receipt, a $520 invoice with a price variance, a Price hold, a $20 credit memo, approval, Create Accounting, month-end close, a payment process request, bank clearing and the final balances. Practise every step yourself along the way.',
  objectives: [
    'Follow a complete procure-to-pay cycle in Oracle Fusion, naming who does each step and what Oracle shows',
    'Resolve a price variance and Price hold with a supplier credit memo entered as a price correction',
    'Build every journal entry in the story and check that the accounts net to the right final balances',
    'Pay the invoice through a payment process request and explain what happens at bank clearing',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'One bag of lemons, start to finish',
      html: `<p>Imagine following one bag of lemons on its whole journey. Someone orders it. Someone carries it into the kitchen. A bill arrives, but the bill is a little too high, so someone has to sort that out. A grown-up says "OK, pay it". Someone writes it in the money diary. On the right day, money leaves the piggy bank. Finally, the bank statement proves the money really went.</p>
<p>In this story you will follow exactly that journey at Sunny Lemonade Co., using every Payables idea from this module. At each step you will <span class="hl">do the work yourself</span>: spot the hold, fix it, build the journals, set up the payment run.</p>`,
    },
    {
      type: 'slides',
      title: 'Meet the cast and the plan',
      slides: [
        { icon: '🛒', title: 'Leo, the buyer', html: `<p>Creates purchase order <strong>PO 2045</strong> to Lemon Grove Farms: <strong>1,000 lemons at $0.50 = $500</strong>, payment terms <strong>Net 30</strong>, 3-way match.</p>` },
        { icon: '📦', title: 'Noah, the kitchen manager', html: `<p>Receives the lemons and records the receipt in Oracle, so everyone knows they arrived.</p>` },
        { icon: '🧾', title: 'Ava, the payables specialist', html: `<p>Enters and matches the invoice, deals with the hold, makes sure it is accounted and paid on time.</p>` },
        { icon: '👍', title: 'Noah again, as approver', html: `<p>Sunny’s approval rules send lemon invoices to the person who requested the goods.</p>` },
        { icon: '🏦', title: 'Mia and Priya', html: `<p>Mia watches cash and reconciles the bank statement. Priya checks the General Ledger and closes the month.</p>` },
        { icon: '⚙️', title: 'Sunny’s key setups', html: `<p>Expense items are accrued <strong>at receipt</strong>. Payments are accounted <strong>at payment issue</strong>. After the overcharge in the Matching lesson, Jordan tightened the <strong>Price Percentage</strong> tolerance on Lemon Grove Farms’ site to <strong>2%</strong>. PO distributions use <code>101-200-5110-010-000</code> as both the charge and the variance account.</p>` },
      ],
    },
    {
      type: 'flow',
      title: 'The whole journey at a glance',
      steps: [
        { icon: '🛒', label: 'Jan 5 · PO', detail: 'Leo orders 1,000 lemons, $500.' },
        { icon: '📦', label: 'Jan 8 · Receipt', detail: 'Noah receives 1,000 lemons; accrual booked.' },
        { icon: '🧾', label: 'Jan 12 · Invoice', detail: '$520 invoice arrives; Ava matches it.' },
        { icon: '⛔', label: 'Jan 12 · Price hold', detail: 'Validation finds $0.52 vs $0.50.' },
        { icon: '✂️', label: 'Jan 14 · Credit memo', detail: '$20 price correction; hold released.' },
        { icon: '👍', label: 'Jan 15 · Approval', detail: 'Noah approves.' },
        { icon: '📒', label: 'Jan 15 · Accounting', detail: 'Create Accounting, transfer, post.' },
        { icon: '🔒', label: 'Feb 2 · Close Jan', detail: 'Payables reconciled to GL.' },
        { icon: '💸', label: 'Feb 11 · Payment', detail: 'PPR pays $500 on the due date.' },
        { icon: '✅', label: 'Feb 13 · Cleared', detail: 'Mia matches the bank statement.' },
      ],
    },
    {
      type: 'text',
      heading: 'Step 1: Leo orders and Noah receives (January 5–8)',
      html: `<p>On Monday, January 5, Leo creates <strong>PO 2045</strong> in Oracle Purchasing: 1,000 lemons at <strong>$0.50</strong>, total <strong>$500</strong>, supplier Lemon Grove Farms, payment terms Net 30, charge account <code>101-200-5110-010-000</code> (Company 101, Kitchen, Lemons Cost, Classic Lemonade). The PO is approved and sent to the supplier.</p>
<p>On Thursday, January 8, the truck arrives. Noah counts the boxes, checks a few lemons for quality, and records a <strong>receipt</strong> for 1,000 lemons against PO 2045. Because Sunny accrues expense items <strong>at receipt</strong>, receipt accounting immediately books the cost and a "received but not yet billed" liability. Payables hasn’t done anything yet, but the books already know Sunny owes about $500.</p>`,
    },
    {
      type: 'journal',
      title: 'Jan 8 · Receipt accrual (created by receipt accounting, not Payables)',
      lines: [
        { account: '5110 Lemons Cost (101-200-5110-010-000)', debit: 500, credit: 0 },
        { account: '2120 Received Not Invoiced Accrual (101-100-2120-000-000)', debit: 0, credit: 500 },
      ],
      note: `<p>If January ended right now, Sam’s reports would still show the $500 lemon cost in January, even with no invoice. That is the point of accruing at receipt.</p>`,
    },
    {
      type: 'text',
      heading: 'Step 2: the invoice arrives at $520 (January 12)',
      html: `<p>On Monday, January 12, Lemon Grove Farms emails invoice <strong>LGF-1042</strong>, dated January 12: 1,000 lemons at <strong>$0.52</strong> = <strong>$520</strong>, referencing PO 2045.</p>
<p>Ava creates the invoice in the Invoices work area: business unit Sunny US BU, supplier Lemon Grove Farms, invoice number LGF-1042, amount $520, date January 12. Ava matches it to PO 2045 and Noah’s receipt for quantity 1,000. Oracle builds the invoice line from the PO, using the invoice price of $0.52. The payment terms default from the PO (Net 30), and the terms date is the invoice date, so the installment is due on <strong>February 11</strong>.</p>
<p>Ava clicks <kbd>Validate</kbd>. Oracle compares the invoice with the PO and receipt:</p>
<ul>
<li>Quantity billed 1,000 = quantity received 1,000. ✅</li>
<li>Price billed $0.52 vs. PO price $0.50: that is <strong>4%</strong> higher, and the tolerance is <strong>2%</strong>. ❌</li>
</ul>
<p>Validation places a <strong>Price</strong> hold on the invoice. The invoice is validated in the sense that the checks ran, but it is on hold, so it <strong>can’t be paid</strong>. (For a Price hold, Oracle still allows accounting.)</p>`,
    },
    {
      type: 'lab',
      tool: 'three-way-match',
      title: 'Lab: see the Price hold yourself',
      intro: `<p>This simulator is preset with Sunny’s numbers: PO 1,000 lemons at $0.50, 1,000 received, invoice 1,000 at $0.52, price tolerance 2%, 3-way match. Check that a price hold is placed. Then try: what invoice price would just pass with a 2% tolerance? What if the tolerance were 5%, like in the Matching lesson?</p>`,
      preset: { poQty: 1000, poPrice: 0.5, rcvQty: 1000, invQty: 1000, invPrice: 0.52, qtyTol: 0, priceTol: 2, level: 3 },
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Measure the variance',
      instructions: `<p>Work out the numbers behind the hold.</p>`,
      html: `<p>The price difference is $ {{}} per lemon. On 1,000 lemons the total overcharge is $ {{}}. As a percentage of the PO price that is {{}} %. The highest price that would pass a 2% tolerance is $ {{}} per lemon.</p>`,
      blanks: [
        { answer: 0.02 },
        { answer: 20 },
        { answer: 4 },
        { answer: 0.51, hint: '$0.50 × 1.02' },
      ],
      explain: `<p>$0.52 − $0.50 = $0.02 per lemon, × 1,000 = $20. $0.02 ÷ $0.50 = 4%, which is more than the 2% tolerance. The limit is $0.50 × (1 + 2%) = $0.51, so $0.52 is caught.</p>`,
    },
    {
      type: 'text',
      heading: 'Step 3: Ava resolves the Price hold (January 12–14)',
      html: `<p>A hold is a question, not a punishment. Ava’s job is to find the right answer, not just to make the hold disappear. Ava has two possible paths:</p>
<ul>
<li><strong>Path A: the supplier is wrong.</strong> The agreed price was $0.50. The supplier sends a credit memo for $20, which Ava enters as a <strong>price correction</strong> on the original invoice. Sunny owes $500.</li>
<li><strong>Path B: the PO is wrong.</strong> Leo agreed to $0.52 on the phone but forgot to update the PO. Leo updates PO 2045 to $0.52 through a change order, Ava revalidates, the hold is released, and Sunny owes $520.</li>
</ul>
<p>The hold appears on the Holds infotile and, through the hold resolution workflow, Leo is asked about it. Leo checks the emails: the contract price is <strong>$0.50</strong>. So it is <strong>Path A</strong>. Ava calls Lemon Grove Farms, who agree the $0.52 was an old price list.</p>
<p>On January 14 the supplier sends credit memo <strong>LGF-CM-77</strong> for <strong>−$20</strong>. Ava enters it as a credit memo, matched to invoice LGF-1042 as a price correction of −$0.02 on the 1,000 lemons. Then Ava validates both documents again. Oracle now checks the <strong>weighted average price</strong> of the invoice plus its price corrections: ((1,000 × $0.52) + (1,000 × −$0.02)) ÷ 1,000 = <strong>$0.50</strong>. That is within tolerance, so the <strong>Price hold is released automatically</strong>.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Why Ava doesn’t just release the hold manually',
      html: `<p>A Price hold can be released manually, but releasing it without a credit memo would mean paying $520 for $500 of agreed lemons. Manual release is for cases where someone with authority has confirmed the variance is acceptable, and the reason should be recorded. Auditors look closely at manually released matching holds.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: enter the credit memo',
      instructions: `<p>This is a simplified practice screen, not Oracle’s real page. Enter Lemon Grove Farms’ credit memo LGF-CM-77, dated January 14, 2026, for the $20 overcharge, as a price correction to invoice LGF-1042.</p>`,
      formTitle: 'Create Invoice (practice)',
      fields: [
        { label: 'Business unit', type: 'text', given: 'Sunny US BU' },
        { label: 'Supplier', type: 'text', given: 'Lemon Grove Farms' },
        { label: 'Invoice type', type: 'select', options: ['Standard', 'Credit memo', 'Debit memo', 'Prepayment'], answer: 'Credit memo' },
        { label: 'Invoice number', type: 'text', answer: 'LGF-CM-77' },
        { label: 'Invoice date', type: 'date', answer: '2026-01-14' },
        { label: 'Invoice amount', type: 'number', answer: -20, hint: 'Credit memos are negative' },
        { label: 'Match type', type: 'select', options: ['Price correction', 'Quantity correction', 'No match'], answer: 'Price correction' },
        { label: 'Corrected invoice', type: 'text', answer: 'LGF-1042' },
        { label: 'Unit price correction', type: 'number', answer: -0.02 },
      ],
      explain: `<p>A price decrease from the supplier is entered as a credit memo (a negative amount) that corrects the unit price of the original matched invoice. It doesn’t change the billed quantity. Revalidating the original invoice then uses the weighted average price, $0.50, and releases the hold.</p>`,
    },
    {
      type: 'text',
      heading: 'Step 4: approval (January 15)',
      html: `<p>Sunny’s invoice approval workflow sends lemon invoices to the requester. Noah gets a notification for LGF-1042 and the credit memo, sees that net $500 matches the 1,000 lemons Noah received, and approves both on January 15. The approval status becomes <em>Workflow approved</em>. Now the invoice has no holds, is validated and approved: it is ready to be paid when it falls due.</p>
<p>Sunny’s <em>Accounting Preference</em> is "Account regardless of approval status", so accounting didn’t have to wait for Noah. But payment did: invoices can’t be paid until they are approved.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: account the $520 invoice',
      instructions: `<p>Create Accounting runs on the night of January 15. Build the journal for invoice LGF-1042 ($520). Remember: the receipt already debited 5110 and credited 2120 for $500, and Sunny’s PO uses 5110 as the variance account for the $20 price variance.</p>`,
      accounts: ['5110 Lemons Cost', '2120 Received Not Invoiced Accrual', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '1310 Inventory – Ingredients'],
      answer: [
        { account: '2120 Received Not Invoiced Accrual', debit: 500, credit: 0 },
        { account: '5110 Lemons Cost', debit: 20, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 520 },
      ],
      explain: `<p>The matched quantity at the PO price ($500) clears the receipt accrual. The extra $0.02 × 1,000 = $20 is an invoice price variance, charged to the PO’s variance account (5110 at Sunny). The full $520 the supplier billed becomes a liability.</p>`,
    },
    {
      type: 'journal',
      title: 'Jan 15 · Invoice LGF-1042 accounted (event: Invoice Validated)',
      lines: [
        { account: '2120 Received Not Invoiced Accrual (101-100-2120-000-000)', debit: 500, credit: 0 },
        { account: '5110 Lemons Cost – price variance (101-200-5110-010-000)', debit: 20, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 0, credit: 520 },
      ],
    },
    {
      type: 'journal',
      title: 'Jan 15 · Credit memo LGF-CM-77 accounted (event: Credit Memo Validated)',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 20, credit: 0 },
        { account: '5110 Lemons Cost – price variance (101-200-5110-010-000)', debit: 0, credit: 20 },
      ],
      note: `<p>The credit memo reverses the variance. Net effect so far: 5110 = $500, 2120 = $0, 2110 = $500 owed to Lemon Grove Farms. Create Accounting ran in Final mode with transfer and post, so Priya sees all of this in the GL the next morning.</p>`,
    },
    {
      type: 'text',
      heading: 'Step 5: January close (February 2)',
      html: `<p>On February 2 Ava closes January. The <strong>Payables Period Close Exceptions Report</strong> is clean: no unaccounted invoices, no unfinished payment requests. Ava closes the Jan-26 Payables period.</p>
<p>The <strong>Payables Trial Balance Report</strong> as of January 31 lists Lemon Grove Farms with two documents: LGF-1042 $520 and LGF-CM-77 −$20, net <strong>$500</strong> unpaid. Together with Sunny’s other open invoices, the total equals Priya’s GL balance for 2110. The <strong>Payables to Ledger Reconciliation</strong> report shows no difference. Priya closes the January GL.</p>`,
    },
    {
      type: 'text',
      heading: 'Step 6: paying on the due date (February 11)',
      html: `<p>Sunny’s scheduled payment process request template <strong>Sunny Weekly Payments</strong> runs every Wednesday. On Wednesday, February 11, it runs with:</p>
<ul>
<li>Pay through date: Friday, February 13. Date basis: Due date.</li>
<li>Business unit: Sunny US BU. Payment method: Electronic.</li>
<li>Disbursement bank account: Sunny Operating Account. Payment process profile: Sunny US Electronic (ISO 20022 format).</li>
<li>Processing options: <em>Review proposed payments</em> on; validation failures: <em>Stop process for review</em>.</li>
</ul>
<p>Oracle selects LGF-1042 (due February 11) and the credit memo LGF-CM-77. Because both are for the same supplier site, the profile’s grouping rules put them in <strong>one payment of $500</strong>. Lemon Grove Farms’ bank account is on its supplier site, so electronic payment is possible. The request stops at <strong>Pending proposed payment review</strong>. Ava checks the proposed payments (Mia already approved the cash forecast from the Payables Cash Requirement Report) and resumes. The payment file is formatted and <strong>Transmitted</strong> to Big River Bank. The payment’s status is <strong>Negotiable</strong>, and Lemon Grove Farms receives a remittance advice email.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: the February 11 payment run',
      instructions: `<p>This is a simplified practice screen, not Oracle’s real page. Fill in the selection criteria and options for Wednesday’s run described above.</p>`,
      formTitle: 'Submit Payment Process Request (practice)',
      fields: [
        { label: 'Template', type: 'text', given: 'Sunny Weekly Payments' },
        { label: 'Payment date', type: 'date', given: '2026-02-11' },
        { label: 'Pay through date', type: 'date', answer: '2026-02-13' },
        { label: 'Date basis', type: 'select', options: ['Due date', 'Pay date'], answer: 'Due date' },
        { label: 'Disbursement bank account', type: 'select', options: ['Sunny Operating Account', 'Lemon Grove Farms bank account'], answer: 'Sunny Operating Account' },
        { label: 'Review proposed payments', type: 'select', options: ['Yes', 'No'], answer: 'Yes' },
        { label: 'Number of payments to Lemon Grove Farms', type: 'number', answer: 1, hint: 'Invoice and credit memo, same supplier site' },
        { label: 'Payment amount to Lemon Grove Farms', type: 'number', answer: 500 },
      ],
      explain: `<p>The pay through date (February 13) picks up everything due by Friday, including LGF-1042 due on February 11. The disbursement bank account is always Sunny’s own account. The invoice ($520) and credit memo (−$20) for the same supplier site are grouped into one $500 payment.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: account the payment',
      instructions: `<p>Sunny accounts payments <strong>at payment issue</strong>. Build the journal for the $500 payment created on February 11.</p>`,
      accounts: ['2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '5110 Lemons Cost', '2120 Received Not Invoiced Accrual', '7110 Bank Charges'],
      answer: [
        { account: '2110 Accounts Payable – Trade', debit: 500, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 500 },
      ],
      explain: `<p>The payment clears the $500 Sunny owed Lemon Grove Farms and reduces cash. The cost and the accrual were handled earlier, so they don’t move now.</p>`,
    },
    {
      type: 'journal',
      title: 'Feb 11 · Payment accounted (event: Payment Created)',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 500, credit: 0 },
        { account: '1110 Cash – Big River Bank (101-100-1110-000-000)', debit: 0, credit: 500 },
      ],
      note: `<p>The payment’s accounting date is in February, so it belongs to the Feb-26 period, which is open.</p>`,
    },
    {
      type: 'text',
      heading: 'Step 7: the bank confirms, and the books are complete (February 13)',
      html: `<p>On February 13, Big River Bank’s electronic statement arrives in Oracle Cash Management. It shows a $500 debit to Lemon Grove Farms. Mia’s reconciliation rules match the statement line to the payment, and the payment status changes to <strong>Cleared</strong>. Because Sunny accounts payments at issue, clearing creates no new journal; it is proof that the money really left the bank. (If Sunny accounted at clearing, the cash entry would be created now instead.)</p>
<p>The nightly Create Accounting already transferred and posted the payment journal, so Priya’s February GL shows it. Let’s check where everything ended up.</p>`,
    },
    {
      type: 'table',
      caption: 'Net effect of the whole story on Sunny’s accounts',
      headers: ['Account', 'Receipt', 'Invoice', 'Credit memo', 'Payment', 'Final balance'],
      rows: [
        ['5110 Lemons Cost', '+500 Dr', '+20 Dr', '−20 (Cr)', '—', '<strong>$500 debit</strong> (the true cost)'],
        ['2120 Received Not Invoiced Accrual', '500 Cr', '500 Dr', '—', '—', '<strong>$0</strong> (nothing left unbilled)'],
        ['2110 Accounts Payable – Trade', '—', '520 Cr', '20 Dr', '500 Dr', '<strong>$0</strong> (nothing owed)'],
        ['1110 Cash – Big River Bank', '—', '—', '—', '500 Cr', '<strong>$500 credit</strong> (cash went down)'],
      ],
    },
    {
      type: 'table',
      caption: 'Status of each document at every step',
      headers: ['Date', 'Step', 'Who', 'What Oracle shows'],
      rows: [
        ['Jan 5', 'PO created and approved', 'Leo', 'PO 2045 open, 1,000 ordered, 0 received, 0 billed'],
        ['Jan 8', 'Receipt', 'Noah', 'PO 2045: 1,000 received; receipt accrual accounted'],
        ['Jan 12', 'Invoice entered and validated', 'Ava', 'LGF-1042 matched, on <strong>Price</strong> hold, not payable'],
        ['Jan 14', 'Credit memo, revalidation', 'Ava', 'LGF-CM-77 entered as price correction; Price hold released'],
        ['Jan 15', 'Approval', 'Noah', 'Approval status <em>Workflow approved</em>'],
        ['Jan 15', 'Create Accounting (Final, transfer, post)', 'Scheduled process', 'Both documents accounted; GL journals posted'],
        ['Feb 2', 'Period close', 'Ava, Priya', 'Payables period Jan-26 <em>Closed</em>; trial balance shows $500 open for LGF'],
        ['Feb 11', 'Payment process request', 'Ava', 'PPR <em>Pending proposed payment review</em>, then file <em>Transmitted</em>; payment <em>Negotiable</em>; invoices paid'],
        ['Feb 13', 'Bank reconciliation', 'Mia', 'Payment <em>Cleared</em>'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'A note about status names',
      html: `<p>Status names for payment process requests, payment files and payments in this table come from Oracle’s Payables guide. Invoice validation and payment status labels on the invoice page are described in plain words here, because their exact wording can differ between the classic and Redwood pages and between releases.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Replay the story in order',
      instructions: `<p>Put the story’s events in the order they happened.</p>`,
      items: [
        'Leo creates PO 2045 for 1,000 lemons at $0.50',
        'Noah records the receipt; the accrual is booked to 2120',
        'Ava matches invoice LGF-1042 for $520; validation places a Price hold',
        'The supplier’s $20 credit memo is entered as a price correction and the hold is released',
        'Noah approves the invoice',
        'Create Accounting transfers and posts the invoice journals',
        'Ava closes January and reconciles Payables to the GL',
        'The payment process request pays $500 and transmits the file',
        'Mia reconciles the bank statement and the payment becomes Cleared',
      ],
      explain: `<p>Order, receive, bill, check, fix, approve, account, close, pay, clear. In real life some steps overlap (accounting doesn’t wait for approval at Sunny), but the payment always comes after the hold is released and the invoice is approved.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Which team owns it?',
      instructions: `<p>In this story, which module or tool did each piece of work?</p>`,
      categories: ['Procurement', 'Payables', 'Payments', 'Subledger Accounting', 'Cash Management'],
      items: [
        { text: 'PO 2045 and Noah’s receipt', answer: 'Procurement' },
        { text: 'Matching LGF-1042 and placing the Price hold', answer: 'Payables' },
        { text: 'Building the $500 payment and the ISO 20022 file', answer: 'Payments' },
        { text: 'Turning the validated invoice into debit/credit lines', answer: 'Subledger Accounting' },
        { text: 'Matching the bank statement line and marking the payment Cleared', answer: 'Cash Management' },
        { text: 'Entering the credit memo as a price correction', answer: 'Payables' },
      ],
      explain: `<p>One business event touches many modules: Procurement orders and receives, Payables handles invoices and holds, Oracle Payments builds and sends payments, Subledger Accounting creates journals, and Cash Management confirms the bank side.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'What a real Payables specialist takes from this story',
      html: `<ul><li><strong>Holds protect money.</strong> The $20 hold saved Sunny $20 on one order, and much more over a year of weekly lemon orders.</li><li><strong>Fix the cause, not the symptom.</strong> Ask "who is right, the PO or the invoice?" before choosing between a credit memo and a PO change.</li><li><strong>Accounting runs alongside the work.</strong> Thanks to receipt accrual and daily Create Accounting, January’s numbers were right before the invoice was even paid.</li><li><strong>The bank has the last word.</strong> A payment isn’t truly finished until it is Cleared.</li></ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Price variance', def: 'The difference between the price on the supplier invoice and the price on the purchase order.' },
        { term: 'Price correction', def: 'A supplier credit or debit document that adjusts the unit price of an invoice matched to a PO, without changing quantity.' },
        { term: 'Weighted average price', def: 'The average unit price of a matched invoice and its price corrections, used by validation to check price tolerance.' },
        { term: 'Procure-to-pay', def: 'The full business cycle from ordering goods to paying for them and recording the cash.' },
        { term: 'Hold resolution', def: 'Finding the cause of a hold and fixing it so validation can release the hold, or releasing it with a recorded reason.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Why did validation place a Price hold on LGF-1042?',
          options: [
            'Noah received fewer lemons than invoiced',
            'The invoice price ($0.52) was 4% above the PO price, more than the 2% tolerance',
            'The invoice had no payment terms',
            'The supplier had no bank account',
          ],
          answer: 1,
          explain: 'Quantities matched, but the price was 4% higher than the PO, beyond the 2% Price Percentage tolerance on the supplier site.',
        },
        {
          q: 'Leo confirms the contract price is $0.50. What is the right fix?',
          options: [
            'Update the PO to $0.52',
            'Manually release the hold and pay $520',
            'Get a $20 credit memo from the supplier and enter it as a price correction',
            'Cancel the receipt',
          ],
          answer: 2,
          explain: 'When the supplier billed the wrong price, a credit memo entered as a price correction brings the weighted average price back to $0.50 and releases the hold.',
        },
        {
          q: 'When the $520 invoice is accounted, which account receives the $20 price variance at Sunny?',
          options: ['2120 Received Not Invoiced Accrual', '5110 Lemons Cost (the PO variance account)', '1110 Cash – Big River Bank', '2210 Sales Tax Payable'],
          answer: 1,
          explain: 'The $500 clears the receipt accrual in 2120; the $20 invoice price variance goes to the variance account on the PO distribution, which at Sunny is 5110.',
        },
        {
          q: 'How many payments does the February 11 run create for Lemon Grove Farms, and for how much?',
          options: ['Two payments: $520 and −$20', 'One payment of $500', 'One payment of $520', 'No payment, because credit memos block payment'],
          answer: 1,
          explain: 'The invoice and credit memo for the same supplier site are grouped into a single $500 payment.',
        },
        {
          q: 'Mia matches the bank statement on February 13. What changes?',
          options: [
            'A new debit to 2110 is created',
            'The payment status becomes Cleared, and with "account at issue" no new journal is created',
            'The invoice is reopened',
            'The January period is reopened',
          ],
          answer: 1,
          explain: 'Reconciliation marks the payment Cleared. Since Sunny accounts payments at issue, the cash entry was already made on February 11.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Types of Holds (Price hold)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/types-of-holds.html' },
    { title: 'Invoice Tolerances', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/invoice-tolerances.html' },
    { title: 'What’s a price correction?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/what-s-a-price-correction.html' },
    { title: 'How Invoice Price Corrections and Tolerances Are Calculated', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoice-price-corrections-and-tolerances-are-calculated.html' },
    { title: 'Variance Accounts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/variance-accounts.html' },
    { title: 'How Invoices and Payments Are Accounted', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoices-and-payments-are-accounted.html' },
    { title: 'How Payment Process Requests Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-payment-process-requests-are-processed.html' },
    { title: 'How Payment Statuses Change', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-payment-statuses-change.html' },
    { title: 'Considerations for Closing a Payables Period', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/considerations-for-closing-a-payables-period.html' },
    { title: 'Guidelines for Payment Accounting Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-payment-accounting-options.html' },
  ],
};
