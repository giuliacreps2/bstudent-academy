import { SkinCard } from "./SkinCard";
import { StatsCard } from "./StatsCard";
import { NextActivity } from "./NextActivity";
import { SkillsList } from "./SkillsList";
import { NextMilestone } from "./NextMilestone";
import type {
  SkinData,
  StatsData,
  ActivityData,
  SkillData,
  MilestoneData,
} from "@/types/dashboard";

interface RightColumnProps {
  skin: SkinData;
  stats: StatsData;
  activity: ActivityData;
  skills: SkillData[];
  milestone: MilestoneData;
}

export function RightColumn({
  skin,
  stats,
  activity,
  skills,
  milestone,
}: RightColumnProps) {
  return (
    <div className="space-y-6">
      <SkinCard skin={skin} />
      <StatsCard stats={stats} />
      <NextActivity activity={activity} />
      <SkillsList skills={skills} />
      <NextMilestone milestone={milestone} />
    </div>
  );
}
