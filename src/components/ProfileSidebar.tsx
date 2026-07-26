import { motion } from 'framer-motion'
import { MapPin, Mail } from 'lucide-react'
import { userData } from '../config/data'
import { asset } from '../utils/asset'
import SocialLinks from './SocialLinks'

/**
 * ProfileSidebar
 * -------------------------------------------------------------------------
 * The identity column — deliberately navigation-free (links and the cursive
 * brand live in TopNav):
 *   • circular avatar with a soft dashed ring + shadow
 *   • name, clickable @handle, title
 *   • social icon links (missing ones hide automatically)
 *
 * Two responsive shapes from ONE markup:
 *   • ≥960px (`side:`) — a fixed-width (270px) vertical column that sticks
 *     below the top nav while the content scrolls past it. It sits inside
 *     the centered page container, so it never hugs the screen edge.
 *   • <960px — collapses into the normal page flow at the top: avatar and
 *     text side by side, socials underneath, content following below.
 */
export default function ProfileSidebar() {
  const { name, title, email, location, avatar, githubHandle, githubUrl } =
    userData

  return (
    <aside className="side:w-[270px] side:shrink-0">
      <motion.div
        className="pt-8 side:sticky side:top-24 side:pt-12"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        {/* Identity: horizontal row on mobile, centered column on desktop. */}
        <div className="flex items-center gap-5 side:flex-col side:gap-0">
          {/* Avatar: square photo cropped to a circle inside a calm dashed
              ring, lifted by a soft warm shadow. 80px on mobile, 120px on
              desktop. */}
          <div className="relative h-[92px] w-[92px] shrink-0 side:h-[132px] side:w-[132px]">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-dashed border-primary-soft/60"
            />
            <img
              src={asset(avatar)}
              alt={name}
              className="absolute inset-[6px] h-[80px] w-[80px] rounded-full border-[3px] border-bg-card object-cover shadow-soft side:h-[120px] side:w-[120px]"
            />
          </div>

          <div className="min-w-0 side:mt-4 side:flex side:flex-col side:items-center side:text-center">
            <h1 className="font-sans text-xl font-bold leading-tight text-text-primary">
              {name}
            </h1>

            {/* Clickable @handle -> GitHub (new tab). */}
            {githubHandle && (
              <a
                href={githubUrl || `https://github.com/${githubHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-block font-sans text-sm font-medium text-primary transition-colors duration-200 hover:text-primary-soft hover:underline side:mt-1"
              >
                @{githubHandle}
              </a>
            )}

            {title && (
              <p className="mt-0.5 font-sans text-[13px] leading-snug text-text-muted side:mt-1">
                {title}
              </p>
            )}

            {/* Contact rows below the @handle: icon + text, matching the
                sidebar's quiet 13px style. */}
            {location && (
              <p className="mt-1.5 flex items-center gap-1.5 font-sans text-[13px] text-text-secondary side:mt-2 side:justify-center">
                <MapPin size={14} strokeWidth={2} className="shrink-0 text-text-muted" />
                {location}
              </p>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-1 flex min-w-0 items-center gap-1.5 font-sans text-[13px] text-text-secondary transition-colors duration-200 hover:text-primary side:justify-center"
              >
                <Mail size={14} strokeWidth={2} className="shrink-0 text-text-muted" />
                <span className="truncate">{email}</span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <SocialLinks />
        </div>
      </motion.div>
    </aside>
  )
}
