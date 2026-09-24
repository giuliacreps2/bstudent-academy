"use client";

import { useState } from "react";
import { NotebookCover } from "./NotebookCover";
import { NotebookTabs } from "./NotebookTabs";
import { NotebookEntryCard } from "./NotebookEntryCard";
import { NotebookEmptyState } from "./NotebookEmptyState";
import { notebookTabsMeta, notebookTabOrder } from "@/constants/notebook";
import type { NotebookOverviewData, NotebookTabKey } from "@/types/notebook";

export function NotebookOverview({ data }: { data: NotebookOverviewData }) {
  const [active, setActive] = useState<NotebookTabKey>(notebookTabOrder[0]);

  const counts = notebookTabOrder.reduce(
    (acc, key) => {
      acc[key] = data.entriesByTab[key]?.length ?? 0;
      return acc;
    },
    {} as Record<NotebookTabKey, number>,
  );

  const activeEntries = data.entriesByTab[active] ?? [];

  return (
    <div>
      <NotebookCover student={data.student} />

      <div className="mt-6">
        <NotebookTabs active={active} onChange={setActive} counts={counts} />

        <div className="card-notebook-page p-4 sm:p-6">
          {activeEntries.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {activeEntries.map((entry, index) => (
                <NotebookEntryCard key={entry.id} entry={entry} index={index} />
              ))}
            </div>
          ) : (
            <NotebookEmptyState tabLabel={notebookTabsMeta[active].label} />
          )}
        </div>
      </div>
    </div>
  );
}
