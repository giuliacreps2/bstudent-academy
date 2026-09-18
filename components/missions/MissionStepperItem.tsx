import type { ComponentType, SVGProps } from "react";
import {
  DocumentTextIcon,
  FireIcon,
  TrophyIcon,
  GiftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import type { MissionStepData, MissionStepId } from "@/types/missions";

const iconMap: Record<MissionStepId, ComponentType<SVGProps<SVGSVGElement>>> = {
  briefing: DocumentTextIcon,
  sfide: FireIcon,
  "prova-finale": TrophyIcon,
  ricompensa: GiftIcon,
};

export function MissionStepperItem({ step }: { step: MissionStepData }) {
  const Icon = iconMap[step.id];
  const isDone = step.status === "done";
  const isCurrent = step.status === "current";

  const circleClasses = isDone
    ? "bg-brand-success border-brand-success"
    : isCurrent
      ? "bg-brand-secondary border-brand-secondary"
      : "bg-white/5 border-white/15";

  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0 w-20">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${circleClasses}`}
      >
        {isDone ? (
          <CheckIcon className="h-4 w-4 text-white" />
        ) : (
          <Icon
            className={`h-4 w-4 ${isCurrent ? "text-white" : "text-white/40"}`}
          />
        )}
      </span>
      <span
        className={`text-[11px] font-semibold text-center ${isCurrent ? "text-white" : "text-white/40"}`}
      >
        {step.label}
      </span>
    </div>
  );
}
