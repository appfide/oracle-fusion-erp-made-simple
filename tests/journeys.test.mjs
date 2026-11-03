/**
 * End-to-end learner journeys in a real browser: what a learner clicks, types and expects.
 *  - every quiz can be passed with its answer key and failed with wrong answers;
 *  - every hands-on exercise accepts its own revealed answer (catches broken answer keys);
 *  - completing lessons, step-by-step navigation, settings, search, glossary,
 *    export/import/reset of progress, the certificate, and every practice lab.
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { SKIP as skip, STORAGE_KEY, serve, launch, allRoutes, sleep } from './helpers/chrome.mjs';

let server, b, curriculum;
before(async () => {
  if (skip) return;
  ({ curriculum } = await allRoutes());
  server = await serve();
  b = await launch();
});
after(async () => { await b?.close(); await server?.close(); });

function assertClean(where) {
  const found = b.take();
  assert.deepEqual(found, [], `${where}: ${found.join('\n')}`);
}
/** Start from a clean browser state (optionally with saved progress) on a page. */
async function fresh(state, hash = '#/') {
  await b.open(`${server.url}/index.html#/__blank`);
  await b.evaluate(`localStorage.clear(), ${state ? `localStorage.setItem('${STORAGE_KEY}', ${JSON.stringify(JSON.stringify(state))})` : 0}, true`);
  await b.open(`${server.url}/index.html${hash}`);
  await b.waitFor(`document.body.dataset.route && document.querySelector('main h1, main .step-title')`, hash);
  b.take();
}
const saved = () => b.evaluate(`JSON.parse(localStorage.getItem('${STORAGE_KEY}') || '{}')`);
const lessons = () => curriculum.flatMap((m) => m.lessons.map((l) => ({ id: `${m.id}/${l.slug}`, hash: `#/lesson/${m.id}/${l.slug}`, title: l.title })));
/** Click the button in main whose text matches. */
const click = (text, scope = 'main') => b.evaluate(`(() => {
  const el = [...document.querySelectorAll(${JSON.stringify(`${scope} button, ${scope} a.btn, ${scope} label.btn`)})].find((x) => !x.hidden && x.textContent.trim().includes(${JSON.stringify(text)}));
  if (!el) throw new Error('no button: ' + ${JSON.stringify(text)});
  el.click(); return true;
})()`);
/** Type into an input like a user: set the value and fire input events. */
const type = (selector, value) => b.evaluate(`(() => {
  const el = document.querySelector(${JSON.stringify(selector)});
  el.focus(); el.value = ${JSON.stringify(value)}; el.dispatchEvent(new Event('input', { bubbles: true })); return true;
})()`);

