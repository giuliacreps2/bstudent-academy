import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/TokenPages";

export const metadata = { title: "Password dimenticata · BStudent" };

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Password dimenticata?"
      description="Scrivi la tua email: ti mandiamo un link per sceglierne una nuova. Se ti sei registrato con Google, così puoi impostare anche una password."
      footer={
        <Link href="/login" className="font-semibold text-brand-primary hover:underline">
          Torna all&apos;accesso
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
