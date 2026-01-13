import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

// Import local logos
import chagLogo from "@/assets/affiliations/chag-logo.png";
import sdaLogo from "@/assets/affiliations/sda-logo.png";
import mohLogo from "@/assets/affiliations/moh-logo.png";

const affiliations = [
  {
    name: "Christian Health Association of Ghana (CHAG)",
    shortName: "CHAG",
    description: "GAHS is a proud member of CHAG, coordinating with the Ghana Ministry of Health.",
    url: "https://www.chag.org.gh",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    logo: chagLogo,
  },
  {
    name: "Seventh-day Adventist Church",
    shortName: "SDA",
    description: "Our health ministry is an integral part of the SDA Church's global mission.",
    url: "https://www.adventist.org",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    logo: sdaLogo,
  },
  {
    name: "Ghana Ministry of Health",
    shortName: "MOH",
    description: "We operate within national health policies and strategies.",
    url: "https://www.moh.gov.gh",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    logo: mohLogo,
  },
];

export const Affiliations = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 bg-muted/50 overflow-visible relative z-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            Our Partners
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Affiliations & Partners
          </h2>
          <p className="text-muted-foreground">
            Working together to improve healthcare in Ghana
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-wrap justify-center items-start gap-12 lg:gap-16 pb-8">
          {affiliations.map((affiliation, index) => (
            <motion.div
              key={affiliation.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Container for smooth transition */}
              <div className="relative w-72 h-40 flex justify-center">
                {/* Circular Logo - Visible when not hovered */}
                <AnimatePresence>
                  {hoveredIndex !== index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`absolute top-0 w-28 h-28 rounded-full ${affiliation.bgColor} border-2 border-border shadow-lg flex items-center justify-center overflow-hidden cursor-pointer`}
                    >
                      <img
                        src={affiliation.logo}
                        alt={affiliation.name}
                        className="w-20 h-20 object-contain"
                        loading="lazy"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded Card - Shown on hover */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.a
                      href={affiliation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-0 left-0 right-0 bg-card rounded-xl p-5 border border-border shadow-xl z-50"
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-full ${affiliation.bgColor} flex items-center justify-center overflow-hidden`}>
                          <img
                            src={affiliation.logo}
                            alt={affiliation.name}
                            className="w-9 h-9 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-2">
                        {affiliation.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {affiliation.description}
                      </p>
                    </motion.a>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Show all cards */}
        <div className="md:hidden space-y-4">
          {affiliations.map((affiliation, index) => (
            <motion.a
              key={`mobile-${affiliation.name}`}
              href={affiliation.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border shadow-sm"
            >
              <div className={`w-14 h-14 rounded-full ${affiliation.bgColor} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                <img
                  src={affiliation.logo}
                  alt={affiliation.name}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {affiliation.name}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-2">
                  {affiliation.description}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
