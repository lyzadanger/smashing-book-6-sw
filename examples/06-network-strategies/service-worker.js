/* global caches, fetch, self, Response */
const offlineSVG = `<svg role="img" aria-labelledby="offline-title"
 viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
<title id="offline-title">Offline</title>
<g fill="none" fill-rule="evenodd">
<path fill="#D8D8D8" d="M0 0h400v300H0z"/>
<text fill="#9B9B9B" font-family="Times New Roman,Times,serif"
 font-size="72" font-weight="bold">
<tspan x="93" y="172">offline</tspan></text></g></svg>
`;

function addToCache (request, response) {
  if (response.ok) {
    const copy = response.clone();
    caches.open('content')
      .then(cache => cache.put(request, copy));
  }
  return response;
}
function findInCache (request) {
  return caches.match(request).then(response => {
    if (!response) {
      throw new Error(`${request} not found in cache`);
    }
    return response;
  });
}
function fallbackImage () {
  return new Response(offlineSVG,
    { headers: { 'Content-Type': 'image/svg+xml'}});
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)                                   // 1. network-first
        .then(res  => addToCache(req, res))        // 2. read-through caching
        .catch(err => findInCache(req))            // 3. cache fallback
        .catch(err => findInCache('offline.html')) // 4. offline fallback
    );
  } else if (req.headers.get('Accept').indexOf('image') !== -1) {
    event.respondWith(
      findInCache(req)                             // 1. cache-first
        .catch(err => fetch(req))                  // 2. network fallback
        .then(res  => addToCache(req, res),        // 3. read-through caching
              err  => fallbackImage())             // 4. offline fallback
    );
  }
});
