import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseLandingHero } from "@/components/courseLanding/CourseLandingHero";
import { CourseLandingPreview } from "@/components/courseLanding/CorseLandingPreview";
import { CourseLandingCarousel } from "@/components/courseLanding/CourseLandingCarousel";
import { CourseLandingMissions } from "@/components/courseLanding/CourseLandingMissions";
import { CourseLandingCharacters } from "@/components/courseLanding/CourseLandingCharacters";
import { CourseLandingJourney } from "@/components/courseLanding/CourseLandingJourney";
import { CourseLandingReviews } from "@/components/courseLanding/CourseLandingReviews";
import { CourseLandingFaq } from "@/components/courseLanding/CourseLandingFaq";
import { CourseLandingFinalCta } from "@/components/courseLanding/CourseLandingFinalCTA";
import { CourseLandingStickyCta } from "@/components/courseLanding/CourseLandingStickyCta";
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

        <CourseLandingPreview
          videoUrl={data.preview.videoUrl}
          posterUrl={data.preview.posterUrl}
        />

        <CourseLandingCarousel
          subjectName={data.subjectName}
          courses={data.courses}
        />

        <CourseLandingMissions
          courseSlug={data.slug}
          missions={data.missions}
        />

        <CourseLandingCharacters characters={data.characters} />

        <CourseLandingJourney journey={data.journey} />

        <CourseLandingReviews reviews={data.reviews} />

        <CourseLandingFaq faqs={data.faqs} />

        <CourseLandingFinalCta
          courseSlug={data.slug}
          finalCta={data.finalCta}
        />
      </main>

      <Footer />

      {/* Solo mobile: CTA fissa in basso */}
      <CourseLandingStickyCta courseSlug={data.slug} />
    </div>
  );
}
