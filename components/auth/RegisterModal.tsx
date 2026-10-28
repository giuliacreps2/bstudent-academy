"use client";

import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StepAccount } from "@/components/auth/StepAccount";
import { StepBirthDate } from "./StepBirthDate";
import { StepGuardian } from "./StepGuardian";
//import { StepEducation } from "./StepEducation";
import { StepSummary } from "./StepSummary";
import { RegistrationSent } from "./RegistrationSent";
import {
  ageFrom,
  EMAIL_PATTERN,
  register,
  sameEmail,
} from "@/lib/registration";
import { errorMessage } from "@/lib/api";
import {
  DIGITAL_CONSENT_AGE,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_HINT,
  USERNAME_PATTERN,
} from "@/constants/auth";

/*
 * DECISIONE FUTURA (rimandata dopo la v0.1): materie e obiettivi.
 * Gli step StepSubjects e StepGoals (e le liste in constants/constants.ts)
 * restano nel progetto ma non vengono mostrati, perché il backend non salva
 * questi dati. Da decidere: reinserirli in registrazione, spostarli nel
 * profilo (come la scuola, con XP) oppure dedurli dai corsi scelti.
 * In ogni caso servono i campi e l'endpoint nel backend.
 *
 * Scuola: facoltativa e fuori dalla registrazione, si aggiunge dal profilo
 * e completa il task "Aggiungi la tua scuola" (+XP).
 */

export type AccountData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type GuardianData = {
  email: string;
};

export type RegistrationData = {
  account: AccountData;
  birthDate: string;
  //education: EducationData;
  guardian: GuardianData;
  acceptedPolicy: boolean;
};

type StepKey = "account" | "birthDate" | "guardian" | "summary";

type RegisterModalProps = {
  open: boolean;
  onClose: () => void;

  /**
   * Il corso dal quale l'utente ha cliccato "Inizia il corso".
   * TODO: il backend non lo riceve ancora; dopo la conferma dell'email
   * si potrebbe portare lo studente direttamente al corso.
   */
  courseSlug?: string;
};

const initialData: RegistrationData = {
  account: { name: "", username: "", email: "", password: "" },
  birthDate: "",
  //education: { municipalityId: "", schoolId: "" },
  guardian: { email: "" },
  acceptedPolicy: false,
};

