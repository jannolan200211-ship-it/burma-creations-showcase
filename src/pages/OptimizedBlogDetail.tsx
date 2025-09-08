import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyImage } from "@/components/LazyImage";
import { useBlogDetail } from "@/hooks/useSupabaseQuery";

const OptimizedBlogDetail = () => {
  const { id } = useParams();
  const { data: blog, isLoading, error } = useBlogDetail(id);

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
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="h-64 w-full rounded-xl mb-8" />
          <Skeleton className="h-4 w-40 mb-4" />
          <Skeleton className="h-12 w-3/4 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {error ? "Error loading blog post" : "Blog post not found"}
          </h2>
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
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
      <article className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blog">
            <Button
              variant="ghost"
              className="gap-2 mb-8 hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {blog.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="overflow-hidden">
              <LazyImage
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            {blog.title}
          </h1>

          <div className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
            {blog.content}
          </div>
        </motion.div>
      </article>
    </motion.div>
  );
};

export default OptimizedBlogDetail;