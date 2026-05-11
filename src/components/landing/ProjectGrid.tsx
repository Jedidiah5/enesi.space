"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types/content";

type Props = { items: Project[] };

function ProjectCard({ p, i, className = "" }: { p: Project; i: number; className?: string }) {
  return (
    <motion.article
      className={`group flex flex-col rounded-[1.65rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-bento shadow-bentoTile backdrop-blur-xl transition hover:shadow-bento-lg md:p-7 ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-bento-accent">{p.tagline}</p>
        {p.featured ? (
          <span className="shrink-0 rounded-full border border-bento-accent/35 bg-bento-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bento-accent">
            Featured
          </span>
        ) : null}
      </div>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-bento-ink">{p.title}</h3>
      <p className="bento-muted mt-3 flex-1 text-sm leading-relaxed">{p.description}</p>
      <p className="mt-4 text-xs leading-relaxed text-bento-muted">
        <span className="font-semibold text-bento-ink">Role:</span> {p.role}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.stack.map((t) => (
          <span key={t} className="rounded-md border border-white/10 bg-bento-void/40 px-2 py-0.5 text-[11px] font-medium text-bento-muted">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-bento-muted">{p.outcome}</p>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
        {p.codeUrl ? (
          <a className="text-bento-accent underline-offset-2 transition hover:underline" href={p.codeUrl} target="_blank" rel="noreferrer">
            Code
          </a>
        ) : null}
        {p.liveUrl ? (
          <a className="text-bento-accent underline-offset-2 transition hover:underline" href={p.liveUrl} target="_blank" rel="noreferrer">
            Live
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export function ProjectGrid({ items }: Props) {
  const sorted = [...items].sort((a, b) => Number(b.featured) - Number(a.featured));
  const [first, ...rest] = sorted;
  const useBento = first?.featured && rest.length > 0;

  if (!useBento) {
    return (
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {sorted.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-12 md:gap-5 lg:grid-rows-[auto_auto]">
      <ProjectCard p={first} i={0} className="md:col-span-12 lg:col-span-7 lg:row-span-2 lg:min-h-[320px]" />
      <div className="grid gap-4 md:col-span-12 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
        {rest.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i + 1} />
        ))}
      </div>
    </div>
  );
}
