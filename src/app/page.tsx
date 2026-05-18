import { AnabolioFooter } from "@/components/anabolio/AnabolioFooter";
import { AnabolioHero } from "@/components/anabolio/AnabolioHero";
import { AnabolioNav } from "@/components/anabolio/AnabolioNav";
import { AnabolioProjects } from "@/components/anabolio/AnabolioProjects";
import { getSiteContent } from "@/lib/content/get-content";

function helloHeadline(hero: Awaited<ReturnType<typeof getSiteContent>>["hero"]) {
  if (hero.helloHeadline) return hero.helloHeadline;
  const first = hero.name.split(/\s+/)[0] || hero.name;
  return `I'm ${first}, hello!`;
}

function roleSubtitle(hero: Awaited<ReturnType<typeof getSiteContent>>["hero"]) {
  if (hero.roleSubtitle) return hero.roleSubtitle;
  return hero.roleLine.split("·")[0]?.trim() || hero.roleLine;
}

export default async function Home() {
  const c = await getSiteContent();

  return (
    <div className="ana-canvas min-h-dvh">
      <AnabolioNav siteName={c.hero.name} />
      <main>
        <AnabolioHero
          name={c.hero.name}
          helloHeadline={helloHeadline(c.hero)}
          roleSubtitle={roleSubtitle(c.hero)}
          introHeading={c.hero.introHeading ?? "Hey, guess who? 👋"}
          bio={c.hero.bio}
          profileImageUrl={c.hero.profileImageUrl || undefined}
          socials={c.contact.socials}
          email={c.contact.email}
        />
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
