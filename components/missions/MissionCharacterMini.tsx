import Image from "next/image";
import type { MissionCharacterData } from "@/types/missions";

export function MissionCharacterMini({
  character,
}: {
  character: MissionCharacterData;
}) {
  const percent = Math.min(
    100,
    Math.round((character.currentXp / character.maxXp) * 100),
  );

  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-white/10">
        <Image
          src={character.avatarUrl}
          alt={character.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="hidden sm:block w-28">
        <p className="text-xs font-semibold text-white truncate">
          {character.name}
        </p>
        <div className="mt-1 h-1.5 w-full rounded-pill bg-white/15 overflow-hidden">
          <div
            className="h-full rounded-pill bg-brand-secondary"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
