import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

interface DeferredMountProps {
  children: ReactNode
  rootMargin?: string
  minHeight?: string
}

export function DeferredMount({
  children,
  rootMargin = '720px 0px',
  minHeight = '18rem',
}: DeferredMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const show = useInView(ref, { rootMargin })

  return (
    <div ref={ref} style={show ? undefined : ({ minHeight } satisfies CSSProperties)}>
      {show ? children : null}
    </div>
  )
}
