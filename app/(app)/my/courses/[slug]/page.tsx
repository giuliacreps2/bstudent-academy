import { getCourseDetailData } from "@/lib/myCourses";
import { getMissionMapData } from "@/lib/missions";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";
import { CourseDetailHero } from "@/components/myCourses/slug/CourseDetailHero";
import { CourseProgressCard } from "@/components/myCourses/slug/CourseProgressCard";
import { CourseSkillsCard } from "@/components/myCourses/slug/CourseSkillsCard";
import { CourseLevelCard } from "@/components/myCourses/slug/CourseLevelCard";
import { CourseNotebookSection } from "@/components/myCourses/slug/CourseNotebookSection";
import { CourseMissionSection } from "@/components/myCourses/slug/CourseMissionSection";
import { CourseRewardsSection } from "@/components/myCourses/slug/CourseRewardsSection";

export default async function CourseDetailPage() {
  // TEMPORANEO: slug fittizio per sviluppare la UI
  const slug = "basi-traduzione";

  const [courseDetail, missionData] = await Promise.all([
    getCourseDetailData(slug),
    getMissionMapData(slug),
  ]);

  const {
    course,
    subject,
    tagline,
    description,
    skillsInvolved,
    studentLevel,
    notebook,
    rewards,
  } = courseDetail;

  const { world, missions } = missionData;

  const completedMissions = missions.filter(
    (mission) => mission.status === "completed",
  ).length;

  const continueHref =
    missions.find((mission) => mission.status === "current")?.href ??
    missions[0]?.href ??
    course.href;

  return (
    <div className="space-y-6">
      <MissionBreadcrumb
        items={[
          { label: "Corsi", href: "/my/courses" },
          {
            label: subject.name,
            href: `/my/courses?materia=${subject.slug}`,
          },
          { label: course.title },
        ]}
      />

      <CourseDetailHero
        subjectName={subject.name}
        imageUrl={course.imageUrl}
        title={course.title}
        tagline={tagline}
        description={description}
        missionsCount={missions.length}
        skillsCount={skillsInvolved.length}
        recommendedLevel={course.level}
        continueHref={continueHref}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <CourseProgressCard
          completed={completedMissions}
          total={missions.length}
        />

        <CourseSkillsCard skills={skillsInvolved} />

        <CourseLevelCard
          level={studentLevel.level}
          currentXp={studentLevel.currentXp}
          maxXp={studentLevel.maxXp}
        />
      </div>

      <CourseNotebookSection notebook={notebook} />

      <CourseMissionSection
        world={world}
        missions={missions}
        notebookHref={notebook.href}
      />

      <CourseRewardsSection rewards={rewards} />
    </div>
  );
}
