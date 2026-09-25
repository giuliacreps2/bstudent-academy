import type { CharacterPageData } from "@/types/character";

export async function getCharacterPageData(): Promise<CharacterPageData> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/student/character`);
  // if (!res.ok) throw new Error("Impossibile caricare il personaggio");
  // return res.json();

  return {
    roster: [
      {
        id: "livia",
        slug: "livia",
        name: "Livia",
        thumbnailUrl: "/studentessa.png",
        status: "selected",
      },
      {
        id: "marcus",
        slug: "marcus",
        name: "Marcus",
        thumbnailUrl: "/studente.png",
        status: "unlocked",
      },
      {
        id: "personaggio-3",
        slug: "personaggio-3",
        name: "Personaggio 3",
        thumbnailUrl: "/placeholder-skin.png",
        status: "locked",
        unlockHint: "Prossimamente",
      },
      {
        id: "personaggio-4",
        slug: "personaggio-4",
        name: "Personaggio 4",
        thumbnailUrl: "/placeholder-skin.png",
        status: "locked",
        unlockHint: "Prossimamente",
      },
    ],

    characters: {
      livia: {
        id: "livia",
        name: "Livia",
        tagline:
          "Curiosa, determinata e sempre pronta a scoprire nuovi orizzonti. Ogni missione la rende più sicura e competente.",
        quote: "Discere semper progressus est.",
        bonuses: [
          { label: "Grammatica", value: "+5%" },
          { label: "Traduzione", value: "+3%" },
        ],
        appearance: [
          {
            key: "skin",
            label: "Skin",
            items: [
              {
                id: "skin-classico",
                label: "Stile classico",
                thumbnailUrl: "/studentessa.png",
                status: "equipped",
              },
              {
                id: "skin-studentessa",
                label: "Studentessa",
                thumbnailUrl: "/studentessa.png",
                status: "unlocked",
              },
              {
                id: "skin-esploratrice",
                label: "Esploratrice",
                thumbnailUrl: "/studentessa.png",
                status: "unlocked",
              },
              {
                id: "skin-locked-1",
                label: "???",
                thumbnailUrl: "/placeholder-skin.png",
                status: "locked",
                unlockHint: "Si sblocca al livello 10",
              },
              {
                id: "skin-estiva",
                label: "Estiva",
                thumbnailUrl: "/studentessa.png",
                status: "unlocked",
              },
              {
                id: "skin-viaggio",
                label: "Da viaggio",
                thumbnailUrl: "/studentessa.png",
                status: "unlocked",
              },
              {
                id: "skin-locked-2",
                label: "???",
                thumbnailUrl: "/placeholder-skin.png",
                status: "locked",
                unlockHint: "Si sblocca completando la Missione 8",
              },
            ],
          },
          { key: "capelli", label: "Capelli", items: [] },
          { key: "abiti", label: "Abiti", items: [] },
          { key: "colori", label: "Colori", items: [] },
        ],
        accessories: [
          {
            id: "zaino",
            label: "Zaino",
            items: [
              {
                id: "zaino-base",
                label: "Zaino da scriba",
                thumbnailUrl: "/placeholder-skin.png",
                status: "equipped",
              },
            ],
          },
        ],
        evolutionStages: [
          {
            id: "livia-base",
            order: 1,
            label: "Base",
            reached: true,
            portraitUrl: "/studentessa.png",
            thumbnailUrl: "/studentessa.png",
          },
          {
            id: "livia-evo-1",
            order: 2,
            label: "Evoluzione I",
            reached: true,
            portraitUrl: "/studentessa.png",
            thumbnailUrl: "/studentessa.png",
          },
          {
            id: "livia-evo-2",
            order: 3,
            label: "Evoluzione II",
            reached: true,
            portraitUrl: "/studentessa.png",
            thumbnailUrl: "/studentessa.png",
          },
          {
            id: "livia-evo-3",
            order: 4,
            label: "Prossima evoluzione",
            reached: false,
          },
        ],
      },

      marcus: {
        id: "marcus",
        name: "Marcus",
        tagline:
          "Metodico e riflessivo, affronta ogni missione con calma e precisione.",
        quote: "Gutta cavat lapidem.",
        bonuses: [{ label: "Analisi", value: "+4%" }],
        appearance: [
          {
            key: "skin",
            label: "Skin",
            items: [
              {
                id: "marcus-skin-classico",
                label: "Stile classico",
                thumbnailUrl: "/studente.png",
                status: "equipped",
              },
            ],
          },
          { key: "capelli", label: "Capelli", items: [] },
          { key: "abiti", label: "Abiti", items: [] },
          { key: "colori", label: "Colori", items: [] },
        ],
        accessories: [],
        evolutionStages: [
          {
            id: "marcus-base",
            order: 1,
            label: "Base",
            reached: true,
            portraitUrl: "/studente.png",
            thumbnailUrl: "/studente.png",
          },
          {
            id: "marcus-evo-1",
            order: 2,
            label: "Prossima evoluzione",
            reached: false,
          },
        ],
      },
    },
  };
}
