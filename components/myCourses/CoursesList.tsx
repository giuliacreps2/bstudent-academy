import { CourseListCard } from "./CourseListCard";
import type { CourseListItem } from "@/types/myCourses";

export function CoursesList({ courses }: { courses: CourseListItem[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-3">I nostri corsi</h3>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((course) => (
            <CourseListCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-surface-blue p-6 text-center">
          <p className="text-sm font-semibold text-foreground mb-1">
            Nessun corso disponibile per questa materia
          </p>
          <p className="text-sm text-brand-muted">
            Stiamo lavorando per aggiungerne presto.
          </p>
        </div>
      )}
    </div>
  );
}
