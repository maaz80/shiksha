"use client";

import React from "react";

/**
 * Utility function to dynamically insert transformation parameters into a Cloudinary URL.
 */
export function getOptimizedCloudinaryUrl(url, { width, height, quality = "auto", format = "auto", crop = "fill" } = {}) {
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
     const remainingUrl = urlStr.substring(uploadIndex + 8);

     const transforms = [];
     if (width) transforms.push(`w_${width}`);
     if (height) transforms.push(`h_${height}`);
     if (crop && (width || height)) transforms.push(`c_${crop}`);
     if (quality) transforms.push(`q_${quality}`);
     if (format) transforms.push(`f_${format}`);
     transforms.push("dpr_auto"); // Automatically adjust image density for retina/high-res displays

     const transformString = transforms.join(",");
     return `${baseUrl}${transformString}/${remainingUrl}`;
}

/**
 * CloudinaryImage / OptimizedImage component for highly optimized responsive images.
 * Ideal for dynamic Cloudinary images, falling back to static local images seamlessly.
 */
export function CloudinaryImage({
     src,
     alt = "",
     className = "",
     priority = false, // Set to true if this image appears above the fold (e.g. Hero banner)
     sizes = "100vw",
     objectFit = "fill",
     fallbackSrc = "/images/weekend-ux-hero-bg-template.webp",
     fetchPriority = undefined // Optional fetch priority attribute
}) {
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
                    className={`${className}`}
                    loading={priority ? "eager" : "lazy"}
                    {...(fetchPriority ? { fetchPriority } : {})}
               />
          );
     }

     // Generate a responsive srcSet using Cloudinary widths
     const srcSet = [
          `${getOptimizedCloudinaryUrl(imageSrc, { width: 640, quality: "auto" })} 640w`,
          `${getOptimizedCloudinaryUrl(imageSrc, { width: 1024, quality: "auto" })} 1024w`,
          `${getOptimizedCloudinaryUrl(imageSrc, { width: 1920, quality: "auto" })} 1920w`,
          `${getOptimizedCloudinaryUrl(imageSrc, { width: 2560, quality: "auto" })} 2560w`
     ].join(", ");

     const defaultSrc = getOptimizedCloudinaryUrl(imageSrc, { width: 1920, quality: "auto" });

     return (
          <img
               src={defaultSrc}
               srcSet={srcSet}
               sizes={sizes}
               alt={alt}
               className={`${className}`}
               loading={priority ? "eager" : "lazy"}
               {...(fetchPriority ? { fetchPriority } : {})}
          />
     );
}

export default CloudinaryImage;
export { CloudinaryImage as OptimizedImage };
