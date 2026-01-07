import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Target, Eye, Quote, History } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroContent {
  title: string;
  subtitle: string;
  badge: string;
}

interface HistoryContent {
  title: string;
  paragraphs: string[];
}

interface MissionVisionContent {
  title: string;
  description: string;
}

interface QuoteContent {
  text: string;
  author: string;
}

interface WhyChooseItem {
  title: string;
  description: string;
}

interface WhyChooseContent {
  title: string;
  items: WhyChooseItem[];
}

const AboutPage = () => {
  const { isLoading, getSection } = usePageContent("about");

  const heroContent = getSection<HeroContent>("hero", {
    title: "About GAHS",
    subtitle: "Learn about our history, mission, and commitment to faith-based healthcare in Ghana.",
    badge: "Our Story"
  })!;

  const historyContent = getSection<HistoryContent>("history", {
    title: "Our History",
    paragraphs: []
  })!;

  const missionContent = getSection<MissionVisionContent>("mission", {
    title: "Our Mission",
    description: ""
  })!;

  const visionContent = getSection<MissionVisionContent>("vision", {
    title: "Our Vision",
    description: ""
  })!;

  const quoteContent = getSection<QuoteContent>("quote", {
    text: "",
    author: ""
  })!;

  const whyChooseContent = getSection<WhyChooseContent>("why_choose", {
    title: "Excellence in Faith-Based Healthcare",
    items: []
  })!;

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container">
            <Skeleton className="h-48 w-full mb-8" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        badge={heroContent.badge}
      />

      {/* History Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                <History className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">{historyContent.title}</h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              {historyContent.paragraphs?.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 section-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{missionContent.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {missionContent.description}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{visionContent.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {visionContent.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ellen G. White Quote */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gold-light rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <Quote className="absolute top-6 left-6 h-20 w-20 text-gold/20" />
            <div className="relative z-10 text-center">
              <blockquote className="text-xl lg:text-2xl text-foreground/80 leading-relaxed italic mb-8">
                "{quoteContent.text}"
              </blockquote>
              <cite className="text-muted-foreground">
                — {quoteContent.author}
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose GAHS */}
      <section className="py-20 section-light">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
              Why Choose GAHS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {whyChooseContent.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseContent.items?.map((item, index) => (
              <div key={index} className={`why-card ${index === whyChooseContent.items.length - 1 && whyChooseContent.items.length % 2 !== 0 ? "md:col-span-2" : ""}`}>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
