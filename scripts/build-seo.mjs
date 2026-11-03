#!/usr/bin/env node
/**
 * Build search-engine-friendly static pages.
 *
 * The app itself is a single page with hash routes (#/lesson/...), which search
 * engines index poorly. This script writes a plain, fast HTML page for every
 * module and lesson (real text, its own title, description, canonical URL and
 * schema.org data) that links into the interactive lesson, plus sitemap.xml
 * and robots.txt.
 *
 *   node scripts/build-seo.mjs [outDir]     (default: _site)
 *
 * Output: <outDir>/learn/index.html, <outDir>/learn/<module>/index.html,
 *         <outDir>/learn/<module>/<lesson>/index.html, sitemap.xml, robots.txt
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(ROOT, process.argv[2] || '_site');

const { APP, ORACLE } = await import(pathToFileURL(path.join(ROOT, 'assets/js/config.js')));
const { curriculum } = await import(pathToFileURL(path.join(ROOT, 'content/curriculum.js')));

const SITE = APP.site.endsWith('/') ? APP.site : `${APP.site}/`;
const OG_IMAGE = `${SITE}assets/icons/og-image.png`;
const ORG_ID = `${APP.authorUrl}/#organization`;
const COURSE_ID = `${SITE}#course`;
const TODAY = new Date().toISOString().slice(0, 10);
const INDEXNOW_KEY = '6a4d1cacf5df87fc9b60097379ee2130';

/** Search-friendly topic name per module (what people actually type into Google). */
const TOPIC = {
  basics: 'Oracle Fusion Cloud ERP Basics',
  payables: 'Oracle Fusion Payables (Accounts Payable)',
  procurement: 'Oracle Fusion Procurement',
  expenses: 'Oracle Fusion Expenses',
  receivables: 'Oracle Fusion Receivables (Accounts Receivable)',
  cash: 'Oracle Fusion Cash Management',
  assets: 'Oracle Fusion Assets (Fixed Assets)',
  gl: 'Oracle Fusion General Ledger',
  reporting: 'Oracle Fusion Reporting (OTBI, Analytics Publisher, Smart View)',
  data: 'Oracle Fusion FBDI, Integrations and Scheduled Processes',
  beyond: 'Oracle Fusion Financials: Tax, Intercompany and Budgetary Control',
  journey: 'Oracle Fusion Cloud Updates, AI and Certification',
};
const topic = (m) => TOPIC[m.id] || `Oracle Fusion ${m.short || m.title}`;
const shortTopic = (m) => topic(m).replace(/ \(.*\)$/, '').replace(/:.*$/, '');

/* ------------------------------------------------------------------ helpers */

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ALLOWED = new Set(['p', 'strong', 'em', 'b', 'i', 'ul', 'ol', 'li', 'code', 'br', 'a', 'kbd', 'span']);

