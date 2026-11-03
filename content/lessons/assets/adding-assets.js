export default {
  slug: 'adding-assets',
  title: 'Adding Assets (Including From Payables)',
  minutes: 18,
  summary:
    'Assets get into Oracle Fusion in two ways: typed in manually, or flowing in automatically as mass additions — most often from Payables invoices. Follow Sunny’s $6,000 lemonade stand from Stand Builders’ invoice to a posted asset, learn the mass additions queues and processes, and see how construction-in-process (CIP) assets are built up and capitalized.',
  objectives: [
    'Compare manual additions with mass additions',
    'Explain how a Payables invoice line becomes an asset: Create Mass Additions, preparing source lines, Post Mass Additions',
    'Name the mass addition queues and what Post Mass Additions does with each',
    'Record the Payables and Assets journals for an addition through the asset clearing account',
    'Describe CIP assets, capitalization and reverse capitalization',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The welcome desk for new things',
      html: `<p>Think of a museum. New treasures arrive in two ways. Sometimes a curator carries one in by hand, fills in a label, and puts it on display. Other times a big truck brings many boxes at once; they wait in the <strong>arrivals room</strong>, someone checks each box, writes its label, and only then do they go on display.</p>
<p>Oracle Assets works the same way. A <strong>manual addition</strong> is the curator carrying one item in. A <strong>mass addition</strong> is the truck: lines arrive from Payables (or other systems), wait in a queue, get checked and completed, and are then <strong>posted</strong> to become real assets.</p>`,
    },
    {
      type: 'text',
      heading: 'Two doors into Oracle Assets',
      html: `<p>Oracle describes two ways to record acquired assets:</p>
<ul>
<li><strong>Manual additions</strong> — enter one asset on the <kbd>Add Asset</kbd> page (Oracle says this is generally for a single asset), or many at once using the <kbd>Add Assets in Spreadsheet</kbd> integrated workbook.</li>
<li><strong>Mass additions</strong> — create assets automatically from another source: invoice distribution lines in <strong>Payables</strong>, capitalized project lines from <strong>Project Costing</strong>, receipts from <strong>Receiving</strong>, a legacy asset system, or any feeder system through the mass additions interface (including a file-based data import template).</li>
</ul>
<p>Most companies add the majority of their assets from Payables, because that is where the bill for the asset arrives. It saves typing and guarantees the asset cost equals what was actually invoiced.</p>`,
    },
    {
      type: 'flow',
      title: 'From Stand Builders’ invoice to asset number 1001',
      steps: [
        { icon: '🧾', label: 'Invoice', detail: 'Ava enters Stand Builders’ $6,000 invoice, charged to the asset clearing account 1520. It is validated, approved, accounted and posted to the GL.' },
        { icon: '🚚', label: 'Create Mass Additions', detail: 'This Payables process sends qualifying invoice distributions to the Assets mass additions interface as source lines.' },
        { icon: '🧹', label: 'Prepare', detail: 'Oracle’s Prepare Assets Transaction Data process defaults book, category, location and expense account where it can. The asset accountant completes anything missing.' },
        { icon: '✅', label: 'Post', detail: 'Lines in the Post queue are posted by Post Mass Additions (for example with Post All on the Additions infotile).' },
        { icon: '🏷️', label: 'Asset', detail: 'Asset 1001 now exists in SUNNY US CORP, ready to depreciate from June 2026.' },
      ],
      note: `<p>Oracle also supports adding a line to an <em>existing</em> asset as a cost adjustment, and splitting or merging lines before posting.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Practice: put the Payables-to-Assets steps in order',
      instructions: `<p>Put the life of Stand Builders’ invoice line in the right order.</p>`,
      items: [
        'Ava enters the invoice with the line charged to the asset clearing account',
        'The invoice is validated, approved, accounted and posted to the General Ledger',
        'The Create Mass Additions process sends the line to Assets',
        'The asset accountant reviews the source line and completes category, location and assignment',
        'The line is set to the Post queue',
        'Post Mass Additions creates the asset',
      ],
      explain: `<p>Oracle only sends a line to Assets once the invoice is approved and the distribution is accounted and posted to the GL. In Assets, lines must be complete and in the <strong>Post</strong> queue before Post Mass Additions turns them into assets.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the rules for an invoice line to reach Assets',
      html: `<p>For <kbd>Create Mass Additions</kbd> to pick up an invoice distribution, Oracle lists conditions such as:</p>
<ul>
<li>The line is charged to an <strong>asset account</strong> that is set up as the <strong>asset clearing</strong> (or CIP clearing) account of an existing category — or to an expense account with <strong>Track as Asset</strong> enabled.</li>
<li>The invoice is <strong>approved</strong>, and the distribution is <strong>posted to the General Ledger</strong> from Payables.</li>
<li>The GL date is on or before the date you give the process.</li>
<li>Payables uses the <strong>same ledger</strong> as the corporate book.</li>
</ul>
<p>Payables makes sure each line is sent only once, even if the process runs many times. Discounts on asset lines travel too, described as “Discount”. The <kbd>Create Mass Additions Report</kbd> lists what was sent. Labels vary by release.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: will Create Mass Additions pick it up?',
      instructions: `<p>Sunny’s corporate book uses clearing account 1520 for all equipment categories. Decide whether each invoice line will be sent to Assets.</p>`,
      categories: ['Sent to Assets', 'Not sent'],
      items: [
        { text: 'Stand Builders invoice, $6,000 to 1520, approved, accounted and posted to GL', answer: 'Sent to Assets' },
        { text: 'Lemon Grove Farms invoice, $500 to 5110 Lemons Cost', answer: 'Not sent' },
        { text: 'Stand Builders invoice to 1520, approved but not yet accounted', answer: 'Not sent' },
        { text: 'A $1,200 laptop charged to an expense account with Track as Asset enabled, approved and posted', answer: 'Sent to Assets' },
        { text: 'An unapproved invoice to 1520', answer: 'Not sent' },
      ],
      explain: `<p>Lines must hit a clearing account of a category (or have Track as Asset), and the invoice must be approved and posted to the GL. Ordinary expenses like lemons never go to Assets.</p>`,
    },
    {
      type: 'table',
      caption: 'Mass addition queues (the status of each line)',
      headers: ['Queue', 'Meaning', 'What Post Mass Additions does'],
      rows: [
        ['<strong>New</strong>', 'Just arrived, not yet reviewed.', 'Nothing — it stays New.'],
        ['<strong>On Hold</strong> (or your own hold queue)', 'Parked by a user.', 'Nothing — stays on hold.'],
        ['<strong>Post</strong>', 'Ready to become a new asset.', 'Creates a new asset; queue becomes <strong>Posted</strong>.'],
        ['<strong>Cost Adjustment</strong>', 'To be added to an existing asset (after an Add to Asset action).', 'Adds the cost to the existing asset; becomes Posted.'],
        ['<strong>Split</strong>', 'A multi-unit line already split into single lines.', 'Nothing for the original line.'],
        ['<strong>Merged</strong>', 'Merged into another line.', 'Marked Posted along with its parent.'],
        ['<strong>Delete</strong>', 'Marked for deletion.', 'Nothing; later cleaned up (Delete Mass Additions).'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'The Additions infotile speaks a simpler language',
      html: `<p>On the Assets landing page, lines needing action are grouped as <strong>Incomplete</strong> (missing information or not yet assigned), <strong>Exceptions</strong> (errors to fix) and <strong>Ready to Post</strong> (in the Post queue). Clicking <kbd>Post All</kbd> posts the ready lines. You can also update lines in a spreadsheet and post from there.</p>
<p>Since update 26A, Oracle can set Payables lines to <strong>Post automatically</strong> when the category, location and expense account are all defaulted — if the book has the <em>Default status to Post for Payables invoice lines</em> option. Oracle advises not to use it when additions need approval, required descriptive flexfields, or a reviewer.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny’s stand: the journals, step by step',
      html: `<p>Stand Builders LLC delivers the new City Park stand on June 1, 2026 and sends invoice SB-778 for <strong>$6,000</strong> on June 5 (Net 30). Ava charges it to <code>101-100-1520-000-000</code> Asset Clearing.</p>`,
      steps: [
        '<strong>Payables accounting:</strong> the invoice is accounted: debit 1520 Asset Clearing, credit 2110 Accounts Payable.',
        '<strong>Create Mass Additions</strong> runs that evening; a $6,000 source line appears on the Additions infotile.',
        'Oracle defaults the category <code>EQUIPMENT.STAND</code> (from the clearing account) and the location from the ship-to mapping. The asset accountant adds the date placed in service (June 1, 2026) and the expense account <code>101-300-6140-010-000</code>.',
        'The line is Ready to Post; <kbd>Post All</kbd> runs <strong>Post Mass Additions</strong>. Asset 1001 is created.',
        '<strong>Assets accounting</strong> (Create Accounting for Assets): debit 1510 Equipment, credit 1520 Asset Clearing.',
      ],
      result: `<p>The clearing account went up by $6,000 in Payables and down by $6,000 in Assets — it is back to zero. A non-zero balance in 1520 at month-end means something is stuck between Payables and Assets.</p>`,
    },
    {
      type: 'journal',
      title: 'Payables entry: invoice for the stand',
      lines: [
        { account: '1520 Asset Clearing', debit: 6000, credit: 0 },
        { account: '2110 Accounts Payable – Trade', debit: 0, credit: 6000 },
      ],
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Practice: build the Assets addition entry',
      instructions: `<p>Asset 1001 has just been posted from the $6,000 source line. Build the addition journal that Oracle Assets creates (ignore depreciation for now).</p>`,
      accounts: ['1510 Equipment (Fixed Assets)', '1520 Asset Clearing', '1590 Accumulated Depreciation', '2110 Accounts Payable – Trade', '6140 Depreciation Expense', '1110 Cash – Big River Bank'],
      answer: [
        { account: '1510 Equipment (Fixed Assets)', debit: 6000, credit: 0 },
        { account: '1520 Asset Clearing', debit: 0, credit: 6000 },
      ],
      explain: `<p>The asset cost account is debited and the clearing account is credited, clearing the amount Payables put there. Accounts Payable is untouched (Payables already recorded the debt) and Cash only moves when Ava pays the invoice. Oracle’s own example shows the same pattern: debit Asset Cost, credit Asset Clearing.</p>`,
    },
    {
      type: 'text',
      heading: 'Manual additions: the Add Asset page',
      html: `<p>Some assets do not come from Payables — for example an item bought before Sunny used Oracle, or a donated asset. On the Assets landing page, the <kbd>Add Asset</kbd> panel tab opens a short dialog asking for the <strong>Book</strong>, <strong>Asset Type</strong>, <strong>Category</strong>, <strong>Description</strong>, <strong>Cost</strong>, <strong>Units</strong>, <strong>Expense Account</strong> and <strong>Location</strong>. After <kbd>Next</kbd>, the Add Asset page lets you set the date placed in service and review the defaulted depreciation rules, descriptive details and assignments, then <kbd>Submit</kbd> (or <kbd>Save</kbd> as a draft).</p>
<p>Asset types you will meet: <strong>Capitalized</strong> (normal, depreciating asset), <strong>CIP</strong> (under construction, not yet depreciating), <strong>Expensed</strong> (tracked but not depreciated — uses an expensed category) and <strong>Group</strong> (a group asset that depreciates its members together).</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: add a juicer by hand',
      instructions: `<p>Practice form (a simplified simulation, not Oracle’s real page). Noah’s commercial juicer was bought before Sunny went live on Oracle, so it is added manually: cost <strong>$2,400</strong>, 1 unit, placed in service <strong>March 1, 2026</strong>, used in the Kitchen (cost center 200) for Classic Lemonade (product 010).</p>`,
      formTitle: 'Add Asset (practice)',
      fields: [
        { label: 'Book', type: 'select', options: ['SUNNY US CORP', 'SUNNY US TAX', 'SUNNY UK CORP'], answer: 'SUNNY US CORP' },
        { label: 'Asset type', type: 'select', options: ['Capitalized', 'CIP', 'Expensed', 'Group'], answer: 'Capitalized' },
        { label: 'Category', type: 'select', options: ['EQUIPMENT.STAND', 'EQUIPMENT.JUICER', 'FURNITURE.TABLE'], answer: 'EQUIPMENT.JUICER' },
        { label: 'Description', type: 'text', given: 'Commercial juicer – kitchen' },
        { label: 'Cost', type: 'number', answer: 2400 },
        { label: 'Units', type: 'number', answer: 1 },
        { label: 'Expense account', type: 'text', answer: '101-200-6140-010-000', hint: 'Company-CostCenter-Account-Product-Intercompany' },
        { label: 'Date placed in service', type: 'date', answer: '2026-03-01' },
      ],
      explain: `<p>Juicers are working equipment, so the type is <strong>Capitalized</strong> in the corporate book SUNNY US CORP (the tax book receives a copy later). The expense account uses the Kitchen cost center 200, account 6140 Depreciation Expense and product 010: <code>101-200-6140-010-000</code>. The category then defaults the cost and reserve accounts and the 4-year straight-line rule.</p>`,
    },
    {
      type: 'slides',
      title: 'CIP: assets that are still being built',
      slides: [
        {
          icon: '🏗️',
          title: 'What is CIP?',
          html: `<p>A <strong>construction-in-process (CIP)</strong> asset is something you build over time that is not in service yet. Sunny is building a new <strong>juice bar counter</strong> in the kitchen over the summer.</p>`,
        },
        {
          icon: '➕',
          title: 'Collect the costs',
          html: `<p>Each cost (materials, labor) is added as a source line to the CIP asset. July: $3,000 of materials from Stand Builders LLC. August: $1,000 installation. Total so far: $4,000.</p>`,
        },
        {
          icon: '⏸️',
          title: 'No depreciation yet',
          html: `<p>CIP assets <strong>do not depreciate</strong>, because they aren’t being used. You can track them in Assets (using the asset key to group them) or, for bigger builds, in Oracle Project Costing.</p>`,
        },
        {
          icon: '🎉',
          title: 'Capitalize',
          html: `<p>On September 1 the counter is finished. Using the <kbd>Capitalize CIP Assets</kbd> panel tab, the accountant capitalizes it. Oracle changes the type from CIP to Capitalized, sets the date placed in service, sets the cost to the sum of its source lines ($4,000), defaults depreciation rules from the category, and creates an addition transaction.</p>`,
        },
        {
          icon: '↩️',
          title: 'Oops? Reverse capitalize',
          html: `<p>If it was capitalized too early, you can <strong>reverse capitalize</strong> — but only in the same period and only if no other transactions were done on it. It goes back to CIP (the date placed in service stays as it was).</p>`,
        },
      ],
    },
    {
      type: 'journal',
      title: 'CIP in journals (simplified): build, then capitalize',
      lines: [
        { account: 'CIP Cost (category CIP cost account) — costs collected', debit: 4000, credit: 0 },
        { account: 'CIP Clearing (category CIP clearing account) — from invoices', debit: 0, credit: 4000 },
        { account: '1510 Equipment (Fixed Assets) — capitalized', debit: 4000, credit: 0 },
        { account: 'CIP Cost (category CIP cost account) — moved out', debit: 0, credit: 4000 },
      ],
      note: `<p>Sunny’s simple chart of accounts does not list a CIP account yet; a real company would add one (the category holds both a <em>CIP Cost</em> and a <em>CIP Clearing</em> account). After capitalization the CIP cost balance is back to zero and the counter sits in 1510.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: post Payables lines',
      items: [
        'Make sure the Payables process <kbd>Create Mass Additions</kbd> has run (often scheduled daily).',
        'Open the Assets landing page and click the <kbd>Additions</kbd> infotile.',
        'Review <em>Incomplete</em> lines: add missing category, location, expense account or date placed in service. Fix any <em>Exceptions</em>.',
        'When lines are <em>Ready to Post</em>, click <kbd>Post All</kbd> (this runs Post Mass Additions).',
        'Check the <kbd>Post Mass Additions Report</kbd> and run the <kbd>Asset Additions Report</kbd> from Scheduled Processes to confirm method, life, date placed in service and cost.',
      ],
      note: `<p>Labels, infotiles and spreadsheet options can differ slightly by release, Redwood pages and your company’s setup.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li>A multi-unit invoice line (say, 10 laptops) is usually <strong>split</strong> so each laptop becomes its own asset with its own tag number and employee.</li>
<li>Freight and installation on a separate invoice line can be <strong>merged</strong> into the main line, or added to the existing asset as a <strong>cost adjustment</strong> — they are part of the asset’s cost.</li>
<li>Check the asset clearing account balance every month. It should be explainable line by line by what is still waiting in the Additions queue.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Manual addition', def: 'Entering an asset directly in Oracle Assets on the Add Asset page or in a spreadsheet.' },
        { term: 'Mass addition', def: 'A line sent from another system, such as Payables, that waits in a queue until it is posted as an asset.' },
        { term: 'Create Mass Additions', def: 'The Payables process that sends qualifying invoice lines to Oracle Assets.' },
        { term: 'Post Mass Additions', def: 'The Assets process that turns lines in the Post queue into assets, or adds them to existing assets.' },
        { term: 'Source line', def: 'A record of where an asset’s cost came from, such as an invoice line.' },
        { term: 'CIP asset', def: 'An asset under construction that collects costs but does not depreciate until it is capitalized.' },
        { term: 'Capitalize', def: 'For a CIP asset, to place it in service so it becomes a normal, depreciating asset.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which process in Payables sends asset invoice lines to Oracle Assets?',
          options: ['Post Mass Additions', 'Create Mass Additions', 'Calculate Depreciation', 'Autoreconciliation'],
          answer: 1,
          explain: 'Create Mass Additions runs in Payables and creates mass addition (source) lines in Assets. Post Mass Additions then creates the assets.',
        },
        {
          q: 'A mass addition line is in the New queue when Post Mass Additions runs. What happens?',
          options: ['It becomes an asset', 'Nothing — it stays New', 'It is deleted', 'It is added to an existing asset'],
          answer: 1,
          explain: 'Only lines in the Post (or Cost Adjustment) queue are posted. New, On Hold and Delete lines are left alone.',
        },
        {
          q: 'After the stand is posted in Assets and accounted, what is the balance of 1520 Asset Clearing for this invoice?',
          options: ['$6,000 debit', '$6,000 credit', 'Zero', '$100'],
          answer: 2,
          explain: 'Payables debited 1520 for $6,000 and Assets credited it for $6,000, so it nets to zero.',
        },
        {
          q: 'Which statement about CIP assets is true?',
          options: [
            'They depreciate from the day the first cost arrives',
            'They do not depreciate until they are capitalized and placed in service',
            'They can only be created in tax books',
            'They never have source lines',
          ],
          answer: 1,
          explain: 'CIP assets collect costs while being built and start depreciating only after capitalization.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Considerations for Adding Assets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/considerations-for-adding-assets.html' },
    { title: 'Mass Additions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/mass-additions.html' },
    { title: 'How Payables Source Lines Are Imported', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/how-payables-source-lines-are-imported.html' },
    { title: 'How Mass Additions Queues Are Set', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/how-mass-additions-queues-are-set.html' },
    { title: 'How Posted Mass Additions Are Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/how-posted-mass-additions-are-processed.html' },
    { title: 'How to Default Asset Status to Post for Payables Invoice Lines', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/how-to-default-asset-status-to-post-for-payables-invoice-lines.html' },
    { title: 'Review Journal Entries for Addition Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/review-journal-entries-for-addition-transactions.html' },
    { title: 'Construction-in-Process Assets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/construction-in-process-assets.html' },
    { title: 'Financials 26A What’s New — Automated Asset Creation from Payables Invoices', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26a/fins26a/26A-fin-wn-f41827.htm' },
  ],
};
