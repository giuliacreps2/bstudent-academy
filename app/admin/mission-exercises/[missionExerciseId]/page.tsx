import Link from "next/link";
import { ConfigForm, PublishInMission, WeightsEditor } from "@/components/admin/MissionExercisePanel";
import { Card, PageHeader, StatusBadge } from "@/components/admin/ui";
import {
  getAllSkills,
  getCourse,
  getExercise,
  getMission,
  getMissionExercise,
  getSkillWeights,
  getSubject,
  parseId,
} from "@/lib/admin-server";

/* Esercizio nella missione: stato nella missione, tempo e punti, skill.
   Il contenuto (domanda e versioni) si modifica dalla pagina dell'esercizio negli Esercizi */

export default async function AdminMissionExercisePage({ params }: { params: Promise<{ missionExerciseId: string }> }) {
  const missionExerciseId = parseId((await params).missionExerciseId);
  const [missionExercise, weights, skills] = await Promise.all([
    getMissionExercise(missionExerciseId),
    getSkillWeights(missionExerciseId),
    getAllSkills(),
  ]);
  const [mission, exercise] = await Promise.all([
    getMission(missionExercise.missionId),
    getExercise(missionExercise.questionBankEntryId),
  ]);
  const course = await getCourse(mission.courseId);
  const subject = await getSubject(course.subjectId);
  const defaultSkillName = skills.content.find((s) => s.skillId === subject.defaultSkillId)?.name ?? null;

  return (
    <div>
      <PageHeader title={exercise.internalTitle} backHref={`/admin/missions/${mission.missionId}`} backLabel={mission.title}>
        <StatusBadge status={missionExercise.status} />
      </PageHeader>

      <Card title="Nella missione">
        <PublishInMission missionExercise={missionExercise} missionStatus={mission.status} />
        <p className="mt-3 text-sm text-brand-muted">
          Contenuto e versioni si modificano negli Esercizi:{" "}
          <Link href={`/admin/exercises/${exercise.questionBankEntryId}`} className="underline">{exercise.internalTitle}</Link>{" "}
          <StatusBadge status={exercise.status} />
          {exercise.status === "withdrawn" && " — ritirato: gli studenti non lo vedono in nessuna missione."}
        </p>
      </Card>

      <Card title="Tempo e punti">
        <ConfigForm missionExercise={missionExercise} />
      </Card>

      <Card title="Quanto conta per ogni skill">
        <WeightsEditor missionExerciseId={missionExercise.missionExerciseId} skills={skills.content}
                       weights={weights} defaultSkillName={defaultSkillName} />
      </Card>
    </div>
  );
}
