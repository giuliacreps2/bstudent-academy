import type { SkillKey } from "./skills";

export type MissionStatus = "completed" | "active" | "locked";

export interface MissionTreeItemData {
  id: string;
  number: number;
  title: string;
  status: MissionStatus;
  href: string;
}

export interface MissionCourseTree {
  courseName: string;
  missions: MissionTreeItemData[];
}

export interface MissionBonusCounter {
  id: "energy" | "scrolls";
  icon: "bolt" | "scroll";
  value: number;
}

export interface MissionCharacterData {
  name: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  maxXp: number;
}

export interface MissionObjectiveData {
  description: string;
  timeLimitMinutes: number;
  minScore: number;
  lives: number;
}

export interface MissionRewardXp {
  skill: SkillKey;
  xp: number;
}

export interface MissionRewardsData {
  xpRewards: MissionRewardXp[];
  skinAccessory?: {
    name: string;
    imageUrl: string;
  };
}

export interface MissionLeaderboardData {
  unlocked: boolean;
  unlockHint: string;
}

export type MissionStepStatus = "done" | "current" | "upcoming";
export type MissionStepId =
  | "briefing"
  | "sfide"
  | "prova-finale"
  | "ricompensa";

export interface MissionStepData {
  id: MissionStepId;
  label: string;
  status: MissionStepStatus;
}

export interface MissionHeroData {
  imageUrl: string;
  missionNumber: number;
  title: string;
  description: string;
}

export interface MissionPageData {
  breadcrumb: { label: string; href?: string }[];
  bonuses: MissionBonusCounter[];
  character: MissionCharacterData;
  hero: MissionHeroData;
  objective: MissionObjectiveData;
  skills: SkillKey[];
  rewards: MissionRewardsData;
  leaderboard: MissionLeaderboardData;
  steps: MissionStepData[];
  courseTree: MissionCourseTree;
  startHref: string;
}
