const CACHE_NAME = 'paschala-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/version.json',
  '/sw.js'
  // Add more static assets if needed
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

// PUSH Notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.text() : 'New Notification';
  const options = {
    body: data,
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png'
  };
  e.waitUntil(
    self.registration.showNotification('Paschala App', options)
  );
});