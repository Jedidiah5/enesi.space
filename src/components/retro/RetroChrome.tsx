"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect } from "react";

function usePointerGlow() {
  const sx = useSpring(50, { stiffness: 80, damping: 25 });
  const sy = useSpring(50, { stiffness: 80, damping: 25 });
  const mask = useMotionTemplate`radial-gradient(420px circle at ${sx}% ${sy}%, rgba(0,255,157,0.14), transparent 55%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      sx.set((e.clientX / window.innerWidth) * 100);
      sy.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [sx, sy]);

  return mask;
}

export function RetroChrome() {
  const mask = usePointerGlow();

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen opacity-90"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 3px)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-[2] opacity-70"
        style={{ background: mask }}
      />
      <div className="pointer-events-none fixed inset-0 z-[3] crt-vignette crt-curve" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden opacity-[0.12]" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-[40%] scan-drift bg-gradient-to-b from-crt-accent/25 to-transparent" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[5] phosphor-layer bg-[radial-gradient(ellipse_at_center,_rgba(0,255,157,0.12),_transparent_65%)]"
        aria-hidden
      />
    </>
  );
}
