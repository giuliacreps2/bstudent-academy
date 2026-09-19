"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Modal } from "@/components/ui/Modal";
import { MissionSkillRewards, MissionRules } from "./MissionDetailsPanel";
import type { SkinData, StatsData } from "@/types/dashboard";
import type { MissionMapNode } from "@/types/missions";

type MobileModal = "skin" | "rules" | "skills" | null;

export function MissionMobileToolbar({
  skin,
  stats,
  selectedMission,
}: {
  skin: SkinData;
  stats: StatsData;
  selectedMission: MissionMapNode | null;
}) {
  const [open, setOpen] = useState<MobileModal>(null);
  const percent = Math.min(
    100,
    Math.round((stats.currentXp / stats.maxXp) * 100),
  );

  return (
    <div className="absolute left-3 top-16 z-20 flex flex-col gap-2 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen("skin")}
        aria-label="Bonus e skin"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-md"
      >
        <Image
          src={skin.imageUrl}
          alt=""
          width={26}
          height={26}
          className="h-6.5 w-6.5 rounded-full object-cover"
        />
      </button>

      <button
        type="button"
        onClick={() => setOpen("rules")}
        disabled={!selectedMission}
        aria-label="Dettagli tecnici della missione"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-md disabled:opacity-40"
      >
        <ClipboardDocumentListIcon className="h-5 w-5 text-brand-primary" />
      </button>

      <button
        type="button"
        onClick={() => setOpen("skills")}
        disabled={!selectedMission}
        aria-label="Skill e bonus della missione"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-md disabled:opacity-40"
      >
        <SparklesIcon className="h-5 w-5 text-brand-primary" />
      </button>

      {/* BONUS + SKIN */}
      <Modal
        open={open === "skin"}
        onClose={() => setOpen(null)}
        eyebrow="BStudent"
        title="Bonus e skin"
      >
        <div className="flex items-center gap-4">
          <Image
            src={skin.imageUrl}
            alt={skin.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-[#172033] flex items-center gap-1.5">
              <span className="text-[#3155d9]">★</span> {skin.name}
            </p>
            <ul className="mt-1 text-sm text-[#667085] space-y-0.5">
              {skin.bonuses.map((bonus) => (
                <li key={bonus.label}>
                  {bonus.value} {bonus.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-sm font-bold text-[#172033]">
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon className="h-4 w-4 text-[#3155d9]" />
              Livello {stats.level}
            </span>
            <span>
              {stats.currentXp} / {stats.maxXp} XP
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#e5eaf2]">
            <div
              className="h-full rounded-full bg-[#3155d9]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </Modal>

      {/* DETTAGLI TECNICI */}
      <Modal
        open={open === "rules"}
        onClose={() => setOpen(null)}
        eyebrow="BStudent"
        title="Dettagli della missione"
      >
        {selectedMission && <MissionRules mission={selectedMission} />}
      </Modal>

      {/* SKILL E BONUS */}
      <Modal
        open={open === "skills"}
        onClose={() => setOpen(null)}
        eyebrow="BStudent"
        title="Skill allenate in questa missione"
      >
        {selectedMission && <MissionSkillRewards mission={selectedMission} />}
      </Modal>
    </div>
  );
}
