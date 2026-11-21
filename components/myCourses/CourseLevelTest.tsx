"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, BuildingLibraryIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Modal } from "@/components/ui/Modal";
import { errorMessage } from "@/lib/api";
import { getLevelTest, submitLevelTest } from "@/lib/courses";
import type { CourseLevelKey, StudentTest } from "@/types/courses";
import type { CourseListItem, SubjectData } from "@/types/myCourses";

const LEVEL_LABELS: Record<CourseLevelKey, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzato",
};

interface CourseLevelTestProps {
  subject: SubjectData;
  courses: CourseListItem[];
  /** Ultimo livello consigliato nella materia, se il test è già stato fatto */
  recommendedLevel: string | null;
}

/**
 * Test di livello del corso (blueprint §8.2): domande dal backend, il livello lo calcola il backend
 * con la regola prudente. Stesso aspetto di LevelTestBanner / LevelTestModal.
 */
export function CourseLevelTest({ subject, courses, recommendedLevel }: CourseLevelTestProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState<StudentTest | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleOpen() {
    setOpen(true);
    setError(null);
    if (test) return;
    setPending(true);
    try {
      const loaded = await getLevelTest(subject.slug);
      if (loaded) setTest(loaded);
      else setError("Il test di livello per questa materia non è ancora disponibile.");
    } catch (e) {
      setError(errorMessage(e, "Non riusciamo a caricare il test. Riprova tra poco."));
    } finally {
      setPending(false);
    }
  }

  function handleClose() {
    setOpen(false);
    setStep(0);
    setAnswers({});
    setResult(null);
    if (result) router.refresh();
  }

  const question = test?.questions[step];
  const selected = question ? answers[question.questionId] : undefined;
  const isLast = test ? step === test.questions.length - 1 : false;

  async function handleNext() {
    if (!test || !question || selected === undefined) return;
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    setPending(true);
    setError(null);
    try {
      const saved = await submitLevelTest(subject.slug, answers);
      setResult(saved.level ? LEVEL_LABELS[saved.level] : "Principiante");
    } catch (e) {
      setError(errorMessage(e, "Non riusciamo a salvare il test. Riprova."));
    } finally {
      setPending(false);
    }
  }

  const suggested = result
    ? (courses.filter((c) => c.level === result).length > 0 ? courses.filter((c) => c.level === result) : courses).slice(0, 2)
    : [];

  return (
    <>
      <div className="rounded-lg bg-surface-blue p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
            <BuildingLibraryIcon className="h-5 w-5 text-brand-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">
              {recommendedLevel ? `Livello consigliato: ${recommendedLevel}` : "Non sai da dove iniziare?"}
            </p>
            <p className="mt-0.5 text-xs text-brand-muted">
              {recommendedLevel
                ? "Puoi rifare il test quando vuoi."
                : "Scopri il percorso consigliato per te in base al tuo livello."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpen}
            className="btn-secondary inline-flex w-full shrink-0 items-center justify-center gap-1 px-4 py-2 text-sm transition-transform duration-150 active:scale-95 sm:w-auto"
          >
            {recommendedLevel ? "Rifai il test" : "Fai il test di livello"}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Modal open={open} onClose={handleClose} eyebrow={`Test di livello · ${subject.name}`} title={result ? "Il tuo risultato" : (test?.title ?? "Test di livello")}>
        {pending && !test && <p className="text-sm text-brand-muted">Caricamento…</p>}

        {error && (
          <p role="alert" className="text-sm font-semibold text-brand-coral">
            {error}
          </p>
        )}

        {!result && test && question && (
          <div>
            <div className="flex gap-1.5">
              {test.questions.map((q, i) => (
                <div key={q.questionId} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-brand-primary" : "bg-border"}`} />
              ))}
            </div>
            <p className="mt-3 text-xs font-semibold text-brand-muted">
              Domanda {step + 1} di {test.questions.length}
            </p>
            <h2 className="mt-3 text-xl font-extrabold text-foreground">{question.text}</h2>
            <div className="mt-5 space-y-3">
              {question.options.map((option) => {
                const active = selected === option.optionId;
                return (
                  <button
                    key={option.optionId}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [question.questionId]: option.optionId }))}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-bold transition ${
                      active ? "border-brand-primary bg-surface-blue text-brand-primary" : "border-border bg-surface hover:bg-surface-blue"
                    }`}
                  >
                    {option.text}
                    {active && <CheckIcon className="h-5 w-5 shrink-0" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-bold text-brand-muted disabled:invisible"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Indietro
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={selected === undefined || pending}
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm disabled:opacity-40"
              >
                {isLast ? "Vedi il risultato" : "Avanti"}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-foreground">Livello consigliato: {result}</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-brand-muted">
              In base alle tue risposte, ti consigliamo di iniziare da qui.
            </p>
            <div className="mt-6 space-y-3 text-left">
              {suggested.map((course) => (
                <Link
                  key={course.slug}
                  href={course.href}
                  onClick={handleClose}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-4 transition hover:border-brand-primary/40"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold text-foreground">{course.title}</span>
                    <span className="mt-0.5 block text-xs text-brand-muted">
                      {course.level} · {course.stepsCount} tappe
                    </span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-brand-primary" />
                </Link>
              ))}
            </div>
            <button type="button" onClick={handleClose} className="btn-primary mt-6 inline-flex px-5 py-2.5 text-sm">
              Fatto
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
