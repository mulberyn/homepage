import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, GraduationCap, Mail } from 'lucide-react'
import { userData } from '../config/data.js'

/**
 * Hero
 * -------------------------------------------------------------------------
 * The identity header at the top of the page (replaces the old sidebar):
 * avatar, name, title, affiliation, and social links. Centered, airy, warm.
 */

const SOCIAL_ICONS = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  scholar: GraduationCap,
  email: Mail,
}

function SocialLinks() {
  const socials = userData.socials || {}
  const entries = Object.entries(socials).filter(
    ([key, val]) => val && SOCIAL_ICONS[key]
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card text-text-secondary shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-lift"
          >
            <Icon size={18} strokeWidth={2} />
          </a>
        )
      })}
    </div>
  )
}

export default function Hero() {
  return (
    <motion.section
      id="top"
      className="flex flex-col items-center px-6 pb-6 pt-14 text-center sm:pt-20"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Avatar with a soft, static warm ring (no rotation — keep it calm). */}
      <div className="relative mb-6 h-32 w-32 sm:h-36 sm:w-36">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-dashed border-primary-soft/60"
        />
        <img
          src={userData.avatar}
          alt={userData.name}
          className="absolute inset-[8px] h-[calc(100%-16px)] w-[calc(100%-16px)] rounded-full border-4 border-bg-card object-cover shadow-soft"
        />
      </div>

      <h1 className="font-sans text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
        {userData.name}
      </h1>
      <p className="mt-2 font-sans text-base font-medium text-primary">
        {userData.title}
      </p>
      <p className="mt-1 text-sm text-text-muted">{userData.affiliation}</p>

      <div className="mt-6">
        <SocialLinks />
      </div>
    </motion.section>
  )
}
