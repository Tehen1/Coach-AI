const CACHE_NAME = 'yourcoachai-cache-v2';
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : undefined))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const shouldCache =
            response &&
            response.status === 200 &&
            (response.type === 'basic' || response.type === 'default');

          if (shouldCache) {
            const responseToCache = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
          }

          return response;
        })
        .catch(() => {
          // Offline fallback for navigation requests (HTML pages)
          if (
            event.request.mode === 'navigate' ||
            (event.request.headers.get('accept') || '').includes('text/html')
          ) {
            return caches.match('/offline.html');
          }
        });
    })
  );
});
