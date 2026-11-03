export default {
  slug: 'intercompany',
  title: 'Intercompany: When Sister Companies Trade',
  minutes: 18,
  summary:
    'When Sunny Lemonade US and Sunny Lemonade UK trade with each other, both sets of books must agree. Learn intercompany transactions in Oracle Fusion (organizations, transaction types, batches, statuses, invoicing), intercompany balancing with the balancing and intercompany segments, and intercompany reconciliation.',
  objectives: [
    'Explain what an intercompany transaction is and why both sides must match',
    'Describe how the Oracle Fusion Intercompany module processes a transaction from provider to receiver',
    'Explain intercompany balancing rules and the role of the balancing segment and intercompany segment',
    'Record both sides of an intercompany charge in two ledgers',
    'Describe how intercompany reconciliation finds differences',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Borrowing from your sister',
      html: `<p>You and your sibling each have your own piggy bank. One day your sibling needs 10 crayons for a project, and you give them 10 of yours. You both agree they owe you $1 for them.</p>
<p>A careful family writes it down <strong>twice</strong>: in your notebook, “My sibling owes me $1”; in their notebook, “I owe my sibling $1”. If one notebook says $1 and the other says $2 — or one forgot to write anything — there will be an argument at dinner.</p>
<p>Companies in the same group do this all the time. Each company keeps its own books, so every trade between them must be written down on <strong>both</strong> sides, with the <strong>same</strong> amount. That’s <strong>intercompany</strong> accounting.</p>`,
    },
    {
      type: 'text',
      heading: 'What “intercompany” means',
      html: `<p>An <strong>intercompany transaction</strong> is a transaction between two legal entities (or parts of the business) that belong to the same group. Sunny Group has two legal entities with separate ledgers: <strong>Sunny Lemonade US Inc.</strong> (Company 101, Sunny US Ledger in USD) and <strong>Sunny Lemonade UK Ltd</strong> (Company 201, Sunny UK Ledger in GBP). Examples of things they might do for each other:</p>
<ul>
<li>The US company buys lemons in bulk and sends some to the UK.</li>
<li>Sam’s head-office team in the US does accounting work for the UK and charges a fee.</li>
<li>One company lends the other money, or pays a bill on its behalf.</li>
</ul>
<p>Why it matters:</p>
<ul>
<li>Each legal entity must have <strong>correct, complete books</strong> for its own tax and legal reporting.</li>
<li>When the group adds the two companies together (<strong>consolidation</strong>), the intercompany amounts must <strong>cancel out</strong> — the group didn’t earn money by selling to itself. If the two sides don’t match, consolidation shows a difference that someone must explain.</li>
</ul>`,
    },
    {
      type: 'slides',
      title: 'The Intercompany module in Oracle Fusion',
      slides: [
        {
          icon: '🏢',
          title: 'Intercompany organizations',
          html: `<p>Each party is set up as an <strong>intercompany organization</strong> assigned to a legal entity. An organization can act as a <strong>provider</strong> (the one giving goods or services) or a <strong>receiver</strong>. If invoices are needed, a Receivables BU and a Payables BU are assigned to the organization. Users can only start transactions for organizations they have access to.</p>`,
        },
        {
          icon: '🏷️',
          title: 'Transaction types',
          html: `<p>Every intercompany transaction has an <strong>intercompany transaction type</strong>, set up with the <kbd>Manage Intercompany Transaction Types</kbd> task. The type decides whether the transaction goes <strong>straight to General Ledger</strong> as journals or needs <strong>invoicing</strong> in Receivables and Payables, and whether it needs <strong>manual approval</strong> by the receiver.</p>`,
        },
        {
          icon: '⚙️',
          title: 'System options',
          html: `<p>Enterprise-wide <strong>intercompany system options</strong> include: batch numbering (system or manual), an optional <strong>intercompany currency</strong> that all transactions must use, a <strong>minimum transaction amount</strong>, the conversion rate type for foreign currency, whether receivers may <strong>reject</strong> transactions, and a separate <strong>intercompany calendar</strong> so periods can be closed by transaction type.</p>`,
        },
        {
          icon: '📦',
          title: 'Batches and transactions',
          html: `<p>Transactions are entered in <strong>batches</strong> (one batch can hold several transactions). They can be typed in, imported from a spreadsheet or file, or created by other processes. The provider sees them as <strong>outbound</strong> transactions; the receiver sees them as <strong>inbound</strong>.</p>`,
        },
        {
          icon: '🧭',
          title: 'Bigger flows',
          html: `<p>For more complex cases Oracle also offers <strong>multitier intercompany</strong> (intercompany agreements, transfer authorizations and routes through clearing organizations) and automatic <strong>intercompany cross-charges</strong> of Payables invoices — for example when one company pays a supplier invoice that partly belongs to another.</p>`,
        },
      ],
    },
    {
      type: 'flow',
      title: 'Life of an intercompany transaction',
      steps: [
        { icon: '📝', label: 'New', detail: 'The provider (Sunny US) creates and saves the batch.' },
        { icon: '📤', label: 'Sent', detail: 'The provider submits; the transaction goes to the receiver.' },
        { icon: '📥', label: 'Received', detail: 'The receiver (Sunny UK) reviews it and approves or rejects (if rejection is allowed).' },
        { icon: '✅', label: 'Approved', detail: 'Approved transactions can be transferred.' },
        { icon: '📒', label: 'Transferred', detail: 'Journals go to the provider and receiver ledgers — or invoices are created in Receivables and Payables.' },
        { icon: '🏁', label: 'Complete', detail: 'Both sides are booked. The batch completes when all its transactions are done.' },
      ],
      note: `<p>Oracle’s status table also has <strong>Rejected</strong>, <strong>Rejection Reviewed</strong> and <strong>Error</strong> statuses, and intercompany periods can’t be closed while transactions are still in the middle of processing.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Practice: put the intercompany steps in order',
      instructions: `<p>Sunny US charges Sunny UK for lemons. Put the steps in order.</p>`,
      items: [
        'Priya creates the intercompany batch in Sunny US (status New)',
        'Priya submits it, and it is sent to Sunny UK',
        'The UK accountant reviews the inbound transaction',
        'The UK accountant approves it',
        'Journals are transferred to both ledgers (or invoices are created)',
        'The transaction is Complete',
      ],
      explain: `<p>The provider starts the transaction, the receiver reviews and approves it, and only approved transactions are transferred. Because both sides are created from the <em>same</em> transaction, the amounts automatically agree — the big advantage over each company typing its own journal.</p>`,
    },
    {
      type: 'text',
      heading: 'Balancing segment and intercompany segment',
      html: `<p>Recall the Sunny chart of accounts: <code>Company - Cost Center - Account - Product - Intercompany</code>. Two segments do the intercompany work:</p>
<ul>
<li>The <strong>Company</strong> segment is Sunny’s <strong>primary balancing segment</strong>. Every journal must balance (debits = credits) for <em>each</em> company value. Company values belong to legal entities: 101 to the US entity, 201 to the UK entity.</li>
<li>The <strong>Intercompany</strong> segment records the <strong>trading partner</strong>. On normal transactions it is <code>000</code>. On intercompany ones it shows the other company: <code>201</code> on the US books means “this is with the UK”, and <code>101</code> on the UK books means “this is with the US”. This makes it easy to find, report and eliminate intercompany balances.</li>
</ul>
<p>What if a journal is out of balance by company — for example, a journal in one ledger that debits company A and credits company B? Oracle’s <strong>intercompany balancing</strong> feature adds the missing lines automatically, using <strong>intercompany receivables</strong> and <strong>intercompany payables</strong> accounts built from <strong>intercompany balancing rules</strong>. Rules can be defined at four levels, checked in this order: primary balancing segment, legal entity, ledger, and chart of accounts. You can even have different rules for different journal sources and categories. Oracle recommends the receivables account be an asset and the payables account a liability. For journals with many companies on both sides, <strong>clearing company</strong> options decide how lines are paired.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Sunny’s two ledgers',
      html: `<p>Because Sunny US and Sunny UK keep <em>separate ledgers</em> in different currencies, a single journal can’t touch both. That’s why Sunny uses the Intercompany module (or two coordinated entries) for trades between them. Intercompany balancing within one journal matters most when one ledger holds several companies — for example if Sunny later added a second US company to the US ledger. The same balancing rules are also used to build the receivables and payables accounts for Intercompany module transactions.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny US sends lemons to Sunny UK',
      html: `<p>A frost hits the UK lemon supplier, so Sunny US ships <strong>1,000 lemons</strong> (which cost the US $500) to the UK kitchen at cost. Sam’s policy is to charge intercompany trades in the receiver’s currency. At the agreed rate of 1 GBP = 1.25 USD, the charge is <strong>£400</strong>.</p>`,
      steps: [
        'Priya creates an intercompany batch: provider organization Sunny US, receiver organization Sunny UK, transaction type “Intercompany Goods Recharge” (set up to go straight to GL, with receiver approval), amount £400.',
        'Priya enters the provider distribution: <code>101-200-5110-010-201</code> (credit — the US lemon cost moves out). Oracle derives the intercompany receivables account from the balancing rules.',
        'The UK accountant receives the transaction, enters the receiver distribution <code>201-200-5110-010-101</code> (debit — UK lemon cost) and approves.',
        'The transfer creates journals in both ledgers. In the US ledger the £400 is converted to $500 at 1.25.',
        'Both transactions show status Complete.',
      ],
      result: `<p>The US books show $500 owed by the UK; the UK books show £400 owed to the US. Same transaction, same agreed value — just in each ledger’s own currency.</p>`,
    },
    {
      type: 'journal',
      title: 'Sunny US Ledger (USD) – provider side',
      lines: [
        { account: '1210 Accounts Receivable – intercompany with UK (101-200-1210-000-201)', debit: 500, credit: 0 },
        { account: '5110 Lemons Cost – recharged to UK (101-200-5110-010-201)', debit: 0, credit: 500 },
      ],
      note: `<p>Sunny keeps its chart simple and uses its normal receivables and payables accounts with the <strong>Intercompany segment</strong> set to the partner. Many companies create dedicated intercompany receivables and payables accounts instead; the balancing rules point to whichever accounts you choose.</p>`,
    },
    {
      type: 'journal',
      title: 'Sunny UK Ledger (GBP) – receiver side',
      lines: [
        { account: '5110 Lemons Cost (201-200-5110-010-101)', debit: 400, credit: 0 },
        { account: '2110 Accounts Payable – intercompany with US (201-200-2110-000-101)', debit: 0, credit: 400 },
      ],
      note: `<p>Amounts here are in GBP. When the group consolidates, the US receivable ($500) and the UK payable (£400, translated to USD) cancel out — and the lemon cost ends up only in the company that used the lemons.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Practice: the UK pays a bill for the US',
      instructions: `<p>Sunny UK pays a <strong>£80</strong> travel bill for Sam during a London visit — a cost of the <strong>US</strong> company. Through an intercompany transaction, record the <strong>UK ledger</strong> side (GBP): the UK charges the cost to the US and records that the US now owes the UK. (Ignore the original cash payment; it has already been booked to a temporary travel cost in the UK, which this entry moves out.)</p>`,
      accounts: [
        '1210 Accounts Receivable',
        '2110 Accounts Payable – Trade',
        '6130 Travel and Meals',
        '4110 Lemonade Sales Revenue',
        '1110 Cash – Big River Bank',
      ],
      answer: [
        { account: '1210 Accounts Receivable', debit: 80, credit: 0 },
        { account: '6130 Travel and Meals', debit: 0, credit: 80 },
      ],
      explain: `<p>This time the UK is the <strong>provider</strong>: it records a receivable from the US (debit 1210 with intercompany segment 101) and removes the cost that isn’t really its own (credit 6130). On the US side, the mirror entry debits 6130 Travel and Meals and credits 2110 with intercompany segment 201. It isn’t revenue for the UK — it’s just passing on a cost.</p>`,
    },
    {
      type: 'lab',
      tool: 'fx',
      title: 'Lab: the intercompany receivable at month-end',
      intro: `<p>In the US ledger, the £400 intercompany receivable was booked at 1.25 USD per GBP ($500). At month-end the rate is 1.30. Something Sunny US <strong>owns</strong> (a receivable in GBP) is now worth more dollars. See the unrealized gain that revaluation would show, then try a rate of 1.20.</p>`,
      preset: { amount: 400, currency: 'GBP', rate1: 1.25, rate2: 1.3, side: 'own' },
    },
    {
      type: 'text',
      heading: 'Intercompany reconciliation: do both sides agree?',
      html: `<p>Even with good tools, differences happen: a manual journal on one side only, a different exchange rate, a transaction stuck in Error, or a timing difference at month-end. Oracle Fusion provides <strong>intercompany reconciliation reports</strong> to compare intercompany receivables and payables between a pair of provider and receiver legal entities.</p>
<p>The process starts by running <strong>Prepare Intercompany Reconciliation Reporting Information</strong> with parameters such as provider and receiver legal entity and period. The <strong>Reconciliation Period Summary</strong> report then shows receivables and payables balances and the differences. You can drill down to balances by source, to journal lines, and on to the subledger entry or the original Receivables or Payables transaction. Oracle documents the path <kbd>Intercompany</kbd> &gt; <kbd>Reconciliation</kbd>, then <kbd>Actions</kbd> &gt; <kbd>Run</kbd>. Reports can also convert both sides into one common currency for comparison.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: GL only or invoices?',
      instructions: `<p>An intercompany transaction type decides whether a trade goes straight to General Ledger or creates Receivables and Payables invoices. Which fits each case at Sunny?</p>`,
      categories: ['Straight to General Ledger', 'Invoices in Receivables and Payables'],
      items: [
        { text: 'A monthly management-fee allocation that local law doesn’t require to be invoiced', answer: 'Straight to General Ledger' },
        { text: 'A sale of goods where UK VAT rules require a formal invoice', answer: 'Invoices in Receivables and Payables' },
        { text: 'An internal cost recharge that will be settled by netting at year-end', answer: 'Straight to General Ledger' },
        { text: 'A charge the receiver must pay through its normal Payables payment run', answer: 'Invoices in Receivables and Payables' },
      ],
      explain: `<p>GL-only transactions are faster and simpler. Invoicing is used when there must be a legal invoice (often for tax) or when the debt should be settled through normal Receivables and Payables processes. For invoicing, the intercompany organizations need Receivables and Payables business units assigned.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: agree before you book',
      html: `<p>Most intercompany headaches come from one side booking something the other side never agreed to. Good groups set a monthly cut-off date for intercompany charges (the intercompany calendar can enforce it by transaction type), require receiver approval, use the intercompany segment consistently, and run reconciliation <em>before</em> closing — not after the auditors ask. A small minimum transaction amount also stops people from sending $3 charges back and forth.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Intercompany transaction', def: 'A trade between two legal entities or organizations in the same group, recorded on both sides.' },
        { term: 'Provider and receiver', def: 'The organization that gives goods or services (provider) and the one that gets them (receiver).' },
        { term: 'Intercompany transaction type', def: 'A setting that decides whether a transaction goes to the ledger directly or through invoices, and whether it needs approval.' },
        { term: 'Primary balancing segment', def: 'The chart of accounts segment, usually Company, by which every journal must balance.' },
        { term: 'Intercompany segment', def: 'A chart of accounts segment that records the trading partner company on intercompany entries.' },
        { term: 'Intercompany balancing rules', def: 'Rules that tell Oracle which intercompany receivables and payables accounts to use when balancing journals.' },
        { term: 'Intercompany reconciliation', def: 'Comparing intercompany receivables and payables between two entities to find and explain differences.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Why must intercompany amounts match on both sides?',
          options: [
            'Because banks require it',
            'So each entity’s books are right and the amounts cancel out when the group consolidates',
            'Because tax is always zero on intercompany trades',
            'They don’t need to match',
          ],
          answer: 1,
          explain: 'Each legal entity needs correct books, and in consolidation the receivable and payable must eliminate each other. Mismatches create unexplained differences.',
        },
        {
          q: 'On the US books, what does the value 201 in the Intercompany segment mean?',
          options: ['The UK cost center', 'The trading partner is the UK company', 'The account number', 'An error'],
          answer: 1,
          explain: 'The intercompany segment records the partner company. 201 is Sunny Lemonade UK Ltd.',
        },
        {
          q: 'What decides whether an intercompany transaction creates invoices in Receivables and Payables?',
          options: ['The user’s job title', 'The intercompany transaction type', 'The bank account', 'The tax regime'],
          answer: 1,
          explain: 'The transaction type specifies whether transactions go directly to General Ledger or require invoicing, and whether manual approval is needed.',
        },
        {
          q: 'Which process starts intercompany reconciliation reporting?',
          options: [
            'Create Accounting',
            'Prepare Intercompany Reconciliation Reporting Information',
            'Process Expense Reimbursement',
            'Transfer Transactions from Receiving to Costing',
          ],
          answer: 1,
          explain: 'You first run Prepare Intercompany Reconciliation Reporting Information, then review the Reconciliation Period Summary and drill down.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Implementing Enterprise Structures and General Ledger (26D) – Manage Intercompany Organizations', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/manage-intercompany-organizations.html' },
    { title: 'Implementing Enterprise Structures and General Ledger (26D) – Intercompany Transaction Types', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/intercompany-transaction-types.html' },
    { title: 'Implementing Enterprise Structures and General Ledger (26D) – Intercompany System Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/intercompany-system-options.html' },
    { title: 'Implementing Enterprise Structures and General Ledger (26D) – Intercompany Balancing Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/intercompany-balancing-rules.html' },
    { title: 'Implementing Enterprise Structures and General Ledger (26D) – Example of Intercompany Balancing Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/example-of-intercompany-balancing-rules.html' },
    { title: 'Using General Ledger (26D) – Transaction and Batch Status', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/transaction-and-batch-status.html' },
    { title: 'Using General Ledger (26D) – Manage Intercompany Outbound Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/manage-intercompany-outbound-transactions.html' },
    { title: 'Using General Ledger (26D) – Intercompany Reconciliation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/intercompany-reconciliation.html' },
    { title: 'Using General Ledger (26D) – Intercompany Transactions (multitier)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/intercompany-transactions.html' },
  ],
};
