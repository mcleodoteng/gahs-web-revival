import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";
import { Skeleton } from "@/components/ui/skeleton";
import { OptimizedImage } from "@/components/shared/OptimizedImage";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  description?: string;
  createdAt?: string;
}

interface GalleryContent {
  images: GalleryImage[];
}

const defaultGalleryImages: GalleryImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&q=75", title: "Asamang SDA Hospital", category: "Hospitals", description: "Main entrance of Asamang SDA Hospital" },
  { id: "2", src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&auto=format&q=75", title: "Medical Team Meeting", category: "Events", description: "Annual strategic planning session" },
  { id: "3", src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&q=75", title: "Nursing Students", category: "Training", description: "Practical training session" },
  { id: "4", src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&q=75", title: "Hospital Ward", category: "Facilities", description: "Modern patient care facilities" },
  { id: "5", src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&q=75", title: "Laboratory Services", category: "Facilities", description: "State-of-the-art diagnostic lab" },
  { id: "6", src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&q=75", title: "Community Outreach", category: "Events", description: "Health screening program" },
  { id: "7", src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&q=75", title: "Medical Consultation", category: "Services", description: "Patient consultation services" },
  { id: "8", src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&auto=format&q=75", title: "Pharmacy Services", category: "Services", description: "GAHS Medical Store" },
  { id: "9", src: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=800&auto=format&q=75", title: "Graduation Ceremony", category: "Training", description: "Nursing college graduation" },
  { id: "10", src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&auto=format&q=75", title: "Surgery Department", category: "Facilities", description: "Modern surgical theater" },
  { id: "11", src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&q=75", title: "Maternity Ward", category: "Facilities", description: "Mother and child care" },
  { id: "12", src: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&auto=format&q=75", title: "Staff Training", category: "Training", description: "Continuous professional development" },
];

const categories = ["All", "Hospitals", "Facilities", "Events", "Training", "Services", "Training Institutions", "Central Medical Stores"];

const ITEMS_PER_PAGE = 20;

const GalleryPage = () => {
  const { isLoading, getSection } = usePageContent("gallery");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const galleryContent = getSection<GalleryContent>("gallery_images", { images: defaultGalleryImages })!;
  const rawImages = galleryContent.images || defaultGalleryImages;

  // Sort images by createdAt date (newest first), images without dates go last
  const images = [...rawImages].sort((a, b) => {
    if (!a.createdAt && !b.createdAt) return 0;
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex(prev => prev !== null ? (prev + 1) % paginatedImages.length : null);
  const prevImage = () => setLightboxIndex(prev => prev !== null ? (prev - 1 + paginatedImages.length) % paginatedImages.length : null);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container">
            <Skeleton className="h-48 w-full mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <Skeleton key={i} className="aspect-square" />)}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        title="Photo Gallery"
        subtitle="Explore moments captured across our healthcare network, training institutions, and community outreach programs."
        badge="Our Gallery"
      />

      <section className="py-16 bg-background">
        <div className="container">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className="min-w-[100px]"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {paginatedImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <CardContent className="p-0 relative">
                      <div className="aspect-square overflow-hidden">
                        <OptimizedImage
                          src={image.src}
                          alt={image.title}
                          width={400}
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
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <>
            {/* Backdrop - prevents interaction with content behind */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95"
              onClick={closeLightbox}
              aria-hidden="true"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
              role="dialog"
              aria-modal="true"
              aria-label="Image lightbox"
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-primary transition-colors pointer-events-auto z-10"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X className="h-8 w-8" />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors pointer-events-auto z-10"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-12 w-12" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors pointer-events-auto z-10"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-12 w-12" />
              </button>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-5xl max-h-[80vh] px-4 pointer-events-auto"
              >
                <img
                  src={paginatedImages[lightboxIndex].src}
                  alt={paginatedImages[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                  loading="eager"
                />
                <div className="text-center mt-4">
                  <p className="text-white text-xl font-semibold">{paginatedImages[lightboxIndex].title}</p>
                  <p className="text-white/70">{paginatedImages[lightboxIndex].description}</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default GalleryPage;