export function RegisterModal({
  open,
  onClose,
  courseSlug,
}: RegisterModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<RegistrationData>(initialData);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  // Solo per mostrare lo step del genitore: il backend ricalcola l'età e decide
  const age = ageFrom(data.birthDate);
  const isUnder14 = age !== null && age < DIGITAL_CONSENT_AGE;

  const steps: StepKey[] = isUnder14
    ? ["account", "birthDate", "guardian", "summary"]
    : ["account", "birthDate", "summary"];
  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  if (!open) return null;

  function handleClose() {
    // Dopo l'invio si riparte da zero; altrimenti i dati restano se si riapre
    if (sentTo) {
      setData(initialData);
      setStepIndex(0);
      setSentTo(null);
    }
    setError("");
    onClose();
  }

  function updateAccount(account: AccountData) {
    setData((current) => ({ ...current, account }));
  }

  function updateBirthDate(birthDate: string) {
    setData((current) => ({ ...current, birthDate }));
  }

  function updateGuardian(guardian: GuardianData) {
    setData((current) => ({ ...current, guardian }));
  }

  /** Stesse regole del backend, per non arrivare all'invio con un 400 */
  function validationError(key: StepKey): string | null {
    const { account } = data;

    switch (key) {
      case "account":
        if (!account.name.trim()) return "Inserisci il tuo nome.";
        if (!USERNAME_PATTERN.test(account.username.trim())) {
          return `Username non valido. ${USERNAME_HINT}`;
        }
        if (!EMAIL_PATTERN.test(account.email.trim())) {
          return "Inserisci un indirizzo email valido.";
        }
        if (account.password.length < PASSWORD_MIN_LENGTH) {
          return `La password deve contenere almeno ${PASSWORD_MIN_LENGTH} caratteri.`;
        }
        if (account.password.length > PASSWORD_MAX_LENGTH) {
          return `La password può avere al massimo ${PASSWORD_MAX_LENGTH} caratteri.`;
        }
        return null;

      case "birthDate":
        if (!data.birthDate || age === null) {
          return "Inserisci la tua data di nascita.";
        }
        if (age < 0 || new Date(data.birthDate) >= new Date()) {
          return "La data di nascita deve essere nel passato.";
        }
        if (age > 120) return "Controlla l'anno di nascita.";
        return null;

      case "guardian":
        if (!EMAIL_PATTERN.test(data.guardian.email.trim())) {
          return "Inserisci l'email di un genitore o tutore.";
        }
        if (sameEmail(data.guardian.email, account.email)) {
          return "L'email del genitore o tutore deve essere diversa dalla tua.";
        }
        return null;

      case "summary":
        return data.acceptedPolicy
          ? null
          : "Per continuare accetta i Termini e la Privacy Policy.";
    }
  }

  function validateStep() {
    const message = validationError(step);
    setError(message ?? "");
    return message === null;
  }

  function handleNext() {
    if (!validateStep()) return;
    setStepIndex((current) => Math.min(current + 1, steps.length - 1));
  }

  function handleBack() {
    setError("");
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      await register({
        email: data.account.email,
        password: data.account.password,
        firstName: data.account.name,
        birthDate: data.birthDate,
        username: data.account.username,
        guardianEmail: isUnder14 ? data.guardian.email : undefined,
      });
      setSentTo(data.account.email.trim());
    } catch (err) {
      const message = errorMessage(
        err,
        "Non siamo riusciti a completare la registrazione. Riprova tra poco.",
      );
      setError(message);
      // Username o email già in uso: si torna al primo step per correggerli
      if (/username|email già/i.test(message)) setStepIndex(0);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-[#172033]/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* MODAL */}
      <div className="relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-130 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#e5eaf2] px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3155d9]">
              BStudent
            </p>

            <p className="mt-1 text-sm font-medium text-[#667085]">
              Crea il tuo account
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#667085] transition hover:bg-[#f7f9fc] hover:text-[#172033]"
            aria-label="Chiudi"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {sentTo ? (
          <div className="overflow-y-auto px-5 py-8 sm:px-7">
            <RegistrationSent email={sentTo} isUnder14={isUnder14} />
          </div>
        ) : (
          <>
            {/* PROGRESS */}
            <div className="px-5 pt-5 sm:px-7">
              <div className="flex gap-1.5">
                {steps.map((key, index) => (
                  <div
                    key={key}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      index <= stepIndex ? "bg-[#3155d9]" : "bg-[#e5eaf2]"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-xs font-semibold text-[#667085]">
                Passaggio {stepIndex + 1} di {steps.length}
              </p>
            </div>

            {/* CONTENT */}
            <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
              {step === "account" && (
                <StepAccount value={data.account} onChange={updateAccount} />
              )}

              {step === "birthDate" && (
                <StepBirthDate
                  value={{ birthDate: data.birthDate }}
                  onChange={(v) => updateBirthDate(v.birthDate)}
                />
              )}

              {step === "guardian" && (
                <StepGuardian value={data.guardian} onChange={updateGuardian} />
              )}

              {step === "summary" && (
                <StepSummary
                  isUnder14={isUnder14}
                  courseSlug={courseSlug}
                  accepted={data.acceptedPolicy}
                  onAcceptedChange={(acceptedPolicy) =>
                    setData((current) => ({ ...current, acceptedPolicy }))
                  }
                />
              )}

              {error && (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                >
                  {error}
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-[#e5eaf2] px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={handleBack}
                disabled={stepIndex === 0}
                className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-[#667085] transition hover:bg-[#f7f9fc] hover:text-[#172033] disabled:pointer-events-none disabled:opacity-0"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Indietro
              </button>

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#3155d9] px-5 text-sm font-bold text-white shadow-[0_4px_0_#243fa8] transition hover:bg-[#5472df] active:translate-y-0.5 active:shadow-[0_2px_0_#243fa8]"
                >
                  Continua
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#3155d9] px-5 text-sm font-bold text-white shadow-[0_4px_0_#243fa8] transition hover:bg-[#5472df] active:translate-y-0.5 active:shadow-[0_2px_0_#243fa8] disabled:opacity-50"
                >
                  {isSubmitting ? "Invio in corso..." : "Crea il mio account"}
                  <CheckIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
