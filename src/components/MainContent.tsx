import { User, GraduationCap, Briefcase, BookOpen, Award, FolderGit } from 'lucide-react'
import { userData } from '../config/data'
import Section from './Section'
import TimelineList from './TimelineList'
import TimelineItem from './TimelineItem'
import EducationItem from './EducationItem'
import PublicationItem from './PublicationItem'
import AwardsList from './AwardsList'
import ProjectItem from './ProjectItem'
import AboutMarkdown, { hasAboutContent } from './AboutMarkdown'

/**
 * MainContent
 * -------------------------------------------------------------------------
 * The scrolling reading column beside the sticky ProfileSidebar (below it on
 * mobile), max-width 850px. Horizontal padding comes from the shared page
 * container in App. Sections are flat; each opens with an icon + title and
 * a two-tone rule that doubles as the separator, so there are no full-width
 * dividers between blocks — just comfortable vertical spacing (2.5rem).
 * Sections only render if their nav item exists AND there is data, so
 * removing a navItem or emptying an array hides the section.
 */
export default function MainContent() {
  const enabled = new Set(userData.navItems.map((n) => n.id))

  return (
    <main className="mx-auto w-full max-w-[850px] pb-20 pt-10 side:pt-12">
      <div className="space-y-10">
        {/* ---------------- About (rendered from src/config/about.md) ---------------- */}
        {enabled.has('about') && hasAboutContent && (
          <Section id="about" icon={User} title="About">
            <AboutMarkdown />
          </Section>
        )}

        {/* ---------------- Education ---------------- */}
        {enabled.has('education') && userData.education && userData.education.length > 0 && (
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
        {enabled.has('experience') && userData.experience && userData.experience.length > 0 && (
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
        {enabled.has('publications') && userData.publications && userData.publications.length > 0 && (
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
        {enabled.has('awards') && userData.awards && userData.awards.length > 0 && (
          <Section id="awards" icon={Award} title="Awards">
            <AwardsList awards={userData.awards} />
          </Section>
        )}

        {/* ---------------- Projects (two-column grid) ---------------- */}
        {enabled.has('projects') && userData.projects && userData.projects.length > 0 && (
          <Section id="projects" icon={FolderGit} title="Projects">
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {userData.projects.map((project, i) => (
                <ProjectItem key={i} {...project} />
              ))}
            </ul>
          </Section>
        )}
      </div>
    </main>
  )
}
