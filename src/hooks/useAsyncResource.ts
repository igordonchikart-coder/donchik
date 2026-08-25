import { useCallback, useEffect, useState } from 'react'
import { cacheScope, invalidateCache, loadCached, readCache } from './resourceCache'

interface AsyncResource<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  reload: () => void
}

export function useAsyncResource<T>(
  loader: () => Promise<T>,
  cacheKey: string,
): AsyncResource<T> {
  const cached = readCache<T>(cacheKey)
  const [data, setData] = useState<T | null>(cached ?? null)
  const [dataKey, setDataKey] = useState(cacheKey)
  const [isLoading, setIsLoading] = useState(cached === undefined)
  const [error, setError] = useState<string | null>(null)
  const [reloadToken, setReloadToken] = useState(0)

  if (dataKey !== cacheKey) {
    const next = readCache<T>(cacheKey)
    setDataKey(cacheKey)
    setData(next ?? data)
    setIsLoading(next === undefined && data === null)
    setError(null)
  }

  useEffect(() => {
    let isMounted = true
    const existing = readCache<T>(cacheKey)

    if (existing !== undefined) {
      setData(existing)
      setIsLoading(false)
      return () => {
        isMounted = false
      }
    }

    if (data === null) {
      setIsLoading(true)
    }

    loadCached(cacheKey, loader)
      .then((result) => {
        if (isMounted) {
          setData(result)
          setError(null)
        }
      })
      .catch((caught: unknown) => {
        if (isMounted) {
          setError(caught instanceof Error ? caught.message : 'Could not load data')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- loader is recreated by callers; cacheKey is the source of truth
  }, [cacheKey, reloadToken])

  const reload = useCallback(() => {
    invalidateCache(cacheScope(cacheKey))
    setReloadToken((value) => value + 1)
  }, [cacheKey])

  return { data, isLoading, error, reload }
}
