"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type Props = {
  email: string;
};

export function TopNav({ email }: Props) {
  const reduce = useReducedMotion();

  return (
    <nav className="sticky top-0 z-50 flex w-full flex-col items-center justify-between border-b-4 border-on-surface bg-primary px-gutter py-4 md:flex-row">
      <Link href="/" className="font-masthead text-4xl uppercase tracking-tighter text-on-primary md:text-[40px]">
        THE ENESI TIMES
      </Link>

      <div className="mt-3 hidden items-center gap-8 md:mt-0 md:flex">
        <Link href="/" className="border-b-2 border-on-primary font-label-mono text-xs font-bold text-on-primary">
          FRONT PAGE
        </Link>
        <a href="#works" className="font-label-mono text-xs text-on-primary/80 transition-colors hover:text-on-primary">
          ARCHIVE
        </a>
        <a href="#stack" className="font-label-mono text-xs text-on-primary/80 transition-colors hover:text-on-primary">
          CLASSIFIEDS
        </a>
        <a href="#pitch" className="font-label-mono text-xs text-on-primary/80 transition-colors hover:text-on-primary">
          EDITORIAL
        </a>
        <motion.a
          href={`mailto:${email}`}
          className="scale-95 bg-on-primary px-4 py-1 font-label-mono text-xs font-bold text-primary"
          whileHover={reduce ? undefined : { scale: 1, transition: { type: "spring", damping: 20, stiffness: 300 } }}
          whileTap={reduce ? undefined : { scale: 0.95, y: 2, transition: { type: "spring", damping: 15, stiffness: 400 } }}
        >
          SUBSCRIBE
        </motion.a>
      </div>
    </nav>
  );
}
