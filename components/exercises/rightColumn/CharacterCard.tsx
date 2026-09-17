// components/exercises/rightColumn/CharacterCard.tsx
import Image from "next/image";

export interface CharacterCardProps {
  name: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  maxXp: number;
  quote: string;
  minXpToCustomize: number; // soglia minima per sbloccare "Personalizza"
}

export function CharacterCard({
  name,
  avatarUrl,
  level,
  currentXp,
  maxXp,
  quote,
  minXpToCustomize,
}: CharacterCardProps) {
  const percent = Math.min(100, Math.round((currentXp / maxXp) * 100));
  const canCustomize = currentXp >= minXpToCustomize;

  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-1.5">
        <span aria-hidden="true">🌿</span> Il tuo personaggio
      </p>

      <div className="flex items-start gap-4">
        <div className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-surface-blue">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground">{name}</p>
          <p className="text-xs text-brand-muted mt-0.5 mb-2">
            Livello {level}
          </p>

          <div className="w-full h-1.5 bg-surface-blue rounded-pill overflow-hidden mb-1">
            <div
              className="h-full bg-brand-primary rounded-pill"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-[10px] text-brand-muted mb-3">
            {currentXp} / {maxXp} XP
          </p>

          <button
            type="button"
            disabled={!canCustomize}
            className="btn-secondary text-sm px-4 py-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40 disabled:border-border disabled:text-brand-muted disabled:hover:bg-white active:scale-95 transition-transform duration-150"
          >
            Personalizza
          </button>
          {!canCustomize && (
            <p className="text-[10px] text-brand-muted mt-1.5 text-center">
              Sblocchi a {minXpToCustomize} XP
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-surface-blue px-4 py-3">
        <p className="text-xs italic leading-5 text-brand-primary">“{quote}”</p>
      </div>
    </div>
  );
}
