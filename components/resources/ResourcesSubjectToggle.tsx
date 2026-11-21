import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";
import type {
  ResourceSubjectKey,
  ResourceSubjectMeta,
} from "@/types/resources";

interface ResourceSubjectToggleProps {
  subjects: ResourceSubjectMeta[];
  subject: ResourceSubjectKey;
  /** Indirizzo della pagina con l'altra materia */
  hrefFor: (subject: ResourceSubjectKey) => string;
}

export function ResourceSubjectToggle({
  subjects,
  subject,
  hrefFor,
}: ResourceSubjectToggleProps) {
  return (
    <div className="container-section py-4 md:py-6">
      <nav
        aria-label="Materia"
        className="mx-auto flex max-w-md gap-2 rounded-full border border-border bg-white p-1.5 shadow-[0_8px_24px_rgba(23,32,51,0.06)]"
      >
        {subjects.map(({ key, label }) => {
          const active = key === subject;

          return (
            <Link
              key={key}
              href={hrefFor(key)}
              aria-current={active ? "page" : undefined}
              className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-base font-extrabold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                active
                  ? "bg-brand-primary text-white"
                  : "text-foreground hover:bg-surface-blue hover:text-brand-primary"
              }`}
            >
              {label.toUpperCase()}
              {active && <CheckIcon className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
