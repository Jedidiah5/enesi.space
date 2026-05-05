"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function GlitchHeading({ text, as: Tag = "h1", className = "" }: Props) {
  const [skew, setSkew] = useState(0);
  const layers = useMemo(
    () => [
      { x: 0, color: "text-crt-text", z: 30 },
      { x: -2, color: "text-crt-magenta/80", z: 20 },
      { x: 2, color: "text-crt-cyan/80", z: 10 },
    ],
    [],
  );

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setSkew(0.6)}
      onMouseLeave={() => setSkew(0)}
    >
      {layers.map((layer, i) => (
        <motion.span
          key={i}
          className={`pointer-events-none absolute inset-0 font-display font-semibold tracking-tight ${layer.color} ${
            i === 0 ? "relative" : ""
          }`}
          style={{ zIndex: layer.z }}
          animate={{
            x: [0, layer.x, -layer.x * 0.6, 0],
            skewX: skew,
          }}
          transition={{
            duration: i === 0 ? 6 : 4.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <Tag className={i === 0 ? "text-phosphor" : "select-none blur-[0.3px]"}>{text}</Tag>
        </motion.span>
      ))}
    </div>
  );
}
