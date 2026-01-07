import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FileText, Download, ExternalLink, Search, BookOpen, FileSpreadsheet, Film, Calendar } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";
import { Skeleton } from "@/components/ui/skeleton";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  downloadUrl?: string;
  externalUrl?: string;
  date: string;
  fileSize?: string;
}

interface ResourcesContent {
  resources: Resource[];
}

const defaultResources: Resource[] = [
  {
    id: "1",
    title: "GAHS Annual Report 2024",
    description: "Comprehensive overview of GAHS activities, achievements, and financial performance for 2024.",
    category: "Reports",
    type: "pdf",
    downloadUrl: "#",
    date: "January 2025",
    fileSize: "4.2 MB"
  },
  {
    id: "2",
    title: "Healthcare Quality Standards Guide",
    description: "Guidelines and standards for maintaining quality healthcare across all GAHS facilities.",
    category: "Guidelines",
    type: "pdf",
    downloadUrl: "#",
    date: "December 2024",
    fileSize: "2.1 MB"
  },
  {
    id: "3",
    title: "Patient Care Training Manual",
    description: "Training manual for healthcare professionals on patient care best practices.",
    category: "Training Materials",
    type: "pdf",
    downloadUrl: "#",
    date: "November 2024",
    fileSize: "5.8 MB"
  },
  {
    id: "4",
    title: "GAHS Strategic Plan 2025-2030",
    description: "Five-year strategic plan outlining GAHS vision, goals, and initiatives.",
    category: "Reports",
    type: "pdf",
    downloadUrl: "#",
    date: "October 2024",
    fileSize: "3.4 MB"
  },
  {
    id: "5",
    title: "Health Awareness Video Series",
    description: "Educational video series on preventive healthcare and wellness.",
    category: "Multimedia",
    type: "video",
    externalUrl: "#",
    date: "September 2024"
  },
  {
    id: "6",
    title: "Infection Prevention Handbook",
    description: "Comprehensive guide on infection prevention and control measures.",
    category: "Guidelines",
    type: "pdf",
    downloadUrl: "#",
    date: "August 2024",
    fileSize: "1.9 MB"
  },
  {
    id: "7",
    title: "GAHS Quarterly Newsletter - Q4 2024",
    description: "Latest updates, news, and achievements from across the GAHS network.",
    category: "Newsletters",
    type: "pdf",
    downloadUrl: "#",
    date: "December 2024",
    fileSize: "2.3 MB"
  },
  {
    id: "8",
    title: "Community Health Outreach Toolkit",
    description: "Resources and materials for organizing community health programs.",
    category: "Training Materials",
    type: "spreadsheet",
    downloadUrl: "#",
    date: "July 2024",
    fileSize: "1.2 MB"
  },
];

const categories = ["All", "Reports", "Guidelines", "Training Materials", "Newsletters", "Multimedia"];

const ResourcesPage = () => {
  const { isLoading, getSection } = usePageContent("resources");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const resourcesContent = getSection<ResourcesContent>("resources_list", { resources: defaultResources })!;
  const resources = resourcesContent.resources || defaultResources;

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "pdf": return FileText;
      case "video": return Film;
      case "spreadsheet": return FileSpreadsheet;
      default: return BookOpen;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20">
          <div className="container">
            <Skeleton className="h-48 w-full mb-8" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        title="Resources"
        subtitle="Access reports, guidelines, training materials, and other resources from Ghana Adventist Health Services."
        badge="Downloads & Materials"
      />

      <section className="py-16 bg-background">
        <div className="container">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No resources found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredResources.map((resource) => {
                const Icon = getIcon(resource.type);
                return (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {resource.date}
                            </span>
                            {resource.fileSize && (
                              <span>• {resource.fileSize}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-primary-light text-primary px-2 py-1 rounded-full">
                          {resource.category}
                        </span>
                        {resource.downloadUrl ? (
                          <Button size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        ) : resource.externalUrl ? (
                          <Button size="sm" variant="outline" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            View
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Need More Resources?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                If you're looking for specific documents, training materials, or have questions about our resources, 
                please get in touch with our team.
              </p>
              <Button asChild size="lg">
                <a href="/contact">Contact Us</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesPage;
