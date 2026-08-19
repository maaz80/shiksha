import { fetchWithFallback } from "./api.js";

let contactDataCache = null;
let contactDataPromise = null;

export const getContactData = async (forceRefresh = false) => {
     if (!forceRefresh && contactDataCache) {
          return contactDataCache;
     }

     if (contactDataPromise && !forceRefresh) {
          return contactDataPromise;
     }

     contactDataPromise = (async () => {
          try {
               const res = await fetchWithFallback("/contact-data");
               if (res && res.ok) {
                    const data = await res.json();
                    contactDataCache = data;
                    return data;
               }
               if (contactDataCache) return contactDataCache;
               return null;
          } catch (err) {
               console.error("Failed to fetch contact data:", err);
               if (contactDataCache) return contactDataCache;
               return null;
          } finally {
               contactDataPromise = null;
          }
     })();

     return contactDataPromise;
};
