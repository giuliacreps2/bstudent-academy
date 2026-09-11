"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import type { RegistrationData } from "./RegisterModal";

type StepSummaryProps = {
  data: RegistrationData;
  isUnder14: boolean;
  courseSlug?: string;
};

export function StepSummary({ data, isUnder14, courseSlug }: StepSummaryProps) {
  return (
    <div>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f2ff]">
        <CheckIcon className="h-7 w-7 text-[#3155d9]" />
      </div>

      <div className="mt-5 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#172033]">
          Ci siamo! 🚀
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#667085]">
          Il tuo account è pronto. Tra poco potrai iniziare il tuo percorso su
          BStudent.
        </p>
      </div>

      {courseSlug && (
        <div className="mt-7 rounded-2xl border border-[#e5eaf2] bg-[#f7f9fc] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
            Il tuo prossimo passo
          </p>

          <p className="mt-1 text-sm font-extrabold text-[#172033]">
            Iniziare il corso
          </p>

          <p className="mt-1 text-xs text-[#667085]">{courseSlug}</p>
        </div>
      )}

      {isUnder14 && (
        <div className="mt-4 rounded-2xl border border-[#e5eaf2] bg-[#fffaf0] p-4">
          <p className="text-sm font-bold text-[#172033]">
            Un ultimo passaggio
          </p>

          <p className="mt-1 text-xs leading-5 text-[#667085]">
            Prima di poter iniziare, sarà necessario completare il passaggio con
            il genitore o tutore.
          </p>
        </div>
      )}
    </div>
  );
}
