/* 12 Reinos — service worker
   Núcleo (html/js/css/manifest): network-first com fallback ao cache (offline).
   Assets pesados (imagens): cache-first com atualização em segundo plano. */
const CACHE = '12r-v9.3.2';
const CORE = [
  './play.html',
  './styles-v9.3.css',
  './v9.3-config.js',
  './game-v9.3.js',
  './manifest.webmanifest',
  './assets/icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isCore(url) {
  return /\.(html|js|css|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/');
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  if (isCore(url) || e.request.mode === 'navigate') {
    // network-first: sempre a versão mais nova; cache só quando offline
    e.respondWith(
      fetch(e.request).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
        return res;
      }).catch(() => caches.match(e.request))
    );
  } else {
    // assets: cache-first com refresh em segundo plano
    e.respondWith(
      caches.match(e.request).then((hit) => {
        const fetched = fetch(e.request).then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
          return res;
        }).catch(() => hit);
        return hit || fetched;
      })
    );
  }
});
