"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpenIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { RegisterModal } from "@/components/auth/RegisterModal";
import type { CourseListItem } from "@/types/myCourses";

const MIN_ITEMS = 6; // sotto questa soglia la fascia non riempie lo schermo

function LandingCourseCard({
  course,
  onSelect,
  decorative = false,
}: {
  course: CourseListItem;
  onSelect: (slug: string) => void;
  /** Copie duplicate per il loop: escluse da tastiera e screen reader */
  decorative?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(course.slug)}
      tabIndex={decorative ? -1 : undefined}
      className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-surface text-left transition-shadow hover:shadow-[0_14px_32px_rgba(23,32,51,0.10)]"
    >
      <div className="relative h-32 w-full shrink-0">
        <Image
          src={course.imageUrl}
          alt=""
          fill
          sizes="288px"
          className="object-cover"
        />

        {course.isPopular && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-brand-secondary backdrop-blur-sm">
            <SparklesIcon className="h-3 w-3" />
            Più amato
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 font-bold text-foreground">{course.title}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-brand-muted">
          {course.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-muted">
          <span className="flex items-center gap-1.5">
            <BookOpenIcon className="h-4 w-4" />
            {course.stepsCount} tappe
          </span>
          <span className="flex items-center gap-1.5">
            <ChartBarIcon className="h-4 w-4" />
            {course.level}
          </span>
        </div>
      </div>
    </button>
  );
}

interface CourseLandingCarouselProps {
  subjectName: string;
  courses: CourseListItem[];
}

export function CourseLandingCarousel({
  subjectName,
  courses,
}: CourseLandingCarouselProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  if (courses.length === 0) return null;

  // Ripete i corsi finché la fascia è abbastanza lunga, poi la duplica:
  // l'animazione scorre di -50% e ricomincia senza salti.
  const repeats = Math.ceil(MIN_ITEMS / courses.length);
  const items = Array.from({ length: repeats }, () => courses).flat();

  return (
    <section
      aria-labelledby="landing-courses-title"
      className="overflow-hidden bg-background py-16 text-foreground md:py-20"
    >
      <div className="container-section mb-9 md:mb-10">
        <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
          I CORSI
        </span>

        <h2
          id="landing-courses-title"
          className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
        >
          Tutti i corsi di {subjectName}.
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
          Dai primi passi ai testi d&apos;autore: scegli da dove partire.
        </p>
      </div>

      {/* FASCIA IN LOOP — solo grafica, il click apre la registrazione.
          Pausa su hover; con "riduci movimento" diventa scorrevole a mano. */}
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[false, true].map((decorative) => (
            <div
              key={String(decorative)}
              aria-hidden={decorative || undefined}
              className="flex shrink-0 motion-reduce:[&:last-child]:hidden"
            >
              {items.map((course, index) => (
                <div
                  key={`${course.slug}-${index}`}
                  className="w-72 shrink-0 pr-4 sm:w-80"
                >
                  <LandingCourseCard
                    course={course}
                    decorative={decorative}
                    onSelect={setSelectedSlug}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <RegisterModal
        open={selectedSlug !== null}
        onClose={() => setSelectedSlug(null)}
        courseSlug={selectedSlug ?? undefined}
      />
    </section>
  );
}