test('every quiz passes with its answer key, fails with wrong answers, and completes the lesson', { skip, timeout: 600000 }, async () => {
  await fresh({ completed: {}, settings: { layout: 'page' } });
  let quizzes = 0;
  for (const l of lessons()) {
    await b.visit(l.hash);
    const r = await b.evaluate(`(async () => {
      const lesson = (await import('./content/lessons/${l.id}.js')).default;
      const quiz = lesson.blocks.find((x) => x.type === 'quiz');
      if (!quiz) return { none: true };
      const form = document.querySelector('form.quiz-form');
      const qs = [...form.querySelectorAll('.quiz-q')];
      if (qs.length !== quiz.questions.length) return { error: 'rendered ' + qs.length + ' of ' + quiz.questions.length + ' questions' };
      const bad = quiz.questions.findIndex((q) => !Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length || new Set(q.options).size !== q.options.length);
      if (bad >= 0) return { error: 'question ' + (bad + 1) + ' has an invalid answer key or duplicate options' };
      const result = form.querySelector('.quiz-result');
      // 1. Submitting with nothing answered asks for answers and records nothing.
      form.requestSubmit();
      const warned = result.className.includes('warn');
      // 2. All wrong: fails, lesson stays incomplete.
      qs.forEach((f, i) => f.querySelector('input[value="' + ((quiz.questions[i].answer + 1) % quiz.questions[i].options.length) + '"]').click());
      form.requestSubmit();
      const failed = result.className.includes('fail') && result.textContent.includes('scored 0 out of');
      const completeAfterFail = document.querySelector('.complete-box').className.includes('is-done');
      // 3. Try again, answer key: passes and completes the lesson.
      [...form.querySelectorAll('button')].find((x) => x.textContent.includes('Try again')).click();
      const reset = !form.querySelector('input:checked') && !form.querySelector('input:disabled');
      qs.forEach((f, i) => f.querySelector('input[value="' + quiz.questions[i].answer + '"]').click());
      form.requestSubmit();
      return { warned, failed, completeAfterFail, reset, passed: result.className.includes('pass'), text: result.textContent,
        completeAfterPass: document.querySelector('.complete-box').className.includes('is-done'), questions: qs.length };
    })()`);
    if (r.none) continue;
    quizzes++;
    assert.equal(r.error, undefined, `${l.hash}: ${r.error}`);
    assert.ok(r.warned, `${l.hash}: submitting an empty quiz was not refused`);
    assert.ok(r.failed, `${l.hash}: all-wrong answers did not fail with a score of 0`);
    assert.equal(r.completeAfterFail, false, `${l.hash}: failing the quiz completed the lesson`);
    assert.ok(r.reset, `${l.hash}: "Try again" did not clear the quiz`);
    assert.ok(r.passed, `${l.hash}: the answer key did not pass: ${r.text}`);
    assert.match(r.text, new RegExp(`${r.questions} out of ${r.questions} \\(100%\\)`));
    assert.ok(r.completeAfterPass, `${l.hash}: passing the quiz did not complete the lesson`);
    const st = await saved();
    assert.ok(st.completed[l.id], `${l.hash}: completion not saved`);
    assert.equal(st.quizzes[l.id].best, r.questions);
    assert.equal(st.quizzes[l.id].attempts, 2);
    assertClean(l.hash);
  }
  assert.equal(quizzes, lessons().length, 'every lesson should end with a quiz');
});

test('every hands-on exercise accepts its own revealed answer', { skip, timeout: 900000 }, async () => {
  await fresh({ completed: {}, settings: { layout: 'page' } });
  let total = 0;
  const kinds = {};
  for (const l of lessons()) {
    await b.visit(l.hash);
    const results = await b.evaluate(`(async () => {
      const out = [];
      const sections = [...document.querySelectorAll('main .blk-exercise')];
      for (const [i, sec] of sections.entries()) {
        const btn = (t) => [...sec.querySelectorAll('.ex-actions button')].find((x) => x.textContent.trim() === t);
        const fb = sec.querySelector('.ex-feedback');
        const kicker = sec.querySelector('.ex-kicker').textContent;
        btn('Check').click();
        const emptyOk = fb.className.includes(' ok');
        btn('Check').click();
        const reveal = btn('Show answer');
        if (emptyOk) { out.push({ i, kicker, emptyOk }); continue; }
        if (!reveal || reveal.hidden) { out.push({ i, kicker, error: 'no "Show answer" after two wrong tries' }); continue; }
        reveal.click();
        btn('Check').click();
        const ok = fb.className.includes(' ok');
        const doneBadge = !sec.querySelector('.pill.done').hidden;
        const explain = sec.querySelector('.ex-explain');
        out.push({ i, kicker, ok, doneBadge, message: fb.textContent, explainShown: !explain || !explain.hidden });
        btn('Reset').click();
        out[out.length - 1].resetClears = !fb.textContent;
      }
      return out;
    })()`);
    for (const r of results) {
      total++;
      const kind = r.kicker.split('·').pop().trim();
      kinds[kind] = (kinds[kind] || 0) + 1;
      const where = `${l.hash} exercise ${r.i + 1} (${r.kicker})`;
      assert.equal(r.error, undefined, `${where}: ${r.error}`);
      if (r.emptyOk) {
        // Only an "order" exercise can be right before the learner does anything (lucky shuffle).
        assert.match(r.kicker, /order|sequence/i, `${where}: accepted an empty answer`);
        continue;
      }
      assert.ok(r.ok, `${where}: its own answer is marked wrong: ${r.message}`);
      assert.ok(r.doneBadge, `${where}: no "Done" badge after a correct answer`);
      assert.ok(r.explainShown, `${where}: explanation not shown after a correct answer`);
      assert.ok(r.resetClears, `${where}: Reset did not clear the feedback`);
    }
    // Solved exercises are saved.
    const st = await saved();
    const solved = Object.keys(st.exercises || {}).filter((k) => k.startsWith(`${l.id}#`)).length;
    assert.ok(solved >= results.filter((r) => r.ok).length, `${l.hash}: solved exercises not saved`);
    assertClean(l.hash);
  }
  assert.ok(total >= 200, `only ${total} exercises found`);
  assert.ok(Object.keys(kinds).length >= 4, `exercise kinds covered: ${JSON.stringify(kinds)}`);
});