/** Keep only the same small tag allow-list the app uses; drop every attribute except safe ones. */
function clean(html) {
  return String(html ?? '').replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (tag, name, attrs) => {
    const n = name.toLowerCase();
    if (!ALLOWED.has(n)) return '';
    if (tag.startsWith('</')) return `</${n}>`;
    if (n === 'a') {
      const m = /href\s*=\s*["'](https:\/\/[^"']+)["']/i.exec(attrs);
      return m ? `<a href="${esc(m[1])}" rel="noopener noreferrer">` : '<a>';
    }
    if (n === 'span' && /class\s*=\s*["']hl["']/i.test(attrs)) return '<span class="hl">';
    return `<${n}>`;
  });
}

const text = (html) => String(html ?? '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

const clip = (s, n = 158) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`);

const money = (n) => (n ? Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '');

function gitDate(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { cwd: ROOT, encoding: 'utf8' }).trim();
    return out || TODAY;
  } catch { return TODAY; }
}

const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

/* ------------------------------------------------------------ block renderer */

function renderBlock(b) {
  switch (b.type) {
    case 'text':
      return `<section>${b.heading ? `<h2>${esc(b.heading)}</h2>` : ''}${clean(b.html)}</section>`;
    case 'kid':
      return `<section class="box kid"><h2>${esc(b.title)}</h2>${clean(b.html)}</section>`;
    case 'callout':
      return `<aside class="box callout callout-${esc(b.variant)}"><h3>${esc(b.title)}</h3>${clean(b.html)}</aside>`;
    case 'slides':
      return `<section><h2>${esc(b.title)}</h2>${b.slides.map((s) => `<div class="box slide"><h3>${esc(s.icon || '')} ${esc(s.title)}</h3>${clean(s.html)}</div>`).join('')}</section>`;
    case 'flow':
      return `<section><h2>${esc(b.title)}</h2><ol class="flow">${b.steps.map((s) => `<li><strong>${esc(s.label)}</strong>${s.detail ? ` — ${esc(s.detail)}` : ''}</li>`).join('')}</ol>${b.note ? clean(b.note) : ''}</section>`;
    case 'example':
      return `<section class="box example"><h2>${esc(b.title)}</h2>${clean(b.html)}${b.steps ? `<ol>${b.steps.map((s) => `<li>${clean(s)}</li>`).join('')}</ol>` : ''}</section>`;
    case 'table':
      return `<section><div class="table-wrap"><table><caption>${esc(b.caption)}</caption><thead><tr>${b.headers.map((x) => `<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c, k) => (k === 0 ? `<th scope="row">${clean(String(c))}</th>` : `<td>${clean(String(c))}</td>`)).join('')}</tr>`).join('')}</tbody></table></div></section>`;
    case 'journal':
      return `<section><h2>${esc(b.title)}</h2><div class="table-wrap"><table><thead><tr><th scope="col">Account</th><th scope="col">Debit</th><th scope="col">Credit</th></tr></thead><tbody>${b.lines.map((l) => `<tr><td>${esc(l.account)}</td><td class="num">${money(l.debit)}</td><td class="num">${money(l.credit)}</td></tr>`).join('')}</tbody></table></div>${b.note ? clean(b.note) : ''}</section>`;
    case 'steps':
      return `<section><h2>${esc(b.title)}</h2><ol>${b.items.map((s) => `<li>${clean(s)}</li>`).join('')}</ol>${b.note ? clean(b.note) : ''}</section>`;
    case 'terms':
      return `<section><h2>Key words</h2><dl class="terms">${b.items.map((t) => `<div><dt>${esc(t.term)}</dt><dd>${esc(t.def)}</dd></div>`).join('')}</dl></section>`;
    case 'exercise':
    case 'lab':
      return `<aside class="box try"><h3>Try it: ${esc(b.title || 'Practice lab')}</h3><p>A hands-on exercise. Open the interactive lesson to try it.</p></aside>`;
    case 'quiz':
      return `<aside class="box try"><h3>Quick quiz</h3><p>${b.questions.length} questions to check what you learned. Open the interactive lesson to take the quiz.</p></aside>`;
    default:
      return '';
  }
}

/* ------------------------------------------------------------------ layout */

function page({ title, description, canonical, depth, body, jsonld, type = 'article', extraHead = '' }) {
  const up = '../'.repeat(depth);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'none'; style-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; form-action 'none'">
<meta name="referrer" content="no-referrer">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(APP.author)}">
<meta name="publisher" content="${esc(APP.author)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<link rel="canonical" href="${esc(canonical)}">
<link rel="author" href="${esc(APP.authorUrl)}">
<meta name="theme-color" content="#4f46e5">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(APP.name)} by Appfide">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@appfide">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${OG_IMAGE}">
<link rel="icon" href="${up}assets/icons/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${up}assets/icons/icon-192.png">
<link rel="stylesheet" href="${up}assets/css/static.css">
${extraHead}${ld(jsonld)}
</head>
<body>
<header class="top"><div class="wrap">
<a class="brand" href="${up}"><img src="${up}assets/icons/icon.svg" width="36" height="36" alt=""><span><strong>${esc(APP.name)}</strong><small>Created by ${esc(APP.author)}</small></span></a>
<a class="btn" href="${up}learn/">All lessons</a>
</div></header>
<main class="wrap">
${body}
</main>
<footer class="foot"><div class="wrap">
<p><strong>${esc(APP.name)}</strong> · Created by <a href="${esc(APP.authorUrl)}">${esc(APP.author)}</a> · Matches Oracle release ${esc(ORACLE.release)} (checked ${esc(ORACLE.checked)}) · Free and open source (<a href="${esc(APP.repo)}">GitHub</a>).</p>
<p class="muted">Independent learning project — not affiliated with or endorsed by Oracle. Oracle and Java are registered trademarks of Oracle and/or its affiliates. Code MIT, lesson content CC BY-SA 4.0. No cookies, no tracking.</p>
</div></footer>
</body>
</html>
`;
}

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url })),
});

