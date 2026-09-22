import type { ComponentType, SVGProps } from "react";

export type BlogCategoryKey =
  | "studio"
  | "latino"
  | "greco"
  | "curiosita"
  | "metodo"
  | "vita-da-studente";

export type BlogColor =
  | "coral"
  | "amber"
  | "blue"
  | "violet"
  | "pink"
  | "green";

export interface BlogCategoryMeta {
  key: BlogCategoryKey;
  label: string;
  color: BlogColor;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface BlogCategoryColorStyle {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  iconText: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  category: BlogCategoryKey;
  title: string;
  excerpt: string;
  image: string;
  readingMinutes: number;
  href: string;
}
