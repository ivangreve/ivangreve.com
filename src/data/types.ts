/**
 * Shape of the resume content. Both language files must satisfy `ResumeData`,
 * so a section added in English fails the type-check until Spanish catches up.
 */

export interface Link {
  label: string;
  href: string;
  /** Shown next to the label on the contact rail. */
  handle?: string;
}

export interface Role {
  title: string;
  /** e.g. "Apr 2023 — Present". Kept as a string: these are labels, not dates to compute with. */
  period: string;
}

export interface Job {
  company: string;
  /** Optional link to the company site. */
  href?: string;
  /**
   * Path under /public to a SQUARE company mark, e.g. '/logos/cookunity.webp'.
   * Omit and the tile falls back to the company's initial, which always renders
   * and is never the wrong company's logo.
   *
   * Square marks only — every one of these companies publishes a horizontal
   * wordmark, and a wordmark at 30px is an illegible smudge. 120px or larger.
   */
  logo?: string;
  location: string;
  /** Total span across every role at this company. */
  period: string;
  /** More than one entry renders as a promotion track. */
  roles: Role[];
  summary?: string;
  highlights: string[];
  stack: string[];
  /** Runs alongside another job — rendered with a "concurrent" marker. */
  concurrent?: boolean;
}

export interface Shot {
  /** Path under /public. Every slide is letterboxed to 16:10 with transparent
   *  padding, so one file reads correctly against either theme. */
  src: string;
  /** Describe what the screen shows, not that it is a screenshot. */
  alt: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  /** Carousel slides. Omit or leave empty for a text-only entry. */
  shots?: Shot[];
  /**
   * Only ever list links a stranger can actually open. A link to a private
   * repository 404s for every visitor, which reads worse than no link at all.
   */
  links: Link[];
  /**
   * The source is closed. Renders a plain "private source" marker instead of a
   * link, which says the work is real without sending anyone to a 404.
   */
  privateSource?: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Study {
  institution: string;
  degree: string;
  period: string;
  note?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeData {
  lang: 'en' | 'es';
  /** Path to the same page in the other language. */
  altLang: { code: 'en' | 'es'; label: string; href: string };

  meta: {
    title: string;
    description: string;
  };

  name: string;
  /** The ATS-facing job title. Appears in <h1> and <title>. */
  role: string;
  location: string;
  /** Two or three sentences. The positioning statement. */
  intro: string[];

  links: Link[];
  email: string;

  ui: {
    skipToContent: string;
    toggleTheme: string;
    printResume: string;
    /** Marks a job held alongside another one. */
    concurrent: string;
    /** Visually hidden, appended to every link that opens a new tab. */
    newTab: string;
    /** Marker on projects whose repository is closed. */
    privateSource: string;
    /** Footer line naming when the page was last updated. */
    lastUpdated: string;
    /** Labels for the project image carousel. */
    carousel: {
      previous: string;
      next: string;
      goToSlide: string;
      /** Joins position and total, as in "2 of 5". */
      slideOf: string;
    };
  };

  /**
   * Section labels. Each one is both the heading above the section and its
   * label in the top-bar nav, so the two can never disagree. `contact` has no
   * heading of its own — the contact block uses `contact.heading` — but it does
   * appear in the nav.
   */
  sections: {
    experience: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
  };

  jobs: Job[];
  /**
   * One line above the project list naming what the three have in common.
   * Three cards read as three cards; named, they read as a point of view.
   */
  projectsLede: string;
  projects: Project[];
  skills: SkillGroup[];
  education: Study[];
  certifications: Certification[];

  contact: {
    heading: string;
    cta: string;
  };

  footer: string;
}
