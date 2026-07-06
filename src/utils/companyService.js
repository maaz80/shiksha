import { API_URL } from "./api.js";

export const getCompanies = async () => {
     try {
          const res = await fetch(`${API_URL}/images`);
          if (res.ok) {
               return await res.json();
          }
          return [];
     } catch (err) {
          console.error("Failed to fetch company images", err);
          return [];
     }
};
