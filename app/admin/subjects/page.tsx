import SubjectsManager from "@/components/admin/SubjectsManager";
import { PageHeader, Pagination } from "@/components/admin/ui";
import { getAllSkills, getSubjects, parsePage } from "@/lib/admin-server";

export default async function AdminSubjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parsePage((await searchParams).page);
  const [subjects, skills] = await Promise.all([getSubjects(page), getAllSkills()]);

  return (
    <div>
      <PageHeader title="Materie" backHref="/admin" backLabel="Area Admin" />
      <SubjectsManager subjects={subjects.content} skills={skills.content} />
      <Pagination page={page} totalPages={subjects.page.totalPages} hrefFor={(p) => `/admin/subjects?page=${p}`} />
    </div>
  );
}
