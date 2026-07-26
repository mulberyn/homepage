// =============================================================================
//  👋  EDIT THIS FILE — this is the ONLY file most people need to touch.
// -----------------------------------------------------------------------------
//  Everything on your homepage is driven by the `userData` object below.
//  Change the text, add/remove array items, and the page updates automatically.
//
//  TIPS
//   • Arrays render in order — put the newest / most important item first.
//   • Any field you leave as an empty string ("") or remove is simply hidden.
//   • Images: put files in the /public folder and reference them as
//     "/avatar.jpg", "/zjut-logo.svg", etc. (the leading slash is important).
//   • In the `about` text, wrap words in **double asterisks** to highlight them.
// =============================================================================

export interface Socials {
  github?: string;
  twitter?: string;
  linkedin?: string;
  scholar?: string;
  email?: string;
}

export interface SeoConfig {
  siteUrl?: string;
  description?: string;
  ogImage?: string;
  keywords?: string[];
  lang?: string;
  twitterHandle?: string;
}

export interface EducationEntry {
  school: string;
  logo?: string;
  major?: string;
  degree?: string;
  dates?: string;
}

export interface ExperienceEntry {
  date?: string;
  title: string;
  company?: string;
  description?: string;
}

/** Known link keys get a dedicated icon; any other key renders a generic one. */
export type PublicationLinks = Partial<
  Record<"pdf" | "code" | "project" | "arxiv" | "bibtex", string>
> &
  Record<string, string | undefined>;

export interface Publication {
  title: string;
  authors?: string;
  venue?: string;
  year?: string;
  links?: PublicationLinks;
}

export type Medal = "gold" | "silver";

export interface Award {
  title: string;
  date?: string;
  medal?: Medal;
  highlight?: boolean;
}

