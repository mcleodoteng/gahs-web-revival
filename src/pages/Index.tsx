import { Layout } from "@/components/layout/Layout";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { DirectorMessage } from "@/components/home/DirectorMessage";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { InstitutionsPreview } from "@/components/home/InstitutionsPreview";
import { MissionVision } from "@/components/home/MissionVision";
import { Affiliations } from "@/components/home/Affiliations";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { EventsPreview } from "@/components/home/EventsPreview";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <DirectorMessage />
      <ServicesPreview />
      <InstitutionsPreview />
      <WhyChooseUs />
      <EventsPreview />
      <BlogPreview />
      <GalleryPreview />
      <TestimonialsPreview />
      <MissionVision />
      <Affiliations />
    </Layout>
  );
};

export default Index;
