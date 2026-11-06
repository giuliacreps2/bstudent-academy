import Link from "next/link";
import CourseForm from "@/components/admin/CourseForm";
import { Card, EmptyNote, PageHeader, Pagination, StatusBadge, TierBadge } from "@/components/admin/ui";
import { getAllSubjects, getCourses, parsePage } from "@/lib/admin-server";

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; subjectId?: string }>;
}) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const subjectId = Number(params.subjectId) > 0 ? Number(params.subjectId) : undefined;
  const [courses, subjects] = await Promise.all([getCourses(page, subjectId), getAllSubjects()]);
  const subjectNames = new Map(subjects.content.map((s) => [s.subjectId, s.name]));
  const query = (p: number) => `/admin/courses?page=${p}${subjectId ? `&subjectId=${subjectId}` : ""}`;

  return (
    <div>
      <PageHeader title="Corsi" backHref="/admin" backLabel="Area Admin" />

      <Card title="Nuovo corso">
        {subjects.content.length === 0
          ? <EmptyNote>Crea prima una materia.</EmptyNote>
          : <CourseForm subjects={subjects.content} />}
      </Card>

      <Card title={subjectId ? `Corsi di ${subjectNames.get(subjectId) ?? "materia"}` : "Tutti i corsi"}>
        <div className="mb-3 flex flex-wrap gap-2 text-sm">
          <Link href="/admin/courses" className={subjectId ? "hover:underline" : "font-semibold"}>Tutte</Link>
          {subjects.content.map((s) => (
            <Link key={s.subjectId} href={`/admin/courses?subjectId=${s.subjectId}`}
                  className={subjectId === s.subjectId ? "font-semibold" : "hover:underline"}>
              {s.name}
            </Link>
          ))}
        </div>
        {courses.content.length === 0 ? (
          <EmptyNote>Nessun corso.</EmptyNote>
        ) : (
          <ul className="divide-y divide-border">
            {courses.content.map((course) => (
              <li key={course.courseId} className="flex flex-wrap items-center gap-3 py-2">
                <Link href={`/admin/courses/${course.courseId}`} className="flex-1 font-medium hover:underline">
                  {course.title}
                </Link>
                <span className="text-sm text-brand-muted">{subjectNames.get(course.subjectId)}</span>
                <TierBadge tier={course.accessTier} />
                <StatusBadge status={course.status} />
              </li>
            ))}
          </ul>
        )}
        <Pagination page={page} totalPages={courses.page.totalPages} hrefFor={query} />
      </Card>
    </div>
  );
}
