import { Building2, Stethoscope, GraduationCap, Pill, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const institutionTypes = [
  {
    icon: Building2,
    title: "Hospitals",
    count: 20,
    description: "Full-service hospitals providing comprehensive medical care across Ghana.",
    color: "bg-primary",
  },
  {
    icon: Stethoscope,
    title: "Clinics",
    count: 14,
    description: "Community-based clinics delivering primary healthcare services.",
    color: "bg-secondary",
  },
  {
    icon: GraduationCap,
    title: "Training Institutions",
    count: 7,
    description: "Colleges training the next generation of healthcare professionals.",
    color: "bg-accent",
  },
  {
    icon: Pill,
    title: "Specialized Facilities",
    count: 2,
    description: "Including Central Medical Stores and specialized dental care.",
    color: "bg-gold",
  },
];

export const InstitutionsPreview = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
            Our Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            43+ Health Institutions Across Ghana
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            From hospitals and clinics to training colleges, our network spans the entire country to serve communities wherever they are.
          </p>
        </div>

        {/* Institution types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {institutionTypes.map((type) => (
            <div
              key={type.title}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mb-4`}>
                <type.icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">{type.count}</p>
              <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
              <p className="text-white/70 text-sm">{type.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/institutions">
            <Button size="lg" className="bg-gold text-foreground hover:bg-gold/90 gap-2">
              View All Institutions
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
