export default {
  slug: 'taxes-and-withholding',
  title: 'Taxes and Withholding on Invoices',
  minutes: 22,
  summary:
    'Invoices often carry tax. Learn how Oracle Fusion Tax calculates tax lines on Payables invoices, the difference between recoverable and nonrecoverable tax, what self-assessed (use) tax is, how withholding tax is held back from a supplier and paid to the government, and the basics of US 1099 reporting.',
  objectives: [
    'Explain how tax lines are calculated on Payables invoices by Oracle Fusion Tax',
    'Tell apart recoverable, nonrecoverable and self-assessed taxes, with simple examples',
    'Describe withholding tax: calculation point, withholding tax invoices, and the 2220 Withholding Tax Payable account',
    'Outline the US 1099 process and name the main 1099 reports',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The extra coins and the coins held back',
      html: `<p>When you buy a toy, the shop often adds a little extra on the receipt: that is <strong>sales tax</strong>, money the shop collects for the city. Sometimes you get part of that extra back later; sometimes it is just part of the price.</p>
<p>Now imagine your soccer coach hands out prize money to the team, but keeps a few coins from each player to pay the league fee directly, on the players’ behalf. The coach "holds back" money and passes it to the league. That is <span class="hl">withholding</span>.</p>
<p>Payables deals with both: taxes <em>added</em> to supplier bills, and taxes Sunny must <em>hold back</em> from some suppliers and pay to the government instead.</p>`,
    },
    {
      type: 'text',
      heading: 'Who calculates the tax? Oracle Fusion Tax',
      html: `<p>Ava does not work out tax rates by hand. Payables is connected to <strong>Oracle Fusion Tax</strong>, a central place that stores tax regimes, taxes, rates and rules for every country Sunny works in. Fusion Tax is shared by Payables, Purchasing, Receivables and Expenses, so the same rules apply everywhere.</p>
<p>How does it decide? Each invoice carries <strong>tax determinants</strong>: who the supplier is and where they are registered, where the goods are shipped from and to, what kind of item it is, the business unit and legal entity, and so on. Fusion Tax runs its <strong>tax determination</strong> rules on these facts and decides which taxes apply and at what rate. Taxes are calculated automatically when the invoice is validated, when you open the tax lines, or with the <em>Calculate Taxes</em> action.</p>
<p>For invoices <strong>matched to a purchase order</strong>, the tax information from the PO is copied and tax is recalculated using the rate valid on the <strong>invoice date</strong>. If the invoice tax differs from the PO tax (price change, rate change, currency change), Oracle records special tax variance distributions.</p>
<p>Ava can review the tax lines and, depending on security and setup, override them or enter manual tax lines. The full tax setup is covered later in the <em>Oracle Fusion Tax</em> lesson.</p>`,
    },
    {
      type: 'table',
      caption: 'Kinds of tax you will meet on supplier invoices',
      headers: ['Kind', 'Plain meaning', 'Sunny example'],
      rows: [
        ['<strong>Recoverable tax</strong>', 'Tax paid to a supplier that the company can claim back from the tax authority. It is not a cost.', 'Sunny Lemonade UK Ltd pays 20% VAT on cups and claims it back on its VAT return.'],
        ['<strong>Nonrecoverable tax</strong>', 'Tax that can’t be claimed back, so it becomes part of the cost of what was bought.', 'US sales tax on cleaning supplies for the kitchen.'],
        ['<strong>Exclusive tax</strong>', 'Tax added on top of the price.', '$100 + $6 tax = $106.'],
        ['<strong>Inclusive tax</strong>', 'Tax already inside the price.', '£120 including £20 VAT.'],
        ['<strong>Self-assessed tax</strong>', 'Tax the supplier did NOT charge, but the buyer must calculate and pay itself.', 'Use tax on sugar bought from an out-of-state supplier.'],
        ['<strong>Withholding tax</strong>', 'Tax the buyer holds back from the supplier’s payment and pays to the government.', 'A required 10% held back from a contractor’s invoice.'],
      ],
    },
    {
      type: 'example',
      title: 'Recoverable vs. nonrecoverable in one picture',
      html: `<p>Sunny Lemonade UK Ltd buys cups for £100 + £20 VAT = £120. Because the UK company is VAT-registered and the cups are for its taxable business, the £20 is <strong>recoverable</strong>: it goes to a tax recoverable account, not to cup cost. Cup cost is £100.</p>
<p>Sunny Lemonade US Inc. buys kitchen cleaning supplies for $100 + $6 sales tax. US sales tax is generally not recoverable, so the $6 is <strong>nonrecoverable</strong> and the cleaning supplies cost $106.</p>`,
      result: `<p>Same idea, different accounting: recoverable tax sits in a tax account until it is claimed; nonrecoverable tax is just part of the cost.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Name that tax',
      instructions: `<p>Put each situation in the right bucket.</p>`,
      categories: ['Recoverable', 'Nonrecoverable', 'Self-assessed', 'Withholding'],
      items: [
        { text: 'Sunny UK pays 20% VAT on cups and claims it back on its VAT return', answer: 'Recoverable' },
        { text: 'Sunny US pays sales tax on kitchen cleaning supplies and can’t claim it back', answer: 'Nonrecoverable' },
        { text: 'An out-of-state supplier charges no tax, so Sunny calculates use tax and pays the state itself', answer: 'Self-assessed' },
        { text: 'Sunny keeps 10% of a contractor’s invoice and pays it to the tax authority', answer: 'Withholding' },
        { text: 'An overseas supplier sells a service to Sunny UK without charging VAT, and Sunny UK accounts for the VAT itself under reverse charge', answer: 'Self-assessed' },
      ],
      explain: `<p>Recoverable tax is claimed back (not a cost); nonrecoverable tax becomes part of the cost; self-assessed tax is tax the buyer calculates and pays because the supplier didn’t charge it; withholding is money held back from the supplier and paid to the government.</p>`,
    },
    {
      type: 'text',
      heading: 'Self-assessed tax (use tax)',
      html: `<p>Sometimes a supplier doesn't charge tax even though tax is due, for example because the supplier isn't registered in the place where the goods are delivered. The buyer must then <strong>self-assess</strong>: calculate the tax and pay it directly to the tax authority. In the US this is commonly called <strong>use tax</strong>; in Europe a similar idea is called <strong>reverse charge</strong>.</p>
<p>In Oracle Fusion, Fusion Tax can mark a tax line as <strong>self-assessed</strong> based on registration rules. The key behaviors:</p>
<ul>
<li>The self-assessed tax <strong>doesn't increase the invoice total</strong>; the supplier is paid only what they billed.</li>
<li>The tax is still visible in the detail tax lines, and accounting credits a <strong>tax liability</strong> account instead of the supplier liability.</li>
</ul>`,
    },
    {
      type: 'journal',
      title: 'Sugar from an out-of-state supplier: $200 invoice plus 6% self-assessed use tax',
      lines: [
        { account: '5120 Sugar Cost (101-200-5120-010-000)', debit: 212, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 0, credit: 200 },
        { account: '2210 Sales Tax Payable (101-100-2210-000-000)', debit: 0, credit: 12 },
      ],
      note: `<p>The supplier is owed $200. Sunny owes $12 of use tax to the state, which Priya will pay with the tax return. Sunny uses 2210 for all sales and use tax it owes. (For simplicity this invoice isn't PO-matched.)</p>`,
    },
    {
      type: 'text',
      heading: 'Withholding tax: holding money back for the government',
      html: `<p>Some tax laws say: "When you pay certain suppliers, keep part of the money and send it to us." Common reasons are taxes on contractors or foreign suppliers, or a supplier who hasn't given a valid tax ID (in the US this is called <em>backup withholding</em>).</p>
<p>In Oracle Fusion the main switches are on the <strong>Manage Tax Reporting and Withholding Tax Options</strong> page:</p>
<ul>
<li><strong>Apply Withholding</strong>: turn withholding on for the business unit.</li>
<li><strong>Calculation Point</strong>: <em>Invoice</em> (withheld at invoice validation, based on the invoice amount) or <em>Payment</em> (withheld when payments are created in a Payment Process Request or with a Quick payment, based on the payment amount).</li>
<li><strong>Tax Invoice Creation Point</strong>: when Oracle automatically creates the <strong>withholding tax invoice</strong> to the tax authority.</li>
<li><strong>Allow Manual Withholding</strong>, <strong>Include Discount</strong>, <strong>Rounding Level</strong> and others.</li>
</ul>
<p>Other setup steps: create each <strong>tax authority as a supplier</strong> with supplier type <em>Tax Authority</em>, create <strong>withholding tax codes</strong> (rates) and <strong>withholding tax classifications</strong> (groups of codes), give suppliers their withholding details, and define <strong>certificates</strong> for suppliers with special rates.</p>`,
    },
    {
      type: 'flow',
      title: 'Withholding at invoice validation, step by step',
      steps: [
        { icon: '🧾', label: 'Invoice entered', detail: 'A $1,000 installation invoice; the line has a withholding tax classification.' },
        { icon: '✅', label: 'Validate', detail: 'Fusion Tax creates a withholding line of −$100. Unpaid amount becomes $900.' },
        { icon: '🏛️', label: 'Tax authority invoice', detail: 'Oracle creates a $100 withholding tax invoice to the tax authority supplier.' },
        { icon: '💸', label: 'Pay supplier', detail: 'The contractor receives $900.' },
        { icon: '📮', label: 'Pay the government', detail: 'The $100 is paid to the tax authority by its due date.' },
      ],
    },
    {
      type: 'example',
      title: 'Withholding on Stand Builders’ installation invoice',
      html: `<p>Imagine the tax rules where Sunny operates require 10% withholding on installation services. Stand Builders LLC sends a <strong>$1,000</strong> invoice to install kitchen equipment. Sunny withholds at <strong>invoice validation</strong> and creates the tax authority invoice at the same time. (The rate and rule are made up for teaching; real rates depend on the country and the supplier.)</p>`,
      steps: [
        'Ava enters the invoice; the line gets the withholding tax classification from the supplier setup.',
        'On validation, a withholding tax line of −$100 appears. Withheld amount: $100. The installment now shows $900 unpaid.',
        'Oracle creates a withholding tax invoice for $100 to the tax authority supplier.',
        'The PPR pays Stand Builders $900. Later, the $100 is paid to the tax authority.',
      ],
    },
    {
      type: 'journal',
      title: 'Installation invoice validated, with $100 withheld',
      lines: [
        { account: '1510 Equipment (Fixed Assets) (101-200-1510-000-000)', debit: 1000, credit: 0 },
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 0, credit: 900 },
        { account: '2220 Withholding Tax Payable (101-100-2220-000-000)', debit: 0, credit: 100 },
      ],
      note: `<p>Installation is part of the equipment cost. The supplier is owed $900; the government is owed $100.</p>`,
    },
    {
      type: 'journal',
      title: 'Payments: $900 to Stand Builders and $100 to the tax authority',
      lines: [
        { account: '2110 Accounts Payable – Trade (101-100-2110-000-000)', debit: 900, credit: 0 },
        { account: '2220 Withholding Tax Payable (101-100-2220-000-000)', debit: 100, credit: 0 },
        { account: '1110 Cash – Big River Bank (101-100-1110-000-000)', debit: 0, credit: 1000 },
      ],
      note: `<p>Shown as one combined entry for simplicity. In Oracle, the $100 withholding tax invoice to the tax authority is its own invoice with its own payment, so the money flows through the authority’s liability before it is paid. Either way, 2220 ends at zero once the government is paid.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: withholding gotchas',
      html: `<ul>
<li>Automatic withholding is calculated <strong>only once</strong>. If you change a validated invoice when withholding is at invoice time, adjust the withholding manually (this needs <em>Allow manual withholding</em>).</li>
<li>Automatic withholding isn't calculated for <strong>Manual</strong> payments or <strong>Refunds</strong> when the calculation point is Payment.</li>
<li>If you <strong>void</strong> a payment where tax was withheld at payment, Oracle creates a reversing invoice for the tax authority.</li>
<li>Reports: <strong>Payables Withholding Tax Report</strong> (by invoice or supplier), <strong>Payables Withholding Tax by Tax Authority Report</strong>, and the <strong>Payables Withholding Tax Letter</strong>, a periodic letter to suppliers listing what was withheld.</li>
</ul>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: withholding on the kitchen rent',
      instructions: `<p>Sunny’s landlord bills <strong>$2,000</strong> for kitchen rent. In this example the rules require <strong>10%</strong> withholding, calculated at invoice validation. Build the journal when the invoice is validated and accounted.</p>`,
      accounts: ['6110 Rent', '2110 Accounts Payable – Trade', '2220 Withholding Tax Payable', '2210 Sales Tax Payable', '1110 Cash – Big River Bank'],
      answer: [
        { account: '6110 Rent', debit: 2000, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 1800 },
        { account: '2220 Withholding Tax Payable', debit: 0, credit: 200 },
      ],
      explain: `<p>The full rent ($2,000) is Sunny’s cost. Sunny owes the landlord only $1,800 and owes the $200 it held back to the tax authority, recorded in 2220 Withholding Tax Payable (not the sales tax account).</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Check the withholding numbers',
      instructions: `<p>Use the rent example above. Fill in the amounts.</p>`,
      html: `<p>After validation the withholding tax line on the invoice is −$ {{}} and the installment shows $ {{}} unpaid. Oracle creates a withholding tax invoice of $ {{}} to the supplier whose supplier type is {{}}.</p>`,
      blanks: [
        { answer: 200 },
        { answer: 1800 },
        { answer: 200 },
        { answer: ['Tax Authority', 'tax authority'], hint: 'A special supplier type' },
      ],
      explain: `<p>Oracle adds a negative withholding line (−$200), so the landlord’s installment is $1,800. The withheld $200 becomes a separate invoice to the tax authority, which is set up as a supplier with type Tax Authority.</p>`,
    },
    {
      type: 'text',
      heading: 'US 1099 reporting: telling the IRS what you paid',
      html: `<p>In the United States, companies must report to the Internal Revenue Service (IRS) certain payments made to some suppliers, for example contractors and landlords, using the <strong>Form 1099</strong> family (such as 1099-MISC and 1099-NEC). This is about <em>reporting</em> payments, not adding tax to invoices. Here is the Oracle flow:</p>
<ol>
<li><strong>Set up</strong>: on the supplier’s <strong>Income Tax</strong> tab, mark the supplier as federally reportable and enter its tax ID and default <strong>income tax type</strong>. Define <strong>reporting entities</strong> (which balancing segment values belong to which tax-reporting company) and, if you use combined federal/state filing, <strong>income tax regions</strong>.</li>
<li><strong>Enter and pay invoices</strong>: each invoice distribution gets an <strong>Income Tax Type</strong> (and region), usually defaulted from the supplier. Ava can change it or clear it for non-reportable lines.</li>
<li><strong>Clean up</strong>: run the <strong>US 1099 Invoice Exceptions Report</strong> and <strong>US 1099 Supplier Exceptions Report</strong> to find missing or wrong data. The <strong>Update and Report Income Tax Details</strong> process can update distributions from the supplier setup.</li>
<li><strong>Report at year end</strong>: the <strong>US 1099 Report</strong> produces the forms, the <strong>US 1099 Electronic Media Report</strong> produces the electronic file, and the <strong>US 1099 Payments Report</strong> lists payments to 1099 suppliers.</li>
</ol>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Order the US 1099 year',
      instructions: `<p>Put Sunny’s US 1099 work in the order it happens.</p>`,
      items: [
        'Mark the supplier as federally reportable and enter its tax ID and income tax type',
        'Enter and pay invoices, with an income tax type on each reportable distribution',
        'Run the US 1099 Invoice Exceptions and Supplier Exceptions reports and fix problems',
        'Run Update and Report Income Tax Details if distributions need updating',
        'Run the US 1099 Report and the US 1099 Electronic Media Report at year end',
      ],
      explain: `<p>Clean data at the start (supplier setup) makes the year end easy. Exceptions are fixed before the final forms and electronic file are produced.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'New in release 26D: 1099 electronic filing changes',
      html: `<p>Oracle’s 26D What’s New describes support for the IRS <strong>Information Returns Intake System (IRIS)</strong>: the US 1099 Electronic Media Report can produce IRIS-ready CSV files for Forms 1099-MISC, 1099-NEC and 1099-INT (the US 1099-G Electronic Media Report does the same for 1099-G), and a new XML process supports filing through tax partners. Also, the <strong>US 1096</strong> summary form is now generated automatically as part of the US 1099 Report (and the US 1099-G Report), so it no longer needs to be run separately. If you learned 1099s on an older release, check these changes.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: tax is decided at onboarding',
      html: `<p>Most tax problems in Payables start on the supplier record: a missing tax registration, a wrong country, a missing tax ID, or no income tax type. Fixing the supplier before the first invoice saves hours of corrections and awkward calls in January when 1099s are due. When in doubt about a tax treatment, Ava asks the tax team; Payables applies the rules, the tax team owns them.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Oracle Fusion Tax', def: 'The central Oracle service that stores tax rules and calculates taxes for Payables, Purchasing, Receivables and Expenses.' },
        { term: 'Recoverable tax', def: 'Tax paid to a supplier that the company can claim back, so it is not part of the cost.' },
        { term: 'Nonrecoverable tax', def: 'Tax that cannot be claimed back and becomes part of the cost of what was bought.' },
        { term: 'Self-assessed tax', def: 'Tax the supplier did not charge but the buyer must calculate and pay itself, like US use tax.' },
        { term: 'Withholding tax', def: 'Tax a buyer holds back from a supplier payment and pays to the tax authority on the supplier’s behalf.' },
        { term: 'Calculation point', def: 'The setting that decides whether withholding is calculated at invoice validation or at payment.' },
        { term: 'Form 1099', def: 'A family of US forms used to report certain payments made to suppliers to the IRS.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Sunny Lemonade UK Ltd pays £20 VAT on cups and can claim it back. How should the £20 be treated?',
          options: ['As part of cup cost', 'As recoverable tax, in a tax account, not cup cost', 'As withholding tax', 'It should be ignored'],
          answer: 1,
          explain: 'Recoverable tax is claimed back from the tax authority, so it is not a cost of the cups.',
        },
        {
          q: 'A supplier doesn’t charge tax, but Sunny must pay use tax itself. What happens to the invoice total in Oracle?',
          options: [
            'It increases by the tax amount',
            'It stays the same; the self-assessed tax is recorded as a tax liability, not owed to the supplier',
            'The invoice is put on hold',
            'The tax is added to the supplier payment',
          ],
          answer: 1,
          explain: 'Self-assessed tax doesn’t increase what the supplier is paid; it is credited to a tax liability account.',
        },
        {
          q: 'A $1,000 invoice has 10% withholding calculated at invoice validation. How much is the supplier paid?',
          options: ['$1,000', '$1,100', '$900', '$100'],
          answer: 2,
          explain: 'The $100 is withheld and owed to the tax authority (2220), so the supplier receives $900.',
        },
        {
          q: 'Which report helps find suppliers with missing or wrong US 1099 information before year end?',
          options: ['Payables Trial Balance Report', 'US 1099 Supplier Exceptions Report', 'Payables Cash Requirement Report', 'Payables Key Indicators Report'],
          answer: 1,
          explain: 'The US 1099 Supplier Exceptions Report lists suppliers with inaccurate or incomplete 1099 information.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Taxes on Invoices', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/taxes-on-invoices.html' },
    { title: 'Examples of Tax Handling on Payables Transactions (Using Tax)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fautx/examples-of-tax-handling-on-payables-transactions.html' },
    { title: 'How Self-Assessed Taxes Are Processed (Implementing Tax)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faitx/how-self-assessed-taxes-are-processed.html' },
    { title: 'Define Payables Setup for Withholding Tax', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/define-payables-setup-for-withholding-tax.html' },
    { title: 'Withholding Tax Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/withholding-tax-options.html' },
    { title: 'Calculation Point Options', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/calculation-point-options.html' },
    { title: 'What happens if I void a payment?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/what-happens-if-i-void-a-payment.html' },
    { title: 'How You Use US 1099 Reporting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/us-1099-reporting-explained.html' },
    { title: 'Oracle Fusion Payables Predefined Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/oracle-fusion-payables-predefined-reports.html' },
    { title: 'Oracle Fusion Cloud Financials 26D What’s New: Electronic Filing of Forms 1099 using IRIS', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f50748.htm' },
  ],
};
