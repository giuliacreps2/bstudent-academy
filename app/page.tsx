import { ArticleGrid } from "@/components/ArticleGrid";

import { CourseGrid } from "@/components/CourseGrid";
import { DemoSection } from "@/components/DemoSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";

import { Navbar } from "@/components/Navbar";
import { PracticeSection } from "@/components/PracticeSection";

import { SkillShowcase } from "@/components/SkillShowcase";

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
