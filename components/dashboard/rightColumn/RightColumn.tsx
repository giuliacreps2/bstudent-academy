import { StatsCard } from "@/components/dashboard/rightColumn/StatsCard";
import { SkinImage } from "@/components/dashboard/rightColumn/SkinImage";
import { LevelProgress } from "@/components/dashboard/rightColumn/LevelProgress";
import { XpStreakRow } from "@/components/dashboard/rightColumn/XpStreakRow";
import { SkinCard } from "@/components/dashboard/rightColumn/SkinCard";
import type { SkinData, StatsData } from "@/types/dashboard";

export function RightColumn({
  skin,
  stats,
}: {
  skin: SkinData;
  stats: StatsData;
}) {
  return (
    <div className="space-y-6">
      {/* Desktop: skin card intera sopra, stats card intera sotto */}
      <div className="hidden lg:block space-y-6">
        <SkinCard skin={skin} />
        <StatsCard stats={stats} />
      </div>

      {/* Mobile: solo immagine + livello affiancati, poi XP/streak */}
      <div className="lg:hidden space-y-4">
        <div className="flex items-center gap-4 rounded-lg bg-surface border border-border p-4">
          <SkinImage
            src={skin.imageUrl}
            alt={skin.name}
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
          <LevelProgress
            level={stats.level}
            currentXp={stats.currentXp}
            maxXp={stats.maxXp}
          />
        </div>
        <XpStreakRow xp={stats.xp} streak={stats.streak} />
      </div>
    </div>
  );
}
