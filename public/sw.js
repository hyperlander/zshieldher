/* ShieldHer Service Worker — Offline Support
   Cache-first for assets, network-first for HTML pages.
   No external requests, no telemetry, no analytics.      */

const CACHE_NAME = 'shieldher-v1';

// Core shell — cached on install so the site works offline after first visit
const PRECACHE = [
  '/',
  '/learn/',
  '/learn/1-why-privacy/',
  '/learn/2-crypto-trap/',
  '/learn/3-what-zcash/',
  '/learn/4-wallet-setup/',
  '/learn/5-receiving/',
  '/learn/6-spending/',
  '/learn/7-exit-plan/',
  '/advocates/',
  '/advocates/workshop-guide/',
  '/donors/',
  '/get-help/',
  '/download/',
  '/offline/',
];

// Install: pre-cache all shell pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch strategy:
//   - HTML: network-first (get freshest content), fall back to cache
//   - Assets (CSS/JS/fonts): cache-first (immutable after hash)
//   - Everything else: network-first
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests entirely
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  const isAsset = url.pathname.startsWith('/_assets/');
  const isHTML  = request.headers.get('accept')?.includes('text/html');

  if (isAsset) {
    // Cache-first: assets have content hashes, never stale
    event.respondWith(
      caches.match(request).then(cached => cached ?? fetchAndCache(request))
    );
  } else {
    // Network-first: always try fresh, fall back to cache, then offline page
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => caches.match(request).then(cached => cached ?? caches.match('/offline/')))
    );
  }
});

async function fetchAndCache(request) {
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}
