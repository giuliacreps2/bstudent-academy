import { ShieldCheckIcon } from "@heroicons/react/24/outline";

interface LevelProgressProps {
  level: number;
  currentXp: number;
  maxXp: number;
}

export function LevelProgress({ level, currentXp, maxXp }: LevelProgressProps) {
  const percent = Math.min(100, (currentXp / maxXp) * 100);

  return (
    <div className="flex items-center gap-3 flex-1">
      <div className="w-9 h-9 rounded-full bg-surface-blue flex items-center justify-center shrink-0">
        <ShieldCheckIcon className="w-5 h-5 text-brand-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground mb-1">
          Livello {level}
        </p>
        <div className="w-full h-1.5 bg-surface-blue rounded-pill overflow-hidden">
          <div
            className="h-full bg-brand-primary rounded-pill"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-[10px] text-brand-muted mt-1">
          {currentXp} / {maxXp} XP
        </p>
      </div>
    </div>
  );
}
