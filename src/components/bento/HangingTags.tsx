"use client";

import { motion, useReducedMotion } from "framer-motion";

const DEFAULT_LINES = [
  "Proof in the build",
  "Systems that hold",
  "Ship with confidence",
  "Clear rhythm",
  "Ideas → production",
];

type Props = {
  /** Short phrases (e.g. skill names); padded to 5 if fewer */
  lines?: string[];
  className?: string;
};

const springDrop = {
  type: "spring" as const,
  stiffness: 320,
  damping: 24,
  mass: 0.85,
};

function normalizeTagLines(lines?: string[]) {
  const base = lines?.filter(Boolean).length ? lines!.filter(Boolean) : [...DEFAULT_LINES];
  const out = [...base];
  let i = 0;
  while (out.length < 5) {
    out.push(DEFAULT_LINES[i % DEFAULT_LINES.length]);
    i++;
  }
  return out.slice(0, 5);
}

export function HangingTags({ lines, className = "" }: Props) {
  const reduce = useReducedMotion();
  const tags = normalizeTagLines(lines);

  return (
    <div
      className={`relative flex h-[188px] w-full shrink-0 select-none justify-between gap-1 px-1 sm:h-[200px] sm:gap-2 sm:px-2 lg:h-[210px] lg:max-w-md lg:justify-end ${className ?? ""}`.trim()}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-40">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white"
            style={{
              left: `${8 + (i * 7) % 85}%`,
              top: `${5 + (i * 11) % 70}%`,
              opacity: 0.15 + (i % 4) * 0.12,
            }}
          />
        ))}
      </div>

      {tags.map((text, i) => {
        const tilt = ((i % 3) - 1) * 2.5;
        const xOffset = (i - 2) * 2;

        return (
          <div
            key={`${text}-${i}`}
            className="relative flex h-full w-[18%] min-w-0 max-w-[5.5rem] flex-1 flex-col items-center sm:max-w-none sm:flex-none sm:w-[19%]"
            style={{ paddingTop: `${2 + (i % 3) * 5}px` }}
          >
            <div
              className="absolute left-1/2 top-0 z-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-bento-accent/60 blur-[2px]"
              style={{ marginTop: -1 }}
            />

            <motion.div
              className="relative z-0 w-px flex-1 rounded-full bg-gradient-to-b from-white/35 via-white/15 to-white/25"
              initial={reduce ? false : { scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{
                delay: 0.05 + i * 0.06,
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "top" }}
            />

            <motion.div
              className="relative z-10 mt-0.5 flex w-full max-w-[5.5rem] justify-center sm:max-w-[7.5rem]"
              initial={reduce ? false : { y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...springDrop, delay: 0.1 + i * 0.09 }}
            >
              <motion.div
                className="relative w-full rounded-lg border border-white/15 bg-white/[0.07] px-1.5 py-1.5 text-center shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-md sm:rounded-xl sm:px-2 sm:py-2"
                style={{ rotate: `${tilt}deg` }}
                animate={
                  reduce
                    ? {}
                    : {
                        rotate: [tilt, tilt + 2.8, tilt - 2.2, tilt],
                        x: [xOffset, xOffset + 1.2, xOffset - 0.8, xOffset],
                      }
                }
                transition={{
                  delay: 1.1 + i * 0.12,
                  duration: 4.5 + i * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="pointer-events-none absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-bento-accent/45 blur-[3px]" />
                <p className="relative text-[9px] font-medium leading-tight text-zinc-200 sm:text-[10px]">{text}</p>
              </motion.div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
