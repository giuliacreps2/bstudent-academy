import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api, ApiError, type ApiOptions } from "@/lib/api";
import type { LoggedUser } from "@/types/auth";

/* =====================================================================
   Chiamate al backend dai Server Component.
   La fetch parte dal server Next, non dal browser: il cookie della
   sessione va inoltrato a mano.
   In sviluppo funziona perché i cookie non distinguono le porte
   (localhost:8081 e localhost:3000 condividono il cookie di localhost).
   TODO (produzione): frontend e backend sullo stesso dominio padre
   (es. app.bstudent.it / api.bstudent.it) con Domain sul cookie.
   ===================================================================== */

export const ACCESS_TOKEN_COOKIE = "accessToken";

export async function serverApi<T = void>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;

  return api<T>(path, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Cookie: `${ACCESS_TOKEN_COOKIE}=${token}` }),
    },
  });
}

/**
 * Utente della sessione, oppure null se non autenticato o sessione scaduta.
 * cache(): layout e pagina della stessa richiesta fanno una sola chiamata a /auth/me
 */
export const getCurrentUser = cache(async (): Promise<LoggedUser | null> => {
  if (!(await cookies()).has(ACCESS_TOKEN_COOKIE)) return null;

  try {
    return await serverApi<LoggedUser>("/auth/me");
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
});

/** Per l'area riservata: senza sessione valida si torna al login */
export async function requireUser(): Promise<LoggedUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
