import type { ComponentType, SVGProps } from "react";
import {
  AcademicCapIcon,
  FireIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export type StepColor = "blue" | "green" | "purple" | "amber" | "pink";
export type StepIconKey = "impara" | "allenati" | "feedback" | "xp" | "skill";

const iconMap: Record<StepIconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  impara: AcademicCapIcon,
  allenati: FireIcon,
  feedback: ChatBubbleLeftRightIcon,
  xp: StarIcon,
  skill: ArrowTrendingUpIcon,
};

const colorStyles: Record<StepColor, string> = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  purple: "bg-violet-500",
  amber: "bg-amber-500",
  pink: "bg-pink-500",
};

export interface Step {
  id: string | number;
  number: number;
  icon: StepIconKey;
  color: StepColor;
  title: string;
  description: string;
}

export function StepListItem({ step }: { step: Step }) {
  const Icon = iconMap[step.icon];

  return (
    <div className="flex items-start gap-4">
      <span
        className={`relative flex items-center justify-center w-9 h-9 rounded-full text-white shrink-0 ${colorStyles[step.color]}`}
      >
        <Icon width={16} height={16} />
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-white text-[9px] font-bold text-heading border border-neutral-200">
          {step.number}
        </span>
      </span>

      <div>
        <p className="font-semibold text-heading text-sm">{step.title}</p>
        <p className="text-fg-secondary text-xs leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
