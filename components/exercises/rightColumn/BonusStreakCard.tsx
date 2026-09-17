import type { SkinBonus } from "@/types/dashboard";

export interface BonusStreakCardProps {
  streak: number;
  bonuses: SkinBonus[]; // riusa lo stesso tipo già usato per SkinCard nella dashboard
}

export function BonusStreakCard({ streak, bonuses }: BonusStreakCardProps) {
  const hasBonuses = bonuses.length > 0;

  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <span aria-hidden="true">🔥</span> Slancio e bonus
        </p>
        {streak > 0 && (
          <span className="text-xs font-semibold text-brand-coral">
            {streak} giorni
          </span>
        )}
      </div>

      {hasBonuses ? (
        <ul className="text-sm text-brand-muted space-y-1 mt-3">
          {bonuses.map((bonus) => (
            <li key={bonus.label} className="flex items-center gap-1.5">
              <span className="text-brand-success font-semibold">
                {bonus.value}
              </span>
              {bonus.label}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-brand-muted mt-3 leading-5">
          Inizia a raccogliere punti per ottenere i tuoi bonus.
        </p>
      )}
    </div>
  );
}
