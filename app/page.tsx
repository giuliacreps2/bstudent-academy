import { ProgressSection } from "@/components/animations/ProgressSection";
import { ArticleGrid } from "@/components/ArticleGrid";
import { CourseGrid } from "@/components/CourseGrid";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { TwoCol } from "@/components/TwoCol";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Section />
      <CourseGrid />
      <TwoCol />
      <ProgressSection />
      <ArticleGrid />
      <FinalCTA />
      <Footer />
    </div>
  );
}
