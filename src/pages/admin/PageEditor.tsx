import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { useCMS, PageContent } from "@/hooks/useCMS";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Maps section keys to their field configurations with actual CMS content keys
const pageConfig: Record<string, { title: string; fields: Record<string, { label: string; key: string; type: string; placeholder?: string }[]> }> = {
  home: {
    title: "Home Page",
    fields: {
      hero: [
        { label: "Slides (JSON)", key: "slides", type: "textarea", placeholder: '[{"id": "1", "title": "Title", "highlight": "Highlight", "description": "Description", "image": "URL"}]' },
        { label: "Stats (JSON)", key: "stats", type: "textarea", placeholder: '[{"icon": "Building2", "label": "Health Institutions", "value": "43+"}]' },
      ],
      director_message: [
        { label: "Name", key: "name", type: "text", placeholder: "Dr. James Antwi" },
        { label: "Title", key: "title", type: "text", placeholder: "Director, GAHS" },
        { label: "Short Message", key: "shortMessage", type: "textarea", placeholder: "Brief message for homepage" },
        { label: "Tagline", key: "tagline", type: "text", placeholder: "Closing tagline" },
      ],
      services_preview: [
        { label: "Title", key: "title", type: "text", placeholder: "Our Services" },
        { label: "Subtitle", key: "subtitle", type: "text", placeholder: "Section subtitle" },
      ],
      why_choose: [
        { label: "Badge", key: "badge", type: "text", placeholder: "Why Choose GAHS" },
        { label: "Title", key: "title", type: "text", placeholder: "Section title" },
        { label: "Subtitle", key: "subtitle", type: "text", placeholder: "Section subtitle" },
        { label: "Items (JSON)", key: "items", type: "textarea", placeholder: '[{"icon": "Heart", "title": "Title", "description": "Description"}]' },
      ],
      gallery_preview: [
        { label: "Images (JSON)", key: "images", type: "textarea", placeholder: '[{"id": "1", "src": "URL", "title": "Title", "category": "Category"}]' },
      ],
      testimonials: [
        { label: "Testimonials (JSON)", key: "testimonials", type: "textarea", placeholder: '[{"id": "1", "name": "Name", "role": "Role", "location": "Location", "content": "Content", "rating": 5}]' },
      ],
    },
  },
  about: {
    title: "About Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "About GAHS" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Learn about our organization" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Our Story" },
      ],
      history: [
        { label: "Title", key: "title", type: "text", placeholder: "Our History" },
        { label: "Content", key: "content", type: "textarea", placeholder: "History content (paragraphs separated by blank lines)" },
      ],
      mission: [
        { label: "Title", key: "title", type: "text", placeholder: "Our Mission" },
        { label: "Content", key: "content", type: "textarea", placeholder: "Mission statement..." },
      ],
      vision: [
        { label: "Title", key: "title", type: "text", placeholder: "Our Vision" },
        { label: "Content", key: "content", type: "textarea", placeholder: "Vision statement..." },
      ],
      quote: [
        { label: "Text", key: "text", type: "textarea", placeholder: "Quote text" },
        { label: "Author", key: "author", type: "text", placeholder: "Author name" },
      ],
      why_choose: [
        { label: "Title", key: "title", type: "text", placeholder: "Section title" },
        { label: "Items (JSON)", key: "items", type: "textarea", placeholder: '[{"title": "Title", "description": "Description"}]' },
      ],
    },
  },
  leadership: {
    title: "Leadership Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Leadership Team" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Meet our dedicated team" },
      ],
      director: [
        { label: "Name", key: "name", type: "text", placeholder: "Dr. James Antwi" },
        { label: "Title", key: "title", type: "text", placeholder: "Director" },
        { label: "Image", key: "image", type: "image", placeholder: "Director photo URL" },
        { label: "Message", key: "message", type: "textarea", placeholder: "Full message..." },
      ],
      team_members: [
        { label: "Members (JSON)", key: "members", type: "textarea", placeholder: '[{"name": "Name", "title": "Title", "department": "Dept", "image": "URL"}]' },
      ],
      quote: [
        { label: "Text", key: "text", type: "textarea", placeholder: "Quote text" },
        { label: "Author", key: "author", type: "text", placeholder: "Author name" },
      ],
    },
  },
  services: {
    title: "Services Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Our Services" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "What we offer" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Our Services" },
      ],
      services_list: [
        { label: "Services (JSON)", key: "services", type: "textarea", placeholder: '[{"icon": "Target", "title": "Service Name", "description": "Description"}]' },
      ],
      cta: [
        { label: "Title", key: "title", type: "text", placeholder: "Partner With Us" },
        { label: "Description", key: "description", type: "textarea", placeholder: "CTA description" },
        { label: "Button Text", key: "buttonText", type: "text", placeholder: "Get in Touch" },
        { label: "Button Link", key: "buttonLink", type: "text", placeholder: "/contact" },
      ],
    },
  },
  gallery: {
    title: "Gallery Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Photo Gallery" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Explore our gallery" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Our Gallery" },
      ],
      gallery_images: [
        { label: "Images (JSON)", key: "images", type: "textarea", placeholder: '[{"id": "1", "src": "URL", "title": "Title", "category": "Category", "description": "Description"}]' },
      ],
    },
  },
  resources: {
    title: "Resources Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Downloads & Resources" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Access reports and publications" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Resources" },
      ],
      resources_list: [
        { label: "Resources (JSON)", key: "items", type: "textarea", placeholder: '[{"id": "1", "title": "Title", "description": "Desc", "category": "Category", "type": "pdf", "downloadUrl": "URL", "date": "January 2025"}]' },
      ],
    },
  },
  testimonials: {
    title: "Testimonials Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "What People Say" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Hear from our community" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Testimonials" },
      ],
      testimonials_list: [
        { label: "Testimonials (JSON)", key: "testimonials", type: "textarea", placeholder: '[{"id": "1", "name": "Name", "role": "Role", "location": "Location", "content": "Content", "rating": 5}]' },
      ],
    },
  },
  blog: {
    title: "Blog Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Latest Updates" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "News and articles" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Blog & News" },
      ],
      posts: [
        { label: "Posts (JSON)", key: "posts", type: "textarea", placeholder: '[{"id": "1", "title": "Title", "excerpt": "Excerpt", "category": "Category", "author": "Author", "date": "Date", "readTime": "5 min"}]' },
      ],
    },
  },
  contact: {
    title: "Contact Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Contact Us" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Get in touch" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Get In Touch" },
      ],
      contact_info: [
        { label: "Address", key: "address", type: "textarea", placeholder: "Full address" },
        { label: "Phone", key: "phone", type: "text", placeholder: "+233 XX XXX XXXX" },
        { label: "Email", key: "email", type: "text", placeholder: "info@gahs.org.gh" },
        { label: "Office Hours", key: "office_hours", type: "text", placeholder: "Mon-Fri: 8am-5pm" },
      ],
    },
  },
  privacy: {
    title: "Privacy Policy",
    fields: {
      content: [
        { label: "Last Updated", key: "last_updated", type: "text", placeholder: "January 2024" },
        { label: "Sections (JSON)", key: "sections", type: "textarea", placeholder: '[{"title": "Section Title", "content": "Section content"}]' },
      ],
    },
  },
  terms: {
    title: "Terms & Conditions",
    fields: {
      content: [
        { label: "Last Updated", key: "last_updated", type: "text", placeholder: "January 2024" },
        { label: "Sections (JSON)", key: "sections", type: "textarea", placeholder: '[{"title": "Section Title", "content": "Section content"}]' },
      ],
    },
  },
};
interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

