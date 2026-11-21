import AssessmentForm from "@/components/admin/AssessmentForm";
import { Card, EmptyNote, formatDateTime, PageHeader } from "@/components/admin/ui";
import { serverApi } from "@/lib/api-server";
import { parseId } from "@/lib/admin-server";
import { getSubmission, KIND_LABELS, RUBRIC_LABELS, submissionsHref } from "@/lib/submissions";

/**
 * Una consegna: esercizio come l'ha visto lo studente, la sua risposta, soluzioni e spiegazione dell'autrice,
 * rubriche come guida (nessun punteggio per criterio). Percentuale 0-100 e commento obbligatorio.
 */
export default async function AdminSubmissionPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const id = parseId((await params).attemptId);
  const submission = await getSubmission(serverApi, id);

  if (!submission) {
    return (
      <div>
        <PageHeader title="Consegna annullata" backHref={submissionsHref()} backLabel="Consegne da correggere" />
        <Card>
          <EmptyNote>
            Lo studente ha annullato l&apos;invio per modificare la risposta. Quando la consegnerà di nuovo la
            ritrovi nell&apos;elenco.
          </EmptyNote>
        </Card>
      </div>
    );
  }

  const { exercise } = submission;
  const chosenOption =
    exercise.kind === "multiple_choice" ? exercise.options?.find((o) => String(o.answerId) === submission.answer) : null;

  return (
    <div className="max-w-4xl">
      <PageHeader title={submission.exerciseTitle} backHref={submissionsHref()} backLabel="Consegne da correggere" />

      <p className="mb-4 text-sm text-brand-muted">
        {submission.studentUsername} · {submission.subjectName} · {submission.place}
        {submission.missionAttemptNumber && ` · tentativo ${submission.missionAttemptNumber}`} ·{" "}
        {KIND_LABELS[exercise.kind]} · consegnata {formatDateTime(submission.submittedAt)}
      </p>

      <Card title="Esercizio">
        <p className="text-sm text-brand-muted">Titolo per lo studente: {exercise.title}</p>
        <p className="mt-2 whitespace-pre-line">{exercise.prompt}</p>
        {exercise.sourceText && (
          <blockquote className="mt-3 whitespace-pre-line border-l-4 border-brand-primary bg-surface-blue px-3 py-2">
            {exercise.sourceText}
          </blockquote>
        )}
      </Card>

      <Card title="Risposta dello studente">
        {submission.answer ? (
          <p className="whitespace-pre-line rounded bg-surface-blue px-3 py-2">
            {chosenOption ? chosenOption.text : submission.answer}
          </p>
        ) : (
          <EmptyNote>Nessuna risposta.</EmptyNote>
        )}
      </Card>

      <Card title="Per la correzione">
        {submission.referenceAnswers.length > 0 && (
          <div className="mb-3">
            <h3 className="text-sm font-semibold">
              {submission.referenceAnswers.length > 1 ? "Soluzioni" : "Soluzione"}
            </h3>
            <ul className="mt-1 list-inside list-disc text-sm">
              {submission.referenceAnswers.map((text) => (
                <li key={text} className="whitespace-pre-line">{text}</li>
              ))}
            </ul>
          </div>
        )}
        {submission.generalExplanation && (
          <div className="mb-3">
            <h3 className="text-sm font-semibold">Spiegazione</h3>
            <p className="mt-1 whitespace-pre-line text-sm">{submission.generalExplanation}</p>
          </div>
        )}
        {submission.rubric.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold">Rubriche (solo come guida)</h3>
            <ul className="mt-1 space-y-1 text-sm">
              {submission.rubric.map((r, i) => (
                <li key={i}>
                  <span className="font-medium">{RUBRIC_LABELS[r.category]}:</span> {r.description}
                </li>
              ))}
            </ul>
          </div>
        )}
        {submission.referenceAnswers.length === 0 && !submission.generalExplanation && submission.rubric.length === 0 && (
          <EmptyNote>L&apos;esercizio non ha soluzioni, spiegazione o rubriche.</EmptyNote>
        )}
      </Card>

      <Card title="Correzione">
        {submission.assessment ? (
          <div className="text-sm">
            <p>
              <strong>{Math.round(Number(submission.assessment.percentage))}%</strong> ·{" "}
              {submission.assessment.passed ? "superato" : "non superato"} · corretta il{" "}
              {formatDateTime(submission.assessment.assessedAt)}
            </p>
            <p className="mt-2 whitespace-pre-line">{submission.assessment.feedback}</p>
            <p className="mt-2 text-brand-muted">La correzione è definitiva.</p>
          </div>
        ) : (
          <AssessmentForm
            exerciseAttemptId={submission.exerciseAttemptId}
            passingThreshold={Number(submission.passingThreshold)}
          />
        )}
      </Card>
    </div>
  );
}
