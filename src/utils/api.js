const getApiUrl = () => {
     let baseUrl = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || "http://localhost:5000/api").trim().replace(/\/$/, "");
     
     // If it is just an empty string or relative slash fallback, default to /api
     if (!baseUrl || baseUrl === "/") {
          return "/api";
     }

     // If the URL starts with http/https but does not end with /api, append it
     if (baseUrl.startsWith("http") && !baseUrl.endsWith("/api")) {
          return `${baseUrl}/api`;
     }
     
     return baseUrl;
};

export const API_URL = getApiUrl();
export default API_URL;
