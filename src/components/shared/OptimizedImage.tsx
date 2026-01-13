import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none";
  objectPosition?: string;
  placeholder?: "blur" | "skeleton";
}

/**
 * Optimized Image Component
 * - Lazy loading with IntersectionObserver
 * - WebP format support for Unsplash images
 * - Loading skeleton placeholder
 * - Responsive sizing
 */
export const OptimizedImage = ({
  src,
  alt,
  className,
  containerClassName,
  width,
  height,
  priority = false,
  objectFit = "cover",
  objectPosition = "center",
  placeholder = "skeleton",
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Optimize Unsplash URLs for WebP and responsive loading
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.includes("unsplash.com")) {
      // Parse existing URL params and optimize
      const url = new URL(originalSrc);
      
      // Set optimal quality and format
      url.searchParams.set("auto", "format");
      url.searchParams.set("q", "75");
      
      // Add responsive width if specified
      if (width) {
        url.searchParams.set("w", String(Math.min(width * 2, 1920))); // 2x for retina, max 1920
      }
      
      return url.toString();
    }
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before visible
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const objectFitClass = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
  }[objectFit];

  return (
    <div className={cn("relative overflow-hidden", containerClassName)} ref={imgRef}>
      {/* Loading Skeleton */}
      {!isLoaded && placeholder === "skeleton" && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {/* Blur placeholder */}
      {!isLoaded && placeholder === "blur" && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Actual Image */}
      {isInView && !hasError && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            objectFitClass,
            className
          )}
          style={{ objectPosition }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

/**
 * Get optimized image URL for Unsplash images
 * Use this for background images or where OptimizedImage can't be used
 */
export const getOptimizedImageUrl = (
  src: string,
  options: { width?: number; quality?: number } = {}
): string => {
  const { width = 1200, quality = 75 } = options;

  if (src.includes("unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("q", String(quality));
    url.searchParams.set("w", String(width));
    return url.toString();
  }

  return src;
};
