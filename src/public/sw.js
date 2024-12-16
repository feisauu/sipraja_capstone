self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('sipraja-cache').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/styles/styles.css',
      '/scripts/main.js',
      '/icons/icon-192x192.jpg',
      '/icons/icon-512x512.jpg',
      '/manifest.json', // Add the manifest file here
    ])),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request)),
  );
});
