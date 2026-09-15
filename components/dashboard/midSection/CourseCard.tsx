import Link from "next/link";
import Image from "next/image";
import type { CourseData } from "@/types/dashboard";

export function CourseCard({ course }: { course: CourseData }) {
  return (
    <div className="flex gap-4 rounded-lg bg-surface-blue p-4">
      <div className="relative w-28 h-32 shrink-0 rounded-md overflow-hidden">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="inline-block bg-white text-brand-primary text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded-pill mb-2">
          {course.language}
        </span>
        <h4 className="font-bold text-foreground mb-1">{course.title}</h4>
        <p className="text-sm text-brand-muted mb-3">{course.description}</p>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-1.5 bg-white rounded-pill overflow-hidden">
            <div
              className="h-full bg-brand-primary rounded-pill"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <span className="text-xs text-brand-muted">{course.progress}%</span>
        </div>
        <Link
          href={`/corsi/${course.slug}`}
          className="btn-secondary text-sm px-4 py-2 inline-flex active:scale-95 transition-transform duration-150"
        >
          Inizia il corso →
        </Link>
      </div>
    </div>
  );
}
