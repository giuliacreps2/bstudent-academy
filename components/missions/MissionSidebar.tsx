import { MissionBreadcrumb } from "./MissionBreadcrumb";
import { MissionCourseProgress } from "./MissionCourseProgress";
import { MissionDetailsPanel } from "./MissionDetailsPanel";
import type { MissionMapCourse, MissionMapNode } from "@/types/missions";

export function MissionSidebar({
  course,
  missions,
  selectedMission,
}: {
  course: MissionMapCourse;
  missions: MissionMapNode[];
  selectedMission: MissionMapNode | null;
}) {
  return (
    /* Niente h-full, overflow o background:
       è un gruppo di card appoggiate direttamente sullo scenario. */
    <div className="space-y-5">
      <div className="rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-sm">
        <MissionBreadcrumb
          items={[
            { label: "Corsi", href: "/corsi" },
            { label: course.title, href: course.backHref },
            { label: "Missioni" },
          ]}
        />

        <div className="mt-5">
          <MissionCourseProgress course={course} missions={missions} />
        </div>
      </div>

      {selectedMission ? (
        <MissionDetailsPanel mission={selectedMission} />
      ) : (
        <div className="rounded-2xl border border-white/50 bg-white/95 p-6 text-center text-sm text-brand-muted shadow-lg backdrop-blur-sm">
          Seleziona una tappa sulla mappa per vederne i dettagli.
        </div>
      )}
    </div>
  );
}
