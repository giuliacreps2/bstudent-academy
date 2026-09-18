import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface MissionStartButtonProps {
  href: string;
  variant: "inline" | "sticky";
}

export function MissionStartButton({ href, variant }: MissionStartButtonProps) {
  if (variant === "sticky") {
    return (
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0a0e2e]/95 backdrop-blur-sm p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Link
          href={href}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-secondary px-6 py-3 text-sm font-bold text-white active:scale-95 transition-transform duration-150"
        >
          Inizia la missione
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-full bg-brand-secondary px-6 py-3 text-sm font-bold text-white shadow-lg active:scale-95 transition-transform duration-150"
    >
      Inizia la missione
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}
