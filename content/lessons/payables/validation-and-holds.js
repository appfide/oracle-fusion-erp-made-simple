export default {
  slug: 'validation-and-holds',
  title: 'Validation and Holds: The Safety Checks',
  minutes: 20,
  summary:
    'Before any invoice can be accounted or paid, Oracle Fusion must validate it. Validation calculates tax, builds distributions, checks matching and accounts, and places holds on anything suspicious. Learn the invoice statuses, the main hold types and names, and how holds are released.',
  objectives: [
    'Explain what invoice validation does and the two ways to run it',
    'Read an invoice’s validation, approval, accounting and paid statuses',
    'Recognize the main hold types and common hold names, and which block accounting',
    'Choose the right way to release a hold: fix and revalidate, release manually, or route through the hold resolution workflow',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The airport security check',
      html: `<p>Before you get on a plane, your bag goes through a scanner. Most bags roll straight through. But if the scanner sees something odd — a water bottle, scissors — the bag is pulled aside. It can’t go on the plane until someone fixes the problem (pour out the water) or a security officer looks and says “that’s fine, let it go.”</p>
<p>Invoice <strong>validation</strong> is the scanner, and a <strong>hold</strong> is the bag pulled aside. <span class="hl">No invoice gets paid until it passes the scanner and every hold is cleared.</span></p>`,
    },
    {
      type: 'text',
      heading: 'What validation does',
      html: `<p>In Oracle Fusion Payables you <strong>must validate an invoice before you can pay it or create accounting for it</strong>. Validation is like a full health check. It:</p>
<ul>
<li>creates the invoice <strong>distributions</strong> (from default accounts, distribution sets, and freight or miscellaneous allocations),</li>
<li><strong>calculates tax</strong> and creates tax lines and distributions,</li>
<li>calculates <strong>withholding</strong> and can create withholding tax invoices (if set up that way),</li>
<li>checks <strong>matching variances</strong> between ordered, received, consumed and billed quantities or amounts, using the invoice tolerances,</li>
<li>checks <strong>accounts</strong>, <strong>project</strong> details, <strong>currency conversion rates</strong> and whether the <strong>accounting period</strong> is open,</li>
<li>reserves funds when <strong>budgetary control</strong> is used,</li>
<li>and finally <strong>places or releases holds</strong>.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: two ways to validate',
      html: `<ul>
<li><strong>The Validate action</strong> – on the Create and Edit Invoice pages, the Manage Invoices page, or the Invoices landing page. Good for one invoice right now.</li>
<li><strong>The Validate Payables Invoices process</strong> – a scheduled process that validates many invoices at once. Most companies schedule it to run several times a day. Its <strong>Option</strong> parameter can be <em>All</em> (everything not yet validated, including invoices with unreleased holds) or <em>New</em> (only distributions entered or imported since the last run). It can also be limited to an <strong>invoice group</strong>.</li>
</ul>
<p>You can also validate through the Invoices REST API.</p>`,
    },
    {
      type: 'text',
      heading: 'The four statuses of an invoice',
      html: `<p>An invoice in Oracle Fusion doesn’t have just one status — it has several, each answering a different question. Ava learns to read them like traffic lights:</p>`,
    },
    {
      type: 'table',
      caption: 'Invoice statuses Ava checks every day',
      headers: ['Question', 'Status field', 'Typical values'],
      rows: [
        ['Has it passed the safety checks?', '<strong>Validation</strong>', '<em>Not validated</em> (the starting value) → <em>Validated</em>. If someone changes a validated invoice (for example a new line), it must be validated again.'],
        ['Has it been approved?', '<strong>Approval</strong>', '<em>Required</em>, <em>Initiated</em>, <em>Workflow approved</em>, <em>Manually approved</em>, <em>Rejected</em>, <em>Withdrawn</em>, <em>Held from approval</em> … (next lesson)'],
        ['Has accounting been created?', '<strong>Accounting</strong>', '<em>Unaccounted</em> (the starting value) → accounted'],
        ['Has it been paid?', '<strong>Paid</strong>', '<em>Unpaid</em> (the starting value), <em>Partially paid</em>, <em>Paid</em>'],
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Read the statuses',
      instructions: `<p>Ava has just saved a brand-new invoice from Sweet Sugar Co. but hasn’t done anything else yet. Fill in the starting value of each status (use Oracle’s words).</p>`,
      html: `<p>Validation status: {{}}<br>Accounting status: {{}}<br>Paid status: {{}}</p>`,
      blanks: [
        { answer: ['Not validated', 'Not validated status'], hint: 'Two words: the opposite of “Validated”.' },
        { answer: ['Unaccounted'], hint: 'One word starting with “Un”.' },
        { answer: ['Unpaid'], hint: 'One word starting with “Un”.' },
      ],
      explain: `<p>A new invoice starts as <strong>Not validated</strong>, <strong>Unaccounted</strong> and <strong>Unpaid</strong>. Validation must happen first; only then can it be accounted and paid.</p>`,
    },
    {
      type: 'text',
      heading: 'What is a hold?',
      html: `<p>A <strong>hold</strong> is a flag on an invoice (or on one installment) that says “stop — something needs attention.” Every hold <strong>prevents payment</strong>. Some holds <strong>also prevent accounting</strong>, for example when the account itself is invalid.</p>
<p>Holds come in two flavours:</p>
<ul>
<li><strong>System holds</strong> – placed automatically by validation when it finds an exception. Some can only be removed by <em>fixing the cause</em> and validating again. Others (most matching holds) can also be released by hand.</li>
<li><strong>Manual holds</strong> – placed by a person on purpose (“don’t pay this until the dispute is settled”). A manual hold must be released manually.</li>
</ul>
<p>Every hold belongs to a <strong>hold type</strong>. You can see the predefined holds, and define your own, on the <strong>Manage Invoice Holds and Releases</strong> page. User-defined holds are only allowed for the <em>Invoice Hold Reason</em> and <em>Invoice Line Reason</em> types.</p>`,
    },
    {
      type: 'table',
      caption: 'Predefined hold types in Oracle Fusion Payables',
      headers: ['Hold type', 'What it is about', 'Your own holds allowed?'],
      rows: [
        ['Account Hold Reason', 'Invalid or wrong accounts.', 'No'],
        ['Future Period Hold Type', 'Invoice dated in a future accounting period.', 'No'],
        ['Insufficient Information', 'Missing information on the invoice.', 'No'],
        ['Invoice Hold Reason', 'Holds on the whole invoice, such as Amount, Supplier or Invalid PO.', 'Yes'],
        ['Invoice Line Reason', 'Holds on an individual invoice line.', 'Yes'],
        ['Matching Hold Reason', 'Differences between the invoice and the PO, receipt or consumption advice.', 'No'],
        ['Variance Hold Reason', 'Amounts that don’t add up, such as distributions or tax.', 'No'],
      ],
    },
    {
      type: 'table',
      caption: 'Common holds you will meet (names as shown in Oracle’s “Types of Holds” topic)',
      headers: ['Hold name', 'Why it is placed', 'Accounting allowed?', 'Release by hand?', 'Usual fix'],
      rows: [
        ['<strong>Dist Variance</strong>', 'The invoice amount isn’t equal to the total of its distributions.', 'No', 'No', 'Correct the distributions or the invoice amount, then validate.'],
        ['<strong>Dist Acct Invalid</strong>', 'A distribution uses an invalid account.', 'No', 'No', 'Correct the account, then validate.'],
        ['<strong>No Rate</strong>', 'A foreign currency invoice has no exchange rate.', 'No', 'No', 'Enter the rate (or run the missing rates process), then validate.'],
        ['<strong>Qty Rec</strong>', 'Billed quantity is more than received quantity plus tolerance.', 'Yes', 'Yes', 'Record the receipt, then validate.'],
        ['<strong>Qty Ord</strong>', 'Billed quantity is more than ordered quantity plus tolerance.', 'Yes', 'Yes', 'Correct the PO or invoice, then validate.'],
        ['<strong>Price</strong>', 'Invoice price is above PO price plus tolerance.', 'Yes', 'Yes', 'Price correction, PO change, or manual release.'],
        ['<strong>Matching Required</strong>', 'The site requires matching but the invoice isn’t matched.', 'Yes', 'Yes', 'Match the invoice to a PO or receipt.'],
        ['<strong>Amount</strong>', 'Invoice amount is above the supplier site’s invoice amount limit.', 'Yes', 'Yes', 'Check the invoice, or release after review.'],
        ['<strong>Supplier</strong>', 'The supplier site holds all unvalidated invoices.', 'Yes', 'Yes', 'Release after review; turn off the site option if no longer needed.'],
        ['<strong>Invalid PO</strong>', 'Placed by a person when the supplier gave no valid PO number.', 'No', 'Yes', 'Get a valid PO from the supplier, then release.'],
        ['<strong>Tax Variance</strong>', 'Tax amount is outside the tax tolerance.', 'Yes', 'Yes', 'Fix the tax rate or code, then validate.'],
        ['<strong>Insufficient Funds</strong>', 'With budgetary control, the budget is too small.', 'No', 'Yes', 'Add budget or change the account, then validate.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Which holds can Ava release by hand?',
      instructions: `<p>Some holds can be released manually; others can only be cleared by fixing the problem and validating again. Sort each hold.</p>`,
      categories: ['Can be released manually', 'Must fix and revalidate'],
      items: [
        { text: 'Price', answer: 'Can be released manually' },
        { text: 'Dist Variance', answer: 'Must fix and revalidate' },
        { text: 'Qty Rec', answer: 'Can be released manually' },
        { text: 'Dist Acct Invalid', answer: 'Must fix and revalidate' },
        { text: 'No Rate', answer: 'Must fix and revalidate' },
        { text: 'Matching Required', answer: 'Can be released manually' },
        { text: 'Amount', answer: 'Can be released manually' },
      ],
      explain: `<p>Matching and invoice holds (Price, Qty Rec, Matching Required, Amount) may be released by an authorized person after review. Holds about broken data — distributions that don’t add up, an invalid account, a missing exchange rate — would produce wrong accounting, so Oracle only removes them when the data is fixed and the invoice is validated again.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: holds set on the supplier site',
      html: `<p>The <strong>Invoicing</strong> sub-tab of a supplier site has hold options that act on every invoice for that site:</p>
<ul>
<li><strong>Invoice amount limit</strong> – invoices above the limit get an <em>Amount</em> hold.</li>
<li><strong>Hold all payments</strong> – no invoice for this site can be selected for payment (these sites are listed on the Payments landing page). This one is not a hold on the invoice itself.</li>
<li><strong>Hold unmatched invoices</strong> – unmatched invoices get a <em>Matching Required</em> hold.</li>
<li><strong>Hold unvalidated invoices</strong> – new invoices get a <em>Supplier</em> hold.</li>
</ul>
<p>You can also put a hold on a single <strong>installment</strong>: for example, pay half of an invoice now and hold the other half until the second desk arrives.</p>`,
    },
    {
      type: 'lab',
      tool: 'three-way-match',
      title: 'Lab: will this invoice go on hold?',
      intro: `<p>Cup & Straw Supply billed <strong>5,000 cups at $0.05</strong>, but Noah has received only <strong>4,000</strong>. The PO is 3-way with 0% quantity tolerance and 5% price tolerance. Run the check, then try: (1) change the received quantity to 5,000, (2) change the invoice price to $0.06. Which hold appears each time?</p>`,
      preset: { poQty: 5000, poPrice: 0.05, rcvQty: 4000, invQty: 5000, invPrice: 0.05, qtyTol: 0, priceTol: 5, level: 3 },
    },
    {
      type: 'text',
      heading: 'Three ways to get rid of a hold',
      html: `<ol>
<li><strong>Fix the cause and validate again.</strong> Correct the distribution, record the missing receipt, enter the exchange rate. Validation sees the problem is gone and <em>releases the system hold automatically</em>. This is always the best option when possible.</li>
<li><strong>Release it manually.</strong> For manually releasable holds, an authorized user picks a <strong>release reason</strong> and releases the hold — from the Invoices landing page, the Invoice Details page, the <kbd>Manage Holds</kbd> action on the invoice, or the <kbd>Release Holds</kbd> action on Manage Invoices. Release reasons belong to release types such as Matching Release Reason or Invoice Release Reason. The release is recorded, so auditors can see who released what and why.</li>
<li><strong>Route it through the hold resolution workflow.</strong> If a hold has the <strong>Allow Holds Resolution Routing</strong> option turned on, invoices with that hold are sent as notifications. By default, PO-matched invoices go to the <strong>buyer</strong> on the PO and unmatched invoices go to the <strong>requester</strong> on the invoice. They can release the hold straight from the notification.</li>
</ol>
<p>There is also an <strong>invoice account coding workflow</strong>: if enabled in the invoice options, an invoice placed on a distribution variance hold can be routed to someone who knows which accounts to use.</p>`,
    },
    {
      type: 'example',
      title: 'Ava clears three holds',
      html: `<p>After the morning validation run, the <strong>Holds</strong> infotile shows three invoices.</p>`,
      steps: [
        '<strong>Sweet Sugar Co., $210 — Dist Variance.</strong> The header says $210, but the only distribution is $200; Ava forgot to allocate the $10 freight line. Ava allocates the freight and validates. The hold disappears.',
        '<strong>Lemon Grove Farms, $550 — Price.</strong> The supplier billed $0.55 instead of $0.50 per lemon. The hold resolution workflow sends it to Leo, the buyer. Leo confirms the PO price is right, and the supplier sends a $50 credit memo, which Ava enters as a price correction. Revalidation releases the hold.',
        '<strong>Bright Power Utility, $150 — Matching Required.</strong> Someone switched on <em>Hold unmatched invoices</em> for the utility’s site by mistake. Electricity never has a PO. Ava’s supervisor releases the hold with a release reason (“utility – no PO expected”) and asks the Supplier Administrator to turn the site option off.',
      ],
      result: `<p>Each hold was cleared the right way: data errors were fixed, the price problem went to the person who owns the PO, and the false alarm was released with a reason and its root cause fixed.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: release a hold',
      instructions: `<p>This is a simplified practice screen (not Oracle’s real page). Ava’s supervisor is releasing the <em>Matching Required</em> hold on the Bright Power Utility invoice from the example above. Fill in the release.</p>`,
      formTitle: 'Release Invoice Hold (practice)',
      fields: [
        { label: 'Invoice', given: 'BPU-0326 — Bright Power Utility — $150.00' },
        { label: 'Hold name', given: 'Matching Required' },
        { label: 'Hold type', type: 'select', options: ['Account Hold Reason', 'Matching Hold Reason', 'Variance Hold Reason', 'Invoice Hold Reason'], answer: 'Matching Hold Reason', hint: 'The hold is about matching to a PO.' },
        { label: 'Can this hold be released manually?', type: 'select', options: ['Yes', 'No'], answer: 'Yes' },
        { label: 'Release type to use', type: 'select', options: ['Matching Release Reason', 'Account Release Reason', 'Future Period Release', 'Sufficient Information'], answer: 'Matching Release Reason' },
        { label: 'Amount that will be payable after release ($)', type: 'number', answer: 150 },
      ],
      explain: `<p>Matching Required is a <strong>Matching Hold Reason</strong> hold and is manually releasable, so a <strong>Matching Release Reason</strong> is used. Releasing it does not change the amount: the full $150 becomes payable (once any approval is done). Always fix the root cause too — here, the supplier site option.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Your own rules: user-defined holds',
      html: `<p>Companies can create their own automatic holds with <strong>user-defined holds</strong>. Using a spreadsheet template from the <strong>Manage User-Defined Rules for Payables</strong> setup task, you write rules based on invoice header, line and other attributes — for example “hold any non-PO invoice over $5,000 from a new supplier” or “hold capital equipment purchases for review”. Oracle checks the rules for invoices from every source and can also release the hold automatically when the condition no longer applies.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: find and release a hold',
      items: [
        'Go to <kbd>Payables</kbd> &gt; <kbd>Invoices</kbd>. In the <kbd>Holds</kbd> infotile, click a hold category (for example a matching hold).',
        'In the table that appears, select an invoice and open it to see the hold details: hold name, reason and date placed.',
        'If the hold is caused by data (an account, a distribution, a receipt), fix the data and use <kbd>Validate</kbd>.',
        'If the hold is manually releasable and you are authorized, use <kbd>Release</kbd> (or the <kbd>Manage Holds</kbd> action), choose a release reason, add a comment, and save.',
        'Check that the invoice’s validation status is now Validated.',
      ],
      note: `<p>Release buttons and actions appear on several pages (landing page, Invoice Details, Manage Invoices) and labels vary by release and Redwood adoption. Many companies restrict manual release to supervisors.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Don’t just click “Release”',
      html: `<p>Holds exist to protect the company’s money. Releasing a Price hold without asking the buyer may mean paying an overcharge; releasing a Qty Rec hold may mean paying for goods that never came. Good AP teams investigate first, write a meaningful release reason, and track which holds are released most often — a sign that a tolerance or a supplier setup needs fixing.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Invoice validation', def: 'The Payables check that calculates tax, builds distributions, checks matching and accounts, and places or releases holds.' },
        { term: 'Validate Payables Invoices', def: 'The scheduled process that validates many invoices at once.' },
        { term: 'Hold', def: 'A flag that stops an invoice or installment from being paid, and sometimes from being accounted, until it is resolved.' },
        { term: 'System hold', def: 'A hold placed automatically by validation when it finds a problem.' },
        { term: 'Manual hold', def: 'A hold a person places on purpose; it must be released by hand.' },
        { term: 'Release reason', def: 'The recorded explanation chosen when someone releases a hold manually.' },
        { term: 'Hold resolution workflow', def: 'A workflow that sends invoices with manually releasable holds to the right person, such as the buyer, to resolve.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'What must happen before an invoice can be accounted or paid?',
          options: ['It must be validated', 'It must be printed', 'It must be imported', 'It must be a prepayment'],
          answer: 0,
          explain: 'Oracle requires validation first. Validation also places holds that block payment until resolved.',
        },
        {
          q: 'An invoice header is $210 but the distributions total $200. Which hold will validation place?',
          options: ['Price', 'Dist Variance', 'Amount', 'Supplier'],
          answer: 1,
          explain: 'Dist Variance means the invoice amount does not equal the sum of its distributions. Fix the distributions and validate again.',
        },
        {
          q: 'Which hold also blocks accounting, not just payment?',
          options: ['Price', 'Qty Rec', 'Dist Acct Invalid', 'Amount'],
          answer: 2,
          explain: 'An invalid account would produce wrong journal entries, so accounting is not allowed until it is fixed. Many matching holds still allow accounting.',
        },
        {
          q: 'By default, where does the hold resolution workflow send a PO-matched invoice with a manually releasable hold?',
          options: ['To the supplier', 'To the buyer on the purchase order', 'To the CFO', 'Nowhere; it is released automatically'],
          answer: 1,
          explain: 'The default routing sends PO-matched invoices to the buyer and unmatched invoices to the requester, who can release the hold from the notification.',
        },
        {
          q: 'A supplier site has an invoice amount limit of $1,000. A $1,500 invoice is validated. What happens?',
          options: ['It is rejected', 'It gets an Amount hold', 'It is paid immediately', 'It becomes a prepayment'],
          answer: 1,
          explain: 'Invoices above the site’s invoice amount limit get an Amount hold, which can be released after review.',
        },
      ],
    },
  ],
  sources: [
    { title: 'How Invoices Are Validated (Using Payables Invoice to Pay, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoices-are-validated.html' },
    { title: 'Types of Holds', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/types-of-holds.html' },
    { title: 'Invoice Holds and Releases', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-holds-and-releases.html' },
    { title: 'How Invoice Holds Work', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoice-holds-work.html' },
    { title: 'How Routing Invoices with Manually-Releasable Holds Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-routing-invoices-with-manually-releasable-holds-are.html' },
    { title: 'Overview of User-Defined Holds', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-user-defined-holds.html' },
    { title: 'Invoice Tolerances', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/invoice-tolerances.html' },
    { title: 'Guidelines For Invoice Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-invoice-options.html' },
    { title: 'Create an Invoice (Invoices REST API – status attributes)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/farfa/op-invoices-post.html' },
    { title: 'Invoices Landing Page', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/introducing-the-invoices-landing-page.html' },
  ],
};
