import Link from "next/link";
import ExerciseTitleForm from "@/components/admin/ExerciseTitleForm";
import {
  Card,
  EmptyNote,
  formatDate,
  formatDateTime,
  PageHeader,
  Pagination,
  sinceDays,
  StatusBadge,
} from "@/components/admin/ui";
import { getExercises, parsePage } from "@/lib/admin-server";

export default async function AdminExercisesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parsePage((await searchParams).page);
  const exercises = await getExercises(page);

  return (
    <div>
      <PageHeader title="Esercizi" backHref="/admin" backLabel="Area Admin" />
      <Card title="Nuovo esercizio">
        <p className="mb-3 text-sm text-brand-muted">
          L&apos;esercizio nasce senza contenuto: domanda e risposte si scrivono nelle versioni.
        </p>
        <ExerciseTitleForm />
      </Card>
      <Card title="Esercizi">
        {exercises.content.length === 0 ? (
          <EmptyNote>Nessun esercizio.</EmptyNote>
        ) : (
          <ul className="divide-y divide-border">
            {exercises.content.map((e) => (
              <li key={e.questionBankEntryId} className="flex items-center gap-3 py-2">
                <div className="flex-1">
                  <Link href={`/admin/exercises/${e.questionBankEntryId}`} className="font-medium hover:underline">
                    {e.internalTitle}
                  </Link>
                  <p className="text-xs text-brand-muted">
                    Prima versione: {e.firstVersionAt ? formatDate(e.firstVersionAt) : "nessuna"} ·
                    Ultima modifica {formatDateTime(e.updatedAt)} ·
                    {e.publishedVersionNumber !== null && e.publishedVersionSince
                      ? ` In uso: v${e.publishedVersionNumber} ${sinceDays(e.publishedVersionSince)} (dal ${formatDate(e.publishedVersionSince)})`
                      : " Nessuna versione in uso"}
                  </p>
                </div>
                <StatusBadge status={e.status} />
              </li>
            ))}
          </ul>
        )}
        <Pagination page={page} totalPages={exercises.page.totalPages} hrefFor={(p) => `/admin/exercises?page=${p}`} />
      </Card>
    </div>
  );
}
