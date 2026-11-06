import Link from "next/link";
import { requireAdmin } from "@/lib/api-server";

// Area separata da quella studente: layout e menu propri. Solo per il ruolo ADMIN.
// TODO GRANDE: UX e grafica dell'area Admin da ripensare per intero (vedi components/admin/ui.tsx)
const NAV = [
  { href: "/admin", label: "Panoramica" },
  { href: "/admin/skills", label: "Skill" },
  { href: "/admin/subjects", label: "Materie" },
  { href: "/admin/courses", label: "Corsi" },
  { href: "/admin/exercises", label: "Esercizi" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-12 items-center justify-between border-b border-border bg-surface px-4">
        <Link href="/admin" className="font-bold text-foreground">BStudent · Admin</Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-brand-muted">{user.email}</span>
          <Link href="/my/dashboard" className="hover:underline">Area studente</Link>
        </div>
      </header>
      <div className="flex">
        <nav className="w-48 shrink-0 border-r border-border p-3" aria-label="Menu Admin">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded px-2 py-1 text-sm hover:bg-surface-blue">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
