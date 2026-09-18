export function MissionRibbon({ number }: { number: number }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-extrabold tracking-[0.14em] text-white backdrop-blur-sm">
      MISSIONE {number}
    </span>
  );
}
