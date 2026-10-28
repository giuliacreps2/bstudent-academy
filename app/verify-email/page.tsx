import { AuthCard } from "@/components/auth/AuthCard";
import { MissingToken, VerifyEmail } from "@/components/auth/TokenPages";
import { tokenFrom, tokenPageMetadata } from "@/lib/token-page";

export const metadata = { title: "Verifica email · BStudent", ...tokenPageMetadata };

export default async function VerifyEmailPage(props: PageProps<"/verify-email">) {
  const token = tokenFrom((await props.searchParams).token);

  return (
    <AuthCard
      title="Verifica la tua email"
      description="Confermiamo che questo indirizzo è proprio tuo."
    >
      {token ? <VerifyEmail token={token} /> : <MissingToken />}
    </AuthCard>
  );
}
