export function registerServiceWorker() {
  const isSecureProduction =
    window.isSecureContext && !["localhost", "127.0.0.1"].includes(location.hostname);

  if (!isSecureProduction || !("serviceWorker" in navigator)) {
    return;
  }

  navigator.serviceWorker.register("/service-worker.js").catch((error) => {
    console.warn("Service Worker indisponível.", error);
  });
}
