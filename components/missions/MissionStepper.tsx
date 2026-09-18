import { MissionStepperItem } from "./MissionStepperItem";
import type { MissionStepData } from "@/types/missions";

export function MissionStepper({ steps }: { steps: MissionStepData[] }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:justify-center sm:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {steps.map((step) => (
        <MissionStepperItem key={step.id} step={step} />
      ))}
    </div>
  );
}
