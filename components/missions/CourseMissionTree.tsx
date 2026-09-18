import { MissionTreeItem } from "./MissionTreeItem";
import type { MissionCourseTree } from "@/types/missions";

export function CourseMissionTree({ tree }: { tree: MissionCourseTree }) {
  return (
    <div className="space-y-1">
      {tree.missions.map((mission) => (
        <MissionTreeItem key={mission.id} mission={mission} />
      ))}
    </div>
  );
}
