import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import type { MilestoneData } from "@/types/dashboard";

export function NextMilestone({ milestone }: { milestone: MilestoneData }) {
  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-surface-blue flex items-center justify-center shrink-0">
          <ViewfinderCircleIcon className="w-5 h-5 text-brand-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Prossimo traguardo
          </p>
          <p className="text-xs text-brand-muted mt-0.5">
            Ti mancano{" "}
            <span className="font-semibold text-foreground">
              {milestone.xpNeeded} XP
            </span>{" "}
            per raggiungere il livello {milestone.nextLevel}.
          </p>
        </div>
      </div>
      <div className="w-full h-1.5 bg-surface-blue rounded-pill overflow-hidden">
        <div
          className="h-full bg-brand-primary rounded-pill"
          style={{ width: `${milestone.progress}%` }}
        />
      </div>
    </div>
  );
}
