import { XpStreakRow } from "@/components/dashboard/rightColumn/XpStreakRow";
import { LevelProgress } from "@/components/dashboard/rightColumn/LevelProgress";
import type { StatsData } from "@/types/dashboard";

export function StatsCard({ stats }: { stats: StatsData }) {
  return (
    <div className="rounded-lg bg-surface border border-border p-4 space-y-4">
      <XpStreakRow xp={stats.xp} streak={stats.streak} />
      <LevelProgress
        level={stats.level}
        currentXp={stats.currentXp}
        maxXp={stats.maxXp}
      />
    </div>
  );
}
