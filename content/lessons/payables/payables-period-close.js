export default {
  slug: 'payables-period-close',
  title: 'Closing the Payables Month',
  minutes: 22,
  summary:
    'At month-end, Payables must be finished, accounted and reconciled to the General Ledger before the period is closed. Follow Ava’s close checklist for January: clean up invoices and payments, create accounting, review the Payables Period Close Exceptions Report, sweep what can’t be fixed, close the period and prove that Payables matches the GL.',
  objectives: [
    'List the steps of a Payables period close in the right order',
    'Use the Payables Period Close Exceptions Report and the Unaccounted Transactions and Sweep process',
    'Reconcile Payables to the General Ledger with the Payables Trial Balance and Payables to Ledger Reconciliation reports',
    'Explain why Payables closes before the General Ledger, and what Payables period statuses mean',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Cleaning out your locker at the end of term',
      html: `<p>On the last day of school term you clean out your locker. You finish any homework still lying there, hand in permission slips, throw away junk, and check that the books you have match the library’s list. Then the teacher <strong>locks</strong> the locker until next term.</p>
<p>Closing the Payables month is the same. Ava finishes every bill and payment for January, makes sure everything is written in the master book, checks that the list of what Sunny owes matches Priya’s General Ledger, and then <span class="hl">locks the January period</span> so nothing new can sneak into it.</p>`,
    },
    {
      type: 'text',
      heading: 'Why close at all?',
      html: `<p>An <strong>accounting period</strong> (like <code>Jan-26</code>) is a box of time. Once January’s numbers are reported to Sam and the bank, they must not change. Closing the Payables period means no more invoices or payments can be accounted into January.</p>
<p>The order matters: <strong>subledgers close first, then the General Ledger</strong>. Payables, Receivables, Assets and Cash Management each finish and send their final journals to the GL. Only then can Priya close the GL period, knowing nothing else is coming. If Payables closes late, the whole company closes late.</p>
<p>Payables has <strong>its own period statuses</strong>, separate from the GL. A period that has never been used shows <em>Never Opened</em>; the current month is <em>Open</em>; a finished month is <em>Closed</em>. Oracle can reopen a closed Payables period if a correction is really needed, but good teams treat that as a rare exception. (If an invoice is dated in a period that isn’t open, validation places it on a closed-period hold until the period is opened.)</p>`,
    },
    {
      type: 'flow',
      title: 'Ava’s Payables close checklist',
      steps: [
        { icon: '📥', label: 'Finish entry', detail: 'Import pending invoices, fix import rejections, enter the paper still on the desk.' },
        { icon: '✅', label: 'Validate & clear holds', detail: 'Validate all invoices; resolve or release holds.' },
        { icon: '👍', label: 'Approve', detail: 'Chase approvers for invoices still waiting.' },
        { icon: '💸', label: 'Complete payments', detail: 'Finish payment process requests and payment files; reconcile payments to the bank.' },
        { icon: '⚙️', label: 'Account & transfer', detail: 'Run Create Accounting (Final, transfer and post) and fix errors.' },
        { icon: '🧹', label: 'Sweep', detail: 'Move transactions that truly can’t be accounted in time into the next period.' },
        { icon: '🔒', label: 'Close the period', detail: 'Close Jan-26 and review the Period Close Exceptions Report.' },
        { icon: '⚖️', label: 'Reconcile', detail: 'Prove Payables equals the GL liability; open Feb-26.' },
      ],
    },
    {
      type: 'table',
      caption: 'The checklist in detail (based on Oracle’s Payables close guidance)',
      headers: ['Step', 'What Ava does in Oracle', 'Why'],
      rows: [
        ['1. Complete transactions', 'Run the <strong>Import Payables Invoices</strong> process and correct rejections; approve invoices; resolve holds; validate invoices.', 'Everything that belongs to January should be in January.'],
        ['2. Complete payments', 'Finish or terminate open payment process requests and payment files. Run the invoice and payment registers.', 'Incomplete payment requests block the close.'],
        ['3. Special processes', 'Run <strong>Update Matured Bills Payable Status</strong> (if bills payable are used) and <strong>Apply Missing Conversion Rates</strong> (for foreign currency).', 'Missing rates stop accounting.'],
        ['4. Bank reconciliation', 'Mia reconciles payments to bank statements in Cash Management.', 'Required if payments are accounted at clearing.'],
        ['5. Account and transfer', 'Run <strong>Create Accounting</strong> with Transfer to General Ledger = Yes; transfer any final entries that were not transferred; read the output.', 'The GL only knows what was transferred.'],
        ['6. Sweep', 'Run the <strong>Payables Unaccounted Transactions and Sweep</strong> process if policy allows.', 'Unaccounted items would otherwise block the close.'],
        ['7. Close', 'Close the current Payables period and review the <strong>Payables Period Close Exceptions Report</strong>.', 'Locks January.'],
        ['8. Reconcile', 'Run the Payables Trial Balance, Posted Invoice Register, Posted Payment Register, Payables to Ledger Reconciliation and Open Items Revaluation reports.', 'Proves the subledger and GL agree.'],
        ['9. Open next period', 'Open Feb-26, run interface processes such as <strong>Create Mass Additions</strong> (to Assets) and <strong>Transfer Costs to Cost Management</strong>, and run tax and key indicator reports.', 'Ready for February work.'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Payables Period Close Exceptions Report',
      html: `<p>When you close a Payables period, the period close process generates the <strong>Payables Period Close Exceptions Report</strong> automatically. You can also run it any time from the <strong>Scheduled Processes</strong> work area (parameters: ledger, accounting date range or period name). It shows, for each business unit in the ledger:</p>
<ul>
<li>Unaccounted invoices</li>
<li>Unaccounted payment activity</li>
<li>Bills payable requiring a maturity event and accounting</li>
<li>Incomplete payment process requests</li>
<li>Open intercompany transactions</li>
<li>Unsubmitted and incomplete supplier portal invoices</li>
<li>Other exceptions</li>
</ul>
<p>It has a <strong>Summary</strong> (including whether you have access to each business unit), <strong>Details</strong> (supplier, invoice number, accounting date) and <strong>Corrective actions</strong>. Smart teams run it a few days <em>before</em> month-end as a to-do list.</p>`,
    },
    {
      type: 'text',
      heading: 'Sweeping: moving what can’t be finished',
      html: `<p>Sometimes an invoice simply can't be fixed in time, for example a hold that needs a supplier answer that won't come until February. If the company’s accounting policy allows it, Ava runs the <strong>Payables Unaccounted Transactions and Sweep</strong> process. It:</p>
<ul>
<li>lists invoices and payments that weren't accounted for the period, and</li>
<li>can <strong>sweep</strong> them, which changes their accounting date to the <strong>first day of the next open period</strong>, so the current period can close.</li>
</ul>
<p>Sweep only moves <em>unaccounted</em> transactions. It doesn't move transactions that are already accounted, or accounted with errors. For those, fix the error and run Create Accounting again. Sweeping is a tool, not a habit: if Ava sweeps the same invoices every month, the real problem needs solving.</p>`,
    },
    {
      type: 'text',
      heading: 'Reconciling Payables to the General Ledger',
      html: `<p>The most important question at close: <strong>does the amount Payables says we owe equal the balance of 2110 Accounts Payable – Trade in the GL?</strong> Oracle gives two main tools:</p>
<ul>
<li><strong>Payables Trial Balance Report</strong>: lists and subtotals, by supplier and liability account, all unpaid and partially paid invoices that Payables transferred to the GL. Its total should equal the GL liability balance.</li>
<li><strong>Payables to Ledger Reconciliation Report</strong>: an interactive report with a summary of begin balance, activity and end balance on both the Payables side and the accounting side, with a <em>Difference</em> column you can drill into. First run the <strong>Prepare Payables to General Ledger Reconciliation</strong> process from Scheduled Processes; then open the report from <strong>Reports and Analytics</strong> under Shared Folders > Financials > Payables > Payables to Ledger Reconciliation.</li>
</ul>
<p>Two setup tips from Oracle: the natural account values for payables accounts need the <strong>Financial Category</strong> "Accounts Payable" for the reconciliation process to find them, and reconciliation is much easier if no other GL source posts directly to payables accounts.</p>`,
    },
    {
      type: 'table',
      caption: 'Common reasons Payables and the GL don’t match',
      headers: ['Reason', 'How to find it', 'Fix'],
      rows: [
        ['Transactions not accounted', 'Period Close Exceptions Report, Unaccounted Transactions report', 'Fix errors, run Create Accounting'],
        ['Accounted but not transferred or posted', 'Subledger journal status; GL journal status', 'Transfer and post'],
        ['Manual GL journal posted to 2110', 'Reconciliation report: non-Payables activity', 'Ask Priya to reverse it or record it in the subledger'],
        ['Entries to an account outside the report’s range', 'Detail drill-down', 'Correct the account or include it'],
        ['Report run before late changes', 'Compare run times', 'Rerun the Prepare process'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Which tool solves it?',
      instructions: `<p>Match each close problem to the Oracle report or process Ava should use.</p>`,
      pairs: [
        { left: 'What is blocking the Payables period from closing?', right: 'Payables Period Close Exceptions Report' },
        { left: 'An invoice can’t be fixed this month and policy allows moving it', right: 'Payables Unaccounted Transactions and Sweep' },
        { left: 'Which unpaid invoices make up the payables balance at month-end?', right: 'Payables Trial Balance Report' },
        { left: 'Build the data for comparing Payables with the GL', right: 'Prepare Payables to General Ledger Reconciliation' },
        { left: 'Drill into differences between Payables and accounting balances', right: 'Payables to Ledger Reconciliation Report' },
        { left: 'Foreign currency invoices have no conversion rate', right: 'Apply Missing Conversion Rates' },
      ],
      explain: `<p>Exceptions report = what blocks the close; sweep = move unaccounted items to the next period; trial balance = what we owe by supplier; the Prepare process feeds the interactive reconciliation report; Apply Missing Conversion Rates fixes foreign currency transactions so they can be accounted.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny closes January',
      html: `<p>It is February 2. Ava runs the <strong>Payables Period Close Exceptions Report</strong> for Sunny US Ledger, period Jan-26. It shows one unaccounted invoice: a $75 Cup &amp; Straw Supply invoice with an invalid distribution account. Ava corrects the account, revalidates, and runs Create Accounting in Final mode with transfer and post. The report is now clean, so Ava closes Jan-26.</p>`,
      steps: [
        'The <strong>Payables Trial Balance Report</strong> for January 31 shows open invoices: Lemon Grove Farms $500, Bright Power Utility $150, Cup &amp; Straw Supply $75. Total <strong>$725</strong>.',
        'Priya’s GL balance for <code>101-100-2110-000-000</code> on January 31: <strong>$725</strong>.',
        'Ava runs <strong>Prepare Payables to General Ledger Reconciliation</strong> for Jan-26, then opens the <strong>Payables to Ledger Reconciliation</strong> report. The Difference column shows zero.',
        'Ava also looks at <code>2120 Received Not Invoiced Accrual</code>: $300 for cups received on January 30 with no invoice yet. That is expected. Ava makes a note to watch for the invoice.',
        'Ava opens Feb-26 and tells Priya that Payables is closed. Priya can now close the GL.',
      ],
      result: `<p>Payables equals the GL. Sam can trust the "we owe $725" number in January’s balance sheet.</p>`,
    },
    {
      type: 'journal',
      title: 'Why 2120 shows $300 at month-end: cups received but not yet billed (receipt accounting)',
      lines: [
        { account: '5130 Cups and Straws Cost (101-200-5130-010-000)', debit: 300, credit: 0 },
        { account: '2120 Received Not Invoiced Accrual (101-100-2120-000-000)', debit: 0, credit: 300 },
      ],
      note: `<p>Thanks to at-receipt accrual, January already carries the cost of the cups even though the invoice arrives in February. When Ava accounts the invoice, 2120 is cleared and 2110 increases. Reviewing old items in 2120 at every close is a great way to find lost invoices.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Find the difference',
      instructions: `<p>It is March 2. Ava reconciles February. Fill in the blanks.</p>`,
      html: `<p>The Payables Trial Balance lists open invoices of $600 (Lemon Grove Farms), $150 (Bright Power Utility) and $200 (Sweet Sugar Co.). The total is $ {{}}. Priya’s GL balance for 2110 Accounts Payable – Trade is $1,050. The difference is $ {{}}. The reconciliation report shows a manual GL journal posted straight to 2110, so the difference is {{}} activity (Payables or non-Payables?).</p>`,
      blanks: [
        { answer: 950 },
        { answer: 100 },
        { answer: ['non-Payables', 'nonpayables', 'non payables'], hint: 'It did not come from Payables' },
      ],
      explain: `<p>$600 + $150 + $200 = $950. $1,050 − $950 = $100. A journal entered directly in the GL to a payables account is non-Payables activity; Priya should reverse it or the correction should be made in Payables, then the Prepare process is rerun.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'New in release 26D: Payables Period Close Workspace',
      html: `<p>Oracle’s 26D What’s New introduces a <strong>Payables Period Close Workspace</strong>, an AI-assisted (agentic) app. For a chosen ledger and period it gathers invoice, payment and period status, groups the exceptions blocking the close, suggests <em>Priority Actions</em>, lets you investigate with <em>Ask Oracle</em>, and guides steps such as opening the next period, sweeping eligible unaccounted transactions and closing the current period, following the company’s own close procedure rules. The checklist in this lesson is still what happens underneath.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips for a smooth close',
      html: `<ul><li>Agree a <strong>cutoff</strong> with the team: for example, invoices received after 3 p.m. on the last working day go into next month.</li><li>Run Create Accounting daily, so month-end has few surprises.</li><li>Close Payables on a fixed working day (Sunny uses working day 2) and tell the GL team as soon as it’s done.</li><li>Keep the reconciliation output with the month’s close file; auditors will ask for it.</li></ul>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put Ava’s close in order',
      instructions: `<p>Arrange the Payables close steps from first to last.</p>`,
      items: [
        'Import, validate and approve the last invoices; resolve holds',
        'Complete payment process requests and payment files',
        'Run Create Accounting in Final with transfer to the General Ledger',
        'Sweep unaccounted transactions that can’t be fixed (if policy allows)',
        'Close the Payables period and review the Period Close Exceptions Report',
        'Reconcile Payables to the GL and open the next period',
      ],
      explain: `<p>Finish the work, account it, move what truly can’t be finished, close, then prove the numbers match. Reconciling before accounting is complete would only show differences you already know about.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: run the close reports',
      items: [
        'Open <kbd>Scheduled Processes</kbd> and click <kbd>Schedule New Process</kbd>.',
        'Run <kbd>Payables Period Close Exceptions Report</kbd> for your ledger and period; fix what it lists.',
        'If needed, run <kbd>Payables Unaccounted Transactions and Sweep Report</kbd> to review (and, if allowed, sweep) unaccounted items.',
        'After closing the period, run <kbd>Payables Trial Balance Report</kbd> and compare its total to the GL liability balance.',
        'Run <kbd>Prepare Payables to General Ledger Reconciliation</kbd>, then open <strong>Reports and Analytics</strong> > Shared Folders > Financials > Payables > <kbd>Payables to Ledger Reconciliation</kbd>.',
      ],
      note: `<p>The exact task for opening and closing Payables periods, and some labels, differ by release, Redwood page version and the roles you have. Closing periods is usually limited to a Payables manager.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Period close', def: 'Finishing all work for an accounting period and locking it so no more transactions are accounted into it.' },
        { term: 'Payables Period Close Exceptions Report', def: 'An Oracle report that lists everything preventing a Payables period from closing, with suggested fixes.' },
        { term: 'Sweep', def: 'Moving unaccounted transactions to the first day of the next open period so the current period can close.' },
        { term: 'Payables Trial Balance Report', def: 'Lists all unpaid and partly paid invoices transferred to the GL, by supplier and liability account, to compare with the GL.' },
        { term: 'Payables to Ledger Reconciliation Report', def: 'An interactive report comparing Payables balances and activity with the accounting in the General Ledger.' },
        { term: 'Reconciliation', def: 'Proving that two records of the same thing, such as Payables and the GL, agree, and explaining any difference.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Why must Payables close before the General Ledger?',
          options: [
            'Because the GL has fewer accounts',
            'Because Payables must send all its final journals to the GL before the GL period can be closed',
            'Because Oracle closes them in alphabetical order',
            'It doesn’t matter which closes first',
          ],
          answer: 1,
          explain: 'Subledgers feed the GL. If Payables is still adding journals, the GL numbers are not final.',
        },
        {
          q: 'Which report automatically lists unaccounted invoices, unaccounted payments and incomplete payment process requests that block the close?',
          options: ['Payables Invoice Register', 'Payables Period Close Exceptions Report', 'Payables Cash Requirement Report', 'Payables Key Indicators Report'],
          answer: 1,
          explain: 'The Payables Period Close Exceptions Report is generated by the period close and lists the blocking exceptions with corrective actions.',
        },
        {
          q: 'An invoice can’t be accounted in January because the supplier must answer a question. Policy allows moving it. What should Ava use?',
          options: ['Delete the invoice', 'The Payables Unaccounted Transactions and Sweep process', 'A manual GL journal', 'Void the payment'],
          answer: 1,
          explain: 'Sweep moves unaccounted transactions to the first day of the next open period so January can close.',
        },
        {
          q: 'The Payables Trial Balance shows $725 but the GL 2110 balance is $825. Which is a likely cause?',
          options: [
            'Someone posted a $100 manual GL journal to the payables account',
            'The supplier changed their bank account',
            'A payment term was 2/10 Net 30',
            'The invoice has two installments',
          ],
          answer: 0,
          explain: 'Journals posted directly in the GL to a payables account create non-Payables activity, a classic cause of differences.',
        },
        {
          q: 'What must you run before opening the Payables to Ledger Reconciliation report?',
          options: ['Create Mass Additions', 'Prepare Payables to General Ledger Reconciliation', 'Apply Missing Conversion Rates', 'Initiate Payment Process Request'],
          answer: 1,
          explain: 'The Prepare Payables to General Ledger Reconciliation process builds the data the report shows.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Considerations for Closing a Payables Period', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/considerations-for-closing-a-payables-period.html' },
    { title: 'Payables Period Close Exceptions Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-period-close-exceptions-report.html' },
    { title: 'Overview of Payables Unaccounted Transactions and Sweep Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-unaccounted-transactions-and-sweep-report-explained.html' },
    { title: 'Overview of Payables Trial Balance Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-trial-balance-report-explained.html' },
    { title: 'Overview of Payables to Ledger Reconciliation Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-to-ledger-reconciliation-report-explained.html' },
    { title: 'Prepare Payables to General Ledger Reconciliation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/prepare-payables-to-general-ledger-reconciliation.html' },
    { title: 'Considerations For Payables to Ledger Reconciliation Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/considerations-for-payables-to-general-ledger-reconciliation.html' },
    { title: 'What happens if I create recurring invoices for a Payables period with a status of Never Opened?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/what-happens-if-i-create-recurring-invoices-for-a-payables.html' },
    { title: 'Oracle Fusion Cloud Financials 26D What’s New: Payables Period Close Workspace', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51249.htm' },
  ],
};
