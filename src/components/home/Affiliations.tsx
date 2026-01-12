import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const affiliations = [
  {
    name: "Christian Health Association of Ghana (CHAG)",
    shortName: "CHAG",
    description: "GAHS is a proud member of CHAG, coordinating with the Ghana Ministry of Health.",
    url: "https://www.chag.org.gh",
    color: "from-blue-500 to-blue-600",
    initials: "CHAG",
  },
  {
    name: "Seventh-day Adventist Church",
    shortName: "SDA",
    description: "Our health ministry is an integral part of the SDA Church's global mission.",
    url: "https://www.adventist.org",
    color: "from-green-500 to-green-600",
    initials: "SDA",
  },
  {
    name: "Ghana Ministry of Health",
    shortName: "MOH",
    description: "We operate within national health policies and strategies.",
    url: "https://www.moh.gov.gh",
    color: "from-amber-500 to-amber-600",
    initials: "MOH",
  },
];

export const Affiliations = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-16 bg-muted/50 overflow-hidden">
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

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
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
              {/* Circular Logo */}
              <motion.a
                href={affiliation.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${affiliation.color} text-white font-bold text-lg md:text-xl shadow-lg cursor-pointer`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {affiliation.initials}
                
                {/* Pulse ring effect */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${affiliation.color} opacity-30`}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.a>

              {/* Expanded Card on Hover */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-4 w-72"
                  >
                    <a
                      href={affiliation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-card rounded-xl p-5 border border-border shadow-xl hover:shadow-2xl transition-shadow"
                    >
                      {/* Arrow pointer */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
                      
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${affiliation.color} flex items-center justify-center text-white text-xs font-bold`}>
                          {affiliation.initials}
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-2">
                        {affiliation.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {affiliation.description}
                      </p>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Show all cards */}
        <div className="md:hidden mt-8 space-y-4">
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
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${affiliation.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                {affiliation.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {affiliation.name}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-1">
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
