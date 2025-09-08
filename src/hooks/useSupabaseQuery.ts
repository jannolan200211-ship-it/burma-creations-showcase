import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    retry: 2,
  });
};

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
    retry: 2,
  });
};

export const useBlogDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) throw new Error("No blog ID provided");
      
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("Blog not found");
      
      return data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // Data is fresh for 10 minutes
    gcTime: 30 * 60 * 1000, // Cache for 30 minutes
    retry: 2,
  });
};

export const useProjectDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!id) throw new Error("No project ID provided");
      
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("Project not found");
      
      return data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // Data is fresh for 10 minutes
    gcTime: 30 * 60 * 1000, // Cache for 30 minutes
    retry: 2,
  });
};