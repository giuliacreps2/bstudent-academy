import Link from "next/link";
import { notFound } from "next/navigation";
import { MapIcon } from "@heroicons/react/24/outline";
import { getCourseDetailPage } from "@/lib/courses-server";
import { coursesHref, missionMapHref } from "@/lib/courses";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";
import { CourseDetailHero } from "@/components/myCourses/slug/CourseDetailHero";
import { CourseProgressCard } from "@/components/myCourses/slug/CourseProgressCard";
import { CourseSkillsCard } from "@/components/myCourses/slug/CourseSkillsCard";
import { CourseLevelCard } from "@/components/myCourses/slug/CourseLevelCard";
import { CourseNotebookSection } from "@/components/myCourses/slug/CourseNotebookSection";
import { CourseMissionSection } from "@/components/myCourses/slug/CourseMissionSection";
import { CourseRewardsSection } from "@/components/myCourses/slug/CourseRewardsSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pagina del corso (blueprint §5.8) con i dati del backend */
export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getCourseDetailPage(slug);
  if (!page) notFound();

  const { detail, course, subject, world, missions, stats, rewards } = page;
  const completedMissions = missions.filter((m) => m.status === "completed").length;
  const continueHref =
    missions.find((m) => m.status === "current")?.href ?? missions[0]?.href ?? missionMapHref(slug);

  // TODO (Quaderno, Piano MVP 4.5): riepilogo del Quaderno del corso quando il backend lo espone
  const notebook = { totalTopics: 0, href: "/my/notebook" };

  return (
    <div className="space-y-6">
      <MissionBreadcrumb
        items={[
          { label: "Corsi", href: "/my/courses" },
          { label: subject.name, href: coursesHref(subject.slug) },
          { label: course.title },
        ]}
      />

      <CourseDetailHero
        subjectName={subject.name}
        imageUrl={course.imageUrl}
        title={course.title}
        tagline={detail.tagline ?? ""}
        description={detail.description}
        missionsCount={missions.length}
        skillsCount={detail.skills.length}
        recommendedLevel={course.level}
        continueHref={continueHref}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <CourseProgressCard completed={completedMissions} total={missions.length} />
        <CourseSkillsCard skills={detail.skills} />
        {/* Stadio del personaggio e XP verso il prossimo (Gamification §4) */}
        <CourseLevelCard level={stats.level} currentXp={stats.currentXp} maxXp={stats.maxXp} />
      </div>

      <CourseNotebookSection notebook={notebook} />

      {missions.length > 0 ? (
        <>
          <CourseMissionSection world={world} missions={missions} notebookHref={notebook.href} />
          <div className="text-right">
            <Link
              href={missionMapHref(slug)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
            >
              <MapIcon className="h-4 w-4" />
              Apri la mappa del corso
            </Link>
          </div>
        </>
      ) : (
        <p className="rounded-lg border border-border bg-surface p-6 text-center text-brand-muted">
          Le missioni di questo corso stanno arrivando: torna a trovarci presto.
        </p>
      )}

      <CourseRewardsSection
        rewards={rewards}
        totalXp={Number(detail.rewards.totalXp)}
        firstEvolution={detail.rewards.firstEvolution}
      />
    </div>
  );
}
