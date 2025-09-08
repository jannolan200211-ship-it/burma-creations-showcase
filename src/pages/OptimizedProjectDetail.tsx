import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyImage } from "@/components/LazyImage";
import { useProjectDetail } from "@/hooks/useSupabaseQuery";

const OptimizedProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, error } = useProjectDetail(id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Skeleton className="h-10 w-40 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-96 rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {error ? "Error loading project" : "Project not found"}
          </h2>
          <Link to="/projects">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/projects">
            <Button
              variant="ghost"
              className="gap-2 mb-8 hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="overflow-hidden">
              <LazyImage
                src={project.image_url}
                alt={project.title}
                className="w-full h-96 object-cover"
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {project.featured && (
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                Featured Project
              </Badge>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {project.title}
            </h1>

            <p className="text-lg text-muted-foreground">
              {project.description}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            {project.category && (
              <Card className="p-6 bg-muted/30">
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  Category
                </h2>
                <Badge variant="outline" className="text-sm">
                  {project.category}
                </Badge>
              </Card>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time dateTime={project.created_at}>
                Created on {formatDate(project.created_at)}
              </time>
            </div>

            <div className="flex gap-4 pt-4">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Live Demo
                  </Button>
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    View Source
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OptimizedProjectDetail;