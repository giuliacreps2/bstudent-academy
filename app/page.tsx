import { CourseGrid } from "@/components/CourseGrid";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <CourseGrid />
    </div>
  );
}
