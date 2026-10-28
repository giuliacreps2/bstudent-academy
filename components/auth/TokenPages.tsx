"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { InlineMessage } from "@/components/account/AccountPrimitives";
import { Field, inputClass } from "./StepHeading";
import { PasswordField, newPasswordError } from "./PasswordField";
import { confirmRegistration, EMAIL_PATTERN } from "@/lib/registration";
import { requestPasswordReset, resetPassword, verifyEmail } from "@/lib/auth";
import { errorMessage } from "@/lib/api";
import { HOME_AFTER_LOGIN } from "@/constants/auth";

/*
 * Pagine aperte dai link delle email. Il token si usa solo dopo un clic:
 * alcuni client di posta aprono i link in anticipo per controllarli,
 * e consumerebbero il token monouso.
 */

const INVALID_LINK =
  "Il link non è valido o è scaduto. Richiedine uno nuovo e usa l'ultimo ricevuto.";

export function Done({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <CheckCircleIcon className="mx-auto h-12 w-12 text-brand-success" />
      <div className="mt-4 text-sm leading-6 text-[#667085]">{children}</div>
    </div>
  );
}

/** /registration/confirm: crea l'account e apre la sessione */
export function ConfirmRegistration({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleConfirm() {
    setError("");
    setIsSubmitting(true);
    try {
      await confirmRegistration(token);
      router.replace(HOME_AFTER_LOGIN);
      router.refresh();
    } catch (err) {
      setError(errorMessage(err, INVALID_LINK));
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      {error && <InlineMessage kind="error">{error}</InlineMessage>}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isSubmitting ? "Attivazione..." : "Attiva il mio account"}
      </button>
    </div>
  );
}

/** /forgot-password: anche per impostare la prima password degli account Google */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      return setError("Inserisci un indirizzo email valido.");
    }
    setError("");
    setIsSubmitting(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(errorMessage(err, "Non siamo riusciti a inviare l'email. Riprova tra poco."));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sent) {
    return (
      <Done>
        Se <strong className="text-[#172033]">{email.trim()}</strong> è
        registrata su BStudent, riceverai un link per scegliere una nuova
        password. Vale 1 ora.
      </Done>
    );
  }

  return (
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
      {error && <InlineMessage kind="error">{error}</InlineMessage>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isSubmitting ? "Invio..." : "Inviami il link"}
      </button>
    </form>
  );
}

/** /reset-password */
export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const invalid = newPasswordError(password, confirm);
    if (invalid) return setError(invalid);

    setError("");
    setIsSubmitting(true);
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (err) {
      setError(errorMessage(err, INVALID_LINK));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (done) {
    return (
      <Done>
        <p>Password aggiornata. Ora puoi accedere con la nuova password.</p>
        <Link href="/login" className="btn-primary mt-5 w-full">
          Vai all&apos;accesso
        </Link>
      </Done>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <PasswordField
        label="Nuova password"
        value={password}
        onChange={setPassword}
        placeholder="Almeno 8 caratteri"
      />
      <PasswordField
        label="Ripeti la nuova password"
        value={confirm}
        onChange={setConfirm}
      />
      {error && <InlineMessage kind="error">{error}</InlineMessage>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isSubmitting ? "Salvataggio..." : "Salva la password"}
      </button>
    </form>
  );
}

/** /verify-email */
export function VerifyEmail({ token }: { token: string }) {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleVerify() {
    setError("");
    setIsSubmitting(true);
    try {
      await verifyEmail(token);
      setDone(true);
    } catch (err) {
      setError(errorMessage(err, INVALID_LINK));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (done) {
    return (
      <Done>
        <p>Email verificata, grazie!</p>
        <Link href={HOME_AFTER_LOGIN} className="btn-primary mt-5 w-full">
          Vai a BStudent
        </Link>
      </Done>
    );
  }

  return (
    <div className="space-y-4">
      {error && <InlineMessage kind="error">{error}</InlineMessage>}
      <button
        type="button"
        onClick={handleVerify}
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isSubmitting ? "Verifica..." : "Verifica la mia email"}
      </button>
    </div>
  );
}

/** Link aperto senza ?token= (copiato male dall'email) */
export function MissingToken() {
  return (
    <InlineMessage kind="error">
      Il link è incompleto. Aprilo di nuovo dall&apos;email oppure copialo per
      intero nel browser.
    </InlineMessage>
  );
}
