import type { SkillKey } from "./skills";
import type { SkinBonus } from "./dashboard";

export interface SkillOption {
  id: SkillKey;
  description: string;
  current: number;
  max: number;
  href: string;
}

export type ActivityStatus = "completed" | "in_progress" | "retry";

export interface ActivityData {
  id: string;
  title: string;
  thumbnail: string;
  skill: SkillKey;
  status: ActivityStatus;
  date: string;
  score: { current: number; max: number };
  href: string;
}

export interface ExerciseSuggestion {
  id: string;
  title: string;
  skill: SkillKey;
  durationMinutes: number;
  thumbnail: string;
  href: string;
}

export interface DailyChallengeData {
  completedSteps: number;
  totalSteps: number;
  rewardLabel: string;
  href: string;
}

export interface CharacterData {
  name: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  maxXp: number;
  quote: string;
  minXpToCustomize: number;
}

export interface ExercisesPageData {
  skills: SkillOption[];
  exercisePool: ExerciseSuggestion[];
  resumeActivities: ActivityData[];
  dailyChallenge: DailyChallengeData;
  character: CharacterData;
  streak: number;
  bonuses: SkinBonus[];
}
