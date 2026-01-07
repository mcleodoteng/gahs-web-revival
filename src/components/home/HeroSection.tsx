import { ArrowRight, Heart, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-section overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl" />
      </div>
      
      <div className="hero-overlay absolute inset-0" />
      
      <div className="container relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-fade-up">
            <Heart className="h-4 w-4 text-accent" />
            <span>Faith-Based Healthcare Excellence</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up stagger-1">
            Compassionate Healthcare{" "}
            <span className="text-gold">Rooted in Faith</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-up stagger-2">
            Ghana Adventist Health Services delivers quality healthcare through a network of hospitals, clinics, and training institutions across Ghana.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up stagger-3">
            <Link to="/institutions" className="btn-hero">
              Find a Facility
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/about" className="btn-hero-outline">
              Learn About Us
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-up stagger-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Building2 className="h-8 w-8 text-gold mx-auto mb-3" />
              <p className="text-3xl font-bold text-white mb-1">43+</p>
              <p className="text-white/70 text-sm">Health Institutions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Users className="h-8 w-8 text-gold mx-auto mb-3" />
              <p className="text-3xl font-bold text-white mb-1">7</p>
              <p className="text-white/70 text-sm">Training Colleges</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Heart className="h-8 w-8 text-gold mx-auto mb-3" />
              <p className="text-3xl font-bold text-white mb-1">30+</p>
              <p className="text-white/70 text-sm">Years of Service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};
