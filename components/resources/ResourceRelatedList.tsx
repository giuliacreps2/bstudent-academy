import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { resourceRelatedKindMeta } from "@/constants/resourceDetail";
import type { ResourceRelatedLink } from "@/types/resourceDetail";

export function ResourceRelatedList({
  links,
}: {
  links: ResourceRelatedLink[];
}) {
  if (links.length === 0) return null;

  return (
    <section aria-labelledby="risorsa-approfondisci-title">
      <h2
        id="risorsa-approfondisci-title"
        className="text-2xl font-extrabold tracking-tight text-foreground"
      >
        Approfondisci
      </h2>

      {/* Lista semplice, non altre grandi card */}
      <ul className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
        {links.map((link) => {
          const meta = resourceRelatedKindMeta[link.kind];
          const Icon = meta.icon;

          return (
            <li key={link.id}>
              <Link
                href={link.href}
                className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-surface-blue sm:px-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-blue group-hover:bg-white">
                  <Icon className="h-4 w-4 text-brand-primary" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground group-hover:text-brand-primary sm:text-base">
                    {link.label}
                  </span>
                  <span className="block text-xs text-brand-muted">
                    {meta.label}
                  </span>
                </span>

                <ArrowRightIcon
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-brand-primary transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
