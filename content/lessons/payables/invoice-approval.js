export default {
  slug: 'invoice-approval',
  title: 'Invoice Approval: Getting a Thumbs-Up',
  minutes: 18,
  summary:
    'Invoice approval makes sure the right manager agrees to a bill before it is paid. Learn how Oracle Fusion’s invoice approval workflow builds a list of approvers from rules, how approvers respond, what each approval status means, and how AP handles exceptions like withdraw, hold, resubmit and force approve.',
  objectives: [
    'Explain why companies approve invoices and which invoices usually need approval',
    'Describe how the invoice approval workflow is enabled, started and routed',
    'Explain how approval rules are configured (BPM rules or the Manage Workflow Rules in Spreadsheet task)',
    'Use the approval actions (Initiate, Withdraw, Hold, Force approve, Resubmit) and read the approval statuses',
  ],
  blocks: [
    {
      type: 'kid',
      title: 'The permission slip',
      html: `<p>Before a school trip, the teacher sends home a <strong>permission slip</strong>. A parent must sign it before you can go. For a short walk to the park, maybe no slip is needed. For a big trip to the museum, the slip needs a parent <em>and</em> the head teacher.</p>
<p>Invoice approval is the company’s permission slip. Small, expected bills might be approved automatically. Bigger or unusual bills need a manager’s “yes” — and sometimes their boss’s too. <span class="hl">An invoice that needs approval can’t be paid until it gets it.</span></p>`,
    },
    {
      type: 'text',
      heading: 'Why approve invoices at all?',
      html: `<p>Validation checks that an invoice is <em>correct</em> (numbers add up, matches the PO, accounts are valid). <strong>Approval</strong> checks that it is <em>wanted</em>: that a responsible person agrees the company really owes this money.</p>
<p>For PO-matched invoices, the spending was usually approved already on the requisition and purchase order, so many companies let them skip invoice approval or approve them automatically. <strong>Non-PO invoices</strong> — electricity, rent, consultants, one-off repairs — have no earlier approval, so they normally go to a manager. Invoice approval is also a key control for auditors and for segregation of duties: the person who enters the invoice should not be the person who approves it.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: switching approval on',
      html: `<p>Approval is turned on per business unit on the <strong>Manage Invoice Options</strong> page, in the <strong>Approvals</strong> section:</p>
<ul>
<li><strong>Enable invoice approval</strong> – invoices go through the approval workflow and can’t be paid until approved.</li>
<li><strong>Require validation before approval</strong> – only invoices that passed validation are sent for approval, so approvers don’t waste time on broken invoices.</li>
<li><strong>Accounting Preference</strong> – <em>Account regardless of approval status</em>, <em>Require accounting before approval</em>, or <em>Require approval before accounting</em>.</li>
<li><strong>Allow force approval</strong> – lets authorized people approve an invoice manually, bypassing the workflow.</li>
</ul>`,
    },
    {
      type: 'flow',
      title: 'How an invoice travels through approval',
      steps: [
        { icon: '🧾', label: 'Enter', detail: 'The invoice is created by hand, spreadsheet, imaging, Supplier Portal or import.' },
        { icon: '✅', label: 'Validate', detail: 'If “Require validation before approval” is on, it must pass validation first.' },
        { icon: '🚀', label: 'Initiate', detail: 'Ava uses the Initiate action, or the scheduled Initiate Invoice Approval Workflow process picks it up. Status: Initiated.' },
        { icon: '🧠', label: 'Build approver list', detail: 'The workflow reads the approval rules and works out who must approve.' },
        { icon: '📬', label: 'Notify', detail: 'The first approvers get a notification (email and worklist).' },
        { icon: '👍', label: 'Respond', detail: 'Each approver approves or rejects; then the next approvers are notified.' },
        { icon: '🏁', label: 'Done', detail: 'When all approvals are complete, the status becomes Workflow approved and the invoice can be paid.' },
      ],
      note: `<p>If an approver rejects, the status becomes <em>Rejected</em>; AP fixes the issue (or cancels the invoice) and can <em>resubmit</em> it.</p>`,
    },
    {
      type: 'exercise',
      kind: 'order',
      title: 'Put the approval journey in order',
      instructions: `<p>Bright Power Utility’s $150 electricity bill needs Sam’s approval. Put the steps in the order they happen (approval requires validation first at Sunny).</p>`,
      items: [
        'Ava enters the invoice in Payables',
        'The invoice is validated',
        'Approval is initiated (status: Initiated)',
        'The workflow builds the approver list from the rules',
        'Sam receives a notification and approves',
        'The status becomes Workflow approved and the invoice can be paid',
      ],
      explain: `<p>Enter → validate → initiate → build approver list → notify and respond → approved. Because Sunny turned on <em>Require validation before approval</em>, validation comes before initiation.</p>`,
    },
    {
      type: 'text',
      heading: 'Who approves? The rules',
      html: `<p>The workflow decides who approves using <strong>approval rules</strong>. Out of the box, Oracle provides simple predefined rules:</p>
<ul>
<li>Invoices of <strong>1,000 or more</strong> must be approved by the <strong>immediate supervisor</strong> of the requester on the invoice.</li>
<li>Invoices <strong>under 1,000</strong> are <strong>approved automatically</strong>.</li>
</ul>
<p>Real companies change these. Rules can look at invoice header, line and distribution attributes — amount, business unit, supplier, invoice source, pay group, cost center, project, whether the invoice is matched to a PO — and route to different kinds of approvers:</p>
<ul>
<li>a <strong>supervisory hierarchy</strong> (the requester’s manager, then their manager, for a number of levels),</li>
<li>a <strong>job-level hierarchy</strong> (keep going up until someone with a high enough job level approves),</li>
<li>an <strong>approval group</strong> (for example the Finance approval group),</li>
<li>a specific role, such as the <strong>project manager</strong> or <strong>cost center manager</strong>,</li>
<li>or <strong>automatic approval</strong> or <strong>automatic rejection</strong>.</li>
</ul>`,
    },
    {
      type: 'exercise',
      kind: 'fill',
      title: 'Apply the predefined rules',
      instructions: `<p>Sunny still uses Oracle’s predefined invoice approval rules. Answer with <em>auto</em> (approved automatically) or <em>supervisor</em> (needs the requester’s immediate supervisor).</p>`,
      html: `<p>Bright Power Utility electricity bill, $150: {{}}<br>Stand Builders LLC repair bill, $1,000: {{}}<br>Sweet Sugar Co. invoice, $999.99: {{}}<br>Stand Builders LLC stand invoice, $6,000: {{}}</p>`,
      blanks: [
        { answer: ['auto', 'automatic', 'auto approved', 'automatically approved'] },
        { answer: ['supervisor', 'supervisor approval', 'immediate supervisor'], hint: 'The rule says “1,000 or more”.' },
        { answer: ['auto', 'automatic', 'auto approved', 'automatically approved'] },
        { answer: ['supervisor', 'supervisor approval', 'immediate supervisor'] },
      ],
      explain: `<p>The predefined rule sends invoices of <strong>1,000 or more</strong> to the requester’s immediate supervisor and auto-approves anything below 1,000. Watch the boundary: exactly $1,000 needs approval; $999.99 does not.</p>`,
    },
    {
      type: 'callout',
      variant: 'oracle',
      title: 'In Oracle Fusion: where the rules live',
      html: `<p>There are two ways to configure invoice approval rules:</p>
<ul>
<li><strong>Oracle BPM (Business Process Management) Worklist</strong> – the classic way. In Setup and Maintenance, the <strong>Manage Task Configuration for Financials</strong> task opens the routing rules and controls for the Payables invoice approval task.</li>
<li><strong>Simplified Workflow Rules Configuration</strong> – a spreadsheet-based alternative. On the <strong>Manage Workflow Rules in Spreadsheet</strong> page, download a template for the <em>Payables Invoice Approval</em> workflow (the <em>Invoice Approval Basic</em> template or <em>Sample templates 1–3</em>), write rules in organized <em>rule blocks</em>, generate a rule file and upload it. Each template has worksheets for <em>Instructions</em>, <em>Invoice Request Approval Rules</em>, <em>Invoice Approval Rules</em> and <em>Data Sets</em>. Existing BPM rules can be migrated into the spreadsheet.</li>
</ul>
<p>Careful: every successful spreadsheet upload <strong>replaces all existing rules</strong> for that workflow. Once you move to the spreadsheet method, Oracle recommends maintaining rules only that way. You can also set a <strong>Rule Evaluation Currency</strong> so amount conditions are compared in one currency.</p>`,
    },
    {
      type: 'exercise',
      kind: 'form',
      title: 'Practice screen: write Sunny’s approval rule',
      instructions: `<p>This is a simplified practice version of one rule row (not Oracle’s real template). Sam wants this policy: <em>“Any invoice that is NOT matched to a PO and is $500 or more must be approved by the requester’s manager, one level up.”</em> Fill in the rule.</p>`,
      formTitle: 'Invoice Approval Rule (practice)',
      fields: [
        { label: 'Workflow', given: 'Payables Invoice Approval' },
        { label: 'Rule block name', given: 'Non-PO invoices' },
        { label: 'Condition 1 – attribute', type: 'select', options: ['Invoice amount', 'Supplier name', 'Pay group', 'Invoice date'], answer: 'Invoice amount' },
        { label: 'Condition 1 – operator', type: 'select', options: ['less than', 'greater than or equal to', 'equal to'], answer: 'greater than or equal to' },
        { label: 'Condition 1 – value', type: 'number', answer: 500 },
        { label: 'Condition 2 – matched to a purchase order?', type: 'select', options: ['Yes', 'No'], answer: 'No' },
        { label: 'Approver type', type: 'select', options: ['Supervisory hierarchy', 'Approval group', 'Automatic approval', 'Automatic rejection'], answer: 'Supervisory hierarchy' },
        { label: 'Number of levels', type: 'number', answer: 1 },
      ],
      explain: `<p>The rule needs two conditions: amount <strong>greater than or equal to 500</strong> and <strong>not matched</strong> to a PO. “The requester’s manager, one level up” is a <strong>supervisory hierarchy</strong> with <strong>1</strong> level. Real Oracle templates use similar building blocks (conditions on header, line and distribution attributes plus an approval action), but with more options.</p>`,
    },
    {
      type: 'text',
      heading: 'What approvers can do',
      html: `<p>Approvers can respond from the <strong>email notification</strong>, the <strong>worklist</strong> (the Notifications page that lists their tasks), the <strong>Invoices landing page</strong> (Approvals infotile) or the <strong>Edit Invoice</strong> page. The main responses are <strong>Approve</strong> and <strong>Reject</strong> — for header-level invoice approval, they approve or reject the <em>whole</em> invoice.</p>
<p>Because invoice approval runs on Oracle’s common workflow engine, the standard workflow task actions are also available (depending on setup), such as:</p>
<ul>
<li><strong>Request Information</strong> – ask someone for more details; the task status becomes <em>Information Requested</em>.</li>
<li><strong>Delegate</strong> – let someone act for you while the task stays yours.</li>
<li><strong>Reassign</strong> – give the task to someone else; <strong>Escalate</strong> – send it to your manager.</li>
<li><strong>Push Back</strong> – send it back to the previous approver; <strong>Ad Hoc Route</strong> – add extra approvers.</li>
<li><strong>Claim</strong> – take a task that was sent to a group, so others know you’re handling it.</li>
</ul>
<p>Companies can also redesign the approval notification layout using Oracle Analytics Publisher reports (configurable workflow notifications).</p>`,
    },
    {
      type: 'table',
      caption: 'Approval actions AP can take (Edit Invoice and Manage Invoices pages)',
      headers: ['Action', 'What it does', 'Approval status afterwards'],
      rows: [
        ['<strong>Initiate</strong>', 'Starts the workflow and routes the invoice to approvers.', 'Required → <em>Initiated</em>'],
        ['<strong>Withdraw</strong>', 'Cancels the running workflow and its open notifications.', 'Initiated → <em>Withdrawn</em>'],
        ['<strong>Hold</strong>', 'Delays approval; it must be initiated later.', 'Required → <em>Held from approval</em>'],
        ['<strong>Force approve</strong>', 'Approves without the workflow, for example when payment is urgent. Needs the <em>Allow force approval</em> option and the Force Approve Payables Invoice privilege. Ends any running workflow and cancels pending notifications.', '<em>Manually approved</em>'],
        ['<strong>Resubmit</strong>', 'Sends it through approval again.', 'Allowed from Rejected, Withdrawn, Held from approval or Resubmit for approval — or from an approved status after a key change.'],
      ],
    },
    {
      type: 'exercise',
      kind: 'match',
      title: 'Match each approval status to its meaning',
      instructions: `<p>Choose the meaning of each invoice approval status.</p>`,
      pairs: [
        { left: 'Required', right: 'Approval is needed but has not started yet' },
        { left: 'Initiated', right: 'The workflow is running and approvers have been notified' },
        { left: 'Workflow approved', right: 'All approvers in the workflow have approved' },
        { left: 'Manually approved', right: 'Someone used Force approve instead of the workflow' },
        { left: 'Rejected', right: 'An approver said no; AP must fix or cancel, then resubmit' },
        { left: 'Held from approval', right: 'AP used the Hold action to delay approval' },
      ],
      explain: `<p>Both <strong>Workflow approved</strong> and <strong>Manually approved</strong> let the invoice be paid (if no holds remain). Every action — including force approval — is written to the invoice’s <strong>approval history</strong>, which auditors review.</p>`,
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'When an approved invoice must be approved again',
      html: `<p>If an invoice is already <em>Workflow approved</em> or <em>Manually approved</em> and someone changes something important — the <strong>invoice amount</strong>, a <strong>line amount</strong>, a <strong>distribution combination</strong>, the <strong>distribution set</strong>, the <strong>tax amount</strong>, or <strong>adds or cancels a line</strong> — it can be resubmitted for approval. Otherwise someone could get a $100 invoice approved and then change it to $10,000.</p>`,
    },
    {
      type: 'example',
      title: 'A week of approvals at Sunny',
      html: `<p>Jordan has configured Sunny’s rules: PO-matched invoices are approved automatically; non-PO invoices of $500 or more go to the requester’s manager; anything over $5,000 also needs Sam.</p>`,
      steps: [
        '<strong>Lemon Grove Farms, $500, matched to PO 2001.</strong> Ava initiates approval; the rules approve it automatically. Status: Workflow approved.',
        '<strong>Bright Power Utility, $150, no PO.</strong> Under $500, so it is approved automatically too.',
        '<strong>Landlord’s repair bill, $800, no PO, requested by Noah.</strong> It goes to Noah’s manager, who clicks <em>Request Information</em>: “Which room was repaired?” Noah answers, and the manager approves.',
        '<strong>Stand Builders LLC, $6,000 stand, no PO.</strong> It needs Noah’s manager and then Sam. Sam rejects it: “This should have had a purchase order.” Leo creates a PO, Ava matches the invoice to it and resubmits; now it is approved automatically.',
        '<strong>Urgent:</strong> Sweet Sugar Co. will stop deliveries unless paid today, but the approver is on holiday. Sam, who has the force approve privilege, uses <em>Force approve</em>. Status: Manually approved, recorded in the approval history.',
      ],
      result: `<p>Most invoices flowed through automatically. People only spent time on the risky ones — exactly what a good approval design aims for.</p>`,
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Skipping approval for trusted sources',
      html: `<p>Some invoices are already approved elsewhere — for example invoices imported from a trusted system. Oracle lets you <strong>exclude invoices imported from a specific source</strong> from approval by setting up the <code>AP_SKIP_SOA_APPROVAL</code> lookup. It can’t be used for invoices entered manually or created through the REST API. Similarly, invoices that suppliers enter in the Supplier Portal <em>without</em> a PO first go through <strong>invoice request approval</strong> by the requester before they become real invoices.</p>`,
    },
    {
      type: 'steps',
      title: 'Try it in Oracle: approve or initiate an invoice',
      items: [
        'As AP: open an invoice from <kbd>Payables</kbd> &gt; <kbd>Invoices</kbd> (for example from <kbd>Manage Invoices</kbd>).',
        'Check the approval status. If it is Required, open the invoice actions and choose the approval action <kbd>Initiate</kbd>.',
        'As an approver: open the notification from email or from the notifications/worklist, review the invoice (use <kbd>View Invoice</kbd>), and click <kbd>Approve</kbd> or <kbd>Reject</kbd> with a comment.',
        'Back on the invoice, review the approval history to see who approved and when.',
        'Optionally, check the Approvals infotile on the Invoices landing page for pending and rejected invoices.',
      ],
      note: `<p>Action menus and labels differ by release and by Redwood adoption. To see the invoice from a notification, approvers need privileges such as View Payables Invoice; without them they may see a blank page. Force approve only appears if the option is enabled and you have the privilege.</p>`,
    },
    {
      type: 'callout',
      variant: 'real',
      title: 'Real-world tip: chase approvals before the due date',
      html: `<p>Late approvals are a top cause of late payments and missed discounts. AP teams watch the Approvals infotile daily, set up reminders and escalations in the workflow, and ask managers to set up delegation before holidays. Use force approve rarely and only with proper authority — auditors will ask about every one.</p>`,
    },
    {
      type: 'terms',
      items: [
        { term: 'Invoice approval workflow', def: 'The Oracle process that routes invoices to the right approvers based on rules and records their responses.' },
        { term: 'Approval rule', def: 'A condition and action that decides who must approve an invoice, such as amount over 1,000 goes to the supervisor.' },
        { term: 'Initiate Invoice Approval Workflow', def: 'The scheduled process that starts approval for invoices that need it.' },
        { term: 'Force approve', def: 'Manually approving an invoice without the workflow, allowed only with the right option and privilege.' },
        { term: 'Worklist', def: 'The list of workflow tasks and notifications waiting for a user’s action.' },
        { term: 'Manage Workflow Rules in Spreadsheet', def: 'The page where approval rules are downloaded, edited in a spreadsheet template and uploaded.' },
      ],
    },
    {
      type: 'quiz',
      questions: [
        {
          q: 'With Oracle’s predefined rules, what happens to a $1,200 invoice?',
          options: ['Approved automatically', 'Sent to the immediate supervisor of the requester', 'Rejected automatically', 'Sent to the supplier'],
          answer: 1,
          explain: 'Invoices of 1,000 or more need the requester’s immediate supervisor; below 1,000 they are approved automatically.',
        },
        {
          q: 'Ava used Withdraw on an invoice that was Initiated. What is its approval status now?',
          options: ['Rejected', 'Withdrawn', 'Manually approved', 'Required'],
          answer: 1,
          explain: 'Withdraw cancels the running workflow and open notifications and sets the status to Withdrawn. It can be resubmitted later.',
        },
        {
          q: 'What two things are needed to force approve an invoice?',
          options: [
            'A PO and a receipt',
            'The Allow force approval option and the Force Approve Payables Invoice privilege',
            'Two approvers and a credit memo',
            'Nothing; anyone can force approve',
          ],
          answer: 1,
          explain: 'Force approval must be allowed on the Manage Invoice Options page and the user needs the force approve privilege.',
        },
        {
          q: 'Jordan uploads a new rule file on the Manage Workflow Rules in Spreadsheet page. What happens to the old rules?',
          options: ['They are kept and merged', 'They are replaced by the uploaded rules', 'They are emailed to Sam', 'Nothing happens until next year'],
          answer: 1,
          explain: 'Each successful upload overrides all existing rules for that workflow, so the spreadsheet must contain the complete rule set.',
        },
        {
          q: 'An invoice was Workflow approved for $100. Someone changes the amount to $10,000. What should happen?',
          options: ['Nothing; it stays approved forever', 'It can be resubmitted for approval because a key attribute changed', 'It is automatically paid', 'It becomes a prepayment'],
          answer: 1,
          explain: 'Changing the invoice amount, line amounts, distributions, tax or lines on an approved invoice allows (and should trigger) resubmitting it for approval.',
        },
      ],
    },
  ],
  sources: [
    { title: 'How Invoices Are Approved (Using Payables Invoice to Pay, 26D)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-invoices-are-approved.html' },
    { title: 'Considerations for Approval Actions', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/considerations-for-approval-actions.html' },
    { title: 'What happens if I force approve an invoice?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/what-happens-if-i-force-approve-an-invoice.html' },
    { title: 'Create Workflow Rules Using a Spreadsheet', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/create-workflow-rules-using-a-spreadsheet.html' },
    { title: 'How You Create Invoice Approval Rules Using a Spreadsheet', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/how-you-create-invoice-approval-rules-using-a-spreadsheet.html' },
    { title: 'Migrate Workflow Rules to Simplified Workflow Rules Configuration Templates', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/migrate-workflow-rules-to-simplified-workflow-rules.html' },
    { title: 'Exclude Approval for Invoices Imported from a Specific Source', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/exclude-approval-for-invoices-imported-from-a-specific-source.html' },
    { title: 'Guidelines For Invoice Options (Approvals section)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/faipp/guidelines-for-invoice-options.html' },
    { title: 'Payables Security (approval notification privileges)', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/payables-security.html' },
    { title: 'Actions and Statuses for Workflow Tasks', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/applications-common/26d/oacpr/actions-and-statuses-for-workflow-tasks.html' },
    { title: 'What’s a self-service invoice?', publisher: 'Oracle Help Center', url: 'https://docs.oracle.com/en/cloud/saas/financials/26d/fappp/what-s-a-self-service-invoice.html' },
  ],
};
