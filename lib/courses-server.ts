import { cache } from "react";
import { ApiError } from "@/lib/api";
import { serverApi } from "@/lib/api-server";
import {
  COURSE_COVER_PLACEHOLDER,
  courseWorld,
  MISSION_COVER_PLACEHOLDER,
  missionPosition,
} from "@/constants/missionMap";
import {
  COURSE_REWARDS_PLACEHOLDER,
  MISSION_REWARD_LABEL_PLACEHOLDER,
  SKIN_PLACEHOLDER,
} from "@/constants/rewardPlaceholders";
import { courseHref, missionHref } from "@/lib/courses";
import type {
  CourseCard,
  CourseDetail,
  CourseLevelKey,
  CoursesPage,
  CurrentMission,
  MissionMap,
  MissionNode,
  MissionPage,
} from "@/types/courses";
import type { CourseLevel, CourseListItem, SubjectData } from "@/types/myCourses";
import type { MissionMapData, MissionMapNode, MissionSkillReward } from "@/types/missions";
import type { ExercisesPage, SubjectCard } from "@/types/practice";
import type { StatsData } from "@/types/dashboard";

/* =====================================================================
   Corsi e missioni dello studente dal backend (StudentCourseController),
   trasformati nei tipi che le pagine già usano.
   ===================================================================== */

async function orNull<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

const enc = encodeURIComponent;

export const levelLabels: Record<CourseLevelKey, CourseLevel> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzato",
};

/* ------------------------------------ Mappature ------------------------------------ */

export function toSubjectData(subject: SubjectCard): SubjectData {
  return {
    slug: subject.slug,
    name: subject.name,
    tagline: subject.locked ? "Presto disponibile" : (subject.tagline ?? ""),
    // TODO (Cloudinary): immagine della materia da imageReference
    imageUrl: "/latino.png",
    locked: subject.locked,
  };
}

export function toCourseListItem(course: CourseCard): CourseListItem {
  return {
    slug: course.slug,
    subjectSlug: course.subjectSlug,
    title: course.title,
    description: course.description,
    imageUrl: COURSE_COVER_PLACEHOLDER,
    stepsCount: course.stepsCount,
    level: course.level ? levelLabels[course.level] : "Per tutti",
    skillsCount: course.skillsCount,
    progress: course.progress ?? undefined,
    isPopular: course.popular,
    isFeatured: course.featured,
    premiumLocked: course.premiumLocked,
    href: courseHref(course.slug),
  };
}

function toMapNode(
  courseSlug: string,
  node: MissionNode,
  index: number,
  total: number,
  extra?: { skillRewards: MissionSkillReward[]; passingThreshold: number },
): MissionMapNode {
  return {
    id: String(node.missionId),
    slug: node.slug,
    order: node.order,
    title: node.title,
    tagline: node.tagline ?? "",
    description: node.description,
    position: missionPosition(index, total),
    status: node.status,
    type: node.isFinal ? "final" : "normal",
    skillRewards: extra?.skillRewards ?? [],
    totalXp: Number(node.xp),
    rewardLabel: MISSION_REWARD_LABEL_PLACEHOLDER,
    durationMinutes: node.durationMinutes,
    maxErrors: 0,
    passingThreshold: extra?.passingThreshold,
    objectives: node.learningGoals,
    coverImageUrl: MISSION_COVER_PLACEHOLDER,
    premiumLocked: node.premiumLocked,
    href: missionHref(courseSlug, node.slug),
  };
}

/* ------------------------------------ Letture ------------------------------------ */

/** "I miei corsi": materie, corsi della materia attiva, test di livello e missioni da continuare */
export async function getCoursesPage(subject?: string) {
  const qs = subject ? `?${new URLSearchParams({ subject })}` : "";
  const [page, current] = await Promise.all([
    serverApi<CoursesPage>(`/student/courses${qs}`),
    serverApi<CurrentMission[]>("/student/missions/current"),
  ]);
  return {
    subjects: page.subjects.map(toSubjectData),
    activeSubject: page.activeSubject ? toSubjectData(page.activeSubject) : null,
    courses: page.courses.map(toCourseListItem),
    recommendedLevel: page.recommendedLevel ? levelLabels[page.recommendedLevel] : null,
    hasLevelTest: page.hasLevelTest,
    currentMissions: current,
  };
}

