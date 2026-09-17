"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { GoalModal } from "./GoalModal";
import type { GoalSelection } from "@/types/skills";
import { RecommendedExercises } from "./RecommendedExercises";
import type { ExerciseSuggestion } from "@/types/exercises";

export function TodayGoalSection({
  exercisePool,
}: {
  exercisePool: ExerciseSuggestion[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [goal, setGoal] = useState<GoalSelection | null>(null);

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
        <ChevronDownIcon className="w-4 h-4 text-brand-muted shrink-0 hidden sm:block" />
      </div>

      {goal && (
        <RecommendedExercises
          goal={goal}
          pool={exercisePool}
          onChangeGoal={() => setModalOpen(true)}
        />
      )}

      <GoalModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={setGoal}
      />
    </div>
  );
}
