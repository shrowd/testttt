const cacheName = 'site-cache-v1'
const assetsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
]

self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[Service Worker] Caching files');
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('[Service Worker] Usuwanie starego cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});