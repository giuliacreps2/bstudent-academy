import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import type { SkinData, StatsData } from "@/types/dashboard";

export function MissionTopBar({
  backHref,
  dashboardHref,
  skin,
  stats,
}: {
  backHref: string;
  dashboardHref: string;
  skin: SkinData;
  stats: StatsData;
}) {
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between gap-3 bg-blue-300 px-3 py-3 backdrop-blur-[2px] sm:px-6">
      {/* SINISTRA — indietro + home */}
      <div className="flex items-center gap-2">
        <Link
          href={backHref}
          aria-label="Torna al corso"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/15 lg:bg-white/15 lg:backdrop-blur-sm"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <Link
          href={dashboardHref}
          aria-label="Torna alla dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25"
        >
          <HomeIcon className="h-5 w-5" />
        </Link>
      </div>

      {/* DESTRA — skin + stats, solo desktop */}
      <div className="hidden items-center gap-3 rounded-full bg-white/90 py-1.5 pl-1.5 pr-4 shadow-md backdrop-blur-sm lg:flex">
        <Image
          src={skin.imageUrl}
          alt={skin.name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-sm font-semibold text-foreground">
          {skin.name}
        </span>

        <span className="h-4 w-px bg-border" />

        <span className="flex items-center gap-1 text-sm font-bold text-foreground">
          <ShieldCheckIcon className="h-4 w-4 text-brand-primary" />
          {stats.level}
        </span>
        <span className="flex items-center gap-1 text-sm font-bold text-foreground">
          <span className="text-brand-yellow">★</span>
          {stats.xp}
        </span>
        <span className="flex items-center gap-1 text-sm font-bold text-foreground">
          <span aria-hidden="true">🔥</span>
          {stats.streak}
        </span>
      </div>
    </div>
  );
}
