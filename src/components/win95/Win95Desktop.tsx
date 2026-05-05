import type { ReactNode } from "react";

type Props = { children: ReactNode };

export function Win95Desktop({ children }: Props) {
  return <div className="win95-desktop flex min-h-dvh flex-col pb-10">{children}</div>;
}
