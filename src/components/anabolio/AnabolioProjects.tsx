"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Project, ProjectGridSize } from "@/types/content";

type Props = {
  sectionTitle: string;
  items: Project[];
};

const gridClass: Record<ProjectGridSize, string> = {
  sm: "md:col-span-4 lg:col-span-4",
  md: "md:col-span-6 lg:col-span-6",
  lg: "md:col-span-12 lg:col-span-12",
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

function ProjectCard({
  project,
  onSelect,
  reduce,
}: {
  project: Project;
  onSelect: () => void;
  reduce: boolean;
}) {
  const size = project.gridSize ?? (project.featured ? "lg" : "md");
  const href = projectHref(project);
  const meta = [project.client, project.year].filter(Boolean).join(" · ");

  return (
    <motion.article
      layout
      className={`group flex flex-col ${gridClass[size]}`}
      initial={reduce ? false : { opacity: 0, scale: 0.96, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex h-full flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-ana-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ana-canvas"
      >
        <div className="relative aspect-[508/330] w-full overflow-hidden rounded-2xl bg-ana-surface ring-1 ring-ana-line/80 transition duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_rgba(15,15,20,0.1)]">
          {project.imageUrl ? (
            <Image src={project.imageUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-ana-accent/20 via-ana-canvas2 to-ana-surface" />
          )}
        </div>

        <div className="mt-6 flex flex-1 flex-col">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-bold tracking-tight text-ana-ink md:text-2xl">{project.title}</h3>
            {href ? (
              <span className="text-sm font-semibold text-ana-accent underline-offset-4 group-hover:underline">
                {inferLinkLabel(project)}
              </span>
            ) : (
              <span className="text-sm font-semibold capitalize text-ana-muted">{inferLinkLabel(project)}</span>
            )}
          </div>
          <p className="mt-3 text-base leading-relaxed text-ana-muted/90">{project.description}</p>
          {meta ? (
            <p className="mt-4 text-sm font-semibold text-ana-ink">
              {project.client}
              {project.client && project.year ? <span className="font-normal text-ana-muted"> · </span> : null}
              {project.year ? <span className="font-normal text-ana-muted">{project.year}</span> : null}
            </p>
          ) : null}
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

        <p className="text-sm font-semibold capitalize text-ana-accent">{inferLinkLabel(project)}</p>
        <h2 className="mt-2 pr-16 text-2xl font-bold text-ana-ink">{project.title}</h2>
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

  const sorted = [...items].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section id="work" className="scroll-mt-24 border-t border-ana-line/50 py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-ana-muted">{sectionTitle}</h2>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-6 md:gap-y-14">
          {sorted.map((p) => (
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
