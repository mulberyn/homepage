import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

/**
 * AwardItem
 * -------------------------------------------------------------------------
 * A single honor/award row. The date sits in a mono "pill" on the left.
 */
export default function AwardItem({ date, title, organization }) {
  return (
    <motion.li
      className="group flex items-center gap-4 rounded-xl border border-border bg-bg-card px-4 py-3 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        <Award size={18} strokeWidth={2.2} />
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-sans font-bold text-text-primary">
          {title}
        </h3>
        {organization && (
          <p className="truncate text-sm text-text-secondary">
            {organization}
          </p>
        )}
      </div>

      <span className="shrink-0 rounded-full bg-surface px-3 py-1 font-sans text-xs font-semibold text-primary">
        {date}
      </span>
    </motion.li>
  )
}
