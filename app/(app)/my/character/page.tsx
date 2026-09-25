// app/(app)/my/character/page.tsx
import { getCharacterPageData } from "@/lib/character";
import { CharacterProvider } from "@/components/character/CharacterContext";
import { CharacterControls } from "@/components/character/CharacterControls";
import { CharacterSelection } from "@/components/character/CharacterSelection";
import { CharacterHero } from "@/components/character/CharacterHero";
import { CharacterEvolutionStrip } from "@/components/character/CharacterEvolutionStrip";

export default async function CharacterPage() {
  const data = await getCharacterPageData();

  return (
    <CharacterProvider data={data}>
      <div
        className="
          flex flex-col gap-6

          lg:grid lg:gap-6
          lg:grid-cols-[220px_1fr_380px]
          lg:grid-rows-[1fr_auto]
          lg:[grid-template-areas:'controls_selection_hero'_'evolution_evolution_evolution']
        "
      >
        <div className="order-1 lg:order-none lg:[grid-area:hero]">
          <CharacterHero />
        </div>

        <div className="order-2 lg:order-none lg:[grid-area:evolution]">
          <CharacterEvolutionStrip />
        </div>

        <div className="order-3 lg:order-none lg:[grid-area:controls]">
          <CharacterControls />
        </div>

        <div className="order-4 lg:order-none lg:[grid-area:selection]">
          <CharacterSelection />
        </div>
      </div>
    </CharacterProvider>
  );
}
