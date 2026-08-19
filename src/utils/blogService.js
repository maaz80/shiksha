import { fetchWithFallback } from "./api.js";

export const getBlogs = async () => {
     try {
          const res = await fetchWithFallback("/blogs");
          if (res && res.ok) {
               return await res.json();
          }
          return [];
     } catch (err) {
          console.error("Failed to fetch blogs:", err);
          return [];
     }
};

export const getBlogBySlug = async (slug) => {
     try {
          const res = await fetchWithFallback(`/blogs/${slug}`);
          if (res && res.ok) {
               return await res.json();
          }
          return null;
     } catch (err) {
          console.error("Failed to fetch blog by slug:", err);
          return null;
     }
};
