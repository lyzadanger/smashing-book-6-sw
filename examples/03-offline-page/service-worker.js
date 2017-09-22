/* global self, fetch, caches */
self.addEventListener('install', event => {
  event.waitUntil(caches.open('offline-fallbacks')
  .then(cache => cache.add('offline.html'))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request)
    .catch(error => {
      return caches.open('offline-fallbacks')
      .then(cache => cache.match('offline.html'));
    })
  );
});
