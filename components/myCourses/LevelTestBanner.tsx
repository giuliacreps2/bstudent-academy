"use client";

import { useState } from "react";
import {
  BuildingLibraryIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { LevelTestModal } from "./LevelTestModal";
import type { CourseListItem, SubjectData } from "@/types/myCourses";

interface LevelTestBannerProps {
  subject: SubjectData;
  courses: CourseListItem[];
}

export function LevelTestBanner({ subject, courses }: LevelTestBannerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="rounded-lg bg-surface-blue p-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
            <BuildingLibraryIcon className="w-5 h-5 text-brand-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Non sai da dove iniziare?
            </p>
            <p className="text-xs text-brand-muted mt-0.5">
              Scopri il percorso consigliato per te in base al tuo livello.
            </p>
          </div>

          {/* Desktop: CTA sulla stessa riga */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex btn-secondary text-sm px-4 py-2 shrink-0 items-center gap-1 active:scale-95 transition-transform duration-150"
          >
            Fai il test di livello
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile: CTA a piena larghezza sotto icona + testo */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="sm:hidden btn-secondary text-sm px-4 py-2 mt-4 w-full inline-flex items-center justify-center gap-1 active:scale-95 transition-transform duration-150"
        >
          Fai il test di livello
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      <LevelTestModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        subject={subject}
        courses={courses}
      />
    </>
  );
}
