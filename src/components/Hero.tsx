import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, GraduationCap, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { userData } from '../config/data'

/**
 * Hero
 * -------------------------------------------------------------------------
 * The identity header at the top of the page: avatar, name, a clickable
 * "@handle" GitHub link, title, and social links. Centered, warm, compact.
 */

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  scholar: GraduationCap,
  email: Mail,
}

function SocialLinks() {
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

export default function Hero() {
  const { name, title, avatar, githubHandle, githubUrl } = userData

  return (
    <motion.section
      id="top"
      className="flex flex-col items-center px-6 pb-4 pt-12 text-center sm:pt-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {/* Avatar with a calm, static warm ring. */}
      <div className="relative mb-4 h-24 w-24">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-dashed border-primary-soft/60"
        />
        <img
          src={avatar}
          alt={name}
          className="absolute inset-[6px] h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full border-[3px] border-bg object-cover"
        />
      </div>

      {/* h1 ~2rem — prominent but not oversized. */}
      <h1 className="font-sans text-[2rem] font-extrabold leading-tight text-text-primary">
        {name}
      </h1>

      {/* Clickable @handle -> GitHub (new tab). */}
      {githubHandle && (
        <a
          href={githubUrl || `https://github.com/${githubHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block font-sans text-sm font-medium text-primary transition-colors duration-200 hover:text-primary-soft hover:underline"
        >
          @{githubHandle}
        </a>
      )}

      {title && (
        <p className="mt-1 text-sm text-text-muted">{title}</p>
      )}

      <div className="mt-5">
        <SocialLinks />
      </div>
    </motion.section>
  )
}
