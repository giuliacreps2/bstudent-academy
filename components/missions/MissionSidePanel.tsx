import { MissionObjectiveCard } from "./MissionObjectiveCard";
import { MissionSkillsCard } from "./MissionSkillsCard";
import { MissionRewardsCard } from "./MissionRewardsCard";
import { MissionLeaderboardCard } from "./MissionLeaderboardCard";
import type {
  MissionObjectiveData,
  MissionRewardsData,
  MissionLeaderboardData,
} from "@/types/missions";
import type { SkillKey } from "@/types/skills";

interface MissionSidePanelProps {
  objective: MissionObjectiveData;
  skills: SkillKey[];
  rewards: MissionRewardsData;
  leaderboard: MissionLeaderboardData;
}

export function MissionSidePanel({
  objective,
  skills,
  rewards,
  leaderboard,
}: MissionSidePanelProps) {
  return (
    <div className="space-y-4">
      <MissionObjectiveCard objective={objective} />
      <MissionSkillsCard skills={skills} />
      <MissionRewardsCard rewards={rewards} />
      <MissionLeaderboardCard leaderboard={leaderboard} />
    </div>
  );
}
