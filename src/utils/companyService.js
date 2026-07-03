const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || "http://localhost:5000/api";

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
