import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { getCurrentUser } from "@/lib/api-server";
import { safeNextPath } from "@/lib/auth";
import { loginErrorMessages } from "@/constants/auth";
import type { LoginErrorCode } from "@/types/auth";

export default async function LoginPage(props: PageProps<"/login">) {
  const { error, next } = await props.searchParams;
  const nextPath = safeNextPath(next);

  // Già autenticato: niente form. Backend spento: si mostra comunque il form
  const user = await getCurrentUser().catch(() => null);
  if (user) redirect(nextPath);

  const initialError =
    typeof error === "string" && error in loginErrorMessages
      ? loginErrorMessages[error as LoginErrorCode]
      : undefined;

  return (
    <AuthCard
      title="Bentornato su BStudent"
      description="Accedi per riprendere il tuo percorso."
    >
      <LoginForm next={nextPath} initialError={initialError} />
    </AuthCard>
  );
}
