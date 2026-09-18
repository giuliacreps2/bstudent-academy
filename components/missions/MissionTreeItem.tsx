import Link from "next/link";
import { CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import type { MissionTreeItemData } from "@/types/missions";

export function MissionTreeItem({ mission }: { mission: MissionTreeItemData }) {
  const isLocked = mission.status === "locked";
  const isActive = mission.status === "active";

  const content = (
    <div
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
        isActive
          ? "bg-[#e8f2ff] text-[#3155d9]"
          : isLocked
            ? "text-[#98a2b3]"
            : "text-[#172033] hover:bg-[#f7f9fc]"
      }`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
        {mission.status === "completed" ? (
          <CheckCircleIcon className="h-5 w-5 text-brand-success" />
        ) : (
          mission.number
        )}
      </span>
      <span className="flex-1 text-sm font-semibold">{mission.title}</span>
      {isLocked && <LockClosedIcon className="h-4 w-4 shrink-0" />}
    </div>
  );

  if (isLocked) {
    return <div className="cursor-not-allowed opacity-70">{content}</div>;
  }

  return (
    <Link href={mission.href} className="block">
      {content}
    </Link>
  );
}
