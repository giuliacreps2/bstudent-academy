import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import type { ActivityData } from "@/types/dashboard";

export function NextActivity({ activity }: { activity: ActivityData }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">
          La tua prossima attività
        </h3>
        <Link
          href="/esercizi"
          className="text-xs font-medium text-brand-primary hover:underline"
        >
          Vedi tutte →
        </Link>
      </div>
      <div className="rounded-lg bg-brand-accent/15 border border-brand-accent/30 p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shrink-0">
            <BookOpenIcon className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-brand-accent uppercase mb-0.5">
              {activity.category}
            </p>
            <p className="text-sm font-semibold text-foreground leading-snug">
              {activity.title}
            </p>
            <p className="text-xs text-brand-muted mt-1">
              {activity.exerciseCount} esercizi · ~{activity.durationMinutes}{" "}
              min
            </p>
          </div>
        </div>
        <Link
          href={activity.href}
          className="inline-flex items-center gap-1 text-sm font-medium bg-brand-accent text-white px-4 py-2 rounded-pill active:scale-95 transition-transform duration-150"
        >
          Allenati →
        </Link>
      </div>
    </div>
  );
}
