/* html2pwa service worker: offline app shell. Version changes whenever the file list/sizes change. */
const VERSION = 'manticore-v2-1791469129';
const SHELL = [
 "./",
 "assets/hydra-advanced-intelligence-banner.jpg",
 "assets/hydra-crest-ring.png",
 "assets/hydra-crest-shield.png",
 "blueprints/af-eclipse-multiview.png",
 "blueprints/af-eclipse-multiview.svg",
 "blueprints/af-manta-multiview.png",
 "blueprints/af-manta-multiview.svg",
 "blueprints/af-nestling-multiview.png",
 "blueprints/af-nestling-multiview.svg",
 "blueprints/af-xod71-multiview.png",
 "blueprints/af-xod71-multiview.svg",
 "blueprints/af-xsp13-multiview.png",
 "blueprints/af-xsp13-multiview.svg",
 "blueprints/bp-a-bwb-airframe.png",
 "blueprints/bp-a-bwb-airframe.svg",
 "blueprints/bp-b-nestling-node.png",
 "blueprints/bp-b-nestling-node.svg",
 "blueprints/bp-c-rcos-oneeye.png",
 "blueprints/bp-c-rcos-oneeye.svg",
 "blueprints/bp-d-tulving-memory.png",
 "blueprints/bp-d-tulving-memory.svg",
 "blueprints/bp-e-physics-gate.png",
 "blueprints/bp-e-physics-gate.svg",
 "blueprints/bp-f-facilities-map.png",
 "blueprints/bp-f-facilities-map.svg",
 "blueprints/bp-sys-index.png",
 "blueprints/bp-sys-index.svg",
 "blueprints/cr-eclipse.png",
 "blueprints/cr-eclipse.svg",
 "blueprints/cr-manta.png",
 "blueprints/cr-manta.svg",
 "blueprints/cr-nestling.png",
 "blueprints/cr-nestling.svg",
 "blueprints/cr-xod71.png",
 "blueprints/cr-xod71.svg",
 "blueprints/cr-xsp13.png",
 "blueprints/cr-xsp13.svg",
 "blueprints/manifest.json",
 "data.json",
 "icon-source.png",
 "index.html",
 "manifest.webmanifest",
 "pwa-deeplink.js",
 "pwa-icons/favicon-32.png",
 "pwa-icons/icon-152.png",
 "pwa-icons/icon-167.png",
 "pwa-icons/icon-180.png",
 "pwa-icons/icon-192.png",
 "pwa-icons/icon-512.png",
 "pwa-icons/icon-maskable-512.png"
];
self.addEventListener('install', e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== VERSION).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  if (r.mode === 'navigate') { e.respondWith(fetch(r).catch(() => caches.match('index.html'))); return; }  // deep links -> cached shell offline
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(hit => hit || fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(VERSION).then(x => x.put(r, c)); } return res; })));
});
