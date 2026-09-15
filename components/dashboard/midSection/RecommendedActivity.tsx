import Link from "next/link";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import type { RecommendedActivityData } from "@/types/dashboard";

export function RecommendedActivity({
  activity,
}: {
  activity: RecommendedActivityData;
}) {
  return (
    <div className="rounded-lg bg-surface border border-border p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-surface-blue flex items-center justify-center shrink-0">
        <LightBulbIcon className="w-5 h-5 text-brand-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold tracking-widest text-brand-primary uppercase mb-0.5">
          Attività consigliata
        </p>
        <p className="text-sm font-semibold text-foreground">
          {activity.title}
        </p>
        <p className="text-xs text-brand-muted mt-0.5">{activity.reason}</p>
      </div>
      <Link
        href={activity.href}
        className="btn-secondary text-sm px-4 py-2 shrink-0 active:scale-95 transition-transform duration-150"
      >
        Vai →
      </Link>
    </div>
  );
}
