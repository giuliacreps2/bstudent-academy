import { AuthCard } from "@/components/auth/AuthCard";
import { GoogleSignupForm } from "@/components/auth/GoogleSignupForm";

export const metadata = { title: "Completa la registrazione · BStudent" };

export default function GoogleSignupPage() {
  return (
    <AuthCard
      title="Ancora un paio di cose"
      description="Ci servono la data di nascita e lo username per creare il tuo account."
    >
      <GoogleSignupForm />
    </AuthCard>
  );
}
