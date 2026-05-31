"use client";

import { useEffect, useRef } from "react";

export function NoiseOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 20;
      const y = (e.clientY / window.innerHeight) * 20;
      el.style.backgroundPosition = `${x}px ${y}px, ${-x}px ${-y}px`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="noise-bg pointer-events-none fixed inset-0 z-[100] opacity-30"
      aria-hidden
    />
  );
}
