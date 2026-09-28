"use client";

import { useCallback, useEffect, useState } from "react";

type ShareStatus = "idle" | "copied" | "error";

/**
 * Condivisione della risorsa: usa il menu nativo se disponibile (mobile),
 * altrimenti copia il link negli appunti.
 */
export function useShareResource(title: string) {
  const [status, setStatus] = useState<ShareStatus>("idle");

  // Il messaggio "Link copiato" scompare da solo
  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timer);
  }, [status]);

  const share = useCallback(async () => {
    const url = window.location.href.split("#")[0];

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch (error) {
      // L'utente ha chiuso il menu di condivisione: non è un errore
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("error");
    }
  }, [title]);

  return { share, status };
}
