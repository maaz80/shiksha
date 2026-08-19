import { fetchWithFallback } from "./api.js";

let policyDataCache = null;
let policyDataPromise = null;

export const getPolicyData = async (forceRefresh = false) => {
     if (!forceRefresh && policyDataCache) {
          return policyDataCache;
     }

     if (policyDataPromise && !forceRefresh) {
          return policyDataPromise;
     }

     policyDataPromise = (async () => {
          try {
               const res = await fetchWithFallback("/policy-data");
               if (res && res.ok) {
                    const data = await res.json();
                    policyDataCache = data;
                    return data;
               }
               if (policyDataCache) return policyDataCache;
               return null;
          } catch (err) {
               console.error("Failed to fetch policy data:", err);
               if (policyDataCache) return policyDataCache;
               return null;
          } finally {
               policyDataPromise = null;
          }
     })();

     return policyDataPromise;
};
