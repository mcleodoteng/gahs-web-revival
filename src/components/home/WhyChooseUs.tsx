import { Network, Heart, GraduationCap, Users, Shield } from "lucide-react";

const reasons = [
  {
    icon: Network,
    title: "Comprehensive Healthcare Network",
    description: "We operate an extensive network of hospitals, clinics, a medical store, and training institutions strategically located across the country. This integrated system ensures that individuals and communities, whether in urban centers or rural areas, have access to quality healthcare and essential medical supplies.",
  },
  {
    icon: Heart,
    title: "Care Rooted in Christian Values",
    description: "At GAHS, we believe every human being deserves to be treated with compassion, dignity and respect. Our Christian principles inspire us to serve selflessly, act with integrity, and offer hope alongside healing. We strive to meet physical needs while nurturing emotional and spiritual well-being.",
  },
  {
    icon: GraduationCap,
    title: "Excellence in Care and Training",
    description: "We are committed to delivering the highest standards of healthcare while shaping the future of medical services in Ghana. Our training institutions equip healthcare professionals with the skills, ethics, and compassion needed to serve effectively.",
  },
  {
    icon: Users,
    title: "Top Professionals",
    description: "We are proud to be home to a dedicated team of highly qualified doctors, nurses, pharmacists, technicians, and healthcare educators. Our professionals are not only well trained but are also committed to ongoing learning and development.",
  },
  {
    icon: Shield,
    title: "Trusted Legacy",
    description: "For decades, we have stood as a pillar of dependable, compassionate healthcare in Ghana. Our history is built on a consistent commitment to quality service, ethical practice, and respect for every individual we serve. This enduring trust inspires us to uphold our reputation.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 section-light">
      <div className="container">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            Why Choose GAHS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Delivering Exceptional Healthcare{" "}
            <span className="text-gradient">with Compassion</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our commitment to quality healthcare is guided by Christian values, professional excellence, and a genuine calling to serve.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`why-card ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-5">
                <reason.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
