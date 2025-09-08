import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholder = "/placeholder.svg"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder with blur effect */}
      <img
        src={placeholder}
        alt=""
        aria-hidden="true"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-0" : "opacity-100 blur-sm"
        )}
      />
      
      {/* Main image with lazy loading */}
      <img
        ref={(node) => {
          if (node && !isInView) {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(node);
                  }
                });
              },
              { threshold: 0.1, rootMargin: "50px" }
            );
            observer.observe(node);
          }
        }}
        src={isInView ? src : placeholder}
        alt={alt}
        onLoad={handleLoad}
        loading="lazy"
        decoding="async"
        className={cn(
          "relative h-full w-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
};