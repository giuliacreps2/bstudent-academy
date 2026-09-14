import type { DashboardData } from "@/types/dashboard";
import { NextStepBanner } from "./NextStepBanner";
import { ContinueBanner } from "./ContinueBanner";

export function WelcomeHeader({ data }: { data: DashboardData }) {
  const { user, hasStartedCourse, lastCourse } = data;
  const saluto = user.gender === "F" ? "Benvenuta" : "Benvenuto";
  const aggettivo = user.gender === "F" ? "pronta" : "pronto";

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Ciao {user.firstName}! 👋
        </h2>
        <p className="text-brand-muted">
          {saluto} su BStudent. Comincia il tuo percorso
        </p>
      </div>

      {hasStartedCourse && lastCourse ? (
        <ContinueBanner course={lastCourse} />
      ) : (
        <NextStepBanner />
      )}
    </section>
  );
}
