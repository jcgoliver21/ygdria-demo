/* 12 Reinos — service worker
   Núcleo (html/js/css/manifest): network-first com fallback ao cache (offline).
   Assets pesados (imagens): cache-first com atualização em segundo plano. */
const CACHE = '12r-v11.0.58';
const CORE = [
  './index.html',
  './play.html',
  './styles-v10.css',
  './v10-config.js',
  './v10-animations.js',
  './humanos-lore-v10.js',
  './game-v10.js',
  './manifest.webmanifest',
  './assets/icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      /* CacheStorage é compartilhado por toda a origem. No GitHub Pages, apagar
         todas as chaves também removeria caches de outros projetos do autor. */
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('12r-') && k !== CACHE).map((k) => caches.delete(k))))
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
      }).catch(async() => {
        /* O HTML usa ?v=... para cache-busting. O núcleo pré-cacheado não tem
           query string, então o fallback offline precisa ignorá-la. */
        const exact=await caches.match(e.request,{ignoreSearch:true});
        if(exact || e.request.mode !== 'navigate') return exact;
        return caches.match(url.pathname.endsWith('/play.html')?'./play.html':'./index.html');
      })
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
