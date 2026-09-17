import { CharacterCard, type CharacterCardProps } from "./CharacterCard";
import { BonusStreakCard } from "./BonusStreakCard";
import { ToolboxCard } from "./ToolboxCard";
import { HelpCard } from "./HelpCard";
import type { SkinBonus } from "@/types/dashboard";

interface ExercisesRightColumnProps {
  character: CharacterCardProps;
  streak: number;
  bonuses: SkinBonus[];
}

export function ExercisesRightColumn({
  character,
  streak,
  bonuses,
}: ExercisesRightColumnProps) {
  return (
    <div className="space-y-6">
      <CharacterCard {...character} />
      <BonusStreakCard streak={streak} bonuses={bonuses} />
      <ToolboxCard />
      <HelpCard />
    </div>
  );
}
