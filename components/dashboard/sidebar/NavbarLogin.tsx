"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "./SidebarContext";

export default function NavbarLogin() {
  const { toggle } = useSidebar();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-surface-light-blue border-b border-border shadow-md">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* LEFT: hamburger + logo */}
        <div className="flex items-center">
          {/* Hamburger - solo mobile */}
          <button
            type="button"
            onClick={toggle}
            className="sm:hidden p-2 mr-2 rounded-md text-foreground hover:bg-surface-blue transition-colors"
            aria-label="Apri menu"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex shrink-0 items-center">
              <img
                alt="BStudent"
                src="/Logo-BStudent-Home-1.webp"
                className="h-12 w-auto"
              />
            </div>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 rounded-full hover:bg-surface-blue transition-colors"
            aria-label="Notifiche"
          >
            <BellIcon className="w-6 h-6 text-foreground" />

            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-coral" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 rounded-full"
              aria-expanded={menuOpen}
              aria-label="Apri menu utente"
            >
              <Image
                src="/studente.png"
                alt="Foto profilo"
                width={18}
                height={18}
                className="rounded-full object-cover"
              />

              <ChevronDownIcon className="hidden sm:block w-4 h-4 text-brand-muted" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-surface border border-border rounded-md shadow-lg py-2">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">
                    Il mio profilo
                  </p>

                  <p className="text-xs text-brand-muted truncate">
                    studente@bstudent.it
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/profilo"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-surface-blue transition-colors"
                  >
                    Profilo
                  </Link>

                  <Link
                    href="/impostazioni"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-surface-blue transition-colors"
                  >
                    Impostazioni
                  </Link>

                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm hover:bg-surface-blue transition-colors"
                  >
                    Esci
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
