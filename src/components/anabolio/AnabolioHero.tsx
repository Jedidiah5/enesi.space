"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnabolioHangingTags } from "./AnabolioHangingTags";

type TagLink = { label: string; href: string };

type Props = {
  displayLines: string[];
  tagLinks: TagLink[];
};

export function AnabolioHero({ displayLines, tagLinks }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-6 pb-4 md:pt-10 md:pb-8">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[1fr_auto] md:items-end md:gap-6 md:px-8">
        <div className="min-w-0">
          {displayLines.map((line, i) => (
            <motion.h1
              key={`${line}-${i}`}
              className="font-display leading-[0.92] tracking-tight text-ana-ink"
              style={{ fontSize: "clamp(2.75rem, 11vw, 6.5rem)" }}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <AnabolioHangingTags links={tagLinks} className="md:justify-self-end" />
      </div>
    </section>
  );
}
