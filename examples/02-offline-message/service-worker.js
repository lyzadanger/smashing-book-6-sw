/* global self, Response, fetch */
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(error => {
        return new Response('<p>You are offline.</p>',
          { headers: { 'Content-Type': 'text/html' } });
      })
    );
  }
});
