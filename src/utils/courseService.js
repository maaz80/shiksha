const getApiBase = () => {
     const baseUrl = ((process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || "").replace(/\/$/, "");
     if (!baseUrl) return "/api";
     return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
};

const API = getApiBase();

export const getCourses = async () => {
     try {
          const res = await fetch(`${API}/courses`);
          return await res.json();
     } catch (err) {
          console.error(err);
          return [];
     }
};

export const getCourseBySlug = async (slug) => {
     try {
          const res = await fetch(`${API}/courses/${slug}`);
          if (!res.ok) {
               throw new Error("Course not found");
          }
          return await res.json();
     } catch (err) {
          console.error(err);
          return null;
     }
};

export const getAllReviews = async () => {
     try {
          const res = await fetch(`${API}/reviews/all`);
          if (res.ok) {
               return await res.json();
          }
          return [];
     } catch (err) {
          console.error(err);
          return [];
     }
};
