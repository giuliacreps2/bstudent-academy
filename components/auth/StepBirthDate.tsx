"use client";

import { StepHeading, Field, inputClass } from "./StepHeading";

type BirthDateData = {
  birthDate: string;
};

type StepBirthDateProps = {
  value: BirthDateData;
  onChange: (value: BirthDateData) => void;
};

export function StepBirthDate({ value, onChange }: StepBirthDateProps) {
  return (
    <div>
      <StepHeading
        title="Prima di iniziare..."
        description="Ci serve la tua data di nascita per personalizzare il percorso."
      />

      <div className="mt-8">
        <Field label="Data di nascita">
          <input
            type="date"
            value={value.birthDate}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) =>
              onChange({
                ...value,
                birthDate: e.target.value,
              })
            }
            className={inputClass}
          />
        </Field>

        <p className="mt-4 text-xs leading-5 text-[#667085]">
          La utilizziamo per mostrarti un&apos;esperienza adatta alla tua fascia
          d&apos;età.
        </p>
      </div>
    </div>
  );
}
