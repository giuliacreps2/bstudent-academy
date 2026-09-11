import { ProgressSection } from "@/components/animations/ProgressSection";
import { ArticleGrid } from "@/components/ArticleGrid";
import { CourseGrid } from "@/components/CourseGrid";
import { DemoSection } from "@/components/DemoSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { JourneySection } from "@/components/JourneySection";
import { Navbar } from "@/components/Navbar";
import { PracticeSection } from "@/components/PracticeSection";
import { Section } from "@/components/Section";
import { SkillBar } from "@/components/SkillBar";
import { SkillProgressCard } from "@/components/SkillProgressCard";
import { SkillShowcase } from "@/components/SkillShowcase";
import { TwoCol } from "@/components/TwoCol";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <DemoSection />
      <CourseGrid />

      <HowItWorks />
      <PracticeSection />

      <SkillShowcase />
      <ArticleGrid />

      <FinalCTA />
      <Footer />
    </div>
  );
}
