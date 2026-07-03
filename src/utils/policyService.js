const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL) || "http://localhost:5000/api";

let policyDataCache = null;
let policyDataPromise = null;

/**
 * Fetch policy data (Disclaimer & Privacy Policy) with local caching & deduplication.
 * @param {boolean} forceRefresh - If true, bypass cache and force a network reload.
 */
export const getPolicyData = async (forceRefresh = false) => {
     if (!forceRefresh && policyDataCache) {
          return policyDataCache;
     }

     if (policyDataPromise && !forceRefresh) {
          return policyDataPromise;
     }

     policyDataPromise = (async () => {
          try {
               const res = await fetch(`${API_URL}/policy-data`);
               if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
               }
               const data = await res.json();
               policyDataCache = data;
               return data;
          } catch (err) {
               console.error("Failed to fetch policy data:", err);
               if (policyDataCache) {
                    return policyDataCache;
               }
               throw err;
          } finally {
               policyDataPromise = null;
          }
     })();

     return policyDataPromise;
};
