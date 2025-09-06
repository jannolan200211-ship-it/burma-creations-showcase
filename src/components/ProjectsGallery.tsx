import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProjectsGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 lg:px-8">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0" style={{ background: "var(--gradient-mesh)" }} />
      </div>
      
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            My <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Creative</span> Projects
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Showcasing innovative digital solutions for Myanmar's tech-savvy youth
          </p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground"
          >
            <p className="text-lg">No projects found.</p>
            <p className="mt-2 text-sm">Projects can be added via the Supabase dashboard.</p>
          </motion.div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};