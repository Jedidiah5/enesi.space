"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlitchHeading } from "@/components/retro/GlitchHeading";
import { TypeLine } from "@/components/retro/TypeLine";
import type { SiteContent } from "@/types/content";

type Props = { hero: SiteContent["hero"] };

export function HeroRetro({ hero }: Props) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:py-24">
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-crt-dim">{hero.greeting}</p>
        <GlitchHeading text={hero.name} className="mb-4 block text-4xl md:text-5xl" />
        <TypeLine text={hero.roleLine} className="mb-6 text-lg text-crt-cyan/90" />
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-crt-text/90 md:text-base">{hero.bio}</p>
        <div className="flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#contact"
              className="inline-flex items-center border border-crt-accent bg-crt-accent/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-crt-accent shadow-glow"
            >
              {hero.ctaPrimary}
            </a>
          </motion.div>
          {hero.resumeUrl ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border border-crt-border px-5 py-2 text-sm uppercase tracking-widest text-crt-dim hover:border-crt-cyan hover:text-crt-cyan"
              >
                {hero.ctaSecondary}
              </a>
            </motion.div>
          ) : (
            <span className="inline-flex items-center border border-dashed border-crt-border px-5 py-2 text-xs uppercase tracking-widest text-crt-dim">
              {hero.ctaSecondary} — add URL in Admin
            </span>
          )}
        </div>
      </div>
      <motion.div
        className="relative border border-crt-border bg-gradient-to-br from-crt-panel to-black/60 p-6 hue-animate"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,255,157,0.06),transparent_40%,rgba(255,0,170,0.05))]" />
        <p className="relative mb-4 text-xs uppercase tracking-[0.3em] text-crt-dim">System status</p>
        <ul className="relative space-y-4">
          {hero.stats.map((s, i) => (
            <motion.li
              key={s.label}
              className="flex items-end justify-between border-b border-crt-border/60 pb-2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
            >
              <span className="text-xs uppercase tracking-widest text-crt-dim">{s.label}</span>
              <span className="font-display text-2xl text-crt-accent text-phosphor">{s.value}</span>
            </motion.li>
          ))}
        </ul>
        <p className="relative mt-6 text-[11px] leading-relaxed text-crt-dim">
          Uplink stable · Session encrypted (TLS) · Content synced from{" "}
          <Link href="/admin" className="text-crt-amber hover:underline">
            admin console
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
