import type { ComponentType, SVGProps } from "react";

export type SkillKey = "grammatica" | "lessico" | "analisi" | "traduzione";
export type SkillColor = "pink" | "green" | "purple" | "orange";
export type ActivityStatus = "completed" | "in_progress" | "retry";
export type GoalSelection = SkillKey | "mix";

export interface SkillMeta {
  key: SkillKey;
  label: string;
  color: SkillColor;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface SkillColorStyle {
  iconBg: string;
  iconText: string;
  bar: string;
  btn: string;
  badgeBg: string;
  badgeText: string;
}

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
