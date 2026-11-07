import LessonExercisePanel from "@/components/admin/LessonExercisePanel";
import LessonPagesEditor from "@/components/admin/LessonPagesEditor";
import LessonTitleForm from "@/components/admin/LessonTitleForm";
import StatusActions from "@/components/admin/StatusActions";
import { Card, DatesLine, PageHeader, StatusBadge } from "@/components/admin/ui";
import {
  getAllExercises,
  getAllSkills,
  getCourse,
  getLesson,
  getLessonExercise,
  getLessonPages,
  getMission,
  getSkillWeights,
  getSubject,
  parseId,
} from "@/lib/admin-server";

export default async function AdminLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const lessonId = parseId((await params).lessonId);
  const [lesson, pages, missionExercise, exercises, skills] = await Promise.all([
    getLesson(lessonId),
    getLessonPages(lessonId),
    getLessonExercise(lessonId),
    getAllExercises(),
    getAllSkills(),
  ]);
  const mission = await getMission(lesson.missionId);
  const course = await getCourse(mission.courseId);
  const [subject, weights] = await Promise.all([
    getSubject(course.subjectId),
    missionExercise ? getSkillWeights(missionExercise.missionExerciseId) : Promise.resolve([]),
  ]);
  const defaultSkillName = skills.content.find((s) => s.skillId === subject.defaultSkillId)?.name ?? null;

  return (
    <div>
      <PageHeader title={lesson.title} backHref={`/admin/missions/${mission.missionId}`} backLabel={mission.title}>
        <StatusBadge status={lesson.status} />
      </PageHeader>

      <Card title="Stato">
        <DatesLine createdAt={lesson.createdAt} updatedAt={lesson.updatedAt} publishedAt={lesson.publishedAt} />
        <p className="mb-3 text-sm text-brand-muted">
          Per pubblicare servono almeno una pagina e l&apos;esercizio collegato.
        </p>
        <StatusActions target="lesson" id={lesson.lessonId} status={lesson.status}
                       everPublished={lesson.publishedAt !== null} afterDeleteHref={`/admin/missions/${mission.missionId}`} />
      </Card>

      <Card title="Titolo">
        <LessonTitleForm lessonId={lesson.lessonId} initialTitle={lesson.title} />
      </Card>

      <Card title="Pagine">
        <LessonPagesEditor lessonId={lesson.lessonId} pages={pages} />
      </Card>

      <Card title="Esercizio della lezione">
        {/* key: dopo collegamento o scollegamento i form ripartono dai dati nuovi */}
        <LessonExercisePanel
          key={missionExercise?.missionExerciseId ?? "none"}
          lessonId={lesson.lessonId}
          missionExercise={missionExercise}
          exercises={exercises.content}
          skills={skills.content}
          weights={weights}
          defaultSkillName={defaultSkillName}
        />
      </Card>
    </div>
  );
}