test('marking lessons complete updates the lesson, module, progress bar and home page', { skip, timeout: 60000 }, async () => {
  await fresh({ completed: {}, settings: { layout: 'page' } });
  const [first, second] = lessons();
  await b.visit(first.hash);
  await click('Mark lesson complete');
  await b.waitFor(`document.querySelector('.complete-box.is-done')`, 'completion');
  assert.equal(await b.evaluate(`document.querySelector('#top-progress-text').textContent`), `1/${lessons().length}`);
  assert.equal(await b.evaluate(`document.querySelector('#top-progress').getAttribute('aria-valuenow')`), String(Math.round(100 / lessons().length)));
  assert.ok((await saved()).completed[first.id]);
  await click('Mark as not complete');
  await b.waitFor(`!document.querySelector('.complete-box.is-done')`, 'un-complete');
  assert.equal((await saved()).completed[first.id], undefined);
  await click('Mark lesson complete');
  await b.visit(second.hash);
  await click('Mark lesson complete');
  await b.visit(`#/module/${first.id.split('/')[0]}`);
  assert.equal(await b.evaluate(`document.querySelectorAll('.lesson-row.done').length`), 2);
  await b.visit('#/');
  // The "continue" call to action points at the next unfinished lesson.
  const next = lessons()[2];
  assert.ok(await b.evaluate(`!![...document.querySelectorAll('main a')].find((a) => a.getAttribute('href') === ${JSON.stringify(next.hash)})`), 'home page does not offer the next lesson');
  assertClean('completion');
});

test('step-by-step lessons: next, back, step list, resume and finish', { skip, timeout: 120000 }, async () => {
  await fresh();
  const l = lessons()[0];
  await b.visit(l.hash);
  const steps = await b.evaluate(`document.querySelectorAll('.step-side .step-link').length`);
  assert.ok(steps >= 3, `only ${steps} steps`);
  for (let i = 1; i < steps; i++) {
    assert.equal(await b.evaluate(`document.querySelector('.step-count small').textContent`), `${i} / ${steps}`);
    await b.evaluate(`document.querySelector('.step-next').click(), true`);
    await b.waitFor(`document.querySelector('article.codelab-step')?.dataset.step === '${i}'`, `step ${i + 1}`);
    assert.equal(await b.evaluate('location.hash'), `${l.hash}?step=${i + 1}`);
    assertClean(`step ${i + 1}`);
  }
  assert.match(await b.evaluate(`document.querySelector('.step-title').textContent`), /Wrap-up/);
  assert.equal(await b.evaluate(`document.querySelector('.step-next').textContent.trim()`), 'Next lesson');
  await b.evaluate(`document.querySelector('.step-back').click(), true`);
  await b.waitFor(`document.querySelector('article.codelab-step')?.dataset.step === '${steps - 2}'`, 'back');
  // Done steps are ticked; the furthest step is remembered.
  assert.ok(await b.evaluate(`document.querySelectorAll('.step-side .step-link.is-done').length`) >= steps - 2);
  // Coming back to the lesson resumes where the learner left off.
  await b.visit('#/');
  await b.visit(l.hash);
  assert.equal(await b.evaluate(`document.querySelector('article.codelab-step').dataset.step`), String(steps - 2));
  // The step list jumps straight to a step.
  await b.evaluate(`document.querySelectorAll('.step-side .step-link')[1].click(), true`);
  await b.waitFor(`document.querySelector('article.codelab-step')?.dataset.step === '1'`, 'jump to step 2');
  // The last lesson's last step leads to the certificate.
  const last = lessons().at(-1);
  await b.visit(`${last.hash}?step=999`);
  assert.equal(await b.evaluate(`document.querySelector('.step-next').getAttribute('href')`), '#/certificate');
  assert.equal(await b.evaluate(`document.querySelector('.step-next').textContent.trim()`), 'Finish');
  assertClean('steps');
});

