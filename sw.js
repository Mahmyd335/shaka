const CACHE_NAME = 'kaspi-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/img/image 1.png',
  '/img/image 2.png',
  '/img/image 3.png',
  '/img/qr.png',
  '/img/qr 2.png',
  '/img/x.png',
  '/img/inbox-out.png',
  '/img/copy.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
