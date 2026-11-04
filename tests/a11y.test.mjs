/**
 * Accessibility, layout and offline checks in a real browser, on every page:
 *  - WCAG basics: page language, one main heading, no skipped heading levels, names for
 *    every link, button and form field, image alt text, unique ids, valid ARIA references,
 *    no positive tabindex, keyboard-visible focus, 24px minimum target size (WCAG 2.2);
 *  - text colour contrast (WCAG AA 4.5:1, 3:1 for large text) in light and dark themes;
 *  - phone width (360px): nothing wider than the screen;
 *  - offline: after one visit the app and visited lessons open with no network.
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { SKIP as skip, STORAGE_KEY, ROOT, serve, launch, allRoutes, sleep } from './helpers/chrome.mjs';

const { APP } = await import(pathToFileURL(join(ROOT, 'assets/js/config.js')));

let server, b, pages;
before(async () => {
  if (skip) return;
  server = await serve();
  b = await launch();
  ({ pages } = await allRoutes());
  await b.open(`${server.url}/index.html#/lab`);
  await b.waitFor(`document.querySelector('main h1')`, 'labs');
  pages.push(...await b.evaluate(`[...new Set([...document.querySelectorAll('a[href^="#/lab/"]')].map((a) => a.getAttribute('href')))]`));
});
after(async () => { await b?.close(); await server?.close(); });

async function fresh(settings) {
  await b.open(`${server.url}/index.html#/__blank`);
  await b.evaluate(`localStorage.clear(), localStorage.setItem('${STORAGE_KEY}', ${JSON.stringify(JSON.stringify({ completed: {}, settings }))}), true`);
  await b.open(`${server.url}/index.html#/`);
  await b.waitFor(`document.querySelector('main h1')`, 'home');
  b.take();
}

/** Runs in the page: returns a list of accessibility problems for the current view. */
const AUDIT = `(() => {
  const out = [];
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !el.closest('[hidden], [aria-hidden="true"]'); };
  const name = (el) => {
    const by = el.getAttribute('aria-labelledby');
    if (by) return by.split(/\\s+/).map((id) => document.getElementById(id)?.textContent || '').join(' ').trim();
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim();
    if (el.labels && el.labels.length) return [...el.labels].map((l) => l.textContent).join(' ').trim();
    const t = (el.innerText || el.textContent || '').trim();
    if (t) return t;
    const img = el.querySelector('img[alt], svg[aria-label]');
    if (img) return (img.getAttribute('alt') || img.getAttribute('aria-label')).trim();
    return (el.getAttribute('title') || el.getAttribute('placeholder') || '').trim();
  };
  const where = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).join('.') : '') + ' "' + (el.textContent || '').trim().slice(0, 40) + '"';

  if (document.documentElement.lang !== 'en') out.push('html lang is not "en"');
  if (!document.title.trim()) out.push('empty document title');
  if (!document.querySelector('main')) out.push('no <main> landmark');
  const h1s = [...document.querySelectorAll('h1')].filter(visible);
  if (h1s.length > 1) out.push(h1s.length + ' visible h1 headings');
  if (!h1s.length && !document.querySelector('main .step-title')) out.push('no main heading');
  // heading levels never skip (h2 -> h4)
  let last = document.querySelector('main .step-title') && !h1s.length ? 2 : 1;
  for (const hd of [...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')].filter(visible)) {
    const lv = Number(hd.tagName[1]);
    if (lv > last + 1) out.push('heading jumps from h' + last + ' to h' + lv + ': ' + where(hd));
    last = lv;
  }
  for (const el of document.querySelectorAll('a[href], button, [role="button"], summary')) {
    if (visible(el) && !name(el)) out.push('control without a name: ' + el.outerHTML.slice(0, 120));
  }
  for (const el of document.querySelectorAll('input, select, textarea')) {
    if (el.type === 'hidden' || el.classList.contains('visually-hidden') && el.id && document.querySelector('label[for="' + el.id + '"]')) continue;
    if (!name(el)) out.push('form field without a label: ' + el.outerHTML.slice(0, 120));
  }
  for (const img of document.querySelectorAll('img')) if (!img.hasAttribute('alt')) out.push('img without alt: ' + img.src);
  for (const svg of document.querySelectorAll('svg')) {
    if (svg.getAttribute('aria-hidden') !== 'true' && !svg.getAttribute('aria-label') && !svg.closest('[aria-hidden="true"]') && svg.getAttribute('role') !== 'presentation') out.push('svg neither hidden nor labelled: ' + where(svg.parentElement));
  }
  const ids = new Map();
  for (const el of document.querySelectorAll('[id]')) ids.set(el.id, (ids.get(el.id) || 0) + 1);
  for (const [id, n] of ids) if (n > 1) out.push('duplicate id "' + id + '" (' + n + 'x)');
  for (const attr of ['aria-labelledby', 'aria-describedby', 'aria-controls', 'for']) {
    for (const el of document.querySelectorAll('[' + attr + ']')) {
      for (const id of el.getAttribute(attr).split(/\\s+/)) if (id && !document.getElementById(id)) out.push(attr + ' points at missing id "' + id + '"');
    }
  }
  for (const el of document.querySelectorAll('[tabindex]')) if (Number(el.getAttribute('tabindex')) > 0) out.push('positive tabindex: ' + where(el));
  for (const a of document.querySelectorAll('a[target="_blank"]')) if (!/noopener/.test(a.rel)) out.push('target=_blank without noopener: ' + a.href);
  for (const el of document.querySelectorAll('[role]')) {
    const ok = ['button', 'img', 'status', 'alert', 'progressbar', 'presentation', 'none', 'list', 'listitem', 'region', 'group', 'note', 'navigation', 'tab', 'tablist', 'tabpanel', 'radiogroup', 'radio', 'switch', 'dialog', 'log', 'timer', 'figure', 'term', 'definition', 'separator', 'toolbar', 'search', 'banner', 'contentinfo', 'main', 'complementary', 'heading', 'link', 'checkbox', 'textbox', 'option', 'listbox', 'combobox', 'menu', 'menuitem', 'table', 'row', 'cell', 'columnheader', 'rowheader', 'math'];
    if (!ok.includes(el.getAttribute('role'))) out.push('unknown ARIA role "' + el.getAttribute('role') + '"');
  }
  for (const el of document.querySelectorAll('[role="progressbar"]')) if (!el.hasAttribute('aria-valuenow')) out.push('progressbar without aria-valuenow');
  // WCAG 2.2 target size (minimum): stand-alone controls at least 24x24 CSS px.
  for (const el of document.querySelectorAll('button, .btn, input[type=checkbox], input[type=radio], select, summary, .tab, .nav-link')) {
    if (!visible(el) || el.closest('p, li, td, dd') && el.tagName === 'A') continue;
    const target = el.matches('input[type=checkbox], input[type=radio]') && el.closest('label') ? el.closest('label') : el;
    const r = target.getBoundingClientRect();
    if (r.width < 23.5 || r.height < 23.5) out.push('target smaller than 24px (' + Math.round(r.width) + 'x' + Math.round(r.height) + '): ' + where(el));
  }
  return [...new Set(out)];
})()`;

