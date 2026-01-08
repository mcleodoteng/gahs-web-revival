import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { usePageContent } from "@/hooks/useCMS";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getSection, isLoading } = usePageContent("blog");

  const posts = getSection<{ posts: BlogPost[] }>("posts")?.posts || [];
  
  // Find the post by matching the slug (created from title)
  const post = posts.find(p => {
    const postSlug = p.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return postSlug === slug;
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold text-foreground">Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section with Featured Image */}
      <div className="relative">
        {post.image ? (
          <div className="h-[400px] relative overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ) : (
          <div className="h-[300px] bg-gradient-to-br from-primary/10 to-secondary/10" />
        )}
        
        <div className="container absolute inset-x-0 bottom-0 pb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Excerpt/Lead */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Main Content */}
            {post.content ? (
              <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
                {post.content.split('\n\n').map((paragraph, index) => {
                  // Handle markdown-style headers
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  // Handle bullet points
                  if (paragraph.includes('\n- ')) {
                    const [intro, ...items] = paragraph.split('\n- ');
                    return (
                      <div key={index}>
                        {intro && <p className="text-muted-foreground mb-3">{intro}</p>}
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                          {items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  // Regular paragraph
                  return (
                    <p key={index} className="text-muted-foreground mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground italic">Full article content coming soon...</p>
            )}

            {/* Back to blog */}
            <div className="mt-12 pt-8 border-t border-border">
              <Button asChild variant="outline">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to All Articles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostPage;
