import { useEffect, useState, type RefObject } from 'react'

interface UseInViewOptions {
  rootMargin?: string
  once?: boolean
  disabled?: boolean
}

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { rootMargin = '560px 0px', once = true, disabled = false }: UseInViewOptions = {},
) {
  const [inView, setInView] = useState(disabled)

  useEffect(() => {
    if (disabled) {
      setInView(true)
      return
    }

    const node = ref.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        setInView(true)
        if (once) {
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [disabled, once, ref, rootMargin])

  return inView
}
