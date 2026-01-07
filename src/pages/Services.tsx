import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Target, Network, FileText, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Organizational Leadership",
    description: "We provide visionary leadership and clear guidance to all our health and training institutions. We set priorities, establish policies, and chart the course for sustainable growth and impact. We ensure that every institution aligns with our shared mission, operates efficiently, and responds effectively to changing healthcare needs. Through this leadership, we create a unified system that combines faith-based principles with modern healthcare standards — delivering consistent quality and strengthening our presence across Ghana.",
  },
  {
    icon: Network,
    title: "Network Integration",
    description: "We serve as the umbrella organization that brings together all Seventh-day Adventist hospitals, clinics and health training institutions in Ghana under a shared mission and vision. We unite all our health and training institutions under a cohesive and coordinated system that fosters unity, efficiency and shared resources.",
  },
  {
    icon: FileText,
    title: "Policy Engagement",
    description: "GAHS as a member of the Christian Health Association of Ghana (CHAG), we act as the official link between our health institutions and the Government of Ghana through our mother body CHAG, ensuring compliance with national health policies and advocating for the needs of our facilities. We also represent our institutions in engagement with other stakeholders, fostering collaboration and advocating for shared interest in the health sector. Through this we build strong partnerships with national health authorities and stakeholders.",
  },
  {
    icon: BarChart3,
    title: "Monitoring and Evaluation",
    description: "GAHS safeguards consistent, safe, and high-quality care across all hospitals, clinics and training institutions through a structured monitoring & evaluation framework.",
  },
];

const ServicesPage = () => {
  return (
    <Layout>
      <PageHero
        title="What We Do"
        subtitle="Coordinating and supporting Adventist health institutions across Ghana through strategic leadership and policy advocacy."
        badge="Our Services"
      />

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="service-card group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-primary-light flex items-center justify-center group-hover:bg-primary transition-colors">
                      <service.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Partner With Us
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join us in our mission to provide compassionate, quality healthcare across Ghana. Whether you're a healthcare professional, partner organization, or supporter, we welcome your collaboration.
            </p>
            <a
              href="/contact"
              className="btn-hero inline-flex"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
