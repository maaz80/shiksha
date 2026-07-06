import { API_URL } from "./api.js";

let contactDataCache = null;
let contactDataPromise = null;

/**
 * Fetch contact page content data with local memory caching & deduplication of parallel queries.
 * @param {boolean} forceRefresh - If true, bypass cache and force a network reload.
 */
export const getContactData = async (forceRefresh = false) => {
     if (!forceRefresh && contactDataCache) {
          return contactDataCache;
     }

     if (contactDataPromise && !forceRefresh) {
          return contactDataPromise;
     }

     contactDataPromise = (async () => {
          try {
               const res = await fetch(`${API_URL}/contact-data`);
               if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
               }
               const data = await res.json();
               contactDataCache = data;
               return data;
          } catch (err) {
               console.error("Failed to fetch contact data:", err);
               // Fallback to stale cache if request fails
               if (contactDataCache) {
                    return contactDataCache;
               }
               throw err;
          } finally {
               contactDataPromise = null;
          }
     })();

     return contactDataPromise;
};
