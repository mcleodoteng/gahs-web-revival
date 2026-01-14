import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Target, Network, FileText, BarChart3 } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";
import { Skeleton } from "@/components/ui/skeleton";

// Icon and color mapping to match homepage ServicesPreview
const serviceConfig: Record<string, { icon: React.ElementType; color: string; hoverColor: string }> = {
  "Organizational Leadership": { 
    icon: Target, 
    color: "bg-primary", 
    hoverColor: "bg-primary-dark" 
  },
  "Network Integration": { 
    icon: Network, 
    color: "bg-secondary", 
    hoverColor: "bg-secondary" 
  },
  "Policy Engagement": { 
    icon: FileText, 
    color: "bg-accent", 
    hoverColor: "bg-accent" 
  },
  "Monitoring & Evaluation": { 
    icon: BarChart3, 
    color: "bg-gold", 
    hoverColor: "bg-gold" 
  },
};

// Fallback icon map for CMS content
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

interface ServicesContentRaw {
  items?: ServiceItem[];
  services?: ServiceItem[];
}

interface ServicesContent {
  items: ServiceItem[];
}

interface CTAContentRaw {
  title?: string;
  description?: string;
  buttonText?: string;
  button_text?: string;
  buttonLink?: string;
  button_link?: string;
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

  const servicesRaw = getSection<ServicesContentRaw>("services_list", {
    items: []
  })!;
  
  // Normalize: CMS may store as 'services' array instead of 'items'
  const servicesContent: ServicesContent = {
    items: servicesRaw.items || servicesRaw.services || []
  };

  const ctaRaw = getSection<CTAContentRaw>("cta", {
    title: "Partner With Us",
    description: "Join us in our mission to provide compassionate, quality healthcare across Ghana.",
    buttonText: "Get in Touch",
    buttonLink: "/contact"
  })!;
  
  // Normalize field names
  const ctaContent: CTAContent = {
    title: ctaRaw.title || "Partner With Us",
    description: ctaRaw.description || "",
    buttonText: ctaRaw.buttonText || ctaRaw.button_text || "Get in Touch",
    buttonLink: ctaRaw.buttonLink || ctaRaw.button_link || "/contact"
  };

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
              // Get config from serviceConfig first, fallback to iconMap
              const config = serviceConfig[service.title];
              const IconComponent = config?.icon || iconMap[service.icon] || Target;
              const bgColor = config?.color || "bg-primary";
              
              return (
                <div
                  key={service.title}
                  className="service-card group"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-xl ${bgColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
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
