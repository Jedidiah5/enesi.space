import { AnabolioFooter } from "@/components/anabolio/AnabolioFooter";
import { AnabolioHero } from "@/components/anabolio/AnabolioHero";
import { AnabolioIntro } from "@/components/anabolio/AnabolioIntro";
import { AnabolioNav } from "@/components/anabolio/AnabolioNav";
import { AnabolioProjects } from "@/components/anabolio/AnabolioProjects";
import { getSiteContent } from "@/lib/content/get-content";

function displayLinesFromHero(hero: Awaited<ReturnType<typeof getSiteContent>>["hero"]) {
  if (hero.displayLines?.length) return hero.displayLines;
  const parts = hero.roleLine.split("·")[0]?.trim() || hero.roleLine;
  return parts.split(/\s+/).length > 2 ? [parts] : [hero.name.split(" ")[0] || hero.name, parts];
}

function hangingTagLinks(
  socials: { label: string; href: string }[],
): { label: string; href: string }[] {
  const about = { label: "About", href: "#about" };
  const fromSocial = socials
    .filter((s) => s.href)
    .slice(0, 4)
    .map((s) => ({ label: s.label, href: s.href }));
  return [about, ...fromSocial];
}

export default async function Home() {
  const c = await getSiteContent();
  const displayLines = displayLinesFromHero(c.hero);
  const tagLinks = hangingTagLinks(c.contact.socials);

  return (
    <div className="ana-canvas min-h-dvh">
      <AnabolioNav siteName={c.hero.name} socials={c.contact.socials} />
      <main>
        <AnabolioHero displayLines={displayLines} tagLinks={tagLinks} />
        <AnabolioIntro heading={c.hero.introHeading ?? `Hey, I'm ${c.hero.name.split(" ")[0]} 👋`} bio={c.hero.bio} />
        <AnabolioProjects sectionTitle={c.projects.sectionTitle} items={c.projects.items} />
      </main>
      <AnabolioFooter
        name={c.hero.name}
        roleLine={c.hero.footerRoleLine ?? c.hero.roleLine}
        note={c.hero.footerNote}
        disclaimer={c.hero.disclaimer}
        socials={c.contact.socials}
      />
    </div>
  );
}
