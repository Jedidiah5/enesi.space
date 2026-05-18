"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  heading: string;
  bio: string;
};

export function AnabolioIntro({ heading, bio }: Props) {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-24 border-t border-ana-line/50 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.h2
          className="text-xl font-bold text-ana-ink md:text-2xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          {heading}
        </motion.h2>
        <motion.p
          className="mt-4 max-w-3xl text-base leading-[1.7] text-ana-muted md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {bio}
        </motion.p>
      </div>
    </section>
  );
}
