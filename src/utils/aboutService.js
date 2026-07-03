const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || "http://localhost:5000/api";

let aboutDataCache = null;
let aboutDataPromise = null;

/**
 * Fetch about page content data with local memory caching & deduplication of parallel queries.
 * @param {boolean} forceRefresh - If true, bypass cache and force a network reload.
 */
export const getAboutData = async (forceRefresh = false) => {
     if (!forceRefresh && aboutDataCache) {
          return aboutDataCache;
     }

     if (aboutDataPromise && !forceRefresh) {
          return aboutDataPromise;
     }

     aboutDataPromise = (async () => {
          try {
               const res = await fetch(`${API_URL}/about-data`);
               if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
               }
               const data = await res.json();
               aboutDataCache = data;
               return data;
          } catch (err) {
               console.error("Failed to fetch about data:", err);
               // Fallback to stale cache if request fails
               if (aboutDataCache) {
                    return aboutDataCache;
               }
               throw err;
          } finally {
               aboutDataPromise = null;
          }
     })();

     return aboutDataPromise;
};
