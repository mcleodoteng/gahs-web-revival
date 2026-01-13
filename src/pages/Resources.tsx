import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FileText, Download, Search, BookOpen, Calendar, ClipboardList, FileSpreadsheet, ExternalLink } from "lucide-react";
import { usePageContent } from "@/hooks/useCMS";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Sample resources with actual downloadable PDFs from public sources
const defaultResources: Resource[] = [
  // Publications
  {
    id: "1",
    title: "GAHS Annual Report 2024",
    description: "Comprehensive overview of GAHS activities, achievements, and financial performance for 2024.",
    category: "Annual Reports",
    date: "January 2025",
    fileSize: "4.2 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "2",
    title: "GAHS Annual Report 2023",
    description: "Review of healthcare services, institutional growth, and community impact in 2023.",
    category: "Annual Reports",
    date: "January 2024",
    fileSize: "3.8 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "3",
    title: "Monthly Health Report - December 2024",
    description: "Monthly summary of health services delivered across all GAHS facilities.",
    category: "Monthly Reports",
    date: "January 2025",
    fileSize: "1.8 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "4",
    title: "Monthly Health Report - November 2024",
    description: "Performance metrics and healthcare delivery statistics for November.",
    category: "Monthly Reports",
    date: "December 2024",
    fileSize: "1.6 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "5",
    title: "GAHS Newsletter Q4 2024",
    description: "Quarterly newsletter featuring updates, stories, and achievements from our network.",
    category: "Newsletters",
    date: "December 2024",
    fileSize: "3.5 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "6",
    title: "GAHS Newsletter Q3 2024",
    description: "Quarterly newsletter with highlights from July to September 2024.",
    category: "Newsletters",
    date: "October 2024",
    fileSize: "3.2 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  // Application Forms
  {
    id: "7",
    title: "Employment Application Form",
    description: "Standard application form for employment opportunities at GAHS institutions.",
    category: "Application Forms",
    date: "December 2024",
    fileSize: "1.2 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "8",
    title: "Nursing School Application Form",
    description: "Application form for prospective nursing students at GAHS training colleges.",
    category: "Application Forms",
    date: "November 2024",
    fileSize: "0.8 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "9",
    title: "Internship Application Form",
    description: "Application for internship programs at GAHS hospitals and clinics.",
    category: "Application Forms",
    date: "October 2024",
    fileSize: "0.6 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "10",
    title: "Volunteer Registration Form",
    description: "Registration form for volunteers wishing to serve at GAHS facilities.",
    category: "Application Forms",
    date: "September 2024",
    fileSize: "0.5 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  // Guidelines
  {
    id: "11",
    title: "Student Admission Guidelines",
    description: "Comprehensive guidelines for admission into GAHS training institutions.",
    category: "Guidelines",
    date: "November 2024",
    fileSize: "2.5 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "12",
    title: "Clinical Practice Guidelines",
    description: "Standard operating procedures for clinical practice at GAHS facilities.",
    category: "Guidelines",
    date: "October 2024",
    fileSize: "4.1 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "13",
    title: "Patient Safety Guidelines",
    description: "Guidelines for ensuring patient safety across all GAHS institutions.",
    category: "Guidelines",
    date: "September 2024",
    fileSize: "2.8 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  // Training Materials
  {
    id: "14",
    title: "Nursing Training Manual",
    description: "Comprehensive training manual for nursing students covering core competencies.",
    category: "Training Materials",
    date: "October 2024",
    fileSize: "8.1 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "15",
    title: "Infection Prevention Training Guide",
    description: "Training guide on infection prevention and control measures.",
    category: "Training Materials",
    date: "August 2024",
    fileSize: "3.4 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "16",
    title: "Emergency Response Training Manual",
    description: "Manual for emergency response procedures and protocols.",
    category: "Training Materials",
    date: "July 2024",
    fileSize: "5.2 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  // Other
  {
    id: "17",
    title: "GAHS Organizational Chart",
    description: "Current organizational structure of Ghana Adventist Health Services.",
    category: "Other",
    date: "January 2025",
    fileSize: "0.3 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
  {
    id: "18",
    title: "GAHS Strategic Plan 2024-2028",
    description: "Five-year strategic plan outlining GAHS goals and initiatives.",
    category: "Other",
    date: "January 2024",
    fileSize: "2.1 MB",
    fileUrl: "https://www.who.int/docs/default-source/documents/publications/accreditation-standards.pdf"
  },
];

// Application Forms section categories
const applicationFormCategories = ["All", "Application Forms", "Guidelines", "Training Materials", "Other"];

// Publications section categories
const publicationCategories = ["All", "Annual Reports", "Monthly Reports", "Newsletters"];

const ResourcesPage = () => {
  const { isLoading, getSection } = usePageContent("resources");
  const [selectedApplicationCategory, setSelectedApplicationCategory] = useState("All");
  const [selectedPublicationCategory, setSelectedPublicationCategory] = useState("All");
  const [applicationSearchQuery, setApplicationSearchQuery] = useState("");
  const [publicationSearchQuery, setPublicationSearchQuery] = useState("");

  const resourcesContent = getSection<ResourcesContent>("resources_list", { resources: defaultResources })!;
  const resources = resourcesContent.resources || defaultResources;

  // Separate resources into Application Forms and Publications
  const applicationFormResources = resources.filter(resource => 
    ["Application Forms", "Guidelines", "Training Materials", "Other"].includes(resource.category)
  );

  const publicationResources = resources.filter(resource => 
    ["Annual Reports", "Monthly Reports", "Newsletters"].includes(resource.category)
  );

  // Filter application form resources
  const filteredApplicationResources = applicationFormResources.filter(resource => {
    const matchesCategory = selectedApplicationCategory === "All" || resource.category === selectedApplicationCategory;
    const matchesSearch = resource.title.toLowerCase().includes(applicationSearchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(applicationSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter publication resources
  const filteredPublicationResources = publicationResources.filter(resource => {
    const matchesCategory = selectedPublicationCategory === "All" || resource.category === selectedPublicationCategory;
    const matchesSearch = resource.title.toLowerCase().includes(publicationSearchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(publicationSearchQuery.toLowerCase());
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

  const ResourceCard = ({ resource, index }: { resource: Resource; index: number }) => (
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
  );

  const EmptyState = () => (
    <Card>
      <CardContent className="py-12 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No resources found matching your criteria.</p>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <PageHero
        title="Resources"
        subtitle="Access application forms, reports, guidelines, and other downloadable resources from Ghana Adventist Health Services."
        badge="Downloads & Materials"
      />

      <section className="py-16 bg-background">
        <div className="container">
          <Tabs defaultValue="application-forms" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="application-forms" className="gap-2">
                <ClipboardList className="h-4 w-4" />
                Application Forms
              </TabsTrigger>
              <TabsTrigger value="publications" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Publications
              </TabsTrigger>
            </TabsList>

            {/* Application Forms Tab */}
            <TabsContent value="application-forms">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Application Forms & Guidelines</h2>
                <p className="text-muted-foreground">Download application forms, guidelines, training materials, and other essential documents.</p>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search application forms..."
                    value={applicationSearchQuery}
                    onChange={(e) => setApplicationSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {applicationFormCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedApplicationCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedApplicationCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Resources Grid */}
              {filteredApplicationResources.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredApplicationResources.map((resource, index) => (
                    <ResourceCard key={resource.id || index} resource={resource} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Publications Tab */}
            <TabsContent value="publications">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Publications & Reports</h2>
                <p className="text-muted-foreground">Access annual reports, monthly reports, newsletters, and other publications.</p>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search publications..."
                    value={publicationSearchQuery}
                    onChange={(e) => setPublicationSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {publicationCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedPublicationCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPublicationCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Resources Grid */}
              {filteredPublicationResources.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPublicationResources.map((resource, index) => (
                    <ResourceCard key={resource.id || index} resource={resource} index={index} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">External Resources</h2>
            <p className="text-muted-foreground">Access additional resources from our partner organizations.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <a 
              href="https://www.moh.gov.gh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
            >
              <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Ghana Ministry of Health</p>
                <p className="text-sm text-muted-foreground">Official government health resources</p>
              </div>
            </a>
            <a 
              href="https://www.chag.org.gh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
            >
              <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">CHAG Resources</p>
                <p className="text-sm text-muted-foreground">Christian Health Association resources</p>
              </div>
            </a>
            <a 
              href="https://www.who.int" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
            >
              <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">WHO Guidelines</p>
                <p className="text-sm text-muted-foreground">World Health Organization resources</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
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
