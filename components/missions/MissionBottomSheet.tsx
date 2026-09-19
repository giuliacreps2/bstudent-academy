import Link from "next/link";
import type { MissionMapNode } from "@/types/missions";

export function MissionBottomSheet({ mission }: { mission: MissionMapNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(23,32,51,0.12)] lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm font-bold text-foreground">
          {mission.title}
        </p>
        <span className="shrink-0 text-xs font-semibold text-brand-muted">
          ~{mission.durationMinutes} min
        </span>
      </div>

      <Link
        href={mission.href}
        className="btn-primary mt-3 w-full justify-center"
      >
        Inizia →
      </Link>
    </div>
  );
}
