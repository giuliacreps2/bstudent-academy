"use client";

import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import {
  AcademicCapIcon,
  ChartBarIcon,
  FlagIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { RegisterModal } from "@/components/auth/RegisterModal";
import type {
  CourseLandingHeroData,
  LandingBadgeIcon,
} from "@/types/courseLanding";

const badgeIcons: Record<
  LandingBadgeIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  missions: FlagIcon,
  exercises: PencilSquareIcon,
  level: ChartBarIcon,
  years: AcademicCapIcon,
};

interface CourseLandingHeroProps {
  courseSlug: string;
  hero: CourseLandingHeroData;
}

export function CourseLandingHero({
  courseSlug,
  hero,
}: CourseLandingHeroProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-surface-blue text-foreground md:grid md:grid-cols-2">
      <div className="px-6 py-12 sm:px-8 md:py-20 md:pr-12 md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:py-24">
        <div className="flex max-w-xl flex-col items-start">
          {/* Etichetta del corso */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-white/70 px-4 py-2">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-brand-secondary"
            />
            <span className="text-xs font-extrabold tracking-[0.16em] text-brand-primary">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[56px] xl:text-[62px]">
            {hero.titleLead}
            <br />
            <span className="text-brand-primary">{hero.titleHighlight}</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-brand-muted md:text-lg">
            {hero.description}
          </p>

          {/* Informazioni sul percorso */}
          <ul className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-brand-primary/15 pt-5">
            {hero.badges.map((badge) => {
              const Icon = badgeIcons[badge.icon];

              return (
                <li
                  key={badge.id}
                  className="inline-flex items-start gap-2 text-sm font-semibold text-foreground"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                  <span>{badge.label}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsRegisterOpen(true)}
              className="btn-primary"
            >
              Inizia il corso, è gratis
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            <a href="#anteprima" className="btn-secondary">
              <PlayCircleIcon className="h-5 w-5" />
              Guarda l&apos;anteprima
            </a>
          </div>
        </div>
      </div>

      {/* Immagine a filo con il bordo destro */}
      <div className="relative h-72 sm:h-96 md:h-auto md:min-h-140">
        <Image
          src={hero.imageUrl}
          alt={hero.imageAlt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-linear-to-r from-surface-blue to-transparent md:block"
        />
      </div>

      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        courseSlug={courseSlug}
      />
    </section>
  );
}
