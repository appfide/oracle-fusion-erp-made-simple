export default {
  slug: 'multiple-currencies',
  title: 'Working With Many Currencies',
  minutes: 18,
  summary:
    'Sunny UK keeps its books in pounds and Sunny US in dollars, and both sometimes deal in the other’s currency. Learn entered versus ledger currency, conversion rate types and daily rates, revaluation, translation and reporting currencies in Oracle Fusion General Ledger.',
  objectives: [
    'Explain the difference between entered currency and ledger currency',
    'Describe the predefined conversion rate types and how daily rates get into Oracle',
    'Explain what revaluation does at month-end and record an unrealized gain or loss',
    'Explain translation and the cumulative translation adjustment',
    'Compare balance, journal and subledger level reporting currencies',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Pocket money on holiday',
      html: `<p>You live in the USA and your piggy bank counts in <strong>dollars</strong>. On holiday in London your aunt gives you a <strong>£10</strong> note. To write it in your piggy-bank notebook you ask: “How many dollars is that?” Today £1 = $1.25, so you write <strong>$12.50</strong>.</p>
<p>A month later you still have the same £10 note, but now £1 = $1.27. Without doing anything, your note is worth <strong>$12.70</strong>. You “gained” 20 cents just because the rate changed! Should you fix your notebook? Accountants say yes, at month-end. That’s <strong>revaluation</strong>.</p>
<p>And if Grandma wants to know your total savings in <em>pounds</em>, you might rewrite your whole notebook in pounds. That’s <strong>translation</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Two currencies on every line: entered and ledger',
      html: `<p>Each ledger has exactly one <strong>ledger currency</strong>, one of the four Cs. At Sunny:</p>
<ul>
<li><strong>Sunny US Ledger</strong> → USD</li>
<li><strong>Sunny UK Ledger</strong> → GBP</li>
</ul>
<p>A transaction can still happen in another currency. The currency it happens in is the <strong>entered currency</strong> (also called the foreign or transaction currency). When Sunny UK receives a $500 invoice, Oracle stores <strong>both</strong> numbers on the journal line:</p>
<ul>
<li><strong>Entered amount:</strong> USD 500 (what the paper says).</li>
<li><strong>Accounted amount:</strong> GBP 400 (converted at the rate for that date, in the ledger currency).</li>
</ul>
<p>Balances are kept for both as well. That is how Oracle knows later that the UK still owes exactly USD 500, even though its pound value keeps moving. A currency counts as <em>foreign</em> if it isn’t the ledger currency (or a journal or subledger level reporting currency of the ledger).</p>`,
    },
    {
      type: 'table',
      caption: 'Predefined conversion rate types',
      headers: ['Rate type', 'Use it when…', 'Rate comes from'],
      rows: [
        ['<strong>Spot</strong>', 'The currency moves a lot, or you need the exact rate on the day.', 'Daily rates table'],
        ['<strong>Corporate</strong>', 'You want one standard company rate for a stable currency.', 'Daily rates table'],
        ['<strong>User</strong>', 'A rare transaction with no daily rate set up.', 'Typed on the journal by the user'],
        ['<strong>Fixed</strong>', 'The rate between two currencies never changes.', 'Daily rates table'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: daily rates',
      html: `<p>Daily rates live in the <strong>Currency Rates Manager</strong>. Open it with the <kbd>Manage Currency Rates</kbd> task in the <kbd>Period Close</kbd> work area. It has tabs for rate types, daily rates and historical rates. Rates can be:</p>
<ul>
<li>typed in the <strong>Create Daily Rates</strong> spreadsheet (an ADFdi Excel workbook) and submitted;</li>
<li>imported in bulk, or loaded automatically by a <strong>web service</strong> from an external rate provider.</li>
</ul>
<p>Rate type options let Oracle calculate <strong>inverse rates</strong> (GBP→USD from USD→GBP) and <strong>cross rates</strong> through a pivot currency (for example EUR→GBP via USD). You can also create your own rate types. On a journal, the rate is filled in from the rate type, the currency and the <strong>conversion date</strong>, which defaults to the accounting date. Only the User type asks you to type the rate.</p>`,
    },
    {
      type: 'example',
      title: 'Sunny UK buys lemons in dollars',
      html: `<p>On 10 January 2026 Sunny Lemonade UK Ltd buys 1,000 lemons from Lemon Grove Farms, an American supplier. The invoice is for <strong>USD 500</strong>, payment terms Net 30. The Corporate rate that day is 1 USD = 0.80 GBP.</p>`,
      steps: [
        'Ava’s UK colleague enters the invoice in Payables in USD. Payables uses the Corporate rate to convert it.',
        'Accounted amount: 500 × 0.80 = <strong>£400</strong>.',
        'The GL journal line for Accounts Payable shows entered USD 500 and accounted GBP 400.',
      ],
      result: `<p>Sunny UK now owes USD 500, which is worth £400 today. The bill isn’t due until February, so its pound value will move before then.</p>`,
    },
    {
      type: 'journal',
      title: 'Sunny UK Ledger, 10 Jan 2026 (accounted GBP; entered USD 500 on both lines)',
      lines: [
        { account: '201-200-5110-010-000 Lemons Cost (entered USD 500)', debit: 400, credit: 0 },
        { account: '201-100-2110-000-000 Accounts Payable – Trade (entered USD 500)', debit: 0, credit: 400 },
      ],
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Convert entered amounts to accounted amounts',
      instructions: `<p>Work out the accounted amounts. Each ledger converts into its own ledger currency.</p>`,
      html: `<p>Sunny UK (GBP ledger) receives a USD 200 sugar invoice at 1 USD = 0.80 GBP. Accounted amount: £ {{}}</p>
<p>Sunny US (USD ledger) receives a GBP 1,000 payment at 1 GBP = 1.25 USD. Accounted amount: $ {{}}</p>
<p>On the Sunny US journal line, the entered currency is {{}}.</p>`,
      blanks: [
        { answer: 160, hint: '200 × 0.80' },
        { answer: 1250, hint: '1,000 × 1.25' },
        { answer: ['GBP', 'pounds', 'pound sterling', 'british pounds'] },
      ],
      explain: `<p>Accounted amount = entered amount × rate, always in the <strong>ledger’s</strong> currency. The entered currency is what the document says, here GBP, even though Sunny US keeps its books in USD.</p>`,
    },
    {
      type: 'text',
      heading: 'Revaluation: keeping foreign balances honest',
      html: `<p>On 31 January the rate is 1 USD = 0.78 GBP. The UK still owes USD 500, which is now only <strong>£390</strong> in today’s money. The books still say £400. The <strong>revaluation</strong> process fixes this. It recalculates the ledger currency value of foreign-currency balances at the current rate and posts the difference to an <strong>unrealized gain or loss</strong> account. Sunny uses 7120 Foreign Exchange Gain/Loss for both.</p>
<p>How it works in Oracle:</p>
<ul>
<li>Define a <strong>revaluation</strong> (setup task <kbd>Manage Revaluations</kbd>): the account range to revalue (you can use hierarchy parents), the currencies, the rate type, and the gain and loss accounts.</li>
<li>Balance sheet accounts are usually revalued with <strong>period-end rates and YTD</strong> balances. Income statement accounts, if revalued, typically use <strong>average rates and PTD</strong>.</li>
<li>Run the <strong>Revalue Balances</strong> process, which can post automatically. It produces a <strong>Revaluation Execution Report</strong> with the rates used, the accounts and the journals created. If a rate is missing, that currency is skipped with a warning.</li>
<li>Balance sheet revaluation journals are <strong>reversed in the next period</strong> (AutoReverse can do it), then revaluation runs again at the next month-end.</li>
<li>Always revalue <strong>before</strong> you translate.</li>
</ul>
<p>The word <em>unrealized</em> means the gain isn’t real cash yet. When Sunny UK actually pays in February, Payables records the <strong>realized</strong> gain or loss.</p>`,
    },
    {
      type: 'journal',
      title: 'Sunny UK revaluation, 31 Jan 2026 (accounted GBP)',
      lines: [
        { account: '201-100-2110-000-000 Accounts Payable – Trade (USD balance revalued)', debit: 10, credit: 0 },
        { account: '201-100-7120-000-000 Foreign Exchange Gain/Loss (unrealized gain)', debit: 0, credit: 10 },
      ],
      note: `<p>The liability drops from £400 to £390, a £10 unrealized gain. The entered USD 500 doesn’t change. Only the GBP value moves. The journal reverses on 1 February.</p>`,
    },
    {
      type: 'lab',
      tool: 'fx',
      title: 'Revaluation simulator: Sunny US’s pound balance',
      intro: `<p>Sunny US keeps <strong>£1,000</strong> in a pound account at Big River Bank. It was booked at 1 GBP = 1.25 USD ($1,250). At month-end the rate is 1.27. Run the simulator to see the revaluation gain. Then try a month-end rate of 1.22 and see it turn into a loss.</p>`,
      preset: { amount: 1000, currency: 'GBP', rate1: 1.25, rate2: 1.27 },
    },
    {
      type: 'text',
      heading: 'Translation: restating a whole ledger in another currency',
      html: `<p>Sam reports the Sunny Group results in <strong>USD</strong>, so the UK’s GBP numbers have to be restated in dollars. This is <strong>translation</strong>. In Oracle you set up a <strong>balance level reporting currency</strong> (USD) for the Sunny UK Ledger and run the <strong>Translate General Ledger Account Balances</strong> process after the month’s journals are done and the rates are final.</p>
<ul>
<li><strong>Assets and liabilities</strong>: always YTD at the <strong>period-end rate</strong>.</li>
<li><strong>Revenue and expenses</strong>: PTD by default at the <strong>period average rate</strong>.</li>
<li><strong>Equity</strong>: often at <strong>historical rates</strong>, the rates when the money was put in. Historical rates override the others for specific accounts.</li>
<li>Because different rates are used, the translated books don’t balance on their own. The difference goes to the <strong>Cumulative Translation Adjustment (CTA)</strong> account set in the ledger options.</li>
</ul>
<p>Translation needs at least one period before the first translated period, and settings such as rate types, translation rules, retained earnings and CTA accounts should be decided <em>before</em> the first run. Changing them later means deleting the translated balances and running translation again. If you post more journals or change rates, simply run translation again.</p>`,
    },
    {
      type: 'table',
      caption: 'Translating a simplified Sunny UK trial balance, Jan-26',
      headers: ['Account', 'GBP balance', 'Rate used', 'Rate', 'USD balance'],
      rows: [
        ['1110 Cash – Big River Bank (Dr)', '5,000', 'Period-end', '1.27', '6,350 Dr'],
        ['3100 Owner’s Equity (Cr)', '2,000', 'Historical', '1.20', '2,400 Cr'],
        ['4110 Lemonade Sales Revenue (Cr)', '3,000', 'Period average', '1.26', '3,780 Cr'],
        ['CTA (balancing figure, Cr)', '—', '—', '—', '170 Cr'],
        ['<strong>Totals</strong>', '<strong>5,000 = 2,000 + 3,000</strong>', '', '', '<strong>6,350 = 2,400 + 3,780 + 170</strong>'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Which translation rate applies?',
      instructions: `<p>Sunny UK is being translated to USD. For each account, choose the rate type that is normally used.</p>`,
      categories: ['Period-end rate', 'Period average rate', 'Historical rate'],
      items: [
        { text: '1110 Cash – Big River Bank', answer: 'Period-end rate' },
        { text: '2110 Accounts Payable – Trade', answer: 'Period-end rate' },
        { text: '1210 Accounts Receivable', answer: 'Period-end rate' },
        { text: '4110 Lemonade Sales Revenue', answer: 'Period average rate' },
        { text: '6110 Rent', answer: 'Period average rate' },
        { text: '3100 Owner’s Equity (money Sam invested in 2024)', answer: 'Historical rate' },
      ],
      explain: `<p>Balance sheet assets and liabilities show what things are worth <em>now</em>, so they use the period-end rate. Revenue and expenses happened through the month, so they use the average. Invested equity keeps the rate from when it was invested. The leftover difference goes to CTA.</p>`,
    },
    {
      type: 'slides',
      title: 'Reporting currencies: three conversion levels',
      slides: [
        {
          icon: '🪞',
          title: 'What is a reporting currency?',
          html: `<p>A <strong>reporting currency</strong> is a copy of a primary or secondary ledger in another currency. It shares the same chart of accounts, calendar and accounting method. You choose a <strong>currency conversion level</strong> when you create it.</p>`,
        },
        {
          icon: '📊',
          title: 'Balance level',
          html: `<p>Only <strong>balances</strong> are translated, by running the translation process (the method described above). It is the lightest option. Good for consolidation views such as Sunny UK in USD.</p>`,
        },
        {
          icon: '📝',
          title: 'Journal level',
          html: `<p>Every <strong>GL journal</strong> is converted when it posts. Converted journals are created in the same batch with a status of Posted. You get a full journal trail in the second currency. Journal conversion rules let you skip some sources or categories.</p>`,
        },
        {
          icon: '🔬',
          title: 'Subledger level',
          html: `<p><strong>Subledger Accounting</strong> creates accounting in both currencies right from the transaction, plus converted GL journals. It is the most detailed and the heaviest option. Secondary ledgers can’t have subledger level reporting currencies.</p>`,
        },
        {
          icon: '⚠️',
          title: 'Mind the order',
          html: `<p>For journal and subledger levels: open the period in the reporting currency too, and enter daily rates before posting. Converted journals are created only if the reporting currency’s period is open or future enterable.</p>`,
        },
      ],
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: enter a foreign currency journal',
      items: [
        'Open the <kbd>Journals</kbd> work area and click <kbd>Create Journal</kbd>.',
        'Enter the batch and journal details, and choose the foreign <kbd>Currency</kbd>, for example GBP in the Sunny US Ledger.',
        'Choose a <kbd>Conversion Rate Type</kbd>. With Spot or Corporate the rate fills in from daily rates for the <kbd>Conversion Date</kbd>. With User you type the rate.',
        'Enter the lines in the foreign currency. Oracle shows the converted ledger currency amounts.',
        'Save and post as usual.',
      ],
      note: `<p>If no daily rate exists for the date and rate type, Oracle can’t convert the journal. Ask treasury (Mia at Sunny) to load the rate. Labels can differ slightly by release and Redwood pages.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips',
      html: `<ul>
<li><strong>Rates first.</strong> Make loading the month-end rates the first close task. Revaluation, translation and converted journals all depend on them.</li>
<li><strong>Revalue, then translate, then consolidate.</strong> Doing it in a different order gives wrong group numbers.</li>
<li><strong>Explain CTA movements.</strong> CFOs often ask why CTA changed. It is the effect of rates on the net assets of the foreign company, not an operating result.</li>
<li><strong>Realized versus unrealized.</strong> Revaluation in GL is unrealized and reversed. Payables, Receivables and Cash record realized gains and losses when money actually moves.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Ledger currency', def: 'The one main currency a ledger keeps its books in, such as USD for the Sunny US Ledger.' },
        { term: 'Entered currency', def: 'The currency a transaction was actually made in. It can differ from the ledger currency.' },
        { term: 'Conversion rate type', def: 'A family of exchange rates, such as Spot, Corporate, User or Fixed, used to convert amounts.' },
        { term: 'Revaluation', def: 'A month-end process that updates the ledger currency value of foreign-currency balances and books unrealized gains or losses.' },
        { term: 'Translation', def: 'Restating a ledger’s balances in another currency for reporting, using period-end, average and historical rates.' },
        { term: 'Cumulative Translation Adjustment (CTA)', def: 'The equity account that absorbs the difference created when balances are translated at different rates.' },
        { term: 'Reporting currency', def: 'A copy of a ledger in another currency, kept at balance, journal or subledger level.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Sunny UK records a USD 500 invoice at a rate of 0.80. What is the accounted amount in its ledger currency?',
          options: ['USD 500', 'GBP 400', 'GBP 500', 'USD 400'],
          answer: 1,
          explain: 'The ledger currency is GBP. 500 × 0.80 = £400. The entered amount stays USD 500.',
        },
        {
          q: 'Which rate type requires you to type the rate on the journal yourself?',
          options: ['Spot', 'Corporate', 'User', 'Fixed'],
          answer: 2,
          explain: 'With the User rate type you enter the rate manually. The others take the rate from the daily rates table.',
        },
        {
          q: 'What does revaluation post the difference to?',
          options: [
            'Retained earnings',
            'An unrealized gain or loss account',
            'Accounts Payable only',
            'The CTA account, always',
          ],
          answer: 1,
          explain: 'Revaluation adjusts the foreign-currency balance and offsets it to unrealized gain or loss accounts (Sunny uses 7120). CTA is mainly used by translation.',
        },
        {
          q: 'In translation, which rate is normally used for asset and liability accounts?',
          options: ['Period average rate', 'Period-end rate', 'Historical rate', 'The rate on the day the account was created'],
          answer: 1,
          explain: 'Assets and liabilities are translated YTD at the period-end rate. Revenue and expenses usually use the average rate, and equity often uses historical rates.',
        },
        {
          q: 'Sam wants every posted GL journal of the Sunny UK Ledger to also exist in USD. Which reporting currency level fits?',
          options: ['Balance level', 'Journal level', 'No reporting currency is needed', 'Adjustment only'],
          answer: 1,
          explain: 'A journal level reporting currency converts each GL journal when it posts. Balance level only translates balances, and subledger level converts right from subledger accounting.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Implementing Enterprise Structures and General Ledger: Guidelines for Creating Conversion Rate Types', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/guidelines-for-creating-conversion-rate-types.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: What’s the difference between spot, corporate, user, and fixed rate types?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/what-s-the-difference-between-spot-corporate-user-and-fixed-rate.html' },
    { title: 'Using General Ledger: Enter Daily Rates Using the Daily Rates Spreadsheet', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/enter-daily-rates-using-the-daily-rates-spreadsheet.html' },
    { title: 'Using General Ledger: Enter Foreign Currency Journals', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/enter-foreign-currency-journals.html' },
    { title: 'Using General Ledger: Revaluation Process', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/revaluation-process.html' },
    { title: 'Using General Ledger: Overview of Revaluation Unrealized Gains or Losses', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/overview-of-revaluation-unrealized-gains-or-losses.html' },
    { title: 'Using General Ledger: Translation and Reporting Currencies', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/translation-and-reporting-currencies.html' },
    { title: 'Using General Ledger: How General Ledger Account Balances Are Translated', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/how-general-ledger-account-balances-are-translated.html' },
    { title: 'Implementing Enterprise Structures and General Ledger: How Balances for Reporting Currencies Are Calculated', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faigl/how-balances-for-reporting-currencies-are-calculated.html' },
    { title: 'Using General Ledger: Period Close Components', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faugl/period-close-components.html' },
  ],
};
