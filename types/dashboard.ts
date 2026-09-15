export type Gender = "M" | "F";

export interface DashboardUser {
  firstName: string;
  gender: Gender;
}

export interface LastCourse {
  title: string;
  slug: string;
  progress: number; // 0-100
}

export interface DashboardData {
  user: DashboardUser;
  hasStartedCourse: boolean;
  lastCourse?: LastCourse;
}

export interface SkinData {
  skin: string;
  imageUrl: string;
  name: string;
  bonuses: SkinBonus[];
}

export interface SkinBonus {
  label: string;
  value: string;
  bonuses: SkinBonus[];
}

export interface StatsData {
  stats: number;
  level: number;
  currentXp: number;
  maxXp: number;
  xp: number;
  streak: number;
}
