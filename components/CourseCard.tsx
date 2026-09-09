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
    <article className="relative h-full">
      {/* CATEGORY */}
      <span
        className={`
          absolute top-4 left-4 z-10
          inline-flex items-center
          px-3 py-1
          rounded-full
          border
          text-xs font-semibold
          ${styles.badge}
        `}
      >
        {course.category}
      </span>

      <div
        className="
          h-full
          flex flex-col
          overflow-hidden
          rounded-[20px]
          bg-surface
          border border-border
          shadow-[0_8px_24px_rgba(23,32,51,0.06)]
          transition-all duration-200
          hover:-translate-y-1
          hover:shadow-[0_14px_32px_rgba(23,32,51,0.10)]
        "
      >
        {/* IMAGE */}
        <a href={course.href}>
          <img
            src={course.image}
            alt={`Copertina corso di ${course.title}`}
            className="
              w-full
              h-40
              object-cover
            "
          />
        </a>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-5">
          <a href={course.href}>
            <h3
              className="
              text-xl
              font-bold
              tracking-tight
              text-foreground
              hover:text-brand-primary
              transition-colors
            "
            >
              {course.title}
            </h3>
          </a>

          <p
            className="
            mt-1
            text-sm
            leading-relaxed
            text-brand-muted
          "
          >
            {course.subtitle}
          </p>

          {/* META */}
          <div
            className="
            flex items-center
            gap-3
            mt-4
            text-xs
            text-brand-muted
          "
          >
            <div className="flex items-center gap-1.5">
              <BookOpenIcon className="w-4 h-4" />
              <span>{course.lessonsCount} lezioni</span>
            </div>

            <span className="text-border">•</span>

            <div className="flex items-center gap-1.5">
              <ChartBarIcon className="w-4 h-4" />
              <span>{course.level}</span>
            </div>
          </div>

          {/* BOTTOM */}
          <div
            className="
            flex items-center
            justify-between
            mt-auto
            pt-5
          "
          >
            <div className="flex items-center gap-1.5 text-sm">
              <StarIcon className="w-4 h-4 text-brand-accent" />

              <span className="font-semibold">{course.rating}</span>

              <span className="text-brand-muted text-xs">
                ({course.studentsCount})
              </span>
            </div>

            <a
              href={course.href}
              aria-label={`Vai al corso ${course.title}`}
              className="
                flex items-center justify-center
                w-9 h-9
                rounded-full
                bg-brand-primary
                text-white
                transition-all duration-200
                hover:bg-brand-primary-hover
                hover:translate-x-0.5
              "
            >
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
