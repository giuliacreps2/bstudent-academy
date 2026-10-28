"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { StepHeading, Field, inputClass } from "./StepHeading";
import { GoogleButton, OrDivider } from "./GoogleButton";
import { USERNAME_HINT } from "@/constants/auth";
import type { AccountData } from "./RegisterModal";

type StepAccountProps = {
  value: AccountData;
  onChange: (value: AccountData) => void;
};

export function StepAccount({ value, onChange }: StepAccountProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <StepHeading
        title="Partiamo da te"
        description="Crea il tuo account per iniziare il tuo percorso."
      />

      {/* Con Google nome ed email arrivano da Google: il resto si completa su /register/google */}
      <div className="mt-7">
        <GoogleButton label="Registrati con Google" />
        <OrDivider />
      </div>

      <div className="space-y-4">
        <Field label="Nome">
          <input
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder="Come ti chiami?"
            className={inputClass}
            autoComplete="given-name"
          />
        </Field>

        <Field label="Username">
          <input
            value={value.username}
            onChange={(e) => onChange({ ...value, username: e.target.value })}
            placeholder="Il nome che vedranno gli altri"
            className={inputClass}
            autoComplete="username"
          />
          <span className="mt-1.5 block text-xs text-[#667085]">
            {USERNAME_HINT}
          </span>
        </Field>

        <Field label="Email">
          <input
            type="email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            placeholder="nome@email.com"
            className={inputClass}
            autoComplete="email"
          />
        </Field>

        <Field label="Password">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={value.password}
              onChange={(e) => onChange({ ...value, password: e.target.value })}
              placeholder="Almeno 8 caratteri"
              className={`${inputClass} pr-12`}
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085]"
              aria-label={showPassword ? "Nascondi password" : "Mostra password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </Field>
      </div>
    </div>
  );
}
