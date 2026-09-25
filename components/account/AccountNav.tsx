import Link from "next/link";
import { accountSections } from "@/constants/account";
import type { AccountSectionKey } from "@/types/account";

function hrefFor(key: AccountSectionKey) {
  return `/my/account?sezione=${key}`;
}

export function AccountNav({ active }: { active: AccountSectionKey }) {
  return (
    <nav aria-label="Sezioni dell'account">
      {/* MOBILE: pillole scorrevoli */}
      <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] xl:hidden [&::-webkit-scrollbar]:hidden">
        {accountSections.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <li key={key} className="shrink-0">
              <Link
                href={hrefFor(key)}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? "bg-brand-primary text-white"
                    : "border border-border bg-white text-foreground hover:border-brand-primary/40"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* DESKTOP: colonna laterale */}
      <ul className="hidden space-y-1 rounded-2xl border border-border bg-surface p-2 xl:block xl:sticky xl:top-20">
        {accountSections.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <li key={key}>
              <Link
                href={hrefFor(key)}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-foreground hover:bg-surface-blue hover:text-brand-primary"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
