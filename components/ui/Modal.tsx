"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  maxWidthClassName?: string; // es. "max-w-130"
}

export function Modal({
  open,
  onClose,
  eyebrow,
  title,
  children,
  maxWidthClassName = "max-w-130",
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#172033]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative z-10 flex max-h-[calc(100vh-2rem)] w-full ${maxWidthClassName} flex-col overflow-hidden rounded-3xl bg-white shadow-2xl`}
      >
        {(title || eyebrow) && (
          <div className="flex items-center justify-between border-b border-[#e5eaf2] px-5 py-4 sm:px-7">
            <div>
              {eyebrow && (
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3155d9]">
                  {eyebrow}
                </p>
              )}
              {title && (
                <p className="mt-1 text-sm font-medium text-[#667085]">
                  {title}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#667085] transition hover:bg-[#f7f9fc] hover:text-[#172033]"
              aria-label="Chiudi"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          {children}
        </div>
      </div>
    </div>
  );
}
