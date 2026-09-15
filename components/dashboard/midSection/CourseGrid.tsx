import { CourseCard } from "./CourseCard";
import type { CourseData } from "@/types/dashboard";

export function CourseGrid({ courses }: { courses: CourseData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}
