"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/types/content";
import { CARD_ROTATIONS, NEWS_TAGS, TIMES_ASSETS } from "./assets";

type Props = {
  items: Project[];
};

function projectHref(p: Project) {
  return p.liveUrl || p.codeUrl || "#works";
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 25, stiffness: 250 },
  },
};

export function ProjectsSection({ items }: Props) {
  const reduce = useReducedMotion();
  const featured = [...items].filter((p) => p.featured).slice(0, 3);
  const cards = featured.length >= 3 ? featured : items.slice(0, 3);

  return (
    <section id="works" className="scroll-mt-28 relative bg-surface px-margin-page py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-16">
          <h2 className="relative z-10 font-section-header text-[64px] uppercase leading-[60px] text-primary">
            FEATURED WORKS
          </h2>
          <div className="pointer-events-none absolute -top-24 right-0 z-20 w-48 rotate-12 bg-white p-2 scribble-border md:w-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Pixel folder" src={TIMES_ASSETS.folder} className="pixelated h-auto w-full" />
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 items-start gap-8 md:grid-cols-3"
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((project, i) => {
            const tag = NEWS_TAGS[i % NEWS_TAGS.length];
            const rotation = CARD_ROTATIONS[i % CARD_ROTATIONS.length];
            const href = projectHref(project);
            const isDarkTag = i === 1;

            return (
              <motion.article
                key={project.id}
                variants={item}
                className={`group relative border-2 border-on-surface bg-surface-container-lowest p-6 ${rotation} hover:rotate-0`}
                whileHover={reduce ? undefined : { y: -4, scale: 1.02, transition: { type: "spring", damping: 20, stiffness: 300 } }}
                whileTap={reduce ? undefined : { scale: 0.98, transition: { type: "spring", damping: 15, stiffness: 400 } }}
              >
                {i === 0 ? (
                  <div className="washi-tape-yellow absolute -top-3 left-10 z-10 h-6 w-24 -rotate-3 opacity-70" />
                ) : null}
                {i === 1 ? (
                  <>
                    <div className="washi-tape-red absolute -bottom-3 right-5 z-10 h-6 w-32 rotate-6 opacity-70" />
                    <div className="absolute right-2 top-2 rotate-12 rounded-full border-2 border-primary px-2 py-1 text-[10px] font-bold text-primary opacity-80">
                      SHIPPED
                    </div>
                  </>
                ) : null}
                {i === 2 ? (
                  <>
                    <div className="washi-tape-yellow absolute top-1/2 -left-4 z-10 h-20 w-6 rotate-12 opacity-70" />
                    <div className="absolute -bottom-4 left-1/4 border border-on-surface bg-surface-container-high p-2 font-label-mono text-[10px]">
                      #{project.stack[0]?.toUpperCase() ?? "BUILD"}
                    </div>
                  </>
                ) : null}

                <div className="mb-4 border-b-4 border-on-surface pb-2">
                  <span
                    className={`font-label-mono px-2 py-1 text-[10px] ${isDarkTag ? "bg-on-surface text-surface" : "bg-primary text-on-primary"}`}
                  >
                    {tag}
                  </span>
                  <h4 className="mt-2 font-masthead text-2xl">{project.title}</h4>
                </div>

                <p className="mb-4 font-body-main text-lg font-bold italic">
                  &ldquo;{project.tagline.toUpperCase()}&rdquo;
                </p>
                <p className="mb-6 text-sm text-on-surface-variant">{project.description}</p>

                <div className="mt-auto flex items-center justify-between border-t border-dashed border-outline pt-4">
                  <span className="font-label-mono text-[10px]">
                    {project.client ?? "DESK"} · {project.year ?? "2025"}
                  </span>
                  <a className="font-bold underline group-hover:text-primary" href={href} target="_blank" rel="noreferrer">
                    READ FULL STORY →
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
