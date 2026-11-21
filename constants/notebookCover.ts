/**
 * Tavolozza della copertina del Quaderno (blueprint §14: lo studente sceglie da una piccola tavolozza).
 * La chiave va al backend; i colori stanno solo qui. null = blu notte, il predefinito.
 * TODO (grafica): colori da rivedere con Giulia.
 */
export const notebookCovers = [
  { key: null, label: "Blu notte", cover: "#2b3a67", dark: "#1e2a4d" },
  { key: "verde", label: "Verde bosco", cover: "#2f5d50", dark: "#1f3f36" },
  { key: "bordeaux", label: "Bordeaux", cover: "#6b2737", dark: "#4a1a26" },
  { key: "viola", label: "Viola", cover: "#4b3a6b", dark: "#33264a" },
  { key: "grafite", label: "Grafite", cover: "#3a3f47", dark: "#24282e" },
] as const;

export type NotebookCoverKey = (typeof notebookCovers)[number]["key"];

export function notebookCoverOf(key: string | null) {
  return notebookCovers.find((c) => c.key === key) ?? notebookCovers[0];
}
