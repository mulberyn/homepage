import { useCallback, useEffect, useState } from 'react'
import { userData } from '../config/data'

/**
 * useScrollSpy
 * -------------------------------------------------------------------------
 * Tracks which section is currently in view and exposes a smooth-scroll
 * helper. Used by TopNav to highlight the active section link.
 *
 * Uses scroll position (not IntersectionObserver) so the LAST section can
 * still become active even when it's too short to reach the viewport band —
 * a bottom-of-page guard forces the last section at the very bottom.
 */
export default function useScrollSpy() {
  const [active, setActive] = useState<string | undefined>(
    userData.navItems[0]?.id
  )

  useEffect(() => {
    const ids = userData.navItems.map((n) => n.id)
    let raf = 0

    const update = () => {
      raf = 0
      // Viewport line at 35% down; a section is "active" once its top passes
      // it. getBoundingClientRect is viewport-relative — NOT offsetTop, which
      // resolves against the positioned ancestor and would mis-compute.
      const markerVp = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= markerVp) current = id
      }
      // At (or near) the bottom of the page, always show the last section.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = ids[ids.length - 1]
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update() // initial
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Smooth-scroll to a section and optimistically mark it active so the
  // highlight responds immediately instead of waiting for the scroll to land.
  const scrollTo = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }, [])

  return { active, scrollTo }
}