const ImageUploadField = ({ value, onChange, placeholder }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { error } = await supabase.storage.from("cms-media").upload(fileName, file);

    if (error) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      const { data: urlData } = supabase.storage.from("cms-media").getPublicUrl(fileName);
      onChange(urlData.publicUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    }
    setIsUploading(false);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Label htmlFor="image-upload" className="cursor-pointer">
          <Button type="button" variant="outline" size="icon" disabled={isUploading} asChild>
            <span>
              {isUploading ? (
                <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </span>
          </Button>
        </Label>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
      {value && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border bg-muted">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

const PageEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
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
        const contentValue = (section.content as Record<string, unknown>)[field.key];
        if (contentValue !== undefined && contentValue !== null) {
          formData[field.key] = typeof contentValue === "string" ? contentValue : JSON.stringify(contentValue, null, 2);
        } else {
          formData[field.key] = "";
        }
      });
    }
    setEditFormData(formData);
  };

  const handleSaveSection = async () => {
    if (!editingSection) return;
    
    // Parse JSON fields back to objects
    const parsedContent: Record<string, unknown> = {};
    const sectionConfig = config.fields[editingSection.section_key];
    
    if (sectionConfig) {
      sectionConfig.forEach((field) => {
        const value = editFormData[field.key] || "";
        
        // Check if it's a JSON field based on label containing "JSON" or specific array field names
        const isJsonField = field.label.toLowerCase().includes("json") || 
          ["slides", "stats", "items", "members", "testimonials", "images", "services", "posts", "sections"].includes(field.key);
        
        if (isJsonField) {
          try {
            parsedContent[field.key] = JSON.parse(value);
          } catch {
            parsedContent[field.key] = value;
          }
        } else {
          parsedContent[field.key] = value;
        }
      });
    }
    
    await updateContent(editingSection.id, { content: parsedContent as Record<string, string> });
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
        initialContent[field.key] = "";
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
                    {Object.entries(section.content as Record<string, unknown>)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <p key={key} className="truncate">
                          <span className="font-medium">{key.replace(/_/g, " ")}:</span>{" "}
                          {typeof value === "string" ? value.substring(0, 100) : Array.isArray(value) ? `[${value.length} items]` : "..."}
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
                  return (
                    <div key={field.key} className="space-y-2">
                      <Label>{field.label}</Label>
                      {field.type === "image" ? (
                        <ImageUploadField
                          value={editFormData[field.key] || ""}
                          onChange={(url) => setEditFormData({ ...editFormData, [field.key]: url })}
                          placeholder={field.placeholder}
                        />
                      ) : field.type === "textarea" ? (
                        <Textarea
                          value={editFormData[field.key] || ""}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, [field.key]: e.target.value })
                          }
                          placeholder={field.placeholder}
                          rows={field.label.includes("JSON") || field.label.includes("Content") || field.label.includes("Message") ? 10 : 4}
                          className="font-mono text-sm"
                        />
                      ) : (
                        <Input
                          value={editFormData[field.key] || ""}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, [field.key]: e.target.value })
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
