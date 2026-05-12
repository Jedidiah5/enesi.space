"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/types/content";

type Props = { items: Project[] };

function layoutIdFor(id: string) {
  return `project-bento-${id}`;
}

function ExpandOverlay({ project, onClose, reduce }: { project: Project; onClose: () => void; reduce: boolean }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close project details"
      />

      <motion.article
        layout
        layoutId={layoutIdFor(project.id)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-expand-title"
        className="relative z-10 flex max-h-[min(88vh,720px)] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-white/15 bg-[#121214] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:p-8"
        initial={reduce ? { opacity: 0 } : { opacity: 0.001 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.18 },
          layout: { type: "spring", stiffness: 320, damping: 30 },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white sm:right-4 sm:top-4"
        >
          Close
        </button>

        <p className="text-xs font-medium uppercase tracking-wide text-bento-accent">{project.tagline}</p>
        <h2 id="project-expand-title" className="mt-2 pr-14 text-xl font-semibold leading-tight text-bento-ink sm:pr-20 sm:text-2xl">
          {project.title}
        </h2>
        <p className="bento-muted mt-4 text-sm leading-relaxed">{project.description}</p>
        <p className="mt-4 text-xs text-bento-muted">
          <span className="font-semibold text-bento-ink">Role:</span> {project.role}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-bento-void/90 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-bento-muted">{project.outcome}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          {project.codeUrl ? (
            <a className="text-bento-accent underline-offset-2 hover:underline" href={project.codeUrl} target="_blank" rel="noreferrer">
              Code
            </a>
          ) : null}
          {project.liveUrl ? (
            <a className="text-bento-accent underline-offset-2 hover:underline" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live
            </a>
          ) : null}
        </div>
      </motion.article>
    </motion.div>
  );
}

export function ProjectExpandGrid({ items }: Props) {
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
    <LayoutGroup id="projects-expand-root">
      <div className="relative">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {sorted.map((p, i) => {
            const staggerY = i % 2 === 0 ? 8 : 0;
            const rot = ((i % 5) - 2) * 0.9;
            return (
              <div
                key={p.id}
                className="flex justify-center"
                style={{
                  transform: `translateY(${staggerY}px) rotate(${rot}deg)`,
                }}
              >
                {selected?.id === p.id ? (
                  <div className="min-h-[168px] w-full max-w-[190px] rounded-2xl border border-transparent" aria-hidden />
                ) : (
                  <motion.button
                    type="button"
                    layout
                    layoutId={layoutIdFor(p.id)}
                    onClick={() => setSelected(p)}
                    className="group flex min-h-[168px] w-full max-w-[190px] flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-3.5 text-left shadow-bento backdrop-blur-md transition-colors hover:border-bento-accent/40 hover:from-white/[0.14] sm:p-4"
                    whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-bento-accent/35 to-bento-accent/10 text-sm shadow-inner ring-1 ring-white/10">
                      <span className="text-bento-accent opacity-95" aria-hidden>
                        ◆
                      </span>
                    </div>
                    {p.featured ? (
                      <span className="mt-2 w-fit rounded-full border border-bento-accent/40 bg-bento-accent/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-bento-accent">
                        Featured
                      </span>
                    ) : (
                      <span className="mt-2 h-5 shrink-0" aria-hidden />
                    )}
                    <h3 className="mt-1.5 line-clamp-2 text-left text-[13px] font-semibold leading-snug text-bento-ink">{p.title}</h3>
                    <p className="mt-1 line-clamp-2 text-left text-[10px] leading-snug text-bento-muted">{p.tagline}</p>
                  </motion.button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected ? <ExpandOverlay key={selected.id} project={selected} onClose={close} reduce={!!reduce} /> : null}
      </AnimatePresence>
    </LayoutGroup>
  );
}
