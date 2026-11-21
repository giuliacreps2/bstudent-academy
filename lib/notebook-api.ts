import { api, API_URL } from "@/lib/api";
import type { LessonNote, StudyEventInput } from "@/types/notebookData";

/* =====================================================================
   Quaderno e registro di studio: chiamate dal browser.
   Le letture delle pagine le fa il server (lib/notebook-server.ts).
   ===================================================================== */

export const notebookLessonHref = (lessonId: number) => `/my/lessons/${lessonId}`;

/**
 * Salvataggio automatico della nota. version = quella letta (null per una nota nuova).
 * Restituisce null se il testo vuoto ha cancellato la nota; 409 se è cambiata in un'altra scheda
 */
export async function saveLessonNote(lessonId: number, text: string, version: number | null) {
  const result = await api<LessonNote | undefined>(`/student/notebook/lessons/${lessonId}/note`, {
    method: "PUT",
    body: { text, version },
  });
  return result ?? null;
}

/** Colore della copertina: chiave della tavolozza (constants/notebookCover.ts), null = predefinito */
export const setNotebookCover = (color: string | null) =>
  api("/student/notebook/cover", { method: "PUT", body: { color } });

/** "Salva nel Quaderno" di una Risorsa: un segnalibro (blueprint §7.4) */
export const addBookmark = (resourceId: number) =>
  api(`/student/notebook/bookmarks/${resourceId}`, { method: "PUT" });

export const removeBookmark = (resourceId: number) =>
  api(`/student/notebook/bookmarks/${resourceId}`, { method: "DELETE" });

/**
 * Registro di studio (blueprint §10.5): si invia e non si aspetta la risposta.
 * keepalive: parte anche mentre la pagina si chiude
 */
export function sendStudyEvent(event: StudyEventInput) {
  try {
    void fetch(`${API_URL}/student/study-events`, {
      method: "POST",
      credentials: "include",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    }).catch(() => undefined);
  } catch {
    // il registro non deve mai disturbare lo studio
  }
}
