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
