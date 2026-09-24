"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { RegisterModal } from "@/components/auth/RegisterModal";
import type { CourseLandingFinalCtaData } from "@/types/courseLanding";

interface CourseLandingFinalCtaProps {
  courseSlug: string;
  finalCta: CourseLandingFinalCtaData;
}

// Variante parametrizzata di FinalCTA (home): stesso sfondo e stessa struttura.
export function CourseLandingFinalCta({
  courseSlug,
  finalCta,
}: CourseLandingFinalCtaProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <section
      id="cta-finale"
      className="bg-[url('/land.png')] bg-cover bg-center py-12 md:py-16"
    >
      <div className="container-section">
        <div className="relative overflow-hidden rounded-[28px] px-6 py-14 text-center text-foreground md:px-12 md:py-20">
          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="text-xs font-extrabold tracking-[0.18em] md:text-sm">
              {finalCta.eyebrow}
            </span>

            <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
              {finalCta.title}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 md:text-lg">
              {finalCta.description}
            </p>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 font-bold shadow-[0_10px_25px_rgba(23,32,51,0.12)]"
              >
                {finalCta.buttonLabel}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
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
