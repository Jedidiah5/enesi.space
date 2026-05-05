export type Skill = {
  name: string;
  level?: number;
};

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
  };
  about: {
    title: string;
    paragraphs: string[];
    focusTitle: string;
    focus: { title: string; body: string }[];
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
