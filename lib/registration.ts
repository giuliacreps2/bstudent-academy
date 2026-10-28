import { api } from "@/lib/api";
import { POLICY_VERSION } from "@/constants/auth";
import type {
  GoogleOnboarding,
  GuardianConsentInput,
  RegistrationPreview,
} from "@/types/registration";
import type { LoggedUser } from "@/types/auth";

/* =====================================================================
   Registrazione (RegistrationController del backend).
   L'età la ricalcola il server: quella del client serve solo alla UI.
   ===================================================================== */

/** Età compiuta a oggi da una data "AAAA-MM-GG" */
export function ageFrom(birthDate: string): number | null {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return null;

  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
    years--;
  }
  return years;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sameEmail(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

/** Risposta 202: il backend invia l'email di conferma (o del consenso al genitore) */
export function register(input: {
  email: string;
  password: string;
  firstName: string;
  birthDate: string;
  username: string;
  guardianEmail?: string;
}): Promise<void> {
  return api("/auth/register", {
    body: {
      email: input.email.trim(),
      password: input.password,
      firstName: input.firstName.trim() || null,
      birthDate: input.birthDate,
      username: input.username.trim(),
      guardianEmail: input.guardianEmail?.trim() || null,
      policyVersion: POLICY_VERSION,
    },
  });
}

/** Sempre 202, anche se la richiesta non esiste: il backend non rivela nulla */
export function resendConfirmation(email: string): Promise<void> {
  return api("/auth/registration/resend", { body: { email: email.trim() } });
}

/** Link dell'email dello studente: crea l'account e apre la sessione */
export function confirmRegistration(token: string): Promise<LoggedUser> {
  return api<LoggedUser>("/auth/registration/confirm", { body: { token } });
}

export function previewRegistration(token: string): Promise<RegistrationPreview> {
  return api<RegistrationPreview>("/auth/registration/preview", {
    body: { token },
  });
}

/**
 * Consenso del genitore/tutore. Senza account serve la password per crearlo;
 * con un account già esistente la richiesta deve partire da una sessione attiva.
 */
export function giveGuardianConsent(input: GuardianConsentInput): Promise<void> {
  return api("/auth/registration/guardian-consent", {
    body: {
      ...input,
      firstName: input.firstName?.trim() || null,
      lastName: input.lastName?.trim() || null,
      consentGiven: true,
      policyVersion: POLICY_VERSION,
    },
  });
}

/* ===== Secondo passaggio della registrazione con Google ===== */

/** Dati del profilo Google, letti dal cookie httpOnly di onboarding (vale 15 minuti) */
export function getGoogleOnboarding(): Promise<GoogleOnboarding> {
  return api<GoogleOnboarding>("/auth/google/onboarding");
}

/**
 * 201 con l'utente (dai 14 anni: account creato e sessione aperta),
 * 202 senza body (sotto i 14 anni: si attende il consenso del genitore).
 */
export async function completeGoogleSignup(input: {
  birthDate: string;
  username: string;
  guardianEmail?: string;
}): Promise<{ created: boolean }> {
  const user = await api<LoggedUser | undefined>("/auth/google/complete", {
    body: {
      birthDate: input.birthDate,
      username: input.username.trim(),
      guardianEmail: input.guardianEmail?.trim() || null,
      policyVersion: POLICY_VERSION,
    },
  });
  return { created: user !== undefined };
}

export function rejectGuardianConsent(token: string): Promise<void> {
  return api("/auth/registration/guardian-consent/reject", { body: { token } });
}
