import { AuthCard } from "@/components/auth/AuthCard";
import { GuardianConsent } from "@/components/auth/GuardianConsent";
import { MissingToken } from "@/components/auth/TokenPages";
import { getCurrentUser } from "@/lib/api-server";
import { tokenFrom, tokenPageMetadata } from "@/lib/token-page";

export const metadata = { title: "Consenso del genitore · BStudent", ...tokenPageMetadata };

export default async function GuardianConsentPage(
  props: PageProps<"/registration/guardian-consent">,
) {
  const token = tokenFrom((await props.searchParams).token);
  // Se il genitore ha già un account il backend richiede la sua sessione
  const user = await getCurrentUser().catch(() => null);

  return (
    <AuthCard title="Consenso del genitore o tutore">
      {token ? (
        <GuardianConsent token={token} currentEmail={user?.email ?? null} />
      ) : (
        <MissingToken />
      )}
    </AuthCard>
  );
}
