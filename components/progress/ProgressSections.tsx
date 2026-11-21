import Link from "next/link";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { skillIcons, skillStyles, toSkillIconKey } from "@/constants/skills";
import { resourceHref } from "@/constants/resources";
import { courseHref } from "@/lib/courses";
import { practiceStatusLabel } from "@/lib/practice";
import {
  attemptDetailHref,
  formatDate,
  formatGrade,
  formatNumber,
  progressHref,
  type ProgressFilters,
} from "@/lib/progress";
import { ProgressBar, ProgressCard } from "./ProgressCard";
import type {
  AttemptHistoryItem,
  CourseProgress,
  Growth,
  HistoryPage,
  PracticeProgress,
  WeakPoints,
} from "@/types/progress";

const LEVEL_LABELS = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzato" } as const;

/* ------------------------------------ 1. Crescita ------------------------------------ */

export function GrowthSection({ growth, subject }: { growth: Growth; subject: string }) {
  const { evolution, character } = growth;
  const levels = growth.subjects.find((s) => s.subjectSlug === subject)?.levels ?? growth.subjects[0]?.levels ?? [];
  const xp = Number(evolution.totalXp);
  const target = evolution.nextMinXp === null ? null : Number(evolution.nextMinXp);

  return (
    <ProgressCard
      id="crescita"
      icon="🌱"
      title="La tua crescita"
      defaultOpen
      summary={
        <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-blue text-3xl" aria-hidden="true">
            🦉
          </div>
          <div>
            <p className="font-bold text-foreground">
              {character ? `${character.name} · ${character.stageName}` : `Stadio ${evolution.currentStage}`}
            </p>
            <p className="text-sm text-brand-muted">{formatNumber(xp, 0)} XP in tutto</p>
            {evolution.nextStage !== null && (
              <div className="mt-2">
                {evolution.nextRequiresFirstCourse ? (
                  <p className="text-sm text-brand-muted">
                    Completa il tuo primo corso per raggiungere l&apos;Evoluzione {evolution.nextStage}.
                  </p>
                ) : (
                  <>
                    {target !== null && <ProgressBar percent={(xp / target) * 100} />}
                    <p className="mt-1 text-sm text-brand-muted">
                      Prossima evoluzione: {evolution.xpMissing !== null && `ancora ${formatNumber(evolution.xpMissing, 0)} XP`}
                      {evolution.nextMinAverageLevel !== null &&
                        !evolution.averageLevelReached &&
                        ` e livello medio delle skill ${formatNumber(evolution.nextMinAverageLevel, 1)}`}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      }
    >
      <h3 className="text-sm font-bold text-foreground">Livelli delle skill</h3>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {levels.map((level) => {
          const styles = skillStyles(level.color);
          const Icon = skillIcons[toSkillIconKey(level.icon)];
          return (
            <li key={level.skillId} className="flex items-center gap-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${styles.iconBg}`}>
                <Icon className={`h-4 w-4 ${styles.iconText}`} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {level.name} · livello {level.level}
                  {level.maxLevel && " (massimo)"}
                </p>
                <ProgressBar percent={level.maxLevel ? 100 : level.progressPercent} className={styles.bar} />
              </div>
            </li>
          );
        })}
      </ul>

      {growth.nearAccessories.length > 0 && (
        <>
          <h3 className="mt-5 text-sm font-bold text-foreground">Accessori vicini</h3>
          <ul className="mt-2 space-y-2">
            {growth.nearAccessories.map((a) => (
              <li key={a.accessoryId} className="rounded-md bg-surface-blue px-3 py-2 text-sm">
                <span className="font-semibold">{a.name}</span>{" "}
                <span className="text-brand-muted">
                  {a.status === "redeemable"
                    ? "· puoi riscattarlo!"
                    : (a.unlockHint ??
                      `· ${formatNumber(a.currentPoints, 0)} su ${formatNumber(a.requiredPoints, 0)} punti ${a.skillName ?? ""}`)}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </ProgressCard>
  );
}

/* ------------------------------------ 2. Punti deboli ------------------------------------ */

export function WeakPointsSection({ weak }: { weak: WeakPoints }) {
  const level = weak.lastLevelTest?.level;
  return (
    <ProgressCard
      id="punti-deboli"
      icon="🎯"
      title="Da rivedere"
      summary={
        weak.topics.length === 0 && !weak.weakestSkill ? (
          <p className="text-sm text-brand-muted">Niente da rivedere per ora: continua così.</p>
        ) : (
          <div className="space-y-1 text-sm">
            {weak.weakestSkill && (
              <p>
                La skill su cui allenarti di più: <strong>{weak.weakestSkill.name}</strong> (livello{" "}
                {weak.weakestSkill.level}).
              </p>
            )}
            {weak.topics.length > 0 && (
              <p>
                {weak.topics.length === 1 ? "Un argomento" : `${weak.topics.length} argomenti`} con esercizi non ancora
                superati: <strong>{weak.topics[0].topicName}</strong>
                {weak.topics.length > 1 && " e altri"}.
              </p>
            )}
          </div>
        )
      }
    >
      {weak.topics.length > 0 && (
        <ul className="space-y-2">
          {weak.topics.map((t) => (
            <li key={t.topicId} className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-surface-blue px-3 py-2 text-sm">
              <span>
                <strong>{t.topicName}</strong>{" "}
                <span className="text-brand-muted">
                  · {t.exercisesToReview === 1 ? "1 esercizio" : `${t.exercisesToReview} esercizi`} da rivedere
                </span>
              </span>
              {t.resourceSlug && (
                <Link href={resourceHref(t.subjectSlug, t.resourceSlug)} className="font-semibold text-brand-primary hover:underline">
                  Rileggi la teoria →
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
      {(weak.lastLevelTest || weak.lastOrientationTest) && (
        <div className="mt-4 text-sm text-brand-muted">
          {weak.lastLevelTest && level && (
            <p>
              Ultimo test di livello ({formatDate(weak.lastLevelTest.createdAt)}): {LEVEL_LABELS[level]}.
            </p>
          )}
          {weak.lastOrientationTest && (
            <p>
              Ultimo test della Palestra ({formatDate(weak.lastOrientationTest.createdAt)}):{" "}
              {weak.lastOrientationTest.recommended.length} esercizi consigliati.
            </p>
          )}
        </div>
      )}
    </ProgressCard>
  );
}

/* ------------------------------------ 3. Corsi ------------------------------------ */

export function CoursesSection({ courses }: { courses: CourseProgress[] }) {
  const completed = courses.filter((c) => c.completed).length;
  const started = courses.filter((c) => c.passedMissions > 0).length;
  return (
    <ProgressCard
      id="corsi"
      icon="🗺️"
      title="I tuoi corsi"
      summary={
        <p className="text-sm text-brand-muted">
          {courses.length === 0
            ? "Non ci sono ancora corsi in questa materia."
            : `${started} ${started === 1 ? "corso iniziato" : "corsi iniziati"}, ${completed} ${completed === 1 ? "completato" : "completati"} su ${courses.length}.`}
        </p>
      }
    >
      {courses.length > 0 && (
        <ul className="space-y-3">
          {courses.map((c) => (
            <li key={c.courseSlug}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <Link href={courseHref(c.courseSlug)} className="font-semibold text-foreground hover:text-brand-primary">
                  {c.courseTitle}
                </Link>
                <span className="text-brand-muted">
                  {c.passedMissions}/{c.totalMissions} missioni
                  {c.percentage !== null && ` · media ${formatNumber(c.percentage, 0)}%`}
                  {c.completed && " · completato ✓"}
                </span>
              </div>
              <div className="mt-1">
                <ProgressBar percent={c.totalMissions ? (c.passedMissions / c.totalMissions) * 100 : 0} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </ProgressCard>
  );
}

/* ------------------------------------ 4. Palestra ------------------------------------ */

export function PracticeSection({ practice }: { practice: PracticeProgress }) {
  const passed = practice.items.filter((p) => p.item.status === "completed").length;
  return (
    <ProgressCard
      id="palestra"
      icon="💪"
      title="Palestra"
      summary={
        <p className="text-sm text-brand-muted">
          {practice.items.length === 0 && practice.inReview.length === 0
            ? "Non hai ancora svolto esercizi in Palestra in questa materia."
            : `${passed} ${passed === 1 ? "esercizio superato" : "esercizi superati"} su ${practice.items.length} svolti` +
              (practice.inReview.length > 0 ? `, ${practice.inReview.length} in correzione.` : ".")}
        </p>
      }
    >
      {practice.inReview.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-bold text-foreground">In correzione</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {practice.inReview.map((item) => (
              <li key={item.practiceExerciseId} className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-brand-primary" />
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {practice.items.length > 0 && (
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-brand-muted">
            <tr>
              <th className="py-1 font-semibold">Esercizio</th>
              <th className="py-1 font-semibold">Stato</th>
              <th className="py-1 text-right font-semibold">Migliore</th>
              <th className="py-1 text-right font-semibold">Punti</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {practice.items.map(({ item, bestPercentage, assessedAttempts, lastAssessedAttemptId }) => (
              <tr key={item.practiceExerciseId}>
                <td className="py-2 pr-2">
                  {lastAssessedAttemptId ? (
                    <Link href={attemptDetailHref(lastAssessedAttemptId)} className="font-semibold hover:text-brand-primary">
                      {item.title}
                    </Link>
                  ) : (
                    <span className="font-semibold">{item.title}</span>
                  )}
                  <span className="block text-xs text-brand-muted">
                    {assessedAttempts === 1 ? "1 tentativo" : `${assessedAttempts} tentativi`}
                  </span>
                </td>
                <td className="py-2 pr-2 text-brand-muted">{practiceStatusLabel[item.status]}</td>
                <td className="py-2 text-right">{bestPercentage === null ? "—" : `${formatNumber(bestPercentage, 0)}%`}</td>
                <td className="py-2 text-right">
                  {formatNumber(item.points)}/{formatNumber(item.maxPoints)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ProgressCard>
  );
}

/* ------------------------------------ 5. Storico ------------------------------------ */

const statusIcon = (item: AttemptHistoryItem) =>
  item.status === "pending_review" ? (
    <ClockIcon className="h-5 w-5 text-brand-primary" />
  ) : item.passed ? (
    <CheckCircleIcon className="h-5 w-5 text-brand-success" />
  ) : (
    <XCircleIcon className="h-5 w-5 text-brand-coral" />
  );

export function HistorySection({ history, filters }: { history: HistoryPage; filters: ProgressFilters }) {
  const { content, page } = history;
  const filterLink = (label: string, next: Partial<ProgressFilters>, active: boolean) => (
    <Link
      href={progressHref({ ...filters, ...next, page: 0 })}
      aria-current={active ? "true" : undefined}
      className={`rounded-pill border px-3 py-1 text-xs font-semibold ${
        active ? "border-brand-primary bg-surface-blue text-brand-primary" : "border-border text-brand-muted hover:bg-surface-blue"
      }`}
    >
      {label}
    </Link>
  );
  const context = filters.context ?? "all";
  const outcome = filters.outcome ?? "all";

  return (
    <ProgressCard
      id="storico"
      icon="📜"
      title="Storico"
      defaultOpen={Boolean(filters.context || filters.outcome || filters.allTime || filters.page)}
      summary={
        <p className="text-sm text-brand-muted">
          {page.totalElements === 0
            ? filters.allTime
              ? "Nessun esercizio consegnato."
              : "Nessun esercizio consegnato negli ultimi 30 giorni."
            : `${page.totalElements} ${page.totalElements === 1 ? "esercizio consegnato" : "esercizi consegnati"}${filters.allTime ? "" : " negli ultimi 30 giorni"}.`}
        </p>
      }
    >
      <div className="flex flex-wrap gap-2">
        {filterLink("Tutti", { context: "all" }, context === "all")}
        {filterLink("Missioni", { context: "mission" }, context === "mission")}
        {filterLink("Palestra", { context: "practice" }, context === "practice")}
        <span className="mx-1 border-l border-border" aria-hidden="true" />
        {filterLink("Ogni esito", { outcome: "all" }, outcome === "all")}
        {filterLink("Superati", { outcome: "passed" }, outcome === "passed")}
        {filterLink("Non superati", { outcome: "failed" }, outcome === "failed")}
      </div>

      {content.length > 0 && (
        <ul className="mt-4 divide-y divide-border">
          {content.map((item) => (
            <li key={item.exerciseAttemptId}>
              <Link
                href={attemptDetailHref(item.exerciseAttemptId)}
                className="flex items-center gap-3 py-3 hover:bg-surface-blue sm:px-2"
              >
                {statusIcon(item)}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="block text-xs text-brand-muted">
                    {item.place} · {formatDate(item.date)}
                    {item.teacher && " · corretto dalla docente"}
                  </span>
                </span>
                <span className="shrink-0 text-right text-sm">
                  {item.status === "pending_review" ? (
                    <span className="text-brand-muted">In correzione</span>
                  ) : item.status === "expired" ? (
                    <span className="text-brand-muted">Tempo scaduto</span>
                  ) : (
                    <>
                      <span className="block font-bold">{formatGrade(item.grade)}</span>
                      <span className="block text-xs text-brand-muted">{formatNumber(item.percentage, 0)}%</span>
                    </>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span>
          {page.number > 0 && (
            <Link href={progressHref({ ...filters, page: page.number - 1 })} className="text-brand-primary hover:underline">
              ← Più recenti
            </Link>
          )}
        </span>
        {!filters.allTime && (
          <Link href={progressHref({ ...filters, allTime: true, page: 0 })} className="font-semibold text-brand-primary hover:underline">
            Mostra anche i più vecchi
          </Link>
        )}
        <span>
          {page.number + 1 < page.totalPages && (
            <Link href={progressHref({ ...filters, page: page.number + 1 })} className="text-brand-primary hover:underline">
              Più vecchi →
            </Link>
          )}
        </span>
      </div>
    </ProgressCard>
  );
}
