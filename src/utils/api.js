const LIVE_API_URL = "https://api.shikshadesign.com/api";
// const LIVE_API_URL = "http://localhost:5000/api";

const getApiUrl = () => {
     let baseUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || LIVE_API_URL).trim().replace(/\/$/, "");
     
     if (!baseUrl || baseUrl === "/") {
          return LIVE_API_URL;
     }

     if (baseUrl.startsWith("http") && !baseUrl.endsWith("/api")) {
          return `${baseUrl}/api`;
     }
     
     return baseUrl;
};

export const API_URL = getApiUrl();
export const FALLBACK_API_URL = LIVE_API_URL;

export const fetchWithFallback = async (endpoint, options) => {
     const url = `${API_URL}${endpoint}`;
     try {
          const res = await fetch(url, options);
          if (res.ok) return res;
     } catch (err) {
          // Primary fetch failed (e.g., localhost offline)
     }

     if (API_URL !== FALLBACK_API_URL) {
          try {
               const fallbackUrl = `${FALLBACK_API_URL}${endpoint}`;
               const fallbackRes = await fetch(fallbackUrl, options);
               if (fallbackRes.ok) return fallbackRes;
          } catch (err) {
               console.error(`Fallback fetch failed for ${endpoint}:`, err);
          }
     }

     return null;
};

export default API_URL;
