/* global self, Response */
self.addEventListener('fetch', event => {
  event.respondWith(new Response('<p>Service Worker has taken over</p>', {
    headers: { 'Content-Type': 'text/html' }
  }));
});
