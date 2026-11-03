export default {
  slug: 'what-are-assets',
  title: 'What Are Fixed Assets?',
  minutes: 13,
  summary:
    'Fixed assets are the big things a company buys to use for years — machines, buildings, vehicles, lemonade stands. Learn the difference between capitalizing and expensing, what useful life means, why we spread the cost over time, and how Oracle Fusion Assets follows an asset from purchase to retirement.',
  objectives: [
    'Explain what a fixed asset is and how it differs from an everyday expense',
    'Describe capitalizing, useful life and depreciation in simple words',
    'Show why spreading the cost of Sunny’s $6,000 lemonade stand gives a truer picture of profit',
    'Name the stages of the asset lifecycle and the Oracle Fusion Assets landing page infotiles',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Lemons vs. the lemonade stand',
      html: `<p>When you run a lemonade stand, you buy <strong>lemons</strong> every week. You squeeze them, sell the lemonade, and the lemons are gone. They were useful for a few days.</p>
<p>But the <strong>stand itself</strong> — the wooden table, the roof, the sign — you bought once, and you will use it all summer, next summer, and the summer after that. It slowly gets scratched and faded, but it keeps working for years.</p>
<p>Things like lemons are <strong>expenses</strong>: used up quickly. Things like the stand are <strong>fixed assets</strong>: kept and used for a long time. <span class="hl">Because the stand helps you earn money for years, it would be unfair to count its whole price against just one week of sales.</span></p>`,
    },
    {
      type: 'text',
      heading: 'What makes something a fixed asset?',
      html: `<p>A <strong>fixed asset</strong> (also called property, plant and equipment, or a capital asset) is something a company:</p>
<ul>
<li><strong>owns or controls</strong>,</li>
<li><strong>uses to run the business</strong> (not to resell to customers), and</li>
<li><strong>expects to use for more than one year</strong>.</li>
</ul>
<p>Examples: buildings, kitchen equipment, delivery vans, computers, furniture — and Sunny’s lemonade stands. Lemons and cups are <em>not</em> fixed assets: they are used up quickly (and lemons held for making lemonade are inventory).</p>
<p>Most companies also set a <strong>capitalization threshold</strong>: a minimum cost. Below it, even long-lasting items (like a $15 stapler) are simply expensed because tracking them for years is not worth the effort. Sunny’s policy, set by Sam, is: items costing <strong>$1,000 or more</strong> and lasting <strong>more than a year</strong> become fixed assets.</p>`,
    },
    {
      type: 'table',
      caption: 'Capitalize or expense? Sunny Lemonade examples',
      headers: ['Purchase', 'Cost', 'Lasts more than a year?', 'Decision'],
      rows: [
        ['1,000 lemons from Lemon Grove Farms', '$500', 'No', 'Expense / inventory (account 1310 or 5110)'],
        ['Electricity for June from Bright Power Utility', '$150', 'No', 'Expense (6120 Electricity)'],
        ['A new lemonade stand from Stand Builders LLC', '$6,000', 'Yes, about 5 years', '<strong>Capitalize as a fixed asset</strong> (1510 Equipment)'],
        ['A stapler for the office', '$15', 'Yes', 'Expense — below the $1,000 threshold'],
        ['A commercial juicer for the kitchen', '$2,400', 'Yes', '<strong>Capitalize as a fixed asset</strong>'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: capitalize or expense?',
      instructions: `<p>Use Sunny’s policy (<strong>$1,000 or more</strong> and lasting <strong>more than a year</strong> = fixed asset) to sort each purchase.</p>`,
      categories: ['Capitalize as a fixed asset', 'Expense (or inventory)'],
      items: [
        { text: 'A delivery van for $18,000, used for 6 years', answer: 'Capitalize as a fixed asset' },
        { text: 'Sugar from Sweet Sugar Co. for $200', answer: 'Expense (or inventory)' },
        { text: 'A walk-in refrigerator for $4,500, expected to last 10 years', answer: 'Capitalize as a fixed asset' },
        { text: 'A $40 kitchen thermometer that lasts 3 years', answer: 'Expense (or inventory)' },
        { text: 'June rent for the kitchen, $1,200', answer: 'Expense (or inventory)' },
        { text: 'A $1,500 laptop for Priya, used for 3 years', answer: 'Capitalize as a fixed asset' },
      ],
      explain: `<p>Both tests must pass. The thermometer lasts years but is below $1,000. Rent is over $1,000 but only buys one month of use, so it is an expense. The van, refrigerator and laptop pass both tests.</p>`,
    },
    {
      type: 'slides',
      title: 'Four words you need',
      slides: [
        {
          icon: '📥',
          title: 'Capitalize',
          html: `<p>To <strong>capitalize</strong> a purchase means to record it as an <strong>asset</strong> on the balance sheet instead of as an expense right away. The $6,000 stand goes into account <code>1510 Equipment (Fixed Assets)</code>.</p>`,
        },
        {
          icon: '⏳',
          title: 'Useful life',
          html: `<p>The <strong>useful life</strong> is how long we expect to use the asset. Sunny expects a stand to last <strong>5 years (60 months)</strong>. It is an estimate, set by company policy, and can be changed later if reality is different.</p>`,
        },
        {
          icon: '📉',
          title: 'Depreciation',
          html: `<p><strong>Depreciation</strong> is spreading the asset’s cost over its useful life as an expense. Straight-line: $6,000 ÷ 60 months = <strong>$100 per month</strong> to account <code>6140 Depreciation Expense</code>.</p>`,
        },
        {
          icon: '⚖️',
          title: 'Net book value',
          html: `<p><strong>Net book value (NBV)</strong> = cost − accumulated depreciation. After one year: $6,000 − $1,200 = <strong>$4,800</strong>. Accumulated depreciation is kept in its own account, <code>1590 Accumulated Depreciation</code>.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: the stand’s numbers',
      instructions: `<p>The stand costs <strong>$6,000</strong>, has a <strong>60-month</strong> life, no salvage value, and is depreciated straight-line.</p>`,
      html: `<p>Depreciation per month: \${{}}</p><p>Depreciation per year: \${{}}</p><p>Accumulated depreciation after 24 months: \${{}}</p><p>Net book value after 24 months: \${{}}</p>`,
      blanks: [
        { answer: 100 },
        { answer: 1200 },
        { answer: 2400 },
        { answer: 3600 },
      ],
      explain: `<p>$6,000 ÷ 60 = $100 a month, or $1,200 a year. After 24 months, accumulated depreciation is 24 × $100 = $2,400, so the net book value is $6,000 − $2,400 = $3,600.</p>`,
    },
    {
      type: 'example',
      title: 'Why spreading the cost tells the truth',
      html: `<p>Sunny’s new stand at City Park costs $6,000 and is used from June 2026. It helps sell about $1,500 of lemonade every month. Compare two ways of counting it:</p>`,
      steps: [
        '<strong>Expense it all at once:</strong> June shows $1,500 sales − $6,000 stand = a <strong>$4,500 loss</strong>. July to the end of 2030 show the stand as free. Sam would think June was a disaster and later months were amazing.',
        '<strong>Capitalize and depreciate:</strong> every month shows $1,500 sales − $100 depreciation (plus lemons, cups and so on). Each month carries a fair share of the stand that helped earn its sales.',
        'Accountants call this idea <strong>matching</strong>: put costs in the same periods as the sales they help create.',
      ],
      result: `<p>Same $6,000 in total, but the second way gives Sam a much truer picture of each month’s profit. That is why accounting standards require long-lived assets to be capitalized and depreciated.</p>`,
    },
    {
      type: 'journal',
      title: 'The big idea in two entries (simplified)',
      lines: [
        { account: '1510 Equipment (Fixed Assets) — stand bought', debit: 6000, credit: 0 },
        { account: '2110 Accounts Payable – Trade — owed to Stand Builders LLC', debit: 0, credit: 6000 },
        { account: '6140 Depreciation Expense — one month', debit: 100, credit: 0 },
        { account: '1590 Accumulated Depreciation — one month', debit: 0, credit: 100 },
      ],
      note: `<p>In real Oracle Fusion the purchase passes through an <strong>asset clearing account</strong> between Payables and Assets. You will see the exact journals in the Adding Assets lesson. Here we only show the idea: buy once as an asset, then expense it a little each month.</p>`,
    },
    {
      type: 'lab',
      tool: 'depreciation',
      title: 'Lab: watch the stand depreciate',
      intro: `<p>Here is the $6,000 stand on a 60-month straight-line schedule. Scroll through the months and watch accumulated depreciation grow while net book value shrinks to zero. Then try changing the life to 84 months (7 years) — what happens to the monthly amount?</p>`,
      preset: { cost: 6000, salvage: 0, lifeMonths: 60, method: 'sl' },
    },
    {
      type: 'flow',
      title: 'The life of a fixed asset',
      steps: [
        { icon: '🛒', label: 'Acquire', detail: 'Leo orders the stand; Ava enters Stand Builders’ invoice in Payables.' },
        { icon: '➕', label: 'Add', detail: 'The invoice line flows to Assets and becomes asset number 1001 in the corporate book.' },
        { icon: '📉', label: 'Depreciate', detail: 'Every month, depreciation is calculated and accounted.' },
        { icon: '🔧', label: 'Change', detail: 'Adjust cost or life, transfer to a new location or cost center, or reclassify.' },
        { icon: '🏁', label: 'Retire', detail: 'Sell, scrap or lose the asset; record any gain or loss.' },
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: meet Oracle Assets',
      html: `<p>Oracle calls the product <strong>Oracle Assets</strong> (documented in the <em>Using Assets</em> and <em>Implementing Assets</em> guides). It automates asset additions, transfers, disposals, reclassifications, financial adjustments and legacy conversions, and integrates directly with <strong>Payables</strong>, <strong>Project Costing</strong>, <strong>Receiving</strong> and <strong>Subledger Accounting</strong>.</p>
<p>Asset accountants work from the <strong>Assets landing page</strong>, which shows infotiles for <kbd>Additions</kbd>, <kbd>Adjustments</kbd>, <kbd>Transfers</kbd>, <kbd>Retirements</kbd> and <kbd>Depreciation</kbd>, plus panel tabs for tasks such as <kbd>Add Asset</kbd>, <kbd>Adjust Assets</kbd>, <kbd>Transfer Assets</kbd>, <kbd>Retire Assets</kbd> and <kbd>Inquire Assets</kbd>. Oracle delivers job roles such as <strong>Asset Accountant</strong> and <strong>Asset Accounting Manager</strong>.</p>
<p>Labels may differ slightly by release, Redwood pages and your security.</p>`,
    },
    {
      type: 'table',
      caption: 'Assets landing page infotiles in plain words',
      headers: ['Infotile', 'What it shows', 'Typical action'],
      rows: [
        ['<strong>Additions</strong>', 'New asset lines waiting for action: Incomplete, Exceptions, Ready to Post.', 'Fill in missing details, fix errors, then <kbd>Post All</kbd>.'],
        ['<strong>Adjustments</strong>', 'Financial changes in progress, with old vs. new details.', 'Review and complete.'],
        ['<strong>Transfers</strong>', 'Assets being moved to new locations, employees or expense accounts.', 'Review and complete.'],
        ['<strong>Retirements</strong>', 'Retirements that are Incomplete, in Exceptions, or Ready to Post.', 'Complete and post.'],
        ['<strong>Depreciation</strong>', 'Where you run depreciation for the period.', 'Run <kbd>Calculate Depreciation</kbd>, with or without closing the period.'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'New AI helpers (2026)',
      html: `<p>Oracle’s recent updates added conversational assistants for Assets: a <strong>Fixed Asset Inquiry Assistant</strong> (26C) to look up asset details and current period activity, and in 26D an <strong>Asset Additions Assistant</strong> and a <strong>Depreciation Expense Projection Assistant</strong>. They sit on top of the same books, categories and processes you will learn in this module.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Mistakes in the capitalize-or-expense decision are a classic audit finding. Write the capitalization policy down (threshold, useful lives per type of asset), get it approved by the CFO, and make sure Payables, Procurement and the asset team all follow it. In Oracle, the threshold can even be checked automatically.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Fixed asset', def: 'Something a company owns and uses to run the business for more than a year, like equipment or a building.' },
        { term: 'Capitalize', def: 'To record a purchase as an asset on the balance sheet instead of as an immediate expense.' },
        { term: 'Useful life', def: 'How long the company expects to use an asset, for example 5 years.' },
        { term: 'Depreciation', def: 'Spreading the cost of an asset over its useful life as an expense.' },
        { term: 'Accumulated depreciation', def: 'The total depreciation recorded for an asset so far, kept in its own contra-asset account.' },
        { term: 'Net book value', def: 'An asset’s cost minus its accumulated depreciation.' },
        { term: 'Capitalization threshold', def: 'The minimum cost for an item to be recorded as a fixed asset instead of an expense.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which purchase is a fixed asset for Sunny Lemonade?',
          options: ['1,000 lemons for $500', 'The June electricity bill of $150', 'A $6,000 lemonade stand used for 5 years', 'A $15 stapler'],
          answer: 2,
          explain: 'The stand is used for years and costs more than the $1,000 threshold. Lemons and electricity are used up; the stapler is below the threshold.',
        },
        {
          q: 'The $6,000 stand has a 5-year (60-month) life and no salvage value. What is the straight-line depreciation per month?',
          options: ['$50', '$100', '$500', '$1,200'],
          answer: 1,
          explain: '$6,000 ÷ 60 months = $100 per month.',
        },
        {
          q: 'Why do accountants depreciate the stand instead of expensing $6,000 in June?',
          options: [
            'To pay less to the supplier',
            'To match the cost with the many months of sales the stand helps earn',
            'Because banks require it',
            'Because the stand gets more valuable',
          ],
          answer: 1,
          explain: 'Depreciation follows the matching idea: costs are recognized in the periods that benefit from the asset.',
        },
        {
          q: 'After 12 months, what is the stand’s net book value?',
          options: ['$6,000', '$5,900', '$4,800', '$1,200'],
          answer: 2,
          explain: 'Accumulated depreciation is 12 × $100 = $1,200, so NBV = $6,000 − $1,200 = $4,800.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Overview of Asset Lifecycle Management', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/overview-of-asset-lifecycle-management.html' },
    { title: 'Overview of Using the Assets Landing Page', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/overview-of-using-the-assets-landing-page.html' },
    { title: 'Overview of Capitalization Threshold Amounts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/overview-of-capitalization-threshold-amounts.html' },
    { title: 'Asset Accountant (Job Role)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/oafrm/Asset_Accountant_job_roles.html' },
    { title: 'Financials 26C What’s New — Fixed Asset Inquiry Assistant', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26c/fins26c/26C-fin-wn-f49378.htm' },
    { title: 'Financials 26D What’s New — Asset Additions Assistant', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f50889.htm' },
    { title: 'Principles of Accounting, Volume 1 — Long-Term Assets (Chapter 11)', publisher: 'OpenStax', url: 'https://openstax.org/books/principles-financial-accounting/pages/11-why-it-matters' },
  ],
};
