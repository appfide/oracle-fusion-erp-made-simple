export default {
  slug: 'cash-positioning',
  title: 'Cash Positioning and Forecasting',
  minutes: 16,
  summary:
    'A cash position answers “how much cash do we have today, and what will we have in the next few days?”. Learn how Oracle Fusion builds cash positions and forecasts from bank statements, Payables, Receivables, Payroll and external transactions, where to see them, and how Mia uses them every morning.',
  objectives: [
    'Explain the difference between a cash balance, a cash position and a cash forecast',
    'List the data sources Oracle Fusion uses for cash positioning and forecasting',
    'Describe the Cash Position Data Extraction process, the cash position cube and Smart View reporting',
    'Build a simple five-day cash position for Sunny Lemonade and decide what to do about a shortfall',
    'Recognize related tools: cash pools, bank account transfers, Predictive Cash Forecasting and the Cash Processing Agent',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Planning your pocket money for the week',
      html: `<p>It is Monday. You have <strong>$20</strong> in your wallet. On Wednesday your aunt will give you $5 for helping in her garden. On Thursday you must pay $8 for a school trip, and on Friday you want to buy a $25 skateboard.</p>
<p>Can you buy the skateboard on Friday? Let’s check: $20 + $5 − $8 = $17. No — you will be $8 short! Maybe you wait a week, or ask to pay the skateboard shop later.</p>
<p>What you just did is a <strong>cash position</strong> (what you have today) and a <strong>cash forecast</strong> (what you will have each day). <span class="hl">Companies do the same thing, every single morning, with millions of dollars.</span></p>`,
    },
    {
      type: 'text',
      heading: 'Balance, position and forecast: three different questions',
      html: `<ul>
<li><strong>Cash balance</strong> — what the bank says we have, usually yesterday’s closing balance from the prior-day bank statement.</li>
<li><strong>Cash position</strong> — today’s balance plus the cash flows we already know about for today and the next few days. Oracle describes cash positioning as the tool to view your <em>daily</em> cash position and evaluate your liquidity, based on actual cash flows from sources such as bank statements and external transactions.</li>
<li><strong>Cash forecast</strong> — an estimate of future cash based on what is expected: supplier invoices that will be paid, customer invoices that will be collected, payroll, and other planned transactions.</li>
</ul>
<p>Oracle explains that treasury teams usually do cash positioning daily, so they can estimate the projected closing bank balances with enough confidence to decide, in time, whether to <strong>invest</strong> extra cash or <strong>borrow</strong> to cover a gap.</p>`,
    },
    {
      type: 'table',
      caption: 'Where the numbers come from (sources Oracle uses for cash position and forecast)',
      headers: ['Source', 'What it adds', 'Sunny example'],
      rows: [
        ['<strong>Bank statements</strong>', 'Opening/closing balances and actual lines (prior-day and intraday).', 'June 30 closing balance $9,535.'],
        ['<strong>AP invoices</strong> and <strong>AP overdue invoices</strong>', 'Cash going out when supplier invoices fall due (unpaid or partly paid).', 'Lemon Grove Farms $500 due Jul 2.'],
        ['<strong>AP payments</strong>', 'Payments already made that have not cleared the bank.', 'Check 1002, $300, still outstanding.'],
        ['<strong>AR invoices</strong> and <strong>AR overdue invoices</strong>', 'Cash expected in when customer invoices are due.', 'Happy Cafe $400 due Jul 2.'],
        ['<strong>AR receipts</strong>', 'Customer payments recorded.', 'Receipts Omar enters this week.'],
        ['<strong>Payroll</strong>', 'Employee payments.', '(Sunny’s payroll is outside this story.)'],
        ['<strong>External transactions</strong>', 'Cash Management transactions such as fees, interest and bank transfers.', 'The $15 June service fee.'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Overdue invoices count too',
      html: `<p>Oracle’s cash forecast reports include Payables and Receivables invoices that are <strong>due and overdue</strong>, including unpaid or partly paid ones. Overdue amounts are shown in the <strong>current date</strong> column, because that money is expected (or owed) now. You can drill down to see invoice and due dates.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Practice: money in or money out?',
      instructions: `<p>Mia is building next week’s cash position for the Sunny Operating Account. Sort each item.</p>`,
      categories: ['Expected inflow', 'Expected outflow', 'Not a cash flow'],
      items: [
        { text: 'Happy Cafe invoice due on Tuesday (AR invoice)', answer: 'Expected inflow' },
        { text: 'Lemon Grove Farms invoice due on Wednesday (AP invoice)', answer: 'Expected outflow' },
        { text: 'Overdue invoice from Sunshine School (AR overdue)', answer: 'Expected inflow' },
        { text: 'Check 1002 issued but not yet paid by the bank (AP payment)', answer: 'Expected outflow' },
        { text: 'Monthly depreciation of the lemonade stand', answer: 'Not a cash flow' },
        { text: 'Bright Power Utility electricity bill due Friday', answer: 'Expected outflow' },
      ],
      explain: `<p>Customer invoices bring cash in (overdue ones show on today’s date). Supplier invoices and uncleared payments take cash out. Depreciation is an accounting expense but no money leaves the bank — so it never appears in a cash forecast.</p>`,
    },
    {
      type: 'flow',
      title: 'How Oracle builds the cash position',
      steps: [
        { icon: '⚙️', label: 'Set options', detail: 'Jordan sets the extraction duration, reporting currency and which bank balance code to use, on the Cash Positioning and Forecasting options setup.' },
        { icon: '🚚', label: 'Extract', detail: 'The Cash Position Data Extraction process collects data from Payables, Receivables, Payroll, external transactions and bank statements.' },
        { icon: '🧊', label: 'Transfer to the cube', detail: 'Cash Position Data Transfer runs automatically and loads an Essbase cube, converting amounts into transaction, ledger, bank account and reporting currencies.' },
        { icon: '📊', label: 'View', detail: 'See balances in the Cash Balances work area and dashboard infotiles; build detailed position and forecast reports in Smart View (Excel) with drill-down.' },
      ],
      note: `<p>A third process, Cash Position Data Deletion, clears the cube when you need to change the reporting setup. Bank accounts only appear in the cash position once there is a prior-day statement with a closing balance.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the real names',
      html: `<ul>
<li><strong>Cash Balances</strong> work area — <kbd>Navigator</kbd> &gt; <kbd>Cash Management</kbd> &gt; <kbd>Cash Balances</kbd>. Shows bank balances and the cash position, and has tasks such as <kbd>Manage Bank Account Transfers</kbd>.</li>
<li><strong>Cash Management dashboard</strong> infotiles: Cash Balance, Unreconciled, At Risk, 5 Day Forecast and Missing Statements.</li>
<li>Scheduled processes: <kbd>Cash Position Data Extraction</kbd>, <kbd>Cash Position Data Transfer</kbd> (runs automatically after extraction) and <kbd>Cash Position Data Deletion</kbd>.</li>
<li>Setup tasks: <kbd>Specify Cash Positioning and Forecasting Options</kbd> and <kbd>Manage Cash Positioning and Forecasting Transaction Grouping</kbd> (extra dimensions for reporting).</li>
<li>Reports: built in <strong>Smart View</strong> on the cash position cube, with dimensions such as bank and account, legal entity, currency, source, flow indicator (in/out), reconciliation status and time.</li>
</ul>
<p>Labels may differ slightly by release, Redwood pages and your company’s setup.</p>`,
    },
    {
      type: 'lab',
      tool: 'fx',
      title: 'Lab: one cash position, several currencies',
      intro: `<p>The cash position cube stores amounts in <strong>transaction, ledger, bank account and reporting</strong> currencies. Sam wants to see Sunny Lemonade UK Ltd’s GBP bank balance in USD next to the US account. Try converting <strong>£5,000</strong> at 1.27 USD per GBP, then see what happens if the rate moves to 1.25 — the same pounds are worth fewer dollars.</p>`,
      preset: { amount: 5000, currency: 'GBP', rate1: 1.27, rate2: 1.25 },
    },
    {
      type: 'example',
      title: 'Mia’s five-day cash position (July 1–5)',
      html: `<p>Mia starts from the June 30 closing balance of the Sunny Operating Account: <strong>$9,535</strong>. Sunny’s policy is to keep at least a <strong>$5,000 target balance</strong> in the account. The cash position shows these expected flows:</p>`,
      steps: [
        '<strong>Jul 1</strong>: check 1002 to Cup &amp; Straw Supply (−$300) is expected to clear. Closing: $9,235.',
        '<strong>Jul 2</strong>: Happy Cafe invoice due (+$400); Lemon Grove Farms invoice due, Net 30 (−$500). Closing: $9,135.',
        '<strong>Jul 3</strong>: Sunshine School invoice due (+$600); Sweet Sugar Co. invoice due (−$200). Closing: $9,535.',
        '<strong>Jul 4</strong>: Bright Power Utility electricity bill (−$150). Closing: $9,385.',
        '<strong>Jul 5</strong>: Stand Builders LLC invoice for the new lemonade stand (−$6,000). Closing: <strong>$3,385</strong> — below the $5,000 target!',
      ],
      result: `<p>Mia spots the problem four days early. Mia checks the Stand Builders invoice: its terms allow payment until Jul 20, and Omar expects a large Happy Cafe payment on Jul 12. Mia asks Ava to pay Stand Builders on Jul 15 instead of early. The account never drops below target, and no borrowing is needed. That is the value of a cash position: <em>time to act</em>.</p>`,
    },
    {
      type: 'table',
      caption: 'Mia’s position as a table (in, out, and closing balance)',
      headers: ['Day', 'Opening', 'In', 'Out', 'Closing', 'Status'],
      rows: [
        ['Jul 1', '$9,535', '$0', '$300', '$9,235', 'OK'],
        ['Jul 2', '$9,235', '$400', '$500', '$9,135', 'OK'],
        ['Jul 3', '$9,135', '$600', '$200', '$9,535', 'OK'],
        ['Jul 4', '$9,535', '$0', '$150', '$9,385', 'OK'],
        ['Jul 5 (before Mia acts)', '$9,385', '$0', '$6,000', '$3,385', '⚠ below $5,000 target'],
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: build the next day of the position',
      instructions: `<p>Mia has moved the Stand Builders payment to Jul 15, so Jul 5 now opens at <strong>$9,385</strong>. Fill in the rest of the week.</p>`,
      html: `<p><strong>Jul 5:</strong> opening $9,385, no receipts, no payments → closing \${{}}</p><p><strong>Jul 8:</strong> City Park Kiosk pays $250; Cup &amp; Straw Supply invoice of $300 is due → closing \${{}}</p><p>Is Jul 8 above the $5,000 target? {{}}</p><p><strong>Jul 15:</strong> opening $9,335 + Happy Cafe’s big payment $2,000 − Stand Builders $6,000 → closing \${{}}</p>`,
      blanks: [
        { answer: 9385 },
        { answer: 9335 },
        { answer: ['yes', 'y'], hint: 'yes or no' },
        { answer: 5335 },
      ],
      explain: `<p>$9,385 + $250 − $300 = $9,335. On Jul 15: $9,335 + $2,000 − $6,000 = $5,335, still above the $5,000 target — because Mia timed the big payment to land after the large receipt. (A real position would also include any other days’ flows; this is simplified.)</p>`,
    },
    {
      type: 'slides',
      title: 'Tools for when cash is in the wrong place',
      slides: [
        {
          icon: '🔁',
          title: 'Bank account transfers',
          html: `<p>Move money between two of the company’s own bank accounts. In Oracle you manage these from the Cash Balances work area (<kbd>Manage Bank Account Transfers</kbd>). Recent updates added approval workflows and other governance for transfers and ad hoc payments.</p>`,
        },
        {
          icon: '🏊',
          title: 'Cash pools',
          html: `<p>Bigger groups combine balances. A <strong>notional</strong> pool just adds balances together for reporting, without moving money. A <strong>physical</strong> pool really moves money into or out of a main <em>concentration account</em>, either to zero (<strong>zero balancing</strong>) or to a target (<strong>target balancing</strong>). Oracle maintains cash pools through REST services and can suggest a <em>cash leveling proposal</em>.</p>`,
        },
        {
          icon: '📈',
          title: 'Predictive Cash Forecasting',
          html: `<p>A separate <strong>Planning (EPM) application type</strong> for treasurers. It supports short-term rolling forecasts (around 10 days) and mid-term ones (around 3–6 months), daily, weekly or monthly, using a direct cash flow method and data streamed from Payables, Receivables and Cash Management. Since update 26B it can trace forecast amounts back to subledger transactions.</p>`,
        },
        {
          icon: '🤖',
          title: 'Cash Processing Agent (26D)',
          html: `<p>An AI agent opened from <kbd>Navigator</kbd> &gt; <kbd>ERP Agents</kbd> &gt; <kbd>Cash Processing Agent</kbd>. For cash positioning it shows positions, short-term projections and shortfalls, recommends bank account transfers to cover gaps, and — after the user accepts — generates and submits the transfer.</p>`,
        },
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: pick the right tool',
      instructions: `<p>Match each treasury need to the Oracle tool that fits best.</p>`,
      pairs: [
        { left: 'Move $2,000 from one Sunny bank account to another', right: 'Bank account transfer' },
        { left: 'See the group’s combined balance without moving any money', right: 'Notional cash pool' },
        { left: 'Sweep every subaccount to zero into a main account each day', right: 'Physical cash pool with zero balancing' },
        { left: 'A 3–6 month rolling forecast with several forecasting methods', right: 'Predictive Cash Forecasting' },
        { left: 'Ask in plain language which accounts face a shortfall and get a suggested transfer', right: 'Cash Processing Agent' },
      ],
      explain: `<p>Transfers move money between your own accounts. Notional pools only add balances for reporting; physical pools really move funds to a concentration account. Predictive Cash Forecasting is the EPM planning tool for longer horizons, and the 26D Cash Processing Agent adds a conversational layer on top of cash positions.</p>`,
    },
    {
      type: 'flow',
      title: 'Mia’s daily routine',
      steps: [
        { icon: '📥', label: 'Statements in?', detail: 'Check the Missing Statements infotile and fix any load or import errors.' },
        { icon: '🔍', label: 'Reconcile', detail: 'Review autoreconciliation results, exceptions and created fees/interest.' },
        { icon: '💵', label: 'Balances', detail: 'Confirm yesterday’s closing balances in Cash Balances.' },
        { icon: '🔭', label: 'Position', detail: 'Review today’s position and the 5 Day Forecast; look for At Risk accounts.' },
        { icon: '🤝', label: 'Act', detail: 'Talk to Ava and Omar about timing, transfer funds, or tell Sam if borrowing or investing is needed.' },
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'A forecast is only as good as its data',
      html: `<ul>
<li>If invoices are entered late in Payables, the forecast will not show those payments.</li>
<li>If customer due dates are unrealistic (customers always pay 10 days late), the forecast will be too optimistic. Oracle shows overdue invoices on today’s date, which is a hint to check collections.</li>
<li>Missing currency conversion rates stop transactions reaching the cube — Oracle writes them to the extraction log so you can add the rates and rerun.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Good treasurers compare yesterday’s forecast with what actually happened (“forecast vs. actual”). If the forecast keeps missing in the same way — say, receipts always arrive two days later than due dates — they adjust their assumptions. Over time, forecasts get much more accurate.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Cash positioning', def: 'Working out today’s cash balance plus known cash coming in and going out over the next days.' },
        { term: 'Cash forecast', def: 'An estimate of future cash based on expected payments, receipts and other planned cash flows.' },
        { term: 'Target balance', def: 'The amount of cash a company wants to keep in a bank account at minimum.' },
        { term: 'Liquidity', def: 'Having enough cash available to pay what is due, when it is due.' },
        { term: 'Cash pool', def: 'A way to combine several bank account balances, either on paper (notional) or by really moving money (physical).' },
        { term: 'Smart View', def: 'Oracle’s Excel add-in, used here to build cash position and forecast reports from the cash position cube.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which process collects data from Payables, Receivables, Payroll, external transactions and bank statements for the cash position?',
          options: ['Create Accounting', 'Cash Position Data Extraction', 'Autoreconciliation', 'Post Mass Additions'],
          answer: 1,
          explain: 'Cash Position Data Extraction gathers the data; Cash Position Data Transfer then loads it into the cube automatically.',
        },
        {
          q: 'Why might a bank account not appear in the Cash Balances work area even though it has system transactions?',
          options: [
            'It has no supplier',
            'There is no prior-day bank statement with a closing balance for it yet',
            'The account is in USD',
            'Payables is closed',
          ],
          answer: 1,
          explain: 'Oracle needs an official prior-day closing balance to build the cash position for an account.',
        },
        {
          q: 'Mia’s five-day position shows the account falling below its $5,000 target on day 5. What is a sensible action?',
          options: [
            'Ignore it, forecasts are always wrong',
            'Check payment terms and timing, move the payment within its terms, transfer funds, or arrange borrowing',
            'Delete the supplier invoice',
            'Close the bank account',
          ],
          answer: 1,
          explain: 'The point of the cash position is to act early: adjust timing within terms, move money between accounts, or borrow if needed.',
        },
        {
          q: 'Where does an overdue customer invoice appear in Oracle’s cash forecast reports?',
          options: ['It is left out', 'In the current date column', 'In next year’s column', 'Only in the General Ledger'],
          answer: 1,
          explain: 'Oracle shows overdue invoice amounts in the current date columns, and you can drill down to see invoice and due dates.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Overview of Cash Positioning and Forecasting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-cash-positioning-and-forecasting.html' },
    { title: 'Cash Positioning', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/cash-positioning.html' },
    { title: 'Considerations for Cash Forecasting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/considerations-for-cash-forecasting.html' },
    { title: 'Overview of the Cash Management Dashboard', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-the-cash-management-dashboard.html' },
    { title: 'Overview of Predictive Cash Forecasting', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/overview-of-predictive-cash-forecasting.html' },
    { title: 'Financials 26B What’s New — Predictive Cash Forecasting with Subledger Transaction Traceability', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26b/fins26b/26B-fin-wn-f44369.htm' },
    { title: 'Financials 26D What’s New — Cash Processing Agent for cash positioning and improved liquidity', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51245.htm' },
    { title: 'Using Payables Invoice to Pay 26D — Cash Positioning and Forecasting (PDF)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/using-payables-invoice-to-pay.pdf' },
  ],
};
