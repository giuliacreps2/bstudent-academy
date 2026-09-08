import { ArticleGrid } from "@/components/ArticleGrid";
import { CourseGrid } from "@/components/CourseGrid";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Section />
      <CourseGrid />
      <ArticleGrid />
    </div>
  );
}
