// =============================================================================
//  👋  EDIT THIS FILE — this is the ONLY file most people need to touch.
// -----------------------------------------------------------------------------
//  Everything on your homepage is driven by the `userData` object below.
//  Change the text, add/remove array items, and the page updates automatically.
//
//  TIPS
//   • Arrays render in order — put the newest / most important item first.
//   • Any field you leave as an empty string ("") or remove from a `links`
//     object is simply hidden. Nothing breaks.
//   • Images: put files in the /public folder and reference them as
//     "/avatar.jpg", "/thumb1.jpg", etc. (the leading slash is important).
//   • In the `about` text, wrap words in **double asterisks** to give them the
//     fluorescent highlighter effect.
// =============================================================================

export const userData = {
  // --- Personal ---------------------------------------------------------------
  name: 'Ada Lovelace',
  title: 'PhD Candidate · Machine Learning',
  affiliation: 'University of Example',
  email: 'ada@example.edu',

  // Avatar image. A placeholder ships in /public/avatar.svg — replace it with
  // your own photo (e.g. drop /public/avatar.jpg and set avatar: '/avatar.jpg').
  // Square images work best. A full URL to a hosted image also works.
  avatar: '/avatar.svg',

  // Social / academic profile links. Delete any you don't use — the icon for a
  // missing/empty link is hidden automatically.
  socials: {
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourprofile',
    scholar: 'https://scholar.google.com/citations?user=XXXX',
    email: 'ada@example.edu', // shown as an email icon in the sidebar
  },

  // --- SEO / Social sharing ---------------------------------------------------
  // Used to fill in the page <title>, meta description, Open Graph / Twitter
  // cards, and JSON-LD structured data (so search engines & social sites show
  // a rich preview). All optional — sensible fallbacks are used if omitted.
  seo: {
    // Full public URL of your deployed site (used for canonical + OG url).
    // e.g. 'https://username.github.io/repository-name/'
    siteUrl: 'https://example.github.io/academic-homepage/',
    // Short description for search results & social cards (~150 chars).
    description:
      'Personal academic homepage of Ada Lovelace — PhD candidate researching ' +
      'machine learning and representation learning at the University of Example.',
    // Preview image for social shares (put a 1200×630 image in /public).
    // Falls back to the avatar if left empty.
    ogImage: '/avatar.svg',
    // Keywords for the meta keywords tag (optional).
    keywords: ['machine learning', 'representation learning', 'research', 'PhD'],
    // Page language (BCP-47 code) — also set on <html lang>.
    lang: 'en',
    // Twitter handle (without the URL) for Twitter card attribution.
    twitterHandle: '@yourhandle',
  },

  // --- About ------------------------------------------------------------------
  // A short bio. Wrap words in **double asterisks** to highlight them.
  about:
    "I am a PhD candidate at the **University of Example**, where I study " +
    'machine learning with a focus on **representation learning** and its ' +
    'applications to scientific discovery. My work sits at the intersection of ' +
    'theory and practice: I care about models that are both **principled** and ' +
    'genuinely useful.\n\n' +
    'Before my PhD, I completed a B.Sc. in Computer Science and spent two years ' +
    'building data infrastructure in industry. Outside of research I enjoy ' +
    'typography, long-distance running, and playing the cello.',

  // --- Education --- (array) ---------------------------------------------------
  education: [
    {
      date: '2021 – Present',
      title: 'Ph.D. in Computer Science',
      institution: 'University of Example',
      description:
        'Advised by Prof. Jane Doe. Thesis on self-supervised representation ' +
        'learning for scientific data.',
    },
    {
      date: '2017 – 2021',
      title: 'B.Sc. in Computer Science',
      institution: 'Institute of Technology',
      description: 'Graduated with First-Class Honours. Minor in Mathematics.',
    },
  ],

  // --- Experience --- (array) --------------------------------------------------
  experience: [
    {
      date: '2024 – Present',
      title: 'Research Intern',
      company: 'Example AI Lab',
      description:
        'Working on scalable pre-training methods for multimodal foundation ' +
        'models.',
    },
    {
      date: 'Summer 2023',
      title: 'Applied Scientist Intern',
      company: 'Tech Corp',
      description:
        'Built an internal tool for large-scale experiment tracking now used ' +
        'across three teams.',
    },
  ],

  // --- Publications --- (array) ------------------------------------------------
  // `thumbnail` is optional (put images in /public). Any link left out of the
  // `links` object is hidden. Common keys: pdf, code, project, arxiv, bibtex.
  publications: [
    {
      title:
        'Principled Representation Learning for Scientific Discovery',
      authors: 'Ada Lovelace, Jane Doe, John Smith',
      venue: 'NeurIPS',
      year: '2025',
      thumbnail: '/thumb1.svg', // optional — put images in /public
      links: {
        pdf: '#',
        code: '#',
        project: '#',
      },
    },
    {
      title: 'On the Geometry of Self-Supervised Embeddings',
      authors: 'Ada Lovelace, Alan Turing',
      venue: 'ICML',
      year: '2024',
      thumbnail: '/thumb2.svg',
      links: {
        pdf: '#',
        arxiv: '#',
      },
    },
    {
      title: 'Efficient Contrastive Pre-training at Scale',
      authors: 'John Smith, Ada Lovelace, Jane Doe',
      venue: 'ICLR',
      year: '2023',
      links: {
        pdf: '#',
        code: '#',
        bibtex: '#',
      },
    },
  ],

  // --- Honors & Awards --- (array) ---------------------------------------------
  awards: [
    {
      date: '2025',
      title: 'Outstanding Paper Award',
      organization: 'NeurIPS',
    },
    {
      date: '2024',
      title: 'Graduate Research Fellowship',
      organization: 'National Science Foundation',
    },
    {
      date: '2021',
      title: 'Dean’s List — Class Valedictorian',
      organization: 'Institute of Technology',
    },
  ],

  // --- Navigation --- ----------------------------------------------------------
  // Each `id` MUST match a section rendered in MainContent. Reorder or remove
  // entries to change the nav (and the sections shown).
  navItems: [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'publications', label: 'Publications' },
    { id: 'awards', label: 'Honors & Awards' },
  ],
}
