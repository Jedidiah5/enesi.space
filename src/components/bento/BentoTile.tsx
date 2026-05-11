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
    "border-bento-line/70 bg-bento-tile/95 text-bento-ink shadow-bento shadow-bentoTile backdrop-blur-sm",
  accent:
    "border-bento-accent/25 bg-gradient-to-br from-bento-accentSoft/90 to-bento-tile text-bento-ink shadow-bento-lg",
  sage:
    "border-bento-sage/30 bg-gradient-to-br from-bento-sageSoft/80 to-bento-tile text-bento-ink shadow-bento",
  dark:
    "border-bento-ink/20 bg-bento-ink text-[#f3f0ea] shadow-bento-lg [&_.bento-muted]:text-white/65",
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
