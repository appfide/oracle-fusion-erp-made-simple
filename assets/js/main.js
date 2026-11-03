/**
 * App entry: hash router, shell (header/footer), settings, service worker.
 */
import { h, icon, $ } from './dom.js';
import { store } from './store.js';
import { APP } from './config.js';
import {
  homeView, moduleView, lessonView, searchView, glossaryView, creditsView,
  settingsView, aboutView, certificateView, notFoundView, labsView, labView,
} from './views.js';
import { totalLessons, allEntries } from './content.js';

/* ------------------------------------------------------------ settings */

function applySettings() {
  const s = store.settings;
  const root = document.documentElement;
  if (s.theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', s.theme);
  root.dataset.textSize = s.textSize;
  root.classList.toggle('reduce-motion', Boolean(s.reduceMotion));
  const themeBtn = $('#theme-toggle');
  if (themeBtn) {
    const dark = isDark();
    themeBtn.replaceChildren(icon(dark ? 'sun' : 'moon'));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
}
const isDark = () => {
  const t = store.settings.theme;
  return t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
};

/* ------------------------------------------------------------ shell */

const NAV = [
  ['#/', 'home', 'Learn'],
  ['#/lab', 'flask', 'Lab'],
  ['#/search', 'search', 'Search'],
  ['#/glossary', 'glossary', 'Glossary'],
  ['#/settings', 'settings', 'Settings'],
];

function navLink(href, iconName, label, cls) {
  return h('a', { href, class: cls, 'data-nav': href }, icon(iconName, cls === 'tab' ? 22 : 18), h('span', {}, label));
}

function buildShell() {
  const app = $('#app');
  const header = h('header', { class: 'topbar' },
    h('div', { class: 'topbar-inner' },
      h('a', { href: '#/', id: 'app-back', class: 'btn btn-icon app-back', hidden: true, 'aria-label': 'Back' }, icon('arrowLeft')),
      h('a', { href: '#/', class: 'brand', 'aria-label': `${APP.name} home` },
        h('span', { class: 'brand-mark', 'aria-hidden': 'true' }, h('img', { src: 'assets/icons/icon.svg', alt: '', width: '36', height: '36' })),
        h('span', { class: 'brand-text' }, h('strong', {}, APP.name), h('small', {}, `Created by ${APP.author}`))),
      h('nav', { id: 'main-nav', class: 'main-nav', 'aria-label': 'Main' },
        NAV.map(([href, ic, label]) => navLink(href, ic, label === 'Lab' ? 'Practice Lab' : label, 'nav-link')),
        navLink('#/credits', 'credits', 'Sources', 'nav-link')),
      h('div', { class: 'topbar-progress', title: 'Overall progress' },
        h('span', { id: 'top-progress-text' }),
        h('div', { class: 'bar', id: 'top-progress' }, h('span'))),
      h('button', { id: 'theme-toggle', class: 'btn btn-icon', type: 'button', onclick: () => {
        store.updateSettings({ theme: isDark() ? 'light' : 'dark' });
      } })),
    h('div', { class: 'read-progress', id: 'read-progress', 'aria-hidden': 'true' }));

  const main = h('main', { id: 'main', tabindex: '-1' });
  const footer = h('footer', { class: 'footer' },
    h('div', { class: 'footer-inner' },
      h('p', {}, h('strong', {}, APP.name), ` · v${APP.version} · Created by `, h('strong', {}, APP.author), ' · Free and open source.'),
      h('p', { class: 'footer-links' },
        h('a', { href: APP.repo, target: '_blank', rel: 'noopener' }, 'GitHub'),
        h('a', { href: '#/about' }, 'About & privacy'),
        h('a', { href: '#/credits' }, 'Sources & credits'),
        h('a', { href: '#/certificate' }, 'Certificate')),
      h('p', { class: 'muted small' },
        'Independent learning project — not affiliated with or endorsed by Oracle. Oracle and Java are registered trademarks of Oracle and/or its affiliates. ',
        'Lessons explain Oracle’s official documentation in simple words; always check the official docs for your release. ',
        'No cookies, no tracking: progress is stored only in your browser.')));

  const tabbar = h('nav', { class: 'tabbar', 'aria-label': 'App sections' }, NAV.map(([href, ic, label]) => navLink(href, ic, label, 'tab')));

  app.replaceChildren(header, main, footer, tabbar);
}

function updateTopProgress() {
  const done = allEntries.filter((e) => store.isComplete(e.id)).length;
  const pct = Math.round((done / totalLessons) * 100);
  const bar = $('#top-progress');
  if (bar) {
    bar.style.setProperty('--p', `${pct}%`);
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuenow', String(pct));
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-label', `Overall progress ${pct}%`);
  }
  const t = $('#top-progress-text');
  if (t) t.textContent = `${done}/${totalLessons}`;
}

/* ------------------------------------------------------------ router */

const routes = [
  [/^\/?$/, () => homeView()],
  [/^\/module\/([\w-]+)$/, (m) => moduleView(m[1])],
  [/^\/lesson\/([\w-]+)\/([\w-]+)$/, (m, q) => lessonView(m[1], m[2], q)],
  [/^\/lab$/, () => labsView()],
  [/^\/lab\/([\w-]+)$/, (m) => labView(m[1])],
  [/^\/search$/, (m, q) => searchView(q.get('q') || '')],
  [/^\/glossary$/, () => glossaryView()],
  [/^\/credits$/, () => creditsView()],
  [/^\/settings$/, () => settingsView()],
  [/^\/about$/, () => aboutView()],
  [/^\/certificate$/, () => certificateView()],
];

const TITLES = {
  lab: 'Practice Lab', search: 'Search', glossary: 'Glossary', credits: 'Sources & Credits', settings: 'Settings', about: 'About', certificate: 'Certificate',
};

let renderToken = 0;
async function route() {
  const raw = location.hash.replace(/^#/, '') || '/';
  // in-page anchors like #g-A are handled by views; ignore them here
  if (!raw.startsWith('/')) return;
  const [path, qs] = raw.split('?');
  const params = new URLSearchParams(qs || '');
  const main = $('#main');
  const token = ++renderToken;

  let view = null;
  for (const [re, fn] of routes) {
    const m = path.match(re);
    if (m) { view = fn(m, params); break; }
  }
  main.setAttribute('aria-busy', 'true');
  let node;
  try {
    node = await (view || notFoundView());
  } catch (e) {
    console.error(e);
    node = h('div', { class: 'narrow' }, h('h1', { tabindex: '-1' }, 'Something went wrong'), h('p', {}, 'Please reload the page. If it keeps happening, open an issue on GitHub.'));
  }
  if (token !== renderToken) return; // a newer navigation won
  main.replaceChildren(node);
  main.removeAttribute('aria-busy');

  // nav highlight (top nav + bottom tabs)
  document.querySelectorAll('[data-nav]').forEach((a) => {
    const target = a.dataset.nav.replace(/^#/, '');
    const active = target === '/' ? path === '/' || path.startsWith('/module') || path.startsWith('/lesson') : path.startsWith(target);
    if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });

  // app-style back button (mobile) + route flag for CSS
  const parts = path.split('/').filter(Boolean);
  const back = $('#app-back');
  const backTo = parts[0] === 'lesson' ? `#/module/${parts[1]}` : parts[0] === 'module' ? '#/' : parts[0] === 'lab' && parts[1] ? '#/lab' : ['credits', 'about', 'certificate'].includes(parts[0]) ? '#/' : null;
  if (back) { back.hidden = !backTo; if (backTo) back.setAttribute('href', backTo); }
  document.body.dataset.route = parts[0] || 'home';

  // title + focus
  const h1 = main.querySelector('h1') || main.querySelector('.step-title');
  const section = path.split('/')[1];
  document.title = `${h1 && path !== '/' ? `${h1.textContent} · ` : TITLES[section] ? `${TITLES[section]} · ` : ''}${APP.name}`;
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  if (h1 && path !== '/' && path !== '/search') h1.focus({ preventScroll: true });
  updateTopProgress();
  updateReadProgress();
}

/* ------------------------------------------------------------ reading progress */

function updateReadProgress() {
  const bar = $('#read-progress');
  if (!bar) return;
  const lesson = document.querySelector('.lesson');
  if (!lesson) { bar.style.setProperty('--p', '0%'); return; }
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 100;
  bar.style.setProperty('--p', `${pct}%`);
}

/* ------------------------------------------------------------ boot */

buildShell();
applySettings();
store.onChange(() => { applySettings(); updateTopProgress(); });
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySettings);
window.addEventListener('hashchange', route);
window.addEventListener('scroll', updateReadProgress, { passive: true });
document.addEventListener('keydown', (e) => {
  const tag = (e.target.tagName || '').toLowerCase();
  if (e.key === '/' && !['input', 'textarea', 'select'].includes(tag) && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    location.hash = '#/search';
  }
});
route();

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => { /* offline support is optional */ }));
}
