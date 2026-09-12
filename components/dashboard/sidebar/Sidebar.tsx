"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import {
  HomeIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  ChartBarIcon,
  TrophyIcon,
  UserGroupIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "./SidebarContext";

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  comingSoon?: boolean;
};

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { label: "Corsi", href: "/corsi", icon: BookOpenIcon },
  { label: "Esercizi", href: "/esercizi", icon: PuzzlePieceIcon },
  { label: "Progressi", href: "/progressi", icon: ChartBarIcon },
  {
    label: "Classifica",
    href: "/classifica",
    icon: TrophyIcon,
    comingSoon: true,
  },
  {
    label: "Community",
    href: "/community",
    icon: UserGroupIcon,
    comingSoon: true,
  },
];

const secondaryNav: NavItem[] = [
  { label: "Profilo", href: "/profilo", icon: UserIcon },
  { label: "Impostazioni", href: "/impostazioni", icon: Cog6ToothIcon },
];

export default function SideBar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    const content = (
      <>
        <Icon className="w-5 h-5 shrink-0" />
        <span className="flex-1">{item.label}</span>
        {item.comingSoon && (
          <span className="text-[10px] font-medium text-brand-muted bg-surface-blue px-2 py-0.5 rounded-pill">
            In arrivo
          </span>
        )}
      </>
    );

    const baseClasses =
      "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200";

    if (item.comingSoon) {
      return (
        <div
          key={item.href}
          className={`${baseClasses} text-brand-muted cursor-not-allowed opacity-70`}
        >
          {content}
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={close}
        className={`${baseClasses} ${
          isActive
            ? "bg-brand-primary/10 text-brand-primary"
            : "text-foreground hover:bg-surface-blue hover:text-brand-primary"
        }`}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      {/* Overlay mobile: chiude il drawer al click fuori */}
      {isOpen && (
        <div
          onClick={close}
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/30 sm:hidden"
        />
      )}

      <aside
        className={`fixed top-14 left-0 z-40 w-64 h-[calc(100vh-3.5rem)] border-r border-border bg-surface-light-blue
    transition-transform duration-200 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="flex flex-col h-full px-4 py-6 overflow-y-auto">
          <nav className="flex-1 space-y-1">{mainNav.map(renderItem)}</nav>

          <div className="pt-4 mt-4 border-t border-border space-y-1">
            {secondaryNav.map(renderItem)}
          </div>

          <p className="mt-6 px-2 text-xs italic text-brand-muted leading-snug">
            Piccoli passi,
            <br />
            grandi traguardi.
          </p>
        </div>
      </aside>
    </>
  );
}
