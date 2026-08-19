import { fetchWithFallback } from "./api.js";

export const getCourses = async () => {
     try {
          const res = await fetchWithFallback("/courses");
          if (res && res.ok) {
               return await res.json();
          }
          return [];
     } catch (err) {
          console.error("Failed to fetch courses:", err);
          return [];
     }
};

export const getCourseBySlug = async (slug) => {
     try {
          const res = await fetchWithFallback(`/courses/${slug}`);
          if (res && res.ok) {
               return await res.json();
          }
          return null;
     } catch (err) {
          console.error("Failed to fetch course by slug:", err);
          return null;
     }
};

export const getAllReviews = async () => {
     try {
          const res = await fetchWithFallback("/reviews/all");
          if (res && res.ok) {
               return await res.json();
          }
          return [];
     } catch (err) {
          console.error("Failed to fetch reviews:", err);
          return [];
     }
};
