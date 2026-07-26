import { motion } from 'framer-motion'
import { FileText, Github, ExternalLink, BookOpen, Quote } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Publication } from '../config/data'

/**
 * PublicationItem
 * -------------------------------------------------------------------------
 * One publication rendered as a vertical-timeline entry (node on the parent
 * <TimelineList>'s dashed line). Shows venue · year, title, authors, and a row
 * of link buttons built from the `links` object in data.ts.
 */

interface LinkMeta {
  icon: LucideIcon
  label: string
}

const LINK_META: Record<string, LinkMeta> = {
  pdf: { icon: FileText, label: 'PDF' },
  code: { icon: Github, label: 'Code' },
  project: { icon: ExternalLink, label: 'Project' },
  arxiv: { icon: BookOpen, label: 'arXiv' },
  bibtex: { icon: Quote, label: 'BibTeX' },
}

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

interface PublicationItemProps {
  publication: Publication
  isLast?: boolean
}

export default function PublicationItem({
  publication,
  isLast,
}: PublicationItemProps) {
  const { title, authors, venue, year, links = {} } = publication
  const linkEntries = Object.entries(links).filter(
    (entry): entry is [string, string] => Boolean(entry[1])
  )

  return (
    <motion.li
      className="group relative pl-8"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Dashed connector down to the next node (hidden on the last item). */}
      {!isLast && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-[6px] top-2 h-[calc(100%+1.75rem)] border-l border-dashed border-border"
        />
      )}

      {/* Node dot: anchored to the li's left (on the dashed line) and vertically
          centered to the venue·year line box. */}
      <span className="absolute left-0 top-2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-primary bg-bg transition-colors duration-300 group-hover:bg-primary" />

      <div className="font-sans text-xs font-semibold uppercase tracking-wider text-primary">
        {venue} · {year}
      </div>
      <h3 className="mt-0.5 font-sans text-base font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      {authors && <p className="mt-0.5 text-sm text-text-secondary">{authors}</p>}

      {linkEntries.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {linkEntries.map(([key, url]) => {
            const meta = LINK_META[key] ?? {
              icon: ExternalLink,
              label: titleCase(key),
            }
            const Icon = meta.icon
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-sans text-xs font-medium text-text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                <Icon size={13} strokeWidth={2.2} />
                {meta.label}
              </a>
            )
          })}
        </div>
      )}
    </motion.li>
  )
}
