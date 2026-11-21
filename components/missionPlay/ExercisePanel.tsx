"use client";

import { useEffect, useRef, useState } from "react";
import { ClockIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { errorMessage } from "@/lib/api";
import { openHint, syncExercise } from "@/lib/missionPlay";
import type { Answer, Hint, MissionExercisePlay, MissionSync } from "@/types/missionPlay";

/** Salvataggio automatico: il backend mette in pausa dopo 45 secondi senza segnali */
const SYNC_EVERY_MS = 10_000;

interface ExercisePanelProps {
  missionAttemptId: number;
  play: MissionExercisePlay;
  /** Risposta attuale, per "Salva missione" e per la chiusura della pagina */
  onAnswerChange: (answer: Answer) => void;
  onSubmit: (answer: Answer) => void;
  /** Il backend dice che la missione non è più in corso (pausa automatica o tempo finito) */
  onStopped: (sync: MissionSync) => void;
  /** Cariche del cappello aggiornate dopo un aiuto */
  onHintUsed: (hint: Hint) => void;
  hintAvailable: boolean;
  busy: boolean;
}

export function ExercisePanel({
  missionAttemptId,
  play,
  onAnswerChange,
  onSubmit,
  onStopped,
  onHintUsed,
  hintAvailable,
  busy,
}: ExercisePanelProps) {
  const { exercise } = play;
  const [answer, setAnswer] = useState<Answer>(
    play.answer ?? { selectedAnswerId: null, text: null },
  );
  const [serverRemaining, setServerRemaining] = useState(play.remainingMs);
  const [syncProblem, setSyncProblem] = useState(false);

  // Ultimi valori per i timer, senza ricreare gli intervalli
  const latest = useRef({ answer, onStopped });
  useEffect(() => {
    latest.current = { answer, onStopped };
    onAnswerChange(answer);
  }, [answer, onStopped, onAnswerChange]);

  // Ogni pochi secondi: salva la risposta e riallinea il tempo con il server
  useEffect(() => {
    if (!play.timerRunning) return;
    const id = setInterval(async () => {
      try {
        const sync = await syncExercise(play.exerciseAttemptId, latest.current.answer);
        setSyncProblem(false);
        if (sync.status === "active") setServerRemaining(sync.remainingMs);
        else latest.current.onStopped(sync);
      } catch {
        setSyncProblem(true);
      }
    }, SYNC_EVERY_MS);
    return () => clearInterval(id);
  }, [play.exerciseAttemptId, play.timerRunning]);

  // Allo scadere il server registra il tempo finito (tentativo fallito, Blueprint Svolgimento §3).
  // Non consegna in automatico la risposta: vedi il TODO in fondo al file
  const remaining = useCountdown(serverRemaining, play.timerRunning, async () => {
    try {
      latest.current.onStopped(await syncExercise(play.exerciseAttemptId, latest.current.answer));
    } catch {
      setSyncProblem(true);
    }
  });

  const complete =
    exercise.kind === "multiple_choice"
      ? answer.selectedAnswerId !== null
      : Boolean(answer.text?.trim());

  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Esercizio</p>
          <h2 className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl">{exercise.title}</h2>
        </div>
        <Countdown remainingMs={remaining} allowedMs={play.allowedMs} running={play.timerRunning} />
      </div>

      <p className="mt-5 whitespace-pre-line text-lg leading-8">{exercise.prompt}</p>

      {exercise.sourceText && (
        <blockquote className="mt-4 whitespace-pre-line rounded-md border-l-4 border-brand-primary bg-surface-blue px-4 py-3 text-lg leading-8">
          {exercise.sourceText}
        </blockquote>
      )}

      <form
        className="mt-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (complete) onSubmit(answer);
        }}
      >
        <AnswerField
          kind={exercise.kind}
          options={exercise.options ?? []}
          answer={answer}
          onChange={setAnswer}
          disabled={busy || !play.timerRunning}
        />

        {exercise.assessmentMode === "teacher" && (
          <p className="mt-3 text-sm text-brand-muted">
            Questo esercizio lo corregge la docente: dopo la consegna l&apos;esito arriva più avanti.
            Finché non l&apos;ha corretto puoi annullare l&apos;invio.
          </p>
        )}

        {syncProblem && (
          <p role="status" className="mt-3 text-sm font-semibold text-brand-coral">
            Il collegamento si è interrotto: la risposta non è salvata. Se non torna entro poco, la
            missione va in pausa da sola e non perdi vite.
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {hintAvailable ? (
            <HintButton
              missionAttemptId={missionAttemptId}
              missionExerciseId={play.missionExerciseId}
              onHintUsed={onHintUsed}
            />
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={busy || !complete || !play.timerRunning}
            className="flex items-center gap-1.5 rounded-pill bg-brand-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-primary-hover disabled:opacity-60"
          >
            <PaperAirplaneIcon aria-hidden="true" className="h-4 w-4" />
            Consegna
          </button>
        </div>
      </form>
    </article>
  );
}

/* ------------------------------------ Risposta ------------------------------------ */

export function AnswerField({
  kind,
  options,
  answer,
  onChange,
  disabled,
}: {
  kind: MissionExercisePlay["exercise"]["kind"];
  options: { answerId: number; text: string }[];
  answer: Answer;
  onChange: (answer: Answer) => void;
  disabled: boolean;
}) {
  const fieldClass =
    "w-full rounded-md border border-border bg-background px-4 py-3 text-lg leading-8 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 disabled:opacity-70";

  if (kind === "multiple_choice") {
    return (
      <fieldset disabled={disabled} className="space-y-2">
        <legend className="sr-only">Scegli la risposta</legend>
        {options.map((option) => {
          const checked = answer.selectedAnswerId === option.answerId;
          return (
            <label
              key={option.answerId}
              className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-lg transition ${
                checked ? "border-brand-primary bg-surface-blue" : "border-border hover:bg-surface-blue"
              }`}
            >
              <input
                type="radio"
                name="answer"
                className="h-4 w-4 accent-brand-primary"
                checked={checked}
                onChange={() => onChange({ selectedAnswerId: option.answerId, text: null })}
              />
              {option.text}
            </label>
          );
        })}
      </fieldset>
    );
  }

  const label = kind === "fill_in" ? "La tua risposta" : "La tua traduzione";
  const rows = kind === "passage_translation" ? 10 : kind === "sentence_translation" ? 3 : 1;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brand-muted">{label}</span>
      {rows === 1 ? (
        <input
          type="text"
          className={fieldClass}
          value={answer.text ?? ""}
          onChange={(e) => onChange({ selectedAnswerId: null, text: e.target.value })}
          disabled={disabled}
          maxLength={20000}
          autoComplete="off"
          spellCheck={false}
        />
      ) : (
        <textarea
          className={fieldClass}
          rows={rows}
          value={answer.text ?? ""}
          onChange={(e) => onChange({ selectedAnswerId: null, text: e.target.value })}
          disabled={disabled}
          maxLength={20000}
          spellCheck={false}
        />
      )}
    </label>
  );
}

/* ------------------------------------ Tempo ------------------------------------ */

/** Conto alla rovescia a partire dal tempo deciso dal server; chiama onExpire una volta a zero */
function useCountdown(remainingMs: number, running: boolean, onExpire: () => void): number {
  const [left, setLeft] = useState(remainingMs);
  const expire = useRef(onExpire);
  useEffect(() => {
    expire.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!running) return;
    const deadline = Date.now() + remainingMs;
    const id = setInterval(() => {
      const ms = Math.max(0, deadline - Date.now());
      setLeft(ms);
      if (ms === 0) {
        clearInterval(id);
        expire.current();
      }
    }, 250);
    return () => clearInterval(id);
  }, [remainingMs, running]);

  return running ? Math.min(left, remainingMs) : remainingMs;
}

function Countdown({
  remainingMs,
  allowedMs,
  running,
}: {
  remainingMs: number;
  allowedMs: number;
  running: boolean;
}) {
  const seconds = Math.ceil(remainingMs / 1000);
  const text = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const low = running && remainingMs <= Math.min(60_000, allowedMs / 5);

  return (
    <div
      className={`flex items-center gap-1.5 rounded-pill px-3 py-1.5 font-mono text-lg font-bold tabular-nums ${
        low ? "bg-brand-coral/15 text-brand-coral" : "bg-surface-blue text-foreground"
      }`}
      title={running ? "Tempo rimasto" : "Tempo fermo"}
    >
      <ClockIcon aria-hidden="true" className="h-5 w-5" />
      <span className="sr-only">Tempo rimasto:</span>
      {text}
    </div>
  );
}

/* ------------------------------------ Aiuto del cappello ------------------------------------ */

/**
 * Aiuto del cappello (Blueprint Gamification §6.2): l'argomento dell'esercizio e l'"In breve" della
 * Risorsa collegata, mai la risposta. Consuma una carica; riaprirlo nello stesso tentativo no.
 */
function HintButton({
  missionAttemptId,
  missionExerciseId,
  onHintUsed,
}: {
  missionAttemptId: number;
  missionExerciseId: number;
  onHintUsed: (hint: Hint) => void;
}) {
  const [hint, setHint] = useState<Hint | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    setError(null);
    try {
      const result = await openHint(missionAttemptId, missionExerciseId);
      setHint(result);
      onHintUsed(result);
    } catch (e) {
      setError(errorMessage(e, "L'aiuto non è disponibile in questo momento."));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="max-w-md">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="flex items-center gap-1.5 rounded-pill border border-border px-4 py-2 text-sm font-semibold transition hover:bg-surface-blue disabled:opacity-60"
      >
        <span aria-hidden="true">📜</span>
        {hint ? "Rileggi l'aiuto" : "Chiedi un aiuto"}
      </button>

      {error && <p className="mt-2 text-sm text-brand-coral">{error}</p>}

      {hint && (
        <div role="status" className="mt-3 rounded-md bg-surface-blue p-4 text-base leading-7">
          {hint.topicName && (
            <p className="font-bold">Argomento: {hint.topicName}</p>
          )}
          {hint.summaryText && <p className="mt-1">{hint.summaryText}</p>}
          {hint.summaryExample && (
            <p className="mt-2 font-semibold">
              {hint.summaryExample.term} → {hint.summaryExample.translation}
            </p>
          )}
          {!hint.topicName && !hint.summaryText && (
            <p>Per questo esercizio non c&apos;è ancora un aiuto.</p>
          )}
        </div>
      )}
    </div>
  );
}

/*
 * TODO (domanda per Giulia): allo scadere del tempo oggi il tentativo risulta fallito (tempo finito),
 * come dice il blueprint. In alternativa si potrebbe consegnare in automatico la risposta scritta fin lì.
 */
