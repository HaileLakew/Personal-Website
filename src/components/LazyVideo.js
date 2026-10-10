'use client'
import { useEffect, useRef, useState } from 'react'

// Doesn't request the file until the element is within `margin` of the viewport.
export function LazyVideo({ src, className, margin = '800px' }) {
  const ref = useRef(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return setNear(true)
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); io.disconnect() }
    }, { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])

  return <video ref={ref} src={near ? src : undefined} preload="none" autoPlay muted loop playsInline className={className} />
}
