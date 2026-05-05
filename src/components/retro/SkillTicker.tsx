"use client";

import type { Skill } from "@/types/content";

type Props = {
  skills: Skill[];
};

export function SkillTicker({ skills }: Props) {
  const labels = skills.map((s) => s.name);
  const doubled = [...labels, ...labels];

  return (
    <div className="flex items-stretch gap-1 border-t border-white bg-[#edd9ef] px-1 py-1">
      <div className="win95-sunken-grey flex min-w-0 flex-1 items-center overflow-hidden bg-[#f8f3ff] py-1">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap px-2 text-[11px] text-[#2b1e33]">
          {doubled.map((name, i) => (
            <span key={`${name}-${i}`}>
              {name}
              <span className="mx-3 text-[#aa7bc1]">•</span>
            </span>
          ))}
        </div>
      </div>
      <div className="win95-sunken-grey flex w-[70px] shrink-0 items-center justify-center bg-[#fff6d3] text-[10px] font-bold text-[#5e4a1a]">
        READY
      </div>
    </div>
  );
}
