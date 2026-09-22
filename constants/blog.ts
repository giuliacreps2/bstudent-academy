import {
  BookOpenIcon,
  StarIcon,
  BuildingLibraryIcon,
  LightBulbIcon,
  TrophyIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import type {
  BlogCategoryKey,
  BlogColor,
  BlogCategoryMeta,
  BlogCategoryColorStyle,
} from "@/types/blog";

// Unica fonte di verità: label, colore e icona di ogni categoria del blog.
export const blogCategoriesMeta: Record<BlogCategoryKey, BlogCategoryMeta> = {
  studio: {
    key: "studio",
    label: "Studio",
    color: "coral",
    icon: BookOpenIcon,
  },
  latino: {
    key: "latino",
    label: "Latino",
    color: "amber",
    icon: StarIcon,
  },
  greco: {
    key: "greco",
    label: "Greco",
    color: "blue",
    icon: BuildingLibraryIcon,
  },
  curiosita: {
    key: "curiosita",
    label: "Curiosità",
    color: "violet",
    icon: LightBulbIcon,
  },
  metodo: {
    key: "metodo",
    label: "Metodo",
    color: "pink",
    icon: TrophyIcon,
  },
  "vita-da-studente": {
    key: "vita-da-studente",
    label: "Vita da studente",
    color: "green",
    icon: AcademicCapIcon,
  },
};

export const blogColorStyles: Record<BlogColor, BlogCategoryColorStyle> = {
  coral: {
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    badgeBorder: "border-rose-200",
    iconText: "text-brand-coral",
  },
  amber: {
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badgeBorder: "border-amber-200",
    iconText: "text-amber-600",
  },
  blue: {
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    badgeBorder: "border-sky-200",
    iconText: "text-brand-primary",
  },
  violet: {
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    badgeBorder: "border-violet-200",
    iconText: "text-violet-600",
  },
  pink: {
    badgeBg: "bg-pink-50",
    badgeText: "text-pink-700",
    badgeBorder: "border-pink-200",
    iconText: "text-brand-secondary",
  },
  green: {
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    iconText: "text-brand-green",
  },
};

// Ordine di visualizzazione delle pillole filtro (dopo "Tutti").
export const blogCategoryOrder: BlogCategoryKey[] = [
  "studio",
  "latino",
  "greco",
  "curiosita",
  "metodo",
  "vita-da-studente",
];
