import type { DashboardData, SkinData, StatsData } from "@/types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/dashboard`);
  // if (!res.ok) throw new Error("Impossibile caricare i dati della dashboard");
  // return res.json();

  return {
    user: { firstName: "Giulia", gender: "F" },
    hasStartedCourse: false,
    lastCourse: undefined,
  };
}

export async function getSkinData(): Promise<SkinData> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/dashboard`);
  // if (!res.ok) throw new Error("Impossibile caricare i dati della dashboard");
  // return res.json();
  return {
    skin: "BASE",
    imageUrl: "/studentessa.png",
    name: "Studentessa",
  };
}

export async function getStatsData(): Promise<StatsData> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/dashboard`);
  // if (!res.ok) throw new Error("Impossibile caricare i dati della dashboard");
  // return res.json();
  return {
    stats: 1,
    level: 1,
    currentXp: 20,
    maxXp: 100,
    xp: 10,
    streak: 4,
  };
}
