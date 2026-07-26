import { useEffect, useState } from 'react'

/**
 * useHeaderScroll
 * -------------------------------------------------------------------------
 * Scroll-awareness for the floating TopNav (Astro-Theme-Pure-style behavior):
 *
 *   • `notTop`  — true once the page has scrolled past a small threshold
 *     (20px). The nav uses this to morph from a transparent, full-width bar
 *     into a detached "pill" with border, background and shadow.
 *   • `hidden`  — true while scrolling DOWN beyond 350px. Any upward scroll
 *     (or being near the top) brings the bar back immediately, so it never
 *     gets in the way of reading but is always one flick away.
 *
 * State updates are rAF-throttled like useScrollSpy so fast scrolling never
 * floods React with renders.
 */
export default function useHeaderScroll() {
  const [notTop, setNotTop] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let prev = window.scrollY
    let raf = 0
    setNotTop(prev > 20)

    const update = () => {
      raf = 0
      const y = window.scrollY
      setNotTop(y > 20)
      // Hide only when actually moving down past the threshold; show the
      // moment the user scrolls up (mirrors Pure's `data-show` logic).
      if (y < 350 || y < prev) setHidden(false)
      else if (y > prev) setHidden(true)
      prev = y
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return { notTop, hidden }
}
