import Link from "next/link";
import type { ReactNode } from "react";
import type { AccessTier, ContentStatus } from "@/types/admin";

/* =====================================================================
   Elementi di base dell'area Admin, volutamente spogli.

   ######################################################################
   TODO GRANDE (UX e grafica dell'area Admin): da ripensare per intero.
   L'interfaccia attuale serve a collegare frontend e backend, ma per chi
   scrive i contenuti è complessa. Da rivedere nelle sessioni finali:
   - percorso guidato corso → missione → lezione → esercizio, invece di
     pagine separate da aprire una alla volta;
   - lessico non tecnico ovunque (niente "code", "pesi", "draft");
   - editor dei contenuti con anteprima come la vedrà lo studente;
   - trascinamento (drag & drop) al posto delle frecce;
   - uniformare con il design system del resto dell'app.
   ######################################################################

   Le classi sono raccolte qui per cambiarle in un punto solo.
   Nessun hook: usabili sia nei Server sia nei Client Component.
   ===================================================================== */

export const inputClass =
  "w-full rounded border border-border bg-surface px-2 py-1 text-sm text-foreground";

export const buttonClass = {
  primary: "rounded bg-brand-primary px-3 py-1 text-sm font-medium text-white hover:bg-brand-primary-hover disabled:opacity-50",
  secondary: "rounded border border-border bg-surface px-3 py-1 text-sm hover:bg-surface-blue disabled:opacity-50",
  danger: "rounded border border-brand-coral px-3 py-1 text-sm text-brand-coral hover:bg-surface-blue disabled:opacity-50",
};

export function PageHeader({
  title,
  backHref,
  backLabel,
  children,
}: {
  title: string;
  backHref?: string;
  backLabel?: string;
  /** Azioni a destra del titolo */
  children?: ReactNode;
}) {
  return (
    <div className="mb-6">
      {backHref && (
        <Link href={backHref} className="text-sm text-brand-muted hover:underline">
          ← {backLabel ?? "Indietro"}
        </Link>
      )}
      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
      </div>
    </div>
  );
}

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="mb-6 rounded border border-border bg-surface p-4">
      {title && <h2 className="mb-3 text-lg font-semibold text-foreground">{title}</h2>}
      {children}
    </section>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-brand-muted">{hint}</span>}
    </label>
  );
}

export function Notice({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`mt-2 text-sm ${tone === "error" ? "text-brand-coral" : "text-brand-success"}`}
    >
      {children}
    </p>
  );
}

export function EmptyNote({ children }: { children: ReactNode }) {
  return <p className="text-sm text-brand-muted">{children}</p>;
}

const STATUS_LABELS: Record<ContentStatus, string> = {
  draft: "Bozza",
  published: "Pubblicato",
  withdrawn: "Ritirato",
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  const tone =
    status === "published" ? "border-brand-success text-brand-success"
      : status === "withdrawn" ? "border-brand-coral text-brand-coral"
        : "border-border text-brand-muted";
  return <span className={`rounded border px-2 py-0.5 text-xs ${tone}`}>{STATUS_LABELS[status]}</span>;
}

/** null = la missione eredita il livello dal corso */
export function TierBadge({ tier }: { tier: AccessTier | null }) {
  const label = tier === null ? "Eredita" : tier === "free" ? "Free" : "Premium";
  return <span className="rounded border border-border px-2 py-0.5 text-xs text-brand-muted">{label}</span>;
}

/** Paginazione con link: funziona nei Server Component senza stato */
export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav className="mt-4 flex items-center gap-3 text-sm" aria-label="Paginazione">
      {page > 0 ? <Link href={hrefFor(page - 1)} className="hover:underline">← Precedente</Link> : <span />}
      <span className="text-brand-muted">Pagina {page + 1} di {totalPages}</span>
      {page + 1 < totalPages && <Link href={hrefFor(page + 1)} className="hover:underline">Successiva →</Link>}
    </nav>
  );
}

export function formatDate(value: string | null): string {
  return value ? new Date(value).toLocaleDateString("it-IT") : "—";
}

/** Data e ora, per le modifiche che avvengono più volte nello stesso giorno */
export function formatDateTime(value: string | null): string {
  return value
    ? new Date(value).toLocaleString("it-IT", { dateStyle: "short", timeStyle: "short" })
    : "—";
}

/** "da oggi", "da 1 giorno", "da 12 giorni" */
export function sinceDays(value: string): string {
  const days = Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000);
  if (days <= 0) return "da oggi";
  return days === 1 ? "da 1 giorno" : `da ${days} giorni`;
}

/** Periodo d'uso di una versione: in uso / usata dal ... al ... / bozza */
export function versionPeriod(v: {
  published: boolean;
  publishedAt: string | null;
  replacedAt: string | null;
  createdAt: string;
  updatedAt: string;
}): string {
  if (v.published && v.publishedAt) {
    return `In uso ${sinceDays(v.publishedAt)} (dal ${formatDate(v.publishedAt)})`;
  }
  if (v.publishedAt) {
    return `Usata dal ${formatDate(v.publishedAt)} al ${v.replacedAt ? formatDate(v.replacedAt) : "—"}`;
  }
  return `Bozza creata il ${formatDate(v.createdAt)}, ultima modifica ${formatDateTime(v.updatedAt)}`;
}

/** Creazione e ultima modifica, nella card "Stato" delle pagine di dettaglio */
export function DatesLine({ createdAt, updatedAt, publishedAt }: {
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}) {
  return (
    <p className="mb-3 text-sm text-brand-muted">
      Creato il {formatDate(createdAt)} · Ultima modifica {formatDateTime(updatedAt)} ·
      Prima pubblicazione: {publishedAt ? formatDate(publishedAt) : "mai"}
    </p>
  );
}
