import type { ReactNode } from "react";
import { requireUser } from "@/lib/api-server";

// Missione in corso: pagina a tutto schermo, senza menu laterale, per concentrarsi sulla lettura e
// sull'esercizio. Sfondo chiaro: qui si legge (le preferenze di Accessibilità valgono già dal layout root)
export default async function PlayLayout({ children }: { children: ReactNode }) {
  await requireUser();
  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
}
