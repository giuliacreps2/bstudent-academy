"use client";

import { useCallback, useState } from "react";
import { defaultResourceSubject } from "@/constants/resources";
import type { ResourceSubjectKey } from "@/types/resources";

/**
 * Materia attiva della pagina Risorse (Latino | Greco).
 * Non cambia pagina: aggiorna lo stato e allinea ?materia= nell'URL,
 * così il link resta condivisibile e il refresh mantiene la scelta.
 */
export function useResourceSubject(
  initial: ResourceSubjectKey = defaultResourceSubject,
) {
  const [subject, setSubject] = useState<ResourceSubjectKey>(initial);

  const select = useCallback((next: ResourceSubjectKey) => {
    setSubject(next);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("materia", next);
      window.history.replaceState(null, "", url);
    } catch {
      // URL non aggiornabile: la scelta vale comunque per la sessione
    }
  }, []);

  return { subject, select };
}
