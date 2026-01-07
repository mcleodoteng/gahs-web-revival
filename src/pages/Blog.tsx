import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample blog posts
const blogPosts = [
  {
    title: "The Importance of Preventive Healthcare in Ghana",
    excerpt: "Learn why preventive care is essential for maintaining good health and reducing healthcare costs in the long term.",
    category: "Health Education",
    author: "Dr. Kwame Asante",
    date: "January 5, 2024",
    readTime: "5 min read",
  },
  {
    title: "Understanding Maternal and Child Health Services",
    excerpt: "A comprehensive guide to the maternal and child health services available at GAHS institutions across Ghana.",
    category: "Healthcare Services",
    author: "Nurse Mary Osei",
    date: "December 28, 2023",
    readTime: "7 min read",
  },
  {
    title: "Faith and Healing: Our Approach to Holistic Care",
    excerpt: "Discover how GAHS integrates spiritual care with medical treatment for complete patient well-being.",
    category: "Faith & Health",
    author: "Pastor James Mensah",
    date: "December 15, 2023",
    readTime: "6 min read",
  },
  {
    title: "New Developments in Our Training Programs",
    excerpt: "Updates on curriculum enhancements and new facilities at GAHS nursing and health training colleges.",
    category: "Institutional Updates",
    author: "Dr. Ama Boateng",
    date: "November 30, 2023",
    readTime: "4 min read",
  },
  {
    title: "Managing Chronic Diseases: Tips and Resources",
    excerpt: "Expert advice on managing diabetes, hypertension, and other chronic conditions for better quality of life.",
    category: "Health Education",
    author: "Dr. Samuel Owusu",
    date: "November 20, 2023",
    readTime: "8 min read",
  },
  {
    title: "GAHS Partners with CHAG for Healthcare Excellence",
    excerpt: "Our collaboration with the Christian Health Association of Ghana continues to strengthen healthcare delivery.",
    category: "Partnership",
    author: "GAHS Communications",
    date: "November 10, 2023",
    readTime: "3 min read",
  },
];

const categories = ["All", "Health Education", "Healthcare Services", "Faith & Health", "Institutional Updates", "Partnership"];

const BlogPage = () => {
  return (
    <Layout>
      <PageHero
        title="Blog & News"
        subtitle="Stay updated with health education articles, institutional news, and faith-based wellness content."
        badge="Latest Updates"
      />

      {/* Blog Section */}
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

          {/* Blog posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="blog-card group cursor-pointer"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <span className="relative px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="truncate max-w-[120px]">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Load More Articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary-light">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Stay Informed
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to receive the latest health tips, news, and updates from GAHS.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button className="bg-primary hover:bg-primary-dark">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
