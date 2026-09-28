import type { ResourceExample } from "@/types/resourceDetail";

interface ResourceExamplesProps {
  id: string;
  examples: ResourceExample[];
}

// Il pulsante audio non è requisito MVP: si aggiungerà qui, accanto al termine.
export function ResourceExamples({ id, examples }: ResourceExamplesProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2
        id={`${id}-title`}
        className="text-2xl font-extrabold tracking-tight text-foreground"
      >
        Esempi
      </h2>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <li
            key={example.id}
            className="flex flex-col rounded-lg border border-border bg-surface p-5"
          >
            <p className="text-sm font-bold text-brand-primary">
              {example.term}{" "}
              <span className="font-medium text-brand-muted">
                {example.grammar}
              </span>
            </p>

            <p className="mt-3 text-lg font-bold italic leading-snug text-foreground">
              {example.sentence}
            </p>

            <p className="mt-2 text-sm leading-6 text-brand-muted">
              {example.translation}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
