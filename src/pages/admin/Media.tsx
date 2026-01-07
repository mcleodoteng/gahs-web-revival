import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, Trash2, Copy, Image, FileText, Film, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
}

const AdminMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const { toast } = useToast();

  const fetchMedia = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.storage.from("cms-media").list("", {
      limit: 100,
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
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      await fetchMedia();
    }
    setIsUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Delete ${file.name}?`)) return;

    const { error } = await supabase.storage.from("cms-media").remove([file.name]);

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
      await fetchMedia();
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard",
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type.startsWith("video/")) return Film;
    return FileText;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Media Library">
      <div className="space-y-6">
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
                  {isUploading ? "Uploading..." : "Upload File"}
                </span>
              </Button>
            </Label>
            <Input
              id="upload"
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Files grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : filteredFiles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? "No files match your search" : "No files uploaded yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredFiles.map((file) => {
              const FileIcon = getFileIcon(file.type);
              const isImage = file.type.startsWith("image/");

              return (
                <Card
                  key={file.id}
                  className="overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="aspect-square relative bg-muted flex items-center justify-center">
                    {isImage ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
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
            })}
          </div>
        )}

        {/* File details dialog */}
        <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>File Details</DialogTitle>
              <DialogDescription>{selectedFile?.name}</DialogDescription>
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
                <div className="space-y-2">
                  <Label>File URL</Label>
                  <div className="flex gap-2">
                    <Input value={selectedFile.url} readOnly />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(selectedFile.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>{" "}
                    {selectedFile.type}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>{" "}
                    {formatSize(selectedFile.size)}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => {
                  if (selectedFile) {
                    handleDelete(selectedFile);
                    setSelectedFile(null);
                  }
                }}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
