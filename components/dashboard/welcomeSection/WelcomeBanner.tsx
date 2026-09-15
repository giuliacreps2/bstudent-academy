import type { LastCourse } from "@/types/dashboard";
import { NextStepBanner } from "./NextStepBanner";
import { ContinueBanner } from "./ContinueBanner";

interface WelcomeBannerProps {
  hasStartedCourse: boolean;
  lastCourse?: LastCourse;
}

export function WelcomeBanner({
  hasStartedCourse,
  lastCourse,
}: WelcomeBannerProps) {
  if (hasStartedCourse && lastCourse) {
    return <ContinueBanner course={lastCourse} />;
  }
  return <NextStepBanner />;
}
