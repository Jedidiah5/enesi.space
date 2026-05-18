"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/types/content";

type Props = {
  sectionTitle: string;
  items: Project[];
};

function projectHref(p: Project) {
  return p.liveUrl || p.codeUrl || undefined;
}

function inferLinkLabel(p: Project): string {
  if (p.linkLabel) return p.linkLabel;
  if (p.liveUrl) return "visit website";
  if (p.codeUrl) return "case study";
  return "case study";
}

function LinkPill({ label, hasLink }: { label: string; hasLink: boolean }) {
  const text = label.toUpperCase();
  return (
    <span className="inline-flex items-center gap-0.5 rounded-md border border-ana-line bg-white px-2 py-0.5 text-[10px] font-bold tracking-wide text-ana-muted">
      {text}
      {hasLink ? <span aria-hidden>↗</span> : null}
    </span>
  );
}

function ProjectCard({
  project,
  onSelect,
  reduce,
}: {
  project: Project;
  onSelect: () => void;
  reduce: boolean;
}) {
  const href = projectHref(project);
  const meta = [project.client, project.year].filter(Boolean).join(" · ");

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-ana-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ana-canvas"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ana-surface ring-1 ring-ana-line/70 transition duration-300 group-hover:shadow-[0_16px_40px_rgba(15,15,20,0.08)] group-hover:ring-ana-line">
          {project.imageUrl ? (
            <Image src={project.imageUrl} alt="" fill className="object-cover transition duration-300 group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 33vw" />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-ana-accent/15 via-ana-canvas2 to-white"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(151,71,255,0.12) 0%, rgba(247,244,239,0.9) 50%, #fff 100%)`,
              }}
            />
          )}
        </div>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2 gap-y-1">
            <h3 className="text-lg font-bold tracking-tight text-ana-ink">{project.title}</h3>
            <LinkPill label={inferLinkLabel(project)} hasLink={!!href} />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ana-muted">{project.description}</p>
          {meta ? <p className="mt-3 text-xs font-medium text-ana-muted">{meta}</p> : null}
        </div>
      </button>
    </motion.article>
  );
}

function ProjectOverlay({ project, onClose, reduce }: { project: Project; onClose: () => void; reduce: boolean }) {
  const href = projectHref(project);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="absolute inset-0 bg-ana-ink/40 backdrop-blur-sm" onClick={onClose} aria-label="Close" />

      <motion.article
        role="dialog"
        aria-modal="true"
        className="relative z-10 max-h-[min(90vh,720px)] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-ana-line px-3 py-1 text-xs font-semibold text-ana-muted hover:text-ana-ink"
        >
          Close
        </button>

        <LinkPill label={inferLinkLabel(project)} hasLink={!!href} />
        <h2 className="mt-3 pr-14 text-2xl font-bold text-ana-ink">{project.title}</h2>
        <p className="mt-4 text-sm leading-relaxed text-ana-muted">{project.description}</p>
        <p className="mt-3 text-sm text-ana-muted">
          <span className="font-semibold text-ana-ink">Role:</span> {project.role}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t} className="rounded-full bg-ana-canvas2 px-2.5 py-0.5 text-xs font-medium text-ana-ink">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-ana-muted">{project.outcome}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          {project.codeUrl ? (
            <a className="text-ana-accent hover:underline" href={project.codeUrl} target="_blank" rel="noreferrer">
              Code
            </a>
          ) : null}
          {href ? (
            <a className="text-ana-accent hover:underline" href={href} target="_blank" rel="noreferrer">
              {inferLinkLabel(project)}
            </a>
          ) : null}
        </div>
      </motion.article>
    </motion.div>
  );
}

export function AnabolioProjects({ sectionTitle, items }: Props) {
  const [selected, setSelected] = useState<Project | null>(null);
  const reduce = useReducedMotion();
  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected, close]);

  const featured = [...items].filter((p) => p.featured).slice(0, 6);
  const rest = featured.length ? featured : items.slice(0, 6);

  return (
    <section id="work" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-xl font-bold tracking-tight text-ana-ink md:text-2xl">{sectionTitle}</h2>

        <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} onSelect={() => setSelected(p)} reduce={!!reduce} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? <ProjectOverlay key={selected.id} project={selected} onClose={close} reduce={!!reduce} /> : null}
      </AnimatePresence>
    </section>
  );
}
