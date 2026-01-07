import { Target, Eye, Quote } from "lucide-react";

export const MissionVision = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-primary-light rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-foreground/80 leading-relaxed text-lg">
                GAHS seeks to win souls for Christ through the wholistic approach to quality healthcare in families, households and communities and with committed effort to treating all with human dignity, respect and tolerance.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-secondary-light rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-foreground/80 leading-relaxed text-lg">
                To be the leading faith-based healthcare network in Ghana, delivering compassionate care, producing quality health professionals, advancing medical excellence, and transforming communities for a healthier, hope-filled future.
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-12 bg-gold-light rounded-2xl p-8 lg:p-12 relative overflow-hidden">
          <Quote className="absolute top-6 left-6 h-16 w-16 text-gold/20" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <blockquote className="text-lg lg:text-xl text-foreground/80 leading-relaxed italic mb-6">
              "The right hand is used to open doors through which the body may find entrance. This is the part, the medical missionary work is to act. It is used to largely prepare the way for the reception of the truth for this time."
            </blockquote>
            <cite className="text-muted-foreground text-sm">
              — Ellen G. White, Ministry of Healing
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};
