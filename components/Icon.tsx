import type { ComponentType, SVGProps } from "react";
import {
  PlayCircleIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  ViewfinderCircleIcon,
  StarIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export type IconKey =
  | "video"
  | "appunti"
  | "versioni"
  | "esercizi"
  | "punti"
  | "progressi"
  | "community";

export type IconColor =
  | "purple"
  | "green"
  | "pink"
  | "orange"
  | "blue"
  | "teal";

const iconMap: Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  video: PlayCircleIcon,
  appunti: DocumentTextIcon,
  versioni: PencilSquareIcon,
  esercizi: ViewfinderCircleIcon,
  punti: StarIcon,
  progressi: ChartBarIcon,
  community: UserGroupIcon,
};

const colorStyles: Record<IconColor, string> = {
  purple: "bg-violet-100 text-violet-600",
  green: "bg-emerald-100 text-emerald-600",
  pink: "bg-pink-100 text-pink-600",
  orange: "bg-amber-100 text-amber-600",
  blue: "bg-sky-100 text-sky-600",
  teal: "bg-teal-100 text-teal-600",
};

export interface FeatureIcon {
  id: string | number;
  icon: IconKey;
  color: IconColor;
  title: string;
  subtitle: string;
  href: string;
}

export function IconSection({ item }: { item: FeatureIcon }) {
  const Icon = iconMap[item.icon];

  return (
    <a
      href={item.href}
      className="flex flex-col items-center text-center gap-2 px-6 shrink-0 w-32"
    >
      <span
        className={`flex items-center justify-center w-12 h-12 rounded-full ${colorStyles[item.color]}`}
      >
        <Icon width={22} height={22} />
      </span>
      <p className="font-semibold text-heading text-sm">{item.title}</p>
      <p className="text-fg-secondary text-xs">{item.subtitle}</p>
    </a>
  );
}
