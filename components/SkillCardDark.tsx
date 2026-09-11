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

const colorStyles: Record<
  SkillColor,
  {
    icon: string;
    bar: string;
    badge: string;
    glow: string;
  }
> = {
  blue: {
    icon: "bg-blue-500",
    bar: "bg-blue-400",
    badge: "text-blue-300",
    glow: "shadow-blue-500/20",
  },

  green: {
    icon: "bg-emerald-500",
    bar: "bg-emerald-400",
    badge: "text-emerald-300",
    glow: "shadow-emerald-500/20",
  },

  purple: {
    icon: "bg-fuchsia-500",
    bar: "bg-fuchsia-400",
    badge: "text-fuchsia-300",
    glow: "shadow-fuchsia-500/20",
  },

  orange: {
    icon: "bg-amber-500",
    bar: "bg-amber-400",
    badge: "text-amber-300",
    glow: "shadow-amber-500/20",
  },

  pink: {
    icon: "bg-pink-500",
    bar: "bg-pink-400",
    badge: "text-pink-300",
    glow: "shadow-pink-500/20",
  },

  teal: {
    icon: "bg-teal-500",
    bar: "bg-teal-400",
    badge: "text-teal-300",
    glow: "shadow-teal-500/20",
  },
};

export interface Skill {
  id: string | number;
  icon: SkillIconKey;
  color: SkillColor;
  label: string;
  percentage: number;
  trend?: number;
}

interface SkillCardDarkProps {
  skill: Skill;

  /**
   * Valore originale della skill.
   * Se diverso da skill.percentage,
   * mostriamo il bonus della skin.
   */
  basePercentage?: number;
}

export function SkillCardDark({ skill, basePercentage }: SkillCardDarkProps) {
  const styles = colorStyles[skill.color];
  const Icon = iconMap[skill.icon];

  const hasBonus =
    basePercentage !== undefined && skill.percentage > basePercentage;

  const bonus = hasBonus ? skill.percentage - basePercentage : 0;

  return (
    <div
      className={`
        group
        rounded-2xl
        border
        border-white/10
        bg-white/[0.06]
        px-4
        py-4
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-white/[0.09]
        ${hasBonus ? `shadow-lg ${styles.glow}` : ""}
      `}
    >
      {/* HEADER */}

      <div className="flex items-center gap-2.5">
        <span
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${styles.icon}
          `}
        >
          <Icon className="h-4 w-4 text-white" strokeWidth={2} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {skill.label}
          </p>

          {hasBonus && (
            <p className={`mt-0.5 text-[10px] font-bold ${styles.badge}`}>
              BONUS SKIN +{bonus}%
            </p>
          )}
        </div>

        <div className="text-right">
          <span className="text-sm font-extrabold text-white">
            {skill.percentage}%
          </span>

          {hasBonus && (
            <span className="ml-1 text-[10px] text-white/30">↑</span>
          )}
        </div>
      </div>

      {/* PROGRESS */}

      <div className="mt-3">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className={`
              h-full
              rounded-full
              ${styles.bar}
              transition-all
              duration-700
              ease-out
            `}
            style={{
              width: `${skill.percentage}%`,
            }}
          />
        </div>

        {/* BASE → BONUS */}

        {hasBonus && basePercentage !== undefined && (
          <div className="mt-1.5 flex justify-between text-[10px]">
            <span className="text-white/30">Base {basePercentage}%</span>

            <span className={`font-bold ${styles.badge}`}>+{bonus}% skin</span>
          </div>
        )}

        {!hasBonus && skill.trend !== undefined && (
          <div className="mt-1.5 text-right">
            <span className={`text-[10px] font-semibold ${styles.badge}`}>
              +{skill.trend}% questa settimana
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
