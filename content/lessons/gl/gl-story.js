export default {
  slug: 'gl-story',
  title: 'Practice Story: Sunny Lemonade Closes the Month',
  minutes: 30,
  summary:
    'Follow Priya day by day as Priya closes January 2026 for Sunny Lemonade US Inc. in Oracle Fusion: subledgers close, journals arrive, accruals, recurring rent, an allocation and a currency revaluation are posted, and the trial balance becomes financial statements before the period is closed.',
  objectives: [
    'Follow a complete month-end close for one ledger from the first subledger journal to the closed period',
    'Record and check the main close journals: subledger summaries, accruals, recurring rent, allocation and revaluation',
    'Build a trial balance and financial statements from posted journals',
    'Explain what happens automatically when the next period opens',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The last page of the month',
      html: `<p>Imagine the class treasurer on the last day of the month. The bake-sale club, the book club and the sports club hand in their notebooks. The treasurer adds a few notes of her own: “We used the hall but haven’t paid yet.” “The hall cost is shared between the clubs.” Then she adds everything up, checks it twice, shows the teacher, and writes <strong>“January – FINAL”</strong> at the bottom of the page.</p>
<p><span class="hl">That is a month-end close.</span> Today you’ll watch Priya do it for real at Sunny Lemonade, step by step, in Oracle Fusion.</p>`,
    },
    {
      type: 'text',
      heading: 'The setting: Sunny US, January 2026',
      html: `<p>Priya is the general ledger accountant for <strong>Sunny Lemonade US Inc.</strong> (company <code>101</code>) in the <strong>Sunny US Ledger</strong> (USD). Sunny closes in four working days (WD1 to WD4) after month-end. Sam, the CFO, wants the January statements on WD3 and the period closed on WD4.</p>
<p>On 1 January 2026 the ledger opened with these balances:</p>
<ul>
<li>1110 Cash – Big River Bank: <strong>$20,000</strong> (debit)</li>
<li>1510 Equipment: <strong>$6,000</strong> (debit). This is the lemonade stand from Stand Builders LLC, in service since 1 January, with a 5-year life.</li>
<li>3100 Owner’s Equity: <strong>$26,000</strong> (credit)</li>
</ul>
<p>Sunny also has a small <strong>pound sterling account</strong> at Big River Bank for UK payments. It uses account 1110 too, because Oracle keeps balances by entered currency. Priya’s data access set gives Priya read and write access to the Sunny US Ledger. The period <code>Jan-26</code> is <strong>Open</strong> and <code>Feb-26</code> is <strong>Future Enterable</strong>.</p>`,
    },
    {
      type: 'flow',
      title: 'Priya’s close plan',
      steps: [
        { icon: '📅', label: 'During January', detail: 'Subledgers send journals. Mia buys pounds. AutoPost runs after every import.' },
        { icon: '🔒', label: 'WD1', detail: 'Payables, Assets and Receivables finish and close. The bank statement is reconciled.' },
        { icon: '✍️', label: 'WD2', detail: 'Clear the Journals infolet, then post accruals, rent, the allocation and revaluation.' },
        { icon: '🔍', label: 'WD3', detail: 'Reconcile, review the trial balance, produce the statements for Sam.' },
        { icon: '✅', label: 'WD4', detail: 'Close Jan-26. Opening February triggers AutoReverse.' },
      ],
    },
    {
      type: 'example',
      title: 'During January: the subledgers do most of the writing',
      html: `<p>All month, the subledgers create accounting and send it to the GL. Sunny’s <strong>AutoPost criteria set</strong> posts journals from the Payables, Receivables, Assets and Cash Management sources straight after <strong>Import Journals</strong>, so nobody can edit them on the way. Here is what arrived:</p>`,
      steps: [
        '<strong>Payables (Ava):</strong> invoices from Lemon Grove Farms ($500 lemons), Sweet Sugar Co. ($200 sugar) and Cup &amp; Straw Supply ($300 cups and straws). Ava paid Lemon Grove Farms $500 on 12 January.',
        '<strong>Receivables (Omar):</strong> invoices to Happy Cafe ($400), City Park Kiosk ($1,600) and Sunshine School ($2,000), $4,000 in total, of which $3,000 is Classic and $1,000 is Pink Lemonade. Happy Cafe and Sunshine School paid $2,400.',
        '<strong>Cash Management (Mia):</strong> on 5 January Mia bought <strong>£1,000</strong> for <strong>$1,250</strong> (rate 1.25) into the pound account. The January bank statement also shows a <strong>$25</strong> bank charge.',
        '<strong>Assets:</strong> depreciation for the stand: $6,000 ÷ 60 months = <strong>$100</strong>.',
      ],
      result: `<p>Priya didn’t type any of this. Priya’s job is to make sure it all <em>arrived</em> and is <em>right</em>.</p>`,
    },
    {
      type: 'journal',
      title: 'Payables invoices, Jan-26 (source: Payables)',
      lines: [
        { account: '101-200-5110-010-000 Lemons Cost', debit: 500, credit: 0 },
        { account: '101-200-5120-010-000 Sugar Cost', debit: 200, credit: 0 },
        { account: '101-200-5130-000-000 Cups and Straws Cost', debit: 300, credit: 0 },
        { account: '101-100-2110-000-000 Accounts Payable – Trade', debit: 0, credit: 1000 },
      ],
    },
    {
      type: 'journal',
      title: 'Payables payment to Lemon Grove Farms (source: Payables)',
      lines: [
        { account: '101-100-2110-000-000 Accounts Payable – Trade', debit: 500, credit: 0 },
        { account: '101-100-1110-000-000 Cash – Big River Bank', debit: 0, credit: 500 },
      ],
    },
    {
      type: 'journal',
      title: 'Receivables invoices, Jan-26 (source: Receivables)',
      lines: [
        { account: '101-100-1210-000-000 Accounts Receivable', debit: 4000, credit: 0 },
        { account: '101-300-4110-010-000 Lemonade Sales Revenue – Classic', debit: 0, credit: 3000 },
        { account: '101-300-4110-020-000 Lemonade Sales Revenue – Pink', debit: 0, credit: 1000 },
      ],
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: the customer receipts',
      instructions: `<p>Happy Cafe ($400) and Sunshine School ($2,000) paid into the Big River Bank account. Build the summary journal that Receivables sends to the GL for these receipts.</p>`,
      accounts: ['1110 Cash – Big River Bank', '1210 Accounts Receivable', '4110 Lemonade Sales Revenue', '2110 Accounts Payable – Trade', '3100 Owner’s Equity'],
      answer: [
        { account: '1110 Cash – Big River Bank', debit: 2400, credit: 0 },
        { account: '1210 Accounts Receivable', debit: 0, credit: 2400 },
      ],
      explain: `<p>Cash goes up (debit) and the amount customers owe goes down (credit). Revenue isn’t touched: it was already recorded when Omar sent the invoices. A receipt only changes <em>what form</em> the money is in.</p>`,
    },
    {
      type: 'journal',
      title: 'Cash Management: buying pounds on 5 January (accounted USD)',
      lines: [
        { account: '101-100-1110-000-000 Cash – Big River Bank (pound account, entered GBP 1,000)', debit: 1250, credit: 0 },
        { account: '101-100-1110-000-000 Cash – Big River Bank (dollar account, entered USD 1,250)', debit: 0, credit: 1250 },
      ],
      note: `<p>In dollars, total cash doesn’t change: $1,250 moved from the dollar account into pounds. But now Sunny US holds a <strong>foreign-currency balance</strong>, and its dollar value will move with the exchange rate. Remember this for WD2.</p>`,
    },
    {
      type: 'journal',
      title: 'Depreciation (source: Assets) and the bank charge (source: Cash Management)',
      lines: [
        { account: '101-100-6140-000-000 Depreciation Expense', debit: 100, credit: 0 },
        { account: '101-100-1590-000-000 Accumulated Depreciation', debit: 0, credit: 100 },
        { account: '101-100-7110-000-000 Bank Charges', debit: 25, credit: 0 },
        { account: '101-100-1110-000-000 Cash – Big River Bank', debit: 0, credit: 25 },
      ],
      note: `<p>Two separate journals in real life, shown together here to save space. Each pair balances on its own.</p>`,
    },
    {
      type: 'text',
      heading: 'WD1: the subledgers close',
      html: `<p>On the first working day of February, the subledger teams finish their part:</p>
<ul>
<li><strong>Ava</strong> makes sure every January invoice is validated and accounted, runs Create Accounting one last time, checks there are no accounting errors, and closes the Payables period.</li>
<li>The <strong>asset accountant</strong> confirms depreciation ran and closes the asset book for January.</li>
<li><strong>Omar</strong> finishes receipts and closes the Receivables period. <strong>Mia</strong> reconciles the January bank statement and finds the $25 fee already accounted.</li>
</ul>
<p>Priya opens the <strong>Close Monitor</strong> from the <strong>Open Subledgers</strong> infolet on the General Accounting Dashboard. For the Sunny US Ledger, Payables, Receivables and Assets all show <em>Closed</em>. General Ledger still shows <em>Open</em>, as planned: the GL always closes last.</p>
<p>Priya also opens February (<code>Feb-26</code>) with <kbd>Manage Accounting Periods</kbd>, so the teams can start February work. January stays open for Priya’s adjustments.</p>`,
    },
    {
      type: 'text',
      heading: 'WD2 morning: clearing the Journals infolet',
      html: `<p>Priya’s first stop on WD2 is the <strong>Journals</strong> infolet. It shows <strong>2 outstanding batches</strong>:</p>
<ul>
<li><strong>Incomplete (1):</strong> Priya’s own draft accrual from last Friday, saved while waiting for Noah to confirm an amount. Priya finishes it below.</li>
<li><strong>Pending Approval (1):</strong> a small cost center reclass (Kitchen to Sales, same natural account) that Priya submitted on 30 January. Sam approves it from the notifications, and because Priya had clicked Post, posting starts automatically after approval. Account totals don’t change, only the cost center split.</li>
</ul>
<p>There are <strong>no posting errors</strong> and <strong>no import errors</strong>. Every subledger journal posted through AutoPost. Priya is ready for Priya’s own entries.</p>`,
    },
    {
      type: 'example',
      title: 'WD2: accruals for things used but not yet billed',
      html: `<p>Two January costs have no invoice yet:</p>`,
      steps: [
        '<strong>Electricity:</strong> Bright Power Utility’s bill comes mid-February, but the kitchen used about <strong>$150</strong> of power in January.',
        '<strong>A taxi:</strong> Noah confirmed a <strong>$40</strong> taxi on 30 January that Noah will claim in February.',
        'Priya enters both lines in one batch, “Jan-26 Accruals”, category <strong>Accrual</strong>, accounting date 31 Jan 2026. Sunny’s journal reversal criteria set says <em>Accrual → Next Period → Reverse and Post Automatically</em>.',
        'Because the batch uses the Manual source and is small, Sunny’s approval rules don’t require approval. Priya posts it.',
      ],
      result: `<p>January now carries its true electricity and travel costs. When the period changes, both lines will reverse themselves in February.</p>`,
    },
    {
      type: 'journal',
      title: 'Jan-26 accruals (source: Manual, category: Accrual)',
      lines: [
        { account: '101-200-6120-000-000 Electricity (Kitchen)', debit: 150, credit: 0 },
        { account: '101-200-6130-000-000 Travel and Meals (Kitchen)', debit: 40, credit: 0 },
        { account: '101-100-2120-000-000 Received Not Invoiced Accrual', debit: 0, credit: 190 },
      ],
    },
    {
      type: 'example',
      title: 'WD2: recurring rent, then the allocation',
      html: `<p>The landlord collected the <strong>$1,000</strong> rent on 31 January. Priya opens the saved <em>Monthly Rent</em> spreadsheet, sets the period to <code>Jan-26</code> and the date to 31 January, and submits with <em>Submit Journal Import and Posting</em>.</p>`,
      steps: [
        'The rent journal posts to cost center 100 Administration.',
        'Now that the source balance is posted, Priya opens <kbd>Generate Allocations</kbd> in the Journals work area.',
        'Priya picks the rule “SUNNY RENT BY FLOOR SPACE”, enters period Jan-26 at the runtime prompt, leaves <kbd>Post Allocations</kbd> ticked and submits.',
        'The rule reads the $1,000 pool and the floor-space statistics (Kitchen 70 m², Sales 30 m²), and creates and posts the allocation batch.',
      ],
      result: `<p>Order matters: running the allocation <em>before</em> the rent posted would have allocated $0. The <strong>Unallocated Balances</strong> infolet now shows nothing left in the rent pool.</p>`,
    },
    {
      type: 'journal',
      title: 'Monthly rent, Jan-26 (standard recurring)',
      lines: [
        { account: '101-100-6110-000-000 Rent (Administration)', debit: 1000, credit: 0 },
        { account: '101-100-1110-000-000 Cash – Big River Bank', debit: 0, credit: 1000 },
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Your turn: what will the allocation post?',
      instructions: `<p>Use the floor space (Kitchen 70 m², Sales 30 m²) to fill in the generated allocation journal.</p>`,
      html: `<p>Debit 101-200-6110 Rent (Kitchen): $ {{}}</p>
<p>Debit 101-300-6110 Rent (Sales): $ {{}}</p>
<p>Credit 101-100-6110 Rent (Administration), offset: $ {{}}</p>`,
      blanks: [{ answer: 700 }, { answer: 300 }, { answer: 1000 }],
      explain: `<p>70 ÷ 100 × 1,000 = $700 and 30 ÷ 100 × 1,000 = $300. The offset empties the $1,000 pool. Total rent for Sunny US is still $1,000. Only <em>where</em> it sits has changed.</p>`,
    },
    {
      type: 'journal',
      title: 'Generated allocation, Jan-26',
      lines: [
        { account: '101-200-6110-000-000 Rent (Kitchen)', debit: 700, credit: 0 },
        { account: '101-300-6110-000-000 Rent (Sales)', debit: 300, credit: 0 },
        { account: '101-100-6110-000-000 Rent (Administration) – offset', debit: 0, credit: 1000 },
      ],
    },
    {
      type: 'example',
      title: 'WD2 afternoon: revaluing the pound balance',
      html: `<p>Mia loads the 31 January rates into the Currency Rates Manager: the Corporate rate is now <strong>1 GBP = 1.27 USD</strong>. Sunny’s £1,000 was booked at 1.25 ($1,250), but today it is worth 1,000 × 1.27 = <strong>$1,270</strong>.</p>`,
      steps: [
        'Priya runs the <strong>Revalue Balances</strong> process with Sunny’s revaluation definition: account 1110, all foreign currencies, Corporate rate type, unrealized gains and losses to 7120, post automatically.',
        'The <strong>Revaluation Execution Report</strong> shows the GBP rate used, the account revalued and one journal created for $20.',
        'Because 1110 is a balance sheet account, this journal will be <strong>reversed in February</strong>, and revaluation runs again at the end of February using February’s rate.',
      ],
      result: `<p>The balance sheet now shows the pounds at today’s value. The $20 is an <em>unrealized</em> gain: Sunny hasn’t sold the pounds yet.</p>`,
    },
    {
      type: 'lab',
      tool: 'fx',
      title: 'Try the revaluation yourself',
      intro: `<p>The simulator is preset with Sunny’s £1,000 booked at 1.25 and revalued at 1.27. Check the $20 gain. Then ask: what if the pound had <em>fallen</em> to 1.23 by 31 January? What journal would revaluation post then?</p>`,
      preset: { amount: 1000, currency: 'GBP', rate1: 1.25, rate2: 1.27 },
    },
    {
      type: 'journal',
      title: 'Revaluation, 31 Jan 2026 (accounted USD; entered GBP 0)',
      lines: [
        { account: '101-100-1110-000-000 Cash – Big River Bank (pound account)', debit: 20, credit: 0 },
        { account: '101-100-7120-000-000 Foreign Exchange Gain/Loss (unrealized gain)', debit: 0, credit: 20 },
      ],
      note: `<p>Only the dollar value changes. The pound account still holds exactly £1,000. If the rate had fallen to 1.23, the journal would be the mirror image: debit 7120 $20 (loss) and credit 1110 $20.</p>`,
    },
    {
      type: 'text',
      heading: 'WD3: reconcile, then review the trial balance',
      html: `<p>Before trusting the numbers, Priya checks that the ledger agrees with its feeders:</p>
<ul>
<li><strong>Payables:</strong> the Accounts Payable Reconciliation infolet compares the Payables subledger ($500 still owed to Sweet Sugar Co. and Cup &amp; Straw Supply) with GL account 2110 ($500). The difference is zero.</li>
<li><strong>Receivables:</strong> the Accounts Receivable Reconciliation infolet shows $1,600 open (City Park Kiosk) against GL account 1210 at $1,600. The difference is zero.</li>
<li><strong>Cash:</strong> Mia’s reconciliation agrees with 1110. The dollar account holds $19,625 and the pound account holds £1,000, worth $1,270.</li>
</ul>
<p>Then Priya runs the <strong>Trial Balance Report</strong> from Scheduled Processes for the Sunny US Ledger, period Jan-26:</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny US Ledger – trial balance, 31 January 2026 (USD)',
      headers: ['Account', 'Name', 'Debit', 'Credit'],
      rows: [
        ['1110', 'Cash – Big River Bank (USD 19,625 + GBP account 1,270)', '20,895', ''],
        ['1210', 'Accounts Receivable', '1,600', ''],
        ['1510', 'Equipment (Fixed Assets)', '6,000', ''],
        ['1590', 'Accumulated Depreciation', '', '100'],
        ['2110', 'Accounts Payable – Trade', '', '500'],
        ['2120', 'Received Not Invoiced Accrual', '', '190'],
        ['3100', 'Owner’s Equity', '', '26,000'],
        ['4110', 'Lemonade Sales Revenue', '', '4,000'],
        ['5110', 'Lemons Cost', '500', ''],
        ['5120', 'Sugar Cost', '200', ''],
        ['5130', 'Cups and Straws Cost', '300', ''],
        ['6110', 'Rent (Kitchen 700, Sales 300, Admin 0)', '1,000', ''],
        ['6120', 'Electricity', '150', ''],
        ['6130', 'Travel and Meals', '40', ''],
        ['6140', 'Depreciation Expense', '100', ''],
        ['7110', 'Bank Charges', '25', ''],
        ['7120', 'Foreign Exchange Gain/Loss', '', '20'],
        ['<strong>Total</strong>', '', '<strong>30,810</strong>', '<strong>30,810</strong>'],
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Your turn: prove the cash balance',
      instructions: `<p>Rebuild the January cash movement from the journals in this story (in USD).</p>`,
      html: `<p>Opening cash $20,000 − payment to Lemon Grove Farms $ {{}} + customer receipts $ {{}} − bank charge $25 − rent $1,000 + revaluation gain $ {{}} = closing cash $ {{}}</p>`,
      blanks: [{ answer: 500 }, { answer: 2400 }, { answer: 20 }, { answer: 20895 }],
      explain: `<p>20,000 − 500 + 2,400 − 25 − 1,000 + 20 = <strong>$20,895</strong>. The pound purchase isn’t in the list, because it moved $1,250 between two Sunny bank accounts and didn’t change total cash.</p>`,
    },
    {
      type: 'example',
      title: 'WD3: the statements for Sam',
      html: `<p>Priya runs Sunny’s financial reports from the <strong>Financial Reporting Center</strong>. The report rows point at hierarchy parents like <code>5000 Cost of Lemonade</code> and <code>6000 Operating Expenses</code>, so every posted account is picked up.</p>
<ul>
<li><strong>Income statement:</strong> revenue $4,000 − cost of lemonade $1,000 = gross profit $3,000. Operating expenses (rent $1,000, electricity $150, travel $40, depreciation $100) total $1,290, giving an operating profit of $1,710. Bank charges (−$25) and the FX gain (+$20) give a <strong>net income of $1,705</strong>.</li>
<li><strong>Balance sheet:</strong> cash $20,895 + receivables $1,600 + equipment net $5,900 = <strong>total assets $28,395</strong>. Liabilities: payables $500 + accruals $190 = $690. Equity: $26,000 + current-year earnings $1,705 = $27,705. Liabilities plus equity = <strong>$28,395</strong>. ✔</li>
</ul>`,
      steps: [
        'Sam asks why Kitchen costs are higher than last month. Priya opens the Account Inspector from the report, expands cost center 200 and shows the new $700 rent allocation (it started this month).',
        'Sam asks about the $20 FX gain. Priya drills to the revaluation journal and explains that it’s unrealized and will reverse on 1 February.',
        'Sam is happy and approves the January numbers.',
      ],
      result: `<p>Sunny US made <strong>$1,705</strong> in January, and every dollar of it can be traced back to a journal and a transaction.</p>`,
    },
    {
      type: 'text',
      heading: 'WD4: closing January',
      html: `<p>Sunny’s primary ledger has the option <strong>Prevent General Ledger Period Closure When Open Subledger Periods Exist</strong> switched on. So when Priya selects <code>Jan-26</code> in <kbd>Manage Accounting Periods</kbd> and closes it, Oracle first checks that:</p>
<ul>
<li>the Payables, Receivables and other included subledger periods are closed (they are, since WD1);</li>
<li>there are no unprocessed or untransferred subledger transactions and nothing pending in the GL interface;</li>
<li>there are no unposted GL journals for January.</li>
</ul>
<p>All checks pass, and <code>Jan-26</code> becomes <strong>Closed</strong>. The Close Monitor shows the whole Sunny US Ledger closed for January.</p>
<p>February was opened on WD1, and the ledger option <strong>Run AutoReverse After Open Period</strong> is on, so the <strong>AutoReverse Journals</strong> process ran then. In <code>Feb-26</code> it created and posted the reversals of the electricity and taxi accruals, and the reversal of the January revaluation. When Ava enters Bright Power Utility’s real bill in February, nothing will be counted twice.</p>`,
    },
    {
      type: 'journal',
      title: 'Feb-26 automatic reversals (batches named “Reverses …”)',
      lines: [
        { account: '101-100-2120-000-000 Received Not Invoiced Accrual', debit: 190, credit: 0 },
        { account: '101-200-6120-000-000 Electricity (Kitchen)', debit: 0, credit: 150 },
        { account: '101-200-6130-000-000 Travel and Meals (Kitchen)', debit: 0, credit: 40 },
        { account: '101-100-7120-000-000 Foreign Exchange Gain/Loss', debit: 20, credit: 0 },
        { account: '101-100-1110-000-000 Cash – Big River Bank (pound account)', debit: 0, credit: 20 },
      ],
      note: `<p>Shown together here. In Oracle each reversed journal gets its own reversal batch. Both reversals use <em>Switch Debit or Credit</em>.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Your turn: put Priya’s close in order',
      instructions: `<p>Arrange the main steps of Sunny’s January close in the order Priya did them.</p>`,
      items: [
        'Subledgers send journals and AutoPost posts them',
        'Payables, Assets and Receivables close their January periods',
        'Post the accruals and the recurring rent journal',
        'Generate the rent allocation',
        'Revalue the pound balance',
        'Reconcile and review the trial balance and statements',
        'Close Jan-26 in Manage Accounting Periods',
      ],
      explain: `<p>Feeders first, then Priya’s own entries. The allocation comes after rent is posted, and revaluation comes after the rates are loaded. Review comes before closing, and closing is always last.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'What made this close smooth',
      html: `<ul>
<li><strong>Automation did the boring parts:</strong> AutoPost, the rent template, the allocation rule, revaluation and AutoReverse.</li>
<li><strong>Priya spent the time checking:</strong> the Journals infolet, the reconciliations, the trial balance and the drill-downs for Sam.</li>
<li><strong>Order mattered:</strong> subledgers before GL, rent before the allocation, rates before revaluation, review before close.</li>
<li><strong>Every number was traceable</strong>, so Sam’s questions took minutes, not days.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'What’s next',
      html: `<p>If Sunny UK closed the same day, Priya would also <strong>translate</strong> the Sunny UK Ledger to USD and run the group report on the “Sunny Group – USD View” ledger set, eliminating any intercompany sales. Revisit the <em>Working With Many Currencies</em> and <em>Ledger Sets, Secondary Ledgers and Consolidation</em> lessons, and see the Reporting module for building the reports themselves.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Month-end close', def: 'The set of steps at the end of each period to complete, check, report and lock the books.' },
        { term: 'Working day (WD)', def: 'A business day counted from month-end, used to schedule close tasks, such as WD1 or WD2.' },
        { term: 'Unrealized gain', def: 'A gain from a change in exchange rates on money you still hold or owe. It isn’t final until the money is actually exchanged or paid.' },
        { term: 'Current-year earnings', def: 'Profit so far this year, shown in equity on the balance sheet until it moves into retained earnings at year-end.' },
        { term: 'Reconciliation', def: 'Checking that two records of the same thing agree, such as Payables versus the AP account in the GL.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Why did Priya run the rent allocation only AFTER the rent journal was posted?',
          options: [
            'Because allocations read posted balances, so an unposted rent journal would leave an empty pool',
            'Because allocations can only run on WD4',
            'Because the rent journal needed approval from the landlord',
            'It doesn’t matter. The order is random',
          ],
          answer: 0,
          explain: 'Allocation rules read posted balances from the GL balances cube. If the source isn’t posted, there is nothing to allocate.',
        },
        {
          q: 'The pound balance was booked at 1.25 and revalued at 1.27. What did revaluation post?',
          options: [
            'A $20 unrealized loss',
            'A $20 unrealized gain: debit Cash, credit 7120',
            'A £20 gain in the pound account',
            'Nothing, because cash is never revalued',
          ],
          answer: 1,
          explain: '£1,000 × (1.27 − 1.25) = $20. Cash is worth more in dollars, so it is debited, and the unrealized gain is credited to 7120. The pound amount itself doesn’t change.',
        },
        {
          q: 'What was Sunny US’s net income for January 2026?',
          options: ['$3,000', '$1,710', '$1,705', '$4,000'],
          answer: 2,
          explain: 'Revenue $4,000 − cost of lemonade $1,000 − operating expenses $1,290 − bank charges $25 + FX gain $20 = $1,705.',
        },
        {
          q: 'Which ledger option stopped Priya from closing January while a subledger was still open?',
          options: [
            'Enable journal approval',
            'Prevent General Ledger Period Closure When Open Subledger Periods Exist',
            'Number of Future Enterable Periods',
            'Notify when prior period journal is entered',
          ],
          answer: 1,
          explain: 'That option blocks the GL period close while subledger periods are open or subledger transactions and GL journals are unprocessed.',
        },
        {
          q: 'What happened to the January accruals and the revaluation in February?',
          options: [
            'Nothing. Priya must reverse them by hand in December',
            'AutoReverse created and posted reversal journals in Feb-26',
            'They were deleted when January closed',
            'They moved to retained earnings',
          ],
          answer: 1,
          explain: 'With the Accrual category set to reverse and post automatically, and Run AutoReverse After Open Period switched on, opening February triggered the reversals. Balance sheet revaluations are reversed in the next period too.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using General Ledger: Example of an Accounting Cycle', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/example-of-an-accounting-cycle.html' },
    { title: 'Using General Ledger: Journals Infolet', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/journals-infolet.html' },
    { title: 'Using General Ledger: Journal Reversals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/journal-reversals.html' },
    { title: 'Using General Ledger: Generate Allocations and Periodic Entries Manually', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/generate-allocations-and-periodic-entries-manually.html' },
    { title: 'Using General Ledger: Revaluation Process', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/revaluation-process.html' },
    { title: 'Using General Ledger: General Accounting Infolets', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/general-accounting-infolets.html' },
    { title: 'Using General Ledger: Overview of Close Monitor', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-close-monitor.html' },
    { title: 'Using General Ledger: How to Prevent a General Ledger Period from Closing When Open Subledger Periods Exist', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/how-to-prevent-a-general-ledger-period-from-closing-when-open.html' },
    { title: 'Using General Ledger: General Ledger Trial Balance Reports', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/general-ledger-trial-balance-reports.html' },
    { title: 'Using General Ledger: Create an AutoPost Criteria Set', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/create-an-autopost-criteria-set.html' },
  ],
};
