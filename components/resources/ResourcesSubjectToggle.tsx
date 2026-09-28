"use client";

import { CheckIcon } from "@heroicons/react/24/solid";
import {
  resourceSubjectOrder,
  resourceSubjectsMeta,
} from "@/constants/resources";
import type { ResourceSubjectKey } from "@/types/resources";

interface ResourceSubjectToggleProps {
  subject: ResourceSubjectKey;
  onSelect: (subject: ResourceSubjectKey) => void;
}

export function ResourceSubjectToggle({
  subject,
  onSelect,
}: ResourceSubjectToggleProps) {
  return (
    <div className="container-section py-4 md:py-6">
      <div
        role="radiogroup"
        aria-label="Materia"
        className="mx-auto grid max-w-md grid-cols-2 gap-2 rounded-full border border-border bg-white p-1.5 shadow-[0_8px_24px_rgba(23,32,51,0.06)]"
      >
        {resourceSubjectOrder.map((key) => {
          const active = key === subject;

          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(key)}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-full text-base font-extrabold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                active
                  ? "bg-brand-primary text-white"
                  : "text-foreground hover:bg-surface-blue hover:text-brand-primary"
              }`}
            >
              {resourceSubjectsMeta[key].label.toUpperCase()}
              {active && <CheckIcon className="h-4 w-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
