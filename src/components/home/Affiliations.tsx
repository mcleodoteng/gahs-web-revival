import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const affiliations = [
  {
    name: "Christian Health Association of Ghana (CHAG)",
    description: "GAHS is a proud member of CHAG, coordinating with the Ghana Ministry of Health.",
    url: "https://www.chag.org.gh",
  },
  {
    name: "Seventh-day Adventist Church",
    description: "Our health ministry is an integral part of the SDA Church's global mission.",
    url: "https://www.adventist.org",
  },
  {
    name: "Ghana Ministry of Health",
    description: "We operate within national health policies and strategies.",
    url: "https://www.moh.gov.gh",
  },
];

export const Affiliations = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/50 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Our Affiliations & Partners
          </h2>
          <p className="text-muted-foreground">
            Working together to improve healthcare in Ghana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {affiliations.map((affiliation, index) => (
            <motion.a
              key={affiliation.name}
              href={affiliation.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors pr-2">
                  {affiliation.name}
                </h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all flex-shrink-0" />
              </div>
              <p className="text-muted-foreground text-sm">
                {affiliation.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
