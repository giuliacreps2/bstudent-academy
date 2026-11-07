import Link from "next/link";
import ExerciseTitleForm from "@/components/admin/ExerciseTitleForm";
import StatusActions from "@/components/admin/StatusActions";
import VersionActions from "@/components/admin/VersionActions";
import { buttonClass, Card, DatesLine, EmptyNote, PageHeader, StatusBadge, versionPeriod } from "@/components/admin/ui";
import { getExercise, getExerciseUsages, getVersions, parseId } from "@/lib/admin-server";
import type { ExerciseUsages } from "@/types/admin";

export default async function AdminExercisePage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const exerciseId = parseId((await params).exerciseId);
  const [exercise, versions, usages] = await Promise.all([
    getExercise(exerciseId),
    getVersions(exerciseId),
    getExerciseUsages(exerciseId),
  ]);

  return (
    <div>
      <PageHeader title={exercise.internalTitle} backHref="/admin/exercises" backLabel="Esercizi">
        <StatusBadge status={exercise.status} />
      </PageHeader>

      <Card title="Stato">
        <DatesLine createdAt={exercise.createdAt} updatedAt={exercise.updatedAt} publishedAt={exercise.publishedAt} />
        <p className="mb-3 text-sm text-brand-muted">
          Per pubblicare serve una versione pubblicata.
        </p>
        <StatusActions target="exercise" id={exercise.questionBankEntryId} status={exercise.status}
                       everPublished={exercise.publishedAt !== null} afterDeleteHref="/admin/exercises"
                       withdrawConfirm={withdrawConfirm(usages)} />
      </Card>

      <Card title="Dove è usato">
        <Usages usages={usages} />
      </Card>

      <Card title="Versioni">
        <p className="mb-3 text-sm text-brand-muted">
          Una versione pubblicata o già svolta non si modifica: per correggere si crea una nuova versione,
          precompilata dall&apos;ultima. Gli studenti svolgono solo la versione pubblicata.
        </p>
        {versions.length === 0 ? (
          <EmptyNote>Nessuna versione.</EmptyNote>
        ) : (
          <ul className="divide-y divide-border">
            {versions.map((v) => (
              <li key={v.questionVersionId} className="flex flex-wrap items-center gap-3 py-2">
                <span className="font-medium">v{v.versionNumber}</span>
                <span className="text-sm text-brand-muted">{versionPeriod(v)}</span>
                <span className="flex-1" />
                <VersionActions version={v} />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <Link href={`/admin/exercises/${exercise.questionBankEntryId}/versions/new`} className={buttonClass.primary}>
            Nuova versione
          </Link>
        </div>
      </Card>

      <Card title="Titolo interno">
        <ExerciseTitleForm exerciseId={exercise.questionBankEntryId} initialTitle={exercise.internalTitle} />
      </Card>
    </div>
  );
}

/** Ritiro sempre permesso: la conferma elenca dove sparisce l'esercizio e avvisa per le missioni senza esercizi */
function withdrawConfirm(usages: ExerciseUsages): string {
  const lines = ["Ritirare l'esercizio? Gli studenti non lo vedranno più."];
  const published = usages.missions.filter((m) => m.missionStatus === "published");
  if (published.length > 0) {
    lines.push("", "Sparisce da queste missioni pubblicate:");
    for (const m of published) {
      lines.push(`- ${m.courseTitle} › ${m.missionTitle}${m.leftWithoutExercises ? " — ATTENZIONE: resterà senza esercizi" : ""}`);
    }
  }
  if (usages.publishedInPractice) lines.push("", "Sparisce anche dalla Palestra.");
  return lines.join("\n");
}

function Usages({ usages }: { usages: ExerciseUsages }) {
  if (usages.missions.length === 0 && !usages.publishedInPractice) {
    return <EmptyNote>Non è usato in nessuna missione né in Palestra.</EmptyNote>;
  }
  return (
    <div className="text-sm">
      {usages.missions.length > 0 && (
        <ul className="divide-y divide-border">
          {usages.missions.map((m) => (
            <li key={m.missionId} className="flex flex-wrap items-center gap-2 py-2">
              <span className="text-brand-muted">{m.courseTitle} ›</span>
              <Link href={`/admin/missions/${m.missionId}`} className="font-medium hover:underline">{m.missionTitle}</Link>
              <StatusBadge status={m.missionStatus} />
              {m.leftWithoutExercises && (
                <span className="text-brand-coral">senza questo esercizio la missione resterebbe senza esercizi</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {usages.publishedInPractice && <p className="mt-2">Pubblicato in Palestra.</p>}
      <p className="mt-2 text-brand-muted">Se lo ritiri, sparisce da tutti questi posti.</p>
    </div>
  );
}
