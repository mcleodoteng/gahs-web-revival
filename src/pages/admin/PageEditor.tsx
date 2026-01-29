import React, { useState, useEffect } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Plus,
  Save,
  Eye,
  EyeOff,
  GripVertical,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  RotateCcw,
} from "lucide-react";
import { useCMS, PageContent } from "@/hooks/useCMS";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrayEditor, ArrayFieldConfig } from "@/components/admin/ArrayEditor";
import { defaultPageContent } from "@/lib/defaultContent";

// Define array field configurations for visual editing
const arrayFieldConfigs: Record<string, ArrayFieldConfig[]> = {
  slides: [
    { key: "title", label: "Title", type: "text", placeholder: "Compassionate Healthcare" },
    { key: "highlight", label: "Highlight Text", type: "text", placeholder: "Rooted in Faith" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Slide description..." },
    { key: "image", label: "Background Image", type: "image", placeholder: "Image URL" },
  ],
  stats: [
    { key: "icon", label: "Icon Name", type: "select", options: [
      { label: "Building", value: "Building2" },
      { label: "Users", value: "Users" },
      { label: "Heart", value: "Heart" },
      { label: "Star", value: "Star" },
      { label: "Award", value: "Award" },
      { label: "Target", value: "Target" },
      { label: "Shield", value: "Shield" },
      { label: "Globe", value: "Globe" },
    ]},
    { key: "value", label: "Value", type: "text", placeholder: "43+" },
    { key: "label", label: "Label", type: "text", placeholder: "Health Institutions" },
  ],
  items: [
    { key: "icon", label: "Icon Name", type: "select", options: [
      { label: "Heart", value: "Heart" },
      { label: "Users", value: "Users" },
      { label: "Shield", value: "Shield" },
      { label: "Target", value: "Target" },
      { label: "Award", value: "Award" },
      { label: "Book", value: "BookOpen" },
      { label: "Clock", value: "Clock" },
      { label: "Star", value: "Star" },
    ]},
    { key: "title", label: "Title", type: "text", placeholder: "Item title" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Item description..." },
  ],
  images: [
    { key: "src", label: "Image", type: "image", placeholder: "Image URL" },
    { key: "title", label: "Title", type: "text", placeholder: "Image title" },
    { key: "category", label: "Category", type: "select", options: [
      { label: "Conferences", value: "Conferences" },
      { label: "Training Institutions", value: "Training Institutions" },
      { label: "Central Medical Stores", value: "Central Medical Stores" },
      { label: "Facilities", value: "Facilities" },
      { label: "Events", value: "Events" },
      { label: "Staff", value: "Staff" },
      { label: "Community", value: "Community" },
      { label: "Other", value: "Other" },
    ]},
    { key: "description", label: "Description", type: "textarea", placeholder: "Image description..." },
  ],
  testimonials: [
    { key: "name", label: "Name", type: "text", placeholder: "John Doe" },
    { key: "role", label: "Role", type: "text", placeholder: "Patient" },
    { key: "location", label: "Location", type: "text", placeholder: "Accra, Ghana" },
    { key: "content", label: "Testimonial", type: "textarea", placeholder: "Their testimonial..." },
    { key: "rating", label: "Rating (1-5)", type: "number", placeholder: "5" },
    { key: "image", label: "Photo", type: "image", placeholder: "Photo URL" },
  ],
  members: [
    { key: "name", label: "Name", type: "text", placeholder: "Dr. Jane Smith" },
    { key: "title", label: "Title/Role", type: "text", placeholder: "Chief Medical Officer" },
    { key: "department", label: "Department", type: "text", placeholder: "Medical Department" },
    { key: "organization", label: "Organization", type: "text", placeholder: "Organization name" },
    { key: "image", label: "Photo", type: "image", placeholder: "Photo URL" },
  ],
  director_messages: [
    { key: "id", label: "ID", type: "text", placeholder: "1" },
    { key: "name", label: "Director Name", type: "text", placeholder: "Dr. James Antwi" },
    { key: "title", label: "Director Title", type: "text", placeholder: "Director, GAHS" },
    { key: "shortMessage", label: "Short Message", type: "textarea", placeholder: "Brief message for homepage..." },
    { key: "tagline", label: "Tagline", type: "text", placeholder: "Closing tagline" },
    { key: "isActive", label: "Active (show this message)", type: "checkbox" },
  ],
  director_messages_full: [
    { key: "id", label: "ID", type: "text", placeholder: "1" },
    { key: "name", label: "Director Name", type: "text", placeholder: "Dr. James Antwi" },
    { key: "title", label: "Director Title", type: "text", placeholder: "Director, GAHS" },
    { key: "image", label: "Director Photo", type: "image", placeholder: "Photo URL" },
    { key: "message", label: "Full Message", type: "textarea", placeholder: "Full director message..." },
    { key: "email", label: "Email", type: "text", placeholder: "director@gahs.org.gh" },
    { key: "phone", label: "Phone", type: "text", placeholder: "+233 XX XXX XXXX" },
    { key: "isActive", label: "Active (show this message)", type: "checkbox" },
  ],
  executive_committee: [
    { key: "name", label: "Name", type: "text", placeholder: "Elder Samuel Osei" },
    { key: "title", label: "Title/Role", type: "text", placeholder: "Chairperson" },
    { key: "organization", label: "Organization", type: "text", placeholder: "SDA Church Ghana" },
    { key: "image", label: "Photo", type: "image", placeholder: "Photo URL" },
  ],
  upcoming_events: [
    { key: "title", label: "Event Title", type: "text", placeholder: "Annual Health Conference 2025" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Event description..." },
    { key: "date", label: "Date", type: "text", placeholder: "March 15, 2025" },
    { key: "time", label: "Time", type: "text", placeholder: "9:00 AM - 5:00 PM" },
    { key: "location", label: "Location", type: "text", placeholder: "Accra International Conference Centre" },
    { key: "category", label: "Category", type: "select", options: [
      { label: "Conference", value: "Conference" },
      { label: "Seminar", value: "Seminar" },
      { label: "Training", value: "Training" },
      { label: "Outreach", value: "Outreach" },
      { label: "Meeting", value: "Meeting" },
      { label: "Celebration", value: "Celebration" },
    ]},
    { key: "image", label: "Event Image", type: "image", placeholder: "Image URL" },
    { key: "registrationLink", label: "Registration Link", type: "text", placeholder: "https://..." },
  ],
  calendar_programs: [
    { key: "name", label: "Program Name", type: "text", placeholder: "MGUC Health Week" },
    { key: "month", label: "Month", type: "select", options: [
      { label: "January", value: "January" },
      { label: "February", value: "February" },
      { label: "March", value: "March" },
      { label: "April", value: "April" },
      { label: "May", value: "May" },
      { label: "June", value: "June" },
      { label: "July", value: "July" },
      { label: "August", value: "August" },
      { label: "September", value: "September" },
      { label: "October", value: "October" },
      { label: "November", value: "November" },
      { label: "December", value: "December" },
    ]},
    { key: "type", label: "Type", type: "select", options: [
      { label: "Conference", value: "Conference" },
      { label: "Seminar", value: "Seminar" },
      { label: "Training", value: "Training" },
      { label: "Outreach", value: "Outreach" },
      { label: "Meeting", value: "Meeting" },
      { label: "Celebration", value: "Celebration" },
    ]},
    { key: "description", label: "Description", type: "textarea", placeholder: "Brief description of the program" },
    { key: "recurring", label: "Recurring Yearly", type: "checkbox" },
  ],
  services: [
    { key: "icon", label: "Icon Name", type: "select", options: [
      { label: "Target", value: "Target" },
      { label: "Heart", value: "Heart" },
      { label: "Users", value: "Users" },
      { label: "Shield", value: "Shield" },
      { label: "Book", value: "BookOpen" },
      { label: "Building", value: "Building2" },
      { label: "Stethoscope", value: "Stethoscope" },
      { label: "Graduation Cap", value: "GraduationCap" },
    ]},
    { key: "title", label: "Service Name", type: "text", placeholder: "Healthcare Service" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Service description..." },
  ],
  posts: [
    { key: "title", label: "Title", type: "text", placeholder: "Blog post title" },
    { key: "excerpt", label: "Excerpt", type: "textarea", placeholder: "Brief summary..." },
    { key: "content", label: "Content", type: "richtext", placeholder: "Full blog post content (supports markdown)..." },
    { key: "category", label: "Category", type: "text", placeholder: "News" },
    { key: "author", label: "Author", type: "text", placeholder: "Author name" },
    { key: "date", label: "Date", type: "text", placeholder: "January 2025" },
    { key: "readTime", label: "Read Time", type: "text", placeholder: "5 min" },
    { key: "image", label: "Featured Image", type: "image", placeholder: "Image URL" },
  ],
  sections: [
    { key: "title", label: "Section Title", type: "text", placeholder: "Section title" },
    { key: "content", label: "Content", type: "textarea", placeholder: "Section content..." },
  ],
  institutions: [
    { key: "name", label: "Institution Name", type: "text", placeholder: "S.D.A. Hospital, Kwadaso" },
    { key: "location", label: "Location", type: "text", placeholder: "Kwadaso" },
    { key: "region", label: "Region", type: "text", placeholder: "Ashanti" },
    { key: "union", label: "Union", type: "select", options: [
      { label: "MGUC", value: "MGUC" },
      { label: "SGUC", value: "SGUC" },
      { label: "MCGUM", value: "MCGUM" },
      { label: "All Unions", value: "ALL UNIONS" },
    ]},
    { key: "type", label: "Type", type: "select", options: [
      { label: "Hospital", value: "Hospital" },
      { label: "Clinic", value: "Clinic" },
      { label: "Polyclinic", value: "Polyclinic" },
      { label: "Specialized", value: "Specialized" },
      { label: "Training", value: "Training" },
      { label: "Conference", value: "Conference" },
    ]},
    { key: "status", label: "Status", type: "select", options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Awaiting Accreditation", value: "AWAITING FULL ACCREDITATION" },
    ]},
    { key: "phone", label: "Phone Number", type: "text", placeholder: "+233 XX XXX XXXX" },
    { key: "email", label: "Email Address", type: "text", placeholder: "info@hospital.org.gh" },
    { key: "website", label: "Website URL", type: "text", placeholder: "https://www.hospital.org.gh" },
    { key: "image", label: "Facility Image", type: "image", placeholder: "Upload facility image" },
    { key: "services", label: "Services (comma-separated)", type: "textarea", placeholder: "General Medicine, Surgery, Maternity, Emergency Care" },
  ],
  resources: [
    { key: "title", label: "Title", type: "text", placeholder: "GAHS Annual Report 2024" },
    { key: "description", label: "Description", type: "textarea", placeholder: "Brief description of the resource..." },
    { key: "category", label: "Category", type: "select", options: [
      { label: "Application Forms", value: "Application Forms" },
      { label: "Annual Reports", value: "Annual Reports" },
      { label: "Monthly Reports", value: "Monthly Reports" },
      { label: "Guidelines", value: "Guidelines" },
      { label: "Training Materials", value: "Training Materials" },
      { label: "Newsletters", value: "Newsletters" },
      { label: "Scholarly Articles", value: "Scholarly Articles" },
      { label: "Application for Ethical Clearance", value: "Application for Ethical Clearance" },
      { label: "Other", value: "Other" },
    ]},
    { key: "fileUrl", label: "PDF File", type: "file", placeholder: "Upload PDF document" },
    { key: "date", label: "Date", type: "text", placeholder: "January 2025" },
    { key: "fileSize", label: "File Size", type: "text", placeholder: "2.5 MB" },
  ],
};

// Maps section keys to their field configurations with actual CMS content keys
const pageConfig: Record<string, { title: string; fields: Record<string, { label: string; key: string; type: string; placeholder?: string; arrayType?: string }[]> }> = {
  home: {
    title: "Home Page",
    fields: {
      hero: [
        { label: "Slides", key: "slides", type: "array", arrayType: "slides" },
        { label: "Stats", key: "stats", type: "array", arrayType: "stats" },
      ],
      director_message: [
        { label: "Director Messages", key: "messages", type: "array", arrayType: "director_messages" },
      ],
      services_preview: [
        { label: "Title", key: "title", type: "text", placeholder: "Our Services" },
        { label: "Subtitle", key: "subtitle", type: "text", placeholder: "Section subtitle" },
      ],
      why_choose: [
        { label: "Badge", key: "badge", type: "text", placeholder: "Why Choose GAHS" },
        { label: "Title", key: "title", type: "text", placeholder: "Section title" },
        { label: "Subtitle", key: "subtitle", type: "text", placeholder: "Section subtitle" },
        { label: "Items", key: "items", type: "array", arrayType: "items" },
      ],
      gallery_preview: [
        { label: "Images", key: "images", type: "array", arrayType: "images" },
      ],
      testimonials: [
        { label: "Testimonials", key: "testimonials", type: "array", arrayType: "testimonials" },
      ],
      events_preview: [
        { label: "Title", key: "title", type: "text", placeholder: "Upcoming Events" },
        { label: "Subtitle", key: "subtitle", type: "text", placeholder: "Section subtitle" },
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
        { label: "Items", key: "items", type: "array", arrayType: "items" },
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
      director_messages: [
        { label: "Director Messages", key: "messages", type: "array", arrayType: "director_messages_full" },
      ],
      executive_committee: [
        { label: "Section Title", key: "sectionTitle", type: "text", placeholder: "Executive Committee" },
        { label: "Section Subtitle", key: "sectionSubtitle", type: "textarea", placeholder: "Description of the committee" },
        { label: "Committee Members", key: "members", type: "array", arrayType: "executive_committee" },
      ],
      team_members: [
        { label: "Section Title", key: "sectionTitle", type: "text", placeholder: "Meet the GAHS Team" },
        { label: "Section Subtitle", key: "sectionSubtitle", type: "textarea", placeholder: "Team description" },
        { label: "Team Members", key: "members", type: "array", arrayType: "members" },
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
        { label: "Services", key: "services", type: "array", arrayType: "services" },
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
        { label: "Gallery Images", key: "images", type: "array", arrayType: "images" },
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
        { label: "Resources", key: "resources", type: "array", arrayType: "resources" },
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
        { label: "Testimonials", key: "testimonials", type: "array", arrayType: "testimonials" },
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
        { label: "Blog Posts", key: "posts", type: "array", arrayType: "posts" },
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
        { label: "Sections", key: "sections", type: "array", arrayType: "sections" },
      ],
    },
  },
  terms: {
    title: "Terms & Conditions",
    fields: {
      content: [
        { label: "Last Updated", key: "last_updated", type: "text", placeholder: "January 2024" },
        { label: "Sections", key: "sections", type: "array", arrayType: "sections" },
      ],
    },
  },
  institutions: {
    title: "Institutions Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Our Institutions" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Explore our network" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Institutions Directory" },
      ],
      hospitals: [
        { label: "Hospitals", key: "institutions", type: "array", arrayType: "institutions" },
      ],
      clinics: [
        { label: "Clinics", key: "institutions", type: "array", arrayType: "institutions" },
      ],
      polyclinics: [
        { label: "Polyclinics", key: "institutions", type: "array", arrayType: "institutions" },
      ],
      specialized: [
        { label: "Specialized Facilities", key: "institutions", type: "array", arrayType: "institutions" },
      ],
      training: [
        { label: "Training Institutions", key: "institutions", type: "array", arrayType: "institutions" },
      ],
      conferences: [
        { label: "Conferences", key: "institutions", type: "array", arrayType: "institutions" },
      ],
    },
  },
  "forms-publications": {
    title: "Forms & Publications",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Forms & Publications" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Download forms and publications" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Resources" },
      ],
      resources_list: [
        { label: "Resources", key: "resources", type: "array", arrayType: "resources" },
      ],
    },
  },
  "form-submission": {
    title: "Form Submission",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Form Submission" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Upload your completed forms" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Resources" },
      ],
      submission_form: [
        { label: "Form Title", key: "formTitle", type: "text", placeholder: "Submit Your Forms" },
        { label: "Form Description", key: "formDescription", type: "textarea", placeholder: "Complete the form below..." },
        { label: "Unavailable Message", key: "unavailableMessage", type: "textarea", placeholder: "Form submission is currently unavailable..." },
      ],
    },
  },
  events: {
    title: "Events Page",
    fields: {
      hero: [
        { label: "Title", key: "title", type: "text", placeholder: "Events & Calendar" },
        { label: "Subtitle", key: "subtitle", type: "textarea", placeholder: "Stay updated with upcoming events" },
        { label: "Badge", key: "badge", type: "text", placeholder: "Events" },
      ],
      upcoming_events: [
        { label: "Upcoming Events", key: "events", type: "array", arrayType: "upcoming_events" },
      ],
      yearly_calendar: [
        { label: "Yearly Calendar Programs", key: "programs", type: "array", arrayType: "calendar_programs" },
      ],
    },
  },
};
interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  fieldId: string;
}

