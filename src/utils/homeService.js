import { API_URL, fetchWithFallback } from "./api.js";

let homeDataCache = null;
let homeDataPromise = null;

export const getHomeData = async (forceRefresh = false) => {
     if (!forceRefresh && homeDataCache) {
          return homeDataCache;
     }

     if (homeDataPromise && !forceRefresh) {
          return homeDataPromise;
     }

     homeDataPromise = (async () => {
          try {
               const res = await fetchWithFallback("/home-data");
               if (res && res.ok) {
                    const data = await res.json();
                    homeDataCache = data;
                    return data;
               }
               if (homeDataCache) return homeDataCache;
               return null;
          } catch (err) {
               console.error("Failed to fetch home data:", err);
               if (homeDataCache) return homeDataCache;
               return null;
          } finally {
               homeDataPromise = null;
          }
     })();

     return homeDataPromise;
};
