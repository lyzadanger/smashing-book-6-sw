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
    return caches.open('content').then(cache => cache.put(request, response));
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

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    return fetch(event.request)
      .then(response => addToCache(event.request, response),
            error    => findInCache(event.request))
      .catch(error   => findInCache('offline.html'));
  } else if (event.request.headers.get('Accept').indexOf('image') !== -1) {
    return findInCache(event.request)
      .catch(error => fetch(event.request))
      .then(response => addToCache(event.request, response),
            error => {
              return new Response(offlineSVG,
                { headers: { 'Content-Type': 'image/svg+xml'}}
              );
            }
      );
  }
});
