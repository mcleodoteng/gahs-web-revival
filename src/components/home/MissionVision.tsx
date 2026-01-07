import { motion } from "framer-motion";
import { Target, Eye, Quote } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";

interface MissionVisionContent {
  title: string;
  description: string;
}

interface QuoteContent {
  text: string;
  author: string;
}

export const MissionVision = () => {
  const { getSection } = usePageContent("home");

  const missionContent = getSection<MissionVisionContent>("mission", {
    title: "Our Mission",
    description: "GAHS seeks to win souls for Christ through a wholistic approach to quality healthcare in families, households and communities — treating all with human dignity, respect and tolerance."
  })!;

  const visionContent = getSection<MissionVisionContent>("vision", {
    title: "Our Vision",
    description: "To be the leading faith-based healthcare network in Ghana — delivering compassionate care, producing quality health professionals, and transforming communities for a healthier future."
  })!;

  const quoteContent = getSection<QuoteContent>("quote", {
    text: "The medical missionary work is to act as the right hand — used to open doors through which the body may find entrance.",
    author: "Ellen G. White, Ministry of Healing"
  })!;

  return (
    <section className="py-16 md:py-20 bg-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light text-gold-foreground text-sm font-medium mb-4">
            Our Purpose
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Mission & <span className="text-gradient">Vision</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-primary-light to-primary-light/50 rounded-2xl p-8 lg:p-10 relative overflow-hidden group"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{missionContent.title}</h3>
              <p className="text-foreground/80 leading-relaxed">
                {missionContent.description}
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="bg-gradient-to-br from-secondary-light to-secondary-light/50 rounded-2xl p-8 lg:p-10 relative overflow-hidden group"
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Eye className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{visionContent.title}</h3>
              <p className="text-foreground/80 leading-relaxed">
                {visionContent.description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-gold-light via-gold-light/70 to-gold-light rounded-2xl p-8 lg:p-10 relative overflow-hidden"
        >
          <Quote className="absolute top-4 left-4 h-12 w-12 text-gold/20" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <blockquote className="text-lg text-foreground/80 leading-relaxed italic mb-4">
              "{quoteContent.text}"
            </blockquote>
            <cite className="text-muted-foreground text-sm">
              — {quoteContent.author}
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
