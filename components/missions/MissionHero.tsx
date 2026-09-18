import Image from "next/image";
import { MissionRibbon } from "./MissionRibbon";
import { MissionStartButton } from "./MissionStartButton";
import type { MissionHeroData } from "@/types/missions";
import { MissionActionsRow } from "./MissionActionsRow";

import type { MissionCourseTree } from "@/types/missions";

interface MissionHeroProps {
  hero: MissionHeroData;
  startHref: string;
  courseTree: MissionCourseTree;
}

export function MissionHero({ hero, startHref, courseTree }: MissionHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[28px] min-h-100 sm:min-h-110">
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0e2e]/70 via-[#0a0e2e]/10 to-[#0a0e2e]/0" />
      <Image
        src={hero.imageUrl}
        alt=""
        fill
        priority
        className="object-contain"
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
        <div>
          <MissionRibbon number={hero.missionNumber} />
          <h1 className="mt-4 max-w-lg text-3xl sm:text-4xl font-extrabold leading-[1.05] text-white">
            {hero.title}
          </h1>
          <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-white/80">
            {hero.description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="hidden sm:block">
            {" "}
            <MissionStartButton href={startHref} variant="inline" />
          </div>
          <div className="hidden sm:block ml-auto">
            <MissionActionsRow
              startHref={startHref}
              courseTree={courseTree}
              variant="inline"
            />
          </div>
        </div>
      </div>

      {/* Su mobile la CTA diventa sticky in fondo allo schermo */}
      <MissionStartButton href={startHref} variant="sticky" />
    </div>
  );
}
