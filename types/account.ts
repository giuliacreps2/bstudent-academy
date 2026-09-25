export type AccountSectionKey =
  | "profilo"
  | "account"
  | "notifiche"
  | "accessibilita"
  | "privacy";

export interface AccountProfile {
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  /** Nome del personaggio attuale, es. "Studentessa" */
  avatarName: string;
  /** già formattata lato BE, es. "12 set 2025" */
  joinedAt: string;
  /** Calcolato dal backend: il client non deve fidarsi della propria data */
  isUnder14: boolean;
  guardianEmail?: string;
}

export interface NotificationPreferences {
  studyReminders: boolean;
  missionsToContinue: boolean;
  news: boolean;
}

export interface PrivacyConsent {
  id: string;
  label: string;
  description: string;
  /** I consensi necessari non si possono disattivare */
  required: boolean;
  granted: boolean;
  href?: string;
}

export interface AccountPageData {
  profile: AccountProfile;
  notifications: NotificationPreferences;
  consents: PrivacyConsent[];
}

/* ===== Preferenze di lettura ===== */

export type ReadingFont = "standard" | "high-readability" | "dyslexia";
export type ReadingTextSize = "sm" | "md" | "lg";
export type ReadingSpacing = "standard" | "wide";

export interface ReadingPreferences {
  font: ReadingFont;
  textSize: ReadingTextSize;
  spacing: ReadingSpacing;
}

/* ===== Azioni che coinvolgono i dati ===== */

export type SensitiveAction = "delete-account" | "export-data";

/**
 * "done" = eseguita; "guardian-required" = per gli under 14 la richiesta
 * viene inoltrata al genitore/tutore, che deve confermarla.
 */
export type SensitiveActionOutcome = "done" | "guardian-required";
