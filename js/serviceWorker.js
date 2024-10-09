const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "https://teles-gabriel.github.io/PWA-concept/",
  "https://teles-gabriel.github.io/PWA-concept/index.html",
  "https://teles-gabriel.github.io/PWA-concept/css/style.css",
  "https://teles-gabriel.github.io/PWA-concept/js/app.js",
  "https://teles-gabriel.github.io/PWA-concept/images/coffee1.jpg",
  "https://teles-gabriel.github.io/PWA-concept/images/coffee2.jpg",
  "https://teles-gabriel.github.io/PWA-concept/images/coffee3.jpg",
  "https://teles-gabriel.github.io/PWA-concept/images/coffee4.jpg",
  "https://teles-gabriel.github.io/PWA-concept/images/coffee5.jpg",
  "https://teles-gabriel.github.io/PWA-concept/images/coffee6.jpg",
  "https://teles-gabriel.github.io/PWA-concept/images/coffee7.jpg",
  "https://teles-gabriel.github.io/PWA-concept/images/coffee8.jpg",
  "https://teles-gabriel.github.io/PWA-concept/images/coffee9.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

// self.addEventListener("fetch", fetchEvent => {
//     fetchEvent.respondWith(
//       caches.match(fetchEvent.request).then(res => {
//         return res || fetch(fetchEvent.request)
//       })
//     )
//   })

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return the cached response immediately
        fetch(fetchEvent.request).then(networkResponse => {
          // Update the cache in the background with the network response
          caches.open(staticDevCoffee).then(cache => {
            cache.put(fetchEvent.request, networkResponse.clone());
          });
        });
        return cachedResponse; // Return the cached version
      }
      return fetch(fetchEvent.request); // If no cached response, fallback to network
    })
  );
});


self.addEventListener("activate", activateEvent => {
  const cacheWhitelist = [staticDevCoffee]; // Aqui, incluímos apenas o cache atual
  activateEvent.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Remove caches que não estão na whitelist
          }
        })
      );
    })
  );
});
