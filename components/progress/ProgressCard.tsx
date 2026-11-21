import type { ReactNode } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

/**
 * Gruppo di "I miei progressi" (blueprint §10.5): una scheda con il riassunto sempre visibile e il dettaglio
 * che si apre con un clic.
 */
export function ProgressCard({
  id,
  icon,
  title,
  summary,
  children,
  defaultOpen = false,
}: {
  id: string;
  icon: string;
  title: string;
  summary: ReactNode;
  children?: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 rounded-lg border border-border bg-surface">
      <div className="p-5">
        <h2 id={`${id}-title`} className="flex items-center gap-2 text-lg font-extrabold text-foreground">
          <span aria-hidden="true">{icon}</span>
          {title}
        </h2>
        <div className="mt-3">{summary}</div>
      </div>
      {children && (
        <details open={defaultOpen} className="group border-t border-border">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-surface-blue [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Vedi il dettaglio</span>
            <span className="hidden group-open:inline">Nascondi il dettaglio</span>
            <ChevronDownIcon className="h-4 w-4 transition group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-5">{children}</div>
        </details>
      )}
    </section>
  );
}

export function ProgressBar({ percent, className = "bg-brand-primary" }: { percent: number; className?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-pill bg-surface-blue">
      <div className={`h-full rounded-pill ${className}`} style={{ width: `${Math.max(0, Math.min(100, percent))}%` }} />
    </div>
  );
}
