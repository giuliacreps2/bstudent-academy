"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { SkillProgressCard, type Skill } from "./SkillProgressCard";

// Placeholder — verranno sostituiti dai dati del backend
const avatars = [
  { id: 1, image: "/avatars/avatar-1.png", label: "Avatar 1" },
  { id: 2, image: "/avatars/avatar-2.png", label: "Avatar 2" },
  { id: 3, image: "/avatars/avatar-3.png", label: "Avatar 3" },
];

const skills: Skill[] = [
  {
    id: 1,
    icon: "grammatica",
    color: "blue",
    label: "Grammatica",
    percentage: 82,
  },
  { id: 2, icon: "lessico", color: "green", label: "Lessico", percentage: 74 },
  {
    id: 3,
    icon: "traduzione",
    color: "purple",
    label: "Traduzione",
    percentage: 68,
  },
  {
    id: 4,
    icon: "analisi",
    color: "orange",
    label: "Analisi del testo",
    percentage: 71,
  },
  {
    id: 5,
    icon: "comprensione",
    color: "pink",
    label: "Comprensione",
    percentage: 65,
  },
  {
    id: 6,
    icon: "metodo",
    color: "teal",
    label: "Metodo di studio",
    percentage: 60,
  },
];

export function SkillsShowcase() {
  const [avatarIndex, setAvatarIndex] = useState(0);

  const goPrev = () =>
    setAvatarIndex((i) => (i - 1 + avatars.length) % avatars.length);
  const goNext = () => setAvatarIndex((i) => (i + 1) % avatars.length);

  return (
    <section className="bg-background text-foreground py-16 md:py-20">
      <div className="container-section">
        <div className="relative overflow-hidden rounded-[24px] bg-surface-blue px-6 py-8 md:px-10 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center">
          {/* TESTO */}
          <div className="md:col-span-3 flex flex-col items-start relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary">
                <StarIcon className="text-white" width={14} height={14} />
              </span>
              <span className="text-xs font-extrabold tracking-[0.14em] text-brand-primary">
                LE TUE SKILL
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.15]">
              Il tuo progresso,{" "}
              <span className="text-brand-secondary">
                visibile e misurabile.
              </span>
            </h2>

            <p className="mt-4 text-sm text-brand-muted leading-relaxed">
              Migliora le tue skill, sblocca nuovi livelli e raggiungi i tuoi
              obiettivi.
            </p>

            <button className="btn-secondary mt-6 text-sm">
              Scopri tutte le skill
              <ArrowRightIcon width={14} height={14} />
            </button>
          </div>

          {/* AVATAR CAROUSEL */}
          <div className="md:col-span-3 flex flex-col items-center relative z-10">
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Avatar precedente"
                onClick={goPrev}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md shrink-0 hover:bg-neutral-50"
              >
                <ChevronLeftIcon width={16} height={16} />
              </button>

              <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full bg-white/50 overflow-hidden shrink-0">
                <Image
                  key={avatars[avatarIndex].id}
                  src={avatars[avatarIndex].image}
                  alt={avatars[avatarIndex].label}
                  fill
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                aria-label="Avatar successivo"
                onClick={goNext}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md shrink-0 hover:bg-neutral-50"
              >
                <ChevronRightIcon width={16} height={16} />
              </button>
            </div>

            {/* Selettore avatar — sostituisce i simboli ♂/♀ */}
            <div className="flex items-center gap-2 mt-4 bg-white rounded-full px-2 py-1.5 shadow-md">
              {avatars.map((avatar, index) => (
                <button
                  key={avatar.id}
                  type="button"
                  aria-label={`Mostra ${avatar.label}`}
                  aria-pressed={index === avatarIndex}
                  onClick={() => setAvatarIndex(index)}
                  className={`relative w-8 h-8 rounded-full overflow-hidden transition-all shrink-0 ${
                    index === avatarIndex
                      ? "ring-2 ring-brand-primary ring-offset-1"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={avatar.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
            {skills.map((skill) => (
              <SkillProgressCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