test('settings change the page immediately and are remembered', { skip, timeout: 60000 }, async () => {
  await fresh(null, '#/settings');
  const radio = (name, value) => b.evaluate(`(document.querySelector('input[name="${name}"][value="${value}"]').click(), true)`);
  await radio('theme', 'dark');
  assert.equal(await b.evaluate(`document.documentElement.getAttribute('data-theme')`), 'dark');
  await radio('textSize', 'xl');
  assert.equal(await b.evaluate(`document.documentElement.dataset.textSize`), 'xl');
  const before = await b.evaluate(`parseFloat(getComputedStyle(document.querySelector('main p')).fontSize)`);
  await radio('textSize', 's');
  assert.ok(before > await b.evaluate(`parseFloat(getComputedStyle(document.querySelector('main p')).fontSize)`), 'text size did not change the font size');
  await radio('textSize', 'xl');
  await b.evaluate(`(document.querySelector('.settings label.check input').click(), true)`); // reduce motion
  assert.ok(await b.evaluate(`document.documentElement.classList.contains('reduce-motion')`));
  await radio('layout', 'page');
  await radio('passMark', '100');
  // The header button flips the theme.
  await b.evaluate(`document.querySelector('#theme-toggle').click(), true`);
  assert.equal(await b.evaluate(`document.documentElement.getAttribute('data-theme')`), 'light');
  assert.equal(await b.evaluate(`document.querySelector('#theme-toggle').getAttribute('aria-label')`), 'Switch to dark theme');
  await b.evaluate(`document.querySelector('#theme-toggle').click(), true`);
  // Everything survives a reload, and the theme is applied before the app starts (no flash).
  await b.open(`${server.url}/index.html#/settings`);
  await b.waitFor(`document.querySelector('main h1')`, 'settings');
  const st = await saved();
  assert.deepEqual(st.settings, { theme: 'dark', textSize: 'xl', reduceMotion: true, autoComplete: true, passMark: 100, layout: 'page' });
  assert.equal(await b.evaluate(`document.querySelector('input[name="theme"]:checked').value`), 'dark');
  assert.equal(await b.evaluate(`document.querySelector('input[name="passMark"]:checked').value`), '100');
  // Pass mark 100%: one wrong answer now fails the quiz.
  const l = lessons()[0];
  await b.visit(l.hash);
  const r = await b.evaluate(`(async () => {
    const quiz = (await import('./content/lessons/${l.id}.js')).default.blocks.find((x) => x.type === 'quiz');
    const form = document.querySelector('form.quiz-form');
    [...form.querySelectorAll('.quiz-q')].forEach((f, i) => f.querySelector('input[value="' + (i ? quiz.questions[i].answer : (quiz.questions[i].answer + 1) % quiz.questions[i].options.length) + '"]').click());
    form.requestSubmit();
    return form.querySelector('.quiz-result').className;
  })()`);
  assert.match(r, /fail/, 'pass mark 100% still passed a quiz with a wrong answer');
  // Turning auto-complete off: passing does not complete the lesson.
  await b.visit('#/settings');
  await b.evaluate(`([...document.querySelectorAll('.settings label.check')].find((x) => x.textContent.includes('automatically')).querySelector('input').click(), true)`);
  await b.visit(lessons()[1].hash);
  await b.evaluate(`(async () => {
    const quiz = (await import('./content/lessons/${lessons()[1].id}.js')).default.blocks.find((x) => x.type === 'quiz');
    const form = document.querySelector('form.quiz-form');
    [...form.querySelectorAll('.quiz-q')].forEach((f, i) => f.querySelector('input[value="' + quiz.questions[i].answer + '"]').click());
    form.requestSubmit(); return true;
  })()`);
  assert.equal((await saved()).completed[lessons()[1].id], undefined, 'auto-complete off still completed the lesson');
  assertClean('settings');
});

