import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { InstitutionsPreview } from "@/components/home/InstitutionsPreview";
import { MissionVision } from "@/components/home/MissionVision";
import { Affiliations } from "@/components/home/Affiliations";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhyChooseUs />
      <ServicesPreview />
      <InstitutionsPreview />
      <MissionVision />
      <Affiliations />
    </Layout>
  );
};

export default Index;
