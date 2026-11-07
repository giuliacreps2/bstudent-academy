import LessonTitleForm from "@/components/admin/LessonTitleForm";
import MissionForm from "@/components/admin/MissionForm";
import { AddExerciseForm } from "@/components/admin/MissionExercisePanel";
import ReorderList from "@/components/admin/ReorderList";
import StatusActions from "@/components/admin/StatusActions";
import { Card, DatesLine, PageHeader, StatusBadge, TierBadge } from "@/components/admin/ui";
import { msToMinutes } from "@/lib/admin";
import {
  getAllExercises,
  getAllSkills,
  getCourse,
  getMission,
  getMissionExercises,
  getMissionReadiness,
  getMissionSteps,
  getSubject,
  parseId,
} from "@/lib/admin-server";
import type { MissionExercise, MissionStep } from "@/types/admin";

export default async function AdminMissionPage({ params }: { params: Promise<{ missionId: string }> }) {
  const missionId = parseId((await params).missionId);
  const [mission, steps, readiness, links, exercises, skills] = await Promise.all([
    getMission(missionId),
    getMissionSteps(missionId),
    getMissionReadiness(missionId),
    getMissionExercises(missionId),
    getAllExercises(),
    getAllSkills(),
  ]);
  const course = await getCourse(mission.courseId);
  const subject = await getSubject(course.subjectId);
  const defaultSkillName = skills.content.find((s) => s.skillId === subject.defaultSkillId)?.name ?? null;
  const linkById = new Map(links.map((link) => [link.missionExerciseId, link]));
  const missionPublished = mission.status === "published";

  return (
    <div>
      <PageHeader title={mission.title} backHref={`/admin/courses/${course.courseId}`} backLabel={course.title}>
        <TierBadge tier={mission.accessTier} />
        <StatusBadge status={mission.status} />
      </PageHeader>

      <Card title="Stato">
        <DatesLine createdAt={mission.createdAt} updatedAt={mission.updatedAt} publishedAt={mission.publishedAt} />
        <Readiness problems={readiness.problems} warnings={readiness.warnings} published={missionPublished} />
        <StatusActions target="mission" id={mission.missionId} status={mission.status}
                       everPublished={mission.publishedAt !== null} afterDeleteHref={`/admin/courses/${course.courseId}`} />
      </Card>

      <Card title="Sequenza">
        <p className="mb-3 text-sm text-brand-muted">
          Lo studente incontra lezioni ed esercizi in quest&apos;ordine. La missione inizia con una lezione;
          due lezioni di seguito vanno bene, due esercizi di seguito no. Il tempo di un esercizio parte quando
          l&apos;esercizio compare.
          {missionPublished && " La missione è pubblicata: uno spostamento che rende la sequenza non valida viene rifiutato."}
        </p>
        <ReorderList
          container="mission"
          containerId={mission.missionId}
          emptyText="Nessuna lezione e nessun esercizio."
          items={steps.map((step) => toItem(step, linkById))}
        />
      </Card>

      <Card title="Aggiungi una lezione">
        <LessonTitleForm missionId={mission.missionId} />
      </Card>

      <Card title="Aggiungi un esercizio">
        <AddExerciseForm
          missionId={mission.missionId}
          missionPublished={missionPublished}
          exercises={exercises.content}
          usedExerciseIds={links.map((link) => link.questionBankEntryId)}
          skills={skills.content}
          defaultSkillName={defaultSkillName}
        />
      </Card>

      <Card title="Dati della missione">
        <MissionForm mission={mission} />
      </Card>
    </div>
  );
}

function toItem(step: MissionStep, linkById: Map<number, MissionExercise>) {
  if (step.kind === "lesson") {
    return {
      id: step.stepId,
      kindLabel: "Lezione",
      title: step.title,
      href: `/admin/lessons/${step.lessonId}`,
      status: step.status,
    };
  }
  const link = step.missionExerciseId !== null ? linkById.get(step.missionExerciseId) : undefined;
  const withdrawn = step.bankStatus === "withdrawn";
  const config = link ? `${msToMinutes(link.allowedDurationMs)} minuti, ${link.maxPoints} punti` : "";
  return {
    id: step.stepId,
    kindLabel: "Esercizio",
    title: step.title,
    href: `/admin/mission-exercises/${step.missionExerciseId}`,
    // Ritirato nel banco: nascosto ovunque, prevale sullo stato nella missione
    status: withdrawn ? "withdrawn" as const : step.status,
    detail: withdrawn ? `${config} · ritirato dagli Esercizi: gli studenti non lo vedono` : config,
  };
}

/** Controllo "missione pronta": i problemi bloccano la pubblicazione, gli avvisi no */
function Readiness({ problems, warnings, published }: { problems: string[]; warnings: string[]; published: boolean }) {
  if (problems.length === 0 && warnings.length === 0) {
    return (
      <p className="mb-3 text-sm text-brand-success">
        {published ? "La sequenza è valida." : "La missione è pronta per essere pubblicata."}
      </p>
    );
  }
  return (
    <div className="mb-3 space-y-2 text-sm">
      {problems.length > 0 && (
        <div className="text-brand-coral">
          <p className="font-medium">{published ? "Da sistemare:" : "Prima di pubblicare va sistemato:"}</p>
          <ul className="list-disc pl-5">{problems.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      )}
      {warnings.length > 0 && (
        <div className="text-brand-muted">
          <p className="font-medium">Da controllare (non blocca):</p>
          <ul className="list-disc pl-5">{warnings.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
