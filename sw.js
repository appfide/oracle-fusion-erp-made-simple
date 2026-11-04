/*
 * Offline support. Strategy: precache the app shell, then
 * "stale-while-revalidate" for every same-origin GET (lessons included).
 * Bump VERSION when the app shell changes.
 */
const VERSION = 'v1.3.0';
const CACHE = `erp-made-simple-${VERSION}`;
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/app.css',
  './assets/js/theme-boot.js',
  './assets/js/main.js',
  './assets/js/views.js',
  './assets/js/blocks.js',
  './assets/js/interactive.js',
  './assets/js/content.js',
  './assets/js/store.js',
  './assets/js/dom.js',
  './assets/js/config.js',
  './assets/icons/icon.svg',
  './content/curriculum.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('erp-made-simple-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => { if (res && res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => cached || (req.mode === 'navigate' ? cache.match('./index.html') : undefined));
      return cached || network;
    }),
  );
});
