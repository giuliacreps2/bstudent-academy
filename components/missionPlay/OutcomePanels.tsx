import Link from "next/link";
import type { ReactNode } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  PauseCircleIcon,
  SparklesIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { resourceHref } from "@/constants/resources";
import type {
  ExerciseOutcome,
  FailureReason,
  Lives,
  MissionPassed,
} from "@/types/missionPlay";

/* =====================================================================
   Che cosa vede lo studente dopo un passo (Blueprint Svolgimento §3).
   Superato: la risposta giusta, più spiegazione e feedback se esistono.
   Non superato in missione: feedback e teoria da rileggere, mai la soluzione.
   ===================================================================== */

export const primaryButton =
  "inline-flex items-center justify-center gap-1.5 rounded-pill bg-brand-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-primary-hover disabled:opacity-60";
export const secondaryButton =
  "inline-flex items-center justify-center gap-1.5 rounded-pill border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-blue disabled:opacity-60";
export const dangerLink =
  "text-sm font-semibold text-brand-coral underline-offset-4 hover:underline disabled:opacity-60";

function Panel({
  icon,
  tone,
  title,
  children,
}: {
  icon: ReactNode;
  tone: "success" | "danger" | "info";
  title: string;
  children: ReactNode;
}) {
  const ring = {
    success: "bg-brand-success/15 text-brand-success",
    danger: "bg-brand-coral/15 text-brand-coral",
    info: "bg-surface-blue text-brand-primary",
  }[tone];

  return (
    <section className="rounded-lg border border-border bg-surface p-6 text-center shadow-sm sm:p-10">
      <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${ring}`}>
        {icon}
      </span>
      <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">{title}</h2>
      <div className="mx-auto mt-4 max-w-xl space-y-4 text-base leading-7">{children}</div>
    </section>
  );
}

const percent = (value: number) => `${Math.round(Number(value))}%`;

/** Dettagli dell'esito di un esercizio: niente soluzione se non è superato */
function OutcomeDetails({ outcome }: { outcome: ExerciseOutcome }) {
  const review =
    !outcome.passed && outcome.reviewSubjectSlug && outcome.reviewResourceSlug
      ? resourceHref(outcome.reviewSubjectSlug, outcome.reviewResourceSlug)
      : null;

  return (
    <div className="space-y-3 text-left">
      <p className="text-center text-lg">
        Risultato: <strong>{percent(outcome.percentage)}</strong>
        <span className="text-brand-muted"> (serve almeno {percent(outcome.passingThreshold)})</span>
      </p>

      {outcome.feedback && (
        <p className="rounded-md bg-surface-blue px-4 py-3">{outcome.feedback}</p>
      )}

      {outcome.passed && outcome.correctAnswers.length > 0 && (
        <div>
          <p className="font-bold">
            {outcome.correctAnswers.length > 1 ? "Risposte giuste" : "Risposta giusta"}
          </p>
          <ul className="mt-1 list-inside list-disc">
            {outcome.correctAnswers.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      )}

      {outcome.passed && outcome.generalExplanation && (
        <p className="whitespace-pre-line">{outcome.generalExplanation}</p>
      )}

      {!outcome.passed && outcome.reviewTopicName && (
        <p>
          Rileggi la teoria su <strong>{outcome.reviewTopicName}</strong>
          {review && (
            <>
              {" "}
              nelle{" "}
              <Link href={review} className="font-semibold text-brand-primary hover:underline">
                Risorse
              </Link>
            </>
          )}
          .
        </p>
      )}

      {outcome.pointsEarned !== null && Number(outcome.pointsEarned) > 0 && (
        <p className="text-center text-brand-muted">
          +{Number(outcome.pointsEarned).toLocaleString("it-IT")} punti skill
        </p>
      )}
    </div>
  );
}

/* ------------------------------------ Esercizio superato ------------------------------------ */

export function ExercisePassedPanel({
  outcome,
  onContinue,
}: {
  outcome: ExerciseOutcome | null;
  onContinue: () => void;
}) {
  return (
    <Panel
      tone="success"
      icon={<CheckCircleIcon aria-hidden="true" className="h-8 w-8" />}
      title="Esercizio superato!"
    >
      {outcome && <OutcomeDetails outcome={outcome} />}
      <button type="button" onClick={onContinue} className={primaryButton}>
        Continua la missione
      </button>
    </Panel>
  );
}

/** L'autrice ha tolto l'esercizio mentre lo svolgevi: saltato, nessuna vita persa (Svolgimento §6) */
export function ExerciseWithdrawnPanel({ onContinue }: { onContinue: () => void }) {
  return (
    <Panel
      tone="info"
      icon={<SparklesIcon aria-hidden="true" className="h-8 w-8" />}
      title="Questo esercizio è stato tolto"
    >
      <p>Mentre lo svolgevi l&apos;esercizio è stato ritirato: lo saltiamo e non perdi nulla.</p>
      <button type="button" onClick={onContinue} className={primaryButton}>
        Continua la missione
      </button>
    </Panel>
  );
}

/* ------------------------------------ Tentativo fallito ------------------------------------ */

const failureTitles: Record<FailureReason, string> = {
  below_threshold: "Non ce l'hai fatta, per questa volta",
  time_expired: "Tempo scaduto",
  abandonment: "Missione abbandonata",
};

export function AttemptFailedPanel({
  reason,
  outcome,
  lifeLost,
  lives,
  retryError,
  onRetry,
  onAbandon,
  exitHref,
  busy,
}: {
  reason: FailureReason | null;
  outcome: ExerciseOutcome | null;
  lifeLost: boolean;
  lives: Lives;
  retryError: string | null;
  onRetry: () => void;
  onAbandon: () => void;
  exitHref: string;
  busy: boolean;
}) {
  return (
    <Panel
      tone="danger"
      icon={<XCircleIcon aria-hidden="true" className="h-8 w-8" />}
      title={reason ? failureTitles[reason] : "Tentativo non riuscito"}
    >
      {outcome && <OutcomeDetails outcome={outcome} />}

      {/* Ogni tentativo fallito costa una vita (blueprint §12): lifeLost dice se è successo adesso */}
      <p className="font-semibold">
        {lifeLost ? "Hai perso una vita" : "Questo tentativo è costato una vita"}: te ne
        {lives.lives === 1 ? " resta 1" : ` restano ${lives.lives}`}.
      </p>

      <p className="text-brand-muted">
        Le lezioni lette e gli esercizi già superati restano: riprovando riparti dal passo in cui ti
        sei fermato.
      </p>

      {retryError && (
        <p role="alert" className="font-semibold text-brand-coral">
          {retryError}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onRetry} disabled={busy} className={primaryButton}>
          Riprova
        </button>
        <Link href={exitHref} className={secondaryButton}>
          Torna al corso
        </Link>
      </div>
      <button type="button" onClick={onAbandon} disabled={busy} className={dangerLink}>
        Abbandona la missione e riparti da zero
      </button>
    </Panel>
  );
}

/* ------------------------------------ In pausa ------------------------------------ */

export function PausedPanel({
  onResume,
  onAbandon,
  exitHref,
  busy,
}: {
  onResume: () => void;
  onAbandon: () => void;
  exitHref: string;
  busy: boolean;
}) {
  return (
    <Panel
      tone="info"
      icon={<PauseCircleIcon aria-hidden="true" className="h-8 w-8" />}
      title="Missione in pausa"
    >
      <p>
        La tua missione è salvata e il tempo è fermo. Quando vuoi, riprendi da dove eri rimasto.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onResume} disabled={busy} className={primaryButton}>
          Riprendi
        </button>
        <Link href={exitHref} className={secondaryButton}>
          Torna al corso
        </Link>
      </div>
      <button type="button" onClick={onAbandon} disabled={busy} className={dangerLink}>
        Abbandona missione
      </button>
    </Panel>
  );
}

/* ------------------------------------ In attesa della docente ------------------------------------ */

export function PendingReviewPanel({
  answerText,
  cancelError,
  onCancel,
  exitHref,
  busy,
}: {
  answerText: string | null;
  cancelError: string | null;
  onCancel: () => void;
  exitHref: string;
  busy: boolean;
}) {
  return (
    <Panel
      tone="info"
      icon={<ClockIcon aria-hidden="true" className="h-8 w-8" />}
      title="Consegnato alla docente"
    >
      <p>
        Il tempo è fermo e l&apos;attesa non ti fa perdere vite. Intanto puoi allenarti in Palestra o
        andare avanti con le missioni di altre materie. Trovi l&apos;esito riaprendo questa missione.
      </p>

      {answerText && (
        <div className="text-left">
          <p className="text-sm font-semibold text-brand-muted">La tua risposta</p>
          <p className="mt-1 whitespace-pre-line rounded-md bg-surface-blue px-4 py-3">{answerText}</p>
        </div>
      )}

      {cancelError && (
        <p role="alert" className="font-semibold text-brand-coral">
          {cancelError}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <Link href={exitHref} className={primaryButton}>
          Torna al corso
        </Link>
        <button type="button" onClick={onCancel} disabled={busy} className={secondaryButton}>
          Annulla invio
        </button>
      </div>
      <p className="text-sm text-brand-muted">
        Annullando ritrovi la risposta da modificare, con il tempo che avevi al momento
        dell&apos;invio.
      </p>
    </Panel>
  );
}

/* ------------------------------------ Missione superata ------------------------------------ */

export function MissionPassedPanel({
  passed,
  lastOutcome,
  exitHref,
}: {
  passed: MissionPassed | null;
  lastOutcome: ExerciseOutcome | null;
  exitHref: string;
}) {
  const xp = passed ? Number(passed.xpEarned) : 0;

  return (
    <Panel
      tone="success"
      icon={<SparklesIcon aria-hidden="true" className="h-8 w-8" />}
      title="Missione superata!"
    >
      {lastOutcome && <OutcomeDetails outcome={lastOutcome} />}

      {passed && (
        <div className="rounded-md bg-surface-blue px-4 py-4">
          <p className="text-lg">
            Risultato della missione: <strong>{percent(passed.percentage)}</strong>
            {passed.newRecord && (
              <span className="ml-2 rounded-pill bg-brand-yellow/30 px-2 py-0.5 text-sm font-bold">
                Nuovo record
              </span>
            )}
          </p>
          {xp > 0 && <p className="mt-1 font-bold">+{xp.toLocaleString("it-IT")} XP</p>}
          {passed.course && (
            <p className="mt-1 text-brand-muted">
              {passed.course.courseTitle}: {passed.course.passedMissions} missioni superate su{" "}
              {passed.course.totalMissions}
              {passed.course.completedNow && " · corso completato!"}
            </p>
          )}
          {passed.newStages.length > 0 && (
            <p className="mt-2 font-bold text-brand-primary">
              Il tuo personaggio ha raggiunto una nuova evoluzione!
            </p>
          )}
        </div>
      )}

      <Link href={exitHref} className={primaryButton}>
        Torna al corso
      </Link>
    </Panel>
  );
}
