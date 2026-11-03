export default {
  slug: 'receivables-close',
  title: 'Closing the Receivables Month',
  minutes: 17,
  summary:
    'At month-end Receivables must finish its work, create accounting, prove its balances match the General Ledger and then close the period. Learn the close checklist, Close Pending vs. Closed, the Receivables to Ledger Reconciliation report, the aging review and how to fix differences.',
  objectives: [
    'List the main Receivables month-end tasks in the right order',
    'Explain the difference between Close Pending and Closed periods',
    'Describe how the Receivables to General Ledger reconciliation extract and report work',
    'Investigate a reconciliation difference and correct it',
    'Explain why the aging report and the GL receivables balance should agree',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Counting the class trip money',
      html: `<p>Your class collects money for a school trip. The teacher keeps a <strong>list</strong> of who paid and who still owes. The school office keeps a <strong>money box</strong> and its own big book.</p>
<p>At the end of the month the teacher and the office sit together. They make sure every payment on the list is also in the big book, nobody was counted twice, and the “still owes” total on the list equals what the big book says is owed. If something doesn’t match, they find out why <strong>before</strong> they close the month and start a fresh page.</p>
<p>That is exactly what the <span class="hl">Receivables month-end close</span> is: finish the work, make the books match, then lock the page.</p>`,
    },
    {
      type: 'text',
      heading: 'Why Receivables has its own close',
      html: `<p>Receivables is a <strong>subledger</strong> — a detailed book of every customer invoice, credit and receipt. The <strong>General Ledger</strong> (GL) only holds the summary: one balance in <code>1210 Accounts Receivable</code>. Every month the company must prove that the detail and the summary agree. Auditors ask for this proof, and Priya cannot close the GL with confidence until Receivables is done.</p>
<p>Receivables has its own <strong>accounting periods</strong> (Jan-26, Feb-26 …) that follow the ledger’s calendar. Oracle’s implementation guide says period statuses are managed from the <strong>Receivables Balances</strong> work area, along with reconciliation to the GL.</p>`,
    },
    {
      type: 'flow',
      title: 'Omar’s month-end checklist',
      steps: [
        { icon: '🧾', label: '1. Finish billing', detail: 'Complete or clean up incomplete transactions. Fix AutoInvoice errors and rerun the import so no bill is left behind.' },
        { icon: '📆', label: '2. Recognize revenue', detail: 'Run Recognize Revenue so invoices with rules have their revenue distributions for the month.' },
        { icon: '💵', label: '3. Finish cash', detail: 'Process the last lockbox files, apply receipts, resolve unidentified and unapplied cash, approve adjustments, remit and clear receipts.' },
        { icon: '📒', label: '4. Create accounting', detail: 'Run Create Receivables Accounting in final mode and make sure journals transfer and post to the GL. Fix accounting errors.' },
        { icon: '⏸️', label: '5. Close Pending', detail: 'Set the Receivables period to Close Pending so no new activity lands while you reconcile. Open the next period so work continues.' },
        { icon: '🧪', label: '6. Check exceptions', detail: 'Run the Subledger Period Close Exceptions report. Fix problems, or sweep invalid items to the next period.' },
        { icon: '⚖️', label: '7. Reconcile', detail: 'Run Prepare Receivables to General Ledger Reconciliation, then review the reconciliation report and the aging by GL account.' },
        { icon: '🔒', label: '8. Close', detail: 'Set the period to Closed. Then Priya closes the GL period.' },
      ],
      note: `<p>Every company tunes this list, and many run some steps every day rather than only at month-end (applying cash and creating accounting daily makes month-end much calmer).</p>`,
    },
    {
      type: 'table',
      caption: 'Close Pending vs. Closed (Oracle’s rules in plain words)',
      headers: ['Question', 'Close Pending', 'Closed'],
      rows: [
        ['Can new transactions be entered in the period?', 'No', 'No'],
        ['Checks for unposted items?', 'No', 'Yes — unposted items must be cleared first'],
        ['Checks for incomplete invoices and orphan accounting lines?', 'No', 'Yes'],
        ['Can accounting still be created for activity already in the period?', 'Yes', 'No (reopen first)'],
        ['Typical use', 'During review and reconciliation', 'Final lock after reconciliation'],
        ['Can it be reopened?', 'Yes — but not after the GL period is closed', 'Yes — but not after the GL period is closed'],
      ],
    },

    {
      type: 'exercise',
      kind: 'classify',
      title: 'Close Pending, Closed, or both?',
      instructions: `<p>Sort each statement about Receivables period statuses.</p>`,
      categories: ['Close Pending only', 'Closed only', 'Both'],
      items: [
        { text: 'Blocks new transactions from being entered in the period', answer: 'Both' },
        { text: 'Requires unposted items to be cleared before you can set it', answer: 'Closed only' },
        { text: 'Checks for incomplete invoices and orphan accounting lines', answer: 'Closed only' },
        { text: 'Still lets you create accounting for activity already in the period', answer: 'Close Pending only' },
        { text: 'Can’t be reopened once the GL period has been closed', answer: 'Both' },
      ],
      explain: `<p>Both statuses stop new entries and both are locked once the GL period closes. <strong>Closed</strong> is the strict one: it validates unposted items, incomplete invoices and orphan lines. <strong>Close Pending</strong> is the review mode: no new transactions, but accounting for existing activity can still be finished.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the reconciliation tools',
      html: `<ul>
<li><strong>Prepare Receivables to General Ledger Reconciliation</strong> – a scheduled process that extracts the data. You give it a unique request name, the ledger, optionally a business unit, the period, and choices to include intercompany, on-account items and unapplied/unidentified receipts.</li>
<li><strong>Receivables to General Ledger Reconciliation Report</strong> – the main reconciliation tool. Oracle lists it under Reports and Analytics as <em>Receivables to Ledger Reconciliation</em>. The <strong>Summary</strong> shows Receivables beginning and ending balances, the period’s activity, how it was accounted, and the GL balance; you can drill into any <strong>Difference</strong> amount.</li>
<li><strong>Receivables Aging by General Ledger Account Report</strong> – open balances by GL account as of a date. Its totals should agree with the reconciliation report’s ending balance.</li>
<li><strong>Potential Reconciling Items Report</strong> – finds journals that posted to unexpected account types (for example revenue posted to an asset account), usually caused by setup errors.</li>
<li><strong>Subledger Period Close Exceptions</strong> report and the <strong>Sweep Subledger Transactions to Another Period</strong> process – find what blocks the close and, if appropriate, move it to the next open period.</li>
</ul>
<p>One setup is required: every natural account with the Receivables account class (for Sunny, <code>1210</code>) must have the <strong>financial category</strong> “Accounts Receivable” assigned in the chart of accounts, or the report finds nothing.</p>`,
    },

    {
      type: 'exercise',
      kind: 'order',
      title: 'Order the month-end steps',
      instructions: `<p>Omar has a sticky note with the close tasks, but they got mixed up. Put them in the right order.</p>`,
      items: [
        'Fix AutoInvoice errors and complete remaining transactions',
        'Run Recognize Revenue',
        'Apply remaining receipts and resolve unapplied cash',
        'Run Create Receivables Accounting and post to the GL',
        'Set the Receivables period to Close Pending',
        'Run the reconciliation extract and review the report',
        'Set the Receivables period to Closed',
      ],
      explain: `<p>First finish the business activity (billing, revenue, cash), then create accounting so everything reaches the GL, then freeze the period with Close Pending, reconcile, and only then close. Closing before reconciling risks locking in an error you then can’t fix in that period.</p>`,
    },
    {
      type: 'text',
      heading: 'Reading the reconciliation: where differences come from',
      html: `<p>In a perfect month, Receivables, its accounting and the GL all show the same ending balance. When they don’t, Oracle’s guide points to the usual suspects:</p>
<ul>
<li><strong>Unaccounted transactions</strong> – activity exists in Receivables but Create Receivables Accounting hasn’t run (or failed).</li>
<li><strong>Not transferred or not posted</strong> – accounting exists but hasn’t reached the GL yet.</li>
<li><strong>Accounts outside the range</strong> – a transaction was accounted to an account not included in the extract.</li>
<li><strong>Non-Receivables activity</strong> – someone posted a manual GL journal straight to the receivables account. These show separately so you can spot them.</li>
<li><strong>On-account, unapplied or unidentified cash</strong> posted to the same account as invoices, but excluded from the extract (or the other way around). Oracle recommends separate GL accounts for these to avoid confusion.</li>
<li><strong>Data changed after the extract</strong> – another reason to set the period to Close Pending before you run it.</li>
</ul>`,
    },
    {
      type: 'example',
      title: 'Priya and Omar reconcile Jan-26',
      html: `<p>On 3 February, Omar sets Receivables <code>Jan-26</code> to Close Pending (Feb-26 is open), runs the extract and opens the reconciliation report for Sunny US Ledger.</p>`,
      steps: [
        'Receivables side: beginning balance $0, plus transactions $1,620 (Happy Cafe $420 and Sunshine School $1,200), minus receipts $420 = <strong>ending $1,200</strong>.',
        'Accounting side: the same $1,200 — every transaction and receipt was accounted. Good.',
        'General Ledger side: account <code>1210</code> shows <strong>$1,250</strong>. Difference: <strong>$50</strong>, listed under non-Receivables activity.',
        'Drilling down, Priya finds a manual GL journal: on 20 January someone recorded a $50 cash sale at a park event as Dr 1210 / Cr 4110. But the kiosk paid cash on the spot — there is no customer invoice, so it should never have touched Accounts Receivable.',
        'Priya posts a correcting journal in the GL (below). Priya also reminds the team: receivables should only change through Receivables.',
        'Omar reruns the extract: difference $0. The Receivables Aging by General Ledger Account report also shows $1,200. Omar sets Jan-26 to <strong>Closed</strong>.',
      ],
      result: `<p>The subledger, its accounting, the aging and the GL all agree at $1,200. Priya can now continue the GL close for January.</p>`,
    },
    {
      type: 'journal',
      title: 'Correcting the $50 posted to the wrong account',
      lines: [
        { account: '1110 Cash – Big River Bank', debit: 50, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 50 },
      ],
      note: `<p>The original entry (Dr 1210 / Cr 4110) got the revenue right but the asset wrong. This entry moves the $50 from Accounts Receivable to Cash, where it belongs. Revenue is unchanged.</p>`,
    },

    {
      type: 'exercise',
      kind: 'fill',
      title: 'Reconcile February',
      instructions: `<p>Use the February numbers for Sunny US Ledger to finish the reconciliation.</p>`,
      html: `<p>Receivables beginning balance: $1,200. Transactions completed in February: $2,100. Receipts applied in February: $1,500.</p>
<p>Receivables ending balance = USD {{}}.</p>
<p>The GL shows $1,830 in account 1210. Difference = USD {{}}.</p>
<p>The drill-down shows one manual GL journal on account 1210. Is this a Receivables transaction or non-Receivables activity? {{}}</p>`,
      blanks: [
        { answer: 1800, hint: '1,200 + 2,100 − 1,500' },
        { answer: 30, hint: '1,830 − 1,800' },
        { answer: ['non-Receivables activity', 'non-Receivables', 'non receivables activity', 'non receivables'] },
      ],
      explain: `<p>Ending balance = beginning + transactions − receipts = $1,800. The GL is $30 higher. Because the extra amount came from a manual GL journal, it shows as <strong>non-Receivables activity</strong>. Priya should find out why it was posted to 1210 and correct it, then Omar reruns the extract.</p>`,
    },
    {
      type: 'text',
      heading: 'The aging review: a health check, not just a number',
      html: `<p>Closing isn’t only about matching numbers. It is also the moment to look at <strong>quality</strong>:</p>
<ul>
<li><strong>Aging trend</strong> – are more dollars moving into the older buckets? Compare with last month.</li>
<li><strong>DSO</strong> – is it rising? (See the first lesson for the formula.)</li>
<li><strong>Unapplied and on-account cash</strong> – should be small and explainable.</li>
<li><strong>Credit balances</strong> – customers we owe money to may need refunds.</li>
<li><strong>Bad debt risk</strong> – Oracle’s <strong>Bad Debt Provision Report</strong> helps estimate exposure, so the accountant can decide whether an allowance for doubtful accounts is needed.</li>
</ul>
<p>Sam usually gets a short note each month: total AR, aging by bucket, DSO, top overdue customers, and what the team is doing about them.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: run the reconciliation',
      items: [
        'Make sure Create Receivables Accounting has run and posted for the period.',
        'Set the Receivables period to <strong>Close Pending</strong> from the Receivables accounting periods task in the Receivables Balances work area (Navigator: <kbd>Receivables</kbd> &gt; <kbd>Accounts Receivable</kbd>).',
        'Open <kbd>Scheduled Processes</kbd> and submit <strong>Prepare Receivables to General Ledger Reconciliation</strong> with a unique request name, your ledger and the period.',
        'Open the <strong>Receivables to Ledger Reconciliation</strong> report from Reports and Analytics (Shared Folders &gt; Financials &gt; Receivables).',
        'Review the Summary. Drill into any Difference amount, fix the cause, and rerun the extract.',
        'When everything agrees, set the period to <strong>Closed</strong>.',
      ],
      note: `<p>Menu names and report locations vary by release, Redwood adoption and your security. Some companies manage subledger period statuses together in a close checklist tool.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Common month-end traps',
      html: `<ul>
<li><strong>Forgetting AutoInvoice errors.</strong> Unimported lines are missing revenue.</li>
<li><strong>Closing the GL first.</strong> Once the GL period is closed, the Receivables period for it can’t be reopened.</li>
<li><strong>Reusing the extract request name.</strong> Oracle warns this can give an empty extract — use a new name each time.</li>
<li><strong>Using collections aging for reconciliation.</strong> Use the Receivables Aging by General Ledger Account Report instead.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: make month-end boring',
      html: `<p>The best Receivables teams do a little reconciliation <strong>every week</strong>: they run the extract on the open period to spot surprises early, create accounting daily, and keep unapplied cash near zero. Then the “real” close is a short confirmation instead of a late-night hunt.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Subledger', def: 'A detailed book, such as Receivables, whose totals feed a summary account in the General Ledger.' },
        { term: 'Close Pending', def: 'A Receivables period status that blocks new transactions but still allows accounting for existing activity; used while reconciling.' },
        { term: 'Receivables to General Ledger reconciliation', def: 'The process and report that compare Receivables balances, their accounting and the General Ledger, and show differences.' },
        { term: 'Create Receivables Accounting', def: 'The Oracle process that creates subledger journal entries for Receivables activity so they can go to the General Ledger.' },
        { term: 'Reconciling difference', def: 'An amount by which the Receivables detail and the General Ledger balance don’t agree and that needs investigation.' },
        { term: 'Financial category', def: 'A label on chart of accounts values; Accounts Receivable must be assigned to receivables accounts for reconciliation to work.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Why set the Receivables period to Close Pending before running the reconciliation extract?',
          options: [
            'To delete old invoices',
            'To stop new activity from changing the numbers while you reconcile',
            'To send statements to customers',
            'Because Close Pending posts journals automatically',
          ],
          answer: 1,
          explain: 'Close Pending blocks new entries in the period, so the summary and drill-down details stay consistent during reconciliation.',
        },
        {
          q: 'The reconciliation shows a difference listed as non-Receivables activity on account 1210. What is the most likely cause?',
          options: [
            'A customer paid late',
            'A manual GL journal was posted directly to the receivables account',
            'A dunning letter was sent',
            'The aging buckets are wrong',
          ],
          answer: 1,
          explain: 'Non-Receivables activity is GL activity on receivables accounts that did not come from Receivables, such as a manual journal.',
        },
        {
          q: 'Which step should come BEFORE creating final accounting for the month?',
          options: [
            'Closing the GL period',
            'Running Recognize Revenue and finishing transactions and receipts',
            'Setting the period to Closed',
            'Deleting unapplied receipts',
          ],
          answer: 1,
          explain: 'You first finish the business activity (billing, revenue, cash) so that Create Receivables Accounting captures everything for the period.',
        },
        {
          q: 'Which report’s balance should agree with the reconciliation report’s Receivables ending balance?',
          options: [
            'Collections Aging 4 Bucket Report',
            'Receivables Aging by General Ledger Account Report',
            'Print Receivables Transactions',
            'Create Customer Statements Execution Report',
          ],
          answer: 1,
          explain: 'Oracle states the beginning and ending balances normally agree with the Receivables Aging by General Ledger Account report. Collections aging reports lack GL account details.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Guidelines for Receivables to General Ledger Reconciliation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/guidelines-for-receivables-to-general-ledger-reconciliation.html' },
    { title: 'Overview of the Receivables to General Ledger Reconciliation Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/overview-of-the-receivables-to-general-ledger-reconciliation.html' },
    { title: 'Receivables Aging by General Ledger Account Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/receivables-aging-by-general-ledger-account-report.html' },
    { title: 'Potential Reconciling Items Report', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/potential-reconciling-items-report.html' },
    { title: 'What’s the difference between a closed and close pending accounting period?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/what-s-the-difference-between-a-closed-and-close-pending.html' },
    { title: 'Why can’t I close an accounting period?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/why-can-t-i-close-an-accounting-period.html' },
    { title: 'How You Recognize Revenue on Transactions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/how-you-recognize-revenue-on-transactions.html' },
    { title: 'Overview of Oracle Receivables', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/overview-of-oracle-receivables.html' },
  ],
};
