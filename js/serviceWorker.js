const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "https://teles-gabriel.github.io/PWA-concept/",
  "https://teles-gabriel.github.io/PWA-concept/index.html",
  "https://teles-gabriel.github.io/PWA-concept/css/style.css",
  "https://teles-gabriel.github.io/PWA-concept/js/pp.js",
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

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })