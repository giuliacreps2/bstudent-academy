"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon, StarIcon } from "@heroicons/react/24/solid";
import { SkillCardDark, type Skill } from "@/components/SkillCardDark";

type Skin = {
  id: number;
  image: string;
  label: string;

  /**
   * Base = stesso valore per tutti gli avatar normali.
   * modifiers = variazioni introdotte dalla skin.
   */
  unlocked: boolean;
  modifiers?: Partial<Record<Skill["id"], number>>;
};

const baseSkills: Skill[] = [
  {
    id: 1,
    icon: "grammatica",
    color: "blue",
    label: "Grammatica",
    percentage: 82,
    trend: 3,
  },
  {
    id: 2,
    icon: "lessico",
    color: "green",
    label: "Lessico",
    percentage: 74,
    trend: 6,
  },
  {
    id: 3,
    icon: "traduzione",
    color: "purple",
    label: "Traduzione",
    percentage: 68,
    trend: 9,
  },
  {
    id: 4,
    icon: "analisi",
    color: "orange",
    label: "Analisi del testo",
    percentage: 71,
    trend: 4,
  },
  {
    id: 5,
    icon: "comprensione",
    color: "pink",
    label: "Comprensione",
    percentage: 65,
    trend: 5,
  },
  {
    id: 6,
    icon: "metodo",
    color: "teal",
    label: "Metodo di studio",
    percentage: 60,
    trend: 2,
  },
];

/**
 * Le prime due skin sono semplicemente avatar diversi.
 * Hanno ESATTAMENTE le stesse skill.
 *
 * La terza è una futura skin speciale:
 * quando viene sbloccata modifica alcune skill.
 */
const skins: Skin[] = [
  {
    id: 1,
    image: "/studente.png",
    label: "Studente",
    unlocked: true,
  },
  {
    id: 2,
    image: "/studentessa.png",
    label: "Studentessa",
    unlocked: true,
  },
  {
    id: 3,
    image: "/avatars/avatar-3.png",
    label: "Stratega",
    unlocked: false,

    // FUTURA SKIN
    modifiers: {
      3: 8, // Traduzione +8
      4: 5, // Analisi +5
      6: 7, // Metodo +7
    },
  },
];

export function SkillShowcase() {
  const [skinIndex, setSkinIndex] = useState(0);

  const selectedSkin = skins[skinIndex];

  /**
   * Calcoliamo le skill sulla base della skin selezionata.
   *
   * Avatar 1 e Avatar 2:
   * modifiers = undefined → valori originali.
   *
   * Skin Stratega:
   * vengono applicati i bonus.
   */
  const currentSkills = useMemo(() => {
    return baseSkills.map((skill) => {
      const modifier = selectedSkin.modifiers?.[skill.id] ?? 0;

      return {
        ...skill,
        percentage: Math.min(100, skill.percentage + modifier),
      };
    });
  }, [selectedSkin]);

  const goPrev = () => {
    setSkinIndex((current) => (current === 0 ? skins.length - 1 : current - 1));
  };

  const goNext = () => {
    setSkinIndex((current) => (current === skins.length - 1 ? 0 : current + 1));
  };

  const isLocked = !selectedSkin.unlocked;

  return (
    <section className="relative overflow-hidden bg-[#0a0e2e] py-16 text-white md:py-24">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#171c4b] via-[#0a0e2e] to-[#251542]" />

        <div className="absolute left-[35%] top-1/2 h-125 w-125 -translate-y-1/2 rounded-full bg-brand-primary/20 blur-3xl" />

        <div className="absolute right-[-10%] top-[-20%] h-100 w-100 rounded-full bg-brand-secondary/10 blur-3xl" />

        <div className="absolute bottom-[-20%] left-[45%] h-80 w-80 rounded-full bg-brand-accent/5 blur-3xl" />
      </div>

      <div className="container-section relative z-10">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary">
              <SparklesIcon className="h-4 w-4 text-white" />
            </span>

            <span className="text-xs font-extrabold tracking-[0.16em] text-blue-300 md:text-sm">
              LE TUE SKILL
            </span>
          </div>

          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Sblocca il tuo{" "}
            <span className="text-brand-secondary">potenziale.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
            Ogni esercizio migliora le tue competenze. Sali di livello, sblocca
            nuovi contenuti e costruisci il tuo percorso.
          </p>
        </div>

        {/* =====================================================
            MAIN SHOWCASE
        ====================================================== */}

        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-6 lg:gap-10">
          {/* =================================================
              AVATAR
          ================================================== */}

          <div className="order-1 md:col-span-6 lg:col-span-6">
            <div className="relative mx-auto max-w-130">
              {/* Glow */}
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/25 blur-3xl md:h-105 md:w-105" />

              {/* Avatar stage */}
              <div className="relative h-95 sm:h-105 md:h-120">
                <Image
                  key={selectedSkin.id}
                  src={selectedSkin.image}
                  alt={selectedSkin.label}
                  fill
                  priority
                  className={`object-contain object-bottom transition-all duration-500 ${
                    isLocked ? "brightness-50 grayscale" : ""
                  }`}
                />

                {/* LOCK OVERLAY */}
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
                        <LockClosedIcon className="h-6 w-6 text-white" />
                      </div>

                      <span className="mt-3 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                        SKIN DA SBLOCCARE
                      </span>
                    </div>
                  </div>
                )}

                {/* Skin bonus */}
                {!isLocked && selectedSkin.modifiers && (
                  <div className="absolute right-0 top-[12%] rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <StarIcon className="h-4 w-4 text-brand-accent" />

                      <span className="text-xs font-bold text-white">
                        BONUS ATTIVO
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-white/50">
                      Questa skin potenzia le tue skill
                    </p>
                  </div>
                )}
              </div>

              {/* =================================================
                  SKIN SELECTOR
              ================================================== */}

              <div className="relative z-20 mt-[-12px] flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Skin precedente"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] transition hover:bg-white/[0.15]"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-3">
                  {skins.map((skin, index) => {
                    const active = index === skinIndex;

                    return (
                      <button
                        key={skin.id}
                        type="button"
                        onClick={() => setSkinIndex(index)}
                        aria-label={`Seleziona ${skin.label}`}
                        aria-pressed={active}
                        className={`relative h-12 w-12 overflow-hidden rounded-full border-2 transition-all duration-200 ${
                          active
                            ? "scale-110 border-brand-secondary shadow-[0_0_0_4px_rgba(233,106,154,0.18)]"
                            : "border-white/10 opacity-50 hover:scale-105 hover:opacity-80"
                        }`}
                      >
                        <Image
                          src={skin.image}
                          alt=""
                          fill
                          className={`object-cover ${
                            !skin.unlocked ? "grayscale brightness-50" : ""
                          }`}
                        />

                        {!skin.unlocked && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <LockClosedIcon className="h-4 w-4 text-white" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Skin successiva"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] transition hover:bg-white/[0.15]"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Selected skin name */}
              <div className="mt-4 text-center">
                <p className="text-sm font-bold text-white">
                  {selectedSkin.label}
                </p>

                {isLocked ? (
                  <p className="mt-1 text-xs text-white/40">
                    Sblocca con 500 XP
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-brand-secondary">
                    Skin selezionata
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              SKILLS
          ================================================== */}

          <div className="order-2 md:col-span-6 lg:col-span-6">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-extrabold tracking-[0.14em] text-white/35">
                  PROFILO
                </p>

                <h3 className="mt-1 text-2xl font-extrabold">
                  Le tue competenze
                </h3>
              </div>

              {!isLocked && selectedSkin.modifiers && (
                <span className="rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-bold text-brand-secondary">
                  Bonus attivo
                </span>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {currentSkills.map((skill) => (
                <SkillCardDark
                  key={`${selectedSkin.id}-${skill.id}`}
                  skill={skill}
                  basePercentage={
                    baseSkills.find((base) => base.id === skill.id)?.percentage
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
