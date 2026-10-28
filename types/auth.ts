/** Risposta di /auth/me e del login (LoggedUserDTO nel backend) */
export interface LoggedUser {
  userId: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roles: string[];
  emailVerified: boolean;
  /** false per gli account creati con Google: possono impostarla dal reset */
  hasLocalPassword: boolean;
  /** Identità Google collegata all'account */
  googleLinked: boolean;
  /** Valorizzati solo se l'utente ha un profilo studente */
  studentId: number | null;
  username: string | null;
}

/** Codici passati dal backend come /login?error=<codice> */
export type LoginErrorCode =
  | "google_login_failed"
  | "google_email_unverified"
  | "account_suspended"
  | "account_unavailable"
  | "google_account_mismatch"
  | "awaiting_guardian_consent";
