import Image from "next/image";
import { GiftIcon } from "@heroicons/react/24/outline";
import { skillsMeta } from "@/constants/skills";
import type { MissionRewardsData } from "@/types/missions";

export function MissionRewardsCard({
  rewards,
}: {
  rewards: MissionRewardsData;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <div className="flex items-center gap-2 mb-3">
        <GiftIcon className="h-4 w-4 text-brand-accent" />
        <p className="text-sm font-bold text-white">Ricompense</p>
      </div>

      <ul className="space-y-1.5 mb-4">
        {rewards.xpRewards.map((reward) => (
          <li key={reward.skill} className="text-xs text-white/70">
            <span className="font-semibold text-brand-accent">
              +{reward.xp} XP
            </span>{" "}
            ({skillsMeta[reward.skill].label})
          </li>
        ))}
      </ul>

      {rewards.skinAccessory && (
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
          <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-white/10">
            <Image
              src={rewards.skinAccessory.imageUrl}
              alt={rewards.skinAccessory.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-xs font-medium text-white/80">
            {rewards.skinAccessory.name}
          </p>
        </div>
      )}
    </div>
  );
}
