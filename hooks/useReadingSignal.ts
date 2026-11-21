"use client";

import { useEffect, useRef } from "react";
import { sendStudyEvent } from "@/lib/notebook-api";

/** Ogni quanto si invia un tratto di lettura (blueprint §10.5: segnale "sono ancora qui" ogni 30 s) */
const FLUSH_EVERY_MS = 30_000;
/** Dopo 10 minuti senza scorrere né toccare la pagina il tempo smette di contare */
const IDLE_AFTER_MS = 10 * 60_000;
/** Passo con cui si misura il tempo attivo */
const TICK_MS = 1_000;

type Target = { kind: "lesson_read"; lessonId: number; lessonPageId?: number } | { kind: "resource_read"; resourceId: number };

/**
 * Tempo attivo sulla teoria (blueprint §10.5): conta solo mentre la pagina è visibile e lo studente ha
 * interagito negli ultimi 10 minuti; invia un tratto ogni 30 secondi e quando la pagina si nasconde o si chiude.
 * target null = non misurare (es. lezione bloccata).
 */
export function useReadingSignal(target: Target | null) {
  const targetKey = target ? JSON.stringify(target) : null;
  const targetRef = useRef(target);
  useEffect(() => {
    targetRef.current = target;
  });

  useEffect(() => {
    if (!targetKey) return;
    let lastInteraction = Date.now();
    let segmentStart: number | null = null;
    let activeMs = 0;

    const flush = () => {
      const current = targetRef.current;
      if (current && segmentStart !== null && activeMs >= TICK_MS) {
        sendStudyEvent({ ...current, startedAt: new Date(segmentStart).toISOString(), activeMs });
      }
      segmentStart = null;
      activeMs = 0;
    };

    const onInteraction = () => {
      lastInteraction = Date.now();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
      else lastInteraction = Date.now();
    };

    const tick = setInterval(() => {
      const now = Date.now();
      const active = document.visibilityState === "visible" && now - lastInteraction < IDLE_AFTER_MS;
      if (!active) return;
      if (segmentStart === null) segmentStart = now - TICK_MS;
      activeMs += TICK_MS;
      if (now - segmentStart >= FLUSH_EVERY_MS) flush();
    }, TICK_MS);

    const events = ["scroll", "pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, onInteraction, { passive: true }));
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      clearInterval(tick);
      flush();
      events.forEach((e) => window.removeEventListener(e, onInteraction));
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
    };
  }, [targetKey]);
}
