import {
  FlagIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import type { MissionObjectiveData } from "@/types/missions";

export function MissionObjectiveCard({
  objective,
}: {
  objective: MissionObjectiveData;
}) {
  const stats = [
    {
      icon: ClockIcon,
      label: "Tempo limite",
      value: `${objective.timeLimitMinutes} min`,
    },
    {
      icon: StarIcon,
      label: "Punteggio minimo",
      value: `${objective.minScore} pti`,
    },
    { icon: HeartIcon, label: "Vite", value: objective.lives },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-orange-300 p-4">
      <div className="flex items-start gap-2 mb-3">
        <FlagIcon className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
        <p className="text-sm font-bold text-white">Obiettivo della missione</p>
      </div>
      <p className="text-xs leading-5 text-white/60 mb-4">
        {objective.description}
      </p>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <stat.icon className="h-4 w-4 text-white/40 mx-auto mb-1" />
            <p className="text-sm font-extrabold text-white">{stat.value}</p>
            <p className="text-[10px] text-white/40 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
