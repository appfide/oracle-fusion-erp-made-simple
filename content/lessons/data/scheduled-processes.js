export default {
  slug: 'scheduled-processes',
  title: 'Scheduled Processes: The Robots That Do Jobs',
  minutes: 16,
  summary:
    'Much of the heavy work in Oracle Fusion is done by scheduled processes: importing, validating, accounting, posting, depreciating, reconciling and producing reports. Learn the Scheduled Processes work area, parameters, schedules, process sets, statuses, logs and output — and the processes finance teams run every day.',
  objectives: [
    'Explain what a scheduled process is and why Fusion uses them',
    'Submit a process with parameters and set it to run on a recurring schedule',
    'Explain process sets and when to use them',
    'Read process statuses and use the log and output to fix problems',
    'Name common finance processes and what each one does',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Robots with job cards',
      html: `<p>Imagine the lemonade kitchen has helpful <strong>robots</strong>. You do not stand next to them while they work. You give each robot a <strong>job card</strong>: “Squeeze all lemons delivered today. Use the big squeezer. Start at 6 p.m. Do this every day.”</p>
<p>The robot puts its card in a queue, waits its turn, does the job, writes a short <strong>diary</strong> of what happened, and leaves the <strong>result</strong> (a jug of juice — or a note saying “out of lemons!”).</p>
<p>In Oracle Fusion these robots are <span class="hl">scheduled processes</span>. The job card holds the <strong>parameters</strong> and <strong>schedule</strong>; the diary is the <strong>log</strong>; the result is the <strong>output</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'What a scheduled process is',
      html: `<p>A <strong>scheduled process</strong> (also called a <em>job</em> or an <em>ESS job</em>, because the Oracle Enterprise Scheduler runs them) is a program that runs in the background. You start it, then carry on with other work. Fusion uses them for anything big or repetitive:</p>
<ul>
<li><strong>Importing</strong> data (like the FBDI loads in the last lesson).</li>
<li><strong>Checking and processing</strong> many records at once (validating invoices, applying receipts).</li>
<li><strong>Creating accounting</strong> and <strong>posting</strong> journals.</li>
<li><strong>Calculating</strong> things like depreciation or revaluation.</li>
<li><strong>Producing reports</strong> — many predefined Analytics Publisher reports are scheduled processes.</li>
</ul>
<p>Some processes are started for you in the background when you click a button on a page; others you submit yourself from the <strong>Scheduled Processes</strong> work area or from a module’s own work area.</p>`,
    },
    {
      type: 'flow',
      title: 'The life of one process',
      steps: [
        { icon: '📝', label: 'Submit', detail: 'Pick the process, enter parameters, choose when it runs.' },
        { icon: '🔐', label: 'Pending Validation', detail: 'Security and other checks happen before it runs.' },
        { icon: '⏳', label: 'Wait / Ready', detail: 'It waits for its time slot, then gets ready to start.' },
        { icon: '⚙️', label: 'Running', detail: 'The main work happens.' },
        { icon: '📦', label: 'Completed', detail: 'Post-processing: output files and notifications are produced.' },
        { icon: '✅', label: 'Final status', detail: 'Usually Succeeded, Warning or Error. Check the log and output.' },
      ],
      note: `<p>A process can also show <strong>Blocked</strong> (an incompatible process is running — it fixes itself) or <strong>Hold</strong> (someone must release it).</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Scheduled Processes work area',
      html: `<p>Go to <kbd>Navigator</kbd> &gt; <kbd>Tools</kbd> &gt; <kbd>Scheduled Processes</kbd>. You need the privilege to manage scheduled processes (most finance roles include it). On the overview page you can:</p>
<ul>
<li>Click <kbd>Schedule New Process</kbd>, keep the type as <strong>Job</strong> (or choose <strong>Job Set</strong> for a process set), and pick the process.</li>
<li>In the <strong>Process Details</strong> dialog, enter parameters. Click <kbd>Advanced</kbd> for the <strong>Schedule</strong>, <strong>Output</strong> and <strong>Notification</strong> tabs.</li>
<li>Search your processes (the default search shows the last hour), see the status, and open the log and output.</li>
<li>Use actions such as <kbd>Resubmit</kbd>, <kbd>Put On Hold</kbd>, <kbd>Release Process</kbd>, <kbd>Cancel Process</kbd> and <kbd>Edit Schedule</kbd>.</li>
</ul>
<p>Labels can differ slightly by release and in Redwood pages.</p>`,
    },
    {
      type: 'text',
      heading: 'Parameters, schedules, output and notifications',
      html: `<p><strong>Parameters</strong> tell the process what to work on. Some are required, some optional, and some only appear after you choose another one (for example, date fields may appear only after you choose “By Date”).</p>
<p><strong>When to run.</strong> By default a process runs <strong>once, as soon as possible</strong>. On the Schedule tab you can choose <strong>Using a schedule</strong> and a frequency such as <strong>Daily</strong> or <strong>Monthly</strong>, or <strong>User-Defined</strong> to list exact dates and times, or <strong>Use a Saved Schedule</strong>. Some processes have limits on how often they may run (for example not more often than every 10 minutes).</p>
<p><strong>Output.</strong> For processes that produce a report, add an output document and choose a layout and format: <strong>PDF</strong> (best for printing), <strong>Excel</strong>, or <strong>Data</strong> (XML, mainly for report designers). You can also add destinations such as email or a printer.</p>
<p><strong>Notifications.</strong> Tick <strong>Notify me when this process ends</strong>, or set notifications for others depending on the result.</p>`,
    },
    {
      type: 'example',
      title: 'Priya schedules nightly accounting',
      html: `<p>Priya wants Payables accounting to be created and posted every night, so the ledger is always fresh in the morning. Priya schedules <strong>Create Accounting</strong>:</p>`,
      steps: [
        '<strong>Subledger Application:</strong> Payables. <strong>Ledger:</strong> Sunny US Ledger.',
        '<strong>End Date:</strong> today (events on or before this date are picked up; for a recurring schedule the end date moves forward each run).',
        '<strong>Accounting Mode:</strong> Final (Draft lets you preview without creating final entries).',
        '<strong>Transfer to General Ledger:</strong> Yes. <strong>Post in General Ledger:</strong> Yes (Priya has the posting privilege).',
        '<strong>Schedule:</strong> Using a schedule, Daily, at 11 p.m., ending at year-end. <strong>Notify me when this process ends:</strong> on.',
      ],
      result: `<p>Every morning, yesterday’s invoices and payments are already in the ledger. Priya only has to look at the notification and the execution report for errors.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: submit Create Accounting',
      instructions: `<p>This is a <strong>practice screen</strong> (a simplified simulation of the Process Details dialog, not Oracle’s real page). Mia wants to <strong>preview</strong> the accounting for Sunny US Ledger’s <strong>Cash Management</strong> transactions up to <strong>31 January 2026</strong> without creating final journals. It should run once, right now.</p>`,
      formTitle: 'Process Details: Create Accounting (practice)',
      fields: [
        { label: 'Subledger Application', type: 'select', options: ['Payables', 'Receivables', 'Cash Management', 'Assets'], answer: 'Cash Management' },
        { label: 'Ledger', type: 'select', options: ['Sunny US Ledger', 'Sunny UK Ledger'], answer: 'Sunny US Ledger' },
        { label: 'End Date', type: 'date', answer: '2026-01-31' },
        { label: 'Accounting Mode', type: 'select', options: ['Draft', 'Final'], answer: 'Draft', hint: 'Preview only.' },
        { label: 'Run', type: 'select', options: ['As soon as possible', 'Using a schedule'], answer: 'As soon as possible' },
      ],
      explain: `<p>Draft mode creates entries Mia can review without finalizing them, which is perfect for a preview. Choosing the right subledger and ledger keeps the run small. A one-time run uses “As soon as possible”; recurring runs use a schedule.</p>`,
    },
    {
      type: 'text',
      heading: 'Process sets: several robots in a row',
      html: `<p>A <strong>process set</strong> is a scheduled process that contains <strong>two or more</strong> processes (and can even contain other process sets). The processes run in a defined order — one after another, at the same time, or by some other logic. Oracle’s example: validate and clean up records, then import them, then report on what was imported.</p>
<p>At Sunny, an administrator could build a nightly Payables process set: <em>Import Payables Invoices</em> → <em>Validate Payables Invoices</em> → <em>Create Accounting</em>. If one step fails, the team sees exactly where. Process sets are defined by administrators in Setup and Maintenance (the task for Financials job definitions and job sets).</p>
<p>When you resubmit a process set, you can use <strong>Resubmit with Changes</strong> to adjust parameters; a single process can simply be <strong>resubmitted</strong> with the same parameters.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Order Sunny’s nightly Payables robots',
      instructions: `<p>Put the nightly Payables process set in a sensible order so each process has what it needs from the one before.</p>`,
      items: [
        'Load Interface File for Import (the portal file of invoices)',
        'Import Payables Invoices',
        'Validate Payables Invoices',
        'Create Accounting (Payables, Final, transfer and post)',
        'Payables Unaccounted Transactions and Sweep Report',
      ],
      explain: `<p>Rows must be loaded before they can be imported; invoices must exist before they are validated; validated invoices can be accounted; and the unaccounted transactions report at the end shows anything that still did not get accounted.</p>`,
    },
    {
      type: 'table',
      caption: 'Process statuses you will see (from Oracle’s list)',
      headers: ['Status', 'What it means', 'Do I need to act?'],
      rows: [
        ['Succeeded', 'Completed successfully.', 'No — but glance at the output.'],
        ['Warning', 'Finished, with a warning (for example a notification was not sent).', 'Read the log.'],
        ['Error', 'Finished with errors.', 'Read the log, fix the cause, resubmit.'],
        ['Running', 'The main work is happening now.', 'No — wait.'],
        ['Wait / Ready', 'Passed validation; waiting to start / about to start.', 'No — wait.'],
        ['Blocked', 'An incompatible process is running; this clears itself.', 'No — wait.'],
        ['Hold', 'Put on hold; someone must release it.', 'Yes — release it if appropriate.'],
        ['Paused', 'Paused so a process it started can run first.', 'No.'],
        ['Error Manual Recovery', 'Ended with errors and needs an administrator.', 'Yes — call your administrator.'],
        ['Canceled / Expired / Validation Failed', 'Final states; cannot be restarted.', 'Submit again if still needed.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'What does this status mean?',
      instructions: `<p>Ava checks the Scheduled Processes page. Match each status to what Ava should understand.</p>`,
      pairs: [
        { left: 'Blocked', right: 'Another incompatible process is running; it will sort itself out' },
        { left: 'Hold', right: 'Someone must release it before it continues' },
        { left: 'Error', right: 'It finished with errors — read the log, fix, resubmit' },
        { left: 'Warning', right: 'It finished, but something minor needs a look' },
        { left: 'Succeeded', right: 'It completed successfully' },
        { left: 'Expired', right: 'It never ran and its schedule ended — submit again if needed' },
      ],
      explain: `<p>Only some statuses need action from you: Hold (release), Error (fix and resubmit), Warning (read the log) and final states like Expired (resubmit if still needed). Blocked and other in-progress statuses resolve on their own.</p>`,
    },
    {
      type: 'table',
      caption: 'Common finance processes (names from the current Oracle documentation)',
      headers: ['Process', 'Module', 'What it does'],
      rows: [
        ['Load Interface File for Import', 'All (FBDI)', 'Loads an uploaded zip file into interface tables'],
        ['Import Payables Invoices', 'Payables', 'Creates invoices from the interface tables'],
        ['Validate Payables Invoices', 'Payables', 'Checks invoices and places or releases holds'],
        ['Create Accounting', 'All subledgers', 'Creates subledger journal entries; can transfer and post to the GL'],
        ['Payables Unaccounted Transactions and Sweep Report', 'Payables', 'Lists unaccounted items at period end and can sweep them to the next period'],
        ['Import Journals', 'General Ledger', 'Creates journals from the GL interface'],
        ['AutoPost Journals', 'General Ledger', 'Posts journals automatically based on criteria'],
        ['Revalue Balances', 'General Ledger', 'Revalues foreign-currency balances at a new rate'],
        ['Import AutoInvoice', 'Receivables', 'Creates customer invoices and credit memos from imported data'],
        ['Create Receivables Accounting', 'Receivables', 'Creates accounting for Receivables transactions'],
        ['Calculate Depreciation', 'Assets', 'Calculates depreciation for an asset book and period'],
        ['Autoreconciliation', 'Cash Management', 'Matches bank statement lines to system transactions (started from Bank Statements and Reconciliation)'],
      ],
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li><strong>Always read the log or output after a run</strong> — “Succeeded” can still mean “0 records processed” because a parameter was wrong.</li>
<li><strong>Schedule heavy jobs at night</strong> and avoid the quarterly maintenance weekends.</li>
<li><strong>Use a clear process set for the close</strong> so everyone knows the order and who owns each step.</li>
<li><strong>Do not resubmit blindly.</strong> If an import failed halfway, check what was already created to avoid duplicates.</li>
<li><strong>Keep schedules tidy.</strong> When someone leaves the company, check which recurring processes were scheduled under their name.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Scheduled process', def: 'A background program in Fusion that does a job such as importing, validating, accounting or reporting.' },
        { term: 'Parameter', def: 'A setting you give a process before it runs, such as the ledger or end date.' },
        { term: 'Process set', def: 'A scheduled process that runs two or more processes together in a defined order.' },
        { term: 'Schedule', def: 'The rule for when a process runs, such as once now, daily or monthly.' },
        { term: 'Log', def: 'The diary a process writes about what it did, useful for finding errors.' },
        { term: 'Output', def: 'The result file a process produces, such as a PDF report.' },
        { term: 'Status', def: 'Where a process is in its life, such as Running, Succeeded, Warning or Error.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Where do you normally submit and monitor scheduled processes?',
          options: ['Navigator > Tools > Scheduled Processes', 'The supplier portal', 'Smart View', 'The bank’s website'],
          answer: 0,
          explain: 'The Scheduled Processes work area is the central place to submit, schedule and monitor processes.',
        },
        {
          q: 'A process shows “Blocked”. What should Ava do?',
          options: ['Cancel everything immediately', 'Usually nothing — an incompatible process is running and it will clear automatically', 'Call the bank', 'Delete the invoice'],
          answer: 1,
          explain: 'Oracle describes Blocked as an in-progress status that is automatically fixed when the blocking process finishes.',
        },
        {
          q: 'What is a process set?',
          options: ['A process that contains two or more processes run in a defined order', 'A printer setting', 'A type of invoice', 'A security role'],
          answer: 0,
          explain: 'Process sets bundle several processes (even other sets) so they run together in serial, in parallel or by other logic.',
        },
        {
          q: 'Priya wants Create Accounting to run every night. Which option does Priya choose?',
          options: ['As soon as possible', 'Using a schedule, with a Daily frequency', 'Put On Hold', 'Cancel Process'],
          answer: 1,
          explain: 'On the Schedule tab (Advanced), “Using a schedule” with a Daily frequency makes it recurring.',
        },
        {
          q: 'A process Succeeded but nothing changed in the ledger. What is the best first step?',
          options: ['Assume the system is broken', 'Open the log and output to check how many records were processed and which parameters were used', 'Run it ten more times', 'Change the chart of accounts'],
          answer: 1,
          explain: 'The log and output show what really happened; often a parameter (like ledger or date) selected no records.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Overview of Scheduled Processes', publisher: 'Oracle Help Center (Applications Common 26D)', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/overview-of-scheduled-processes.html' },
    { title: 'Submit Scheduled Processes and Process Sets', publisher: 'Oracle Help Center (Applications Common 26D)', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/submit-scheduled-processes-and-process-sets.html' },
    { title: 'Statuses of Scheduled Processes', publisher: 'Oracle Help Center (Applications Common 26D)', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/statuses-of-scheduled-processes.html' },
    { title: 'Process Sets', publisher: 'Oracle Help Center (Applications Common 26D)', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/process-sets.html' },
    { title: 'Cancel or Make Changes to Scheduled Processes', publisher: 'Oracle Help Center (Applications Common 26D)', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/cancel-or-make-changes-to-scheduled-processes.html' },
    { title: 'Resubmit Scheduled Processes and Process Sets', publisher: 'Oracle Help Center (Applications Common 26D)', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/resubmit-scheduled-processes-and-process-sets.html' },
    { title: 'How You Submit Accounting Process', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fausl/how-you-submit-accounting-process.html' },
    { title: 'Where to Find Information About Financials Scheduled Processes', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fafcf/where-to-find-information-about-financials-scheduled-processes.html' },
    { title: 'Payables Unaccounted Transactions and Sweep Report', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-unaccounted-transactions-and-sweep-report.html' },
    { title: 'Automatic Reconciliation', publisher: 'Oracle Help Center (Financials 26D)', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/automatic-reconciliation.html' },
  ],
};
