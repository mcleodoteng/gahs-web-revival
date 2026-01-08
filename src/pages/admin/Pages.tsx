import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useCMS } from "@/hooks/useCMS";
import { Badge } from "@/components/ui/badge";

const pages = [
  { 
    name: "Home", 
    slug: "home", 
    description: "Main landing page with hero carousel, director message, and previews",
    sections: ["hero", "director_message", "services_preview", "institutions_preview", "why_choose_us", "mission_vision", "affiliations"]
  },
  { 
    name: "About", 
    slug: "about", 
    description: "Organization history, mission, and overview",
    sections: ["hero", "history", "mission", "vision", "values"]
  },
  { 
    name: "Leadership", 
    slug: "leadership", 
    description: "Director profile and team members",
    sections: ["hero", "director", "team_members"]
  },
  { 
    name: "Services", 
    slug: "services", 
    description: "Core healthcare services offered",
    sections: ["hero", "services_list", "cta"]
  },
  { 
    name: "Institutions", 
    slug: "institutions", 
    description: "Healthcare facilities directory - hospitals, clinics, training",
    sections: ["hero", "hospitals", "clinics", "polyclinics", "specialized", "training"]
  },
  { 
    name: "Gallery", 
    slug: "gallery", 
    description: "Photo gallery with categories",
    sections: ["gallery_images"]
  },
  { 
    name: "Resources", 
    slug: "resources", 
    description: "Downloadable resources and documents",
    sections: ["resources_list"]
  },
  { 
    name: "Testimonials", 
    slug: "testimonials", 
    description: "User testimonials and reviews",
    sections: ["testimonials_list"]
  },
  { 
    name: "Blog", 
    slug: "blog", 
    description: "Blog posts and articles",
    sections: ["posts"]
  },
  { 
    name: "Contact", 
    slug: "contact", 
    description: "Contact information, address, and form",
    sections: ["hero", "contact_info", "form_settings"]
  },
  { 
    name: "Privacy Policy", 
    slug: "privacy", 
    description: "Privacy policy content",
    sections: ["content"]
  },
  { 
    name: "Terms & Conditions", 
    slug: "terms", 
    description: "Terms of service content",
    sections: ["content"]
  },
];

const AdminPages = () => {
  const { content, isLoading } = useCMS();

  const getPageStats = (slug: string) => {
    const pageContent = content.filter((c) => c.page_slug === slug);
    const active = pageContent.filter((c) => c.is_active).length;
    const total = pageContent.length;
    return { active, total };
  };

  return (
    <AdminLayout title="Pages">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pages</h1>
          <p className="text-muted-foreground mt-1">
            Manage content for all pages on your website.
          </p>
        </div>

        <div className="grid gap-4">
          {pages.map((page) => {
            const stats = getPageStats(page.slug);
            return (
              <Link key={page.slug} to={`/admin/pages/${page.slug}`}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{page.name}</h3>
                          <p className="text-sm text-muted-foreground">{page.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="flex items-center gap-2">
                            {stats.total > 0 && (
                              <>
                                <Badge variant="secondary" className="gap-1">
                                  <Eye className="h-3 w-3" />
                                  {stats.active} active
                                </Badge>
                                {stats.total - stats.active > 0 && (
                                  <Badge variant="outline" className="gap-1">
                                    <EyeOff className="h-3 w-3" />
                                    {stats.total - stats.active} hidden
                                  </Badge>
                                )}
                              </>
                            )}
                            {stats.total === 0 && (
                              <Badge variant="outline">No content yet</Badge>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPages;
