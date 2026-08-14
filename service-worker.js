const CACHE_NAME = "villar-static-v30";
const APP_SHELL = [
  "/",
  "/index.html",
  "/assets/js/config.js",
  "/assets/js/contact.js",
  "/assets/js/errors.js",
  "/assets/js/footer.js",
  "/assets/js/form.js",
  "/assets/js/main.js",
  "/assets/js/motion.js",
  "/assets/js/navigation.js",
  "/assets/js/process.js",
  "/assets/js/service-worker.js",
  "/assets/css/premium.css",
  "/assets/images/conhecimento-na-pratica.jpg",
  "/assets/images/mobilizacao-de-equipes.jpg",
  "/assets/images/atuacao-nas-organizacoes.jpg",
  "/assets/images/premio-lixo-zero-2025.jpg",
  "/assets/images/hero-coleta-seletiva.jpg",
  "/assets/images/logo-villar.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request);
      const networkResponse = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            return cache.put(event.request, response.clone()).then(() => response);
          }
          return response;
        })
        .catch(() => cachedResponse);

      if (cachedResponse) {
        event.waitUntil(networkResponse);
        return cachedResponse;
      }

      return networkResponse;
    }),
  );
});
