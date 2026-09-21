export type CourseLevel = "Principiante" | "Intermedio" | "Avanzato";

export interface SubjectData {
  slug: string;
  name: string;
  /**
   * Testo mostrato sotto il nome nella card materia.
   * Per le materie bloccate è semplicemente "Presto disponibile".
   */
  tagline: string;
  imageUrl: string;
  locked: boolean;
}

export interface CourseListItem {
  slug: string;
  subjectSlug: string;
  title: string;
  description: string;
  imageUrl: string;
  stepsCount: number;
  level: CourseLevel;
  skillsCount: number;
  /**
   * 0-100. undefined = corso non ancora iniziato.
   */
  progress?: number;
  isPopular?: boolean;
  href: string;
}

export interface CoursesPageData {
  subjects: SubjectData[];
  activeSubject: SubjectData;
  courses: CourseListItem[];
}

export interface LevelTestOption {
  id: string;
  label: string;
  level: CourseLevel;
}

export interface LevelTestQuestion {
  id: string;
  prompt: string;
  options: LevelTestOption[];
}

export interface LevelTestSubmission {
  subjectSlug: string;
  answers: Record<string, string>; // questionId -> optionId
  recommendedLevel: CourseLevel;
}
