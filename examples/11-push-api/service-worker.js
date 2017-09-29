/* global self */
self.addEventListener('push', event => {
  event.waitUntil(self.registration.showNotification('Check it out', {
    body : 'Well, hello there',
    icon : 'smashing.png',
    badge: 'smashing.png'
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow('https://www.smashingmagazine.com/')
  );
});
