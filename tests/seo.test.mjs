/**
 * The search-engine pages (scripts/build-seo.mjs) are built into a temporary folder exactly
 * as the deploy job does, then checked: valid sitemap and robots.txt, one page per lesson
 * and module with its own title, description, canonical URL and valid schema.org data,
 * no broken links between the pages, and no errors when each page opens in a real browser.
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, cp, readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, SKIP, serve, launch } from './helpers/chrome.mjs';

const { APP } = await import(pathToFileURL(join(ROOT, 'assets/js/config.js')));
const { curriculum } = await import(pathToFileURL(join(ROOT, 'content/curriculum.js')));
const SITE = APP.site.endsWith('/') ? APP.site : `${APP.site}/`;
const lessonCount = curriculum.reduce((n, m) => n + m.lessons.length, 0);

let OUT;
const pages = new Map(); // relative path -> html
before(async () => {
  OUT = await mkdtemp(join(tmpdir(), 'erp-seo-'));
  // Same steps as "Prepare site" in .github/workflows/pages.yml.
  for (const f of ['index.html', 'manifest.webmanifest', 'sw.js', 'assets', 'content']) await cp(join(ROOT, f), join(OUT, f), { recursive: true });
  execFileSync(process.execPath, [join(ROOT, 'scripts/build-seo.mjs'), OUT], { cwd: ROOT, stdio: 'pipe' });
  async function walk(dir) {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name.endsWith('.html')) pages.set(relative(OUT, p), await readFile(p, 'utf8'));
    }
  }
  await walk(join(OUT, 'learn'));
});
after(async () => { if (OUT) await rm(OUT, { recursive: true, force: true }); });

const meta = (html, attr, name) => html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1];
const urlOf = (rel) => SITE + rel.replace(/index\.html$/, '');

test('one page per lesson and module, plus the course index', () => {
  assert.equal(pages.size, 1 + curriculum.length + lessonCount);
  for (const m of curriculum) {
    assert.ok(pages.has(`learn/${m.id}/index.html`), `missing module page ${m.id}`);
    for (const l of m.lessons) assert.ok(pages.has(`learn/${m.id}/${l.slug}/index.html`), `missing lesson page ${m.id}/${l.slug}`);
  }
});

test('every page has a unique title, a good description, canonical URL and social tags', () => {
  const titles = new Map();
  for (const [rel, html] of pages) {
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    assert.ok(title && title.length >= 15, `${rel}: missing or short title`);
    assert.ok(!titles.has(title), `${rel}: same title as ${titles.get(title)}`);
    titles.set(title, rel);
    const desc = meta(html, 'name', 'description');
    assert.ok(desc && desc.length >= 50 && desc.length <= 200, `${rel}: description should be 50-200 characters (${desc?.length})`);
    assert.equal(html.match(/<link rel="canonical" href="([^"]*)">/)?.[1], urlOf(rel), `${rel}: wrong canonical URL`);
    assert.equal(meta(html, 'property', 'og:url'), urlOf(rel), `${rel}: wrong og:url`);
    for (const p of ['og:title', 'og:description', 'og:image', 'og:type']) assert.ok(meta(html, 'property', p), `${rel}: missing ${p}`);
    assert.match(html, /<html lang="en">/, `${rel}: no language`);
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/, `${rel}: viewport`);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${rel}: should have exactly one h1`);
    assert.doesNotMatch(html, /undefined|\[object Object\]|NaN/, `${rel}: contains a broken value`);
  }
});

test('every page is locked down: strict CSP, no scripts, no third-party requests', () => {
  for (const [rel, html] of pages) {
    const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]*)"/)?.[1];
    assert.ok(csp, `${rel}: no Content-Security-Policy`);
    assert.match(csp, /script-src 'none'/, `${rel}: scripts allowed`);
    assert.match(csp, /default-src 'self'/);
    const scripts = [...html.matchAll(/<script\b([^>]*)>/g)].map((m) => m[1]);
    for (const s of scripts) assert.match(s, /type="application\/ld\+json"/, `${rel}: executable <script${s}>`);
    for (const m of html.matchAll(/\b(?:src|href)="([^"]*)"/g)) {
      const u = m[1];
      if (/^https?:/.test(u) && !u.startsWith(SITE)) {
        // Outgoing links to sources are fine; loading anything from another site is not.
        assert.ok(new RegExp(`<a [^>]*href="${u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html), `${rel}: loads a third-party resource ${u}`);
      }
    }
  }
});

test('schema.org data is valid JSON with the expected types', () => {
  for (const [rel, html] of pages) {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    assert.ok(blocks.length >= 1, `${rel}: no structured data`);
    for (const b of blocks) {
      const data = JSON.parse(b);
      assert.equal(data['@context'], 'https://schema.org', `${rel}: wrong @context`);
      const types = (data['@graph'] || [data]).map((x) => x['@type']).flat();
      assert.ok(types.length, `${rel}: no @type`);
      if (/^learn\/[^/]+\/[^/]+\/index\.html$/.test(rel)) assert.ok(types.includes('LearningResource'), `${rel}: lesson is not a LearningResource (${types})`);
      if (rel !== 'learn/index.html') assert.ok(types.includes('BreadcrumbList'), `${rel}: no breadcrumbs (${types})`);
    }
  }
});

test('every link and asset between the generated pages resolves', async () => {
  const checked = new Set();
  for (const [rel, html] of pages) {
    for (const m of html.matchAll(/\b(?:src|href)="([^"#]*)(#[^"]*)?"/g)) {
      let u = m[1];
      if (!u || /^(mailto:|data:)/.test(u)) continue;
      if (/^https?:/.test(u)) { if (!u.startsWith(SITE)) continue; u = u.slice(SITE.length); }
      else u = relative(OUT, resolve(dirname(join(OUT, rel)), u));
      const file = join(OUT, u.split('?')[0]);
      if (checked.has(file)) continue;
      checked.add(file);
      const ok = existsSync(file) && ((await stat(file)).isFile() || existsSync(join(file, 'index.html')));
      assert.ok(ok, `${rel}: link to ${m[1]} is broken`);
    }
  }
  assert.ok(checked.size > lessonCount, 'too few links checked');
});

test('sitemap, robots.txt, 404 page, llms.txt and IndexNow payload are valid', async () => {
  const sitemap = await readFile(join(OUT, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(sitemap, /<\/urlset>\s*$/);
  const urls = [...sitemap.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>(?:<priority>[01]\.\d<\/priority>)?<\/url>/g)];
  assert.equal(urls.length, (sitemap.match(/<url>/g) || []).length, 'a sitemap entry is malformed');
  const locs = urls.map((m) => m[1]);
  assert.equal(new Set(locs).size, locs.length, 'duplicate sitemap URLs');
  assert.ok(locs.includes(SITE), 'home page missing from sitemap');
  for (const rel of pages.keys()) assert.ok(locs.includes(urlOf(rel)), `${rel} missing from sitemap`);
  for (const [, loc, date] of urls) {
    assert.ok(loc.startsWith(SITE), `sitemap URL outside the site: ${loc}`);
    assert.ok(!Number.isNaN(Date.parse(date)) && Date.parse(date) <= Date.now() + 86400000, `bad lastmod ${date}`);
    const rel = loc.slice(SITE.length);
    assert.ok(existsSync(join(OUT, rel, rel === '' || rel.endsWith('/') ? 'index.html' : '')), `sitemap URL has no page: ${loc}`);
  }
  for (const loc of locs) assert.doesNotMatch(loc, /&(?!amp;)|[<>"'\s]/, `unescaped character in sitemap URL ${loc}`);

  const robots = await readFile(join(OUT, 'robots.txt'), 'utf8');
  assert.match(robots, /^User-agent: \*$/m);
  assert.doesNotMatch(robots, /^Disallow: \/$/m, 'robots.txt blocks the whole site');
  assert.match(robots, new RegExp(`^Sitemap: ${SITE}sitemap\\.xml$`, 'm'));

  const notFound = await readFile(join(OUT, '404.html'), 'utf8');
  assert.match(notFound, /<meta name="robots" content="noindex">/);

  const llms = await readFile(join(OUT, 'llms.txt'), 'utf8');
  assert.equal((llms.match(/^- \[/gm) || []).length, lessonCount, 'llms.txt should list every lesson');

  const indexnow = JSON.parse(await readFile(join(OUT, 'indexnow.json'), 'utf8'));
  assert.equal(indexnow.host, new URL(SITE).host);
  assert.ok(indexnow.urlList.every((u) => u.startsWith(SITE)), 'IndexNow would submit URLs outside the site');
  assert.equal(await readFile(join(OUT, `${indexnow.key}.txt`), 'utf8'), indexnow.key, 'IndexNow key file mismatch');
});

test('every generated page opens in a real browser with no errors', { skip: SKIP, timeout: 300000 }, async () => {
  const server = await serve(OUT);
  const b = await launch();
  try {
    for (const rel of pages.keys()) {
      await b.open(`${server.url}/${rel.replace(/index\.html$/, '')}`);
      assert.ok(await b.evaluate(`getComputedStyle(document.body).fontFamily !== '' && document.styleSheets.length > 0`), `${rel}: stylesheet did not load`);
      const found = b.take();
      assert.deepEqual(found, [], `${rel}: ${found.join('\n')}`);
    }
    // The "open the interactive lesson" link lands on the right lesson in the app.
    const [m] = curriculum;
    await b.open(`${server.url}/learn/${m.id}/${m.lessons[0].slug}/`);
    const appLink = await b.evaluate(`[...document.querySelectorAll('a')].map((a) => a.getAttribute('href')).find((h) => h.includes('#/lesson/'))`);
    assert.ok(appLink, 'lesson page does not link to the interactive lesson');
    assert.ok(appLink.endsWith(`#/lesson/${m.id}/${m.lessons[0].slug}`), `wrong app link ${appLink}`);
  } finally {
    await b.close();
    await server.close();
  }
});
