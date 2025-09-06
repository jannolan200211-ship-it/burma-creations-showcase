import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/project";
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
      toast({
        title: "Error",
        description: "Failed to load project details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Project not found</h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="mb-6 hover:bg-primary/10"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {project.featured && (
                <Badge className="bg-accent text-accent-foreground">
                  Featured Project
                </Badge>
              )}
              {project.category && (
                <Badge variant="secondary">
                  <Tag className="mr-1 h-3 w-3" />
                  {project.category}
                </Badge>
              )}
              <span className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(project.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            
            <p className="max-w-3xl text-lg text-muted-foreground">
              {project.description}
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {/* Project Image */}
              <div className="mb-8 overflow-hidden rounded-2xl shadow-[var(--shadow-large)]">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-auto w-full"
                />
              </div>

              {/* Embedded Media */}
              {project.media_url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h2 className="mb-4 text-2xl font-semibold">Project Demo</h2>
                  <div className="aspect-video overflow-hidden rounded-2xl shadow-[var(--shadow-large)]">
                    <iframe
                      src={project.media_url}
                      title={`${project.title} Demo`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              )}

              {/* Case Study Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-2xl font-semibold text-foreground">Case Study</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    This project represents a significant milestone in addressing the unique challenges
                    faced by Myanmar's digital landscape. Through innovative use of modern technologies
                    and user-centered design principles, we've created a solution that not only meets
                    current needs but also scales for future growth.
                  </p>
                  <p>
                    The development process involved extensive research, iterative design, and close
                    collaboration with local communities to ensure the solution truly serves its intended
                    users. Every feature was carefully crafted to provide maximum value while maintaining
                    simplicity and accessibility.
                  </p>
                  <p>
                    Looking forward, this project serves as a foundation for continued innovation and
                    improvement, with plans for regular updates based on user feedback and emerging
                    technological opportunities.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-medium)]">
                  <h3 className="mb-4 text-lg font-semibold">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-secondary/20 text-secondary hover:bg-secondary/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-medium)]">
                <h3 className="mb-4 text-lg font-semibold">Project Links</h3>
                <div className="space-y-3">
                  {project.live_url && (
                    <Button
                      asChild
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live Project
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button
                      asChild
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;