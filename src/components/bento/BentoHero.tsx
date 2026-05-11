"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { SiteContent } from "@/types/content";

type Props = { hero: SiteContent["hero"] };

export function BentoHero({ hero }: Props) {
  return (
    <div className="flex h-full flex-col">
      <motion.p
        className="text-xs font-medium uppercase tracking-[0.2em] text-bento-muted"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {hero.greeting}
      </motion.p>
      <motion.h1
        className="mt-2 font-semibold tracking-tight text-bento-accent"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.1 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        {hero.name}
      </motion.h1>
      <motion.p
        className="mt-2 text-sm font-medium text-zinc-400 md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.35 }}
      >
        {hero.roleLine}
      </motion.p>
      <motion.p
        className="bento-muted mt-4 max-w-xl flex-1 text-sm leading-relaxed md:text-[15px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.4 }}
      >
        {hero.bio}
      </motion.p>
      <motion.div
        className="mt-6 flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.35 }}
      >
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-bento-accent px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-bento-accent/90"
        >
          {hero.ctaPrimary}
        </a>
        {hero.resumeUrl ? (
          <a
            href={hero.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-bento-ink transition hover:border-white/25 hover:bg-white/[0.1]"
          >
            {hero.ctaSecondary}
          </a>
        ) : (
          <span className="inline-flex items-center rounded-full border border-dashed border-white/20 px-4 py-2 text-xs text-bento-muted">
            {hero.ctaSecondary}
            <span className="mx-1 opacity-50">·</span>
            <Link href="/admin" className="text-bento-accent underline-offset-2 hover:underline">
              add in Admin
            </Link>
          </span>
        )}
      </motion.div>
    </div>
  );
}
