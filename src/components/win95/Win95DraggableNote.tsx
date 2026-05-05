"use client";

import { motion } from "framer-motion";

export function Win95DraggableNote() {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      className="win95-window-shell pointer-events-auto fixed left-4 top-16 z-[90] hidden w-[220px] cursor-grab text-[12px] shadow-w95drop active:cursor-grabbing md:block"
      whileDrag={{ cursor: "grabbing" }}
    >
      <div className="win95-titlebar flex items-center justify-between px-1 py-0.5">
        <span className="truncate pr-1">ReadMe.txt</span>
        <span className="flex shrink-0 gap-[3px]">
          <button type="button" className="win95-ctl" tabIndex={-1} aria-hidden>
            _
          </button>
          <button type="button" className="win95-ctl" tabIndex={-1} aria-hidden>
            ×
          </button>
        </span>
      </div>
      <div className="win95-sunken m-1 bg-white p-2 leading-snug text-w95-ink">
        <p>Tip: drag this window by the title bar.</p>
        <p className="mt-1 text-w95-muted">Edit content under Admin → Export JSON or Supabase.</p>
      </div>
    </motion.div>
  );
}
