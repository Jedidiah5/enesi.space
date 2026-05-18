import Image from "next/image";

type Size = "sm" | "md";

const sizes: Record<Size, string> = {
  sm: "h-11 w-11 rounded-lg text-xs",
  md: "h-14 w-14 rounded-xl text-sm md:h-16 md:w-16",
};

type Props = {
  name: string;
  src?: string;
  size?: Size;
};

export function ProfileAvatar({ name, src, size = "md" }: Props) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const dim = sizes[size];

  if (src) {
    return (
      <div className={`relative shrink-0 overflow-hidden bg-ana-canvas2 ring-1 ring-ana-line ${dim}`}>
        <Image src={src} alt="" fill className="object-cover" sizes={size === "sm" ? "44px" : "64px"} />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-ana-accent/30 to-ana-accentSoft font-bold text-ana-ink ring-1 ring-ana-line ${dim}`}
      aria-hidden
    >
      {initials}
    </div>
  );
}
