/* global self */
const SWVERSION = 'buffalo-buffalo-buffalo-buffalo-a4ff9c';
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {
  console.log(`Client just said: "${event.data}"`);
  console.log(`I am ${SWVERSION}`);
});
