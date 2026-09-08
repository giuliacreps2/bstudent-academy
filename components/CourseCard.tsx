import {
  ArrowRightIcon,
  BookOpenIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export type CourseColor = "blue" | "pink" | "green";

const colorStyles: Record<CourseColor, { badge: string }> = {
  blue: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  pink: {
    badge: "bg-pink-50 text-pink-700 border-pink-200",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

export interface Course {
  id: string | number;
  category: string;
  color: CourseColor;
  title: string;
  subtitle: string;
  lessonsCount: number;
  level: string;
  rating: number;
  studentsCount: string;
  image: string;
  href: string;
}

export function CourseCard({ course }: { course: Course }) {
  const styles = colorStyles[course.color];

  return (
    <div className="relative h-full">
      <span
        className={`absolute top-3 left-4 z-10 inline-flex items-center border text-xs font-medium px-3 py-1 rounded-full shadow-sm ${styles.badge}`}
      >
        {course.category}
      </span>

      <div className="bg-neutral-primary-soft rounded-3xl shadow-xl overflow-hidden h-full flex flex-col">
        <a href={course.href}>
          <img
            className="w-full h-40 object-cover"
            src={course.image}
            alt={`Copertina corso di ${course.title}`}
          />
        </a>

        <div className="p-6 flex flex-col flex-1">
          <a href={course.href}>
            <h5 className="text-left mb-1.5 text-2xl font-semibold tracking-tight text-heading">
              {course.title}
            </h5>
          </a>
          <p className="text-left text-fg-secondary mb-4">{course.subtitle}</p>

          <div className="flex items-center gap-4 text-sm text-fg-secondary mb-4">
            <div className="flex items-center gap-1.5">
              <BookOpenIcon width={15} height={15} />
              <span>
                <span className="font-medium text-heading">
                  {course.lessonsCount}
                </span>{" "}
                lezioni
              </span>
            </div>
            <span className="text-fg-secondary">|</span>
            <div className="flex items-center gap-1.5">
              <ChartBarIcon width={15} height={15} />
              <span>
                Livello:{" "}
                <span className="font-medium text-heading">{course.level}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1.5 text-sm">
              <StarIcon className="text-amber-400" width={16} height={16} />
              <span className="font-medium text-heading">{course.rating}</span>
              <span className="text-fg-secondary">
                ({course.studentsCount} studenti)
              </span>
            </div>
            <button
              aria-label={`Vai al corso ${course.title}`}
              className="flex items-center justify-center text-white w-10 h-10 rounded-full font-medium transition-colors bg-brand-primary hover:bg-blue-500"
            >
              <ArrowRightIcon width={15} height={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
