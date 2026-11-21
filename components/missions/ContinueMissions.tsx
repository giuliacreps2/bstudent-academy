import Link from "next/link";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { missionPlayHref } from "@/lib/missionPlay";
import { missionHref } from "@/lib/courses";
import type { CurrentMission } from "@/types/courses";

const statusText: Record<CurrentMission["status"], string> = {
  active: "In corso",
  saved: "In pausa: riprendi da dove eri rimasto",
  pending_review: "In attesa della correzione della docente",
  failed: "Tentativo non riuscito: riprova o abbandona",
  passed: "Superata",
};

/**
 * "Continua la missione" (Blueprint Svolgimento §9): una missione aperta per materia.
 * Missione in corso o in pausa → svolgimento; tentativo fallito → pagina della missione ("Riprova").
 */
export function ContinueMissions({ missions }: { missions: CurrentMission[] }) {
  if (missions.length === 0) return null;

  return (
    <section aria-labelledby="continue-missions" className="rounded-lg border border-border bg-surface p-4">
      <h2 id="continue-missions" className="text-sm font-bold text-foreground">
        Continua la missione
      </h2>
      <ul className="mt-3 space-y-2">
        {missions.map((m) => {
          const href =
            m.status === "failed" ? missionHref(m.courseSlug, m.missionSlug) : missionPlayHref(m.missionAttemptId);
          return (
            <li key={m.missionAttemptId}>
              <Link
                href={href}
                className="flex items-center gap-3 rounded-md bg-surface-blue px-3 py-2.5 transition hover:bg-surface-light-blue"
              >
                <PlayCircleIcon aria-hidden="true" className="h-7 w-7 shrink-0 text-brand-primary" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {m.subjectName}: {m.missionTitle}
                  </span>
                  <span className="block text-xs text-brand-muted">{statusText[m.status]}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
