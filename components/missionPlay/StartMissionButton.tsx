"use client";

import { useState, useTransition } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { startMission } from "@/app/(play)/my/missions/actions";

interface StartMissionButtonProps {
  courseSlug: string;
  missionSlug: string;
  /** "Inizia la missione", "Riprendi" o "Riprova", secondo lo stato della missione */
  label?: string;
  className?: string;
}

/**
 * Apre la missione in corso. Il backend decide se iniziare, riprendere o ritentare; se non si può
 * (senza vite, un'altra missione della stessa materia in corso, in attesa della docente) mostra il perché.
 * TODO (pagina della missione): usarlo al posto del link di MissionStartButton quando la pagina ha i dati veri
 */
export function StartMissionButton({
  courseSlug,
  missionSlug,
  label = "Inizia la missione",
  className = "",
}: StartMissionButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className={className}>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const result = await startMission(courseSlug, missionSlug);
            setError(result.error);
          })
        }
        className="flex items-center gap-2 rounded-full bg-brand-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform duration-150 active:scale-95 disabled:opacity-60"
      >
        {label}
        <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
      </button>
      {error && (
        <p role="alert" className="mt-2 max-w-sm text-sm font-semibold text-brand-coral">
          {error}
        </p>
      )}
    </div>
  );
}
