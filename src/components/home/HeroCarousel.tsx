import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, Users, Building2, ChevronLeft, ChevronRight, Star, Award, Target, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/useCMS";

interface Slide {
  id: string;
  image: string;
  title: string;
  highlight: string;
  description: string;
}

interface Stat {
  icon: string;
  value: string;
  label: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Users,
  Heart,
  Star,
  Award,
  Target,
  Shield,
  Globe,
};

// Use optimized, smaller images for faster loading
const defaultSlides: Slide[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=75&auto=format&fit=crop",
    title: "Compassionate Healthcare",
    highlight: "Rooted in Faith",
    description: "Ghana Adventist Health Services delivers quality healthcare through a network of hospitals, clinics, and training institutions across Ghana.",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=75&auto=format&fit=crop",
    title: "Excellence in",
    highlight: "Medical Training",
    description: "Producing quality health professionals through our network of 7 training institutions dedicated to shaping the future of healthcare in Ghana.",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=75&auto=format&fit=crop",
    title: "Healing Communities",
    highlight: "Transforming Lives",
    description: "Over 43 health institutions strategically located across Ghana, bringing accessible healthcare to urban centers and rural communities alike.",
  },
];

const defaultStats: Stat[] = [
  { icon: "Building2", value: "43+", label: "Health Institutions" },
  { icon: "Users", value: "7", label: "Training Colleges" },
  { icon: "Heart", value: "30+", label: "Years of Service" },
];

export const HeroCarousel = () => {
  const { sections, isLoading } = usePageContent("home");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // Get slides and stats from CMS or use defaults
  const heroContent = sections.find(s => s.section_key === "hero")?.content as { slides?: Slide[]; stats?: Stat[] } | undefined;
  const slides: Slide[] = heroContent?.slides?.length ? heroContent.slides : defaultSlides;
  const stats: Stat[] = heroContent?.stats?.length ? heroContent.stats : defaultStats;

  // Preload images for smooth transitions
  useEffect(() => {
    const loadedStates: boolean[] = new Array(slides.length).fill(false);
    
    slides.forEach((slide, index) => {
      const img = new Image();
      img.onload = () => {
        loadedStates[index] = true;
        setImagesLoaded([...loadedStates]);
      };
      img.src = slide.image;
    });
  }, [slides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      if (newDirection === 1) return (prev + 1) % slides.length;
      return prev === 0 ? slides.length - 1 : prev - 1;
    });
  }, [slides.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Carousel Background */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ 
              backgroundImage: `url(${slides[current].image})`,
              // Use CSS for better performance
              backfaceVisibility: 'hidden',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/85 to-primary-dark/90" />
        </motion.div>
      </AnimatePresence>

      {/* Preload next images in background */}
      <div className="hidden">
        {slides.map((slide, index) => (
          <link key={index} rel="preload" as="image" href={slide.image} />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 md:left-8 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 md:right-8 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8"
          >
            <Heart className="h-4 w-4 text-gold" />
            <span>Faith-Based Healthcare Excellence</span>
          </motion.div>

          {/* Main heading - animate on slide change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {slides[current].title}{" "}
                <span className="text-gold">{slides[current].highlight}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                {slides[current].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/institutions" className="btn-hero group">
              Our Facilities
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-hero-outline">
              Learn About Us
            </Link>
          </motion.div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mb-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Heart;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all group"
                >
                  <IconComponent className="h-7 w-7 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
                  <p className="text-white/70 text-xs">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};
