/* global self, fetch, caches, Response */
const offlineSVG = `<svg role="img" aria-labelledby="offline-title"
 viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
<title id="offline-title">Offline</title>
<g fill="none" fill-rule="evenodd">
<path fill="#D8D8D8" d="M0 0h400v300H0z"/>
<text fill="#9B9B9B" font-family="Times New Roman,Times,serif"
 font-size="72" font-weight="bold">
<tspan x="93" y="172">offline</tspan></text></g></svg>
`;

self.addEventListener('install', event => {
  event.waitUntil(caches.open('offline-fallbacks')
    .then(cache => cache.add('offline.html'))
    .then(() => self.skipWaiting())
  );
});
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request)
      .catch(error => {
        return caches.open('offline-fallbacks')
        .then(cache => cache.match('offline.html'));
      })
    );
  } else if (event.request.headers.get('Accept').indexOf('image') !== -1) {
    event.respondWith(fetch(event.request)
      .catch(error => {
        return new Response(offlineSVG,
          { headers: { 'Content-Type': 'image/svg+xml'}});
      })
    );
  }
});
