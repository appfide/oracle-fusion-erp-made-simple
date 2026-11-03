export default {
  slug: 'what-is-receivables',
  title: 'What Is Accounts Receivable?',
  minutes: 13,
  summary:
    'Accounts Receivable (AR) is the money customers owe us for things we already gave them. Learn the Order-to-Cash journey, where Receivables lives in Oracle Fusion, how it differs from Payables, and how DSO tells you how fast money comes in.',
  objectives: [
    'Explain in your own words what Accounts Receivable is and why it is an asset',
    'Describe the Order-to-Cash journey from order to cash in the bank',
    'Name the main Oracle Fusion work areas used for Receivables',
    'Calculate and explain DSO (Days Sales Outstanding)',
    'Compare Accounts Receivable with Accounts Payable',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The neighbor who pays next week',
      html: `<p>Imagine your lemonade stand on a hot Saturday. Your neighbor Mrs. Lee says, “I’d love 4 cups for my garden party, but my wallet is inside. Can I pay you next Saturday?” You trust Mrs. Lee, so you hand over the lemonade and write in your notebook: <em>“Mrs. Lee owes me $4. Pay by next Saturday.”</em></p>
<p>That little note is a promise of money that is <strong>coming to you</strong>. You already did your part (you gave the lemonade). Now you wait for Mrs. Lee’s part (the money).</p>
<p>A list of all those “people who owe me” notes is exactly what grown-up companies call <span class="hl">Accounts Receivable</span> — money we are going to <strong>receive</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'What Accounts Receivable really means',
      html: `<p><strong>Accounts Receivable</strong> (we shorten it to <strong>AR</strong>, and Oracle calls the module simply <strong>Receivables</strong>) is the money that customers owe a company for goods or services the company has <em>already delivered</em> but has not yet been paid for.</p>
<p>Businesses rarely ask a big customer to pay on the spot. Instead they send an <strong>invoice</strong> (a bill) that says “you owe us this much, please pay by this date.” The time allowed is called the <strong>payment terms</strong> — for example <strong>Net 30</strong> means “pay within 30 days.” Giving customers time to pay is called selling <strong>on credit</strong>.</p>
<p>In accounting, AR is an <strong>asset</strong>. That sounds strange at first — we don’t have the cash yet! But a promise to pay from a trustworthy customer is valuable, just like a coupon you can cash in later. In Sunny Lemonade’s chart of accounts it lives in account <code>1210 Accounts Receivable</code>.</p>
<p>The Receivables team has four big jobs:</p>
<ul>
<li><strong>Bill</strong> – create correct invoices and send them to customers.</li>
<li><strong>Collect</strong> – record payments (receipts) and match them to the right invoices.</li>
<li><strong>Chase</strong> – kindly remind customers who are late (collections).</li>
<li><strong>Report and close</strong> – make sure the money numbers are right and agree with the General Ledger at month-end.</li>
</ul>`,
    },
    {
      type: 'flow',
      title: 'Order-to-Cash: the journey of a sale',
      steps: [
        { icon: '📞', label: 'Order', detail: 'Happy Cafe asks Sunny Lemonade for 200 bottles of lemonade.' },
        { icon: '🚚', label: 'Deliver', detail: 'Sunny delivers the bottles. We have now done our part of the deal.' },
        { icon: '🧾', label: 'Invoice', detail: 'Omar creates an invoice in Receivables: $400 plus tax, due in 30 days.' },
        { icon: '⏳', label: 'Wait and watch', detail: 'The invoice sits in Accounts Receivable. Omar watches its age.' },
        { icon: '📣', label: 'Remind', detail: 'If the due date passes, the collections team sends a polite reminder.' },
        { icon: '💵', label: 'Receive cash', detail: 'Happy Cafe pays. Omar records a receipt and applies it to the invoice.' },
        { icon: '📒', label: 'Account and close', detail: 'Receivables creates accounting, sends it to the General Ledger, and Priya closes the month.' },
      ],
      note: `<p>Companies call this whole journey <strong>Order-to-Cash</strong> (often written <strong>O2C</strong>). Oracle’s Receivables guides call the money-collecting part <strong>Credit to Cash</strong>. You will meet the other big journeys (Procure-to-Pay and Record-to-Report) in the Basics module.</p>`,
    },

    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the Order-to-Cash journey in order',
      instructions: `<p>Happy Cafe orders lemonade. Drag the steps into the order they really happen.</p>`,
      items: [
        'Happy Cafe places an order for 200 bottles',
        'Sunny delivers the bottles',
        'Omar creates and completes the invoice',
        'The invoice waits in Accounts Receivable until its due date',
        'Happy Cafe pays and Omar applies the receipt',
        'Accounting is created and sent to the General Ledger',
      ],
      explain: `<p>Order → deliver → invoice → wait → receive cash → account. We bill <em>after</em> we deliver (we did our part first), and the receivable exists only between the invoice and the receipt. A reminder step would sit between “wait” and “pay” if the customer were late.</p>`,
    },
    {
      type: 'slides',
      title: 'Five words you will hear every day in Receivables',
      slides: [
        {
          icon: '🧑‍🍳',
          title: 'Customer',
          html: `<p>A person or company that buys from us. Sunny’s customers are <strong>Happy Cafe</strong>, <strong>City Park Kiosk</strong> and <strong>Sunshine School</strong>. Customers are set up once and reused on every bill. Next lesson is all about them.</p>`,
        },
        {
          icon: '🧾',
          title: 'Transaction',
          html: `<p>Oracle’s word for a billing document. The main kinds are <strong>invoices</strong> (you owe us), <strong>credit memos</strong> (you owe us less) and <strong>debit memos</strong> (you owe us a bit more).</p>`,
        },
        {
          icon: '💵',
          title: 'Receipt',
          html: `<p>A record of money we received — a check, a bank transfer, a card payment. A receipt is <strong>applied</strong> to the invoices it pays.</p>`,
        },
        {
          icon: '⏰',
          title: 'Aging',
          html: `<p>Sorting unpaid invoices by how old or how late they are: current, 1–30 days late, 31–60 days late, and so on. Older usually means riskier.</p>`,
        },
        {
          icon: '📣',
          title: 'Collections',
          html: `<p>The friendly (and sometimes firm) work of reminding customers to pay — by statements, emails, phone calls and dunning letters.</p>`,
        },
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Where Receivables lives in Oracle Fusion',
      html: `<p>Oracle’s implementation guide says day-to-day Receivables work happens in these overview work areas:</p>
<ul>
<li><strong>Billing</strong> – create and manage invoices, credit memos and debit memos; import transactions with <strong>AutoInvoice</strong> and fix import errors; review incomplete transactions; create and manage customers. In the Navigator it is under <kbd>Receivables</kbd> &gt; <kbd>Billing</kbd>.</li>
<li><strong>Receivables Balances</strong> – create and apply receipts, import receipts through lockbox or a spreadsheet, create automatic receipts, remit receipts to the bank, reconcile Receivables to the General Ledger and manage Receivables accounting periods. In the Navigator this usually shows as <kbd>Receivables</kbd> &gt; <kbd>Accounts Receivable</kbd>.</li>
<li><strong>Revenue Management</strong> – recognize revenue over time and adjust revenue on transactions.</li>
<li><strong>Credit Management</strong> – decide how much credit each customer may have.</li>
</ul>
<p>Chasing late payers happens in the <strong>Collections</strong> work area of <strong>Oracle Advanced Collections</strong>. Menu labels can differ a little by release and by how your company configured Fusion.</p>`,
    },
    {
      type: 'text',
      heading: 'AR and AP: two sides of the same coin',
      html: `<p>If you finished the Payables module, Receivables will feel familiar — it is the mirror image. In Payables, Sunny is the <em>customer</em> paying suppliers like Lemon Grove Farms. In Receivables, Sunny is the <em>supplier</em> and waits for its own customers to pay.</p>
<p>Here is a fun fact: Happy Cafe’s Accounts <em>Payable</em> team has Sunny’s invoice in <em>their</em> system as a bill to pay. One company’s receivable is another company’s payable.</p>`,
    },
    {
      type: 'table',
      caption: 'Accounts Receivable vs. Accounts Payable',
      headers: ['Question', 'Accounts Receivable (AR)', 'Accounts Payable (AP)'],
      rows: [
        ['Who owes whom?', 'Customers owe <strong>us</strong>', '<strong>We</strong> owe suppliers'],
        ['Kind of account', 'Asset (<code>1210 Accounts Receivable</code>)', 'Liability (<code>2110 Accounts Payable – Trade</code>)'],
        ['Main document', 'Invoice we <strong>send</strong>', 'Invoice we <strong>receive</strong>'],
        ['Money direction', 'Cash comes <strong>in</strong> (receipts)', 'Cash goes <strong>out</strong> (payments)'],
        ['Sunny person', 'Omar (Receivables specialist)', 'Ava (Payables specialist)'],
        ['Oracle work areas', 'Billing, Receivables Balances, Collections', 'Invoices, Payments'],
        ['Journey', 'Order-to-Cash', 'Procure-to-Pay'],
        ['Good news looks like…', 'Customers paying quickly', 'Paying on time, not too early'],
      ],
    },

    {
      type: 'exercise',
      kind: 'classify',
      title: 'AR or AP?',
      instructions: `<p>For each event at Sunny Lemonade, decide whether it belongs to Accounts Receivable (money coming to us) or Accounts Payable (money we owe).</p>`,
      categories: ['Accounts Receivable', 'Accounts Payable'],
      items: [
        { text: 'Happy Cafe owes Sunny $420 for lemonade', answer: 'Accounts Receivable' },
        { text: 'Lemon Grove Farms sends Sunny a $500 invoice for lemons', answer: 'Accounts Payable' },
        { text: 'Omar records a bank transfer from City Park Kiosk', answer: 'Accounts Receivable' },
        { text: 'Ava pays Sweet Sugar Co. $200', answer: 'Accounts Payable' },
        { text: 'Sunshine School receives a reminder about an overdue invoice', answer: 'Accounts Receivable' },
        { text: 'Bright Power Utility’s $150 electricity bill arrives', answer: 'Accounts Payable' },
        { text: 'A credit memo is issued for 10 broken bottles', answer: 'Accounts Receivable' },
      ],
      explain: `<p>Ask one question: <strong>who owes whom?</strong> If a customer owes Sunny, it is AR (Omar’s world). If Sunny owes a supplier, it is AP (Ava’s world). Credit memos to customers and reminders to customers are AR activities too.</p>`,
    },
    {
      type: 'text',
      heading: 'DSO: how many days until the money arrives?',
      html: `<p>Managers love one number in Receivables: <strong>DSO</strong>, which stands for <strong>Days Sales Outstanding</strong>. It answers: <em>“On average, how many days of sales are still waiting to be paid?”</em> A lower DSO means customers pay faster, which means more cash in the bank.</p>
<p>Oracle Advanced Collections shows the classic formula like this:</p>
<p><strong>DSO = Ending receivables balance × number of days in the period ÷ credit sales in the period</strong></p>
<p>You compare DSO with your payment terms. If most customers are on Net 30 and your DSO is 45, customers are paying about two weeks late on average — time to look at collections. Oracle also offers related versions such as <em>True DSO</em> and <em>Best Possible DSO</em> in its collections metrics; you will meet them in the Collections lesson.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny Lemonade’s DSO for June',
      html: `<p>Sam the CFO asks Omar: “Are our customers paying on time?” Omar pulls the June numbers for Sunny Lemonade US Inc.</p>`,
      steps: [
        'Credit sales in June (30 days): <strong>$6,000</strong> (Happy Cafe, City Park Kiosk and Sunshine School together).',
        'Accounts Receivable balance at the end of June: <strong>$3,000</strong> still unpaid.',
        'DSO = $3,000 × 30 ÷ $6,000 = <strong>15 days</strong>.',
        'Sunny’s standard payment terms are <strong>Net 30</strong>, so 15 days is comfortably inside the terms.',
      ],
      result: `<p>Omar tells Sam: “On average, a sale turns into cash in about 15 days. We’re healthy.” If next month DSO jumps to 40, Omar knows something changed — maybe a big customer is late — and starts digging.</p>`,
    },
    {
      type: 'journal',
      title: 'The two moments money “moves” in AR (Happy Cafe, simplified)',
      lines: [
        { account: '1210 Accounts Receivable (invoice: Happy Cafe now owes us)', debit: 400, credit: 0 },
        { account: '4110 Lemonade Sales Revenue (we earned the sale)', debit: 0, credit: 400 },
        { account: '1110 Cash – Big River Bank (Happy Cafe pays)', debit: 400, credit: 0 },
        { account: '1210 Accounts Receivable (Happy Cafe no longer owes us)', debit: 0, credit: 400 },
      ],
      note: `<p>Two entries shown together. First the <strong>invoice</strong> increases AR and records revenue. Later the <strong>receipt</strong> swaps AR for cash. Notice AR went up $400 and then down $400: it is a “waiting room” for money. (We left out sales tax here to keep it simple — the Transactions lesson adds it.)</p>`,
    },

    {
      type: 'exercise',
      kind: 'fill',
      title: 'Calculate DSO yourself',
      instructions: `<p>Use the formula <strong>DSO = ending AR × days in period ÷ credit sales</strong>. Round to whole days.</p>`,
      html: `<p>July (31 days): ending AR is $4,000 and credit sales were $6,200. DSO = {{}} days.</p>
<p>August (31 days): ending AR jumps to $9,000 while credit sales stay at $6,200. DSO = {{}} days.</p>
<p>Sunny’s terms are Net 30. In August, are customers paying on average inside or outside the terms? Type <em>inside</em> or <em>outside</em>: {{}}</p>`,
      blanks: [
        { answer: 20, tolerance: 0.5, hint: '4,000 × 31 ÷ 6,200' },
        { answer: 45, tolerance: 0.5, hint: '9,000 × 31 ÷ 6,200' },
        { answer: ['outside'], hint: 'Compare DSO with 30 days' },
      ],
      explain: `<p>July: 4,000 × 31 ÷ 6,200 = 20 days. August: 9,000 × 31 ÷ 6,200 = 45 days. Sales didn’t change, but unpaid balances more than doubled, so DSO jumped past the 30-day terms — a signal for Omar to check aging and start collections.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: AR is about cash, not just accounting',
      html: `<p>A company can show big sales and still run out of money if customers do not pay. That is why CFOs watch Receivables closely. In real jobs, a Receivables specialist spends a lot of time on three things: getting invoices <strong>right the first time</strong> (wrong invoices get paid late), <strong>applying cash quickly</strong> (so customers aren’t chased for bills they already paid), and <strong>talking to customers</strong> politely when something goes wrong.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Common beginner mix-up',
      html: `<p>“Receivable” is not the same as “revenue.” <strong>Revenue</strong> is what we earned by selling. <strong>Receivable</strong> is what is still unpaid. If Happy Cafe paid cash on the spot, Sunny would have revenue but <em>no</em> receivable at all.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Accounts Receivable (AR)', def: 'Money customers owe us for goods or services we already delivered. It is an asset.' },
        { term: 'Order-to-Cash (O2C)', def: 'The business journey from a customer order, through delivery and invoicing, to cash received and recorded.' },
        { term: 'Invoice', def: 'A bill we send to a customer that says how much they owe and when it is due.' },
        { term: 'Payment terms', def: 'The rules for when a customer must pay, such as Net 30 (within 30 days).' },
        { term: 'Receipt', def: 'A record of money received from a customer or another source.' },
        { term: 'DSO (Days Sales Outstanding)', def: 'The average number of days it takes to turn sales into cash. Lower is usually better.' },
        { term: 'Billing work area', def: 'The Oracle Fusion Receivables work area for creating and managing transactions and customers.' },
        { term: 'Receivables Balances work area', def: 'The Oracle Fusion work area for receipts, applications, remittances, reconciliation and AR periods.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Happy Cafe received 200 bottles today and will pay in 30 days. In Sunny Lemonade’s books, the $400 they owe is…',
          options: ['A liability in Accounts Payable', 'An asset in Accounts Receivable', 'An expense', 'Cash in the bank'],
          answer: 1,
          explain: 'Money a customer owes us is an Accounts Receivable asset (account 1210). It becomes cash only when Happy Cafe actually pays.',
        },
        {
          q: 'Which Oracle Fusion work area would Omar use to create an invoice for Happy Cafe?',
          options: ['Billing', 'Payables Invoices', 'Fixed Assets', 'Expenses'],
          answer: 0,
          explain: 'The Billing work area is where Receivables transactions (invoices, credit memos, debit memos) and customers are created and managed.',
        },
        {
          q: 'Sunny’s AR balance is $3,000 at month-end and credit sales for the 30-day month were $6,000. What is DSO?',
          options: ['5 days', '15 days', '30 days', '60 days'],
          answer: 1,
          explain: 'DSO = $3,000 × 30 ÷ $6,000 = 15 days. On average, customers pay about 15 days after a sale.',
        },
        {
          q: 'What is the BEST description of how AR and AP relate?',
          options: [
            'They are the same thing with different names',
            'AR is money owed to us; AP is money we owe others',
            'AR is only for cash sales; AP is only for credit purchases',
            'AR is a liability and AP is an asset',
          ],
          answer: 1,
          explain: 'They are mirror images. AR (asset) tracks what customers owe us; AP (liability) tracks what we owe suppliers.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Overview of Oracle Receivables (Implementing Receivables Credit to Cash, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/overview-of-oracle-receivables.html' },
    { title: 'Using Receivables Credit to Cash (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/index.html' },
    { title: 'Days Sales Outstanding', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/days-sales-outstanding.html' },
    { title: 'Receivables Accrual Accounting Entries', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/receivables-accrual-accounting-entries.html' },
    { title: 'Overview of Advanced Collections Work Area', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/overview-of-advanced-collections-work-area.html' },
  ],
};
