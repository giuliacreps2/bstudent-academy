import type { CourseWorld, MissionMapPosition } from "@/types/missions";

/*
 * Mappa del corso (blueprint §5.9): le posizioni le assegna il frontend secondo il tema del mondo,
 * occupando i posti in ordine. TODO (grafica): posti e sfondi disegnati per ogni tema.
 */

/** Posti predefiniti (percentuali sullo scenario), dall'alto a sinistra verso il basso a destra */
const DEFAULT_SLOTS: MissionMapPosition[] = [
  { x: 23, y: 31 },
  { x: 40, y: 42 },
  { x: 58, y: 54 },
  { x: 72, y: 67 },
  { x: 87, y: 79 },
];

/** Posizione della missione n (da 0): oltre i posti predefiniti il percorso continua a zig-zag */
export function missionPosition(index: number, total: number): MissionMapPosition {
  if (total <= DEFAULT_SLOTS.length) return DEFAULT_SLOTS[index];
  const step = 80 / Math.max(1, total - 1);
  return { x: index % 2 === 0 ? 25 + (index % 4 === 0 ? 0 : 10) : 70, y: 12 + step * index };
}

const KNOWN_THEMES: CourseWorld["theme"][] = ["roman-city", "greek-temple", "library"];

/** Scenario del mondo dal tema scelto nell'Admin. TODO (grafica): uno sfondo per tema */
export function courseWorld(theme: string | null, name: string): CourseWorld {
  const known = KNOWN_THEMES.find((t) => t === theme) ?? "roman-city";
  return {
    id: known,
    name,
    backgroundDesktop: "/land.png",
    backgroundMobile: "/land.png",
    theme: known,
  };
}

// TODO (Cloudinary, blueprint §5.1): immagini da coverReference / imageReference
export const COURSE_COVER_PLACEHOLDER = "/latino.png";
export const MISSION_COVER_PLACEHOLDER = "/land.png";
