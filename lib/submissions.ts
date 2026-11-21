import { notFound } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import type { Paged } from "@/types/admin";
import type {
  SubmissionAssessed,
  SubmissionDetail,
  SubmissionListItem,
  TeacherAssessmentInput,
} from "@/types/submissions";

/* =====================================================================
   "Consegne da correggere" (Blueprint Svolgimento §4.1). Chi può correggere
   lo decide il backend (oggi l'Admin, in futuro il ruolo docente).
   ===================================================================== */

const BASE = "/admin/academy/submissions";

export const submissionsHref = (page = 0, subjectId?: number) => {
  const params = new URLSearchParams();
  if (subjectId) params.set("materia", String(subjectId));
  if (page > 0) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/admin/submissions?${qs}` : "/admin/submissions";
};

export const submissionHref = (exerciseAttemptId: number) => `/admin/submissions/${exerciseAttemptId}`;

export const RUBRIC_LABELS = {
  structural: "Errore strutturale grave",
  lexical: "Scelta lessicale contestuale",
} as const;

export const KIND_LABELS = {
  multiple_choice: "Scelta multipla",
  fill_in: "Completamento",
  sentence_translation: "Traduzione di frase",
  passage_translation: "Traduzione di versione",
} as const;

/* ------------------------------------ Server ------------------------------------ */

type ServerApi = <T>(path: string) => Promise<T>;

/** Consegne in attesa, dalla più vecchia; materia facoltativa */
export function getPendingSubmissions(serverApi: ServerApi, page: number, subjectId?: number) {
  const params = new URLSearchParams({ page: String(page), size: "20" });
  if (subjectId) params.set("subjectId", String(subjectId));
  return serverApi<Paged<SubmissionListItem>>(`${BASE}?${params}`);
}

/**
 * Dettaglio di una consegna. null = lo studente ha annullato l'invio (409): la consegna non c'è più.
 * 404 → pagina inesistente.
 */
export async function getSubmission(serverApi: ServerApi, exerciseAttemptId: number) {
  try {
    return await serverApi<SubmissionDetail>(`${BASE}/${exerciseAttemptId}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    if (error instanceof ApiError && error.status === 409) return null;
    throw error;
  }
}

/* ------------------------------------ Client ------------------------------------ */

/** Il giudizio è definitivo: 409 se già corretta o se lo studente ha annullato l'invio */
export const assessSubmission = (exerciseAttemptId: number, body: TeacherAssessmentInput) =>
  api<SubmissionAssessed>(`${BASE}/${exerciseAttemptId}/assessment`, { body });
