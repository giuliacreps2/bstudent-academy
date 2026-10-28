import Link from "next/link";
import type { ReactNode } from "react";

/** Contenitore comune alle pagine di accesso (login, link delle email, onboarding Google) */
export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-light-blue px-4 py-10">
      <Link href="/" className="mb-6" aria-label="Torna alla home di BStudent">
        <img
          alt="BStudent"
          src="/Logo-BStudent-Home-1.webp"
          className="h-12 w-auto"
        />
      </Link>

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-[#172033]">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm leading-6 text-[#667085]">{description}</p>
        )}

        <div className="mt-7">{children}</div>
      </div>

      {footer && (
        <div className="mt-6 text-center text-sm text-[#667085]">{footer}</div>
      )}
    </main>
  );
}
