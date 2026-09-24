"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { RegisterModal } from "@/components/auth/RegisterModal";

export function SaveToNotebookPrompt({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <Modal
        open={open && !registerOpen}
        onClose={onClose}
        eyebrow="BStudent"
        title="Crea un account per salvare questo articolo"
        maxWidthClassName="max-w-100"
      >
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f2ff]">
            <span className="text-2xl" aria-hidden="true">
              📓
            </span>
          </div>

          <p className="mt-5 text-sm leading-6 text-[#667085]">
            Salva questo articolo nel tuo Quaderno e ritrovalo quando vuoi,
            insieme a tutto ciò che impari su BStudent.
          </p>

          <button
            type="button"
            onClick={() => setRegisterOpen(true)}
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#3155d9] px-5 text-sm font-bold text-white shadow-[0_4px_0_#243fa8] transition hover:bg-[#5472df] active:translate-y-0.5 active:shadow-[0_2px_0_#243fa8]"
          >
            Crea un account gratuito
          </button>

          <p className="mt-4 text-xs text-[#667085]">
            Hai già un account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#3155d9] hover:underline"
            >
              Accedi
            </Link>
          </p>
        </div>
      </Modal>

      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  );
}
