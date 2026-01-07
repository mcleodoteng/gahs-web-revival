import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Star, ArrowRight } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  image?: string;
}

interface TestimonialsContent {
  testimonials: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Kwame Asante",
    role: "Patient",
    location: "Kumasi",
    content: "The care I received at Asamang SDA Hospital was exceptional. The staff were compassionate, professional, and truly embodied the values of Christ-centered healthcare.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: "2",
    name: "Abena Mensah",
    role: "Nursing Graduate",
    location: "Accra",
    content: "Graduating from Valley View University's nursing program prepared me excellently for my career. The hands-on training at GAHS facilities gave me real-world experience.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    id: "3",
    name: "Dr. Emmanuel Osei",
    role: "Partner Physician",
    location: "Techiman",
    content: "Working alongside GAHS has been rewarding. Their commitment to quality healthcare while maintaining strong Christian values sets them apart.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150"
  },
];

export const TestimonialsPreview = () => {
  const { getSection } = usePageContent("home");

  const testimonialsContent = getSection<TestimonialsContent>("testimonials_preview", { testimonials: defaultTestimonials })!;
  const testimonials = (testimonialsContent.testimonials || defaultTestimonials).slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-muted/30 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What People <span className="text-gradient">Say About Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from patients, healthcare professionals, and community members about their experiences with GAHS.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/testimonials">
            <Button variant="outline" className="gap-2 group">
              View All Testimonials
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
