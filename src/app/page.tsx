import { ArsenalSection } from "@/components/times/ArsenalSection";
import { ContactFooter } from "@/components/times/ContactFooter";
import { HeroSection } from "@/components/times/HeroSection";
import { NoiseOverlay } from "@/components/times/NoiseOverlay";
import { ProjectsSection } from "@/components/times/ProjectsSection";
import { Sidebar } from "@/components/times/Sidebar";
import { TopNav } from "@/components/times/TopNav";
import { getSiteContent } from "@/lib/content/get-content";

function skillsToArsenal(skills: { name: string }[]) {
  const tags = ["FRONTEND", "LOGIC", "STYLE", "AI", "AUTH", "DATA"];
  return skills.slice(0, 6).map((s, i) => ({
    tag: tags[i] ?? "TOOL",
    label: s.name.toUpperCase(),
    accent: i >= 3,
  }));
}

function tickerFromContent(c: Awaited<ReturnType<typeof getSiteContent>>) {
  const role = c.hero.roleLine.split("·")[0]?.trim().toUpperCase() ?? "FULL STACK DEVELOPER";
  return [
    role,
    "LONDON",
    ...c.skills.slice(0, 5).map((s) => s.name.toUpperCase()),
    `${c.hero.stats[1]?.value ?? "15+"} PROJECTS`,
  ];
}

export default async function Home() {
  const c = await getSiteContent();
  const bio = c.about.bioLong ?? c.about.paragraphs.join(" ");
  const quote =
    c.about.focus[0]?.body ??
    "The best interfaces are those that tell a story before they perform a function.";

  return (
    <>
      <NoiseOverlay />
      <TopNav email={c.contact.email} />
      <Sidebar email={c.contact.email} />
      <main className="relative lg:ml-64">
        <HeroSection bio={bio} quote={quote} tickerItems={tickerFromContent(c)} />
        <ProjectsSection items={c.projects.items} />
        <ArsenalSection skills={skillsToArsenal(c.skills)} quote={quote} />
        <ContactFooter
          email={c.contact.email}
          locationLine={c.contact.locationLine}
          socials={c.contact.socials}
        />
      </main>
    </>
  );
}
