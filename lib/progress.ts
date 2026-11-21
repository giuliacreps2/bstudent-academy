import type { HistoryContext, HistoryOutcome } from "@/types/progress";

/* "I miei progressi": indirizzi e formattazione (usabili anche nei componenti client) */

export const PROGRESS_PATH = "/my/progress";

export interface ProgressFilters {
  subject?: string;
  context?: HistoryContext;
  outcome?: HistoryOutcome;
  allTime?: boolean;
  page?: number;
}

/** Indirizzo della pagina con materia e filtri dello storico; i valori predefiniti non compaiono */
export function progressHref(filters: ProgressFilters): string {
  const params = new URLSearchParams();
  if (filters.subject) params.set("materia", filters.subject);
  if (filters.context && filters.context !== "all") params.set("tipo", filters.context);
  if (filters.outcome && filters.outcome !== "all") params.set("esito", filters.outcome);
  if (filters.allTime) params.set("tutto", "1");
  if (filters.page) params.set("pagina", String(filters.page));
  const qs = params.toString();
  return qs ? `${PROGRESS_PATH}?${qs}#storico` : PROGRESS_PATH;
}

export const attemptDetailHref = (exerciseAttemptId: number) => `${PROGRESS_PATH}/attempts/${exerciseAttemptId}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });

export const formatNumber = (value: number | null | undefined, digits = 2) =>
  value === null || value === undefined
    ? "—"
    : Number(value).toLocaleString("it-IT", { maximumFractionDigits: digits });

/** Voto in decimi già arrotondato al mezzo punto dal backend (§10.2): 8,5 */
export const formatGrade = (grade: number | null) =>
  grade === null ? "—" : Number(grade).toLocaleString("it-IT", { maximumFractionDigits: 1 });
