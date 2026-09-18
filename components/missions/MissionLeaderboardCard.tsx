import { TrophyIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import type { MissionLeaderboardData } from "@/types/missions";

export function MissionLeaderboardCard({
  leaderboard,
}: {
  leaderboard: MissionLeaderboardData;
}) {
  if (leaderboard.unlocked) return null; // TODO: variante sbloccata quando disponibile

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 opacity-70">
      <div className="flex items-center gap-2 mb-2">
        <TrophyIcon className="h-4 w-4 text-white/40" />
        <p className="text-sm font-bold text-white/70">Classifica</p>
        <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-white/40">
          <LockClosedIcon className="h-3 w-3" />
          In arrivo
        </span>
      </div>
      <p className="text-xs leading-5 text-white/40">
        {leaderboard.unlockHint}
      </p>
    </div>
  );
}
