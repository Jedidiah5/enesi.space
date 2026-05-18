import { AboutBrands } from "@/components/anabolio/AboutBrands";
import { AboutHero } from "@/components/anabolio/AboutHero";
import { AboutSocialStats } from "@/components/anabolio/AboutSocialStats";
import { AnabolioFooter } from "@/components/anabolio/AnabolioFooter";
import { AnabolioNav } from "@/components/anabolio/AnabolioNav";
import { getSiteContent } from "@/lib/content/get-content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteContent();
  return {
    title: `About — ${c.hero.name}`,
    description: c.about.bioLong ?? c.about.paragraphs[0] ?? c.meta.description,
  };
}

function aboutBio(c: Awaited<ReturnType<typeof getSiteContent>>) {
  if (c.about.bioLong) return c.about.bioLong;
  return c.about.paragraphs.join(" ");
}

function defaultPhonetic(name: string) {
  const first = name.split(/\s+/)[0]?.toLowerCase() ?? "dev";
  const last = name.split(/\s+/)[1]?.toLowerCase();
  if (last) return `/${first} ${last}/`;
  return `/${first}/`;
}

export default async function AboutPage() {
  const c = await getSiteContent();
  const imageUrl = c.about.pageImageUrl || c.hero.profileImageUrl || undefined;

  return (
    <div className="ana-canvas min-h-dvh">
      <AnabolioNav siteName={c.hero.name} active="about" />
      <main>
        <AboutHero
          name={c.hero.name}
          imageUrl={imageUrl}
          phonetic={c.about.phonetic ?? defaultPhonetic(c.hero.name)}
          bio={aboutBio(c)}
        />
        {c.about.socialStats?.length ? <AboutSocialStats stats={c.about.socialStats} /> : null}
        {c.about.brands?.length ? (
          <AboutBrands title={c.about.brandsTitle ?? "Brands I've worked with"} brands={c.about.brands} />
        ) : null}
      </main>
      <AnabolioFooter
        name={c.hero.name}
        roleLine={c.hero.footerRoleLine ?? c.hero.roleLine}
        profileImageUrl={c.hero.profileImageUrl || undefined}
        statusLead={c.hero.footerStatusLead}
        statusTrail={c.hero.footerStatusTrail}
        signoff={c.hero.footerSignoff ?? c.hero.footerNote}
        disclaimer={c.hero.disclaimer}
        socials={c.contact.socials}
        email={c.contact.email}
      />
    </div>
  );
}
