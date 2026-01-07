import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  ExternalLink,
} from "lucide-react";
import { useCMS, PageContent } from "@/hooks/useCMS";
import { Link } from "react-router-dom";

const pageConfig: Record<string, { title: string; fields: Record<string, { label: string; type: string; placeholder?: string }[]> }> = {
  home: {
    title: "Home Page",
    fields: {
      hero: [
        { label: "Title", type: "text", placeholder: "Main headline" },
        { label: "Subtitle", type: "textarea", placeholder: "Supporting text" },
        { label: "Button Text", type: "text", placeholder: "CTA button text" },
        { label: "Button Link", type: "text", placeholder: "/services" },
        { label: "Background Image URL", type: "image", placeholder: "Image URL" },
      ],
      director_message: [
        { label: "Name", type: "text", placeholder: "Dr. James Antwi" },
        { label: "Title", type: "text", placeholder: "Director, GAHS" },
        { label: "Short Message", type: "textarea", placeholder: "Brief message for homepage" },
        { label: "Tagline", type: "text", placeholder: "Closing tagline" },
      ],
      why_choose: [
        { label: "Badge", type: "text", placeholder: "Why Choose GAHS" },
        { label: "Title", type: "text", placeholder: "Section title" },
        { label: "Subtitle", type: "text", placeholder: "Section subtitle" },
        { label: "Items JSON", type: "textarea", placeholder: '[\n  {"icon": "Network", "title": "Title", "description": "Description"}\n]' },
      ],
      gallery_preview: [
        { label: "Images JSON", type: "textarea", placeholder: '[\n  {"id": "1", "src": "URL", "title": "Title", "category": "Category"}\n]' },
      ],
      testimonials_preview: [
        { label: "Testimonials JSON", type: "textarea", placeholder: '[\n  {"id": "1", "name": "Name", "role": "Role", "location": "Location", "content": "Content", "rating": 5, "image": "URL"}\n]' },
      ],
    },
  },
  about: {
    title: "About Page",
    fields: {
      hero: [
        { label: "Title", type: "text", placeholder: "About GAHS" },
        { label: "Subtitle", type: "textarea", placeholder: "Learn about our organization" },
        { label: "Badge", type: "text", placeholder: "Our Story" },
      ],
      history: [
        { label: "Title", type: "text", placeholder: "Our History" },
        { label: "Paragraphs JSON", type: "textarea", placeholder: '["Paragraph 1", "Paragraph 2"]' },
      ],
      mission: [
        { label: "Title", type: "text", placeholder: "Our Mission" },
        { label: "Description", type: "textarea", placeholder: "Mission statement..." },
      ],
      vision: [
        { label: "Title", type: "text", placeholder: "Our Vision" },
        { label: "Description", type: "textarea", placeholder: "Vision statement..." },
      ],
      quote: [
        { label: "Text", type: "textarea", placeholder: "Quote text" },
        { label: "Author", type: "text", placeholder: "Author name" },
      ],
      why_choose: [
        { label: "Title", type: "text", placeholder: "Section title" },
        { label: "Items JSON", type: "textarea", placeholder: '[\n  {"title": "Title", "description": "Description"}\n]' },
      ],
    },
  },
  leadership: {
    title: "Leadership Page",
    fields: {
      hero: [
        { label: "Title", type: "text", placeholder: "Leadership Team" },
        { label: "Subtitle", type: "textarea", placeholder: "Meet our dedicated team" },
      ],
      director: [
        { label: "Name", type: "text", placeholder: "Dr. James Antwi" },
        { label: "Title", type: "text", placeholder: "Director" },
        { label: "Image", type: "image", placeholder: "Director photo URL" },
        { label: "Message", type: "textarea", placeholder: "Full message..." },
        { label: "Email", type: "text", placeholder: "director@gahs.org.gh" },
        { label: "Phone", type: "text", placeholder: "+233322392578" },
      ],
      team_members: [
        { label: "Section Title", type: "text", placeholder: "Meet the GAHS Secretariat Team" },
        { label: "Section Subtitle", type: "text", placeholder: "Team description" },
        { label: "Members JSON", type: "textarea", placeholder: '[\n  {"name": "Name", "title": "Title", "department": "Dept", "image": "URL"}\n]' },
      ],
      quote: [
        { label: "Text", type: "textarea", placeholder: "Quote text" },
        { label: "Author", type: "text", placeholder: "Author name" },
      ],
    },
  },
  services: {
    title: "Services Page",
    fields: {
      hero: [
        { label: "Title", type: "text", placeholder: "Our Services" },
        { label: "Subtitle", type: "textarea", placeholder: "What we offer" },
        { label: "Badge", type: "text", placeholder: "Our Services" },
      ],
      services_list: [
        { label: "Items JSON", type: "textarea", placeholder: '[\n  {"icon": "Target", "title": "Service Name", "description": "Description"}\n]' },
      ],
      cta: [
        { label: "Title", type: "text", placeholder: "Partner With Us" },
        { label: "Description", type: "textarea", placeholder: "CTA description" },
        { label: "Button Text", type: "text", placeholder: "Get in Touch" },
        { label: "Button Link", type: "text", placeholder: "/contact" },
      ],
    },
  },
  gallery: {
    title: "Gallery Page",
    fields: {
      gallery_images: [
        { label: "Images JSON", type: "textarea", placeholder: '[\n  {"id": "1", "src": "URL", "title": "Title", "category": "Category", "description": "Description"}\n]' },
      ],
    },
  },
  resources: {
    title: "Resources Page",
    fields: {
      resources_list: [
        { label: "Resources JSON", type: "textarea", placeholder: '[\n  {"id": "1", "title": "Title", "description": "Desc", "category": "Category", "type": "pdf", "downloadUrl": "URL", "date": "January 2025", "fileSize": "4.2 MB"}\n]' },
      ],
    },
  },
  testimonials: {
    title: "Testimonials Page",
    fields: {
      testimonials_list: [
        { label: "Testimonials JSON", type: "textarea", placeholder: '[\n  {"id": "1", "name": "Name", "role": "Role", "location": "Location", "content": "Content", "rating": 5, "image": "URL"}\n]' },
      ],
    },
  },
  contact: {
    title: "Contact Page",
    fields: {
      hero: [
        { label: "Title", type: "text", placeholder: "Contact Us" },
        { label: "Subtitle", type: "textarea", placeholder: "Get in touch" },
        { label: "Badge", type: "text", placeholder: "Get In Touch" },
      ],
      contact_info: [
        { label: "Address", type: "textarea", placeholder: "Full address" },
        { label: "Phone", type: "text", placeholder: "+233 XX XXX XXXX" },
        { label: "Email", type: "text", placeholder: "info@gahs.org.gh" },
        { label: "Office Hours", type: "text", placeholder: "Mon-Fri: 8am-5pm" },
      ],
    },
  },
  privacy: {
    title: "Privacy Policy",
    fields: {
      content: [
        { label: "Full Content", type: "textarea", placeholder: "Privacy policy content" },
      ],
    },
  },
  terms: {
    title: "Terms & Conditions",
    fields: {
      content: [
        { label: "Full Content", type: "textarea", placeholder: "Terms content" },
      ],
    },
  },
};

const PageEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { content, isLoading, updateContent, createContent, deleteContent } = useCMS();
  const [editingSection, setEditingSection] = useState<PageContent | null>(null);
  const [editFormData, setEditFormData] = useState<Record<string, string>>({});
  const [newSectionKey, setNewSectionKey] = useState("");
  const [showNewDialog, setShowNewDialog] = useState(false);

  const config = slug ? pageConfig[slug] : null;
  const pageContent = content.filter((c) => c.page_slug === slug);

  if (!config) {
    return (
      <AdminLayout title="Page Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Page configuration not found.</p>
          <Button onClick={() => navigate("/admin/pages")} className="mt-4">
            Back to Pages
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const handleEditSection = (section: PageContent) => {
    setEditingSection(section);
    const formData: Record<string, string> = {};
    const sectionConfig = config.fields[section.section_key];
    if (sectionConfig) {
      sectionConfig.forEach((field) => {
        const key = field.label.toLowerCase().replace(/ /g, "_");
        formData[key] = (section.content as Record<string, string>)[key] || "";
      });
    }
    setEditFormData(formData);
  };

  const handleSaveSection = async () => {
    if (!editingSection) return;
    await updateContent(editingSection.id, { content: editFormData });
    setEditingSection(null);
    setEditFormData({});
  };

  const handleToggleActive = async (section: PageContent) => {
    await updateContent(section.id, { is_active: !section.is_active });
  };

  const handleDeleteSection = async (section: PageContent) => {
    if (confirm("Are you sure you want to delete this section?")) {
      await deleteContent(section.id);
    }
  };

  const handleCreateSection = async () => {
    if (!newSectionKey || !slug) return;
    const initialContent: Record<string, string> = {};
    const sectionConfig = config.fields[newSectionKey];
    if (sectionConfig) {
      sectionConfig.forEach((field) => {
        const key = field.label.toLowerCase().replace(/ /g, "_");
        initialContent[key] = "";
      });
    }
    await createContent(slug, newSectionKey, initialContent, pageContent.length);
    setShowNewDialog(false);
    setNewSectionKey("");
  };

  const availableSections = Object.keys(config.fields).filter(
    (key) => !pageContent.some((c) => c.section_key === key)
  );

  return (
    <AdminLayout title={config.title}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/pages")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{config.title}</h1>
              <p className="text-muted-foreground">
                Manage sections and content for this page
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/${slug === "home" ? "" : slug}`} target="_blank">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Preview
              </Button>
            </Link>
            {availableSections.length > 0 && (
              <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Section
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Section</DialogTitle>
                    <DialogDescription>
                      Choose a section to add to this page.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label>Section Type</Label>
                    <select
                      className="w-full mt-2 p-2 border rounded-lg"
                      value={newSectionKey}
                      onChange={(e) => setNewSectionKey(e.target.value)}
                    >
                      <option value="">Select a section...</option>
                      {availableSections.map((key) => (
                        <option key={key} value={key}>
                          {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateSection} disabled={!newSectionKey}>
                      Create Section
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Sections list */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : pageContent.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                No sections created yet. Add your first section to get started.
              </p>
              {availableSections.length > 0 && (
                <Button onClick={() => setShowNewDialog(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add First Section
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pageContent.map((section) => (
              <Card
                key={section.id}
                className={!section.is_active ? "opacity-60" : ""}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                      <CardTitle className="text-base">
                        {section.section_key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </CardTitle>
                      {!section.is_active && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">Hidden</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleActive(section)}
                        title={section.is_active ? "Hide section" : "Show section"}
                      >
                        {section.is_active ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditSection(section)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteSection(section)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {Object.entries(section.content as Record<string, string>)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <p key={key} className="truncate">
                          <span className="font-medium">{key.replace(/_/g, " ")}:</span>{" "}
                          {typeof value === "string" ? value.substring(0, 100) : "..."}
                        </p>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingSection} onOpenChange={(open) => !open && setEditingSection(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Edit{" "}
                {editingSection?.section_key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </DialogTitle>
              <DialogDescription>
                Update the content for this section.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              {editingSection &&
                config.fields[editingSection.section_key]?.map((field) => {
                  const key = field.label.toLowerCase().replace(/ /g, "_");
                  return (
                    <div key={key} className="space-y-2">
                      <Label>{field.label}</Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          value={editFormData[key] || ""}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, [key]: e.target.value })
                          }
                          placeholder={field.placeholder}
                          rows={field.label.includes("JSON") || field.label.includes("Content") ? 10 : 4}
                        />
                      ) : (
                        <Input
                          value={editFormData[key] || ""}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, [key]: e.target.value })
                          }
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingSection(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSection} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default PageEditor;
