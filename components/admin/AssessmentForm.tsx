"use client";

import { useState } from "react";
import Link from "next/link";
import { adminErrorMessage } from "@/lib/admin";
import { assessSubmission, submissionsHref } from "@/lib/submissions";
import { buttonClass, Field, inputClass, Notice } from "@/components/admin/ui";
import type { SubmissionAssessed } from "@/types/submissions";

/**
 * Correzione di una consegna: percentuale da 0 a 100 e commento per lo studente (obbligatorio).
 * Il giudizio è definitivo: si chiede conferma e poi si mostra che cosa succede allo studente.
 */
export default function AssessmentForm({
  exerciseAttemptId,
  passingThreshold,
}: {
  exerciseAttemptId: number;
  passingThreshold: number;
}) {
  const [percentage, setPercentage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SubmissionAssessed | null>(null);

  const value = Number(percentage.replace(",", "."));
  const valid = percentage.trim() !== "" && Number.isFinite(value) && value >= 0 && value <= 100;
  const passes = valid && value >= passingThreshold;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!valid || !feedback.trim()) return;
    const outcome = passes ? "superato" : "NON superato";
    if (!window.confirm(`Salvare ${value}% (${outcome})? La correzione è definitiva e lo studente la vedrà.`)) return;

    setPending(true);
    setError(null);
    try {
      setSaved(await assessSubmission(exerciseAttemptId, { percentage: value, feedback: feedback.trim() }));
    } catch (e) {
      setError(adminErrorMessage(e));
    } finally {
      setPending(false);
    }
  }

  if (saved) {
    return (
      <div className="text-sm">
        <Notice tone="success">
          Correzione salvata: {Math.round(Number(saved.percentage))}% ({saved.passed ? "superato" : "non superato"}).
        </Notice>
        <p className="mt-2">{saved.effect}</p>
        <Link href={submissionsHref()} className={`${buttonClass.primary} mt-4 inline-block`}>
          Torna alle consegne
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-40">
          <Field label="Percentuale" hint="Da 0 a 100">
            <input
              className={inputClass}
              inputMode="decimal"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              required
              aria-invalid={percentage !== "" && !valid}
            />
          </Field>
        </div>
        {valid && (
          <p className={`pb-1 text-sm font-medium ${passes ? "text-brand-success" : "text-brand-coral"}`}>
            {passes ? "Superato" : "Non superato"} (soglia {passingThreshold}%)
          </p>
        )}
      </div>

      <Field label="Commento per lo studente" hint="Lo legge insieme al risultato. Obbligatorio.">
        <textarea
          className={inputClass}
          rows={6}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          maxLength={5000}
        />
      </Field>

      <button type="submit" className={buttonClass.primary} disabled={pending || !valid || !feedback.trim()}>
        {pending ? "Salvo…" : "Salva correzione"}
      </button>
      {error && <Notice tone="error">{error}</Notice>}
    </form>
  );
}
