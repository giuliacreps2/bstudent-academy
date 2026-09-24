import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseLandingHero } from "@/components/courseLanding/CourseLandingHero";
import { getCourseLandingData, landingSlugs } from "@/lib/courseLanding";

type CourseLandingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return landingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CourseLandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCourseLandingData(slug);

  if (!data) return {};

  return {
    title: `Corso di ${data.subjectName} | BStudent`,
    description: data.hero.description,
  };
}

export default async function CourseLandingPage({
  params,
}: CourseLandingPageProps) {
  const { slug } = await params;
  const data = await getCourseLandingData(slug);

  if (!data) notFound();

  return (
    <div>
      <Navbar />

      <main>
        <CourseLandingHero courseSlug={data.slug} hero={data.hero} />

        {/* Prossimi step: video anteprima, carosello corsi, missioni,
            character, video, recensioni, FAQ, CTA finale */}
      </main>

      <Footer />
    </div>
  );
}
