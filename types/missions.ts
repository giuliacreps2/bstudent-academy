import type { SkillKey } from "./skills";
import type { SkinData, StatsData } from "@/types/dashboard";

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

export type MissionStatus = "completed" | "current" | "locked";
export type MissionType = "normal" | "final";

export interface MissionMapPosition {
  /** Percentuale orizzontale (0-100) rispetto allo scenario */
  x: number;
  /** Percentuale verticale (0-100) rispetto allo scenario */
  y: number;
}

export interface MissionSkillReward {
  label: string; // es. "Grammatica"
  xp: number;
  icon: "grammatica" | "lessico" | "traduzione" | "analisi";
}

export interface MissionMapNode {
  id: string;
  order: number;
  title: string;
  tagline: string; // es. "La forza delle circostanze."
  description: string;
  position: MissionMapPosition;
  status: MissionStatus;
  type: MissionType;
  skillRewards: MissionSkillReward[];
  rewardLabel: string; // es. "Elmo di Bronzo"
  durationMinutes: number;
  maxErrors: number;
  prepReadingHref?: string;
  prepVideoHref?: string;
  /** Breve checklist "Cosa imparerai" mostrata nel pannello di dettaglio */
  objectives?: string[];
  coverImageUrl: string;
  href: string;
}

export interface CourseWorld {
  id: string;
  name: string;
  backgroundDesktop: string;
  backgroundMobile: string;
  theme: "roman-city" | "greek-temple" | "library";
}

export interface MissionMapCourse {
  slug: string;
  category: string;
  title: string;
  quote: string;
  quoteAuthor: string;
  backHref: string;
}

export interface StudentSkillLevel {
  label: string;
  current: number;
  max: number;
}

export interface MissionMapData {
  world: CourseWorld;
  course: MissionMapCourse;
  missions: MissionMapNode[];
  studentSkills: StudentSkillLevel[];
  /** Link al bottone "casa" della navbar — riporta lo studente in dashboard */
  dashboardHref: string;
  /** Skin + XP/streak/livello già usati in dashboard, richiamati nella navbar */
  skin: SkinData;
  stats: StatsData;
}
