import { HeroWin95 } from "@/components/landing/HeroWin95";
import { ProjectGrid } from "@/components/landing/ProjectGrid";
import { RetroPanel } from "@/components/retro/RetroPanel";
import { SkillTicker } from "@/components/retro/SkillTicker";
import { Win95Desktop } from "@/components/win95/Win95Desktop";
import { Win95DraggableNote } from "@/components/win95/Win95DraggableNote";
import { Win95MenuBar } from "@/components/win95/Win95MenuBar";
import { Win95Taskbar } from "@/components/win95/Win95Taskbar";
import { Win95Window } from "@/components/win95/Win95Window";
import { getSiteContent } from "@/lib/content/get-content";

export default async function Home() {
  const c = await getSiteContent();

  return (
    <Win95Desktop>
      <Win95DraggableNote />
      <main className="flex min-h-0 flex-1 justify-center px-2 pb-2 pt-3 md:px-3">
        <Win95Window
          title={`My Portfolio — ${c.hero.name}`}
          icon={<span className="text-[14px] leading-none">📂</span>}
          menu={<Win95MenuBar />}
          status={<SkillTicker skills={c.skills} />}
          className="flex h-[calc(100dvh-2.75rem)] max-h-[900px] min-h-0 flex-col"
        >
          <div className="win95-sunken m-1 flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3 md:p-4">
              <HeroWin95 hero={c.hero} />

              <section id="about" className="scroll-mt-2">
                <RetroPanel title={c.about.title} delay={40}>
                  <div className="space-y-3 leading-snug">
                    {c.about.paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                  <h3 className="mt-4 text-[12px] font-bold text-w95-navy">{c.about.focusTitle}</h3>
                  <div className="mt-2 grid gap-2 md:grid-cols-2">
                    {c.about.focus.map((f) => (
                      <div key={f.title} className="win95-sunken bg-white p-2">
                        <p className="text-[11px] font-bold text-w95-navy">{f.title}</p>
                        <p className="mt-1 text-[12px] text-w95-muted">{f.body}</p>
                      </div>
                    ))}
                  </div>
                  <h3 className="mt-4 text-[12px] font-bold text-w95-navy">Technical skills</h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.skills.map((s) => (
                      <span key={s.name} className="win95-sunken-grey px-2 py-0.5 text-[11px] font-bold">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </RetroPanel>
              </section>

              <section id="services" className="scroll-mt-2">
                <p className="text-[11px] text-w95-muted">{c.services.subtitle}</p>
                <h2 className="text-[16px] font-bold text-w95-ink">{c.services.title}</h2>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {c.services.items.map((s, i) => (
                    <RetroPanel key={s.title} title={s.title} delay={i * 30}>
                      <p className="text-[12px] leading-snug text-w95-muted">{s.body}</p>
                    </RetroPanel>
                  ))}
                </div>
              </section>

              <section id="projects" className="scroll-mt-2">
                <p className="text-[11px] text-w95-muted">{c.projects.sectionSubtitle}</p>
                <h2 className="text-[16px] font-bold text-w95-ink">{c.projects.sectionTitle}</h2>
                <div className="mt-3">
                  <ProjectGrid items={c.projects.items} />
                </div>
              </section>

              <section id="contact" className="scroll-mt-2">
                <RetroPanel title="Contact" delay={80}>
                  <h2 className="text-[16px] font-bold text-w95-ink">{c.contact.headline}</h2>
                  <p className="mt-1 text-[12px] text-w95-muted">{c.contact.sub}</p>
                  <a
                    className="win95-btn mt-3 inline-flex text-w95-ink no-underline"
                    href={`mailto:${c.contact.email}`}
                  >
                    {c.contact.email}
                  </a>
                  <p className="mt-2 text-[11px] text-w95-muted">{c.contact.locationLine}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold">
                    {c.contact.socials
                      .filter((s) => s.href)
                      .map((s) => (
                        <a key={s.label} href={s.href} className="text-w95-link hover:underline" target="_blank" rel="noreferrer">
                          {s.label}
                        </a>
                      ))}
                  </div>
                </RetroPanel>
              </section>
            </div>
          </div>
        </Win95Window>
      </main>
      <Win95Taskbar active="portfolio" />
    </Win95Desktop>
  );
}
