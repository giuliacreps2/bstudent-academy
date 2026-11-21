import { BookOpenIcon, CheckIcon, GiftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { MissionStep } from "@/types/missionPlay";

/**
 * Tappe della missione (blueprint §5.9): lezioni ed esercizi con il titolo per lo studente, più il
 * traguardo finale "Ricompensa" che aggiunge il frontend. Con molte tappe la fila scorre in orizzontale.
 */
export function PlayStepper({ steps, finished }: { steps: MissionStep[]; finished: boolean }) {
  return (
    <nav aria-label="Tappe della missione" className="overflow-x-auto">
      <ol className="flex min-w-max items-start gap-1 px-1 py-2">
        {steps.map((step) => (
          <StepItem
            key={step.order}
            label={step.title}
            status={step.status}
            Icon={step.kind === "lesson" ? BookOpenIcon : PencilSquareIcon}
          />
        ))}
        <StepItem label="Ricompensa" status={finished ? "done" : "todo"} Icon={GiftIcon} last />
      </ol>
    </nav>
  );
}

function StepItem({
  label,
  status,
  Icon,
  last = false,
}: {
  label: string;
  status: MissionStep["status"];
  Icon: typeof GiftIcon;
  last?: boolean;
}) {
  const circle =
    status === "done"
      ? "border-brand-success bg-brand-success text-white"
      : status === "current"
        ? "border-brand-primary bg-brand-primary text-white"
        : "border-border bg-surface text-brand-muted";

  return (
    <li className="flex items-start" aria-current={status === "current" ? "step" : undefined}>
      <div className="flex w-20 flex-col items-center gap-1.5">
        <span className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${circle}`}>
          {status === "done" ? (
            <CheckIcon aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Icon aria-hidden="true" className="h-4 w-4" />
          )}
        </span>
        <span
          className={`line-clamp-2 text-center text-[11px] font-semibold leading-tight ${
            status === "current" ? "text-foreground" : "text-brand-muted"
          }`}
        >
          {label}
        </span>
      </div>
      {!last && <span aria-hidden="true" className="mt-4 h-0.5 w-4 bg-border" />}
    </li>
  );
}
