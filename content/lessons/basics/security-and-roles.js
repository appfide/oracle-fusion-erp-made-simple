export default {
  slug: 'security-and-roles',
  title: 'Who Can Do What: Users, Roles and Security',
  minutes: 17,
  summary:
    'Oracle Fusion uses role-based access control: users get job and abstract roles, which bundle duty roles and privileges (what you can do), plus data access by business unit or ledger (which records you can do it to). Learn the Security Console, predefined finance roles, data access sets and segregation of duties — and the habits that keep your own account safe.',
  objectives: [
    'Explain role-based access control and the difference between function security and data security',
    'Describe job, abstract and duty roles, aggregate privileges and privileges',
    'Explain how data access is given by business unit or by data access set for General Ledger',
    'Name common predefined finance job roles and what they are for',
    'Explain segregation of duties and good sign-in habits',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'Badges at the school',
      html: `<p>At school, everyone wears a badge. A <strong>student</strong> badge opens the classroom and the library. A <strong>cook</strong> badge opens the kitchen. A <strong>teacher</strong> badge opens the staff room <em>and</em> lets you mark homework — but only for <strong>your own class</strong>.</p>
<p>So a badge answers two questions:</p>
<ol>
<li><strong>What can you do?</strong> (mark homework, cook lunch)</li>
<li><strong>Whose stuff can you do it to?</strong> (only Class 4B's homework)</li>
</ol>
<p><span class="hl">Oracle Fusion security works exactly like this.</span> <strong>Roles</strong> say what you can do. <strong>Data access</strong> says which business unit's or ledger's records you can do it to.</p>`,
    },
    {
      type: 'text',
      heading: 'Users and role-based access control',
      html: `<p>Every person who signs in has a <strong>user account</strong>. Nobody is given permissions one by one. Instead, Oracle Fusion uses <strong>role-based access control (RBAC)</strong>: permissions are packed into <strong>roles</strong>, and roles are given to users. When Ava gets the Accounts Payable Specialist role, Ava inherits everything that role contains.</p>
<p>Security in Fusion has two halves:</p>
<ul>
<li><strong>Function security</strong> – which pages, tasks and actions you can use (for example "create a Payables invoice"). It's granted through <strong>function security privileges</strong>.</li>
<li><strong>Data security</strong> – which records you can see or change with those functions (for example "only invoices in Sunny US BU"). It's granted through <strong>data security policies</strong> and your <strong>data access</strong> assignments.</li>
</ul>
<p>You need both. A role without data access is like a teacher badge with no class: you can open the page but see nothing.</p>`,
    },
    {
      type: 'slides',
      title: 'The four kinds of roles',
      slides: [
        {
          icon: '👩‍💼',
          title: 'Job roles',
          html: `<p>Represent the <strong>jobs</strong> people do. Examples Oracle gives: <em>General Accountant</em> and <em>Accounts Receivable Manager</em>. These are the main roles you assign to finance users.</p>`,
        },
        {
          icon: '🙂',
          title: 'Abstract roles',
          html: `<p>Represent people <strong>regardless of their job</strong>, giving everyday self-service functions. Examples: <em>Employee</em>, <em>Line Manager</em> and <em>Enterprise Resource Planning Self Service User</em> (which lets people do things like create expense reports).</p>`,
        },
        {
          icon: '🧱',
          title: 'Duty roles',
          html: `<p>Building blocks: a bundle of privileges for one part of a job, like <em>Budget Review</em> or <em>Account Balance Review</em>. Job and abstract roles inherit duty roles. You <strong>never</strong> assign a duty role directly to a user.</p>`,
        },
        {
          icon: '🔩',
          title: 'Aggregate privileges',
          html: `<p>Predefined mini-roles that pair one function privilege with the data security policies it needs. You can include them in job and abstract roles, but you can't create, edit or copy them.</p>`,
        },
        {
          icon: '🌳',
          title: 'Role inheritance',
          html: `<p>Almost every role is a tree of other roles. A job role inherits duty roles and aggregate privileges, which contain privileges. Users get everything in the tree. The Security Console can draw this tree for you.</p>`,
        },
      ],
    },
    {
      type: 'table',
      caption: 'Common predefined finance job roles (names from Oracle’s Securing ERP guide)',
      headers: ['Job role', 'What it is for', 'At Sunny'],
      rows: [
        ['<strong>Accounts Payable Specialist</strong>', 'Enters and processes supplier invoices and related tasks.', 'Ava'],
        ['<strong>Accounts Payable Supervisor</strong>', 'Oversees payables processing, invoices and payments.', 'Ava’s future team lead'],
        ['<strong>Accounts Payable Manager</strong>', 'Manages the payables department, including payments and approvals.', '—'],
        ['<strong>Accounts Receivable Specialist</strong> / <strong>Manager</strong>', 'Process and manage customer transactions and receipts.', 'Omar (Specialist)'],
        ['<strong>General Accountant</strong>', 'Records journals and reviews balances in General Ledger.', 'Priya'],
        ['<strong>General Accounting Manager</strong>', 'Manages the general accounting team and close.', '—'],
        ['<strong>Cash Manager</strong>', 'Manages bank accounts, statements and reconciliation.', 'Mia'],
        ['<strong>Buyer</strong>', 'Handles purchasing transactions in Procurement.', 'Leo'],
        ['<strong>Financial Analyst</strong>', 'Analyzes and reports on financial data.', 'Sam (read-only)'],
        ['<strong>Financial Application Administrator</strong>', 'Maintains financial setup and reference data after go-live.', 'Jordan (after go-live)'],
        ['<strong>IT Security Manager</strong>', 'Uses the Security Console to manage users, roles and security.', 'Jordan (during implementation)'],
      ],
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'What kind of role is it?',
      instructions: `<p>Sort these Oracle role names into the right role type.</p>`,
      categories: ['Job role', 'Abstract role', 'Duty role'],
      items: [
        { text: 'General Accountant', answer: 'Job role' },
        { text: 'Accounts Payable Specialist', answer: 'Job role' },
        { text: 'Cash Manager', answer: 'Job role' },
        { text: 'Employee', answer: 'Abstract role' },
        { text: 'Enterprise Resource Planning Self Service User', answer: 'Abstract role' },
        { text: 'Budget Review', answer: 'Duty role' },
        { text: 'Account Balance Review', answer: 'Duty role' },
      ],
      explain: `<p><strong>Job roles</strong> match jobs (General Accountant, AP Specialist, Cash Manager). <strong>Abstract roles</strong> describe a person regardless of job (Employee, ERP Self Service User). <strong>Duty roles</strong> like Budget Review are building blocks inside job roles and are never assigned directly to users.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: the Security Console',
      html: `<p>The <strong>Security Console</strong> is the main tool for security administrators. You need the <strong>IT Security Manager</strong> role to use it. There you can:</p>
<ul>
<li><strong>Roles</strong> – create, copy, edit and compare roles, and see a visual map of a role's hierarchy.</li>
<li><strong>Users</strong> – create user accounts, assign roles, lock accounts and reset passwords.</li>
<li><strong>Analytics</strong> – review role statistics and which users and roles touch which data.</li>
<li><strong>Administration</strong> – rules for user names, password policies and notification templates.</li>
</ul>
<p>Predefined roles have codes starting with <code>ORA_</code>, for example <code>ORA_AP_ACCOUNTS_PAYABLE_MANAGER_JOB</code>. You can't edit them; to change one, you <strong>copy</strong> it and edit the copy. Roles can also be given automatically with <strong>role provisioning rules</strong> based on a person's job, department or location.</p>`,
    },
    {
      type: 'text',
      heading: 'Data access: which business unit, which ledger',
      html: `<p>Oracle describes giving data access as a three-step process:</p>
<ol>
<li><strong>Create the user</strong> (in the Security Console or with the Manage Users task).</li>
<li><strong>Assign job roles</strong>.</li>
<li><strong>Assign data access</strong> for each job role, using the <em>Manage Data Access for Users</em> task in Setup and Maintenance.</li>
</ol>
<p>Each data assignment pairs a <strong>role</strong> with a <strong>security context</strong> and a value. For Payables and Receivables roles, the context is usually <strong>Business Unit</strong>. For General Ledger roles, it's a <strong>Data Access Set</strong>. Data can also be provisioned automatically with <strong>data provisioning rules</strong>.</p>
<p>A <strong>data access set</strong> controls which ledgers — or which parts of a ledger, identified by primary balancing segment values (companies) — a GL user can reach, and whether access is <strong>read only</strong> or <strong>read and write</strong>. When a ledger is created, Oracle automatically creates a data access set for it with full read and write access. Finer still, <strong>segment value security</strong> rules can restrict access to particular values of any chart of accounts segment, such as certain cost centers.</p>`,
    },
    {
      type: 'table',
      caption: 'Sunny’s data access assignments',
      headers: ['User', 'Role', 'Security context', 'Value'],
      rows: [
        ['Ava', 'Accounts Payable Specialist', 'Business Unit', 'Sunny US BU'],
        ['Omar', 'Accounts Receivable Specialist', 'Business Unit', 'Sunny US BU'],
        ['Priya', 'General Accountant', 'Data Access Set', 'Sunny US Ledger (read and write)'],
        ['Sam', 'Financial Analyst', 'Data Access Set', 'A set covering both ledgers, read only'],
      ],
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice: give Omar and Priya their data access',
      instructions: `<p>This is a simplified practice screen, not Oracle's page. Fill in two data access assignments: Omar needs Receivables data for the US business unit, and Priya needs to post journals in the US ledger.</p>`,
      formTitle: 'Data Access for Users (practice)',
      fields: [
        { label: 'Assignment 1 – User', given: 'Omar' },
        { label: 'Assignment 1 – Role', type: 'select', options: ['Accounts Receivable Specialist', 'General Accountant', 'Employee'], answer: 'Accounts Receivable Specialist' },
        { label: 'Assignment 1 – Security context', type: 'select', options: ['Business Unit', 'Data Access Set'], answer: 'Business Unit' },
        { label: 'Assignment 1 – Value', type: 'select', options: ['Sunny US BU', 'Sunny UK BU', 'Sunny US Ledger'], answer: 'Sunny US BU' },
        { label: 'Assignment 2 – User', given: 'Priya' },
        { label: 'Assignment 2 – Role', type: 'select', options: ['Accounts Receivable Specialist', 'General Accountant', 'Employee'], answer: 'General Accountant' },
        { label: 'Assignment 2 – Security context', type: 'select', options: ['Business Unit', 'Data Access Set'], answer: 'Data Access Set' },
        { label: 'Assignment 2 – Access level', type: 'select', options: ['Read only', 'Read and write'], answer: 'Read and write' },
      ],
      explain: `<p>Receivables and Payables roles are usually secured by <strong>Business Unit</strong>, so Omar gets Sunny US BU. General Ledger roles are secured by a <strong>Data Access Set</strong>; Priya must post journals, so Priya needs <strong>read and write</strong> access to Sunny US Ledger. Sam, who only reviews, would get read-only access.</p>`,
    },
    {
      type: 'example',
      title: 'Why Ava can’t see the UK invoices',
      html: `<p>Sunny's UK team asks Ava to look at a Cup &amp; Straw Supply invoice entered in Sunny UK BU. Ava searches in the Invoices work area… and finds nothing.</p>`,
      steps: [
        'Ava has the <strong>Accounts Payable Specialist</strong> job role, so Ava <em>can</em> open the Invoices work area (function security ✔).',
        'Ava’s data access is <strong>Business Unit = Sunny US BU</strong> only, so UK invoices are invisible to Ava (data security ✖).',
        'Sam agrees Ava should help the UK. Jordan adds a second assignment: Accounts Payable Specialist, Business Unit, <strong>Sunny UK BU</strong>.',
        'Ava searches again and now sees invoices from both business units.',
      ],
      result: `<p>Same role, more data. Most "I can't see it" problems in Fusion are missing data access, not missing roles.</p>`,
    },
    {
      type: 'text',
      heading: 'Segregation of duties (SoD)',
      html: `<p><strong>Segregation of duties</strong> (Oracle often writes <em>separation of duties</em>) means splitting a risky process so that no single person can do every step alone. If one person could create a supplier, enter an invoice, approve it <em>and</em> pay it, they could pay themselves without anyone noticing.</p>
<p>Oracle's Financials guidance gives exactly this kind of example: having both the <em>Create Payments</em> and <em>Approve Invoice</em> privileges might be considered a conflict. The predefined Accounts Payable Manager role can force-approve invoices and create payments, so some companies copy that role and remove force-approval. Companies that need automated checks can use <strong>Advanced Controls</strong> in Oracle Risk Management to detect SoD conflicts and risky access.</p>`,
    },
    {
      type: 'flow',
      title: 'Splitting the lemon invoice so no one does it all',
      steps: [
        { icon: '🛒', label: 'Order', detail: 'Leo (Buyer) creates the purchase order for lemons.' },
        { icon: '📦', label: 'Receive', detail: 'Noah confirms the lemons arrived.' },
        { icon: '🧾', label: 'Invoice', detail: 'Ava (AP Specialist) enters the $500 invoice.' },
        { icon: '👍', label: 'Approve', detail: 'Sam approves it through workflow.' },
        { icon: '🏦', label: 'Pay', detail: 'A payment run is reviewed before money leaves Big River Bank.' },
      ],
      note: `<p>Five steps, several people. Each person can check the step before theirs.</p>`,
    },
    {
      type: 'exercise',
      kind: 'classify',
      title: 'Spot the segregation of duties risk',
      instructions: `<p>For each pair of things one person can do, decide whether it is usually fine or a segregation of duties (SoD) concern.</p>`,
      categories: ['Usually fine', 'SoD concern'],
      items: [
        { text: 'Enter supplier invoices and view Payables reports', answer: 'Usually fine' },
        { text: 'Approve invoices and create payments', answer: 'SoD concern' },
        { text: 'Create a new supplier and pay that supplier', answer: 'SoD concern' },
        { text: 'Create your own expense report and view your own expense history', answer: 'Usually fine' },
        { text: 'Record bank receipts and reconcile the same bank account with no review', answer: 'SoD concern' },
      ],
      explain: `<p>SoD splits <strong>recording, approving, paying and reconciling</strong> so one person can't both create and hide a problem. Approving and paying, creating a supplier and paying it, or recording and reconciling cash alone are classic risks. Viewing reports or handling your own self-service items is normal.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Least privilege',
      html: `<p>Give people the <strong>smallest</strong> set of roles and data they need, and remove access when they change jobs. Oracle specifically warns against giving powerful roles such as Application Implementation Consultant to anyone except temporarily, and against building one giant role that includes everything for everybody.</p>`,
    },
    {
      type: 'callout',
      variant: 'warning',
      title: 'Your own account: good habits',
      html: `<ul>
<li><strong>Never share</strong> your user name, password or MFA codes — not even with your manager or "IT support" on the phone. Everything you do in Fusion is recorded under your name.</li>
<li>Use your company's <strong>single sign-on</strong> if it has one, and set up <strong>multifactor authentication</strong> (for example the Oracle Mobile Authenticator app or a passkey) when asked.</li>
<li>If your company doesn't use SSO, change your password through <kbd>Set Preferences</kbd> or the <kbd>Forgot Password</kbd> link — never by emailing it to someone.</li>
<li><strong>Sign out</strong> when you leave a shared computer, and lock your screen.</li>
<li>If you suddenly see data you shouldn't (another company's payroll, say), tell your security administrator. Too much access is a problem too.</li>
</ul>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip',
      html: `<p>Auditors regularly ask finance teams for <strong>user access reviews</strong>: a list of who has which roles and data access, signed off by managers. The Security Console's analytics and Oracle's security reports make this easier. If you become a supervisor, expect to review your team's access a few times a year.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Role-based access control', def: 'Granting permissions by assigning roles to users instead of giving each permission one by one.' },
        { term: 'Job role', def: 'A role that represents a job, such as Accounts Payable Specialist or General Accountant.' },
        { term: 'Abstract role', def: 'A role that represents a person regardless of job, such as Employee, giving self-service access.' },
        { term: 'Duty role', def: 'A bundle of privileges for part of a job, inherited by job or abstract roles and never assigned directly to users.' },
        { term: 'Privilege', def: 'Permission to perform a specific function or to act on specific data.' },
        { term: 'Data access set', def: 'A General Ledger security object that grants read-only or read and write access to ledgers or to companies within them.' },
        { term: 'Security Console', def: 'The tool where security administrators manage users, roles and security settings.' },
        { term: 'Segregation of duties', def: 'Splitting a process among different people so that no one person can complete a risky process alone.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'Ava has the Accounts Payable Specialist role but sees no invoices in the Invoices work area. What is the most likely cause?',
          options: [
            'The browser is too old',
            'Ava has no data access assigned for a business unit',
            'Duty roles are missing from Ava’s user account',
            'The ledger is closed',
          ],
          answer: 1,
          explain: 'The role lets Ava open the page (function security), but data access to a business unit decides which invoices Ava can see (data security).',
        },
        {
          q: 'Which kind of role is NEVER assigned directly to a user?',
          options: ['Job role', 'Abstract role', 'Duty role', 'Any role can be assigned directly'],
          answer: 2,
          explain: 'Duty roles are building blocks inherited by job and abstract roles. Oracle says you don’t assign duty roles directly to users.',
        },
        {
          q: 'Priya should be able to post journals for Sunny Lemonade US Inc. only. What gives Priya that data access in General Ledger?',
          options: [
            'A business unit assignment for Sunny UK BU',
            'A data access set for Sunny US Ledger (or company 101) with read and write access',
            'The Employee abstract role',
            'A lookup type',
          ],
          answer: 1,
          explain: 'General Ledger roles are paired with data access sets, which grant read-only or read and write access to ledgers or primary balancing segment values.',
        },
        {
          q: 'Which combination is a classic segregation of duties concern?',
          options: [
            'Viewing reports and setting language preferences',
            'Approving invoices and creating payments',
            'Creating expense reports and viewing your own payslip',
            'Searching suppliers and adding favorites',
          ],
          answer: 1,
          explain: 'If one person can both approve invoices and create payments, they could pay an invoice no one else checked. Oracle uses this as an SoD example.',
        },
        {
          q: 'Who can use the Security Console to create users and assign roles?',
          options: ['Anyone with a user account', 'Users with the IT Security Manager role', 'Only Oracle employees', 'Users with the Employee role'],
          answer: 1,
          explain: 'Oracle states that the IT Security Manager role is required to use the Security Console.',
        },
      ],
    },
  ],
  sources: [
    { title: 'Securing ERP – Role Types (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faser/role-types.html' },
    { title: 'Securing ERP – Overview of Security Console (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faser/overview-of-security-console.html' },
    { title: 'Securing ERP – Overview of Data Access Set Security (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faser/overview-of-data-access-set-security.html' },
    { title: 'Securing ERP (full guide, PDF, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faser/securing-erp.pdf' },
    { title: 'Getting Started with Your Financials Implementation – Overview of Implementing Financials Security (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/facsf/overview-of-implementing-financials-security.html' },
    { title: 'Understanding Enterprise Structures – Business Units (business unit security) (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/faesc/business-units.html' },
    { title: 'Using Common Features – Sign In and Get Started (SSO, password, MFA) (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/sign-in-and-get-started.html' },
    { title: 'Using Functional Setup Manager – security access guidance (26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oafsm/index.html' },
  ],
};
