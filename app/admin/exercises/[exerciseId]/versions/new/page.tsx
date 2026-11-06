import VersionEditor from "@/components/admin/VersionEditor";
import { Card, PageHeader } from "@/components/admin/ui";
import { getExercise, getVersion, getVersions, parseId } from "@/lib/admin-server";

// Nuova versione precompilata dall'ultima esistente: si corregge senza riscrivere tutto
export default async function AdminNewVersionPage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const exerciseId = parseId((await params).exerciseId);
  const [exercise, versions] = await Promise.all([getExercise(exerciseId), getVersions(exerciseId)]);
  const latest = versions.at(-1);
  const initial = latest ? await getVersion(latest.questionVersionId) : null;

  return (
    <div>
      <PageHeader title={`Nuova versione · ${exercise.internalTitle}`} backHref={`/admin/exercises/${exerciseId}`}
                  backLabel={exercise.internalTitle} />
      <Card>
        {latest && <p className="mb-4 text-sm text-brand-muted">Precompilata dalla v{latest.versionNumber}.</p>}
        <VersionEditor exerciseId={exerciseId} initial={initial} />
      </Card>
    </div>
  );
}
