import Link from "next/link";
import ExerciseTitleForm from "@/components/admin/ExerciseTitleForm";
import StatusActions from "@/components/admin/StatusActions";
import VersionActions from "@/components/admin/VersionActions";
import { buttonClass, Card, DatesLine, EmptyNote, PageHeader, StatusBadge, versionPeriod } from "@/components/admin/ui";
import { getExercise, getVersions, parseId } from "@/lib/admin-server";

export default async function AdminExercisePage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const exerciseId = parseId((await params).exerciseId);
  const [exercise, versions] = await Promise.all([getExercise(exerciseId), getVersions(exerciseId)]);

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
                       everPublished={exercise.publishedAt !== null} afterDeleteHref="/admin/exercises" />
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
