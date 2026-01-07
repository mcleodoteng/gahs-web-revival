import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

export interface PageContent {
  id: string;
  page_slug: string;
  section_key: string;
  content: Json;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCMS = () => {
  const [content, setContent] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .order("page_slug")
      .order("sort_order");

    if (error) {
      console.error("Error fetching content:", error);
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      });
    } else {
      setContent((data as PageContent[]) || []);
    }
    setIsLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getPageContent = (pageSlug: string) => {
    return content.filter((c) => c.page_slug === pageSlug && c.is_active);
  };

  const getSectionContent = (pageSlug: string, sectionKey: string) => {
    return content.find(
      (c) => c.page_slug === pageSlug && c.section_key === sectionKey
    );
  };

  const updateContent = async (
    id: string,
    updates: { content?: Json; is_active?: boolean; sort_order?: number }
  ) => {
    const { error } = await supabase
      .from("page_content")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Success",
      description: "Content updated successfully",
    });
    await fetchContent();
    return true;
  };

  const createContent = async (
    pageSlug: string,
    sectionKey: string,
    contentData: Json,
    sortOrder: number = 0
  ) => {
    const { error } = await supabase.from("page_content").insert([{
      page_slug: pageSlug,
      section_key: sectionKey,
      content: contentData,
      sort_order: sortOrder,
    }]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create content",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Success",
      description: "Content created successfully",
    });
    await fetchContent();
    return true;
  };

  const deleteContent = async (id: string) => {
    const { error } = await supabase.from("page_content").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Success",
      description: "Content deleted successfully",
    });
    await fetchContent();
    return true;
  };

  return {
    content,
    isLoading,
    fetchContent,
    getPageContent,
    getSectionContent,
    updateContent,
    createContent,
    deleteContent,
  };
};

// Hook for public pages to get content
export const usePageContent = (pageSlug: string) => {
  const [sections, setSections] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPageContent = async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page_slug", pageSlug)
        .eq("is_active", true)
        .order("sort_order");

      if (!error && data) {
        setSections(data as PageContent[]);
      }
      setIsLoading(false);
    };

    fetchPageContent();
  }, [pageSlug]);

  const getSection = <T = Record<string, unknown>>(sectionKey: string, defaultValue?: T): T | undefined => {
    const section = sections.find((s) => s.section_key === sectionKey);
    if (!section) return defaultValue;
    return section.content as T;
  };

  return { sections, isLoading, getSection };
};
