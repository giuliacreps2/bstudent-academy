import { AuthCard } from "@/components/auth/AuthCard";
import { ConfirmRegistration, MissingToken } from "@/components/auth/TokenPages";
import { tokenFrom, tokenPageMetadata } from "@/lib/token-page";

export const metadata = { title: "Attiva il tuo account · BStudent", ...tokenPageMetadata };

export default async function ConfirmRegistrationPage(
  props: PageProps<"/registration/confirm">,
) {
  const token = tokenFrom((await props.searchParams).token);

  return (
    <AuthCard
      title="Benvenuto su BStudent!"
      description="Un ultimo clic per confermare la tua email e attivare l'account."
    >
      {token ? <ConfirmRegistration token={token} /> : <MissingToken />}
    </AuthCard>
  );
}
