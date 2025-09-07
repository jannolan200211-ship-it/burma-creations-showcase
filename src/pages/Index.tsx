import { motion } from 'framer-motion';
import { ProjectsGallery } from "@/components/ProjectsGallery";
import BlogList from '@/components/BlogList';
import ContactForm from '@/components/ContactForm';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Myanmar Tech Innovation
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Empowering the next generation of creators and innovators
            </p>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex gap-4 flex-wrap justify-center"
            >
              <a
                href="#projects"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                View Projects
              </a>
              <a
                href="#blog"
                className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Read Blog
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-accent text-accent rounded-full font-semibold hover:bg-accent hover:text-primary-foreground transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing innovative solutions built for Myanmar's digital future
            </p>
          </motion.div>
          <ProjectsGallery />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Inspiring No-Code Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn, share, and grow with Myanmar's thriving no-code movement
            </p>
          </motion.div>
          <BlogList />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-mesh/5">
        <ContactForm />
      </section>

      <Toaster />
    </div>
  );
};

export default Index;