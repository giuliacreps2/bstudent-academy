import Link from "next/link";
import { CourseCarousel } from "./CourseCarousel";
import { CourseGrid } from "./CourseGrid";
import { ProfileCompletionCard } from "./ProfileCompletionCard";
import { HowItWorks } from "./HowItWorks";
import { FeaturedCourses } from "./FeaturedCourses";
import { RecommendedActivity } from "./RecommendedActivity";
import { MissionsTeaser } from "./MissionsTeaser";
import type {
  CourseData,
  ProfileCompletionData,
  FeaturedCourseData,
  RecommendedActivityData,
} from "@/types/dashboard";

interface MidSectionProps {
  courses: CourseData[];
  profileCompletion: ProfileCompletionData;
  isFirstLogin: boolean;
  featuredCourses: FeaturedCourseData[];
  recommendedActivity: RecommendedActivityData;
}

export function MidSection({
  courses,
  profileCompletion,
  isFirstLogin,
  featuredCourses,
  recommendedActivity,
}: MidSectionProps) {
  const isProfileComplete = profileCompletion.tasks.every((t) => t.completed);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground">I tuoi corsi</h3>
          <Link
            href="/corsi"
            className="text-sm font-medium text-brand-primary hover:underline"
          >
            Vedi tutti →
          </Link>
        </div>

        {isProfileComplete ? (
          <CourseGrid courses={courses} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <CourseCarousel courses={courses} />
            </div>
            <div className="lg:col-span-2">
              <ProfileCompletionCard data={profileCompletion} />
            </div>
          </div>
        )}
      </div>

      {isFirstLogin && <HowItWorks />}

      <FeaturedCourses courses={featuredCourses} />
      <RecommendedActivity activity={recommendedActivity} />
      <MissionsTeaser />
    </div>
  );
}
