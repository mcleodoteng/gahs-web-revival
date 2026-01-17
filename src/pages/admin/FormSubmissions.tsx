import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, Download, Trash2, FileText, User, Mail, Phone, Calendar } from "lucide-react";
import { format } from "date-fns";

interface SubmissionFile {
  id: string;
  form_type: string;
  file_url: string;
  file_name: string;
  file_size: number | null;
  description: string | null;
  signed_url?: string;
}

interface FormSubmission {
  id: string;
  last_name: string;
  other_names: string;
  phone: string;
  email: string;
  created_at: string;
  files?: SubmissionFile[];
}

const formTypeLabels: Record<string, string> = {
  bond: "Bond Form",
  study_leave: "Study Leave Application",
  appraisal: "Appraisal / Promotional Form",
  interview: "Interview Form",
};

const AdminFormSubmissions = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FormSubmission | null>(null);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    
    const { data: submissionsData, error: submissionsError } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (submissionsError) {
      console.error("Error fetching submissions:", submissionsError);
      toast({
        title: "Error",
        description: "Failed to load form submissions.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Fetch files for each submission and generate signed URLs
    const submissionsWithFiles = await Promise.all(
      (submissionsData || []).map(async (submission) => {
        const { data: files } = await supabase
          .from("form_submission_files")
          .select("*")
          .eq("submission_id", submission.id);
        
        // Generate signed URLs for each file
        const filesWithSignedUrls = await Promise.all(
          (files || []).map(async (file) => {
            // Extract the file path from the URL
            const urlParts = file.file_url.split("/form-submissions/");
            const filePath = urlParts[1] || "";
            
            if (filePath) {
              const { data: signedUrlData } = await supabase.storage
                .from("form-submissions")
                .createSignedUrl(filePath, 3600); // 1 hour expiry
              
              return {
                ...file,
                signed_url: signedUrlData?.signedUrl || file.file_url,
              };
            }
            return file;
          })
        );
        
        return {
          ...submission,
          files: filesWithSignedUrls,
        };
      })
    );

    setSubmissions(submissionsWithFiles);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from("form_submissions")
      .delete()
      .eq("id", deleteTarget.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete submission.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Submission deleted successfully.",
      });
      fetchSubmissions();
    }
    setDeleteTarget(null);
  };

  const filteredSubmissions = submissions.filter((s) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      s.last_name.toLowerCase().includes(searchLower) ||
      s.other_names.toLowerCase().includes(searchLower) ||
      s.email.toLowerCase().includes(searchLower) ||
      s.phone.includes(searchQuery)
    );
  });

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AdminLayout title="Application Forms">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Application Forms</h1>
            <p className="text-muted-foreground">
              View and manage submitted application forms.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{submissions.length}</div>
              <p className="text-sm text-muted-foreground">Total Submissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {submissions.filter((s) => s.files?.some((f) => f.form_type === "bond")).length}
              </div>
              <p className="text-sm text-muted-foreground">Bond Forms</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {submissions.filter((s) => s.files?.some((f) => f.form_type === "study_leave")).length}
              </div>
              <p className="text-sm text-muted-foreground">Study Leave Forms</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {submissions.reduce((acc, s) => acc + (s.files?.length || 0), 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Files</p>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
            <CardDescription>
              Click on a submission to view details and download files.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? "No submissions match your search." : "No submissions yet."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Forms</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="font-medium">
                            {submission.last_name}, {submission.other_names}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {submission.email}
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {submission.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {submission.files?.map((file) => (
                              <Badge key={file.id} variant="secondary" className="text-xs">
                                {formTypeLabels[file.form_type] || file.form_type}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(submission.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setDeleteTarget(submission)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Details Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              View applicant information and download submitted forms.
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              {/* Applicant Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <User className="h-4 w-4" />
                    Name
                  </div>
                  <p className="font-medium">
                    {selectedSubmission.last_name}, {selectedSubmission.other_names}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    Submitted
                  </div>
                  <p className="font-medium">
                    {format(new Date(selectedSubmission.created_at), "PPP 'at' p")}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                  <p className="font-medium">{selectedSubmission.email}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Phone className="h-4 w-4" />
                    Phone
                  </div>
                  <p className="font-medium">{selectedSubmission.phone}</p>
                </div>
              </div>

              {/* Files */}
              <div className="space-y-3">
                <h4 className="font-semibold">Submitted Forms</h4>
                <div className="space-y-2">
                  {selectedSubmission.files?.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{file.file_name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {formTypeLabels[file.form_type] || file.form_type}
                            </Badge>
                            <span>{formatFileSize(file.file_size)}</span>
                          </div>
                          {file.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {file.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <a href={file.signed_url || file.file_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to delete the submission from{" "}
              <strong>{deleteTarget?.last_name}, {deleteTarget?.other_names}</strong>?
              This action cannot be undone and all associated files will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminFormSubmissions;
