"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ResourceSubjectKey } from "@/types/resources";

/**
 * Ricerca testuale dell'Hero. MVP: al submit porta a /risorse/cerca
 * con query e materia attiva (la pagina risultati userà searchResources).
 */
export function useResourceSearch(subject: ResourceSubjectKey) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const canSubmit = query.trim().length > 0;

  const submit = useCallback(
    (event?: FormEvent) => {
      event?.preventDefault();
      const q = query.trim();
      if (!q) return;
      router.push(
        `/resources/cerca?${new URLSearchParams({ q, materia: subject })}`,
      );
    },
    [query, subject, router],
  );

  return { query, setQuery, submit, canSubmit };
}
