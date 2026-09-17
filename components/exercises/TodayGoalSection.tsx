"use client";

import { useState, useTransition } from "react";
import { GoalModal } from "./GoalModal";
import { RecommendedExercises } from "./RecommendedExercises";
import { getRecommendedExercises } from "@/lib/exercise-recommendations";
import type { GoalSelection } from "@/types/skills";
import type { ExerciseSuggestion } from "@/types/exercises";

export function TodayGoalSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [goal, setGoal] = useState<GoalSelection | null>(null);
  const [exercises, setExercises] = useState<ExerciseSuggestion[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleConfirm(selection: GoalSelection) {
    setGoal(selection);
    startTransition(async () => {
      const result = await getRecommendedExercises(selection);
      setExercises(result);
    });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-surface border border-border p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-blue flex items-center justify-center shrink-0 text-lg">
          🎯
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Qual è il tuo obiettivo oggi?
          </p>
          <p className="text-xs text-brand-muted mt-0.5">
            Dicci cosa vuoi allenare e ti suggeriremo gli esercizi più adatti a
            te.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="btn-primary text-sm px-4 py-2 shrink-0 active:scale-95 transition-transform duration-150"
        >
          Inizia il quiz
        </button>
      </div>

      {goal && (
        <RecommendedExercises
          exercises={exercises}
          isLoading={isPending}
          onChangeGoal={() => setModalOpen(true)}
        />
      )}

      <GoalModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
