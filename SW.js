const CACHE_NAME = "paschala-v3-online-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/admin.html",
  "/manifest.json",
  "/sw.js"
];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch files from cache first, then online
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});