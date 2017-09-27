/* global caches, self, fetch */
const SWVERSION = 'ding-dong-dell93094';
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`${SWVERSION}-static-assets`).then(cache => {
      return fetch('cache-files.json')
        .then(response => response.json())
        .then(paths => cache.addAll(paths));
    })
  );
});
