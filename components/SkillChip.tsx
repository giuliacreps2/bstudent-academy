import type { ComponentType, SVGProps } from "react";
import {
  BookOpenIcon,
  ArrowsRightLeftIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  SparklesIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";

export type SkillIconKey =
  | "grammatica"
  | "lessico"
  | "traduzione"
  | "analisi"
  | "comprensione"
  | "metodo";

export type SkillColor =
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "pink"
  | "teal";

const iconMap: Record<SkillIconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  grammatica: BookOpenIcon,
  lessico: SparklesIcon,
  traduzione: ArrowsRightLeftIcon,
  analisi: MagnifyingGlassIcon,
  comprensione: PuzzlePieceIcon,
  metodo: Cog6ToothIcon,
};

const iconColors: Record<SkillColor, string> = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  purple: "bg-violet-500",
  orange: "bg-amber-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
};

export interface Skill {
  id: string | number;
  icon: SkillIconKey;
  color: SkillColor;
  label: string;
  percentage: number;
}

export function SkillChip({ skill }: { skill: Skill }) {
  const Icon = iconMap[skill.icon];

  return (
    <div className="flex items-center gap-2 shrink-0 bg-white/5 border border-white/10 rounded-full pl-1.5 pr-3 py-1.5">
      <span
        className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${iconColors[skill.color]}`}
      >
        <Icon className="text-white" width={12} height={12} />
      </span>
      <span className="text-xs font-medium text-white/85">{skill.label}</span>
      <span className="text-xs text-white/40">{skill.percentage}%</span>
    </div>
  );
}
