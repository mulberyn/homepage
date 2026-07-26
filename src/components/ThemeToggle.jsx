import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Coffee } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

/**
 * ThemeToggle
 * -------------------------------------------------------------------------
 * A single, friendly toggle between the two light themes:
 *   • "light" (fresh)  → sun icon
 *   • "warm"  (creamy) → coffee icon
 * Animated icon swap keeps it playful without a heavy dark-mode switch.
 */
export default function ThemeToggle() {
  const { isWarm, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isWarm ? 'Switch to fresh theme' : 'Switch to warm theme'}
      title={isWarm ? 'Fresh' : 'Creamy warm'}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-bg-card text-primary shadow-soft transition-colors duration-300 hover:border-primary-soft"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isWarm ? 'warm' : 'light'}
          initial={{ y: 14, opacity: 0, rotate: -20 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isWarm ? <Coffee size={17} /> : <Sun size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