test('search finds lessons, highlights words, updates the URL and treats input as text', { skip, timeout: 60000 }, async () => {
  await fresh(null, '#/search');
  assert.equal(await b.evaluate(`document.activeElement?.type`), 'search', 'search box is not focused');
  await type('main input[type=search]', 'invoice');
  await b.waitFor(`/^[1-9]\\d* lessons? found/.test(document.querySelector('.search-results p')?.textContent)`, 'results');
  const hits = await b.evaluate(`document.querySelectorAll('.search-hit').length`);
  assert.ok(hits >= 5, `only ${hits} results for "invoice"`);
  assert.ok(await b.evaluate(`[...document.querySelectorAll('.search-hit mark')].every((m) => m.textContent.toLowerCase() === 'invoice')`));
  await b.waitFor(`location.hash === '#/search?q=invoice'`, 'URL update');
  // Several words must all match; results are links to real lessons.
  await type('main input[type=search]', 'supplier site');
  await b.waitFor(`document.querySelector('.search-results p')?.textContent.includes('found') && location.hash.includes('supplier')`, 'two-word search');
  await b.evaluate(`document.querySelector('.search-hit').click(), true`);
  await b.waitFor(`document.body.dataset.route === 'lesson'`, 'open a result');
  // Nothing found, regex characters and HTML are plain text.
  await b.visit('#/search');
  for (const q of ['zzqxjv', '.*', '((', '<img src=x onerror=window.__xss=1>', '"><b>bold</b>']) {
    await type('main input[type=search]', q);
    await b.waitFor(`document.querySelector('.search-results p')?.textContent.includes('found') || document.querySelector('.search-results p')?.textContent.includes('two letters')`, `search ${q}`);
    await sleep(250);
  }
  assert.equal(await b.evaluate(`!!document.querySelector('.search-results img, .search-results b')`), false, 'search rendered HTML');
  assert.equal(await b.evaluate('window.__xss === 1'), false);
  // The "/" key opens search from anywhere.
  await b.visit('#/glossary');
  await b.evaluate(`document.body.dispatchEvent(new KeyboardEvent('keydown', { key: '/', bubbles: true })), true`);
  await b.waitFor(`document.body.dataset.route === 'search'`, '"/" shortcut');
  assertClean('search');
});

