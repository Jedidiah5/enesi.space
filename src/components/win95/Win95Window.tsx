"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  icon?: ReactNode;
  menu?: ReactNode;
  children: ReactNode;
  status?: ReactNode;
  className?: string;
};

export function Win95Window({ title, icon, menu, children, status, className = "" }: Props) {
  return (
    <motion.div
      className={`win95-window-shell mx-auto flex w-full max-w-5xl flex-col shadow-w95drop ${className}`}
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <div className="win95-titlebar flex select-none items-center gap-1 px-1 py-0.5">
        <span className="flex min-w-0 flex-1 items-center gap-1 truncate text-[13px]">
          {icon ? <span className="shrink-0">{icon}</span> : null}
          <span className="truncate">{title}</span>
        </span>
        <span className="flex shrink-0 gap-[3px]">
          <button type="button" className="win95-ctl" aria-label="Minimize" tabIndex={-1}>
            _
          </button>
          <button type="button" className="win95-ctl" aria-label="Maximize" tabIndex={-1}>
            □
          </button>
          <button type="button" className="win95-ctl" aria-label="Close" tabIndex={-1}>
            ×
          </button>
        </span>
      </div>
      {menu}
      <div className="flex min-h-0 flex-1 flex-col bg-w95-face">{children}</div>
      {status ? <div className="border-t border-w95-shadow bg-w95-face">{status}</div> : null}
    </motion.div>
  );
}
