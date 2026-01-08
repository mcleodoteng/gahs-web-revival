import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/useCMS";

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
}

// Fallback data
const defaultPosts: BlogPost[] = [
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
];

const BlogPage = () => {
  const { getSection, isLoading } = usePageContent("blog");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get data from CMS or use defaults
  const hero = getSection<{ title: string; subtitle: string; badge: string }>("hero") || {
    title: "Blog & News",
    subtitle: "Stay updated with health education articles, institutional news, and faith-based wellness content.",
    badge: "Latest Updates"
  };

  const postsData = getSection<{ posts: BlogPost[] }>("posts");
  const posts = postsData?.posts && postsData.posts.length > 0 ? postsData.posts : defaultPosts;

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  // Generate slug from title
  const getPostSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <Layout>
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        badge={hero.badge}
      />

      {/* Blog Section */}
      <section className="py-20 bg-background">
        <div className="container">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-pill ${selectedCategory === category ? 'bg-primary text-primary-foreground' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <>
              {/* Blog posts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Link
                    key={index}
                    to={`/blog/${getPostSlug(post.title)}`}
                    className="block"
                  >
                    <article className="blog-card group cursor-pointer h-full">
                      {/* Image */}
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                        {post.image ? (
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                        )}
                        <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
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
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts found in this category.</p>
                </div>
              )}
            </>
          )}
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
