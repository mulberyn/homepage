import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress
 * -------------------------------------------------------------------------
 * A thin reading-progress bar pinned to the very top of the viewport that
 * fills as you scroll down the page. Uses Framer Motion's `useScroll` +
 * `useSpring` for a smooth, physics-based fill.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-primary"
      style={{ scaleX }}
    />
  )
}
