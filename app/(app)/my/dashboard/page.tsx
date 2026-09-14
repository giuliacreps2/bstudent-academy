import { getDashboardData } from "@/lib/dashboard";
import { WelcomeHeader } from "@/components/dashboard/welcomeSection/WelcomeHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="order-2 lg:order-1 lg:col-span-2"></div>

      <div className="order-1 lg:order-2 lg:row-span-2">
        <WelcomeHeader data={dashboardData} />
      </div>
    </div>
  );
}
