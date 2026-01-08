import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FileText, Download, Search, BookOpen, Calendar } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";
import { Skeleton } from "@/components/ui/skeleton";

interface Resource {
  id?: string;
  title: string;
  description: string;
  category: string;
  fileUrl?: string;
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
    category: "Annual Reports",
    date: "January 2025",
    fileSize: "4.2 MB"
  },
];

const categories = ["All", "Application Forms", "Annual Reports", "Monthly Reports", "Guidelines", "Training Materials", "Newsletters", "Other"];

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
        subtitle="Access application forms, reports, guidelines, and other downloadable resources from Ghana Adventist Health Services."
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
              {filteredResources.map((resource, index) => (
                <Card key={resource.id || index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
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
                      {resource.fileUrl ? (
                        <Button size="sm" className="gap-2" asChild>
                          <a href={resource.fileUrl} download target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      ) : (
                        <Button size="sm" disabled className="gap-2">
                          <Download className="h-4 w-4" />
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                If you're looking for specific documents, application forms, or have questions about our resources, 
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
