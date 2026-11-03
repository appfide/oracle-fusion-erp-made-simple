export default {
  slug: 'receipts',
  title: 'Receipts: When the Money Arrives',
  minutes: 19,
  summary:
    'When a customer pays, Receivables records a receipt and applies it to the invoices it pays. Learn receipt classes and methods, manual receipts, lockbox, automatic receipts, miscellaneous receipts, AutoMatch and AutoApply cash application, unapplied and on-account cash, reversals, remittance and the journals behind them.',
  objectives: [
    'Explain what a receipt is and the difference between creating and applying it',
    'Describe the main ways receipts enter Oracle: manual, spreadsheet, lockbox, automatic and miscellaneous',
    'Explain how AutoMatch, AutoApply and AutoCash help apply cash automatically',
    'Tell unidentified, unapplied, applied and on-account money apart',
    'Choose correctly between reversing, unapplying and deleting a receipt',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The envelope with a sticky note',
      html: `<p>Mrs. Lee comes back on Saturday and hands you an envelope with $4 inside. On the envelope is a sticky note: <em>“For the 4 cups of lemonade.”</em></p>
<p>You do two things. First you <strong>count the money and put it in the jar</strong> — now you have it. Then you open your notebook, find the line <em>“Mrs. Lee owes $4”</em>, and <strong>tick it off</strong>.</p>
<p>Oracle does the same two steps. Recording the money is <span class="hl">creating a receipt</span>. Ticking off the right bill is <span class="hl">applying the receipt</span>. If there were no sticky note, you would have money but not know which bill it pays — that is a very common puzzle in real Receivables teams!</p>`,
    },
    {
      type: 'text',
      heading: 'What a receipt is',
      html: `<p>A <strong>receipt</strong> in Oracle Receivables is a record of money received. There are two big kinds:</p>
<ul>
<li><strong>Standard receipts</strong> – payments from customers for their invoices (Oracle calls this “cash” type). These are applied to transactions.</li>
<li><strong>Miscellaneous receipts</strong> – money that has nothing to do with a customer invoice, such as interest from the bank or a refund of a bank fee. They go straight to an account through a <strong>Receivables activity</strong> of type Miscellaneous Cash.</li>
</ul>
<p>A standard receipt moves through states. Oracle’s receipt table uses these statuses, which match words you will hear every day:</p>
<ul>
<li><strong>Unidentified</strong> – we got money but don’t know which customer sent it.</li>
<li><strong>Unapplied</strong> – we know the customer, but the money isn’t (fully) applied to invoices yet.</li>
<li><strong>Applied</strong> – the whole amount is applied to invoices or deliberately placed <strong>on account</strong>.</li>
<li><strong>Reversed</strong> – the receipt was undone, for example a bounced check (insufficient funds) or a stop payment.</li>
</ul>`,
    },
    {
      type: 'slides',
      title: 'The setup behind receipts',
      slides: [
        {
          icon: '🗂️',
          title: 'Receipt class: the processing recipe',
          html: `<p>A <strong>receipt class</strong> decides the steps a receipt goes through:</p><ul><li><strong>Creation method</strong>: Manual (typed, spreadsheet or lockbox) or Automatic (created by the automatic receipt process).</li><li><strong>Remittance method</strong>: Standard, Factoring, Standard and Factoring, or No Remittance.</li><li><strong>Clearance method</strong>: Directly, By Automatic Clearing, or By Matching (in Cash Management).</li></ul>`,
        },
        {
          icon: '💳',
          title: 'Receipt method: how the customer pays',
          html: `<p>Each class holds one or more <strong>receipt methods</strong> — for example “Check”, “Bank Transfer” or “Direct Debit”. A receipt method is linked to one or more <strong>remittance bank accounts</strong>, which decide where the money lands (for Sunny: the <em>Sunny Operating Account</em> at Big River Bank) and which legal entity owns the receipt.</p>`,
        },
        {
          icon: '🏦',
          title: 'Remittance bank account: the accounts used',
          html: `<p>The remittance bank account setup holds the GL accounts used for cash, unapplied receipts, unidentified receipts, on-account receipts and more. That is how Oracle knows which accounts to use when you create or apply a receipt.</p>`,
        },
        {
          icon: '👤',
          title: 'Customer: default receipt method',
          html: `<p>Customers can have a primary receipt method on their account or site. Customers who pay by direct debit need an automatic receipt method <em>and</em> a bank account stored for them (kept securely in Oracle Payments).</p>`,
        },
      ],
    },
    {
      type: 'table',
      caption: 'Ways money comes into Receivables',
      headers: ['Way', 'When it is used', 'In Oracle Fusion'],
      rows: [
        ['<strong>Manual standard receipt</strong>', 'A check or transfer arrives and someone keys it in.', '<kbd>Create Receipt</kbd> in the Receivables Balances work area; the <kbd>Submit and AutoApply Now</kbd> button can apply it automatically.'],
        ['<strong>Spreadsheet</strong>', 'Many receipts at once from a list.', 'The Create Receipt Batches ADFdi spreadsheet.'],
        ['<strong>Lockbox</strong>', 'The bank collects customer payments and sends a file.', 'The <strong>Process Receipts Through Lockbox</strong> process: import, validate, then post (apply) receipts.'],
        ['<strong>Automatic receipts</strong>', 'Customers agreed to direct debit or card charges.', 'Create an automatic receipt batch, approve, confirm if needed, then remit to the bank.'],
        ['<strong>Miscellaneous receipt</strong>', 'Non-invoice money (bank interest, fee refunds).', 'Created against a Miscellaneous Cash Receivables activity.'],
        ['<strong>From bank statements (AI-assisted)</strong>', 'Payments seen on the bank statement but not yet recorded.', 'Recent releases add a <strong>Cash Processing Agent</strong> that helps create receipts and investigate unidentified and unapplied ones.'],
      ],
    },
    {
      type: 'text',
      heading: 'Applying cash: matching money to invoices',
      html: `<p>Applying receipts is the heart of the job. A busy company receives thousands of payments, often with messy remittance details like “INV 1O23” (letter O instead of zero). Oracle has several tools that work together:</p>
<ul>
<li><strong>Match Receipts By</strong> – which document number to compare: transaction number, purchase order number, sales order number, contract number, shipping reference, or (lockbox only) balance forward billing number. Set at site, account, lockbox or system-option level.</li>
<li><strong>AutoMatch rule set</strong> – scores how closely a remittance reference matches open transactions, and sets thresholds for automatic application versus “recommend to a human.” It also handles string clean-up, such as ignoring prefixes.</li>
<li><strong>AutoApply</strong> – when switched on (for lockbox, or in system options for manual receipts), it applies receipts automatically using the AutoMatch rule set and shows ranked <strong>recommendations</strong> with reasons for the rest.</li>
<li><strong>Application exception rule set</strong> – decides what to do with small over- or underpayments after application, such as writing them off automatically within limits.</li>
<li><strong>AutoCash rule set</strong> – used when a receipt can’t be matched to specific invoices (for example in lockbox), to apply cash using rules like “oldest invoice first.”</li>
<li><strong>Apply Receipts Using AutoMatch</strong> – a scheduled process that sweeps unapplied receipts and applies them using AutoMatch.</li>
</ul>`,
    },
    {
      type: 'flow',
      title: 'Life of Happy Cafe’s payment',
      steps: [
        { icon: '🏦', label: 'Money arrives', detail: 'Happy Cafe sends $420 by bank transfer with the note “Invoice 10045”.' },
        { icon: '⌨️', label: 'Create receipt', detail: 'Omar creates a standard receipt: receipt method Bank Transfer, amount $420, customer Happy Cafe, reference 10045.' },
        { icon: '🎯', label: 'AutoApply', detail: 'AutoMatch finds an exact match on transaction number 10045 and applies the receipt.' },
        { icon: '✅', label: 'Invoice closed', detail: 'Invoice 10045 balance is $0. The receipt status is Applied.' },
        { icon: '📒', label: 'Accounting', detail: 'Create Receivables Accounting turns the receipt and application into journals for the GL.' },
        { icon: '🔁', label: 'Bank match', detail: 'Mia later reconciles the receipt to the bank statement line in Cash Management.' },
      ],
    },
    {
      type: 'journal',
      title: 'Receipt of $420 created and fully applied (Oracle default pattern)',
      lines: [
        { account: '1110 Cash – Big River Bank', debit: 420, credit: 0 },
        { account: 'Unapplied Receipts (clearing account)', debit: 0, credit: 420 },
        { account: 'Unapplied Receipts (clearing account)', debit: 420, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 420 },
      ],
      note: `<p>Oracle first records the cash against an <strong>unapplied</strong> account, then moves it out when the receipt is applied to the invoice. The two unapplied lines cancel out, so the net effect is simply <strong>Dr Cash / Cr Accounts Receivable</strong>. (Our simple Sunny COA doesn’t list an unapplied account number; Jordan would set one up for the remittance bank account. This pattern assumes a receipt class with No Remittance and Directly clearing.)</p>`,
    },

    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: enter and apply Sunshine School’s payment',
      instructions: `<p>On 15 August 2026 Sunshine School sends a <strong>bank transfer of $525</strong> with the note “Payment for invoice 10052”. Invoice 10052 has an open balance of $525. Enter the receipt and apply it in full.</p>`,
      formTitle: 'Practice screen — Create Receipt (simulation)',
      fields: [
        { label: 'Business unit', given: 'Sunny US BU' },
        { label: 'Receipt method', type: 'select', options: ['Check', 'Bank Transfer', 'Direct Debit'], answer: 'Bank Transfer' },
        { label: 'Receipt date', type: 'date', answer: '2026-08-15' },
        { label: 'Receipt amount (USD)', type: 'number', answer: 525 },
        { label: 'Customer', type: 'select', options: ['Happy Cafe', 'City Park Kiosk', 'Sunshine School'], answer: 'Sunshine School' },
        { label: 'Remittance reference (transaction number)', type: 'text', answer: '10052' },
        { label: 'Amount applied to invoice 10052 (USD)', type: 'number', answer: 525 },
        { label: 'Unapplied amount left on the receipt (USD)', type: 'number', answer: 0 },
      ],
      explain: `<p>The bank transfer method points to Sunny’s remittance bank account. Typing the invoice number as the remittance reference lets <strong>AutoApply</strong> find an exact match (Match Receipts By = transaction number). Applying all $525 leaves $0 unapplied, so the receipt becomes <strong>Applied</strong> and the invoice is closed.</p>`,
    },
    {
      type: 'example',
      title: 'Three tricky receipts on Omar’s Monday',
      html: `<p>Not every payment is as neat as Happy Cafe’s. Here is what Omar does with three puzzles.</p>`,
      steps: [
        '<strong>$100 with no name.</strong> A transfer arrives with only “LEMONADE THANKS”. Omar creates the receipt <em>without</em> a customer: it is <strong>Unidentified</strong> (Dr Cash, Cr Unidentified). After calling City Park Kiosk, Omar adds the customer, and the receipt becomes Unapplied, ready to apply.',
        '<strong>Sunshine School pays $300 but says “for next month’s order.”</strong> There’s no invoice yet, so Omar applies the money <strong>on account</strong>. It stays on the school’s account as a credit until the next invoice arrives.',
        '<strong>City Park Kiosk pays $150 on a $157.50 invoice.</strong> The $7.50 short payment is more than Sunny’s write-off limit. Omar applies $150, leaving $7.50 open, and emails the kiosk. (Omar could also create a chargeback for the $7.50 if Sunny wanted a separate item.)',
      ],
      result: `<p>The goal every day: as little money as possible sitting in Unidentified or Unapplied. Money that isn’t applied makes customers look late when they are not.</p>`,
    },
    {
      type: 'journal',
      title: 'Miscellaneous receipt: Big River Bank refunds a $10 fee it charged by mistake',
      lines: [
        { account: '1110 Cash – Big River Bank', debit: 10, credit: 0 },
        { account: '7110 Bank Charges', debit: 0, credit: 10 },
      ],
      note: `<p>No customer and no invoice — so it is a <strong>miscellaneous receipt</strong>. The Receivables activity chosen on the receipt supplies the 7110 account.</p>`,
    },

    {
      type: 'exercise',
      kind: 'classify',
      title: 'Name the state of the money',
      instructions: `<p>For each situation, choose how the money would be described in Oracle Receivables.</p>`,
      categories: ['Unidentified receipt', 'Unapplied receipt', 'Applied receipt', 'On-account cash', 'Miscellaneous receipt'],
      items: [
        { text: 'A $100 transfer arrives with no customer name or reference', answer: 'Unidentified receipt' },
        { text: 'Happy Cafe’s $420 payment is matched to invoice 10045 and closes it', answer: 'Applied receipt' },
        { text: 'City Park Kiosk is known as the payer, but nobody has applied its $200 yet', answer: 'Unapplied receipt' },
        { text: 'Sunshine School pays $300 for next month’s order, and Omar deliberately parks it as a credit on the account', answer: 'On-account cash' },
        { text: 'Big River Bank pays Sunny $12 of interest', answer: 'Miscellaneous receipt' },
      ],
      explain: `<p>Unidentified = we don’t know <em>who</em>. Unapplied = we know who, but not <em>which invoice</em> yet. Applied = matched to invoices. On-account = deliberately kept as a customer credit for later. Miscellaneous = money with no customer invoice at all. Oracle counts on-account money as part of an <strong>Applied</strong> receipt, because you made a decision about it.</p>`,
    },
    {
      type: 'table',
      caption: 'Reverse, unapply or delete? (Oracle’s rules in plain words)',
      headers: ['Action', 'Use it when…', 'What happens'],
      rows: [
        ['<strong>Reverse</strong>', 'The money never really arrived: the check bounced (insufficient funds) or payment was stopped.', 'Reversal journals are created and the invoices it closed are reopened. Not possible if the receipt is already reconciled in Cash Management.'],
        ['<strong>Debit memo reversal</strong>', 'You must reverse but keep the link to the billing activity (e.g. the receipt had a chargeback with activity).', 'Creates one new receivable (a debit memo) for the net amount instead of reopening items.'],
        ['<strong>Unapply</strong>', 'The money is real but was applied to the wrong invoice, or must be refunded or put on account.', 'The application is removed; you can reapply the money correctly.'],
        ['<strong>Delete</strong>', 'A manual receipt was created by mistake and never applied (or an automatic receipt in an unapproved batch).', 'The receipt disappears.'],
      ],
    },

    {
      type: 'exercise',
      kind: 'journal',
      title: 'The check bounced: build the reversal',
      instructions: `<p>City Park Kiosk paid a $315 invoice by check, and Omar applied it. A week later Big River Bank returns the check: insufficient funds. Omar <strong>reverses</strong> the receipt. Build the net accounting effect of the reversal.</p>`,
      accounts: ['1110 Cash – Big River Bank', '1210 Accounts Receivable', '4110 Lemonade Sales Revenue', '7110 Bank Charges', '2210 Sales Tax Payable'],
      answer: [
        { account: '1210 Accounts Receivable', debit: 315, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 315 },
      ],
      explain: `<p>Reversing undoes the original receipt (which was Dr Cash / Cr Receivables). The cash we thought we had is gone (credit cash), and the kiosk owes us again because the invoice reopens (debit receivables). Revenue and tax are untouched — the sale still happened. Next step: collections follows up with the kiosk.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: automatic receipts, remittance and clearing',
      html: `<p><strong>Automatic receipts</strong> are for customers who agreed that you may collect from their bank account or card (direct debit). The steps are: prepare transactions with the right receipt method and customer bank details → create the automatic receipt batch → review and approve (card payments get authorized through Oracle Payments) → confirm if your process needs customer confirmation → <strong>remit</strong> to the bank. Rules on the receipt method decide how many receipts to create, for example <em>One per Customer</em> or <em>One per Invoice</em>. ISO 20022 / SEPA direct debit is supported.</p>
<p><strong>Remittance</strong> is how you send receipts to your bank, for example in a remittance batch (Oracle has a <strong>Create Receipt Remittance Batch</strong> page). <strong>Clearing</strong> confirms the bank actually credited you — either with the <strong>Clear Receipts Automatically</strong> process or by reconciling in Cash Management. Factored remittances (selling receivables to a bank) also exist for more advanced cases.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: create and apply a receipt',
      items: [
        'Navigator: <kbd>Receivables</kbd> &gt; <kbd>Accounts Receivable</kbd> (the Receivables Balances work area).',
        'From the <kbd>Tasks</kbd> panel choose <kbd>Create Receipt</kbd>.',
        'Enter the business unit, receipt method, receipt number, amount, receipt date and accounting date. Enter the customer, and the invoice number as the remittance reference if you have it.',
        'Click <kbd>Submit and AutoApply Now</kbd> to let AutoApply apply it, or add applications yourself by selecting the open transactions.',
        'Later, use <kbd>Manage Receipts</kbd> to find a receipt and unapply, reapply, reverse or place money on account.',
      ],
      note: `<p>Buttons and labels change between releases and Redwood pages, and some actions depend on your role and on whether AutoApply is enabled in your system options.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips from cash application teams',
      html: `<ul>
<li><strong>Apply cash the same day.</strong> Unapplied cash makes customer balances wrong, which leads to embarrassing reminder emails to customers who already paid.</li>
<li><strong>Ask customers for remittance details.</strong> “Please include the invoice number” on your invoice template saves hours of detective work.</li>
<li><strong>Tune AutoMatch over time.</strong> Look at why recommendations weren’t auto-applied (Oracle shows reason codes) and adjust thresholds or string handling.</li>
<li><strong>Never reverse to fix a wrong application.</strong> Reversing says the money didn’t arrive. If it did arrive, <em>unapply and reapply</em>.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Standard receipt', def: 'A customer payment recorded in Receivables and applied to the customer’s transactions.' },
        { term: 'Miscellaneous receipt', def: 'Money received that is not related to a customer invoice, such as bank interest or a fee refund.' },
        { term: 'Receipt method', def: 'A setup describing how a payment is received and which remittance bank account it goes to.' },
        { term: 'Lockbox', def: 'A bank service that collects customer payments and sends a file that Oracle imports, validates and applies.' },
        { term: 'Automatic receipt', def: 'A receipt created by Oracle to collect money from a customer bank account or card that the customer pre-authorized.' },
        { term: 'Unapplied receipt', def: 'A receipt from a known customer that is not yet fully applied to transactions.' },
        { term: 'On-account cash', def: 'Money placed on a customer’s account as a credit, not tied to a specific invoice yet.' },
        { term: 'AutoMatch', def: 'Oracle rules that score remittance references against open transactions to apply receipts or recommend matches.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'A $100 bank transfer arrives with no customer name. How should Omar record it first?',
          options: [
            'Don’t record it until someone calls',
            'As an unidentified receipt',
            'As a miscellaneous receipt to revenue',
            'As a credit memo',
          ],
          answer: 1,
          explain: 'Record the cash immediately as an unidentified receipt so the bank and books agree. When the customer is found, identify it and apply it.',
        },
        {
          q: 'Omar applied Happy Cafe’s payment to the wrong invoice. What should Omar do?',
          options: ['Reverse the receipt', 'Delete the receipt', 'Unapply it and reapply it to the correct invoice', 'Create a debit memo'],
          answer: 2,
          explain: 'The money really arrived, so it should not be reversed. Unapplying and reapplying fixes the application.',
        },
        {
          q: 'Which Oracle feature applies receipts automatically using AutoMatch scores and shows recommendations for the rest?',
          options: ['AutoInvoice', 'AutoApply', 'AutoAccounting', 'Dunning'],
          answer: 1,
          explain: 'AutoApply uses the active AutoMatch rule set to apply receipts automatically and present ranked recommendations, with exceptions handled by the application exception rule set.',
        },
        {
          q: 'Sunshine School’s check bounced. What is the right action?',
          options: ['Unapply the receipt', 'Reverse the receipt (insufficient funds)', 'Write off the invoice', 'Create a miscellaneous receipt'],
          answer: 1,
          explain: 'A bounced check means no money arrived. Reversing creates reversal journals and reopens the invoices the receipt had closed.',
        },
        {
          q: 'What is the NET accounting effect of receiving $420 and applying it to Happy Cafe’s invoice?',
          options: [
            'Dr 1210 Accounts Receivable / Cr 1110 Cash',
            'Dr 1110 Cash / Cr 1210 Accounts Receivable',
            'Dr 1110 Cash / Cr 4110 Revenue',
            'No accounting at all',
          ],
          answer: 1,
          explain: 'Cash goes up and the receivable goes down. The unapplied account is used in between but nets to zero after full application.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Remittance Methods and Clearance Methods', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/remittance-methods-and-clearance-methods.html' },
    { title: 'How Recommendations for Receipt Application Are Calculated', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/how-recommendations-for-receipt-application-are-calculated.html' },
    { title: 'Lockbox Standard Receipt Import Process', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/lockbox-standard-receipt-import-process.html' },
    { title: 'How Automatic Receipts Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/how-automatic-receipts-are-processed.html' },
    { title: 'Considerations for Reversing Receipts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/considerations-for-reversing-receipts.html' },
    { title: 'What’s the difference between reversing a receipt, unapplying a receipt, and deleting a receipt?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/what-s-the-difference-between-reversing-a-receipt-unapplying-a.html' },
    { title: 'Considerations for Remitting Receipts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/considerations-for-remitting-receipts.html' },
    { title: 'Write-offs and Receipts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/write-offs-and-receipts.html' },
    { title: 'Receivables Accrual Accounting Entries', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/receivables-accrual-accounting-entries.html' },
    { title: 'Cash Processing Agent for receipt processing and cash application (26D What’s New)', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51477.htm' },
  ],
};
