export default {
  slug: 'keep-learning',
  title: 'Where to Keep Learning (and Certifications)',
  minutes: 14,
  summary:
    'You have finished the core course — now what? Learn where professionals keep learning about Oracle Fusion Cloud ERP: the Oracle Help Center, Readiness, Oracle University and MyLearn (including free Foundations training), the current Financials certifications, Cloud Customer Connect, and honest ways to practice when there is no free personal Fusion sandbox.',
  objectives: [
    'Use the Oracle Help Center and Readiness pages to answer “how does this work in my release?”',
    'Describe what Oracle University and MyLearn offer, including free Foundations training',
    'Name the current Oracle certifications most relevant to Fusion Financials',
    'Explain realistic ways to get hands-on practice',
    'Build a simple personal learning plan',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Learning to ride, then learning the roads',
      html: `<p>When you learn to ride a bike, the first lessons are about balance and brakes. After that, you keep learning for years: new routes, traffic signs, how to fix a flat tire. Nobody learns everything on day one — you just know <strong>where to find answers</strong> and you keep riding.</p>
<p>This course gave you the balance and the brakes of Oracle Fusion Cloud ERP. Because Fusion <strong>changes every quarter</strong>, even experts keep learning. <span class="hl">The real skill is knowing where the trustworthy answers live.</span></p>`,
    },
    {
      type: 'text',
      heading: 'Your four trusted sources',
      html: `<ol>
<li><strong>Oracle Help Center</strong> (docs.oracle.com) — the official guides for every product and every release: <em>Using Payables Invoice to Pay</em>, <em>Using General Ledger</em>, implementation guides, the FBDI guide, REST API guides, security reference and more. Pages are versioned by release (look for <code>26d</code> in the address).</li>
<li><strong>Oracle Cloud Applications Readiness</strong> — the <strong>What’s New</strong> for each quarterly update, feature summaries, opt-in information, known issues and maintenance packs.</li>
<li><strong>Oracle University</strong> and its learning platform <strong>Oracle MyLearn</strong> — courses, learning paths, live classes, hands-on labs (with a subscription) and certification exams.</li>
<li><strong>Cloud Customer Connect</strong> — Oracle’s online community where customers and Oracle staff discuss each product (for example the Financials forums), share tips about upcoming changes and post ideas in the <strong>Ideas Lab</strong>. Oracle’s Readiness pages point customers there.</li>
</ol>
<p>Customers with a support contract also use <strong>My Oracle Support</strong> to search known issues and log service requests.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Where would you look?',
      instructions: `<p>Match each question to the best place to find the answer.</p>`,
      pairs: [
        { left: 'What are the parameters of Import Payables Invoices in my release?', right: 'Oracle Help Center' },
        { left: 'Which new Payables features arrive in the next update, and are they opt-in?', right: 'Readiness What’s New' },
        { left: 'I want a structured video course and a certification exam', right: 'Oracle University / MyLearn' },
        { left: 'How are other customers handling a change Oracle announced?', right: 'Cloud Customer Connect' },
        { left: 'Is this odd error a known issue with a fix?', right: 'My Oracle Support' },
      ],
      explain: `<p>The Help Center explains how things work; Readiness explains what is changing; MyLearn teaches and certifies; Customer Connect is the community conversation; My Oracle Support is where customers search known issues and raise service requests.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'How to read the Help Center like a pro',
      html: `<ul>
<li><strong>Start from the Financials books page</strong> for your release and pick the guide by job: “Using …” guides for daily work, “Implementing …” guides for setup.</li>
<li><strong>Check the release in the address.</strong> A blog post from 2019 may describe a subject area or screen that no longer exists — like the retired <em>Payables Invoices - Holds Real Time</em> subject area you met in the OTBI lesson.</li>
<li><strong>Use the reference guides</strong>: OTBI subject area references, the FBDI guide (with the templates), and the REST API guide are gold for practitioners.</li>
</ul>`,
    },
    {
      type: 'text',
      heading: 'Oracle University, MyLearn and free training',
      html: `<p><strong>Oracle MyLearn</strong> is the platform where Oracle University training and certification live. You can follow <strong>learning paths</strong> (ordered sets of short video courses), track progress on a personal dashboard, and buy and schedule certification exams. Oracle says that once you buy an exam you have six months to take it.</p>
<p>Oracle currently advertises <strong>free Foundations training and certifications</strong> across Oracle Cloud Infrastructure, <strong>Oracle Fusion Cloud Applications</strong> and AI. That is a great free starting point after this course. Which courses and exams are free can change, so check MyLearn when you sign up.</p>
<p>Companies can also buy the <strong>Oracle Unlimited Learning Subscription</strong>, which includes role-based training, <strong>hands-on labs in a dedicated training environment</strong>, live learning events and certification exam attempts.</p>`,
    },
    {
      type: 'table',
      caption: 'Oracle Cloud ERP certifications listed by Oracle (2026 names)',
      headers: ['Certification', 'Good for'],
      rows: [
        ['Oracle Fusion Cloud Applications ERP Process Essentials Certified', 'Beginners: shows you understand core ERP business processes in Fusion'],
        ['Oracle Fusion Cloud Financials: General Ledger 2026 Implementation Professional', 'GL consultants and accountants who set up ledgers, journals and reporting'],
        ['Oracle Fusion Cloud Financials: Payables and Expenses 2026 Implementation Professional', 'Payables and Expenses consultants and specialists'],
        ['Oracle Fusion Cloud Financials: Receivables and Collections 2026 Implementation Professional', 'Order-to-cash specialists'],
        ['Oracle Accounting Hub Cloud 2026 Implementation Professional', 'People building accounting rules for other source systems'],
        ['Oracle Revenue Management Cloud Service 2026 Implementation Professional', 'Revenue recognition specialists'],
        ['Oracle Fusion AI Agent Studio Foundations Associate / Developer Professional', 'People configuring or building AI agents in Fusion'],
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Certification names change every year',
      html: `<p>Oracle puts the year in many certification names (2025, 2026…) and also offers “Delta” versions of several exams. Always read the exam page on Oracle’s certification site for the current name, exam number, topics and recommended training before you book.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Pick a certification for each person',
      instructions: `<p>Each Sunny team member wants a certification that fits their job. Choose the best one.</p>`,
      categories: ['ERP Process Essentials', 'General Ledger Implementation Professional', 'Payables and Expenses Implementation Professional', 'Receivables and Collections Implementation Professional'],
      items: [
        { text: 'Noah, kitchen manager, just wants to understand how ERP processes fit together', answer: 'ERP Process Essentials' },
        { text: 'Priya, who maintains ledgers, journals and financial reports', answer: 'General Ledger Implementation Professional' },
        { text: 'Ava, who runs invoices, payments and expense reimbursements', answer: 'Payables and Expenses Implementation Professional' },
        { text: 'Omar, who bills customers and chases payments', answer: 'Receivables and Collections Implementation Professional' },
        { text: 'A new intern who finished this course and wants a first credential', answer: 'ERP Process Essentials' },
      ],
      explain: `<p>Process Essentials is the beginner-friendly credential about business processes. The Implementation Professional exams go deep into one area — General Ledger, Payables and Expenses, or Receivables and Collections — and suit people who configure and run those modules.</p>`,
    },
    {
      type: 'text',
      heading: 'How to practice (the honest truth)',
      html: `<p>Here is something many beginners do not expect: <strong>there is no free personal Oracle Fusion ERP sandbox</strong> you can sign up for like a free email account. Fusion environments are part of a company’s paid subscription.</p>
<ul>
<li><strong>Oracle Cloud Free Tier</strong> gives free credits and “Always Free” services for <strong>Oracle Cloud Infrastructure</strong> (databases, servers and so on). It does not give you a Fusion ERP environment.</li>
<li>Companies get a <strong>production</strong> and a <strong>test</strong> environment, can buy extra development environments, and can subscribe to <strong>demonstration environments</strong> made for demos, training and evaluation.</li>
<li>Oracle University’s paid subscription includes <strong>hands-on labs</strong> in a training environment.</li>
</ul>
<p>So realistic ways to practice are:</p>
<ol>
<li><strong>At work</strong> — ask for access to your company’s <em>test</em> environment and a safe practice business unit or data set. Never practice in production.</li>
<li><strong>Through a training provider or Oracle partner</strong> that supplies lab access as part of a course.</li>
<li><strong>With simulations</strong> — like the exercises and Practice Lab in this app — to master the concepts (matching, payment terms, depreciation, journals) that work the same way in any environment.</li>
<li><strong>By reading real documents</strong> — FBDI templates, REST examples and OTBI subject area references are public in the Help Center.</li>
</ol>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Free to everyone, or needs a company or subscription?',
      instructions: `<p>Sort each learning resource by who can use it.</p>`,
      categories: ['Free to anyone', 'Needs a company environment or paid subscription'],
      items: [
        { text: 'Reading the Oracle Help Center guides', answer: 'Free to anyone' },
        { text: 'Reading the Readiness What’s New for 26D', answer: 'Free to anyone' },
        { text: 'Oracle’s free Foundations training on MyLearn', answer: 'Free to anyone' },
        { text: 'Clicking through Payables in a real Fusion test environment', answer: 'Needs a company environment or paid subscription' },
        { text: 'Oracle University hands-on labs in a training environment', answer: 'Needs a company environment or paid subscription' },
        { text: 'Downloading an FBDI template to study its columns', answer: 'Free to anyone' },
      ],
      explain: `<p>Documentation, Readiness, FBDI templates and the free Foundations training are open to everyone. A live Fusion environment comes with a company subscription, a partner or a paid Oracle University subscription — there is no free personal Fusion sandbox.</p>`,
    },
    {
      type: 'example',
      title: 'Noah’s 90-day learning plan',
      html: `<p>Noah, the kitchen manager, enjoyed this course and wants to move into a finance systems role. Sam agrees to support a 90-day plan.</p>`,
      steps: [
        '<strong>Days 1–30:</strong> Re-do the Payables and General Ledger modules in this app and finish every exercise. Start Oracle’s free Fusion Foundations training on MyLearn.',
        '<strong>Days 31–60:</strong> Shadow Ava for one Payables close. With Jordan’s help, practice entering, validating and accounting invoices in Sunny’s <em>test</em> environment. Read the Help Center chapters for every task Noah tried.',
        '<strong>Days 61–90:</strong> Read the Financials What’s New for the next update and help Jordan with regression testing. Take the Process Essentials certification if it fits, and join the Financials discussions on Cloud Customer Connect.',
        '<strong>Every quarter after that:</strong> one What’s New, one new skill (for example building an OTBI analysis), one conversation with a colleague about how they use Fusion.',
      ],
      result: `<p>Small, steady steps beat cramming. In a year Noah will know Fusion better than many people who “studied” it once.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Build a sensible learning path',
      instructions: `<p>Put these learning steps in a sensible order for a complete beginner.</p>`,
      items: [
        'Learn the basics: what an ERP is, accounts, debits and credits',
        'Learn one module end to end (for example Payables)',
        'Practice the concepts with exercises and simulations',
        'Get supervised hands-on time in a test environment',
        'Take a certification that matches your role',
        'Keep up with each quarterly update through Readiness',
      ],
      explain: `<p>Concepts first, then one module deeply, then practice, then real hands-on work, then a credential — and after that, lifelong learning every quarter.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'What employers notice',
      html: `<ul>
<li><strong>You understand the business, not just the clicks.</strong> Explaining <em>why</em> a matching hold exists impresses more than knowing which button releases it.</li>
<li><strong>You check the docs for the current release</strong> before answering.</li>
<li><strong>You test before you change.</strong> Respect for test environments and controls is a professional habit.</li>
<li><strong>You keep a learning log</strong> — what you learned each quarter, with links.</li>
</ul>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Oracle Help Center', def: 'Oracle’s official documentation website, with guides for each product and release.' },
        { term: 'Readiness', def: 'Oracle’s pages describing what is new and changing in each quarterly update.' },
        { term: 'Oracle MyLearn', def: 'Oracle University’s learning platform for courses, learning paths and certification exams.' },
        { term: 'Certification', def: 'An exam-based credential from Oracle that shows you have specific knowledge.' },
        { term: 'Cloud Customer Connect', def: 'Oracle’s online community for customers to discuss products, share tips and submit ideas.' },
        { term: 'Sandbox', def: 'A safe environment for practicing without affecting real data; for Fusion this is usually a company test environment.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Where do you find the official, release-specific guide for how a Fusion task works?',
          options: ['A random video', 'The Oracle Help Center', 'A supplier’s website', 'The bank statement'],
          answer: 1,
          explain: 'The Oracle Help Center (docs.oracle.com) holds the official guides, versioned by release.',
        },
        {
          q: 'Which statement about practicing Fusion is accurate?',
          options: ['Anyone can sign up for a free personal Fusion ERP sandbox', 'Oracle Cloud Free Tier includes a full Fusion ERP environment', 'Fusion environments come with a company subscription; individuals usually practice through work, partners, training subscriptions or simulations', 'You should practice in your company’s production environment'],
          answer: 2,
          explain: 'There is no free personal Fusion sandbox. The Free Tier covers Oracle Cloud Infrastructure services, and practice belongs in test environments, never production.',
        },
        {
          q: 'Which certification name fits a General Ledger specialist in 2026?',
          options: ['Oracle Fusion Cloud Financials: General Ledger 2026 Implementation Professional', 'Lemonade Ledger Expert', 'Oracle Database SQL Associate', 'AI Agent Studio Foundations Associate'],
          answer: 0,
          explain: 'That is the current General Ledger certification name on Oracle’s certification page.',
        },
        {
          q: 'Where would you discuss an upcoming Oracle change with other customers and suggest an idea?',
          options: ['Cloud Customer Connect', 'The FBDI template', 'Smart View', 'The Scheduled Processes work area'],
          answer: 0,
          explain: 'Cloud Customer Connect hosts product forums and the Ideas Lab.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Oracle Fusion Cloud Financials documentation', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/index.html' },
    { title: 'Financials 26D Books', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/books.html' },
    { title: 'Cloud Applications Readiness', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/index.html' },
    { title: 'Financials What’s New 26D — Overview (Ideas Lab and Customer Connect)', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-t77649.htm' },
    { title: 'Training and Certification', publisher: 'Oracle University', url: 'https://www.oracle.com/education/training/' },
    { title: 'Oracle Certification', publisher: 'Oracle University', url: 'https://www.oracle.com/education/certification/' },
    { title: 'Oracle MyLearn', publisher: 'Oracle University', url: 'https://mylearn.oracle.com/ou/home' },
    { title: 'Oracle Cloud Free Tier', publisher: 'Oracle', url: 'https://www.oracle.com/cloud/free/' },
    { title: 'Overview of Fusion Applications Environment Management', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en-us/iaas/Content/fusion-applications/overview.htm' },
  ],
};
