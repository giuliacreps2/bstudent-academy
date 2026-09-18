import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export function MissionBreadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex items-center gap-1.5 min-w-0 overflow-x-auto text-sm text-white/70 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5 shrink-0">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-white" : ""}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRightIcon className="h-3.5 w-3.5 text-white/40" />
            )}
          </span>
        );
      })}
    </nav>
  );
}
