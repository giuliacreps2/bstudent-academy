"use client";

import { useEffect, useRef, useState } from "react";
import { ApiError } from "@/lib/api";
import { saveLessonNote } from "@/lib/notebook-api";
import type { LessonNote } from "@/types/notebookData";

/** Pausa di scrittura dopo cui la nota si salva da sola */
const AUTOSAVE_AFTER_MS = 1_200;

type SaveState = "idle" | "saving" | "saved" | "error" | "conflict";

/**
 * Nota personale della lezione (blueprint §14): un solo riquadro, salvataggio automatico, versione per non
 * sovrascrivere quello scritto in un'altra scheda. Svuotarla la cancella.
 */
export function LessonNoteEditor({ lessonId, initial }: { lessonId: number; initial: LessonNote | null }) {
  const [text, setText] = useState(initial?.text ?? "");
  const [state, setState] = useState<SaveState>("idle");
  const [savedAt, setSavedAt] = useState<string | null>(initial?.updatedAt ?? null);
  const version = useRef<number | null>(initial?.version ?? null);
  const lastSaved = useRef(initial?.text ?? "");

  useEffect(() => {
    if (text === lastSaved.current || state === "conflict") return;
    const timer = setTimeout(async () => {
      setState("saving");
      try {
        const note = await saveLessonNote(lessonId, text, version.current);
        version.current = note?.version ?? null;
        lastSaved.current = text;
        setSavedAt(note?.updatedAt ?? new Date().toISOString());
        setState("saved");
      } catch (e) {
        setState(e instanceof ApiError && e.status === 409 ? "conflict" : "error");
      }
    }, AUTOSAVE_AFTER_MS);
    return () => clearTimeout(timer);
  }, [text, lessonId, state]);

  const status =
    state === "saving"
      ? "Salvataggio…"
      : state === "conflict"
        ? null
        : state === "error"
          ? "Non salvata: controlla la connessione, riproviamo appena scrivi."
          : savedAt && text
            ? `Salvata alle ${new Date(savedAt).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}`
            : text
              ? ""
              : "Scrivi qui i tuoi appunti: si salvano da soli.";

  return (
    <section aria-labelledby="lesson-note" className="card-notebook-page p-4 sm:p-6">
      <h2 id="lesson-note" className="text-lg font-extrabold text-foreground">
        La mia nota
      </h2>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (state === "error") setState("idle");
        }}
        rows={8}
        maxLength={20000}
        disabled={state === "conflict"}
        aria-describedby="lesson-note-status"
        className="mt-3 w-full resize-y rounded-md border border-border bg-transparent px-3 py-2 text-base leading-7 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
        placeholder="Che cosa vuoi ricordare di questa lezione?"
      />
      <p id="lesson-note-status" role="status" className="mt-2 text-sm text-brand-muted">
        {status}
      </p>
      {state === "conflict" && (
        <p role="alert" className="mt-2 text-sm font-semibold text-brand-coral">
          Hai modificato questa nota in un&apos;altra scheda.{" "}
          <button type="button" onClick={() => window.location.reload()} className="underline">
            Ricarica la pagina
          </button>{" "}
          per vedere l&apos;ultima versione.
        </p>
      )}
    </section>
  );
}
