"use client";

import { useState } from "react";
import { createVersion, updateVersion } from "@/lib/admin";
import type {
  AssessmentMode,
  QuestionKind,
  QuestionVersion,
  QuestionVersionInput,
  RubricCategory,
} from "@/types/admin";
import { buttonClass, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Editor di una versione: i campi seguono il tipo di domanda (blueprint §6.2).
   - scelta multipla: almeno 2 opzioni, una sola corretta; valutazione automatica
   - completamento: risposte accettate, tutte corrette; valutazione automatica
   - traduzione di frase: testo originale e spiegazione; automatica (con traduzioni accettate) o docente
   - traduzione di versione: testo originale e spiegazione; docente; rubriche facoltative
   Le regole complete le verifica il backend: i suoi messaggi compaiono sotto il form */

const KIND_LABELS: Record<QuestionKind, string> = {
  multiple_choice: "Scelta multipla",
  fill_in: "Completamento",
  sentence_translation: "Traduzione di frase",
  passage_translation: "Traduzione di versione",
};

type AnswerRow = { text: string; correct: boolean; feedback: string };
type RubricRow = { category: RubricCategory; description: string };

const isTranslation = (kind: QuestionKind) => kind === "sentence_translation" || kind === "passage_translation";

export default function VersionEditor({
  exerciseId,
  versionId,
  initial,
  readOnly = false,
}: {
  exerciseId: number;
  /** Assente = nuova versione (initial, se c'è, è l'ultima versione da cui partire) */
  versionId?: number;
  initial: QuestionVersion | null;
  readOnly?: boolean;
}) {
  const { run, pending, error } = useAdminMutation();
  const [kind, setKind] = useState<QuestionKind>(initial?.kind ?? "multiple_choice");
  const [prompt, setPrompt] = useState(initial?.prompt ?? "");
  const [sourceText, setSourceText] = useState(initial?.sourceText ?? "");
  const [explanation, setExplanation] = useState(initial?.generalExplanation ?? "");
  const [assessmentMode, setAssessmentMode] = useState<AssessmentMode>(
    initial?.kind === "sentence_translation" ? initial.assessmentMode : "teacher",
  );
  const [answers, setAnswers] = useState<AnswerRow[]>(
    initial?.answers.length
      ? initial.answers.map((a) => ({ text: a.text, correct: a.correct, feedback: a.feedback ?? "" }))
      : [{ text: "", correct: true, feedback: "" }, { text: "", correct: false, feedback: "" }],
  );
  const [rubrics, setRubrics] = useState<RubricRow[]>(
    initial?.rubricCriteria.map((c) => ({ category: c.category, description: c.description })) ?? [],
  );
  const [saved, setSaved] = useState(false);

  const multipleChoice = kind === "multiple_choice";
  const answersLabel = multipleChoice ? "Opzioni" : isTranslation(kind) ? "Traduzioni accettate / soluzioni di riferimento" : "Risposte accettate";

  function updateAnswer(index: number, change: Partial<AnswerRow>) {
    setAnswers((current) => current.map((a, i) => (i === index ? { ...a, ...change } : a)));
  }

  // Scelta multipla: una sola corretta, come un radio
  function markCorrect(index: number) {
    setAnswers((current) => current.map((a, i) => ({ ...a, correct: i === index })));
  }

  function toInput(): QuestionVersionInput {
    const filled = answers.filter((a) => a.text.trim() !== "");
    return {
      kind,
      prompt,
      sourceText: isTranslation(kind) ? sourceText : null,
      generalExplanation: explanation || null,
      // Per gli altri tipi la modalità è fissa e il backend la ricava
      assessmentMode: kind === "sentence_translation" ? assessmentMode : null,
      answers: filled.map((a) => ({
        text: a.text,
        correct: multipleChoice ? a.correct : true,
        feedback: a.feedback || null,
      })),
      rubricCriteria: kind === "passage_translation" ? rubrics.filter((r) => r.description.trim() !== "") : [],
    };
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    if (versionId !== undefined) {
      setSaved(await run(() => updateVersion(versionId, toInput())));
    } else {
      await run(() => createVersion(exerciseId, toInput()), { redirectTo: `/admin/exercises/${exerciseId}` });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset disabled={readOnly || pending} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Tipo di domanda">
            <select className={inputClass} value={kind} onChange={(e) => setKind(e.target.value as QuestionKind)}>
              {Object.entries(KIND_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="Valutazione">
            {kind === "sentence_translation" ? (
              <select className={inputClass} value={assessmentMode} onChange={(e) => setAssessmentMode(e.target.value as AssessmentMode)}>
                <option value="teacher">Docente (traduzione libera)</option>
                <option value="automatic">Automatica (traduzioni accettate)</option>
              </select>
            ) : (
              <p className="py-1 text-sm text-brand-muted">
                {kind === "passage_translation" ? "Docente" : "Automatica"} (fissa per questo tipo)
              </p>
            )}
          </Field>
        </div>

        <Field label="Consegna">
          <textarea className={inputClass} rows={2} value={prompt} onChange={(e) => setPrompt(e.target.value)} required />
        </Field>
        {isTranslation(kind) && (
          <Field label="Testo originale">
            <textarea className={inputClass} rows={4} value={sourceText} onChange={(e) => setSourceText(e.target.value)} required />
          </Field>
        )}
        <Field label="Spiegazione" hint={isTranslation(kind) ? "Obbligatoria per le traduzioni" : "Facoltativa"}>
          <textarea className={inputClass} rows={3} value={explanation} onChange={(e) => setExplanation(e.target.value)}
                    required={isTranslation(kind)} />
        </Field>

        <div>
          <h3 className="mb-2 text-sm font-semibold">{answersLabel}</h3>
          <ul className="space-y-2">
            {answers.map((answer, index) => (
              <li key={index} className="flex flex-wrap items-center gap-2">
                <input className={`${inputClass} max-w-md`} value={answer.text} placeholder={`Risposta ${index + 1}`}
                       onChange={(e) => updateAnswer(index, { text: e.target.value })} aria-label={`Risposta ${index + 1}`} />
                {multipleChoice && (
                  <label className={`flex items-center gap-1 text-sm ${answer.correct ? "font-semibold text-brand-success" : ""}`}>
                    <input type="radio" name="correct" checked={answer.correct} onChange={() => markCorrect(index)} />
                    {answer.correct ? "Risposta corretta" : "Contrassegna come corretta"}
                  </label>
                )}
                <input className={`${inputClass} max-w-sm`} value={answer.feedback} placeholder="Feedback (facoltativo)"
                       onChange={(e) => updateAnswer(index, { feedback: e.target.value })} aria-label={`Feedback ${index + 1}`} />
                <button type="button" className={buttonClass.secondary}
                        onClick={() => setAnswers((current) => current.filter((_, i) => i !== index))}>Rimuovi</button>
              </li>
            ))}
          </ul>
          <button type="button" className={`${buttonClass.secondary} mt-2`}
                  onClick={() => setAnswers((current) => [...current, { text: "", correct: false, feedback: "" }])}>
            Aggiungi risposta
          </button>
          <p className="mt-1 text-xs text-brand-muted">
            {multipleChoice
              ? "Una sola opzione può essere la risposta corretta: le altre sono le alternative sbagliate."
              : "Ogni risposta inserita è considerata corretta (servono a riconoscere le varianti accettabili)."}
          </p>
        </div>

        {kind === "passage_translation" && (
          <div>
            <h3 className="mb-2 text-sm font-semibold">Rubriche per la docente</h3>
            <ul className="space-y-2">
              {rubrics.map((rubric, index) => (
                <li key={index} className="flex flex-wrap items-center gap-2">
                  <select className={`${inputClass} max-w-xs`} value={rubric.category} aria-label="Categoria"
                          onChange={(e) => setRubrics((current) => current.map((r, i) => (i === index ? { ...r, category: e.target.value as RubricCategory } : r)))}>
                    <option value="structural">Errore strutturale grave</option>
                    <option value="lexical">Scelta lessicale contestuale</option>
                  </select>
                  <input className={`${inputClass} max-w-md`} value={rubric.description} placeholder="Descrizione del criterio"
                         aria-label="Descrizione del criterio"
                         onChange={(e) => setRubrics((current) => current.map((r, i) => (i === index ? { ...r, description: e.target.value } : r)))} />
                  <button type="button" className={buttonClass.secondary}
                          onClick={() => setRubrics((current) => current.filter((_, i) => i !== index))}>Rimuovi</button>
                </li>
              ))}
            </ul>
            <button type="button" className={`${buttonClass.secondary} mt-2`}
                    onClick={() => setRubrics((current) => [...current, { category: "structural", description: "" }])}>
              Aggiungi criterio
            </button>
          </div>
        )}
      </fieldset>

      {!readOnly && (
        <div>
          <button type="submit" className={buttonClass.primary} disabled={pending}>
            {versionId !== undefined ? "Salva bozza" : "Crea versione"}
          </button>
          {saved && <Notice tone="success">Salvato.</Notice>}
          {error && <Notice tone="error">{error}</Notice>}
        </div>
      )}
    </form>
  );
}
