export default {
  slug: 'customers',
  title: 'Customers: The People Who Buy From Us',
  minutes: 15,
  summary:
    'Before you can bill anyone, they must exist as a customer. Learn Oracle’s customer data model — party, customer account, account site, business purposes like bill-to and ship-to, and contacts — plus the profile classes that set payment terms, credit and statement rules.',
  objectives: [
    'Describe the layers of Oracle’s customer model: party, customer account, site and contact',
    'Explain what bill-to, ship-to, statements and dunning business purposes do',
    'Explain how customer profile classes set default rules such as payment terms and credit limits',
    'Find where customers are created and maintained in Oracle Fusion',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The school address book',
      html: `<p>Think about your school. There is <strong>one</strong> you — your name, your birthday. That’s the real person.</p>
<p>But the school keeps different “files” about you for different jobs: a <strong>library card</strong> (with its own borrowing rules), a <strong>lunch account</strong> (with its own balance), and a <strong>sports team</strong> sign-up. Each file can have a different address on it: report cards go to your home, the lunch bill goes to your mom’s office, the team jersey is delivered to the gym.</p>
<p>Oracle stores customers the same way. There is one real-world <strong>party</strong> (the cafe itself), one or more <strong>accounts</strong> (the “files” for doing business), and many <strong>sites</strong> (addresses) that each have a <strong>job</strong> — like “send bills here” or “deliver lemonade here.”</p>`,
    },
    {
      type: 'text',
      heading: 'Why customer setup matters so much',
      html: `<p>Every invoice, receipt, reminder and statement in Receivables points to a customer. If the customer record is wrong — wrong address, wrong payment terms, missing email — then every document built on it is wrong too. That is why Oracle insists on a few required pieces before you can bill anyone.</p>
<p>Oracle’s guide states it plainly: to record a sale, the customer (stored as a <strong>party</strong>) needs a <strong>customer account</strong> and a <strong>customer site</strong> that has the <strong>bill-to</strong> business purpose. No bill-to site, no invoice.</p>
<p>Customer records in Fusion are stored in the shared <strong>Trading Community Model</strong> (sometimes called TCA). “Shared” is the key word: the same customer can be used by Receivables, Order Management, Projects and Collections, so nobody keeps their own copy.</p>`,
    },
    {
      type: 'slides',
      title: 'The customer model, one layer at a time',
      slides: [
        {
          icon: '🏢',
          title: '1. Party — who they are',
          html: `<p>A <strong>party</strong> is any organization or person that can do business with us. It exists on its own, even before any selling happens. Example: the organization <em>Happy Cafe</em>.</p><p>A party has one <strong>identifying address</strong> — where it is physically located.</p>`,
        },
        {
          icon: '🤝',
          title: '2. Customer — a party we sell to',
          html: `<p>When we have a selling relationship with a party, Oracle treats it as a <strong>customer</strong>. Happy Cafe becomes a customer the day Sunny starts selling to it.</p>`,
        },
        {
          icon: '📁',
          title: '3. Customer account — the terms of the relationship',
          html: `<p>A <strong>customer account</strong> holds the terms and conditions of doing business: payment terms, credit settings, receipt methods, profile. One party can have <strong>several accounts</strong> — for example a “Wholesale” account and an “Events” account — each with different rules.</p>`,
        },
        {
          icon: '📍',
          title: '4. Account site — an address with a job',
          html: `<p>A <strong>site</strong> is an address. When it is used by a customer account it becomes an <strong>account site</strong>. Each site gets one or more <strong>business purposes</strong>: Bill-to, Ship-to, Statements, Dunning and more.</p>`,
        },
        {
          icon: '☎️',
          title: '5. Contact — the human we talk to',
          html: `<p>A <strong>contact</strong> is a person who acts for the customer — for example the cafe’s bookkeeper. Contacts can sit at the account or site level and have phone numbers, emails and <strong>responsibilities</strong> such as Bill-to (receives invoices) or Statements.</p>`,
        },
        {
          icon: '🔗',
          title: '6. Relationships — how parties connect',
          html: `<p>Parties can be related (parent company, subsidiary, partner). <strong>Account relationships</strong> let one account pay or receive bills for another — handy when a head office pays for all its branches.</p>`,
        },
      ],
    },
    {
      type: 'table',
      caption: 'Common address business purposes on an account site',
      headers: ['Business purpose', 'What it means in kid words', 'Notes from Oracle’s rules'],
      rows: [
        ['<strong>Bill-to</strong>', 'Send the bills here.', 'You need at least one bill-to site to create transactions for a customer.'],
        ['<strong>Ship-to</strong>', 'Deliver the goods here.', 'A ship-to site must point to the bill-to site that pays for what is shipped. Taxes are often calculated from ship-to.'],
        ['<strong>Deliver-to</strong>', 'The exact door inside the ship-to place.', 'Receives all or part of goods sent to a ship-to site.'],
        ['<strong>Statements</strong>', 'Send one summary statement here.', 'Gets one combined statement for all bill-to sites of the account; the site must also be a bill-to site.'],
        ['<strong>Dunning</strong>', 'Send “please pay” reminder letters here.', 'Used by dunning (collection letters).'],
        ['<strong>Late Charge</strong>', 'Use this site’s late-charge rules.', 'Holds the late-charge policy for the account (depending on a profile option).'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Don’t delete a business purpose — end-date it',
      html: `<p>If a site should stop being a bill-to site, Oracle recommends putting an <strong>end date</strong> on the business purpose instead of deleting it. You can then restore it later by removing the end date. Also, an inactive site can still receive payments for its old open invoices, but you can’t create new transactions on it.</p>`,
    },

    {
      type: 'exercise',
      kind: 'match',
      title: 'Match each business purpose to its job',
      instructions: `<p>Happy Cafe has several addresses. Match each business purpose to what it does.</p>`,
      pairs: [
        { left: 'Bill-to', right: 'Receives the invoices' },
        { left: 'Ship-to', right: 'Receives the lemonade deliveries' },
        { left: 'Statements', right: 'Receives one combined account summary' },
        { left: 'Dunning', right: 'Receives overdue payment reminders' },
        { left: 'Late Charge', right: 'Holds the late-charge policy used for interest' },
      ],
      explain: `<p>A site’s <strong>business purpose</strong> is its job. Remember the one hard rule: without at least one <strong>Bill-to</strong> site you cannot create transactions for the customer. A ship-to site always points to the bill-to site that pays for it, and a statement site must also be a bill-to site.</p>`,
    },
    {
      type: 'text',
      heading: 'Who is who on an invoice?',
      html: `<p>One invoice can name up to four different customer roles. Usually they are all the same company, but not always:</p>
<ul>
<li><strong>Bill-to customer</strong> – who gets the bill.</li>
<li><strong>Ship-to customer</strong> – who receives the goods. If you enter ship-to first, Oracle defaults the bill-to from it (but not the other way around).</li>
<li><strong>Sold-to customer</strong> – who the sale is credited to, e.g. a chain whose outlets all buy.</li>
<li><strong>Paying customer</strong> – who actually pays, e.g. a head office paying for a branch.</li>
</ul>`,
    },
    {
      type: 'text',
      heading: 'Customer profiles and profile classes: the rulebook',
      html: `<p>Every customer account (and optionally each site) has a <strong>profile</strong> — a set of rules for how we do business with them. Typing those rules for every new customer would be slow and error-prone, so Oracle uses <strong>profile classes</strong>: reusable templates.</p>
<p>Oracle’s example: one profile class for customers who pay promptly, one for late payers with higher late charges, and one for mostly on-time payers who get early-payment discounts.</p>
<p>Things a profile (and profile class) commonly controls:</p>
<ul>
<li><strong>Payment terms</strong> – e.g. Net 30. When you create an invoice manually, Oracle looks for terms on the <em>site profile</em>, then the <em>account profile</em>, then the <em>transaction type</em>. You can only change them on the invoice if <strong>Override terms</strong> is enabled.</li>
<li><strong>Credit and collections</strong> – credit limit, tolerance (how far over the limit is allowed), and whether the customer is included in credit checks.</li>
<li><strong>Statements and dunning</strong> – whether to send statements, the <strong>statement cycle</strong> (weekly, monthly…), minimum statement amount, and dunning settings.</li>
<li><strong>Late charges</strong> – whether and how to charge interest on overdue invoices.</li>
<li><strong>Invoicing</strong> – the <strong>preferred delivery method</strong> (for example paper or email), print options, and tax printing.</li>
<li><strong>Cash application</strong> – the <strong>Match Receipts By</strong> rule, <strong>AutoMatch rule set</strong> and <strong>AutoCash rule set</strong> used when applying receipts (more in the Receipts lesson).</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: profile class behavior worth knowing',
      html: `<ul>
<li>A new customer account automatically gets the profile class named <strong>DEFAULT</strong>. You can change it on the Edit Account page.</li>
<li>A new <strong>site</strong> does <em>not</em> automatically get a profile. You assign one on the Create Site Profile page if the site needs its own rules.</li>
<li>Once assigned, you may tweak a single customer’s profile (say, a special credit limit) without changing the class itself.</li>
<li>Profiles are <strong>date-effective</strong>. The <strong>Profile History</strong> tab shows each version and when it applied.</li>
<li>When you change a profile class, Oracle asks how far to push the change: to new profiles only, to unmodified existing profiles (with versioning), or to all profiles. The <strong>Propagate Customer Profile Class Update</strong> process applies it.</li>
<li>Profile classes are set up in <strong>Setup and Maintenance</strong> with the task <kbd>Manage Receivables Customer Profile Classes</kbd>.</li>
</ul>`,
    },

    {
      type: 'lab',
      tool: 'payment-terms',
      title: 'See what payment terms do',
      intro: `<p>Profile classes hand payment terms to every invoice. Suppose Jordan creates an “Early Payer” profile class with terms <strong>2/10 Net 30</strong> (2% discount if paid within 10 days, otherwise due in 30). Happy Cafe gets a $420 invoice dated 1 July 2026 and pays on 9 July. Check the due date, the discount date and how much they may deduct. Then try paying on 15 July.</p>`,
      preset: { invoiceDate: '2026-07-01', amount: 420, netDays: 30, discountPct: 2, discountDays: 10, payDate: '2026-07-09' },
    },
    {
      type: 'example',
      title: 'Omar sets up Happy Cafe',
      html: `<p>Happy Cafe wants to buy lemonade every week. Before Omar can bill them, Jordan has already created a profile class called <strong>Sunny Standard Trade</strong>: Net 30 terms, monthly statement cycle, credit limit $2,000, email invoice delivery. Omar now creates the customer.</p>`,
      steps: [
        '<strong>Party / customer:</strong> Happy Cafe (an organization).',
        '<strong>Customer account:</strong> “Happy Cafe – Wholesale”, profile class <strong>Sunny Standard Trade</strong>, so it inherits Net 30, a $2,000 credit limit and monthly statements.',
        '<strong>Site 1 – 12 Main Street (the cafe):</strong> business purposes <strong>Ship-to</strong> (lemonade is delivered here) and <strong>Bill-to</strong>, marked Primary.',
        '<strong>Site 1 also gets:</strong> <strong>Statements</strong> and <strong>Dunning</strong> purposes, so reminders and statements go to the same place.',
        '<strong>Contact:</strong> Rosa, the cafe’s bookkeeper, with an email address and the <strong>Bill-to</strong> responsibility, so emailed invoices reach Rosa.',
        '<strong>Receipt method:</strong> Sunny’s standard “check or bank transfer” manual receipt method is set as primary on the account.',
      ],
      result: `<p>Now when Omar creates an invoice and picks Happy Cafe, Oracle fills in the bill-to address, Net 30 terms and the due date automatically. One good setup saves hundreds of keystrokes later.</p>`,
    },

    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: set up City Park Kiosk',
      instructions: `<p>City Park Kiosk wants to buy on credit. Sam approved the standard trade rules: profile class <strong>Sunny Standard Trade</strong> (Net 30, $2,000 credit limit). The kiosk’s address at 1 Park Lane both receives the deliveries and the bills. Their bookkeeper, Lee, should receive invoices by email. Fill in the practice screen.</p>`,
      formTitle: 'Practice screen — Create Customer (simulation)',
      fields: [
        { label: 'Business unit', given: 'Sunny US BU' },
        { label: 'Organization name', type: 'text', answer: 'City Park Kiosk' },
        { label: 'Account profile class', type: 'select', options: ['DEFAULT', 'Sunny Standard Trade', 'Sunny Cash Only'], answer: 'Sunny Standard Trade' },
        { label: 'Site address', given: '1 Park Lane' },
        { label: 'Business purposes for this site', type: 'select', options: ['Ship-to only', 'Bill-to only', 'Bill-to and Ship-to', 'Dunning only'], answer: 'Bill-to and Ship-to' },
        { label: 'Payment terms that will default on invoices', type: 'select', options: ['Immediate', 'Net 15', 'Net 30', 'Net 60'], answer: 'Net 30' },
        { label: 'Credit limit (USD)', type: 'number', answer: 2000 },
        { label: 'Contact responsibility for Lee', type: 'select', options: ['Bill-to', 'Ship-to', 'Marketing'], answer: 'Bill-to' },
      ],
      explain: `<p>The profile class does most of the work: terms Net 30 and the $2,000 credit limit come from <strong>Sunny Standard Trade</strong>. The single site needs <strong>both</strong> Bill-to (or no invoices are possible) and Ship-to (deliveries go there). Lee needs the <strong>Bill-to</strong> responsibility and an email address, or emailed invoices won’t reach anyone.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: create a customer',
      items: [
        'From the Navigator, open <kbd>Receivables</kbd> &gt; <kbd>Billing</kbd>.',
        'Open the <kbd>Tasks</kbd> panel and, under Customers, choose <kbd>Create Customer</kbd> (or <kbd>Manage Customers</kbd> to search for and edit an existing one).',
        'Enter the organization name and the account details, including the account <strong>profile class</strong>.',
        'Enter the address. This becomes the first <strong>account site</strong>. Add the <strong>Bill-to</strong> business purpose (and Ship-to if goods are delivered there).',
        'Save. Then, from <kbd>Manage Customers</kbd>, open the account to add contacts, extra sites, receipt methods, or to adjust the profile on the <strong>Profile History</strong> tab.',
      ],
      note: `<p>Labels and the exact layout vary by release, by the Redwood pages your company has turned on, and by how your company configured Fusion. Large numbers of customers are usually loaded with a spreadsheet upload task (Oracle lists <kbd>Upload Customers from Spreadsheet</kbd> under the Billing tasks) or with file-based data import — see the Data module.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tips from customer-data teams',
      html: `<ul>
<li><strong>Search before you create.</strong> Duplicate customers are the number-one data problem. Two “Happy Cafe” records split the balance and confuse collectors. Oracle has a customer <strong>merge</strong> feature, but prevention is easier.</li>
<li><strong>Keep the bill-to contact’s email current.</strong> Emailed invoices and statements go to contacts with the right responsibility. A bounced email means an unpaid invoice nobody saw.</li>
<li><strong>Change the class, not 500 customers.</strong> If the company changes standard terms, update the profile class and propagate it, rather than editing each account by hand.</li>
<li><strong>Customer setup is often controlled.</strong> Many companies limit who can create customers or change credit limits, because these affect risk.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Party', def: 'Any organization or person that can do business with us. It exists independently of any selling relationship.' },
        { term: 'Customer account', def: 'The record of the business relationship with a customer, holding terms such as payment terms and profile settings.' },
        { term: 'Account site', def: 'An address used by a customer account, given one or more business purposes such as Bill-to or Ship-to.' },
        { term: 'Business purpose', def: 'The job an account site does, such as Bill-to (receives invoices) or Ship-to (receives goods).' },
        { term: 'Customer contact', def: 'A person who communicates for the customer, such as a bookkeeper who receives invoices.' },
        { term: 'Profile class', def: 'A reusable template of customer rules such as payment terms, credit limit, statements and late charges.' },
        { term: 'Trading Community Model', def: 'The shared Oracle Fusion data model where parties, customers, sites and contacts are stored for all applications.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'What is the minimum Oracle needs before Omar can invoice a new customer?',
          options: [
            'Only the customer’s name',
            'A party with a customer account and an account site that has the Bill-to purpose',
            'A party with a Ship-to site only',
            'A signed contract uploaded as an attachment',
          ],
          answer: 1,
          explain: 'Oracle requires a party, a customer account and a customer site with the Bill-to business purpose to record a sales transaction.',
        },
        {
          q: 'Sunny wants to change payment terms from Net 30 to Net 20 for 300 similar customers. What is the smartest approach?',
          options: [
            'Edit each customer account one by one',
            'Change the terms on every invoice instead',
            'Update the shared profile class and choose how to apply the change to existing profiles',
            'Create 300 new customers',
          ],
          answer: 2,
          explain: 'Profile classes are templates. Updating the class and propagating the change is faster and more consistent than editing hundreds of accounts.',
        },
        {
          q: 'Happy Cafe’s head office will pay the bills for its new airport branch. Which customer role describes the head office on the branch’s invoice?',
          options: ['Ship-to customer', 'Paying customer', 'Sold-to customer', 'Supplier'],
          answer: 1,
          explain: 'The paying customer is the party that actually pays. The branch can still be the ship-to and bill-to customer.',
        },
        {
          q: 'A site should no longer receive bills. What does Oracle recommend?',
          options: [
            'Delete the Bill-to business purpose',
            'Put an end date on the Bill-to business purpose',
            'Delete the whole customer',
            'Change the address to blank',
          ],
          answer: 1,
          explain: 'End-dating keeps history and lets you restore the purpose later. Deleting means you would have to recreate it.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Customer and Party Structure', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/customer-and-party-structure.html' },
    { title: 'Guidelines for Customer Addresses', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/guidelines-for-customer-addresses.html' },
    { title: 'How You Use Customer Profile Classes', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/how-you-use-customer-profile-classes.html' },
    { title: 'How You Update and Version Profile Classes', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/how-you-update-and-version-profile-classes.html' },
    { title: 'When are profile class defaults used?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/when-are-profile-class-defaults-used.html' },
    { title: 'Guidelines for Defining Payment Terms', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fairp/guidelines-for-defining-payment-terms.html' },
    { title: 'What’s the difference between the various customers?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faofc/what-s-the-difference-between-the-various-customers.html' },
  ],
};
