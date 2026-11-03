export default {
  slug: 'other-financials',
  title: 'More Family Members: Accounting Hub, Leases, Joint Ventures and EPM',
  minutes: 16,
  summary:
    'Oracle Fusion Financials has more relatives than the core ledger and subledgers. Meet Accounting Hub (accounting for data from other systems), Lease Accounting (IFRS 16 and ASC 842 leases), Joint Venture Management (sharing costs with partners), Revenue Management (ASC 606 and IFRS 15) and the separate Oracle EPM family for planning, consolidation, reconciliation and reporting.',
  objectives: [
    'Explain what Accounting Hub does with data from non-Oracle systems',
    'Describe how Lease Accounting creates right-of-use and lease liability balances',
    'Explain how Joint Venture Management splits costs between partners',
    'Name the five revenue steps that Revenue Management automates',
    'Tell which jobs belong to Fusion ERP and which belong to the Oracle EPM applications',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The big family reunion',
      html: `<p>You already know the close family: the General Ledger (the grandparent who keeps the family scrapbook), Payables, Receivables, Cash and Assets. But at a family reunion you meet <strong>cousins</strong> too — each with one special skill.</p>
<p>One cousin translates letters written in other languages (<strong>Accounting Hub</strong>). One keeps track of everything the family rents (<strong>Lease Accounting</strong>). One splits the bill when two families share a holiday house (<strong>Joint Venture Management</strong>). And a group of cousins who live next door — the <strong>EPM</strong> family — plan the future, add up everyone’s pocket money and write the family newsletter.</p>`,
    },
    {
      type: 'text',
      heading: 'Why these extra products exist',
      html: `<p>The core modules handle what almost every company does: buy, sell, pay, collect and keep the books. But some businesses have special needs:</p>
<ul>
<li>Sales or operations happen in <strong>other systems</strong> (a web shop, a bank’s loan system, an insurance policy system) that still need proper accounting.</li>
<li>The company <strong>rents</strong> shops, cars or equipment, and the accounting standards say most leases must appear on the balance sheet.</li>
<li>The company runs a project <strong>together with partners</strong> and must share costs fairly.</li>
<li>Revenue rules are complex (bundles, subscriptions, multi-year contracts).</li>
<li>Finance wants better <strong>budgets, forecasts, consolidations</strong> and board reports than spreadsheets can give.</li>
</ul>
<p>Oracle solves each one with a separate product that you license and switch on only if you need it. Sunny Lemonade is growing, so Sam is looking at several of them.</p>`,
    },
    {
      type: 'slides',
      title: 'Meet the cousins',
      slides: [
        {
          icon: '🔄',
          title: 'Accounting Hub',
          html: `<p>Turns transaction data from <strong>non-Oracle source systems</strong> into detailed, auditable accounting entries, using the same subledger accounting rules engine that creates accounting for Payables and Receivables. You register the source system, describe its transactions, define accounting rules, and import the data. Journals flow to the General Ledger.</p>`,
        },
        {
          icon: '🏢',
          title: 'Lease Accounting',
          html: `<p>Keeps all leases in one repository: expense leases (you rent something) and revenue leases (you rent something out). It generates payment and amortization schedules, calculates <strong>right-of-use</strong> and <strong>lease liability</strong> balances under <strong>IFRS 16</strong> and <strong>ASC 842</strong>, and passes invoices to Payables and Receivables.</p>`,
        },
        {
          icon: '🤝',
          title: 'Joint Venture Management',
          html: `<p>Helps the <strong>managing partner</strong> of a joint venture find shared transactions, split them by each partner’s <strong>ownership percentage</strong>, and bill partners with receivables invoices, payables invoices or internal transfer journals.</p>`,
        },
        {
          icon: '📜',
          title: 'Revenue Management',
          html: `<p>Automates revenue recognition for <strong>ASC 606</strong> and <strong>IFRS 15</strong>: it groups sales data into customer contracts and performance obligations, allocates the price using standalone selling prices, and recognizes revenue when each obligation is satisfied.</p>`,
        },
        {
          icon: '📊',
          title: 'Oracle EPM',
          html: `<p><strong>Enterprise Performance Management</strong> is a separate family of Oracle cloud applications for planning, consolidation, account reconciliation, narrative reporting, tax reporting and profitability. It works closely with Fusion ERP but is not part of it.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: which cousin helps?',
      instructions: `<p>Match each Sunny Lemonade need to the product that handles it.</p>`,
      pairs: [
        { left: 'Create journals from Sunny’s web shop, which runs on a non-Oracle system', right: 'Accounting Hub' },
        { left: 'Record a 3-year shop rental on the balance sheet', right: 'Lease Accounting' },
        { left: 'Split festival booth costs with a partner company', right: 'Joint Venture Management' },
        { left: 'Recognize revenue on a 12-month lemonade subscription bundle', right: 'Revenue Management' },
        { left: 'Build next year’s budget and forecast', right: 'Oracle EPM Planning' },
      ],
      explain: `<p>Each product has one specialty. Notice that the first four live inside Oracle Fusion Cloud Financials and post to the same General Ledger, while Planning is part of the separate EPM family.</p>`,
    },
    {
      type: 'text',
      heading: 'Accounting Hub: one accounting engine for every system',
      html: `<p>Imagine Sunny opens an online shop built on another company’s software. Every web order is a sale that must reach the books. Without Accounting Hub, Priya would type a summary journal every day — slow and hard to audit.</p>
<p>With Accounting Hub, the web shop is <strong>registered</strong> as a source system. Its transactions are imported, and <strong>accounting rules</strong> decide which accounts to use (for example “a web order debits Receivables and credits Lemonade Sales Revenue, product from the order”). The result is a <strong>subledger journal</strong> stored in the same repository as Payables and Receivables journals, so it can be drilled into, reconciled and audited the same way. Oracle also notes that third-party data used by Joint Venture Management must first come in through Accounting Hub.</p>
<p>Accounting Hub also includes the General Ledger and financial reporting features, so a company can use it as its accounting platform while keeping other operational systems.</p>`,
    },
    {
      type: 'text',
      heading: 'Lease Accounting: rentals on the balance sheet',
      html: `<p>Under <strong>IFRS 16</strong> and <strong>ASC 842</strong>, a company that rents (a <em>lessee</em>) usually records two things on day one:</p>
<ul>
<li>A <strong>right-of-use (ROU) asset</strong> — the right to use the shop for the lease term.</li>
<li>A <strong>lease liability</strong> — the present value of the future lease payments.</li>
</ul>
<p>Lease Accounting captures the lease details, assets, payments and options, <strong>validates</strong> the lease, <strong>generates schedules</strong> and then <strong>activates</strong> it. It discounts the cash flows using the lease’s discount rate. Oracle’s documentation says the interest method is <em>Daily Compounding Interest</em>, with daily or periodic amortization. Payments go to Payables as invoices; for revenue leases, billing goes to Receivables. Legacy leases can be loaded with file-based data import (FBDI). Users work from the <strong>Lease Landing Page</strong> and the <strong>Lease Accounting Dashboard</strong>.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny rents a shop on Main Street',
      html: `<p>Sam signs a <strong>3-year</strong> lease for a small shop at <strong>$1,000 per month</strong> (36 payments, $36,000 in total).</p>`,
      steps: [
        'Priya creates an expense lease in Lease Accounting with the term, payment terms and the discount rate.',
        'Lease Accounting generates the schedules. Because money later is worth less than money today, the lease liability is the <strong>present value</strong> of the payments — a little over $33,000 at a 5% yearly rate, not $36,000.',
        'The lease is activated. The ROU asset and lease liability appear on Sunny’s balance sheet.',
        'Each month, a $1,000 payment request goes to Payables. Part of each payment reduces the liability and part is interest; the ROU asset is amortized over the term.',
      ],
      result: `<p>Investors can now see that Sunny owes three years of rent, which was invisible under the old rules. The Sunny COA has no ROU or lease liability accounts yet, so Sam asks Priya to add them before go-live — a good reminder that new products can mean new accounts.</p>`,
    },
    {
      type: 'text',
      heading: 'Joint Venture Management: sharing the bill',
      html: `<p>In a <strong>joint venture</strong>, two or more partners run a project together. One partner is the <strong>managing partner</strong> (or operator): it pays the costs, then bills the others for their share according to the <strong>joint operating agreement (JOA)</strong>. This is common in oil and gas, mining and property.</p>
<p>Joint Venture Management works like this:</p>
<ol>
<li>A joint venture accountant sets up a <strong>joint venture definition</strong> with an <strong>ownership definition</strong>: the partners and each one’s percentage. The percentages must total 100% and have an effective date range.</li>
<li>The <strong>Identify Joint Venture Transactions</strong> process finds costs and revenue in Fusion Financials that belong to the venture.</li>
<li>The <strong>Create Joint Venture Distributions</strong> process splits each transaction by ownership percentage.</li>
<li>Invoices or journals are created for each partner: receivables invoices for external partners, payables invoices where the venture owes a partner, and internal transfer journals for internal partners.</li>
</ol>
<p><strong>Direct billing</strong> sends a whole transaction to one partner. A non-operating partner can also use the product to check that it was billed correctly. New in 26D, the <strong>Joint Venture Transactions Assistant</strong> AI agent can run the identify process, summarize a venture’s transactions for a period and flag exceptions to accountants.</p>`,
    },
    {
      type: 'example',
      title: 'The Summer Festival booth',
      html: `<p>Sunny US and a fictional partner, <strong>Breezy Fruit Co.</strong>, run a lemonade booth at the summer festival together. Sunny is the managing partner with <strong>60%</strong>; Breezy owns <strong>40%</strong>. Sunny pays the <strong>$1,000</strong> booth rent and records it on account <code>101-300-6110-000-000</code>.</p>`,
      steps: [
        'The Identify Joint Venture Transactions process picks up the $1,000 rent because cost center 300 and account 6110 match the joint venture definition.',
        'Create Joint Venture Distributions splits it: Sunny $600, Breezy $400.',
        'A receivables invoice for $400 is created for Breezy Fruit Co.',
      ],
      result: `<p>Simplified view of the invoice accounting: Sunny’s receivable goes up and its rent cost goes down by Breezy’s share. (In a real setup, the credit account comes from the joint venture configuration.)</p>`,
    },
    {
      type: 'journal',
      title: 'Billing the partner for 40%',
      lines: [
        { account: '1210 Accounts Receivable (101-300-1210-000-000)', debit: 400, credit: 0 },
        { account: '6110 Rent (101-300-6110-000-000)', debit: 0, credit: 400 },
      ],
      note: `<p>After this entry, Sunny’s books show only its own $600 share of the booth rent.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: split the venture costs',
      instructions: `<p>Next month the booth has two costs: <strong>$2,500</strong> for equipment hire and <strong>$500</strong> for electricity. The ownership is still Sunny 60%, Breezy 40%.</p>`,
      html: `<p>Total shared cost: $ {{}}.</p>
<p>Sunny’s share: $ {{}}. Breezy’s share: $ {{}}.</p>
<p>If the electricity bill is <strong>direct billed</strong> to Breezy instead, Breezy’s invoice becomes $ {{}}.</p>`,
      blanks: [
        { answer: 3000 },
        { answer: 1800 },
        { answer: 1200 },
        { answer: 1500 },
      ],
      explain: `<p>$2,500 + $500 = $3,000. 60% is $1,800 and 40% is $1,200. With direct billing, the whole $500 electricity bill goes to Breezy, and only the $2,500 equipment hire is split: 40% × $2,500 = $1,000, plus $500 = $1,500.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Revenue Management in one breath',
      html: `<p>Oracle Revenue Management automates the five steps of <strong>ASC 606</strong> and <strong>IFRS 15</strong>: (1) identify the contract with the customer, (2) identify the separate performance obligations, (3) determine the transaction price, (4) allocate the price, and (5) recognize revenue when each obligation is satisfied. It imports sales data, groups it into contracts using rules, calculates <strong>standalone selling prices</strong> from your history, and recognizes revenue at a point in time or over time. If Sunny sells a $120 “lemonade for a year” bundle with a free branded bottle, Revenue Management decides how much is bottle revenue today and how much is drinks revenue month by month.</p>`,
    },
    {
      type: 'table',
      caption: 'The Oracle EPM family (separate cloud applications)',
      headers: ['Application', 'What it does', 'Sunny example'],
      rows: [
        ['<strong>Planning</strong>', 'Budgets, forecasts and what-if scenarios, with planning modules for financials, workforce, projects and capital.', 'Sam plans next year’s lemon purchases and new stands.'],
        ['<strong>Financial Consolidation and Close</strong>', 'Consolidates many entities and currencies, eliminates intercompany balances and produces group results.', 'Combine Sunny US and Sunny UK into one group report.'],
        ['<strong>Account Reconciliation</strong>', 'Balance sheet reconciliations (Reconciliation Compliance) and high-volume matching (Transaction Matching).', 'Mia proves the bank balance matches account 1110 each month.'],
        ['<strong>Narrative Reporting</strong>', 'Collaborative report packages made of doclets, with review and sign-off.', 'The annual report to Sunny’s investors.'],
        ['<strong>Tax Reporting</strong>', 'Current and deferred tax calculations and reporting.', 'Year-end income tax provision.'],
        ['<strong>Profitability and Cost Management</strong>', 'Allocations and profitability by product, customer or channel.', 'Is Pink Lemonade really more profitable?'],
        ['<strong>Enterprise Data Management</strong>', 'Governs master data such as charts of accounts and hierarchies across systems.', 'Keep the Sunny COA the same in ERP and EPM.'],
      ],
    },
    {
      type: 'text',
      heading: 'How ERP and EPM work together',
      html: `<p>Think of Fusion ERP as the place where things <strong>happen</strong> (an invoice is entered, a payment is made) and EPM as the place where finance <strong>plans, combines and explains</strong> the numbers. Actual balances flow from the General Ledger into EPM; approved budgets can flow back to the ledger or to budgetary control. Many EPM users work in Excel through <strong>Oracle Smart View for Office</strong>.</p>
<p>Oracle is adding AI agents on both sides — for example planning and reconciliation helpers in EPM, and assistants such as the Joint Venture Transactions Assistant in Financials. Check the What’s New pages each quarter, because these change fast.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: Fusion ERP or Oracle EPM?',
      instructions: `<p>Decide where each job normally happens.</p>`,
      categories: ['Fusion ERP (Financials)', 'Oracle EPM'],
      items: [
        { text: 'Entering and paying the lemon supplier’s invoice', answer: 'Fusion ERP (Financials)' },
        { text: 'Activating a new shop lease and sending payments to Payables', answer: 'Fusion ERP (Financials)' },
        { text: 'Splitting festival booth costs with a partner', answer: 'Fusion ERP (Financials)' },
        { text: 'Building next year’s budget with what-if scenarios', answer: 'Oracle EPM' },
        { text: 'Consolidating Sunny US and Sunny UK into group results', answer: 'Oracle EPM' },
        { text: 'Assembling the annual report with doclets and sign-off', answer: 'Oracle EPM' },
      ],
      explain: `<p>Transactions (invoices, leases, joint venture billing) live in Fusion Financials. Planning, consolidation and narrative reporting belong to EPM, which reads the actual results from the ledger. Small companies sometimes do simple consolidation and budgets in the General Ledger itself; EPM is for when that gets complex.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: don’t buy every cousin on day one',
      html: `<p>Most companies start with the core modules and add these products when a real need appears: a new lease standard, a web shop on another platform, a first joint venture, or a consolidation that has outgrown spreadsheets. Each one needs its own setup, accounts, security roles and testing — plan it as a small project, not a switch.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Accounting Hub', def: 'Oracle product that creates subledger accounting from transaction data in non-Oracle source systems.' },
        { term: 'Right-of-use asset', def: 'The lessee’s asset representing the right to use a leased item over the lease term.' },
        { term: 'Lease liability', def: 'The present value of the lease payments the lessee still has to make.' },
        { term: 'Managing partner', def: 'The joint venture partner that runs the venture, pays costs and bills the other partners.' },
        { term: 'Ownership definition', def: 'In Joint Venture Management, the list of partners and their ownership percentages, which must total 100%.' },
        { term: 'Performance obligation', def: 'A promise in a customer contract to deliver a distinct good or service.' },
        { term: 'EPM', def: 'Enterprise Performance Management: Oracle cloud applications for planning, consolidation, reconciliation and reporting.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Sunny’s web shop runs on non-Oracle software. Which product turns its orders into proper accounting entries?',
          options: ['Lease Accounting', 'Accounting Hub', 'Narrative Reporting', 'Joint Venture Management'],
          answer: 1,
          explain: 'Accounting Hub registers external source systems and uses subledger accounting rules to create journals from their data.',
        },
        {
          q: 'Under IFRS 16 and ASC 842, which two balances does Lease Accounting calculate for an expense lease?',
          options: ['Revenue and receivables', 'Right-of-use asset and lease liability', 'Inventory and cost of sales', 'Cash and equity'],
          answer: 1,
          explain: 'The lessee recognizes a right-of-use asset and a lease liability based on the present value of the lease payments.',
        },
        {
          q: 'A venture cost of $5,000 is shared 70% / 30%. How much does Joint Venture Management bill the 30% partner?',
          options: ['$1,500', '$3,500', '$5,000', '$300'],
          answer: 0,
          explain: '30% × $5,000 = $1,500. The split comes from the ownership definition.',
        },
        {
          q: 'Which job belongs to the Oracle EPM family rather than Fusion Financials?',
          options: ['Paying a supplier invoice', 'Creating a lease', 'Consolidating several companies into group results', 'Billing a joint venture partner'],
          answer: 2,
          explain: 'Financial Consolidation and Close is an EPM application. The other jobs are transactions in Fusion Financials.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Implementing Accounting Hub (26D) – Overview of Oracle Accounting Hub Cloud Features', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiac/overview-of-oracle-accounting-hub-cloud-features.html' },
    { title: 'Implementing Accounting Hub (26D) – How Oracle Accounting Hub Cloud Works', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiac/how-oracle-accounting-hub-cloud-works.html' },
    { title: 'Using Lease Accounting (26D) – Overview of Lease Accounting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faula/overview-of-lease-accounting.html' },
    { title: 'Using Lease Accounting (26D) – Key Features', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faula/key-features.html' },
    { title: 'Using Joint Venture Management (26D) – Introduction to Oracle Joint Venture Management', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fajvu/introduction-to-joint-venture-management.html' },
    { title: 'Using Joint Venture Management (26D) – How Oracle Joint Venture Management Works', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fajvu/how-joint-venture-management-works.html' },
    { title: 'Financials 26D What’s New – Joint Venture Transactions Assistant', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f50845.htm' },
    { title: 'Using Revenue Management (26D) – Overview of Revenue Management', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fafrm/overview-of-revenue-management.html' },
    { title: 'Getting Started with Oracle EPM Cloud for Users – Information Sources', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/enterprise-performance-management-common/cgsus/1_user_epm_cloud_information_sources.html' },
    { title: 'Financial Consolidation and Close – Get Started', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financial-consolidation-cloud/get_started.html' },
    { title: 'Oracle Fusion Cloud EPM', publisher: 'Oracle', url: 'https://www.oracle.com/erp/performance-management/' },
  ],
};
