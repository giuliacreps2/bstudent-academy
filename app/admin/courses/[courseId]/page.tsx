import CourseForm from "@/components/admin/CourseForm";
import MissionForm from "@/components/admin/MissionForm";
import ReorderList from "@/components/admin/ReorderList";
import StatusActions from "@/components/admin/StatusActions";
import { Card, formatDate, PageHeader, StatusBadge } from "@/components/admin/ui";
import { getAllSubjects, getCourse, getMissions, parseId } from "@/lib/admin-server";

export default async function AdminCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const courseId = parseId((await params).courseId);
  const [course, missions, subjects] = await Promise.all([
    getCourse(courseId),
    getMissions(courseId),
    getAllSubjects(),
  ]);
  const subjectName = subjects.content.find((s) => s.subjectId === course.subjectId)?.name;

  return (
    <div>
      <PageHeader title={course.title} backHref={`/admin/courses?subjectId=${course.subjectId}`} backLabel={`Corsi di ${subjectName ?? "materia"}`}>
        <StatusBadge status={course.status} />
      </PageHeader>

      <Card title="Stato">
        <p className="mb-3 text-sm text-brand-muted">
          Prima pubblicazione: {formatDate(course.publishedAt)}. Per pubblicare serve almeno una missione pubblicata.
        </p>
        <StatusActions target="course" id={course.courseId} status={course.status}
                       everPublished={course.publishedAt !== null} afterDeleteHref="/admin/courses" />
      </Card>

      <Card title="Missioni">
        <ReorderList
          container="course"
          containerId={course.courseId}
          emptyText="Nessuna missione."
          items={missions.map((m) => ({
            id: m.missionId,
            title: m.title,
            href: `/admin/missions/${m.missionId}`,
            status: m.status,
            tier: m.accessTier,
          }))}
        />
        <div className="mt-4 border-t border-border pt-4">
          <MissionForm courseId={course.courseId} />
        </div>
      </Card>

      <Card title="Dati del corso">
        <CourseForm subjects={subjects.content} course={course} />
      </Card>
    </div>
  );
}
