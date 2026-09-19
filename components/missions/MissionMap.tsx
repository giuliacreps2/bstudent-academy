"use client";

import { useState } from "react";
import { MissionWorld } from "./MissionWorld";
import { MissionPath } from "./MissionPath";
import { MissionNode } from "./MissionNode";
import { MissionTopBar } from "./MissionTopBar";
import { MissionSidebar } from "./MissionSidebar";
import { MissionMobileToolbar } from "./MissionMobileToolbar";
import { MissionBottomSheet } from "./MissionBottomSheet";
import type { MissionMapData, MissionMapNode } from "@/types/missions";

export function MissionMap({ data }: { data: MissionMapData }) {
  const { world, course, missions, dashboardHref, skin, stats } = data;

  const defaultMission =
    missions.find((m) => m.status === "current") ?? missions[0] ?? null;

  const [selectedMission, setSelectedMission] = useState<MissionMapNode | null>(
    defaultMission,
  );

  function handleSelect(mission: MissionMapNode) {
    setSelectedMission((current) =>
      current?.id === mission.id ? null : mission,
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0e2e]">
      <MissionTopBar
        backHref={course.backHref}
        dashboardHref={dashboardHref}
        skin={skin}
        stats={stats}
      />

      {/* Unico scenario: mappa + dettagli appoggiati sopra lo stesso world */}
      <MissionWorld world={world}>
        {/* Percorso: tutta larghezza su mobile, 60% a sinistra su desktop */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[60%]">
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

        {/* Desktop: nessuna sidebar con sfondo proprio.
            Le singole card sono semplicemente appoggiate sopra la mappa. */}
        <div className="relative z-20 ml-auto hidden w-[40%] p-6 lg:block xl:p-8">
          <MissionSidebar
            course={course}
            missions={missions}
            selectedMission={selectedMission}
          />
        </div>

        <MissionMobileToolbar
          skin={skin}
          stats={stats}
          selectedMission={selectedMission}
        />
      </MissionWorld>

      {/* Mobile invariato: scheda sintetica in basso */}
      {selectedMission && <MissionBottomSheet mission={selectedMission} />}
    </div>
  );
}
