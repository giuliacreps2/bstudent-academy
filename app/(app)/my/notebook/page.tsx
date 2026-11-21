import type { Metadata } from "next";
import { requireUser } from "@/lib/api-server";
import { getNotebook } from "@/lib/notebook-server";
import { NotebookView } from "@/components/notebook/NotebookView";

export const metadata: Metadata = { title: "Quaderno | BStudent" };

/** Quaderno dello studente (blueprint §14) con i dati del backend */
export default async function NotebookPage() {
  const [user, data] = await Promise.all([requireUser(), getNotebook()]);
  const studentName = user.firstName ?? user.username ?? "te";

  return (
    <div className="reading-area">
      <NotebookView data={data} studentName={studentName} />
    </div>
  );
}
