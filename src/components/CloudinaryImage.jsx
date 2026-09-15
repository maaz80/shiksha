"use client";

import React from "react";

/**
 * Utility function to dynamically insert transformation parameters into a Cloudinary URL.
 */
export function getOptimizedCloudinaryUrl(url, { width, height, aspectRatio, quality = "auto", format = "auto", crop = "fill" } = {}) {
     let urlStr = url;
     if (url && typeof url === 'object' && url.src) {
          urlStr = url.src;
     }
     if (!urlStr || typeof urlStr !== 'string') return "";
     if (!urlStr.includes("cloudinary.com")) return urlStr;

     // Locate the /upload/ section of the Cloudinary URL
     const uploadIndex = urlStr.indexOf("/upload/");
     if (uploadIndex === -1) return urlStr;

     const baseUrl = urlStr.substring(0, uploadIndex + 8);
     let remainingUrl = urlStr.substring(uploadIndex + 8);

     // If remainingUrl already starts with transformation parameters, strip them to prevent duplication
     const firstSlashIndex = remainingUrl.indexOf("/");
     if (firstSlashIndex !== -1) {
          const firstSegment = remainingUrl.substring(0, firstSlashIndex);
          if (/^[a-z0-9_,-]+$/i.test(firstSegment) && (firstSegment.includes("_") || firstSegment.includes("q_") || firstSegment.includes("f_"))) {
               remainingUrl = remainingUrl.substring(firstSlashIndex + 1);
          }
     }

     const transforms = [];
     if (width) transforms.push(`w_${Math.round(width)}`);
     if (height) transforms.push(`h_${Math.round(height)}`);
     else if (aspectRatio && width) {
          let arNumeric = aspectRatio;
          if (typeof aspectRatio === 'string' && aspectRatio.includes(':')) {
               const [wStr, hStr] = aspectRatio.split(':').map(Number);
               if (wStr && hStr) arNumeric = wStr / hStr;
          }
          if (typeof arNumeric === 'number' && arNumeric > 0) {
               transforms.push(`h_${Math.round(width / arNumeric)}`);
          }
     }
     if (crop && (width || height || aspectRatio)) transforms.push(`c_${crop},g_auto`);
     if (quality) transforms.push(`q_${quality}`);
     if (format) transforms.push(`f_${format}`);

     const transformString = transforms.join(",");
     return `${baseUrl}${transformString}/${remainingUrl}`;
}

// Granular responsive image breakpoints matching Next.js & industry standards (Vercel/Shopify/Airbnb)
const DEFAULT_IMAGE_WIDTHS = [360, 480, 640, 768, 828, 960, 1080, 1200, 1600, 1920];

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
     sizes = "(max-width: 640px) 360px, (max-width: 1024px) 450px, 400px",
     objectFit = "fill",
     fallbackSrc = "/images/shiksha-design-hero.webp",
     fetchPriority: userFetchPriority = undefined,
     aspectRatio = undefined,
     quality = "auto",
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

     // Default src for legacy fallback: ~640px image instead of 1920px
     const defaultSrc = getOptimizedCloudinaryUrl(imageSrc, {
          width: 640,
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
