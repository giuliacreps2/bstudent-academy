"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { levelTestQuestions } from "@/constants/levelTest";
import { saveLevelTestResult } from "@/lib/myCourses";
import type {
  CourseLevel,
  CourseListItem,
  SubjectData,
} from "@/types/myCourses";

const levelWeight: Record<CourseLevel, number> = {
  Principiante: 1,
  Intermedio: 2,
  Avanzato: 3,
};

function resolveLevel(weights: number[]): CourseLevel {
  const average =
    weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
  const rounded = Math.round(average);

  if (rounded <= 1) return "Principiante";
  if (rounded === 2) return "Intermedio";
  return "Avanzato";
}

interface LevelTestModalProps {
  open: boolean;
  onClose: () => void;
  subject: SubjectData;
  courses: CourseListItem[];
}

export function LevelTestModal({
  open,
  onClose,
  subject,
  courses,
}: LevelTestModalProps) {
  const questions = levelTestQuestions[subject.slug] ?? [];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CourseLevel | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const isResultStep = result !== null;
  const currentQuestion = questions[step];
  const selectedOptionId = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const recommendedCourses = useMemo(() => {
    if (!result) return [];
    const matching = courses.filter((course) => course.level === result);
    return (matching.length > 0 ? matching : courses).slice(0, 2);
  }, [result, courses]);

  if (!open) return null;

  function selectOption(optionId: string) {
    if (!currentQuestion) return;
    setAnswers((current) => ({ ...current, [currentQuestion.id]: optionId }));
  }

  function handleBack() {
    if (step > 0) setStep((current) => current - 1);
  }

  async function handleNext() {
    if (!currentQuestion || !selectedOptionId) return;

    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    // Ultima domanda: calcoliamo il livello consigliato dalle risposte date
    const weights = questions.map((question) => {
      const chosenOptionId = answers[question.id];
      const chosenOption = question.options.find(
        (option) => option.id === chosenOptionId,
      );
      return chosenOption
        ? levelWeight[chosenOption.level]
        : levelWeight[question.options[0].level];
    });
    const recommendedLevel = resolveLevel(weights);

    setIsSaving(true);
    await saveLevelTestResult({
      subjectSlug: subject.slug,
      answers,
      recommendedLevel,
    });
    setIsSaving(false);
    setResult(recommendedLevel);
  }

  function handleClose() {
    setStep(0);
    setAnswers({});
    setResult(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-[#172033]/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* MODAL */}
      <div className="relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-130 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#e5eaf2] px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3155d9]">
              Test di livello · {subject.name}
            </p>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              {isResultStep ? "Il tuo risultato" : "Rispondi con sincerità"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#667085] transition hover:bg-[#f7f9fc] hover:text-[#172033]"
            aria-label="Chiudi"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* PROGRESS */}
        {!isResultStep && questions.length > 0 && (
          <div className="px-5 pt-5 sm:px-7">
            <div className="flex gap-1.5">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    index <= step ? "bg-[#3155d9]" : "bg-[#e5eaf2]"
                  }`}
                />
              ))}
            </div>

            <p className="mt-3 text-xs font-semibold text-[#667085]">
              Domanda {step + 1} di {questions.length}
            </p>
          </div>
        )}

        {/* CONTENT */}
        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          {questions.length === 0 && (
            <p className="text-sm leading-6 text-[#667085]">
              Il test di livello per questa materia non è ancora disponibile.
            </p>
          )}

          {!isResultStep && currentQuestion && (
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-[#172033]">
                {currentQuestion.prompt}
              </h2>

              <div className="mt-6 space-y-3">
                {currentQuestion.options.map((option) => {
                  const active = selectedOptionId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectOption(option.id)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-bold transition ${
                        active
                          ? "border-[#3155d9] bg-[#e8f2ff] text-[#3155d9]"
                          : "border-[#e5eaf2] bg-white text-[#172033] hover:bg-[#f7f9fc]"
                      }`}
                    >
                      {option.label}
                      {active && <CheckIcon className="h-5 w-5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {isResultStep && (
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f2ff]">
                <CheckIcon className="h-7 w-7 text-[#3155d9]" />
              </div>

              <div className="mt-5 text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#172033]">
                  Livello consigliato: {result}
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#667085]">
                  In base alle tue risposte, ti consigliamo di iniziare da qui.
                </p>
              </div>

              {recommendedCourses.length > 0 && (
                <div className="mt-7 space-y-3">
                  {recommendedCourses.map((course) => (
                    <Link
                      key={course.slug}
                      href={course.href}
                      onClick={handleClose}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-[#e5eaf2] bg-[#f7f9fc] p-4 transition hover:border-[#3155d9]/40"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-[#172033] truncate">
                          {course.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[#667085]">
                          {course.level} · {course.stepsCount} tappe
                        </p>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-[#3155d9] shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER — domande */}
        {!isResultStep && questions.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#e5eaf2] px-5 py-4 sm:px-7">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="inline-flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-[#667085] transition hover:bg-[#f7f9fc] hover:text-[#172033] disabled:pointer-events-none disabled:opacity-0"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Indietro
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedOptionId || isSaving}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#3155d9] px-5 text-sm font-bold text-white shadow-[0_4px_0_#243fa8] transition hover:bg-[#5472df] active:translate-y-0.5 active:shadow-[0_2px_0_#243fa8] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:translate-y-0"
            >
              {step < questions.length - 1 ? "Avanti" : "Vedi il risultato"}
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* FOOTER — risultato */}
        {isResultStep && (
          <div className="flex items-center justify-end border-t border-[#e5eaf2] px-5 py-4 sm:px-7">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#3155d9] px-5 text-sm font-bold text-white shadow-[0_4px_0_#243fa8] transition hover:bg-[#5472df] active:translate-y-0.5 active:shadow-[0_2px_0_#243fa8]"
            >
              Fatto
              <CheckIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
