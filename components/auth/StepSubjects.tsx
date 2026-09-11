"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { StepHeading } from "./StepHeading";
import { subjects } from "@/constants/constants";

type StepSubjectsProps = {
  selected: string[];
  toggle: (value: string) => void;
};

export function StepSubjects({ selected, toggle }: StepSubjectsProps) {
  return (
    <div>
      <StepHeading
        title="Cosa studi?"
        description="Seleziona le materie che fanno parte del tuo percorso."
      />

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {subjects.map((subject) => {
          const active = selected.includes(subject);

          return (
            <button
              key={subject}
              type="button"
              onClick={() => toggle(subject)}
              className={`flex min-h-[56px] items-center justify-between rounded-xl border px-4 text-left text-sm font-bold transition ${
                active
                  ? "border-[#3155d9] bg-[#e8f2ff] text-[#3155d9]"
                  : "border-[#e5eaf2] bg-white text-[#172033] hover:border-[#3155d9]/40 hover:bg-[#f7f9fc]"
              }`}
            >
              {subject}

              {active && <CheckIcon className="h-5 w-5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
