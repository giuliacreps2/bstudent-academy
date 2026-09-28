"use client";

import { useResourceSectionNav } from "@/hooks/useResourceSectionNav";
import {
  resourceSectionId,
  resourceSectionsMeta,
} from "@/constants/resourceDetail";
import type { ResourceSectionKey } from "@/types/resourceDetail";

export function ResourceSectionNav({
  sections,
}: {
  sections: ResourceSectionKey[];
}) {
  const { active, scrollTo } = useResourceSectionNav(sections);

  // Con una sola sezione la navigazione non serve
  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Sezioni della risorsa"
      className="sticky top-0 z-30 -mx-6 mt-8 border-b border-border bg-background/95 px-6 backdrop-blur-sm md:-mx-8 md:px-8"
    >
      <ul className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {sections.map((key) => {
          const isActive = key === active;

          return (
            <li key={key} className="shrink-0">
              <a
                href={`#${resourceSectionId(key)}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(key);
                }}
                className={`relative block px-4 py-3.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary ${
                  isActive
                    ? "text-brand-primary"
                    : "text-brand-muted hover:text-foreground"
                }`}
              >
                {resourceSectionsMeta[key].label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-primary transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
