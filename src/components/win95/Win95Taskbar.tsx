"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = { active?: "portfolio" | "admin" };

export function Win95Taskbar({ active = "portfolio" }: Props) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[100] flex h-9 items-stretch gap-1 border-t border-white bg-w95-face px-1 py-0.5 shadow-[0_-1px_0_#404040]">
      <Link
        href="/"
        className="win95-btn m-0.5 min-h-0 gap-1 px-2 font-bold tracking-tight"
        aria-label="Start"
      >
        <span className="text-w95-title" aria-hidden>
          ▣
        </span>
        Start
      </Link>
      <div className="mx-0.5 my-0.5 w-px bg-w95-shadow shadow-[1px_0_0_#fff]" aria-hidden />
      <div className="flex flex-1 items-center gap-1 overflow-x-auto px-1">
        <Link
          href="/"
          className={
            active === "portfolio"
              ? "win95-sunken-grey max-w-[200px] truncate px-2 py-0.5 text-left text-[12px] font-bold text-w95-ink"
              : "win95-raised max-w-[200px] truncate px-2 py-0.5 text-left text-[12px] text-w95-ink"
          }
        >
          My Portfolio
        </Link>
        <Link
          href="/admin"
          className={
            active === "admin"
              ? "win95-sunken-grey max-w-[200px] truncate px-2 py-0.5 text-left text-[12px] font-bold text-w95-ink"
              : "win95-raised max-w-[200px] truncate px-2 py-0.5 text-left text-[12px] text-w95-ink"
          }
        >
          Admin
        </Link>
      </div>
      <div className="win95-sunken-grey my-0.5 flex min-w-[88px] items-center justify-center px-2 text-[12px] tabular-nums text-w95-ink">
        {time || "—"}
      </div>
    </footer>
  );
}
