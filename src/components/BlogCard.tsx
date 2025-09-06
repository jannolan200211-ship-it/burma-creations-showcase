import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Blog } from '@/types/blog';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  blog: Blog;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, index }) => {
  const truncateContent = (text: string, maxWords: number = 100) => {
    const words = text.split(' ');
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/blog/${blog.id}`}>
        <article className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 border border-border">
          {blog.image_url && (
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              <time dateTime={blog.date}>{formatDate(blog.date)}</time>
            </div>

            <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {blog.title}
            </h2>

            <p className="text-muted-foreground line-clamp-3">
              {truncateContent(blog.content)}
            </p>

            <motion.div
              className="inline-flex items-center text-primary font-medium"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Read more →
            </motion.div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default BlogCard;