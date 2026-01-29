import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/useCMS";
import directorImage from "@/assets/team/dr-james-antwi.jpg";
import { useRef, useEffect } from "react";

interface DirectorMessageFull {
  id?: string;
  name: string;
  title: string;
  image?: string;
  message: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
}

interface DirectorMessagesContent {
  messages?: DirectorMessageFull[];
}

interface DirectorContent {
  name: string;
  title: string;
  shortMessage: string;
  tagline: string;
}

// Extract first N lines from a message (approximately 6 lines / ~500 chars)
const extractShortMessage = (fullMessage: string, maxLines: number = 6): string => {
  if (!fullMessage) return "";
  
  // Split by paragraphs first
  const paragraphs = fullMessage.split('\n\n').filter(p => p.trim());
  
  // Take first paragraph(s) up to approximately maxLines worth of content
  let result = "";
  let lineCount = 0;
  
  for (const paragraph of paragraphs) {
    // Estimate lines: roughly 80 chars per line
    const paragraphLines = Math.ceil(paragraph.length / 80);
    
    if (lineCount + paragraphLines <= maxLines || result === "") {
      result += (result ? "\n\n" : "") + paragraph;
      lineCount += paragraphLines;
    } else {
      break;
    }
  }
  
  // If still too long, truncate to ~500 chars with ellipsis
  if (result.length > 550) {
    result = result.substring(0, 500).trim();
    // Find last sentence end
    const lastSentence = Math.max(
      result.lastIndexOf('. '),
      result.lastIndexOf('! '),
      result.lastIndexOf('? ')
    );
    if (lastSentence > 300) {
      result = result.substring(0, lastSentence + 1);
    } else {
      result = result + "...";
    }
  }
  
  return result;
};

export const DirectorMessage = () => {
  // Fetch from leadership page to sync with the full director message
  const { getSection } = usePageContent("leadership");
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations for the background movement
  const springConfig = { stiffness: 100, damping: 30 };
  const backgroundX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig);
  const backgroundY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);
  
  // Get director messages from leadership page
  const directorMessagesContent = getSection<DirectorMessagesContent>("director_messages", { messages: [] });
  const messages = directorMessagesContent?.messages || [];
  const activeMessage = messages.find(m => m.isActive) || messages[0];
  
  // Build content from leadership page data
  const directorContent: DirectorContent = {
    name: activeMessage?.name || "Dr. James Antwi",
    title: activeMessage?.title || "Director, GAHS",
    shortMessage: extractShortMessage(activeMessage?.message || "We are excited to share our 2024 Annual Report: Are we on the cusp of something big? Our performance last year showed gains in all major quality indicators. We believe strongly that lessons in 2024 and activities earmarked for 2025 will transform GAHS into something truly remarkable."),
    tagline: "The Ghana Adventist Health Services is privileged to serve the Ghanaian people — a blessing from above."
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-primary-light/40 via-background to-secondary-light/30 overflow-hidden relative"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Moving Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </motion.div>
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ rotateX, rotateY }}
      >
        <motion.div 
          className="absolute top-20 left-20 w-4 h-4 bg-primary/20 rotate-45"
          style={{ x: useTransform(backgroundX, v => v * 0.5), y: useTransform(backgroundY, v => v * 0.5) }}
        />
        <motion.div 
          className="absolute top-40 right-40 w-6 h-6 border-2 border-secondary/30 rounded-full"
          style={{ x: useTransform(backgroundX, v => v * 0.8), y: useTransform(backgroundY, v => v * 0.8) }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-accent/30 rounded-full"
          style={{ x: useTransform(backgroundX, v => v * 0.3), y: useTransform(backgroundY, v => v * 0.3) }}
        />
        <motion.div 
          className="absolute bottom-40 right-1/4 w-5 h-5 border-2 border-primary/20 rotate-45"
          style={{ x: useTransform(backgroundX, v => v * 0.6), y: useTransform(backgroundY, v => v * 0.6) }}
        />
      </motion.div>
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