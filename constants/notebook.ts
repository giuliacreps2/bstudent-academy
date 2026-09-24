import type { NotebookTabKey, NotebookTabMeta } from "@/types/notebook";

export const notebookTabsMeta: Record<NotebookTabKey, NotebookTabMeta> = {
  latino: { key: "latino", label: "Latino", accent: "#3155d9" },
  greco: { key: "greco", label: "Greco", accent: "#35c98a" },
  articoli: { key: "articoli", label: "Articoli", accent: "#e96a9a" },
};

export const notebookTabOrder: NotebookTabKey[] = [
  "latino",
  "greco",
  "articoli",
];
