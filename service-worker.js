// Archivos a guardar para usar la app offline
const CACHE_NAME = "premed-anatomia-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];

// INSTALACIÓN DEL SERVICE WORKER
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVACIÓN DEL SERVICE WORKER
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// INTERCEPTAR PETICIONES PARA USAR OFFLINE
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si existe en caché, lo devuelve; si no, pide a la red
      return response || fetch(event.request);
    })
  );
});
