import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import type { FeaturedCourseData } from "@/types/dashboard";

export function FeaturedCourses({
  courses,
}: {
  courses: FeaturedCourseData[];
}) {
  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-3">
        Corsi in evidenza
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => (
          <FeaturedCourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}

function FeaturedCourseCard({ course }: { course: FeaturedCourseData }) {
  return (
    <article className="relative h-full">
      <span className="absolute top-3 left-3 z-10 inline-flex items-center px-3 py-1 rounded-pill border border-brand-primary/20 bg-surface-blue text-brand-primary text-xs font-semibold">
        {course.category}
      </span>
      <div className="h-full flex flex-col overflow-hidden rounded-lg bg-surface border border-border transition-all duration-200 hover:-translate-y-0.5">
        <div className="relative w-full h-32">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 p-4">
          <h4 className="font-bold text-foreground">{course.title}</h4>
          <p className="text-sm text-brand-muted mt-0.5">{course.subtitle}</p>
          <div className="flex items-center gap-2 mt-3 text-xs text-brand-muted">
            <BookOpenIcon className="w-4 h-4" />
            <span>{course.lessonsCount} lezioni</span>
            <span className="text-border">•</span>
            <ChartBarIcon className="w-4 h-4" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center justify-between mt-auto pt-4">
            <div className="flex items-center gap-1.5 text-sm">
              <StarIcon className="w-4 h-4 text-brand-accent" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-brand-muted text-xs">
                ({course.studentsCount})
              </span>
            </div>
            <Link
              href={`/corsi/${course.slug}`}
              aria-label={`Vai al corso ${course.title}`}
              className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-hover active:scale-95 transition-all duration-150"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
