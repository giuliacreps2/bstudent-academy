import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { MissionMapCourse, MissionMapNode } from "@/types/missions";

export function MissionMapHeader({
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
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-4 sm:p-6">
      <div className="card-papyrus pointer-events-auto max-w-xl flex-1 px-5 py-4 sm:px-7">
        <p
          className="text-xs font-bold uppercase tracking-[0.14em]"
          style={{ color: "var(--texture-papyrus-ink-muted)" }}
        >
          {course.category}
        </p>
        <h1
          className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl"
          style={{ color: "var(--texture-papyrus-ink)" }}
        >
          {course.title}
        </h1>
        <p
          className="mt-1 text-xs italic sm:text-sm"
          style={{ color: "var(--texture-papyrus-ink-muted)" }}
        >
          "{course.quote}" — {course.quoteAuthor}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-brand-primary transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span
            className="shrink-0 text-xs font-bold"
            style={{ color: "var(--texture-papyrus-ink)" }}
          >
            {completed} / {total} missioni
          </span>
        </div>
      </div>

      <Link
        href={course.backHref}
        className="btn-secondary pointer-events-auto shrink-0 bg-white/95 px-4 py-2.5 text-sm shadow-md backdrop-blur-sm"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Torna al corso
      </Link>
    </div>
  );
}
