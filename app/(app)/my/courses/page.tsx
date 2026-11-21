import { getCoursesPage } from "@/lib/courses-server";
import { SubjectSelector } from "@/components/myCourses/SubjectSelector";
import { CoursesHero } from "@/components/myCourses/CoursesHero";
import { CoursesList } from "@/components/myCourses/CoursesList";
import { CourseLevelTest } from "@/components/myCourses/CourseLevelTest";
import { ContinueMissions } from "@/components/missions/ContinueMissions";

interface CoursesPageProps {
  searchParams: Promise<{ materia?: string }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { materia } = await searchParams;
  const { subjects, activeSubject, courses, recommendedLevel, hasLevelTest, currentMissions } =
    await getCoursesPage(materia);

  if (!activeSubject) {
    return (
      <p className="rounded-lg border border-border bg-surface p-6 text-center text-brand-muted">
        I corsi stanno arrivando: torna a trovarci presto.
      </p>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-6 lg:items-start space-y-6 lg:space-y-0">
      {/* SINISTRA: carosello su mobile, colonna sticky su desktop */}
      <div className="lg:sticky lg:top-20">
        <SubjectSelector subjects={subjects} activeSlug={activeSubject.slug} />
      </div>

      {/* DESTRA: contenuto del corso, scorre verticalmente col resto della pagina */}
      <div className="space-y-6">
        <CoursesHero subject={activeSubject} />
        <ContinueMissions missions={currentMissions} />
        {hasLevelTest && (
          <CourseLevelTest subject={activeSubject} courses={courses} recommendedLevel={recommendedLevel} />
        )}
        <CoursesList courses={courses} />
      </div>
    </div>
  );
}
