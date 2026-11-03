export default {
  slug: 'tax',
  title: 'Oracle Fusion Tax',
  minutes: 17,
  summary:
    'Oracle Fusion Tax is the shared tax engine behind Payables, Receivables, Procurement and Expenses. Learn the building blocks — tax regime, tax, tax jurisdiction, tax status, tax rate and tax rules — how tax determination works, and the difference between transaction taxes and withholding tax.',
  objectives: [
    'Explain in simple words what a tax regime, tax, tax jurisdiction, tax status and tax rate are',
    'Describe how tax rules and defaults drive tax determination',
    'Tell transaction taxes (sales tax, VAT) apart from withholding tax',
    'Explain how Payables and Receivables use Oracle Fusion Tax, including recoverable tax',
    'Calculate and record a simple sales tax on a customer invoice',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The school lunch price chart',
      html: `<p>Imagine the school cafeteria has a big chart on the wall. At the top it says <em>“Cafeteria Charges”</em>. Under it there are columns for each school building, because the East building charges a little extra. Then there are rows: <em>Normal food</em>, <em>Fruit (free!)</em>, <em>Treats (extra charge)</em>. Each row has a price per item.</p>
<p>The cafeteria worker doesn’t think hard about each tray. They look at <strong>where</strong> you are (which building), <strong>what</strong> you bought (normal, fruit, treat), find the right box on the chart, and add it up. If there’s a special rule — “teachers don’t pay for coffee” — they apply that too.</p>
<p>Oracle Fusion Tax is that chart plus the cafeteria worker. The chart is the <strong>tax setup</strong>; the worker is the <strong>tax determination</strong> process that reads each transaction and picks the right tax.</p>`,
    },
    {
      type: 'text',
      heading: 'One tax engine for the whole ERP',
      html: `<p>Governments charge many kinds of tax. Two kinds matter most in everyday finance work:</p>
<ul>
<li><strong>Transaction taxes</strong> – taxes on buying and selling, such as US <strong>sales and use tax</strong> or UK <strong>VAT</strong> (value added tax). They are added to invoices: Sunny charges them to customers and pays them to suppliers.</li>
<li><strong>Withholding tax</strong> – an amount the <em>payer</em> keeps back from a supplier payment and sends to the tax authority instead (common for services in many countries).</li>
</ul>
<p>Instead of each module doing its own tax maths, Oracle Fusion uses one shared engine: <strong>Oracle Fusion Tax</strong>. Payables, Receivables, Procurement, Expenses and other applications send it the transaction details, and it sends back tax lines — which taxes apply, at which rates, how much, and how much can be recovered. That means one setup, consistent answers, and one place for the tax team to manage.</p>`,
    },
    {
      type: 'slides',
      title: 'Regime to rate: the building blocks',
      slides: [
        {
          icon: '🏛️',
          title: 'Tax regime',
          html: `<p>A <strong>tax regime</strong> groups similar taxes for a country or region where a separate tax applies, and holds shared defaults and rules. Oracle’s examples: a US <em>Sales and Use Tax</em> regime grouping state, county and district taxes, and a UK regime for <em>GB VAT</em>. First-party legal entities and business units that must follow the regime are linked to it.</p>`,
        },
        {
          icon: '💷',
          title: 'Tax',
          html: `<p>Each <strong>tax</strong> inside a regime is one specific charge with its own statuses, rates and rules. In the US regime you might set up a tax for each state, county and city; in the UK, one tax for VAT.</p>`,
        },
        {
          icon: '🗺️',
          title: 'Tax jurisdiction',
          html: `<p>A <strong>tax jurisdiction</strong> links a tax to a place where a tax authority charges it — a state, county, city or a whole country. At transaction time Oracle works out the jurisdiction from the <em>place of supply</em>. A tax needs at least one jurisdiction before it can be used on transactions, and jurisdictions can carry their own rates (for example, a city rate that overrides a county rate).</p>`,
        },
        {
          icon: '🏷️',
          title: 'Tax status',
          html: `<p>A <strong>tax status</strong> describes how taxable something is in this transaction. For UK VAT Oracle gives the example statuses <em>standard</em>, <em>zero</em>, <em>exempt</em> and <em>reduced</em>; for US sales tax, <em>standard</em> and <em>exempt</em>. A status groups one or more rates of the same kind.</p>`,
        },
        {
          icon: '🔢',
          title: 'Tax rate',
          html: `<p>The <strong>tax rate</strong> is the actual percentage (or amount), with effective dates. When a government changes a rate, you end-date the old rate period and add a new one. Rates hang off statuses (status-based rates, typical for VAT) and can vary by jurisdiction (jurisdiction-based rates, typical for US sales tax).</p>`,
        },
        {
          icon: '♻️',
          title: 'Tax recovery rate',
          html: `<p>Businesses that charge VAT can usually claim back (recover) the VAT they pay on purchases. A <strong>tax recovery rate</strong> says what percentage is recoverable — often 100% for a normal VAT-registered business, 0% for organizations whose sales are VAT-exempt.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: name the building block',
      instructions: `<p>Match each example from Sunny’s tax setup to the Oracle Fusion Tax building block.</p>`,
      pairs: [
        { left: '“GB VAT” for everything Sunny UK sells and buys in the UK', right: 'Tax regime' },
        { left: '“Zero-rated” for some foods under UK VAT', right: 'Tax status' },
        { left: '“20% from this effective date”', right: 'Tax rate' },
        { left: '“Lemon County (an imaginary county), where a county sales tax applies”', right: 'Tax jurisdiction' },
        { left: '“100% of purchase VAT can be claimed back”', right: 'Tax recovery rate' },
      ],
      explain: `<p>Think of it as a ladder: regime (the family of taxes for a place), tax (one specific charge), jurisdiction (where it applies), status (how taxable this thing is), rate (the percentage with dates), and recovery rate (how much tax on purchases you can claim back).</p>`,
    },
    {
      type: 'text',
      heading: 'Tax determination: how Oracle picks the tax',
      html: `<p>When Ava saves an invoice or Omar completes a customer transaction, the application asks Fusion Tax to <strong>determine tax</strong>. Oracle describes the work as a series of steps:</p>
<ol>
<li>Determine the applicable <strong>tax regimes</strong> and candidate taxes (based on locations and which regimes the first party — Sunny’s legal entity or business unit — subscribes to).</li>
<li>Determine the <strong>place of supply</strong> and <strong>tax jurisdiction</strong>.</li>
<li>Determine <strong>tax applicability</strong> — does this tax apply at all?</li>
<li>Determine <strong>tax registration</strong>.</li>
<li>Determine the <strong>tax status</strong>.</li>
<li>Determine the <strong>tax rate</strong>.</li>
<li>Determine the <strong>taxable basis</strong> (what amount the rate applies to).</li>
<li>Determine the <strong>tax calculation</strong>.</li>
<li>Determine <strong>tax recovery</strong> (for purchase taxes).</li>
</ol>
<p>At each step, Oracle uses a <strong>default</strong> unless a <strong>tax rule</strong> says otherwise. Tax rules are grouped by rule type (one per step). They are checked in priority order; the first rule that evaluates true wins, and if none does, the default is used. Simple countries can work almost entirely with defaults; complex ones (different rates by origin and destination, taxes on top of taxes) need many rules. Rates can also be adjusted by <strong>tax exceptions</strong> (for certain products) and <strong>tax exemptions</strong> (for certain customers).</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Where the setup lives',
      html: `<p>Tax setup is done in Setup and Maintenance. Oracle’s <em>regime to rate</em> tasks cover tax regimes, taxes, tax jurisdictions, tax statuses and tax rates (for example, the <kbd>Manage Tax Rates and Tax Recovery Rates</kbd> task, and a <kbd>Manage Tax Regimes</kbd> spreadsheet for rapid setup). <strong>Configuration owner</strong> options decide whether a legal entity uses the shared global setup, its own setup, or the shared setup with its own overrides. The <strong>Tax Simulator</strong> lets the tax team test a transaction and see exactly which rules fired — very handy when “tax isn’t calculating as expected”.</p>`,
    },
    {
      type: 'text',
      heading: 'How Receivables and Payables use Fusion Tax',
      html: `<p><strong>Receivables (selling).</strong> When Omar creates an invoice for a customer, Fusion Tax adds tax lines based on Sunny’s location, the customer’s ship-to address, the product and any customer exemption. The tax is billed to the customer and recorded as a liability — at Sunny, <code>2210 Sales Tax Payable</code> — until Sunny pays it to the tax authority.</p>
<p><strong>Payables (buying).</strong> When Ava enters a supplier invoice, Fusion Tax calculates the expected tax (or checks the tax the supplier charged, within tolerances). For VAT, the <strong>recoverable</strong> part becomes an asset or reduction of tax owed (Sunny UK claims it back); the <strong>non-recoverable</strong> part is added to the cost of the purchase. In the US, sales tax on purchases is usually not recoverable, so it simply becomes part of the expense.</p>
<p><strong>Withholding.</strong> Withholding tax can be set up in Payables (simple country-level setup, good for most countries) or in Oracle Fusion Tax (for complex needs with jurisdictions and rules). The withheld amount goes to <code>2220 Withholding Tax Payable</code> until Sunny pays the government. The Payables module covers this in its Taxes and Withholding lesson.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: transaction tax or withholding?',
      instructions: `<p>Sort each situation into the right kind of tax.</p>`,
      categories: ['Transaction tax', 'Withholding tax'],
      items: [
        { text: 'Sunny adds sales tax to Happy Cafe’s invoice', answer: 'Transaction tax' },
        { text: 'Sunny UK pays VAT on cups bought from a UK supplier', answer: 'Transaction tax' },
        { text: 'Sunny keeps back part of a consultant’s fee and pays it to the tax authority', answer: 'Withholding tax' },
        { text: 'The tax amount is shown as an extra line on the supplier invoice total', answer: 'Transaction tax' },
        { text: 'Sunny pays the supplier less than the invoice total because of a government rule, and reports the difference', answer: 'Withholding tax' },
      ],
      explain: `<p>Transaction taxes (sales tax, VAT) are added on top of a sale or purchase. Withholding tax is held back from a payment by the payer and paid directly to the government on the supplier’s behalf.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny bills Happy Cafe with sales tax',
      html: `<p>Happy Cafe buys 200 bottles of lemonade at $2 = <strong>$400</strong>. For teaching, imagine Sunny’s state sales tax regime gives a <strong>standard</strong> status with a <strong>5%</strong> rate for Happy Cafe’s location (a made-up rate — real rates depend on the real state, county and city).</p>`,
      steps: [
        'Omar creates the Receivables invoice for $400 to Happy Cafe’s ship-to address.',
        'Fusion Tax finds the US sales tax regime, works out the jurisdiction from the ship-to address, confirms the tax applies, picks status <em>standard</em> and the 5% rate.',
        'Taxable basis is the line amount, $400, so tax = $400 × 5% = <strong>$20</strong>.',
        'The invoice total is <strong>$420</strong>: $400 revenue plus $20 tax that Sunny collects for the government.',
        'Later, Sunny files its sales tax return and pays the $20 to the tax authority, clearing 2210.',
      ],
      result: `<p>The $20 is <em>not</em> Sunny’s income. Sunny is just collecting it for the government, which is why it is credited to a liability, not to revenue.</p>`,
    },
    {
      type: 'journal',
      title: 'Receivables invoice to Happy Cafe with 5% sales tax',
      lines: [
        { account: '1210 Accounts Receivable (101-300-1210-000-000)', debit: 420, credit: 0 },
        { account: '4110 Lemonade Sales Revenue (101-300-4110-010-000)', debit: 0, credit: 400 },
        { account: '2210 Sales Tax Payable (101-100-2210-000-000)', debit: 0, credit: 20 },
      ],
      note: `<p>The customer owes the full $420. Revenue is only $400. The tax account comes from Oracle’s tax account setup for the tax, so it is the same for every transaction using that tax.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: tax maths',
      instructions: `<p>Use the made-up 5% sales tax rate from the example, and a UK VAT rate of 20%.</p>`,
      html: `<p>City Park Kiosk buys $600 of lemonade. Sales tax is $ {{}} and the invoice total is $ {{}}.</p>
<p>Sunny UK buys £300 of cups plus 20% VAT. The VAT is £ {{}}. If Sunny UK can recover 100% of it, the cost of the cups in the books is £ {{}}.</p>`,
      blanks: [
        { answer: 30 },
        { answer: 630 },
        { answer: 60 },
        { answer: 300, hint: 'Recoverable VAT is not part of the cost' },
      ],
      explain: `<p>$600 × 5% = $30, so the total is $630. £300 × 20% = £60 of VAT. Because Sunny UK recovers all of it from the tax authority, the VAT doesn’t stay as a cost: the cups cost £300. If the recovery rate were 0%, the cost would be £360.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Practice: record City Park Kiosk’s invoice',
      instructions: `<p>Build the Receivables accounting for the $600 sale to City Park Kiosk with $30 sales tax.</p>`,
      accounts: [
        '1210 Accounts Receivable',
        '4110 Lemonade Sales Revenue',
        '2210 Sales Tax Payable',
        '2220 Withholding Tax Payable',
        '1110 Cash – Big River Bank',
      ],
      answer: [
        { account: '1210 Accounts Receivable', debit: 630, credit: 0 },
        { account: '4110 Lemonade Sales Revenue', debit: 0, credit: 600 },
        { account: '2210 Sales Tax Payable', debit: 0, credit: 30 },
      ],
      explain: `<p>The customer owes $630 (debit receivables). Revenue is $600. The $30 belongs to the government, so it is a liability in 2210 — not withholding (2220), which is for amounts held back from supplier payments.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: tax is a team sport',
      html: `<p>Implementers like Jordan set up the engine, but the <strong>tax team</strong> owns the rules and rates and must keep them current — rates change, new jurisdictions appear, and e-invoicing laws keep arriving (Oracle’s quarterly What’s New lists country-specific tax features almost every release). Many larger companies also connect Fusion Tax to an external tax content provider for US sales tax rates. When a number looks wrong, the Tax Simulator and the tax line details on the transaction are your best friends.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Oracle Fusion Tax', def: 'The shared tax engine that calculates and records taxes for Payables, Receivables, Procurement, Expenses and other applications.' },
        { term: 'Tax regime', def: 'A group of similar taxes for a country or region, with shared defaults and rules.' },
        { term: 'Tax jurisdiction', def: 'The place, such as a state, county or country, where a tax authority charges a tax.' },
        { term: 'Tax status', def: 'How taxable an item is in a transaction, such as standard, zero, reduced or exempt.' },
        { term: 'Tax rule', def: 'A rule that overrides the default result at one step of tax determination when its conditions are met.' },
        { term: 'Tax determination', def: 'The step-by-step process Oracle uses to decide which taxes apply and how much to charge.' },
        { term: 'Withholding tax', def: 'Tax held back by the payer from a supplier payment and paid directly to the tax authority.' },
        { term: 'Recoverable tax', def: 'Tax paid on purchases that a business can claim back from the tax authority.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which building block says how taxable an item is, such as standard, zero or exempt?',
          options: ['Tax regime', 'Tax jurisdiction', 'Tax status', 'Tax recovery rate'],
          answer: 2,
          explain: 'A tax status describes the taxable nature of a product in a transaction and groups rates of the same kind.',
        },
        {
          q: 'During tax determination, what happens if no tax rule for a step evaluates as true?',
          options: [
            'The transaction is rejected',
            'Oracle uses the default value for that step',
            'Tax is set to zero for all taxes',
            'The user must type the tax manually',
          ],
          answer: 1,
          explain: 'Rules are evaluated in priority order; if none succeeds, the default for that rule type is used.',
        },
        {
          q: 'On a $400 sale with $20 sales tax, which account is credited $20?',
          options: ['4110 Lemonade Sales Revenue', '1210 Accounts Receivable', '2210 Sales Tax Payable', '2220 Withholding Tax Payable'],
          answer: 2,
          explain: 'Sales tax collected from customers is owed to the government, so it is a liability: 2210 Sales Tax Payable.',
        },
        {
          q: 'What is the main difference between VAT and withholding tax?',
          options: [
            'There is none',
            'VAT is added to sales and purchases; withholding is kept back from a payment by the payer',
            'Withholding is only for customers',
            'VAT only exists in Receivables',
          ],
          answer: 1,
          explain: 'VAT is a transaction tax on the invoice. Withholding tax is deducted by the payer when paying a supplier and sent to the authority.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Implementing Tax (26D) – Regime to Rate Setup', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faitx/regime-to-rate-setup.html' },
    { title: 'Implementing Tax (26D) – Tax Regimes', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faitx/tax-regimes.html' },
    { title: 'Implementing Tax (26D) – Tax Jurisdictions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faitx/tax-jurisdictions.html' },
    { title: 'Implementing Tax (26D) – Tax Statuses', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faitx/tax-statuses.html' },
    { title: 'Implementing Tax (26D) – Overview of Tax Rates', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faitx/overview-of-tax-rates.html' },
    { title: 'Implementing Tax (26D) – Tax Rules', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faitx/tax-rules.html' },
    { title: 'Implementing Tax (26D) – Considerations for Setting Up Withholding Tax', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faitx/considerations-for-setting-up-withholding-tax.html' },
    { title: 'Using Tax (26D) – Tax Determination', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fautx/tax-determination.html' },
    { title: 'Using Tax (26D) – Tax Simulator', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fautx/tax-simulator.html' },
  ],
};
