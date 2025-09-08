import { motion } from "framer-motion";
import { OptimizedProjectsGallery } from "@/components/OptimizedProjectsGallery";

const Projects = () => {
  return (
    <div className="min-h-screen py-20">
      <section className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Projects Gallery
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore innovative solutions built by our community. From web apps to mobile 
              solutions, see what's possible without writing code.
            </p>
          </div>
          
          <OptimizedProjectsGallery />
        </motion.div>
      </section>
    </div>
  );
};

export default Projects;