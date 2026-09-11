"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { StepHeading } from "./StepHeading";
import { goals } from "@/constants/constants";

type StepGoalsProps = {
  selected: string[];
  toggle: (value: string) => void;
};

export function StepGoals({ selected, toggle }: StepGoalsProps) {
  return (
    <div>
      <StepHeading
        title="Cosa vuoi migliorare?"
        description="Scegli gli obiettivi che ti interessano di più."
      />

      <div className="mt-7 space-y-3">
        {goals.map((goal) => {
          const active = selected.includes(goal);

          return (
            <button
              key={goal}
              type="button"
              onClick={() => toggle(goal)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left text-sm font-bold transition ${
                active
                  ? "border-[#3155d9] bg-[#e8f2ff] text-[#3155d9]"
                  : "border-[#e5eaf2] bg-white text-[#172033] hover:bg-[#f7f9fc]"
              }`}
            >
              {goal}

              {active && <CheckIcon className="h-5 w-5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
