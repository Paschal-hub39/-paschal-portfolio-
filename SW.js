const CACHE_NAME = "paschala-v2-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/admin.html",
  "/manifest.json",
  "/sw.js",
  "/files/Paschala_CV.pdf",
  "/assets/images/logo.png"
];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch assets from cache first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});