const crumbHtml = (items) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([name, href], i) => (i === items.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${esc(href)}">${esc(name)}</a></li>`)).join('')}</ol></nav>`;

const releaseNote = `<p class="release">✓ Matches Oracle Fusion Cloud Applications update ${esc(ORACLE.release)} · checked ${esc(ORACLE.checked)}</p>`;

/* -------------------------------------------------------------------- build */

const urls = [{ loc: SITE, lastmod: TODAY, priority: '1.0' }];
const flat = curriculum.flatMap((m) => m.lessons.map((l) => ({ m, l })));
let totalMinutes = 0;
const lessonsByModule = new Map();

for (const [i, { m, l }] of flat.entries()) {
  const file = `content/lessons/${m.id}/${l.slug}.js`;
  const lesson = (await import(pathToFileURL(path.join(ROOT, file)))).default;
  totalMinutes += lesson.minutes || 0;
  if (!lessonsByModule.has(m.id)) lessonsByModule.set(m.id, []);
  lessonsByModule.get(m.id).push(lesson);

  const url = `${SITE}learn/${m.id}/${l.slug}/`;
  const appUrl = `../../../#/lesson/${m.id}/${l.slug}`;
  const lastmod = gitDate(file);
  const desc = clip(text(lesson.summary));
  const prev = flat[i - 1];
  const next = flat[i + 1];
  const moduleNo = curriculum.indexOf(m) + 1;
  const lessonNo = m.lessons.indexOf(l) + 1;

  const body = `${crumbHtml([['All lessons', '../../'], [m.short || m.title, '../'], [lesson.title, '']])}
<article>
<p class="kicker">${esc(m.icon)} ${esc(shortTopic(m))} tutorial · Module ${moduleNo}, lesson ${lessonNo} of ${m.lessons.length} · ${lesson.minutes || 10} min</p>
<h1>${esc(lesson.title)}</h1>
<p class="lead">${esc(text(lesson.summary))}</p>
${releaseNote}
<p class="cta"><a class="btn btn-primary" href="${appUrl}">▶ Open the interactive lesson</a></p>
${lesson.objectives?.length ? `<section class="box"><h2>What you will learn</h2><ul>${lesson.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></section>` : ''}
${lesson.blocks.map(renderBlock).join('\n')}
<p class="cta"><a class="btn btn-primary" href="${appUrl}">▶ Try the exercises and quiz</a></p>
${lesson.sources?.length ? `<section><h2>Sources</h2><ul class="sources">${lesson.sources.map((s) => `<li><a href="${esc(s.url)}" rel="noopener noreferrer">${esc(s.title)}</a> — ${esc(s.publisher)}</li>`).join('')}</ul></section>` : ''}
<section class="box"><h2>More ${esc(shortTopic(m))} lessons</h2><ol>${m.lessons.map((x) => (x.slug === l.slug ? `<li><strong>${esc(x.title)}</strong> (you are here)</li>` : `<li><a href="../${x.slug}/">${esc(x.title)}</a></li>`)).join('')}</ol><p><a href="../../">See all ${flat.length} lessons</a></p></section>
</article>
<nav class="pager" aria-label="Lessons">${prev ? `<a rel="prev" href="../../${prev.m.id}/${prev.l.slug}/">← ${esc(prev.l.title)}</a>` : '<span></span>'}${next ? `<a rel="next" href="../../${next.m.id}/${next.l.slug}/">${esc(next.l.title)} →</a>` : ''}</nav>`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        '@id': `${url}#lesson`,
        name: lesson.title,
        headline: lesson.title,
        description: text(lesson.summary),
        url,
        image: OG_IMAGE,
        inLanguage: 'en',
        learningResourceType: 'Lesson',
        educationalLevel: 'Beginner',
        isAccessibleForFree: true,
        timeRequired: `PT${lesson.minutes || 10}M`,
        teaches: lesson.objectives || [],
        keywords: ['Oracle Fusion Cloud ERP', topic(m), `${shortTopic(m)} tutorial`, `Oracle ${ORACLE.release}`, 'beginner'].join(', '),
        about: { '@type': 'Thing', name: topic(m) },
        dateModified: lastmod,
        version: `Oracle Fusion Cloud Applications update ${ORACLE.release}`,
        license: 'https://creativecommons.org/licenses/by-sa/4.0/',
        isPartOf: { '@id': COURSE_ID },
        author: { '@type': 'Organization', '@id': ORG_ID, name: APP.author, url: APP.authorUrl },
        publisher: { '@type': 'Organization', '@id': ORG_ID, name: APP.author, url: APP.authorUrl },
        citation: (lesson.sources || []).map((s) => s.url),
      },
      crumbs([['ERP Made Simple', SITE], ['All lessons', `${SITE}learn/`], [m.title, `${SITE}learn/${m.id}/`], [lesson.title, url]]),
    ],
  };

  const out = path.join(OUT, 'learn', m.id, l.slug, 'index.html');
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, page({
    title: `${lesson.title} | ${shortTopic(m)} Tutorial (${ORACLE.release})`,
    description: desc, canonical: url, depth: 3, body, jsonld,
    extraHead: `<meta property="article:modified_time" content="${lastmod}">\n<meta property="article:author" content="${esc(APP.authorUrl)}">\n<meta property="article:publisher" content="${esc(APP.authorUrl)}">\n<meta property="article:section" content="${esc(topic(m))}">\n<meta name="keywords" content="${esc([topic(m), `${shortTopic(m)} tutorial`, 'Oracle Fusion Cloud ERP', `Oracle ${ORACLE.release}`, lesson.title].join(', '))}">\n`,
  }));
  urls.push({ loc: url, lastmod, priority: '0.7' });
}

