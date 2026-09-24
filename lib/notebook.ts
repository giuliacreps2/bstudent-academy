import type { NotebookOverviewData } from "@/types/notebook";

// TODO: sostituire con la fetch reale quando il BE espone /student/notebook
// const res = await fetch(`${process.env.API_URL}/student/notebook`);
// if (!res.ok) throw new Error("Impossibile caricare il Quaderno");
// return res.json();
export async function getNotebookOverviewData(): Promise<NotebookOverviewData> {
  return {
    student: {
      name: "Giulia",
      avatarUrl: "/studentessa.png",
    },
    entriesByTab: {
      latino: [
        {
          id: "n-1",
          tab: "latino",
          kind: "grammatica",
          title: "L'ablativo assoluto",
          excerpt:
            "La struttura e gli usi dell'ablativo assoluto, con esempi di traduzione guidata.",
          unlockedAt: "18 set 2025",
          missionLabel: "Missione 3 · Le basi della traduzione",
          href: "/my/notebook/ablativo-assoluto",
          isNew: true,
        },
        {
          id: "n-2",
          tab: "latino",
          kind: "grammatica",
          title: "La prima declinazione",
          excerpt:
            "Nomi femminili e la loro declinazione completa, caso per caso.",
          unlockedAt: "15 set 2025",
          missionLabel: "Missione 2 · Le basi della traduzione",
          href: "/my/notebook/prima-declinazione",
        },
        {
          id: "n-3",
          tab: "latino",
          kind: "lessico",
          title: "Il verbo sum al presente",
          excerpt:
            "Le forme del verbo essere al presente indicativo e i suoi usi principali.",
          unlockedAt: "12 set 2025",
          missionLabel: "Missione 1 · Le basi della traduzione",
          href: "/my/notebook/verbo-sum-presente",
        },
      ],
      greco: [],
      articoli: [
        {
          id: "n-4",
          tab: "articoli",
          kind: "articolo",
          title: "Come organizzare lo studio del latino (senza stress)",
          excerpt:
            "Strategie semplici e sostenibili per rendere il latino parte della tua routine quotidiana.",
          unlockedAt: "12 set 2025",
          href: "/blog/come-organizzare-lo-studio-del-latino",
        },
      ],
    },
  };
}
