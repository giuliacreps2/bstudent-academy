import { getNotebookOverviewData } from "@/lib/notebook";
import { NotebookOverview } from "@/components/notebook/NotebookOverview";

export default async function NotebookPage() {
  const data = await getNotebookOverviewData();

  return (
    <div className="reading-area">
      <NotebookOverview data={data} />;
    </div>
  );
}
