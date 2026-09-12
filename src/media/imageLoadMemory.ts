const remembered = new Set<string>()

export function rememberLoadedImage(url: string): void {
  if (url) {
    remembered.add(url)
  }
}

/** True if we already decoded this URL in-session, or the browser has it ready now. */
export function hasLoadedImage(url: string): boolean {
  if (!url) {
    return false
  }

  if (remembered.has(url)) {
    return true
  }

  if (typeof window === 'undefined') {
    return false
  }

  const probe = new Image()
  probe.src = url
  if (probe.complete && probe.naturalWidth > 0) {
    remembered.add(url)
    return true
  }

  return false
}
