import { getCoursesData } from "@/lib/myCourses";
import { SubjectSelector } from "@/components/myCourses/SubjectSelector";
import { CoursesHero } from "@/components/myCourses/CoursesHero";
import { CoursesList } from "@/components/myCourses/CoursesList";
import { LevelTestBanner } from "@/components/myCourses/LevelTestBanner";

interface CoursesPageProps {
  searchParams: Promise<{ materia?: string }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { materia } = await searchParams;
  const { subjects, activeSubject, courses, levelTestHref } =
    await getCoursesData(materia);

  return (
    <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-6 lg:items-start space-y-6 lg:space-y-0">
      {/* SINISTRA: carosello su mobile, colonna sticky su desktop */}
      <div className="lg:sticky lg:top-20">
        <SubjectSelector subjects={subjects} activeSlug={activeSubject.slug} />
      </div>

      {/* DESTRA: contenuto del corso, scorre verticalmente col resto della pagina */}
      <div className="space-y-6">
        <CoursesHero subject={activeSubject} />
        <CoursesList courses={courses} />
        <LevelTestBanner href={levelTestHref} />
      </div>
    </div>
  );
}
