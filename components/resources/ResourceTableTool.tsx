"use client";

import { useState } from "react";
import type { ResourceTableTool as ResourceTableToolData } from "@/types/resourceDetail";

const inkStyle = { color: "var(--texture-papyrus-ink)" };
const inkMutedStyle = { color: "var(--texture-papyrus-ink-muted)" };

interface ResourceTableToolProps {
  id: string;
  tool: ResourceTableToolData;
}

export function ResourceTableTool({ id, tool }: ResourceTableToolProps) {
  const [activeId, setActiveId] = useState(tool.variants[0]?.id);

  const variant =
    tool.variants.find((item) => item.id === activeId) ?? tool.variants[0];

  if (!variant) return null;

  const hasToggle = tool.variants.length > 1;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="card-papyrus p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id={`${id}-title`}
            className="text-xl font-extrabold sm:text-2xl"
            style={inkStyle}
          >
            {tool.title}
          </h2>

          {hasToggle && (
            <div
              role="radiogroup"
              aria-label="Variante della tabella"
              className="inline-flex self-start rounded-full bg-white/50 p-1"
            >
              {tool.variants.map((item) => {
                const active = item.id === variant.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setActiveId(item.id)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                      active
                        ? "bg-brand-primary text-white"
                        : "hover:bg-white/60"
                    }`}
                    style={active ? undefined : inkStyle}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* TABELLA — si scorre in orizzontale su schermi stretti */}
        <div className="mt-5 overflow-x-auto rounded-lg bg-white/40">
          <table className="w-full min-w-80 border-collapse text-left">
            <caption className="sr-only">
              {tool.title} — {variant.label}
            </caption>
            <thead>
              <tr
                className="border-b"
                style={{ borderColor: "var(--texture-papyrus-border)" }}
              >
                {variant.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-4 py-3 text-xs font-extrabold uppercase tracking-wider"
                    style={inkMutedStyle}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8c49c]/50">
              {variant.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th
                        key={index}
                        scope="row"
                        className="px-4 py-3 text-sm font-bold sm:text-base"
                        style={inkStyle}
                      >
                        {cell}
                      </th>
                    ) : (
                      <td
                        key={index}
                        className="px-4 py-3 text-base font-semibold italic sm:text-lg"
                        style={inkStyle}
                      >
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {variant.note && (
          <p className="mt-3 text-sm leading-6" style={inkMutedStyle}>
            {variant.note}
          </p>
        )}
      </div>
    </section>
  );
}
