import { fetchWithFallback } from "./api.js";

export const getLocations = async () => {
     try {
          const res = await fetchWithFallback("/locations");
          if (res && res.ok) {
               return await res.json();
          }
          return [];
     } catch (err) {
          console.error("Failed to fetch locations:", err);
          return [];
     }
};