/*
 * TODO (blueprint §14, deciso il 14/11/2026). Nome in interfaccia: "Quaderno". Quaderno = appunti, non libro.
 * - Linguette: materie seguite dallo studente (dal backend) + "Articoli"; niente chiavi fisse latino/greco.
 * - NotebookEntryKind → tipo (Lezione | Video | Articolo) + argomento della lezione.
 * - excerpt: primo paragrafo della lezione (descrizione per il Blog); unlockedAt: data ISO, formattata qui.
 * - href: /my/lessons/[id] (lezione in sola lettura + nota personale con salvataggio automatico); icona se c'è una nota.
 * - isNew: entrata e mai riaperta.
 * - Risorse salvate: striscia "Segnalibri" separata (collegamenti alla Palestra), non voci del Quaderno.
 * - Lezione ritirata: resta solo la nota con "lezione non più disponibile". Articolo non disponibile: sparisce.
 * - Premium scaduto: titolo, anteprima e note visibili, lezione con lucchetto.
 * - Copertina: colore scelto dallo studente da una piccola tavolozza (oggi fisso --texture-notebook-gold).
 * - avatarUrl: immagine del personaggio scelto, allo stadio attuale.
 */
export type NotebookTabKey = "latino" | "greco" | "articoli";

export interface NotebookTabMeta {
  key: NotebookTabKey;
  label: string;
  /** colore hex usato per l'indicatore della linguetta attiva */
  accent: string;
}

export type NotebookEntryKind = "grammatica" | "lessico" | "articolo";

export interface NotebookEntrySummary {
  id: string;
  tab: NotebookTabKey;
  kind: NotebookEntryKind;
  title: string;
  excerpt: string;
  /** già formattata lato BE, es. "12 set 2025" */
  unlockedAt: string;
  /** solo per voci sbloccate dal percorso, es. "Missione 3 · L'ablativo assoluto" */
  missionLabel?: string;
  href: string;
  isNew?: boolean;
}

export interface NotebookStudent {
  name: string;
  avatarUrl: string;
}

export interface NotebookOverviewData {
  student: NotebookStudent;
  entriesByTab: Record<NotebookTabKey, NotebookEntrySummary[]>;
}
