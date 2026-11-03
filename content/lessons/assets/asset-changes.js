export default {
  slug: 'asset-changes',
  title: 'Adjusting, Transferring and Retiring Assets',
  minutes: 20,
  summary:
    'Assets change during their lives: costs get corrected, lives get extended, stands move to new parks, categories get fixed, and one day the asset is sold or scrapped. Learn financial adjustments (expensed vs. amortized), transfers, reclassifications, full and partial retirements with gain or loss, and reinstatements in Oracle Fusion Assets.',
  objectives: [
    'Explain the difference between an expensed and an amortized adjustment and calculate both',
    'Describe what an asset transfer changes (location, employee, expense account) and its rules',
    'Explain reclassification (change category) and its journal effect',
    'Calculate gain or loss on retirement and record the retirement journal',
    'Describe partial retirements and reinstatements',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Life changes for your bike',
      html: `<p>Remember your $300 bike? Over the years, things happen:</p>
<ul>
<li>You add a <strong>$60 basket</strong> — the bike is now worth a bit more to you (an <strong>adjustment</strong>).</li>
<li>You realise it will last <strong>4 years, not 3</strong> (another adjustment).</li>
<li>You move it from your house to your grandma’s house for the summer (a <strong>transfer</strong>).</li>
<li>You notice you wrote it in your notebook under “Toys” instead of “Vehicles” (a <strong>reclassification</strong>).</li>
<li>Finally you <strong>sell</strong> it to your cousin for $80 (a <strong>retirement</strong>) — and you work out if you made a gain or a loss compared to what was left in your notebook.</li>
</ul>
<p>Oracle Assets has a specific transaction for each of these.</p>`,
    },
    {
      type: 'text',
      heading: 'Financial adjustments: changing cost, life or method',
      html: `<p>On the <kbd>Adjust Assets</kbd> panel tab, <kbd>Change Financial Details</kbd> lets you change information such as <strong>cost</strong>, <strong>salvage value</strong>, <strong>depreciation method</strong>, <strong>life</strong>, <strong>prorate convention</strong> and more. In the period you added the asset you can change everything; in later periods Oracle allows changes to cost, salvage value, prorate convention, method, life, rate, bonus rule and ceiling. (A fully retired asset can’t be changed.)</p>
<p>If depreciation has already run, you must choose how to treat the change:</p>
<ul>
<li><strong>Expensed adjustment</strong> — Oracle recalculates as if the new information had always been true, and takes the whole catch-up difference in the <strong>current period</strong> (a one-time adjusting entry).</li>
<li><strong>Amortized adjustment</strong> — Oracle does <strong>not</strong> rewrite the past; it spreads the new remaining amount over the <strong>remaining life</strong>. You can even give the amortization a start date in an earlier period. Note: once you amortize an adjustment for an asset in a book, you can’t expense future adjustments for it in that book.</li>
</ul>
<p>Additional cost can also arrive from Payables: a new invoice line can be <strong>added to an existing asset</strong> (the Cost Adjustment queue you met in Adding Assets).</p>`,
    },
    {
      type: 'example',
      title: 'Two kinds of adjustment for the stand',
      html: `<p><strong>Case A — a forgotten cost (expensed vs. amortized).</strong> After 3 months, Priya finds a $600 delivery charge from Stand Builders that should have been part of the stand’s cost. New cost $6,600 ÷ 60 = $110 a month.</p>`,
      steps: [
        '<strong>Expensed:</strong> with the new cost, 3 months should have been 3 × $110 = $330, but only $300 was taken. Month 4 takes $110 + $30 catch-up = <strong>$140</strong>; afterwards $110 a month.',
        '<strong>Amortized:</strong> remaining amount $6,600 − $300 = $6,300 over the remaining 57 months = about <strong>$110.53</strong> a month from now on; no catch-up.',
        '<strong>Case B — a longer life (amortized).</strong> After 12 months (accumulated $1,200, NBV $4,800), Sam decides stands really last <strong>7 years</strong> (84 months). Remaining life = 84 − 12 = 72 months.',
        'Amortized: $4,800 ÷ 72 = <strong>$66.67</strong> a month from month 13 onward. The first 12 months stay as they were.',
      ],
      result: `<p>Both cases end with the asset fully depreciated at the end of its (new) life. The choice changes only <em>when</em> the difference hits the profit and loss. Your accounting policy usually decides: corrections of errors are often expensed; changes in estimates (like a longer life) are usually amortized going forward.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: expensed or amortized?',
      instructions: `<p>Noah’s juicer cost <strong>$2,400</strong> over <strong>48 months</strong> ($50 a month). After <strong>6 months</strong>, an extra <strong>$480</strong> installation cost is added. New cost $2,880.</p>`,
      html: `<p>New monthly amount on the full life: $2,880 ÷ 48 = \${{}}</p><p><strong>Expensed:</strong> catch-up for 6 past months = 6 × ($60 − $50) = \${{}}, so month 7 depreciation = \${{}}</p><p><strong>Amortized:</strong> remaining amount $2,880 − $300 = \${{}} over 42 months = \${{}} a month</p>`,
      blanks: [
        { answer: 60 },
        { answer: 60 },
        { answer: 120 },
        { answer: 2580 },
        { answer: 61.43, tolerance: 0.01 },
      ],
      explain: `<p>Expensed: the past 6 months were $10 short each, so $60 is caught up in month 7 ($60 + $60 = $120). Amortized: $300 has been taken so far; $2,580 ÷ 42 remaining months ≈ $61.43 a month, with no catch-up.</p>`,
    },
    {
      type: 'text',
      heading: 'Transfers: moving an asset',
      html: `<p>A <strong>transfer</strong> changes an asset’s <strong>assignment</strong>: the <strong>employee</strong> responsible, the <strong>depreciation expense account</strong> (for example a new cost center), and/or the <strong>location</strong>. Use the <kbd>Transfer Assets</kbd> panel tab for one asset, or a mass transfer (or spreadsheet) for many. Oracle’s rules include:</p>
<ul>
<li>You can backdate a transfer to an earlier period, but only within the <strong>current fiscal year</strong>, and only once per asset.</li>
<li>You <strong>can’t</strong> transfer an asset to a future period.</li>
<li>A transfer moves an asset between employees, accounts and locations — <strong>not</strong> from one corporate book to another (Oracle has a separate, opt-in feature for transferring assets between books).</li>
<li>For multi-unit assets you can split units across several assignments, and use <kbd>Adjust Units</kbd> to correct the unit count.</li>
</ul>
<p>After a transfer, future depreciation is charged to the new expense account; when the move crosses cost centers or balancing segments, Oracle’s accounting also moves the asset’s cost and reserve to match.</p>`,
    },
    {
      type: 'example',
      title: 'The stand moves to Sunshine School',
      html: `<p>In April 2027, City Park closes for repairs. Sunny moves stand 1001 to <strong>Sunshine School</strong>, where it will sell <strong>Pink Lemonade</strong>.</p>`,
      steps: [
        'Old assignment: location USA.CA.SUNNYVALE.CITY PARK, expense account <code>101-300-6140-010-000</code> (Sales, Classic Lemonade).',
        'New assignment: location USA.CA.SUNNYVALE.SUNSHINE SCHOOL, expense account <code>101-300-6140-020-000</code> (Sales, Pink Lemonade).',
        'Transfer date: April 1, 2027 (current fiscal year, not in the future ✔).',
        'From APR-27 onward, the $100 monthly depreciation lands on product 020, so Pink Lemonade’s profit includes the cost of the stand that sells it.',
      ],
      result: `<p>The asset number, cost and accumulated depreciation are unchanged — only <em>where</em> it is and <em>who pays</em> for its depreciation changed.</p>`,
    },
    {
      type: 'text',
      heading: 'Reclassification: changing the category',
      html: `<p>A <strong>reclassification</strong> moves an asset to a different <strong>category</strong> — to fix a data entry mistake, or when categories are reorganized. Use <kbd>Change Category</kbd> on the Adjust Assets page (or a mass category change). Two things to know from Oracle:</p>
<ul>
<li>If you reclassify in a period after the asset was added, Oracle creates journals moving the asset’s <strong>cost</strong> and <strong>accumulated depreciation</strong> to the new category’s accounts.</li>
<li>Changing the category does <strong>not</strong> automatically change the depreciation rules to the new category’s defaults. If the method or life should change too, adjust them separately (or use a mass adjustment).</li>
</ul>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: which transaction is it?',
      instructions: `<p>For each situation at Sunny, choose the Oracle Assets transaction you would use.</p>`,
      categories: ['Financial adjustment', 'Transfer', 'Reclassification', 'Retirement'],
      items: [
        { text: 'The juicer was entered as FURNITURE.TABLE by mistake', answer: 'Reclassification' },
        { text: 'The stand moves from City Park to Sunshine School', answer: 'Transfer' },
        { text: 'Sam decides stands last 7 years instead of 5', answer: 'Financial adjustment' },
        { text: 'An old stand is sold to City Park Kiosk', answer: 'Retirement' },
        { text: 'Priya leaves, so the laptop is reassigned to Omar', answer: 'Transfer' },
        { text: 'A $600 delivery charge should have been part of the stand’s cost', answer: 'Financial adjustment' },
        { text: 'A blender is stolen from the kitchen', answer: 'Retirement' },
      ],
      explain: `<p>Cost, life and method changes are financial adjustments. Moving between places, people or expense accounts is a transfer. Fixing the category is a reclassification. When an asset leaves service — sold, stolen, scrapped — it is retired.</p>`,
    },
    {
      type: 'text',
      heading: 'Retirements: saying goodbye to an asset',
      html: `<p>You <strong>retire</strong> an asset when it is no longer in service — sold, scrapped, stolen, lost, damaged or returned. Use the <kbd>Retire Assets</kbd> panel tab (or a spreadsheet / mass retirement). Oracle offers:</p>
<ul>
<li><strong>Full retirement</strong> — the whole asset (all units or the entire cost).</li>
<li><strong>Partial retirement</strong> — some units (a <em>unit retirement</em>, where Oracle works out the cost retired) or part of the cost (a <em>cost retirement</em>). Unit retirements aren’t allowed in tax books or for CIP assets.</li>
<li><strong>Source line retirement</strong> — retire the cost that came from a particular source line.</li>
</ul>
<p>You record the <strong>proceeds of sale</strong> (money received) and any <strong>cost of removal</strong>. Oracle calculates:</p>
<p><code>Gain or loss = Proceeds of sale − Cost of removal − Net book value retired (+ revaluation reserve retired)</code></p>
<p>Positive means a <strong>gain</strong>; negative means a <strong>loss</strong>. The book’s retirement convention decides how much depreciation is taken in the year of retirement.</p>`,
    },
    {
      type: 'example',
      title: 'Selling the stand after three years',
      html: `<p>In June 2029 Sunny replaces stand 1001 and sells the old one to <strong>City Park Kiosk</strong> for <strong>$2,000</strong>. Depreciation has run through May 2029 (36 months).</p>`,
      steps: [
        'Cost $6,000; accumulated depreciation 36 × $100 = <strong>$3,600</strong>; net book value retired = <strong>$2,400</strong>.',
        'Proceeds of sale $2,000; cost of removal $0.',
        'Gain or loss = $2,000 − $0 − $2,400 = <strong>−$400 → a loss of $400</strong>.',
        'Omar bills City Park Kiosk in Receivables. The receipt is recorded against the <em>Proceeds of Sale Clearing</em> account set on the asset book, and Assets clears it when the retirement is accounted.',
      ],
      result: `<p>The stand disappears from the books: its $6,000 cost and $3,600 reserve are both removed, the $2,000 clearing balance is cleared, and the $400 difference is a loss in the profit and loss statement.</p>`,
    },
    {
      type: 'journal',
      title: 'Retirement journal from Oracle Assets (net gain/loss shown on one line)',
      lines: [
        { account: '1590 Accumulated Depreciation', debit: 3600, credit: 0 },
        { account: '1530 Proceeds of Sale Clearing (book account)', debit: 2000, credit: 0 },
        { account: '7130 Gain or Loss on Asset Retirement (book account)', debit: 400, credit: 0 },
        { account: '1510 Equipment (Fixed Assets)', debit: 0, credit: 6000 },
      ],
      note: `<p>Sunny’s chart needs two extra accounts for this, which Jordan added to the asset book’s retirement accounts: <code>1530 Proceeds of Sale Clearing</code> and <code>7130 Gain or Loss on Asset Retirement</code>. By default Oracle uses separate gain and loss accounts for proceeds, cost of removal and net book value retired; companies that want only the net result can point gain and loss to the same account. In Receivables, the cash received is recorded as debit 1110 Cash, credit 1530 Proceeds of Sale Clearing.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Practice: retire the juicer at a gain',
      instructions: `<p>Noah’s juicer (cost <strong>$2,400</strong>) is sold after accumulated depreciation of <strong>$1,800</strong>. The buyer pays <strong>$800</strong>; there is no cost of removal. First work out the gain or loss, then build the retirement journal (one net gain/loss line).</p>`,
      accounts: ['1510 Equipment (Fixed Assets)', '1590 Accumulated Depreciation', '1530 Proceeds of Sale Clearing', '7130 Gain or Loss on Asset Retirement', '6140 Depreciation Expense', '1110 Cash – Big River Bank'],
      answer: [
        { account: '1590 Accumulated Depreciation', debit: 1800, credit: 0 },
        { account: '1530 Proceeds of Sale Clearing', debit: 800, credit: 0 },
        { account: '1510 Equipment (Fixed Assets)', debit: 0, credit: 2400 },
        { account: '7130 Gain or Loss on Asset Retirement', debit: 0, credit: 200 },
      ],
      explain: `<p>NBV retired = $2,400 − $1,800 = $600. Gain = $800 − $0 − $600 = <strong>$200</strong>, so the gain/loss account is <em>credited</em>. Remove the cost (credit 1510) and the reserve (debit 1590), and debit the proceeds clearing account that Receivables credited when the $800 came in.</p>`,
    },
    {
      type: 'slides',
      title: 'Partial retirements and reinstatements',
      slides: [
        {
          icon: '🔢',
          title: 'Retire some units',
          html: `<p>Sunny has asset 1005, <strong>4 blenders</strong> costing $2,000 in total. One is stolen. A <strong>unit retirement</strong> of 1 unit retires $500 of cost (and its share of accumulated depreciation). The asset now has 3 units and $1,500 of cost.</p>`,
        },
        {
          icon: '✂️',
          title: 'Retire part of the cost',
          html: `<p>A <strong>cost retirement</strong> keeps the units unchanged and spreads the retired cost evenly across the assignments — useful when part of a single item is removed, such as the roof of a stand.</p>`,
        },
        {
          icon: '🧮',
          title: 'Several partial retirements in one period',
          html: `<p>Oracle advises running the <strong>Calculate Gains and Losses</strong> process between multiple partial retirements of the same asset in a period.</p>`,
        },
        {
          icon: '↩️',
          title: 'Reinstate a mistake',
          html: `<p>Retired the wrong asset? Use the <kbd>Reinstate Assets</kbd> panel tab. Oracle reverses the retirement entries (cost, reserve, gain/loss, proceeds and removal clearing). If the reinstatement is in a <em>later</em> period, Oracle also catches up the depreciation that was missed; in the <em>same</em> period, no extra depreciation is needed.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: gain or loss?',
      instructions: `<p>Work out each result using: <em>Gain or loss = proceeds − cost of removal − net book value retired</em>. Type a negative number for a loss.</p>`,
      html: `<p>A van with NBV $5,000 is sold for $6,500 with $300 cost of removal: \${{}}</p><p>A stolen blender with NBV $250 and no proceeds: \${{}}</p><p>A fully reserved old stand (NBV $0) scrapped with $100 cost of removal: \${{}}</p>`,
      blanks: [
        { answer: 1200 },
        { answer: -250 },
        { answer: -100 },
      ],
      explain: `<p>$6,500 − $300 − $5,000 = $1,200 gain. A stolen item with no proceeds loses its whole NBV: −$250. A fully reserved asset has no NBV left, but paying to remove it is still a $100 loss.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: retire an asset',
      items: [
        'On the Assets landing page, open the <kbd>Retire Assets</kbd> panel tab.',
        'Search for the asset in the correct book and select it.',
        'Choose a full retirement, <kbd>Retire Units</kbd> or <kbd>Retire Cost</kbd>, and enter the retirement date, type, proceeds of sale and cost of removal.',
        '<kbd>Submit</kbd> (or <kbd>Save</kbd> to keep it as an incomplete draft). Pending retirements appear on the <kbd>Retirements</kbd> infotile until posted.',
        'After accounting, view the gain or loss on the asset in <kbd>Inquire Assets</kbd> or in the <kbd>Asset Retirements Report</kbd>.',
      ],
      note: `<p>Panel tab and button labels can differ slightly by release, Redwood pages and your company’s approval setup (Oracle Assets can route transactions for approval if enabled).</p>
<p>Since update 26C, a company can also switch on the <strong>Retirement Assistant</strong>, an AI helper that retires whole assets (full cost only, up to 25 at a time) through a chat, from the AI Agents page.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li>Do a <strong>physical inventory</strong> at least yearly: walk around, find each tagged asset, and retire what is missing. Oracle Assets has a physical inventory feature to compare counts with the books.</li>
<li>Keep evidence for every retirement (sales receipt, police report, scrap note). Auditors ask for it.</li>
<li>Agree a policy for <strong>expense vs. amortize</strong> so different accountants treat similar changes the same way.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Expensed adjustment', def: 'A change where the full catch-up difference is taken in the current period.' },
        { term: 'Amortized adjustment', def: 'A change where the new remaining amount is spread over the remaining life, without rewriting the past.' },
        { term: 'Transfer', def: 'Changing an asset’s employee, location or depreciation expense account.' },
        { term: 'Reclassification', def: 'Moving an asset to a different asset category.' },
        { term: 'Retirement', def: 'Removing an asset (or part of it) from service, for example because it was sold or scrapped.' },
        { term: 'Proceeds of sale', def: 'The money received when an asset is sold.' },
        { term: 'Reinstatement', def: 'Undoing a retirement so the asset is back in service in the books.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'After 12 months (NBV $4,800), the stand’s total life changes from 60 to 84 months with an amortized adjustment. What is the new monthly depreciation?',
          options: ['$100.00', '$66.67', '$57.14', '$80.00'],
          answer: 1,
          explain: 'Remaining life is 84 − 12 = 72 months, so $4,800 ÷ 72 = $66.67.',
        },
        {
          q: 'Which of these is NOT allowed for an asset transfer in Oracle Assets?',
          options: [
            'Changing the location',
            'Changing the depreciation expense account',
            'Transferring to a future period',
            'Assigning it to a different employee',
          ],
          answer: 2,
          explain: 'Oracle does not allow transfers into a future period. Backdating is allowed within the current fiscal year, once per asset.',
        },
        {
          q: 'An asset with cost $6,000 and accumulated depreciation $3,600 is sold for $2,000 with no removal cost. What is the result?',
          options: ['$2,000 gain', '$400 loss', '$400 gain', '$2,400 loss'],
          answer: 1,
          explain: 'NBV = $2,400. $2,000 − $0 − $2,400 = −$400, a loss.',
        },
        {
          q: 'What does changing an asset’s category NOT do automatically?',
          options: [
            'Move cost and reserve to the new category’s accounts in later periods',
            'Change the depreciation rules to the new category’s defaults',
            'Keep the same asset number',
            'Record the change as a transaction',
          ],
          answer: 1,
          explain: 'Oracle moves the accounting, but the depreciation rules stay as they were until you adjust them yourself.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Adjustments', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/adjustments.html' },
    { title: 'Guidelines for Changing Financial and Depreciation Information', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/guidelines-for-changing-financial-and-depreciation-information.html' },
    { title: 'Transfer Assets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/transfer-assets.html' },
    { title: 'Change Categories', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/change-categories.html' },
    { title: 'Considerations for Retiring Assets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/considerations-for-retiring-assets.html' },
    { title: 'Review Journal Entries for Retirement Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/review-journal-entries-for-retirement-transactions.html' },
    { title: 'Reinstate Assets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/reinstate-assets.html' },
    { title: 'Oracle Fusion Cloud Financials — Using Assets 26D (PDF)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/using-assets.pdf' },
    { title: 'Financials 26C What’s New — Retirement Assistant', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26c/fins26c/26C-fin-wn-f49559.htm' },
  ],
};
