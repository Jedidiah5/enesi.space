"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TIMES_ASSETS } from "./assets";

type Social = { label: string; href: string };

type Props = {
  email: string;
  locationLine?: string;
  socials: Social[];
};

export function ContactFooter({ email, locationLine, socials }: Props) {
  const reduce = useReducedMotion();
  const withHref = socials.filter((s) => s.href);
  const year = new Date().getFullYear();

  return (
    <footer id="pitch" className="scroll-mt-28 relative torn-edge-top bg-[#0d0d0d] px-margin-page pb-12 pt-24 text-surface">
      <div className="relative mx-auto max-w-7xl text-center">
        <h2 className="chrome-text mb-12 font-section-header text-[64px] leading-[60px] md:text-[120px] md:leading-[110px]">
          LET&apos;S TALK
        </h2>

        <div className="relative mb-16 inline-block">
          <motion.div
            className="relative z-10 mx-auto max-w-xs rotate-2 bg-white p-4 scribble-border"
            whileHover={reduce ? undefined : { rotate: 6, transition: { type: "spring", damping: 20, stiffness: 300 } }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Pixel phone"
              src={TIMES_ASSETS.phone}
              className="pixelated h-auto w-full contrast-125"
            />
          </motion.div>
          <div className="absolute -right-20 -top-5 z-20 hidden rotate-[-12deg] border-2 border-primary bg-surface p-4 text-on-surface md:block">
            <p className="font-masthead text-xl uppercase tracking-tighter">CALLING ALL BUILDERS →</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="rotate-1 border-2 border-surface bg-primary p-1">
            <motion.a
              href={`mailto:${email}`}
              className="block bg-surface px-8 py-4 font-masthead text-2xl text-primary md:text-4xl"
              whileHover={reduce ? undefined : { backgroundColor: "#a4000a", color: "#fff9ee" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {email}
            </motion.a>
            <div className="flex justify-between px-4 py-1 font-label-mono text-[10px] text-surface">
              <span>CLASSIFIED AD #4021</span>
              <span>{locationLine?.toUpperCase() ?? "AVAILABLE WORLDWIDE"}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-8 font-label-mono text-xs md:gap-12">
            {withHref.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-wavy transition-colors hover:text-primary"
              >
                {s.label.toUpperCase()}
              </a>
            ))}
          </div>

          <div className="mt-20 flex w-full flex-col items-center border-t border-outline-variant pt-8">
            <p className="mb-4 font-masthead text-2xl text-surface">THE ENESI TIMES</p>
            <p className="font-caption-typewriter text-sm opacity-60">
              © {year} ENESI — ALL RIGHTS RESERVED. PRINTED ON RECYCLED BYTES.
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-20 left-10 -rotate-45 opacity-20">
          <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary">
            <span className="font-masthead text-4xl text-primary">LIVE {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
