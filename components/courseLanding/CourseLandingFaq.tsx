"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { LandingFaq } from "@/types/courseLanding";

export function CourseLandingFaq({ faqs }: { faqs: LandingFaq[] }) {
  // Una sola risposta aperta alla volta; la prima è aperta di default
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section
      aria-labelledby="landing-faq-title"
      className="bg-background py-16 text-foreground md:py-20"
    >
      <div className="container-section grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-12">
        <div className="md:col-span-2">
          <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
            DOMANDE FREQUENTI
          </span>

          <h2
            id="landing-faq-title"
            className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
          >
            Hai ancora un dubbio?
          </h2>

          <p className="mt-4 max-w-sm text-base leading-relaxed text-brand-muted">
            Le risposte alle domande che ci fanno più spesso prima di iniziare.
          </p>
        </div>

        <div className="space-y-3 md:col-span-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const buttonId = `${faq.id}-button`;
            const panelId = `${faq.id}-panel`;

            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-lg border border-border bg-surface"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold transition-colors hover:text-brand-primary"
                  >
                    {faq.question}
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 text-brand-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-6 text-brand-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
