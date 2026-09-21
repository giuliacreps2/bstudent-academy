import Image from "next/image";
import type { CourseWorld } from "@/types/missions";

export function MissionWorld({
  world,
  children,
}: {
  world: CourseWorld;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Lo scenario è lo sfondo dell'intera area: non esistono due sezioni */}
      <Image
        src={world.backgroundDesktop}
        alt=""
        fill
        priority
        className="hidden object-cover sm:block"
      />
      <Image
        src={world.backgroundMobile}
        alt=""
        fill
        priority
        className="object-cover sm:hidden"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

      {/* Questo layer resta nel normale flusso:
          se i dettagli crescono, cresce la pagina e c'è un solo scrollbar. */}
      <div className="relative z-10 min-h-[900px] w-full sm:min-h-[1000px] lg:min-h-[1100px]">
        {children}
      </div>
    </div>
  );
}
