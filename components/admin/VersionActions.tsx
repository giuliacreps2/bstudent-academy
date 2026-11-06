"use client";

import Link from "next/link";
import { deleteVersion, publishVersion } from "@/lib/admin";
import type { QuestionVersionSummary } from "@/types/admin";
import { buttonClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Azioni su una versione nell'elenco dell'esercizio. Una versione mai pubblicata è una bozza modificabile */

export default function VersionActions({
  version,
  afterDeleteHref,
}: {
  version: QuestionVersionSummary;
  /** Dalla pagina della versione: dopo l'eliminazione quella pagina non esiste più */
  afterDeleteHref?: string;
}) {
  const { run, pending, error } = useAdminMutation();
  const isDraft = !version.published && version.publishedAt === null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Link href={`/admin/versions/${version.questionVersionId}`} className={buttonClass.secondary}>
          {isDraft ? "Modifica" : "Apri"}
        </Link>
        {!version.published && (
          <button
            type="button"
            className={buttonClass.primary}
            disabled={pending}
            onClick={() => run(() => publishVersion(version.questionVersionId), {
              confirm: `Pubblicare la versione ${version.versionNumber}? Sostituisce quella pubblicata nei nuovi tentativi.`,
            })}
          >
            Pubblica
          </button>
        )}
        {isDraft && (
          <button
            type="button"
            className={buttonClass.danger}
            disabled={pending}
            onClick={() => run(() => deleteVersion(version.questionVersionId), {
              confirm: `Eliminare la bozza v${version.versionNumber}?`,
              redirectTo: afterDeleteHref,
            })}
          >
            Elimina
          </button>
        )}
      </div>
      {error && <Notice tone="error">{error}</Notice>}
    </div>
  );
}
