import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Blog } from '@/types/blog';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchBlog = async (blogId: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        setError('Blog post not found');
      } else {
        setBlog(data);
      }
    } catch (err) {
      setError('Failed to load blog post');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-64 w-full rounded-xl mb-8" />
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-3/4 mb-8" />
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || 'Blog post not found'}
          </h1>
          <Button onClick={() => navigate('/')} variant="default">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>
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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="mb-8 hover:bg-accent"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Button>
        </motion.div>

        <article>
          {blog.image_url && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8"
            >
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              <time dateTime={blog.date}>{formatDate(blog.date)}</time>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground bg-gradient-primary bg-clip-text text-transparent">
              {blog.title}
            </h1>

            <Separator className="my-8" />

            <div className="prose prose-lg max-w-none text-foreground">
              <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                {blog.content}
              </div>
            </div>
          </motion.div>
        </article>
      </div>
    </motion.div>
  );
};

export default BlogDetail;