export const getMissionMap = cache((courseSlug: string) =>
  orNull(serverApi<MissionMap>(`/student/courses/${enc(courseSlug)}/missions`)),
);

export const getMissionPage = cache((courseSlug: string, missionSlug: string) =>
  orNull(serverApi<MissionPage>(`/student/courses/${enc(courseSlug)}/missions/${enc(missionSlug)}`)),
);

/** Nodi della mappa con i punti skill di ogni missione (dalla pagina della missione) */
async function mapNodes(map: MissionMap): Promise<MissionMapNode[]> {
  // Solo per i punti skill: se una pagina non si apre (es. missione dell'abbonamento) la mappa resta valida
  const pages = await Promise.all(
    map.missions.map((m) => getMissionPage(map.courseSlug, m.slug).catch(() => null)),
  );
  return map.missions.map((node, index) => {
    const page = pages[index];
    return toMapNode(map.courseSlug, node, index, map.missions.length, page
      ? {
          passingThreshold: Number(page.passingThreshold),
          skillRewards: page.rewards.skillPoints.map((s) => ({
            label: s.skillName,
            xp: Number(s.maxPoints),
            icon: null,
          })),
        }
      : undefined);
  });
}

/** Pagina del corso: dettaglio, mappa e ricompense (le ricompense oggetto restano in sospeso) */
export async function getCourseDetailPage(courseSlug: string) {
  const [detail, map] = await Promise.all([
    orNull(serverApi<CourseDetail>(`/student/courses/${enc(courseSlug)}`)),
    getMissionMap(courseSlug),
  ]);
  if (!detail || !map) return null;

  const [missions, stats] = await Promise.all([mapNodes(map), getStats()]);
  return {
    detail,
    course: toCourseListItem(detail.course),
    subject: toSubjectData(detail.subject),
    world: courseWorld(map.worldTheme, map.subjectName),
    missions,
    stats,
    rewards: COURSE_REWARDS_PLACEHOLDER,
  };
}

/** XP, stadio e Serie dalla barra fissa e dall'evoluzione (Blueprint Gamification §4) */
async function getStats(): Promise<StatsData> {
  const [topBar, evolution] = await Promise.all([
    serverApi<{ xp: number; stage: number; streak: { current: number } }>("/student/game/top-bar"),
    serverApi<{ currentStage: number; totalXp: number; nextMinXp: number | null }>("/student/game/evolution"),
  ]);
  const xp = Number(topBar.xp);
  return {
    level: evolution.currentStage,
    currentXp: Number(evolution.totalXp),
    maxXp: evolution.nextMinXp ? Number(evolution.nextMinXp) : Math.max(1, Number(evolution.totalXp)),
    xp,
    streak: topBar.streak.current,
  };
}

/** Mappa immersiva del corso */
export async function getMissionMapData(courseSlug: string): Promise<MissionMapData | null> {
  const map = await getMissionMap(courseSlug);
  if (!map) return null;

  const [missions, stats, practice] = await Promise.all([
    mapNodes(map),
    getStats(),
    serverApi<ExercisesPage>(`/student/practice?${new URLSearchParams({ subject: map.subjectSlug })}`),
  ]);

  return {
    world: courseWorld(map.worldTheme, map.subjectName),
    course: {
      slug: map.courseSlug,
      category: `Corso di ${map.subjectName}`,
      title: map.courseTitle,
      quote: map.quote ?? "",
      quoteAuthor: map.quoteAuthor ?? "",
      backHref: courseHref(map.courseSlug),
    },
    missions,
    studentSkills: practice.skills.map(({ level }) => ({
      label: level.name,
      current: level.maxLevel ? 100 : level.progressPercent,
      max: 100,
    })),
    dashboardHref: "/my/dashboard",
    skin: SKIN_PLACEHOLDER,
    stats,
  };
}
