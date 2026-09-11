"use client";

import { StepHeading, Field, inputClass } from "./StepHeading";
import type { GuardianData } from "./RegisterModal";

type StepGuardianProps = {
  value: GuardianData;
  onChange: (value: GuardianData) => void;
};

export function StepGuardian({ value, onChange }: StepGuardianProps) {
  return (
    <div>
      <StepHeading
        title="Serve un genitore o tutore"
        description="Per continuare, abbiamo bisogno del contatto di un genitore o tutore."
      />

      <div className="mt-8">
        <Field label="Email del genitore o tutore">
          <input
            type="email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            placeholder="genitore@email.com"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-5 rounded-2xl bg-[#e8f2ff] p-4">
        <p className="text-sm leading-6 text-[#3155d9]">
          Ti spiegheremo in modo semplice come funziona il passaggio richiesto
          per poter utilizzare BStudent.
        </p>
      </div>
    </div>
  );
}
