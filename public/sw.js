const CACHE_NAME = 'donchik-media-v2'
const CACHEABLE = /\.(?:png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf)$/i

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
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

  // Never intercept video: browsers need Range/partial responses.
  if (url.pathname.startsWith('/video/') || url.pathname.endsWith('.mp4')) {
    return
  }

  const isAsset = url.pathname.startsWith('/assets/') || url.pathname.startsWith('/fonts/')
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
