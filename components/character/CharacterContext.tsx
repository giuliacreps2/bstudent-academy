"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  CharacterPageData,
  CharacterDetail,
  CharacterSectionKey,
  AppearanceCategoryKey,
  EvolutionStage,
} from "@/types/character";

interface CharacterContextValue {
  data: CharacterPageData;

  // roster — personaggio attualmente visualizzato/editato
  selectedCharacterId: string;
  selectCharacter: (id: string) => void;
  character: CharacterDetail;

  // roster — personaggio attivo sull'account (pill Equipaggia/Equipaggiato)
  equippedCharacterId: string;
  equipCharacter: (id: string) => void;
  isViewedCharacterEquipped: boolean;

  // controlli sinistra: Aspetto / Accessori / Evoluzioni
  activeSection: CharacterSectionKey;
  setActiveSection: (section: CharacterSectionKey) => void;

  // tab dentro "Aspetto": Skin / Capelli / Abiti / Colori
  activeAppearanceTab: AppearanceCategoryKey;
  setActiveAppearanceTab: (tab: AppearanceCategoryKey) => void;

  // evoluzione: stadio mostrato nell'hero (default = ultimo raggiunto)
  previewedStageId: string;
  setPreviewedStageId: (id: string) => void;
  previewedStage: EvolutionStage;
  isViewingPastStage: boolean;
}

const CharacterContext = createContext<CharacterContextValue | undefined>(
  undefined,
);

function getLastReachedStage(character: CharacterDetail): EvolutionStage {
  return (
    [...character.evolutionStages].reverse().find((stage) => stage.reached) ??
    character.evolutionStages[0]
  );
}

export function CharacterProvider({
  data,
  children,
}: {
  data: CharacterPageData;
  children: ReactNode;
}) {
  const initialId =
    data.roster.find((item) => item.status === "selected")?.id ??
    data.roster[0].id;

  const [selectedCharacterId, setSelectedCharacterId] = useState(initialId);
  const [equippedCharacterId, setEquippedCharacterId] = useState(initialId);
  const [activeSection, setActiveSection] =
    useState<CharacterSectionKey>("aspetto");
  const [activeAppearanceTab, setActiveAppearanceTab] =
    useState<AppearanceCategoryKey>("skin");

  const character = data.characters[selectedCharacterId];
  const lastReachedStage = getLastReachedStage(character);

  const [previewedStageId, setPreviewedStageId] = useState(lastReachedStage.id);

  function selectCharacter(id: string) {
    const rosterEntry = data.roster.find((item) => item.id === id);
    if (!rosterEntry || rosterEntry.status === "locked") return;

    setSelectedCharacterId(id);
    setActiveAppearanceTab("skin");
    setPreviewedStageId(getLastReachedStage(data.characters[id]).id);
  }

  function equipCharacter(id: string) {
    const rosterEntry = data.roster.find((item) => item.id === id);
    if (!rosterEntry || rosterEntry.status === "locked") return;

    setEquippedCharacterId(id);
  }

  const previewedStage =
    character.evolutionStages.find((stage) => stage.id === previewedStageId) ??
    lastReachedStage;

  const value: CharacterContextValue = {
    data,
    selectedCharacterId,
    selectCharacter,
    character,
    equippedCharacterId,
    equipCharacter,
    isViewedCharacterEquipped: selectedCharacterId === equippedCharacterId,
    activeSection,
    setActiveSection,
    activeAppearanceTab,
    setActiveAppearanceTab,
    previewedStageId,
    setPreviewedStageId,
    previewedStage,
    isViewingPastStage: previewedStage.id !== lastReachedStage.id,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter deve essere usato dentro CharacterProvider");
  }
  return context;
}
