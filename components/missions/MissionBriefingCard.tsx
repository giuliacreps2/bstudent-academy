"use client";

import { useState } from "react";
import type { MissionBriefing } from "@/types/courses";

/**
 * Briefing prima di "Inizia" (blueprint §5.9): la guida della materia presenta la missione con 1-5 battute
 * e un video facoltativo. Si può saltare.
 */
export function MissionBriefingCard({ briefing }: { briefing: MissionBriefing }) {
  const [skipped, setSkipped] = useState(false);
  const hasVideo = Boolean(briefing.videoProvider && briefing.videoIdentifier);
  if (briefing.lines.length === 0 && !hasVideo) return null;

  if (skipped) {
    return (
      <button
        type="button"
        onClick={() => setSkipped(false)}
        className="text-sm font-semibold text-white/80 underline-offset-4 hover:underline"
      >
        Rivedi il briefing
      </button>
    );
  }

  const id = encodeURIComponent(briefing.videoIdentifier?.trim() ?? "");
  const src =
    briefing.videoProvider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${id}?rel=0`
      : briefing.videoProvider === "vimeo"
        ? `https://player.vimeo.com/video/${id}`
        : null;

  return (
    <section aria-label="Briefing" className="rounded-2xl bg-white/95 p-5 text-foreground shadow-lg">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-blue text-2xl" aria-hidden="true">
          🦉
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-primary">
            {briefing.guideName ?? "La tua guida"}
          </p>
          <div className="mt-2 space-y-2">
            {briefing.lines.map((line, i) => (
              <p key={i} className="rounded-xl bg-surface-blue px-3 py-2 text-sm leading-6">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {src && (
        <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            src={src}
            title="Video del briefing"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}

      <div className="mt-3 text-right">
        <button type="button" onClick={() => setSkipped(true)} className="text-sm font-semibold text-brand-muted hover:text-foreground">
          Salta il briefing
        </button>
      </div>
    </section>
  );
}
