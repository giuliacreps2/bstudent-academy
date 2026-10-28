/* =====================================================================
   Client HTTP verso il backend (BStudent-Management).
   Il JWT viaggia in un cookie httpOnly impostato dal backend: il frontend
   non lo legge mai, deve solo inviarlo (credentials: "include").
   Usabile sia nei componenti client sia sul server (vedi lib/api-server.ts).
   ===================================================================== */

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

export class ApiError extends Error {
  /** 0 = backend non raggiungibile */
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type ApiOptions = Omit<RequestInit, "body"> & {
  /** Oggetto serializzato in JSON */
  body?: unknown;
};

export async function api<T = void>(
  path: string,
  { body, headers, method, ...init }: ApiOptions = {},
): Promise<T> {
  let res: Response;

  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      method: method ?? (body === undefined ? "GET" : "POST"),
      credentials: "include",
      cache: "no-store",
      headers: {
        ...(body !== undefined && { "Content-Type": "application/json" }),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      0,
      "Non riusciamo a raggiungere BStudent. Controlla la connessione e riprova.",
    );
  }

  if (!res.ok) throw new ApiError(res.status, await readErrorMessage(res));

  // 202 e 204 del backend non hanno body
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

/** Il backend risponde agli errori con { message, now } (ErrorsDTO) */
async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.message === "string" && data.message) return data.message;
  } catch {
    // body vuoto o non JSON
  }
  return res.status === 401
    ? "Accesso necessario."
    : "Qualcosa è andato storto. Riprova tra poco.";
}

/**
 * Messaggio da mostrare all'utente. Gli errori di validazione del backend
 * ("campo: messaggio") sono tecnici: i form li prevengono con i propri
 * controlli, qui si mostra il fallback.
 */
export function errorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof ApiError)) return fallback;
  if (error.status === 0) return error.message;
  if (error.status === 400 && /^\w+: /.test(error.message)) return fallback;
  return error.status >= 500 ? fallback : error.message;
}
