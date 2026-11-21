"use client";

import { useReadingSignal } from "@/hooks/useReadingSignal";

/** Da mettere nelle pagine di teoria (Server Component): misura il tempo attivo di lettura */
export function ReadingSignal(
  props: { kind: "lesson_read"; lessonId: number } | { kind: "resource_read"; resourceId: number },
) {
  useReadingSignal(props);
  return null;
}
