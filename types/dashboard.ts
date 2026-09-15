export type Gender = "M" | "F";

export interface DashboardUser {
  firstName: string;
  gender: Gender;
}

export interface LastCourse {
  title: string;
  slug: string;
  progress: number; // 0-100
}

export interface DashboardData {
  user: DashboardUser;
  hasStartedCourse: boolean;
  lastCourse?: LastCourse;
  skin: SkinData;
  stats: StatsData;
  activity: ActivityData;
  skills: SkillData[];
  milestone: MilestoneData;
  courses: CourseData[];
  profileCompletion: ProfileCompletionData;
  isFirstLogin: boolean;
  featuredCourses: FeaturedCourseData[];
  recommendedActivity: RecommendedActivityData;
}

export interface SkinBonus {
  label: string;
  value: string;
}

export interface SkinData {
  code: string;
  name: string;
  imageUrl: string;
  bonuses: SkinBonus[];
}

export interface StatsData {
  level: number;
  currentXp: number;
  maxXp: number;
  xp: number;
  streak: number;
}

export interface ActivityData {
  category: string;
  title: string;
  exerciseCount: number;
  durationMinutes: number;
  href: string;
}

export type SkillIcon = "grammatica" | "lessico" | "traduzione";

export interface SkillData {
  name: string;
  progress: number; // 0-100
  icon: SkillIcon;
}

export interface MilestoneData {
  xpNeeded: number;
  nextLevel: number;
  progress: number; // 0-100
}

export interface CourseData {
  slug: string;
  language: string; // "Latino", "Greco" — badge mostrato sulla card
  title: string;
  description: string;
  imageUrl: string;
  progress: number; // 0-100
}

export interface ProfileTask {
  id: string;
  label: string;
  xpReward: number;
  completed: boolean;
}

export interface ProfileCompletionData {
  tasks: ProfileTask[];
  bonusXp: number; // XP extra al completamento di tutte le task
}

export interface FeaturedCourseData {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  lessonsCount: number;
  level: string;
  rating: number;
  studentsCount: string;
  imageUrl: string;
}

export interface RecommendedActivityData {
  title: string;
  reason: string; // es. "Basato sui tuoi ultimi errori"
  href: string;
}
