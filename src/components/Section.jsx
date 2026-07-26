import { motion } from 'framer-motion'

/**
 * Section
 * -------------------------------------------------------------------------
 * Reusable wrapper for every content block. Provides:
 *   • the scroll-anchor `id` (used by the nav links)
 *   • a soft pastel "panel" background (`tint`) for the fresh, airy look
 *   • a clean sans heading with a small accent index tag
 *   • a gentle Framer Motion fade-up reveal on scroll into view.
 *
 * `tint` is a CSS variable name (e.g. 'var(--tint-peach)'); pass different
 * tints to alternate section colors.
 */
export default function Section({ id, index, title, tint, children }) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className="rounded-[28px] border border-border/60 px-6 py-8 shadow-soft sm:px-10 sm:py-10"
        style={{ backgroundColor: tint || 'var(--color-bg-card)' }}
      >
        <header className="mb-7 flex items-baseline gap-3">
          {typeof index === 'number' && (
            <span className="font-sans text-sm font-semibold text-primary">
              {String(index).padStart(2, '0')}
            </span>
          )}
          <h2 className="font-sans text-2xl font-bold tracking-tight text-text-primary sm:text-[1.7rem]">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </motion.section>
  )
}
