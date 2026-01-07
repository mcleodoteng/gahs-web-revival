import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Target, Network, FileText, BarChart3 } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, React.ElementType> = {
  Target,
  Network,
  FileText,
  BarChart3,
};

interface HeroContent {
  title: string;
  subtitle: string;
  badge: string;
}

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface ServicesContent {
  items: ServiceItem[];
}

interface CTAContent {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const ServicesPage = () => {
  const { isLoading, getSection } = usePageContent("services");

  const heroContent = getSection<HeroContent>("hero", {
    title: "What We Do",
    subtitle: "Coordinating and supporting Adventist health institutions across Ghana through strategic leadership and policy advocacy.",
    badge: "Our Services"
  })!;

  const servicesContent = getSection<ServicesContent>("services_list", {
    items: []
  })!;

  const ctaContent = getSection<CTAContent>("cta", {
    title: "Partner With Us",
    description: "Join us in our mission to provide compassionate, quality healthcare across Ghana.",
    buttonText: "Get in Touch",
    buttonLink: "/contact"
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

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {servicesContent.items?.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Target;
              return (
                <div
                  key={service.title}
                  className="service-card group"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-primary-light flex items-center justify-center group-hover:bg-primary transition-colors">
                        <IconComponent className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground mb-2 block">
                        0{index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {ctaContent.title}
            </h2>
            <p className="text-white/80 text-lg mb-8">
              {ctaContent.description}
            </p>
            <a
              href={ctaContent.buttonLink}
              className="btn-hero inline-flex"
            >
              {ctaContent.buttonText}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
