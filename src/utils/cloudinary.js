/**
 * Utility function to dynamically insert transformation parameters into a Cloudinary URL.
 * Pure JS helper callable from both Server and Client components.
 */
export function getOptimizedCloudinaryUrl(url, { width, height, aspectRatio, quality = "auto:eco", format = "auto", crop = "fill" } = {}) {
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
