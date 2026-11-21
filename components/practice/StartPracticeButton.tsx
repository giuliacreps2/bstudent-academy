"use client";

import { useState, useTransition } from "react";
import { startPractice } from "@/app/(app)/my/exercises/actions";

interface StartPracticeButtonProps {
  practiceExerciseId: number;
  label: string;
  className?: string;
}

/** Apre una voce della Palestra (nuovo tentativo o bozza da riprendere); se non si può dice perché */
export function StartPracticeButton({ practiceExerciseId, label, className = "" }: StartPracticeButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <span className="inline-flex flex-col items-end">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const result = await startPractice(practiceExerciseId);
            setError(result.error);
          })
        }
        className={`btn-secondary shrink-0 px-4 py-2 text-sm transition-transform duration-150 active:scale-95 disabled:opacity-60 ${className}`}
      >
        {pending ? "Apro…" : label}
      </button>
      {error && (
        <span role="alert" className="mt-1 max-w-56 text-right text-xs font-semibold text-brand-coral">
          {error}
        </span>
      )}
    </span>
  );
}
