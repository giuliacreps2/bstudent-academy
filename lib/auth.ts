import { api, API_URL } from "@/lib/api";
import { HOME_AFTER_LOGIN } from "@/constants/auth";
import type { LoggedUser } from "@/types/auth";

/* =====================================================================
   Endpoint /auth del backend (lato client).
   Le email vanno sempre inviate senza spazi: il backend le rifiuta.
   ===================================================================== */

/** Navigazione completa, non fetch: il flusso OAuth2 passa da Google e torna al backend */
export const GOOGLE_LOGIN_URL = `${API_URL}/oauth2/authorization/google`;

export function login(email: string, password: string): Promise<LoggedUser> {
  return api<LoggedUser>("/auth/login", {
    body: { email: email.trim(), password },
  });
}

export function logout(): Promise<void> {
  return api("/auth/logout", { method: "POST" });
}

/** Sempre 202, anche se l'email non esiste. Per gli account solo Google imposta la prima password */
export function requestPasswordReset(email: string): Promise<void> {
  return api("/auth/password/forgot", { body: { email: email.trim() } });
}

export function resetPassword(token: string, newPassword: string): Promise<void> {
  return api("/auth/password/reset", { body: { token, newPassword } });
}

export function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> {
  return api("/auth/me/password", { method: "PATCH", body: input });
}

export function requestEmailVerification(): Promise<void> {
  return api("/auth/me/email-verification", { method: "POST" });
}

export function verifyEmail(token: string): Promise<void> {
  return api("/auth/email/verify", { body: { token } });
}

/**
 * Accetta solo percorsi interni ("/my/..."): un ?next= verso un altro sito
 * trasformerebbe il login in un redirect aperto.
 */
export function safeNextPath(value: unknown): string {
  if (typeof value !== "string") return HOME_AFTER_LOGIN;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return HOME_AFTER_LOGIN;
  }
  return value;
}
