export default {
  slug: 'budgetary-control',
  title: 'Budgetary Control: Don’t Spend More Than You Have',
  minutes: 17,
  summary:
    'Budgetary control checks spending against a budget in real time — on requisitions, purchase orders, invoices and journals — and can stop or warn before the money is gone. Learn control budgets, funds check versus funds reservation, control levels, commitments, obligations and expenditures, overrides, and how encumbrance accounting differs.',
  objectives: [
    'Explain what budgetary control does and why organizations use it',
    'Describe a control budget and the control levels absolute, advisory, track and none',
    'Tell the difference between a funds check and a funds reservation',
    'Follow budget consumption through commitments, obligations and expenditures and calculate funds available',
    'Explain how encumbrance accounting differs from budgetary control',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The pocket-money envelope',
      html: `<p>At the start of the month, your parent gives you an envelope with <strong>$20</strong> for snacks. Every time you want to buy something, you first peek into the envelope: “Is there enough?” That peek is a <strong>funds check</strong>.</p>
<p>When you decide to buy a $3 juice tomorrow, you take $3 out and put it in your pocket so you don’t spend it on something else. That’s a <strong>funds reservation</strong> — the money is set aside even though the shop hasn’t got it yet.</p>
<p>And the envelope rule? Some families say “When it’s empty, you <strong>can’t</strong> buy more” (strict). Others say “You <em>can</em>, but we’ll talk about it” (a warning). Oracle calls these <strong>control levels</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'What budgetary control is',
      html: `<p><strong>Budgetary control</strong> is a set of system options and processes in Oracle Fusion that checks whether transactions have enough budget, and records how much of the budget each transaction uses — to <strong>prevent overspending</strong>. It works in real time, while people create requisitions, purchase orders, invoices, receipts and journals, not weeks later in a report.</p>
<p>It is especially common in the <strong>public sector</strong> (governments, universities, charities) where spending more than the approved budget may be against the law — which is why Oracle documents it in the <em>Using Financials for the Public Sector</em> guide. But any company can turn it on. Sam wants it at Sunny so the kitchen doesn’t blow its ingredients budget.</p>
<p>Key facts from Oracle’s description:</p>
<ul>
<li>Budgetary control <strong>stores the budget</strong>, performs <strong>funds checks</strong> and <strong>funds reservations</strong> when transactions are submitted or approved, and keeps its own balances: budget, funds reserved and funds available.</li>
<li>It does this <strong>without creating journal entries</strong>. Its balances live in the Budgetary Control module, not in the General Ledger.</li>
<li>It works on <strong>expense</strong> accounts. Revenue, liability and equity accounts aren’t supported for spending control.</li>
<li>Control budgets can check spending against a <strong>ledger</strong>, a <strong>project</strong>, or both, and you decide during setup which kinds of transactions take part.</li>
</ul>`,
    },
    {
      type: 'slides',
      title: 'Control budgets and control levels',
      slides: [
        {
          icon: '📐',
          title: 'Control budget',
          html: `<p>A <strong>control budget</strong> defines <em>what</em> is controlled: which chart of accounts segments (for example Company, Cost Center and a parent Account value), which <strong>budget periods</strong> (monthly, quarterly or yearly), the currency, the control level and the tolerance. A <strong>procure-to-pay</strong> control budget checks spending; a <strong>cash</strong> control budget checks payments. Budgets can be loaded from a spreadsheet, a flat file or planning tools.</p>`,
        },
        {
          icon: '⛔',
          title: 'Absolute',
          html: `<p>Stops the transaction if there are not enough funds (after any tolerance). The strict envelope.</p>`,
        },
        {
          icon: '⚠️',
          title: 'Advisory',
          html: `<p>Gives a <strong>warning</strong> if funds are insufficient after tolerance, but lets the transaction continue.</p>`,
        },
        {
          icon: '👀',
          title: 'Track',
          html: `<p>No warnings at all — it only <strong>records</strong> consumption so you can report on it, without affecting the transaction.</p>`,
        },
        {
          icon: '🚫',
          title: 'None',
          html: `<p>No budgetary control validation: funds aren’t reserved and transactions aren’t tracked. Often used together with <strong>supplemental rules</strong>, which are exceptions to the normal control level and tolerance.</p>`,
        },
        {
          icon: '🔓',
          title: 'Tolerance and override',
          html: `<p><strong>Tolerance</strong> is an acceptable amount or percentage over budget. <strong>Override</strong> lets an authorized person continue when a transaction fails for insufficient funds or a closed budget period — sometimes up to a maximum override amount.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: what happens at each control level?',
      instructions: `<p>A $600 requisition arrives, but only $500 is available in the kitchen budget (no tolerance). What happens under each control level?</p>`,
      categories: ['Absolute', 'Advisory', 'Track', 'None'],
      items: [
        { text: 'The requisition fails budgetary control and cannot go ahead without an override or more budget', answer: 'Absolute' },
        { text: 'A warning appears, but the requisition continues and funds are reserved', answer: 'Advisory' },
        { text: 'No message appears, but the consumption is recorded for reports', answer: 'Track' },
        { text: 'Nothing is checked, reserved or tracked', answer: 'None' },
      ],
      explain: `<p>Absolute blocks, Advisory warns, Track silently records, and None does nothing. Organizations often use Absolute on sensitive accounts and Advisory or Track elsewhere, using supplemental rules for exceptions.</p>`,
    },
    {
      type: 'text',
      heading: 'Funds check versus funds reservation',
      html: `<p>Oracle draws a clear line between the two:</p>
<ul>
<li>A <strong>funds check</strong> compares the transaction amount with funds available (taking tolerances and overrides into account) and tells you the result. <strong>Nothing is consumed.</strong> It’s a “what if?” In Payables it is run from the invoice actions menu; procurement pages offer a check funds action too, for users with the privilege.</li>
<li>A <strong>funds reservation</strong> does the same comparison, but then <strong>consumes</strong> the funds, reducing funds available. For requisitions and POs, funds are reserved automatically on <strong>submit</strong> or on <strong>approval</strong>, depending on setup (reserving on submit protects the money during a long approval). For Payables invoices, reservation runs during invoice validation.</li>
</ul>
<p>If a requisition or PO with reserved funds is rejected or canceled, the reserved funds are released back to the budget.</p>`,
    },
    {
      type: 'table',
      caption: 'How budget gets consumed along procure-to-pay',
      headers: ['Balance type', 'Created by', 'Released (liquidated) when'],
      rows: [
        ['<strong>Commitment</strong>', 'A reserved requisition (and reserved spend authorizations in Expenses).', 'A purchase order is created for it.'],
        ['<strong>Obligation</strong>', 'A reserved purchase order.', 'The goods are received or the invoice is entered.'],
        ['<strong>Expenditure</strong>', 'Reserved invoices, receipts, project costs and actual journals.', 'Stays — this is real spending.'],
        ['<strong>Funds available</strong>', 'Budget minus all of the above (and other encumbrances).', 'Goes up if budget is added or reservations are released.'],
      ],
    },
    {
      type: 'example',
      title: 'Sunny’s kitchen budget for March',
      html: `<p>Sam sets a control budget for <strong>Company 101, Cost Center 200 (Kitchen), ingredients accounts 5110–5130</strong>, monthly periods, control level <strong>Absolute</strong>, no tolerance. The March budget is <strong>$2,000</strong>.</p>`,
      steps: [
        'By 10 March, $800 of cup and sugar invoices have been validated: <strong>expenditure $800</strong>. Funds available: $1,200.',
        'Noah submits a requisition for 1,000 lemons ($500). Funds are reserved on submit: <strong>commitment $500</strong>. Funds available: $700.',
        'Noah submits a requisition for extra sugar ($200): commitment now $700. Funds available: $500.',
        'Leo’s lemon PO is approved. The $500 commitment is liquidated and becomes an <strong>obligation of $500</strong>. Funds available stay at $500 — the money just moved from one bucket to the next.',
        'Noah now wants <strong>$600</strong> of new cups for a festival. The requisition fails: <em>Insufficient funds</em>. Under Absolute control it can’t be submitted as is.',
        'Noah’s options: reduce it to $500 or less, ask the budget manager (Sam) to add budget or transfer it from another cost center, or ask someone with authority for an override.',
      ],
      result: `<p>Sam adds $300 to March from the Sales cost center’s unused budget. Funds available become $800, Noah resubmits, and $600 is reserved. The kitchen can never quietly overspend.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: calculate funds available',
      instructions: `<p>The UK kitchen has an April control budget of <strong>£1,500</strong>. Fill in the balances as transactions happen.</p>`,
      html: `<p>Validated invoices so far: £400 (expenditure). Funds available: £ {{}}.</p>
<p>A requisition for £300 is reserved (commitment). Funds available: £ {{}}.</p>
<p>The requisition becomes an approved PO for £300. Commitment is now £ {{}} and obligation is £ {{}}. Funds available: £ {{}}.</p>
<p>A new requisition for £900 is submitted under Absolute control. Additional funds required: £ {{}}.</p>`,
      blanks: [
        { answer: 1100 },
        { answer: 800 },
        { answer: 0 },
        { answer: 300 },
        { answer: 800 },
        { answer: 100 },
      ],
      explain: `<p>£1,500 − £400 = £1,100. Reserving £300 leaves £800. Converting the requisition to a PO moves £300 from commitment to obligation, so funds available don’t change (£800). A £900 request is £100 more than the £800 available, which is what Oracle shows as <em>Additional Required</em> in the budget view.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Practice: follow the budget buckets',
      instructions: `<p>Put the stages of budget consumption for a purchase in order.</p>`,
      items: [
        'Budget is loaded for the period',
        'A requisition reserves funds as a commitment',
        'A purchase order liquidates the commitment and reserves an obligation',
        'The receipt or invoice liquidates the obligation and records an expenditure',
      ],
      explain: `<p>Budget → commitment → obligation → expenditure. Each step releases the previous bucket and fills the next, so the same money is never counted twice and funds available stays accurate.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Where you see results in Oracle Fusion',
      html: `<ul>
<li>On a requisition, PO, invoice or journal, the <strong>funds status</strong> link opens <strong>View Budgetary Control Results</strong>. Its <em>Transaction view</em> shows the control budget, budget account and period, and requested and consumed amounts; its <em>Budget view</em> (with the right privilege) shows budget, commitments, obligations, expenditures and funds available.</li>
<li>Common failure messages include <em>Insufficient funds</em>, <em>Budget period closed for control budget</em>, <em>You can override the insufficient funds</em> and <em>Override exceeds maximum balance allowed</em>, each with a suggested fix.</li>
<li>Budget managers use <strong>Review Budgetary Control Balances</strong>, budgetary control reports and infolets for budget consumed and funds available.</li>
<li>Setup is in Setup and Maintenance with the <kbd>Manage Budgetary Control</kbd> task (in the Budgetary Control and Encumbrance Accounting area of Financials), where you also choose whether requisitions and POs reserve funds on submit or approval.</li>
<li>New in 26C/26D: a <strong>Budget Adjustment Assistant</strong> AI agent can help process budget adjustments with policy checks and approvals (26D adds these through a controlled release).</li>
</ul>`,
    },
    {
      type: 'text',
      heading: 'Encumbrance accounting: a different, optional tool',
      html: `<p>People often mix up budgetary control and <strong>encumbrance accounting</strong>. In Oracle Fusion they are <strong>independent</strong> features — you can use either, both, or neither.</p>
<ul>
<li><strong>Budgetary control</strong> validates transactions against a budget in real time and keeps funds-available balances <em>without journals</em>.</li>
<li><strong>Encumbrance accounting</strong> creates <strong>journal entries</strong> in the General Ledger for requisitions (commitments) and purchase orders (obligations), using subledger accounting’s <em>Standard Accrual with Encumbrances</em> method. When goods are received or invoiced, the encumbrance is reversed and the actual cost is booked. The encumbrance balances then live in the GL, so you can report them with normal financial reports.</li>
</ul>
<p>Oracle’s decision guide: if you want transactions validated against a budget in real time, you need budgetary control. If you want General Ledger journals and balances showing PO obligations and requisition commitments, you need encumbrance accounting. If you only want to compare budget with actuals in reports, you may need neither — just load budgets into the GL for reporting.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: design the budget structure carefully',
      html: `<p>Controlling every single account by every cost center by month sounds safe, but it creates thousands of tiny budgets and endless “insufficient funds” failures. Many organizations control at a <strong>summary</strong> level (for example, a parent account such as “Ingredients” by cost center by quarter) while keeping detail for reporting. Oracle supports linking detail and summary control budgets for exactly this reason. Also decide early who may override, and up to how much.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Budgetary control', def: 'Oracle Fusion features that check transactions against a budget in real time and record budget consumption to prevent overspending.' },
        { term: 'Control budget', def: 'The definition of what is controlled: segments, budget periods, currency, control level and tolerance.' },
        { term: 'Funds check', def: 'Comparing a transaction with funds available without consuming any budget.' },
        { term: 'Funds reservation', def: 'Comparing a transaction with funds available and then consuming the budget, reducing funds available.' },
        { term: 'Commitment', def: 'Budget reserved by a requisition, before a purchase order exists.' },
        { term: 'Obligation', def: 'Budget reserved by a purchase order for goods or services not yet received or invoiced.' },
        { term: 'Funds available', def: 'Budget minus commitments, obligations, expenditures and other reservations.' },
        { term: 'Encumbrance accounting', def: 'Creating General Ledger journal entries for requisitions and purchase orders before they become actual costs.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which control level warns about insufficient funds but lets the transaction continue?',
          options: ['Absolute', 'Advisory', 'Track', 'None'],
          answer: 1,
          explain: 'Advisory provides a warning; Absolute stops the transaction; Track only records; None does nothing.',
        },
        {
          q: 'What is the difference between a funds check and a funds reservation?',
          options: [
            'There is no difference',
            'A funds check only compares; a reservation also consumes the budget',
            'A funds check creates journals; a reservation doesn’t',
            'A reservation is only for revenue accounts',
          ],
          answer: 1,
          explain: 'Both compare the amount with funds available, but only a reservation consumes funds and reduces funds available.',
        },
        {
          q: 'A $500 requisition was reserved and has now been turned into an approved $500 PO. What happened to funds available?',
          options: ['It went down by another $500', 'It went up by $500', 'It stayed the same — the commitment became an obligation', 'It became zero'],
          answer: 2,
          explain: 'The PO liquidates the requisition’s commitment and reserves an obligation for the same amount, so funds available don’t change.',
        },
        {
          q: 'Which statement about budgetary control and encumbrance accounting is true?',
          options: [
            'They are the same feature',
            'Budgetary control creates GL journals for POs',
            'They are independent: budgetary control validates without journals; encumbrance accounting creates GL journals for requisitions and POs',
            'Encumbrance accounting stops overspending in real time',
          ],
          answer: 2,
          explain: 'Oracle describes them as independent features. Budgetary control keeps its own balances without journals; encumbrance accounting books commitment and obligation journals in the GL.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Financials for the Public Sector (26D) – Overview of Budgetary Control and Encumbrance Accounting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faups/overview-of-budgetary-control-and-encumbrance-accounting.html' },
    { title: 'Using Financials for the Public Sector (26D) – Difference between Budgetary Control and Encumbrance Accounting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faups/difference-between-budgetary-control-and-encumbrance-accounting.html' },
    { title: 'Using Financials for the Public Sector (26D) – Deciding Between Budgetary Control and Encumbrance Accounting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faups/deciding-between-budgetary-control-and-encumbrance-accounting.html' },
    { title: 'Using Financials for the Public Sector (26D) – Control Budgets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faups/control-budgets.html' },
    { title: 'Using Financials for the Public Sector (26D) – Control Budget Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faups/control-budget-options.html' },
    { title: 'Using Financials for the Public Sector (26D) – Budgetary Control Results', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faups/budgetary-control-results.html' },
    { title: 'Using Financials for the Public Sector (26D) – Budgetary Control Validation Failures and Corrective Actions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faups/budgetary-control-validation-failures-and-corrective-actions.html' },
    { title: 'Using Payables Invoice to Pay (26D) – What’s the difference between funds checking and funds reservation?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/what-s-the-difference-between-funds-checking-and-funds.html' },
    { title: 'Using Procurement (26D) – How Funds Are Reserved for Requisitions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/how-funds-are-reserved-for-requisitions.html' },
    { title: 'Using Procurement (26D) – Funds Reservation for a Purchase Order', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/procurement/26d/oaprc/funds-reservation-for-a-purchase-order.html' },
    { title: 'Financials 26D What’s New – Budget Adjustment Assistant with policy and approvals', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51221.htm' },
  ],
};
