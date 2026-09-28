"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ArticleContent } from "@/components/article/ArticleContent";
import type { ResourceInsight } from "@/types/resourceDetail";

interface ResourceInsightsProps {
  id: string;
  insights: ResourceInsight[];
}

export function ResourceInsights({ id, insights }: ResourceInsightsProps) {
  // Ogni accordion si apre e si chiude in modo indipendente
  const [openIds, setOpenIds] = useState<Set<string>>(
    () =>
      new Set(
        insights.filter((insight) => insight.defaultOpen).map((i) => i.id),
      ),
  );

  function toggle(insightId: string) {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(insightId)) next.delete(insightId);
      else next.add(insightId);
      return next;
    });
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2
        id={`${id}-title`}
        className="text-2xl font-extrabold tracking-tight text-foreground"
      >
        Spiegazione
      </h2>

      <div className="mt-4 space-y-3">
        {insights.map((insight) => {
          const isOpen = openIds.has(insight.id);
          const buttonId = `${id}-${insight.id}-button`;
          const panelId = `${id}-${insight.id}-panel`;

          return (
            <div
              key={insight.id}
              className="overflow-hidden rounded-lg border border-border bg-surface"
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(insight.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold transition-colors hover:text-brand-primary"
                >
                  {insight.title}
                  <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 text-brand-muted transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5">
                    <ArticleContent blocks={insight.blocks} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
