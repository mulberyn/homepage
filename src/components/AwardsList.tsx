import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import AwardItem from './AwardItem'
import type { Award } from '../config/data'

/**
 * AwardsList
 * -------------------------------------------------------------------------
 * Renders the awards with an inline "show more" fold:
 *   • awards with `highlight: true` are always visible
 *   • the rest collapse behind a "+ N more" button that expands them inline
 *     (no popup/modal). The button toggles between "+ N more" and "Show less".
 */
export default function AwardsList({ awards = [] }: { awards?: Award[] }) {
  const [expanded, setExpanded] = useState(false)

  const shown = awards.filter((a) => a.highlight)
  const hidden = awards.filter((a) => !a.highlight)

  return (
    <div>
      <ul className="divide-y divide-border">
        {shown.map((award, i) => (
          <AwardItem key={`shown-${i}`} {...award} />
        ))}

        {/* Hidden awards, revealed inline when expanded. */}
        <AnimatePresence initial={false}>
          {expanded &&
            hidden.map((award, i) => (
              <motion.div
                key={`hidden-${i}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-border first:border-t-0"
              >
                <AwardItem {...award} />
              </motion.div>
            ))}
        </AnimatePresence>
      </ul>

      {/* Toggle button — only shown if there are hidden awards. */}
      {hidden.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 font-sans text-xs font-medium text-text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
        >
          {expanded ? (
            <>
              <Minus size={13} strokeWidth={2.5} />
              Show less
            </>
          ) : (
            <>
              <Plus size={13} strokeWidth={2.5} />
              {hidden.length} more
            </>
          )}
        </button>
      )}
    </div>
  )
}
