import { getMissionData } from "@/lib/missions";
import { MissionTopBar } from "@/components/missions/MissionTopBar";
import { MissionHero } from "@/components/missions/MissionHero";
import { MissionSidePanel } from "@/components/missions/MissionSidePanel";
import { MissionStepper } from "@/components/missions/MissionStepper";

export default async function MissionPage() {
  const data = await getMissionData();

  return (
    <div className=" pb-24 sm:pb-10">
      <MissionTopBar
        breadcrumb={data.breadcrumb}
        bonuses={data.bonuses}
        character={data.character}
      />

      <div className="container-section pt-6">
        {/* Colonne in proporzione aurea (61.8% / 38.2%) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[61.8%_1fr]">
          <MissionHero
            hero={data.hero}
            startHref={data.startHref}
            courseTree={data.courseTree}
          />
          <MissionSidePanel
            objective={data.objective}
            skills={data.skills}
            rewards={data.rewards}
            leaderboard={data.leaderboard}
          />
        </div>

        <div className="mt-6">
          <MissionStepper steps={data.steps} />
        </div>
      </div>
    </div>
  );
}
