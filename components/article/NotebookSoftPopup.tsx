"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SaveToNotebookButton } from "./SaveToNotebookButton";

interface NotebookSoftPopupProps {
  isLoggedIn: boolean;
  /** ms prima della comparsa — configurabile/testabile, default ~35s */
  delayMs?: number;
}

export function NotebookSoftPopup({
  isLoggedIn,
  delayMs = 35000,
}: NotebookSoftPopupProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs, dismissed]);

  if (!visible || dismissed) return null;

  function handleDismiss() {
    setDismissed(true);
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 sm:hidden">
      <div className="relative rounded-2xl border border-border bg-surface p-4 shadow-[0_-8px_24px_rgba(23,32,51,0.14)]">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Chiudi"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-brand-muted transition hover:bg-surface-blue hover:text-foreground"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <span className="text-xl shrink-0" aria-hidden="true">
            📓
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">
              Ti interessa questo articolo?
            </p>
            <p className="mt-0.5 text-xs leading-5 text-brand-muted">
              Salvalo nel tuo Quaderno e ritrovalo quando vuoi.
            </p>
          </div>
        </div>

        <div className="mt-3">
          <SaveToNotebookButton
            isLoggedIn={isLoggedIn}
            variant="full"
            onToggle={handleDismiss}
          />
        </div>

        {!isLoggedIn && (
          <p className="mt-2 text-center text-[11px] text-brand-muted">
            Non hai un account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-primary hover:underline"
            >
              Creane uno gratuitamente
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
