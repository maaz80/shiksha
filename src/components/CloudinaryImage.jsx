"use client";

import React from "react";
import { getOptimizedCloudinaryUrl } from "../utils/cloudinary";

export { getOptimizedCloudinaryUrl };


// Granular responsive image breakpoints for exact container sizing
const DEFAULT_IMAGE_WIDTHS = [240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 720, 800, 960, 1080, 1200, 1600];

/**
 * CloudinaryImage / OptimizedImage component for highly optimized responsive images.
 * Provides fine-grained device viewport steps, automatic Cloudinary aspect cropping,
 * and smart modern AVIF/WebP auto format selection.
 */
export function CloudinaryImage({
     src,
     alt = "",
     className = "",
     priority = false, // Set to true if this image appears above the fold (e.g. Hero banner)
     sizes = "(max-width: 640px) 320px, (max-width: 1024px) 400px, 400px",
     objectFit = "fill",
     fallbackSrc = "/images/shiksha-design-hero.webp",
     fetchPriority: userFetchPriority = undefined,
     aspectRatio = undefined,
     quality = "auto:eco",
     width,
     height,
     ...props
}) {
     const { loading: userLoading, ...restProps } = props;
     const effectiveLoading = priority ? "eager" : (userLoading || "lazy");
     const effectiveFetchPriority = priority ? "high" : (userFetchPriority || undefined);

     let imageSrc = src || fallbackSrc;
     if (src && typeof src === 'object' && src.src) {
          imageSrc = src.src;
     }

     const isCloudinary = typeof imageSrc === 'string' && imageSrc.includes("cloudinary.com");

     if (!isCloudinary) {
          return (
               <img
                    src={imageSrc}
                    alt={alt}
                    className={className}
                    loading={effectiveLoading}
                    decoding="async"
                    {...(width ? { width } : {})}
                    {...(height ? { height } : {})}
                    {...(effectiveFetchPriority ? { fetchPriority: effectiveFetchPriority } : {})}
                    {...restProps}
               />
          );
     }

     let effectiveAspectRatio = aspectRatio;
     if (!effectiveAspectRatio && width && height) {
          effectiveAspectRatio = width / height;
     }

     // Generate a granular responsive srcSet matching actual container widths
     const srcSet = DEFAULT_IMAGE_WIDTHS.map((w) => {
          const url = getOptimizedCloudinaryUrl(imageSrc, {
               width: w,
               aspectRatio: effectiveAspectRatio,
               quality,
               format: "auto",
               crop: objectFit === "cover" || objectFit === "fill" ? "fill" : "fit",
          });
          return `${url} ${w}w`;
     }).join(", ");

     // Default src for legacy fallback: matched to container width (~380px/400px) instead of 640px
     const fallbackWidth = width ? Math.min(Number(width) || 400, 400) : 380;
     const defaultSrc = getOptimizedCloudinaryUrl(imageSrc, {
          width: fallbackWidth,
          aspectRatio: effectiveAspectRatio,
          quality,
          format: "auto",
          crop: objectFit === "cover" || objectFit === "fill" ? "fill" : "fit",
     });

     return (
          <img
               src={defaultSrc}
               srcSet={srcSet}
               sizes={sizes}
               alt={alt}
               className={className}
               loading={effectiveLoading}
               decoding="async"
               {...(width ? { width } : {})}
               {...(height ? { height } : {})}
               {...(effectiveFetchPriority ? { fetchPriority: effectiveFetchPriority } : {})}
               {...restProps}
          />
     );
}

export default CloudinaryImage;
export { CloudinaryImage as OptimizedImage };
