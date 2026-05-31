"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TIMES_ASSETS } from "./assets";
import { Ticker } from "./Ticker";

type TechSpec = { pantone: string; color: string; label: string };

type Props = {
  bio: string;
  quote?: string;
  tickerItems: string[];
  techSpecs?: TechSpec[];
};

const defaultSpecs: TechSpec[] = [
  { pantone: "PANTONE BLACK 6 C", color: "#000000", label: "Next.js Framework" },
  { pantone: "PANTONE 1235 C", color: "#FFCA28", label: "TypeScript Core" },
];

export function HeroSection({ bio, quote, tickerItems, techSpecs = defaultSpecs }: Props) {
  const reduce = useReducedMotion();
  const firstLetter = bio.trim()[0]?.toUpperCase() ?? "E";
  const restBio = bio.trim().slice(1);

  return (
    <header className="torn-edge-bottom relative overflow-hidden bg-surface-dim px-margin-page pb-20 pt-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 md:grid-cols-12">
        {/* Opinion column */}
        <div id="opinion" className="scroll-mt-28 order-2 md:order-1 md:col-span-3">
          <div className="mb-4 border-b-2 border-t-2 border-on-surface py-4">
            <h3 className="font-label-mono text-xs font-bold">OPINION</h3>
          </div>
          <div className="columns-1 gap-4 text-justify font-body-main text-sm leading-relaxed text-on-surface-variant">
            <p>
              <span className="float-left mr-2 font-masthead text-5xl text-primary">{firstLetter}</span>
              {restBio}
            </p>
            {quote ? (
              <p className="mt-4 border-l-2 border-primary pl-4 italic">&ldquo;{quote}&rdquo;</p>
            ) : null}
          </div>
        </div>

        {/* Masthead + character */}
        <div className="relative order-1 flex flex-col items-center md:order-2 md:col-span-6">
          <h1 className="z-10 mb-[-40px] text-center font-masthead text-primary drop-shadow-sm md:mb-[-60px]">
            <span className="block text-[64px] leading-[60px] md:text-[120px] md:leading-[110px] md:tracking-[-0.04em]">
              THE ENESI
            </span>
            <span className="-mt-4 block text-[64px] leading-[60px] md:-mt-10 md:text-[120px] md:leading-[110px] md:tracking-[-0.04em]">
              TIMES
            </span>
          </h1>

          <motion.div
            className="relative z-20 -rotate-2 bg-white p-4 scribble-border"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            whileHover={reduce ? undefined : { rotate: 0, transition: { type: "spring", damping: 20, stiffness: 300 } }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Pixel character"
              src={TIMES_ASSETS.heroCharacter}
              className="pixelated h-auto w-full contrast-125 drop-shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 rotate-6 bg-primary px-3 py-1 font-label-mono text-xs text-on-primary">
              NEW ISSUE #{String(new Date().getFullYear()).slice(-2)}
            </div>
          </motion.div>
        </div>

        {/* Tech specs */}
        <div className="order-3 flex flex-col gap-6 md:col-span-3">
          <div className="border-t-2 border-on-surface pt-4">
            <h3 className="mb-4 font-label-mono text-xs font-bold">TECH SPECS</h3>
            <div className="space-y-4">
              {techSpecs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`border border-outline bg-surface-container-lowest p-4 shadow-sm ${i === 0 ? "rotate-1" : "-rotate-2"}`}
                >
                  <div className="mb-2 h-24 w-full" style={{ backgroundColor: spec.color }} />
                  <p className="font-label-mono text-[10px]">{spec.pantone}</p>
                  <p className="font-bold">{spec.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Ticker items={tickerItems} />
    </header>
  );
}
