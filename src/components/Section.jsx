import { motion } from 'framer-motion'

/**
 * Section
 * -------------------------------------------------------------------------
 * A minimal, letter-like content block (mem.ac-style header). Each section
 * opens with a small themed Lucide icon beside the title, followed by a thin
 * two-tone rule: the left ~1/6 in the warm coral accent, the remainder in
 * the default border color. The rule spans exactly the content width and
 * doubles as the visual separator between sections — there is no full-width
 * divider between blocks anymore; vertical rhythm comes from the parent's
 * spacing.
 *
 *   • `id`   — scroll-anchor used by the nav links
 *   • `icon` — Lucide icon component rendered before the title
 *   • a gentle Framer Motion fade-up reveal on scroll into view.
 */
export default function Section({ id, icon: Icon, title, children }) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <header className="mb-6">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <Icon
              aria-hidden
              size={22}
              strokeWidth={2}
              className="shrink-0 text-primary"
            />
          )}
          {/* h2 ~1.5rem — moderate, crisp. */}
          <h2 className="font-sans text-2xl font-semibold text-text-primary">
            {title}
          </h2>
        </div>

        {/* Two-tone rule under the title: accent sixth + muted remainder.
            Full content width, never wider than the reading column. */}
        <div aria-hidden className="mt-2.5 flex h-[2px] w-full overflow-hidden rounded-full">
          <span className="w-1/6 rounded-full bg-primary" />
          <span className="flex-1 rounded-full bg-border" />
        </div>
      </header>

      {children}
    </motion.section>
  )
}
