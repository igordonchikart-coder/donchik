const results = new Map<string, unknown>()
const inflight = new Map<string, Promise<unknown>>()

export function readCache<T>(key: string): T | undefined {
  if (!results.has(key)) {
    return undefined
  }
  return results.get(key) as T
}

export function writeCache<T>(key: string, value: T): void {
  results.set(key, value)
}

export function invalidateCache(scope: string): void {
  for (const key of [...results.keys()]) {
    if (key === scope || key.startsWith(`${scope}:`)) {
      results.delete(key)
    }
  }
  for (const key of [...inflight.keys()]) {
    if (key === scope || key.startsWith(`${scope}:`)) {
      inflight.delete(key)
    }
  }
}

export function loadCached<T>(key: string, loader: () => Promise<T>): Promise<T> {
  const pending = inflight.get(key)
  if (pending) {
    return pending as Promise<T>
  }

  const request = loader()
    .then((value) => {
      writeCache(key, value)
      return value
    })
    .finally(() => {
      inflight.delete(key)
    })

  inflight.set(key, request)
  return request
}

export function cacheScope(key: string): string {
  return key.split(':')[0] ?? key
}
