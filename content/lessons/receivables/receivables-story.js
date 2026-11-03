export default {
  slug: 'receivables-story',
  title: 'Practice Story: Sunny Lemonade Bills a Cafe',
  minutes: 25,
  summary:
    'Follow one order from start to finish: Happy Cafe buys 200 bottles for $400 plus tax, pays part, reports 10 broken bottles, gets a reminder, promises to pay and finally pays in full — and Omar and Priya prove the books match. Every step shows the Oracle task, the journal and the open balance.',
  objectives: [
    'Follow a complete Order-to-Cash story through Oracle Receivables',
    'Record balanced journals for an invoice, partial receipt, credit memo and final receipt',
    'Track an invoice’s open balance and aging status after every event',
    'Connect disputes, dunning and promises to pay to the money they protect',
    'Explain how month-end reconciliation proves the story is complete',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'One bill, many little adventures',
      html: `<p>Remember Mrs. Lee, the neighbor who said “I’ll pay next Saturday”? Imagine the story going like this: Mrs. Lee pays half on Saturday, then tells you one cup was spilled when you carried it over, then forgets the rest for a while… until you knock politely, Mrs. Lee promises to pay on Friday, and does.</p>
<p>Every one of those moments changes your little notebook: <em>owes $4 → owes $2 → owes $1 → promised → paid!</em></p>
<p>Today we follow exactly that kind of story for a real business order — <span class="hl">Happy Cafe’s 200 bottles of lemonade</span> — and watch how Oracle Fusion Receivables records each moment. Grab a snack; this is a long one. 🍋</p>`,
    },
    {
      type: 'text',
      heading: 'Meet the cast and the plan',
      html: `<p><strong>Sunny Lemonade US Inc.</strong> (business unit <em>Sunny US BU</em>, ledger <em>Sunny US Ledger</em>, bank <em>Big River Bank</em>) sells bottled lemonade to cafes, kiosks and schools. The people in this story:</p>
<ul>
<li><strong>Omar</strong> – Receivables specialist. Bills customers, applies cash, and is also Sunny’s collector.</li>
<li><strong>Sam</strong> – CFO. Approves credits and watches cash.</li>
<li><strong>Priya</strong> – General ledger accountant. Closes the month.</li>
<li><strong>Mia</strong> – Treasury. Matches the bank statement to Oracle.</li>
<li><strong>Rosa</strong> – Happy Cafe’s bookkeeper (the customer’s contact, set up with the Bill-to responsibility).</li>
</ul>
<p>Happy Cafe was set up in the Customers lesson: one customer account with the <strong>Sunny Standard Trade</strong> profile class (Net 30, $2,000 credit limit, monthly statements, email delivery), and one site at 12 Main Street with Bill-to, Ship-to, Statements and Dunning purposes.</p>
<p>Our numbers: <strong>200 bottles × $2.00 = $400</strong>, plus <strong>5% sales tax = $20</strong> (our example rate), total <strong>$420</strong>. Accounts come from the Sunny COA: <code>1110</code> Cash, <code>1210</code> Accounts Receivable, <code>2210</code> Sales Tax Payable and <code>4110</code> Lemonade Sales Revenue.</p>`,
    },
    {
      type: 'flow',
      title: 'The whole story at a glance',
      steps: [
        { icon: '📞', label: '1 Jun – Order', detail: 'Happy Cafe orders 200 bottles. Credit is within the $2,000 limit.' },
        { icon: '🧾', label: '2 Jun – Invoice', detail: 'Omar completes invoice 10045 for $420, due 2 Jul.' },
        { icon: '💵', label: '30 Jun – Partial payment', detail: 'Happy Cafe pays $200. Balance $220.' },
        { icon: '📦', label: '3 Jul – Damage & credit', detail: '10 bottles were broken. A dispute leads to a $21 credit memo. Balance $199.' },
        { icon: '📣', label: '10 Jul–4 Aug – Reminders', detail: 'Friendly email, then a dunning letter, then a call and a promise to pay.' },
        { icon: '✅', label: '12 Aug – Final payment', detail: 'Happy Cafe pays $199. Invoice closed, promise fulfilled.' },
        { icon: '⚖️', label: 'Each month-end – Reconcile', detail: 'Omar and Priya prove Receivables equals the General Ledger.' },
      ],
    },
    {
      type: 'example',
      title: 'Chapter 1 — The order and the invoice (1–2 June)',
      html: `<p>On Monday 1 June 2026, Rosa emails: <em>“Please deliver 200 bottles of Classic Lemonade tomorrow. Our PO number is HC-778.”</em></p>`,
      steps: [
        '<strong>Credit check.</strong> Happy Cafe has no open balance and a $2,000 credit limit, so a $420 order is fine. (Bigger companies run this check automatically in order management using the credit settings on the customer profile.)',
        '<strong>Delivery.</strong> On 2 June Noah’s team delivers 200 bottles to 12 Main Street. Rosa signs the delivery note. Sunny has now done its part — this is when the revenue is earned.',
        '<strong>Create the invoice.</strong> Omar opens <kbd>Receivables</kbd> &gt; <kbd>Billing</kbd> &gt; <kbd>Create Transaction</kbd>. Source <em>Manual</em>, type <em>Invoice</em>, date 2 June 2026, bill-to Happy Cafe. Terms <strong>Net 30</strong> default from the profile.',
        '<strong>Lines and tax.</strong> One line: Classic Lemonade bottle, quantity 200, price $2.00 = $400. Tax calculates $20. In the reference field Omar types the customer’s <strong>PO number HC-778</strong> so Happy Cafe’s Payables team can match it.',
        '<strong>Complete.</strong> Omar clicks <kbd>Complete</kbd>. Oracle numbers it <strong>10045</strong> and builds the payment schedule: $420 due on <strong>2 July 2026</strong>.',
        '<strong>Deliver the invoice.</strong> The <strong>Print Receivables Transactions</strong> process runs that evening. Because Happy Cafe’s preferred delivery method is Email and Rosa is a Bill-to contact with an email address, Rosa receives a PDF.',
        '<strong>Accounting.</strong> The nightly <strong>Create Receivables Accounting</strong> run creates the journal below and sends it to the General Ledger.',
      ],
      result: `<p>Happy Cafe owes <strong>$420</strong>. In aging, invoice 10045 is <strong>Current</strong> (not yet due).</p>`,
    },
    {
      type: 'journal',
      title: 'Journal 1 — Invoice 10045 (2 June)',
      lines: [
        { account: '1210 Accounts Receivable', debit: 420, credit: 0 },
        { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 400 },
        { account: '2210 Sales Tax Payable', debit: 0, credit: 20 },
      ],
      note: `<p>AutoAccounting built the full account strings, for example <code>101-300-1210-000-000</code> for the receivable and <code>101-300-4110-010-000</code> for Classic Lemonade revenue. Debits $420 = credits $400 + $20.</p>`,
    },
    {
      type: 'example',
      title: 'Chapter 2 — A partial payment (30 June)',
      html: `<p>June was busy for Happy Cafe and cash is a little tight. On 30 June, Big River Bank shows an incoming transfer of <strong>$200</strong> with the note <em>“HC part payment inv 10045”</em>.</p>`,
      steps: [
        'Omar opens <kbd>Receivables</kbd> &gt; <kbd>Accounts Receivable</kbd> and chooses <kbd>Create Receipt</kbd>: receipt method <strong>Bank Transfer</strong>, amount $200, date 30 June, customer Happy Cafe, remittance reference <strong>10045</strong>.',
        'Omar clicks <kbd>Submit and AutoApply Now</kbd>. AutoMatch finds transaction 10045 exactly, and AutoApply applies <strong>$200</strong> to it. The receipt is fully applied (nothing unapplied left on the receipt).',
        'Invoice 10045 now shows <strong>$220</strong> remaining. It is still not due, so there is nothing to chase.',
        'Omar does <em>not</em> write off or chargeback the rest — the customer clearly intends to pay more, and the invoice simply stays partly open.',
      ],
      result: `<p>Open balance <strong>$220</strong>, still <strong>Current</strong>. On 30 June, Sunny’s June close will show $220 owed by Happy Cafe.</p>`,
    },
    {
      type: 'journal',
      title: 'Journal 2 — Partial receipt applied (30 June, net effect)',
      lines: [
        { account: '1110 Cash – Big River Bank', debit: 200, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 200 },
      ],
      note: `<p>Oracle passes the cash through an unapplied receipts account first and clears it on application, so the net effect is simply Dr Cash / Cr Receivables. Revenue and tax don’t change: the sale was already recorded on 2 June.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: record the partial payment',
      instructions: `<p>Re-do Omar’s 30 June work on the practice screen. Happy Cafe sent $200 by bank transfer for invoice 10045 (open balance $420).</p>`,
      formTitle: 'Practice screen — Create Receipt (simulation)',
      fields: [
        { label: 'Business unit', given: 'Sunny US BU' },
        { label: 'Customer', given: 'Happy Cafe' },
        { label: 'Receipt method', type: 'select', options: ['Check', 'Bank Transfer', 'Direct Debit'], answer: 'Bank Transfer' },
        { label: 'Receipt date', type: 'date', answer: '2026-06-30' },
        { label: 'Receipt amount (USD)', type: 'number', answer: 200 },
        { label: 'Remittance reference', type: 'text', answer: '10045' },
        { label: 'Amount applied to invoice 10045 (USD)', type: 'number', answer: 200 },
        { label: 'Invoice 10045 balance after applying (USD)', type: 'number', answer: 220 },
      ],
      explain: `<p>The whole $200 receipt is applied, so the <em>receipt</em> has nothing unapplied, while the <em>invoice</em> still has $420 − $200 = $220 open. Don’t confuse the two: “fully applied receipt” and “fully paid invoice” are different things.</p>`,
    },
    {
      type: 'example',
      title: 'Chapter 3 — Ten broken bottles (3 July)',
      html: `<p>On 3 July, the day after the due date, Rosa calls Omar: <em>“We’ve paid $200. But I need to tell you — when we unpacked the delivery, 10 bottles were broken. We took photos. We won’t pay for those.”</em></p>`,
      steps: [
        'Omar listens, thanks Rosa, and asks Rosa to email the photos. This is a <strong>dispute</strong>, not a customer refusing to pay — so the right reaction is to investigate, not to push.',
        'Noah confirms the delivery crate was damaged on the truck. The claim is fair.',
        'In the <strong>Collections</strong> work area, Omar opens Happy Cafe, selects invoice 10045, clicks <kbd>Dispute</kbd>, chooses the reason (damaged goods), and enters a quantity of <strong>10</strong> on the line. Tax on those bottles is part of the credit.',
        'The dispute goes to Sam for approval, because credits reduce revenue. Sam approves on the same day.',
        'Once approved, the <strong>Credit Memo Creation</strong> process creates credit memo <strong>CM-2031</strong> for <strong>$21</strong> ($20 for 10 bottles + $1 tax) and applies it to invoice 10045.',
        'Omar emails Rosa: “Thanks for letting us know. We’ve credited $21 for the 10 broken bottles. The remaining balance on invoice 10045 is $199.”',
      ],
      result: `<p>Open balance <strong>$199</strong>. The invoice was due on 2 July, so from today it is <strong>past due</strong> (1–30 days bucket).</p>`,
    },
    {
      type: 'journal',
      title: 'Journal 3 — Credit memo CM-2031 for 10 bottles (3 July)',
      lines: [
        { account: '4110 Lemonade Sales Revenue', debit: 20, credit: 0 },
        { account: '2210 Sales Tax Payable', debit: 1, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 21 },
      ],
      note: `<p>The credit memo is the mirror image of part of the invoice: less revenue, less tax owed to the authority, less owed by the customer. Oracle’s Credit Memo Creation process sets the accounting date in the earliest open period, so the revenue reversal lands as close as possible to the original sale. Omar had already closed the Jun-26 Receivables period on 2 July, so the earliest open period is Jul-26 and the credit is accounted in July.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Why the dispute came first',
      html: `<p>If Omar had sent a sharp reminder on 3 July for the full $220, Rosa would have been annoyed — Sunny delivered broken bottles! Solving the dispute first made the remaining $199 undisputed and easy to collect. In real collections work, <strong>fixing the problem is often the fastest way to get paid</strong>.</p>`,
    },
    {
      type: 'example',
      title: 'Chapter 4 — Reminders, kindly (10 July – 4 August)',
      html: `<p>Happy Cafe’s profile places it in Sunny’s <strong>soft</strong> collections strategy: the customer has a good history, so the steps start gently and leave time between them.</p>`,
      steps: [
        '<strong>10 July – friendly reminder.</strong> A strategy task reminds Omar to send a reminder. Omar emails Rosa a copy of invoice 10045 and credit memo CM-2031: “Just a friendly note that $199 remains open on invoice 10045 (due 2 July).”',
        '<strong>31 July – month-end statement.</strong> The <strong>Create Customer Statements</strong> process sends Happy Cafe its monthly statement: invoice $420, receipt −$200, credit memo −$21, balance <strong>$199</strong>, shown in the 1–30 days past due bucket (29 days late).',
        '<strong>3 August – dunning letter.</strong> The invoice is now 32 days past due and moves into the <strong>31–60</strong> bucket. Sunny uses <strong>aged dunning</strong>, so the <strong>Send Dunning Letters</strong> process picks the template for that bucket — polite but clearer: “Your account has an overdue balance of $199. Please arrange payment or contact us.” It goes by email to the Dunning site’s contact.',
        '<strong>4 August – a call.</strong> The strategy’s next task is a call. Omar phones Rosa. Rosa apologizes: the payment was waiting for the owner’s signature. Rosa promises to pay <strong>$199 by 14 August</strong>.',
        '<strong>Record the promise.</strong> In the Collections work area Omar selects invoice 10045 and records a <strong>promise to pay</strong>: amount $199, date 14 August 2026. The strategy now waits; nobody else chases Happy Cafe.',
      ],
      result: `<p>Open balance still <strong>$199</strong>, aging bucket <strong>31–60</strong>, with an open promise. No journal entries in this chapter — reminders and promises don’t move money, they protect it.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Track the open balance',
      instructions: `<p>Fill in invoice 10045’s open balance after each event, and the aging bucket on the dates asked. The due date is 2 July 2026.</p>`,
      html: `<p>After the invoice on 2 June: balance USD {{}}.</p>
<p>After the $200 partial payment on 30 June: balance USD {{}}.</p>
<p>After credit memo CM-2031 on 3 July: balance USD {{}}.</p>
<p>On 31 July the invoice is {{}} days past due, so its bucket is {{}}.</p>
<p>On 3 August the invoice is 32 days past due, so its bucket is {{}}.</p>`,
      blanks: [
        { answer: 420 },
        { answer: 220, hint: '420 − 200' },
        { answer: 199, hint: '220 − 21' },
        { answer: 29, hint: 'From 2 July to 31 July' },
        { answer: ['1-30', '1 to 30'] },
        { answer: ['31-60', '31 to 60'] },
      ],
      explain: `<p>$420 → $220 → $199. On 31 July the invoice is 29 days late (1-30 bucket), and three days later it crosses into 31-60 — which is exactly why the aged dunning letter on 3 August uses the firmer 31-60 template.</p>`,
    },
    {
      type: 'example',
      title: 'Chapter 5 — The final payment (12 August)',
      html: `<p>On 12 August — two days before the promise date — Big River Bank shows a transfer of <strong>$199</strong> from Happy Cafe with the note <em>“Final payment 10045 + CM 2031”</em>.</p>`,
      steps: [
        'Omar creates the receipt: Bank Transfer, $199, 12 August, Happy Cafe, reference 10045.',
        '<kbd>Submit and AutoApply Now</kbd> applies $199 to invoice 10045. The invoice balance is now <strong>$0</strong> — it is closed.',
        'That night the scheduled <strong>promise reconciliation</strong> process compares payments with open promises. Happy Cafe’s promise of $199 by 14 August is marked <strong>Fulfilled</strong>.',
        'Because nothing is overdue any more, Happy Cafe drops off Omar’s Delinquent Customers list, and the remaining strategy tasks close automatically.',
        'Omar sends Rosa a short thank-you note. Good manners are part of collections too.',
        'Later, Mia reconciles the $200 and $199 receipts to Big River Bank’s statement lines in Cash Management.',
      ],
      result: `<p>Invoice 10045: <strong>closed</strong>. Happy Cafe owes Sunny <strong>$0</strong>. Total cash received: $200 + $199 = <strong>$399</strong>.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Build Journal 4 — the final receipt',
      instructions: `<p>Build the net accounting effect of the $199 receipt applied to invoice 10045 on 12 August.</p>`,
      accounts: ['1110 Cash – Big River Bank', '1210 Accounts Receivable', '4110 Lemonade Sales Revenue', '2210 Sales Tax Payable', '7110 Bank Charges'],
      answer: [
        { account: '1110 Cash – Big River Bank', debit: 199, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 199 },
      ],
      explain: `<p>Exactly like the partial payment: cash goes up, the receivable goes down. Revenue and tax were settled by the invoice and the credit memo, so they don’t move when cash arrives.</p>`,
    },
    {
      type: 'journal',
      title: 'Journal 4 — Final receipt applied (12 August, net effect)',
      lines: [
        { account: '1110 Cash – Big River Bank', debit: 199, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 199 },
      ],
      note: `<p>After this entry, the Happy Cafe portion of account 1210 is back to zero: +420 − 200 − 21 − 199 = 0.</p>`,
    },
    {
      type: 'table',
      caption: 'Status table — invoice 10045 through the story',
      headers: ['Date', 'Event', 'Oracle task / process', 'Change', 'Open balance', 'Aging status'],
      rows: [
        ['2 Jun', 'Invoice 10045 completed', 'Create Transaction; Print Receivables Transactions', '+$420.00', '$420.00', 'Current'],
        ['30 Jun', 'Partial payment', 'Create Receipt + AutoApply', '−$200.00', '$220.00', 'Current'],
        ['3 Jul', 'Credit for 10 broken bottles', 'Dispute → Credit Memo Creation', '−$21.00', '$199.00', '1–30 days past due'],
        ['10 Jul', 'Friendly reminder', 'Collections strategy task', '—', '$199.00', '1–30 days past due'],
        ['31 Jul', 'Monthly statement', 'Create Customer Statements', '—', '$199.00', '1–30 days past due'],
        ['3 Aug', 'Dunning letter', 'Send Dunning Letters (aged)', '—', '$199.00', '31–60 days past due'],
        ['4 Aug', 'Promise to pay $199 by 14 Aug', 'Collections: promise to pay', '—', '$199.00', '31–60, promise open'],
        ['12 Aug', 'Final payment', 'Create Receipt + AutoApply; promise reconciliation', '−$199.00', '$0.00', 'Closed; promise fulfilled'],
      ],
    },
    {
      type: 'lab',
      tool: 'journal-sandbox',
      title: 'Replay all four journals',
      intro: `<p>Here are all four journals of the story together. Watch the T-accounts: <strong>1210 Accounts Receivable</strong> ends at zero, <strong>1110 Cash</strong> at $399, <strong>4110 Revenue</strong> at $380 and <strong>2210 Sales Tax Payable</strong> at $19. Try removing the credit memo lines to see how the totals would change.</p>`,
      preset: {
        lines: [
          { account: '1210 Accounts Receivable', debit: 420, credit: 0 },
          { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 400 },
          { account: '2210 Sales Tax Payable', debit: 0, credit: 20 },
          { account: '1110 Cash – Big River Bank', debit: 200, credit: 0 },
          { account: '1210 Accounts Receivable', debit: 0, credit: 200 },
          { account: '4110 Lemonade Sales Revenue', debit: 20, credit: 0 },
          { account: '2210 Sales Tax Payable', debit: 1, credit: 0 },
          { account: '1210 Accounts Receivable', debit: 0, credit: 21 },
          { account: '1110 Cash – Big River Bank', debit: 199, credit: 0 },
          { account: '1210 Accounts Receivable', debit: 0, credit: 199 },
        ],
      },
    },
    {
      type: 'text',
      heading: 'Chapter 6 — Proving it at month-end',
      html: `<p>A story isn’t finished in accounting until the books prove it. At each month-end in this story, Omar follows the close checklist from the previous lesson: finish transactions and receipts, run <strong>Create Receivables Accounting</strong>, set the Receivables period to <strong>Close Pending</strong>, run <strong>Prepare Receivables to General Ledger Reconciliation</strong>, and review the reconciliation report with Priya.</p>
<p>Looking only at the Happy Cafe activity (other customers would add to every line), here is what the reconciliation showed:</p>`,
    },
    {
      type: 'table',
      caption: 'Happy Cafe activity in the Receivables to General Ledger reconciliation',
      headers: ['Period', 'Begin balance', 'Transactions (invoices and credits)', 'Receipts applied', 'Receivables end balance', 'GL 1210 (Happy Cafe part)', 'Difference'],
      rows: [
        ['Jun-26', '$0.00', '+$420.00', '−$200.00', '$220.00', '$220.00', '$0.00'],
        ['Jul-26', '$220.00', '−$21.00', '$0.00', '$199.00', '$199.00', '$0.00'],
        ['Aug-26', '$199.00', '$0.00', '−$199.00', '$0.00', '$0.00', '$0.00'],
      ],
    },
    {
      type: 'text',
      heading: 'What Omar and Priya checked each month',
      html: `<ul>
<li><strong>Everything accounted and posted.</strong> No unaccounted transactions or receipts for the period; the summary shows no differences between Receivables, accounting and the GL.</li>
<li><strong>Aging agrees.</strong> The <strong>Receivables Aging by General Ledger Account Report</strong> shows Happy Cafe at $220 at the end of June and $199 at the end of July — the same as the reconciliation’s ending balance.</li>
<li><strong>No surprises in non-Receivables activity.</strong> Nobody posted manual GL journals to 1210.</li>
<li><strong>Revenue makes sense.</strong> June revenue includes the $400 sale; July includes the −$20 credit. Tax payable reflects $20 − $1 = $19 owed to the tax authority.</li>
<li><strong>Cash agrees with the bank.</strong> Mia confirms the $200 and $199 receipts were matched to bank statement lines.</li>
</ul>
<p>Then Omar sets each Receivables period to <strong>Closed</strong>, and Priya closes the GL period. The story of invoice 10045 is complete: <span class="hl">billed, collected, credited fairly, and proven</span>.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'The Oracle pieces you used in this story',
      html: `<ul>
<li><strong>Billing work area</strong> – Create Transaction, Complete, Print Receivables Transactions (email delivery).</li>
<li><strong>Receivables Balances work area</strong> (Navigator: Accounts Receivable) – Create Receipt, Submit and AutoApply Now, AutoMatch.</li>
<li><strong>Collections work area</strong> – Dispute, strategy tasks, promise to pay; processes Send Dunning Letters and promise reconciliation.</li>
<li><strong>Credit Memo Creation</strong> – creates the credit memo after dispute approval.</li>
<li><strong>Create Customer Statements</strong> – the monthly statement.</li>
<li><strong>Create Receivables Accounting</strong> and the <strong>Receivables to General Ledger Reconciliation</strong> extract and report – month-end proof.</li>
</ul>
<p>Labels and menus vary by release, Redwood adoption and your company’s setup. Newer releases also offer AI helpers (such as a Cash Processing Agent and a Collector Workspace) that can do parts of this story with guidance — but the business steps stay the same.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Three habits this story teaches',
      html: `<ol>
<li><strong>Put the customer’s references on the invoice</strong> (PO HC-778). It makes their payment and your cash application faster.</li>
<li><strong>Resolve disputes before you chase.</strong> The undisputed balance is the one you can collect quickly.</li>
<li><strong>Record promises and trust the process.</strong> A recorded promise pauses the strategy and is checked automatically when cash arrives.</li>
</ol>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Partial payment', def: 'A customer payment that covers only part of an invoice, leaving the rest open.' },
        { term: 'Open balance', def: 'The amount still owed on a transaction after payments, credits and adjustments.' },
        { term: 'Credit memo request', def: 'A request, often created from a dispute, that must be approved before a credit memo is created.' },
        { term: 'Promise reconciliation', def: 'A scheduled check that compares customer payments with open promises to pay and updates their state.' },
        { term: 'Past due', def: 'Describes an invoice whose due date has passed while a balance is still open.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'After the $200 partial payment, what was the open balance on invoice 10045?',
          options: ['$200', '$220', '$199', '$420'],
          answer: 1,
          explain: 'The invoice total was $420 ($400 + $20 tax). $420 − $200 = $220.',
        },
        {
          q: 'Why did the credit memo for 10 bottles come to $21 instead of $20?',
          options: [
            'Omar added a fee',
            'The credit included the 5% tax on the 10 bottles',
            'Sam rounded it up',
            'The bank charged $1',
          ],
          answer: 1,
          explain: '10 bottles × $2 = $20 of revenue, plus 5% tax = $1. Crediting the tax too means Sunny no longer owes that $1 to the tax authority.',
        },
        {
          q: 'Which journal did the final $199 receipt create (net effect)?',
          options: [
            'Dr 1210 Accounts Receivable / Cr 1110 Cash',
            'Dr 1110 Cash / Cr 4110 Revenue',
            'Dr 1110 Cash / Cr 1210 Accounts Receivable',
            'Dr 4110 Revenue / Cr 1210 Accounts Receivable',
          ],
          answer: 2,
          explain: 'Receipts swap the receivable for cash. Revenue was recorded with the invoice and reduced with the credit memo — it does not move when cash arrives.',
        },
        {
          q: 'Why did the 3 August dunning letter use a firmer template than the 10 July reminder?',
          options: [
            'Because Happy Cafe disputed the invoice',
            'Because with aged dunning the letter depends on the aging bucket, and the invoice had moved into 31–60 days past due',
            'Because the credit memo was rejected',
            'Because statements are always firmer than dunning letters',
          ],
          answer: 1,
          explain: 'Aged dunning chooses the letter based on the oldest overdue item’s aging bucket. At 32 days late, the invoice crossed into the 31–60 bucket.',
        },
        {
          q: 'At the end of August, the reconciliation showed $0 difference for Happy Cafe. What does that prove?',
          options: [
            'That Happy Cafe will order again',
            'That Receivables, its accounting and the General Ledger agree, so every event was recorded and posted correctly',
            'That no tax was charged',
            'That the dunning letter worked',
          ],
          answer: 1,
          explain: 'A zero difference between the Receivables balance, the accounted amounts and the GL balance proves the subledger and the ledger tell the same story.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Requirements for Completing a Receivables Transaction', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/requirements-for-completing-a-receivables-transaction.html' },
    { title: 'Receivables Accrual Accounting Entries', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/receivables-accrual-accounting-entries.html' },
    { title: 'How Recommendations for Receipt Application Are Calculated', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/how-recommendations-for-receipt-application-are-calculated.html' },
    { title: 'Create a Dispute', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/create-a-dispute.html' },
    { title: 'Promise to Pay', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/promise-to-pay.html' },
    { title: 'Aged or Staged Dunning', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/aged-or-staged-dunning.html' },
    { title: 'Collections Task', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/collections-task.html' },
    { title: 'Overview of the Receivables to General Ledger Reconciliation Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/overview-of-the-receivables-to-general-ledger-reconciliation.html' },
  ],
};
