import { Github, Twitter, Linkedin, GraduationCap, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { userData } from '../config/data'

/**
 * SocialLinks
 * -------------------------------------------------------------------------
 * Round icon buttons for the profiles configured in `userData.socials`.
 * Entries with an empty value are hidden automatically, so only the links
 * you actually fill in (GitHub / Twitter / LinkedIn / Scholar / email) show.
 */

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  scholar: GraduationCap,
  email: Mail,
}

export default function SocialLinks() {
  const socials = userData.socials || {}
  const entries = Object.entries(socials).filter(
    (entry): entry is [string, string] =>
      Boolean(entry[1]) && Boolean(SOCIAL_ICONS[entry[0]])
  )
  if (entries.length === 0) return null

  return (
    <div className="flex items-center justify-center gap-2.5">
      {entries.map(([key, val]) => {
        const Icon = SOCIAL_ICONS[key]
        const href = key === 'email' ? `mailto:${val}` : val
        return (
          <a
            key={key}
            href={href}
            target={key === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={key}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-all duration-200 hover:scale-105 hover:border-primary hover:text-primary"
          >
            <Icon size={17} strokeWidth={2} />
          </a>
        )
      })}
    </div>
  )
}
