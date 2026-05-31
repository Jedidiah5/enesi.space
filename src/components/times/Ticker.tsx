type Props = {
  items: string[];
};

export function Ticker({ items }: Props) {
  const line = items.filter(Boolean).join(" • ");
  const text = line ? `${line} • ` : "FULL STACK DEVELOPER • LONDON • ";

  return (
    <div className="absolute bottom-10 left-0 w-full overflow-hidden border-y-2 border-primary bg-on-surface py-2">
      <div className="animate-ticker">
        <div className="whitespace-nowrap px-4 font-label-mono text-sm text-surface">{text}</div>
        <div className="whitespace-nowrap px-4 font-label-mono text-sm text-surface">{text}</div>
      </div>
    </div>
  );
}
