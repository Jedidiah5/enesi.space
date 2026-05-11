import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Tailwind col-span utilities, e.g. md:col-span-6 lg:col-span-4 */
  span?: string;
  variant?: "default" | "accent" | "sage" | "dark";
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  default:
    "border-white/[0.08] bg-white/[0.04] text-bento-ink shadow-bento shadow-bentoTile backdrop-blur-xl",
  accent:
    "border-bento-accent/30 bg-gradient-to-br from-bento-accent/15 via-bento-accentSoft/40 to-bento-surface text-bento-ink shadow-bento-lg backdrop-blur-xl",
  sage:
    "border-bento-sage/25 bg-gradient-to-br from-bento-sageSoft/60 to-bento-surface text-bento-ink shadow-bento backdrop-blur-xl",
  dark:
    "border-white/[0.08] bg-bento-void text-zinc-100 shadow-bento-lg backdrop-blur-xl [&_.bento-muted]:text-zinc-400",
};

export function BentoTile({ children, id, className = "", span = "", variant = "default" }: Props) {
  return (
    <section
      id={id}
      className={`rounded-[1.65rem] border p-6 transition-[box-shadow,transform] duration-300 hover:shadow-bento-lg md:p-7 ${variants[variant]} ${span} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
