import { Fragment } from 'react'
import { User, GraduationCap, Briefcase, BookOpen, Award } from 'lucide-react'
import { userData } from '../config/data.js'
import Section from './Section.jsx'
import TimelineList from './TimelineList.jsx'
import TimelineItem from './TimelineItem.jsx'
import EducationItem from './EducationItem.jsx'
import PublicationItem from './PublicationItem.jsx'
import AwardsList from './AwardsList.jsx'

/**
 * Render a bio string, turning **double-asterisk** spans into highlighted text
 * and preserving paragraph breaks (blank lines). Dependency-free.
 */
function RichBio({ text }) {
  return text.split('\n\n').map((para, pi) => (
    <p key={pi} className="text-text-secondary [&:not(:first-child)]:mt-3">
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

/**
 * MainContent
 * -------------------------------------------------------------------------
 * The centered reading column (max-width 850px) below the sticky nav bar.
 * Sections are flat; each opens with an icon + title and a two-tone rule that
 * doubles as the separator, so there are no full-width dividers between
 * blocks — just comfortable vertical spacing (2.5rem). Sections only render
 * if their nav item exists AND there is data, so removing a navItem or
 * emptying an array hides the section.
 */
export default function MainContent() {
  const enabled = new Set(userData.navItems.map((n) => n.id))

  return (
    <main className="mx-auto w-full max-w-[850px] px-6 pb-20 sm:px-8">
      <div className="space-y-10">
        {/* ---------------- About ---------------- */}
        {enabled.has('about') && userData.about && (
          <Section id="about" icon={User} title="About">
            <RichBio text={userData.about} />
          </Section>
        )}

        {/* ---------------- Education ---------------- */}
        {enabled.has('education') && userData.education?.length > 0 && (
          <Section id="education" icon={GraduationCap} title="Education">
            <ul className="space-y-5">
              {userData.education.map((item, i) => (
                <EducationItem
                  key={i}
                  school={item.school}
                  logo={item.logo}
                  major={item.major}
                  degree={item.degree}
                  dates={item.dates}
                />
              ))}
            </ul>
          </Section>
        )}

        {/* ---------------- Experience ---------------- */}
        {enabled.has('experience') && userData.experience?.length > 0 && (
          <Section id="experience" icon={Briefcase} title="Experience">
            <TimelineList>
              {userData.experience.map((item, i, arr) => (
                <TimelineItem
                  key={i}
                  date={item.date}
                  title={item.title}
                  subtitle={item.company}
                  description={item.description}
                  isLast={i === arr.length - 1}
                />
              ))}
            </TimelineList>
          </Section>
        )}

        {/* ---------------- Publications ---------------- */}
        {enabled.has('publications') && userData.publications?.length > 0 && (
          <Section id="publications" icon={BookOpen} title="Publications">
            <TimelineList>
              {userData.publications.map((pub, i, arr) => (
                <PublicationItem
                  key={i}
                  publication={pub}
                  isLast={i === arr.length - 1}
                />
              ))}
            </TimelineList>
          </Section>
        )}

        {/* ---------------- Awards (with show-more fold) ---------------- */}
        {enabled.has('awards') && userData.awards?.length > 0 && (
          <Section id="awards" icon={Award} title="Awards">
            <AwardsList awards={userData.awards} />
          </Section>
        )}
      </div>
    </main>
  )
}
