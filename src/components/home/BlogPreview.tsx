import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/useCMS";

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
}

const defaultPosts: BlogPost[] = [
  {
    title: "The Importance of Preventive Healthcare in Ghana",
    excerpt: "Learn why preventive care is essential for maintaining good health and reducing healthcare costs.",
    category: "Health Education",
    author: "Dr. Kwame Asante",
    date: "January 5, 2024",
    readTime: "5 min",
  },
  {
    title: "Understanding Maternal and Child Health Services",
    excerpt: "A comprehensive guide to maternal and child health services available at GAHS institutions.",
    category: "Healthcare Services",
    author: "Nurse Mary Osei",
    date: "December 28, 2023",
    readTime: "7 min",
  },
  {
    title: "Faith and Healing: Our Approach to Holistic Care",
    excerpt: "Discover how GAHS integrates spiritual care with medical treatment for complete well-being.",
    category: "Faith & Health",
    author: "Pastor James Mensah",
    date: "December 15, 2023",
    readTime: "6 min",
  },
];

export const BlogPreview = () => {
  const { getSection } = usePageContent("blog");
  
  const postsData = getSection<{ posts: BlogPost[] }>("posts");
  const posts = postsData?.posts && postsData.posts.length > 0 
    ? postsData.posts.slice(0, 3) 
    : defaultPosts;

  const getPostSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            Latest News & Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            From Our <span className="text-gradient">Blog</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed with health education articles, institutional news, and faith-based wellness content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/blog/${getPostSlug(post.title)}`}
                className="block h-full"
              >
                <article className="blog-card group h-full flex flex-col">
                  {/* Image placeholder */}
                  <div className="h-44 bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                    )}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span className="truncate max-w-[100px]">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/blog">
            <Button className="gap-2 group bg-primary hover:bg-primary-dark">
              View All Posts
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
