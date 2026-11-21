import LessonPagesEditor from "@/components/admin/LessonPagesEditor";
import LessonTitleForm from "@/components/admin/LessonTitleForm";
import StatusActions from "@/components/admin/StatusActions";
import { Card, DatesLine, PageHeader, StatusBadge } from "@/components/admin/ui";
import { getCourse, getLesson, getLessonPages, getMission, getTopics, parseId } from "@/lib/admin-server";

export default async function AdminLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const lessonId = parseId((await params).lessonId);
  const [lesson, pages] = await Promise.all([getLesson(lessonId), getLessonPages(lessonId)]);
  const mission = await getMission(lesson.missionId);
  // Argomenti della materia del corso: la lezione può avere solo uno di questi
  const course = await getCourse(mission.courseId);
  const topics = await getTopics(course.subjectId);

  return (
    <div>
      <PageHeader title={lesson.title} backHref={`/admin/missions/${mission.missionId}`} backLabel={mission.title}>
        <StatusBadge status={lesson.status} />
      </PageHeader>

      <Card title="Stato">
        <DatesLine createdAt={lesson.createdAt} updatedAt={lesson.updatedAt} publishedAt={lesson.publishedAt} />
        <p className="mb-3 text-sm text-brand-muted">
          Per pubblicare serve almeno una pagina. Gli esercizi si aggiungono e si ordinano nella sequenza della missione.
          {mission.status === "published" && " La missione è pubblicata: il ritiro viene rifiutato se lascia due esercizi di seguito o la missione senza una lezione iniziale."}
        </p>
        <StatusActions target="lesson" id={lesson.lessonId} status={lesson.status}
                       everPublished={lesson.publishedAt !== null} afterDeleteHref={`/admin/missions/${mission.missionId}`} />
      </Card>

      <Card title="Titolo e argomento">
        <LessonTitleForm lessonId={lesson.lessonId} initialTitle={lesson.title}
                         initialTopicId={lesson.topicId} topics={topics} />
      </Card>

      <Card title="Pagine">
        <LessonPagesEditor lessonId={lesson.lessonId} pages={pages} />
      </Card>
    </div>
  );
}
