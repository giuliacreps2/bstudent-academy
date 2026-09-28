import type { ResourceSummary } from "@/types/resourceDetail";

interface ResourceSummaryCardProps {
  id: string;
  summary: ResourceSummary;
}

export function ResourceSummaryCard({ id, summary }: ResourceSummaryCardProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 rounded-lg bg-surface-blue p-5 sm:p-6"
    >
      <h2
        id={`${id}-title`}
        className="flex items-center gap-2 text-lg font-extrabold text-foreground"
      >
        <span aria-hidden="true">💡</span>
        In breve
      </h2>

      <p className="mt-2 max-w-2xl text-base leading-7 text-foreground/85 sm:text-lg sm:leading-8">
        {summary.text}
      </p>

      {summary.example && (
        <p className="mt-4 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl bg-white px-4 py-2.5">
          <span className="text-lg font-extrabold italic text-brand-primary">
            {summary.example.term}
          </span>
          <span aria-hidden="true" className="text-brand-muted">
            →
          </span>
          <span className="sr-only">si traduce</span>
          <span className="text-base font-bold text-foreground">
            {summary.example.translation}
          </span>
        </p>
      )}
    </section>
  );
}
