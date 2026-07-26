import { Fragment } from 'react'
import { userData } from '../config/data.js'
import Section from './Section.jsx'
import TimelineItem from './TimelineItem.jsx'
import PublicationCard from './PublicationCard.jsx'
import AwardItem from './AwardItem.jsx'

/**
 * Render a bio string, turning **double-asterisk** spans into highlighted text
 * and preserving paragraph breaks (blank lines). Dependency-free.
 */
function RichBio({ text }) {
  return text.split('\n\n').map((para, pi) => (
    <p
      key={pi}
      className="text-[15px] leading-loose text-text-secondary sm:text-base"
    >
      {para.split(/(\*\*[^*]+\*\*)/g).map((chunk, ci) => {
        const match = chunk.match(/^\*\*([^*]+)\*\*$/)
        return match ? (
          <span key={ci} className="highlight">
            {match[1]}
          </span>
        ) : (
          <Fragment key={ci}>{chunk}</Fragment>
        )
      })}
    </p>
  ))
}

// Soft pastel tints, cycled across sections for a fresh alternating look.
const TINTS = [
  'var(--tint-blush)',
  'var(--tint-sky)',
  'var(--tint-mint)',
  'var(--tint-peach)',
]

/**
 * MainContent
 * -------------------------------------------------------------------------
 * The centered content column (max-width ~900px) below the sticky nav bar.
 * Each block is wrapped in <Section> which supplies the scroll-anchor id, a
 * pastel panel tint, and the fade-up reveal. Sections only render if their nav
 * item exists AND there is data, so removing a navItem or emptying an array
 * cleanly hides the section.
 */
export default function MainContent() {
  const enabled = new Set(userData.navItems.map((n) => n.id))
  let idx = 0
  const next = () => ++idx
  // Pick a tint based on how many sections have been shown so far.
  const tintFor = () => TINTS[(idx - 1) % TINTS.length]

  return (
    <main className="mx-auto w-full max-w-[900px] px-5 pb-24 sm:px-8">
      <div className="space-y-8 sm:space-y-10">
        {/* ---------------- About ---------------- */}
        {enabled.has('about') && userData.about && (
          <Section
            id="about"
            index={next()}
            title="About"
            tint={tintFor()}
          >
            <div className="space-y-4">
              <RichBio text={userData.about} />
            </div>
          </Section>
        )}

        {/* ---------------- Education ---------------- */}
        {enabled.has('education') && userData.education?.length > 0 && (
          <Section
            id="education"
            index={next()}
            title="Education"
            tint={tintFor()}
          >
            <ul className="space-y-8">
              {userData.education.map((item, i) => (
                <TimelineItem
                  key={i}
                  date={item.date}
                  title={item.title}
                  subtitle={item.institution}
                  description={item.description}
                />
              ))}
            </ul>
          </Section>
        )}

        {/* ---------------- Experience ---------------- */}
        {enabled.has('experience') && userData.experience?.length > 0 && (
          <Section
            id="experience"
            index={next()}
            title="Experience"
            tint={tintFor()}
          >
            <ul className="space-y-8">
              {userData.experience.map((item, i) => (
                <TimelineItem
                  key={i}
                  date={item.date}
                  title={item.title}
                  subtitle={item.company}
                  description={item.description}
                />
              ))}
            </ul>
          </Section>
        )}

        {/* ---------------- Publications ---------------- */}
        {enabled.has('publications') && userData.publications?.length > 0 && (
          <Section
            id="publications"
            index={next()}
            title="Publications"
            tint={tintFor()}
          >
            <div className="grid grid-cols-1 gap-4">
              {userData.publications.map((pub, i) => (
                <PublicationCard key={i} publication={pub} />
              ))}
            </div>
          </Section>
        )}

        {/* ---------------- Honors & Awards ---------------- */}
        {enabled.has('awards') && userData.awards?.length > 0 && (
          <Section
            id="awards"
            index={next()}
            title="Honors & Awards"
            tint={tintFor()}
          >
            <ul className="grid grid-cols-1 gap-3">
              {userData.awards.map((award, i) => (
                <AwardItem
                  key={i}
                  date={award.date}
                  title={award.title}
                  organization={award.organization}
                />
              ))}
            </ul>
          </Section>
        )}
      </div>
    </main>
  )
}
