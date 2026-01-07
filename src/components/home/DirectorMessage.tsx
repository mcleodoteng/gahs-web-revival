import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/useCMS";
import directorImage from "@/assets/team/dr-james-antwi.jpg";

interface DirectorContentRaw {
  director_name?: string;
  name?: string;
  director_title?: string;
  title?: string;
  short_message?: string;
  shortMessage?: string;
  tagline?: string;
}

interface DirectorContent {
  name: string;
  title: string;
  shortMessage: string;
  tagline: string;
}

export const DirectorMessage = () => {
  const { getSection } = usePageContent("home");
  
  const rawContent = getSection<DirectorContentRaw>("director_message", {});
  
  // Normalize field names (CMS uses snake_case, component uses camelCase)
  const directorContent: DirectorContent = {
    name: rawContent?.director_name || rawContent?.name || "Dr. James Antwi",
    title: rawContent?.director_title || rawContent?.title || "Director, GAHS",
    shortMessage: rawContent?.short_message || rawContent?.shortMessage || "We are excited to share our 2024 Annual Report: Are we on the cusp of something big? Our performance last year showed gains in all major quality indicators. We believe strongly that lessons in 2024 and activities earmarked for 2025 will transform GAHS into something truly remarkable.",
    tagline: rawContent?.tagline || "The Ghana Adventist Health Services is privileged to serve the Ghanaian people — a blessing from above."
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-light/40 via-background to-secondary-light/30 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            Message from the Director
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            A Word from Our <span className="text-gradient">Leader</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Director Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
              
              <Card className="overflow-hidden border-0 shadow-elegant relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <motion.img
                    src={directorImage}
                    alt={`${directorContent.name} - ${directorContent.title}`}
                    className="w-full h-full object-cover object-top"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <CardContent className="p-5 text-center bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
                  <h3 className="text-xl font-bold">{directorContent.name}</h3>
                  <p className="text-primary-foreground/80 text-sm">{directorContent.title}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Message Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-8 md:p-10">
                <Quote className="h-10 w-10 text-primary/30 mb-4" />
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {directorContent.shortMessage}
                </p>
                <p className="text-foreground font-medium mb-6">
                  {directorContent.tagline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-semibold text-foreground">{directorContent.name}</p>
                    <p className="text-sm text-muted-foreground">{directorContent.title}</p>
                  </div>
                  <Link to="/leadership">
                    <Button className="gap-2 group bg-primary hover:bg-primary-dark">
                      Read Full Message
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};