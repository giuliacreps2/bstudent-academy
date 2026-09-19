"use client";

import { CheckIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import type { MissionMapNode } from "@/types/missions";

const statusRing: Record<MissionMapNode["status"], string> = {
  completed: "bg-brand-success ring-4 ring-white/70",
  current:
    "bg-brand-primary ring-4 ring-white/80 shadow-[0_0_0_6px_rgba(49,85,217,0.25)] animate-pulse",
  locked: "bg-[#3a4256] ring-4 ring-white/40",
};

export function MissionNode({
  mission,
  isSelected,
  onSelect,
}: {
  mission: MissionMapNode;
  isSelected: boolean;
  onSelect: (mission: MissionMapNode) => void;
}) {
  const isLocked = mission.status === "locked";
  const isFinal = mission.type === "final";

  return (
    <button
      type="button"
      onClick={() => onSelect(mission)}
      disabled={isLocked}
      aria-pressed={isSelected}
      aria-label={mission.title}
      className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 disabled:cursor-not-allowed"
      style={{ left: `${mission.position.x}%`, top: `${mission.position.y}%` }}
    >
      {/* LABEL — emerge solo al click/selezione della tappa */}
      <span
        className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold shadow-md backdrop-blur-sm transition-all ${
          isSelected
            ? "scale-100 opacity-100 border-brand-primary bg-white text-brand-primary"
            : "pointer-events-none scale-95 opacity-0 border-white/70 bg-white/95 text-foreground group-hover:scale-100 group-hover:opacity-100"
        }`}
      >
        {mission.order}. {mission.title}
      </span>

      {/* MARKER */}
      <span
        className={`flex items-center justify-center rounded-full text-white shadow-lg transition-transform group-hover:scale-105 ${
          isFinal ? "h-14 w-14 text-xl" : "h-11 w-11"
        } ${statusRing[mission.status]}`}
      >
        {isFinal ? (
          <span aria-hidden="true">🏛</span>
        ) : mission.status === "completed" ? (
          <CheckIcon className="h-5 w-5" />
        ) : mission.status === "current" ? (
          <StarIcon className="h-5 w-5" />
        ) : (
          <LockClosedIcon className="h-4 w-4" />
        )}
      </span>
    </button>
  );
}
