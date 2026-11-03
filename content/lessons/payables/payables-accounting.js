export default {
  slug: 'payables-accounting',
  title: 'Accounting for Invoices',
  minutes: 22,
  summary:
    'Every invoice and payment in Payables turns into a balanced journal entry. Learn how Subledger Accounting does this, what Create Accounting and draft vs. final mean, how entries reach the General Ledger, and why PO-matched invoices use the Received Not Invoiced Accrual account.',
  objectives: [
    'Explain what Subledger Accounting does for Payables and what an accounting event is',
    'Describe the difference between draft and final accounting, and how entries are transferred and posted to the General Ledger',
    'Write the journal entries for an expense invoice, a PO-matched invoice (with receipt accrual) and a payment',
    'Know where to create and view accounting in Oracle Fusion, both online and with the Create Accounting process',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The "I owe" page in your money diary',
      html: `<p>Imagine you keep a money diary for your lemonade stand. Your neighbor sells you a bag of lemons and says, "Pay me next week." You haven't spent any coins yet, but something important happened: you now <strong>owe</strong> your neighbor. So you write two things in your diary: "Got lemons worth $5" and "I owe the neighbor $5."</p>
<p>Next week you pay. Now you write: "The I-owe page goes down by $5" and "My coin jar goes down by $5."</p>
<p>That is exactly what Payables accounting does. Every bill (invoice) and every payment becomes a tidy diary entry with two sides that always balance. In Oracle Fusion, a helper called <span class="hl">Subledger Accounting</span> writes those diary entries for you, using rules, so nobody has to do it by hand.</p>`,
    },
    {
      type: 'text',
      heading: 'From invoice to journal: the big idea',
      html: `<p>In the earlier lessons, Ava entered invoices, matched them, validated them and got them approved. All of that happened in the <strong>Payables</strong> module, which is a <strong>subledger</strong>: a detailed side-book that knows every supplier and every invoice. The <strong>General Ledger (GL)</strong> is the master book. It doesn't want every little detail; it wants correct, balanced <strong>journal entries</strong>.</p>
<p>The bridge between the two is <strong>Oracle Fusion Subledger Accounting (SLA)</strong>. Here is how it works in plain words:</p>
<ol>
<li>Something meaningful happens to a transaction, for example an invoice is <strong>validated</strong> or a payment is <strong>created</strong>. Oracle records this as an <strong>accounting event</strong>.</li>
<li>Subledger Accounting reads the event and applies <strong>accounting rules</strong> (which accounts to debit and credit) to build a <strong>subledger journal entry</strong>.</li>
<li>The subledger journal entry is <strong>transferred</strong> to the General Ledger and (if allowed) <strong>posted</strong>, so the balances in the master book update.</li>
</ol>
<p>Oracle ships predefined accounting rules that most companies start from, and companies can define their own detailed rules if they need to. As a Payables user you rarely change the rules. Your job is to make sure every transaction gets accounted, and to fix the ones that don't.</p>`,
    },
    {
      type: 'flow',
      title: 'How a Payables invoice reaches the General Ledger',
      steps: [
        { icon: '🧾', label: 'Invoice validated', detail: 'Ava validates the invoice. This creates an "Invoice Validated" accounting event.' },
        { icon: '⚙️', label: 'Create Accounting', detail: 'Subledger Accounting applies the accounting rules to the event (online or as a scheduled process).' },
        { icon: '📝', label: 'Subledger journal', detail: 'A balanced entry is created in Draft or Final mode.' },
        { icon: '🚚', label: 'Transfer to GL', detail: 'Final entries are sent to the General Ledger.' },
        { icon: '📒', label: 'Post', detail: 'The GL journal is posted and account balances change. Priya can now see it.' },
      ],
      note: `<p>Only <strong>Final</strong> entries can be transferred and posted. Draft entries are just a preview.</p>`,
    },
    {
      type: 'table',
      caption: 'Some predefined Payables accounting event classes and event types (from Oracle’s Payables guide)',
      headers: ['Event class', 'Example event types', 'What happened in real life'],
      rows: [
        ['Invoices', 'Invoice Validated, Invoice Adjusted, Invoice Canceled', 'A supplier bill was validated, changed after accounting, or canceled.'],
        ['Credit Memos', 'Credit Memo Validated, Credit Memo Canceled', 'A supplier gave us a credit.'],
        ['Prepayments', 'Prepayment Validated, Prepayment Canceled', 'We set up an advance payment (see the Prepayments lesson).'],
        ['Prepayment Applications', 'Prepayment Applied, Prepayment Unapplied', 'An advance was used up against a real invoice.'],
        ['Payments', 'Payment Created, Payment Canceled, Payment Adjusted', 'We paid a supplier, or voided a payment.'],
        ['Reconciled Payments', 'Payment Cleared, Payment Uncleared', 'The bank confirmed the money actually left the account.'],
        ['Refunds', 'Refund Recorded, Refund Canceled', 'A supplier paid money back to us.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the accounting journey in order',
      instructions: `<p>Ava’s sugar invoice has just been entered. Put the steps in the order they happen, from the invoice to Priya seeing it in the General Ledger.</p>`,
      items: [
        'Ava validates the invoice, which creates an Invoice Validated accounting event',
        'Create Accounting applies the accounting rules to the event',
        'A subledger journal entry is created in Final mode',
        'The final entry is transferred to the General Ledger',
        'The GL journal is posted and account balances change',
      ],
      explain: `<p>Event first, then rules, then a Final subledger entry, then transfer, then post. A Draft entry would stop at step 3 and could never be transferred.</p>`,
    },
    {
      type: 'text',
      heading: 'Draft vs. Final: practice drawing vs. ink',
      html: `<p>Subledger Accounting can create journal entries in two modes:</p>
<ul>
<li><strong>Draft</strong> is like drawing in pencil. Oracle builds the entry so you can <em>look</em> at it and check the accounts, but it is not final, it can't be transferred to the GL, and it gets replaced the next time you account the transaction.</li>
<li><strong>Final</strong> is ink. The entry is complete, and it can be transferred and posted to the General Ledger. If something was wrong, you fix it with a new correcting entry, not by erasing.</li>
</ul>
<p>Why use draft at all? Because it is a safe way to answer "what will the accounting look like?" before you commit, for example when you are testing a new setup or checking a tricky invoice.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: two ways to create accounting',
      html: `<p><strong>1. Online, one transaction at a time.</strong> From an invoice or payment, the actions menu offers accounting choices that Oracle’s Subledger Accounting guide names <kbd>Account in Draft</kbd>, <kbd>Account in Final</kbd> and <kbd>Account and Post to Ledger</kbd>. "Account and Post to Ledger" needs the GL posting privilege and the <em>Enable Posting from Subledger</em> option; without them, use "Account in Final", which creates the entry and transfers it to the GL. A background engine called <em>Provide Online Transaction Engine Functionality</em> does the work behind these buttons.</p>
<p><strong>2. In bulk, with the <kbd>Create Accounting</kbd> scheduled process.</strong> This is what most companies run every day (or several times a day) for all Payables events. You find it in the <strong>Scheduled Processes</strong> work area.</p>`,
    },
    {
      type: 'table',
      caption: 'Key parameters of the Create Accounting process',
      headers: ['Parameter', 'What it means', 'Typical choice at Sunny'],
      rows: [
        ['Subledger Application', 'Which subledger to account', 'Payables'],
        ['Ledger', 'Which ledger', 'Sunny US Ledger'],
        ['Process Category', 'Limits processing to a group of event classes; leave it empty for all', 'Empty (all Payables events)'],
        ['End Date', 'Only events dated on or before this date are picked', 'Today (the default)'],
        ['Accounting Mode', '<kbd>Draft</kbd> or <kbd>Final</kbd> (default is Final)', 'Final'],
        ['Process Events', 'All, only Errors, or Invalid Accounts (re-try errors using the suspense account)', 'All'],
        ['Report Style', 'Summary, Detail or No report for the execution report', 'Summary'],
        ['Transfer to General Ledger', 'Send final entries to the GL (default Yes)', 'Yes'],
        ['Post in General Ledger', 'Post them too, if you have the posting privilege (default Yes)', 'Yes'],
        ['Journal Batch', 'Optional name for the GL journal batch', 'e.g. AP Jan-26'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Draft or Final?',
      instructions: `<p>Put each statement in the right bucket.</p>`,
      categories: ['Draft', 'Final'],
      items: [
        { text: 'Can be transferred and posted to the General Ledger', answer: 'Final' },
        { text: 'Gets replaced the next time the transaction is accounted', answer: 'Draft' },
        { text: 'A safe preview while testing a new setup', answer: 'Draft' },
        { text: 'If it is wrong, you fix it with a new correcting entry', answer: 'Final' },
        { text: 'What the Account and Post to Ledger action creates', answer: 'Final' },
        { text: 'The default value of the Accounting Mode parameter is NOT this one', answer: 'Draft' },
      ],
      explain: `<p>Draft is pencil: a preview you can look at, never transferred, replaced next time. Final is ink: complete, transferable and postable (and it is the default Accounting Mode of Create Accounting).</p>`,
    },
    {
      type: 'text',
      heading: 'Which accounts? The liability account and its friends',
      html: `<p>Every Payables invoice ends with a <strong>credit to a liability account</strong>, because a bill means "we owe someone". At Sunny that is <code>2110 Accounts Payable – Trade</code>. Oracle finds the liability account from defaults:</p>
<ul>
<li>The <strong>Manage Common Options for Payables and Procurement</strong> page holds default distributions for the business unit: <em>Liability</em>, <em>Prepayment</em>, <em>Bill Payable</em>, <em>Discount Taken</em>, <em>Freight</em>, <em>Miscellaneous</em> and more.</li>
<li>A <strong>supplier site</strong> can override them (on its site assignments), for example if one supplier must use a special liability account.</li>
</ul>
<p>The <strong>debit</strong> side depends on what we bought and how the invoice was entered:</p>
<ul>
<li><strong>Not matched to a PO</strong> (like the electricity bill): the debit goes to the account on the invoice distribution, usually an expense such as <code>6120 Electricity</code>.</li>
<li><strong>Matched to a PO, with receipt accrual</strong> (like the lemons): the debit goes to <code>2120 Received Not Invoiced Accrual</code>. Why? Read on.</li>
</ul>`,
    },
    {
      type: 'slides',
      title: 'Why PO-matched invoices debit the accrual account',
      slides: [
        {
          icon: '📦',
          title: 'Step 1: the lemons arrive',
          html: `<p>Noah receives 1,000 lemons on January 8. Sunny now <em>owns</em> them and has a real cost, even though no bill has arrived yet.</p>`,
        },
        {
          icon: '🧮',
          title: 'Step 2: receipt accounting books an accrual',
          html: `<p>If Sunny accrues <strong>at receipt</strong>, the receiving transaction creates an entry: debit <code>5110 Lemons Cost</code>, credit <code>2120 Received Not Invoiced Accrual</code>. This is done by receipt accounting (Cost Management), <em>not</em> by Payables.</p>`,
        },
        {
          icon: '🧾',
          title: 'Step 3: the invoice arrives',
          html: `<p>Ava matches the $500 invoice to the PO. The invoice accounting <strong>debits 2120</strong> (clearing the accrual) and <strong>credits 2110</strong> (the real supplier liability). The cost was already recorded at receipt, so it isn't counted twice.</p>`,
        },
        {
          icon: '⚖️',
          title: 'Result: 2120 is a waiting room',
          html: `<p>Account 2120 holds "things we received but haven't been billed for yet". When everything is invoiced, it nets to zero. A growing 2120 balance at month-end means bills are missing, which is a great clue for Ava.</p>`,
        },
        {
          icon: '📅',
          title: 'The other option: period-end accrual',
          html: `<p>For <em>expense</em> items a company can choose to accrue at <strong>period end</strong> instead. Then nothing is booked at receipt; the invoice debits the expense account directly, and at month-end a process books accruals for receipts that still have no invoice, reversing them next period. <em>Inventory</em> items are always accrued at receipt.</p>`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the accrual choice and variances',
      html: `<p>The <strong>Accrue Expense Items</strong> option on the <strong>Manage Common Options for Payables and Procurement</strong> page decides between <em>At Receipt</em> and <em>Period End</em> for expense items. With at-receipt accrual you can still override it on an individual PO schedule.</p>
<p>When the invoice price differs from the PO price, invoice validation creates <strong>variance distributions</strong>. For at-receipt expense items, the quantity part goes to the expense accrual account and an <strong>invoice price variance</strong> goes to the invoice price variance account. You will see a price variance in action in the Practice Story at the end of this module.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny’s three everyday entries',
      html: `<p>Ava processes three items in January. Sunny accrues expense items at receipt and accounts payments when they are issued. Let's write the journals Subledger Accounting creates. (Account combinations use the Sunny COA: Company-Cost Center-Account-Product-Intercompany.)</p>`,
      steps: [
        '<strong>Electricity bill, $150</strong> from Bright Power Utility, not matched to any PO. The kitchen uses the power, so Ava charges cost center 200.',
        '<strong>Lemons, $500</strong> from Lemon Grove Farms, matched to Leo’s PO and Noah’s receipt. Receipt accounting already booked the accrual on January 8.',
        '<strong>Payment, $500</strong> to Lemon Grove Farms on the due date.',
      ],
      result: `<p>Each event gives one balanced entry. Payables never touches 5110 for the lemons invoice, because the cost was already booked at receipt.</p>`,
    },
    {
      type: 'journal',
      title: 'Electricity invoice validated and accounted (event: Invoice Validated)',
      lines: [
        { account: '6120 Electricity (101-200-6120-000-000)', debit: 150, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 0, credit: 150 },
      ],
      note: `<p>A plain expense invoice: the expense goes up, and so does what we owe.</p>`,
    },
    {
      type: 'journal',
      title: 'For reference: receipt accrual booked when Noah received the lemons (receipt accounting, not Payables)',
      lines: [
        { account: '5110 Lemons Cost (101-200-5110-010-000)', debit: 500, credit: 0 },
        { account: '2120 Received Not Invoiced Accrual (101-100-2120-000-000)', debit: 0, credit: 500 },
      ],
    },
    {
      type: 'journal',
      title: 'Lemons invoice validated and accounted (event: Invoice Validated)',
      lines: [
        { account: '2120 Received Not Invoiced Accrual (101-100-2120-000-000)', debit: 500, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 0, credit: 500 },
      ],
      note: `<p>The accrual "waiting room" is emptied and the real supplier liability appears.</p>`,
    },
    {
      type: 'journal',
      title: 'Payment to Lemon Grove Farms accounted (event: Payment Created)',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 500, credit: 0 },
        { account: '1110 Cash – Big River Bank (101-100-1110-000-000)', debit: 0, credit: 500 },
      ],
      note: `<p>We no longer owe the supplier, and cash went down. When this payment accounting happens depends on a setup option, explained next.</p>`,
    },
    {
      type: 'table',
      caption: 'When is a payment accounted? The payment accounting option (Manage Payment Options page)',
      headers: ['Option', 'Entry at payment', 'Entry when the bank clears it'],
      rows: [
        ['At payment issue', 'Debit liability, credit cash', 'None'],
        ['At payment clearing', 'None', 'Debit liability, credit cash'],
        ['At payment issue and clearing', 'Debit liability, credit <em>cash clearing</em>', 'Debit cash clearing, credit cash'],
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Choose the payment accounting option once',
      html: `<p>Oracle warns that this option should be chosen carefully during the first implementation and not changed afterwards, because changing it can leave accounting stuck. Sunny chose <strong>At payment issue</strong> to keep things simple. Bigger companies often prefer "issue and clearing" so the cash account matches the bank statement exactly.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: account the sugar invoice',
      instructions: `<p>Sweet Sugar Co. bills Sunny <strong>$200</strong>. The invoice is matched to Leo’s PO, Noah already received the sugar, and Sunny accrues expense items <strong>at receipt</strong>. Build the journal that Subledger Accounting creates when the invoice is validated and accounted.</p>`,
      accounts: ['5120 Sugar Cost', '2120 Received Not Invoiced Accrual', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '1410 Prepayments to Suppliers'],
      answer: [
        { account: '2120 Received Not Invoiced Accrual', debit: 200, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 200 },
      ],
      explain: `<p>The receipt already debited 5120 Sugar Cost and credited 2120. The invoice clears the accrual (debit 2120) and records the real supplier liability (credit 2110). Debiting 5120 again would count the sugar twice, and cash doesn’t move until payment.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: account the electricity payment',
      instructions: `<p>Ava pays Bright Power Utility’s <strong>$150</strong> bill. Sunny accounts payments <strong>at payment issue</strong>. Build the payment journal.</p>`,
      accounts: ['6120 Electricity', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '2120 Received Not Invoiced Accrual'],
      answer: [
        { account: '2110 Accounts Payable – Trade', debit: 150, credit: 0 },
        { account: '1110 Cash – Big River Bank', debit: 0, credit: 150 },
      ],
      explain: `<p>Paying removes the liability (debit 2110) and reduces cash (credit 1110). The expense was already recorded when the invoice was accounted, so 6120 isn’t touched again.</p>`,
    },
    {
      type: 'text',
      heading: 'Cash basis vs. accrual basis',
      html: `<p>There are two big styles of bookkeeping:</p>
<ul>
<li><strong>Accrual basis</strong>: record the expense and the liability when the bill is incurred (invoice validated), and record cash when you pay. This is what Sunny and nearly all larger companies use, and it is what the journals above show.</li>
<li><strong>Cash basis</strong>: record the expense only when cash leaves the bank. No liability is booked for unpaid bills.</li>
</ul>
<p>In Oracle Fusion the style is not a Payables setting you flip every day. It comes from the <strong>accounting method</strong> that Subledger Accounting uses for the ledger. Oracle’s predefined <em>Standard Accrual</em> method is the usual starting point, and a ledger can be set up with a cash-based method if a company really needs one. Some companies keep a secondary ledger on a different basis for special reporting.</p>`,
    },
    {
      type: 'text',
      heading: 'Seeing the accounting and fixing problems',
      html: `<ul>
<li><strong>From the invoice or payment</strong>: after accounting, use the view-accounting option in the actions menu (usually labelled <kbd>View Accounting</kbd>) to see the debit and credit lines for that one transaction.</li>
<li><strong>In Subledger Accounting</strong>: the <strong>Review Subledger Journal Entries</strong> page lets you search entries by status, find <em>unprocessed accounting events</em>, look at entries in T-account format, and drill back to the transaction.</li>
<li><strong>Create Accounting Execution Report</strong>: produced automatically when Create Accounting finishes. It lists what was accounted and, most usefully, what failed and why.</li>
</ul>
<p>Common reasons an invoice doesn't account: it isn't validated yet, it has a hold that blocks accounting (for example an invalid account), or the accounting period is closed. Some holds still allow accounting (for example many matching holds), so an invoice can be accounted but still not payable.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Accounting and approval: which comes first?',
      html: `<p>On the <strong>Manage Invoice Options</strong> page, the <em>Accounting Preference</em> setting decides the order: <strong>Account regardless of approval status</strong>, <strong>Require accounting before approval</strong>, or <strong>Require approval before accounting</strong>. Sunny accounts regardless of approval, so expenses land in the right month even while an approver is on holiday.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: run Create Accounting for Payables',
      items: [
        'Open the <strong>Navigator</strong> and go to <kbd>Scheduled Processes</kbd> (under Tools).',
        'Click <kbd>Schedule New Process</kbd>, search for <kbd>Create Accounting</kbd> and click OK.',
        'Set <strong>Subledger Application</strong> to Payables and <strong>Ledger</strong> to Sunny US Ledger.',
        'Set <strong>Accounting Mode</strong> to <kbd>Draft</kbd> the first time, submit, and review the Create Accounting Execution Report.',
        'When the draft looks right, submit again with <kbd>Final</kbd>, <strong>Transfer to General Ledger</strong> = Yes and <strong>Post in General Ledger</strong> = Yes (if you have the posting privilege).',
        'Open one invoice and use its view-accounting action to see its journal lines.',
      ],
      note: `<p>Labels and menus can differ slightly by release, by Redwood page versions, and by how your company configured Oracle. Many companies schedule Create Accounting to run automatically, so you may only need to check its output.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip from Ava',
      html: `<p>Don't wait for month-end. Ava checks the Create Accounting output every morning. One invoice with a bad account found on day 3 is a 2-minute fix; fifty invoices found on day 30 is a late night before the close. Also, never "fix" accounting by editing GL journals that came from Payables: correct the invoice or the subledger entry so Payables and the GL stay in agreement.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Subledger Accounting (SLA)', def: 'The Oracle Fusion engine that turns subledger events, like a validated invoice, into balanced journal entries using accounting rules.' },
        { term: 'Accounting event', def: 'A recorded business moment that needs accounting, such as Invoice Validated or Payment Created.' },
        { term: 'Create Accounting', def: 'The process that builds subledger journal entries from accounting events, in Draft or Final mode.' },
        { term: 'Draft accounting', def: 'A preview journal entry you can review; it cannot be transferred to the General Ledger.' },
        { term: 'Final accounting', def: 'A completed journal entry that can be transferred and posted to the General Ledger.' },
        { term: 'Liability account', def: 'The account that shows how much the company owes suppliers; at Sunny it is 2110 Accounts Payable – Trade.' },
        { term: 'Received Not Invoiced Accrual', def: 'A liability account (2120 at Sunny) that holds the cost of goods received but not yet billed by the supplier.' },
        { term: 'Accrual basis', def: 'Recording costs and liabilities when they are incurred, not when cash is paid.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Ava validates the electricity invoice for $150. Which journal does Subledger Accounting create at Sunny?',
          options: [
            'Debit 1110 Cash, credit 6120 Electricity',
            'Debit 6120 Electricity, credit 2110 Accounts Payable – Trade',
            'Debit 2110 Accounts Payable – Trade, credit 1110 Cash',
            'No journal until the bill is paid',
          ],
          answer: 1,
          explain: 'On an accrual basis, the expense and the liability are recorded when the invoice is accounted. Cash moves only at payment.',
        },
        {
          q: 'Why does the lemons invoice debit 2120 Received Not Invoiced Accrual instead of 5110 Lemons Cost?',
          options: [
            'Because lemons are inventory and never hit expense',
            'Because the cost was already booked at receipt, so the invoice only clears the accrual and records the real liability',
            'Because Payables cannot use expense accounts',
            'Because the invoice is still in Draft',
          ],
          answer: 1,
          explain: 'With at-receipt accrual, the receipt debits the expense and credits 2120. The invoice then moves the amount from 2120 to 2110, so the cost isn’t counted twice.',
        },
        {
          q: 'Which accounting mode can be transferred and posted to the General Ledger?',
          options: ['Draft', 'Final', 'Both', 'Neither; only the GL can create journals'],
          answer: 1,
          explain: 'Draft is a preview only. Final entries are complete and can be transferred and posted.',
        },
        {
          q: 'Priya says an invoice is missing from the GL. What should Ava check FIRST?',
          options: [
            'Whether the supplier was paid',
            'Whether the invoice was validated and accounted in Final, and whether the Create Accounting Execution Report shows an error',
            'Whether the PO was closed',
            'Whether the supplier has a bank account',
          ],
          answer: 1,
          explain: 'An invoice reaches the GL only after it is accounted in Final and transferred. The execution report and View Accounting show where it stopped.',
        },
        {
          q: 'Sunny accounts payments "At payment issue". What happens when the bank later clears the payment?',
          options: [
            'A second debit to the liability account',
            'No new accounting entry; the payment status simply becomes Cleared',
            'The invoice is reversed',
            'Cash is credited a second time',
          ],
          answer: 1,
          explain: 'With "At payment issue", the full entry (debit liability, credit cash) happens when the payment is created. Clearing only adds entries if you account at clearing.',
        },
      ],
    },
  ],
  sources: [
    { title: 'How Invoices and Payments Are Accounted (Using Payables Invoice to Pay)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoices-and-payments-are-accounted.html' },
    { title: 'How You Submit Accounting Process (Using Subledger Accounting)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fausl/how-you-submit-accounting-process.html' },
    { title: 'Post Subledger Transactions to the General Ledger', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fausl/post-subledger-transactions-to-the-general-ledger.html' },
    { title: 'Online Accounting Engine', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fausl/online-accounting-engine.html' },
    { title: 'Guidelines for Reviewing a Subledger Journal Entry', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fausl/guidelines-for-reviewing-a-subledger-journal-entry.html' },
    { title: 'Variance Accounts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/variance-accounts.html' },
    { title: 'What’s the difference between perpetual accrual and period end accrual accounting?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/what-s-the-difference-between-perpetual-accrual-and-period-end.html' },
    { title: 'Considerations for Accruing Expense Items', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/considerations-for-accruing-expense-items.html' },
    { title: 'Default Distributions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/default-distributions.html' },
    { title: 'Guidelines for Payment Accounting Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-payment-accounting-options.html' },
    { title: 'Guidelines for Invoice Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-invoice-options.html' },
  ],
};
