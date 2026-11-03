/**
 * Curriculum manifest.
 *
 * This file is the single source of truth for the ORDER of modules and lessons.
 * Each lesson lives in its own file: content/lessons/<moduleId>/<lessonSlug>.js
 * and is loaded on demand. See docs/CONTENT_GUIDE.md before editing.
 *
 * Learners are encouraged (not forced) to follow this order:
 * 1. The Basics  ->  2. Accounts Payable  ->  3. Everything else.
 *
 * "Everything else" follows the money, the way a beginner meets it at work:
 * buying (Procurement) and paying people back (Expenses) sit next to Payables;
 * then money coming in (Receivables) and the bank (Cash Management); then the
 * things we keep (Assets); then the General Ledger, where every module's
 * journals land and the month is closed; then reports, data and extras.
 */

export const curriculum = [
  {
    id: 'basics',
    title: 'Start Here: The Basics',
    short: 'Basics',
    icon: '🧱',
    color: '#2f7cf6',
    description:
      'What an ERP is, what Oracle Fusion Cloud ERP is, the money words you need, how to move around the screens, and the building blocks every company sets up first.',
    lessons: [
      { slug: 'what-is-erp', title: 'What Is an ERP? The Big Shared Notebook' },
      { slug: 'meet-oracle-fusion', title: 'Meet Oracle Fusion Cloud ERP' },
      { slug: 'money-words', title: 'Money Words 101: Accounts, Debits and Credits' },
      { slug: 'finding-your-way', title: 'Finding Your Way Around the Screens' },
      { slug: 'enterprise-structure', title: 'The Building Blocks: Enterprise Structure' },
      { slug: 'ledger-and-coa', title: 'Ledgers and the Chart of Accounts (the Four Cs)' },
      { slug: 'setup-and-maintenance', title: 'Setting Things Up: Setup and Maintenance' },
      { slug: 'security-and-roles', title: 'Who Can Do What: Users, Roles and Security' },
      { slug: 'big-journeys', title: 'The Big Journeys: Procure-to-Pay, Order-to-Cash, Record-to-Report' },
    ],
  },
  {
    id: 'payables',
    title: 'Accounts Payable (Paying the Bills)',
    short: 'Payables',
    icon: '💸',
    color: '#e8590c',
    description:
      'Everything about paying suppliers: suppliers, invoices, matching, holds, approvals, accounting, payments, prepayments, taxes and closing the month.',
    lessons: [
      { slug: 'what-is-payables', title: 'What Is Accounts Payable?' },
      { slug: 'suppliers', title: 'Suppliers: The People We Buy From' },
      { slug: 'procure-to-pay', title: 'The Procure-to-Pay Journey' },
      { slug: 'invoice-types', title: 'Kinds of Invoices' },
      { slug: 'entering-invoices', title: 'Getting Invoices Into the System' },
      { slug: 'matching', title: 'Matching: Did We Get What We Paid For?' },
      { slug: 'validation-and-holds', title: 'Validation and Holds: The Safety Checks' },
      { slug: 'invoice-approval', title: 'Invoice Approval: Getting a Thumbs-Up' },
      { slug: 'payables-accounting', title: 'Accounting for Invoices' },
      { slug: 'payment-setup', title: 'Getting Ready to Pay: Terms, Methods and Banks' },
      { slug: 'paying-suppliers', title: 'Paying Suppliers: Payment Process Requests and More' },
      { slug: 'prepayments', title: 'Prepayments: Paying in Advance' },
      { slug: 'taxes-and-withholding', title: 'Taxes and Withholding on Invoices' },
      { slug: 'payables-period-close', title: 'Closing the Payables Month' },
      { slug: 'payables-reports', title: 'Payables Reports and Dashboards' },
      { slug: 'payables-story', title: 'Practice Story: Sunny Lemonade Pays for Lemons' },
    ],
  },
  {
    id: 'procurement',
    title: 'Procurement (Buying Things)',
    short: 'Procurement',
    icon: '🛒',
    color: '#1971c2',
    description: 'The buying side that feeds Payables: requisitions, purchase orders and receiving.',
    lessons: [
      { slug: 'procurement-overview', title: 'Procurement for Finance People' },
      { slug: 'requisitions-and-pos', title: 'Requisitions and Purchase Orders' },
      { slug: 'receiving', title: 'Receiving: Did the Box Arrive?' },
    ],
  },
  {
    id: 'expenses',
    title: 'Expenses (Paying People Back)',
    short: 'Expenses',
    icon: '🧾',
    color: '#d9480f',
    description: 'How employees get paid back for things they buy for work.',
    lessons: [
      { slug: 'what-is-expenses', title: 'What Is Expenses?' },
      { slug: 'expense-reports', title: 'Creating Expense Reports' },
      { slug: 'policies-and-cards', title: 'Expense Policies and Corporate Cards' },
      { slug: 'expense-approval-and-payment', title: 'Approval, Audit and Getting Paid Back' },
    ],
  },
  {
    id: 'receivables',
    title: 'Accounts Receivable (Collecting Money)',
    short: 'Receivables',
    icon: '💰',
    color: '#0c8599',
    description:
      'Billing customers and collecting what they owe: customers, transactions, receipts, collections and revenue.',
    lessons: [
      { slug: 'what-is-receivables', title: 'What Is Accounts Receivable?' },
      { slug: 'customers', title: 'Customers: The People Who Buy From Us' },
      { slug: 'transactions', title: 'Transactions: Invoices, Credit Memos and Debit Memos' },
      { slug: 'receipts', title: 'Receipts: When the Money Arrives' },
      { slug: 'collections', title: 'Collections: Kindly Asking People to Pay' },
      { slug: 'revenue-management', title: 'Revenue Management: When Do We Count the Money?' },
      { slug: 'receivables-close', title: 'Closing the Receivables Month' },
      { slug: 'receivables-story', title: 'Practice Story: Sunny Lemonade Bills a Cafe' },
    ],
  },
  {
    id: 'cash',
    title: 'Cash Management (Watching the Bank)',
    short: 'Cash',
    icon: '🏦',
    color: '#5f3dc4',
    description: 'Bank accounts, bank statements, reconciliation and knowing how much cash you really have.',
    lessons: [
      { slug: 'what-is-cash-management', title: 'What Is Cash Management?' },
      { slug: 'banks-and-accounts', title: 'Banks, Branches and Bank Accounts' },
      { slug: 'bank-statements', title: 'Bank Statements: The Bank’s Diary' },
      { slug: 'bank-reconciliation', title: 'Bank Reconciliation: Do Our Books Match the Bank?' },
      { slug: 'cash-positioning', title: 'Cash Positioning and Forecasting' },
    ],
  },
  {
    id: 'assets',
    title: 'Fixed Assets (Things We Keep)',
    short: 'Assets',
    icon: '🏭',
    color: '#c2255c',
    description: 'Big things a company owns for years: adding them, depreciating them, moving them and retiring them.',
    lessons: [
      { slug: 'what-are-assets', title: 'What Are Fixed Assets?' },
      { slug: 'books-and-categories', title: 'Asset Books and Categories' },
      { slug: 'adding-assets', title: 'Adding Assets (Including From Payables)' },
      { slug: 'depreciation', title: 'Depreciation: Things Wear Out' },
      { slug: 'asset-changes', title: 'Adjusting, Transferring and Retiring Assets' },
      { slug: 'assets-close', title: 'Closing the Assets Period' },
    ],
  },
  {
    id: 'gl',
    title: 'General Ledger (The Master Book)',
    short: 'General Ledger',
    icon: '📒',
    color: '#2b8a3e',
    description:
      'The master book of the company: chart of accounts in depth, journals, allocations, periods, currencies, consolidation and financial reporting.',
    lessons: [
      { slug: 'what-is-gl', title: 'What Is the General Ledger?' },
      { slug: 'coa-deep-dive', title: 'Chart of Accounts Deep Dive' },
      { slug: 'journals', title: 'Journals: Writing in the Master Book' },
      { slug: 'special-journals', title: 'Special Journals: Recurring, Reversing and Allocations' },
      { slug: 'periods-and-close', title: 'Accounting Periods and Closing the Month' },
      { slug: 'multiple-currencies', title: 'Working With Many Currencies' },
      { slug: 'ledger-sets-and-consolidation', title: 'Ledger Sets, Secondary Ledgers and Consolidation' },
      { slug: 'gl-inquiry-and-reporting', title: 'Looking at Balances and Financial Statements' },
      { slug: 'gl-story', title: 'Practice Story: Sunny Lemonade Closes the Month' },
    ],
  },
  {
    id: 'reporting',
    title: 'Reports and Analytics (Seeing the Numbers)',
    short: 'Reporting',
    icon: '📊',
    color: '#087f5b',
    description: 'The many ways to get information out: OTBI, BI Publisher, Financial Reporting, Smart View and dashboards.',
    lessons: [
      { slug: 'reporting-landscape', title: 'The Reporting Toolbox' },
      { slug: 'otbi', title: 'OTBI: Asking the System Questions' },
      { slug: 'bi-publisher', title: 'BI Publisher: Pixel-Perfect Documents' },
      { slug: 'financial-reporting-smart-view', title: 'Financial Reports and Smart View' },
    ],
  },
  {
    id: 'data',
    title: 'Data, Integrations and Automation',
    short: 'Data',
    icon: '🔌',
    color: '#495057',
    description: 'Loading lots of data, connecting to other systems and running jobs automatically.',
    lessons: [
      { slug: 'getting-data-in', title: 'Getting Lots of Data In: FBDI and Spreadsheets' },
      { slug: 'scheduled-processes', title: 'Scheduled Processes: The Robots That Do Jobs' },
      { slug: 'apis-and-integration', title: 'REST APIs and Talking to Other Systems' },
    ],
  },
  {
    id: 'beyond',
    title: 'More Financial Tools',
    short: 'More Tools',
    icon: '🧩',
    color: '#862e9c',
    description: 'Tax, intercompany, budgetary control and other helpful pieces of the ERP family.',
    lessons: [
      { slug: 'tax', title: 'Oracle Fusion Tax' },
      { slug: 'intercompany', title: 'Intercompany: When Sister Companies Trade' },
      { slug: 'budgetary-control', title: 'Budgetary Control: Don’t Spend More Than You Have' },
      { slug: 'other-financials', title: 'More Family Members: Accounting Hub, Leases, Joint Ventures and EPM' },
    ],
  },
  {
    id: 'journey',
    title: 'Updates, AI and Your Learning Journey',
    short: 'Your Journey',
    icon: '🚀',
    color: '#f08c00',
    description: 'How Fusion keeps changing, the AI helpers inside it, and where to keep learning.',
    lessons: [
      { slug: 'quarterly-updates', title: 'Quarterly Updates: The App That Keeps Growing' },
      { slug: 'ai-in-fusion', title: 'AI Helpers Inside Fusion' },
      { slug: 'keep-learning', title: 'Where to Keep Learning (and Certifications)' },
      { slug: 'capstone', title: 'Capstone: A Whole Year at Sunny Lemonade' },
    ],
  },
];

/** Build the canonical lesson id used for progress tracking. */
export const lessonId = (moduleId, slug) => `${moduleId}/${slug}`;
