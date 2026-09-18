import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import { MissionBreadcrumb } from "./MissionBreadcrumb";
import { MissionBonusesBar } from "./MissionBonusesBar";
import { MissionCharacterMini } from "./MissionCharacterMini";
import type {
  MissionBonusCounter,
  MissionCharacterData,
} from "@/types/missions";

interface MissionTopBarProps {
  breadcrumb: { label: string; href?: string }[];
  bonuses: MissionBonusCounter[];
  character: MissionCharacterData;
}

export function MissionTopBar({
  breadcrumb,
  bonuses,
  character,
}: MissionTopBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-b from-black/50 to-transparent px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/my/dashboard"
          aria-label="Torna alla dashboard"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <HomeIcon className="h-5 w-5 text-white" />
        </Link>
        <MissionBreadcrumb items={breadcrumb} />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <MissionBonusesBar bonuses={bonuses} />
        <MissionCharacterMini character={character} />
      </div>
    </div>
  );
}
