import type { SiteContent } from "@/types/content";
import defaultSite from "../../../content/default-site.json";

/** Shallow-safe merge so missing keys from DB still resolve from defaults. */
export function mergeWithDefaults(partial: unknown): SiteContent {
  const base = defaultSite as SiteContent;
  if (!partial || typeof partial !== "object") return base;
  const p = partial as Record<string, unknown>;
  return {
    ...base,
    ...p,
    meta: { ...base.meta, ...(p.meta as object) },
    hero: { ...base.hero, ...(p.hero as object) },
    about: { ...base.about, ...(p.about as object) },
    services: { ...base.services, ...(p.services as object) },
    projects: { ...base.projects, ...(p.projects as object) },
    skills: Array.isArray(p.skills) ? (p.skills as SiteContent["skills"]) : base.skills,
    contact: { ...base.contact, ...(p.contact as object) },
  } as SiteContent;
}
