self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('rci-apply-v1').then(function (cache) {
      return cache.addAll([
        '/rci-apply/',
        '/rci-apply/index.html',
        '/rci-apply/manifest.json',
        '/rci-apply/icons/icon-192.png',
        '/rci-apply/icons/icon-512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== 'rci-apply-v1'; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (res) {
      return res || fetch(e.request);
    })
  );
});
