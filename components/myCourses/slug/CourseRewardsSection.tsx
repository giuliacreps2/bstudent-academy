import Image from "next/image";
import type { CourseRewardItem } from "@/types/myCourses";

export function CourseRewardsSection({
  rewards,
}: {
  rewards: CourseRewardItem[];
}) {
  return (
    <div className="rounded-lg bg-surface border border-border p-5">
      <p className="text-xs font-semibold tracking-widest text-brand-muted uppercase mb-1">
        Ricompensa del percorso
      </p>
      <p className="text-sm text-brand-muted mb-5">
        Completa le tappe per sbloccare ricompense esclusive.
      </p>

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1 -mx-1 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-4 sm:overflow-visible sm:px-0 sm:mx-0 sm:pb-0">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="w-24 shrink-0 snap-start sm:w-auto flex flex-col items-center text-center gap-2"
          >
            <div
              className={`relative w-16 h-16 rounded-full overflow-hidden bg-surface-blue flex items-center justify-center shrink-0 ${
                reward.locked ? "opacity-50 grayscale" : ""
              }`}
            >
              {reward.imageUrl ? (
                <Image
                  src={reward.imageUrl}
                  alt={reward.name ?? reward.label}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-2xl text-brand-muted" aria-hidden="true">
                  ?
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-foreground leading-tight">
                {reward.name ?? reward.label}
              </p>
              {reward.name && (
                <p className="text-[11px] text-brand-muted">{reward.label}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