/** Runs in the page: text that fails WCAG AA contrast against its real background. */
const CONTRAST = `(() => {
  const out = [];
  const parse = (c) => { const m = c.match(/rgba?\\(([^)]+)\\)/); if (!m) return null; const p = m[1].split(/[\\s,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const blend = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  function background(el) {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage !== 'none' && !s.backgroundImage.startsWith('linear-gradient') ) return null; // images: cannot judge
      if (s.backgroundImage.startsWith('linear-gradient')) return null;
      const c = parse(s.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
      if (parseFloat(s.opacity) < 1) return null;
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (const l of layers.reverse()) bg = blend(l, bg);
    return bg;
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const el = node.parentElement;
    if (!node.nodeValue.trim() || seen.has(el)) continue;
    seen.add(el);
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (!r.width || !r.height || s.visibility === 'hidden' || el.closest('[hidden], [aria-hidden="true"], .visually-hidden, .is-disabled, :disabled, script, style, noscript')) continue;
    if (/^[\\p{Extended_Pictographic}\\s\\u200d\\ufe0f]+$/u.test(node.nodeValue)) continue; // emoji only
    const fg = parse(s.color);
    const bg = background(el);
    if (!fg || !bg) continue;
    const c = blend(fg, bg);
    const L1 = lum(c), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const size = parseFloat(s.fontSize);
    const large = size >= 24 || (size >= 18.66 && Number(s.fontWeight) >= 700);
    const need = large ? 3 : 4.5;
    if (ratio < need) out.push(ratio.toFixed(2) + ':1 < ' + need + ' — ' + el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0] + ' "' + node.nodeValue.trim().slice(0, 40) + '" (' + s.color + ' on rgb(' + [bg.r, bg.g, bg.b].map(Math.round) + '))');
  }
  return [...new Set(out)];
})()`;

for (const layout of ['steps', 'page']) {
  test(`accessibility basics on every page (${layout} layout)`, { skip, timeout: 600000 }, async () => {
    await fresh({ layout });
    const failures = [];
    for (const hash of pages) {
      await b.visit(hash);
      const problems = await b.evaluate(AUDIT);
      if (problems.length) failures.push(`${hash}\n  - ${problems.join('\n  - ')}`);
    }
    assert.deepEqual(failures, [], failures.join('\n'));
    b.take();
  });
}

