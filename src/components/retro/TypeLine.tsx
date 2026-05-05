"use client";

import { motion } from "framer-motion";

type Props = { text: string; className?: string };

export function TypeLine({ text, className = "" }: Props) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-crt-dim">$ </span>
      {text}
      <span className="caret-blink inline" />
    </motion.p>
  );
}
