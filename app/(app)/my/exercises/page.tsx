// Pagina "Esercizi" = Palestra (blueprint §7.3)
import { getExercisesData } from "@/lib/exercises";
import { getExercisesPage } from "@/lib/practice-server";
import { exercisesHref, skillPracticeHref } from "@/lib/practice";
import { ExercisesHero } from "@/components/exercises/ExercisesHero";
import { DailyChallenge } from "@/components/exercises/DailyChallenge";
import { ExercisesRightColumn } from "@/components/exercises/rightColumn/ExercisesRightColumn";
import { ResourceSubjectToggle } from "@/components/resources/ResourcesSubjectToggle";
import { PracticeTodayGoal } from "@/components/practice/PracticeTodayGoal";
import { PracticeSkillPicker } from "@/components/practice/PracticeSkillPicker";
import { PracticeResume } from "@/components/practice/PracticeResume";
import type { SkillCardData } from "@/types/exercises";

interface PageProps {
  searchParams: Promise<{ materia?: string }>;
}

export default async function ExercisesPage({ searchParams }: PageProps) {
  const { materia } = await searchParams;

  // Da lib/exercises (dati d'esempio) servono ancora solo hero e personaggio: vedi il TODO in types/exercises.ts
  const [{ hero, character, bonuses }, practice] = await Promise.all([
    getExercisesData(),
    getExercisesPage(materia),
  ]);

  const subject = practice.activeSubject?.slug ?? "";
  const skillRefs = practice.skills.map((s) => s.skill);
  const skills: SkillCardData[] = practice.skills.map(({ skill, level, itemsCount }) => ({
    code: skill.code,
    name: skill.name,
    description: skill.description,
    icon: skill.icon,
    color: skill.color,
    level: level.level,
    maxLevel: level.maxLevel,
    progressPercent: level.progressPercent,
    itemsCount,
    href: skillPracticeHref(subject, skill.code),
  }));

  return (
    <div className="space-y-6">
      <ExercisesHero {...hero} />

      {practice.subjects.length > 1 && (
        <ResourceSubjectToggle
          subjects={practice.subjects.map((s) => ({ key: s.slug, label: s.name }))}
          subject={subject}
          hrefFor={exercisesHref}
        />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {subject && <PracticeTodayGoal key={subject} subject={subject} skills={skillRefs} />}
          <PracticeSkillPicker skills={skills} />
          <PracticeResume activities={practice.resumeActivities} skills={skillRefs} />
          {/* TODO (domanda per Giulia): il testo della card promette "una ricompensa speciale"; il premio vero
              è una vita (Gamification §7.1) */}
          <DailyChallenge
            completedSteps={Math.min(practice.dailyChallenge.passedToday, practice.dailyChallenge.target)}
            totalSteps={practice.dailyChallenge.target}
            rewardLabel="esercizi superati oggi"
            href="#skill"
          />
        </div>

        <div>
          <ExercisesRightColumn character={character} streak={practice.streak.current} bonuses={bonuses} />
        </div>
      </div>
    </div>
  );
}
