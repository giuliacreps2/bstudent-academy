"use client";

import { useCallback, useEffect, useState } from "react";
import {
  RESOURCE_NAV_OFFSET,
  resourceSectionId,
} from "@/constants/resourceDetail";
import type { ResourceSectionKey } from "@/types/resourceDetail";

/**
 * Navigazione interna della risorsa (ancore, non pagine).
 * Evidenzia la sezione visibile mentre si scorre e permette di saltarci
 * con uno scroll morbido che tiene conto della barra sticky.
 */
export function useResourceSectionNav(sections: ResourceSectionKey[]) {
  const [active, setActive] = useState<ResourceSectionKey>(
    sections[0] ?? "panoramica",
  );

  useEffect(() => {
    const elements = sections
      .map((key) => ({
        key,
        el: document.getElementById(resourceSectionId(key)),
      }))
      .filter((item): item is { key: ResourceSectionKey; el: HTMLElement } =>
        Boolean(item.el),
      );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Tra le sezioni visibili nella fascia alta, prende la prima in ordine di pagina
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);
        const first = elements.find(({ el }) => visible.includes(el.id));
        if (first) setActive(first.key);
      },
      { rootMargin: `-${RESOURCE_NAV_OFFSET}px 0px -55% 0px` },
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = useCallback((key: ResourceSectionKey) => {
    const el = document.getElementById(resourceSectionId(key));
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const top =
      el.getBoundingClientRect().top + window.scrollY - RESOURCE_NAV_OFFSET;

    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    setActive(key);
    window.history.replaceState(null, "", `#${resourceSectionId(key)}`);
  }, []);

  return { active, scrollTo };
}
