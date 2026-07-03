/**
 * Performance utilities for optimizing Lighthouse scores
 */

// Preload critical fonts
export const preloadFonts = () => {
     if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', loadFonts);
     } else {
          loadFonts();
     }
};

const loadFonts = () => {
     const link = document.createElement('link');
     link.rel = 'preload';
     link.as = 'style';
     link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap';
     document.head.appendChild(link);
};

// Report Web Vitals for monitoring performance
export const reportWebVitals = (metric) => {
     // Send to analytics service
     if (window.gtag) {
          window.gtag('event', metric.name, {
               value: Math.round(metric.value),
               event_category: 'Web Vitals',
               event_label: metric.id,
               non_interaction: true,
          });
     }
};

// Optimize images on load
export const optimizeImages = () => {
     const images = document.querySelectorAll('img');
     images.forEach(img => {
          // Set loading to lazy if not already set
          if (!img.loading) {
               img.loading = 'lazy';
          }
          // Set decoding to async if not already set
          if (!img.decoding) {
               img.decoding = 'async';
          }
     });
};

// Defer non-critical CSS
export const deferNonCriticalStyles = () => {
     const links = document.querySelectorAll('link[rel="stylesheet"]');
     links.forEach(link => {
          if (!link.media || link.media === 'all') {
               link.media = 'print';
               link.addEventListener('load', function () {
                    this.media = 'all';
               });
          }
     });
};
