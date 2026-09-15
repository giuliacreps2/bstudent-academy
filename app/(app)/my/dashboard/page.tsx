import { getDashboardData, getSkinData, getStatsData } from "@/lib/dashboard";
import { WelcomeHeader } from "@/components/dashboard/welcomeSection/WelcomeHeader";
import { StatsCard } from "@/components/dashboard/rightColumn/StatsCard";
import { RightColumn } from "@/components/dashboard/rightColumn/RightColumn";

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();
  const skinData = await getSkinData();
  const statsData = await getStatsData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="order-2 lg:order-1 lg:col-span-2">
        <WelcomeHeader data={dashboardData} />
      </div>

      <div className="order-1 lg:order-2 lg:row-span-2">
        <RightColumn skin={skinData} stats={statsData} />
      </div>
    </div>
  );
}