test('the glossary filters words and jumps to letters', { skip, timeout: 60000 }, async () => {
  await fresh(null, '#/glossary');
  const all = await b.evaluate(`document.querySelectorAll('.g-item').length`);
  assert.ok(all >= 50, `only ${all} glossary words`);
  await type('main input[type=search]', 'invoice');
  const some = await b.evaluate(`document.querySelectorAll('.g-item').length`);
  assert.ok(some > 0 && some < all, `filter "invoice" left ${some} of ${all}`);
  assert.ok(await b.evaluate(`[...document.querySelectorAll('.g-item')].every((x) => x.textContent.toLowerCase().includes('invoice'))`));
  await type('main input[type=search]', 'zzqxjv');
  assert.match(await b.evaluate(`document.querySelector('.glossary').textContent`), /No words match/);
  await type('main input[type=search]', '');
  assert.equal(await b.evaluate(`document.querySelectorAll('.g-item').length`), all);
  // Letter links jump within the page without changing the route.
  await b.evaluate(`document.querySelector('.letters a:last-child').click(), true`);
  await sleep(200);
  assert.equal(await b.evaluate(`document.body.dataset.route`), 'glossary');
  // Every "Seen in" link opens a real lesson.
  const links = await b.evaluate(`[...new Set([...document.querySelectorAll('.g-links a')].map((a) => a.getAttribute('href')))]`);
  const known = new Set(lessons().map((l) => l.hash));
  for (const href of links) assert.ok(known.has(href), `glossary links to unknown lesson ${href}`);
  assertClean('glossary');
});

test('progress export, import, invalid import and both resets', { skip, timeout: 60000 }, async () => {
  const l = lessons()[0];
  await fresh({ completed: { [l.id]: '2026-05-01T00:00:00.000Z' }, quizzes: { [l.id]: { best: 5, last: 5, total: 5, attempts: 1, at: '2026-05-01T00:00:00.000Z' } }, settings: { theme: 'dark' } }, '#/settings');
  // Capture the download instead of saving a file.
  await b.evaluate(`(() => {
    window.__downloads = [];
    const blobs = new Map();
    const create = URL.createObjectURL;
    URL.createObjectURL = (blob) => { const u = create(blob); blobs.set(u, blob); return u; };
    const orig = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
      if (this.download) { window.__downloads.push(blobs.get(this.href).text().then((text) => ({ name: this.download, text, type: blobs.get(this.href).type }))); return; }
      return orig.call(this);
    };
    return true;
  })()`);
  await click('Export progress');
  const dl = await b.evaluate('Promise.all(window.__downloads)');
  assert.equal(dl.length, 1);
  assert.match(dl[0].name, /^erp-made-simple-progress-\d{4}-\d{2}-\d{2}\.json$/);
  assert.equal(dl[0].type, 'application/json');
  const backup = JSON.parse(dl[0].text);
  assert.equal(backup.app, 'erp-made-simple');
  assert.ok(backup.data.completed[l.id]);
  assert.equal(backup.data.settings.theme, 'dark');

  // Reset progress: cancel keeps everything, confirm keeps settings only.
  const dialog = (label) => b.evaluate(`(() => { const d = document.querySelector('dialog[open]'); if (!d) throw new Error('no dialog'); [...d.querySelectorAll('button')].find((x) => x.textContent.includes(${JSON.stringify(label)})).click(); return true; })()`);
  await click('Reset progress');
  await dialog('Cancel');
  await sleep(100);
  assert.ok((await saved()).completed[l.id], 'cancel still reset progress');
  await click('Reset progress');
  await dialog('Yes, reset progress');
  await b.waitFor(`document.body.dataset.route === 'home'`, 'home after reset');
  let st = await saved();
  assert.deepEqual(st.completed, {});
  assert.equal(st.settings.theme, 'dark');
  await b.visit('#/settings');
  await click('Reset everything');
  await dialog('Yes, erase everything');
  await b.waitFor(`document.body.dataset.route === 'home'`, 'home after erase');
  assert.equal(await b.evaluate(`localStorage.getItem('${STORAGE_KEY}')`) === null || (await saved()).settings.theme === 'system', true);

  // Import the backup through the real file input.
  await b.visit('#/settings');
  const importFile = (text, name) => b.evaluate(`(() => {
    const input = document.querySelector('#import-file');
    const dt = new DataTransfer(); dt.items.add(new File([${JSON.stringify(text)}], ${JSON.stringify(name)}, { type: 'application/json' }));
    input.files = dt.files; input.dispatchEvent(new Event('change', { bubbles: true })); return true;
  })()`);
  await importFile(dl[0].text, 'backup.json');
  await b.waitFor(`document.querySelector('#toast')?.textContent.includes('Progress imported')`, 'import toast');
  st = await saved();
  assert.ok(st.completed[l.id], 'import did not restore progress');
  assert.equal(st.settings.theme, 'dark');
  assert.match(await b.evaluate(`document.querySelector('.settings .card:nth-of-type(3) p').textContent`), /completed 1 of/);
  // A wrong file is refused with a message and changes nothing.
  for (const bad of ['not json at all', '{"hello":"world"}', '[]']) {
    await importFile(bad, 'bad.json');
    await b.waitFor(`document.querySelector('#toast')?.textContent.includes('⚠️')`, 'error toast');
    assert.ok((await saved()).completed[l.id], `importing ${bad} changed progress`);
    await b.evaluate(`document.querySelector('#toast').textContent = '', true`);
  }
  assertClean('export/import');
});

