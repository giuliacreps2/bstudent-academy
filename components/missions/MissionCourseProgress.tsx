import type { MissionMapCourse, MissionMapNode } from "@/types/missions";

export function MissionCourseProgress({
  course,
  missions,
}: {
  course: MissionMapCourse;
  missions: MissionMapNode[];
}) {
  const completed = missions.filter((m) => m.status === "completed").length;
  const total = missions.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
        {course.category}
      </p>
      <h1 className="mt-1 text-xl font-extrabold text-foreground">
        {course.title}
      </h1>

      <div className="mt-4 rounded-lg border border-border bg-surface p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-brand-muted">
            Avanzamento corso
          </span>
          <span className="text-xs font-bold text-foreground">
            {completed} / {total} missioni
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-pill bg-surface-blue">
          <div
            className="h-full rounded-pill bg-brand-primary transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
