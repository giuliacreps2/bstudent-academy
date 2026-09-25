"use client";

import type { ReactNode } from "react";

export function SectionHeader({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <h2
        id={id}
        className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-xl text-base leading-relaxed text-brand-muted">
          {description}
        </p>
      )}
    </div>
  );
}

export function AccountCard({
  title,
  description,
  children,
  id,
  tone = "default",
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  id?: string;
  tone?: "default" | "danger";
}) {
  return (
    <div
      id={id}
      className={`scroll-mt-24 rounded-2xl border bg-surface p-5 shadow-[0_8px_24px_rgba(23,32,51,0.05)] sm:p-6 ${
        tone === "danger" ? "border-red-200" : "border-border"
      }`}
    >
      {title && <h3 className="text-lg font-bold text-foreground">{title}</h3>}
      {description && (
        <p className="mt-1 text-sm leading-6 text-brand-muted">{description}</p>
      )}
      <div className={title || description ? "mt-5" : ""}>{children}</div>
    </div>
  );
}

/** Riga "etichetta + valore + azione", con separatore tra una riga e l'altra. */
export function SettingRow({
  label,
  value,
  action,
}: {
  label: string;
  value?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-brand-muted">{label}</p>
        {value && (
          <div className="mt-0.5 break-words text-base font-semibold text-foreground">
            {value}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function SettingList({ children }: { children: ReactNode }) {
  return <div className="divide-y divide-border">{children}</div>;
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? "bg-brand-primary" : "bg-neutral-300"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function InlineMessage({
  kind,
  children,
}: {
  kind: "success" | "error" | "info";
  children: ReactNode;
}) {
  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    error: "border-red-200 bg-red-50 text-red-600",
    info: "border-[#cbd8ec] bg-surface-blue text-brand-primary",
  }[kind];

  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm font-medium ${styles}`}
    >
      {children}
    </div>
  );
}

export const dangerButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-6 py-3 font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40";
