import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ArrayFieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "number" | "select";
  placeholder?: string;
  options?: { label: string; value: string }[];
}

interface ArrayEditorProps {
  value: unknown[];
  onChange: (value: unknown[]) => void;
  fields: ArrayFieldConfig[];
  itemLabel?: string;
}

const ImageUploadInput = ({ 
  value, 
  onChange, 
  placeholder 
}: { 
  value: string; 
  onChange: (url: string) => void; 
  placeholder?: string 
}) => {
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
        <Label htmlFor={`img-upload-${Math.random()}`} className="cursor-pointer">
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
          id={`img-upload-${Math.random()}`}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
      {value && (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden border bg-muted">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export const ArrayEditor = ({ value, onChange, fields, itemLabel = "Item" }: ArrayEditorProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  const items = Array.isArray(value) ? value : [];

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const addItem = () => {
    const newItem: Record<string, unknown> = { id: String(Date.now()) };
    fields.forEach((field) => {
      newItem[field.key] = field.type === "number" ? 0 : "";
    });
    const newItems = [...items, newItem];
    onChange(newItems);
    setExpandedItems(new Set([...expandedItems, newItems.length - 1]));
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
    // Update expanded indices
    const newExpanded = new Set<number>();
    expandedItems.forEach((i) => {
      if (i < index) newExpanded.add(i);
      else if (i > index) newExpanded.add(i - 1);
    });
    setExpandedItems(newExpanded);
  };

  const updateItem = (index: number, key: string, fieldValue: unknown) => {
    const newItems = [...items];
    newItems[index] = { ...(newItems[index] as Record<string, unknown>), [key]: fieldValue };
    onChange(newItems);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    onChange(newItems);
    
    // Update expanded state
    const newExpanded = new Set<number>();
    expandedItems.forEach((i) => {
      if (i === index) newExpanded.add(newIndex);
      else if (i === newIndex) newExpanded.add(index);
      else newExpanded.add(i);
    });
    setExpandedItems(newExpanded);
  };

  const getItemTitle = (item: unknown, index: number): string => {
    if (typeof item !== "object" || !item) return `${itemLabel} ${index + 1}`;
    const obj = item as Record<string, unknown>;
    return (obj.title as string) || (obj.name as string) || (obj.label as string) || `${itemLabel} ${index + 1}`;
  };

  const getItemImage = (item: unknown): string | null => {
    if (typeof item !== "object" || !item) return null;
    const obj = item as Record<string, unknown>;
    const imageUrl = (obj.image as string) || (obj.src as string) || (obj.avatar as string) || (obj.photo as string);
    return imageUrl && typeof imageUrl === "string" && imageUrl.length > 0 ? imageUrl : null;
  };

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed rounded-lg text-muted-foreground">
          <p className="mb-2">No {itemLabel.toLowerCase()}s added yet</p>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add {itemLabel}
          </Button>
        </div>
      ) : (
        <>
          {items.map((item, index) => {
            const itemImage = getItemImage(item);
            return (
              <Card key={index} className="overflow-hidden">
                <div 
                  className="flex items-center gap-2 p-3 bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => toggleExpand(index)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  {itemImage && (
                    <div className="w-10 h-10 rounded-md overflow-hidden border bg-background flex-shrink-0">
                      <img 
                        src={itemImage} 
                        alt="" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <span className="flex-1 font-medium text-sm truncate">
                    {getItemTitle(item, index)}
                  </span>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => moveItem(index, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => moveItem(index, "down")}
                      disabled={index === items.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {expandedItems.has(index) ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                
                {expandedItems.has(index) && (
                  <CardContent className="pt-4 space-y-4">
                    {fields.map((field) => {
                      const fieldValue = (item as Record<string, unknown>)?.[field.key];
                      
                      return (
                        <div key={field.key} className="space-y-1.5">
                          <Label className="text-xs font-medium text-muted-foreground">
                            {field.label}
                          </Label>
                          {field.type === "image" ? (
                            <ImageUploadInput
                              value={String(fieldValue || "")}
                              onChange={(url) => updateItem(index, field.key, url)}
                              placeholder={field.placeholder}
                            />
                          ) : field.type === "textarea" ? (
                            <Textarea
                              value={String(fieldValue || "")}
                              onChange={(e) => updateItem(index, field.key, e.target.value)}
                              placeholder={field.placeholder}
                              rows={3}
                              className="text-sm"
                            />
                          ) : field.type === "number" ? (
                            <Input
                              type="number"
                              value={String(fieldValue || "")}
                              onChange={(e) => updateItem(index, field.key, Number(e.target.value))}
                              placeholder={field.placeholder}
                              className="text-sm"
                            />
                          ) : field.type === "select" && field.options ? (
                            <select
                              value={String(fieldValue || "")}
                              onChange={(e) => updateItem(index, field.key, e.target.value)}
                              className="w-full p-2 border rounded-lg text-sm bg-background"
                            >
                              <option value="">Select...</option>
                              {field.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <Input
                              value={String(fieldValue || "")}
                              onChange={(e) => updateItem(index, field.key, e.target.value)}
                              placeholder={field.placeholder}
                              className="text-sm"
                            />
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                )}
              </Card>
            );
          })}
          
          <Button type="button" variant="outline" size="sm" onClick={addItem} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add {itemLabel}
          </Button>
        </>
      )}
    </div>
  );
};
