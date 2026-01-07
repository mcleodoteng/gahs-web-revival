import { motion } from "framer-motion";
import { Network, Heart, GraduationCap, Users, Shield } from "lucide-react";

const reasons = [
  {
    icon: Network,
    title: "Comprehensive Healthcare Network",
    description: "Extensive network of hospitals, clinics, and training institutions strategically located across Ghana for accessible quality healthcare.",
  },
  {
    icon: Heart,
    title: "Care Rooted in Christian Values",
    description: "Every person deserves compassion, dignity and respect. Our Christian principles inspire us to serve selflessly and offer hope alongside healing.",
  },
  {
    icon: GraduationCap,
    title: "Excellence in Care and Training",
    description: "Highest standards of healthcare while shaping the future of medical services through our training institutions.",
  },
  {
    icon: Users,
    title: "Top Professionals",
    description: "Dedicated team of highly qualified doctors, nurses, pharmacists, and healthcare educators committed to ongoing excellence.",
  },
  {
    icon: Shield,
    title: "Trusted Legacy",
    description: "Decades of dependable, compassionate healthcare built on quality service, ethical practice, and respect for all.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-20 section-light overflow-hidden">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            Why Choose GAHS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Exceptional Healthcare{" "}
            <span className="text-gradient">with Compassion</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Quality healthcare guided by Christian values and professional excellence.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`why-card group ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <reason.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
