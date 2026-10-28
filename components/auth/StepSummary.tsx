"use client";

import { CheckIcon } from "@heroicons/react/24/outline";

type StepSummaryProps = {
  isUnder14: boolean;
  courseSlug?: string;
  accepted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
};

/** Ultimo passaggio: accettazione dell'informativa e invio */
export function StepSummary({
  isUnder14,
  courseSlug,
  accepted,
  onAcceptedChange,
}: StepSummaryProps) {
  return (
    <div>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f2ff]">
        <CheckIcon className="h-7 w-7 text-[#3155d9]" />
      </div>

      <div className="mt-5 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#172033]">
          Ci siamo quasi! 🚀
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#667085]">
          {isUnder14
            ? "Manca solo la conferma del tuo genitore o tutore: gli scriveremo un'email."
            : "Ti invieremo un'email per confermare il tuo indirizzo e attivare l'account."}
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

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e5eaf2] p-4">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => onAcceptedChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#3155d9]"
        />
        <span className="text-sm leading-6 text-[#172033]">
          Ho letto e accetto i{" "}
          <a
            href="/privacy"
            target="_blank"
            className="font-semibold text-[#3155d9] hover:underline"
          >
            Termini di servizio e la Privacy Policy
          </a>
          .
        </span>
      </label>
    </div>
  );
}
