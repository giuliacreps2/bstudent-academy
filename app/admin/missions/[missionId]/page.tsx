import LessonTitleForm from "@/components/admin/LessonTitleForm";
import MissionForm from "@/components/admin/MissionForm";
import ReorderList from "@/components/admin/ReorderList";
import StatusActions from "@/components/admin/StatusActions";
import { Card, formatDate, PageHeader, StatusBadge, TierBadge } from "@/components/admin/ui";
import { getAllExercises, getCourse, getLessons, getMission, getMissionExercises, parseId } from "@/lib/admin-server";

export default async function AdminMissionPage({ params }: { params: Promise<{ missionId: string }> }) {
  const missionId = parseId((await params).missionId);
  const [mission, lessons, links, exercises] = await Promise.all([
    getMission(missionId),
    getLessons(missionId),
    getMissionExercises(missionId),
    getAllExercises(),
  ]);
  const course = await getCourse(mission.courseId);
  const exerciseTitles = new Map(exercises.content.map((e) => [e.questionBankEntryId, e.internalTitle]));
  const exerciseOfLesson = new Map(links.map((link) => [link.lessonId, link.questionBankEntryId]));

  function exerciseDetail(lessonId: number): string {
    const exerciseId = exerciseOfLesson.get(lessonId);
    if (exerciseId === undefined) return "Teoria → nessun esercizio collegato (da collegare nella lezione)";
    return `Teoria → esercizio: ${exerciseTitles.get(exerciseId) ?? `n. ${exerciseId}`}`;
  }

  return (
    <div>
      <PageHeader title={mission.title} backHref={`/admin/courses/${course.courseId}`} backLabel={course.title}>
        <TierBadge tier={mission.accessTier} />
        <StatusBadge status={mission.status} />
      </PageHeader>

      <Card title="Stato">
        <p className="mb-3 text-sm text-brand-muted">
          Prima pubblicazione: {formatDate(mission.publishedAt)}. Per pubblicare servono lezioni pubblicate, ciascuna con
          un esercizio pubblicato e la ripartizione tra le skill (oppure la skill principale della materia).
        </p>
        <StatusActions target="mission" id={mission.missionId} status={mission.status}
                       everPublished={mission.publishedAt !== null} afterDeleteHref={`/admin/courses/${course.courseId}`} />
      </Card>

      <Card title="Lezioni">
        <p className="mb-3 text-sm text-brand-muted">
          Ogni lezione è una coppia: prima la teoria (le pagine), poi il suo esercizio, che lo studente svolge subito
          dopo; il tempo dell&apos;esercizio parte quando finisce la teoria. Spostando una lezione si sposta anche il suo
          esercizio. Per abbinare un esercizio diverso, aprilo dalla lezione.
        </p>
        <ReorderList
          container="mission"
          containerId={mission.missionId}
          emptyText="Nessuna lezione."
          items={lessons.map((l) => ({
            id: l.lessonId,
            title: l.title,
            href: `/admin/lessons/${l.lessonId}`,
            status: l.status,
            detail: exerciseDetail(l.lessonId),
          }))}
        />
        <div className="mt-4 border-t border-border pt-4">
          <LessonTitleForm missionId={mission.missionId} />
        </div>
      </Card>

      <Card title="Dati della missione">
        <MissionForm mission={mission} />
      </Card>
    </div>
  );
}
