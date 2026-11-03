export default {
  slug: 'payables-reports',
  title: 'Payables Reports and Dashboards',
  minutes: 20,
  summary:
    'Learn which Payables report answers which question: invoice and payment registers, aging, trial balance, cash requirement, discounts, key indicators, holds and close reports. See where to run them (Scheduled Processes and Reports and Analytics), what the Invoices landing page infotiles show, and which OTBI subject areas let you build your own analyses.',
  objectives: [
    'Pick the right predefined Payables report for common business questions',
    'Explain where Payables reports are run: Scheduled Processes, Reports and Analytics, and OTBI',
    'Describe the infotiles on the Invoices landing page',
    'Name the main Payables OTBI subject areas and what each is good for',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Different report cards for different questions',
      html: `<p>At school, one notebook can be read in many ways. Your teacher can ask "Which homework is late?", "How many pages did you write this month?" or "Who still owes a permission slip?". Each question needs a different list, but they all come from the same notebook.</p>
<p>Payables works the same way. All the invoices and payments live in one place, and <span class="hl">reports</span> are ready-made lists that answer specific questions: "What do we owe?", "What is overdue?", "How much cash do we need on Friday?", "Does Payables match the General Ledger?"</p>`,
    },
    {
      type: 'text',
      heading: 'Three places to get Payables information',
      html: `<p>Oracle Fusion gives Ava and colleagues three main tools. You will learn each one in depth in the <em>Reporting</em> module; here is how they apply to Payables:</p>
<ul>
<li><strong>Scheduled Processes</strong> work area: run the <strong>predefined Payables reports</strong>, most of which are <em>Oracle Analytics Publisher</em> reports (formatted documents you can print or download, often as PDF or Excel). You enter parameters, submit, and open the output. You can also schedule them to run automatically, e.g. every Monday.</li>
<li><strong>Reports and Analytics</strong> work area: browse the catalog under <strong>Shared Folders > Financials > Payables</strong>. Some reports, like the Payables Invoice Register and Payables Payment Register, can be opened here as interactive analyses, and the Payables to Ledger Reconciliation report lives here.</li>
<li><strong>OTBI (Oracle Transactional Business Intelligence)</strong>: build your own real-time analyses by dragging columns from Payables <strong>subject areas</strong>.</li>
</ul>
<p>And for a quick daily picture, the <strong>Invoices landing page</strong> shows live infotiles with counts and amounts you can click into.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Invoices landing page infotiles',
      html: `<p>Open <kbd>Payables</kbd> > <kbd>Invoices</kbd> to see six infotiles, each opening a list of invoices when clicked:</p>
<ul>
<li><strong>Scanned</strong>: incomplete invoices that arrived through scanning, in aging buckets, with the specialist they are assigned to.</li>
<li><strong>Recent</strong>: invoices created or updated in the last 7 days, showing how many still need validation.</li>
<li><strong>Holds</strong>: invoices on hold, grouped by hold type (7, 15, 30 days or all time).</li>
<li><strong>Approvals</strong>: invoices pending your approval, pending with others, and rejected.</li>
<li><strong>Prepayments</strong>: available prepayments in aging buckets.</li>
<li><strong>Payments</strong>: the total amount due in the next 7 days, by currency.</li>
</ul>
<p>Ava starts every morning here: holds first, then approvals, then what is due this week.</p>`,
    },
    {
      type: 'table',
      caption: 'Key predefined Payables reports and the question each one answers',
      headers: ['Report', 'Answers the question…', 'Who / when'],
      rows: [
        ['<strong>Payables Invoice Register</strong>', 'What invoices were entered? (detail by invoice group, dates, period, status)', 'Ava, daily, to check data entry against the paper invoices'],
        ['<strong>Payables Invoice Aging Report</strong>', 'How much do we owe, and how long has it been due? (aging buckets)', 'Ava and Sam, weekly or month-end'],
        ['<strong>Supplier Balance Aging Report</strong>', 'Unpaid invoices per supplier, by aging period', 'When a supplier calls about their balance'],
        ['<strong>Payables Trial Balance Report</strong>', 'Which unpaid invoices make up the liability in the GL?', 'Month-end close, to reconcile with 2110'],
        ['<strong>Payables Payment Register</strong>', 'What payments did we make in a date range?', 'Daily, to cross-check payments made'],
        ['<strong>Payables Cash Requirement Report</strong>', 'How much cash will the next payment run need?', 'Mia, before every payment process request'],
        ['<strong>Payables Discounts Taken and Lost Report</strong>', 'Which discounts did we take, and which did we miss?', 'Monthly, to measure payment efficiency'],
        ['<strong>Payables Key Indicators Report</strong>', 'How many invoices, payments, suppliers and matching holds; how much was modified?', 'Payables manager, each period'],
        ['<strong>Payables Matching Hold Detail Report</strong>', 'Why are invoices on matching holds, and how were holds released?', 'Weekly hold clean-up with buyers like Leo'],
        ['<strong>Payables Negative Supplier Balance Report</strong>', 'Which suppliers owe <em>us</em> money (credit balances)?', 'Monthly; leads to refunds'],
        ['<strong>Payables Period Close Exceptions Report</strong>', 'What blocks the period close?', 'Close days'],
        ['<strong>Payables Unaccounted Transactions and Sweep Report</strong>', 'What hasn’t been accounted yet?', 'Close days'],
        ['<strong>Payables Posted Invoice Register</strong> / <strong>Posted Payment Register</strong>', 'Which accounting lines for invoices / payments reached the GL?', 'Reconciliation'],
        ['<strong>Payables to Ledger Reconciliation Report</strong>', 'Does Payables match the GL, and where is any difference?', 'Close days (after the Prepare process)'],
        ['<strong>Payables Open Items Revaluation Report</strong>', 'How have exchange rates changed the value of open foreign-currency items?', 'Month-end, for companies with foreign suppliers'],
        ['<strong>Payables Selected Installments Report</strong>', 'Which installments did a payment run pick?', 'Automatically with each payment process request'],
        ['<strong>Prepayment Remittance Notice</strong>', 'Which prepayments were applied to which invoices?', 'When suppliers ask about deposits'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Pick the right report',
      instructions: `<p>Sunny’s team has questions. Match each question to the best predefined report.</p>`,
      pairs: [
        { left: 'Mia: “How much cash do we need for Wednesday’s payment run?”', right: 'Payables Cash Requirement Report' },
        { left: 'Sam: “How much of what we owe is more than 30 days overdue?”', right: 'Payables Invoice Aging Report' },
        { left: 'Priya: “Which unpaid invoices make up the 2110 balance at month-end?”', right: 'Payables Trial Balance Report' },
        { left: 'Ava: “Did I key in today’s invoices correctly?”', right: 'Payables Invoice Register' },
        { left: 'Sam: “How many early-payment discounts did we miss last month?”', right: 'Payables Discounts Taken and Lost Report' },
        { left: 'Ava: “Which suppliers have a credit balance we should ask to refund?”', right: 'Payables Negative Supplier Balance Report' },
      ],
      explain: `<p>Each predefined report is built for one kind of question: cash needed (Cash Requirement), how overdue (Invoice Aging), what makes up the GL liability (Trial Balance), what was entered (Invoice Register), discount performance (Discounts Taken and Lost) and credit balances (Negative Supplier Balance).</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Sort the reports into Oracle’s groups',
      instructions: `<p>Oracle’s Payables guide groups its predefined reports by area. Put each report in its group.</p>`,
      categories: ['Invoices', 'Payments', 'Period Close', 'Income Tax and Withholding'],
      items: [
        { text: 'Payables Invoice Aging Report', answer: 'Invoices' },
        { text: 'Payables Matching Hold Detail Report', answer: 'Invoices' },
        { text: 'Payables Cash Requirement Report', answer: 'Payments' },
        { text: 'Payables Payment Register', answer: 'Payments' },
        { text: 'Payables Trial Balance Report', answer: 'Period Close' },
        { text: 'Payables Posted Payment Register', answer: 'Period Close' },
        { text: 'US 1099 Report', answer: 'Income Tax and Withholding' },
        { text: 'Payables Withholding Tax Letter', answer: 'Income Tax and Withholding' },
      ],
      explain: `<p>Invoice reports describe invoices and matching; payment reports help plan and check payments; period close reports (trial balance, posted registers, close exceptions, sweep, revaluation) support month-end; income tax and withholding reports cover 1099s and withholding.</p>`,
    },
    {
      type: 'text',
      heading: 'Building your own analyses with OTBI',
      html: `<p>When no predefined report answers your exact question, OTBI lets you build one. You start by choosing a <strong>subject area</strong>, a ready-made collection of related data. Each subject area has one <strong>fact folder</strong> with numbers you can measure (like unpaid amount or discount available) and several <strong>dimension folders</strong> with descriptive columns (like supplier, due date or bank account). Payables has these subject areas, all "Real Time", meaning they read live data:</p>`,
    },
    {
      type: 'table',
      caption: 'Payables OTBI subject areas',
      headers: ['Subject area', 'Good for'],
      rows: [
        ['Payables Invoices - Transactions Real Time', 'Invoice headers, lines and distributions; the Invoice Register uses it'],
        ['Payables Invoices - Installments Real Time', 'Due dates, unpaid amounts, discounts available'],
        ['Payables Invoices - Prepayment Applications Real Time', 'Which prepayments were applied where'],
        ['Payables Invoices - Trial Balance Real Time', 'Open liability analysis'],
        ['Payables Invoices - Withholding Real Time', 'Withheld amounts by invoice and supplier'],
        ['Payables Payments - Disbursements Real Time', 'Payments made; the Payment Register uses it'],
        ['Payables Payments - Payment History Real Time', 'The history of each payment over time'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Choose the subject area',
      instructions: `<p>Ava wants to build these OTBI analyses. Which subject area should Ava start from?</p>`,
      pairs: [
        { left: 'Installments due next week with the discount still available', right: 'Payables Invoices - Installments Real Time' },
        { left: 'All payments sent to Lemon Grove Farms this year', right: 'Payables Payments - Disbursements Real Time' },
        { left: 'Invoice lines charged to cost center 200 last month', right: 'Payables Invoices - Transactions Real Time' },
        { left: 'Deposits applied to Stand Builders’ invoices', right: 'Payables Invoices - Prepayment Applications Real Time' },
        { left: 'Tax held back from suppliers this quarter', right: 'Payables Invoices - Withholding Real Time' },
      ],
      explain: `<p>Choose the subject area built around the business object you are asking about: installments for due dates and discounts, disbursements for payments, transactions for invoice lines and distributions, prepayment applications for deposits, withholding for withheld tax.</p>`,
    },
    {
      type: 'example',
      title: 'Monday morning at Sunny',
      html: `<p>Sam asks Ava three questions before the weekly finance meeting. Here is how Ava answers each one.</p>`,
      steps: [
        '<strong>“How much do we owe and how old is it?”</strong> Ava has already created aging periods (Current, 1–30, 31–60, over 60 days) on the Create Aging Periods page, so Ava runs the <strong>Payables Invoice Aging Report</strong> for Sunny US BU. Result: $4,200 current, $350 in 1–30 days, nothing older.',
        '<strong>“Can we pay Wednesday’s run?”</strong> Ava runs the <strong>Payables Cash Requirement Report</strong> against the "Sunny Weekly Payments" template: $3,100 needed. Mia confirms the bank balance covers it.',
        '<strong>“Are we losing discounts?”</strong> The <strong>Payables Discounts Taken and Lost Report</strong> shows $12 lost on two Sweet Sugar Co. invoices that were held for approval too long. Ava asks approvers to act faster on discount suppliers.',
      ],
      result: `<p>Three questions, three predefined reports, ten minutes. That is why knowing the report list matters.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: schedule the aging report',
      instructions: `<p>This is a simplified practice screen, not Oracle’s real page. Sam wants the aging report for <strong>Sunny US BU</strong>, for <strong>all suppliers</strong>, as of <strong>January 31, 2026</strong>, using Sunny’s aging periods called <strong>SUNNY 30-60-90</strong>, sent automatically every Monday.</p>`,
      formTitle: 'Schedule New Process: Payables Invoice Aging Report (practice)',
      fields: [
        { label: 'Process name', type: 'text', given: 'Payables Invoice Aging Report' },
        { label: 'Business unit', type: 'select', options: ['Sunny US BU', 'Sunny UK BU'], answer: 'Sunny US BU' },
        { label: 'Supplier', type: 'select', options: ['All', 'Lemon Grove Farms', 'Stand Builders LLC'], answer: 'All' },
        { label: 'As-of date', type: 'date', answer: '2026-01-31' },
        { label: 'Aging period', type: 'select', options: ['SUNNY 30-60-90', 'None'], answer: 'SUNNY 30-60-90', hint: 'Created on the Create Aging Periods page' },
        { label: 'Schedule', type: 'select', options: ['As soon as possible', 'Weekly on Monday'], answer: 'Weekly on Monday' },
      ],
      explain: `<p>Aging needs aging periods to exist first, then you pick the business unit, suppliers and date. Using the schedule option turns a one-off report into an automatic weekly email for Sam. Oracle also recommends running Apply Missing Conversion Rates before aging, so foreign currency invoices are included correctly.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: run a Payables report',
      items: [
        'Open the <strong>Navigator</strong> and go to <kbd>Scheduled Processes</kbd>.',
        'Click <kbd>Schedule New Process</kbd>, search for <kbd>Payables Invoice Aging Report</kbd> (or any report in the table above) and click OK.',
        'Enter the parameters (business unit, supplier, aging period, and so on). Use <kbd>Advanced</kbd> options if you want to schedule it or choose an output format.',
        'Submit, refresh until the status is Succeeded, then open the output from the process details.',
        'For interactive versions, go to <kbd>Reports and Analytics</kbd>, open Shared Folders > Financials > Payables, and browse the Invoices and Payments folders.',
      ],
      note: `<p>Report names come from Oracle’s list of Payables predefined reports. Folder paths, parameters and buttons can differ slightly by release, Redwood page version and your security roles; some reports are only visible to certain roles.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul><li>Schedule your routine reports (aging, cash requirement, close reports) instead of running them by hand.</li><li>When a manager asks for "a report", first ask what decision they want to make. Often a predefined report already answers it.</li><li>Before building a new OTBI analysis, search the shared catalog: someone may have built it already.</li><li>Watch the trend, not just the number: a growing Holds infotile or rising lost discounts is an early warning.</li></ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Predefined report', def: 'A ready-made report delivered by Oracle, such as the Payables Invoice Aging Report, run with parameters.' },
        { term: 'Aging', def: 'Sorting unpaid invoices into time buckets (for example 1-30 or 31-60 days) to see how long amounts have been due.' },
        { term: 'Oracle Analytics Publisher', def: 'The Oracle tool that produces formatted, printable report documents; most Payables reports use it.' },
        { term: 'OTBI', def: 'Oracle Transactional Business Intelligence: a tool to build your own real-time analyses from subject areas.' },
        { term: 'Subject area', def: 'A ready-made collection of related data in OTBI, with measurable facts and descriptive dimensions.' },
        { term: 'Infotile', def: 'A small live summary tile on a landing page, such as Holds or Payments, that opens a list when clicked.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which report should Mia run before a payment run to see how much cash it will need?',
          options: ['Payables Payment Register', 'Payables Cash Requirement Report', 'Payables Key Indicators Report', 'Payables Invoice Register'],
          answer: 1,
          explain: 'The Payables Cash Requirement Report forecasts immediate cash needs and can be run against a payment process request template.',
        },
        {
          q: 'What must exist before the Payables Invoice Aging Report can bucket invoices?',
          options: ['A payment process profile', 'Aging periods created on the Create Aging Periods page', 'A closed period', 'An OTBI subject area'],
          answer: 1,
          explain: 'The aging report uses the aging periods you define, such as 1-30 and 31-60 days.',
        },
        {
          q: 'Ava wants a custom list of installments with discounts available next week. Where should Ava start?',
          options: [
            'The Payables Trial Balance Report',
            'OTBI with the Payables Invoices - Installments Real Time subject area',
            'The Payables Period Close Exceptions Report',
            'The Create Accounting process',
          ],
          answer: 1,
          explain: 'Installment due dates and available discounts live in the Payables Invoices - Installments Real Time subject area.',
        },
        {
          q: 'Which Invoices landing page infotile shows the total amount due in the next 7 days?',
          options: ['Recent', 'Holds', 'Payments', 'Approvals'],
          answer: 2,
          explain: 'The Payments infotile shows, by currency, the total amount due for payment in the next 7 days.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Oracle Fusion Payables Predefined Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/oracle-fusion-payables-predefined-reports.html' },
    { title: 'Invoices Landing Page', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/introducing-the-invoices-landing-page.html' },
    { title: 'Payables Subject Areas, Folders, and Attributes', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-subject-areas-folders-and-attributes.html' },
    { title: 'Overview of Payables Invoice Register', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-payables-invoice-register.html' },
    { title: 'Overview of Payables Invoice Aging Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-invoice-aging-report.html' },
    { title: 'Overview of Payables Cash Requirement Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-cash-requirement-report.html' },
    { title: 'Overview of Payables Key Indicators Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-key-indicators-report.html' },
    { title: 'Overview of Payables Payment Register', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-payment-register-explained.html' },
    { title: 'Overview of Payables Trial Balance Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-trial-balance-report-explained.html' },
    { title: 'Overview of Payables to Ledger Reconciliation Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-to-ledger-reconciliation-report-explained.html' },
  ],
};
