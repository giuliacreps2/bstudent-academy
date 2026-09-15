import { getDashboardData } from "@/lib/dashboard";
import { Greeting } from "@/components/dashboard/welcomeSection/Greeting";
import { WelcomeBanner } from "@/components/dashboard/welcomeSection/WelcomeBanner";
import { RightColumn } from "@/components/dashboard/rightColumn/RightColumn";
import { SkinImage } from "@/components/dashboard/rightColumn/SkinImage";
import { LevelProgress } from "@/components/dashboard/rightColumn/LevelProgress";
import { XpStreakRow } from "@/components/dashboard/rightColumn/XpStreakRow";
import { NextActivity } from "@/components/dashboard/rightColumn/NextActivity";
import { SkillsList } from "@/components/dashboard/rightColumn/SkillsList";
import { NextMilestone } from "@/components/dashboard/rightColumn/NextMilestone";
import { MidSection } from "@/components/dashboard/midSection/MidSection";

export default async function DashboardPage() {
  const {
    user,
    hasStartedCourse,
    lastCourse,
    skin,
    stats,
    activity,
    skills,
    milestone,
    courses,
    profileCompletion,
    isFirstLogin,
    featuredCourses,
    recommendedActivity,
  } = await getDashboardData();
  return (
    <>
      {/* MOBILE: saluto → skin/livello → attività → streak → skill → traguardo → banner */}
      <div className="lg:hidden space-y-6">
        <Greeting user={user} />

        <div className="flex items-center gap-4 rounded-lg bg-surface border border-border p-4">
          <SkinImage
            src={skin.imageUrl}
            alt={skin.name}
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
          <LevelProgress
            level={stats.level}
            currentXp={stats.currentXp}
            maxXp={stats.maxXp}
          />
        </div>

        <NextActivity activity={activity} />
        <XpStreakRow xp={stats.xp} streak={stats.streak} />
        <SkillsList skills={skills} />
        <NextMilestone milestone={milestone} />

        <WelcomeBanner
          hasStartedCourse={hasStartedCourse}
          lastCourse={lastCourse}
        />
      </div>

      {/* DESKTOP: 2/3 + 1/3 */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Greeting user={user} />
          <WelcomeBanner
            hasStartedCourse={hasStartedCourse}
            lastCourse={lastCourse}
          />
          {/* <MyCourses /> <HowItWorks /> quando pronti */}
          <MidSection
            courses={courses}
            profileCompletion={profileCompletion}
            isFirstLogin={isFirstLogin}
            featuredCourses={featuredCourses}
            recommendedActivity={recommendedActivity}
          />
        </div>

        <div>
          <RightColumn
            skin={skin}
            stats={stats}
            activity={activity}
            skills={skills}
            milestone={milestone}
          />
        </div>
      </div>
    </>
  );
}
