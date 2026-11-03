export default {
  slug: 'transactions',
  title: 'Transactions: Invoices, Credit Memos and Debit Memos',
  minutes: 18,
  summary:
    'In Receivables, every bill-like document is a “transaction.” Learn invoices, credit memos, debit memos, on-account credits and chargebacks; how transaction types and sources control them; manual entry versus AutoInvoice import; printing and delivery; and the accounting behind Happy Cafe’s $420 invoice.',
  objectives: [
    'Name the main Receivables transaction classes and when each is used',
    'Explain what transaction types and transaction sources control',
    'Compare manual entry in the Billing work area with AutoInvoice import',
    'Describe how transactions are completed, printed and delivered',
    'Record the journal entries for an invoice, a credit memo and a debit memo',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Notes you hand to your neighbor',
      html: `<p>Back at your lemonade stand, you keep little notes for neighbors who pay later:</p>
<ul>
<li>📝 <strong>“You owe me $4 for 4 cups.”</strong> — that’s an <strong>invoice</strong>.</li>
<li>🙏 <strong>“Oops, one cup was spilled. You owe me $1 less.”</strong> — that’s a <strong>credit memo</strong>.</li>
<li>➕ <strong>“I forgot to charge for the ice bag. You owe me 50¢ more.”</strong> — that’s a <strong>debit memo</strong>.</li>
</ul>
<p>Each note changes how much the neighbor owes. In Oracle Receivables, all of these notes are called <span class="hl">transactions</span>.</p>`,
    },
    {
      type: 'text',
      heading: 'The family of Receivables transactions',
      html: `<p>Oracle groups transactions into <strong>transaction classes</strong>. The ones you will use most are:</p>
<ul>
<li><strong>Invoice</strong> – the normal bill for goods or services. It increases what the customer owes.</li>
<li><strong>Credit memo</strong> – reduces what the customer owes, usually linked to a specific invoice (returns, damaged goods, a price that was too high, a disputed amount).</li>
<li><strong>On-account credit memo</strong> – a credit that is <em>not yet</em> linked to any invoice. It sits on the customer’s account until someone applies it to an invoice or refunds it.</li>
<li><strong>Debit memo</strong> – an extra charge that isn’t a normal invoice item: a price correction, a forgotten freight charge, or late charges. Oracle notes there is <em>no</em> automatic link between a debit memo and the original invoice, so people use the cross-reference or special instructions fields to explain it.</li>
<li><strong>Chargeback</strong> – a new debit item created when you close an existing one. Classic case: a customer pays $75 on a $100 invoice; you apply the $75 and create a $25 chargeback for the rest.</li>
</ul>
<p>Careful: a Receivables <em>chargeback</em> is different from a <em>credit card chargeback</em>. The card version is when a card issuer takes disputed money back from your bank account, and Oracle records it as a negative miscellaneous receipt.</p>`,
    },
    {
      type: 'slides',
      title: 'Two setups behind every transaction',
      slides: [
        {
          icon: '🏷️',
          title: 'Transaction type: “what kind of note is this?”',
          html: `<p>A <strong>transaction type</strong> belongs to one class (invoice, credit memo, debit memo, chargeback) and carries key settings, for example:</p><ul><li><strong>Open Receivable</strong> – does it change the customer’s balance and show in aging and collections?</li><li><strong>Post to GL</strong> – does it create accounting?</li><li>Default payment terms and accounts used by AutoAccounting.</li></ul>`,
        },
        {
          icon: '🚪',
          title: 'Transaction source: “where did it come from, and how is it numbered?”',
          html: `<p>A <strong>transaction source</strong> is either <strong>Manual</strong> (typed in the Billing work area) or <strong>Imported</strong> (loaded by AutoInvoice). It controls <strong>numbering</strong> — automatic numbering, document sequences, and whether credit memos use their own numbering source.</p>`,
        },
        {
          icon: '🚫',
          title: 'A clever trick: the Void type',
          html: `<p>Oracle lets you define a <strong>Void</strong> transaction type with Open Receivable and Post to GL both set to No. Changing an unused, unposted transaction to this type effectively cancels it without deleting history.</p>`,
        },
        {
          icon: '🧮',
          title: 'AutoAccounting fills in the accounts',
          html: `<p>You don’t type account numbers on every line. <strong>AutoAccounting</strong> builds the receivable, revenue, tax and other accounts from sources such as the transaction type, customer bill-to site, salesperson or item. The <strong>Create Receivables Accounting</strong> process then makes the subledger journal entries.</p>`,
        },
      ],
    },
    {
      type: 'flow',
      title: 'Two roads into Receivables',
      steps: [
        { icon: '⌨️', label: 'Manual entry', detail: 'Omar uses Create Transaction in the Billing work area for one-off bills, credit memos and debit memos.' },
        { icon: '📦', label: 'Import (AutoInvoice)', detail: 'Order Management, Projects or an outside system sends billing lines. The Import AutoInvoice process validates them and creates transactions.' },
        { icon: '🛠️', label: 'Fix errors', detail: 'Lines that fail validation stay in the interface with an error. The billing team corrects and resubmits them.' },
        { icon: '✅', label: 'Complete', detail: 'A complete transaction gets payment schedules (due dates) and, if Open Receivable is Yes, joins aging and collections.' },
        { icon: '🖨️', label: 'Print and deliver', detail: 'Print Receivables Transactions produces documents for paper, email or other delivery methods.' },
        { icon: '📒', label: 'Account', detail: 'Create Receivables Accounting creates journals that flow to the General Ledger.' },
      ],
      note: `<p>Big companies create most invoices with <strong>AutoInvoice</strong>: thousands of lines arrive from selling systems each day, and people only touch the exceptions.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: AutoInvoice in a nutshell',
      html: `<ul>
<li>The <strong>Import AutoInvoice</strong> process imports and validates data from Oracle Project Management, order management (Distributed Order Orchestration) and non-Oracle systems to create invoices, debit memos, credit memos and on-account credits.</li>
<li>Outside data can be loaded with the <strong>AutoInvoice</strong> file-based data import (FBDI) spreadsheet and the <strong>Load Interface File for Import</strong> process.</li>
<li>Data waits in interface tables (for example <code>RA_INTERFACE_LINES_ALL</code>); rows that fail validation are recorded in <code>RA_INTERFACE_ERRORS_ALL</code>.</li>
<li>From the Billing work area you can review and correct AutoInvoice errors and resubmit the import.</li>
<li>Grouping rules decide which imported lines become one invoice.</li>
</ul>`,
    },
    {
      type: 'text',
      heading: 'What “Complete” means',
      html: `<p>A transaction you are still typing is <strong>Incomplete</strong>. Clicking <kbd>Complete</kbd> is the moment it becomes real: Oracle creates the <strong>payment schedule</strong> (the due date or installments, based on payment terms and the transaction date). If the transaction type has Open Receivable set to Yes, the transaction now shows on the customer’s balance and in aging.</p>
<p>Oracle checks a list before allowing completion of a standard invoice. For example: at least one line; an accounting date in an Open or Future period; distributions that add up to each line amount; a freight account if there is freight; salespeople if your system options require them; and bank details if an automatic receipt method is used.</p>
<p>Some companies add a review step called <strong>Control of Transaction Completion</strong>: certain invoices and credit memos must be reviewed and completed by a designated approver. Since release 26A, Oracle can also stop people from reviewing and completing <em>their own</em> transactions — a classic segregation-of-duties control.</p>`,
    },
    {
      type: 'example',
      title: 'Omar bills Happy Cafe for 200 bottles',
      html: `<p>Happy Cafe received 200 bottles of Classic Lemonade at $2 each. In our story, the local sales tax is <strong>5%</strong>. (In real life, Oracle Tax calculates tax from tax rules — 5% is just our example rate.)</p>`,
      steps: [
        'Omar opens <kbd>Receivables</kbd> &gt; <kbd>Billing</kbd> and starts <kbd>Create Transaction</kbd>.',
        'Business unit: <strong>Sunny US BU</strong>. Transaction source: <strong>Manual</strong> (numbers automatically). Transaction type: <strong>Invoice</strong>.',
        'Bill-to customer: <strong>Happy Cafe</strong>. Oracle defaults the bill-to site and <strong>Net 30</strong> payment terms from the customer profile.',
        'Line: “Classic Lemonade bottle”, quantity 200, unit price $2.00 = <strong>$400</strong>. Tax is calculated: <strong>$20</strong>.',
        'AutoAccounting fills in the accounts: receivable <code>101-300-1210-000-000</code>, revenue <code>101-300-4110-010-000</code>, tax <code>101-100-2210-000-000</code>.',
        'Omar clicks <kbd>Complete</kbd>. Invoice total <strong>$420</strong>, due in 30 days.',
      ],
      result: `<p>Happy Cafe now owes Sunny $420. The invoice appears in Happy Cafe’s account balance and in aging as “Current” until its due date passes.</p>`,
    },
    {
      type: 'journal',
      title: 'Accounting for the Happy Cafe invoice ($400 + $20 tax)',
      lines: [
        { account: '1210 Accounts Receivable', debit: 420, credit: 0 },
        { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 400 },
        { account: '2210 Sales Tax Payable', debit: 0, credit: 20 },
      ],
      note: `<p>This matches Oracle’s default invoice entry: debit Receivables; credit Revenue, Tax (and Freight if charged). The tax is not Sunny’s money — it is owed to the tax authority, so it is a liability.</p>`,
    },

    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: create City Park Kiosk’s invoice',
      instructions: `<p>City Park Kiosk received <strong>150 bottles</strong> of Classic Lemonade at <strong>$2.00</strong> each on 1 July 2026. Tax in our story is <strong>5%</strong>, and the kiosk’s profile gives <strong>Net 30</strong> terms. Fill in the practice invoice.</p>`,
      formTitle: 'Practice screen — Create Transaction (simulation)',
      fields: [
        { label: 'Business unit', given: 'Sunny US BU' },
        { label: 'Transaction source', given: 'Manual' },
        { label: 'Transaction type', type: 'select', options: ['Invoice', 'Credit Memo', 'Debit Memo', 'Chargeback'], answer: 'Invoice' },
        { label: 'Bill-to customer', given: 'City Park Kiosk' },
        { label: 'Transaction date', type: 'date', answer: '2026-07-01' },
        { label: 'Line quantity', type: 'number', answer: 150 },
        { label: 'Line amount (USD)', type: 'number', answer: 300 },
        { label: 'Tax at 5% (USD)', type: 'number', answer: 15 },
        { label: 'Invoice total (USD)', type: 'number', answer: 315 },
        { label: 'Due date (Net 30)', type: 'date', answer: '2026-07-31' },
      ],
      explain: `<p>150 × $2.00 = $300 line amount; 5% tax = $15; total $315. Net 30 from 1 July gives a due date of 31 July. In Oracle, the due date is calculated for you when the invoice is <strong>completed</strong> — it becomes the invoice’s payment schedule.</p>`,
    },
    {
      type: 'text',
      heading: 'Credit memos: saying “you owe us less”',
      html: `<p>To credit a specific invoice, you open it and use the <strong>Credit Transaction</strong> page. You can credit the whole invoice, a percentage, an amount on line, tax or freight, or individual lines. Oracle prorates the credit and creates the reversing accounting automatically.</p>
<p>Other things worth knowing:</p>
<ul>
<li><strong>Credit and rebill</strong>: if an invoice is wrong (e.g. wrong price), it is often cleaner to fully credit it and create a new correct invoice.</li>
<li><strong>Already paid?</strong> Oracle’s answer: unapply the receipt from the invoice, then credit the invoice. The freed-up money can be placed on account or refunded.</li>
<li><strong>Disputes</strong>: when a customer disputes an amount (for example through Collections), an approval workflow can run and the <strong>Credit Memo Creation</strong> process creates the credit memo automatically once approved.</li>
<li><strong>On-account credits</strong> are created with the Create Transaction page using a credit memo type, and applied later.</li>
</ul>`,
    },
    {
      type: 'journal',
      title: 'Credit memo: Sunshine School returns 25 bottles ($50 + $2.50 tax)',
      lines: [
        { account: '4110 Lemonade Sales Revenue', debit: 50, credit: 0 },
        { account: '2210 Sales Tax Payable', debit: 2.5, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 52.5 },
      ],
      note: `<p>A credit memo is the mirror image of an invoice: revenue and tax go down, and the customer owes less.</p>`,
    },
    {
      type: 'journal',
      title: 'Debit memo: City Park Kiosk was undercharged by $20 (+ $1 tax)',
      lines: [
        { account: '1210 Accounts Receivable', debit: 21, credit: 0 },
        { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 20 },
        { account: '2210 Sales Tax Payable', debit: 0, credit: 1 },
      ],
      note: `<p>Omar billed 100 bottles at $1.80 instead of $2.00. Instead of cancelling the whole invoice, Omar creates a debit memo for the $20 difference plus tax and writes the original invoice number in the cross-reference field.</p>`,
    },

    {
      type: 'exercise',
      kind: 'journal',
      title: 'Build the credit memo for broken bottles',
      instructions: `<p>Ten of Happy Cafe’s 200 bottles ($2 each) arrived broken. Omar credits the invoice for 10 bottles plus the 5% tax on them. Build the accounting for the credit memo.</p>`,
      accounts: ['1210 Accounts Receivable', '4110 Lemonade Sales Revenue', '2210 Sales Tax Payable', '1110 Cash – Big River Bank', '5110 Lemons Cost'],
      answer: [
        { account: '4110 Lemonade Sales Revenue', debit: 20, credit: 0 },
        { account: '2210 Sales Tax Payable', debit: 1, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 21 },
      ],
      explain: `<p>10 × $2 = $20 of revenue is reversed (debit revenue), the $1 tax we no longer owe the tax authority is reversed (debit tax payable), and Happy Cafe owes $21 less (credit receivable). Cash doesn’t move — no money changed hands.</p>`,
    },
    {
      type: 'table',
      caption: 'Which document should I use?',
      headers: ['Situation', 'Use', 'Effect on what the customer owes'],
      rows: [
        ['Goods delivered, bill the customer', 'Invoice', 'Goes up'],
        ['10 bottles arrived broken', 'Credit memo against the invoice', 'Goes down'],
        ['Customer overpaid and wants credit for next order', 'On-account credit or unapplied/on-account cash', 'Goes down (until used)'],
        ['We forgot to charge for delivery', 'Debit memo', 'Goes up'],
        ['Customer short-paid, and we want a separate item for the rest', 'Chargeback (during receipt application)', 'Same total, new item'],
        ['Small leftover balance not worth chasing', 'Adjustment (write-off), within approval limits', 'Goes down'],
      ],
    },

    {
      type: 'exercise',
      kind: 'classify',
      title: 'Which transaction would you create?',
      instructions: `<p>For each situation, pick the Receivables transaction Omar should create.</p>`,
      categories: ['Invoice', 'Credit memo', 'Debit memo', 'On-account credit memo', 'Chargeback'],
      items: [
        { text: 'Sunshine School receives 300 bottles today', answer: 'Invoice' },
        { text: 'City Park Kiosk returns 20 bottles from last week’s invoice', answer: 'Credit memo' },
        { text: 'Happy Cafe’s delivery fee was forgotten on the original invoice', answer: 'Debit memo' },
        { text: 'Sam agrees to give Happy Cafe a $30 goodwill credit to use on future orders', answer: 'On-account credit memo' },
        { text: 'A customer pays $75 on a $100 invoice and Omar wants a separate new item for the $25 left', answer: 'Chargeback' },
        { text: 'An invoice charged $1.80 per bottle instead of $2.00', answer: 'Debit memo' },
      ],
      explain: `<p><strong>Invoice</strong> = normal bill. <strong>Credit memo</strong> = less to pay on a specific invoice. <strong>On-account credit</strong> = a credit not tied to an invoice yet. <strong>Debit memo</strong> = extra charge or under-billing correction. <strong>Chargeback</strong> = a new debit item created while closing an existing one, usually during receipt application.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: printing and delivering transactions',
      html: `<p>The <strong>Print Receivables Transactions</strong> process prints invoices, credit memos, debit memos, chargebacks and balance forward bills — all, a range, or only new ones. Layouts come from predefined <strong>BI Publisher</strong> templates, one per transaction class, which companies can copy and brand.</p>
<p>Delivery follows the customer’s profile. With <strong>Preferred Delivery Method</strong> set to <strong>Email</strong> and a contact who has an email address and the Bill-to responsibility, the process emails a PDF. Other options include paper and electronic invoicing (for example XML), and a printed copy can be saved as an attachment on the transaction.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: create and complete an invoice',
      items: [
        'Navigator: <kbd>Receivables</kbd> &gt; <kbd>Billing</kbd>.',
        'In the <kbd>Tasks</kbd> panel choose <kbd>Create Transaction</kbd>.',
        'Choose the business unit, transaction source, transaction type, transaction date and bill-to customer. Check that the payment terms defaulted correctly.',
        'Add lines (item or description, quantity, unit price). Review tax and the distributions created by AutoAccounting.',
        'Click <kbd>Complete</kbd>. If your company uses transaction review, it may go to an approver first.',
        'To fix or credit it later, search for it from <kbd>Manage Transactions</kbd> and use actions such as <kbd>Credit Transaction</kbd>.',
      ],
      note: `<p>Labels vary by release, by Redwood adoption and by your company’s configuration. Your security role decides which actions you see.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips for billing teams',
      html: `<ul>
<li><strong>The best collection tool is a correct invoice.</strong> Customers delay paying invoices with wrong prices, wrong PO numbers or wrong addresses.</li>
<li><strong>Always reference the customer’s purchase order number</strong> if they gave one. Their Payables team will match your invoice to it.</li>
<li><strong>Watch the AutoInvoice errors daily.</strong> An unprocessed line is an invoice the customer never received.</li>
<li><strong>Don’t delete; credit.</strong> Once a transaction is completed and accounted, fix mistakes with credit memos or debit memos so the audit trail stays clear.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Transaction', def: 'Oracle Receivables’ general word for billing documents such as invoices, credit memos, debit memos and chargebacks.' },
        { term: 'Credit memo', def: 'A document that reduces what a customer owes, usually linked to an invoice.' },
        { term: 'Debit memo', def: 'A document that adds an extra charge to what a customer owes, such as a price correction or late charge.' },
        { term: 'On-account credit memo', def: 'A credit placed on the customer’s account that is not yet applied to any specific invoice.' },
        { term: 'Chargeback', def: 'A new debit item created when closing an existing one, often for the unpaid remainder of a short payment.' },
        { term: 'Transaction type', def: 'A setup that defines the class of a transaction and settings such as Open Receivable and Post to GL.' },
        { term: 'Transaction source', def: 'A setup that says whether transactions are manual or imported and how they are numbered.' },
        { term: 'AutoInvoice', def: 'The Oracle process that imports and validates billing lines from other systems and creates Receivables transactions.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Ten of Happy Cafe’s 200 bottles were broken on delivery. What should Omar create?',
          options: ['A new invoice', 'A credit memo against the original invoice', 'A debit memo', 'A miscellaneous receipt'],
          answer: 1,
          explain: 'A credit memo reduces what the customer owes for the damaged bottles and reverses the related revenue and tax.',
        },
        {
          q: 'What happens when a Receivables invoice is completed?',
          options: [
            'It is immediately paid',
            'Oracle creates its payment schedule and, if Open Receivable is Yes, it joins the customer balance and aging',
            'It is deleted from Billing',
            'It is sent to Payables',
          ],
          answer: 1,
          explain: 'Completion creates payment schedules from the payment terms and transaction date. With Open Receivable on, the invoice is included in balances, aging and collections.',
        },
        {
          q: 'Sunny’s order system sends 5,000 billing lines a day. How do they most likely become invoices?',
          options: ['Omar types them all', 'The Import AutoInvoice process', 'Through Payables', 'Through the General Ledger'],
          answer: 1,
          explain: 'AutoInvoice imports and validates lines from order management, projects and outside systems and creates transactions automatically.',
        },
        {
          q: 'Which journal correctly records Happy Cafe’s invoice of $400 plus $20 tax?',
          options: [
            'Dr 4110 Revenue 420 / Cr 1210 AR 420',
            'Dr 1210 AR 420 / Cr 4110 Revenue 400 / Cr 2210 Sales Tax Payable 20',
            'Dr 1110 Cash 420 / Cr 4110 Revenue 420',
            'Dr 1210 AR 400 / Cr 2210 Sales Tax Payable 400',
          ],
          answer: 1,
          explain: 'The customer owes the full $420 (AR debit). Revenue is the $400 earned, and the $20 tax is owed to the tax authority (a liability).',
        },
        {
          q: 'Which transaction type setting decides whether a transaction affects the customer balance and aging?',
          options: ['Post to GL', 'Open Receivable', 'Automatic numbering', 'Print option'],
          answer: 1,
          explain: 'Open Receivable controls whether completed transactions update customer balances and appear in aging and collections. Post to GL controls accounting.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Requirements for Completing a Receivables Transaction', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/requirements-for-completing-a-receivables-transaction.html' },
    { title: 'How AutoInvoice Processes Data During Import', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/how-autoinvoice-processes-data-during-import.html' },
    { title: 'Options for Posted and Non-Posted Activities using Transaction Types', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/options-for-posted-and-non-posted-activities-using-transaction.html' },
    { title: 'Guidelines for Creating an AutoAccounting Structure', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/guidelines-for-creating-an-autoaccounting-structure.html' },
    { title: 'When do I create a debit memo?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/when-do-i-create-a-debit-memo.html' },
    { title: 'When do I create a chargeback?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/when-do-i-create-a-chargeback.html' },
    { title: 'Print Receivables Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/print-receivables-transactions.html' },
    { title: 'Receivables Accrual Accounting Entries', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/receivables-accrual-accounting-entries.html' },
    { title: 'Prevention of Self-Review and Completion of Receivables Transactions (26A What’s New)', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26a/fins26a/26A-fin-wn-f42202.htm' },
  ],
};
