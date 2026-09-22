import { ShieldCheckIcon } from "@heroicons/react/24/outline";

interface CourseLevelCardProps {
  level: number;
  currentXp: number;
  maxXp: number;
}

export function CourseLevelCard({
  level,
  currentXp,
  maxXp,
}: CourseLevelCardProps) {
  const percent = Math.min(100, Math.round((currentXp / maxXp) * 100));

  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <p className="text-xs font-semibold tracking-widest text-brand-muted uppercase mb-3">
        Il tuo livello
      </p>

      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-blue shrink-0">
          <ShieldCheckIcon className="h-5 w-5 text-brand-primary" />
        </span>
        <span className="text-sm font-bold text-foreground">
          Livello {level}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-pill bg-surface-blue mb-1">
        <div
          className="h-full rounded-pill bg-brand-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-brand-muted">
        {currentXp} / {maxXp} XP
      </p>
    </div>
  );
}
