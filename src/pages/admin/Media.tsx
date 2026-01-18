import { useState, useEffect, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Upload, Trash2, Copy, Image, FileText, Film, Search, Music, File, Grid, List, Calendar, ArrowUpDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
}

type MediaCategory = "all" | "images" | "documents" | "videos" | "audio" | "other";
type SortBy = "name" | "date" | "size";
type SortOrder = "asc" | "desc";
type ViewMode = "grid" | "list";

const ITEMS_PER_PAGE = 20;

const AdminMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null);
  const [category, setCategory] = useState<MediaCategory>("all");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const fetchMedia = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.storage.from("cms-media").list("", {
      limit: 500,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      console.error("Error fetching media:", error);
      toast({
        title: "Error",
        description: "Failed to load media files",
        variant: "destructive",
      });
    } else if (data) {
      const filesWithUrls = data
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => {
          const { data: urlData } = supabase.storage
            .from("cms-media")
            .getPublicUrl(file.name);
          return {
            id: file.id,
            name: file.name,
            url: urlData.publicUrl,
            type: file.metadata?.mimetype || "unknown",
            size: file.metadata?.size || 0,
            created_at: file.created_at,
          };
        });
      setFiles(filesWithUrls);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;
    if (!uploadFiles || uploadFiles.length === 0) return;

    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;

    for (const file of Array.from(uploadFiles)) {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error } = await supabase.storage.from("cms-media").upload(fileName, file);
      if (error) {
        errorCount++;
      } else {
        successCount++;
      }
    }

    if (successCount > 0) {
      toast({
        title: "Upload complete",
        description: `${successCount} file(s) uploaded successfully${errorCount > 0 ? `, ${errorCount} failed` : ""}`,
      });
      await fetchMedia();
    } else {
      toast({
        title: "Upload failed",
        description: "No files were uploaded",
        variant: "destructive",
      });
    }

    setIsUploading(false);
    e.target.value = "";
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const { error } = await supabase.storage.from("cms-media").remove([deleteTarget.name]);

    if (error) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      setSelectedFile(null);
      await fetchMedia();
    }
    setDeleteTarget(null);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard",
    });
  };

  const getFileCategory = (type: string): MediaCategory => {
    if (type.startsWith("image/")) return "images";
    if (type.startsWith("video/")) return "videos";
    if (type.startsWith("audio/")) return "audio";
    if (type.includes("pdf") || type.includes("document") || type.includes("word") || type.includes("text")) return "documents";
    return "other";
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type.startsWith("video/")) return Film;
    if (type.startsWith("audio/")) return Music;
    if (type.includes("pdf") || type.includes("document") || type.includes("word")) return FileText;
    return File;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Filter and sort files
  const processedFiles = useMemo(() => {
    let result = [...files];

    // Filter by search
    if (searchQuery) {
      result = result.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (category !== "all") {
      result = result.filter((file) => getFileCategory(file.type) === category);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "date":
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case "size":
          comparison = a.size - b.size;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [files, searchQuery, category, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(processedFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = processedFiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, category, sortBy, sortOrder]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: files.length,
      images: files.filter((f) => getFileCategory(f.type) === "images").length,
      documents: files.filter((f) => getFileCategory(f.type) === "documents").length,
      videos: files.filter((f) => getFileCategory(f.type) === "videos").length,
      audio: files.filter((f) => getFileCategory(f.type) === "audio").length,
      other: files.filter((f) => getFileCategory(f.type) === "other").length,
    };
  }, [files]);

  const renderFileCard = (file: MediaFile) => {
    const FileIcon = getFileIcon(file.type);
    const isImage = file.type.startsWith("image/");

    if (viewMode === "list") {
      return (
        <div
          key={file.id}
          className="flex items-center gap-4 p-3 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer bg-card"
          onClick={() => setSelectedFile(file)}
        >
          <div className="w-12 h-12 flex-shrink-0 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            {isImage ? (
              <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
            ) : (
              <FileIcon className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground">{file.type}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm text-muted-foreground">{formatSize(file.size)}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(file.created_at), "MMM d, yyyy")}
            </p>
          </div>
        </div>
      );
    }

    return (
      <Card
        key={file.id}
        className="overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => setSelectedFile(file)}
      >
        <div className="aspect-square relative bg-muted flex items-center justify-center">
          {isImage ? (
            <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
          ) : (
            <FileIcon className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        <CardContent className="p-3">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <AdminLayout title="Media Library">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
            <p className="text-muted-foreground">
              Upload and manage images and files for your website.
            </p>
          </div>
          <div>
            <Label htmlFor="upload" className="cursor-pointer">
              <Button disabled={isUploading} className="gap-2" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                  {isUploading ? "Uploading..." : "Upload Files"}
                </span>
              </Button>
            </Label>
            <Input
              id="upload"
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              multiple
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={category} onValueChange={(v) => setCategory(v as MediaCategory)}>
          <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-transparent p-0">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All ({categoryCounts.all})
            </TabsTrigger>
            <TabsTrigger value="images" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Image className="h-4 w-4 mr-1.5" />
              Images ({categoryCounts.images})
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="h-4 w-4 mr-1.5" />
              Documents ({categoryCounts.documents})
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Film className="h-4 w-4 mr-1.5" />
              Videos ({categoryCounts.videos})
            </TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Music className="h-4 w-4 mr-1.5" />
              Audio ({categoryCounts.audio})
            </TabsTrigger>
            <TabsTrigger value="other" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <File className="h-4 w-4 mr-1.5" />
              Other ({categoryCounts.other})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="size">Size</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              title={sortOrder === "asc" ? "Ascending" : "Descending"}
            >
              <ArrowUpDown className={`h-4 w-4 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
            </Button>
            <div className="hidden sm:flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Files display */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : processedFiles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery || category !== "all"
                  ? "No files match your filters"
                  : "No files uploaded yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, processedFiles.length)} of{" "}
              {processedFiles.length} files
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {paginatedFiles.map(renderFileCard)}
              </div>
            ) : (
              <div className="space-y-2">{paginatedFiles.map(renderFileCard)}</div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}

        {/* File details dialog */}
        <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="pr-8 break-words">File Details</DialogTitle>
              <DialogDescription className="break-all text-xs">{selectedFile?.name}</DialogDescription>
            </DialogHeader>
            {selectedFile && (
              <div className="space-y-4">
                {selectedFile.type.startsWith("image/") && (
                  <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                    <img
                      src={selectedFile.url}
                      alt={selectedFile.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                {selectedFile.type.startsWith("video/") && (
                  <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                    <video src={selectedFile.url} controls className="w-full h-full" />
                  </div>
                )}
                {selectedFile.type.startsWith("audio/") && (
                  <div className="p-4 bg-muted rounded-lg">
                    <audio src={selectedFile.url} controls className="w-full" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>File URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={selectedFile.url}
                      readOnly
                      className="text-xs font-mono flex-1 min-w-0"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(selectedFile.url)}
                      className="flex-shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block">Type</span>
                    <span className="font-medium break-all">{selectedFile.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Size</span>
                    <span className="font-medium">{formatSize(selectedFile.size)}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground block">Uploaded</span>
                    <span className="font-medium">
                      {format(new Date(selectedFile.created_at), "PPpp")}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setSelectedFile(null)}>
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={() => setDeleteTarget(selectedFile)}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete File</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete <strong className="break-all">{deleteTarget?.name}</strong>?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
