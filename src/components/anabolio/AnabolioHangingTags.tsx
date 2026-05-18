"use client";

import { motion, useReducedMotion } from "framer-motion";

type TagLink = { label: string; href: string };

type Props = {
  links: TagLink[];
  className?: string;
};

const springDrop = {
  type: "spring" as const,
  stiffness: 340,
  damping: 26,
  mass: 0.8,
};

export function AnabolioHangingTags({ links, className = "" }: Props) {
  const reduce = useReducedMotion();
  const tags = links.filter((l) => l.label).slice(0, 5);

  if (!tags.length) return null;

  return (
    <div
      className={`relative flex h-[200px] w-full max-w-md select-none justify-between gap-1 sm:h-[220px] sm:gap-2 ${className}`.trim()}
      aria-label="Quick links"
    >
      {tags.map((link, i) => {
        const tilt = ((i % 3) - 1) * 3;
        const isHash = link.href.startsWith("#");

        return (
          <div
            key={`${link.label}-${i}`}
            className="relative flex h-full w-[18%] min-w-0 max-w-[5.5rem] flex-1 flex-col items-center sm:max-w-none sm:w-[19%]"
            style={{ paddingTop: `${4 + (i % 3) * 6}px` }}
          >
            <div className="absolute left-1/2 top-0 z-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ana-accent/50" />

            <motion.div
              className="relative z-0 w-px flex-1 rounded-full bg-gradient-to-b from-ana-line via-ana-muted/40 to-ana-line"
              initial={reduce ? false : { scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.05 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
            />

            <motion.div
              className="relative z-10 mt-1 flex w-full max-w-[7rem] justify-center"
              initial={reduce ? false : { y: -72, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...springDrop, delay: 0.12 + i * 0.1 }}
            >
              <motion.div
                className="relative w-full rounded-xl border border-ana-line bg-white px-2 py-2 text-center shadow-[0_8px_24px_rgba(15,15,20,0.08)]"
                style={{ rotate: `${tilt}deg` }}
                animate={
                  reduce
                    ? {}
                    : {
                        rotate: [tilt, tilt + 2.5, tilt - 2, tilt],
                      }
                }
                transition={{
                  delay: 1.2 + i * 0.15,
                  duration: 4.8 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {isHash ? (
                  <a href={link.href} className="text-[10px] font-semibold leading-tight text-ana-ink sm:text-[11px]">
                    {link.label}
                  </a>
                ) : (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-[10px] font-semibold leading-tight text-ana-ink sm:text-[11px]"
                  >
                    {link.label}
                  </a>
                )}
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
