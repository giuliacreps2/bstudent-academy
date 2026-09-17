import Link from "next/link";
import Image from "next/image";
import { ClockIcon } from "@heroicons/react/24/outline";
import { skillsMeta, skillColorStyles } from "@/constants/skills";
import type { GoalSelection } from "@/types/skills";
import type { ExerciseSuggestion } from "@/types/exercises";

function pickExercises(
  goal: GoalSelection,
  pool: ExerciseSuggestion[],
): ExerciseSuggestion[] {
  if (goal === "mix") return pool.slice(0, 3);
  const matching = pool.filter((e) => e.skill === goal);
  if (matching.length >= 3) return matching.slice(0, 3);
  const fallback = pool.filter((e) => e.skill !== goal);
  return [...matching, ...fallback].slice(0, 3);
}

export function RecommendedExercises({
  goal,
  pool,
  onChangeGoal,
}: {
  goal: GoalSelection;
  pool: ExerciseSuggestion[];
  onChangeGoal: () => void;
}) {
  const exercises = pickExercises(goal, pool);

  return (
    <div className="rounded-lg bg-surface border border-border p-5">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h3 className="text-lg font-bold text-foreground">
          Esercizi consigliati per te
        </h3>
        <button
          type="button"
          onClick={onChangeGoal}
          className="text-sm font-medium text-brand-primary hover:underline shrink-0"
        >
          Cambia obiettivo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {exercises.map((exercise) => {
          const meta = skillsMeta[exercise.skill];
          const styles = skillColorStyles[meta.color];

          return (
            <div
              key={exercise.id}
              className="flex flex-col rounded-lg border border-border overflow-hidden"
            >
              <div className="relative w-full h-24 bg-surface-blue shrink-0">
                <Image
                  src={exercise.thumbnail}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <span
                  className={`self-start text-[10px] font-semibold px-2 py-0.5 rounded-pill mb-2 ${styles.badgeBg} ${styles.badgeText}`}
                >
                  {meta.label}
                </span>
                <p className="text-sm font-semibold text-foreground mb-2 flex-1">
                  {exercise.title}
                </p>
                <div className="flex items-center gap-1 text-xs text-brand-muted mb-3">
                  <ClockIcon className="w-3.5 h-3.5" />
                  <span>~{exercise.durationMinutes} min</span>
                </div>
                <Link
                  href={exercise.href}
                  className="btn-secondary text-xs px-3 py-2 justify-center active:scale-95 transition-transform duration-150"
                >
                  Fai l'esercizio →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
