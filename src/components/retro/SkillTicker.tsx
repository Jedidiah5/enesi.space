"use client";

import type { Skill } from "@/types/content";

type Props = {
  skills: Skill[];
};

export function SkillTicker({ skills }: Props) {
  const labels = skills.map((s) => s.name);
  const doubled = [...labels, ...labels];

  return (
    <div className="flex items-stretch gap-1 border-t border-white bg-w95-face px-1 py-0.5">
      <div className="win95-sunken-grey flex min-w-0 flex-1 items-center overflow-hidden py-0.5">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap px-2 text-[11px] text-w95-ink">
          {doubled.map((name, i) => (
            <span key={`${name}-${i}`}>
              {name}
              <span className="mx-3 text-w95-shadow">•</span>
            </span>
          ))}
        </div>
      </div>
      <div className="win95-sunken-grey flex w-[52px] shrink-0 items-center justify-center text-[10px] font-bold text-w95-muted">
        OK
      </div>
    </div>
  );
}
