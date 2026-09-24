"use client";

import { notebookTabsMeta, notebookTabOrder } from "@/constants/notebook";
import type { NotebookTabKey } from "@/types/notebook";

export function NotebookTabs({
  active,
  onChange,
  counts,
}: {
  active: NotebookTabKey;
  onChange: (tab: NotebookTabKey) => void;
  counts: Record<NotebookTabKey, number>;
}) {
  return (
    <div className="flex items-end gap-1.5 px-2 sm:gap-2">
      {notebookTabOrder.map((key) => {
        const meta = notebookTabsMeta[key];
        const isActive = key === active;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={`relative rounded-t-xl px-4 py-2.5 text-sm font-bold transition ${
              isActive
                ? "bg-surface text-foreground"
                : "bg-white/60 text-brand-muted hover:bg-white/80"
            }`}
            style={
              isActive
                ? { boxShadow: `inset 0 3px 0 ${meta.accent}` }
                : undefined
            }
          >
            {meta.label}
            {counts[key] > 0 && (
              <span className="ml-1.5 text-xs text-brand-muted">
                {counts[key]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
