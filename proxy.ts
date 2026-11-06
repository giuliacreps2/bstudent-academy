import { NextResponse, type NextRequest } from "next/server";

/*
 * Controllo ottimistico: senza il cookie della sessione le aree /my e /admin
 * non si aprono nemmeno e si va al login ricordando la pagina richiesta.
 * La verifica vera (token valido, utente attivo, ruolo ADMIN) la fanno i layout con /auth/me.
 */
export function proxy(request: NextRequest) {
  if (request.cookies.has("accessToken")) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const login = new URL("/login", request.url);
  login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/my/:path*", "/admin/:path*"],
};