test('the certificate unlocks after every lesson and keeps the name as plain text', { skip, timeout: 60000 }, async () => {
  const completed = Object.fromEntries(lessons().slice(1).map((l) => [l.id, '2026-05-01T00:00:00.000Z']));
  await fresh({ completed }, '#/certificate');
  assert.match(await b.evaluate(`document.querySelector('main').textContent`), /1 lesson to go/);
  completed[lessons()[0].id] = '2026-06-02T00:00:00.000Z';
  await fresh({ completed }, '#/certificate');
  assert.equal(await b.evaluate(`document.querySelector('main h1').textContent`), 'Congratulations!');
  assert.match(await b.evaluate(`document.querySelector('.certificate').textContent`), /2026/);
  assert.doesNotMatch(await b.evaluate(`document.querySelector('.certificate').textContent`), /Invalid Date|NaN|undefined/);
  await type('.cert-tools input', '<b>Ada</b> Lovelace');
  assert.equal(await b.evaluate(`document.querySelector('.cert-name').textContent`), '<b>Ada</b> Lovelace');
  assert.equal(await b.evaluate(`!!document.querySelector('.cert-name b')`), false);
  await type('.cert-tools input', 'A'.repeat(200));
  assert.equal((await saved()).certificateName.length, 80);
  await b.open(`${server.url}/index.html#/certificate`);
  await b.waitFor(`document.querySelector('.cert-name')`, 'certificate');
  assert.equal(await b.evaluate(`document.querySelector('.cert-tools input').value.length`), 80);
  assertClean('certificate');
});

test('every practice lab handles every control, including silly values, without errors or NaN', { skip, timeout: 300000 }, async () => {
  await fresh(null, '#/lab');
  const labs = await b.evaluate(`[...new Set([...document.querySelectorAll('a[href^="#/lab/"]')].map((a) => a.getAttribute('href')))]`);
  assert.ok(labs.length >= 6, `only ${labs.length} labs`);
  const VALUES = ['0', '-1', '1', '99999999', '0.005', '', 'abc', '1e309', '-0', '12.345', '100', '101', '1200', '-99999999'];
  for (const lab of labs) {
    await b.visit(lab);
    // First every field gets the same value, then each field a different one (e.g. 100% discount, 1 day).
    for (let round = 0; round < VALUES.length * 3; round++) {
      const text = await b.evaluate(`(() => {
        const vals = ${JSON.stringify(VALUES)}, round = ${round};
        [...document.querySelectorAll('main input, main select')].forEach((el, i) => {
          const v = round < vals.length ? vals[round] : vals[(round * 7 + i * (round % 5 + 1)) % vals.length];
          if (el.type === 'checkbox' || el.type === 'radio') el.checked = !el.checked;
          else if (el.tagName === 'SELECT') el.selectedIndex = (el.selectedIndex + ${round} + 1) % el.options.length;
          else if (el.type === 'date') el.value = ${round} % 2 ? '2026-02-29' : '2024-02-29';
          else el.value = v;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        });
        for (const btn of document.querySelectorAll('main button')) if (!btn.closest('dialog')) btn.click();
        return document.querySelector('main').innerText;
      })()`);
      assert.doesNotMatch(text, /\bNaN\b|\bundefined\b|\bInfinity\b|∞|\[object Object\]|Invalid Date/, `${lab} shows broken numbers (round ${round})`);
      assertClean(`${lab} round ${round}`);
    }
  }
});

