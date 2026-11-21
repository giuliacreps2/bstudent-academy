"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { resourcesHref } from "@/constants/resources";
import type { ResourceSubjectKey } from "@/types/resources";

/**
 * Ricerca dell'Hero: cerca tra le Risorse della materia scelta (blueprint §7.4).
 * Al submit apre la pagina principale con ?q=, che mostra i risultati.
 */
export function useResourceSearch(
  subject: ResourceSubjectKey,
  initialQuery = "",
) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const canSubmit = query.trim().length > 0;

  const submit = useCallback(
    (event?: FormEvent) => {
      event?.preventDefault();
      const q = query.trim();
      if (!q) return;
      router.push(resourcesHref({ subject, query: q }));
    },
    [query, subject, router],
  );

  return { query, setQuery, submit, canSubmit };
}
