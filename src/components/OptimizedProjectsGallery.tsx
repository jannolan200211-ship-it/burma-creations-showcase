import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useProjects } from "@/hooks/useSupabaseQuery";
import { ProjectCard } from "./ProjectCard";

export const OptimizedProjectsGallery = () => {
  const { data: projects = [], isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-destructive">
          Failed to load projects. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 lg:px-8">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "var(--gradient-mesh)",
            willChange: "transform" 
          }} 
        />
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