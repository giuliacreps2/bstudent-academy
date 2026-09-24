"use client";

import { useState } from "react";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { SaveToNotebookPrompt } from "./SaveToNotebookPrompt";

interface SaveToNotebookButtonProps {
  isLoggedIn: boolean;
  initialSaved?: boolean;
  variant?: "compact" | "full";
  onToggle?: (saved: boolean) => void;
}

export function SaveToNotebookButton({
  isLoggedIn,
  initialSaved = false,
  variant = "compact",
  onToggle,
}: SaveToNotebookButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [promptOpen, setPromptOpen] = useState(false);

  function handleClick() {
    if (!isLoggedIn) {
      setPromptOpen(true);
      return;
    }
    const next = !saved;
    setSaved(next);
    onToggle?.(next);
  }

  const isFull = variant === "full";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        className={
          isFull
            ? "btn-primary w-full justify-center"
            : "inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition hover:text-brand-primary-hover"
        }
      >
        {saved ? (
          <HeartSolidIcon
            className={
              isFull ? "h-4 w-4 text-white" : "h-4 w-4 text-brand-secondary"
            }
          />
        ) : (
          <HeartOutlineIcon
            className={isFull ? "h-4 w-4 text-white" : "h-4 w-4"}
          />
        )}
        {saved ? "Salvato nel Quaderno" : "Salva nel Quaderno"}
      </button>

      <SaveToNotebookPrompt
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
      />
    </>
  );
}
