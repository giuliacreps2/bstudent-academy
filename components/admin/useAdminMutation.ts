"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminErrorMessage } from "@/lib/admin";

type RunOptions<T> = {
  /** Chiede conferma prima di procedere (azioni irreversibili o visibili agli studenti) */
  confirm?: string;
  /** Dopo il successo naviga qui (anche calcolato dal risultato, es. la pagina del corso creato) */
  redirectTo?: string | ((result: T) => string);
};

/**
 * Esegue una chiamata di modifica, mostra il messaggio d'errore del backend e
 * rilegge i dati della pagina (router.refresh) quando va a buon fine.
 */
export function useAdminMutation() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run<T>(action: () => Promise<T>, options: RunOptions<T> = {}): Promise<boolean> {
    if (options.confirm && !window.confirm(options.confirm)) return false;
    setPending(true);
    setError(null);
    try {
      const result = await action();
      const { redirectTo } = options;
      if (redirectTo) router.push(typeof redirectTo === "function" ? redirectTo(result) : redirectTo);
      router.refresh();
      return true;
    } catch (e) {
      setError(adminErrorMessage(e));
      return false;
    } finally {
      setPending(false);
    }
  }

  return { run, pending, error, setError };
}
