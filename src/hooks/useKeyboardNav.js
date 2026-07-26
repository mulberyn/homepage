import { useEffect } from 'react'
import { userData } from '../config/data.js'

/**
 * useKeyboardNav
 * -------------------------------------------------------------------------
 * Adds power-user keyboard navigation between sections:
 *   • j / ↓ / ArrowDown  → next section
 *   • k / ↑ / ArrowUp    → previous section
 *   • g / Home           → jump to top (first section)
 *   • G / End            → jump to last section
 *   • 1–9                → jump to the Nth section
 *   • t                  → toggle dark / light theme
 *
 * Keystrokes are ignored while typing in an input/textarea or when a modifier
 * key is held, so it never fights with the browser or form fields.
 */
export default function useKeyboardNav({ toggleTheme } = {}) {
  useEffect(() => {
    const ids = userData.navItems.map((n) => n.id)

    const currentIndex = () => {
      // The section whose top is closest to (just above) the viewport middle.
      const mid = window.innerHeight * 0.35
      let best = 0
      let bestDist = Infinity
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const dist = Math.abs(el.getBoundingClientRect().top - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      return best
    }

    const goTo = (i) => {
      const clamped = Math.max(0, Math.min(ids.length - 1, i))
      const el = document.getElementById(ids[clamped])
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const onKey = (e) => {
      // Ignore if typing or using shortcuts with modifiers.
      const tag = e.target?.tagName
      if (
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        e.target?.isContentEditable
      ) {
        return
      }

      switch (e.key) {
        case 'j':
        case 'ArrowDown':
          e.preventDefault()
          goTo(currentIndex() + 1)
          break
        case 'k':
        case 'ArrowUp':
          e.preventDefault()
          goTo(currentIndex() - 1)
          break
        case 'g':
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'G':
        case 'End':
          e.preventDefault()
          goTo(ids.length - 1)
          break
        case 't':
          toggleTheme?.()
          break
        default:
          // Number keys 1–9 → jump to that section.
          if (/^[1-9]$/.test(e.key)) {
            e.preventDefault()
            goTo(Number(e.key) - 1)
          }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleTheme])
}
