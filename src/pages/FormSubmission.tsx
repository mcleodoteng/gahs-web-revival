import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Upload, Plus, Trash2, FileText, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const formTypes = [
  { value: "bond", label: "Bond Form" },
  { value: "study_leave", label: "Study Leave Application Form" },
  { value: "appraisal", label: "Appraisal / Promotional Form" },
  { value: "interview", label: "Interview Form" },
];

interface FileUpload {
  id: string;
  formType: string;
  file: File | null;
  description: string;
}

const FormSubmission = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    lastName: "",
    otherNames: "",
    phone: "",
    email: "",
  });
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([
    { id: crypto.randomUUID(), formType: "", file: null, description: "" },
  ]);

  const addFileUpload = () => {
    setFileUploads([
      ...fileUploads,
      { id: crypto.randomUUID(), formType: "", file: null, description: "" },
    ]);
  };

  const removeFileUpload = (id: string) => {
    if (fileUploads.length > 1) {
      setFileUploads(fileUploads.filter((f) => f.id !== id));
    }
  };

  const updateFileUpload = (id: string, field: keyof FileUpload, value: string | File | null) => {
    setFileUploads(
      fileUploads.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one complete file upload
    const validUploads = fileUploads.filter((f) => f.formType && f.file);
    if (validUploads.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one form with a file.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create submission record
      const { data: submission, error: submissionError } = await supabase
        .from("form_submissions")
        .insert({
          last_name: formData.lastName,
          other_names: formData.otherNames,
          phone: formData.phone,
          email: formData.email,
        })
        .select()
        .single();

      if (submissionError) throw submissionError;

      // Upload files and create file records
      for (const upload of validUploads) {
        if (!upload.file) continue;

        const fileExt = upload.file.name.split(".").pop();
        const fileName = `${submission.id}/${Date.now()}-${upload.file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from("form-submissions")
          .upload(fileName, upload.file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("form-submissions")
          .getPublicUrl(fileName);

        // Create file record
        await supabase.from("form_submission_files").insert({
          submission_id: submission.id,
          form_type: upload.formType,
          file_url: urlData.publicUrl,
          file_name: upload.file.name,
          file_size: upload.file.size,
          description: upload.description,
        });
      }

      setSubmitted(true);
      toast({
        title: "Success",
        description: "Your forms have been submitted successfully.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit forms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <PageHero
          title="Form Submission"
          subtitle="Upload your completed forms for processing"
          badge="Resources"
        />
        <section className="py-16">
          <div className="container max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card className="border-green-200 bg-green-50">
                <CardContent className="py-12">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Submission Successful!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Your forms have been submitted successfully. Our team will review them and get back to you.
                  </p>
                  <Button onClick={() => {
                    setSubmitted(false);
                    setFormData({ lastName: "", otherNames: "", phone: "", email: "" });
                    setFileUploads([{ id: crypto.randomUUID(), formType: "", file: null, description: "" }]);
                  }}>
                    Submit Another Form
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        title="Form Submission"
        subtitle="Upload your completed forms for processing"
        badge="Resources"
      />

      <section className="py-16">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Forms</CardTitle>
                <CardDescription>
                  Complete the form below to submit your filled documents. You can upload multiple forms at once.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="otherNames">Other Names *</Label>
                        <Input
                          id="otherNames"
                          value={formData.otherNames}
                          onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
                          placeholder="Enter your other names"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+233 XX XXX XXXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Uploads */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="font-semibold text-lg">Form Uploads</h3>
                      <Button type="button" variant="outline" size="sm" onClick={addFileUpload}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Another Form
                      </Button>
                    </div>

                    {fileUploads.map((upload, index) => (
                      <motion.div
                        key={upload.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border rounded-lg bg-muted/30 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            Form {index + 1}
                          </span>
                          {fileUploads.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => removeFileUpload(upload.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Form Type *</Label>
                            <Select
                              value={upload.formType}
                              onValueChange={(value) => updateFileUpload(upload.id, "formType", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select form type" />
                              </SelectTrigger>
                              <SelectContent>
                                {formTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Upload File *</Label>
                            <div className="relative">
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0] || null;
                                  updateFileUpload(upload.id, "file", file);
                                }}
                                className="cursor-pointer"
                              />
                              {upload.file && (
                                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                  <FileText className="h-4 w-4" />
                                  {upload.file.name}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Description (Optional)</Label>
                          <Textarea
                            value={upload.description}
                            onChange={(e) => updateFileUpload(upload.id, "description", e.target.value)}
                            placeholder="Add any additional notes about this form..."
                            rows={2}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Forms
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FormSubmission;
