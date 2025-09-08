import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePrefetch = () => {
  const queryClient = useQueryClient();

  const prefetchProjects = () => {
    queryClient.prefetchQuery({
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
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchBlogs = () => {
    queryClient.prefetchQuery({
      queryKey: ["blogs"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;
        return data || [];
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  return { prefetchProjects, prefetchBlogs };
};