export default {
  slug: 'expense-reports',
  title: 'Creating Expense Reports',
  minutes: 16,
  summary:
    'Learn how expense items and expense reports are built in Oracle Fusion Expenses: templates and expense types, receipts (attached, emailed or read by AI), itemization, mileage and per diem, duplicate checks and submitting the report.',
  objectives: [
    'Explain the difference between an expense template, an expense type and an expense item',
    'Describe the ways an employee can capture receipts, including emailed receipts and the Expenses Agent',
    'Itemize a mixed bill (such as a hotel folio) into business and personal parts',
    'Describe mileage and per diem expenses at a high level',
    'Follow the steps to create and submit an expense report, and know why a report might stay in Saved status',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Filling in the school trip form',
      html: `<p>After a school trip, your teacher hands out a form. The form has boxes already printed on it: <em>Bus</em>, <em>Lunch</em>, <em>Museum ticket</em>, <em>Souvenir</em>. You don’t invent your own boxes — you pick the right one and write the amount next to it, then staple your receipts to the back.</p>
<p>The printed form is like an <strong>expense template</strong>. Each printed box is an <strong>expense type</strong>. What you write in a box (“Lunch, $6, Tuesday”) is an <strong>expense item</strong>. And the whole stapled bundle you hand in is the <strong>expense report</strong>.</p>
<p>If you bought a lunch <em>and</em> a toy with one receipt, you split the line: the lunch is for the trip, the toy is yours. That splitting is called <strong>itemization</strong>.</p>`,
    },
    {
      type: 'text',
      heading: 'Templates, types and items',
      html: `<p>Oracle Fusion Expenses keeps three ideas separate, and it helps to get them straight:</p>
<ul>
<li><strong>Expense template</strong> – a group of expense types set up for a purpose, such as “Travel” or “Office”. When you enter an expense you choose a template, and the template decides which expense types you can pick. Each business unit can have a default template.</li>
<li><strong>Expense type</strong> – a kind of cost that was <em>defined during setup</em>, such as Hotel, Taxi, Meals, Mileage. Each expense type carries an <strong>account</strong>, so the system knows where to record the cost (Sunny maps Taxi and Meals to <code>6130 Travel and Meals</code>). The type can also say whether a receipt is required, whether itemization is allowed, which policy applies, and which tax classification to default.</li>
<li><strong>Expense item</strong> – the <em>actual</em> cost you incurred: “Taxi, 10 March, $40, City Cabs”. Every item must point to an expense type.</li>
</ul>
<p>Expense types roll up into broader <strong>expense categories</strong> (for example, the category Accommodations might hold the types Hotel, Motel and Bed and Breakfast). Categories matter because policies are set up by category — you’ll see that in the next lesson.</p>`,
    },
    {
      type: 'table',
      caption: 'Typical fields on an expense item',
      headers: ['Field', 'What it means', 'Noah’s taxi'],
      rows: [
        ['<kbd>Date</kbd>', 'When the cost happened.', '10 March'],
        ['<kbd>Template</kbd>', 'The group of expense types you choose from.', 'Travel'],
        ['<kbd>Type</kbd>', 'The kind of cost; drives account, receipt and policy rules.', 'Taxi'],
        ['<kbd>Amount</kbd> and currency', 'How much, in which currency.', '40.00 USD'],
        ['Merchant', 'Who you paid.', 'City Cabs'],
        ['Description / justification', 'Why it was a business cost. A justification may be required when a policy is exceeded.', 'Visit to Lemon Grove Farms to inspect harvest'],
        ['Expense class (for card charges)', '<em>Business</em>, <em>Personal</em>, or <em>Business – Employee Paid</em> (only shown when the Both Pay card option is used).', 'Not a card charge'],
        ['Account / cost center / project', 'Where the cost is charged. You may be allowed to change the cost center, split across accounts, or charge a project and task.', 'Cost center 200 Kitchen'],
        ['Receipt', 'Image or PDF attached, or a “receipt missing” flag with a reason.', 'Photo attached'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Practice: template, type, item or report?',
      instructions: `<p>Match each example to the Oracle Fusion Expenses idea it represents.</p>`,
      pairs: [
        { left: '“Travel” – a group of choices such as Hotel, Taxi, Meals', right: 'Expense template' },
        { left: '“Taxi” – a kind of cost defined during setup, mapped to account 6130', right: 'Expense type' },
        { left: '“Taxi, 10 March, $40, City Cabs”', right: 'Expense item' },
        { left: '“Accommodations” – a broad group used for policies', right: 'Expense category' },
        { left: '“Lemon Grove Farms visit – March” with two lines, submitted for approval', right: 'Expense report' },
      ],
      explain: `<p>Templates offer a menu of expense types; each type carries the account and rules; an item is one real cost; categories group types for policies; and a report bundles items for approval and payment.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: enter Noah’s taxi',
      instructions: `<p>This is a simplified practice form (not a real Oracle screen). Enter Noah’s expense item: a <strong>$40</strong> taxi on <strong>10 March 2026</strong> from City Cabs, for the visit to Lemon Grove Farms, charged to the <strong>Kitchen</strong> cost center. Noah has a photo of the receipt.</p>`,
      formTitle: 'Create Expense Item (practice)',
      fields: [
        { label: 'Business unit', given: 'Sunny US BU' },
        { label: 'Date', type: 'date', answer: '2026-03-10' },
        { label: 'Template', type: 'select', options: ['Travel', 'Office Supplies', 'Training'], answer: 'Travel' },
        { label: 'Type', type: 'select', options: ['Hotel', 'Taxi', 'Meals', 'Mileage'], answer: 'Taxi' },
        { label: 'Amount (USD)', type: 'number', answer: 40 },
        { label: 'Merchant', given: 'City Cabs' },
        { label: 'Cost center', type: 'select', options: ['100 Administration', '200 Kitchen', '300 Sales'], answer: '200 Kitchen' },
        { label: 'Receipt', type: 'select', options: ['Image attached', 'Receipt missing (justification required)'], answer: 'Image attached' },
      ],
      explain: `<p>Taxi lives in the Travel template and maps to <code>6130 Travel and Meals</code>. Because Noah manages the kitchen and the trip was about lemons, the cost belongs to cost center 200. Attaching the image now saves a missing-receipt reminder later. Choosing Mileage would be wrong — mileage is for driving your own car.</p>`,
    },
    {
      type: 'slides',
      title: 'Ways to capture receipts and expenses',
      slides: [
        {
          icon: '🖥️',
          title: 'On the web',
          html: `<p>In the Expenses work area you create expense items one by one. You can keep them as <strong>available expense items</strong> for later, add them to a new report, or add them to an existing report. You can attach receipt images to the lines.</p>`,
        },
        {
          icon: '📊',
          title: 'In a spreadsheet',
          html: `<p>If you have many cash expenses, Expenses offers an Excel spreadsheet you can fill in offline and upload. Uploading validates the lines right away, so you get feedback on mistakes.</p>`,
        },
        {
          icon: '📧',
          title: 'Forward the email receipt',
          html: `<p>When your company enables it, you forward e-receipts (for example, a ride-share receipt) from your <strong>work email</strong> to a special address. The system checks you are an active employee with the right access, reads merchant, date, amount, currency and location, guesses the expense type, and creates the expense. You get a notification such as <em>Your expense was created</em> or <em>Duplicate expense</em>.</p>`,
        },
        {
          icon: '🤖',
          title: 'Let the Expenses Agent do it',
          html: `<p>With <strong>Expenses Agent</strong> (Touchless Expenses), the AI reads emailed receipts and receipt photos, creates the expense, matches it to a corporate card charge, asks you by email for anything missing (such as attendees or business purpose), and can group compliant expenses into a report and submit it on a schedule. For hotel bills it can even create the itemized lines automatically when itemization is required.</p>`,
        },
        {
          icon: '📱',
          title: 'From your phone',
          html: `<p>On a phone you can use the classic Oracle Fusion Expenses mobile app (Oracle says it will no longer be supported for Fusion from update 27B), or — with Expenses Agent — the browser-based Progressive Web App. Both let you attach receipt photos or PDFs. If a mobile report fails a check, it is saved as a draft on the web so you can fix it.</p>`,
        },
      ],
    },
    {
      type: 'text',
      heading: 'Itemization: splitting one bill into parts',
      html: `<p>Some receipts mix different kinds of cost. A hotel bill (called a <em>folio</em>) might include the room, breakfast, and a personal snack from the minibar. Each part may need a different expense type, account or policy check — and the personal part must not be reimbursed.</p>
<p><strong>Itemization</strong> breaks one expense item into lines. During setup, each expense type is set so that itemization is <em>Enabled</em>, <em>Required</em> or <em>Disabled</em>. As you add each line, the screen shows the <strong>remaining itemization balance</strong> going down until the lines add up to the full receipt. Lines marked <strong>Personal</strong> are not paid back.</p>
<p>A related idea is <strong>splitting</strong>: if one cost belongs to two cost centers or two projects, you can split it by percentage or amount using the <kbd>Split Allocation</kbd> action (if you have the privilege). Personal itemization lines can’t be split.</p>`,
    },
    {
      type: 'example',
      title: 'Noah itemizes a hotel bill',
      html: `<p>In May, Noah attends a two-day juice-making fair and stays one night at a hotel. The folio total is <strong>$190</strong>.</p>`,
      steps: [
        'Noah creates an expense item with template <em>Travel</em>, type <em>Hotel</em>, amount $190.',
        'Because Sunny set the Hotel type so that itemization is required, Noah clicks <kbd>Itemize</kbd>.',
        'Line 1: <em>Room Charge</em> $150 – business. Remaining balance shows $40.',
        'Line 2: <em>Meals</em> (breakfast) $30 – business. Remaining balance shows $10.',
        'Line 3: <em>Minibar</em> $10 – class <strong>Personal</strong>. Remaining balance is now $0.',
        'Noah saves the item and adds it to the report “Juice Fair – May”.',
      ],
      result: `<p>Sunny reimburses <strong>$180</strong> (room and breakfast). The $10 minibar snack is Noah’s own cost. Each business line can hit a different expense type and account, and each can be checked against its own policy (for example, a meals limit).</p>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Practice: itemize a bigger folio',
      instructions: `<p>Leo stays one night at a hotel near a supplier. The folio total is <strong>$240</strong>: room <strong>$180</strong>, breakfast <strong>$35</strong>, and laundry for a personal shirt <strong>$25</strong>. Fill in the blanks.</p>`,
      html: `<p>After itemizing the room line, the remaining itemization balance is $ {{}}.</p>
<p>After also itemizing breakfast, the remaining balance is $ {{}}.</p>
<p>The laundry line gets the expense class {{}}.</p>
<p>Sunny reimburses Leo $ {{}} in total for this folio.</p>`,
      blanks: [
        { answer: 60, hint: '240 − 180' },
        { answer: 25 },
        { answer: ['Personal'] },
        { answer: 215, hint: 'Only business lines are reimbursed' },
      ],
      explain: `<p>The remaining balance counts down from 240 to 60 to 25 and finally to 0 when the $25 personal laundry line is added. Personal lines are not reimbursed, so Leo gets $180 + $35 = $215.</p>`,
    },
    {
      type: 'text',
      heading: 'Mileage and per diem (the short version)',
      html: `<p><strong>Mileage</strong> pays employees for using their own car for business. Instead of a receipt, the employee enters the trip (from, to, distance), and Expenses calculates the amount using the company’s mileage policy. A mileage policy is built from <em>eligibility rules</em> (who can claim, for which vehicles), <em>rate determinants</em> (for example, rates that change with distance or vehicle type, often following government rates) and optional <em>add-on rates</em> (for example, carrying passengers). Expenses can track cumulative mileage over the year, and some setups can calculate trip distance automatically.</p>
<p><strong>Per diem</strong> (Latin for “per day”) pays a fixed daily allowance for meals and incidentals instead of asking for each receipt. Per diem rates can vary by location and other rules. Companies that use per diem usually stop employees from also claiming the same meals separately.</p>
<p>Both are set up by the implementer, so the employee mostly picks the right expense type and fills in trip details.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Duplicate detection is watching',
      html: `<p>Expenses checks your recent expenses for possible duplicates using fields such as amount, date, currency, expense type and merchant. If you create an expense on the web that looks like one you already submitted, you see a warning straight away and can delete it or continue if it really is different. Duplicates created by email or the digital assistant are flagged in a banner, and a report containing a suspected duplicate can’t be submitted until you resolve it. This protects the company from paying twice.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: create and submit an expense report',
      items: [
        'From the home page, open <kbd>Me</kbd> &gt; <kbd>Expenses</kbd>. The Travel and Expenses page opens.',
        'Click the <kbd>Create Report</kbd> card. (Tip from Oracle: select existing available expense items first, then click the card, to pull them straight into the new report.)',
        'Enter a <kbd>Purpose</kbd>, for example “Lemon Grove Farms visit – March”, and click <kbd>Save</kbd>. A message shows the report number the system assigned.',
        'Add expense items: choose the date, template and type, enter the amount and merchant, add a description, and attach the receipt.',
        'If an expense type requires itemization, click <kbd>Itemize</kbd> and add lines until the remaining balance is zero.',
        'Review any warnings (policy, receipts, duplicates) and add justifications where asked.',
        'Click <kbd>Submit</kbd>. The report moves on to approval.',
      ],
      note: `<p>Oracle’s documentation walks through these steps for the classic Expenses work area. Pages are moving to Redwood, and Expenses Agent customers may use a different, more automated screen — labels and button names can differ by release and by your company’s setup.</p>`,
    },
    {
      type: 'table',
      caption: 'Why a report might not submit (and stay as Saved)',
      headers: ['Reason', 'What to do'],
      rows: [
        ['A policy is exceeded beyond the error tolerance and the company prevents submission.', 'Lower the amount to the allowed limit or follow the exception process.'],
        ['An expense type requires itemization and you have not itemized it.', 'Itemize until the remaining balance is zero.'],
        ['A required receipt image is missing.', 'Attach it, or mark the receipt missing with a justification if policy allows.'],
        ['A required description, justification, project, tax or other field is empty.', 'Fill in the missing field.'],
        ['The cost center or project is invalid.', 'Pick a valid cost center or project.'],
        ['A suspected duplicate is in the report.', 'Delete or confirm the duplicate.'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'Lost a receipt?',
      html: `<p>If your company allows it, you can tick the <strong>Receipt Missing</strong> option and give a reason in the justification. Some companies then ask you to complete a <strong>missing receipt declaration</strong>, which acts as the official replacement for the receipt. Others may <em>require</em> an image on every line that needs a receipt — an administrator can set attachments to “Lines required” in the Expenses system options and make the receipt rules block submission.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: write the “why”, not just the “what”',
      html: `<p>Approvers and auditors read hundreds of lines. “Lunch $25” invites questions; “Lunch during supplier visit to Lemon Grove Farms, inspecting March harvest” does not. Clear descriptions and attached receipts are the fastest way to get paid. And submit soon after the trip — some audit rules automatically pick reports containing old expenses.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Expense template', def: 'A group of expense types defined for a purpose; you choose one when entering expenses.' },
        { term: 'Expense type', def: 'A kind of cost defined during setup, such as Hotel or Taxi, which carries the account and rules.' },
        { term: 'Expense category', def: 'A broader group of expense types, such as Meals or Accommodations, used for policies.' },
        { term: 'Itemization', def: 'Breaking one receipt into separate lines, such as room, breakfast and a personal snack.' },
        { term: 'Mileage expense', def: 'A claim for using a personal vehicle for business, calculated from distance and the mileage policy.' },
        { term: 'Per diem', def: 'A fixed daily allowance paid instead of claiming each meal or small cost separately.' },
        { term: 'Duplicate expense', def: 'An expense that matches one already entered or submitted, which the system flags to avoid paying twice.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Which of these is an expense TYPE (not an item)?',
          options: ['“Taxi, 10 March, $40, City Cabs”', '“Hotel”', '“Lemon Grove Farms visit – March”', 'Noah’s receipt photo'],
          answer: 1,
          explain: 'Hotel is a kind of cost defined during setup — an expense type. The taxi line is an item, the visit is a report purpose, and the photo is a receipt attachment.',
        },
        {
          q: 'A hotel folio of $190 includes $10 of personal minibar snacks. With itemization, how much is reimbursed?',
          options: ['$190', '$180', '$10', '$0 until the hotel is paid'],
          answer: 1,
          explain: 'The $10 minibar line is marked Personal and is not reimbursed, so the business lines total $180.',
        },
        {
          q: 'What does the Expenses Agent do with a forwarded receipt?',
          options: [
            'Prints it for the auditor',
            'Deletes it after 30 days',
            'Extracts the details, creates the expense, matches card charges and asks for missing information',
            'Sends it to the supplier',
          ],
          answer: 2,
          explain: 'The agent reads the receipt, creates and completes the expense, matches it to corporate card transactions when relevant and follows up by email for missing details.',
        },
        {
          q: 'Why might a report submitted from a phone end up as Saved on the web instead of submitted?',
          options: [
            'Phones cannot submit reports',
            'It failed a validation, such as missing itemization, a required receipt or an over-limit policy',
            'Managers must always resubmit mobile reports',
            'Saved means it was already paid',
          ],
          answer: 1,
          explain: 'If a mobile report has missing or invalid information, the web application saves it so the employee can fix it and resubmit.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Using Expenses (26D) – Overview of the Expenses Work Area', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/example-of-introducing-the-expenses-work-area.html' },
    { title: 'Using Expenses (26D) – Example of Itemizing a Hotel Bill', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/example-of-itemizing-a-hotel-bill.html' },
    { title: 'Using Expenses (26D) – What’s the difference between an expense type and an expense item?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/what-s-the-difference-between-an-expense-type-and-an-expense.html' },
    { title: 'Using Expenses (26D) – Options for Entering Cash Expense Items', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/options-for-entering-cash-expense-items.html' },
    { title: 'Using Expenses (26D) – How You Create Expense from Email Receipts', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/how-you-create-expense-from-email-receipts.html' },
    { title: 'Using Expenses (26D) – Detection of Duplicate Expenses', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/detection-of-duplicate-expenses.html' },
    { title: 'Using Expenses (26D) – How You Submit an Expense Report from a Mobile Device', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fawde/how-you-submit-an-expense-report-from-a-mobile-device.html' },
    { title: 'Implementing Expenses (26D) – Expense Types', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/expense-types.html' },
    { title: 'Implementing Expenses (26D) – How You Set Up a Mileage Expense Policy', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faiex/how-you-set-up-a-mileage-expense-policy.html' },
    { title: 'Detailed Adoption Guidance: Expenses Agent – Expenses Agent Capabilities', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/faeac/expenses-agent-capabilities.html' },
    { title: 'Oracle Fusion Cloud Financials 26D What’s New – IMPORTANT Actions and Considerations', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-t78536.htm' },
    { title: 'Financials 26D What’s New – Expenses Agent for itemization and attendees', publisher: 'Oracle Cloud Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f50632.htm' },
  ],
};
