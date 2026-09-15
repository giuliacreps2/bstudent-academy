import type { DashboardUser } from "@/types/dashboard";

export function Greeting({ user }: { user: DashboardUser }) {
  const saluto = user.gender === "F" ? "Benvenuta" : "Benvenuto";
  const aggettivo = user.gender === "F" ? "pronta" : "pronto";

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground">
        Ciao {user.firstName}! 👋
      </h2>
      <p className="text-brand-muted">
        {saluto} su BStudent. Sei {aggettivo} a iniziare il tuo percorso?
      </p>
    </div>
  );
}
