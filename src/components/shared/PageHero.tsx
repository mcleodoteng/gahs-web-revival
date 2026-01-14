import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  backgroundImage?: string;
}

const defaultHeroImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&auto=format&q=80";

export const PageHero = ({ 
  title, 
  subtitle, 
  badge, 
  children,
  backgroundImage = defaultHeroImage 
}: PageHeroProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-section" />
      <div className="hero-overlay absolute inset-0" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4">
              {badge}
            </span>
          )}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-white/80 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};