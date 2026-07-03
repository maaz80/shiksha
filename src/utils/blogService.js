const getApiBase = () => {
     const baseUrl = ((process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || "").replace(/\/$/, "");
     if (!baseUrl) return "/api";
     return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
};

const API = getApiBase();

export const getBlogs = async () => {

     try {

          const res = await fetch(`${API}/blogs`);
          return await res.json();

     } catch (err) {

          console.error(err);
          return [];

     }

};
export const getBlogBySlug = async (slug) => {
     try {
          const res = await fetch(`${API}/blogs/${slug}`);

          if (!res.ok) {
               throw new Error("Blog not found");
          }

          return await res.json();

     } catch (err) {
          console.error(err);
          return null;
     }
};
