import { getExercisesData } from "@/lib/exercises";
import { TodayGoalSection } from "@/components/exercises/TodayGoalSection";
import { SkillPicker } from "@/components/exercises/SkillCard";
import { ResumeTraining } from "@/components/exercises/ResumeTraining";
import { DailyChallenge } from "@/components/exercises/DailyChallenge";
import { ExercisesRightColumn } from "@/components/exercises/rightColumn/ExercisesRightColumn";

export default async function ExercisesPage() {
  const {
    skills,
    exercisePool,
    resumeActivities,
    dailyChallenge,
    character,
    streak,
    bonuses,
  } = await getExercisesData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <TodayGoalSection exercisePool={exercisePool} />
        <SkillPicker skills={skills} />
        <ResumeTraining activities={resumeActivities} />
        <DailyChallenge {...dailyChallenge} />
      </div>

      <div>
        <ExercisesRightColumn
          character={character}
          streak={streak}
          bonuses={bonuses}
        />
      </div>
    </div>
  );
}
