const CACHE_NAME = 'donchik-media-v1'

let started = false

export function startImageWarmup(urls: string[]): () => void {
  let cancelled = false

  function run() {
    if (cancelled || started) {
      return
    }

    started = true
    void warmup(urls, () => cancelled)
  }

  if (typeof window.requestIdleCallback === 'function') {
    const idleId = window.requestIdleCallback(run, { timeout: 1600 })
    return () => {
      cancelled = true
      window.cancelIdleCallback(idleId)
    }
  }

  const timer = window.setTimeout(run, 350)
  return () => {
    cancelled = true
    window.clearTimeout(timer)
  }
}

async function warmup(urls: string[], isCancelled: () => boolean) {
  const queue = [...new Set(urls.filter(Boolean))]
  await Promise.all([drain(queue, isCancelled), drain(queue, isCancelled)])
}

async function drain(queue: string[], isCancelled: () => boolean) {
  while (!isCancelled() && queue.length > 0) {
    const url = queue.shift()
    if (!url) {
      break
    }

    await cacheUrl(url)
    await wait(50)
  }
}

async function cacheUrl(url: string) {
  try {
    if ('caches' in window) {
      const cache = await caches.open(CACHE_NAME)
      if (await cache.match(url)) {
        return
      }

      const response = await fetch(url, { credentials: 'same-origin', cache: 'force-cache' })
      if (response.ok) {
        await cache.put(url, response)
      }
      return
    }

    await fetch(url, { credentials: 'same-origin', cache: 'force-cache' })
  } catch {
    // Background warmup should not interrupt the page.
  }
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export { CACHE_NAME as mediaCacheName }
