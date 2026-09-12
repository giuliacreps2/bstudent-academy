"use client";

import { useMemo, useState } from "react";
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
import { StepSubjects } from "./StepSubjects";
import { StepGoals } from "./StepGoals";
import { StepSummary } from "./StepSummary";

export type AccountData = {
  name: string;
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
  subjects: string[];
  goals: string[];
  guardian: GuardianData;
};

type RegisterModalProps = {
  open: boolean;
  onClose: () => void;

  /**
   * Il corso dal quale l'utente ha cliccato "Inizia il corso".
   * Non viene perso durante la registrazione.
   */
  courseSlug?: string;
};

const initialData: RegistrationData = {
  account: { name: "", email: "", password: "" },
  birthDate: "",
  //education: { municipalityId: "", schoolId: "" },
  subjects: [],
  goals: [],
  guardian: { email: "" },
};

export function RegisterModal({
  open,
  onClose,
  courseSlug,
}: RegisterModalProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RegistrationData>(initialData);
  const [error, setError] = useState("");

  /**
   * Per il momento calcoliamo l'età lato frontend.
   *
   * ATTENZIONE:
   * il backend dovrà comunque ricalcolarla e non fidarsi
   * del valore inviato dal client.
   */
  const age = useMemo(() => {
    if (!data.birthDate) return null;

    const birth = new Date(data.birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();

    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      years--;
    }

    return years;
  }, [data.birthDate]);

  const isUnder14 = age !== null && age < 14;
  const totalSteps = 5;

  if (!open) return null;

  function updateAccount(account: AccountData) {
    setData((current) => ({ ...current, account }));
  }

  function updateBirthDate(birthDate: string) {
    setData((current) => ({ ...current, birthDate }));
  }

  function updateGuardian(guardian: GuardianData) {
    setData((current) => ({ ...current, guardian }));
  }

  function toggleArrayValue(key: "subjects" | "goals", value: string) {
    setData((current) => {
      const currentValues = current[key];
      const exists = currentValues.includes(value);

      return {
        ...current,
        [key]: exists
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  }

  function validateStep() {
    setError("");

    if (step === 1) {
      if (!data.account.name.trim()) {
        setError("Inserisci il tuo nome.");
        return false;
      }

      if (!data.account.email.trim()) {
        setError("Inserisci la tua email.");
        return false;
      }

      if (!data.account.password || data.account.password.length < 8) {
        setError("La password deve contenere almeno 8 caratteri.");
        return false;
      }
    }

    if (step === 2) {
      if (!data.birthDate) {
        setError("Inserisci la tua data di nascita.");
        return false;
      }
    }

    if (step === 3 && isUnder14) {
      if (!data.guardian.email.trim()) {
        setError("Inserisci l'email di un genitore o tutore.");
        return false;
      }
    }

    return true;
  }

  function handleNext() {
    if (!validateStep()) return;

    if (step < totalSteps) {
      setStep((current) => current + 1);
    }
  }

  function handleBack() {
    setError("");

    if (step > 1) {
      setStep((current) => current - 1);
    }
  }

  async function handleSubmit() {
    if (!validateStep()) return;

    /**
     * Per ora non chiamiamo ancora il backend.
     *
     * Questo sarà il punto in cui collegheremo:
     *
     * POST /auth/register
     *
     * e passeremo:
     *
     * - user data
     * - student data
     * - guardian data, se necessario
     * - courseSlug
     */

    const payload = {
      ...data,
      courseSlug,
      age,
      studentPath: isUnder14 ? "UNDER_14" : "OVER_14",
    };

    console.log("REGISTER PAYLOAD", payload);

    // TODO:
    // await register(payload)
    // router.push("/dashboard");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-[#172033]/70 backdrop-blur-sm"
        onClick={onClose}
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
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#667085] transition hover:bg-[#f7f9fc] hover:text-[#172033]"
            aria-label="Chiudi"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* PROGRESS */}
        <div className="px-5 pt-5 sm:px-7">
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const stepNumber = index + 1;

              return (
                <div
                  key={stepNumber}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    stepNumber <= step ? "bg-[#3155d9]" : "bg-[#e5eaf2]"
                  }`}
                />
              );
            })}
          </div>

          <p className="mt-3 text-xs font-semibold text-[#667085]">
            Passaggio {step} di {totalSteps}
          </p>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          {step === 1 && (
            <StepAccount value={data.account} onChange={updateAccount} />
          )}

          {step === 2 && (
            <StepBirthDate
              value={{ birthDate: data.birthDate }}
              onChange={(v) => updateBirthDate(v.birthDate)}
            />
          )}

          {step === 3 && isUnder14 && (
            <StepGuardian value={data.guardian} onChange={updateGuardian} />
          )}

          {step === 3 && !isUnder14 && (
            <StepSubjects
              selected={data.subjects}
              toggle={(value) => toggleArrayValue("subjects", value)}
            />
          )}

          {step === 4 && isUnder14 && (
            <StepSubjects
              selected={data.subjects}
              toggle={(value) => toggleArrayValue("subjects", value)}
            />
          )}

          {step === 4 && !isUnder14 && (
            <StepGoals
              selected={data.goals}
              toggle={(value) => toggleArrayValue("goals", value)}
            />
          )}

          {step === 5 && (
            <StepSummary
              data={data}
              isUnder14={isUnder14}
              courseSlug={courseSlug}
            />
          )}

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-[#e5eaf2] px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-[#667085] transition hover:bg-[#f7f9fc] hover:text-[#172033] disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Indietro
          </button>

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#3155d9] px-5 text-sm font-bold text-white shadow-[0_4px_0_#243fa8] transition hover:bg-[#5472df] active:translate-y-[2px] active:shadow-[0_2px_0_#243fa8]"
            >
              Continua
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#3155d9] px-5 text-sm font-bold text-white shadow-[0_4px_0_#243fa8] transition hover:bg-[#5472df] active:translate-y-[2px] active:shadow-[0_2px_0_#243fa8]"
            >
              Inizia su BStudent
              <CheckIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
