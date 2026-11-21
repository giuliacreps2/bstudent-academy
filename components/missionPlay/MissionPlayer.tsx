"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { errorMessage } from "@/lib/api";
import {
  abandonMission,
  cancelSubmission,
  completeLesson,
  courseHref,
  getMissionState,
  pauseMission,
  pauseOnLeave,
  resumeMission,
  submitExercise,
} from "@/lib/missionPlay";
import { startMission } from "@/app/(play)/my/missions/actions";
import { PlayTopBar } from "./PlayTopBar";
import { PlayStepper } from "./PlayStepper";
import { LessonReader } from "./LessonReader";
import { ExercisePanel } from "./ExercisePanel";
import { HintReview } from "./HintReview";
import {
  AttemptFailedPanel,
  dangerLink,
  ExercisePassedPanel,
  ExerciseWithdrawnPanel,
  MissionPassedPanel,
  PausedPanel,
  PendingReviewPanel,
} from "./OutcomePanels";
import type {
  Answer,
  Hint,
  MissionPlay,
  MissionStepOutcome,
  MissionSync,
} from "@/types/missionPlay";

/**
 * Missione in corso (blueprint §9, Blueprint Svolgimento): un passo alla volta, lezione o esercizio.
 * Lo stato vero è sempre quello del backend: ogni azione restituisce la missione aggiornata.
 */
