import { Target, Network, FileText, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Target,
    title: "Organizational Leadership",
    description: "We provide visionary leadership and clear guidance to all our health and training institutions. We set priorities, establish policies, and chart the course for sustainable growth and impact.",
  },
  {
    icon: Network,
    title: "Network Integration",
    description: "We serve as the umbrella organization that brings together all Seventh-day Adventist hospitals, clinics and health training institutions in Ghana under a shared mission and vision.",
  },
  {
    icon: FileText,
    title: "Policy Engagement",
    description: "As a member of CHAG, we act as the official link between our health institutions and the Government of Ghana, ensuring compliance with national health policies.",
  },
  {
    icon: BarChart3,
    title: "Monitoring & Evaluation",
    description: "GAHS safeguards consistent, safe, and high-quality care across all hospitals, clinics and training institutions through a structured monitoring & evaluation framework.",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-light text-secondary text-sm font-medium mb-4">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Core <span className="text-gradient">Services</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We coordinate and support Adventist health institutions in Ghana through strategic leadership, policy advocacy, and quality assurance.
            </p>
          </div>
          <Link to="/services">
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.title} className="service-card group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
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
  );
};