const ImageUploadField = ({ value, onChange, placeholder, fieldId }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
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
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          disabled={isUploading}
          onClick={handleButtonClick}
        >
          {isUploading ? (
            <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </Button>
        <input
          ref={fileInputRef}
          id={fieldId}
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
  const { content, isLoading, updateContent, createContent, fetchContent } = useCMS();
  const [editingSection, setEditingSection] = useState<PageContent | null>(null);
  const [editFormData, setEditFormData] = useState<Record<string, unknown>>({});
  const [newSectionKey, setNewSectionKey] = useState("");
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [restoreTarget, setRestoreTarget] = useState<{ type: "page" | "section"; sectionKey?: string } | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [hideTarget, setHideTarget] = useState<PageContent | null>(null);

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
    const formData: Record<string, unknown> = {};
    const sectionConfig = config.fields[section.section_key];
    if (sectionConfig) {
      sectionConfig.forEach((field) => {
        const contentValue = (section.content as Record<string, unknown>)[field.key];
        if (field.type === "array") {
          // Keep arrays as arrays for the ArrayEditor
          formData[field.key] = Array.isArray(contentValue) ? contentValue : [];
        } else if (contentValue !== undefined && contentValue !== null) {
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
    
    // Process form data for saving
    const parsedContent: Record<string, unknown> = {};
    const sectionConfig = config.fields[editingSection.section_key];
    
    if (sectionConfig) {
      sectionConfig.forEach((field) => {
        const value = editFormData[field.key];
        
        if (field.type === "array") {
          // Arrays are already in the correct format
          parsedContent[field.key] = value;
        } else {
          parsedContent[field.key] = value || "";
        }
      });
    }
    
    await updateContent(editingSection.id, { content: parsedContent as Record<string, string> });
    setEditingSection(null);
    setEditFormData({});
  };

  const handleToggleActive = async () => {
    if (!hideTarget) return;
    await updateContent(hideTarget.id, { is_active: !hideTarget.is_active });
    setHideTarget(null);
  };

  const handleRestoreDefaults = async () => {
    if (!slug || !restoreTarget) return;
    
    setIsRestoring(true);
    const defaults = defaultPageContent[slug];
    
    if (!defaults) {
      toast({
        title: "No defaults available",
        description: "Default content is not available for this page.",
        variant: "destructive",
      });
      setIsRestoring(false);
      setRestoreTarget(null);
      return;
    }

    try {
      if (restoreTarget.type === "page") {
        // Restore all sections for the page
        for (const defaultSection of defaults) {
          const existingSection = pageContent.find((c) => c.section_key === defaultSection.section_key);
          if (existingSection) {
            await updateContent(existingSection.id, { content: defaultSection.content, is_active: true });
          } else {
            await createContent(slug, defaultSection.section_key, defaultSection.content, defaultSection.sort_order);
          }
        }
        toast({
          title: "Page restored",
          description: "All sections have been restored to their default content.",
        });
      } else if (restoreTarget.type === "section" && restoreTarget.sectionKey) {
        // Restore single section
        const defaultSection = defaults.find((d) => d.section_key === restoreTarget.sectionKey);
        const existingSection = pageContent.find((c) => c.section_key === restoreTarget.sectionKey);
        
        if (defaultSection) {
          if (existingSection) {
            await updateContent(existingSection.id, { content: defaultSection.content, is_active: true });
          } else {
            await createContent(slug, restoreTarget.sectionKey, defaultSection.content, defaultSection.sort_order);
          }
          toast({
            title: "Section restored",
            description: "The section has been restored to its default content.",
          });
        } else {
          toast({
            title: "No default available",
            description: "Default content is not available for this section.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to restore defaults. Please try again.",
        variant: "destructive",
      });
    }

    setIsRestoring(false);
    setRestoreTarget(null);
    await fetchContent();
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
          <div className="flex gap-2 flex-wrap">
            <Link to={`/${slug === "home" ? "" : slug}`} target="_blank">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Preview
              </Button>
            </Link>
            {slug && defaultPageContent[slug] && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setRestoreTarget({ type: "page" })}
              >
                <RotateCcw className="h-4 w-4" />
                Restore All Defaults
              </Button>
            )}
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
                      {slug && defaultPageContent[slug]?.some((d) => d.section_key === section.section_key) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setRestoreTarget({ type: "section", sectionKey: section.section_key })}
                          title="Restore section defaults"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setHideTarget(section)}
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
            <div className="py-4 space-y-6">
              {editingSection &&
                config.fields[editingSection.section_key]?.map((field) => {
                  const fieldDef = field as { label: string; key: string; type: string; placeholder?: string; arrayType?: string };
                  
                  return (
                    <div key={field.key} className="space-y-2">
                      <Label className="text-base font-semibold">{field.label}</Label>
                      {fieldDef.type === "array" && fieldDef.arrayType ? (
                        <ArrayEditor
                          value={editFormData[field.key] as unknown[] || []}
                          onChange={(newValue) => setEditFormData({ ...editFormData, [field.key]: newValue })}
                          fields={arrayFieldConfigs[fieldDef.arrayType] || []}
                          itemLabel={field.label.replace(/s$/, "")}
                          exclusiveCheckboxField={
                            (fieldDef.arrayType === "director_messages" || fieldDef.arrayType === "director_messages_full") 
                              ? "isActive" 
                              : undefined
                          }
                        />
                      ) : field.type === "image" ? (
                        <ImageUploadField
                          value={String(editFormData[field.key] || "")}
                          onChange={(url) => setEditFormData({ ...editFormData, [field.key]: url })}
                          placeholder={field.placeholder}
                          fieldId={`image-upload-${editingSection?.id || 'new'}-${field.key}`}
                        />
                      ) : field.type === "textarea" ? (
                        <Textarea
                          value={String(editFormData[field.key] || "")}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, [field.key]: e.target.value })
                          }
                          placeholder={field.placeholder}
                          rows={field.label.includes("Content") || field.label.includes("Message") ? 10 : 4}
                        />
                      ) : (
                        <Input
                          value={String(editFormData[field.key] || "")}
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


      {/* Hide/Show Confirmation Dialog */}
      <AlertDialog open={!!hideTarget} onOpenChange={(open) => !open && setHideTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {hideTarget?.is_active ? "Hide Section" : "Show Section"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to {hideTarget?.is_active ? "hide" : "show"} the section{" "}
              <strong>
                {hideTarget?.section_key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </strong>
              ? {hideTarget?.is_active 
                ? "This will hide it from the public website." 
                : "This will make it visible on the public website."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggleActive}>
              Yes, {hideTarget?.is_active ? "Hide" : "Show"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Restore Defaults Confirmation Dialog */}
      <AlertDialog open={!!restoreTarget} onOpenChange={(open) => !open && setRestoreTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore Defaults</AlertDialogTitle>
            <AlertDialogDescription>
              {restoreTarget?.type === "page" ? (
                <>
                  Are you sure you want to restore <strong>all sections</strong> on this page to their default content?
                  This will overwrite your current content and cannot be undone.
                </>
              ) : (
                <>
                  Are you sure you want to restore the{" "}
                  <strong>
                    {restoreTarget?.sectionKey
                      ?.replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </strong>{" "}
                  section to its default content? This will overwrite your current content and cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRestoring}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestoreDefaults} disabled={isRestoring}>
              {isRestoring ? "Restoring..." : "Restore Defaults"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </AdminLayout>
  );
};

export default PageEditor;