/* module pages */
for (const [mi, m] of curriculum.entries()) {
  const url = `${SITE}learn/${m.id}/`;
  const lessons = lessonsByModule.get(m.id) || [];
  const body = `${crumbHtml([['All lessons', '../'], [m.title, '']])}
<p class="kicker">${esc(m.icon)} Free ${esc(shortTopic(m))} tutorial for beginners · Module ${mi + 1} · ${lessons.length} lessons</p>
<h1>${esc(m.title)}</h1>
<p class="lead">${esc(m.description)}</p>
${releaseNote}
<p class="cta"><a class="btn btn-primary" href="../../#/module/${m.id}">▶ Open this module in the app</a></p>
<ol class="lesson-list">${m.lessons.map((l, i) => `<li><a href="${l.slug}/"><strong>${esc(l.title)}</strong></a><span>${esc(clip(text(lessons[i]?.summary || ''), 180))}</span></li>`).join('')}</ol>`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: m.title,
        description: m.description,
        url,
        itemListElement: m.lessons.map((l, i) => ({ '@type': 'ListItem', position: i + 1, url: `${url}${l.slug}/`, name: l.title })),
      },
      crumbs([['ERP Made Simple', SITE], ['All lessons', `${SITE}learn/`], [m.title, url]]),
    ],
  };
  const out = path.join(OUT, 'learn', m.id, 'index.html');
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, page({
    title: `${shortTopic(m)} Tutorial for Beginners (${ORACLE.release}) – Free | ${APP.name}`,
    description: clip(`Free ${shortTopic(m)} tutorial for beginners (Oracle ${ORACLE.release}): ${m.description}`), canonical: url, depth: 2, body, jsonld, type: 'website',
  }));
  urls.push({ loc: url, lastmod: TODAY, priority: '0.8' });
}

