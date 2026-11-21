const CACHE_NAME = 'lifecraft-cache-v20';
const CACHE_PREFIX = 'lifecraft-cache-';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './translations.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE.map((asset) => {
        const url = new URL(asset, self.registration.scope);
        url.searchParams.set('cache', CACHE_NAME);
        return url.href;
      }))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache.startsWith(CACHE_PREFIX) && cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request, { ignoreSearch: true });
    if (cachedResponse) return cachedResponse;

    try {
      const networkResponse = await fetch(event.request);
      if (
        networkResponse.status === 200 &&
        networkResponse.type === 'basic' &&
        event.request.destination !== 'video' &&
        event.request.destination !== 'audio'
      ) {
        await cache.put(event.request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      if (event.request.mode === 'navigate') {
        const offlinePage = await cache.match('./index.html', { ignoreSearch: true });
        if (offlinePage) return offlinePage;
      }
      throw error;
    }
  })());
});
