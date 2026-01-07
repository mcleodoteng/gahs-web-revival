import { motion } from "framer-motion";
import { Target, Network, FileText, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Target,
    title: "Organizational Leadership",
    description: "Visionary leadership and clear guidance to all our health and training institutions.",
    color: "bg-primary",
  },
  {
    icon: Network,
    title: "Network Integration",
    description: "Uniting all SDA hospitals, clinics and training institutions under a shared mission.",
    color: "bg-secondary",
  },
  {
    icon: FileText,
    title: "Policy Engagement",
    description: "Official link between health institutions and the Government through CHAG.",
    color: "bg-accent",
  },
  {
    icon: BarChart3,
    title: "Monitoring & Evaluation",
    description: "Structured framework for consistent, safe, and high-quality care across all facilities.",
    color: "bg-gold",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="py-16 md:py-20 bg-background overflow-hidden">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-light text-secondary text-sm font-medium mb-4">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Core <span className="text-gradient">Services</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Strategic leadership, policy advocacy, and quality assurance for Adventist health institutions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/services">
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground group">
                View All Services
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="service-card group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
