import type { LoginErrorCode } from "@/types/auth";

/**
 * Versione dell'informativa privacy accettata in registrazione.
 * Deve coincidere con registration.policy-version del backend, altrimenti
 * la registrazione viene rifiutata (400).
 */
export const POLICY_VERSION = "v0.1";

/** Età del consenso digitale: sotto serve il genitore/tutore (il backend ricalcola) */
export const DIGITAL_CONSENT_AGE = 14;

/** Stesse regole del backend */
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;
export const USERNAME_PATTERN = /^[a-zA-Z0-9_.]{3,20}$/;
export const USERNAME_HINT =
  "Da 3 a 20 caratteri: lettere, numeri, punto o trattino basso.";

/** Dopo il login si atterra qui */
export const HOME_AFTER_LOGIN = "/my/dashboard";

export const loginErrorMessages: Record<LoginErrorCode, string> = {
  google_login_failed:
    "L'accesso con Google non è andato a buon fine. Riprova.",
  google_email_unverified:
    "Il tuo indirizzo Google non è verificato. Verificalo su Google oppure accedi con email e password.",
  account_suspended:
    "Il tuo account è sospeso. Scrivici se pensi che sia un errore.",
  account_unavailable: "Questo account non è più disponibile.",
  google_account_mismatch:
    "Questa email è già collegata a un altro account Google. Accedi con email e password.",
  awaiting_guardian_consent:
    "La tua registrazione aspetta la conferma del genitore o tutore. Gli abbiamo scritto un'email.",
};
