import Link from "next/link";
import ExerciseTitleForm from "@/components/admin/ExerciseTitleForm";
import { Card, EmptyNote, PageHeader, Pagination, StatusBadge } from "@/components/admin/ui";
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
                <Link href={`/admin/exercises/${e.questionBankEntryId}`} className="flex-1 font-medium hover:underline">
                  {e.internalTitle}
                </Link>
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
