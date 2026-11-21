import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { getNotebookLesson } from "@/lib/notebook-server";
import { missionHref } from "@/lib/courses";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";
import { LessonPageView } from "@/components/missionPlay/LessonReader";
import { LessonNoteEditor } from "@/components/notebook/LessonNoteEditor";
import { ReadingSignal } from "@/components/ReadingSignal";

export const metadata: Metadata = { title: "Lezione | Quaderno | BStudent" };

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Lezione aperta dal Quaderno (blueprint §14): in sola lettura, con la nota personale.
 * Ritirata: resta solo la nota. Premium scaduto: titolo e nota, lezione con lucchetto.
 */
export default async function NotebookLessonPage({ params }: PageProps) {
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const lesson = await getNotebookLesson(id);
  if (!lesson) notFound();
  const { item, pages, note } = lesson;
  const readable = item.available && !item.premiumLocked;

  return (
    <div className="reading-area mx-auto max-w-3xl space-y-6">
      {readable && <ReadingSignal kind="lesson_read" lessonId={item.lessonId} />}

      <MissionBreadcrumb items={[{ label: "Quaderno", href: "/my/notebook" }, { label: item.title }]} />

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          {item.kind === "video" ? "Video" : "Lezione"}
          {item.topicName && ` · ${item.topicName}`}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight text-foreground">{item.title}</h1>
        <p className="mt-2 text-sm text-brand-muted">
          Dalla missione{" "}
          {item.available ? (
            <Link href={missionHref(item.courseSlug, item.missionSlug)} className="font-semibold text-brand-primary hover:underline">
              {item.missionTitle}
            </Link>
          ) : (
            <span className="font-semibold">{item.missionTitle}</span>
          )}{" "}
          · {item.courseTitle}
        </p>
      </header>

      {!item.available ? (
        <p className="rounded-lg border border-border bg-surface p-5 text-brand-muted">
          Questa lezione non è più disponibile. Qui resta la tua nota.
        </p>
      ) : item.premiumLocked ? (
        <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-5">
          <LockClosedIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
          <div>
            <p className="font-bold text-foreground">La lezione completa è nell&apos;abbonamento</p>
            {item.preview && <p className="mt-2 text-brand-muted">{item.preview}</p>}
          </div>
        </div>
      ) : (
        <article className="space-y-8 rounded-lg border border-border bg-surface p-5 sm:p-8">
          {pages.map((page) => (
            <LessonPageView key={page.lessonPageId} page={page} />
          ))}
        </article>
      )}

      <LessonNoteEditor lessonId={item.lessonId} initial={note} />
    </div>
  );
}
