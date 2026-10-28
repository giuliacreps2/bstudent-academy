"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InlineMessage } from "@/components/account/AccountPrimitives";
import { Field, inputClass } from "./StepHeading";
import { GoogleButton } from "./GoogleButton";
import { RegistrationSent } from "./RegistrationSent";
import {
  ageFrom,
  completeGoogleSignup,
  EMAIL_PATTERN,
  getGoogleOnboarding,
  sameEmail,
} from "@/lib/registration";
import { ApiError, errorMessage } from "@/lib/api";
import {
  DIGITAL_CONSENT_AGE,
  HOME_AFTER_LOGIN,
  USERNAME_HINT,
  USERNAME_PATTERN,
} from "@/constants/auth";
import type { GoogleOnboarding } from "@/types/registration";

/**
 * Nuovo utente arrivato da Google: email e nome sono già verificati da Google,
 * mancano data di nascita, username e consenso (Google non fornisce l'età).
 */
export function GoogleSignupForm() {
  const router = useRouter();
  const [profile, setProfile] = useState<GoogleOnboarding | null>(null);
  const [expired, setExpired] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [awaitingGuardian, setAwaitingGuardian] = useState(false);

  useEffect(() => {
    getGoogleOnboarding()
      .then(setProfile)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) setExpired(true);
        else setLoadError(errorMessage(err, "Qualcosa è andato storto. Riprova."));
      });
  }, []);

  const age = ageFrom(birthDate);
  const isUnder14 = age !== null && age < DIGITAL_CONSENT_AGE;

  if (expired) {
    return (
      <div className="space-y-4">
        <InlineMessage kind="info">
          Sono passati più di 15 minuti dall&apos;accesso con Google. Rifallo
          per continuare la registrazione.
        </InlineMessage>
        <GoogleButton />
      </div>
    );
  }
  if (loadError) return <InlineMessage kind="error">{loadError}</InlineMessage>;
  if (!profile) return <p className="text-sm text-[#667085]">Caricamento...</p>;

  if (awaitingGuardian) {
    return <RegistrationSent email={profile.email} isUnder14 />;
  }

  function validationError(email: string): string | null {
    if (!birthDate || age === null) return "Inserisci la tua data di nascita.";
    if (age < 0 || new Date(birthDate) >= new Date()) {
      return "La data di nascita deve essere nel passato.";
    }
    if (age > 120) return "Controlla l'anno di nascita.";
    if (!USERNAME_PATTERN.test(username.trim())) {
      return `Username non valido. ${USERNAME_HINT}`;
    }
    if (isUnder14) {
      if (!EMAIL_PATTERN.test(guardianEmail.trim())) {
        return "Inserisci l'email di un genitore o tutore.";
      }
      if (sameEmail(guardianEmail, email)) {
        return "L'email del genitore o tutore deve essere diversa dalla tua.";
      }
    }
    if (!accepted) return "Per continuare accetta i Termini e la Privacy Policy.";
    return null;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const invalid = validationError(profile!.email);
    if (invalid) return setError(invalid);

    setError("");
    setIsSubmitting(true);
    try {
      const { created } = await completeGoogleSignup({
        birthDate,
        username,
        guardianEmail: isUnder14 ? guardianEmail : undefined,
      });
      if (created) {
        router.replace(HOME_AFTER_LOGIN);
        router.refresh();
        return;
      }
      setAwaitingGuardian(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) setExpired(true);
      else setError(errorMessage(err, "Non siamo riusciti a completare la registrazione. Riprova."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="rounded-2xl bg-[#f7f9fc] p-4 text-sm">
        <p className="font-bold text-[#172033]">
          {[profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
            "Account Google"}
        </p>
        <p className="text-[#667085]">{profile.email}</p>
      </div>

      <Field label="Data di nascita">
        <input
          type="date"
          value={birthDate}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setBirthDate(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Username">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Il nome che vedranno gli altri"
          className={inputClass}
          autoComplete="username"
        />
        <span className="mt-1.5 block text-xs text-[#667085]">{USERNAME_HINT}</span>
      </Field>

      {isUnder14 && (
        <Field label="Email del genitore o tutore">
          <input
            type="email"
            value={guardianEmail}
            onChange={(e) => setGuardianEmail(e.target.value)}
            placeholder="genitore@email.com"
            className={inputClass}
          />
          <span className="mt-1.5 block text-xs text-[#667085]">
            Sotto i 14 anni serve il consenso di un genitore o tutore: gli
            scriveremo un&apos;email.
          </span>
        </Field>
      )}

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e5eaf2] p-4">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#3155d9]"
        />
        <span className="text-sm leading-6 text-[#172033]">
          Ho letto e accetto i{" "}
          <a
            href="/privacy"
            target="_blank"
            className="font-semibold text-[#3155d9] hover:underline"
          >
            Termini di servizio e la Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && <InlineMessage kind="error">{error}</InlineMessage>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isSubmitting ? "Invio..." : "Crea il mio account"}
      </button>
    </form>
  );
}
