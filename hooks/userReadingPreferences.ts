"use client";

import { useCallback, useEffect, useState } from "react";
import { defaultReadingPreferences } from "@/constants/account";
import {
  applyReadingPreferences,
  loadReadingPreferences,
  saveReadingPreferences,
} from "@/lib/readingPreferences";
import type { ReadingPreferences } from "@/types/account";

export function useReadingPreferences() {
  const [preferences, setPreferences] = useState<ReadingPreferences>(
    defaultReadingPreferences,
  );

  useEffect(() => {
    setPreferences(loadReadingPreferences());
  }, []);

  const commit = useCallback((next: ReadingPreferences) => {
    setPreferences(next);
    saveReadingPreferences(next);
    applyReadingPreferences(next);
  }, []);

  const update = useCallback(
    (patch: Partial<ReadingPreferences>) =>
      commit({ ...preferences, ...patch }),
    [preferences, commit],
  );

  const reset = useCallback(() => commit(defaultReadingPreferences), [commit]);

  const isDefault =
    preferences.font === defaultReadingPreferences.font &&
    preferences.textSize === defaultReadingPreferences.textSize &&
    preferences.spacing === defaultReadingPreferences.spacing;

  return { preferences, update, reset, isDefault };
}
