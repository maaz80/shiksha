import { API_URL } from "./api.js";

let homeDataCache = null;
let homeDataPromise = null;

/**
 * Fetch home page content data with local memory caching & deduplication of parallel queries.
 * @param {boolean} forceRefresh - If true, bypass cache and force a network reload.
 */
export const getHomeData = async (forceRefresh = false) => {
     if (!forceRefresh && homeDataCache) {
          return homeDataCache;
     }

     if (homeDataPromise && !forceRefresh) {
          return homeDataPromise;
     }

     homeDataPromise = (async () => {
          try {
               const res = await fetch(`${API_URL}/home-data`);
               if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
               }
               const data = await res.json();
               homeDataCache = data;
               return data;
          } catch (err) {
               console.error("Failed to fetch home data:", err);
               // Fallback to stale cache if request fails
               if (homeDataCache) {
                    return homeDataCache;
               }
               throw err;
          } finally {
               homeDataPromise = null;
          }
     })();

     return homeDataPromise;
};
