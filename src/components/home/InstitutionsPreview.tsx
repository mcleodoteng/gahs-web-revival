import { motion } from "framer-motion";
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
    <section className="py-16 md:py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary blur-3xl" />
      </motion.div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
            Our Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            43+ Health Institutions Across Ghana
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            From hospitals and clinics to training colleges, our network spans the entire country.
          </p>
        </motion.div>

        {/* Institution types */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {institutionTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
            >
              <motion.div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${type.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform`}
              >
                <type.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </motion.div>
              <motion.p
                className="text-3xl md:text-4xl font-bold text-white mb-1"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                {type.count}
              </motion.p>
              <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{type.title}</h3>
              <p className="text-white/70 text-xs md:text-sm hidden md:block">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/institutions">
            <Button size="lg" className="bg-gold text-foreground hover:bg-gold/90 gap-2 group">
              View All Institutions
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
