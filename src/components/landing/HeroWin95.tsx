"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { SiteContent } from "@/types/content";

type Props = { hero: SiteContent["hero"] };

export function HeroWin95({ hero }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p className="text-[12px] text-w95-muted">{hero.greeting}</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-w95-ink md:text-3xl">{hero.name}</h1>
        <p className="mt-2 text-[13px] font-bold text-w95-navy">{hero.roleLine}</p>
        <p className="mt-4 text-[13px] leading-relaxed text-w95-ink">{hero.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="#contact" className="win95-btn text-w95-ink no-underline">
            {hero.ctaPrimary}
          </a>
          {hero.resumeUrl ? (
            <a href={hero.resumeUrl} target="_blank" rel="noreferrer" className="win95-btn text-w95-ink no-underline">
              {hero.ctaSecondary}
            </a>
          ) : (
            <span className="win95-sunken-grey inline-flex items-center px-2 py-1 text-[12px] text-w95-muted">
              {hero.ctaSecondary} — set URL in Admin
            </span>
          )}
        </div>
      </div>
      <fieldset className="win95-fieldset animate-win-pop" style={{ animationDelay: "80ms" }}>
        <legend className="text-[12px] font-bold">System properties</legend>
        <ul className="space-y-2">
          {hero.stats.map((s, i) => (
            <motion.li
              key={s.label}
              className="flex items-end justify-between border-b border-dotted border-w95-shadow pb-1"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }}
            >
              <span className="text-[12px] text-w95-muted">{s.label}</span>
              <span className="text-lg font-bold text-w95-navy">{s.value}</span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] leading-snug text-w95-muted">
          Content via{" "}
          <Link href="/admin" className="text-w95-link hover:underline">
            Admin
          </Link>
          .
        </p>
      </fieldset>
    </div>
  );
}
