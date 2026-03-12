// sw.js - Paschala PWA Service Worker

const CACHE_NAME = "paschala-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/file_000000007f107246ba147243c1f7bc16.png",
  // Add other assets you want cached like CSS, JS, game assets
];

// Install - caching files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching Paschala PWA files...");
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch - serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});