import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import type { CourseNotebookSummary } from "@/types/myCourses";

export function CourseNotebookSection({
  notebook,
}: {
  notebook: CourseNotebookSummary;
}) {
  return (
    <div className="rounded-lg bg-surface border border-border p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-surface-blue flex items-center justify-center shrink-0">
          <BookOpenIcon className="w-5 h-5 text-brand-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Il tuo quaderno</h3>
          <p className="text-sm text-brand-muted mt-0.5">
            Tutto ciò che impari durante il viaggio rimane con te.
          </p>
        </div>
      </div>

      {notebook.lastDiscovery && (
        <div className="rounded-lg bg-surface-blue p-4 mb-4">
          <p className="text-[10px] font-semibold tracking-widest text-brand-primary uppercase mb-1">
            Ultima scoperta
          </p>
          <p className="text-sm font-semibold text-foreground">
            {notebook.lastDiscovery.topic}
          </p>
          <p className="text-xs text-brand-muted mt-0.5">
            {notebook.lastDiscovery.missionLabel}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-brand-muted">
          <span className="font-semibold text-foreground">
            {notebook.totalTopics}
          </span>{" "}
          argomenti raccolti
        </p>
        <Link
          href={notebook.href}
          className="text-sm font-medium text-brand-primary hover:underline"
        >
          Apri →
        </Link>
      </div>
    </div>
  );
}
