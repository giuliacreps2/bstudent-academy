import { MissionBonusChip } from "./MissionBonusChip";
import type { MissionBonusCounter } from "@/types/missions";

export function MissionBonusesBar({
  bonuses,
}: {
  bonuses: MissionBonusCounter[];
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {bonuses.map((bonus) => (
        <MissionBonusChip key={bonus.id} bonus={bonus} />
      ))}
    </div>
  );
}
