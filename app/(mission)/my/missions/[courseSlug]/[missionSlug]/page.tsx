import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CheckIcon, ClockIcon, FlagIcon, GiftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { serverApi } from "@/lib/api-server";
import { getMissionPage } from "@/lib/courses-server";
import { missionMapHref } from "@/lib/courses";
import { missionPlayHref } from "@/lib/missionPlay";
import { MISSION_REWARD_LABEL_PLACEHOLDER } from "@/constants/rewardPlaceholders";
import { MissionRibbon } from "@/components/missions/MissionRibbon";
import { MissionBriefingCard } from "@/components/missions/MissionBriefingCard";
import { MissionTutorial } from "@/components/missions/MissionTutorial";
import { PlayStepper } from "@/components/missionPlay/PlayStepper";
import { StartMissionButton } from "@/components/missionPlay/StartMissionButton";
import type { CurrentMission } from "@/types/courses";

interface PageProps {
  params: Promise<{ courseSlug: string; missionSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug, missionSlug } = await params;
  const page = await getMissionPage(courseSlug, missionSlug);
  return { title: page ? `${page.mission.title} | BStudent` : "Missione | BStudent" };
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString("it-IT", { weekday: "long", hour: "2-digit", minute: "2-digit" });

/** Pagina della missione (blueprint §5.9) prima di "Inizia" */
export default async function MissionPage({ params }: PageProps) {
  const { courseSlug, missionSlug } = await params;
  const [page, current] = await Promise.all([
    getMissionPage(courseSlug, missionSlug),
    serverApi<CurrentMission[]>("/student/missions/current"),
  ]);
  if (!page) notFound();

  const { mission, rewards, lives, hint } = page;
  const open = current.find((c) => c.courseSlug === courseSlug && c.missionSlug === missionSlug);
  const threshold = Number(page.passingThreshold);

  const startLabel =
    open?.status === "active" || open?.status === "saved"
      ? "Riprendi la missione"
      : open?.status === "failed"
        ? "Riprova la missione"
        : mission.status === "completed"
          ? "Rigioca la missione"
          : "Inizia la missione";

  const blockedReason = mission.premiumLocked
    ? "Questa missione è nell'abbonamento."
    : mission.status === "locked"
      ? "Supera le missioni precedenti per sbloccarla."
      : lives.lives <= 0
        ? `Non hai vite per giocare.${lives.rechargeAt ? ` Si ricaricano ${formatTime(lives.rechargeAt)}.` : ""} Intanto puoi allenarti in Palestra.`
        : null;

  const card = "rounded-2xl bg-white/95 p-5 text-foreground shadow-lg";

  return (
    <div className="relative z-10 mx-auto min-h-screen max-w-5xl px-4 pb-16 pt-4 sm:px-6">
      {!page.tutorialSeen && <MissionTutorial passingThreshold={threshold} />}

      {/* BARRA: ritorno alla mappa, vite e aiuti del cappello (mai acquistabili) */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href={missionMapHref(courseSlug)}
          className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/25"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {page.courseTitle}
        </Link>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold text-foreground" title="Vite">
            <HeartIcon aria-hidden="true" className="h-4 w-4 text-brand-coral" />
            <span className="sr-only">Vite:</span>
            {lives.lives}
          </span>
          {hint.owned && (
            <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold text-foreground" title="Aiuti del cappello">
              <span aria-hidden="true">📜</span>
              <span className="sr-only">Aiuti:</span>
              {hint.remaining}/{hint.capacity}
            </span>
          )}
        </div>
      </div>

      {/* HERO */}
      <header className="mt-8 max-w-2xl">
        <MissionRibbon number={mission.order} />
        <h1 className="mt-4 text-3xl font-extrabold leading-[1.05] text-white sm:text-4xl">{mission.title}</h1>
        {mission.tagline && <p className="mt-2 text-lg font-semibold text-white/90">{mission.tagline}</p>}
        <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{mission.description}</p>
      </header>

      <div className="mt-8 grid gap-5 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-5">
          <MissionBriefingCard briefing={page.briefing} />

          <section className={card} aria-label="Tappe della missione">
            <p className="mb-2 text-sm font-bold">Le tappe</p>
            <PlayStepper steps={page.steps} finished={mission.status === "completed"} />
          </section>

          {mission.learningGoals.length > 0 && (
            <section className={card}>
              <p className="text-sm font-bold">Cosa imparerai</p>
              <ul className="mt-3 space-y-1.5">
                {mission.learningGoals.map((goal) => (
                  <li key={goal} className="flex items-start gap-2 text-sm text-brand-muted">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-success" />
                    {goal}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="space-y-5">
          <section className={card}>
            <p className="flex items-center gap-2 text-sm font-bold">
              <FlagIcon className="h-4 w-4 text-brand-primary" />
              Obiettivo
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <ClockIcon className="mx-auto h-4 w-4 text-brand-muted" />
                <p className="mt-1 text-sm font-extrabold">{mission.durationMinutes} min</p>
                <p className="text-[11px] text-brand-muted">Tempo degli esercizi</p>
              </div>
              <div>
                <FlagIcon className="mx-auto h-4 w-4 text-brand-muted" />
                <p className="mt-1 text-sm font-extrabold">{threshold}%</p>
                <p className="text-[11px] text-brand-muted">Per superare</p>
              </div>
              <div>
                <HeartIcon className="mx-auto h-4 w-4 text-brand-coral" />
                <p className="mt-1 text-sm font-extrabold">{lives.lives}</p>
                <p className="text-[11px] text-brand-muted">Vite</p>
              </div>
            </div>
          </section>

          <section className={card}>
            <p className="flex items-center gap-2 text-sm font-bold">
              <GiftIcon className="h-4 w-4 text-brand-primary" />
              Ricompense
            </p>
            <p className="mt-3 text-lg font-extrabold text-brand-success">+{Number(rewards.xp)} XP</p>
            <ul className="mt-2 space-y-1 text-sm">
              {rewards.skillPoints.map((s) => (
                <li key={s.skillId}>
                  <span className="font-semibold">+{Number(s.maxPoints)} punti</span>{" "}
                  <span className="text-brand-muted">{s.skillName}</span>
                </li>
              ))}
            </ul>
            {/* TODO (decisione in sospeso, Gamification §6.4): oggetto ricompensa d'esempio */}
            <p className="mt-3 rounded-xl bg-surface-blue px-3 py-2 text-sm">
              <span className="text-brand-muted">Ricompensa:</span>{" "}
              <span className="font-semibold">{MISSION_REWARD_LABEL_PLACEHOLDER}</span>
            </p>
          </section>

          <section className={card}>
            {open?.status === "pending_review" ? (
              <>
                <p className="text-sm font-semibold">Hai consegnato l&apos;ultimo esercizio: aspetta la correzione della docente.</p>
                <Link href={missionPlayHref(open.missionAttemptId)} className="btn-secondary mt-3 inline-flex px-4 py-2 text-sm">
                  Vedi la consegna
                </Link>
              </>
            ) : blockedReason || !page.canStart ? (
              <p className="flex items-start gap-2 text-sm font-semibold text-brand-muted">
                <LockClosedIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {blockedReason ?? "Questa missione non si può ancora iniziare."}
              </p>
            ) : (
              <StartMissionButton courseSlug={courseSlug} missionSlug={missionSlug} label={startLabel} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
