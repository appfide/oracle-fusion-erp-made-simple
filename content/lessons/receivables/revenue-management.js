export default {
  slug: 'revenue-management',
  title: 'Revenue Management: When Do We Count the Money?',
  minutes: 18,
  summary:
    'Getting paid and earning revenue are not the same moment. Learn the five-step revenue model of ASC 606 and IFRS 15 in kid terms, deferred revenue, how Receivables schedules revenue with invoicing and revenue scheduling rules, and what Oracle Revenue Management adds for complex contracts.',
  objectives: [
    'Explain why billing, cash and revenue can happen at different times',
    'Describe the five steps of ASC 606 / IFRS 15 in simple words',
    'Explain deferred (unearned) revenue and record its journals',
    'Describe invoicing rules, revenue scheduling rules and the Recognize Revenue process in Receivables',
    'Say when a company would use Oracle Revenue Management instead of basic Receivables revenue',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The paid-in-advance birthday parties',
      html: `<p>A neighbor pays you <strong>$12 today</strong> so that you will bring a jug of lemonade to their house <strong>once a month for a whole year</strong>.</p>
<p>Did you “earn” $12 today? Not really! Today you only have a promise to keep. After the first delivery you’ve earned $1. After six deliveries, $6. If you stopped after three months, you’d owe the neighbor most of their money back.</p>
<p>Accountants follow the same fair rule: you count money as <span class="hl">earned revenue</span> only when you have <strong>done the work you promised</strong>, not just when the money arrives or the bill goes out. Money you got before doing the work is <span class="hl">deferred revenue</span> — a promise you still owe.</p>`,
    },
    {
      type: 'text',
      heading: 'Three different moments',
      html: `<p>In Receivables there are three moments that are easy to mix up:</p>
<ul>
<li><strong>Billing</strong> – when we send the invoice (creates a receivable).</li>
<li><strong>Cash</strong> – when the customer pays (creates a receipt).</li>
<li><strong>Revenue</strong> – when we have actually <strong>delivered</strong> what we promised (earned it).</li>
</ul>
<p>For Happy Cafe’s 200 bottles, all three are close together: deliver today, invoice today, cash in 30 days, revenue today. But for subscriptions, service contracts, bundles, or deals with “you can return it” or “only after you approve it” clauses, revenue can come earlier or later than the invoice. Recording it at the right time keeps the financial statements honest — and is required by accounting standards.</p>`,
    },
    {
      type: 'slides',
      title: 'The five steps of ASC 606 and IFRS 15 (kid edition)',
      slides: [
        {
          icon: '🤝',
          title: '1. Find the deal (the contract)',
          html: `<p>Is there a real agreement with a customer, with clear promises and payment terms? <em>Sunshine School signs an order form for a “Summer Party Pack.”</em></p>`,
        },
        {
          icon: '🎁',
          title: '2. List the separate promises (performance obligations)',
          html: `<p>Which distinct things did we promise? Something is “distinct” if the customer could benefit from it on its own. <em>Promise A: 300 bottles of lemonade. Promise B: 3 monthly lemonade-making workshops.</em></p>`,
        },
        {
          icon: '🏷️',
          title: '3. Decide the price of the whole deal',
          html: `<p>The <strong>transaction price</strong> is what we expect to receive. It can include discounts or variable amounts. <em>The Party Pack costs $810.</em></p>`,
        },
        {
          icon: '✂️',
          title: '4. Share the price among the promises',
          html: `<p>Split the price using each promise’s <strong>standalone selling price</strong> — what it would cost if sold alone. <em>Bottles alone: $600. Workshops alone: $300. Together they’d be $900, so the $810 deal is a 10% discount, shared fairly: bottles $540, workshops $270.</em></p>`,
        },
        {
          icon: '✅',
          title: '5. Count revenue when each promise is kept',
          html: `<p>Recognize revenue when (or as) the customer gets control. Goods are usually <strong>at a point in time</strong> (on delivery); services are usually <strong>over time</strong>. <em>Bottles: $540 on delivery day. Workshops: $90 after each monthly workshop.</em></p>`,
        },
      ],
    },

    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the five steps in order',
      instructions: `<p>Arrange the five revenue recognition steps of ASC 606 / IFRS 15.</p>`,
      items: [
        'Identify the contract with the customer',
        'Identify the performance obligations',
        'Determine the transaction price',
        'Allocate the transaction price to the obligations',
        'Recognize revenue when each obligation is satisfied',
      ],
      explain: `<p>Find the deal → list the promises → price the deal → share the price → count revenue as each promise is kept. A handy memory trick: <strong>C-O-P-A-R</strong> (Contract, Obligations, Price, Allocate, Recognize).</p>`,
    },
    {
      type: 'table',
      caption: 'Sunshine School “Summer Party Pack” — sharing the $810 price',
      headers: ['Promise', 'Standalone selling price', 'Share of total', 'Allocated price', 'When revenue is recognized'],
      rows: [
        ['300 bottles of lemonade', '$600', '600 ÷ 900 = 66.7%', '<strong>$540</strong>', 'Point in time: on delivery'],
        ['3 monthly workshops', '$300', '300 ÷ 900 = 33.3%', '<strong>$270</strong>', 'Over time: $90 per workshop'],
        ['<strong>Total</strong>', '<strong>$900</strong>', '100%', '<strong>$810</strong>', ''],
      ],
    },

    {
      type: 'exercise',
      kind: 'fill',
      title: 'Allocate a bundle price',
      instructions: `<p>Happy Cafe buys a “Cafe Starter Bundle” for <strong>$1,080</strong>: 400 bottles (standalone price $800) plus 4 monthly menu-tasting sessions (standalone price $400 for all four).</p>`,
      html: `<p>Total standalone selling prices = USD {{}}.</p>
<p>Bottles get 800 ÷ 1,200 of the price: USD {{}}. Tasting sessions get the rest: USD {{}}.</p>
<p>Revenue for the sessions is recognized over time. Revenue per monthly session: USD {{}}.</p>`,
      blanks: [
        { answer: 1200 },
        { answer: 720, hint: '1,080 × 800 ÷ 1,200' },
        { answer: 360, hint: '1,080 − 720' },
        { answer: 90, hint: '360 ÷ 4' },
      ],
      explain: `<p>The bundle is a 10% discount on $1,200 of standalone prices, so each promise shares the discount fairly: bottles $720 (recognized on delivery), sessions $360, earned $90 after each monthly session.</p>`,
    },
    {
      type: 'text',
      heading: 'Deferred revenue: a promise we still owe',
      html: `<p>If a customer is billed (or pays) <em>before</em> we deliver, the amount sits in a <strong>deferred revenue</strong> account — Oracle usually calls it <strong>unearned revenue</strong>. It is a <strong>liability</strong>, because we owe the customer the goods or services (or their money back). As we deliver, we move amounts from unearned revenue into real revenue.</p>
<p>The opposite can happen too: we deliver first and bill later. Then Oracle uses an <strong>unbilled receivable</strong> account until the invoice goes out.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Receivables: rules that schedule revenue',
      html: `<ul>
<li><strong>Invoicing rules</strong> decide when the receivable is recorded for invoices that span several periods: <strong>In Advance</strong> (bill at the start — revenue waits in unearned revenue) or <strong>In Arrears</strong> (bill at the end — revenue builds up in unbilled receivables).</li>
<li><strong>Revenue scheduling rules</strong> decide how many accounting periods the revenue is spread over and what percentage goes in each, for example 12 equal months.</li>
<li>The <strong>Recognize Revenue</strong> process creates the revenue distributions for invoices and credit memos that use these rules, and produces a Revenue Recognition Execution report showing anything that failed. If a period is Closed or Close Pending, it puts that slice in the next open period.</li>
<li><strong>Deferred revenue scheduling rules</strong> put everything in unearned revenue first. Revenue is then earned later — when a <strong>revenue contingency</strong> is removed or when someone schedules it manually.</li>
<li><strong>Event-based revenue management</strong> uses your <strong>revenue policy</strong> and <strong>contingencies</strong> to decide automatically whether to recognize now or defer. Predefined contingencies include Explicit Acceptance (removed by customer acceptance), Delivery (removed by proof of delivery), Doubtful Collectibility (removed when a receipt is applied) and Cancellation (removed when it expires).</li>
<li>All of this is handled in the Receivables <strong>Revenue Management work area</strong>, where you can also schedule or unschedule revenue, add or expire contingencies, and transfer sales credits.</li>
</ul>`,
    },
    {
      type: 'example',
      title: 'Sunshine School’s Lemonade Club, billed in advance',
      html: `<p>Sunshine School signs up for the <strong>Lemonade Club</strong>: one big delivery every month for 12 months, starting January, for <strong>$1,200</strong>, billed up front. (In our story, the school is tax-exempt.)</p>`,
      steps: [
        'Omar creates the invoice with invoicing rule <strong>In Advance</strong> and a <strong>12-month</strong> revenue scheduling rule starting 1-Jan-26.',
        'When the invoice is completed and Recognize Revenue runs, Oracle debits Accounts Receivable for $1,200 and credits Unearned Revenue for $1,200.',
        'Oracle also builds a schedule: $100 of revenue in each period from <code>Jan-26</code> to <code>Dec-26</code>.',
        'Each month, accounting moves $100 from Unearned Revenue to <code>4110 Lemonade Sales Revenue</code>.',
        'If the school pays in January, the cash clears the receivable — but revenue still arrives $100 a month.',
      ],
      result: `<p>At the end of March, Sunny has earned $300 of revenue and still owes the school $900 of deliveries (shown as unearned revenue). The financial statements tell the true story.</p>`,
    },
    {
      type: 'journal',
      title: 'January: invoice billed in advance ($1,200)',
      lines: [
        { account: '1210 Accounts Receivable', debit: 1200, credit: 0 },
        { account: 'Unearned Revenue (deferred revenue liability)', debit: 0, credit: 1200 },
      ],
      note: `<p>Our simple Sunny COA doesn’t list an unearned revenue account number; Jordan would add one as a liability account and point AutoAccounting to it.</p>`,
    },
    {
      type: 'journal',
      title: 'Each month (Jan-26 to Dec-26): earn one month of revenue',
      lines: [
        { account: 'Unearned Revenue (deferred revenue liability)', debit: 100, credit: 0 },
        { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 100 },
      ],
      note: `<p>After 12 months, unearned revenue is back to zero and all $1,200 has been recognized as revenue.</p>`,
    },

    {
      type: 'exercise',
      kind: 'journal',
      title: 'Bill in advance: City Park Kiosk’s 6-month plan',
      instructions: `<p>City Park Kiosk signs up for 6 months of weekly deliveries for <strong>$600</strong>, invoiced in advance on 1 March with an In Advance invoicing rule and a 6-month revenue scheduling rule. (Tax-exempt in our story.) Build the accounting for the invoice <strong>before</strong> any revenue is recognized.</p>`,
      accounts: ['1210 Accounts Receivable', 'Unearned Revenue (deferred revenue liability)', '4110 Lemonade Sales Revenue', '1110 Cash – Big River Bank', '2210 Sales Tax Payable'],
      answer: [
        { account: '1210 Accounts Receivable', debit: 600, credit: 0 },
        { account: 'Unearned Revenue (deferred revenue liability)', debit: 0, credit: 600 },
      ],
      explain: `<p>The kiosk owes $600 (debit receivable), but nothing has been delivered yet, so the credit goes to <strong>unearned revenue</strong>, a liability. Each month Oracle moves $100 from unearned revenue to 4110 revenue. Crediting revenue straight away would overstate March profit by $500.</p>`,
    },
    {
      type: 'text',
      heading: 'Oracle Revenue Management: for complex contracts',
      html: `<p>Receivables revenue rules work well for simple schedules. But some companies sell <strong>bundles</strong> (a product plus installation plus support), change contracts midway, or bill from several systems. For them Oracle offers a separate product, <strong>Oracle Revenue Management</strong>, built specifically for ASC 606 and IFRS 15.</p>
<p>In simple terms, Revenue Management:</p>
<ul>
<li>Collects sales data from source systems (order management, subscriptions, projects, Receivables billing, even outside systems).</li>
<li>Uses rules to <strong>identify customer contracts</strong> and <strong>performance obligations</strong> automatically (processes such as <em>Validate Customer Contract Source Data</em> and <em>Identify Customer Contracts</em>).</li>
<li>Keeps <strong>standalone selling prices</strong>, calculating observed prices from past sales so you can approve them.</li>
<li><strong>Allocates</strong> the contract price across the obligations, then <strong>recognizes</strong> revenue when <strong>satisfaction events</strong> arrive — at a point in time or over time.</li>
<li>Uses special accounts such as <strong>contract asset</strong>, <strong>contract liability</strong> and <strong>contract clearing</strong>, with accounting created through Subledger Accounting.</li>
</ul>`,
    },
    {
      type: 'table',
      caption: 'Receivables revenue rules vs. Oracle Revenue Management',
      headers: ['Topic', 'Revenue in Receivables', 'Oracle Revenue Management'],
      rows: [
        ['Best for', 'Simple invoices, subscriptions with even schedules, acceptance clauses', 'Bundles, multi-system contracts, complex ASC 606 / IFRS 15 needs'],
        ['Unit of work', 'The invoice line', 'The customer contract and its performance obligations'],
        ['Price allocation', 'Not automatic across lines', 'Automatic using standalone selling prices'],
        ['Key tools', 'Invoicing rules, revenue scheduling rules, contingencies, Recognize Revenue process', 'Contract identification rules, SSP, satisfaction events, contract asset/liability'],
        ['Where', 'Receivables Revenue Management work area', 'Revenue Management work area of the Revenue Management product'],
      ],
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li><strong>Revenue mistakes are audit findings.</strong> Recognizing too early can overstate profit. That’s why revenue setups are usually designed by accountants with auditors’ input, not changed casually.</li>
<li><strong>Check the Revenue Recognition Execution report</strong> after each run. Unprocessed lines mean revenue missing from the month.</li>
<li><strong>Run Recognize Revenue before month-end accounting</strong>, so revenue distributions exist when you create accounting (you will see this in the closing lesson).</li>
<li><strong>Ask “what did we promise?”</strong> Whenever a deal includes extras — free installation, training, a return right — ask whether revenue timing changes.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Revenue recognition', def: 'Recording revenue in the period when the promised goods or services are delivered to the customer.' },
        { term: 'Performance obligation', def: 'A distinct promise in a contract to deliver a good or service to the customer.' },
        { term: 'Standalone selling price', def: 'The price at which a good or service would be sold on its own; used to share a deal’s price fairly.' },
        { term: 'Deferred (unearned) revenue', def: 'Money billed or received before the work is done. It is a liability until earned.' },
        { term: 'Revenue scheduling rule', def: 'An Oracle Receivables rule that spreads revenue over a number of accounting periods.' },
        { term: 'Invoicing rule', def: 'An Oracle Receivables rule (In Advance or In Arrears) that decides when the receivable is recorded for multi-period invoices.' },
        { term: 'Revenue contingency', def: 'A condition, such as customer acceptance, that delays revenue until a removal event happens.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Sunshine School pays $1,200 in January for 12 monthly deliveries. How much revenue does Sunny recognize in January?',
          options: ['$0', '$100', '$600', '$1,200'],
          answer: 1,
          explain: 'Only one month of the promise has been delivered, so $100 is earned. The remaining $1,100 stays in unearned revenue.',
        },
        {
          q: 'What kind of account is unearned (deferred) revenue?',
          options: ['An asset', 'A liability', 'An expense', 'Equity'],
          answer: 1,
          explain: 'It represents goods or services we still owe the customer (or money to give back), so it is a liability.',
        },
        {
          q: 'Which step of the five-step model splits a bundle’s price between its promises?',
          options: [
            'Step 1: Identify the contract',
            'Step 2: Identify performance obligations',
            'Step 4: Allocate the transaction price',
            'Step 5: Recognize revenue',
          ],
          answer: 2,
          explain: 'Step 4 allocates the transaction price to each performance obligation, usually based on standalone selling prices.',
        },
        {
          q: 'Which Oracle Receivables process creates revenue distributions for invoices that use invoicing and revenue scheduling rules?',
          options: ['Import AutoInvoice', 'Recognize Revenue', 'Create Customer Statements', 'Process Receipts Through Lockbox'],
          answer: 1,
          explain: 'The Recognize Revenue process generates the revenue distribution records for transactions with rules, and reports any lines it could not process.',
        },
        {
          q: 'A software company sells a license, installation and three years of support as one bundle from several systems. What fits best?',
          options: [
            'Only a simple invoice in Receivables',
            'Oracle Revenue Management, which identifies contracts and obligations and allocates the price',
            'A miscellaneous receipt',
            'A debit memo',
          ],
          answer: 1,
          explain: 'Complex bundles across systems are what Oracle Revenue Management is designed for: contracts, performance obligations, standalone selling prices and satisfaction events.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Overview of Revenue Management', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fafrm/overview-of-revenue-management.html' },
    { title: 'Five Key Steps to Revenue Recognition', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fafrm/five-key-steps-to-revenue-recognition.html' },
    { title: 'How Revenue Recognition Is Processed (Revenue Management)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fafrm/how-revenue-recognition-is-processed.html' },
    { title: 'How You Recognize Revenue on Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/how-you-recognize-revenue-on-transactions.html' },
    { title: 'Examples of Deferred and Non-Deferred Revenue Scheduling Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/examples-of-deferred-and-non-deferred-revenue-scheduling-rules.html' },
    { title: 'Overview of Oracle Receivables (Revenue Management work area)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/overview-of-oracle-receivables.html' },
    { title: 'Revenue from Contracts with Customers (IFRS 15)', publisher: 'IFRS Foundation', url: 'https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/' },
  ],
};
