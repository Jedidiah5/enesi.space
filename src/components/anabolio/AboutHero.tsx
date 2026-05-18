"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  imageUrl?: string;
  name: string;
  phonetic: string;
  bio: string;
};

export function AboutHero({ imageUrl, name, phonetic, bio }: Props) {
  const reduce = useReducedMotion();
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="border-b border-ana-line/40 py-10 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:gap-12 md:px-8 lg:gap-16">
        <motion.div
          className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.75rem] bg-ana-canvas2 ring-1 ring-ana-line/80 md:max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {imageUrl ? (
            <Image src={imageUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ana-accent/15 via-ana-canvas2 to-white">
              <span className="font-display text-5xl text-ana-accent/40">{initials}</span>
            </div>
          )}
        </motion.div>

        <div className="flex flex-col justify-center md:pl-2 lg:pl-6">
          <motion.div
            className="mb-4 h-10 w-1 rounded-full bg-ana-ink"
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            aria-hidden
          />

          <motion.p
            className="text-sm text-ana-muted md:text-[15px]"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            {phonetic}
          </motion.p>

          <motion.p
            className="mt-6 text-[15px] leading-[1.75] text-ana-ink md:text-base md:leading-[1.8]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.45 }}
          >
            {bio}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
