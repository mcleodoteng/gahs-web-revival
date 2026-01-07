import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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
    content: "The care I received at Asamang SDA Hospital was exceptional. The staff were compassionate, professional, and truly embodied the values of Christ-centered healthcare. I am grateful for their dedication to my recovery.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: "2",
    name: "Abena Mensah",
    role: "Nursing Graduate",
    location: "Accra",
    content: "Graduating from Valley View University's nursing program, affiliated with GAHS, prepared me excellently for my career. The hands-on training at GAHS facilities gave me real-world experience that has made me a confident healthcare professional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    id: "3",
    name: "Dr. Emmanuel Osei",
    role: "Partner Physician",
    location: "Techiman",
    content: "Working alongside GAHS has been a rewarding experience. Their commitment to quality healthcare while maintaining strong Christian values sets them apart. The leadership truly cares about both patients and staff.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150"
  },
  {
    id: "4",
    name: "Grace Boateng",
    role: "Community Health Worker",
    location: "Konongo",
    content: "The community outreach programs by GAHS have transformed our village. From health screenings to education sessions, they bring healthcare to those who need it most. They truly live their mission of serving with compassion.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150"
  },
  {
    id: "5",
    name: "Samuel Adjei",
    role: "Patient's Family Member",
    location: "Sunyani",
    content: "When my mother needed surgery, we chose Kwadaso SDA Hospital based on recommendations. The entire experience exceeded our expectations. The doctors kept us informed, and the care was both professional and personal.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  },
  {
    id: "6",
    name: "Mary Appiah",
    role: "Regular Patient",
    location: "Ejisu",
    content: "I've been receiving care at GAHS clinics for over 10 years. The consistency in quality and the genuine concern for patients' wellbeing keeps me coming back. They treat every patient with dignity and respect.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
  },
  {
    id: "7",
    name: "Rev. Daniel Owusu",
    role: "Church Leader",
    location: "Kumasi",
    content: "GAHS exemplifies what it means to combine faith with service. Their hospitals and clinics are not just places of healing but also places where God's love is demonstrated through excellent healthcare.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
  },
  {
    id: "8",
    name: "Esther Danso",
    role: "Midwifery Student",
    location: "Koforidua",
    content: "The training I received through GAHS institutions has been invaluable. The instructors are experienced, patient, and committed to producing competent healthcare workers who understand both the technical and compassionate aspects of care.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
  },
];

const TestimonialsPage = () => {
  const { isLoading, getSection } = usePageContent("testimonials");

  const testimonialsContent = getSection<TestimonialsContent>("testimonials_list", { testimonials: defaultTestimonials })!;
  const testimonials = testimonialsContent.testimonials || defaultTestimonials;

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container">
            <Skeleton className="h-48 w-full mb-8" />
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-48" />)}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        title="Testimonials"
        subtitle="Hear from patients, healthcare professionals, students, and community members about their experiences with GAHS."
        badge="What People Say"
      />

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <p className="text-muted-foreground leading-relaxed mb-6">
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
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Share Your Experience
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Have you experienced care at one of our facilities? We'd love to hear from you. 
            Your feedback helps us improve and inspires our team to continue delivering excellent care.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Share Your Story
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default TestimonialsPage;
