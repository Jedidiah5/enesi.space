import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  title?: string;
  delay?: number;
};

export function RetroPanel({ children, className = "", title, delay = 0 }: Props) {
  return (
    <fieldset
      className={`win95-fieldset animate-win-pop text-[13px] text-w95-ink ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {title ? <legend className="font-bold">{title}</legend> : null}
      <div className="px-1 pb-1 pt-0.5">{children}</div>
    </fieldset>
  );
}
