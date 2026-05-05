"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types/content";

type Props = { items: Project[] };

export function ProjectGrid({ items }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((p, i) => (
        <motion.article
          key={p.id}
          className="win95-raised flex flex-col p-1"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ delay: i * 0.04, duration: 0.25, ease: "easeOut" }}
        >
          <div className="win95-sunken flex flex-1 flex-col bg-white p-3">
            <p className="text-[11px] font-bold text-w95-muted">{p.tagline}</p>
            <h3 className="mt-0.5 text-[14px] font-bold text-w95-ink">{p.title}</h3>
            <p className="mt-2 text-[12px] leading-snug text-w95-ink">{p.description}</p>
            <p className="mt-2 text-[11px] text-w95-muted">
              <span className="font-bold">Role:</span> {p.role}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {p.stack.map((t) => (
                <span key={t} className="win95-sunken-grey px-1.5 py-0.5 text-[10px] font-bold text-w95-ink">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-snug text-w95-muted">{p.outcome}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
              {p.codeUrl ? (
                <a className="text-w95-link hover:underline" href={p.codeUrl} target="_blank" rel="noreferrer">
                  View code
                </a>
              ) : null}
              {p.liveUrl ? (
                <a className="text-w95-link hover:underline" href={p.liveUrl} target="_blank" rel="noreferrer">
                  Live demo
                </a>
              ) : null}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
