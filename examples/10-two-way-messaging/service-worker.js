/* global self */
const SWVERSION = 'damn-fine-coffee-3948afe';
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('message', event => {
  if (event.data.cmd === 'identify') {
    event.ports[0].postMessage({ version: SWVERSION });
  }
});
