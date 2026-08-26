const CACHE_NAME = 'donchik-media-v1'
const CACHEABLE = /\.(?:png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|mp4)$/i

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') {
    return
  }

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) {
    return
  }

  const isAsset =
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/video/') ||
    url.pathname.startsWith('/fonts/')
  if (!isAsset && !CACHEABLE.test(url.pathname)) {
    return
  }

  event.respondWith(cacheFirst(request))
})

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)
  if (cached) {
    return cached
  }

  const response = await fetch(request)
  if (response.ok) {
    await cache.put(request, response.clone())
  }
  return response
}
