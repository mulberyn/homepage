import { motion } from 'framer-motion'

/**
 * TimelineItem
 * -------------------------------------------------------------------------
 * A single row in the Education / Experience vertical timelines.
 * `subtitle` is the institution (education) or company (experience).
 */
export default function TimelineItem({ date, title, subtitle, description }) {
  return (
    <motion.li
      className="group relative pl-8"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Vertical connector line (drawn per-item so it scales to content). */}
      <span className="absolute left-[5px] top-2 h-full w-px bg-border group-last:hidden" />

      {/* Node dot on the timeline. */}
      <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-primary bg-bg transition-colors duration-300 group-hover:bg-primary" />

      <time className="font-sans text-xs font-medium uppercase tracking-wider text-text-muted">
        {date}
      </time>
      <h3 className="mt-1 font-sans text-lg font-bold text-text-primary">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm font-bold text-primary">{subtitle}</p>
      )}
      {description && (
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </motion.li>
  )
}
