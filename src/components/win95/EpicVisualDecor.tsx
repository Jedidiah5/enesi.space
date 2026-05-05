"use client";

import { motion } from "framer-motion";

export function EpicVisualDecor() {
  return (
    <>
      <motion.div
        className="epic-sticker epic-float pointer-events-none fixed left-5 top-24 z-30 hidden px-3 py-2 text-xs font-bold text-[#4a22db] md:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>📁</span>
      </motion.div>
      <motion.div
        className="epic-sticker pointer-events-none fixed right-6 top-24 z-30 hidden px-3 py-2 text-xs font-bold text-[#4a22db] md:block"
        animate={{ y: [0, -7, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>💻</span>
      </motion.div>
      <motion.div
        className="epic-sticker pointer-events-none fixed right-12 top-[48%] z-30 hidden px-3 py-2 text-xs font-bold text-[#4a22db] lg:block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        Alt
      </motion.div>
      <motion.div
        className="epic-sticker pointer-events-none fixed left-10 top-[52%] z-30 hidden px-3 py-2 text-xs font-bold text-[#4a22db] lg:block"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Esc
      </motion.div>
    </>
  );
}
