"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { POSE_LABELS, type CharacterPose } from "./model-paths";

const HeroCharacterScene = dynamic(
  () => import("./HeroCharacterScene").then((m) => m.HeroCharacterScene),
  { ssr: false },
);

const POSES: CharacterPose[] = ["idle", "walk", "stomp"];

type Props = {
  className?: string;
};

export function HeroCharacter3D({ className = "" }: Props) {
  const [pose, setPose] = useState<CharacterPose>("idle");
  const [loading, setLoading] = useState(true);

  const cyclePose = useCallback(() => {
    setPose((current) => {
      const idx = POSES.indexOf(current);
      return POSES[(idx + 1) % POSES.length];
    });
  }, []);

  return (
    <motion.div
      className={`flex flex-col ${className}`.trim()}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <div
        className="relative aspect-[4/5] w-full min-h-[220px] max-h-[340px] cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-transparent"
        onClick={cyclePose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            cyclePose();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="3D character. Click to change animation."
      >
        {loading && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-bento-void/40 backdrop-blur-sm"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            onAnimationComplete={() => setLoading(false)}
          >
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-bento-accent/30 border-t-bento-accent" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-bento-muted">Loading 3D…</span>
          </motion.div>
        )}
        <HeroCharacterScene pose={pose} className="absolute inset-0 h-full w-full touch-none" />
        <motion.div
          key={pose}
          className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/10 bg-bento-void/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-bento-muted backdrop-blur-md"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {POSE_LABELS[pose]}
        </motion.div>
      </div>

      <motion.div
        className="mt-3 flex flex-wrap justify-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        {POSES.map((id) => (
          <button
            key={id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPose(id);
            }}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
              pose === id
                ? "bg-bento-accent text-white shadow-md"
                : "border border-white/10 bg-white/[0.04] text-bento-muted hover:border-white/20 hover:text-bento-ink"
            }`}
          >
            {POSE_LABELS[id]}
          </button>
        ))}
      </motion.div>
      <p className="mt-2 text-center text-[10px] text-bento-muted">Click the scene or use buttons to switch moves</p>
    </motion.div>
  );
}
