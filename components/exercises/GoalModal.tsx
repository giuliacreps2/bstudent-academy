"use client";

import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Modal } from "@/components/ui/Modal";
import { skillsMeta, skillColorStyles } from "@/constants/skills";
import type { SkillKey, GoalSelection } from "@/types/skills";

interface GoalModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (selection: GoalSelection) => void;
}

const skillKeys = Object.keys(skillsMeta) as SkillKey[];

export function GoalModal({ open, onClose, onConfirm }: GoalModalProps) {
  const [selected, setSelected] = useState<GoalSelection | null>(null);

  function handleConfirm() {
    if (!selected) return;
    onConfirm(selected);
    onClose();
    setSelected(null);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow="BStudent"
      title="Qual è il tuo obiettivo oggi?"
    >
      <p className="text-sm leading-6 text-[#667085] mb-6">
        Scegli su cosa vuoi concentrarti: ti proponiamo 3 esercizi mirati.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {skillKeys.map((key) => {
          const meta = skillsMeta[key];
          const styles = skillColorStyles[meta.color];
          const Icon = meta.icon;
          const active = selected === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                active
                  ? "border-[#3155d9] bg-[#e8f2ff]"
                  : "border-[#e5eaf2] bg-white hover:border-[#3155d9]/40 hover:bg-[#f7f9fc]"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full shrink-0 ${styles.iconBg}`}
              >
                <Icon className={`h-4 w-4 ${styles.iconText}`} />
              </span>
              <span className="flex-1 text-sm font-bold text-[#172033]">
                {meta.label}
              </span>
              {active && (
                <CheckIcon className="h-5 w-5 text-[#3155d9] shrink-0" />
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setSelected("mix")}
          className={`sm:col-span-2 flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-bold transition ${
            selected === "mix"
              ? "border-[#3155d9] bg-[#e8f2ff] text-[#3155d9]"
              : "border-[#e5eaf2] bg-white text-[#172033] hover:border-[#3155d9]/40 hover:bg-[#f7f9fc]"
          }`}
        >
          Sorprendimi, mix di tutto
          {selected === "mix" && <CheckIcon className="h-5 w-5" />}
        </button>
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={!selected}
        className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#3155d9] px-5 text-sm font-bold text-white shadow-[0_4px_0_#243fa8] transition hover:bg-[#5472df] active:translate-y-0.5 active:shadow-[0_2px_0_#243fa8] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:translate-y-0"
      >
        Mostrami gli esercizi →
      </button>
    </Modal>
  );
}
