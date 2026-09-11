"use client";

import { StepHeading, Field, inputClass } from "./StepHeading";
import type { EducationData } from "./RegisterModal";

type StepEducationProps = {
  value: EducationData;
  onChange: (value: EducationData) => void;
};

export function StepEducation({ value, onChange }: StepEducationProps) {
  return (
    <div>
      <StepHeading
        title="Dove studi?"
        description="Queste informazioni ci aiutano a capire meglio la nostra community."
      />

      <div className="mt-7 space-y-4">
        <Field label="Comune">
          <input
            value={value.municipalityId}
            onChange={(e) =>
              onChange({ ...value, municipalityId: e.target.value })
            }
            placeholder="Cerca il tuo comune"
            className={inputClass}
          />
        </Field>

        <Field label="Scuola">
          <input
            value={value.schoolId}
            onChange={(e) => onChange({ ...value, schoolId: e.target.value })}
            placeholder="Cerca la tua scuola"
            className={inputClass}
          />
        </Field>

        <p className="text-xs leading-5 text-[#667085]">
          Non trovi la tua scuola? Potrai completare queste informazioni anche
          in seguito.
        </p>
      </div>
    </div>
  );
}