test('practice labs: known edge cases give sensible answers quickly', { skip, timeout: 120000 }, async () => {
  await fresh(null, '#/lab');
  const set = (fields) => b.evaluate(`(() => {
    const f = ${JSON.stringify(fields)};
    for (const label of document.querySelectorAll('main .fld label')) {
      const key = Object.keys(f).find((k) => label.textContent.startsWith(k));
      if (key === undefined) continue;
      const el = document.getElementById(label.htmlFor);
      el.value = f[key]; el.dispatchEvent(new Event('input', { bubbles: true }));
    }
    return document.querySelector('main .lab-output').innerText;
  })()`);
  const CASES = [
    ['#/lab/payment-terms', { 'Discount %': '100', 'Net days': '30', 'Discount days': '10' }, /Pay by/],
    ['#/lab/payment-terms', { 'Net days': '99999999', 'Discount days': '-5' }, /Due date/],
    ['#/lab/payment-terms', { 'Discount %': '2', 'Net days': '10', 'Discount days': '30' }, /Pay by/],
    ['#/lab/depreciation', { 'Useful life': '999999999', Cost: '1000' }, /Year 100\t/],
    ['#/lab/depreciation', { 'Useful life': '0', Cost: '-500', 'Salvage': '900' }, /First month/],
    ['#/lab/depreciation', { Cost: '1000', 'Salvage': '2000' }, /First month’s depreciation: \S*0\.00/],
  ];
  for (const [lab, fields, expect] of CASES) {
    await b.visit(lab);
    const started = Date.now();
    const text = await set(fields);
    assert.ok(Date.now() - started < 2000, `${lab} ${JSON.stringify(fields)} took ${Date.now() - started} ms`);
    assert.match(text, expect, `${lab} ${JSON.stringify(fields)}`);
    assert.doesNotMatch(text, /\bNaN\b|\bundefined\b|\bInfinity\b|∞|Invalid Date|(^|[\s(])-\d/m, `${lab} ${JSON.stringify(fields)} shows a broken or negative amount:\n${text}`);
    assertClean(`${lab} ${JSON.stringify(fields)}`);
  }
});

test('clicking every control on every lesson never throws', { skip, timeout: 900000 }, async () => {
  await fresh({ completed: {}, settings: { layout: 'page' } });
  for (const l of lessons()) {
    await b.visit(l.hash);
    await b.evaluate(`(() => {
      for (let pass = 0; pass < 2; pass++) {
        for (const el of document.querySelectorAll('main button, main summary, main select, main input')) {
          if (el.tagName === 'SELECT') { el.selectedIndex = el.options.length - 1; el.dispatchEvent(new Event('change', { bubbles: true })); el.dispatchEvent(new Event('input', { bubbles: true })); }
          else if (el.tagName === 'INPUT' && !['radio', 'checkbox'].includes(el.type)) { el.value = el.type === 'number' ? '-1' : 'x'; el.dispatchEvent(new Event('input', { bubbles: true })); }
          else el.click();
        }
      }
      return true;
    })()`);
    await sleep(30);
    assert.doesNotMatch(await b.evaluate(`document.querySelector('main').innerText`), /\bNaN\b|\bundefined\b|\[object Object\]/, `${l.hash} shows broken values`);
    assertClean(l.hash);
  }
});
