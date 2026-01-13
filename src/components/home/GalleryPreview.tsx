import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

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
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&q=75",
    title: "Asamang SDA Hospital",
    category: "Hospitals"
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&auto=format&q=75",
    title: "Medical Team Meeting",
    category: "Events"
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&q=75",
    title: "Nursing Students",
    category: "Training"
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&q=75",
    title: "Hospital Ward",
    category: "Facilities"
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&q=75",
    title: "Laboratory Services",
    category: "Facilities"
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&q=75",
    title: "Community Outreach",
    category: "Events"
  }
];

export const GalleryPreview = () => {
  const { getSection } = usePageContent("home");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const galleryContent = getSection<GalleryContent>("gallery_preview", {
    images: defaultGalleryImages
  })!;
  
  const images = (galleryContent.images || defaultGalleryImages).slice(0, 6);
  
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex(prev => prev !== null ? (prev + 1) % images.length : null);
  const prevImage = () => setLightboxIndex(prev => prev !== null ? (prev - 1 + images.length) % images.length : null);

  return (
    <>
      <section className="py-16 md:py-20 bg-background overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-secondary-foreground text-sm font-medium mb-4 bg-secondary">
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
                <Card 
                  className="overflow-hidden h-full group cursor-pointer" 
                  onClick={() => openLightbox(index)}
                >
                  <CardContent className="p-0 relative h-full">
                    <div className="overflow-hidden aspect-square">
                      <OptimizedImage
                        src={image.src}
                        alt={image.title}
                        width={index === 0 ? 800 : 400}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <p className="text-white font-semibold">{image.title}</p>
                      <p className="text-white/80 text-sm">{image.category}</p>
                    </div>
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="h-5 w-5 text-primary" />
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="h-12 w-12" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="h-12 w-12" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl max-h-[80vh] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
                loading="eager"
              />
              <div className="text-center mt-4">
                <p className="text-white text-xl font-semibold">{images[lightboxIndex].title}</p>
                <p className="text-white/70">{images[lightboxIndex].category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
