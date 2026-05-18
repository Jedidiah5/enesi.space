import Link from "next/link";
import type { AboutSocialStat } from "@/types/content";

const toneClass: Record<AboutSocialStat["badgeTone"], string> = {
  green: "bg-[#d4f0df] text-[#1a6b3c]",
  orange: "bg-[#ffe4cc] text-[#b45309]",
  grey: "bg-[#e8e8ea] text-[#52525b]",
  pink: "bg-[#fce4ef] text-[#be185d]",
};

type Props = {
  stats: AboutSocialStat[];
};

function StatColumn({ stat }: { stat: AboutSocialStat }) {
  const inner = (
    <>
      <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-tight ${toneClass[stat.badgeTone]}`}>
        {stat.badge}
      </span>
      <p className="mt-4 text-lg font-bold text-ana-ink">{stat.title}</p>
      <p className="mt-1 text-sm text-ana-muted">{stat.subtitle}</p>
    </>
  );

  if (stat.href) {
    return (
      <Link href={stat.href} className="group block transition hover:opacity-90" target={stat.href.startsWith("http") ? "_blank" : undefined} rel={stat.href.startsWith("http") ? "noreferrer" : undefined}>
        {inner}
      </Link>
    );
  }

  return <div>{inner}</div>;
}

export function AboutSocialStats({ stats }: Props) {
  if (!stats.length) return null;

  return (
    <section className="border-b border-ana-line/40 py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 md:grid-cols-4 md:gap-6 md:px-8 lg:gap-10">
        {stats.map((stat) => (
          <StatColumn key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
