import Link from "next/link";
import { Card, EmptyNote, formatDateTime, PageHeader, Pagination, sinceDays } from "@/components/admin/ui";
import { serverApi } from "@/lib/api-server";
import { getAllSubjects, parsePage } from "@/lib/admin-server";
import {
  getPendingSubmissions,
  KIND_LABELS,
  submissionHref,
  submissionsHref,
} from "@/lib/submissions";

/** "Consegne da correggere": dalla più vecchia, con filtro per materia (Blueprint Svolgimento §4.1) */
export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; materia?: string }>;
}) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const subjectId = Number(params.materia) > 0 ? Number(params.materia) : undefined;

  const [submissions, subjects] = await Promise.all([
    getPendingSubmissions(serverApi, page, subjectId),
    getAllSubjects(),
  ]);
  const total = submissions.page.totalElements;

  return (
    <div>
      <PageHeader title="Consegne da correggere" backHref="/admin" backLabel="Area Admin" />

      {subjects.content.length > 1 && (
        <nav aria-label="Materia" className="mb-4 flex flex-wrap gap-2 text-sm">
          <FilterLink href={submissionsHref()} active={!subjectId}>
            Tutte le materie
          </FilterLink>
          {subjects.content.map((s) => (
            <FilterLink key={s.subjectId} href={submissionsHref(0, s.subjectId)} active={subjectId === s.subjectId}>
              {s.name}
            </FilterLink>
          ))}
        </nav>
      )}

      <Card title={total === 1 ? "1 consegna in attesa" : `${total} consegne in attesa`}>
        {submissions.content.length === 0 ? (
          <EmptyNote>Nessuna consegna da correggere. Ottimo lavoro!</EmptyNote>
        ) : (
          <ul className="divide-y divide-border">
            {submissions.content.map((s) => (
              <li key={s.exerciseAttemptId} className="flex flex-wrap items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <Link href={submissionHref(s.exerciseAttemptId)} className="font-medium hover:underline">
                    {s.exerciseTitle}
                  </Link>
                  <span className="ml-2 text-sm text-brand-muted">{KIND_LABELS[s.kind]}</span>
                  <p className="text-xs text-brand-muted">
                    {s.studentUsername} · {s.subjectName} · {s.place}
                  </p>
                </div>
                <div className="text-right text-xs text-brand-muted">
                  <p>Consegnata {formatDateTime(s.submittedAt)}</p>
                  <p>in attesa {sinceDays(s.submittedAt)}</p>
                </div>
                <Link
                  href={submissionHref(s.exerciseAttemptId)}
                  className="rounded bg-brand-primary px-3 py-1 text-sm font-medium text-white hover:bg-brand-primary-hover"
                >
                  Correggi
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Pagination
          page={page}
          totalPages={submissions.page.totalPages}
          hrefFor={(p) => submissionsHref(p, subjectId)}
        />
      </Card>
    </div>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded border px-3 py-1 ${
        active ? "border-brand-primary bg-surface-blue font-semibold text-brand-primary" : "border-border hover:bg-surface-blue"
      }`}
    >
      {children}
    </Link>
  );
}
