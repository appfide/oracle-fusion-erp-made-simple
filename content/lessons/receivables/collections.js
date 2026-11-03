export default {
  slug: 'collections',
  title: 'Collections: Kindly Asking People to Pay',
  minutes: 17,
  summary:
    'Some customers pay late. Collections is the organized, polite work of getting paid: aging and aging buckets, statements, dunning letters, and Oracle Advanced Collections with collectors, strategies, promises to pay and disputes — plus the manners that keep customers happy.',
  objectives: [
    'Read an aging report and explain aging buckets',
    'Explain the difference between a statement and a dunning letter',
    'Describe how Oracle Advanced Collections uses collectors, scoring, strategies and tasks',
    'Record a promise to pay and explain how disputes become credit memos',
    'Apply simple, kind collection etiquette',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The library’s overdue books',
      html: `<p>Your school library lends you a book for two weeks. If you forget to return it, the librarian doesn’t shout at you on day one. First you get a friendly note: <em>“Your book is due — please bring it back.”</em> A week later, a firmer note. After a month, maybe a call home.</p>
<p>The librarian also keeps a list sorted by <strong>how late</strong> each book is: a few days late, a week late, a month late. The very late ones get the most attention.</p>
<p>Companies do the same thing with unpaid invoices. The sorted list is called <span class="hl">aging</span>, the friendly notes are <span class="hl">statements and dunning letters</span>, and the whole job is called <span class="hl">collections</span>.</p>`,
    },
    {
      type: 'text',
      heading: 'Why collections matters',
      html: `<p>A sale is only good for the business when the cash arrives. Every day an invoice stays unpaid, the company is effectively lending money to its customer for free — and the older a debt gets, the less likely it is to be paid at all.</p>
<p><strong>Collections</strong> is the organized work of making sure customers pay what they owe, on time, while keeping a good relationship. It covers:</p>
<ul>
<li>Knowing <strong>who is late and by how much</strong> (aging).</li>
<li><strong>Reminding</strong> customers (statements, dunning letters, emails, calls).</li>
<li>Recording what customers <strong>promise</strong> and following up.</li>
<li>Finding and fixing <strong>disputes</strong> — often the real reason for a late payment.</li>
<li>Measuring how well it is working (metrics such as DSO).</li>
</ul>`,
    },
    {
      type: 'text',
      heading: 'Aging and aging buckets',
      html: `<p><strong>Aging</strong> sorts open items by how many days past due they are. Each range of days is an <strong>aging bucket</strong>. A typical set is: Current (not yet due), 1–30 days past due, 31–60, 61–90 and over 90.</p>
<p>In Oracle, aging layouts are defined as <strong>aging methods</strong> (the setup task is <kbd>Manage Aging Methods</kbd>). Each method lists its buckets with “days from” and “days to”, and aging methods are also used when designing dunning. Oracle delivers predefined methods (such as 4-bucket and 7-bucket styles) that you can copy and adjust.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny Lemonade US — aging on 31-Jul-26 (amounts in USD)',
      headers: ['Customer', 'Current', '1–30 days', '31–60 days', '61–90 days', 'Over 90', 'Total'],
      rows: [
        ['Happy Cafe', '420.00', '0.00', '0.00', '0.00', '0.00', '420.00'],
        ['City Park Kiosk', '157.50', '210.00', '0.00', '0.00', '0.00', '367.50'],
        ['Sunshine School', '0.00', '0.00', '525.00', '0.00', '0.00', '525.00'],
        ['<strong>Total</strong>', '<strong>577.50</strong>', '<strong>210.00</strong>', '<strong>525.00</strong>', '<strong>0.00</strong>', '<strong>0.00</strong>', '<strong>1,312.50</strong>'],
      ],
    },
    {
      type: 'example',
      title: 'Omar reads the aging',
      html: `<p>Omar is also Sunny’s collector. Omar looks at the aging above on the last day of July.</p>`,
      steps: [
        '<strong>Happy Cafe</strong> is fully current — nothing to do except say thank you.',
        '<strong>City Park Kiosk</strong> has $210 that is 1–30 days late. A friendly reminder email is enough for now.',
        '<strong>Sunshine School</strong> has $525 in the 31–60 bucket. That’s the priority. Before sending anything, Omar checks for a reason: Is there a dispute? Did the school receive the invoice? Is the receipt maybe sitting unapplied?',
        'Omar finds the school’s finance office never got the invoice — it went to an old email address. Omar fixes the contact, resends the invoice, and records a <strong>promise to pay</strong> for 15-Aug-26.',
      ],
      result: `<p>The “late” payment wasn’t bad behavior at all — it was bad data. Many collection problems are solved by fixing the cause, not by sending a sterner letter.</p>`,
    },

    {
      type: 'exercise',
      kind: 'fill',
      title: 'Age the invoices yourself',
      instructions: `<p>Today is <strong>31 July 2026</strong>. Work out how many days past due each invoice is and which bucket it belongs in. Buckets: Current, 1-30, 31-60, 61-90, Over 90.</p>`,
      html: `<p>Invoice 10052 was due on 30 June 2026. Days past due: {{}}. Bucket: {{}}</p>
<p>Invoice 10061 was due on 15 July 2026. Days past due: {{}}. Bucket: {{}}</p>
<p>Invoice 10075 is due on 20 August 2026. Bucket: {{}}</p>
<p>Invoice 10003 was due on 2 April 2026. Bucket: {{}}</p>`,
      blanks: [
        { answer: 31, hint: '1 day left in June + 30 days of July' },
        { answer: ['31-60', '31 to 60'], hint: 'More than 30, not more than 60' },
        { answer: 16, hint: '31 minus 15' },
        { answer: ['1-30', '1 to 30'] },
        { answer: ['Current'], hint: 'Not yet due' },
        { answer: ['Over 90', '90+', 'over 90 days'], hint: 'April, May, June, July…' },
      ],
      explain: `<p>Days past due = as-of date minus due date. 10052: 31 days → 31-60. 10061: 16 days → 1-30. 10075 isn’t due yet → Current. 10003: 120 days → Over 90, the riskiest bucket and the first one to investigate.</p>`,
    },
    {
      type: 'slides',
      title: 'Reminders, from gentle to firm',
      slides: [
        {
          icon: '📄',
          title: 'Statements',
          html: `<p>A <strong>statement</strong> is a regular summary of a customer’s account: open invoices, payments, credits and the total due, often with an aging summary. It is informational, not angry. Oracle’s <strong>Create Customer Statements</strong> process generates them on a <strong>statement cycle</strong> (for example monthly) set in the customer profile. A <em>statement site</em> lets one address receive one combined statement for all bill-to sites.</p>`,
        },
        {
          icon: '✉️',
          title: 'Dunning letters',
          html: `<p>A <strong>dunning letter</strong> is a reminder specifically about <strong>overdue</strong> items. In Oracle Advanced Collections, dunning letters can be sent by email, fax or print using templates (built with BI Publisher), and customers can be excluded through their profiles. The <strong>Send Dunning Letters</strong> process does the sending.</p>`,
        },
        {
          icon: '📅',
          title: 'Aged vs. staged dunning',
          html: `<p><strong>Aged dunning</strong> picks the letter based on the <em>oldest</em> overdue item’s aging bucket — the letter gets firmer as the debt ages. <strong>Staged dunning</strong> is based on the number of days since the <em>last letter</em>, sending letters at set intervals. Both can send one consolidated letter per customer.</p>`,
        },
        {
          icon: '💸',
          title: 'Late charges',
          html: `<p>Some companies charge interest or penalties on overdue invoices. Receivables can calculate <strong>late charges</strong> based on the customer’s late charge policy and present them as debit memos, interest invoices or adjustments.</p>`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: Advanced Collections and the Collections work area',
      html: `<p><strong>Oracle Advanced Collections</strong> organizes collection work for teams. Key pieces:</p>
<ul>
<li><strong>Collectors</strong> – employees set up as collectors and assigned to customers. A Collections Manager can reassign customers or set a backup collector for holidays.</li>
<li><strong>Collections work area</strong> – infotiles show <strong>Delinquent Customers</strong>, <strong>Promises</strong> (open and broken) and <strong>Strategy Tasks</strong>. From a customer you can see transactions and create disputes, adjustments, promises and payments.</li>
<li><strong>Scoring and strategies</strong> – customers (or other collection objects) are scored; the score decides which <strong>strategy</strong> applies. A strategy is an ordered list of <strong>tasks</strong> such as “send reminder letter,” “call,” “follow-up call,” “escalate to supervisor.” Oracle’s example: a high score gets a <em>soft</em> strategy, a low score a <em>hard</em> one.</li>
<li><strong>Processes that keep it fresh</strong> – for example <em>Collections Delinquency Management</em>, <em>Collections Scoring and Strategy Assignment</em> and <em>Update Collections Summary Data</em>.</li>
<li><strong>Collections Manager Dashboard</strong> – metrics and resource management for the whole team.</li>
</ul>`,
    },
    {
      type: 'flow',
      title: 'How a collections strategy runs',
      steps: [
        { icon: '🔎', label: 'Find delinquencies', detail: 'A scheduled process flags transactions that are past due.' },
        { icon: '🧮', label: 'Score', detail: 'Each customer gets a score based on things like payment history and amounts overdue.' },
        { icon: '🗺️', label: 'Assign strategy', detail: 'The score picks a strategy: soft for good payers, firmer for risky ones.' },
        { icon: '📋', label: 'Do tasks', detail: 'Tasks appear for the collector or run automatically (e.g., a dunning letter). Wait times sit between tasks.' },
        { icon: '🤝', label: 'Record outcome', detail: 'Promise to pay, dispute, payment, or escalation is recorded on the customer.' },
        { icon: '✅', label: 'Close', detail: 'When the customer pays, remaining tasks close because there is nothing left to collect.' },
      ],
      note: `<p>Oracle task statuses include Open, Complete, Skip, Closed (customer already paid) and Canceled (strategy changed). Collectors can also change a customer’s strategy by hand from the customer’s Profile area.</p>`,
    },

    {
      type: 'exercise',
      kind: 'order',
      title: 'Order the tasks of a “soft” strategy',
      instructions: `<p>Oracle’s documentation describes a gentle <strong>Soft</strong> strategy for good customers. Put its tasks in the order they would run.</p>`,
      items: [
        'Send a reminder letter',
        'Make a call',
        'Make a follow-up call',
        'Send a dunning letter',
      ],
      explain: `<p>A soft strategy starts gently (a reminder), moves to a personal call, follows up, and only then sends a formal dunning letter. Oracle’s <strong>Hard</strong> strategy for risky customers starts with the dunning letter and escalates to a supervisor faster. Wait times between tasks give the customer time to respond.</p>`,
    },
    {
      type: 'text',
      heading: 'Promises to pay and disputes',
      html: `<p>A <strong>promise to pay</strong> records a customer’s commitment: “We’ll pay $525 on 15 August.” You can promise against one or several transactions. Oracle then tracks it: a scheduled promise reconciliation process compares payments with open promises (run it after cash is applied). A promise’s <strong>state</strong> shows whether it is still a valid promise or <strong>Broken</strong> (not paid by the date), and its <strong>status</strong> can be Collectible, Fulfilled or Canceled (entered in error).</p>
<p>A <strong>dispute</strong> is when the customer says an invoice is wrong — wrong price, damaged goods, tax or shipping. In the Collections work area the collector selects the transaction, clicks <kbd>Dispute</kbd>, picks a dispute section and reason, and enters the amount or quantity in question (one dispute section at a time). A designated person reviews it; if approved, the <strong>credit memo is created automatically</strong>. While a dispute is open, it is fair to pause chasing that amount.</p>`,
    },

    {
      type: 'exercise',
      kind: 'classify',
      title: 'Statement, dunning, promise or dispute?',
      instructions: `<p>Decide which collections tool fits each situation.</p>`,
      categories: ['Statement', 'Dunning letter', 'Promise to pay', 'Dispute'],
      items: [
        { text: 'Monthly summary of all of Happy Cafe’s invoices, payments and balance', answer: 'Statement' },
        { text: 'Sunshine School says: “We will pay $525 on 15 August”', answer: 'Promise to pay' },
        { text: 'City Park Kiosk says the price on invoice 10061 is wrong', answer: 'Dispute' },
        { text: 'A reminder about two invoices that are 35 days past due', answer: 'Dunning letter' },
        { text: 'Happy Cafe reports 10 bottles were broken on delivery', answer: 'Dispute' },
        { text: 'A firmer reminder sent 14 days after the previous letter (staged)', answer: 'Dunning letter' },
      ],
      explain: `<p>Statements inform about the <em>whole account</em>. Dunning letters remind about <em>overdue</em> items. Promises record a customer’s <em>commitment</em> to pay by a date. Disputes record that the customer thinks the bill is <em>wrong</em>; if approved, Oracle creates a credit memo.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'What’s new: AI helpers for collectors',
      html: `<p>Oracle’s recent releases add an AI-powered <strong>Collector Workspace</strong>. In 26D it prioritizes accounts that need attention, explains recommended next-best actions, reads incoming customer emails for context, and — under company policies — can carry out some approved actions automatically. Collectors open it from the ERP Agents menu. Availability depends on your release and what your company has enabled; the basics in this lesson still apply underneath.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: record a promise to pay',
      items: [
        'Open the <strong>Collections</strong> work area (your menu may show it as Collections or Advanced Collections).',
        'Search for the customer, for example <strong>Sunshine School</strong>, and open the customer.',
        'Go to the transactions view and select the overdue invoice(s).',
        'Choose the promise action, enter the promised amount and the promise date, and save.',
        'Check the <strong>Promises</strong> infotile later to see whether the promise was fulfilled or broken.',
      ],
      note: `<p>You must be set up as a collector to see your customers on the dashboard. Labels differ by release and configuration.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Kind collection etiquette',
      html: `<ul>
<li><strong>Assume good intent first.</strong> Most late payments are caused by lost invoices, missing PO numbers, or a dispute nobody told you about.</li>
<li><strong>Check your own house.</strong> Before you call, make sure there isn’t an unapplied receipt or an open credit memo for that customer.</li>
<li><strong>Be specific and polite.</strong> “Invoice 10052 for $525, due 30 June, is now 31 days past due. Could you tell me when we can expect payment?”</li>
<li><strong>Write down promises</strong> and follow up on the date — reliably, not aggressively.</li>
<li><strong>Escalate step by step.</strong> Email, then call, then manager, then (rarely) stop shipping or a collection agency. Sales colleagues should know before big steps.</li>
<li><strong>Protect relationships.</strong> Today’s late payer may be next year’s best customer.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Don’t reconcile with collections aging reports',
      html: `<p>Oracle warns that the Advanced Collections aging reports (Collections Aging 4 Bucket, Aging by Collector 7 Bucket, Aging by Common Currency) don’t include general ledger account details. For month-end reconciliation, use the <strong>Receivables Aging by General Ledger Account Report</strong> instead — see the closing lesson.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Aging bucket', def: 'A range of days past due, such as 1 to 30 days, used to group unpaid items.' },
        { term: 'Statement', def: 'A regular summary of a customer’s account activity and balance sent to the customer.' },
        { term: 'Dunning letter', def: 'A reminder letter or email about overdue items, getting firmer as debts age.' },
        { term: 'Collector', def: 'A person assigned to follow up with specific customers about overdue payments.' },
        { term: 'Collections strategy', def: 'An ordered set of collection tasks, such as letters and calls, chosen based on a customer’s score.' },
        { term: 'Promise to pay', def: 'A recorded commitment from a customer to pay a stated amount by a stated date.' },
        { term: 'Dispute', def: 'A customer’s claim that all or part of a transaction is wrong; if approved it can lead to a credit memo.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'An invoice was due 40 days ago. In a standard aging, which bucket is it in?',
          options: ['Current', '1–30 days past due', '31–60 days past due', 'Over 90 days'],
          answer: 2,
          explain: 'Aging buckets group items by days past due. 40 days late falls in the 31–60 bucket.',
        },
        {
          q: 'What is the main difference between a statement and a dunning letter?',
          options: [
            'They are the same thing',
            'A statement summarizes the whole account; a dunning letter is a reminder about overdue items',
            'A statement is only sent to suppliers',
            'Dunning letters are only for paid invoices',
          ],
          answer: 1,
          explain: 'Statements are periodic account summaries. Dunning letters specifically remind customers about past-due amounts.',
        },
        {
          q: 'Sunshine School promised to pay $525 by 15 August but didn’t. What will Oracle show for that promise?',
          options: ['Fulfilled', 'Broken', 'Disputed', 'Reversed'],
          answer: 1,
          explain: 'A promise is Broken when payment isn’t made by the committed date. Running promise reconciliation after cash application updates it.',
        },
        {
          q: 'A customer says 10 bottles were broken and won’t pay that part. What is the best collections action?',
          options: [
            'Send the hardest dunning letter',
            'Create a dispute for the amount; if approved, a credit memo is created',
            'Reverse their last receipt',
            'Delete the invoice',
          ],
          answer: 1,
          explain: 'Disputes capture the reason and amount. After approval, Oracle creates the credit memo automatically, and the rest of the invoice can still be collected.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Aging Methods', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/aging-methods.html' },
    { title: 'Aging Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/aging-reports.html' },
    { title: 'Overview of Dunning', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/overview-of-dunning.html' },
    { title: 'Aged or Staged Dunning', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/aged-or-staged-dunning.html' },
    { title: 'How You Use Statement Cycles', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/how-you-use-statement-cycles.html' },
    { title: 'Overview of Advanced Collections Work Area', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/overview-of-advanced-collections-work-area.html' },
    { title: 'Processing Strategies', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/processing-strategies.html' },
    { title: 'Collections Task', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/collections-task.html' },
    { title: 'Promise to Pay', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/promise-to-pay.html' },
    { title: 'Create a Dispute', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/create-a-dispute.html' },
    { title: 'Collector Workspace Agentic Application (26D What’s New)', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51379.htm' },
  ],
};
