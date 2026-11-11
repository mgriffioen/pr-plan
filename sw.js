// Keeps the app itself available offline. Trip data is cached separately by Firebase.
const CACHE = "pr-trip-v1";
const SHELL = ["./", "./index.html", "./firebase-config.js", "./manifest.webmanifest", "./icon-180.png", "./icon-512.png"];
const CDN_HOSTS = ["www.gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    // Network first, so updates you push show up; cached copy when offline.
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html"))));
  } else if (CDN_HOSTS.includes(url.hostname)) {
    // Libraries and fonts: cached copy first, refreshed in the background.
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; }).catch(() => hit);
      return hit || net;
    }));
  }
  // Everything else (Firebase sign-in and database traffic) goes straight to the network.
});
