"use client";

import { useState } from "react";
import Image from "next/image";
import { MissionPath } from "@/components/missions/MissionPath";
import { MissionNode } from "@/components/missions/MissionNode";
import { CourseMissionDetails } from "./CourseMissionDetails";
import type { CourseWorld, MissionMapNode } from "@/types/missions";

interface CourseMissionSectionProps {
  world: CourseWorld;
  missions: MissionMapNode[];
  notebookHref: string;
}

export function CourseMissionSection({
  world,
  missions,
  notebookHref,
}: CourseMissionSectionProps) {
  const defaultMission =
    missions.find((mission) => mission.status === "current") ??
    missions[0] ??
    null;

  const [selectedMission, setSelectedMission] = useState<MissionMapNode | null>(
    defaultMission,
  );

  function handleSelect(mission: MissionMapNode) {
    setSelectedMission((current) =>
      current?.id === mission.id ? current : mission,
    );
  }

  return (
    <div className="rounded-3xl overflow-hidden border border-border lg:grid lg:grid-cols-[3fr_2fr]">
      {/* MAPPA — stesso modello (MissionPath + MissionNode) della mappa immersiva,
          solo racchiuso in un'area più piccola invece che a tutta pagina. */}
      <div className="relative h-80 sm:h-96 lg:h-auto lg:min-h-110">
        <Image
          src={world.backgroundDesktop}
          alt=""
          fill
          className="hidden object-cover sm:block"
        />
        <Image
          src={world.backgroundMobile}
          alt=""
          fill
          className="object-cover sm:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

        <div className="relative z-10 p-5 sm:p-6 max-w-xs">
          <p className="text-xs font-extrabold uppercase tracking-widest text-white/85">
            Il tuo viaggio
          </p>
          <p className="mt-1 text-sm text-white/70">
            Dalle basi alla padronanza. Scopri cosa ti aspetta.
          </p>
        </div>

        <div className="absolute inset-0">
          <MissionPath missions={missions} />
          {missions.map((mission) => (
            <MissionNode
              key={mission.id}
              mission={mission}
              isSelected={selectedMission?.id === mission.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* PROSSIMA TAPPA */}
      <div className="bg-surface p-5 sm:p-6">
        {selectedMission ? (
          <CourseMissionDetails
            mission={selectedMission}
            notebookHref={notebookHref}
          />
        ) : (
          <p className="text-sm text-brand-muted">
            Seleziona una tappa sulla mappa per vederne i dettagli.
          </p>
        )}
      </div>
    </div>
  );
}
