import type { Metadata } from "next";

/**
 * Pagine con un token monouso nell'URL: niente Referer verso altri siti
 * (immagini, link esterni) e niente indicizzazione.
 */
export const tokenPageMetadata: Metadata = {
  referrer: "no-referrer",
  robots: { index: false, follow: false },
};

/** Il token arriva come ?token=...; un valore ripetuto o vuoto non è valido */
export function tokenFrom(value: string | string[] | undefined): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
