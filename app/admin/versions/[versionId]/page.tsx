import Link from "next/link";
import VersionEditor from "@/components/admin/VersionEditor";
import VersionActions from "@/components/admin/VersionActions";
import { buttonClass, Card, PageHeader } from "@/components/admin/ui";
import { getExercise, getVersion, parseId } from "@/lib/admin-server";

export default async function AdminVersionPage({ params }: { params: Promise<{ versionId: string }> }) {
  const versionId = parseId((await params).versionId);
  const version = await getVersion(versionId);
  const exercise = await getExercise(version.questionBankEntryId);
  // Mai pubblicata = bozza modificabile. Se è già stata svolta lo dirà il backend (409) al salvataggio
  const isDraft = !version.published && version.publishedAt === null;

  return (
    <div>
      <PageHeader title={`v${version.versionNumber} · ${exercise.internalTitle}`}
                  backHref={`/admin/exercises/${exercise.questionBankEntryId}`} backLabel={exercise.internalTitle}>
        <VersionActions version={version} afterDeleteHref={`/admin/exercises/${exercise.questionBankEntryId}`} />
      </PageHeader>
      <Card>
        {!isDraft && (
          <p className="mb-4 text-sm text-brand-muted">
            Versione {version.published ? "pubblicata" : "sostituita"}: non si modifica.{" "}
            <Link href={`/admin/exercises/${exercise.questionBankEntryId}/versions/new`} className={buttonClass.secondary}>
              Crea una nuova versione
            </Link>
          </p>
        )}
        <VersionEditor exerciseId={exercise.questionBankEntryId} versionId={versionId} initial={version} readOnly={!isDraft} />
      </Card>
    </div>
  );
}
