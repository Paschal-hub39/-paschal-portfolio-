self.addEventListener("install", event => {
self.skipWaiting();
});

self.addEventListener("activate", event => {
event.waitUntil(
caches.keys().then(names => {
return Promise.all(names.map(cache => caches.delete(cache)));
})
);
self.clients.claim();
});

self.addEventListener("fetch", event => {
event.respondWith(fetch(event.request));
});