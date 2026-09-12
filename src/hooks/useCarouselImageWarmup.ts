import { useEffect, useState } from 'react'

/** Decode an image into the browser cache; resolves even on error. */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    if (!url) {
      resolve()
      return
    }

    let settled = false
    const done = () => {
      if (settled) {
        return
      }
      settled = true
      resolve()
    }

    const image = new Image()
    image.decoding = 'async'
    image.onload = done
    image.onerror = done
    image.src = url

    if (image.complete) {
      done()
    }
  })
}

/** Warm the active slide plus neighbors for smooth carousel moves. */
export function useCarouselImageWarmup(urls: string[], activeIndex: number) {
  const [activeReady, setActiveReady] = useState(false)
  const count = urls.length
  const safeIndex = count === 0 ? 0 : Math.min(Math.max(activeIndex, 0), count - 1)
  const activeUrl = count > 0 ? urls[safeIndex] : ''

  useEffect(() => {
    setActiveReady(false)
    if (!activeUrl) {
      return
    }

    let cancelled = false
    void preloadImage(activeUrl).then(() => {
      if (!cancelled) {
        setActiveReady(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [activeUrl])

  useEffect(() => {
    if (count < 2) {
      return
    }

    const neighborIndexes = [(safeIndex + 1) % count, (safeIndex - 1 + count) % count]
    for (const index of neighborIndexes) {
      const url = urls[index]
      if (url && url !== activeUrl) {
        void preloadImage(url)
      }
    }
  }, [activeUrl, count, safeIndex, urls])

  return { activeReady, safeIndex }
}

export function isNearCarouselIndex(index: number, activeIndex: number, count: number): boolean {
  if (count <= 1) {
    return index === activeIndex
  }
  if (index === activeIndex) {
    return true
  }
  if (index === (activeIndex + 1) % count) {
    return true
  }
  if (index === (activeIndex - 1 + count) % count) {
    return true
  }
  return false
}
