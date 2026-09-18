import { BoltIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import type { MissionBonusCounter } from "@/types/missions";

export function MissionBonusChip({ bonus }: { bonus: MissionBonusCounter }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white/10 pl-2 pr-1 py-1 shrink-0">
      {bonus.icon === "bolt" ? (
        <BoltIcon className="h-4 w-4 text-brand-accent" />
      ) : (
        // TODO: sostituire con icona dedicata quando disponibile
        <span className="text-sm leading-none" aria-hidden="true">
          📜
        </span>
      )}
      <span className="text-sm font-bold text-white">{bonus.value}</span>
      <button
        type="button"
        aria-label="Aggiungi"
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
      >
        <PlusIcon className="h-3 w-3 text-white" />
      </button>
    </div>
  );
}
