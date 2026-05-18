export type Skill = {
  name: string;
  level?: number;
};

export type ProjectLinkLabel = "case study" | "visit website" | "shipped" | string;

export type ProjectGridSize = "sm" | "md" | "lg";

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  outcome: string;
  codeUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  /** e.g. "Case study", "visit website", "shipped" */
  linkLabel?: ProjectLinkLabel;
  client?: string;
  year?: string;
  imageUrl?: string;
  gridSize?: ProjectGridSize;
};

export type AboutSocialStat = {
  id: string;
  badge: string;
  badgeTone: "green" | "orange" | "grey" | "pink";
  title: string;
  subtitle: string;
  href?: string;
};

export type AboutBrand = {
  name: string;
  logoUrl?: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    greeting: string;
    name: string;
    roleLine: string;
    bio: string;
    ctaPrimary: string;
    ctaSecondary: string;
    resumeUrl?: string;
    stats: { label: string; value: string }[];
    /** Large display lines, e.g. ["UI &", "UX", "Designer"] */
    displayLines?: string[];
    /** e.g. "I'm Jedidiah, hello!" */
    helloHeadline?: string;
    /** Short role under headline, e.g. "Full-stack Developer" */
    roleSubtitle?: string;
    profileImageUrl?: string;
    introHeading?: string;
    footerRoleLine?: string;
    footerNote?: string;
    footerStatusLead?: string;
    footerStatusTrail?: string;
    footerSignoff?: string;
    disclaimer?: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    focusTitle: string;
    focus: { title: string; body: string }[];
    /** Large portrait on the About page */
    pageImageUrl?: string;
    phonetic?: string;
    /** Main bio copy on About (falls back to paragraphs joined) */
    bioLong?: string;
    socialStats?: AboutSocialStat[];
    brandsTitle?: string;
    brands?: AboutBrand[];
  };
  services: {
    title: string;
    subtitle: string;
    items: { title: string; body: string }[];
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Project[];
  };
  skills: Skill[];
  contact: {
    headline: string;
    sub: string;
    email: string;
    locationLine: string;
    socials: { label: string; href: string }[];
  };
};
