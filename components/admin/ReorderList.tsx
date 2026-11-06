"use client";

import Link from "next/link";
import { reorderLessons, reorderMissions } from "@/lib/admin";
import type { AccessTier, ContentStatus } from "@/types/admin";
import { buttonClass, EmptyNote, Notice, StatusBadge, TierBadge } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Elenco ordinato con frecce ↑ ↓. Ogni spostamento manda al backend l'ordine completo { ids }.
   TODO (grafica): trascinamento (drag & drop) al posto delle frecce */

type Container = "course" | "mission";

const REORDER: Record<Container, (containerId: number, ids: number[]) => Promise<unknown>> = {
  course: reorderMissions,
  mission: reorderLessons,
};

export type ReorderItem = {
  id: number;
  title: string;
  href: string;
  status: ContentStatus;
  /** Solo per le missioni */
  tier?: AccessTier | null;
  /** Riga secondaria sotto il titolo (es. l'esercizio collegato alla lezione) */
  detail?: string;
};

export default function ReorderList({
  container,
  containerId,
  items,
  emptyText,
}: {
  container: Container;
  containerId: number;
  items: ReorderItem[];
  emptyText: string;
}) {
  const { run, pending, error } = useAdminMutation();

  function move(index: number, delta: -1 | 1) {
    const ids = items.map((item) => item.id);
    const target = index + delta;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    run(() => REORDER[container](containerId, ids));
  }

  if (items.length === 0) return <EmptyNote>{emptyText}</EmptyNote>;

  return (
    <div>
      <ol className="divide-y divide-border">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center gap-3 py-2">
            <span className="w-6 text-right text-sm text-brand-muted">{index + 1}.</span>
            <div className="flex-1">
              <Link href={item.href} className="font-medium hover:underline">{item.title}</Link>
              {item.detail && <p className="text-sm text-brand-muted">{item.detail}</p>}
            </div>
            {item.tier !== undefined && <TierBadge tier={item.tier} />}
            <StatusBadge status={item.status} />
            <div className="flex gap-1">
              <button
                type="button"
                className={buttonClass.secondary}
                disabled={pending || index === 0}
                onClick={() => move(index, -1)}
                aria-label={`Sposta su ${item.title}`}
              >
                ↑
              </button>
              <button
                type="button"
                className={buttonClass.secondary}
                disabled={pending || index === items.length - 1}
                onClick={() => move(index, 1)}
                aria-label={`Sposta giù ${item.title}`}
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ol>
      {error && <Notice tone="error">{error}</Notice>}
    </div>
  );
}