export interface ProjectEntry {
  title: string;
  description?: string;
  /** Repo or live-site link; leave empty ("") to render a non-clickable item. */
  url?: string;
  /** Optional tech tags rendered as small pills. */
  tech?: string[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface UserData {
  name: string;
  title: string;
  email?: string;
  /** Shown in the sidebar as a MapPin row (e.g. "Hangzhou Zhejiang"). */
  location?: string;
  /** Optional; used by the SEO JSON-LD as the affiliated organization. */
  affiliation?: string;
  avatar?: string;
  githubHandle?: string;
  githubUrl?: string;
  socials?: Socials;
  seo?: SeoConfig;
  about?: string;
  education?: EducationEntry[];
  experience?: ExperienceEntry[];
  publications?: Publication[];
  awards?: Award[];
  projects?: ProjectEntry[];
  navItems: NavItem[];
}

export const userData: UserData = {
  // --- Personal ---------------------------------------------------------------
  name: "Zhang Sheng",
  title: "CS Student / Competitive Programmer",
  // Contact rows in the sidebar (icon + text). The email here is the one
  // displayed next to the Mail icon; the socials.email below only powers the
  // round mail icon button.
  email: "zhangsheng26@stu.pku.edu.cn",
  location: "Hangzhou Zhejiang",

  // Avatar image. A placeholder ships in /public/avatar.svg — replace it with
  // your own photo (e.g. drop /public/avatar.jpg and set avatar: '/avatar.jpg').
  avatar: "/avatar.jpeg",

  // GitHub handle shown under your name (rendered as "@handle", links to the URL
  // in a new tab).
  githubHandle: "mulberyn",
  githubUrl: "https://github.com/mulberyn",

  // Social / academic profile links. Delete any you don't use — a missing/empty
  // link hides its icon automatically.
  socials: {
    github: "https://github.com/mulberyn",
    twitter: "",
    linkedin: "",
    scholar: "",
    email: "mulberyn@gmail.com",
  },

  // --- SEO / Social sharing ---------------------------------------------------
  // Fills in the page <title>, meta description, Open Graph / Twitter cards, and
  // JSON-LD structured data. All optional — sensible fallbacks are used.
  seo: {
    siteUrl: "https://mulberyn.github.io/homepage/",
    description:
      "Personal homepage of Zhang Sheng (@mulberyn) — CS student and " +
      "competitive programmer (ICPC / CCPC medalist), ZJUT → Peking University.",
    ogImage: "/avatar.svg",
    keywords: [
      "competitive programming",
      "ICPC",
      "CCPC",
      "algorithms",
      "computer science",
    ],
    lang: "en",
    twitterHandle: "",
  },

  // --- About ------------------------------------------------------------------
  // A short bio. Wrap words in **double asterisks** to highlight them.
  about:
    "I am a Computer Science student and competitive programmer. I earned my bachelor's degree at Zhejiang University of Technology (Experimental Class) and am beginning my master's at **Peking University.**\n\n" +
    "I enjoy algorithms, problem solving, and building clean solutions. I am deeply interested in AGI and LLMs, and I am continuously exploring and learning about computer science and AI.",

  // --- Education --- (array) ---------------------------------------------------
  // Each entry shows a small school logo (put images in /public).
  education: [
    {
      school: "Peking University",
      logo: "/images/pku-logo.svg",
      major:
        "Electronics & Information — School of Software and Microelectronics",
      degree: "M.E.",
      dates: "2026.09 – Present",
    },
    {
      school: "Zhejiang University of Technology",
      logo: "/images/zjut-logo.svg",
      major: "Computer Science and Technology (Experimental Class)",
      degree: "B.E.",
      dates: "2022.09 – 2026.07",
    },
  ],

  // --- Experience --- (array, newest first) ------------------------------------
  experience: [
    {
      date: "2025 – Present",
      title: "Algorithm / Software Intern",
      company: "Example Tech",
      description:
        "Applying algorithmic problem-solving to real-world systems. Replace " +
        "this with your own experience.",
    },
    {
      date: "Summer 2024",
      title: "Backend Engineering Intern",
      company: "Example Startup",
      description:
        "Built internal tooling and services. Replace with your own experience.",
    },
  ],

  // --- Publications --- (array, newest first) ----------------------------------
  // Any link left out of `links` is hidden. Common keys: pdf, code, project.
  publications: [
    {
      title: "Sample Publication Title — replace or remove me",
      authors: "Zhang Sheng, Co-author A, Co-author B",
      venue: "Conference",
      year: "2025",
      links: {
        pdf: "#",
        code: "#",
      },
    },
    {
      title: "Another Sample Paper on Something Interesting",
      authors: "Co-author A, Zhang Sheng",
      venue: "Workshop",
      year: "2024",
      links: {
        pdf: "#",
      },
    },
  ],

  // --- Awards --- (array) ------------------------------------------------------
  // `highlight: true` awards are shown by default; the rest collapse behind a
  // "+ N more" button that expands them inline. `medal` ("gold" | "silver")
  // picks the icon color. Order = display order.
  awards: [
    {
      title:
        "21st Zhejiang Provincial Collegiate Programming Contest — Gold Medal",
      date: "2024.04",
      medal: "gold",
      highlight: true,
    },
    {
      title: "48th ICPC Asia Regional, Jinan Site — Silver Medal",
      date: "2023.12",
      medal: "silver",
      highlight: true,
    },
    {
      title: "48th ICPC Asia Regional, Xi'an Site — Silver Medal",
      date: "2023.11",
      medal: "silver",
      highlight: true,
    },
    {
      title: "9th CCPC, Qinhuangdao Site — Silver Medal",
      date: "2023.10",
      medal: "silver",
      highlight: true,
    },
    {
      title: "47th ICPC Asia Regional, Jinan Site — Silver Medal",
      date: "2022.11",
      medal: "silver",
      highlight: false,
    },
    {
      title: "47th ICPC Asia Regional, Xi'an Site — Silver Medal",
      date: "2022.11",
      medal: "silver",
      highlight: false,
    },
  ],

  // --- Projects --- (array) ----------------------------------------------------
  // Personal / open-source projects, shown as a two-column grid (one column on
  // narrow screens). `url` opens in a new tab; leave it "" for a non-clickable
  // item. `tech` is an optional list of tags rendered as small pills.
  projects: [
    {
      title: "leaf",
      description: "🍃 A clean, config-driven academic homepage template.",
      url: "https://github.com/mulberyn/leaf",
      tech: ["TypeScript", "CSS"],
    },
  ],

  // --- Navigation --- ----------------------------------------------------------
  // Each `id` MUST match a section rendered in MainContent.
  navItems: [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "publications", label: "Publications" },
    { id: "awards", label: "Awards" },
    { id: "projects", label: "Projects" },
  ],
};
