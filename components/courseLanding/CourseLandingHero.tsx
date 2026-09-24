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
      {/* TESTO
          Su desktop la sezione è a tutta larghezza: il padding sinistro
          riallinea il testo al container (max-w-7xl + px-8) del resto del sito. */}
      <div className="px-6 py-12 sm:px-8 md:py-20 md:pr-12 md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:py-24">
        <div className="flex max-w-xl flex-col items-start">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="relative block h-8 w-8" aria-hidden="true">
              <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
              <span className="absolute left-0 top-4 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
              <span className="absolute left-5 top-5 h-2 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
            </span>
            <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
              {hero.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[56px] xl:text-[62px]">
            {hero.titleLead}
            <br />
            <span className="relative inline-block text-brand-secondary">
              {hero.titleHighlight}
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-1.5 w-full -rotate-1 rounded-full bg-brand-secondary/80"
              />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-lg text-base leading-7 text-brand-muted md:text-lg">
            {hero.description}
          </p>

          {/* Badge */}
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {hero.badges.map((badge) => {
              const Icon = badgeIcons[badge.icon];

              return (
                <li
                  key={badge.id}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-foreground shadow-[0_4px_12px_rgba(23,32,51,0.06)]"
                >
                  <Icon className="h-4 w-4 text-brand-primary" />
                  {badge.label}
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsRegisterOpen(true)}
              className="btn-primary"
            >
              Inizia il corso, è gratis
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            {/* #anteprima = sezione video (prossimo step) */}
            <a href="#anteprima" className="btn-secondary">
              <PlayCircleIcon className="h-5 w-5" />
              Guarda l&apos;anteprima
            </a>
          </div>
        </div>
      </div>

      {/* IMMAGINE — a filo con il bordo destro del viewport */}
      <div className="relative h-72 sm:h-96 md:h-auto md:min-h-140">
        <Image
          src={hero.imageUrl}
          alt={hero.imageAlt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />

        {/* Sfumatura che raccorda l'immagine allo sfondo del testo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-linear-to-r from-surface-blue to-transparent md:block"
        />
      </div>

      {/* REGISTER MODAL */}
      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        courseSlug={courseSlug}
      />
    </section>
  );
}