for (const theme of ['light', 'dark']) {
  test(`text contrast meets WCAG AA on every page (${theme} theme)`, { skip, timeout: 600000 }, async () => {
    await fresh({ theme, layout: 'page' });
    const failures = [];
    for (const hash of pages) {
      await b.visit(hash);
      await sleep(20);
      const problems = await b.evaluate(CONTRAST);
      if (problems.length) failures.push(`${hash}\n  - ${problems.slice(0, 8).join('\n  - ')}`);
    }
    assert.deepEqual(failures, [], failures.join('\n'));
    b.take();
  });
}

test('the "match my device" theme follows the system dark mode setting', { skip, timeout: 60000 }, async () => {
  await fresh({ theme: 'system' });
  const bg = () => b.evaluate(`getComputedStyle(document.body).backgroundColor`);
  await b.colorScheme('light');
  await sleep(100);
  const light = await bg();
  await b.colorScheme('dark');
  await sleep(100);
  const dark = await bg();
  assert.notEqual(light, dark, 'system dark mode did not change the page');
  const lum = (c) => c.match(/\d+/g).slice(0, 3).map(Number).reduce((a, v) => a + v, 0) / 3;
  assert.ok(lum(dark) < 80 && lum(light) > 180, `unexpected backgrounds: light ${light}, dark ${dark}`);
  assert.equal(await b.evaluate(`document.querySelector('#theme-toggle').getAttribute('aria-label')`), 'Switch to light theme');
  await b.colorScheme('');
  b.take();
});

test('keyboard users can reach the content: skip to main, visible focus, Tab order', { skip, timeout: 60000 }, async () => {
  await fresh({ layout: 'steps' });
  await b.visit('#/lesson/basics/what-is-erp');
  assert.equal(await b.evaluate(`document.activeElement?.matches('h1, .step-title')`), true, 'focus did not move to the lesson heading after navigation');
  // The skip link is the first stop, becomes visible, and moves focus to <main> without breaking the URL.
  await b.open(`${server.url}/index.html#/glossary`);
  await b.waitFor(`document.querySelector('main h1')`, 'glossary');
  await b.evaluate(`document.activeElement.blur(), document.body.setAttribute('tabindex', '-1'), document.body.focus(), document.body.removeAttribute('tabindex'), true`);
  await b.cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await b.cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  assert.equal(await b.evaluate(`document.activeElement.className`), 'skip-link', 'first Tab stop is not the skip link');
  assert.ok(await b.evaluate(`document.activeElement.getBoundingClientRect().top >= 0`), 'skip link stays off screen when focused');
  await b.cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' });
  await b.cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  await b.waitFor(`document.activeElement.id === 'main'`, 'focus on main');
  assert.equal(await b.evaluate('location.hash'), '#/glossary', 'skip link changed the URL');
  await b.visit('#/lesson/basics/what-is-erp');
  // A link that ends in a plain anchor still opens a page instead of a blank screen.
  await b.open(`${server.url}/index.html#main`);
  await b.waitFor(`document.querySelector('main h1')`, 'page for #main');
  // Tab through the page with real key presses: focus must always be visible.
  const press = async () => {
    await b.cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await b.cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  };
  const seen = new Set();
  for (let i = 0; i < 40; i++) {
    await press();
    const f = await b.evaluate(`(() => {
      const el = document.activeElement; if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const ring = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
      return { tag: el.tagName, text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30), ring };
    })()`);
    if (!f) continue;
    seen.add(f.tag);
    assert.ok(f.ring, `no visible focus indicator on <${f.tag}> "${f.text}"`);
  }
  assert.ok(seen.has('A') && seen.has('BUTTON'), `Tab reached only ${[...seen]}`);
  b.take();
});

test('no page is wider than a phone screen (360px)', { skip, timeout: 600000 }, async () => {
  await fresh({ layout: 'steps' });
  await b.viewport(360, 740, true);
  const failures = [];
  try {
    for (const hash of pages) {
      await b.visit(hash);
      await sleep(10);
      const r = await b.evaluate(`(() => {
        const w = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth <= w) return null;
        const wide = [...document.querySelectorAll('body *')].filter((el) => {
          const r = el.getBoundingClientRect();
          return r.right > w + 1 && !el.closest('.table-wrap, pre, .scroll-x') && getComputedStyle(el).position !== 'fixed';
        }).slice(0, 3).map((el) => el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0] + ' (' + Math.round(el.getBoundingClientRect().right) + 'px)');
        return document.documentElement.scrollWidth + 'px wide: ' + wide.join(', ');
      })()`);
      if (r) failures.push(`${hash}: ${r}`);
    }
  } finally {
    await b.viewport(1280, 900);
  }
  assert.deepEqual(failures, [], failures.join('\n'));
  b.take();
});

