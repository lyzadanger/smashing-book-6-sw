/* global self, caches, URL, fetch */
const appShellURLs = [
  'thing1.jpg',
  'thing2.jpg',
  'thing3.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open('static-assets')
    .then(cache => cache.addAll(appShellURLs))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (appShellURLs.indexOf(url.pathname) !== -1) {
    event.respondWith(caches.match(event.request)
      .then(response => {
        if (!response) {
          throw new Error('${event.request} not found in cache');
        }
        return response;
      })
      .catch(error => fetch(event.request))
    );
  }
});
