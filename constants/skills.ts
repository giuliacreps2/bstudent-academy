// constants/skills.ts
import {
  BookOpenIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import type {
  SkillKey,
  SkillColor,
  SkillMeta,
  SkillColorStyle,
} from "@/types/skills";

// Unica fonte di verità: label, colore e icona di ogni skill.
export const skillsMeta: Record<SkillKey, SkillMeta> = {
  grammatica: {
    key: "grammatica",
    label: "Grammatica",
    color: "pink",
    icon: BookOpenIcon,
  },
  lessico: {
    key: "lessico",
    label: "Lessico",
    color: "green",
    icon: SparklesIcon,
  },
  analisi: {
    key: "analisi",
    label: "Analisi",
    color: "purple",
    icon: MagnifyingGlassIcon,
  },
  traduzione: {
    key: "traduzione",
    label: "Traduzione",
    color: "orange",
    icon: ArrowsRightLeftIcon,
  },
};

export const skillColorStyles: Record<SkillColor, SkillColorStyle> = {
  pink: {
    iconBg: "bg-pink-50",
    iconText: "text-pink-600",
    bar: "bg-pink-500",
    btn: "bg-pink-50 text-pink-700 hover:bg-pink-100",
    badgeBg: "bg-pink-50",
    badgeText: "text-pink-700",
  },
  green: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    bar: "bg-emerald-500",
    btn: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
  },
  purple: {
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    bar: "bg-violet-500",
    btn: "bg-violet-50 text-violet-700 hover:bg-violet-100",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
  },
  orange: {
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    bar: "bg-amber-400",
    btn: "bg-amber-50 text-amber-700 hover:bg-amber-100",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
  },
};
