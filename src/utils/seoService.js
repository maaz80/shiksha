import { fetchWithFallback } from "./api.js";

export const getPageSEO = async (pageId) => {
     try {
          const res = await fetchWithFallback(`/pages/${pageId}/seo`);
          if (res && res.ok) {
               return await res.json();
          }
     } catch (err) {
          console.error(`Failed to fetch SEO for page ${pageId}:`, err);
     }
     return null;
};

export default getPageSEO;
