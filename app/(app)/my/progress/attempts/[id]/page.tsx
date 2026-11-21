import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resourceHref } from "@/constants/resources";
import { getAttemptDetail } from "@/lib/progress-server";
import { formatDate, formatGrade, formatNumber, PROGRESS_PATH } from "@/lib/progress";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";

export const metadata: Metadata = { title: "Tentativo | I miei progressi | BStudent" };

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Dettaglio di un tentativo (blueprint §10.5): la risposta data, l'esito con il feedback (anche della docente)
 * e "rileggi la teoria". La soluzione segue le regole dello svolgimento: mai dopo un errore in missione.
 */
export default async function AttemptDetailPage({ params }: PageProps) {
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const detail = await getAttemptDetail(id);
  if (!detail) notFound();
  const { attempt, exercise, answer, outcome } = detail;
  const review =
    outcome && !outcome.passed && outcome.reviewSubjectSlug && outcome.reviewResourceSlug
      ? resourceHref(outcome.reviewSubjectSlug, outcome.reviewResourceSlug)
      : null;

  return (
    <div className="reading-area mx-auto max-w-3xl space-y-6">
      <MissionBreadcrumb
        items={[
          { label: "I miei progressi", href: `${PROGRESS_PATH}#storico` },
          { label: attempt.title },
        ]}
      />

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          {attempt.place} · {formatDate(attempt.date)}
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">{exercise.title}</h1>
      </header>

      <section className="rounded-lg border border-border bg-surface p-5">
        <p className="whitespace-pre-line text-lg leading-8">{exercise.prompt}</p>
        {exercise.sourceText && (
          <blockquote className="mt-4 whitespace-pre-line rounded-md border-l-4 border-brand-primary bg-surface-blue px-4 py-3 text-lg leading-8">
            {exercise.sourceText}
          </blockquote>
        )}
        <h2 className="mt-5 text-sm font-bold text-brand-muted">La tua risposta</h2>
        <p className="mt-1 whitespace-pre-line rounded-md bg-background px-4 py-3 text-base leading-7">
          {answer || <span className="text-brand-muted">Nessuna risposta</span>}
        </p>
      </section>

      {attempt.status === "pending_review" && (
        <p className="rounded-lg border border-border bg-surface p-5 text-brand-muted">
          ⏳ In correzione: l&apos;esito della docente arriverà qui.
        </p>
      )}

      {attempt.status === "expired" && (
        <p className="rounded-lg border border-border bg-surface p-5 text-brand-muted">
          ⏱️ Il tempo è finito prima della consegna.
        </p>
      )}

      {outcome && (
        <section
          className={`rounded-lg border p-5 ${
            outcome.passed ? "border-brand-success/40 bg-brand-success/5" : "border-brand-coral/40 bg-brand-coral/5"
          }`}
        >
          <p className="text-xl font-extrabold">
            {outcome.passed ? "Superato" : "Non superato"} · voto {formatGrade(attempt.grade)}
            <span className="ml-2 text-sm font-semibold text-brand-muted">
              ({formatNumber(outcome.percentage, 0)}%, serve almeno {formatNumber(outcome.passingThreshold, 0)}%)
            </span>
          </p>

          {outcome.feedback && (
            <div className="mt-4">
              <h2 className="text-sm font-bold">{attempt.teacher ? "Il commento della docente" : "Feedback"}</h2>
              <p className="mt-1 whitespace-pre-line rounded-md bg-surface px-4 py-3">{outcome.feedback}</p>
            </div>
          )}

          {outcome.correctAnswers.length > 0 && (
            <div className="mt-4">
              <h2 className="text-sm font-bold">
                {outcome.correctAnswers.length > 1 ? "Risposte giuste" : "Risposta giusta"}
              </h2>
              <ul className="mt-1 list-inside list-disc">
                {outcome.correctAnswers.map((text) => (
                  <li key={text} className="whitespace-pre-line">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {outcome.generalExplanation && (
            <p className="mt-4 whitespace-pre-line">{outcome.generalExplanation}</p>
          )}

          {!outcome.passed && outcome.reviewTopicName && (
            <p className="mt-4">
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
        </section>
      )}
    </div>
  );
}
