export default {
  slug: 'books-and-categories',
  title: 'Asset Books and Categories',
  minutes: 16,
  summary:
    'Before Oracle Fusion can track a single asset, it needs a place to keep it (an asset book linked to a ledger) and a way to group it (an asset category with default accounts and depreciation rules). Learn corporate and tax books, categories, the asset key and location flexfields, calendars and prorate conventions — using Sunny’s setup.',
  objectives: [
    'Explain what an asset book is and the difference between a corporate book and a tax book',
    'Describe how an asset book links to a ledger and why an asset can have different numbers in different books',
    'List what an asset category holds: GL accounts and default depreciation rules',
    'Explain the category, asset key and location flexfields in simple words',
    'Describe calendars, prorate conventions and capitalization thresholds at a beginner level',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Two scorebooks and labelled shelves',
      html: `<p>Imagine your football team keeps <strong>two scorebooks</strong>. The coach’s book counts goals, passes and saves the way the team likes. The league’s book follows the league’s official rules. Same games, same players — but the two books can show slightly different numbers because they follow different rules.</p>
<p>Now imagine the clubhouse has <strong>labelled shelves</strong>: “Balls”, “Cones”, “Goal nets”. When a new ball arrives you put it on the “Balls” shelf, and the label already tells you how to look after it.</p>
<p>In Oracle Fusion Assets, the scorebooks are <strong>asset books</strong> and the labelled shelves are <strong>asset categories</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Asset books: where assets live',
      html: `<p>An <strong>asset book</strong> is a separate set of records for your assets, with its own depreciation rules, accounts and calendars. Oracle lets you set up as many books as you need, and an asset can have <strong>different financial information in each book</strong> — for example a different cost or depreciation method in the tax book. Because books are independent, you can even run depreciation for each book on a different schedule.</p>
<p>There are two kinds of books:</p>
<ul>
<li><strong>Corporate book</strong> — the main book used for the company’s financial statements. It is linked to a <strong>ledger</strong> and creates journal entries for it. Every asset must belong to <strong>exactly one</strong> corporate book.</li>
<li><strong>Tax book</strong> — follows tax rules (for example faster tax depreciation). A tax book must be associated with a corporate book, so assets and transactions can be <strong>copied</strong> from the corporate book easily. An asset can be in any number of tax books.</li>
</ul>
<p>Security in Oracle Assets also works at the <strong>book level</strong>: each user sees and updates only the assets in the books they have access to.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny Lemonade’s asset books (story setup by Jordan)',
      headers: ['Book', 'Class', 'Linked ledger', 'Calendar', 'Purpose'],
      rows: [
        ['SUNNY US CORP', 'Corporate', 'Sunny US Ledger (USD)', 'Monthly, Jan–Dec', 'Official books: straight-line depreciation, journals to the GL.'],
        ['SUNNY US TAX', 'Tax', 'Sunny US Ledger (USD)', 'Monthly, Jan–Dec', 'US tax depreciation rules; copied from SUNNY US CORP.'],
        ['SUNNY UK CORP', 'Corporate', 'Sunny UK Ledger (GBP)', 'Monthly, Jan–Dec', 'Official books for Sunny Lemonade UK Ltd.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: corporate book or tax book?',
      instructions: `<p>Decide which kind of book each statement describes.</p>`,
      categories: ['Corporate book', 'Tax book'],
      items: [
        { text: 'Every asset must belong to exactly one of these', answer: 'Corporate book' },
        { text: 'Must be associated with another book to copy assets from it', answer: 'Tax book' },
        { text: 'Uses its Allow mass copy rule to receive new assets automatically', answer: 'Tax book' },
        { text: 'Where Sunny records the stand for its official financial statements', answer: 'Corporate book' },
        { text: 'May use faster depreciation allowed by tax law', answer: 'Tax book' },
      ],
      explain: `<p>The corporate book is the primary home of every asset and feeds the ledger. Tax books hang off a corporate book, receive copies of its assets and transactions, and apply tax depreciation rules.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: setting up a book',
      html: `<p>Books are created on the <kbd>Manage Asset Books</kbd> task in Setup and Maintenance (Financials offering, Fixed Assets functional area). Oracle lists what must exist first: <strong>ledgers, asset accounts, system controls, fiscal years, calendars, prorate conventions and reference data sets</strong>.</p>
<p>A book’s key settings include the <em>Book Class</em> (Corporate or Tax), <em>Ledger</em>, <em>Depreciation Calendar</em>, <em>Prorate Calendar</em>, <em>Current Period</em>, <em>Divide Depreciation</em> (Evenly or by days), and default accounts for retirements such as <em>Net Book Value Retired Gain/Loss</em>, <em>Proceeds of Sale Gain/Loss/Clearing</em> and <em>Cost of Removal Gain/Loss/Clearing</em>. A tax book can also tick <em>Allow mass copy</em>.</p>
<p>For a quick start, Oracle’s rapid implementation tasks (<kbd>Create Fixed Assets Configuration in Spreadsheet</kbd>, <kbd>Update Fixed Assets Configuration in Spreadsheet</kbd>, <kbd>Upload Fixed Assets Configuration in Spreadsheet</kbd>) set up flexfield structures, system controls, calendars, prorate conventions, books, locations and categories from one workbook. Labels can vary by release.</p>`,
    },
    {
      type: 'text',
      heading: 'Asset categories: the labelled shelves',
      html: `<p>An <strong>asset category</strong> groups assets that are accounted and depreciated the same way. When you add an asset and pick its category, Oracle fills in (defaults) most of the details for you. A category holds:</p>
<ul>
<li><strong>General information</strong> — description, owned or leased, capitalized or not, whether assets are in physical inventory.</li>
<li><strong>GL accounts</strong> for each book, such as <strong>Asset Cost</strong>, <strong>Asset Clearing</strong>, <strong>Depreciation Expense</strong>, <strong>Accumulated Depreciation</strong> (Oracle sometimes labels it Depreciation Reserve), <strong>CIP Cost</strong> and <strong>CIP Clearing</strong> (for assets under construction), plus bonus, unplanned depreciation and impairment accounts.</li>
<li><strong>Default depreciation rules</strong> for each book — depreciation method, life, prorate convention, and whether to depreciate — which can change by <em>date placed in service</em> ranges.</li>
</ul>
<p>Categories are built from the <strong>Asset Category key flexfield</strong>: up to seven segments, and you must have at least a major category plus one subcategory segment. Oracle’s advice: keep it to two or three segments, because every combination needs its own rules.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny’s category EQUIPMENT.STAND in the SUNNY US CORP book (story setup)',
      headers: ['Setting', 'Value', 'Why'],
      rows: [
        ['Major / minor category', 'EQUIPMENT / STAND', 'Groups all lemonade stands.'],
        ['Asset Cost account', '<code>101-100-1510-000-000</code>', '1510 Equipment (Fixed Assets) on the balance sheet.'],
        ['Asset Clearing account', '<code>101-100-1520-000-000</code>', '1520 Asset Clearing — a helper account Jordan added for invoices waiting to become assets.'],
        ['Accumulated Depreciation account', '<code>101-100-1590-000-000</code>', '1590 Accumulated Depreciation (contra asset).'],
        ['Depreciation Expense (natural account)', '6140', 'Each asset’s assignment gives the full expense combination, e.g. <code>101-300-6140-010-000</code>.'],
        ['Method / life', 'STL (straight-line), 5 years 0 months', 'Sunny’s policy for stands.'],
        ['Prorate convention', 'Monthly (start in month placed in service)', 'A stand used from June depreciates from June.'],
        ['Capitalized', 'Yes', 'Stands are real assets, not expensed items.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: create a category',
      instructions: `<p>Practice form (a simplified simulation, not Oracle’s real page). Jordan needs a new category for kitchen juicers in the SUNNY US CORP book. Juicers are equipment, last <strong>4 years</strong>, and use straight-line depreciation.</p>`,
      formTitle: 'Create Asset Category (practice)',
      fields: [
        { label: 'Major category', type: 'select', options: ['EQUIPMENT', 'FURNITURE', 'BUILDING'], answer: 'EQUIPMENT' },
        { label: 'Minor category', type: 'text', answer: 'JUICER' },
        { label: 'Book', type: 'select', options: ['SUNNY US CORP', 'SUNNY US TAX', 'SUNNY UK CORP'], answer: 'SUNNY US CORP' },
        { label: 'Asset Cost account', type: 'select', options: ['101-100-1510-000-000', '101-100-1590-000-000', '101-200-6140-000-000'], answer: '101-100-1510-000-000' },
        { label: 'Accumulated Depreciation account', type: 'select', options: ['101-100-1510-000-000', '101-100-1590-000-000', '101-100-2110-000-000'], answer: '101-100-1590-000-000' },
        { label: 'Asset Clearing account', type: 'text', given: '101-100-1520-000-000' },
        { label: 'Depreciation method', type: 'select', options: ['STL', '200 Declining Balance with Straight-Line Switch', 'Flat rate'], answer: 'STL' },
        { label: 'Life in years', type: 'number', answer: 4 },
        { label: 'Capitalized?', type: 'select', options: ['Yes', 'No'], answer: 'Yes' },
      ],
      explain: `<p>Juicers belong under EQUIPMENT with a JUICER subcategory. Cost goes to 1510 and the running total of depreciation to 1590 (the contra account). 6140 is the expense side, which is completed per asset assignment, and 2110 is Accounts Payable — never an asset account. Four years and STL follow Sunny’s policy.</p>`,
    },
    {
      type: 'slides',
      title: 'Three flexfields that describe every asset',
      slides: [
        {
          icon: '🗂️',
          title: 'Category flexfield — financial grouping',
          html: `<p>Answers “<strong>how is it accounted and depreciated?</strong>” Example: <code>EQUIPMENT.STAND</code>. The category gives accounts and default rules.</p>`,
        },
        {
          icon: '🔑',
          title: 'Asset key flexfield — non-financial grouping',
          html: `<p>Answers “<strong>which similar assets belong together?</strong>” — for example by project, program or a keyword. Oracle requires at least one asset key segment even if you don’t use it, because system controls need the structure. Sunny uses the key to tag stands by sales route, e.g. <code>PARKS</code> or <code>SCHOOLS</code>.</p>`,
        },
        {
          icon: '📍',
          title: 'Location flexfield — where it physically is',
          html: `<p>Answers “<strong>where is it?</strong>” Oracle requires a <strong>state</strong> segment plus up to six others (country, city, site, building, room…). Sunny’s stand location: <code>USA.CA.SUNNYVALE.CITY PARK</code>. Locations are created with <kbd>Manage Asset Locations</kbd>.</p>`,
        },
        {
          icon: '⚠️',
          title: 'Plan carefully!',
          html: `<p>Oracle warns that once you start entering assets with a flexfield structure, <strong>you can’t change it</strong>. Design categories, keys and locations before go-live.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: which setup answers which question?',
      instructions: `<p>Match each Oracle Assets setup object to the question it answers.</p>`,
      pairs: [
        { left: 'Asset book', right: 'Which set of records (and ledger) is this asset kept in?' },
        { left: 'Asset category', right: 'Which accounts and default depreciation rules apply?' },
        { left: 'Asset key', right: 'Which similar assets do we want to find together, by a non-financial tag?' },
        { left: 'Location', right: 'Where is the asset physically?' },
        { left: 'Prorate convention', right: 'How much depreciation is taken in the first year, based on the date placed in service?' },
      ],
      explain: `<p>Books hold assets and link to ledgers; categories carry accounts and default rules; the asset key and location help you group and find assets; prorate conventions control first-year (and last-year) depreciation.</p>`,
    },
    {
      type: 'text',
      heading: 'Calendars, prorate conventions and system controls',
      html: `<p>A few more pieces finish the setup:</p>
<ul>
<li><strong>System controls</strong> — the enterprise name shown on reports, the <em>oldest date placed in service</em>, the flexfield structures and the asset numbering scheme.</li>
<li><strong>Fiscal years</strong> — start and end dates from the oldest date placed in service through at least one year after the current one. (Oracle notes that depreciation fails if the current fiscal year is the last one defined.)</li>
<li><strong>Depreciation calendar</strong> — how many periods are in the fiscal year (Sunny: 12 monthly periods like <code>JUN-26</code>).</li>
<li><strong>Prorate calendar</strong> — maps each date to a prorate period that picks the depreciation rate.</li>
<li><strong>Prorate convention</strong> — decides how much depreciation an asset gets in its first (and last) year based on its date placed in service. With a <em>half-year</em> convention, every asset bought during the year gets half a year of depreciation. With a <em>following month</em> convention, depreciation starts the month after the asset is placed in service.</li>
<li><strong>Retirement convention</strong> — the same idea for the year an asset is retired, if your country needs a different rule.</li>
<li><strong>Capitalization thresholds</strong> (optional) — let Oracle decide automatically whether incoming lines are expensed, capitalized, or treated as low-value assets.</li>
</ul>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: prorate conventions change the first year',
      instructions: `<p>Sunny’s fiscal year runs January–December. The $6,000 stand (straight-line, 5 years, so $1,200 a year or $100 a month) is placed in service on <strong>June 10, 2026</strong>. How much depreciation does it get in fiscal year 2026 under each convention? (Simplified: assume depreciation is divided evenly by month.)</p>`,
      html: `<p>Monthly convention starting in the month placed in service (June–December): \${{}}</p><p>Following month convention (July–December): \${{}}</p><p>Half-year convention (half of a full year): \${{}}</p>`,
      blanks: [
        { answer: 700 },
        { answer: 600 },
        { answer: 600 },
      ],
      explain: `<p>June to December is 7 months × $100 = $700. Starting the following month gives 6 months × $100 = $600. The half-year convention gives half of $1,200 = $600 no matter which month the stand arrived. The total over the life is always $6,000 — conventions only shift <em>when</em> it is recorded.</p>`,
    },
    {
      type: 'example',
      title: 'How it all comes together for the stand',
      html: `<p>When Sunny’s new stand is added in June 2026, Oracle uses all of this setup at once:</p>`,
      steps: [
        'Book <strong>SUNNY US CORP</strong> → journals go to the <strong>Sunny US Ledger</strong>, current period <code>JUN-26</code>.',
        'Category <strong>EQUIPMENT.STAND</strong> → cost account 1510, accumulated depreciation 1590, clearing 1520; STL, 5 years; monthly prorate convention.',
        'Asset key <strong>PARKS</strong> → easy to find with the other park stands.',
        'Location <strong>USA.CA.SUNNYVALE.CITY PARK</strong>; assignment expense account <code>101-300-6140-010-000</code> (Sales, Classic Lemonade).',
        'Because SUNNY US TAX allows mass copy, the stand will later be copied into the tax book, where tax depreciation rules apply.',
      ],
      result: `<p>The asset accountant only typed a few fields — Oracle defaulted the rest from the book and category. Good setup means fast, consistent asset entry.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Watch out: one clearing account per book',
      html: `<p>When several asset books share one primary ledger, Oracle needs a <strong>unique asset clearing account for each book</strong> so Payables invoices land in the correct book. Book rules can also use the balancing segment, cost center or second balancing segment of the clearing account to choose the book.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Category design is a finance policy decision, not just a system task. Agree on asset classes and useful lives with the CFO and auditors (and tax advisers for the tax book) <em>before</em> building them. A tidy list of 20–40 categories is usually easier to live with than hundreds of tiny ones.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Asset book', def: 'A separate set of asset records with its own accounts, calendars and depreciation rules.' },
        { term: 'Corporate book', def: 'The main asset book used for financial statements, linked to a ledger; every asset belongs to exactly one.' },
        { term: 'Tax book', def: 'An asset book that follows tax rules and copies assets from its associated corporate book.' },
        { term: 'Asset category', def: 'A group of similar assets sharing GL accounts and default depreciation rules.' },
        { term: 'Asset key', def: 'A non-financial tag used to group and find similar assets.' },
        { term: 'Prorate convention', def: 'A rule that decides how much depreciation an asset gets in its first year based on when it was placed in service.' },
        { term: 'Asset clearing account', def: 'A temporary account that holds asset purchase costs until they become assets in Oracle Assets.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'How many corporate books can one asset belong to?',
          options: ['None', 'Exactly one', 'Exactly two', 'As many as you like'],
          answer: 1,
          explain: 'An asset must belong to exactly one corporate book, but it can belong to many tax books.',
        },
        {
          q: 'What does an asset category NOT usually hold?',
          options: ['The asset cost account', 'Default depreciation method and life', 'The accumulated depreciation account', 'The supplier’s bank account'],
          answer: 3,
          explain: 'Categories hold accounts and default depreciation rules. Supplier bank accounts belong to supplier setup in Payables.',
        },
        {
          q: 'Which flexfield answers “where is the asset physically?”',
          options: ['Category flexfield', 'Asset key flexfield', 'Location flexfield', 'Chart of accounts'],
          answer: 2,
          explain: 'The Location flexfield tracks physical location; Oracle requires a state segment in it.',
        },
        {
          q: 'Why should you plan flexfield structures carefully before go-live?',
          options: [
            'Because they cost extra',
            'Because once you start entering assets, the structure can’t be changed',
            'Because the bank needs them',
            'Because they control payment terms',
          ],
          answer: 1,
          explain: 'Oracle warns that category, asset key and location flexfield structures can’t be changed once assets are entered with them.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Guidelines for Creating or Modifying Asset Books', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/guidelines-for-creating-or-modifying-asset-books.html' },
    { title: 'Create a Corporate Book', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/create-a-corporate-book.html' },
    { title: 'Overview of Asset Categories', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/overview-of-asset-categories.html' },
    { title: 'Asset Category Key Flexfield', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/asset-category-key-flexfield.html' },
    { title: 'Asset Key Flexfield', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/asset-key-flexfield.html' },
    { title: 'Location Flexfield', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/location-flexfield.html' },
    { title: 'Considerations for Creating Calendars', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/considerations-for-creating-calendars.html' },
    { title: 'Prorate and Retirement Conventions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/prorate-and-retirement-conventions.html' },
    { title: 'System Controls', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/system-controls.html' },
    { title: 'Overview of Assets Rapid Implementation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/overview-of-assets-rapid-implementation.html' },
  ],
};
