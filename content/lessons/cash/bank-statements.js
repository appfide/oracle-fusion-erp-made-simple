export default {
  slug: 'bank-statements',
  title: 'Bank Statements: The Bank’s Diary',
  minutes: 15,
  summary:
    'A bank statement is the bank’s diary of everything that happened in one account. Learn the parts of a statement, the electronic formats Oracle Fusion reads (BAI2, SWIFT MT940, ISO 20022 camt.053 and more), how statements are loaded and imported, and how to fix import errors.',
  objectives: [
    'Name the parts of a bank statement: header, balances and statement lines',
    'List the electronic bank statement formats Oracle Fusion supports',
    'Explain the retrieve, load and import phases and the processes that run them',
    'Describe transaction codes and code maps, and why a missing code causes an import error',
    'Tell the difference between prior-day and intraday statements',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The bank keeps a diary too',
      html: `<p>Imagine the bank writes a tiny diary for your account every day:</p>
<p><em>“Monday: you started with $100. Grandma put in $20. You took out $5 for stickers. The bank charged $1. You ended with $114.”</em></p>
<p>That diary page has three parts: <strong>who it is about</strong> (your account, the date), <strong>the balances</strong> (start and end), and <strong>the lines</strong> (each thing that happened). A real <strong>bank statement</strong> is exactly that — and Oracle can read thousands of these diary pages automatically, as long as they are written in a language it understands.</p>`,
    },
    {
      type: 'text',
      heading: 'The parts of a bank statement',
      html: `<p>Every statement in Oracle Fusion Cash Management has the same three layers:</p>
<ul>
<li><strong>Header</strong> — the bank account, the statement ID (number), and the statement date or date range. Oracle requires the statement ID to be <strong>unique within a bank account for a calendar year</strong>, which is how it spots duplicates.</li>
<li><strong>Balances</strong> — such as opening and closing <em>booked</em> balances and opening and closing <em>available</em> balances. Oracle delivers balance codes for these: <code>OPBD</code> (opening booked), <code>CLBD</code> (closing booked), <code>OPAV</code> (opening available) and <code>CLAV</code> (closing available).</li>
<li><strong>Statement lines</strong> — one line per event: amount, debit or credit (the <em>flow indicator</em>), booking date, value date, a <strong>transaction code</strong>, a transaction type, and reference text from the bank (often called the <em>addenda</em>).</li>
</ul>`,
    },
    {
      type: 'table',
      caption: 'Sunny Operating Account — Big River Bank statement for June 2026 (story data)',
      headers: ['Date', 'Description from the bank', 'Code', 'Type', 'Money in', 'Money out'],
      rows: [
        ['Jun 1', '<em>Opening booked balance: $10,000.00</em>', '—', '—', '', ''],
        ['Jun 3', 'ACH credit — HAPPY CAFE — ref RCPT-2201', '—', 'ACH', '$400.00', ''],
        ['Jun 5', 'EFT debit — LEMON GROVE FARMS — ref PAY-5001', '—', 'EFT', '', '$500.00'],
        ['Jun 10', 'Check paid — check no. 1001', '475', 'CHK', '', '$200.00'],
        ['Jun 15', 'EFT debit — BRIGHT POWER UTILITY — ref PAY-5002', '—', 'EFT', '', '$150.00'],
        ['Jun 30', 'Monthly account service fee', '698', 'BKF', '', '$15.00'],
        ['Jun 30', '<em>Closing booked balance: $9,535.00</em>', '—', '—', '', ''],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Check the arithmetic',
      html: `<p>$10,000 + $400 − $500 − $200 − $150 − $15 = <strong>$9,535</strong>. The check payment of $200 went to Sweet Sugar Co. and the electricity payment of $150 went to Bright Power Utility. We will reconcile this exact statement in the next lesson.</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: read the statement like a cash manager',
      instructions: `<p>Use Sunny’s June statement above to fill in the blanks.</p>`,
      html: `<p>Total money in during June: \${{}}</p><p>Total money out during June: \${{}}</p><p>Closing booked balance = $10,000 + money in − money out = \${{}}</p><p>The balance code Oracle uses for the closing booked balance: {{}}</p>`,
      blanks: [
        { answer: 400 },
        { answer: 865 },
        { answer: 9535 },
        { answer: ['CLBD'], hint: 'four letters' },
      ],
      explain: `<p>In: $400 from Happy Cafe. Out: $500 + $200 + $150 + $15 = $865. So $10,000 + $400 − $865 = $9,535. Oracle’s delivered balance codes are OPBD/CLBD for opening/closing <em>booked</em> and OPAV/CLAV for opening/closing <em>available</em> balances.</p>`,
    },
    {
      type: 'text',
      heading: 'Transaction codes: the bank’s short words',
      html: `<p>Banks label each line with a code. Oracle calls these <strong>bank statement transaction codes</strong> (or statement codes). Oracle keeps <strong>one normalized set</strong> of codes, and translates whatever the bank sends into that set. Examples Oracle gives include <code>115</code> Lockbox Deposit, <code>475</code> Check paid and <code>698</code> Miscellaneous Fee.</p>
<p>Each code also carries a <strong>transaction type</strong>, which later helps matching. Oracle’s delivered transaction types include <code>ACH</code> (automated clearing house), <code>BKA</code> (bank adjustment), <code>BKF</code> (fee), <code>CHK</code> (check), <code>EFT</code> (electronic funds transfer), <code>INT</code> (interest), <code>LBX</code> (lockbox), <code>MSC</code> (miscellaneous) and <code>ZBA</code> (zero balance).</p>
<p>If a bank sends its own unusual code, you map it to your internal code with a <strong>code map group</strong> (set up in Oracle Payments). For BAI2 files, the code also decides whether a line is a debit or a credit — and Oracle lets you map “configurable” BAI2 codes to standard ones so the direction comes out right.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: match the bank’s codes',
      instructions: `<p>Match each code on a statement line to its meaning in Oracle.</p>`,
      pairs: [
        { left: '115', right: 'Lockbox Deposit' },
        { left: '475', right: 'Check paid' },
        { left: '698', right: 'Miscellaneous Fee' },
        { left: 'BKF', right: 'Fee (transaction type)' },
        { left: 'INT', right: 'Interest (transaction type)' },
        { left: 'EFT', right: 'Electronic funds transfer (transaction type)' },
      ],
      explain: `<p>Numeric values like 115, 475 and 698 are <strong>transaction codes</strong> (Oracle’s own examples). Short letter values like BKF, INT and EFT are <strong>transaction types</strong> delivered by Oracle. Types later help matching rules and transaction creation rules pick the right lines.</p>`,
    },
    {
      type: 'text',
      heading: 'Statement file formats',
      html: `<p>Banks can send the same information in different electronic “languages”. Oracle Fusion Cash Management delivers one format definition for each supported standard, and you can add more.</p>`,
    },
    {
      type: 'table',
      caption: 'Electronic statement formats Oracle Fusion Cash Management supports',
      headers: ['Format', 'Where you often see it', 'Plain words'],
      rows: [
        ['<strong>BAI2</strong>', 'Common with banks in the United States', 'A text file with numbered record types and codes.'],
        ['<strong>SWIFT MT940</strong>', 'Widely used internationally', 'A position-based customer statement message from the SWIFT network.'],
        ['<strong>EDIFACT FINSTA</strong>', 'Used by some European banks', 'A UN/EDIFACT financial statement message.'],
        ['<strong>ISO 20022 camt.053</strong> (versions 1, 2 and 3)', 'The modern XML standard many banks are moving to', 'An XML end-of-day bank-to-customer statement.'],
        ['<strong>ISO 20022 camt.052</strong> (version 1)', 'Reports during the day', 'An XML account report, useful for intraday information.'],
      ],
    },
    {
      type: 'flow',
      title: 'How an electronic statement gets into Oracle',
      steps: [
        { icon: '📥', label: 'Retrieve', detail: 'Fetch the file from the bank’s server (or from a file you uploaded) and store it.' },
        { icon: '🧺', label: 'Load', detail: 'Read the file and fill the bank statement interface tables (the staging area).' },
        { icon: '✅', label: 'Import', detail: 'Validate the data (duplicates, codes, account) and create the real bank statements. Parsing rules run here.' },
        { icon: '🔍', label: 'Reconcile', detail: 'Optionally, Autoreconciliation runs straight after a successful import.' },
      ],
      note: `<p>If something fails in <strong>import</strong>, you fix the cause and rerun just the import. If it fails in <strong>load</strong>, you purge the failed data and resubmit.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: two ways to bring statements in',
      html: `<ul>
<li><strong>Automatic</strong>: Oracle Payments connects to the bank using a <em>transmission configuration</em> (for example SFTP or HTTPS). You schedule the <kbd>Process Electronic Bank Statements</kbd> process, which retrieves, loads and imports the files.</li>
<li><strong>Manual file upload</strong>: zip the bank’s file, upload it with <kbd>File Import and Export</kbd> to the account <code>fin/cashManagement/import</code>, then run <kbd>Load and Import Bank Statement</kbd>. Its parameters include the <em>Format</em> (e.g. BAI2), the <em>Data File</em>, <em>Intraday</em>, and <em>Submit Autoreconciliation</em>.</li>
</ul>
<p>For a bank that cannot send a standard file, there is a spreadsheet template (the File-Based Data Import template for importing bank statements). You generate a zip of CSV files, upload it, and run <kbd>Load Interface File for Import</kbd> with the import process for bank statements. These statements show an entry type of <em>Spreadsheet</em>.</p>
<p>Imported statements appear on the <kbd>Manage Bank Statements</kbd> page in the Bank Statements and Reconciliation work area. Labels may differ slightly by release.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Practice: the journey of a statement file',
      instructions: `<p>Big River Bank drops a BAI2 file on its SFTP server. Put what happens next in order.</p>`,
      items: [
        'The scheduled process connects to the bank using the transmission configuration',
        'Retrieve: the file is fetched and stored',
        'Load: the file is read into the bank statement interface (staging) tables',
        'Import: functional checks run (duplicates, transaction codes, account) and parse rules apply',
        'The statement appears on the Manage Bank Statements page',
        'Autoreconciliation matches the lines (if requested)',
      ],
      explain: `<p>Retrieve, then load, then import. Only a successfully imported statement can be reconciled. Knowing the phase matters when things go wrong: import errors are retried from the import step, while load errors may need the file purged and resubmitted.</p>`,
    },
    {
      type: 'text',
      heading: 'When something goes wrong',
      html: `<p>The results of statement processing appear in the Bank Statements and Reconciliation work area only when there is a problem. Each file or statement gets one of three statuses.</p>`,
    },
    {
      type: 'table',
      caption: 'Statement processing statuses and what to do',
      headers: ['Status', 'What it means', 'What Mia does'],
      rows: [
        ['<strong>Load Error</strong>', 'The whole file could not be fetched or read — usually the file does not follow its format standard.', 'If the file was never fetched, use <kbd>Retry</kbd>. If it was fetched but wrong, purge it and resubmit a corrected file.'],
        ['<strong>Import Error</strong>', 'The file loaded, but a statement failed a functional check — for example a duplicate statement or an unknown transaction code.', 'Fix the cause (e.g. define the code or a code map) and retry the import for that statement or file.'],
        ['<strong>Import Warning</strong>', 'The statement imported, but a harmless check failed.', 'Review the warning; no rerun usually needed.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: which status would you see?',
      instructions: `<p>For each situation, choose the processing status Oracle would most likely show.</p>`,
      categories: ['Load Error', 'Import Error', 'Import Warning'],
      items: [
        { text: 'The file is corrupted and does not follow the BAI2 standard', answer: 'Load Error' },
        { text: 'The same June statement (same statement ID) is sent again', answer: 'Import Error' },
        { text: 'A line uses transaction code 699, which is not defined or mapped', answer: 'Import Error' },
        { text: 'The statement imported, but a minor, harmless check failed', answer: 'Import Warning' },
      ],
      explain: `<p>Load errors are file-level problems reading the data. Import errors mean the data loaded but failed a functional check, such as a duplicate statement or an unknown code. Import warnings let the statement in but flag something to review.</p>`,
    },
    {
      type: 'example',
      title: 'Mia fixes an import error',
      html: `<p>On July 1, the overnight process runs for the Sunny Operating Account. The Bank Statements and Reconciliation overview shows an <strong>Import Error</strong> for the June statement.</p>`,
      steps: [
        'Mia opens the processing errors and reads the message: a transaction code is not defined.',
        'Big River Bank started sending code <code>699</code> for its service fee instead of <code>698</code>.',
        'Mia asks Jordan to add a <strong>code map</strong> so the bank’s 699 is translated to the internal code 698 Miscellaneous Fee (the alternative is to define 699 as a new code).',
        'Mia clicks <kbd>Retry</kbd>. Because this was an import error, only the import phase runs again.',
        'The statement now appears on <kbd>Manage Bank Statements</kbd> with all six lines, ready for reconciliation.',
      ],
      result: `<p>Because Oracle checks for duplicate statement IDs, Mia can safely rerun a bank file that was partly imported before — statements already imported are flagged instead of loaded twice.</p>`,
    },
    {
      type: 'text',
      heading: 'Prior-day vs. intraday statements',
      html: `<p>A <strong>prior-day statement</strong> describes everything that happened yesterday and gives an official closing balance. This is the statement you reconcile. Several prior-day statements are allowed in a date range.</p>
<p>An <strong>intraday statement</strong> shows activity <em>so far today</em>. Oracle allows only one intraday statement per day per account. Banks send them either as <strong>cumulative</strong> (each file repeats everything so far, so Oracle replaces the previous one) or <strong>incremental</strong> (each file holds only new lines, so Oracle adds them to the existing intraday statement). Intraday data helps the cash position, which you will meet in the last lesson of this module.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Parse rules: finding the needle in the text',
      html: `<p>Banks often stuff useful references into one long text field, like <code>PAYMENT REF:PAY-5001 FROM SUNNY</code>. A <strong>parse rule set</strong>, assigned to the bank account, moves pieces of that text into specific statement line fields (for example the reconciliation reference). Good parsing means better automatic matching later.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>When a company goes live, the bank statement integration is often the riskiest part of Cash Management: each bank’s file has small quirks. Test with <strong>real sample files from every bank</strong> before go-live, and keep a list of each bank’s codes and how they are mapped.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Statement line', def: 'One entry on a bank statement, such as a deposit, a check paid, or a fee.' },
        { term: 'Transaction code', def: 'A short code on each statement line that says what kind of transaction it is, like 475 for a paid check.' },
        { term: 'Code map group', def: 'A translation table that converts a bank’s own codes into the codes defined in Oracle.' },
        { term: 'BAI2', def: 'A bank statement file format commonly used by banks in the United States.' },
        { term: 'camt.053', def: 'The ISO 20022 XML message for an end-of-day bank-to-customer statement.' },
        { term: 'Intraday statement', def: 'A statement showing today’s activity so far, used for watching cash during the day.' },
        { term: 'Parse rule set', def: 'Rules that pull specific pieces of information out of long bank statement text into separate fields.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which of these is NOT one of the electronic statement formats Oracle Fusion Cash Management lists as supported?',
          options: ['BAI2', 'SWIFT MT940', 'ISO 20022 camt.053', 'A photo of a paper statement'],
          answer: 3,
          explain: 'Oracle supports structured files such as BAI2, MT940, EDIFACT FINSTA and ISO 20022 camt.052/camt.053. A non-standard source can use the spreadsheet template, but not a photo.',
        },
        {
          q: 'A statement fails with an Import Error because the bank sent an unknown transaction code. What is a correct fix?',
          options: [
            'Delete the bank account',
            'Define the code, or map it to an existing code with a code map group, then retry the import',
            'Close the accounting period',
            'Ask the supplier to resend the invoice',
          ],
          answer: 1,
          explain: 'Import errors come from functional checks. Defining or mapping the code and retrying the import solves it.',
        },
        {
          q: 'What are the three phases of electronic bank statement processing, in order?',
          options: ['Import, load, retrieve', 'Retrieve, load, import', 'Load, reconcile, retrieve', 'Approve, pay, post'],
          answer: 1,
          explain: 'Oracle retrieves the file, loads it into the interface (staging) tables, then imports it into the bank statement tables.',
        },
        {
          q: 'Which statement type gives the official closing balance you normally reconcile?',
          options: ['Intraday statement', 'Prior-day statement', 'Incremental intraday file', 'A cash forecast'],
          answer: 1,
          explain: 'Prior-day statements report yesterday’s activity and closing balances. Intraday statements show activity so far today.',
        },
      ],
    },
  ],
  sources: [
    { title: 'How You Process Electronic Bank Statements', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-you-process-electronic-bank-statements.html' },
    { title: 'Overview of Bank Statement Processing and Troubleshooting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-bank-statement-processing-and-troubleshooting.html' },
    { title: 'How Bank Statements Import Data is Processed', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-bank-statements-import-data-is-processed.html' },
    { title: 'Overview of Bank Statement Transaction Codes', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/overview-of-bank-statement-transaction-codes.html' },
    { title: 'Overview of Parse Rule Sets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/overview-of-parse-rule-sets.html' },
  ],
};
