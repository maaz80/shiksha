import { fetchWithFallback } from "./api.js";

let aboutDataCache = null;
let aboutDataPromise = null;

export const getAboutData = async (forceRefresh = false) => {
     if (!forceRefresh && aboutDataCache) {
          return aboutDataCache;
     }

     if (aboutDataPromise && !forceRefresh) {
          return aboutDataPromise;
     }

     aboutDataPromise = (async () => {
          try {
               const res = await fetchWithFallback("/about-data");
               if (res && res.ok) {
                    const data = await res.json();
                    aboutDataCache = data;
                    return data;
               }
               if (aboutDataCache) return aboutDataCache;
               return null;
          } catch (err) {
               console.error("Failed to fetch about data:", err);
               if (aboutDataCache) return aboutDataCache;
               return null;
          } finally {
               aboutDataPromise = null;
          }
     })();

     return aboutDataPromise;
};
