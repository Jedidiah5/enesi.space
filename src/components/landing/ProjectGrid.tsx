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
          className={`win95-raised flex flex-col p-1 ${i % 3 === 0 ? "rotate-[-0.5deg]" : i % 3 === 1 ? "rotate-[0.4deg]" : "rotate-0"}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6%" }}
          transition={{ delay: i * 0.04, duration: 0.25, ease: "easeOut" }}
        >
          <div className="rounded-[10px] border border-black/20 bg-white p-3">
            <div className={`mb-2 rounded-[8px] px-2 py-1 text-[10px] font-bold text-white ${i % 3 === 0 ? "bg-gradient-to-r from-[#4455ff] to-[#8aa7ff]" : i % 3 === 1 ? "bg-gradient-to-r from-[#a03eff] to-[#f571d1]" : "bg-gradient-to-r from-[#ff8b35] to-[#ffc247]"}`}>
              {p.tagline}
            </div>
            <h3 className="mt-0.5 text-[14px] font-bold text-[#2b1e33]">{p.title}</h3>
            <p className="mt-2 text-[12px] leading-snug text-[#2d2234]">{p.description}</p>
            <p className="mt-2 text-[11px] text-[#6f5679]">
              <span className="font-bold">Role:</span> {p.role}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {p.stack.map((t) => (
                <span key={t} className="rounded-full border border-black/20 bg-[#f5efff] px-2 py-0.5 text-[10px] font-bold text-[#4a22db]">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-snug text-[#6f5679]">{p.outcome}</p>
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
