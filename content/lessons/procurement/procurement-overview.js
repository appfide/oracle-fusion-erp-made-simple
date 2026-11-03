export default {
  slug: 'procurement-overview',
  title: 'Procurement for Finance People',
  minutes: 15,
  summary:
    'Procurement is the buying side of the company, and it feeds almost everything Payables and the General Ledger do. Meet the people (requester, buyer, receiver), the applications (Self Service Procurement, Purchasing, Supplier Portal, Sourcing) and the business unit roles on a purchase order.',
  objectives: [
    'Explain why finance teams need to understand procurement',
    'Describe the jobs of the requester, approver, buyer, receiver and supplier',
    'Name the main Oracle Fusion Procurement applications and what each one is for',
    'Explain the procurement BU, requisitioning BU, sold-to legal entity and bill-to BU on a purchase order',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Asking for a new football',
      html: `<p>Your school team needs a new football. You can’t just walk into a shop and buy one with school money. First you <strong>ask</strong> the coach (“Can we get a new ball?”). The coach says yes. Then the school office, which knows the best sports shop and the best prices, <strong>orders</strong> the ball. When the box arrives, the caretaker <strong>checks</strong> that it really is a football and not a basketball. Only then does the office <strong>pay</strong> the shop’s bill.</p>
<p>Ask → order → check → pay. That chain is called <strong>procurement</strong> (or “procure-to-pay” when you include paying). The school office is the <strong>buyer</strong>, you are the <strong>requester</strong>, the caretaker is the <strong>receiver</strong>, and the shop is the <strong>supplier</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Why should a finance person care about buying?',
      html: `<p><strong>Procurement</strong> means getting the goods and services a company needs from suppliers, at the right price, with the right approvals. It might sound like “someone else’s job”, but nearly every number Ava and Priya work with starts there:</p>
<ul>
<li><strong>Matching.</strong> In Payables, Ava checks supplier invoices against the <strong>purchase order (PO)</strong> and the <strong>receipt</strong>. No good PO, no clean match — and invoices get stuck on holds.</li>
<li><strong>Accruals.</strong> When goods are received but not yet invoiced, the company already owes money. Receiving creates a <em>received-not-invoiced</em> accrual (account <code>2120</code> at Sunny) — you’ll see it in the Receiving lesson.</li>
<li><strong>Accounting.</strong> The charge account on the PO distribution (for example <code>101-200-5110-010-000</code>) usually becomes the expense account on the invoice. Wrong account on the PO means wrong numbers in the ledger.</li>
<li><strong>Budgets.</strong> If budgetary control is on, requisitions and POs reserve budget before money is spent (see the Budgetary Control lesson).</li>
<li><strong>Controls and audit.</strong> Approvals, segregation of duties (the person who orders is not the person who pays) and a clear audit trail protect the company from fraud and mistakes.</li>
</ul>`,
    },
    {
      type: 'flow',
      title: 'The procure-to-pay chain in Oracle Fusion',
      steps: [
        { icon: '🙋', label: 'Requisition', detail: 'A requester asks for goods or services in Self Service Procurement.' },
        { icon: '👍', label: 'Approve', detail: 'Approval rules route the requisition to the right approvers.' },
        { icon: '📝', label: 'Purchase order', detail: 'A buyer (or automation) turns the requisition into a PO and sends it to the supplier.' },
        { icon: '📦', label: 'Receive', detail: 'A receiver records what arrived; receipt accounting books the accrual.' },
        { icon: '🧾', label: 'Invoice', detail: 'Payables records the supplier invoice and matches it to the PO and receipt.' },
        { icon: '💸', label: 'Pay', detail: 'Payments pays the supplier; the ledger is updated.' },
      ],
      note: `<p>This module covers the first four boxes. The Payables module covers the last two in depth.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Practice: put procure-to-pay in order',
      instructions: `<p>Sunny needs 1,000 lemons. Put the steps in the order they happen.</p>`,
      items: [
        'Noah submits a requisition for 1,000 lemons',
        'The requisition is approved',
        'Leo creates a purchase order and sends it to Lemon Grove Farms',
        'Noah records the receipt when the lemons arrive',
        'Ava enters the supplier invoice and matches it to the PO and receipt',
        'The supplier is paid in a payment run',
      ],
      explain: `<p>Request, approve, order, receive, invoice, pay. Each step creates data that the next person uses — the PO price and quantity, the received quantity — which is exactly what Payables matching checks later.</p>`,
    },
    {
      type: 'table',
      caption: 'The people in procurement',
      headers: ['Role', 'What they do', 'At Sunny Lemonade'],
      rows: [
        ['<strong>Requester</strong> (and preparer)', 'Asks for what is needed by creating a requisition. The preparer types it; the requester is the person it is for (often the same person).', 'Noah asks for sugar and cups for the kitchen.'],
        ['<strong>Approver</strong>', 'Approves or rejects the requisition (and the PO, if needed) according to approval rules.', 'Sam approves big requests.'],
        ['<strong>Buyer</strong> (Oracle often says <em>procurement agent</em>)', 'Chooses the supplier and price, creates and sends purchase orders, manages agreements and changes.', 'Leo'],
        ['<strong>Receiver</strong>', 'Records that goods or services arrived, how many, and in what condition.', 'Noah in the kitchen'],
        ['<strong>Supplier</strong>', 'Receives the PO, acknowledges it, ships goods and sends the invoice — often through the Supplier Portal.', 'Lemon Grove Farms'],
        ['<strong>Payables specialist</strong>', 'Enters and matches invoices, resolves holds, pays.', 'Ava'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: who does what in procurement?',
      instructions: `<p>Match each task to the role that normally does it.</p>`,
      pairs: [
        { left: 'Creates a requisition for 50 bags of sugar', right: 'Requester' },
        { left: 'Approves or rejects the requisition', right: 'Approver' },
        { left: 'Chooses the supplier and sends the purchase order', right: 'Buyer (procurement agent)' },
        { left: 'Records that 50 bags arrived in good condition', right: 'Receiver' },
        { left: 'Acknowledges the PO and sends the invoice', right: 'Supplier' },
        { left: 'Matches the invoice to the PO and receipt and pays it', right: 'Payables specialist' },
      ],
      explain: `<p>Splitting these jobs between different people is a key control called <em>segregation of duties</em>: the person who asks is not the one who orders, and the person who orders is not the one who pays.</p>`,
    },
    {
      type: 'slides',
      title: 'The procurement applications (a light tour)',
      slides: [
        {
          icon: '🛍️',
          title: 'Self Service Procurement',
          html: `<p>The “online shop” for employees. Requesters search catalogs, use smart forms, create <strong>noncatalog requests</strong>, add items to a cart and submit a <strong>requisition</strong>. Oracle’s current guide opens it from the Navigator under Procurement with <kbd>Purchase Requisitions (New)</kbd>. It also works in a phone or tablet browser and can be added to your home screen.</p>`,
        },
        {
          icon: '📑',
          title: 'Purchasing',
          html: `<p>The buyer’s workshop. In the <strong>Purchase Orders</strong> and <strong>Purchase Agreements</strong> work areas, buyers process approved requisitions, create purchase orders and agreements, send them to suppliers and manage changes, holds and closing.</p>`,
        },
        {
          icon: '🤝',
          title: 'Supplier Portal',
          html: `<p>A self-service website for suppliers. In the Redwood Supplier Portal, suppliers can view and acknowledge orders and agreements, create advance shipment notices, see receipts, submit invoices, check payments and keep their company profile up to date.</p>`,
        },
        {
          icon: '🏷️',
          title: 'Sourcing',
          html: `<p>For finding the best supplier and price. Buyers create <strong>negotiations</strong> (such as requests for quotes or auctions), invite suppliers to respond, compare responses and award the business — often ending in a purchase agreement.</p>`,
        },
        {
          icon: '📇',
          title: 'Supplier management',
          html: `<p>Supplier records (names, sites, bank accounts, tax details) are shared by Procurement and Payables. You met suppliers in the Payables module — it’s the same record, used by both teams.</p>`,
        },
      ],
    },
    {
      type: 'text',
      heading: 'Business units on a purchase order',
      html: `<p>Remember business units (BUs) from the Basics module? A BU can perform several <strong>business functions</strong>. Oracle lists functions such as <em>Requisitioning</em>, <em>Procurement</em>, <em>Receiving</em>, <em>Payables invoicing</em>, <em>Payables payments</em> and <em>Expense management</em>. On every purchase order, Oracle asks you to think about four parties:</p>
<ul>
<li><strong>Procurement BU</strong> – the BU that does the buying work: managing suppliers, negotiating contracts, issuing and administering POs. A buyer can only create POs for BUs that are <strong>clients</strong> of their procurement BU.</li>
<li><strong>Requisitioning BU</strong> – the BU where the items are needed. It usually <strong>pays for</strong> the purchase, so its ledger gets the cost.</li>
<li><strong>Sold-to legal entity</strong> – the legal entity that is legally <strong>liable</strong> for the PO and has the tax registration. Normally it is the legal entity of the requisitioning BU; some global companies route purchases through another entity for legal or tax reasons.</li>
<li><strong>Bill-to BU</strong> – the BU that <strong>processes the supplier’s invoices</strong> for the PO (the Payables invoicing side).</li>
</ul>
<p>Oracle calls the setup where one BU buys on behalf of others the <strong>service provider model</strong>: BUs with requisitioning and payables invoicing functions are set up as clients of a BU with the procurement function. That’s how a central “shared service” buying team works.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny’s business units for buying',
      html: `<p>Jordan kept Sunny’s setup simple at first: <strong>Sunny US BU</strong> does everything for the US company, and <strong>Sunny UK BU</strong> does everything for the UK company.</p>`,
      steps: [
        'When Leo buys lemons for the US kitchen, Sunny US BU is the <strong>procurement BU</strong>, the <strong>requisitioning BU</strong> and the <strong>bill-to BU</strong>. The <strong>sold-to legal entity</strong> is Sunny Lemonade US Inc.',
        'A year later, Sam decides Leo should also buy cups for the UK, because Leo gets better prices from Cup &amp; Straw Supply. Jordan makes Sunny UK BU a <strong>client</strong> of Sunny US BU for procurement.',
        'Now, for UK cups: procurement BU = Sunny US BU (Leo does the work); requisitioning BU = Sunny UK BU (the cups are needed there and the cost goes to the UK ledger); sold-to legal entity = Sunny Lemonade UK Ltd; bill-to BU = Sunny UK BU (UK Payables processes the invoice).',
      ],
      result: `<p>Leo can buy for both companies, but each company’s costs, invoices and legal liability stay in the right place. This is the service provider model in action.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: which party on the purchase order?',
      instructions: `<p>Think about the order for <strong>UK cups</strong> that Leo places from Sunny US BU. Put each description in the right bucket.</p>`,
      categories: ['Procurement BU', 'Requisitioning BU', 'Sold-to legal entity', 'Bill-to BU'],
      items: [
        { text: 'Sunny US BU – Leo’s team that issues the PO and negotiates prices', answer: 'Procurement BU' },
        { text: 'Sunny UK BU – where the cups are needed and whose ledger gets the cost', answer: 'Requisitioning BU' },
        { text: 'Sunny Lemonade UK Ltd – legally liable for the order and holds the tax registration', answer: 'Sold-to legal entity' },
        { text: 'Sunny UK BU – where the supplier’s invoice is processed in Payables', answer: 'Bill-to BU' },
        { text: 'The BU that must have the client relationship set up so Leo can buy for others', answer: 'Procurement BU' },
      ],
      explain: `<p>In the service provider model, the procurement BU does the buying work for client BUs. The requisitioning BU needs the goods and bears the cost; the sold-to legal entity is the legally liable party; and the bill-to BU processes the invoices. One BU can play several of these parts, as Sunny US BU does for US purchases.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Where these settings live',
      html: `<p>Procurement application administrators configure business functions in Setup and Maintenance — for example the <kbd>Configure Requisitioning Business Function</kbd> task sets defaults such as the default deliver-to organization and line type for a requisitioning BU, and whether purchase orders may involve multiple legal entities. Buyers are set up as <strong>procurement agents</strong> with access to specific procurement BUs and actions. Exact task names can change between releases, so search Setup and Maintenance if a name doesn’t match.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: “No PO, no pay”',
      html: `<p>Many companies have a rule: suppliers must quote a PO number on every invoice, and invoices without one are sent back. It sounds strict, but it is the single best way to make Payables smooth, because every invoice can be matched to something that was approved before the money was committed. When a finance person complains about too many invoice holds, the cure is very often better POs and receipts upstream.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Procurement', def: 'Getting the goods and services a company needs from suppliers, with the right price and approvals.' },
        { term: 'Requisition', def: 'An internal request for goods or services; if approved, it leads to a purchase order.' },
        { term: 'Purchase order (PO)', def: 'A formal, approved order sent to a supplier authorizing the purchase of goods or services.' },
        { term: 'Buyer (procurement agent)', def: 'The person who chooses suppliers and creates and manages purchase orders and agreements.' },
        { term: 'Procurement BU', def: 'The business unit that performs buying work, such as issuing purchase orders, for itself or for client business units.' },
        { term: 'Requisitioning BU', def: 'The business unit where items are needed, which usually bears the cost of the purchase.' },
        { term: 'Sold-to legal entity', def: 'The legal entity that is legally liable for a purchase order.' },
        { term: 'Supplier Portal', def: 'A self-service site where suppliers see orders, ship goods, submit invoices and check payments.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'What is the difference between a requisition and a purchase order?',
          options: [
            'They are the same document',
            'A requisition is an internal request; a purchase order is the formal order sent to the supplier',
            'A requisition is sent to the supplier; a PO stays inside the company',
            'A requisition is the supplier’s invoice',
          ],
          answer: 1,
          explain: 'Oracle describes a requisition as a request for goods or services, and an order as the formal authorization to purchase that the supplier receives.',
        },
        {
          q: 'Leo, in Sunny US BU, buys cups that the UK kitchen needs and the UK company pays for. Which is the requisitioning BU?',
          options: ['Sunny US BU', 'Sunny UK BU', 'Cup & Straw Supply', 'Big River Bank'],
          answer: 1,
          explain: 'The requisitioning BU is where the items are needed and usually bears the cost — Sunny UK BU. Sunny US BU is the procurement BU because Leo does the buying.',
        },
        {
          q: 'Which application would a supplier use to acknowledge a purchase order and check whether they were paid?',
          options: ['Self Service Procurement', 'Supplier Portal', 'General Ledger', 'Expenses'],
          answer: 1,
          explain: 'The Supplier Portal is the supplier’s self-service site for orders, shipments, invoices and payments.',
        },
        {
          q: 'Why does a Payables specialist care about good purchase orders?',
          options: [
            'Because POs set the supplier’s favorite color',
            'Because invoices are matched against POs and receipts; poor POs cause invoice holds and wrong accounting',
            'Because Payables creates all POs',
            'They don’t — POs have nothing to do with Payables',
          ],
          answer: 1,
          explain: 'Matching and accounting in Payables depend on the PO’s price, quantity, match settings and charge account.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Procurement (26D) – Considerations for Purchase Order Creation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/considerations-for-purchase-order-creation.html' },
    { title: 'Using Procurement (26D) – What’s the difference between an order and a requisition?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/what-s-the-difference-between-an-order-and-a-requisition.html' },
    { title: 'Using Procurement (26D) – Introduction to the Self Service Procurement Application', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/introduction-to-the-self-service-procurement-application.html' },
    { title: 'Using Procurement (26D) – Redwood Oracle Supplier Portal Home Page', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/oracle-supplier-portal.html' },
    { title: 'Using Procurement (26D) – How the Sold-To Legal Entity Is Determined', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/how-the-sold-to-legal-entity-is-determined.html' },
    { title: 'Implementing Procurement (26D) – Business Functions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oapro/business-functions.html' },
    { title: 'Implementing Procurement (26D) – Service Provider Models', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oapro/service-provider-models.html' },
    { title: 'Implementing Procurement (26D) – How You Configure Business Units with Requisitioning Business Functions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oapro/how-you-configure-business-units-with-requisitioning-business.html' },
  ],
};