test('the accessibility statement is published, current, contactable and linked from every page', { skip, timeout: 60000 }, async () => {
  await fresh({ layout: 'steps' });
  for (const from of ['#/', '#/lesson/basics/what-is-erp', '#/settings']) {
    await b.visit(from);
    assert.ok(await b.evaluate(`!!document.querySelector('footer a[href="#/accessibility"]')`), `${from}: no Accessibility link in the footer`);
  }
  await b.visit('#/about');
  assert.ok(await b.evaluate(`!!document.querySelector('main a[href="#/accessibility"]')`), 'About page does not link to the statement');
  const heading = await b.visit('#/accessibility');
  assert.equal(heading, 'Accessibility statement');
  assert.match(await b.evaluate('document.title'), /^Accessibility statement · /);
  const page = await b.evaluate(`(() => {
    const main = document.querySelector('main');
    return {
      text: main.textContent,
      h2: [...main.querySelectorAll('h2')].map((x) => x.textContent),
      links: [...main.querySelectorAll('a')].map((a) => a.getAttribute('href')),
      back: document.querySelector('#app-back').hidden ? null : document.querySelector('#app-back').getAttribute('href'),
    };
  })()`);
  assert.match(page.text, /WCAG\) 2\.2 at level AA/, 'conformance target is not stated');
  for (const section of ['How accessible is this site?', 'How we check', 'Known limitations', 'Tell us about a problem', 'About this statement']) {
    assert.ok(page.h2.includes(section), `statement has no "${section}" section`);
  }
  assert.ok(page.text.includes(`for version ${APP.version} of the site`), 'statement does not name the current version');
  const reviewed = Date.parse(page.text.match(/last reviewed on (\d{1,2} \w+ \d{4})/)?.[1]);
  assert.ok(reviewed <= Date.now() && Date.now() - reviewed < 400 * 86400000, 'statement review date is missing, in the future or over a year old: re-check and update A11Y_REVIEWED in views.js');
  assert.ok(page.links.some((h) => h.startsWith(`mailto:${APP.securityEmail}?`)), 'no private email contact');
  assert.ok(page.links.some((h) => h.startsWith(`${APP.repo}/issues/new?labels=accessibility`)), 'no public issue contact');
  const tests = page.links.find((h) => h.startsWith(`${APP.repo}/blob/main/`));
  assert.ok(tests && existsSync(join(ROOT, tests.slice(`${APP.repo}/blob/main/`.length))), `link to the tests is broken: ${tests}`);
  assert.equal(page.back, '#/', 'mobile back button does not lead home');
  assert.deepEqual(b.take(), []);
});

test('works offline after the first visit (service worker)', { skip, timeout: 120000 }, async () => {
  // The app registers its service worker on https only; on the local test server we register it ourselves.
  await fresh({ layout: 'steps' });
  await b.evaluate(`navigator.serviceWorker.register('./sw.js').then(() => navigator.serviceWorker.ready).then(() => true)`);
  await b.open(`${server.url}/index.html#/`); // now controlled by the worker
  await b.waitFor(`navigator.serviceWorker.controller && document.querySelector('main h1')`, 'controlled page');
  await b.visit('#/lesson/basics/what-is-erp');
  await b.visit('#/module/payables');
  await sleep(500); // let the worker finish caching
  b.allowNetworkErrors = true;
  server.offline.on = true;
  try {
    for (const hash of ['#/', '#/lesson/basics/what-is-erp', '#/module/payables', '#/settings']) {
      await b.open(`${server.url}/index.html${hash}`);
      const heading = await b.waitFor(`document.body.dataset.route && document.querySelector('main h1, main .step-title')?.textContent`, `offline ${hash}`);
      assert.doesNotMatch(heading, /Something went wrong|We can’t find that page/, `offline ${hash}`);
      assert.equal(await b.evaluate(`document.querySelector('main').textContent.includes('This lesson is being written')`), false, `offline ${hash} lost its lesson`);
    }
  } finally {
    server.offline.on = false;
    b.allowNetworkErrors = false;
    await b.evaluate(`navigator.serviceWorker.getRegistrations().then((rs) => Promise.all(rs.map((r) => r.unregister()))).then(() => caches.keys()).then((ks) => Promise.all(ks.map((k) => caches.delete(k)))).then(() => true)`);
  }
  b.take();
});
