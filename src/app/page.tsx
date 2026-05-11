import { BentoHero } from "@/components/bento/BentoHero";
import { BentoNav } from "@/components/bento/BentoNav";
import { BentoTile } from "@/components/bento/BentoTile";
import { ProjectGrid } from "@/components/landing/ProjectGrid";
import { getSiteContent } from "@/lib/content/get-content";

export default async function Home() {
  const c = await getSiteContent();

  return (
    <div className="bento-canvas min-h-dvh">
      <BentoNav siteName={c.hero.name} ctaLabel="Hire Me" />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {/* Hero */}
          <BentoTile span="md:col-span-12 lg:col-span-7 lg:row-span-1" className="min-h-[320px] lg:min-h-[360px]">
            <BentoHero hero={c.hero} />
          </BentoTile>

          {/* Stats + availability stack */}
          <div className="grid gap-4 md:col-span-12 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-[1fr_auto] lg:gap-5">
            <BentoTile variant="dark" className="flex flex-col justify-between" span="md:col-span-1 lg:col-span-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">At a glance</p>
              <ul className="mt-6 space-y-4">
                {c.hero.stats.map((s) => (
                  <li key={s.label} className="flex items-end justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-xs text-white/55">{s.label}</span>
                    <span className="text-xl font-semibold tabular-nums text-white">{s.value}</span>
                  </li>
                ))}
              </ul>
            </BentoTile>
            <BentoTile variant="sage" className="flex flex-col justify-center" span="md:col-span-1 lg:col-span-1">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-bento-accent">Availability</p>
              <p className="mt-2 text-lg font-semibold leading-snug text-bento-ink">Open for the right projects</p>
              <p className="bento-muted mt-2 text-sm leading-relaxed">{c.contact.locationLine}</p>
              <a href="#contact" className="mt-5 inline-flex text-sm font-semibold text-bento-accent underline-offset-2 hover:underline">
                Get in touch →
              </a>
            </BentoTile>
          </div>

          {/* About */}
          <BentoTile id="about" span="md:col-span-12 lg:col-span-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-bento-muted">{c.about.title}</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-bento-ink md:text-[15px]">
              {c.about.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-bento-muted">{c.about.focusTitle}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {c.about.focus.map((f) => (
                <div key={f.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-bento-ink">{f.title}</p>
                  <p className="bento-muted mt-1 text-xs leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </BentoTile>

          {/* Skills */}
          <BentoTile id="skills" variant="accent" span="md:col-span-12 lg:col-span-4" className="flex flex-col">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-bento-accent/90">Stack & tools</p>
            <div className="mt-4 flex flex-1 flex-wrap content-start gap-2">
              {c.skills.map((s) => (
                <span
                  key={s.name}
                  className="rounded-full border border-bento-accent/30 bg-bento-void/50 px-3 py-1 text-xs font-semibold text-bento-ink backdrop-blur-sm"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </BentoTile>

          {/* Services */}
          <BentoTile id="services" span="md:col-span-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-bento-muted">{c.services.subtitle}</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-bento-ink md:text-2xl">{c.services.title}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.services.items.map((s) => (
                <div key={s.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
                  <h3 className="text-sm font-semibold text-bento-ink">{s.title}</h3>
                  <p className="bento-muted mt-2 text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </BentoTile>

          {/* Projects */}
          <div id="projects" className="md:col-span-12 scroll-mt-24">
            <div className="mb-4 md:mb-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-bento-muted">{c.projects.sectionSubtitle}</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-bento-ink md:text-2xl">{c.projects.sectionTitle}</h2>
            </div>
            <ProjectGrid items={c.projects.items} />
          </div>

          {/* Contact */}
          <BentoTile id="contact" variant="dark" span="md:col-span-12" className="md:flex md:flex-row md:items-center md:justify-between md:gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">Contact</p>
              <h2 className="mt-2 text-xl font-semibold leading-tight text-white md:text-2xl">{c.contact.headline}</h2>
              <p className="mt-2 max-w-xl text-sm text-white/70">{c.contact.sub}</p>
              <p className="mt-3 text-xs text-white/50">{c.contact.locationLine}</p>
            </div>
            <div className="mt-6 flex shrink-0 flex-col gap-4 md:mt-0 md:items-end">
              <a
                href={`mailto:${c.contact.email}`}
                className="inline-flex w-fit items-center rounded-full bg-bento-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-bento-accent/90"
              >
                {c.contact.email}
              </a>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                {c.contact.socials
                  .filter((s) => s.href)
                  .map((s) => (
                    <a key={s.label} href={s.href} className="text-white/85 underline-offset-4 hover:text-white hover:underline" target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  ))}
              </div>
            </div>
          </BentoTile>
        </div>

        <footer className="mt-12 border-t border-white/[0.08] pt-8 text-center text-xs text-bento-muted">
          <p>© {new Date().getFullYear()} {c.hero.name}. Built with Next.js.</p>
        </footer>
      </main>
    </div>
  );
}
