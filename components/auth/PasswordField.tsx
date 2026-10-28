"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Field, inputClass } from "./StepHeading";

export function PasswordField({
  label,
  value,
  onChange,
  autoComplete = "new-password",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: "new-password" | "current-password";
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Field label={label}>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} pr-12`}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085]"
          aria-label={visible ? "Nascondi password" : "Mostra password"}
        >
          {visible ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </Field>
  );
}

/** Stesse regole del backend (8-72 caratteri); null se valida */
export function newPasswordError(password: string, confirm: string): string | null {
  if (password.length < 8) return "La password deve contenere almeno 8 caratteri.";
  if (password.length > 72) return "La password può avere al massimo 72 caratteri.";
  if (password !== confirm) return "Le due password non coincidono.";
  return null;
}
