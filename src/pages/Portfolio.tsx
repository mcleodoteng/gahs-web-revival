import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample portfolio projects
const projects = [
  {
    title: "Healthcare Training Workshop 2024",
    description: "A comprehensive training program for healthcare professionals across all GAHS institutions, focusing on modern medical practices and patient care excellence.",
    date: "March 2024",
    venue: "GAHS Secretariat, Kumasi",
    category: "Training",
  },
  {
    title: "Community Health Outreach Program",
    description: "Free health screenings and medical consultations provided to underserved communities in the Ashanti Region, serving over 2,000 individuals.",
    date: "January 2024",
    venue: "Multiple Communities, Ashanti Region",
    category: "Outreach",
  },
  {
    title: "New Hospital Wing Inauguration",
    description: "Opening of the new maternal and child health wing at S.D.A. Hospital Kwadaso, expanding capacity to serve more mothers and children.",
    date: "November 2023",
    venue: "S.D.A. Hospital, Kwadaso",
    category: "Infrastructure",
  },
  {
    title: "CHAG Annual Conference Participation",
    description: "GAHS representatives presented on faith-based healthcare delivery and our integrated network approach at the national CHAG conference.",
    date: "September 2023",
    venue: "Accra International Conference Center",
    category: "Conference",
  },
  {
    title: "Nursing College Graduation Ceremony",
    description: "Celebration of 150 nursing and midwifery graduates from GAHS training institutions, ready to serve communities across Ghana.",
    date: "August 2023",
    venue: "S.D.A. Nursing Training College, Asamang",
    category: "Education",
  },
  {
    title: "Medical Equipment Donation",
    description: "Distribution of modern diagnostic equipment to rural clinics, enhancing healthcare delivery in remote areas of Ghana.",
    date: "June 2023",
    venue: "Central Medical Stores, Kwadaso",
    category: "Support",
  },
];

const categories = ["All", "Training", "Outreach", "Infrastructure", "Conference", "Education", "Support"];

const PortfolioPage = () => {
  return (
    <Layout>
      <PageHero
        title="Our Portfolio"
        subtitle="Explore our projects, initiatives, and achievements in advancing healthcare across Ghana."
        badge="Projects & Initiatives"
      />

      {/* Portfolio Section */}
      <section className="py-20 bg-background">
        <div className="container">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="filter-pill"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article
                key={index}
                className="blog-card group"
              >
                {/* Category banner */}
                <div className="h-32 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{project.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{project.venue}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Load More Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioPage;
