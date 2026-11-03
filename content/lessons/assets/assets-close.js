export default {
  slug: 'assets-close',
  title: 'Closing the Assets Period',
  minutes: 16,
  summary:
    'At the end of every month the asset team makes sure every new asset and change is in, runs depreciation, sends the accounting to the General Ledger, closes the period and opens the next one — then proves the asset accounts agree with the ledger. Follow Sunny’s June 2026 close step by step, with the real Oracle process and report names.',
  objectives: [
    'List the steps of a monthly Assets close in the right order',
    'Explain why Payables must finish before Assets, and why Assets finishes before the General Ledger',
    'Describe what Calculate Depreciation does when it closes a period, and why it can’t be undone',
    'Use the Assets reconciliation reports to tie cost, reserve and clearing accounts to the General Ledger',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Closing the classroom for the day',
      html: `<p>At the end of a school day, the teacher does the same things every time: make sure everyone handed in their homework, mark today’s attendance, write the day’s notes in the class diary, check the diary matches the headteacher’s list, then <strong>lock the classroom</strong> — and tomorrow a fresh page begins.</p>
<p>Closing the assets period is the same: collect every new asset and change, record this month’s depreciation, write it into the company’s big book (the General Ledger), check everything matches, then <strong>close the month</strong> so nobody can sneak in changes afterwards.</p>`,
    },
    {
      type: 'text',
      heading: 'Where the Assets close fits in the month-end',
      html: `<p>Subledgers close in a sensible order because each one feeds the next:</p>
<ol>
<li><strong>Payables</strong> finishes first: all asset invoices are validated, accounted and posted to the GL, and <kbd>Create Mass Additions</kbd> sends the last asset lines to Assets.</li>
<li><strong>Assets</strong> then completes additions, changes and depreciation, and sends its accounting to the GL.</li>
<li><strong>General Ledger</strong> closes last, after Priya has reviewed all subledger journals — including the asset ones.</li>
</ol>
<p>Oracle Assets closes a period in a special way: there is no separate “close” button. The <strong>Calculate Depreciation</strong> process closes the current period and opens the next one when you choose that option and every asset depreciates successfully. Oracle warns that once the process closes the period, <strong>you can’t reopen it</strong>.</p>`,
    },
    {
      type: 'flow',
      title: 'Sunny’s Assets close for JUN-26 (SUNNY US CORP)',
      steps: [
        { icon: '🧾', label: '1. Payables done', detail: 'Ava confirms asset invoices are accounted and posted; Create Mass Additions has run for June.' },
        { icon: '➕', label: '2. Additions', detail: 'Clear the Additions infotile: no Incomplete or Exceptions lines; Post All. CIP assets finished in June are capitalized.' },
        { icon: '🔧', label: '3. Changes', detail: 'Post all adjustments, transfers, reclassifications and retirements (Retirements infotile empty).' },
        { icon: '🧮', label: '4. Trial depreciation', detail: 'Run Calculate Depreciation with the period left open; review the log and the Journal Entry Reserve Ledger; fix and rerun if needed.' },
        { icon: '🔒', label: '5. Depreciate and close', detail: 'Run Calculate Depreciation and close the period. JUN-26 closes; JUL-26 opens.' },
        { icon: '📒', label: '6. Create Accounting', detail: 'Run Create Accounting for Assets in final mode, transfer and post to the GL.' },
        { icon: '🧾', label: '7. Tax book', detail: 'Run Perform Periodic Mass Copy to copy June’s corporate transactions into SUNNY US TAX, then depreciate the tax book.' },
        { icon: '🔍', label: '8. Reconcile', detail: 'Tie cost, reserve and clearing accounts to the GL with the reconciliation reports.' },
      ],
      note: `<p>Some teams run Create Accounting several times during the month (for additions and retirements) and once more after depreciation. Leased assets also need their lease interest and expense calculated before the book can close.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Practice: put the close steps in order',
      instructions: `<p>Put Sunny’s month-end Assets tasks in the right order.</p>`,
      items: [
        'Payables accounts and posts asset invoices; Create Mass Additions runs',
        'Prepare and post all mass additions (Additions infotile cleared)',
        'Post adjustments, transfers and retirements',
        'Run Calculate Depreciation without closing and review the Journal Entry Reserve Ledger',
        'Run Calculate Depreciation and close the period',
        'Run Create Accounting for Assets and post to the General Ledger',
        'Reconcile asset accounts to the General Ledger with the reconciliation reports',
      ],
      explain: `<p>Assets can only include what Payables has sent, and depreciation must come after every transaction for the month is in (otherwise it is rolled back for changed assets). Closing is one-way, so the trial run comes first. Accounting and reconciliation complete the job before Priya closes the GL.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the names you will use',
      html: `<ul>
<li><strong>Depreciation infotile</strong> on the Assets landing page — run <kbd>Calculate Depreciation</kbd>, or run it and close the period.</li>
<li><kbd>Create Accounting</kbd> panel tab (Create Accounting for Assets) — creates journal entries for asset events through Subledger Accounting; choose to transfer and post them to the GL. A draft run lets you preview, for example, estimated retirement gains and losses without posting.</li>
<li><kbd>Perform Periodic Mass Copy</kbd> — copies additions, adjustments, retirements and reinstatements from the corporate book’s period into a tax book. It must be run period by period without skipping.</li>
<li><strong>Reports</strong> run from <kbd>Scheduled Processes</kbd>, such as Journal Entry Reserve Ledger, Cost Summary/Detail, Reserve Summary/Detail, Cost Clearing Reconciliation, Asset Additions, Asset Retirements, Asset Transfers and CIP Capitalization.</li>
</ul>
<p>Labels may differ slightly by release, Redwood pages and your security.</p>`,
    },
    {
      type: 'table',
      caption: 'Assets reports used at month-end',
      headers: ['Report', 'What it lists', 'Reconcile it to'],
      rows: [
        ['<strong>Journal Entry Reserve Ledger</strong>', 'Depreciation for the period, by expense account, reserve account and cost center.', 'GL depreciation expense (6140) for the period.'],
        ['<strong>Cost Summary Report</strong> / <strong>Cost Detail Report</strong>', 'Asset cost account balances (summary, or asset by asset).', 'GL balance of 1510 Equipment.'],
        ['<strong>Reserve Summary Report</strong> / <strong>Reserve Detail Report</strong>', 'Accumulated depreciation (reserve) balances.', 'GL balance of 1590 Accumulated Depreciation.'],
        ['<strong>Cost Clearing Reconciliation Report</strong>', 'Additions and cost adjustments that created entries to clearing accounts.', 'GL balance of 1520 Asset Clearing (with Payables).'],
        ['<strong>Asset Additions Report</strong>', 'Assets added or capitalized in the periods.', 'Check method, life, date placed in service and cost.'],
        ['<strong>Asset Retirements Report</strong>', 'Retirements in the periods, with gain or loss.', 'GL gain/loss account.'],
        ['<strong>CIP Summary / CIP Detail Report</strong>', 'Construction-in-process cost balances.', 'GL CIP cost account.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: which report answers the question?',
      instructions: `<p>Priya asks several questions during the June close. Match each question to the best Assets report.</p>`,
      pairs: [
        { left: 'How much depreciation did each cost center get this month?', right: 'Journal Entry Reserve Ledger' },
        { left: 'Does the total asset cost agree with GL account 1510?', right: 'Cost Summary Report' },
        { left: 'Does accumulated depreciation agree with GL account 1590?', right: 'Reserve Summary Report' },
        { left: 'Why does 1520 Asset Clearing still have a balance?', right: 'Cost Clearing Reconciliation Report' },
        { left: 'Did the new stand get the right life and date placed in service?', right: 'Asset Additions Report' },
      ],
      explain: `<p>Oracle designs the reconciliation reports to match specific GL accounts: cost to the cost account, reserve to the reserve account, clearing to the clearing account. The Journal Entry Reserve Ledger checks the depreciation run itself, and transaction reports like Asset Additions check the details of what was added.</p>`,
    },
    {
      type: 'example',
      title: 'Proving Sunny’s June numbers',
      html: `<p>After the June close, Priya and the asset accountant compare Oracle Assets with the General Ledger for SUNNY US CORP. In June, Sunny’s only asset activity is the new stand (the juicer, added in March, has already been depreciating at $50 a month).</p>`,
      steps: [
        '<strong>Cost:</strong> juicer $2,400 + stand $6,000 = $8,400 in the Cost Summary Report. GL 1510 shows $8,400 ✔.',
        '<strong>Reserve:</strong> juicer 4 months (Mar–Jun) × $50 = $200, plus stand 1 month × $100 = $100 → $300 in the Reserve Summary Report. GL 1590 shows $300 ✔.',
        '<strong>Depreciation this month:</strong> $50 + $100 = $150 in the Journal Entry Reserve Ledger, matching June’s 6140 debits ✔.',
        '<strong>Clearing:</strong> Payables debited 1520 by $6,000; Assets credited it by $6,000. GL 1520 = $0 ✔.',
      ],
      result: `<p>Everything ties out. Priya can include the asset journals in the General Ledger close with confidence, and Assets is already open for JUL-26.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: find the missing piece',
      instructions: `<p>At the end of July 2026 the Cost Summary Report shows <strong>$8,400</strong>, and GL account 1510 also shows <strong>$8,400</strong>. GL account 1520 Asset Clearing shows a <strong>$1,200</strong> debit balance. The Additions infotile shows one <em>Incomplete</em> line from Payables for a new laptop.</p>`,
      html: `<p>Difference between GL 1510 and Assets cost: \${{}}</p><p>Amount still waiting in the clearing account: \${{}}</p><p>Most likely explanation — the laptop line was never {{}} in Assets (one word).</p>`,
      blanks: [
        { answer: 0 },
        { answer: 1200 },
        { answer: ['posted', 'added', 'capitalized'], hint: 'What does Post Mass Additions do?' },
      ],
      explain: `<p>Cost agrees ($0 difference), but the $1,200 laptop invoice reached Payables (debit 1520) and its line is still Incomplete in Assets — so no asset was posted and the clearing account was never credited. Complete the line, post it, and run Create Accounting: 1510 rises to $9,600 in both Assets and the GL, and 1520 returns to zero. Do this <em>before</em> closing the period, or the laptop misses a month of depreciation.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: run depreciation and close',
      items: [
        'On the Assets landing page, check that the <kbd>Additions</kbd>, <kbd>Adjustments</kbd>, <kbd>Transfers</kbd> and <kbd>Retirements</kbd> infotiles show nothing pending for the period.',
        'Open the <kbd>Depreciation</kbd> infotile, choose the book and run <kbd>Calculate Depreciation</kbd> without closing. Review the output and run the Journal Entry Reserve Ledger from Scheduled Processes.',
        'When correct, run Calculate Depreciation again with the option to <strong>close the period</strong>.',
        'Open the <kbd>Create Accounting</kbd> panel tab, choose the book and end date, and run in final mode with transfer and post to the General Ledger.',
        'For each tax book, run <kbd>Perform Periodic Mass Copy</kbd>, then depreciate the tax book.',
        'Run the reconciliation reports and compare them with GL balances.',
      ],
      note: `<p>Exact labels, options and the order of some steps can differ by release, Redwood pages and your company’s close checklist.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Let the assistant summarize the month',
      html: `<p>The 26C <strong>Fixed Asset Inquiry Assistant</strong> can show the current period’s activity for a book — additions, adjustments, transfers and retirements, in progress and posted — which is a quick pre-close check that nothing is left pending.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Common close mistakes',
      html: `<ul>
<li>Closing the period before Payables sent the last asset invoices — those assets land a month late and miss a month of depreciation (Oracle catches it up later, but reports are off for a month).</li>
<li>Posting manual GL journals directly to asset cost or reserve accounts — they will never reconcile with Assets.</li>
<li>Forgetting the tax book — Perform Periodic Mass Copy has to run every period, in order, without skipping.</li>
<li>Not defining next year’s fiscal year in time — Oracle notes depreciation fails if the current fiscal year is the last one set up.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Most finance teams run a <strong>close calendar</strong>: “Day 1 Payables close, Day 2 Assets depreciation, Day 3 GL review.” Keep a short checklist for Assets with each step, who does it, and the report that proves it was done. Auditors love it — and so will you next month.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Period close (Assets)', def: 'Finishing a month in an asset book: all transactions in, depreciation run, period closed and the next one opened.' },
        { term: 'Create Accounting for Assets', def: 'The process that creates journal entries for asset events and can transfer and post them to the General Ledger.' },
        { term: 'Perform Periodic Mass Copy', def: 'The process that copies a corporate book’s period transactions into an associated tax book.' },
        { term: 'Journal Entry Reserve Ledger', def: 'A report listing a period’s depreciation by expense account, reserve account and cost center.' },
        { term: 'Reconciliation report', def: 'A report used to prove that Assets balances agree with General Ledger account balances.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'How is an asset period closed in Oracle Assets?',
          options: [
            'With a Close Period button in the General Ledger',
            'By running Calculate Depreciation with the option to close the period',
            'By running Create Mass Additions',
            'It closes automatically at midnight',
          ],
          answer: 1,
          explain: 'Calculate Depreciation can close the current period and open the next once all assets depreciate successfully.',
        },
        {
          q: 'Why run Calculate Depreciation once without closing first?',
          options: [
            'Because it is faster',
            'To review the results and fix problems, since a closed period can’t be reopened',
            'Because Oracle requires two runs',
            'To send journals to Payables',
          ],
          answer: 1,
          explain: 'Closing is one-way. A trial run lets you check the Journal Entry Reserve Ledger and correct mistakes first.',
        },
        {
          q: 'Which report do you compare with GL account 1590 Accumulated Depreciation?',
          options: ['Cost Summary Report', 'Reserve Summary Report', 'Asset Additions Report', 'Cash in Transit Report'],
          answer: 1,
          explain: 'Reserve Summary/Detail reports list accumulated depreciation (reserve) balances to tie to the GL reserve account.',
        },
        {
          q: 'What should usually close first at month-end?',
          options: ['General Ledger, then Payables, then Assets', 'Payables, then Assets, then General Ledger', 'Assets, then Payables, then General Ledger', 'All at the same moment'],
          answer: 1,
          explain: 'Payables feeds asset lines to Assets, and both subledgers feed the GL, so the GL closes last.',
        },
      ],
    },
  ],
  sources: [
    { title: 'How Depreciation Is Calculated', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/how-depreciation-is-calculated.html' },
    { title: 'Overview of Using the Assets Landing Page', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/overview-of-using-the-assets-landing-page.html' },
    { title: 'Oracle Assets Predefined Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/oracle-assets-predefined-reports.html' },
    { title: 'Assets Reconciliation Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/assets-reconciliation-reports.html' },
    { title: 'Assets Transaction Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/assets-transaction-reports.html' },
    { title: 'Oracle Fusion Cloud Financials — Using Assets 26D (PDF): Perform Periodic Mass Copy, Create Accounting for Assets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faalm/using-assets.pdf' },
    { title: 'Considerations for Creating Calendars', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faias/considerations-for-creating-calendars.html' },
    { title: 'Financials 26C What’s New — Fixed Asset Inquiry Assistant', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26c/fins26c/26C-fin-wn-f49378.htm' },
  ],
};
