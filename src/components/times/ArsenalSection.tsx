import { TIMES_ASSETS } from "./assets";

type SkillRow = { tag: string; label: string; accent?: boolean };

type Props = {
  skills: SkillRow[];
  quote?: string;
};

const defaultRows: SkillRow[] = [
  { tag: "FRONTEND", label: "REACT/NEXT.JS" },
  { tag: "LOGIC", label: "TYPESCRIPT" },
  { tag: "STYLE", label: "TAILWIND" },
  { tag: "AI", label: "LLM TOOLS", accent: true },
  { tag: "AUTH", label: "FIREBASE", accent: true },
  { tag: "DATA", label: "POSTGRES", accent: true },
];

export function ArsenalSection({ skills = defaultRows, quote }: Props) {
  const left = skills.filter((_, i) => i % 2 === 0);
  const right = skills.filter((_, i) => i % 2 === 1);

  return (
    <section id="stack" className="scroll-mt-28 relative overflow-hidden bg-surface-container px-margin-page py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
        <div className="relative order-2 w-full md:order-1 md:w-1/2">
          <div className="relative z-10 mx-auto max-w-sm -rotate-3 bg-white p-4 scribble-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Pixel gear box" src={TIMES_ASSETS.gearBox} className="pixelated h-auto w-full drop-shadow-xl" />
            <div className="absolute -left-4 -top-4 -rotate-12 bg-on-surface p-2 font-label-mono text-xs text-surface">
              INVENTORY
            </div>
          </div>
          <div className="absolute left-0 top-0 select-none font-masthead text-[150px] opacity-10">GEAR</div>
        </div>

        <div className="order-1 w-full md:order-2 md:w-1/2">
          <h2 className="-rotate-1 mb-8 font-section-header text-[64px] leading-[60px] text-primary">ARSENAL</h2>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-4">
              {left.map((row) => (
                <SkillRow key={row.tag} {...row} />
              ))}
            </div>
            <div className="space-y-4">
              {right.map((row) => (
                <SkillRow key={row.tag} {...row} />
              ))}
            </div>
          </div>

          {quote ? (
            <div className="relative mt-12 rotate-2 bg-secondary-container p-4 shadow-md">
              <p className="font-body-main italic text-on-secondary-container">&ldquo;{quote}&rdquo;</p>
              <div className="absolute -right-4 -top-4 bg-on-surface p-2 font-label-mono text-xs text-surface">
                LEAKED NOTES
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SkillRow({ tag, label, accent }: SkillRow) {
  return (
    <div className="flex items-center gap-2 border-b border-outline pb-2">
      <span
        className={`font-label-mono px-2 text-xs ${accent ? "bg-primary text-on-primary" : "bg-on-surface text-surface"}`}
      >
        {tag}
      </span>
      <span className="font-label-mono text-sm">{label}</span>
    </div>
  );
}
