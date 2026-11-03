export default {
  slug: 'ai-in-fusion',
  title: 'AI Helpers Inside Fusion',
  minutes: 15,
  summary:
    'Oracle Fusion now has AI built in: invoice recognition that reads emailed bills, AI agents for Payables, Ledger, Payments, Expenses and Cash, and AI Agent Studio for building your own. Learn what they do for Sunny Lemonade — and why people still stay responsible for every number.',
  objectives: [
    'Tell the difference between embedded machine learning, generative AI and AI agents',
    'Name the main AI agents Oracle offers for finance and what each one helps with',
    'Explain what AI Agent Studio is used for',
    'Describe how Intelligent Document Recognition turns emailed invoices into Payables invoices',
    'Apply simple safety rules: humans review, approve and stay accountable',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'A very clever helper — who still needs a grown-up',
      html: `<p>Imagine your lemonade stand gets a robot helper. It can read the shopping receipts, sort the coins, and even say: “Hey, we sold less pink lemonade on rainy days!” That saves you loads of time.</p>
<p>But sometimes the robot reads a smudged “8” as a “3”. Sometimes it guesses. And it has never met your grandma, who always pays next Tuesday. So the rule at your stand is simple: <span class="hl">the robot can prepare and suggest, but a person checks, decides and signs</span>.</p>
<p>That is exactly how AI works inside Oracle Fusion Cloud ERP.</p>`,
    },
    {
      type: 'text',
      heading: 'Three kinds of AI you will hear about',
      html: `<p>“AI” (Artificial Intelligence) is a big word. In Fusion it shows up in three main flavors:</p>
<ul>
<li><strong>Embedded machine learning</strong> — the system learns patterns from lots of past data and uses them quietly inside a normal process. Example: reading the fields on a supplier’s PDF invoice and getting better each time someone corrects it.</li>
<li><strong>Generative AI</strong> (GenAI) — AI that <em>produces</em> new text: summaries, explanations, answers to questions written in normal language.</li>
<li><strong>AI agents</strong> — helpers that can follow a goal through several steps: look things up, reason about them, prepare actions, and (within rules your company sets) carry some of them out. Oracle now also groups teams of agents into <strong>agentic applications</strong> — workspaces where agents and people work on a whole outcome together.</li>
</ul>
<p>Oracle says its AI agents are <strong>embedded</strong> in Fusion Applications workflows, run on Oracle Cloud Infrastructure, and are provided to existing Fusion customers <strong>at no additional cost</strong>. Many still need an administrator to enable them and give people the right roles.</p>`,
    },
    {
      type: 'table',
      caption: 'Finance AI agents Oracle describes for Fusion ERP (names can change — check the latest Readiness pages)',
      headers: ['Agent', 'What it helps with', 'Who at Sunny would use it'],
      rows: [
        ['<strong>Payables Agent</strong>', 'Takes in invoices from email, portals, e-invoicing and PDFs; pulls out and tidies the data; matches to purchase orders and receipts; prepares distributions and accounting; applies tax, policy and fraud checks; routes for approval and payment.', 'Ava'],
        ['<strong>Ledger Agent</strong> / Ledger Agentic Application', 'Lets accountants ask questions in plain language, monitors accounts, explains balances with supporting detail, and can prepare adjustment journals.', 'Priya'],
        ['<strong>Payments Agent</strong>', 'Helps choose payment options such as early pay and virtual cards, works with banks, and watches acknowledgements and exceptions.', 'Ava and Mia'],
        ['<strong>Expenses Agent</strong>', 'Pulls expense details from receipts, matches them to card charges, checks policy and handles questions in natural language.', 'Noah and every employee'],
        ['<strong>Cash Processing Agent</strong>', 'Creates receipts from bank statement lines, reads remittance advices and matches them; helps with bank reconciliation and cash positioning.', 'Omar and Mia'],
        ['<strong>Collectors Workspace</strong> (agentic application)', 'Supports collectors with risk analysis, suggested next actions and outreach.', 'Omar'],
      ],
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'What’s new right now (update 26D)',
      html: `<p>The Financials <strong>What’s New for 26D</strong> is full of AI. A few highlights:</p>
<ul>
<li><strong>Ledger Agentic Application</strong> — accountants describe an <em>outcome</em> (for example “explain the big movements in this account between two periods”), review the plan the agent proposes <em>before</em> work begins, and then review the evidence when it is done. 26D adds <strong>Fusion Claw</strong>, which Oracle calls a governed runtime for agentic work.</li>
<li><strong>Payables Agent</strong> improvements for “touchless” invoice processing, including multilingual GenAI support and policies created from uploaded policy documents.</li>
<li><strong>Payables Period Close Workspace</strong> — a GenAI-powered workspace for the Payables close, with <strong>Ask Oracle</strong> to investigate issues in context. Items outside the allowed limits are routed for human review.</li>
<li><strong>Cash Processing Agent</strong> and <strong>Expenses Agent</strong> enhancements.</li>
</ul>
<p>Older AI features are being replaced too: the Oracle Digital Assistant Fusion Apps templates are desupported on November 21, 2026, and Oracle recommends <strong>AI Agent Studio</strong> instead.</p>`,
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Which AI helper would you call?',
      instructions: `<p>Match each Sunny Lemonade situation to the AI agent built for it.</p>`,
      pairs: [
        { left: 'Ava gets 80 supplier invoices a week by email and PDF', right: 'Payables Agent' },
        { left: 'Priya wants to know why an account balance jumped this month', right: 'Ledger Agent' },
        { left: 'Mia wants to offer Lemon Grove Farms early payment or a virtual card', right: 'Payments Agent' },
        { left: 'Noah has a pile of taxi and meal receipts from a trip', right: 'Expenses Agent' },
        { left: 'Omar must match a bank statement line to Happy Cafe’s remittance', right: 'Cash Processing Agent' },
      ],
      explain: `<p>Each agent is embedded in its own business process: invoices (Payables Agent), accounting inquiry (Ledger Agent), outgoing payment options (Payments Agent), employee expenses (Expenses Agent) and incoming cash and reconciliation (Cash Processing Agent).</p>`,
    },
    {
      type: 'text',
      heading: 'Intelligent Document Recognition: the invoice reader',
      html: `<p>Long before agents, Payables had a very practical AI feature: <strong>Intelligent Document Recognition (IDR)</strong>. Suppliers (or Sunny’s own mailroom) email invoices to a special inbox. IDR reads the attached documents, pulls out the invoice details, and creates invoices in Payables.</p>
<p>The clever part is that IDR <strong>learns from corrections</strong>. If Ava fixes a field that was read wrongly for Sweet Sugar Co., IDR uses that correction to read the next Sweet Sugar Co. invoice better.</p>
<p>On the <strong>Invoices</strong> landing page, recognized invoices appear in the <strong>Scanned</strong> information tile. Oracle’s documentation describes two statuses there:</p>
<ul>
<li><strong>Incomplete</strong> — something needs attention. Ava opens it in the <strong>Interactive Viewer</strong>, clicks the right value on the invoice image, and fixes it.</li>
<li><strong>Not Validated</strong> — all expected fields were recognized; the invoice is ready for the normal checks (validation, holds and approval — see the Payables lessons).</li>
</ul>`,
    },
    {
      type: 'flow',
      title: 'An emailed invoice meets the AI helpers',
      steps: [
        { icon: '📧', label: 'Email arrives', detail: 'Lemon Grove Farms emails a PDF invoice for 1,000 lemons, $500.' },
        { icon: '🔎', label: 'Recognize', detail: 'The invoice reader extracts supplier, number, date, amount and lines.' },
        { icon: '🔗', label: 'Match and code', detail: 'The invoice is matched to Leo’s purchase order and Noah’s receipt; accounting is prepared.' },
        { icon: '🛡️', label: 'Checks', detail: 'Validation, tax, policy and duplicate checks run; problems become holds or exceptions.' },
        { icon: '🙋', label: 'Human review', detail: 'Ava handles anything incomplete or unusual; approvers still approve.' },
        { icon: '💸', label: 'Pay', detail: 'The invoice joins the normal payment process.' },
      ],
      note: `<p>AI speeds up the boring parts. The <strong>controls</strong> — validation, holds, approvals, segregation of duties — are still there.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: review a scanned invoice',
      instructions: `<p>This is a <strong>practice screen</strong> (a simplified simulation, not Oracle’s real page). The invoice reader scanned a PDF from Lemon Grove Farms. The PDF clearly says <strong>Invoice LGF-1042, dated 2026-03-02, total $500.00</strong>. Check what the AI read, correct what is wrong, and choose the status.</p>`,
      formTitle: 'Scanned invoice review (practice)',
      fields: [
        { label: 'Supplier (recognized)', given: 'Lemon Grove Farms' },
        { label: 'Invoice number (recognized)', given: 'LGF-1042' },
        { label: 'Invoice amount (recognized)', given: '50.00' },
        { label: 'Status shown in the Scanned tile', type: 'select', options: ['Incomplete', 'Not Validated', 'Paid'], answer: 'Incomplete', hint: 'Something needs attention.' },
        { label: 'Corrected invoice amount', type: 'number', answer: 500, hint: 'Look at the PDF total, not the AI guess.' },
        { label: 'Corrected invoice date', type: 'date', answer: '2026-03-02' },
      ],
      explain: `<p>The reader dropped a zero, so the invoice needs attention (Incomplete). Ava corrects the amount to 500 from the document itself. Because the reader learns from corrections, the next Lemon Grove Farms invoice should be read better — but a person still checked the evidence.</p>`,
    },
    {
      type: 'text',
      heading: 'AI Agent Studio: the workshop for building helpers',
      html: `<p><strong>AI Agent Studio</strong> is Oracle’s design-time tool, built into Fusion Applications, for creating, configuring, testing and deploying AI agents and GenAI features. An authorized person opens it from <kbd>Navigator</kbd> &gt; <kbd>Tools</kbd> &gt; <kbd>AI Agent Studio</kbd> (labels can vary by release).</p>
<p>With it, a company can:</p>
<ul>
<li>Start from <strong>predefined agent templates</strong> and <strong>agent teams</strong> that Oracle delivers, and adjust them.</li>
<li>Build its <strong>own agents</strong> and multi-agent workflows.</li>
<li>Give agents <strong>tools</strong> (for example, reading or acting on Fusion business objects) and <strong>documents</strong> to search, such as a company policy.</li>
<li><strong>Debug</strong> and evaluate how agents behave before people rely on them.</li>
</ul>
<p>Some ready-made assistants appear for users on an <strong>AI Agents</strong> page (for example in an Explore area), once the right roles are assigned. Access is controlled by security roles, just like every other part of Fusion.</p>`,
    },
    {
      type: 'example',
      title: 'Priya and the Ledger Agent catch a coding mistake',
      html: `<p>It is close week. Priya asks the Ledger Agent in plain words: <em>“Why is Lemons Cost for Kitchen so much higher this month than last month?”</em></p>`,
      steps: [
        'The agent looks at the balance for account <code>101-200-5110-010-000</code>, the journals behind it and the Payables invoices that fed it.',
        'It explains: one $200 invoice from <strong>Sweet Sugar Co.</strong> was coded to <strong>5110 Lemons Cost</strong> instead of <strong>5120 Sugar Cost</strong>, and shows the invoice as evidence.',
        'It suggests a correcting journal. Priya opens the original invoice to check — the agent is right this time.',
        'Priya reviews the proposed journal, adds a clear description, and sends it through Sunny’s normal journal approval. Sam approves.',
      ],
      result: `<p>The agent did the detective work in seconds. Priya stayed the accountant: they verified the evidence, owned the journal and followed the approval rules.</p>`,
    },
    {
      type: 'journal',
      title: 'Correcting journal Priya reviewed and submitted',
      lines: [
        { account: '5120 Sugar Cost (101-200-5120-010-000)', debit: 200, credit: 0 },
        { account: '5110 Lemons Cost (101-200-5110-010-000)', debit: 0, credit: 200 },
      ],
      note: `<p>A reclassification moves the cost to the right account. Total expense does not change — only <em>where</em> it shows. A better long-term fix: correct the supplier’s default account so it does not happen again.</p>`,
    },
    {
      type: 'exercise',
      kind: 'journal',
      title: 'Your turn: fix the electricity bill coding',
      instructions: `<p>The Ledger Agent tells Priya that a <strong>$150 Bright Power Utility</strong> bill was coded to <strong>6110 Rent</strong> instead of <strong>6120 Electricity</strong>. Priya checks the bill — the agent is right. Build the correcting journal Priya will submit for approval.</p>`,
      accounts: ['6120 Electricity', '6110 Rent', '2110 Accounts Payable – Trade', '1110 Cash – Big River Bank', '5110 Lemons Cost'],
      answer: [
        { account: '6120 Electricity', debit: 150, credit: 0 },
        { account: '6110 Rent', debit: 0, credit: 150 },
      ],
      explain: `<p>Debit the correct expense (Electricity) and credit the wrong one (Rent) to move the $150. Payables and cash are not touched — the supplier was owed the same amount either way. The agent found it; Priya owns the journal.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Who decides? AI or a person',
      instructions: `<p>Sunny’s AI policy says agents may <em>prepare and suggest</em>, but some steps always need a person. Sort each step.</p>`,
      categories: ['AI helper can prepare it', 'A person must review or approve'],
      items: [
        { text: 'Read the fields from an emailed PDF invoice', answer: 'AI helper can prepare it' },
        { text: 'Approve a $6,000 invoice from Stand Builders LLC', answer: 'A person must review or approve' },
        { text: 'Draft an explanation of why Lemons Cost rose this month', answer: 'AI helper can prepare it' },
        { text: 'Submit an adjusting journal to the ledger', answer: 'A person must review or approve' },
        { text: 'Suggest which holds to look at first', answer: 'AI helper can prepare it' },
        { text: 'Release a payment to a brand-new supplier bank account', answer: 'A person must review or approve' },
      ],
      explain: `<p>Reading, summarizing and prioritizing are great jobs for AI. Approvals, posting journals and releasing money stay with accountable people and the normal controls — exactly as Oracle’s governed agent designs route exceptions for human review.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Golden safety rules for AI at work',
      html: `<ul>
<li><strong>People stay responsible.</strong> If an AI helper prepares a journal or a payment, the person who submits or approves it owns it — exactly as if they typed it.</li>
<li><strong>Check the evidence, not just the answer.</strong> AI can sound sure and still be wrong. Open the invoice, the journal or the report behind the answer.</li>
<li><strong>Review the plan before it runs.</strong> Oracle’s Ledger Agentic Application lets you review and edit the planned steps before confirming. Use that.</li>
<li><strong>Keep the controls.</strong> Approvals, holds and separation of duties still apply. An agent should never be a shortcut around them.</li>
<li><strong>Mind the limits.</strong> Some assistants only support certain languages (one 26D assistant is English-only) or certain data. Read the feature notes.</li>
<li><strong>Protect data.</strong> Follow your company’s rules about what you type into any AI tool, and never share passwords or personal data you do not need to.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: start small and measure',
      html: `<p>Teams that succeed with AI pick <strong>one</strong> painful process (like emailed invoices), switch the helper on in the <strong>test</strong> environment, measure results for a few weeks (how many invoices needed no correction?), set clear review rules, and only then expand. Because new AI features arrive every quarter, the Readiness What’s New pages are the best place to see what just changed.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Artificial Intelligence (AI)', def: 'Computer systems that do tasks that normally need human thinking, such as reading documents or answering questions.' },
        { term: 'Generative AI', def: 'AI that creates new content, like a written summary or an answer in plain language.' },
        { term: 'AI agent', def: 'An AI helper that works toward a goal in several steps, using tools and data, within rules set by people.' },
        { term: 'Agentic application', def: 'A Fusion workspace where a team of AI agents and people work together on a whole business outcome, such as closing the Payables period.' },
        { term: 'AI Agent Studio', def: 'The tool inside Fusion for configuring Oracle’s agents and building, testing and deploying your own.' },
        { term: 'Intelligent Document Recognition (IDR)', def: 'The Payables feature that reads emailed invoice documents, creates invoices and learns from corrections.' },
        { term: 'Human in the loop', def: 'A design where a person reviews and approves what the AI suggests before it becomes final.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'The Ledger Agent suggests a correcting journal. What should Priya do?',
          options: ['Post it immediately — AI is always right', 'Check the evidence, review the journal and send it through normal approval', 'Delete it because AI is never allowed', 'Ask a supplier to approve it'],
          answer: 1,
          explain: 'AI can prepare and suggest, but people stay accountable. Priya verifies the evidence and uses the normal approval controls.',
        },
        {
          q: 'What does Intelligent Document Recognition (IDR) do?',
          options: ['Prints checks', 'Reads emailed invoice documents and creates Payables invoices, learning from corrections', 'Calculates depreciation', 'Builds the chart of accounts'],
          answer: 1,
          explain: 'IDR extracts invoice data from emailed documents, creates invoices in Payables and improves as users correct fields.',
        },
        {
          q: 'An invoice in the Scanned tile shows “Incomplete”. What does that mean?',
          options: ['It has been paid', 'Something was not recognized and needs a person’s attention', 'It was deleted', 'It is waiting for the bank'],
          answer: 1,
          explain: 'Incomplete means it needs attention; Ava can fix it in the Interactive Viewer. Not Validated means the expected fields were recognized.',
        },
        {
          q: 'What is AI Agent Studio mainly for?',
          options: ['Recording bank statements', 'Configuring Oracle’s predefined agents and building, testing and deploying your own', 'Designing printed checks', 'Running depreciation'],
          answer: 1,
          explain: 'AI Agent Studio is the design-time tool for agents and agent teams. It also replaces the older Digital Assistant templates.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Oracle AI for Fusion Applications', publisher: 'Oracle', url: 'https://www.oracle.com/applications/fusion-ai/' },
    { title: 'Oracle AI Agents Help Finance Leaders Accelerate Business Insights and Boost Efficiency (press release, Oct 15, 2025)', publisher: 'Oracle', url: 'https://www.oracle.com/news/announcement/ai-world-oracle-ai-agents-help-finance-leaders-accelerate-business-insights-and-boost-efficiency-2025-10-15/' },
    { title: 'AI Agent Studio for Oracle Fusion Cloud Applications (What’s New 25C)', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/common/25c/common25c/25C-common-wn-f38824.htm' },
    { title: 'How do I use AI Agent Studio?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/fusion-ai/aiaas/get-started.html' },
    { title: 'Financials What’s New 26D — Ledger Agentic Application', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51915.htm' },
    { title: 'Financials What’s New 26D — Payables Agent for invoice ingestion, compliance and control', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51289.htm' },
    { title: 'Financials What’s New 26D — Payables Period Close Workspace', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-f51249.htm' },
    { title: 'Financials What’s New 26D — IMPORTANT Actions and Considerations', publisher: 'Oracle Cloud Applications Readiness', url: 'https://docs.oracle.com/en/cloud/saas/readiness/erp/26d/fins26d/26D-fin-wn-t78536.htm' },
    { title: 'Intelligent Document Recognition (Using Payables Invoice to Pay, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/intelligent-document-recognition.html' },
  ],
};
