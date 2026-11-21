import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { HintCharges, Lives } from "@/types/missionPlay";

interface PlayTopBarProps {
  subjectName: string;
  missionTitle: string;
  attemptNumber: number;
  lives: Lives;
  hint: HintCharges;
  /** "Salva missione": in pausa e ritorno al corso. Assente se non c'è niente da salvare */
  onSaveAndExit?: () => void;
  exitHref: string;
  busy: boolean;
}

/** Barra in alto: uscita, titolo, vite e cariche del cappello (mai acquistabili) */
export function PlayTopBar({
  subjectName,
  missionTitle,
  attemptNumber,
  lives,
  hint,
  onSaveAndExit,
  exitHref,
  busy,
}: PlayTopBarProps) {
  const exitClass =
    "flex shrink-0 items-center gap-1.5 rounded-pill border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-blue disabled:opacity-60";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
        {onSaveAndExit ? (
          <button type="button" onClick={onSaveAndExit} disabled={busy} className={exitClass}>
            <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
            Salva missione
          </button>
        ) : (
          <Link href={exitHref} className={exitClass}>
            <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
            Torna al corso
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-wide text-brand-muted">
            {subjectName}
            {attemptNumber > 1 && ` · tentativo ${attemptNumber}`}
          </p>
          <h1 className="truncate text-base font-extrabold sm:text-lg">{missionTitle}</h1>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className="flex items-center gap-1 rounded-pill bg-surface-blue px-2.5 py-1 text-sm font-bold"
            title="Vite"
          >
            <HeartIcon aria-hidden="true" className="h-4 w-4 text-brand-coral" />
            <span className="sr-only">Vite:</span>
            {lives.lives}
          </span>
          {hint.owned && hint.equipped && (
            <span
              className="flex items-center gap-1 rounded-pill bg-surface-blue px-2.5 py-1 text-sm font-bold"
              title={hint.accessoryName ? `Aiuti di ${hint.accessoryName}` : "Aiuti del cappello"}
            >
              <span aria-hidden="true">📜</span>
              <span className="sr-only">Aiuti rimasti:</span>
              {hint.remaining}/{hint.capacity}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
