import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { MissingToken, ResetPasswordForm } from "@/components/auth/TokenPages";
import { tokenFrom, tokenPageMetadata } from "@/lib/token-page";

export const metadata = { title: "Nuova password · BStudent", ...tokenPageMetadata };

export default async function ResetPasswordPage(props: PageProps<"/reset-password">) {
  const token = tokenFrom((await props.searchParams).token);

  return (
    <AuthCard
      title="Scegli una nuova password"
      footer={
        <Link href="/forgot-password" className="font-semibold text-brand-primary hover:underline">
          Richiedi un nuovo link
        </Link>
      }
    >
      {token ? <ResetPasswordForm token={token} /> : <MissingToken />}
    </AuthCard>
  );
}
