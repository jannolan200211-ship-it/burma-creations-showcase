import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { ExternalLink, Github, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { LazyImage } from "@/components/LazyImage";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Link to={`/project/${project.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-medium)] transition-all duration-300 hover:shadow-[var(--shadow-large)] hover:shadow-primary/10">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <LazyImage
              src={project.image_url}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Featured Badge */}
            {project.featured && (
              <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
            
            {/* Play Button for Media */}
            {project.media_url && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
              >
                <div className="rounded-full bg-primary/90 p-4 backdrop-blur-sm">
                  <Play className="h-6 w-6 text-primary-foreground" fill="currentColor" />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
              {project.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {project.description}
            </p>
            
            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}
            
            {/* Links */}
            <div className="flex items-center gap-3">
              {project.live_url && (
                <motion.a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              )}
              {project.github_url && (
                <motion.a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4" />
                </motion.a>
              )}
              {project.category && (
                <span className="ml-auto text-xs font-medium text-muted-foreground">
                  {project.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};