import { fetchWithFallback } from "./api.js";

export const getTestimonials = async () => {
     try {
          const res = await fetchWithFallback("/reviews/all");
          if (res && res.ok) {
               const data = await res.json();
               if (Array.isArray(data) && data.length > 0) {
                    return data;
               }
          }
     } catch (err) {
          console.error("Failed to fetch reviews/all:", err);
     }

     try {
          const res = await fetchWithFallback("/testimonials");
          if (res && res.ok) {
               const data = await res.json();
               if (Array.isArray(data) && data.length > 0) {
                    return data;
               }
          }
     } catch (err) {
          console.error("Failed to fetch testimonials:", err);
     }

     return [];
};
