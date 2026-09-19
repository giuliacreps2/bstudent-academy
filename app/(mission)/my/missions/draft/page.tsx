import { getMissionMapData } from "@/lib/missions";
import { MissionMap } from "@/components/missions/MissionMap";

export default async function MissionMapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getMissionMapData(slug);

  return <MissionMap data={data} />;
}
