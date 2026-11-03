export default {
  slug: 'requisitions-and-pos',
  title: 'Requisitions and Purchase Orders',
  minutes: 18,
  summary:
    'Follow a need from a requisition in Self Service Procurement to a purchase order sent to the supplier. Learn catalog and noncatalog requests, approvals, the three purchasing document types, the parts of a PO, the match approval level that links forward to Payables matching, PO statuses and how POs are communicated.',
  objectives: [
    'Create a requisition in your mind: catalog versus noncatalog requests, and what happens after you submit',
    'Read requisition and purchase order statuses',
    'Explain the difference between a purchase order, a blanket purchase agreement and a contract purchase agreement',
    'Describe the parts of a purchase order (header, lines, schedules, distributions)',
    'Explain 2-way, 3-way and 4-way match approval levels and why they matter to Payables',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The wish list and the shop order',
      html: `<p>Before your birthday party, you write a <strong>wish list</strong>: “20 balloons, 1 cake, 10 party hats.” That’s a request — nothing has been bought yet. Your parent reads it, crosses out the pony, and says “OK” — that’s the <strong>approval</strong>.</p>
<p>Then your parent phones the bakery and says: “Please deliver one chocolate cake to our house on Saturday at 2 pm. It will cost $30, and we’ll pay when it arrives.” That phone call is a promise between two sides — a real <strong>order</strong>.</p>
<p>At work, the wish list is a <strong>requisition</strong> and the promise to the bakery is a <strong>purchase order</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Requisitions: asking for what you need',
      html: `<p>A <strong>requisition</strong> is an internal request for goods or services. It is not sent to the supplier. If it is approved, a purchase order is created to fulfil it.</p>
<p>In Oracle Fusion, employees create requisitions in <strong>Self Service Procurement</strong>. Oracle’s current guide opens it from the Navigator, under Procurement, with <kbd>Purchase Requisitions (New)</kbd>. It feels like online shopping:</p>
<ul>
<li><strong>Catalog request</strong> – you search or browse the catalog (local catalog items, often with prices from agreements, or <em>punchout</em> catalogs on a supplier’s website), then click <kbd>Add to Cart</kbd>.</li>
<li><strong>Noncatalog request</strong> – for something not in the catalog. You type a description, item type, price details and a suggested supplier yourself (you can even suggest a new supplier that isn’t approved yet).</li>
<li><strong>Smart forms</strong> – templates set up by procurement for common requests that need extra questions.</li>
</ul>
<p>In the cart you review the requisition: deliver-to location, the <strong>charge account</strong> (where the cost will go), project details and attachments. Then you click <kbd>Submit</kbd>. The requisition appears in your recent requisitions so you can follow its status.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: Noah’s noncatalog request',
      instructions: `<p>Practice form (a simplified simulation, not Oracle’s real page). Noah needs <strong>50 bags of sugar</strong> at <strong>$4 each</strong> from <strong>Sweet Sugar Co.</strong> for the US kitchen. Sugar is not in Sunny’s catalog yet. Fill in the request.</p>`,
      formTitle: 'Noncatalog Request (practice)',
      fields: [
        { label: 'Requisitioning BU', given: 'Sunny US BU' },
        { label: 'Item description', type: 'text', answer: ['sugar', 'bags of sugar', 'sugar bags', '50 bags of sugar'] },
        { label: 'Item type', type: 'select', options: ['Goods', 'Fixed Price Services'], answer: 'Goods' },
        { label: 'Quantity', type: 'number', answer: 50 },
        { label: 'Unit price (USD)', type: 'number', answer: 4 },
        { label: 'Supplier', type: 'select', options: ['Lemon Grove Farms', 'Sweet Sugar Co.', 'Cup & Straw Supply', 'Bright Power Utility'], answer: 'Sweet Sugar Co.' },
        { label: 'Charge account', type: 'select', options: ['101-200-5120-010-000', '101-200-5110-010-000', '101-100-6120-000-000'], answer: '101-200-5120-010-000' },
      ],
      explain: `<p>Sugar is a physical good bought by quantity, so the item type is Goods (Fixed Price Services is for services bought by amount). 50 × $4 = $200, Sunny’s standard sugar amount. The charge account uses Company 101, Cost Center 200 Kitchen, Account <code>5120 Sugar Cost</code> and Product 010 Classic Lemonade. Picking 5110 would wrongly book sugar as lemons.</p>`,
    },
    {
      type: 'table',
      caption: 'Requisition statuses (header level)',
      headers: ['Status', 'Meaning'],
      rows: [
        ['Draft', 'Saved but not submitted for approval.'],
        ['Pending Approval', 'Submitted and going through approvals.'],
        ['Approved', 'Approved on submission. Individual lines may later show other statuses.'],
        ['Rejected', 'All active lines were rejected by approvers.'],
        ['Returned', 'All active lines were returned by the buyer (for example, to fix details).'],
        ['Withdrawn', 'The requester pulled it back after submitting, usually to change it.'],
        ['Canceled', 'All lines (other than split or replaced ones) were canceled.'],
      ],
    },
    {
      type: 'text',
      heading: 'Approval and funds',
      html: `<p>When a requisition is submitted, <strong>approval rules</strong> route it to the right people — for example, the requester’s manager, then a higher approver if the amount is large or the item category is sensitive. Approvers can approve, reject, request more information, and in some setups edit the requisition (which may restart approval). Rejecting individual lines on a multi-line requisition is possible too.</p>
<p>If the company uses <strong>budgetary control</strong>, funds are reserved for the requisition either when it is submitted or when it is approved, depending on setup. If there isn’t enough budget, the requisition can’t go ahead unless someone with authority approves a <strong>funds override</strong>. You’ll learn this properly in the Budgetary Control lesson.</p>`,
    },
    {
      type: 'text',
      heading: 'From requisition to purchase order',
      html: `<p>An approved requisition becomes a <strong>purchase order</strong> in one of two ways:</p>
<ul>
<li><strong>Automatically</strong> – Oracle calls this automated order creation, or <em>touchless buying</em>. If the requisition line is for a catalog item with an agreement (or a punchout item), the system finds the supplier and agreement, derives the price and terms, creates the PO and can even communicate it to the supplier with no buyer involved.</li>
<li><strong>By a buyer</strong> – the buyer opens the <strong>Process Requisitions</strong> task in the Purchase Orders (or Purchase Agreements) work area, searches for requisition lines, adds them to the <strong>document builder</strong> and creates an order (or a negotiation, to get quotes first). Several requisitions can be grouped into one PO.</li>
</ul>
<p>Noncatalog requests usually need a buyer, because nobody has agreed a price yet.</p>`,
    },
    {
      type: 'table',
      caption: 'The three purchasing document types',
      headers: ['Document', 'When you use it', 'Sunny example'],
      rows: [
        ['<strong>Purchase order</strong> (standard)', 'A one-time purchase where you know the items, prices, quantities, delivery dates and accounting.', 'This week’s 1,000 lemons from Lemon Grove Farms.'],
        ['<strong>Blanket purchase agreement</strong>', 'You know <em>what</em> you’ll buy from a supplier over a period and at what price, but not the delivery schedule yet. Orders are released against it later. A procurement BU can negotiate it and make it available to several requisitioning BUs.', 'All of 2026: lemons at $0.50 each, ordered weekly as needed.'],
        ['<strong>Contract purchase agreement</strong>', 'You agree terms and conditions with a supplier <em>without</em> saying which items you’ll buy. Later POs reference the contract.', 'A master agreement with Stand Builders LLC covering warranty and payment terms for any equipment.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: which purchasing document?',
      instructions: `<p>Leo has several buying situations. Pick the best document type for each.</p>`,
      categories: ['Purchase order', 'Blanket purchase agreement', 'Contract purchase agreement'],
      items: [
        { text: 'Buy 200 cups from Cup & Straw Supply, delivered next Monday, charged to the kitchen.', answer: 'Purchase order' },
        { text: 'Lock in a price of $0.50 per lemon for the whole year; quantities and dates will come later.', answer: 'Blanket purchase agreement' },
        { text: 'Agree general terms (warranty, liability, payment terms) with Stand Builders LLC, items not yet known.', answer: 'Contract purchase agreement' },
        { text: 'Order one new lemonade stand for $6,000 with a set delivery date.', answer: 'Purchase order' },
        { text: 'Agree prices for 20 sugar products that both the US and UK can order from all year.', answer: 'Blanket purchase agreement' },
      ],
      explain: `<p>A purchase order is for a specific purchase with known details. A blanket purchase agreement fixes items and prices for a period, with releases later. A contract purchase agreement fixes only terms and conditions; specific items come on later POs that reference it.</p>`,
    },
    {
      type: 'slides',
      title: 'Inside a purchase order',
      slides: [
        {
          icon: '🗂️',
          title: 'Header',
          html: `<p>The whole order: <strong>document style</strong>, procurement BU, requisitioning BU, sold-to legal entity, bill-to BU, <strong>supplier</strong>, <strong>supplier site</strong> and contact, currency, payment terms, bill-to location and <strong>communication method</strong>. You must have a supplier and supplier site to submit. Once a PO is open, you can’t change the supplier — you’d cancel it and create a new one.</p>`,
        },
        {
          icon: '📃',
          title: 'Lines',
          html: `<p>What you’re buying: item or description, category, quantity, unit of measure and price. The <strong>line type</strong> says whether it’s goods (quantity-based) or services (amount-based).</p>`,
        },
        {
          icon: '🚚',
          title: 'Schedules',
          html: `<p>When and where: quantity, ship-to location, requested or promised date. A line can have several schedules (for example, 500 lemons this week, 500 next week). Schedules also hold billing controls — the <strong>match approval level</strong> and the <strong>invoice match option</strong>.</p>`,
        },
        {
          icon: '🧮',
          title: 'Distributions',
          html: `<p>How it is paid for: the <strong>charge account</strong> (for example <code>101-200-5110-010-000</code>), deliver-to details, project information and the accrual account. Distributions are what turn into accounting later, so finance people love checking them.</p>`,
        },
      ],
    },
    {
      type: 'text',
      heading: 'Match approval level: the link to Payables',
      html: `<p>On each PO schedule, the <strong>match approval level</strong> says which documents must agree (within tolerance) before the supplier’s invoice can be paid:</p>
<ul>
<li><strong>2-way</strong> – PO and invoice quantities must match. Good for services or low-risk items where nobody formally receives.</li>
<li><strong>3-way</strong> – PO, <strong>receipt</strong> and invoice quantities must match. You only pay for what arrived. This is the most common choice for goods.</li>
<li><strong>4-way</strong> – PO, receipt, <strong>accepted quantity after inspection</strong> and invoice must match. Used when goods are inspected, such as medicines or food quality checks.</li>
</ul>
<p>Separately, the <strong>invoice match option</strong> (Order or Receipt) tells Payables whether to match the invoice to the PO schedule or to specific receipts. Oracle stresses these are independent settings. If quantities or prices don’t agree within tolerance, Payables places a <strong>matching hold</strong> — you’ll study holds in the Matching and Validation lessons of the Payables module.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: pick the match approval level',
      instructions: `<p>Which match approval level fits each purchase best?</p>`,
      categories: ['2-way', '3-way', '4-way'],
      items: [
        { text: 'Monthly electricity from Bright Power Utility (nothing is physically received)', answer: '2-way' },
        { text: '1,000 lemons delivered to the kitchen and counted by Noah', answer: '3-way' },
        { text: 'Food-grade sugar that must pass a quality inspection before use', answer: '4-way' },
        { text: '200 cups delivered to the kitchen', answer: '3-way' },
        { text: 'A consultant’s fixed-fee advice session', answer: '2-way' },
      ],
      explain: `<p>Use 2-way when there is nothing to receive, 3-way when you want to pay only for what arrived, and 4-way when goods must also be inspected and accepted. Stricter levels give more protection but need more steps from receiving and inspection staff.</p>`,
    },
    {
      type: 'text',
      heading: 'Approving and communicating the PO',
      html: `<p>When the buyer submits a PO, it may go through its own approval (some companies skip PO approval for automatically created orders, if the requisition was already approved). After approval, the PO becomes a legal document between Sunny and the supplier (and the supplier may need to <strong>acknowledge</strong> it).</p>
<p>Oracle sends the PO to the supplier automatically on approval if the PO has a communication method other than None, or the supplier site uses electronic business-to-business messaging. Methods include <strong>print</strong>, <strong>fax</strong>, <strong>email</strong> and <strong>Oracle Collaboration Messaging</strong> for B2B. The default comes from the supplier site’s preferred method. The buyer can resend with the <kbd>Communicate</kbd> action, and a scheduled process, <strong>Communicate Purchasing Documents</strong>, can send documents in batches. Suppliers can also see their orders in the <strong>Supplier Portal</strong>.</p>`,
    },
    {
      type: 'table',
      caption: 'Common purchase order statuses (Manage Orders)',
      headers: ['Status', 'Meaning'],
      rows: [
        ['Incomplete', 'Still being written; not yet submitted.'],
        ['Pending Approval', 'Waiting for approval.'],
        ['Rejected', 'Rejected in approval or by the supplier during acknowledgment.'],
        ['Pending Acknowledgment', 'Waiting for the supplier to acknowledge.'],
        ['Open', 'Approved and open for receiving and invoicing.'],
        ['Pending Change Approval', 'A change proposed by the buyer or supplier is waiting for approval.'],
        ['On Hold', 'Receiving and invoicing temporarily stopped.'],
        ['Closed for Receiving / Closed for Invoicing', 'No more receipts / no more invoices expected.'],
        ['Closed', 'No further fulfillment activity expected.'],
        ['Finally Closed', 'All receiving and invoicing done; can be archived. This can’t be undone.'],
        ['Canceled / Withdrawn', 'Canceled and won’t be fulfilled / pulled back by the buyer while pending.'],
      ],
    },
    {
      type: 'example',
      title: 'Leo’s purchase order for lemons',
      html: `<p>On 2 March, Noah submits a catalog requisition for <strong>1,000 lemons</strong>. The catalog item points to Sunny’s blanket purchase agreement with Lemon Grove Farms at <strong>$0.50</strong> each.</p>`,
      steps: [
        'The requisition is approved by Noah’s manager the same day.',
        'Because there’s an agreement, automated order creation builds a <strong>standard purchase order</strong> referencing the blanket agreement. (If Leo preferred, Leo could build it from Process Requisitions.)',
        'Header: Procurement BU and Requisitioning BU = Sunny US BU; sold-to legal entity = Sunny Lemonade US Inc.; supplier = Lemon Grove Farms, site “Main Farm”; payment terms Net 30; communication method Email.',
        'Line 1: Lemons, quantity 1,000, unit Each, price $0.50 → <strong>$500</strong>.',
        'Schedule 1: ship-to Sunny US Kitchen, requested date 5 March, <strong>match approval level 3-way</strong>, invoice match option Order.',
        'Distribution 1: charge account <strong>101-200-5110-010-000</strong> (Company 101, Kitchen, Lemons Cost, Classic Lemonade).',
        'The PO is approved, its status becomes <strong>Open</strong>, and it is emailed to Lemon Grove Farms automatically.',
      ],
      result: `<p>No money has moved yet, so there is no journal entry (unless the company uses encumbrance accounting). But everything Payables needs later — price, quantity, match rule and account — is now fixed on the PO.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: read the lemon PO',
      instructions: `<p>Use Leo’s purchase order above to fill in the blanks.</p>`,
      html: `<p>The PO line amount is $ {{}}.</p>
<p>With a 3-way match, the invoice must agree with the PO and the {{}} before it can be paid.</p>
<p>The natural account segment on the distribution is {{}}.</p>
<p>The cost center segment value is {{}}.</p>`,
      blanks: [
        { answer: 500 },
        { answer: ['receipt', 'the receipt'] },
        { answer: ['5110', '5110 Lemons Cost'] },
        { answer: ['200', '200 Kitchen'] },
      ],
      explain: `<p>1,000 × $0.50 = $500. A 3-way match needs PO, receipt and invoice to agree. In <code>101-200-5110-010-000</code>, 101 is the company, 200 the Kitchen cost center, 5110 Lemons Cost the account, 010 Classic Lemonade the product and 000 the intercompany value.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: create a catalog requisition',
      items: [
        'From the Navigator, under <kbd>Procurement</kbd>, select <kbd>Purchase Requisitions (New)</kbd>.',
        'Search for the item (for example, “lemons”) or browse a featured category.',
        'Click <kbd>Add to Cart</kbd>, then open the cart.',
        'Check the quantity, then click the edit icon in the requisition summary to review delivery location, charge account and attachments. Click <kbd>Update</kbd>.',
        'Click <kbd>Submit</kbd>. Watch the status in your recent requisitions on the home page.',
      ],
      note: `<p>These steps follow Oracle’s Using Procurement guide for the newer requisition experience. Your page may look different depending on release, Redwood adoption, your requisitioning preferences and the roles you have.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: PO problems become invoice problems',
      html: `<p>The most common reasons for invoice holds are on the PO: a price that changed but was never updated, a wrong unit of measure (box versus each), 3-way match on a service nobody receives, or a wrong charge account. When Ava sees the same hold again and again, the fix is often a quick chat with Leo about how POs are built.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Catalog request', def: 'A requisition line for an item found in the catalog, usually with an agreed price.' },
        { term: 'Noncatalog request', def: 'A requisition line for something not in the catalog, described and priced by the requester.' },
        { term: 'Blanket purchase agreement', def: 'An agreement fixing items and prices with a supplier for a period, with orders released later.' },
        { term: 'Contract purchase agreement', def: 'An agreement fixing terms and conditions with a supplier without listing specific items.' },
        { term: 'PO schedule', def: 'The part of a PO line saying how many, where and when, plus match and billing controls.' },
        { term: 'PO distribution', def: 'The part of a PO schedule that holds the charge account and other accounting details.' },
        { term: 'Match approval level', def: 'The setting (2-, 3- or 4-way) that says which documents must agree before an invoice can be paid.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which purchasing document fixes prices for items over a period without fixing delivery dates?',
          options: ['Standard purchase order', 'Blanket purchase agreement', 'Contract purchase agreement', 'Requisition'],
          answer: 1,
          explain: 'A blanket purchase agreement holds negotiated item prices; specific orders and schedules come later.',
        },
        {
          q: 'A PO schedule has match approval level 3-way. What must match before the invoice can be paid?',
          options: ['PO and invoice only', 'PO, receipt and invoice', 'PO, receipt, inspection and invoice', 'Only the invoice'],
          answer: 1,
          explain: '3-way matching compares PO, receipt and invoice quantities within tolerance. 4-way also includes accepted quantities from inspection.',
        },
        {
          q: 'Where does a buyer turn approved requisition lines into a purchase order manually?',
          options: [
            'In the Expenses work area',
            'In Process Requisitions, using the document builder',
            'In the Supplier Portal',
            'In General Ledger journals',
          ],
          answer: 1,
          explain: 'Process Requisitions (in the Purchase Orders or Purchase Agreements work areas) lets buyers group requisition lines in the document builder and create orders.',
        },
        {
          q: 'A PO is approved and is now open for receiving and invoicing. What is its status?',
          options: ['Incomplete', 'Pending Approval', 'Open', 'Finally Closed'],
          answer: 2,
          explain: 'Open means the order can be received and invoiced. Finally Closed means all receiving and invoicing is finished.',
        },
        {
          q: 'When is Leo’s lemon PO automatically sent to the supplier?',
          options: [
            'Never — POs must always be posted by hand',
            'On approval, because the PO has a communication method (Email) other than None',
            'Only when the invoice arrives',
            'Only at month-end',
          ],
          answer: 1,
          explain: 'Oracle starts communication automatically on approval if a communication method other than None is set or the site uses B2B messaging.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Procurement (26D) – Create a Requisition', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/create-a-requisition.html' },
    { title: 'Using Procurement (26D) – Create a Noncatalog Request', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/create-a-noncatalog-request.html' },
    { title: 'Using Procurement (26D) – Requisition Status', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/requisition-status.html' },
    { title: 'Using Procurement (26D) – How Funds Are Reserved for Requisitions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/how-funds-are-reserved-for-requisitions.html' },
    { title: 'Using Procurement (26D) – Create Procurement Documents from Requisitions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/create-procurement-documents-from-requisitions.html' },
    { title: 'Using Procurement (26D) – How Purchase Orders Are Automatically Created', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/how-purchase-orders-are-automatically-created.html' },
    { title: 'Using Procurement (26D) – What’s the difference between a purchase order, a purchase agreement, and a contract agreement?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/what-s-the-difference-between-a-purchase-order-a-purchase.html' },
    { title: 'Using Procurement (26D) – Considerations for Purchase Order Creation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/considerations-for-purchase-order-creation.html' },
    { title: 'Using Procurement (26D) – Considerations for Purchase Order Schedules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/considerations-for-purchase-order-schedules.html' },
    { title: 'Using Procurement (26D) – Purchase Order Statuses', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/purchase-order-statuses.html' },
    { title: 'Implementing Procurement (26D) – Match Approval Level Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oapro/match-approval-level-options.html' },
  ],
};
