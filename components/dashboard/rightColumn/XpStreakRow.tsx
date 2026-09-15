interface XpStreakRowProps {
  xp: number;
  streak: number;
}

export function XpStreakRow({ xp, streak }: XpStreakRowProps) {
  return (
    <div className="flex divide-x divide-border rounded-lg bg-surface border border-border">
      <div className="flex-1 flex items-center justify-center gap-2 py-4">
        <span className="text-brand-yellow text-xl">★</span>
        <div className="leading-tight">
          <p className="font-bold text-foreground">{xp}</p>
          <p className="text-xs text-brand-muted">XP</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 py-4">
        <span className="text-brand-coral text-xl">🔥</span>
        <div className="leading-tight">
          <p className="font-bold text-foreground">{streak}</p>
          <p className="text-xs text-brand-muted">giorni di streak</p>
        </div>
      </div>
    </div>
  );
}
