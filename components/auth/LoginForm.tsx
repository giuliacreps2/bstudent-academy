"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Field, inputClass } from "./StepHeading";
import { GoogleButton, OrDivider } from "./GoogleButton";
import { RegisterModal } from "./RegisterModal";
import { InlineMessage } from "@/components/account/AccountPrimitives";
import { login } from "@/lib/auth";
import { errorMessage } from "@/lib/api";

export function LoginForm({
  next,
  initialError,
}: {
  /** Dove tornare dopo il login (già validato da safeNextPath) */
  next: string;
  /** Messaggio per il ?error= arrivato dal ritorno di Google */
  initialError?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(initialError ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!email.trim()) return setError("Inserisci la tua email.");
    if (!password) return setError("Inserisci la password.");

    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(errorMessage(err, "Email o password non corrette."));
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <GoogleButton />
      <OrDivider />

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@email.com"
            className={inputClass}
            autoComplete="email"
          />
        </Field>

        <Field label="Password">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-12`}
              autoComplete="current-password"
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

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-brand-primary hover:underline"
          >
            Password dimenticata?
          </Link>
        </div>

        {error && <InlineMessage kind="error">{error}</InlineMessage>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-50"
        >
          {isSubmitting ? "Accesso in corso..." : "Accedi"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#667085]">
        Non hai un account?{" "}
        <button
          type="button"
          onClick={() => setIsRegisterOpen(true)}
          className="font-semibold text-brand-primary hover:underline"
        >
          Registrati gratis
        </button>
      </p>

      <RegisterModal
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
