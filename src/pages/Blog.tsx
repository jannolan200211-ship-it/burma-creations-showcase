import { motion } from "framer-motion";
import OptimizedBlogList from "@/components/OptimizedBlogList";

const Blog = () => {
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
                Community Blog
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn, share, and grow with Myanmar's thriving no-code movement. 
              Discover tutorials, success stories, and insights from our community.
            </p>
          </div>
          
          <OptimizedBlogList />
        </motion.div>
      </section>
    </div>
  );
};

export default Blog;