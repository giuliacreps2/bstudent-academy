"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { errorMessage } from "@/lib/api";
import {
  cancelPracticeSubmission,
  EXERCISES_PATH,
  leaveAttempt,
  saveDraft,
  submitPractice,
} from "@/lib/practice";
import { resourceHref } from "@/constants/resources";
import { startPractice } from "@/app/(app)/my/exercises/actions";
import { AnswerField } from "@/components/missionPlay/ExercisePanel";
import { primaryButton, secondaryButton } from "@/components/missionPlay/OutcomePanels";
import type { Answer } from "@/types/missionPlay";
import type { PracticeAttempt, PracticeOutcome } from "@/types/practice";

/**
 * Svolgimento di una voce della Palestra. La Palestra è l'allenamento: la soluzione si vede sempre,
 * anche dopo un errore (Blueprint Svolgimento §3.3). Niente tempo obbligatorio e niente vite.
 */
export function PracticeAttemptPlayer({ initial }: { initial: PracticeAttempt }) {
  const router = useRouter();
  const [attempt, setAttempt] = useState(initial);
  const [answer, setAnswer] = useState<Answer>(initial.answer ?? { selectedAnswerId: null, text: null });
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [retrying, startRetry] = useTransition();

  const { exercise } = attempt;
  const editable = attempt.status === "active" || attempt.status === "saved";
  const complete =
    exercise.kind === "multiple_choice" ? answer.selectedAnswerId !== null : Boolean(answer.text?.trim());

  async function run(action: () => Promise<void>, fallback: string) {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await action();
    } catch (e) {
      setError(errorMessage(e, fallback));
    } finally {
      setBusy(false);
    }
  }

  const handleSubmit = () =>
    run(async () => {
      const result = await submitPractice(attempt.exerciseAttemptId, answer);
      setAttempt(result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, "Non riusciamo a consegnare. Riprova tra poco.");

  const handleSave = () =>
    run(async () => {
      setAttempt(await saveDraft(attempt.exerciseAttemptId, answer));
      setNotice("Esercizio salvato: lo ritrovi in «Riprendi il tuo allenamento».");
    }, "Non riusciamo a salvare. Riprova tra poco.");

  const handleLeave = () => {
    if (!window.confirm("Uscire senza salvare? La risposta scritta fin qui si perde.")) return;
    run(async () => {
      await leaveAttempt(attempt.exerciseAttemptId);
      router.push(EXERCISES_PATH);
    }, "Non riusciamo a chiudere l'esercizio. Riprova.");
  };

  const handleCancel = () =>
    run(async () => {
      const result = await cancelPracticeSubmission(attempt.exerciseAttemptId);
      setAttempt(result);
      setAnswer(result.answer ?? { selectedAnswerId: null, text: null });
    }, "Non riusciamo ad annullare l'invio. Riprova.");

  const handleRetry = () => {
    setError(null);
    startRetry(async () => {
      const result = await startPractice(attempt.practiceExerciseId);
      setError(result.error);
    });
  };

  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Palestra</p>
      <h1 className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl">{exercise.title}</h1>

      <p className="mt-5 whitespace-pre-line text-lg leading-8">{exercise.prompt}</p>
      {exercise.sourceText && (
        <blockquote className="mt-4 whitespace-pre-line rounded-md border-l-4 border-brand-primary bg-surface-blue px-4 py-3 text-lg leading-8">
          {exercise.sourceText}
        </blockquote>
      )}

      {attempt.status === "assessed" && attempt.outcome && <PracticeOutcomeView outcome={attempt.outcome} />}

      <div className="mt-6">
        {editable || attempt.status === "pending_review" || attempt.status === "assessed" ? (
          <AnswerField
            kind={exercise.kind}
            options={exercise.options ?? []}
            answer={editable ? answer : (attempt.answer ?? answer)}
            onChange={setAnswer}
            disabled={!editable || busy}
          />
        ) : (
          <p className="rounded-md bg-surface-blue px-4 py-3 text-brand-muted">
            Questo esercizio non è più disponibile. Torna agli esercizi per sceglierne un altro.
          </p>
        )}
      </div>

      {exercise.assessmentMode === "teacher" && editable && (
        <p className="mt-3 text-sm text-brand-muted">
          Questo esercizio lo corregge la docente: l&apos;esito arriva più avanti. Finché non l&apos;ha corretto
          puoi annullare l&apos;invio.
        </p>
      )}

      {attempt.status === "pending_review" && (
        <p className="mt-4 flex items-start gap-2 rounded-md bg-surface-blue px-4 py-3">
          <ClockIcon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
          Consegnato alla docente. Trovi l&apos;esito qui e in «Riprendi il tuo allenamento» quando avrà corretto.
        </p>
      )}

      {notice && (
        <p role="status" className="mt-4 rounded-md bg-brand-success/10 px-4 py-3 font-semibold text-brand-success">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 rounded-md bg-brand-coral/10 px-4 py-3 font-semibold text-brand-coral">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        {editable && (
          <>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={handleSave} disabled={busy} className={secondaryButton}>
                Salva esercizio
              </button>
              <button
                type="button"
                onClick={handleLeave}
                disabled={busy}
                className="px-3 py-2 text-sm font-semibold text-brand-muted hover:text-foreground disabled:opacity-60"
              >
                Esci senza salvare
              </button>
            </div>
            <button type="button" onClick={handleSubmit} disabled={busy || !complete} className={primaryButton}>
              Consegna
            </button>
          </>
        )}

        {attempt.status === "pending_review" && (
          <>
            <button type="button" onClick={handleCancel} disabled={busy} className={secondaryButton}>
              Annulla invio
            </button>
            <Link href={EXERCISES_PATH} className={primaryButton}>
              Torna agli esercizi
            </Link>
          </>
        )}

        {!editable && attempt.status !== "pending_review" && (
          <>
            <Link href={EXERCISES_PATH} className={secondaryButton}>
              Torna agli esercizi
            </Link>
            {attempt.status === "assessed" && (
              <button type="button" onClick={handleRetry} disabled={retrying} className={primaryButton}>
                Rifai l&apos;esercizio
              </button>
            )}
          </>
        )}
      </div>
    </article>
  );
}

