"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { RegisterModal } from "@/components/auth/RegisterModal";
import type { ResourcesNotebookData } from "@/types/resources";

interface NotebookCtaProps {
  notebook: ResourcesNotebookData;
  isLoggedIn: boolean;
}

export function NotebookCta({ notebook, isLoggedIn }: NotebookCtaProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Utente autenticato: fascia compatta verso il Quaderno
  if (isLoggedIn) {
    return (
      <section className="py-10 md:py-14">
        <div className="container-section">
          <div className="flex flex-col gap-4 rounded-[28px] bg-surface-blue px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="flex items-center gap-3 text-lg font-extrabold text-foreground">
              <span className="text-2xl" aria-hidden="true">
                📓
              </span>
              {notebook.loggedIn.title}
            </p>
            <Link href={notebook.loggedIn.ctaHref} className="btn-primary">
              {notebook.loggedIn.ctaLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="resources-notebook-title"
      className="py-10 pb-16 md:py-14 md:pb-20"
    >
      <div className="container-section">
        <div className="relative overflow-hidden rounded-[28px] bg-surface-blue px-6 py-10 sm:px-10 md:py-14">
          {/* Decorazioni */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-[#ffd5e7] opacity-50"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 right-[8%] h-52 w-52 rounded-full bg-[#d7e8ff] opacity-70"
          />

          <div className="relative z-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <span className="text-4xl" aria-hidden="true">
                📓
              </span>
              <h2
                id="resources-notebook-title"
                className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl"
              >
                {notebook.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-brand-muted md:text-lg">
                {notebook.description}
              </p>

              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="btn-primary mt-7"
              >
                {notebook.ctaLabel}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>

            <ul className="space-y-3">
              {notebook.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm font-bold text-foreground"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-success">
                    <CheckIcon className="h-3.5 w-3.5 text-white" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </section>
  );
}
