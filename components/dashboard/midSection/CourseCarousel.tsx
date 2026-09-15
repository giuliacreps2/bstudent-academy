"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CourseCard } from "./CourseCard";
import type { CourseData } from "@/types/dashboard";

export function CourseCarousel({ courses }: { courses: CourseData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {courses.map((course) => (
          <div key={course.slug} className="w-full shrink-0 snap-start">
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {courses.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            onClick={() => scrollByCard(-1)}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-surface-blue"
            aria-label="Corso precedente"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-surface-blue"
            aria-label="Corso successivo"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
