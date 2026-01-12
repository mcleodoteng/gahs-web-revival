import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const affiliations = [
  {
    name: "Christian Health Association of Ghana (CHAG)",
    shortName: "CHAG",
    description: "GAHS is a proud member of CHAG, coordinating with the Ghana Ministry of Health.",
    url: "https://www.chag.org.gh",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    logo: "https://www.chag.org.gh/wp-content/uploads/2020/04/CHAG-Logo.png",
  },
  {
    name: "Seventh-day Adventist Church",
    shortName: "SDA",
    description: "Our health ministry is an integral part of the SDA Church's global mission.",
    url: "https://www.adventist.org",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    logo: "https://www.adventist.org/wp-content/uploads/2019/06/logomark-tm.svg",
  },
  {
    name: "Ghana Ministry of Health",
    shortName: "MOH",
    description: "We operate within national health policies and strategies.",
    url: "https://www.moh.gov.gh",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Coat_of_arms_of_Ghana.svg/200px-Coat_of_arms_of_Ghana.svg.png",
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

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-wrap justify-center items-start gap-12 lg:gap-16">
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
              <div className="relative w-72 flex justify-center">
                {/* Circular Logo - Hidden on hover */}
                <motion.div
                  className={`w-28 h-28 rounded-full ${affiliation.bgColor} border-2 border-border shadow-lg flex items-center justify-center overflow-hidden cursor-pointer`}
                  animate={{
                    opacity: hoveredIndex === index ? 0 : 1,
                    scale: hoveredIndex === index ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <img
                    src={affiliation.logo}
                    alt={affiliation.name}
                    className="w-20 h-20 object-contain"
                    onError={(e) => {
                      // Fallback to initials if image fails
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-bold bg-gradient-to-br ${affiliation.color} bg-clip-text text-transparent">${affiliation.shortName}</span>`;
                    }}
                  />
                </motion.div>

                {/* Expanded Card - Shown on hover */}
                <motion.a
                  href={affiliation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 left-0 right-0 bg-card rounded-xl p-5 border border-border shadow-xl"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.9,
                    y: hoveredIndex === index ? 0 : 20,
                    pointerEvents: hoveredIndex === index ? "auto" : "none",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-full ${affiliation.bgColor} flex items-center justify-center overflow-hidden`}>
                      <img
                        src={affiliation.logo}
                        alt={affiliation.name}
                        className="w-9 h-9 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<span class="text-xs font-bold bg-gradient-to-br ${affiliation.color} bg-clip-text text-transparent">${affiliation.shortName}</span>`;
                        }}
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
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-sm font-bold bg-gradient-to-br ${affiliation.color} bg-clip-text text-transparent">${affiliation.shortName}</span>`;
                  }}
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
