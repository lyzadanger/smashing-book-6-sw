/* global caches, self */
const SWVERSION = 'doodad09348398';
const appShellURLs = [
  'offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(`${SWVERSION}-static-assets`)
    .then(cache => cache.addAll(appShellURLs))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheKeys => {
        const oldKeys = cacheKeys.filter(key => key.indexOf(SWVERSION) !== 0);
        const deletePromises = oldKeys.map(oldKey => caches.delete(oldKey));
        return Promise.all(deletePromises);
      })
      .then(() => self.clients.claim())
    );
});