/* all-lessons page */
{
  const url = `${SITE}learn/`;
  const body = `${crumbHtml([['ERP Made Simple', '../'], ['All lessons', '']])}
<h1>Oracle Fusion Cloud ERP tutorial for beginners: all ${flat.length} free lessons</h1>
<p class="lead">A free, open-source course for absolute beginners, created by <a href="${esc(APP.authorUrl)}">${esc(APP.author)}</a>. Start with the basics, then Accounts Payable, then the rest of the system. About ${Math.round(totalMinutes / 60)} hours in total.</p>
${releaseNote}
<p class="cta"><a class="btn btn-primary" href="../">▶ Open the interactive course</a></p>
${curriculum.map((m, mi) => `<section><h2><a href="${m.id}/">${esc(m.icon)} ${mi + 1}. ${esc(m.title)}</a></h2><p>${esc(m.description)}</p><ol>${m.lessons.map((l) => `<li><a href="${m.id}/${l.slug}/">${esc(l.title)}</a></li>`).join('')}</ol></section>`).join('\n')}`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        '@id': COURSE_ID,
        name: `${APP.name}: ${APP.tagline}`,
        description: `A free, open-source, step-by-step course that teaches Oracle Fusion Cloud ERP (release ${ORACLE.release}) from zero.`,
        url: SITE,
        inLanguage: 'en',
        educationalLevel: 'Beginner',
        isAccessibleForFree: true,
        version: `Oracle Fusion Cloud Applications update ${ORACLE.release}`,
        provider: { '@type': 'Organization', '@id': ORG_ID, name: APP.author, url: APP.authorUrl },
        offers: { '@type': 'Offer', category: 'Free', price: 0, priceCurrency: 'USD' },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: `PT${Math.round(totalMinutes / 60)}H` },
        syllabusSections: curriculum.map((m) => ({ '@type': 'Syllabus', name: m.title, description: m.description })),
      },
      crumbs([['ERP Made Simple', SITE], ['All lessons', url]]),
    ],
  };
  await mkdir(path.join(OUT, 'learn'), { recursive: true });
  await writeFile(path.join(OUT, 'learn', 'index.html'), page({
    title: `Oracle Fusion Cloud ERP Tutorial for Beginners – ${flat.length} Free Lessons (${ORACLE.release})`,
    description: clip(`All ${flat.length} free beginner lessons on Oracle Fusion Cloud ERP (release ${ORACLE.release}): basics, Accounts Payable, Procurement, Expenses, Receivables, Cash, Assets, General Ledger and reporting. Created by ${APP.author}.`),
    canonical: url, depth: 1, body, jsonld, type: 'website',
  }));
  urls.splice(1, 0, { loc: url, lastmod: TODAY, priority: '0.9' });
}

/* 404 page (GitHub Pages serves it for any missing path; noindex) */
await writeFile(path.join(OUT, '404.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Page not found · ${esc(APP.name)}</title>
<link rel="stylesheet" href="${SITE}assets/css/static.css"></head>
<body><main class="wrap"><h1>Page not found</h1><p class="lead">This page doesn’t exist (or it moved).</p>
<p class="cta"><a class="btn btn-primary" href="${SITE}">▶ Open ${esc(APP.name)}</a> <a class="btn" href="${SITE}learn/">All lessons</a></p>
<p class="muted">Created by <a href="${esc(APP.authorUrl)}">${esc(APP.author)}</a>.</p></main></body></html>
`);

/* llms.txt — a plain map of the course for AI search assistants (llmstxt.org) */
await writeFile(path.join(OUT, 'llms.txt'), `# ${APP.name}

> Free, open-source Oracle Fusion Cloud ERP course for absolute beginners, matching Oracle release ${ORACLE.release} (checked ${ORACLE.checked}). ${flat.length} step-by-step lessons with examples, exercises and quizzes. Created by ${APP.author} (${APP.authorUrl}). Lesson content is CC BY-SA 4.0; every lesson cites official Oracle documentation.

- Interactive course: ${SITE}
- All lessons (text pages): ${SITE}learn/
- Source code: ${APP.repo}

${curriculum.map((m, mi) => `## ${mi + 1}. ${m.title}\n\n${m.description}\n\n${m.lessons.map((l) => `- [${l.title}](${SITE}learn/${m.id}/${l.slug}/)`).join('\n')}`).join('\n\n')}
`);

/* IndexNow key file (lets Bing, Yandex and others accept our "pages changed" pings) */
await writeFile(path.join(OUT, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY);
await writeFile(path.join(OUT, 'indexnow.json'), JSON.stringify({
  host: new URL(SITE).host,
  key: INDEXNOW_KEY,
  keyLocation: `${SITE}${INDEXNOW_KEY}.txt`,
  urlList: [...urls.map((u) => u.loc)],
}));

/* sitemap + robots */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${esc(u.loc)}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(OUT, 'sitemap.xml'), sitemap);
await writeFile(path.join(OUT, 'robots.txt'), `# ${APP.name} — created by ${APP.author}\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

console.log(`SEO build: ${flat.length} lesson pages, ${curriculum.length} module pages, ${urls.length} sitemap URLs → ${path.relative(ROOT, OUT) || '.'} (≈${Math.round(totalMinutes / 60)} h of lessons)`);
