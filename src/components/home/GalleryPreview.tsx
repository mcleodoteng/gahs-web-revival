import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
}

interface GalleryContent {
  images: GalleryImage[];
}

const defaultGalleryImages: GalleryImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600", title: "Asamang SDA Hospital", category: "Hospitals" },
  { id: "2", src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600", title: "Medical Team Meeting", category: "Events" },
  { id: "3", src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600", title: "Nursing Students", category: "Training" },
  { id: "4", src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600", title: "Hospital Ward", category: "Facilities" },
  { id: "5", src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600", title: "Laboratory Services", category: "Facilities" },
  { id: "6", src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600", title: "Community Outreach", category: "Events" },
];

export const GalleryPreview = () => {
  const { getSection } = usePageContent("home");

  const galleryContent = getSection<GalleryContent>("gallery_preview", { images: defaultGalleryImages })!;
  const images = (galleryContent.images || defaultGalleryImages).slice(0, 6);

  return (
    <section className="py-16 md:py-20 bg-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-light text-secondary-foreground text-sm font-medium mb-4">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Moments from <span className="text-gradient">Our Network</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore photos from our hospitals, training programs, and community outreach activities.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={index === 0 ? "col-span-2 row-span-2" : ""}
            >
              <Card className="overflow-hidden h-full group cursor-pointer">
                <CardContent className="p-0 relative h-full">
                  <div className={`overflow-hidden ${index === 0 ? "aspect-square" : "aspect-square"}`}>
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-semibold">{image.title}</p>
                    <p className="text-white/80 text-sm">{image.category}</p>
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
          <Link to="/gallery">
            <Button className="gap-2 group bg-primary hover:bg-primary-dark">
              <ImageIcon className="h-4 w-4" />
              View Full Gallery
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
