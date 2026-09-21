"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HeartIcon as HeartOutlineIcon,
  BookOpenIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import type { CourseListItem } from "@/types/myCourses";

export function CourseListCard({ course }: { course: CourseListItem }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const started = course.progress !== undefined && course.progress > 0;

  return (
    <article className="flex flex-col h-full rounded-lg bg-surface border border-border overflow-hidden">
      <div className="relative w-full h-32 shrink-0">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
        />

        {course.isPopular && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-brand-secondary text-[10px] font-semibold px-2.5 py-1 rounded-pill">
            <SparklesIcon className="w-3 h-3" />
            Più amato
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsFavorite((current) => !current)}
          aria-label={
            isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
          }
          aria-pressed={isFavorite}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm active:scale-90 transition-transform duration-150"
        >
          {isFavorite ? (
            <HeartSolidIcon className="w-4 h-4 text-brand-secondary" />
          ) : (
            <HeartOutlineIcon className="w-4 h-4 text-brand-muted" />
          )}
        </button>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h4 className="font-bold text-foreground mb-1">{course.title}</h4>
        <p className="text-sm text-brand-muted mb-3">{course.description}</p>

        <div className="flex items-center gap-3 flex-wrap text-xs text-brand-muted mb-4">
          <div className="flex items-center gap-1.5">
            <BookOpenIcon className="w-4 h-4" />
            <span>{course.stepsCount} tappe</span>
          </div>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1.5">
            <ChartBarIcon className="w-4 h-4" />
            <span>{course.level}</span>
          </div>
          <span className="text-border">•</span>
          <div className="flex items-center gap-1.5">
            <SparklesIcon className="w-4 h-4" />
            <span>{course.skillsCount} skill</span>
          </div>
        </div>

        {started && (
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-1.5 bg-surface-blue rounded-pill overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-pill"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="text-xs text-brand-muted shrink-0">
              {course.progress}%
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 mt-auto">
          <Link
            href={course.href}
            className="btn-primary text-sm px-4 py-2 flex-1 justify-center active:scale-95 transition-transform duration-150"
          >
            {started ? "Continua" : "Inizia il corso"} →
          </Link>
          <Link
            href={course.href}
            className="btn-secondary text-sm px-4 py-2 active:scale-95 transition-transform duration-150"
          >
            Dettagli
          </Link>
        </div>
      </div>
    </article>
  );
}