const percent = (value: number) => `${Math.round(Number(value))}%`;

/** Esito in Palestra: risultato, soluzione sempre visibile, punti e premi (Gamification §7–8) */
function PracticeOutcomeView({ outcome }: { outcome: PracticeOutcome }) {
  const rewards = outcome.rewards;
  const pause = rewards?.run?.pause ?? null;
  const points = outcome.pointsEarned !== null ? Number(outcome.pointsEarned) : 0;
  const review =
    !outcome.passed && outcome.reviewSubjectSlug && outcome.reviewResourceSlug
      ? resourceHref(outcome.reviewSubjectSlug, outcome.reviewResourceSlug)
      : null;

  return (
    <section
      aria-label="Esito"
      className={`mt-6 rounded-lg border p-5 ${
        outcome.passed ? "border-brand-success/40 bg-brand-success/5" : "border-brand-coral/40 bg-brand-coral/5"
      }`}
    >
      <p className="flex items-center gap-2 text-xl font-extrabold">
        {outcome.passed ? (
          <CheckCircleIcon aria-hidden="true" className="h-7 w-7 text-brand-success" />
        ) : (
          <XCircleIcon aria-hidden="true" className="h-7 w-7 text-brand-coral" />
        )}
        {outcome.passed ? "Superato!" : "Non ancora"} · {percent(outcome.percentage)}
        <span className="text-sm font-semibold text-brand-muted">
          (serve almeno {percent(outcome.passingThreshold)})
        </span>
      </p>

      <div className="mt-4 space-y-3 text-base leading-7">
        {outcome.feedback && <p className="rounded-md bg-surface px-4 py-3">{outcome.feedback}</p>}

        {outcome.correctAnswers.length > 0 && (
          <div>
            <p className="font-bold">{outcome.correctAnswers.length > 1 ? "Risposte giuste" : "Risposta giusta"}</p>
            <ul className="mt-1 list-inside list-disc">
              {outcome.correctAnswers.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        )}

        {outcome.generalExplanation && <p className="whitespace-pre-line">{outcome.generalExplanation}</p>}

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

        {points > 0 && <p className="font-semibold">+{points.toLocaleString("it-IT")} punti skill</p>}

        {rewards?.streakLifeAwarded && (
          <p className="font-semibold text-brand-success">Hai superato più esercizi di fila: hai guadagnato una vita!</p>
        )}
        {rewards?.dailyChallengeLifeAwarded && (
          <p className="font-semibold text-brand-success">Sfida del giorno completata: hai guadagnato una vita!</p>
        )}
        {rewards?.run && !rewards.streakLifeAwarded && rewards.run.passedInARow > 0 && (
          <p className="text-sm text-brand-muted">
            Esercizi superati di fila: {rewards.run.passedInARow} su {rewards.run.streakForLife} per la prossima vita.
          </p>
        )}

        {pause && (
          <div className="rounded-md bg-surface-blue px-4 py-3">
            <p>{pause.message}</p>
            {pause.subjectSlug && pause.resourceSlug && (
              <Link
                href={resourceHref(pause.subjectSlug, pause.resourceSlug)}
                className="mt-1 inline-block font-semibold text-brand-primary hover:underline"
              >
                Ripassa {pause.resourceTitle ?? pause.topicName ?? "la teoria"} →
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
