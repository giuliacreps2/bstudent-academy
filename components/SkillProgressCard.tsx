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

const colorStyles: Record<SkillColor, { icon: string; bar: string }> = {
  blue: { icon: "bg-blue-500", bar: "bg-blue-500" },
  green: { icon: "bg-emerald-500", bar: "bg-emerald-500" },
  purple: { icon: "bg-violet-500", bar: "bg-violet-500" },
  orange: { icon: "bg-amber-500", bar: "bg-amber-500" },
  pink: { icon: "bg-pink-500", bar: "bg-pink-500" },
  teal: { icon: "bg-teal-500", bar: "bg-teal-500" },
};

export interface Skill {
  id: string | number;
  icon: SkillIconKey;
  color: SkillColor;
  label: string;
  percentage: number;
}

export function SkillProgressCard({ skill }: { skill: Skill }) {
  const styles = colorStyles[skill.color];
  const Icon = iconMap[skill.icon];

  return (
    <div className="bg-white rounded-2xl shadow-sm px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full text-white shrink-0 ${styles.icon}`}
        >
          <Icon width={14} height={14} />
        </span>
        <span className="font-medium text-heading text-sm">{skill.label}</span>
        <span className="ml-auto text-xs text-fg-secondary shrink-0">
          {skill.percentage}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${styles.bar}`}
          style={{ width: `${skill.percentage}%` }}
        />
      </div>
    </div>
  );
}
