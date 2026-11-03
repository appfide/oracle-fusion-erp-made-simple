export default {
  slug: 'what-is-erp',
  title: 'What Is an ERP? The Big Shared Notebook',
  minutes: 12,
  summary:
    'An ERP is one big shared system where every team in a company writes down what happens, so everyone sees the same, up-to-date truth. Meet Sunny Lemonade Co., the company we will follow through this whole guide.',
  objectives: [
    'Explain in your own words what an ERP system is',
    'Describe the problem an ERP solves when a company grows',
    'Name the main jobs (modules) inside an ERP',
    'Meet Sunny Lemonade Co. and the people we will follow in every lesson',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Imagine a lemonade stand…',
      html: `<p>You open a lemonade stand in front of your house. On day one you keep everything in your head: you bought lemons, you sold 10 cups, you have some coins in a jar.</p>
<p>A month later your stand is a hit. Your brother buys the lemons, your best friend sells the cups, your mom lends you money for a new table, and your neighbor pays you next week instead of today. Now everyone keeps their <strong>own little notebook</strong>. Your brother writes "bought lemons", your friend writes "sold 40 cups", and nobody's notebook matches anybody else's. Who still owes you money? How many lemons are left? Did anyone pay for the sugar?</p>
<p>Now imagine you replace all those little notebooks with <strong>one big shared notebook</strong> on the kitchen table. Everyone writes in the same book, using the same rules. When your brother writes "bought 100 lemons", your friend instantly sees there are lemons to sell, and you instantly see how much money left the jar. <span class="hl">That big shared notebook is what an ERP is.</span></p>`,
    },
    {
      type: 'text',
      heading: 'So what does ERP actually mean?',
      html: `<p><strong>ERP</strong> stands for <strong>Enterprise Resource Planning</strong>. Let's break those three words apart:</p>
<ul>
<li><strong>Enterprise</strong> – a company or organization (big or small).</li>
<li><strong>Resource</strong> – the things a company has and uses: money, people, products, machines, time.</li>
<li><strong>Planning</strong> – keeping track of those things and deciding what to do with them.</li>
</ul>
<p>Put together: an ERP is <strong>software that a whole company uses to keep track of its money, purchases, sales, people and things, all in one place.</strong> Oracle describes ERP as a type of software that organizations use to manage day-to-day business activities such as accounting, procurement (buying), project management, risk management and supply chain operations.</p>
<p>The magic word is <strong>one</strong>: one system, one set of data, one version of the truth. When the buying team records a purchase, the accounting team does not have to type it again. The information flows on by itself.</p>`,
    },
    {
      type: 'slides',
      title: 'Before ERP vs. after ERP',
      slides: [
        {
          icon: '📚',
          title: 'Before: lots of separate notebooks',
          html: `<p>Each team uses its own spreadsheet or small program. Buying has one, selling has another, accounting has a third.</p><p>People copy numbers from one place to another by hand. Copying is slow and mistakes sneak in.</p>`,
        },
        {
          icon: '😵',
          title: 'The problems pile up',
          html: `<ul><li>Two teams have <strong>different numbers</strong> for the same thing.</li><li>Nobody knows the <strong>real</strong> cash balance today.</li><li>Closing the books at month-end takes weeks.</li><li>A bill gets paid <strong>twice</strong> — or not at all.</li></ul>`,
        },
        {
          icon: '📖',
          title: 'After: one shared notebook',
          html: `<p>Everyone works in the same system. A purchase entered once is seen by buying, receiving, payables and accounting at the same moment.</p>`,
        },
        {
          icon: '🔒',
          title: 'With rules and locks',
          html: `<p>The ERP also enforces <strong>rules</strong>: who may approve, which accounts may be used, what needs a second check. Like a notebook where only the treasurer may write in the "money out" page.</p>`,
        },
        {
          icon: '📊',
          title: 'And instant answers',
          html: `<p>Because all the data lives together, managers can ask "How much do we owe suppliers today?" and get the answer in seconds, not days.</p>`,
        },
      ],
    },
    {
      type: 'flow',
      title: 'How one action flows through an ERP',
      steps: [
        { icon: '🛒', label: 'Buy', detail: 'Leo orders 1,000 lemons from Lemon Grove Farms.' },
        { icon: '📦', label: 'Receive', detail: 'Noah in the kitchen confirms the lemons arrived.' },
        { icon: '🧾', label: 'Bill arrives', detail: 'Ava records the supplier’s invoice for $500.' },
        { icon: '💸', label: 'Pay', detail: 'Ava pays the supplier from the bank account.' },
        { icon: '📒', label: 'Books updated', detail: 'Priya sees the cost and the cash change in the ledger automatically.' },
      ],
      note: `<p>Each person did <strong>one</strong> step, and the next person could see it straight away. Nobody retyped anything.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Follow the lemons through the ERP',
      instructions: `<p>Put the steps of Sunny's lemon purchase in the order they happen.</p>`,
      items: [
        'Leo orders 1,000 lemons from Lemon Grove Farms',
        'Noah confirms the lemons arrived',
        'Ava records the supplier’s $500 invoice',
        'Ava pays the supplier from the bank account',
        'Priya sees the cost and the cash change in the ledger',
      ],
      explain: `<p>Order → receive → bill → pay → books updated. Each person does one step and the next person sees it straight away, because everyone works in the same shared system.</p>`,
    },
    {
      type: 'text',
      heading: 'The rooms of the ERP house',
      html: `<p>Think of an ERP as a big house with many rooms. Each room is called a <strong>module</strong> (or an <em>application</em>), and each one does a special job. All the rooms share the same foundation — the same data.</p>`,
    },
    {
      type: 'table',
      caption: 'Common ERP modules and what they do',
      headers: ['Module (room)', 'What it does, in kid words', 'Who mostly uses it'],
      rows: [
        ['<strong>General Ledger</strong>', 'The master book where every money event ends up.', 'Accountants (Priya)'],
        ['<strong>Accounts Payable</strong>', 'Keeps track of bills we must pay, and pays them.', 'Payables team (Ava)'],
        ['<strong>Accounts Receivable</strong>', 'Keeps track of money customers owe us, and collects it.', 'Receivables team (Omar)'],
        ['<strong>Cash Management</strong>', 'Watches the bank accounts and checks they match our books.', 'Treasury (Mia)'],
        ['<strong>Fixed Assets</strong>', 'Tracks big things we keep for years, like machines.', 'Asset accountants'],
        ['<strong>Expenses</strong>', 'Pays employees back for things they bought for work.', 'Every employee'],
        ['<strong>Procurement</strong>', 'Orders goods and services from suppliers.', 'Buyers (Leo)'],
        ['<strong>Reporting</strong>', 'Answers questions with reports and dashboards.', 'Managers (Sam)'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Which room does the job?',
      instructions: `<p>Match each job to the ERP module (room) that handles it.</p>`,
      pairs: [
        { left: 'Keep track of bills Sunny must pay', right: 'Accounts Payable' },
        { left: 'Collect money that Happy Cafe owes', right: 'Accounts Receivable' },
        { left: 'Keep the master book of every money event', right: 'General Ledger' },
        { left: 'Check the bank account matches the books', right: 'Cash Management' },
        { left: 'Order lemons from suppliers', right: 'Procurement' },
        { left: 'Pay employees back for work purchases', right: 'Expenses' },
      ],
      explain: `<p>Payables is money <strong>we owe</strong>; Receivables is money <strong>owed to us</strong>. The General Ledger is the master book where everything ends up. Cash Management watches the bank, Procurement buys, and Expenses pays employees back.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle’s world',
      html: `<p>Oracle sells a cloud ERP called <strong>Oracle Fusion Cloud ERP</strong>. It contains all of the rooms above (and more), such as Financials, Procurement, Project Management, Risk Management and Enterprise Performance Management. You will meet it properly in the next lesson.</p>
<p>In this guide we focus mostly on the <strong>Financials</strong> rooms, starting with <strong>Accounts Payable</strong> right after the basics.</p>`,
    },
    {
      type: 'example',
      title: 'Meet Sunny Lemonade Co. — our story for the whole guide',
      html: `<p>Our lemonade stand grew up! It is now <strong>Sunny Lemonade Co.</strong>, with a company in the United States (<em>Sunny Lemonade US Inc.</em>) and one in the United Kingdom (<em>Sunny Lemonade UK Ltd</em>). Together they form the <strong>Sunny Group</strong>.</p>
<p>Here are the people you'll meet in almost every lesson:</p>
<ul>
<li><strong>Sam</strong> – the founder and Chief Financial Officer (CFO). Wants to know how much money the company has.</li>
<li><strong>Leo</strong> – the buyer. Orders lemons, sugar and cups.</li>
<li><strong>Noah</strong> – the kitchen manager. Receives deliveries.</li>
<li><strong>Ava</strong> – the payables specialist. Records supplier bills and pays them.</li>
<li><strong>Omar</strong> – the receivables specialist. Bills customers and collects money.</li>
<li><strong>Priya</strong> – the general ledger accountant. Keeps the master book tidy and closes each month.</li>
<li><strong>Mia</strong> – the treasury/cash manager. Watches the bank account.</li>
<li><strong>Jordan</strong> – the implementation consultant who set up Oracle Fusion for Sunny.</li>
</ul>`,
      steps: [
        'Before the ERP, Leo ordered lemons by text message, Ava kept bills in a shoebox and Priya rebuilt everything in spreadsheets each month.',
        'Twice, a supplier was paid twice for the same lemons. Once, the electricity bill was forgotten and the lights went out. 😬',
        'Sam decided Sunny needed one shared system. Jordan helped them set up <strong>Oracle Fusion Cloud ERP</strong>.',
        'Now Leo’s order, Noah’s delivery check, Ava’s invoice and Mia’s payment all live in one place — and Priya’s ledger updates itself.',
      ],
      result: `<p>Result: fewer mistakes, faster month-end, and Sam can see the numbers any time. That is the whole point of an ERP.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>When people at work say “the ERP”, “the system”, “Fusion” or “Oracle”, they usually mean the same thing: the company’s shared system of record. A <strong>system of record</strong> is the place everyone agrees holds the official, true numbers.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'ERP', def: 'Enterprise Resource Planning: one shared software system a company uses to manage money, buying, selling, people and things.' },
        { term: 'Module', def: 'One part of an ERP that does a special job, like Accounts Payable or General Ledger.' },
        { term: 'System of record', def: 'The official place where the true, agreed numbers are kept.' },
        { term: 'Single source of truth', def: 'The idea that everyone looks at the same data instead of their own copies.' },
        { term: 'Supplier', def: 'A person or company we buy things from, like Lemon Grove Farms.' },
        { term: 'Customer', def: 'A person or company that buys things from us, like Happy Cafe.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'What is the BEST simple description of an ERP?',
          options: [
            'A calculator for adding numbers',
            'One big shared system where all teams record and see the same business information',
            'A website for selling lemonade online',
            'A spreadsheet that each team keeps for itself',
          ],
          answer: 1,
          explain: 'An ERP is one shared system of record. Separate spreadsheets per team are exactly the problem an ERP solves.',
        },
        {
          q: 'What does the “R” in ERP stand for?',
          options: ['Report', 'Resource', 'Receipt', 'Revenue'],
          answer: 1,
          explain: 'ERP = Enterprise Resource Planning. Resources are things like money, people, products and machines.',
        },
        {
          q: 'Leo orders lemons in the ERP. Why doesn’t Ava need to type the order again when the bill arrives?',
          options: [
            'Because Ava never looks at orders',
            'Because the data is shared, so the order is already in the system for Ava to match',
            'Because suppliers type it for Ava',
            'Because lemons are free',
          ],
          answer: 1,
          explain: 'Data entered once is shared by every module. Ava can match the invoice to Leo’s order without retyping it.',
        },
        {
          q: 'Which ERP module keeps track of the bills a company must pay?',
          options: ['Accounts Receivable', 'Fixed Assets', 'Accounts Payable', 'Cash Management'],
          answer: 2,
          explain: 'Accounts Payable (AP) is all about money WE owe and paying it. Accounts Receivable is money others owe US.',
        },
      ],
    },
  ],
  sources: [
    { title: 'What Is ERP?', publisher: 'Oracle', url: 'https://www.oracle.com/erp/what-is-erp/' },
    { title: 'Oracle Fusion Cloud ERP', publisher: 'Oracle', url: 'https://www.oracle.com/erp/' },
    { title: 'Oracle Fusion Cloud Financials documentation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/index.html' },
  ],
};
