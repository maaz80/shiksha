import { fetchWithFallback } from "./api.js";

export const getCompanies = async () => {
     try {
          const res = await fetchWithFallback("/images");
          if (res && res.ok) {
               return await res.json();
          }
          return [];
     } catch (err) {
          console.error("Failed to fetch company images", err);
          return [];
     }
};