export function MissionPlayer({ initial }: { initial: MissionPlay }) {
  const router = useRouter();
  const [play, setPlay] = useState(initial);
  /** Esito dell'ultimo passo, mostrato finché lo studente non preme "Continua" */
  const [step, setStep] = useState<MissionStepOutcome | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [retrying, startRetry] = useTransition();

  const exitHref = courseHref(play.courseSlug);
  const answerRef = useRef<Answer | undefined>(undefined);
  const statusRef = useRef(play.status);
  useEffect(() => {
    statusRef.current = play.status;
  }, [play.status]);

  // Chiusura della scheda o del browser durante la missione: si salva in pausa con la risposta
  useEffect(() => {
    const onLeave = () => {
      if (statusRef.current === "active") pauseOnLeave(initial.missionAttemptId, answerRef.current);
    };
    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, [initial.missionAttemptId]);

  /** Esegue un'azione sul backend; in caso di errore mostra il messaggio e ricarica lo stato */
  async function run<T>(action: () => Promise<T>, fallback: string): Promise<T | undefined> {
    setBusy(true);
    setError(null);
    try {
      return await action();
    } catch (e) {
      setError(errorMessage(e, fallback));
      try {
        setPlay(await getMissionState(play.missionAttemptId));
      } catch {
        // resta lo stato che c'era
      }
      return undefined;
    } finally {
      setBusy(false);
    }
  }

  function applyStep(result: MissionStepOutcome) {
    setPlay(result.state);
    answerRef.current = undefined;
    // "Ho finito di leggere" porta subito al passo dopo; gli altri esiti si mostrano
    setStep(result.result === "lesson_read" ? null : result);
  }

  const handleStopped = useCallback(
    async (sync: MissionSync) => {
      if (sync.status === "active") return;
      try {
        setPlay(await getMissionState(initial.missionAttemptId));
        if (sync.status === "failed") setStep(null);
      } catch (e) {
        setError(errorMessage(e, "Non riusciamo a leggere lo stato della missione."));
      }
    },
    [initial.missionAttemptId],
  );

  const handleAnswerChange = useCallback((answer: Answer) => {
    answerRef.current = answer;
  }, []);

  function handleHintUsed(hint: Hint) {
    setPlay((current) => ({ ...current, hint: hint.charges }));
  }

  async function handleSaveAndExit() {
    const saved = await run(
      () => pauseMission(play.missionAttemptId, answerRef.current),
      "Non riusciamo a salvare la missione. Riprova.",
    );
    if (saved) router.push(exitHref);
  }

  async function handleAbandon() {
    const message =
      play.status === "failed"
        ? "Vuoi abbandonare la missione? La prossima volta riparti da zero. Non perdi altre vite."
        : "Vuoi abbandonare la missione? Perdi una vita e la prossima volta riparti da zero.";
    if (!window.confirm(message)) return;
    const lives = await run(
      () => abandonMission(play.missionAttemptId),
      "Non riusciamo ad abbandonare la missione. Riprova.",
    );
    if (lives) router.push(exitHref);
  }

  function handleRetry() {
    setError(null);
    startRetry(async () => {
      // Se va a buon fine porta al nuovo tentativo; altrimenti dice perché (vite, altra missione...)
      const result = await startMission(play.courseSlug, play.missionSlug);
      setError(result.error);
    });
  }

  const finished = play.status === "passed";
  const canSave = play.status === "active";
  const canAbandon = play.status === "active";

  return (
    <>
      <PlayTopBar
        subjectName={play.subjectName}
        missionTitle={play.missionTitle}
        attemptNumber={play.attemptNumber}
        lives={play.lives}
        hint={play.hint}
        onSaveAndExit={canSave ? handleSaveAndExit : undefined}
        exitHref={exitHref}
        busy={busy}
      />

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-4">
        <PlayStepper steps={play.steps} finished={finished} />

        {error && play.status !== "failed" && play.status !== "pending_review" && (
          <p role="alert" className="mt-4 rounded-md bg-brand-coral/10 px-4 py-3 font-semibold text-brand-coral">
            {error}
          </p>
        )}

        <div className="mt-4">
          <Body
            play={play}
            step={step}
            error={error}
            busy={busy || retrying}
            exitHref={exitHref}
            onContinue={() => setStep(null)}
            onLessonDone={(lessonId) =>
              run(
                () => completeLesson(play.missionAttemptId, lessonId),
                "Non riusciamo a salvare la lettura. Riprova.",
              ).then((r) => r && applyStep(r))
            }
            onSubmit={(exerciseAttemptId, answer) =>
              run(
                () => submitExercise(exerciseAttemptId, answer),
                "Non riusciamo a consegnare. La risposta è salvata: riprova tra poco.",
              ).then((r) => r && applyStep(r))
            }
            onResume={() =>
              run(
                () => resumeMission(play.missionAttemptId),
                "Non riusciamo a riprendere la missione. Riprova.",
              ).then((p) => p && setPlay(p))
            }
            onCancelSubmission={(exerciseAttemptId) =>
              run(
                () => cancelSubmission(exerciseAttemptId),
                "Non riusciamo ad annullare l'invio. Riprova.",
              ).then((p) => p && setPlay(p))
            }
            onRetry={handleRetry}
            onAbandon={handleAbandon}
            onStopped={handleStopped}
            onAnswerChange={handleAnswerChange}
            onHintUsed={handleHintUsed}
          />
        </div>

        {canAbandon && (
          <div className="mt-8 text-center">
            <button type="button" onClick={handleAbandon} disabled={busy} className={dangerLink}>
              Abbandona missione
            </button>
          </div>
        )}
      </main>
    </>
  );
}

interface BodyProps {
  play: MissionPlay;
  step: MissionStepOutcome | null;
  error: string | null;
  busy: boolean;
  exitHref: string;
  onContinue: () => void;
  onLessonDone: (lessonId: number) => void;
  onSubmit: (exerciseAttemptId: number, answer: Answer) => void;
  onResume: () => void;
  onCancelSubmission: (exerciseAttemptId: number) => void;
  onRetry: () => void;
  onAbandon: () => void;
  onStopped: (sync: MissionSync) => void;
  onAnswerChange: (answer: Answer) => void;
  onHintUsed: (hint: Hint) => void;
}

/** Che cosa mostrare adesso, secondo lo stato del tentativo */
function Body({ play, step, error, busy, exitHref, ...on }: BodyProps) {
  switch (play.status) {
    case "passed":
      return (
        <div className="space-y-4">
          <MissionPassedPanel
            passed={step?.missionPassed ?? null}
            // Riaprendo la missione dopo la correzione: esito e commento della docente (Svolgimento §4.3)
            lastOutcome={step?.outcome ?? play.teacherReview}
            exitHref={exitHref}
          />
          <HintReview missionAttemptId={play.missionAttemptId} />
        </div>
      );

    case "failed":
      return (
        <div className="space-y-4">
        <AttemptFailedPanel
          reason={play.failureReason}
          outcome={step?.outcome ?? play.teacherReview}
          lifeLost={step?.lifeLost ?? false}
          lives={play.lives}
          retryError={error}
          onRetry={on.onRetry}
          onAbandon={on.onAbandon}
          exitHref={exitHref}
          busy={busy}
        />
          <HintReview missionAttemptId={play.missionAttemptId} />
        </div>
      );

    case "pending_review":
      return (
        <PendingReviewPanel
          answerText={play.exercise?.answer?.text ?? null}
          cancelError={error}
          onCancel={() => play.exercise && on.onCancelSubmission(play.exercise.exerciseAttemptId)}
          exitHref={exitHref}
          busy={busy}
        />
      );

    case "saved":
      return (
        <PausedPanel onResume={on.onResume} onAbandon={on.onAbandon} exitHref={exitHref} busy={busy} />
      );

    case "active":
      if (step?.result === "passed") {
        return <ExercisePassedPanel outcome={step.outcome} onContinue={on.onContinue} />;
      }
      if (step?.result === "withdrawn") {
        return <ExerciseWithdrawnPanel onContinue={on.onContinue} />;
      }
      if (play.lesson) {
        return (
          <LessonReader
            key={play.lesson.lessonId}
            lesson={play.lesson}
            busy={busy}
            onDone={() => play.lesson && on.onLessonDone(play.lesson.lessonId)}
          />
        );
      }
      if (play.exercise) {
        const exercise = play.exercise;
        return (
          <ExercisePanel
            key={exercise.exerciseAttemptId}
            missionAttemptId={play.missionAttemptId}
            play={exercise}
            busy={busy}
            hintAvailable={play.hint.owned && play.hint.equipped}
            onSubmit={(answer) => on.onSubmit(exercise.exerciseAttemptId, answer)}
            onStopped={on.onStopped}
            onAnswerChange={on.onAnswerChange}
            onHintUsed={on.onHintUsed}
          />
        );
      }
      return (
        <p className="rounded-lg border border-border bg-surface p-6 text-center text-brand-muted">
          Stiamo preparando il prossimo passo…
        </p>
      );
  }
}
