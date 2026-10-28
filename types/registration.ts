/** RegistrationPreviewDTO: cosa mostra la pagina del link ricevuto via email */
export interface RegistrationPreview {
  studentName: string | null;
  studentUsername: string;
  requiresGuardianConsent: boolean;
  /** true: il genitore deve accedere; false: crea il suo account con una password */
  guardianHasAccount: boolean;
  policyVersion: string;
  expiresAt: string;
}

/** GoogleOnboardingDTO: precompila il form di /register/google */
export interface GoogleOnboarding {
  email: string;
  firstName: string | null;
  lastName: string | null;
}

/** Valori dell'enum Relationship del backend */
export type GuardianRelationship =
  | "parents"
  | "legal_guardian"
  | "custodian"
  | "relative"
  | "other";

export interface GuardianConsentInput {
  token: string;
  relationship: GuardianRelationship;
  firstName?: string;
  lastName?: string;
  /** Solo se il genitore non ha ancora un account */
  password?: string;
}
