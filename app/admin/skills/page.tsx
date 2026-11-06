import SkillsManager from "@/components/admin/SkillsManager";
import { PageHeader, Pagination } from "@/components/admin/ui";
import { getSkills, parsePage } from "@/lib/admin-server";

export default async function AdminSkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parsePage((await searchParams).page);
  const skills = await getSkills(page);

  return (
    <div>
      <PageHeader title="Skill" backHref="/admin" backLabel="Area Admin" />
      <SkillsManager skills={skills.content} />
      <Pagination page={page} totalPages={skills.page.totalPages} hrefFor={(p) => `/admin/skills?page=${p}`} />
    </div>
  );
}
