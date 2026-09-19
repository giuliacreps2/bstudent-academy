import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export interface MissionBreadcrumbItem {
  label: string;
  href?: string;
}

export function MissionBreadcrumb({
  items,
}: {
  items: MissionBreadcrumbItem[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs font-semibold"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-brand-muted transition hover:text-brand-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground" : "text-brand-muted"}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRightIcon className="h-3.5 w-3.5 text-brand-muted" />
            )}
          </span>
        );
      })}
    </nav>
  );
}
