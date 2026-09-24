"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { RegisterModal } from "@/components/auth/RegisterModal";
import type {
  CourseLandingMissionsData,
  LandingMission,
} from "@/types/courseLanding";

function MissionMarker({
  mission,
  onSelect,
}: {
  mission: LandingMission;
  onSelect: () => void;
}) {
  const isOpen = mission.status === "open";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Missione ${mission.order}: ${mission.title}`}
      className="group absolute z-10 flex -translate-x-1/2 -translate-y-[1.375rem] flex-col items-center gap-2"
      style={{ left: `${mission.position.x}%`, top: `${mission.position.y}%` }}
    >
      <span
        className={`relative flex h-11 w-11 items-center justify-center rounded-full text-lg font-extrabold text-white shadow-lg ring-4 ring-white/80 transition-transform group-hover:scale-105 ${
          isOpen ? "bg-brand-primary" : "bg-slate-400"
        }`}
      >
        {mission.order}
        {!isOpen && (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
            <LockClosedIcon className="h-3 w-3 text-slate-500" />
          </span>
        )}
      </span>

      <span
        className={`max-w-24 rounded-lg px-2 py-1 text-center text-[11px] font-bold leading-tight text-foreground shadow-md lg:max-w-28 lg:text-xs ${
          isOpen ? "bg-amber-50 ring-1 ring-brand-accent/40" : "bg-white/90"
        }`}
      >
        {mission.title}
      </span>
    </button>
  );
}

interface CourseLandingMissionsProps {
  courseSlug: string;
  missions: CourseLandingMissionsData;
}

export function CourseLandingMissions({
  courseSlug,
  missions,
}: CourseLandingMissionsProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const openRegister = () => setIsRegisterOpen(true);

  const ordered = [...missions.missions].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-background py-12 text-foreground md:py-16">
      <div className="container-section">
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_8px_24px_rgba(23,32,51,0.06)] md:grid md:grid-cols-5">
          {/* TESTO */}
          <div className="relative z-20 px-6 py-10 sm:px-10 md:col-span-2 md:py-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="relative block h-7 w-8" aria-hidden="true">
                <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
                <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
                <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
              </span>
              <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
                {missions.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl">
              {missions.titleLead}
              <br />
              <span className="relative inline-block">
                {missions.titleHighlight}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-1.5 w-full -rotate-1 rounded-full bg-brand-accent/80"
                />
              </span>
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-brand-muted">
              {missions.description}
            </p>

            <button
              type="button"
              onClick={openRegister}
              className="btn-secondary mt-7"
            >
              {missions.ctaLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            {/* MOBILE: elenco verticale al posto della mappa */}
            <ol className="mt-8 space-y-2 md:hidden">
              {ordered.map((mission) => {
                const isOpen = mission.status === "open";

                return (
                  <li key={mission.id}>
                    <button
                      type="button"
                      onClick={openRegister}
                      className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 text-left"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white ${
                          isOpen ? "bg-brand-primary" : "bg-slate-400"
                        }`}
                      >
                        {mission.order}
                      </span>
                      <span className="flex-1 text-sm font-semibold">
                        {mission.title}
                      </span>
                      {!isOpen && (
                        <LockClosedIcon className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* DESKTOP: illustrazione con percorso e nodi */}
          <div className="relative hidden min-h-80 md:col-span-3 md:block">
            <Image
              src={missions.imageUrl}
              alt={missions.imageAlt}
              fill
              sizes="(min-width: 768px) 60vw, 0px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent"
            />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {ordered.slice(0, -1).map((mission, index) => {
                const next = ordered[index + 1];

                return (
                  <line
                    key={`${mission.id}-${next.id}`}
                    x1={mission.position.x}
                    y1={mission.position.y}
                    x2={next.position.x}
                    y2={next.position.y}
                    stroke="rgba(255,255,255,0.95)"
                    strokeWidth={2.5}
                    strokeDasharray="5 7"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {ordered.map((mission) => (
              <MissionMarker
                key={mission.id}
                mission={mission}
                onSelect={openRegister}
              />
            ))}
          </div>
        </div>
      </div>

      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        courseSlug={courseSlug}
      />
    </section>
  );
}
